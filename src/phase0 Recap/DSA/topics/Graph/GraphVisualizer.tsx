'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Node,
  Edge,
} from '@xyflow/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Layers,
  ShieldAlert,
  CheckCircle2,
  ListOrdered,
  AlertTriangle,
  GitBranch,
  Workflow,
  Info
} from 'lucide-react';
import {
  NodeColor,
  DFSStep,
  KahnStep,
  generateDfsSteps,
  generateKahnSteps,
} from './graphAlgorithms';

interface Preset {
  id: string;
  name: string;
  badge: string;
  badgeType: 'emerald' | 'rose' | 'sky';
  recommendedAlgo: 'dfs' | 'kahn';
  summary: string;
  purpose: string;
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: { source: string; target: string }[];
}

const PRESETS: Preset[] = [
  {
    id: 'pipeline',
    name: '১. সফটওয়্যার রিলিজ পাইপলাইন (Valid DAG)',
    badge: 'বৈধ DAG • চক্রহীন',
    badgeType: 'emerald',
    recommendedAlgo: 'kahn',
    summary: 'Lint ➔ Unit Test ➔ Integration Test ➔ Build ➔ Deploy ক্রম।',
    purpose: 'এতে কোনো চক্র নেই। কান-এর অ্যালগরিদম প্রতিটি পূর্বশর্ত মেনে নিখুঁত এক্সেকিউশন অর্ডার বের করে।',
    nodes: [
      { id: 'A_Lint', label: 'A: Lint Code', x: 50, y: 60 },
      { id: 'B_TestUnit', label: 'B: Unit Tests', x: 50, y: 180 },
      { id: 'C_TestIntegration', label: 'C: Integration Tests', x: 280, y: 180 },
      { id: 'D_Build', label: 'D: Build Container', x: 520, y: 120 },
      { id: 'E_Deploy', label: 'E: Deploy Staging', x: 760, y: 120 },
    ],
    edges: [
      { source: 'A_Lint', target: 'D_Build' },
      { source: 'B_TestUnit', target: 'C_TestIntegration' },
      { source: 'C_TestIntegration', target: 'D_Build' },
      { source: 'D_Build', target: 'E_Deploy' },
    ],
  },
  {
    id: 'deadlock',
    name: '২. সার্কুলার ডেডলক (Deadlock Cycle)',
    badge: 'ডেডলক সাইকেল • লুপ ঝুঁকি',
    badgeType: 'rose',
    recommendedAlgo: 'dfs',
    summary: '৪টি AI টাস্ক একে অপরের ওপর চক্রাকারে আটকে আছে (Circular Wait)।',
    purpose: '৩-কালার DFS দিয়ে ট্রাভার্সাল চলাকালে GRAY নোডে ব্যাক-এজ পেলেই সাথে সাথে লাল ডেডলক সাইকেল শনাক্ত হবে।',
    nodes: [
      { id: 'Task_1', label: 'Task 1: Fetch Prompts', x: 80, y: 80 },
      { id: 'Task_2', label: 'Task 2: Embed Chunks', x: 340, y: 80 },
      { id: 'Task_3', label: 'Task 3: Rerank Results', x: 340, y: 220 },
      { id: 'Task_4', label: 'Task 4: Synthesize Output', x: 80, y: 220 },
    ],
    edges: [
      { source: 'Task_1', target: 'Task_2' },
      { source: 'Task_2', target: 'Task_3' },
      { source: 'Task_3', target: 'Task_4' },
      { source: 'Task_4', target: 'Task_1' }, // Deadlock cycle!
    ],
  },
  {
    id: 'diamond',
    name: '৩. ডায়মন্ড কনকারেন্সি (Diamond DAG)',
    badge: 'প্যারালাল ব্রাঞ্চিং • কনকারেন্ট',
    badgeType: 'sky',
    recommendedAlgo: 'kahn',
    summary: 'একটি টাস্ক থেকে দুটি প্যারালাল ওয়ার্কার চালু হয়ে শেষে জয়ন হওয়া।',
    purpose: 'একসাথে একাধিক নোডের In-Degree 0 হওয়া এবং স্বাধীন টাস্কগুলো সমান্তরালে এক্সেকিউট হওয়া পর্যবেক্ষণ করা।',
    nodes: [
      { id: 'Start', label: 'Start: Ingest Document', x: 60, y: 140 },
      { id: 'Branch_A', label: 'Worker A: Extract Entities', x: 320, y: 60 },
      { id: 'Branch_B', label: 'Worker B: Generate Summary', x: 320, y: 220 },
      { id: 'Join', label: 'Join: Commit to Vector DB', x: 600, y: 140 },
    ],
    edges: [
      { source: 'Start', target: 'Branch_A' },
      { source: 'Start', target: 'Branch_B' },
      { source: 'Branch_A', target: 'Join' },
      { source: 'Branch_B', target: 'Join' },
    ],
  },
];

export default function GraphVisualizer() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [algorithm, setAlgorithm] = useState<'dfs' | 'kahn'>('kahn');
  // 0.5x fixed slow comfortable playback speed (1200ms)
  const speedMs = 1200;
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const preset = PRESETS[selectedPresetIndex];
  const nodeIds = useMemo(() => preset.nodes.map((n) => n.id), [preset]);
  const adjacency = useMemo(() => {
    const adj: Record<string, string[]> = {};
    for (const n of preset.nodes) adj[n.id] = [];
    for (const e of preset.edges) {
      if (!adj[e.source]) adj[e.source] = [];
      adj[e.source].push(e.target);
    }
    return adj;
  }, [preset]);

  // Pre-generate all steps for the chosen algorithm and preset
  const allSteps = useMemo(() => {
    if (algorithm === 'dfs') {
      return Array.from(generateDfsSteps(nodeIds, adjacency));
    } else {
      return Array.from(generateKahnSteps(nodeIds, adjacency));
    }
  }, [algorithm, nodeIds, adjacency]);

  const currentStep = allSteps[stepIndex] || allSteps[0];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < allSteps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, speedMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, allSteps.length, speedMs]);

  // Reset step index when preset or algorithm changes
  useEffect(() => {
    setIsPlaying(false);
    setStepIndex(0);
  }, [selectedPresetIndex, algorithm]);

  // Handle Preset Selection with auto-recommended algorithm
  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setAlgorithm(PRESETS[idx].recommendedAlgo);
  };

  // Map algorithm state to React Flow Nodes & Edges
  const rfNodes: Node[] = useMemo(() => {
    return preset.nodes.map((n) => {
      let bg = '#0f172a';
      let border = '#334155';
      let statusBadge = '';

      if (algorithm === 'dfs') {
        const dfsStep = currentStep as DFSStep;
        const color = dfsStep?.colors?.[n.id] ?? NodeColor.WHITE;
        const isCurrent = dfsStep?.currentNode === n.id;

        if (dfsStep?.cyclePath?.includes(n.id)) {
          bg = '#450a0a';
          border = '#ef4444';
          statusBadge = 'CYCLE (সাইকেল)';
        } else if (color === NodeColor.GRAY) {
          bg = '#451a03';
          border = '#f59e0b';
          statusBadge = isCurrent ? 'ACTIVE (বর্তমান)' : 'GRAY (স্ট্যাকে আছে)';
        } else if (color === NodeColor.BLACK) {
          bg = '#064e3b';
          border = '#10b981';
          statusBadge = 'BLACK (সম্পন্ন)';
        } else {
          statusBadge = 'WHITE (আনভিজিটেড)';
        }
      } else {
        const kahnStep = currentStep as KahnStep;
        const inDeg = kahnStep?.inDegrees?.[n.id] ?? 0;
        const inQueue = kahnStep?.queue?.includes(n.id);
        const isProcessed = kahnStep?.processedNodes?.includes(n.id);
        const isCurrent = kahnStep?.currentNode === n.id;

        if (isCurrent) {
          bg = '#1e1b4b';
          border = '#818cf8';
          statusBadge = 'PROCESSING';
        } else if (isProcessed) {
          bg = '#064e3b';
          border = '#10b981';
          statusBadge = 'COMPLETED';
        } else if (inQueue) {
          bg = '#0c4a6e';
          border = '#38bdf8';
          statusBadge = 'QUEUED (deg=0)';
        } else {
          statusBadge = `in-deg: ${inDeg}`;
        }
      }

      return {
        id: n.id,
        position: { x: n.x, y: n.y },
        data: {
          label: (
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs text-slate-100">{n.label}</span>
              <span className="text-[10px] font-mono text-slate-400">{statusBadge}</span>
            </div>
          ),
        },
        style: {
          background: bg,
          border: `1.5px solid ${border}`,
          borderRadius: '8px',
          padding: '8px 12px',
          color: '#f8fafc',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        },
      };
    });
  }, [preset.nodes, currentStep, algorithm]);

  const rfEdges: Edge[] = useMemo(() => {
    return preset.edges.map((e, idx) => {
      const isTargetEdge =
        currentStep?.currentNode === e.source &&
        currentStep?.targetNeighbor === e.target;

      const isCycleEdge =
        algorithm === 'dfs' &&
        (currentStep as DFSStep)?.cyclePath &&
        (currentStep as DFSStep)?.targetNeighbor === e.target &&
        currentStep?.currentNode === e.source;

      return {
        id: `e-${idx}`,
        source: e.source,
        target: e.target,
        animated: isTargetEdge || isCycleEdge,
        style: {
          stroke: isCycleEdge ? '#ef4444' : isTargetEdge ? '#38bdf8' : '#475569',
          strokeWidth: isTargetEdge || isCycleEdge ? 2.5 : 1.5,
        },
      };
    });
  }, [preset.edges, currentStep, algorithm]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. SCENARIO SELECTOR CARDS (Clear, Self-Explanatory) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-1.5">
            <Workflow className="w-3.5 h-3.5 text-indigo-400" />
            <span>সিমুলেশন সিনারিও নির্বাচন করুন (Select Test Scenario):</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-400">ডিফল্ট স্পিড: 0.5x (Slow Smooth)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((p, idx) => {
            const isSelected = selectedPresetIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(idx)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#15182d] border-indigo-500 shadow-lg shadow-indigo-500/15'
                    : 'bg-[#0f111a] border-[#1d2235] hover:border-[#2b334d] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-xs font-bold leading-snug ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {p.name}
                  </h4>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full shrink-0 font-bold border ${
                      p.badgeType === 'emerald'
                        ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300'
                        : p.badgeType === 'rose'
                        ? 'bg-rose-950/80 border-rose-700/80 text-rose-300'
                        : 'bg-sky-950/80 border-sky-700/80 text-sky-300'
                    }`}
                  >
                    {p.badge}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-300 leading-relaxed font-sans line-clamp-2">
                  {p.summary}
                </p>

                <div className="pt-2 border-t border-[#1e243a] text-[10px] font-mono text-indigo-300 flex items-center justify-between">
                  <span>উদ্দেশ্য: {p.badgeType === 'rose' ? 'সাইকেল ধরা' : 'টপোলজিক্যাল রান'}</span>
                  <span className={isSelected ? 'text-amber-400 font-bold' : 'text-zinc-500'}>
                    {isSelected ? '✓ নির্বাচিত' : 'ক্লিক করুন'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top Bar: Algorithm Toggle & Scenario Context Banner */}
      <div className="bg-[#0f111a] p-3.5 rounded-2xl border border-[#1e2233] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-zinc-300">অ্যালগরিদম ইঞ্জিন:</span>
          <div className="flex bg-[#090a10] border border-[#1e2233] rounded-xl p-0.5 text-xs font-mono">
            <button
              onClick={() => setAlgorithm('dfs')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                algorithm === 'dfs'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ৩-কালার DFS (সাইকেল চেক)
            </button>
            <button
              onClick={() => setAlgorithm('kahn')}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                algorithm === 'kahn'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কান-এর টপোলজিক্যাল সর্ট (Kahn)
            </button>
          </div>
        </div>

        {/* Informational Context Tag */}
        <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{preset.purpose}</span>
        </div>
      </div>

      {/* 3. Main Simulation Viewport with Integrated Top-Left Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas Area with Floating Top-Left Controls */}
        <div className="lg:col-span-2 h-[480px] rounded-2xl border border-[#1e2233] bg-[#080911] overflow-hidden relative shadow-inner">
          {/* Integrated Playback Controls (Floating in Top-Left Corner) */}
          <div className="absolute top-3 left-3 z-10 bg-[#0d101e]/90 backdrop-blur-md border border-[#212742] p-1.5 rounded-xl flex items-center gap-2 shadow-2xl">
            {/* Step Back */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={stepIndex === 0 || isPlaying}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
              title="এক ধাপ পেছনে যান"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={stepIndex >= allSteps.length - 1}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs font-mono transition-all cursor-pointer shadow ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950'
              } disabled:opacity-30`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>

            {/* Step Forward */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIndex((prev) => Math.min(allSteps.length - 1, prev + 1));
              }}
              disabled={stepIndex >= allSteps.length - 1 || isPlaying}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
              title="এক ধাপ সামনে যান"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIndex(0);
              }}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
              title="রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Step Counter */}
            <div className="text-[11px] font-mono text-zinc-400 px-1 border-l border-[#212742]">
              ধাপ <span className="text-amber-400 font-bold">{stepIndex + 1}</span> / {allSteps.length}
            </div>
          </div>

          <ReactFlow
            nodes={rfNodes}
            edges={rfEdges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
          >
            <Background color="#161b2c" gap={20} />
            <Controls className="bg-[#12141f] border-[#1e2233] text-zinc-200" />
          </ReactFlow>

          {/* Current Step Explanation Bottom Bar */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#0d101e]/95 backdrop-blur border border-[#1f2642] p-3 rounded-xl shadow-2xl flex items-start gap-2.5">
            <div className="mt-0.5">
              {algorithm === 'dfs' && (currentStep as DFSStep)?.cyclePath ? (
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
            </div>
            <div className="flex-1 text-xs">
              <span className="font-semibold text-zinc-200 block mb-0.5 font-mono">
                {currentStep?.type || 'STEP'}
              </span>
              <p className="text-zinc-300 leading-relaxed font-sans">{currentStep?.explanation}</p>
            </div>
          </div>
        </div>

        {/* Algorithm State Inspector (Live Memory: Call Stack or Kahn Queue) */}
        <div className="flex flex-col h-[480px] rounded-2xl border border-[#1e2233] bg-[#0f111a] p-4">
          <div className="text-xs font-mono text-zinc-400 pb-3 border-b border-[#1e2233] flex justify-between items-center">
            <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-indigo-400" />
              {algorithm === 'dfs' ? 'DFS কল স্ট্যাক (Call Stack O(V))' : "কান-এর কিউ ও ইন-ডিগ্রি"}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">লাইভ মেমরি</span>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {algorithm === 'dfs' ? (
              <div>
                <div className="text-[11px] text-zinc-400 font-medium mb-2 font-mono">
                  অ্যাক্টিভ কল স্ট্যাক (Top to Bottom):
                </div>
                {((currentStep as DFSStep)?.callStack || []).length === 0 ? (
                  <div className="p-3 rounded-xl bg-[#090b14] border border-[#1e2233] text-xs text-zinc-500 italic">
                    স্ট্যাক খালি রয়েছে।
                  </div>
                ) : (
                  <div className="flex flex-col-reverse gap-1.5">
                    {((currentStep as DFSStep)?.callStack || []).map((frame, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-800/80 font-mono text-xs text-amber-300 flex items-center justify-between"
                      >
                        <span className="font-bold">dfs(&quot;{frame}&quot;)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-200">
                          GRAY (প্রসেসিংরত)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* FIFO Queue */}
                <div>
                  <div className="text-[11px] text-zinc-400 font-medium mb-1.5 font-mono">
                    রেডি কিউ (ইন-ডিগ্রি == ০):
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#090b14] border border-[#1e2233] min-h-[44px] items-center">
                    {((currentStep as KahnStep)?.queue || []).length === 0 ? (
                      <span className="text-xs text-zinc-500 italic">কিউ খালি রয়েছে</span>
                    ) : (
                      ((currentStep as KahnStep)?.queue || []).map((q, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-sky-950 border border-sky-800 font-mono text-xs text-sky-300 font-bold"
                        >
                          {q}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* In-Degree Table */}
                <div>
                  <div className="text-[11px] text-zinc-400 font-medium mb-1.5 font-mono">
                    ইন-ডিগ্রি গণনা (In-Degree Counts):
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries((currentStep as KahnStep)?.inDegrees || {}).map(([node, deg]) => (
                      <div
                        key={node}
                        className={`p-2 rounded-xl border text-xs font-mono flex items-center justify-between ${
                          deg === 0
                            ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-300 font-bold'
                            : 'bg-[#090a10] border-[#1e2233] text-zinc-300'
                        }`}
                      >
                        <span className="truncate max-w-[90px]">{node}</span>
                        <span className="font-bold px-1.5 py-0.5 rounded bg-[#12141f] border border-[#1e2233]">
                          {deg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output Topological Order */}
                <div>
                  <div className="text-[11px] text-zinc-400 font-medium mb-1.5 font-mono">
                    টপোলজিক্যাল এক্সেকিউশন ক্রম:
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-900/60 text-xs font-mono text-indigo-300 leading-relaxed">
                    {((currentStep as KahnStep)?.topologicalOrder || []).length === 0
                      ? 'এখনও কোনো নোড সম্পন্ন হয়নি।'
                      : ((currentStep as KahnStep)?.topologicalOrder || []).join(' ➔ ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#1e2233] text-[11px] text-zinc-400 font-sans">
            {algorithm === 'dfs'
              ? '৩-কালার DFS দিয়ে রিকর্শন স্ট্যাকের পূর্বপুরুষ (GRAY) নোডে ব্যাক-এজ খুঁজে সাইকেল শনাক্ত করা হয়।'
              : "কান-এর অ্যালগরিদমে 0 ইনকামিং এজ যুক্ত নোডগুলো কিউ থেকে বের করে সুশৃঙ্খল এক্সেকিউশন অর্ডার তৈরি করা হয়।"}
          </div>
        </div>
      </div>
    </div>
  );
}
