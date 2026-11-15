'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import RealLifeScenario from '@/components/RealLifeScenario';
import { Database, Cpu, Code2 } from 'lucide-react';
import {
  MetricType,
  IndexType,
  PresetQuery,
  DATASET,
  CENTROIDS,
  CANVAS_W,
  CANVAS_H,
  RankedVectorPoint,
} from './pgvector/types';
import PgVectorControls from './pgvector/components/PgVectorControls';
import VectorCanvas from './pgvector/components/VectorCanvas';
import VectorInspector from './pgvector/components/VectorInspector';

const PgVectorBenchmarkTable = dynamic(() => import('./pgvector/components/PgVectorBenchmarkTable'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
      Loading benchmark table...
    </div>
  )
});

export default function PgVectorTopic() {
  const [metric, setMetric] = useState<MetricType>('cosine');
  const [indexType, setIndexType] = useState<IndexType>('hnsw');
  const [queryX, setQueryX] = useState<number>(0.21);
  const [queryY, setQueryY] = useState<number>(0.26);
  const [queryText, setQueryText] = useState('Feline companion');
  const [isSearching, setIsSearching] = useState(false);
  const [activeCentroid, setActiveCentroid] = useState<string | null>(null);
  const [hnswHops, setHnswHops] = useState<{ fromX: number; fromY: number; toX: number; toY: number }[]>([]);
  const [probedCount, setProbedCount] = useState<number>(12);

  // Calculate distance between query and each point
  const rankedPoints = useMemo<RankedVectorPoint[]>(() => {
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
      setProbedCount(12);
      await new Promise((r) => setTimeout(r, 600));
    } else if (indexType === 'ivfflat') {
      await new Promise((r) => setTimeout(r, 400));
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
      setProbedCount(4);
      await new Promise((r) => setTimeout(r, 600));
    } else if (indexType === 'hnsw') {
      const hops = [
        { fromX: 0.5, fromY: 0.5, toX: 0.75, toY: 0.5 },
        { fromX: 0.75, fromY: 0.5, toX: top3[0].x, toY: top3[0].y },
      ];
      setHnswHops([hops[0]]);
      await new Promise((r) => setTimeout(r, 450));
      setHnswHops(hops);
      setProbedCount(3);
      await new Promise((r) => setTimeout(r, 550));
    }

    setIsSearching(false);
  };

  const handleSelectPreset = (p: PresetQuery) => {
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
        <PgVectorControls
          queryText={queryText}
          onSelectPreset={handleSelectPreset}
          metric={metric}
          setMetric={setMetric}
          indexType={indexType}
          setIndexType={setIndexType}
          isSearching={isSearching}
          onSearch={handleSearch}
        />

        {/* Main Vector Space Canvas + Nearest Neighbors Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <VectorCanvas
            queryX={queryX}
            queryY={queryY}
            indexType={indexType}
            activeCentroid={activeCentroid}
            hnswHops={hnswHops}
            top3={top3}
            dataset={DATASET}
            centroids={CENTROIDS}
            canvasW={CANVAS_W}
            canvasH={CANVAS_H}
          />

          <VectorInspector
            queryText={queryText}
            top3={top3}
            probedCount={probedCount}
            totalDatasetCount={DATASET.length}
            indexType={indexType}
          />
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

      {/* 4. Everyday Real-Life Analogies */}
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
      <PgVectorBenchmarkTable />
    </div>
  );
}
