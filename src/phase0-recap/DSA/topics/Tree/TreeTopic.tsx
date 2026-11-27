'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Network,
  PlusCircle,
  Search,
  RotateCcw,
  Sparkles,
  Cpu,
  FileCode2,
  Database,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { TreeStep, DEFAULT_TREE } from './types';
import {
  buildBST,
  getTreeDepth,
  layoutTree,
  flattenTree,
  generateSearchSteps,
  generateInsertSteps
} from './utils/bstAlgorithms';
import TreeCanvas from './components/TreeCanvas';

export default function TreeTopic() {
  const [treeValues, setTreeValues] = useState<number[]>(DEFAULT_TREE);
  const [inputVal, setInputVal] = useState<number>(65);
  const [searchVal, setSearchVal] = useState<number>(40);

  // Animation & Stepping State
  const [steps, setSteps] = useState<TreeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const speedMs = 1200; // Fixed default slow animation speed (1.2s)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Build current positioned tree
  const bstRoot = useMemo(() => buildBST(treeValues), [treeValues]);
  const treeDepth = useMemo(() => Math.max(1, getTreeDepth(bstRoot)), [bstRoot]);
  const canvasWidth = useMemo(() => Math.max(760, (treeValues.length + 1) * 54), [treeValues.length]);
  const canvasHeight = useMemo(() => Math.max(380, 80 + treeDepth * 55), [treeDepth]);

  const positionedRoot = useMemo(
    () => layoutTree(bstRoot, canvasWidth, canvasHeight),
    [bstRoot, canvasWidth, canvasHeight]
  );
  const { nodes: flatNodes, edges: flatEdges } = useMemo(
    () => flattenTree(positionedRoot),
    [positionedRoot]
  );

  const nodeRadius = treeDepth >= 7 || treeValues.length >= 14 ? 15 : 18;
  const currentStep = steps[currentStepIndex] || null;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            if (steps[nextIdx]?.newTreeValues) {
              setTreeValues(steps[nextIdx].newTreeValues!);
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

  // Search Action
  const startSearch = () => {
    setIsPlaying(false);
    const generatedSteps = generateSearchSteps(bstRoot, searchVal, treeValues.length);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    if (generatedSteps.length > 1) {
      setIsPlaying(true);
    }
  };

  // Insertion Action
  const startInsert = () => {
    setIsPlaying(false);
    const { steps: generatedSteps, immediateNewTree } = generateInsertSteps(bstRoot, treeValues, inputVal);
    if (immediateNewTree) {
      setTreeValues(immediateNewTree);
    }
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    if (generatedSteps.length > 1) {
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTreeValues(DEFAULT_TREE);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      if (steps[nextIdx]?.newTreeValues) {
        setTreeValues(steps[nextIdx].newTreeValues!);
      }
      setCurrentStepIndex(nextIdx);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">ট্রি ও বাইনারি সার্চ ট্রি (Tree & BST)</h2>
            <span className="text-xs font-mono text-emerald-400 font-medium">হায়ারার্কিকাল ডেটা স্ট্রাকচার • Left &lt; Root &lt; Right • O(log N) দ্রুত গতি</span>
          </div>
        </div>

        {/* 3 Quick Visual Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ১. ট্রি স্ট্রাকচার (Tree)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              কোনো সরল রৈখিক তালিকা নয়, বরং <b>রুট (Root)</b> থেকে শাখা ও পাতার মতো নোডগুলো পরস্পরের সাথে যুক্ত থাকে।
            </p>
          </div>

          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-lime-400 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-lime-400"></span>
              ২. BST-এর মূল নিয়ম (Ordering Rule)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              যেকোনো নোডের <b>বাম শাখা (Left &lt; Node)</b> সবসময় ছোট, এবং <b>ডান শাখা (Right &gt; Node)</b> সবসময় বড় হবে।
            </p>
          </div>

          <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-3.5 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              ৩. কেন O(log N) দ্রুত?
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              প্রতিটি তুলনার পর ট্রি-এর পুরো অর্ধেক শাখা বাদ হয়ে যায়, তাই লক্ষ লক্ষ ডেটাতেও মাত্র কয়েক ধাপে সঠিক নোড মিলে যায়।
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive Simulator */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3.5 rounded-xl border border-[#1d2030]">
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Insert Control */}
            <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-300 font-medium">Insert:</span>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
                className="w-16 bg-[#141624] text-emerald-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={startInsert}
                disabled={isPlaying}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Insert
              </button>
            </div>

            {/* Search Control */}
            <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
              <span className="text-xs font-mono text-zinc-300 font-medium">Search:</span>
              <input
                type="number"
                value={searchVal}
                onChange={(e) => setSearchVal(Number(e.target.value))}
                className="w-16 bg-[#141624] text-lime-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-lime-500"
              />
              <button
                onClick={startSearch}
                disabled={isPlaying}
                className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-lime-500 hover:bg-lime-400 disabled:opacity-40 text-slate-950 font-bold shadow-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>

          {/* Reset & Presets */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] cursor-pointer font-medium"
            >
              <RotateCcw className="w-4 h-4" /> Reset Tree
            </button>
          </div>
        </div>

        {/* Dynamic Tree SVG Canvas with Integrated Controls */}
        <TreeCanvas
          flatNodes={flatNodes}
          flatEdges={flatEdges}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          nodeRadius={nodeRadius}
          steps={steps}
          currentStepIndex={currentStepIndex}
          currentStep={currentStep}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onStepBack={handleStepBack}
          onStepForward={handleStepForward}
        />

        {/* Live Step Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] text-sm font-mono flex items-start gap-3.5">
          <div className="mt-0.5">
            {currentStep?.type === 'FOUND' || currentStep?.type === 'INSERT_SUCCESS' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : currentStep?.type === 'NOT_FOUND' || currentStep?.type === 'DUPLICATE' ? (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-100 font-bold uppercase tracking-wider text-xs md:text-sm">
                {currentStep?.type || 'READY'}
              </span>
              {currentStep && (
                <span className="text-xs text-zinc-400 font-mono">
                  {currentStep.action === 'insert' ? 'BST Insertion' : 'BST Search'} •{' '}
                  {currentStep.visitedPath.length} comparison(s)
                </span>
              )}
            </div>
            <p className="text-zinc-200 text-sm leading-relaxed font-sans">
              {currentStep?.explanation ||
                'একটি সংখ্যা লিখে Insert চাপুন ধাপে ধাপে যোগ করতে, অথবা Search দিয়ে O(log N) ডিরেকশনাল অনুসন্ধান পর্যবেক্ষণ করুন।'}
            </p>
          </div>
        </div>
      </div>

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="ট্রি ও বাইনারি সার্চ ট্রি (Tree & BST)"
        scenarios={[
          {
            title: "১. ২০ প্রশ্নের সংখ্যা অনুমান খেলা (Guessing Game: Higher or Lower)",
            subtitle: "প্রতিটি হ্যাঁ/না উত্তরে অর্ধেক সম্ভাবনা উড়িয়ে দেওয়া",
            badge: "Binary Partition",
            visualTag: "Halving Decisions",
            accentColor: "emerald",
            analogy:
              "১ থেকে ১০০ এর মধ্যে বন্ধু একটি সংখ্যা ভাবল। আপনি জিজ্ঞেস করলেন: 'সংখ্যাটি কি ৫০-এর চেয়ে বড়?' বন্ধু বলল: 'হ্যাঁ'। সাথে সাথে ১ থেকে ৫০ পর্যন্ত অর্ধেক সংখ্যা বাতিল! এরপর জিজ্ঞেস করলেন: 'সংখ্যাটি কি ৭৫-এর চেয়ে বড়?' এইভাবে সর্বোচ্চ ৭টি প্রশ্নে ১০০টি সংখ্যার মধ্য থেকে সঠিক সংখ্যাটি বের করা যায় ($O(\\log_2 N$)!",
            whyItFits:
              "বাইনারি সার্চ ট্রিতে (BST) রুট থেকে প্রতিবার বাঁয়ে (ছোট) বা ডানে (বড়) সিদ্ধান্ত নিলে অর্ধেক সার্চ স্পেস তাৎক্ষণিক বাদ হয়ে যায়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">রুট (৫০)</span>
                <span>➔ বড়? ➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">ডান শাখা (৭৫)</span>
                <span>➔ ছোট? ➔</span>
                <span className="px-2 py-0.5 rounded bg-lime-400 text-slate-950 font-bold">বাঁ শাখা (৬৫)</span>
              </div>
            ),
          },
          {
            title: "২. পারিবারিক বংশলতিকা বা কোম্পানি হায়ারার্কি (Family Tree / Org Chart)",
            subtitle: "শেকড় থেকে শাখা-প্রশাখা বেয়ে ছড়িয়ে পড়া কাঠামো",
            badge: "Hierarchy",
            visualTag: "Parent-Child Links",
            accentColor: "lime",
            analogy:
              "একটি পরিবারের বংশলতিকায় দাদা হলেন মূল রুট (Root Node)। তাঁর থেকে বাবা ও চাচা হলেন চাইল্ড নোড। আবার বাবার থেকে আপনি ও আপনার ভাই হলেন পরবর্তী লিফ নোড। পুরো পরিবার একটি সুন্দর গাছ বা ট্রি স্ট্রাকচারে বিন্যস্ত।",
            whyItFits:
              "ট্রি ডেটা স্ট্রাকচার সম্পর্কের স্তরবিন্যাস বা হায়ারার্কি (যেমন ফোল্ডার ও সাব-ফোল্ডার, বা কোম্পানির সিইও থেকে জুনিয়র ইঞ্জিনিয়ার) নিখুঁতভাবে ধারণ করে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-slate-950 font-bold">সিইও (Root)</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-[#1c2236] text-emerald-300">ম্যানেজার</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-[#141624] text-zinc-400">ইঞ্জিনিয়ার (Leaf)</span>
              </div>
            ),
          },
        ]}
      />

      {/* 3. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-zinc-100">1. Database B-Trees (SQL Indexes)</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Postgres and MySQL index tables using self-balancing B-Trees. Querying 10,000,000 rows takes just ~3-4 disk block hops ($O(\log N)$).
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <FileCode2 className="w-5 h-5 text-lime-400" />
          <h4 className="text-sm font-bold text-zinc-100">2. Abstract Syntax Trees (AST)</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Compilers (Babel, TypeScript) and LLM code parsers convert code strings into hierarchical syntax trees before evaluating or compiling.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <Cpu className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-zinc-100">3. HTML DOM (Document Object Model)</h4>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Every webpage is a tree: <code>&lt;html&gt;</code> is root, branching into <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code> down to individual elements.
          </p>
        </div>
      </div>
    </div>
  );
}
