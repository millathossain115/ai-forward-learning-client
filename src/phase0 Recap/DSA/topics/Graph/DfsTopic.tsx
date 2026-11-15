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
  Layers,
  Network,
  Share2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  Cpu,
  GitBranch,
  ShieldAlert,
  Boxes,
  Terminal,
  FileCode2
} from 'lucide-react';

interface DfsNode {
  id: string;
  x: number;
  y: number;
}

interface DfsEdge {
  u: string;
  v: string;
}

interface DfsStep {
  stepIndex: number;
  action: 'START' | 'VISIT' | 'EXPLORE_EDGE' | 'BACKTRACK' | 'COMPLETE';
  currentNode: string;
  targetNeighbor?: string;
  callStack: string[];
  visitedNodes: string[];
  visitedEdges: string[]; // "u-v"
  activeEdge?: string;
  title: string;
  actionTag: string;
  desc: string;
}

// 7-Node Graph Layout
const GRAPH_NODES: DfsNode[] = [
  { id: 'A', x: 120, y: 160 },
  { id: 'B', x: 260, y: 70 },
  { id: 'C', x: 260, y: 250 },
  { id: 'D', x: 400, y: 70 },
  { id: 'E', x: 400, y: 250 },
  { id: 'F', x: 540, y: 110 },
  { id: 'G', x: 540, y: 220 }
];

const GRAPH_EDGES: DfsEdge[] = [
  { u: 'A', v: 'B' },
  { u: 'A', v: 'C' },
  { u: 'B', v: 'D' },
  { u: 'B', v: 'E' },
  { u: 'C', v: 'E' },
  { u: 'D', v: 'F' },
  { u: 'E', v: 'G' },
  { u: 'F', v: 'G' }
];

const ADJACENCY: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['E'],
  D: ['F'],
  E: ['G'],
  F: ['G'],
  G: []
};

export default function DfsTopic() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMode, setSpeedMode] = useState<'slow' | 'normal'>('slow');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Precompute deterministic DFS simulation steps starting from A
  const steps = useMemo<DfsStep[]>(() => {
    const list: DfsStep[] = [];
    const visited = new Set<string>();
    const stack: string[] = [];
    const traversedEdges = new Set<string>();

    list.push({
      stepIndex: 0,
      action: 'START',
      currentNode: 'A',
      callStack: ['A'],
      visitedNodes: ['A'],
      visitedEdges: [],
      title: 'শুরু: সোর্স নোড A তে DFS শুরু',
      actionTag: '1. START DFS(A)',
      desc: 'DFS শুরু হলো নোড A থেকে। A নোডটি কল স্ট্যাকে (Call Stack) পুশ করা হলো এবং ভিজিটেড হিসেবে চিহ্নিত হলো।'
    });
    visited.add('A');
    stack.push('A');

    function dfs(node: string) {
      const neighbors = ADJACENCY[node] || [];
      for (const neighbor of neighbors) {
        const edgeKey = `${node}-${neighbor}`;
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
          traversedEdges.add(edgeKey);

          list.push({
            stepIndex: list.length,
            action: 'VISIT',
            currentNode: neighbor,
            targetNeighbor: neighbor,
            callStack: [...stack],
            visitedNodes: Array.from(visited),
            visitedEdges: Array.from(traversedEdges),
            activeEdge: edgeKey,
            title: `গভীরে প্রবেশ ➔ ${node} থেকে ${neighbor}`,
            actionTag: `2. DIVE DFS(${neighbor})`,
            desc: `এজ (${node} ➔ ${neighbor}) ধরে নিচে নামা হলো। ${neighbor} কে স্ট্যাকে পুশ করে আরও গভীরে যাওয়া হচ্ছে।`
          });

          dfs(neighbor);

          // Backtrack step
          stack.pop();
          list.push({
            stepIndex: list.length,
            action: 'BACKTRACK',
            currentNode: node,
            targetNeighbor: neighbor,
            callStack: [...stack],
            visitedNodes: Array.from(visited),
            visitedEdges: Array.from(traversedEdges),
            activeEdge: edgeKey,
            title: `ব্যাকট্র্যাক ↩: ${neighbor} থেকে ${node}-এ ফেরা`,
            actionTag: `3. BACKTRACK TO ${node}`,
            desc: `${neighbor}-এর সব শাখা ঘোরা শেষ! স্ট্যাক থেকে পপ করে পূর্বের নোড ${node}-এ ফিরে আসা হলো।`
          });
        } else {
          list.push({
            stepIndex: list.length,
            action: 'EXPLORE_EDGE',
            currentNode: node,
            targetNeighbor: neighbor,
            callStack: [...stack],
            visitedNodes: Array.from(visited),
            visitedEdges: Array.from(traversedEdges),
            activeEdge: edgeKey,
            title: `সংলগ্ন নোড চেক: (${node} ➔ ${neighbor})`,
            actionTag: 'ALREADY VISITED',
            desc: `নোড ${neighbor} ইতিমধ্যে ভিজিট করা হয়েছে। তাই পুনরায় কল না করে পরবর্তী প্রতিবেশী চেক করা হচ্ছে।`
          });
        }
      }
    }

    dfs('A');

    list.push({
      stepIndex: list.length,
      action: 'COMPLETE',
      currentNode: 'A',
      callStack: [],
      visitedNodes: Array.from(visited),
      visitedEdges: Array.from(traversedEdges),
      title: 'DFS ট্রাভার্সাল সম্পূর্ণ! 🎉',
      actionTag: '✅ COMPLETE',
      desc: 'গ্রাফের সব পৌঁছানোযোগ্য নোড গভীরে গিয়ে সফলভাবে এক্সপ্লোর করা হয়েছে। কল স্ট্যাক খালি।'
    });

    return list;
  }, []);

  const totalSteps = steps.length;
  const isAtEnd = currentStepIdx >= totalSteps - 1;
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = speedMode === 'slow' ? 2200 : 1200;
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162d] via-[#0d1021] to-[#070812] border border-[#232948] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 font-bold">
              Topic 11.1 • Graph Traversal
            </span>
            <span className="text-xs text-zinc-500 font-mono">Depth First Search • Recursion & Call Stack</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            ডেপথ-ফার্স্ট সার্চ: DFS ট্রাভার্সাল, রিকার্শন ও ব্যাকট্র্যাকিং
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            DFS একটি <b>রিকার্সন-ভিত্তিক (Recursion-based)</b> সার্চ মেথড যা LIFO কল স্ট্যাক ব্যবহার করে। এটি সোর্স নোড থেকে শুরু করে একটি শাখা ধরে যতদূর সম্ভব <b>গভীরে (Deepest leaf/Dead-end)</b> পৌঁছায়। সামনে এগোনোর পথ শেষ হলে <b>ব্যাকট্র্যাক (Backtrack)</b> করে পূর্ববর্তী নোডে ফিরে বিকল্প শাখা অনুসন্ধান করে।
          </p>
        </div>
      </div>

      {/* 2. Three High-Impact Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">মেমরি স্ট্রাকচার (Data Structure)</span>
          <div className="text-base font-bold text-indigo-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>LIFO Call Stack</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            রিকার্শন বা এক্সপ্লিসিট স্ট্যাক দিয়ে শেষ প্রবেশকারী শাখা আগে প্রসেস হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">টাইম ও স্পেস জটিলতা (Complexity)</span>
          <div className="text-base font-bold text-emerald-400">
            Time: O(V + E) • Space: O(V)
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            প্রতিটি শীর্ষবিন্দু (V) ও ধার (E) ঠিক একবার করে স্ক্যান করা হয়।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c0e18] border border-[#1f2642] space-y-1.5 shadow">
          <span className="text-zinc-400 text-[11px]">ব্যবহার ক্ষেত্র (Use Cases)</span>
          <div className="text-base font-bold text-amber-300">
            সাইকেল সন্ধান, টপোলজিক্যাল সর্ট
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            Maze সলভার, কম্পোনেন্ট কানেক্টিভিটি এবং ডেডলক ডিটেকশন।
          </p>
        </div>
      </div>

      {/* 3. Studio Mode Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-400" />
            <span>DFS গ্রাফ অ্যানিমেশন</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
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
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
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
                <span>Play DFS</span>
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
                  ? 'bg-indigo-600/60 text-indigo-200 font-bold border border-indigo-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              0.5x
            </button>
            <button
              onClick={() => setSpeedMode('normal')}
              className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                speedMode === 'normal'
                  ? 'bg-indigo-600/60 text-indigo-200 font-bold border border-indigo-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              1.0x
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-indigo-300 font-bold">{currentStepIdx + 1}</span> / {totalSteps}
          </div>
        </div>
      </div>

      {/* 4. MAIN SIMULATION ARENA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: SVG Graph Canvas (65%) */}
        <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 flex flex-col justify-between min-h-[460px] shadow-2xl relative space-y-4">
          <div className="w-full flex items-center justify-center overflow-x-auto py-2 bg-[#060810] rounded-2xl border border-[#1b2238]">
            <svg viewBox="0 0 660 320" className="w-full h-auto max-h-[360px] select-none">
              <defs>
                <marker
                  id="dfs-arrow-gray"
                  markerWidth="8"
                  markerHeight="8"
                  refX="18"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="#334155" />
                </marker>
                <marker
                  id="dfs-arrow-active"
                  markerWidth="8"
                  markerHeight="8"
                  refX="18"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="#818cf8" />
                </marker>
                <marker
                  id="dfs-arrow-visited"
                  markerWidth="8"
                  markerHeight="8"
                  refX="18"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>

              {/* Edges */}
              {GRAPH_EDGES.map(edge => {
                const uNode = GRAPH_NODES.find(n => n.id === edge.u)!;
                const vNode = GRAPH_NODES.find(n => n.id === edge.v)!;
                const edgeKey = `${edge.u}-${edge.v}`;
                const isActive = currentStep.activeEdge === edgeKey;
                const isVisited = currentStep.visitedEdges.includes(edgeKey);

                return (
                  <line
                    key={edgeKey}
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    stroke={isActive ? '#818cf8' : isVisited ? '#10b981' : '#1e293b'}
                    strokeWidth={isActive ? 3.5 : isVisited ? 2.5 : 1.5}
                    markerEnd={
                      isActive
                        ? 'url(#dfs-arrow-active)'
                        : isVisited
                        ? 'url(#dfs-arrow-visited)'
                        : 'url(#dfs-arrow-gray)'
                    }
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Nodes */}
              {GRAPH_NODES.map(node => {
                const isCurrent = currentStep.currentNode === node.id;
                const inStack = currentStep.callStack.includes(node.id);
                const isVisited = currentStep.visitedNodes.includes(node.id);

                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <circle
                      r={20}
                      fill={
                        isCurrent
                          ? '#4f46e5'
                          : inStack
                          ? '#1e1b4b'
                          : isVisited
                          ? '#064e3b'
                          : '#090d1a'
                      }
                      stroke={
                        isCurrent
                          ? '#a5b4fc'
                          : inStack
                          ? '#6366f1'
                          : isVisited
                          ? '#10b981'
                          : '#1e293b'
                      }
                      strokeWidth={isCurrent ? 3 : 2}
                      className="transition-all duration-300"
                    />
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={isCurrent ? '#ffffff' : inStack ? '#c7d2fe' : isVisited ? '#a7f3d0' : '#94a3b8'}
                      fontWeight="bold"
                      fontSize="13"
                      fontFamily="monospace"
                      className="select-none pointer-events-none"
                    >
                      {node.id}
                    </text>
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

        {/* Right Info Column (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: LIFO Call Stack */}
          <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>DFS Call Stack (LIFO)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
                Depth #{currentStep.callStack.length}
              </span>
            </div>

            <div className="flex flex-col-reverse gap-1.5 min-h-[160px] p-2 rounded-xl bg-[#07080f] border border-[#181d30]">
              {currentStep.callStack.length === 0 ? (
                <div className="m-auto text-[11px] font-mono text-zinc-500">
                  কল স্ট্যাক খালি (Stack Empty)
                </div>
              ) : (
                currentStep.callStack.map((node, idx) => {
                  const isTop = idx === currentStep.callStack.length - 1;
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg font-mono text-xs flex items-center justify-between border transition-all ${
                        isTop
                          ? 'bg-indigo-950/80 border-indigo-400 text-white font-bold ring-1 ring-indigo-400'
                          : 'bg-[#0f1222] border-[#1d243f] text-zinc-400'
                      }`}
                    >
                      <span>DFS({node})</span>
                      <span className="text-[10px] text-zinc-500">
                        {isTop ? 'TOP (Active)' : `#${idx + 1}`}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Card 2: Traversal Order */}
          <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 shadow-xl text-xs font-mono">
            <span className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>ভিজিট করার ক্রম (Visited Order)</span>
            </span>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#07080f] rounded-xl border border-[#181d30]">
              {currentStep.visitedNodes.map((n, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                    {n}
                  </span>
                  {idx < currentStep.visitedNodes.length - 1 && (
                    <span className="text-zinc-600">➔</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. CS & Software Engineering Computing Use Cases */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>কম্পিউটার সায়েন্সে DFS-এর ৪টি প্রধান ব্যবহার</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
                CS Computing
              </span>
            </h2>
            <p className="text-[11px] text-zinc-400">
              বাস্তব সিস্টেম আর্কিটেকচারে যেসকল কাজের জন্য DFS আবশ্যক
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card 1: Build Systems */}
          <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-indigo-500/40 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5 text-indigo-400" />
                ১. প্যাকেজ বিল্ড ও মডিউল বান্ডলার
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-semibold">
                Topological Sort
              </span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span><b>Webpack / Vite / NPM:</b> ডিপেনডেন্সি ট্রি বিশ্লেষণ করে কম্পাইলেশন অর্ডার ঠিক করে।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">•</span>
                <span><b>কারণ:</b> লিফ ডিপেনডেন্সি আগে সমাধান করে নিরাপদ এক্সিকিউশন নিশ্চিত করে।</span>
              </li>
            </ul>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101428] text-indigo-300 border border-indigo-900/60">npm install</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101428] text-indigo-300 border border-indigo-900/60">DAG Order</span>
            </div>
          </div>

          {/* Card 2: Deadlock Detection */}
          <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-rose-500/40 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                ২. ওএস ডেডলক ও সাইকেল ডিটেকশন
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-semibold">
                Cycle Detection
              </span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><b>OS ও ডেটাবেজ (Postgres/MySQL):</b> লক ট্রানজ্যাকশন গ্রাফে সাইকেল খোঁজে।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span><b>কারণ:</b> কল স্ট্যাকে ব্যাক-এজ (Back-Edge) পেলেই দ্রুত ডেডলক রোলব্যাক করা যায়।</span>
              </li>
            </ul>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1015] text-rose-300 border border-rose-900/60">Wait-For Graph</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1015] text-rose-300 border border-rose-900/60">Auto Rollback</span>
            </div>
          </div>

          {/* Card 3: AST & Tree-shaking */}
          <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-emerald-500/40 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                ৩. কম্পাইলার AST ও ট্রি-শেকিং
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
                Dead Code Pruning
              </span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><b>Babel / SWC / TypeScript:</b> কোড পার্স করে অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি তৈরি করে।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><b>কারণ:</b> রুট থেকে আনরিচেবল ফাংশনগুলো ডেড কোড হিসেবে ছাঁটাই (Tree-shaking) করে।</span>
              </li>
            </ul>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091a14] text-emerald-300 border border-emerald-900/60">Tree-Shaking</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091a14] text-emerald-300 border border-emerald-900/60">Minify Bundle</span>
            </div>
          </div>

          {/* Card 4: Backtracking & Game AI */}
          <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-amber-500/40 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                ৪. ব্যাকট্র্যাকিং ও গেম এআই
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-semibold">
                State Tree Search
              </span>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><b>দাবা / সুডোকু / Minimax AI:</b> সম্ভাব্য সব মুভ গভীরে গিয়ে মূল্যায়ন করে।</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><b>কারণ:</b> মেমরি খরচ ন্যূনতম (O(Depth)) এবং ভুল পথে গেলে সহজে ব্যাকট্র্যাক করে।</span>
              </li>
            </ul>
            <div className="flex gap-1.5 pt-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c160a] text-amber-300 border border-amber-900/60">Alpha-Beta Pruning</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c160a] text-amber-300 border border-amber-900/60">O(Depth) Space</span>
            </div>
          </div>
        </div>

        {/* Compact Rule */}
        <div className="p-3 rounded-xl bg-[#0c0e1a] border border-[#232948] flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span><b>কখন DFS:</b> মেমরি সীমাবদ্ধ, গভীর সলিউশন খোঁজা, সাইকেল নির্ণয় ও ডিপেনডেন্সি বিল্ড।</span>
          </div>
          <span className="font-mono text-[10px] text-indigo-300 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 shrink-0">
            Space: O(Depth)
          </span>
        </div>
      </div>

      {/* 6. Real Life Scenario */}
      <RealLifeScenario
        topicName="ডেপথ-ফার্স্ট সার্চ (DFS)"
        scenarios={[
          {
            title: "১. ভুলভুলাইয়া বা গোলকধাঁধা অনুসন্ধান (Maze Exploration)",
            subtitle: "সুতো হাতে নিয়ে শেষ সীমানা পর্যন্ত হেঁটে যাওয়া",
            analogy: "একটি অন্ধকার গোলকধাঁধায় আপনি সুতোর রশি ধরে একমুখী সোজা হেঁটে শেষ সীমা পর্যন্ত গেলেন। ডেড-এন্ড পেলে সুতো ধরে এক পা পিছিয়ে এসে অন্য শাখা পরখ করলেন।",
            whyItFits: "DFS ঠিক এভাবেই LIFO কল স্ট্যাক ব্যবহার করে গভীরতম ডেড-এন্ড পর্যন্ত চলে যায় এবং ব্যাকট্র্যাক করে ফিরে আসে।",
            badge: "Backtracking",
            accentColor: "indigo",
            visualTag: "LIFO Stack"
          },
          {
            title: "২. ডিপেনডেন্সি ট্রি ও ফাইল ডিরেক্টরি ক্রলার (Folder Crawler)",
            subtitle: "সাব-ফোল্ডারের গভীরে নেমে ফাইল স্ক্যান",
            analogy: "কম্পিউটারের কোনো ফোল্ডারের ভেতরে নেস্টেড সাব-ফোল্ডার থাকলে আগে একদম ভেতরের ফাইলগুলো প্রসেস করে তবেই উপরের স্তরে ফেরা হয়।",
            whyItFits: "সার্চ ইঞ্জিন ক্রলার বা লিনাক্স find কমান্ড DFS অ্যালগরিদম দিয়ে মেমরি বাঁচিয়ে ট্রি ট্রাভার্স করে।",
            badge: "Deep Hierarchy",
            accentColor: "violet",
            visualTag: "O(V + E)"
          }
        ]}
      />
    </div>
  );
}
