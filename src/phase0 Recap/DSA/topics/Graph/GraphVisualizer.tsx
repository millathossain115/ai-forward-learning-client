'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Node, Edge } from '@xyflow/react';
import { Info } from 'lucide-react';
import {
  NodeColor,
  DFSStep,
  KahnStep,
  generateDfsSteps,
  generateKahnSteps,
} from './graphAlgorithms';
import { PRESETS } from './dagVisualizerTypes';
import GraphScenarioSelector from './components/GraphScenarioSelector';
import GraphStateInspector from './components/GraphStateInspector';
import GraphFlowCanvas from './components/GraphFlowCanvas';

export default function GraphVisualizer() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [algorithm, setAlgorithm] = useState<'dfs' | 'kahn'>('kahn');
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
      {/* 1. SCENARIO SELECTOR CARDS */}
      <GraphScenarioSelector
        presets={PRESETS}
        selectedPresetIndex={selectedPresetIndex}
        onSelectPreset={handleSelectPreset}
      />

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

      {/* 3. Main Simulation Viewport & State Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GraphFlowCanvas
          rfNodes={rfNodes}
          rfEdges={rfEdges}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          stepIndex={stepIndex}
          setStepIndex={setStepIndex}
          totalSteps={allSteps.length}
          algorithm={algorithm}
          currentStep={currentStep}
        />

        <GraphStateInspector
          algorithm={algorithm}
          currentStep={currentStep}
        />
      </div>
    </div>
  );
}
