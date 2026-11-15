'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Scale,
  PlusCircle,
  RotateCcw,
  Sparkles,
  RefreshCw,
  Layers,
  Database,
  Cpu,
  FileCode2
} from 'lucide-react';
import { TreeStep, AVLNode } from './types';
import {
  buildAVL,
  buildRBTree,
  layoutAVLNode,
  layoutRBNode,
  flattenTree
} from './utils/treeAlgorithms';
import BalancedTreeCanvas from './components/BalancedTreeCanvas';
import RotationGuide from './components/RotationGuide';

export default function BalancedTreeTopic() {
  const [activeModel, setActiveModel] = useState<'avl' | 'redblack'>('avl');
  const [treeValues, setTreeValues] = useState<number[]>([40, 20, 60, 10, 30, 50, 70]);
  const [inputVal, setInputVal] = useState<number>(25);

  // Stepping & Playback
  const [steps, setSteps] = useState<TreeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const speedMs = 1200; // Fixed 1.2s smooth slow playback
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Tree computation
  const avlRoot = useMemo(() => buildAVL(treeValues), [treeValues]);
  const rbRoot = useMemo(() => buildRBTree(treeValues), [treeValues]);

  const canvasWidth = useMemo(() => Math.max(760, (treeValues.length + 1) * 56), [treeValues.length]);
  const canvasHeight = 360;

  const positionedRoot = useMemo(() => {
    return activeModel === 'avl'
      ? layoutAVLNode(avlRoot, canvasWidth, canvasHeight)
      : layoutRBNode(rbRoot, canvasWidth, canvasHeight);
  }, [activeModel, avlRoot, rbRoot, canvasWidth]);

  const { nodes: flatNodes, edges: flatEdges } = useMemo(
    () => flattenTree(positionedRoot),
    [positionedRoot]
  );

  const currentStep = steps[currentStepIndex] || null;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            if (steps[nextIdx]?.treeValues) {
              setTreeValues(steps[nextIdx].treeValues);
            }
            return nextIdx;
          }
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
  }, [isPlaying, steps, speedMs]);

  // Insert handler with step generation
  const handleInsert = (valToInsert = inputVal) => {
    if (treeValues.includes(valToInsert)) return;
    setIsPlaying(false);

    const generatedSteps: TreeStep[] = [];

    // Step 1: Standard BST insertion
    const intermediateValues = [...treeValues, valToInsert];
    generatedSteps.push({
      title: 'BST Insert',
      explanation: `নোড ${valToInsert} কে সাধারণ BST নিয়মে ট্রিতে যুক্ত করা হলো।`,
      treeValues: intermediateValues,
      activeNodeVal: valToInsert,
      rotationType: 'NONE'
    });

    // Step 2: Check balance factor / rebalance
    const avlBalancedRoot = buildAVL(intermediateValues);
    const inOrderVals: number[] = [];
    function extract(n: AVLNode | null) {
      if (!n) return;
      inOrderVals.push(n.val);
      extract(n.left);
      extract(n.right);
    }
    extract(avlBalancedRoot);

    generatedSteps.push({
      title: activeModel === 'avl' ? 'Balance Check & Rotation' : 'Coloring & Rebalancing',
      explanation:
        activeModel === 'avl'
          ? `ব্যালেন্স ফ্যাক্টর চেক করা হলো। প্রয়োজনমতো রোটেশন সম্পন্ন করে ট্রির উচ্চতা ব্যালেন্স রাখা হলো (উচ্চতার পার্থক্য ≤ ১)।`
          : `রেড-ব্ল্যাক প্রোপার্টি অনুসারে রুট সবসময় কালো থাকবে এবং পাশাপাশি দুটি লাল নোড থাকবে না।`,
      treeValues: inOrderVals,
      activeNodeVal: valToInsert,
      rotationType: 'LL'
    });

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setTreeValues(intermediateValues);
    setIsPlaying(true);
  };

  // Pre-configured Rotation triggers for instant learning
  const triggerPreset = (type: 'LL' | 'RR' | 'LR' | 'RL') => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);

    let initialVals: number[] = [];
    let finalVals: number[] = [];
    let explanation = '';

    if (type === 'LL') {
      initialVals = [30, 20, 10];
      finalVals = [20, 10, 30];
      explanation = 'Left-Left (LL) পরিস্থিতি: বামে হেভি হয়ে পড়ায় নোড ৩০-এর ওপর Right Rotation প্রয়োগ করে ২০-কে নতুন প্যারেন্ট করা হলো।';
    } else if (type === 'RR') {
      initialVals = [10, 20, 30];
      finalVals = [20, 10, 30];
      explanation = 'Right-Right (RR) পরিস্থিতি: ডানে হেভি হয়ে পড়ায় নোড ১০-এর ওপর Left Rotation প্রয়োগ করে ২০-কে নতুন প্যারেন্ট করা হলো।';
    } else if (type === 'LR') {
      initialVals = [30, 10, 20];
      finalVals = [20, 10, 30];
      explanation = 'Left-Right (LR) জিগজ্যাগ: প্রথমে বামের নোডে Left Rotation, এরপর মূল রুটে Right Rotation (Double Rotation)।';
    } else if (type === 'RL') {
      initialVals = [10, 30, 20];
      finalVals = [20, 10, 30];
      explanation = 'Right-Left (RL) জিগজ্যাগ: প্রথমে ডানের নোডে Right Rotation, এরপর মূল রুটে Left Rotation (Double Rotation)।';
    }

    const genSteps: TreeStep[] = [
      {
        title: `Unbalanced State (${type})`,
        explanation: `অন-ব্যালেন্সড অবস্থা: উচ্চতার পার্থক্য ১-এর বেশি হয়ে গেছে (Balance Factor |BF| > 1)। ট্রিটি তির্যক হয়ে লিনিয়ার চেইনের মতো হয়ে যাচ্ছিল।`,
        treeValues: initialVals,
        rotationType: 'NONE'
      },
      {
        title: `Self-Balancing Rotation (${type})`,
        explanation,
        treeValues: finalVals,
        rotationType: type
      }
    ];

    setSteps(genSteps);
    setCurrentStepIndex(0);
    setTreeValues(initialVals);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTreeValues([40, 20, 60, 10, 30, 50, 70]);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card - Balanced Tree Definition & Visual Diagram */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-sky-500/20">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">ব্যালেন্সড ট্রি (Balanced Trees)</h2>
            <span className="text-xs font-mono text-sky-400 font-medium">
              Self-Balancing Binary Search Trees • উচ্চতার ভারসাম্য • O(log N) নিশ্চিত সময়
            </span>
          </div>
        </div>

        {/* What is a Balanced Tree & Why it matters */}
        <div className="space-y-3">
          <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
            <b>ব্যালেন্সড ট্রি (Balanced Tree)</b> হলো এমন এক ধরণের বাইনারি সার্চ ট্রি, যা স্বয়ংক্রিয়ভাবে প্রতিটি নোডের বাম ও ডান শাখার উচ্চতার ভারসাম্য বজায় রাখে। সাধারণ BST-তে ডেটা একাধারে ইনসার্ট করলে তা একপাশে হেলে গিয়ে লিংকড লিস্টের মতো বাঁকা ($O(N)$) হয়ে পড়ে। ব্যালেন্সড ট্রি <b>Rotations</b> বা কালারিং কৌশলে উচ্চতা সবসময় $\log N$-এর মধ্যে সীমাবদ্ধ রেখে $O(\log N)$ নিশ্চিত পারফরম্যান্স বজায় রাখে।
          </p>
        </div>

        {/* Visual Diagram: Unbalanced vs Balanced Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#090a10] border border-[#1b1f2e] p-4 rounded-xl">
          {/* Left: Unbalanced Skewed Tree */}
          <div className="flex-1 w-full flex flex-col items-center bg-[#130d12]/70 border border-rose-950/60 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              সাধারণ BST: আন-ব্যালেন্সড (Skewed Degraded)
            </div>
            <svg viewBox="0 0 200 90" className="w-48 h-20 select-none">
              <line x1="40" y1="20" x2="80" y2="40" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="80" y1="40" x2="120" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
              <line x1="120" y1="60" x2="160" y2="80" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx="40" cy="20" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="40" y="24" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">10</text>
              <circle cx="80" cy="40" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="80" y="44" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">20</text>
              <circle cx="120" cy="60" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="120" y="64" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>
              <circle cx="160" cy="80" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="160" y="84" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">40</text>
            </svg>
            <span className="text-[11px] font-mono text-rose-300 mt-1">
              উচ্চতা = N • সার্চ টাইম খারাপ: <strong className="text-rose-400">O(N)</strong>
            </span>
          </div>

          {/* Center: Balance Transformation Arrow */}
          <div className="flex flex-col items-center justify-center text-zinc-500 font-mono text-xs">
            <span className="text-sky-400 font-bold mb-1">Self-Balancing</span>
            <div className="w-10 h-10 rounded-full bg-[#151928] border border-[#232b45] flex items-center justify-center text-sky-400 shadow-md">
              <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <span className="text-[10px] text-zinc-400 mt-1">Rotations</span>
          </div>

          {/* Right: Balanced Tree */}
          <div className="flex-1 w-full flex flex-col items-center bg-[#11131f]/70 border border-sky-950/60 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              ব্যালেন্সড ট্রি: সুষম শাখা (Optimal Balanced)
            </div>
            <svg viewBox="0 0 200 90" className="w-48 h-20 select-none">
              <line x1="100" y1="20" x2="50" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="100" y1="20" x2="150" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="150" y1="55" x2="175" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="50" y1="55" x2="25" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="100" cy="20" r="12" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="100" y="24" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">20</text>
              <circle cx="50" cy="55" r="11" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="50" y="59" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">10</text>
              <circle cx="150" cy="55" r="11" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="150" y="59" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>
              <circle cx="25" cy="80" r="9" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="25" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">5</text>
              <circle cx="175" cy="80" r="9" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="175" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">40</text>
            </svg>
            <span className="text-[11px] font-mono text-sky-300 mt-1">
              উচ্চতা = log N • সার্চ টাইম দ্রুততম: <strong className="text-sky-400">O(log N)</strong>
            </span>
          </div>
        </div>

        {/* 2 Popular Types Note */}
        <div className="bg-[#141624]/60 border border-[#202538] rounded-xl p-3.5 flex items-start gap-3">
          <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-300 leading-relaxed">
            ব্যালেন্সড ট্রির মধ্যে বহুল ব্যবহৃত ও জনপ্রিয় দুটি রূপ হলো: <strong className="text-sky-300">১. AVL Tree</strong> (কড়াকড়ি উচ্চতা বজায় রাখে) এবং <strong className="text-rose-300">২. Red-Black Tree</strong> (কালার রুলস দিয়ে কম রোটেশনে দ্রুত কাজ করে)। নিচের সিমুলেশন ফিল্টারে এই দুটি ট্রি আলাদাভাবে নির্বাচন করে পর্যবেক্ষণ করতে পারেন।
          </p>
        </div>
      </div>

      {/* 2. Interactive Simulator with Mode Filter on Top */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        {/* Simulator Top Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#1b1e2e]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider">
              ট্রি মডেল ফিল্টার:
            </span>
            <div className="flex items-center bg-[#090a10] p-1 rounded-xl border border-[#1f2338]">
              <button
                onClick={() => setActiveModel('avl')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeModel === 'avl'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-300"></span>
                AVL Tree (Strict)
              </button>
              <button
                onClick={() => setActiveModel('redblack')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeModel === 'redblack'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Red-Black Tree (Standard)
              </button>
            </div>
          </div>

          <span className="text-[11px] font-mono text-zinc-400 bg-[#131522] px-3 py-1 rounded-lg border border-[#1e2235]">
            {activeModel === 'avl' ? 'Balance Factor: |hL - hR| ≤ 1' : '5 Color-Coding Invariants'}
          </span>
        </div>

        {/* Dynamic Mini-Definition Card for the Selected Filter */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeModel === 'avl'
            ? 'bg-sky-950/20 border-sky-800/50 text-sky-200'
            : 'bg-rose-950/20 border-rose-800/50 text-rose-200'
        }`}>
          {activeModel === 'avl' ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-sky-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                  AVL Tree এর মূল ধারণা ও বৈশিষ্ট্য
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/60 border border-sky-700 text-sky-300">
                  Strictly Balanced
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                প্রতিটি নোডের <b>Balance Factor (BF)</b> = বাম সাব-ট্রির উচ্চতা − ডান সাব-ট্রির উচ্চতা। একটি ভ্যালিড AVL ট্রিতে BF সবসময় <b>-১, ০ অথবা +১</b> হতে হবে। কোনো ইনসার্টে উচ্চতার পার্থক্য ১-এর বেশি হলে সাথে সাথে ৪ ধরনের রোটেশন (<b>LL, RR, LR, RL</b>) ব্যবহার করে ট্রিকে ব্যালেন্স করা হয়। এটি ঘন ঘন <b>Search</b> করার জন্য সেরা।
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                  Red-Black Tree এর মূল ধারণা ও বৈশিষ্ট্য
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
                  Color Invariant Balanced
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                প্রতিটি নোডের রঙ <b>লাল (Red)</b> অথবা <b>কালো (Black)</b> হয়। এর মূল শর্ত: রুট সবসময় কালো, পাশাপাশি দুটি লাল নোড থাকতে পারবে না, এবং রুট থেকে সব নাল (NIL) পাতার পথে কালো নোডের সংখ্যা সমান হবে। রোটেশনের চেয়ে দ্রুত কালার পরিবর্তনের (Recoloring) ওপর নির্ভর করায় এটি ঘন ঘন <b>Insert ও Delete</b>-এর জন্য সেরা (যেমন Java <code>TreeMap</code> ও Linux Kernel)।
              </p>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3.5 rounded-xl border border-[#1d2030]">
          <div className="flex flex-wrap items-center gap-3.5">
            <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-300 font-medium">Insert:</span>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
                className="w-16 bg-[#141624] text-sky-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => handleInsert()}
                disabled={isPlaying}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Insert
              </button>
            </div>

            <div className="flex items-center gap-1.5 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-400">Test Rotations:</span>
              <button
                onClick={() => triggerPreset('LL')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-sky-300 border border-[#26304d] cursor-pointer"
                title="Left-Left imbalance ➔ Right Rotate"
              >
                LL
              </button>
              <button
                onClick={() => triggerPreset('RR')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-indigo-300 border border-[#26304d] cursor-pointer"
                title="Right-Right imbalance ➔ Left Rotate"
              >
                RR
              </button>
              <button
                onClick={() => triggerPreset('LR')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-emerald-300 border border-[#26304d] cursor-pointer"
                title="Left-Right zig-zag ➔ Double Rotate"
              >
                LR
              </button>
              <button
                onClick={() => triggerPreset('RL')}
                disabled={isPlaying}
                className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-amber-300 border border-[#26304d] cursor-pointer"
                title="Right-Left zig-zag ➔ Double Rotate"
              >
                RL
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] cursor-pointer font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Tree Canvas */}
        <BalancedTreeCanvas
          activeModel={activeModel}
          flatNodes={flatNodes}
          flatEdges={flatEdges}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          steps={steps}
          currentStepIndex={currentStepIndex}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onStepBack={() => {
            setIsPlaying(false);
            setCurrentStepIndex((prev) => Math.max(0, prev - 1));
          }}
          onStepForward={() => {
            setIsPlaying(false);
            if (currentStepIndex < steps.length - 1) {
              const nextIdx = currentStepIndex + 1;
              if (steps[nextIdx]?.treeValues) {
                setTreeValues(steps[nextIdx].treeValues);
              }
              setCurrentStepIndex(nextIdx);
            }
          }}
        />

        {/* Live Step Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] text-sm font-mono flex items-start gap-3.5">
          <div className="mt-0.5">
            {currentStep?.rotationType && currentStep.rotationType !== 'NONE' ? (
              <RefreshCw className="w-5 h-5 text-sky-400 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-100 font-bold uppercase tracking-wider text-xs md:text-sm">
                {currentStep?.title || `${activeModel.toUpperCase()} SIMULATOR`}
              </span>
              {currentStep && (
                <span className="text-xs text-sky-400 font-mono">
                  {currentStep.rotationType !== 'NONE' ? `Rotation: ${currentStep.rotationType}` : 'BST Invariant'}
                </span>
              )}
            </div>
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans">
              {currentStep?.explanation ||
                `একটি মান লিখে Insert চাপুন, অথবা ওপরের LL / RR / LR / RL টেস্ট বাটনগুলোতে ক্লিক করে লাইভ রোটেশন ও ব্যালেন্সিং পর্যবেক্ষণ করুন।`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Rotation Playbook & Guidelines for Test Rotations */}
      <RotationGuide />

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="ব্যালেন্সড ট্রি (Balanced Trees)"
        scenarios={[
          {
            title: "১. ডিজিটাল নিক্তি বা ভারসাম্য পাল্লা (Self-Leveling Weighing Scale)",
            subtitle: "একপাশে অতিরিক্ত ওজন পড়লে স্বয়ংক্রিয় অ্যাডজাস্টমেন্ট",
            badge: "Self-Balancing",
            visualTag: "Left vs Right Load",
            accentColor: "sky",
            analogy:
              "দাঁড়িপাল্লার একপাশে যদি অতিরিক্ত ওজন ফেলা হয়, তবে তা হেলে গিয়ে অকেজো হয়ে পড়তে পারে। একটি ব্যালেন্সড ট্রি সার্বক্ষণিকভাবে দুই পাশের উচ্চতা পর্যবেক্ষণ করে—যদি একপাশে বেশি উচ্চতা তৈরি হয়, তবে রোটেশনের মাধ্যমে তৎক্ষণাৎ ওজন মাঝখানে নিয়ে আসে।",
            whyItFits:
              "AVL ট্রির ব্যালেন্স ফ্যাক্টর (|BF| ≤ 1) নিশ্চিত করে কোনো একটি শাখা অপর শাখার চেয়ে ১ স্তরের বেশি ঝুঁকে থাকতে পারবে না।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">উচ্চতা অসম?</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-600 text-slate-950 font-bold">Right Rotation</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">উচ্চতার পার্থক্য ≤ ১</span>
              </div>
            ),
          },
          {
            title: "২. ট্রাফিক সিগন্যালের লেন ম্যানেজমেন্ট (Airport Baggage Carousel)",
            subtitle: "দীর্ঘ একমুখী লাইন রুখে প্যারালাল চ্যানেল তৈরি",
            badge: "Worst-Case O(log N)",
            visualTag: "Anti-Degradation",
            accentColor: "indigo",
            analogy:
              "একটি কাউন্টারে ১০০ জন মানুষ এক লাইনে দাঁড়ালে শেষ মানুষটিকে ১০০ ধাপ অপেক্ষা করতে হয় ($O(N)$)। কিন্তু তাদের যদি দ্রুত ৪-৫টি সাব-লাইনে ভাগ করে দেওয়া হয়, তবে সর্বোচ্চ ৬-৭ জনের পরেই ডাক পাওয়া যায় ($O(\\log N$))।",
            whyItFits:
              "সাধারণ বাইনারি ট্রিতে ডেটা সর্টেড থাকলে তা একটি সোজা লাইনে ($O(N)$) রূপ নেয়; ব্যালেন্সড ট্রি রোটেশনের মাধ্যমে গাছটিকে সবসময় ঘন ও সুষম রাখে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300">খারাপ অবস্থা: O(N)</span>
                <span>➔ রোটেশন ➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-bold">ব্যালেন্সড: O(log N)</span>
              </div>
            ),
          },
        ]}
      />

      {/* 4. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Database className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-bold text-zinc-100">1. Java TreeMap &amp; TreeSet</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Java-এর <code>java.util.TreeMap</code> সম্পূর্ণভাবে <b>Red-Black Tree</b> দিয়ে তৈরি, যা নিশ্চিত করে $O(\log N)$ ইনসার্ট, সার্চ এবং ডিলিট।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-zinc-100">2. Linux Kernel CFS Scheduler</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            লিনাক্স অপারেটিং সিস্টেমের সিপিইউ শিডিউলার (Completely Fair Scheduler) প্রসেসগুলোর রান-টাইম ট্র্যাক করতে Red-Black Tree ব্যবহার করে।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <FileCode2 className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-zinc-100">3. C++ STL std::map &amp; std::set</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            C++ স্ট্যান্ডার্ড লাইব্রেরির <code>std::map</code> ও <code>std::set</code> ব্যাকগ্রাউন্ডে Red-Black Tree পরিচালনা করে ডেটা সর্বদা সর্টেড রাখে।
          </p>
        </div>
      </div>
    </div>
  );
}
