'use client';

import React, { useState, useMemo, useEffect } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Database,
  Sparkles,
  Search,
  Play,
  RotateCcw,
  Zap,
  Cpu,
  Layers,
  Compass,
  ArrowRight,
  Code2,
  CheckCircle2,
  Network
} from 'lucide-react';

interface VectorPoint {
  id: string;
  label: string;
  category: 'animals' | 'food' | 'vehicles';
  x: number; // 0.0 to 1.0 (normalized)
  y: number; // 0.0 to 1.0 (normalized)
  color: string;
}

const DATASET: VectorPoint[] = [
  // Animals / Pets
  { id: '1', label: 'Cat', category: 'animals', x: 0.20, y: 0.25, color: '#f59e0b' },
  { id: '2', label: 'Kitten', category: 'animals', x: 0.23, y: 0.28, color: '#fbbf24' },
  { id: '3', label: 'Dog', category: 'animals', x: 0.28, y: 0.20, color: '#d97706' },
  { id: '4', label: 'Puppy', category: 'animals', x: 0.32, y: 0.24, color: '#b45309' },

  // Food / Fruits
  { id: '5', label: 'Apple', category: 'food', x: 0.75, y: 0.22, color: '#10b981' },
  { id: '6', label: 'Banana', category: 'food', x: 0.82, y: 0.28, color: '#34d399' },
  { id: '7', label: 'Orange', category: 'food', x: 0.70, y: 0.32, color: '#059669' },
  { id: '8', label: 'Mango', category: 'food', x: 0.85, y: 0.20, color: '#047857' },

  // Vehicles / Transport
  { id: '9', label: 'Car', category: 'vehicles', x: 0.72, y: 0.78, color: '#38bdf8' },
  { id: '10', label: 'Truck', category: 'vehicles', x: 0.78, y: 0.84, color: '#0284c7' },
  { id: '11', label: 'Bicycle', category: 'vehicles', x: 0.65, y: 0.70, color: '#60a5fa' },
  { id: '12', label: 'Airplane', category: 'vehicles', x: 0.85, y: 0.88, color: '#2563eb' },
];

const PRESET_QUERIES = [
  { text: 'Feline companion', x: 0.21, y: 0.26, targetCat: 'animals' },
  { text: 'Sweet citrus snack', x: 0.73, y: 0.29, targetCat: 'food' },
  { text: 'Heavy cargo motor vehicle', x: 0.77, y: 0.82, targetCat: 'vehicles' },
];

// Cluster centroids for IVFFlat simulation (k=3)
const CENTROIDS = [
  { id: 'c1', label: 'Centroid: Animals', x: 0.26, y: 0.24, color: '#f59e0b' },
  { id: 'c2', label: 'Centroid: Food', x: 0.78, y: 0.25, color: '#10b981' },
  { id: 'c3', label: 'Centroid: Vehicles', x: 0.75, y: 0.80, color: '#38bdf8' },
];

export default function PgVectorTopic() {
  const [metric, setMetric] = useState<'cosine' | 'l2' | 'inner'>('cosine');
  const [indexType, setIndexType] = useState<'exact' | 'ivfflat' | 'hnsw'>('hnsw');
  const [queryX, setQueryX] = useState<number>(0.21);
  const [queryY, setQueryY] = useState<number>(0.26);
  const [queryText, setQueryText] = useState('Feline companion');
  const [isSearching, setIsSearching] = useState(false);
  const [activeCentroid, setActiveCentroid] = useState<string | null>(null);
  const [hnswHops, setHnswHops] = useState<{ fromX: number; fromY: number; toX: number; toY: number }[]>([]);
  const [probedCount, setProbedCount] = useState<number>(12);

  // Canvas bounds (width: 600, height: 380)
  const CANVAS_W = 600;
  const CANVAS_H = 380;

  // Calculate distance between query and each point
  const rankedPoints = useMemo(() => {
    return DATASET.map((p) => {
      const dx = p.x - queryX;
      const dy = p.y - queryY;
      const l2Dist = Math.sqrt(dx * dx + dy * dy);

      // Cosine distance approximation
      const dot = p.x * queryX + p.y * queryY;
      const magP = Math.sqrt(p.x * p.x + p.y * p.y);
      const magQ = Math.sqrt(queryX * queryX + queryY * queryY);
      const cosineSim = Math.max(0, Math.min(1, dot / ((magP * magQ) || 1)));
      const cosineDist = 1 - cosineSim;

      // Inner product (negative dot)
      const innerDist = -dot;

      let sortKey = cosineDist;
      let scoreText = `${(cosineSim * 100).toFixed(1)}% Sim`;

      if (metric === 'l2') {
        sortKey = l2Dist;
        scoreText = `L2: ${l2Dist.toFixed(3)}`;
      } else if (metric === 'inner') {
        sortKey = innerDist;
        scoreText = `Dot: ${dot.toFixed(3)}`;
      }

      return {
        ...p,
        sortKey,
        scoreText,
        cosineSim,
        l2Dist,
      };
    }).sort((a, b) => a.sortKey - b.sortKey);
  }, [queryX, queryY, metric]);

  const top3 = rankedPoints.slice(0, 3);

  // Simulate search execution with animation
  const handleSearch = async () => {
    setIsSearching(true);
    setActiveCentroid(null);
    setHnswHops([]);

    if (indexType === 'exact') {
      // Brute force all 12
      setProbedCount(12);
      await new Promise((r) => setTimeout(r, 600));
    } else if (indexType === 'ivfflat') {
      // 1. Probe centroids
      await new Promise((r) => setTimeout(r, 400));
      // Find closest centroid
      let closestC = CENTROIDS[0];
      let minCDist = 999;
      for (const c of CENTROIDS) {
        const d = Math.sqrt((c.x - queryX) ** 2 + (c.y - queryY) ** 2);
        if (d < minCDist) {
          minCDist = d;
          closestC = c;
        }
      }
      setActiveCentroid(closestC.id);
      setProbedCount(4); // only probe 4 points in that cluster
      await new Promise((r) => setTimeout(r, 600));
    } else if (indexType === 'hnsw') {
      // HNSW skip-list graph hops
      const hops = [
        { fromX: 0.5, fromY: 0.5, toX: 0.75, toY: 0.5 }, // Layer 2 entry
        { fromX: 0.75, fromY: 0.5, toX: top3[0].x, toY: top3[0].y }, // Layer 0 greed hop
      ];
      setHnswHops([hops[0]]);
      await new Promise((r) => setTimeout(r, 450));
      setHnswHops(hops);
      setProbedCount(3);
      await new Promise((r) => setTimeout(r, 550));
    }

    setIsSearching(false);
  };

  const handleSelectPreset = (p: typeof PRESET_QUERIES[0]) => {
    setQueryText(p.text);
    setQueryX(p.x);
    setQueryY(p.y);
    setActiveCentroid(null);
    setHnswHops([]);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-cyan-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">
              pgvector &amp; High-Dimensional Vector Embeddings
            </h2>
            <span className="text-xs font-mono text-cyan-400 font-medium">
              Phase 1 Milestone • Vector Distance Metrics &amp; Approximate Nearest Neighbor (ANN)
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          Unlike traditional scalar B-Trees that index numbers and text alphabetically, <b>pgvector</b> stores
          dense mathematical embeddings representing semantic concepts. Searching for nearest neighbors uses vector distance
          functions (<code className="text-cyan-300 font-mono">&lt;=&gt;</code> Cosine, <code className="text-cyan-300 font-mono">&lt;-&gt;</code> L2 Euclidean)
          accelerated by <b>IVFFlat</b> and <b>HNSW</b> indexing structures.
        </p>

        {/* Math Invariant Formula Card */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] font-mono text-sm flex flex-wrap items-center justify-between gap-3 text-cyan-300">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-400">Distance Operator:</span>
            <span className="font-semibold text-zinc-100">
              {metric === 'cosine'
                ? 'Cosine Distance (<=>) : 1 - (u · v) / (||u|| ||v||)'
                : metric === 'l2'
                ? 'L2 Euclidean (<->) : sqrt(sum((u_i - v_i)^2))'
                : 'Negative Dot Product (<#>) : -(u · v)'}
            </span>
          </div>
          <span className="text-xs text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/60 font-medium">
            ANN Search Complexity: O(log N)
          </span>
        </div>
      </div>

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-6">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#11131f] p-4 rounded-xl border border-[#1d2030]">
          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-300 font-medium">Test Prompt:</span>
            {PRESET_QUERIES.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  queryText === p.text
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'bg-[#181a28] text-zinc-300 hover:text-zinc-100 border border-[#23273d]'
                }`}
              >
                &quot;{p.text}&quot;
              </button>
            ))}
          </div>

          {/* Metric Selector */}
          <div className="flex items-center gap-1.5 bg-[#090a10] p-1 rounded-lg border border-[#1e2235] text-xs">
            <span className="text-xs font-mono text-zinc-400 px-2">Metric:</span>
            {(['cosine', 'l2', 'inner'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-2.5 py-1 rounded-md font-mono transition-all text-xs cursor-pointer ${
                  metric === m
                    ? 'bg-cyan-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {m === 'cosine' ? 'Cosine (<=>)' : m === 'l2' ? 'L2 (<->)' : 'Dot (<#>)'}
              </button>
            ))}
          </div>

          {/* Index Type Selector */}
          <div className="flex items-center gap-1.5 bg-[#090a10] p-1 rounded-lg border border-[#1e2235] text-xs">
            <span className="text-xs font-mono text-zinc-400 px-2">Index:</span>
            {(['exact', 'ivfflat', 'hnsw'] as const).map((idxType) => (
              <button
                key={idxType}
                onClick={() => setIndexType(idxType)}
                className={`px-2.5 py-1 rounded-md font-mono transition-all text-xs cursor-pointer ${
                  indexType === idxType
                    ? 'bg-indigo-600 text-white font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {idxType === 'exact' ? 'Exact (No Index)' : idxType === 'ivfflat' ? 'IVFFlat' : 'HNSW'}
              </button>
            ))}
          </div>

          {/* Search Trigger */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" /> Run Vector Search
          </button>
        </div>

        {/* Main Vector Space Canvas + Nearest Neighbors Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 2D Vector Space SVG */}
          <div className="lg:col-span-2 min-h-[380px] bg-[#07080e] rounded-xl border border-[#1a1d2e] p-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Axis Labels */}
            <div className="absolute top-3 left-4 text-xs font-mono text-zinc-500">
              Dimension 2 (Semantic Embedding Axis)
            </div>
            <div className="absolute bottom-3 right-4 text-xs font-mono text-zinc-500">
              Dimension 1 ➔
            </div>

            <svg
              viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
              className="w-full max-w-[620px] h-[340px] select-none"
            >
              {/* Grid Background Lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#141724" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width={CANVAS_W} height={CANVAS_H} fill="url(#grid)" />

              {/* IVFFlat Voronoi Cluster Circles */}
              {indexType === 'ivfflat' &&
                CENTROIDS.map((c) => {
                  const isActive = activeCentroid === c.id;
                  return (
                    <g key={c.id}>
                      <circle
                        cx={c.x * CANVAS_W}
                        cy={c.y * CANVAS_H}
                        r={85}
                        fill={c.color}
                        fillOpacity={isActive ? 0.12 : 0.04}
                        stroke={c.color}
                        strokeWidth={isActive ? 2 : 1}
                        strokeDasharray="4 4"
                        className={isActive ? 'animate-pulse' : ''}
                      />
                      <circle
                        cx={c.x * CANVAS_W}
                        cy={c.y * CANVAS_H}
                        r={4}
                        fill={c.color}
                      />
                      <text
                        x={c.x * CANVAS_W}
                        y={c.y * CANVAS_H - 10}
                        textAnchor="middle"
                        fill={c.color}
                        fontSize={9.5}
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {c.label}
                      </text>
                    </g>
                  );
                })}

              {/* HNSW Multi-Layer Skip-List Graph Hops */}
              {indexType === 'hnsw' &&
                hnswHops.map((h, i) => (
                  <line
                    key={i}
                    x1={h.fromX * CANVAS_W}
                    y1={h.fromY * CANVAS_H}
                    x2={h.toX * CANVAS_W}
                    y2={h.toY * CANVAS_H}
                    stroke="#818cf8"
                    strokeWidth={2.5}
                    strokeDasharray="6 3"
                    className="animate-pulse"
                  />
                ))}

              {/* Distance Lines from Query to Top 3 Neighbors */}
              {top3.map((p, i) => (
                <line
                  key={`line-${p.id}`}
                  x1={queryX * CANVAS_W}
                  y1={queryY * CANVAS_H}
                  x2={p.x * CANVAS_W}
                  y2={p.y * CANVAS_H}
                  stroke={i === 0 ? '#06b6d4' : '#22d3ee'}
                  strokeWidth={i === 0 ? 2 : 1}
                  strokeOpacity={i === 0 ? 0.9 : 0.4}
                  strokeDasharray="3 3"
                />
              ))}

              {/* Data Points */}
              {DATASET.map((p) => {
                const isTop1 = top3[0]?.id === p.id;
                const isTop3 = top3.some((t) => t.id === p.id);
                const px = p.x * CANVAS_W;
                const py = p.y * CANVAS_H;

                return (
                  <g key={p.id}>
                    {isTop1 && (
                      <circle
                        cx={px}
                        cy={py}
                        r={20}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        strokeDasharray="3 2"
                        className="animate-spin"
                        style={{ animationDuration: '4s', transformOrigin: `${px}px ${py}px` }}
                      />
                    )}
                    <circle
                      cx={px}
                      cy={py}
                      r={isTop3 ? 8 : 6}
                      fill={p.color}
                      stroke={isTop3 ? '#ffffff' : '#0f172a'}
                      strokeWidth={1.5}
                    />
                    <text
                      x={px}
                      y={py + 18}
                      textAnchor="middle"
                      fill={isTop3 ? '#f1f5f9' : '#94a3b8'}
                      fontSize={isTop3 ? 11 : 9.5}
                      fontFamily="monospace"
                      fontWeight={isTop3 ? 'bold' : 'normal'}
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}

              {/* Active Query Vector Marker */}
              <g>
                <circle
                  cx={queryX * CANVAS_W}
                  cy={queryY * CANVAS_H}
                  r={16}
                  fill="#ec4899"
                  fillOpacity={0.25}
                  className="animate-ping"
                />
                <circle
                  cx={queryX * CANVAS_W}
                  cy={queryY * CANVAS_H}
                  r={8}
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
                <text
                  x={queryX * CANVAS_W}
                  y={queryY * CANVAS_H - 14}
                  textAnchor="middle"
                  fill="#fda4af"
                  fontSize={11}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  📍 Query
                </text>
              </g>
            </svg>

            {/* Canvas Legend */}
            <div className="absolute top-3 right-4 bg-[#0d101d]/90 backdrop-blur border border-[#1e243a] px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]"></span> Query Vector
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]"></span> Top Matches
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Graph Hops
              </span>
            </div>
          </div>

          {/* Top-K Matches & Efficiency Inspector */}
          <div className="flex flex-col justify-between bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl gap-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1e2233]">
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  Top-K Nearest Neighbors
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  K=3
                </span>
              </div>

              {/* Query Meta */}
              <div className="py-2.5 text-xs font-mono text-zinc-400 border-b border-[#181a28]">
                <span>Query: </span>
                <span className="text-zinc-100 font-semibold">&quot;{queryText}&quot;</span>
              </div>

              {/* Match Cards */}
              <div className="flex flex-col gap-2.5 mt-3">
                {top3.map((match, rank) => (
                  <div
                    key={match.id}
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                      rank === 0
                        ? 'bg-cyan-950/30 border-cyan-600/60 text-cyan-200'
                        : 'bg-[#121422] border-[#1e2238] text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          rank === 0 ? 'bg-cyan-500 text-slate-950' : 'bg-[#1c1f32] text-zinc-400'
                        }`}
                      >
                        {rank + 1}
                      </span>
                      <div>
                        <span className="text-sm font-bold text-zinc-100 block">{match.label}</span>
                        <span className="text-xs font-mono text-zinc-400 uppercase">
                          {match.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-[#090a10] px-2 py-1 rounded border border-[#1a1c29]">
                      {match.scoreText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pruning Efficiency Stat */}
            <div className="p-3 rounded-lg bg-[#090a10] border border-[#1a1c29] text-xs font-mono flex items-center justify-between">
              <span className="text-zinc-400">Vectors Evaluated:</span>
              <span className="text-emerald-400 font-bold">
                {probedCount} / {DATASET.length} (
                {indexType === 'exact'
                  ? '100% brute scan'
                  : `${Math.round((probedCount / DATASET.length) * 100)}% pruned search`}
                )
              </span>
            </div>
          </div>
        </div>

        {/* 3. Production PostgreSQL pgvector Query Syntax */}
        <div className="bg-[#090a10] border border-[#1a1c29] rounded-xl p-4 flex flex-col gap-2 font-mono">
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-[#181a28]">
            <span className="flex items-center gap-2 text-zinc-200 font-semibold">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Production SQL Query ({indexType.toUpperCase()} Index)
            </span>
            <span className="text-cyan-400">PostgreSQL 16 + pgvector 0.7+</span>
          </div>
          <pre className="text-xs md:text-sm text-cyan-300 overflow-x-auto leading-relaxed pt-2">
            {indexType === 'hnsw'
              ? `-- Build HNSW Index for O(log N) retrieval:\nCREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);\n\n-- Top-3 Nearest Neighbors query:\nSELECT id, title, 1 - (embedding <=> $1) AS cosine_similarity\nFROM documents\nORDER BY embedding <=> $1\nLIMIT 3;`
              : indexType === 'ivfflat'
              ? `-- Build IVFFlat Voronoi Inverted Index:\nCREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);\n\n-- Set search probing parameter:\nSET ivfflat.probes = 10;\n\n-- Query nearest vectors:\nSELECT id, title, embedding <=> $1 AS distance\nFROM documents ORDER BY distance LIMIT 3;`
              : `-- Exact Sequential Scan (Zero Index):\nSELECT id, title, 1 - (embedding <=> $1) AS cosine_similarity\nFROM documents\nORDER BY embedding <=> $1\nLIMIT 3;`}
          </pre>
        </div>
      </div>

      {/* 4. Everyday Real-Life Analogies (বাস্তব জীবনের দৃশ্যপট) */}
      <RealLifeScenario
        topicName="ভেক্টর ডেটাবেজ ও এআই এমবেডিংস (Vector DB & Embeddings)"
        scenarios={[
          {
            title: "১. সুপারশপের সাজানো সেকশন বা আইল (Supermarket Aisles - IVFFlat Clusters)",
            subtitle: "পুরো দোকানের সব তাক না ঘেঁটে নির্দিষ্ট বিভাগে সরাসরি পৌঁছানো",
            badge: "Voronoi Partition",
            visualTag: "Centroid Pruning",
            accentColor: "emerald",
            analogy:
              "সুপারশপে কমলা কিনতে গেলে আপনি কখনোই মাছ বা হার্ডওয়্যার সেকশনের তাকগুলোতে খোঁজাখুঁজি করেন না। আপনি সরাসরি 'ফলমূল ও শাকসবজি' সেন্ট্রয়েড বা বিভাগে চলে যান। IVFFlat ঠিক এভাবেই পুরো মেমরি স্পেসকে Voronoi ক্লাস্টারে ভাগ করে, যাতে মাত্র ৫-১০% প্রাসঙ্গিক ক্লাস্টারে সার্চ করা যায়!",
            whyItFits:
              "ক্লাস্টার সেন্ট্রয়েড খোঁজার পর কেবল সেই নির্দিষ্ট সেলের ডেটাপয়েন্টগুলো হিসাব করা হয়, যা ব্রুট-ফোর্স O(N) এর বদলে O(√N) সময়ে সার্চ সম্পন্ন করে।",
            diagram: (
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 py-1">
                <span className="px-2 py-1 rounded bg-[#161a29] border border-emerald-500/50">সুপারশপ</span>
                <span>➔ সেন্ট্রয়েড ➔</span>
                <span className="px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold">ফ্রুটস বিভাগ (Probed)</span>
              </div>
            ),
          },
          {
            title: "২. আন্তর্জাতিক বিমান রুটের হাব ও স্পোক (Airport Flight Hubs - HNSW Multi-Layer)",
            subtitle: "বড় শহর থেকে ধাপে ধাপে লোকাল স্টেশনে দ্রুত অবতরণ",
            badge: "Hierarchical Graph",
            visualTag: "Logarithmic Hops",
            accentColor: "sky",
            analogy:
              "বাংলাদেশ থেকে ইউরোপের কোনো ছোট মফস্বল শহরে যেতে চাইলে সরাসরি উড়ে যাওয়া যায় না। প্রথমে বড় আন্তর্জাতিক হাব (যেমন দুবাই/ইস্তাম্বুল - Layer 2) ট্রানজিট নেন, তারপর ইউরোপের রাজধানী (Layer 1), এবং শেষে লোকাল ট্রেনে সেই ছোট স্টেশনে (Layer 0) পৌঁছান। HNSW ঠিক এই হাইওয়ে জাম্প পদ্ধতিতে O(log N) হপে লক্ষ্য ভেক্টরে পৌঁছায়!",
            whyItFits:
              "HNSW উপরের লেয়ারের লং-ডিসট্যান্স স্কিপ এজে জাম্প করে দ্রুত কাঙ্ক্ষিত ক্লাস্টারের কাছে চলে আসে, তারপর গ্রাউন্ড লেয়ারে সূক্ষ্ম লোকাল নেইবার সার্চ করে।",
            diagram: (
              <div className="flex items-center gap-2 text-xs font-mono text-sky-300 py-1">
                <span className="px-2 py-1 rounded bg-[#131628] border border-sky-500/40">Layer 2 (ইন্টারন্যাশনাল হাব)</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-sky-500 text-slate-950 font-bold">Layer 0 (লোকাল স্টেশন)</span>
              </div>
            ),
          },
        ]}
      />

      {/* 5. Production Index Benchmark Table */}
      <div className="bg-[#0f111a] border border-[#1e2233] rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Layers className="w-4 h-4 text-cyan-400" />
          pgvector Indexing Architectures Comparison
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
              <tr>
                <th className="p-3.5 font-medium">Index Structure</th>
                <th className="p-3.5 font-medium">Search Speed</th>
                <th className="p-3.5 font-medium">Build Speed</th>
                <th className="p-3.5 font-medium">Memory Usage</th>
                <th className="p-3.5 font-medium">Recall (Accuracy)</th>
                <th className="p-3.5 font-medium font-sans">Ideal Production Workload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171926] text-zinc-200">
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold text-zinc-100">Exact Flat Scan</td>
                <td className="p-3.5 text-rose-400">O(N) Slow</td>
                <td className="p-3.5 text-emerald-400">O(1) Instant</td>
                <td className="p-3.5 text-emerald-400">Zero Extra RAM</td>
                <td className="p-3.5 text-emerald-400 font-bold">100% Perfect</td>
                <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">&lt; 10,000 vectors or offline ground truth evaluation.</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold text-cyan-300">IVFFlat</td>
                <td className="p-3.5 text-amber-300">O(√N) Medium</td>
                <td className="p-3.5 text-amber-300">Fast (K-Means)</td>
                <td className="p-3.5 text-emerald-400">Low RAM</td>
                <td className="p-3.5 text-amber-300">90% - 95%</td>
                <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">Medium datasets (100K - 1M) with limited RAM constraints.</td>
              </tr>
              <tr className="hover:bg-[#11131c]">
                <td className="p-3.5 font-bold text-indigo-300">HNSW</td>
                <td className="p-3.5 text-emerald-400 font-bold">O(log N) Lightning</td>
                <td className="p-3.5 text-rose-400">Slower Build</td>
                <td className="p-3.5 text-rose-400">High RAM (Graph edges)</td>
                <td className="p-3.5 text-emerald-400 font-bold">98% - 99.5%</td>
                <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">High-throughput RAG search, LLM tool recall, production vector search.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

