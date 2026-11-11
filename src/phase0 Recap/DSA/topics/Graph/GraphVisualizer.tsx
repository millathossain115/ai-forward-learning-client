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
  ListOrdered
} from 'lucide-react';
import {
  NodeColor,
  DFSStep,
  KahnStep,
  generateDfsSteps,
  generateKahnSteps,
} from './graphAlgorithms';

interface Preset {
  name: string;
  nodes: { id: string; label: string; x: number; y: number }[];
  edges: { source: string; target: string }[];
}

const PRESETS: Preset[] = [
  {
    name: '1. Standard Task Pipeline (Valid DAG)',
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
    name: '2. Cyclic Deadlock (Detect 3-Color Cycle)',
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
    name: '3. Diamond Concurrency DAG',
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
  const [algorithm, setAlgorithm] = useState<'dfs' | 'kahn'>('dfs');
  const [speedMs, setSpeedMs] = useState(800);
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
          statusBadge = 'CYCLE';
        } else if (color === NodeColor.GRAY) {
          bg = '#451a03';
          border = '#f59e0b';
          statusBadge = isCurrent ? 'ACTIVE (Visiting)' : 'GRAY (Stack)';
        } else if (color === NodeColor.BLACK) {
          bg = '#064e3b';
          border = '#10b981';
          statusBadge = 'BLACK (Done)';
        } else {
          statusBadge = 'WHITE (Unvisited)';
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
    <div className="flex flex-col gap-5 w-full">
      {/* Configuration & Preset Selection */}
      <div className="bg-[#0f111a] p-4 rounded-xl border border-[#1e2233] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-sm text-zinc-100">Interactive DAG Simulation Engine</h3>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              Interactive
            </span>
          </div>

          <div className="flex bg-[#090a10] border border-[#1e2233] rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setAlgorithm('dfs')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                algorithm === 'dfs' ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              3-Color DFS (Cycle Detection)
            </button>
            <button
              onClick={() => setAlgorithm('kahn')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                algorithm === 'kahn' ? 'bg-sky-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Kahn&apos;s Algorithm (Topological Sort)
            </button>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium">Scenario:</span>
          <select
            value={selectedPresetIndex}
            onChange={(e) => setSelectedPresetIndex(Number(e.target.value))}
            className="bg-[#090a10] border border-[#1e2233] text-xs text-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-mono"
          >
            {PRESETS.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Playback Controls Bar */}
      <div className="bg-[#090a10] p-3.5 rounded-xl border border-[#1e2233] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={stepIndex === 0 || isPlaying}
            className="p-2 rounded-lg bg-[#12141f] hover:bg-[#1a1d2e] disabled:opacity-40 text-zinc-300 border border-[#1e2233]"
            title="Step Back"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium text-xs text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Auto-Play
              </>
            )}
          </button>

          <button
            onClick={() => setStepIndex((prev) => Math.min(allSteps.length - 1, prev + 1))}
            disabled={stepIndex >= allSteps.length - 1 || isPlaying}
            className="p-2 rounded-lg bg-[#12141f] hover:bg-[#1a1d2e] disabled:opacity-40 text-zinc-300 border border-[#1e2233]"
            title="Step Forward"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(0);
            }}
            className="p-2 rounded-lg bg-[#12141f] hover:bg-[#1a1d2e] text-zinc-400 hover:text-zinc-200 border border-[#1e2233] ml-1"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="text-xs font-mono text-zinc-400 ml-3">
            Step <span className="text-indigo-400 font-bold">{stepIndex + 1}</span> of {allSteps.length}
          </div>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400">Speed:</span>
          {[
            { label: '0.5x', ms: 1400 },
            { label: '1x', ms: 800 },
            { label: '2x', ms: 400 },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setSpeedMs(s.ms)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                speedMs === s.ms
                  ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                  : 'bg-[#12141f] text-zinc-400 hover:text-zinc-200 border border-[#1e2233]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Viewport & Call Stack / Queue Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas Area */}
        <div className="lg:col-span-2 h-[460px] rounded-xl border border-[#1e2233] bg-[#090a10] overflow-hidden relative">
          <ReactFlow
            nodes={rfNodes}
            edges={rfEdges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
          >
            <Background color="#1e2233" gap={18} />
            <Controls className="bg-[#12141f] border-[#1e2233] text-zinc-200" />
          </ReactFlow>

          {/* Current Step Explanation Pill */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#0f111a]/95 backdrop-blur border border-[#1e2233] p-3 rounded-xl shadow-2xl flex items-start gap-2.5">
            <div className="mt-0.5">
              {algorithm === 'dfs' && (currentStep as DFSStep)?.cyclePath ? (
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              )}
            </div>
            <div className="flex-1 text-xs">
              <span className="font-semibold text-zinc-200 block mb-0.5">
                {currentStep?.type || 'STEP'}
              </span>
              <p className="text-zinc-300 leading-relaxed">{currentStep?.explanation}</p>
            </div>
          </div>
        </div>

        {/* Algorithm State Inspector (Recursion Stack or Kahn Queue) */}
        <div className="flex flex-col h-[460px] rounded-xl border border-[#1e2233] bg-[#0f111a] p-4">
          <div className="text-xs font-mono text-zinc-400 pb-3 border-b border-[#1e2233] flex justify-between items-center">
            <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4 text-indigo-400" />
              {algorithm === 'dfs' ? 'Recursion Call Stack O(V)' : "Kahn's Queue & In-Degrees"}
            </span>
            <span className="text-[10px] text-indigo-400 font-mono">Live Memory</span>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-3">
            {algorithm === 'dfs' ? (
              <div>
                <div className="text-[11px] text-zinc-400 font-medium mb-2">
                  Active Call Stack (Top to Bottom):
                </div>
                {((currentStep as DFSStep)?.callStack || []).length === 0 ? (
                  <div className="p-3 rounded-lg bg-[#090a10] border border-[#1e2233] text-xs text-zinc-500 italic">
                    Stack is empty.
                  </div>
                ) : (
                  <div className="flex flex-col-reverse gap-1.5">
                    {((currentStep as DFSStep)?.callStack || []).map((frame, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-lg bg-amber-950/30 border border-amber-800/80 font-mono text-xs text-amber-300 flex items-center justify-between"
                      >
                        <span className="font-bold">dfs(&quot;{frame}&quot;)</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-200">
                          GRAY
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
                  <div className="text-[11px] text-zinc-400 font-medium mb-1.5">
                    Ready Queue (in_degree == 0):
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-[#090a10] border border-[#1e2233] min-h-[44px] items-center">
                    {((currentStep as KahnStep)?.queue || []).length === 0 ? (
                      <span className="text-xs text-zinc-500 italic">Queue is empty</span>
                    ) : (
                      ((currentStep as KahnStep)?.queue || []).map((q, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-indigo-950 border border-indigo-800 font-mono text-xs text-indigo-300"
                        >
                          {q}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* In-Degree Table */}
                <div>
                  <div className="text-[11px] text-zinc-400 font-medium mb-1.5">
                    In-Degree Counts:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries((currentStep as KahnStep)?.inDegrees || {}).map(([node, deg]) => (
                      <div
                        key={node}
                        className={`p-2 rounded-lg border text-xs font-mono flex items-center justify-between ${
                          deg === 0
                            ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-300'
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
                  <div className="text-[11px] text-zinc-400 font-medium mb-1.5">
                    Topological Execution Order:
                  </div>
                  <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-900/60 text-xs font-mono text-indigo-300 leading-relaxed">
                    {((currentStep as KahnStep)?.topologicalOrder || []).length === 0
                      ? 'No nodes resolved yet.'
                      : ((currentStep as KahnStep)?.topologicalOrder || []).join(' ➔ ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#1e2233] text-[11px] text-zinc-400">
            {algorithm === 'dfs'
              ? '3-Color DFS detects cycles in O(V + E) time by tracking back-edges to gray ancestors.'
              : "Kahn's algorithm resolves task dependencies in O(V + E) time by counting prerequisite incoming edges."}
          </div>
        </div>
      </div>
    </div>
  );
}

