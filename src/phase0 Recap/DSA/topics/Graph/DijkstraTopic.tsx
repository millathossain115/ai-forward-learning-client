'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Clock,
  Compass,
  Route,
  Network,
  CheckCircle2,
  Table,
  Zap,
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface WeightedNode {
  id: string;
  x: number;
  y: number;
}

interface WeightedEdge {
  u: string;
  v: string;
  w: number;
}

interface HeapItem {
  node: string;
  dist: number;
}

interface DijkstraStep {
  stepIndex: number;
  action: 'INIT' | 'PICK_MIN' | 'RELAX_EDGE' | 'NO_RELAX' | 'COMPLETE';
  currentNode: string;
  targetNeighbor?: string;
  edgeWeight?: number;
  distances: Record<string, number>;
  visited: string[];
  priorityQueue: HeapItem[];
  previous: Record<string, string | null>;
  activeEdge?: string;
  relaxedEdges: string[];
  finalPath: string[];
  title: string;
  actionTag: string;
  desc: string;
}

// 6-Node Weighted Graph
const GRAPH_NODES: WeightedNode[] = [
  { id: 'A', x: 100, y: 160 },
  { id: 'B', x: 250, y: 70 },
  { id: 'C', x: 250, y: 250 },
  { id: 'D', x: 420, y: 70 },
  { id: 'E', x: 420, y: 250 },
  { id: 'F', x: 570, y: 160 }
];

const GRAPH_EDGES: WeightedEdge[] = [
  { u: 'A', v: 'B', w: 4 },
  { u: 'A', v: 'C', w: 2 },
  { u: 'C', v: 'B', w: 1 },
  { u: 'B', v: 'D', w: 5 },
  { u: 'C', v: 'D', w: 8 },
  { u: 'C', v: 'E', w: 10 },
  { u: 'D', v: 'E', w: 2 },
  { u: 'D', v: 'F', w: 6 },
  { u: 'E', v: 'F', w: 3 }
];

const ADJACENCY: Record<string, { node: string; w: number }[]> = {
  A: [{ node: 'C', w: 2 }, { node: 'B', w: 4 }],
  B: [{ node: 'D', w: 5 }],
  C: [{ node: 'B', w: 1 }, { node: 'D', w: 8 }, { node: 'E', w: 10 }],
  D: [{ node: 'E', w: 2 }, { node: 'F', w: 6 }],
  E: [{ node: 'F', w: 3 }],
  F: []
};

export default function DijkstraTopic() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Precompute Dijkstra simulation from A to F
  const steps = useMemo<DijkstraStep[]>(() => {
    const list: DijkstraStep[] = [];
    const dist: Record<string, number> = {
      A: 0,
      B: Infinity,
      C: Infinity,
      D: Infinity,
      E: Infinity,
      F: Infinity
    };
    const prev: Record<string, string | null> = {
      A: null,
      B: null,
      C: null,
      D: null,
      E: null,
      F: null
    };
    const visitedSet = new Set<string>();
    let pq: HeapItem[] = [{ node: 'A', dist: 0 }];
    const relaxedEdgeSet = new Set<string>();

    list.push({
      stepIndex: 0,
      action: 'INIT',
      currentNode: 'A',
      distances: { ...dist },
      visited: [],
      priorityQueue: [...pq],
      previous: { ...prev },
      relaxedEdges: [],
      finalPath: [],
      title: 'প্রারম্ভিক অবস্থা: dist[A] = 0, বাকি সব ∞',
      actionTag: '1. INITIALIZE',
      desc: 'সোর্স নোড A-এর দূরত্ব 0 এবং অন্য সব নোডের দূরত্ব অসীম (∞) ধরা হলো। Min-Heap প্রায়োরিটি কিউতে (A, 0) যোগ হলো।'
    });

    while (pq.length > 0) {
      // Pick node with minimum tentative distance
      pq.sort((a, b) => a.dist - b.dist);
      const { node: curr, dist: currentD } = pq.shift()!;

      if (visitedSet.has(curr)) continue;
      visitedSet.add(curr);

      list.push({
        stepIndex: list.length,
        action: 'PICK_MIN',
        currentNode: curr,
        distances: { ...dist },
        visited: Array.from(visitedSet),
        priorityQueue: [...pq],
        previous: { ...prev },
        relaxedEdges: Array.from(relaxedEdgeSet),
        finalPath: [],
        title: `Min-Heap থেকে সর্বনিম্ন নোড চয়ন ➔ ${curr} (দূরত্ব: ${currentD})`,
        actionTag: `2. PICK MIN (${curr})`,
        desc: `অবিজিটেড নোডগুলোর মধ্যে ${curr}-এর দূরত্ব সর্বনিম্ন (${currentD})। এটি ফাইনাল হলো এবং এর সংলগ্ন এজ রিল্যাক্স করা হবে।`
      });

      if (curr === 'F') break; // Reached target

      for (const edge of ADJACENCY[curr] || []) {
        const neighbor = edge.node;
        const weight = edge.w;
        const edgeKey = `${curr}-${neighbor}`;
        const newDist = currentD + weight;

        if (newDist < dist[neighbor]) {
          const oldDist = dist[neighbor];
          dist[neighbor] = newDist;
          prev[neighbor] = curr;
          pq.push({ node: neighbor, dist: newDist });
          relaxedEdgeSet.add(edgeKey);

          list.push({
            stepIndex: list.length,
            action: 'RELAX_EDGE',
            currentNode: curr,
            targetNeighbor: neighbor,
            edgeWeight: weight,
            distances: { ...dist },
            visited: Array.from(visitedSet),
            priorityQueue: [...pq],
            previous: { ...prev },
            activeEdge: edgeKey,
            relaxedEdges: Array.from(relaxedEdgeSet),
            finalPath: [],
            title: `এজ রিল্যাক্সেশন ⚡: (${curr} ➔ ${neighbor})`,
            actionTag: '3. RELAX EDGE',
            desc: `ছোট পথ পাওয়া গেছে! ${currentD} + ${weight} = ${newDist} < ${oldDist === Infinity ? '∞' : oldDist}। dist[${neighbor}] আপডেট হলো ${newDist}-এ এবং প্যারেন্ট হলো ${curr}।`
          });
        } else {
          list.push({
            stepIndex: list.length,
            action: 'NO_RELAX',
            currentNode: curr,
            targetNeighbor: neighbor,
            edgeWeight: weight,
            distances: { ...dist },
            visited: Array.from(visitedSet),
            priorityQueue: [...pq],
            previous: { ...prev },
            activeEdge: edgeKey,
            relaxedEdges: Array.from(relaxedEdgeSet),
            finalPath: [],
            title: `রিল্যাক্সেশনের প্রয়োজন নেই: (${curr} ➔ ${neighbor})`,
            actionTag: 'KEEP CURRENT',
            desc: `বিকল্প দূরত্ব ${currentD} + ${weight} = ${newDist} বর্তমান দূরত্বের (${dist[neighbor]}) চেয়ে ছোট নয়। কোনো পরিবর্তন নেই।`
          });
        }
      }
    }

    // Reconstruct shortest path from A to F
    const finalRoute: string[] = [];
    let p: string | null = 'F';
    while (p) {
      finalRoute.push(p);
      p = prev[p];
    }
    finalRoute.reverse();

    list.push({
      stepIndex: list.length,
      action: 'COMPLETE',
      currentNode: 'F',
      distances: { ...dist },
      visited: Array.from(visitedSet),
      priorityQueue: [],
      previous: { ...prev },
      relaxedEdges: Array.from(relaxedEdgeSet),
      finalPath: finalRoute,
      title: `ডাইকস্ট্রা সম্পূর্ণ! সর্বনিম্ন দূরত্ব = ${dist['F']} 🎉`,
      actionTag: '✅ FINAL PATH FOUND',
      desc: `সোর্স A থেকে গন্তব্য F পর্যন্ত সর্বোত্তম পথ: ${finalRoute.join(' ➔ ')}। মোট ওজন (Cost) = ${dist['F']}।`
    });

    return list;
  }, []);

  const totalSteps = steps.length;
  const isAtEnd = currentStepIdx >= totalSteps - 1;
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = speedMode === 'slow' ? 2400 : 1300;
      timerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < totalSteps - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSteps, speedMode]);

  return (
    <div className="flex flex-col gap-6 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a140a] via-[#120e06] to-[#070603] border border-[#3d2f16] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 font-bold">
              Topic 11.3 • Most Popular Shortest Path Algorithm
            </span>
            <span className="text-xs text-zinc-500 font-mono">Dijkstra&apos;s Algorithm • Edge Relaxation • Min-Heap</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            ডাইকস্ট্রা অ্যালগরিদম: ওজনযুক্ত গ্রাফে সর্বনিম্ন পথ নির্ণয়
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            Google Maps বা GPS নেভিগেশনের প্রাণকেন্দ্র হলো ডাইকস্ট্রা অ্যালগরিদম। এটি একটি গ্রিডি (Greedy) কৌশল যেখানে <b>Min-Heap</b> দিয়ে ধাপে ধাপে সর্বনিম্ন দূরত্বের নোড বেছে নিয়ে <b>এজ রিল্যাক্সেশন (Edge Relaxation)</b>-এর মাধ্যমে চূড়ান্ত সর্বনিম্ন পথ তৈরি করে।
          </p>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">মূল সূত্র (Core Relaxation Formula)</span>
          <div className="text-sm font-bold text-amber-300">
            if (dist[u] + w &lt; dist[v])
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            পূর্বের পথের চেয়ে বর্তমান নোড হয়ে দূরত্ব কম হলে নতুন মান আপডেট হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">টাইম ও স্পেস জটিলতা (Complexity)</span>
          <div className="text-base font-bold text-emerald-400">
            O((V + E) log V)
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            Min-Heap প্রায়োরিটি কিউ ব্যবহার করে O(log V)-এ সর্বনিম্ন নোড এক্সট্রাক্ট করা হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">শর্ত (Pre-Condition)</span>
          <div className="text-base font-bold text-rose-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Non-Negative Weights (w &ge; 0)</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            ঋণাত্মক ওজনের এজে ডাইকস্ট্রা ব্যর্থ হয় (সেক্ষেত্রে Bellman-Ford লাগে)।
          </p>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Route className="w-4 h-4 text-amber-400" />
            <span>ডাইকস্ট্রা সিমুলেটর (A ➔ F)</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 border border-amber-700 text-amber-300 font-bold">
            {currentStep.actionTag}
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(prev => Math.max(0, prev - 1));
            }}
            disabled={isPlaying || currentStepIdx === 0}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
            title="এক ধাপ পেছনে যান"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              if (isAtEnd) {
                setCurrentStepIdx(0);
                setIsPlaying(true);
              } else {
                setIsPlaying(!isPlaying);
              }
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs font-mono transition-all cursor-pointer shadow ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : isAtEnd
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : isAtEnd ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Dijkstra</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(prev => Math.min(totalSteps - 1, prev + 1));
            }}
            disabled={isPlaying || isAtEnd}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
            title="এক ধাপ সামনে যান"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(0);
            }}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
            title="রিসেট"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Toggle */}
          <div className="flex items-center gap-1 bg-[#101322] p-0.5 rounded-lg border border-[#1f263d] text-[10px] font-mono">
            <Clock className="w-3 h-3 text-zinc-400 ml-1" />
            <button
              onClick={() => setSpeedMode('slow')}
              className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                speedMode === 'slow'
                  ? 'bg-amber-600/60 text-amber-200 font-bold border border-amber-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              0.5x
            </button>
            <button
              onClick={() => setSpeedMode('normal')}
              className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-amber-600/60 text-amber-200 font-bold border border-amber-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              1.0x
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-amber-300 font-bold">{currentStepIdx + 1}</span> / {totalSteps}
          </div>
        </div>
      </div>

      {/* 4. MAIN SIMULATION ARENA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: SVG Canvas (65%) */}
        <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 flex flex-col justify-between min-h-[460px] shadow-2xl relative space-y-4">
          <div className="w-full flex items-center justify-center overflow-x-auto py-2 bg-[#060810] rounded-2xl border border-[#1b2238]">
            <svg viewBox="0 0 680 320" className="w-full h-auto max-h-[360px] select-none">
              <defs>
                <marker
                  id="dijk-arrow-gray"
                  markerWidth="8"
                  markerHeight="8"
                  refX="18"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
                </marker>
                <marker
                  id="dijk-arrow-active"
                  markerWidth="8"
                  markerHeight="8"
                  refX="18"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="#f59e0b" />
                </marker>
                <marker
                  id="dijk-arrow-path"
                  markerWidth="8"
                  markerHeight="8"
                  refX="18"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>

              {/* Edges with weight pills */}
              {GRAPH_EDGES.map(edge => {
                const uNode = GRAPH_NODES.find(n => n.id === edge.u)!;
                const vNode = GRAPH_NODES.find(n => n.id === edge.v)!;
                const edgeKey = `${edge.u}-${edge.v}`;
                const isActive = currentStep.activeEdge === edgeKey;

                // Check if this edge is in the final shortest path
                const isInFinalPath =
                  currentStep.finalPath.length > 1 &&
                  currentStep.finalPath.some((node, i) => {
                    return (
                      i < currentStep.finalPath.length - 1 &&
                      currentStep.finalPath[i] === edge.u &&
                      currentStep.finalPath[i + 1] === edge.v
                    );
                  });

                const isRelaxed = currentStep.relaxedEdges.includes(edgeKey);
                const midX = (uNode.x + vNode.x) / 2;
                const midY = (uNode.y + vNode.y) / 2;

                return (
                  <g key={edgeKey}>
                    <line
                      x1={uNode.x}
                      y1={uNode.y}
                      x2={vNode.x}
                      y2={vNode.y}
                      stroke={
                        isInFinalPath
                          ? '#10b981'
                          : isActive
                          ? '#f59e0b'
                          : isRelaxed
                          ? '#059669'
                          : '#1e293b'
                      }
                      strokeWidth={isInFinalPath ? 4 : isActive ? 3.5 : isRelaxed ? 2.5 : 1.5}
                      markerEnd={
                        isInFinalPath
                          ? 'url(#dijk-arrow-path)'
                          : isActive
                          ? 'url(#dijk-arrow-active)'
                          : 'url(#dijk-arrow-gray)'
                      }
                      className="transition-all duration-300"
                    />

                    {/* Edge Weight Pill */}
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x={-11}
                        y={-9}
                        width={22}
                        height={18}
                        rx={4}
                        fill={isActive ? '#78350f' : isInFinalPath ? '#064e3b' : '#0a0d18'}
                        stroke={isActive ? '#f59e0b' : isInFinalPath ? '#10b981' : '#1e293b'}
                        strokeWidth={1}
                      />
                      <text
                        textAnchor="middle"
                        dy="3.5"
                        fill={isActive ? '#fef08a' : isInFinalPath ? '#a7f3d0' : '#94a3b8'}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {edge.w}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map(node => {
                const isCurrent = currentStep.currentNode === node.id;
                const isVisited = currentStep.visited.includes(node.id);
                const isInFinalPath = currentStep.finalPath.includes(node.id);
                const dist = currentStep.distances[node.id];

                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <circle
                      r={22}
                      fill={
                        isInFinalPath
                          ? '#064e3b'
                          : isCurrent
                          ? '#b45309'
                          : isVisited
                          ? '#1e293b'
                          : '#0a0e1c'
                      }
                      stroke={
                        isInFinalPath
                          ? '#10b981'
                          : isCurrent
                          ? '#fbbf24'
                          : isVisited
                          ? '#475569'
                          : '#1e293b'
                      }
                      strokeWidth={isInFinalPath || isCurrent ? 3 : 2}
                      className="transition-all duration-300"
                    />
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={isCurrent || isInFinalPath ? '#ffffff' : '#cbd5e1'}
                      fontWeight="bold"
                      fontSize="14"
                      fontFamily="monospace"
                      className="select-none pointer-events-none"
                    >
                      {node.id}
                    </text>

                    {/* Distance Badge Below Node */}
                    <g transform="translate(0, 30)">
                      <rect
                        x={-20}
                        y={-8}
                        width={40}
                        height={16}
                        rx={4}
                        fill="#060913"
                        stroke={dist !== Infinity ? '#10b981' : '#334155'}
                        strokeWidth={1}
                      />
                      <text
                        textAnchor="middle"
                        dy="4"
                        fill={dist !== Infinity ? '#34d399' : '#64748b'}
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {dist === Infinity ? '∞' : dist}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Explanation Step Card */}
          <div className="p-4 rounded-2xl bg-[#0b0e1a] border border-[#1b2238] shadow-lg space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-400">ধাপ {currentStepIdx + 1}:</span>
              <span className="text-white font-bold">{currentStep.title}</span>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 font-sans leading-relaxed">
              {currentStep.desc}
            </p>
          </div>
        </div>

        {/* Right: Min-Heap Queue & Distance Array (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: Min-Heap Priority Queue */}
          <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Min-Heap Priority Queue</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                Min First
              </span>
            </div>

            <div className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-[#07080f] border border-[#181d30] min-h-[60px] items-center">
              {currentStep.priorityQueue.length === 0 ? (
                <span className="text-[11px] font-mono text-zinc-500 m-auto">
                  Min-Heap খালি
                </span>
              ) : (
                currentStep.priorityQueue.map((item, idx) => (
                  <div
                    key={idx}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 border ${
                      idx === 0
                        ? 'bg-amber-950 border-amber-500 text-amber-200 font-bold ring-1 ring-amber-400'
                        : 'bg-[#101426] border-[#1f2845] text-zinc-400'
                    }`}
                  >
                    <span>{item.node}</span>
                    <span className="text-[10px] text-amber-400">({item.dist})</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Card 2: Distance Table dist[] */}
          <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 shadow-xl text-xs font-mono">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-emerald-400" />
              <span>দূরত্ব টেবিল (Tentative Distance Table)</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              {GRAPH_NODES.map(node => {
                const dist = currentStep.distances[node.id];
                const isVisited = currentStep.visited.includes(node.id);
                const parent = currentStep.previous[node.id];

                return (
                  <div
                    key={node.id}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-between ${
                      isVisited
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : dist !== Infinity
                        ? 'bg-amber-950/30 border-amber-600/40 text-amber-200'
                        : 'bg-[#07080f] border-[#181d30] text-zinc-600'
                    }`}
                  >
                    <div className="text-[10px] text-zinc-400 font-bold">{node.id}</div>
                    <div className="text-sm font-bold my-0.5">
                      {dist === Infinity ? '∞' : dist}
                    </div>
                    <div className="text-[9px] text-zinc-500">
                      via {parent || 'null'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Real Life Scenario */}
      <RealLifeScenario
        topicName="ডাইকস্ট্রা অ্যালগরিদম (Dijkstra's Shortest Path)"
        scenarios={[
          {
            title: "১. Google Maps ও জিপিএস নেভিগেশন (Fastest Driving Route)",
            subtitle: "ট্রাফিক জ্যাম ও দূরত্বের সমন্বয়ে দ্রুততম পথ",
            analogy: "শহরে গন্তব্যে পৌঁছানোর একাধিক রাস্তা থাকে। কিছু রাস্তা সোজা হলেও জ্যাম বেশি (ওজন বেশি), কিছু রাস্তা সামান্য বাঁকা হলেও দ্রুত যাওয়া যায়।",
            whyItFits: "ডাইকস্ট্রা প্রতি মোড়ে এজ রিল্যাক্সেশন করে সর্বনিম্ন সময়ের পথটি বের করে। ঋণাত্মক সময় সম্ভব নয় বিধায় ডাইকস্ট্রার শর্ত পূরণ হয়।",
            badge: "GPS Routing",
            accentColor: "amber",
            visualTag: "Min-Heap"
          },
          {
            title: "২. ইন্টারনেট রাউটার প্যাকেট রাউটিং (OSPF Protocol)",
            subtitle: "সবচেয়ে কম লেটেন্সিতে সার্ভারে ডেটা ডেলিভারি",
            analogy: "একটি মেসেজ আমেরিকা থেকে বাংলাদেশে আসার সময় একাধিক সাবমেরিন ক্যাবল ও স্যাটেলাইট নোড পার হয়।",
            whyItFits: "ইন্টারনেটের OSPF রাউটিং প্রোটোকল ডাইকস্ট্রা অ্যালগরিদম ব্যবহার করে সর্বনিম্ন পিং/লেটেন্সির নেটওয়ার্ক পথ বেছে নেয়।",
            badge: "Packet Routing",
            accentColor: "emerald",
            visualTag: "O((V+E)logV)"
          }
        ]}
      />
    </div>
  );
}
