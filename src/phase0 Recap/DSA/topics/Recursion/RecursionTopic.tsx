'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Boxes,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Zap,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  CornerDownRight,
  RefreshCw,
  GitCommit,
  Flame
} from 'lucide-react';

type RecursionMode = 'fibonacci' | 'factorial';

interface TreeNode {
  id: string;
  n: number;
  x: number;
  y: number;
  parentId: string | null;
  branch?: 'left' | 'right';
  isDuplicateCall: boolean;
}

interface TreeStep {
  stepIndex: number;
  activeNodeId: string;
  callStack: { id: string; n: number; callType: string }[];
  visitedNodeStates: Record<string, 'calling' | 'base_case' | 'returned'>;
  nodeReturnValues: Record<string, number>;
  callCounts: Record<number, number>;
  currentCallN: number;
  isRedundant: boolean;
  action: 'call' | 'base_case' | 'unwind';
  title: string;
  explanation: string;
}

interface FactorialStep {
  stepIndex: number;
  activeN: number;
  phase: 'push' | 'base' | 'pop';
  stack: { n: number; state: 'waiting' | 'base' | 'returned'; val?: number }[];
  currentResult?: number;
  title: string;
  explanation: string;
}

export default function RecursionTopic() {
  const [activeMode, setActiveMode] = useState<RecursionMode>('fibonacci');
  const [fibN, setFibN] = useState<number>(4);
  const [factN, setFactN] = useState<number>(4);

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate Fibonacci Tree structure & Step simulation
  const { nodes: fibTreeNodes, steps: fibSteps } = useMemo(() => {
    // Generate deterministic tree layout for fib(N)
    // For n=3, 4, 5
    const nodes: TreeNode[] = [];
    const steps: TreeStep[] = [];
    const seenInputs = new Set<number>();
    const callCountsTracker: Record<number, number> = {};

    let counter = 0;

    // Generate nodes recursively
    function buildTree(n: number, x: number, y: number, spread: number, parentId: string | null, branch?: 'left' | 'right'): string {
      const id = `node_${counter++}`;
      const isDuplicate = seenInputs.has(n);
      seenInputs.add(n);

      nodes.push({
        id,
        n,
        x,
        y,
        parentId,
        branch,
        isDuplicateCall: isDuplicate && n > 1
      });

      if (n > 2) {
        buildTree(n - 1, x - spread, y + 80, spread * 0.52, id, 'left');
        buildTree(n - 2, x + spread, y + 80, spread * 0.52, id, 'right');
      }
      return id;
    }

    // Coordinates setup based on N
    const rootX = 400;
    const rootY = 45;
    const initialSpread = fibN === 5 ? 180 : fibN === 4 ? 150 : 120;
    buildTree(fibN, rootX, rootY, initialSpread, null);

    // Now simulate DFS execution trace
    const activeStack: { id: string; n: number; callType: string }[] = [];
    const visitedStates: Record<string, 'calling' | 'base_case' | 'returned'> = {};
    const returnVals: Record<string, number> = {};
    const pastCalls: number[] = [];

    function recordStep(
      activeId: string,
      callN: number,
      isRedundant: boolean,
      action: 'call' | 'base_case' | 'unwind',
      title: string,
      explanation: string
    ) {
      callCountsTracker[callN] = (callCountsTracker[callN] || 0) + (action === 'call' ? 1 : 0);
      steps.push({
        stepIndex: steps.length,
        activeNodeId: activeId,
        callStack: [...activeStack],
        visitedNodeStates: { ...visitedStates },
        nodeReturnValues: { ...returnVals },
        callCounts: { ...callCountsTracker },
        currentCallN: callN,
        isRedundant,
        action,
        title,
        explanation
      });
    }

    function simulateFib(nodeId: string, n: number): number {
      const node = nodes.find(it => it.id === nodeId)!;
      const isRedundant = pastCalls.includes(n);
      pastCalls.push(n);

      // 1. PUSH to stack
      activeStack.push({ id: nodeId, n, callType: `fib(${n})` });
      visitedStates[nodeId] = 'calling';

      recordStep(
        nodeId,
        n,
        isRedundant,
        'call',
        `ফাংশন কল: fib(${n}) স্ট্যাকে জমা হলো`,
        isRedundant
          ? `⚠️ মনোযোগ দিন! fib(${n}) কিন্তু আগে অন্য ব্রাঞ্চেও কল করা হয়েছিল। একই সাব-প্রবলেম মেমোরিতে সেভ না করায় কম্পিউটার আবারও একে নতুন করে হিসাব করতে বসেছে!`
          : `fib(${n}) ফাংশনটি কল হয়ে কল স্ট্যাকে প্রবেশ করল। এটি এখন নিজের হিসাব সম্পন্ন করার জন্য অপেক্ষমাণ।`
      );

      // Base cases: fib(1) = 1, fib(2) = 1
      if (n <= 2) {
        visitedStates[nodeId] = 'base_case';
        returnVals[nodeId] = 1;
        recordStep(
          nodeId,
          n,
          false,
          'base_case',
          `বেস কেস পূরণ: fib(${n}) = 1`,
          `বেস কেসে পৌঁছেছে! n <= 2 শর্ত পূরণ হওয়ায় এটি সরাসরি 1 রিটার্ন করে কল স্ট্যাক থেকে পপ (Unwind) হয়ে ফিরে যাবে।`
        );
        activeStack.pop();
        visitedStates[nodeId] = 'returned';
        return 1;
      }

      // Find children
      const leftChild = nodes.find(it => it.parentId === nodeId && it.branch === 'left')!;
      const rightChild = nodes.find(it => it.parentId === nodeId && it.branch === 'right')!;

      const leftVal = simulateFib(leftChild.id, n - 1);
      const rightVal = simulateFib(rightChild.id, n - 2);

      const total = leftVal + rightVal;
      returnVals[nodeId] = total;
      visitedStates[nodeId] = 'returned';

      recordStep(
        nodeId,
        n,
        false,
        'unwind',
        `সাব-ট্রি সমাপ্ত: fib(${n}) = fib(${n - 1}) + fib(${n - 2}) = ${leftVal} + ${rightVal} = ${total}`,
        `fib(${n}) এর উভয় সাব-কল (বাম: ${leftVal}, ডান: ${rightVal}) মান রিটার্ন করেছে। ফলাফল ${total} নির্ধারণ করে ফ্রেমটি স্ট্যাক থেকে নেমে যাচ্ছে।`
      );

      activeStack.pop();
      return total;
    }

    const rootNode = nodes[0];
    if (rootNode) {
      simulateFib(rootNode.id, fibN);
    }

    return { nodes, steps };
  }, [fibN]);

  // Generate Factorial Step simulation
  const factSteps = useMemo<FactorialStep[]>(() => {
    const steps: FactorialStep[] = [];
    const stack: { n: number; state: 'waiting' | 'base' | 'returned'; val?: number }[] = [];

    // Phase 1: Winding (Pushing frames down to base case)
    for (let i = factN; i >= 1; i--) {
      const isBase = i === 1;
      stack.push({ n: i, state: isBase ? 'base' : 'waiting' });
      steps.push({
        stepIndex: steps.length,
        activeN: i,
        phase: isBase ? 'base' : 'push',
        stack: stack.map(s => ({ ...s })),
        title: isBase ? `বেস কেস অর্জিত: factorial(1) = 1` : `কল স্ট্যাক পুশ: factorial(${i})`,
        explanation: isBase
          ? `n = 1 হওয়ায় বেস কেস হিট করেছে! আর কোনো রিকার্সিভ কল হবে না। এখন স্ট্যাক রিভার্স অর্ডারে আনওয়াইন্ড (Unwind) হবে।`
          : `factorial(${i}) কল করা হলো। মেমরিতে ফ্রেম তৈরি হয়ে এটি ${i} * factorial(${i - 1})-এর মানের জন্য অপেক্ষা করছে।`
      });
    }

    // Phase 2: Unwinding (Returning and multiplying)
    let accum = 1;
    for (let i = stack.length - 1; i >= 0; i--) {
      const current = stack[i];
      accum = accum * current.n;
      current.state = 'returned';
      current.val = accum;

      steps.push({
        stepIndex: steps.length,
        activeN: current.n,
        phase: 'pop',
        stack: stack.map(s => ({ ...s })),
        currentResult: accum,
        title: `স্ট্যাক পপ: factorial(${current.n}) রিটার্ন করল ${accum}`,
        explanation:
          current.n === 1
            ? `factorial(1) সরাসরি 1 রিটার্ন করে ফ্রেম মুক্ত করল।`
            : `factorial(${current.n}) এর মান ${current.n} × factorial(${current.n - 1}) = ${current.n} × ${accum / current.n} = ${accum} হিসেবে ক্যালকুলেট হলো।`
      });
    }

    return steps;
  }, [factN]);

  const activeStepsCount = activeMode === 'fibonacci' ? fibSteps.length : factSteps.length;
  const isAtEnd = currentStepIdx >= activeStepsCount - 1;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < activeStepsCount - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeStepsCount]);

  const handleModeChange = (mode: RecursionMode) => {
    setIsPlaying(false);
    setActiveMode(mode);
    setCurrentStepIdx(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const currentFibStep = fibSteps[currentStepIdx] || fibSteps[0];
  const currentFactStep = factSteps[currentStepIdx] || factSteps[0];

  return (
    <div className="flex flex-col gap-6 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16122a] via-[#100d20] to-[#080711] border border-[#2d224d] p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 font-bold">
              Topic 13 • Recursion &amp; Call Stack Architecture
            </span>
            <span className="text-xs text-zinc-500 font-mono">Self-Similarity • Memory Frames • Redundant Branching</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            রিকার্শন সিমুলেটর: বারবার একই জিনিস কল হওয়া ও কল স্ট্যাক
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-4xl leading-relaxed">
            রিকার্শনে একটি ফাংশন কোনো নির্দিষ্ট সমস্যা সমাধানের জন্য নিজেকেই বারবার ছোট ইনপুটে কল করতে থাকে। 
            যদি মেমোইজেশন বা বেস কেস সঠিকভাবে না থাকে, তবে একই কাজ বারবার অপ্রয়োজনীয়ভাবে ঘটে ($O(2^N)$)। 
            নিচের লাইভ ট্রি ও মেমরি স্ট্যাকে তা সরাসরি পর্যবেক্ষণ করুন।
          </p>
        </div>
      </div>

      {/* 2. Top Unified Studio Toolbar (44px) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0f1a] border border-[#22273e] p-2.5 rounded-2xl shadow-xl">
        {/* Left: Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#07080f] border border-[#1a1e30]">
          <button
            onClick={() => handleModeChange('fibonacci')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeMode === 'fibonacci'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>১. ফিবোনাচ্চি ট্রি (বারবার কল হওয়া)</span>
          </button>

          <button
            onClick={() => handleModeChange('factorial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeMode === 'factorial'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-300" />
            <span>২. ফ্যাক্টোরিয়াল (কল স্ট্যাক মেমরি)</span>
          </button>
        </div>

        {/* Center: Input Selector (N) */}
        <div className="flex items-center gap-2 bg-[#090b14] px-3 py-1.5 rounded-xl border border-[#1e2338]">
          <span className="text-xs font-mono text-zinc-300 font-semibold">
            {activeMode === 'fibonacci' ? 'ফিবোনাচ্চি N:' : 'ফ্যাক্টোরিয়াল N:'}
          </span>
          <div className="flex items-center gap-1">
            {(activeMode === 'fibonacci' ? [3, 4, 5] : [3, 4, 5, 6]).map(n => (
              <button
                key={n}
                onClick={() => {
                  setIsPlaying(false);
                  if (activeMode === 'fibonacci') setFibN(n);
                  else setFactN(n);
                  setCurrentStepIdx(0);
                }}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                  (activeMode === 'fibonacci' ? fibN : factN) === n
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200 ring-1 ring-purple-400/50'
                    : 'bg-[#121524] border-[#1d2238] text-zinc-400 hover:text-white'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Integrated Playback Controls */}
        <div className="flex items-center gap-2">
          {/* Step Back */}
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

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={isAtEnd}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs font-mono transition-all cursor-pointer shadow ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
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
                <span>Auto-Play (0.5x)</span>
              </>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStepIdx(prev => Math.min(activeStepsCount - 1, prev + 1));
            }}
            disabled={isPlaying || isAtEnd}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
            title="এক ধাপ সামনে যান"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
            title="শুরু থেকে দেখুন"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Step Indicator */}
          <div className="text-[11px] font-mono text-zinc-400 px-2 py-1 rounded bg-[#090b14] border border-[#1e2338]">
            ধাপ <span className="text-purple-300 font-bold">{currentStepIdx + 1}</span> / {activeStepsCount}
          </div>
        </div>
      </div>

      {/* 3. 2-COLUMN STUDIO LAYOUT: Left Canvas (64%) + Right Telemetry & Memory Stack (36%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Visual Recursion Arena (Tree or Stack) */}
        <div className="lg:col-span-8 bg-[#090b14] border border-[#1e2338] rounded-3xl p-5 flex flex-col justify-between min-h-[520px] shadow-2xl relative overflow-hidden">
          {/* Arena Top Badge */}
          <div className="flex items-center justify-between border-b border-[#181d2f] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <h3 className="text-xs font-mono font-bold text-zinc-200">
                {activeMode === 'fibonacci'
                  ? `ফিবোনাচ্চি রিকার্শন ট্রি: fib(${fibN}) ব্রাঞ্চিং ও ডুপ্লিকেট কল`
                  : `ফ্যাক্টোরিয়াল কল স্ট্যাক মেমরি ফ্রেম: factorial(${factN})`}
              </h3>
            </div>

            {activeMode === 'fibonacci' && (
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> সক্রিয় কল
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> বেস কেস (n≤2)
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> রিটার্নড মান
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-400" /> বারবার কল (অপচয়)
                </span>
              </div>
            )}
          </div>

          {/* VIEW A: FIBONACCI RECURSION TREE */}
          {activeMode === 'fibonacci' && (
            <div className="w-full flex-1 flex items-center justify-center relative overflow-x-auto py-2">
              <svg
                viewBox="0 0 800 380"
                className="w-full h-auto max-h-[440px] select-none"
              >
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#3b4468" />
                  </marker>
                </defs>

                {/* Draw Parent-Child Connection Lines */}
                {fibTreeNodes.map(node => {
                  if (!node.parentId) return null;
                  const parent = fibTreeNodes.find(p => p.id === node.parentId);
                  if (!parent) return null;

                  const isParentVisited = Boolean(currentFibStep.visitedNodeStates[parent.id]);
                  const isNodeVisited = Boolean(currentFibStep.visitedNodeStates[node.id]);
                  const isEdgeActive = isParentVisited && isNodeVisited;

                  return (
                    <g key={`edge_${node.id}`}>
                      <line
                        x1={parent.x}
                        y1={parent.y + 16}
                        x2={node.x}
                        y2={node.y - 16}
                        stroke={isEdgeActive ? (node.isDuplicateCall ? '#f43f5e' : '#a855f7') : '#222842'}
                        strokeWidth={isEdgeActive ? 2.5 : 1.5}
                        strokeDasharray={isEdgeActive ? undefined : '4 3'}
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* Draw Tree Nodes */}
                {fibTreeNodes.map(node => {
                  const state = currentFibStep.visitedNodeStates[node.id];
                  const isActive = currentFibStep.activeNodeId === node.id;
                  const retVal = currentFibStep.nodeReturnValues[node.id];
                  const isDuplicate = node.isDuplicateCall;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      className="transition-all duration-300"
                    >
                      {/* Duplicate Call Pulsing Halo */}
                      {isDuplicate && state && (
                        <circle
                          r={28}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth={2}
                          strokeDasharray="3 3"
                          className="animate-spin-slow opacity-80"
                        />
                      )}

                      {/* Active Node Pulse Ring */}
                      {isActive && (
                        <circle
                          r={26}
                          fill="none"
                          stroke="#c084fc"
                          strokeWidth={3}
                          className="animate-ping opacity-60"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={20}
                        className={`transition-all duration-300 ${
                          state === 'base_case'
                            ? 'fill-amber-500 stroke-amber-300 stroke-2'
                            : state === 'returned'
                            ? 'fill-[#122b22] stroke-emerald-400 stroke-2'
                            : isActive
                            ? 'fill-purple-600 stroke-purple-300 stroke-2 shadow-lg'
                            : state === 'calling'
                            ? 'fill-[#22173f] stroke-purple-400 stroke-2'
                            : 'fill-[#0d101c] stroke-[#222840] stroke-1 opacity-40'
                        }`}
                      />

                      {/* Node Label: fib(n) */}
                      <text
                        textAnchor="middle"
                        dy="4"
                        className={`font-mono text-[11px] font-bold pointer-events-none select-none ${
                          state === 'base_case'
                            ? 'fill-slate-950 font-black'
                            : isActive
                            ? 'fill-white font-black'
                            : state
                            ? 'fill-zinc-100'
                            : 'fill-zinc-500'
                        }`}
                      >
                        f({node.n})
                      </text>

                      {/* Return Value Pill (shown when resolved) */}
                      {retVal !== undefined && (
                        <g transform="translate(0, 32)">
                          <rect
                            x={-16}
                            y={-8}
                            width={32}
                            height={16}
                            rx={4}
                            className="fill-emerald-950 stroke-emerald-500 stroke-1"
                          />
                          <text
                            textAnchor="middle"
                            dy="4"
                            className="font-mono text-[9px] font-black fill-emerald-300"
                          >
                            ={retVal}
                          </text>
                        </g>
                      )}

                      {/* Repeated Call Warning Badge */}
                      {isDuplicate && state && (
                        <g transform="translate(0, -28)">
                          <rect
                            x={-34}
                            y={-7}
                            width={68}
                            height={14}
                            rx={3}
                            className="fill-rose-950/90 stroke-rose-500 stroke-1"
                          />
                          <text
                            textAnchor="middle"
                            dy="4"
                            className="font-mono text-[8px] font-bold fill-rose-300"
                          >
                            পুনরাবৃত্তি কল!
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* VIEW B: FACTORIAL STACK CALL ANIMATION */}
          {activeMode === 'factorial' && (
            <div className="w-full flex-1 flex flex-col items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#07080f] border border-[#1b1f33] rounded-2xl p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-[#171b2d] pb-2">
                  <span>RAM Call Stack (Stack Pointer ⬇)</span>
                  <span className="text-indigo-400 font-bold">LIFO (Last In, First Out)</span>
                </div>

                {/* Visual Stack Chamber */}
                <div className="flex flex-col-reverse gap-2 min-h-[280px] p-2 bg-[#0a0c16] rounded-xl border border-[#141829] justify-start">
                  {currentFactStep.stack.map((frame, idx) => {
                    const isTop = idx === currentFactStep.stack.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition-all duration-300 animate-in slide-in-from-top-2 ${
                          frame.state === 'base'
                            ? 'bg-amber-950/50 border-amber-400 text-amber-200 ring-2 ring-amber-400/30'
                            : frame.state === 'returned'
                            ? 'bg-emerald-950/40 border-emerald-400 text-emerald-200'
                            : isTop
                            ? 'bg-indigo-950/70 border-indigo-400 text-indigo-100 ring-2 ring-indigo-400/40'
                            : 'bg-[#111424] border-[#222842] text-zinc-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#181d33] flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                            #{idx + 1}
                          </span>
                          <span className="font-bold text-white">factorial({frame.n})</span>
                          {frame.state === 'base' && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              BASE
                            </span>
                          )}
                        </div>

                        <div className="text-[11px]">
                          {frame.val !== undefined ? (
                            <span className="text-emerald-300 font-bold">রিটার্ন = {frame.val}</span>
                          ) : (
                            <span className="text-zinc-500 text-[10px]">অপেক্ষমাণ (Child Call)</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Footer Explanatory Alert */}
          <div className="mt-2 p-3 rounded-2xl bg-[#0c0e18] border border-[#1b2035] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-300 leading-relaxed font-sans">
              <span className="font-bold text-white block mb-0.5 font-mono">
                {activeMode === 'fibonacci' ? currentFibStep.title : currentFactStep.title}
              </span>
              <p>{activeMode === 'fibonacci' ? currentFibStep.explanation : currentFactStep.explanation}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry, Repeated Subproblem Metrics & Stack Memory Deck (36%) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: Repeated Subproblem Call Frequency (The Core Request) */}
          {activeMode === 'fibonacci' && (
            <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>পুনরাবৃত্তি সাব-প্রবলেম ট্র্যাকার</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800 text-rose-300 font-bold">
                  বাজে পারফর্ম্যান্স $O(2^N)$
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                একই ইনপুট $N$-এর জন্য ফাংশনটি কতবার অপ্রয়োজনীয়ভাবে কল হয়েছে তা দেখুন:
              </p>

              <div className="space-y-1.5 font-mono text-xs">
                {Object.entries(currentFibStep.callCounts).map(([argN, count]) => {
                  const isRedundant = count > 1;
                  return (
                    <div
                      key={argN}
                      className={`p-2 rounded-xl border flex items-center justify-between ${
                        isRedundant
                          ? 'bg-rose-950/30 border-rose-800/80 text-rose-200'
                          : 'bg-[#111422] border-[#1d2238] text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">fib({argN})</span>
                        {isRedundant && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            {count - 1} বার অপচয়!
                          </span>
                        )}
                      </div>
                      <span className="font-bold">
                        মোট কল: <span className={isRedundant ? 'text-rose-400' : 'text-zinc-400'}>{count}</span> বার
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Memoization Callout */}
              <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-200 leading-relaxed font-sans">
                💡 <b>সমাধান (Memoization):</b> প্রথমবার হিসাবের পর ফলাফল ক্যাশে সংরক্ষণ করলে এই পুনরাবৃত্তি কলগুলো এড়ানো যায়, ফলে সময় $O(2^N)$ থেকে সোজা $O(N)$-এ নেমে আসে!
              </div>
            </div>
          )}

          {/* Card 2: Active Call Stack Depth Inspector */}
          <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>বর্তমান কল স্ট্যাক ফ্রেম (Call Stack)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
                LIFO Stack
              </span>
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              {activeMode === 'fibonacci' ? (
                currentFibStep.callStack.length === 0 ? (
                  <div className="p-3 text-center text-zinc-500 text-[11px] border border-dashed border-[#1e2338] rounded-xl">
                    কল স্ট্যাক খালি (Stack Empty)
                  </div>
                ) : (
                  currentFibStep.callStack
                    .slice()
                    .reverse()
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl border flex items-center justify-between ${
                          idx === 0
                            ? 'bg-purple-950/50 border-purple-400 text-purple-200 font-bold'
                            : 'bg-[#101322] border-[#1c2238] text-zinc-400'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                          {item.callType}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {idx === 0 ? 'শীর্ষ ফ্রেম (Top)' : `গভীরতা #${currentFibStep.callStack.length - idx}`}
                        </span>
                      </div>
                    ))
                )
              ) : currentFactStep.stack.length === 0 ? (
                <div className="p-3 text-center text-zinc-500 text-[11px] border border-dashed border-[#1e2338] rounded-xl">
                  কল স্ট্যাক খালি
                </div>
              ) : (
                currentFactStep.stack
                  .slice()
                  .reverse()
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xl border flex items-center justify-between ${
                        idx === 0
                          ? 'bg-indigo-950/50 border-indigo-400 text-indigo-200 font-bold'
                          : 'bg-[#101322] border-[#1c2238] text-zinc-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                        factorial({item.n})
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {item.val !== undefined ? `ফলাফল: ${item.val}` : 'অপেক্ষমাণ'}
                      </span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Card 3: Core Recursion Rules & Pitfalls */}
          <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 shadow-xl">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>রিকার্শনের তিনটি স্বর্ণালী নিয়ম</span>
            </span>

            <ul className="text-xs text-zinc-300 space-y-2 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold shrink-0">১.</span>
                <span><b>বেস কেস (Base Case):</b> অবশ্যই একটি থামার শর্ত থাকতে হবে, অন্যথায় ইনফিনিট লুপে <b>Stack Overflow</b> ঘটবে।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold shrink-0">২.</span>
                <span><b>ছোট ইনপুট (Toward Base):</b> প্রতিটি রিকার্সিভ কলে সমস্যাটি আগের চেয়ে ছোট ইনপুটে রূপান্তর হতে হবে (e.g. $N-1$ বা $N/2$)।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold shrink-0">৩.</span>
                <span><b>মেমরি স্ট্যাকের মূল্য:</b> প্রতিটি কলের জন্য RAM-এ ফ্রেম জমা থাকে, তাই গভীর রিকার্শনে অতিরিক্ত মেমরি $O(N)$ খরচ হয়।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Real-Life Production Engineering Scenarios */}
      <RealLifeScenario
        topicName="রিকার্শন ও ব্যাকট্র্যাকিং (Recursion and Backtracking)"
        scenarios={[
          {
            title: "১. রাশিয়ান পুতুল (Russian Matryoshka Nesting Dolls)",
            subtitle: "পুতুলের ভেতর পুতুল, যতক্ষণ না ক্ষুদ্রতম পুতুলটি আসছে",
            badge: "Base Case & Call Stack",
            visualTag: "Self-Similarity",
            accentColor: "violet",
            analogy:
              "একটি বড় পুতুল খুললে তার ভেতরে হুবহু একই রকম কিন্তু একটু ছোট পুতুল পাওয়া যায়। এভাবে খুলতে খুলতে সবচেয়ে ক্ষুদ্রতম নিরেট পুতুলটি আসলে থামা হয় (Base Case)। এরপর এক এক করে বন্ধ করে আগের অবস্থায় ফিরে আসা হয় (Call Stack Unwinding)।",
            whyItFits:
              "সমস্যাটি নিজেকেই ছোট আকারে পুনরাবৃত্তি করে, এবং নির্দিষ্ট বেস কেসে পৌঁছে কাজ শেষ করে ব্যাকট্র্যাক করে ফিরে আসে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800">Doll(3)</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800">Doll(2)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-purple-500 text-slate-950 font-bold">Doll(1) [Base]</span>
                <span>↩ Return</span>
              </div>
            ),
          },
          {
            title: "২. গোলকধাঁধা থেকে বের হওয়ার পথ খোঁজা (Maze Navigation)",
            subtitle: "দেয়ালে আটকালে এক পা পিছিয়ে এসে অন্য পথে হাঁটা",
            badge: "Backtracking",
            visualTag: "Try, Fail and Revert",
            accentColor: "amber",
            analogy:
              "আপনি গোলকধাঁধায় হেঁটে সামনে গেলেন, যদি দেখেন কানাগলি বা দেয়াল, তবে এক পা পিছিয়ে এসে (Backtrack) অন্য গলিতে পা বাড়ান।",
            whyItFits:
              "সম্ভাব্য সব পথ পরখ করে দেখা, ভুল হলে পূর্বাবস্থায় ফেরা — এটাই ব্যাকট্র্যাকিং অ্যালগরিদম।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800">সামনে গেলাম</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300">দেয়াল 🛑</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">পিছিয়ে অন্য মোড়ে ↩</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
