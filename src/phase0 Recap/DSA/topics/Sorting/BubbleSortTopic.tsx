'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Clock,
  HardDrive,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Shuffle
} from 'lucide-react';
import Link from 'next/link';

interface BubbleStep {
  arr: number[];
  i: number;
  j: number;
  comparing: [number, number] | null;
  swapped: boolean;
  sortedIndices: number[];
  desc: string;
  isPassEnd?: boolean;
  isComplete?: boolean;
}

const DEFAULT_ARRAY = [45, 12, 89, 34, 23, 7];

export default function BubbleSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [initialArray, setInitialArray] = useState<number[]>(DEFAULT_ARRAY);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace of Bubble Sort with early exit flag
  const trace = useMemo<BubbleStep[]>(() => {
    const steps: BubbleStep[] = [];
    const a = [...initialArray];
    const n = a.length;
    const sorted: number[] = [];

    steps.push({
      arr: [...a],
      i: 0,
      j: 0,
      comparing: null,
      swapped: false,
      sortedIndices: [],
      desc: 'শুরু: প্রাথমিক অবিন্যস্ত অ্যারে। বাবল সর্ট পাশাপাশি দুটি উপাদানের তুলনা করে বড়টিকে ডানদিকে ঠেলে দেয়।'
    });

    for (let i = 0; i < n - 1; i++) {
      let anySwapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        // Step 1: Compare
        const willSwap = a[j] > a[j + 1];
        steps.push({
          arr: [...a],
          i,
          j,
          comparing: [j, j + 1],
          swapped: false,
          sortedIndices: [...sorted],
          desc: `পাস ${i + 1}: ইনডেক্স ${j} (${a[j]}) এবং ইনডেক্স ${j + 1} (${a[j + 1]}) তুলনা করা হচ্ছে। ${
            willSwap ? `${a[j]} > ${a[j + 1]}, তাই এদের অদলবদল (Swap) হবে!` : `${a[j]} ≤ ${a[j + 1]}, কোনো সোয়াপের প্রয়োজন নেই।`
          }`
        });

        // Step 2: Swap if necessary
        if (willSwap) {
          const temp = a[j];
          a[j] = a[j + 1];
          a[j + 1] = temp;
          anySwapped = true;

          steps.push({
            arr: [...a],
            i,
            j,
            comparing: [j, j + 1],
            swapped: true,
            sortedIndices: [...sorted],
            desc: `সোয়াপ সম্পন্ন! ${temp} ডানপাশে সরে গেল এবং ${a[j]} বামে আসল।`
          });
        }
      }

      // Mark the end of this pass - the largest element bubbles to the end
      sorted.unshift(n - 1 - i);
      steps.push({
        arr: [...a],
        i,
        j: n - i - 1,
        comparing: null,
        swapped: false,
        sortedIndices: [...sorted],
        isPassEnd: true,
        desc: `পাস ${i + 1} সমাপ্ত: এই পাসের সর্বোচ্চ মান (${a[n - 1 - i]}) তার সঠিক অবস্থানে পৌঁছে লক হয়ে গেছে!`
      });

      // Early exit if no swaps occurred
      if (!anySwapped) {
        steps.push({
          arr: [...a],
          i,
          j: 0,
          comparing: null,
          swapped: false,
          sortedIndices: a.map((_, idx) => idx),
          isComplete: true,
          desc: `স্মার্ট অপ্টিমাইজেশন (Early Exit): এই পাসে কোনো উপাদান সোয়াপ হয়নি! অর্থাৎ অ্যারে সম্পূর্ণ সর্টেড হয়ে গেছে। বাকি পাসগুলো স্কিপ করা হলো (Best Case O(N))!`
        });
        return steps;
      }
    }

    // Mark remaining first element as sorted
    if (!sorted.includes(0)) sorted.unshift(0);

    steps.push({
      arr: [...a],
      i: n - 1,
      j: 0,
      comparing: null,
      swapped: false,
      sortedIndices: a.map((_, idx) => idx),
      isComplete: true,
      desc: 'অভিনন্দন! বাবল সর্ট সফলভাবে সমাপ্ত হয়েছে। সবকটি উপাদান ছোট থেকে বড় ক্রমে সুসজ্জিত।'
    });

    return steps;
  }, [initialArray]);

  const currentStep = trace[stepIdx] || trace[0];
  const isAtEnd = stepIdx >= trace.length - 1;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < trace.length - 1) return prev + 1;
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
  }, [isPlaying, trace.length, speedMs]);

  const handleRandomize = () => {
    setIsPlaying(false);
    const newArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10);
    setInitialArray(newArr);
    setStepIdx(0);
  };

  const handleNearlySorted = () => {
    setIsPlaying(false);
    setInitialArray([12, 23, 34, 45, 89, 7]);
    setStepIdx(0);
  };

  const handleReverseSorted = () => {
    setIsPlaying(false);
    setInitialArray([89, 56, 45, 34, 23, 12]);
    setStepIdx(0);
  };

  return (
    <div className="flex flex-col gap-8 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1328] via-[#110d1c] to-[#0a0712] border border-[#372458] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 font-bold">
              Topic 13.1 • Sorting Algorithm
            </span>
            <span className="text-xs text-zinc-400 font-mono">Adjacent Element Swapping</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>বাবল সর্ট (Bubble Sort)</span>
            <span className="text-sm font-mono font-normal px-3 py-1 rounded-full bg-[#241a38] border border-fuchsia-500/30 text-fuchsia-300">
              O(N²) Worst • O(N) Best
            </span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            বাবল সর্ট হলো একটি মৌলিক বিনিময়মূলক (exchange-based) সর্টিং অ্যালগরিদম। পানির নিচের ভারী বুদ্বুদ যেমন ক্রমান্বয়ে পানির উপরে ভেসে ওঠে, তেমনি প্রতিটি পাসে পাশাপাশি দুটি উপাদানের তুলনা করে বড় সংখ্যাটি অ্যারের শেষ প্রান্তে পৌঁছে যায়।
          </p>
        </div>
      </div>

      {/* 2. Interactive Navigation Pills & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#201d30] pb-4">
        <div className="flex items-center gap-2 bg-[#120f1e] p-1.5 rounded-2xl border border-[#26203d]">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            🫧 বুদ্বুদ সিমুলেশন (Live Canvas)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            💻 কোড ও অপ্টিমাইজেশন (TS / Python)
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            📊 কমপ্লেক্সিটি ও বাস্তব প্রয়োগ
          </button>
        </div>

        {/* Input presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Randomize</span>
          </button>
          <button
            onClick={handleNearlySorted}
            className="px-3 py-1.5 rounded-xl bg-[#161224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
            title="পরীক্ষা করুন কীভাবে ১ পাসে Best Case O(N) কাজ করে"
          >
            Nearly Sorted (O(N) Test)
          </button>
          <button
            onClick={handleReverseSorted}
            className="px-3 py-1.5 rounded-xl bg-[#161224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
          >
            Reverse (Worst O(N²))
          </button>
        </div>
      </div>

      {/* 3. MAIN SIMULATION CANVAS */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="relative rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl overflow-hidden">
            {/* Header Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f1933]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-mono text-xs font-bold shadow-lg shadow-fuchsia-600/30 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play Simulation'}</span>
                </button>

                <div className="flex items-center gap-1 bg-[#151222] p-1 rounded-xl border border-[#292240]">
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(Math.max(0, stepIdx - 1)); }}
                    disabled={stepIdx === 0}
                    className="p-1.5 rounded-lg hover:bg-[#231d36] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                    title="Step Back"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-mono text-xs text-zinc-400 font-medium">
                    {stepIdx + 1} / {trace.length}
                  </span>
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(Math.min(trace.length - 1, stepIdx + 1)); }}
                    disabled={isAtEnd}
                    className="p-1.5 rounded-lg hover:bg-[#231d36] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                    title="Step Forward"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(0); }}
                    className="p-1.5 rounded-lg hover:bg-[#231d36] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                    title="Reset to Step 1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Speed presets */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>গতি:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#151222] p-1 rounded-xl border border-[#292240] text-xs font-mono">
                  <button
                    onClick={() => setSpeedMs(1800)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1800 ? 'bg-fuchsia-900/60 text-fuchsia-300 font-bold' : 'text-zinc-400'}`}
                  >
                    0.5x
                  </button>
                  <button
                    onClick={() => setSpeedMs(1000)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1000 ? 'bg-fuchsia-900/60 text-fuchsia-300 font-bold' : 'text-zinc-400'}`}
                  >
                    1.0x
                  </button>
                  <button
                    onClick={() => setSpeedMs(500)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 500 ? 'bg-fuchsia-900/60 text-fuchsia-300 font-bold' : 'text-zinc-400'}`}
                  >
                    2.0x
                  </button>
                </div>
              </div>
            </div>

            {/* Bubble Visual Canvas */}
            <div className="py-12 flex flex-col items-center justify-center min-h-[300px]">
              {/* Floating Bubble Elevation Indicators */}
              <div className="w-full flex items-end justify-center gap-3 md:gap-5 pb-6">
                {currentStep.arr.map((val: number, idx: number) => {
                  const isComparing = currentStep.comparing?.includes(idx);
                  const isSorted = currentStep.sortedIndices.includes(idx);
                  const isBubbleRising = isComparing && currentStep.swapped;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      {/* Bubble elevation container */}
                      <div
                        className={`relative w-14 h-24 md:w-16 md:h-28 rounded-2xl flex flex-col items-center justify-between p-2.5 transition-all duration-500 shadow-xl ${
                          isSorted
                            ? 'bg-gradient-to-b from-emerald-900/50 to-emerald-950/80 border-2 border-emerald-500 shadow-emerald-500/20 text-emerald-200'
                            : isBubbleRising
                            ? 'bg-gradient-to-b from-fuchsia-600/40 to-pink-900/70 border-2 border-fuchsia-400 -translate-y-4 shadow-fuchsia-500/30 text-white scale-105'
                            : isComparing
                            ? 'bg-gradient-to-b from-amber-600/30 to-amber-950/70 border-2 border-amber-400 -translate-y-2 text-amber-200'
                            : 'bg-[#151224] border border-[#2d2448] text-zinc-300'
                        }`}
                      >
                        {/* Upper Badge */}
                        <div className="text-[10px] font-mono font-bold tracking-tight opacity-75">
                          {isSorted ? '✓ LOCK' : isComparing ? 'COMPARE' : `[${idx}]`}
                        </div>

                        {/* Value */}
                        <div className="text-xl md:text-2xl font-black font-mono tracking-tight">
                          {val}
                        </div>

                        {/* Bottom Status Indicator */}
                        <div className="w-full flex justify-center">
                          {isSorted ? (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          ) : isComparing ? (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          )}
                        </div>
                      </div>

                      {/* Pointer Labels */}
                      <div className="text-center">
                        <span className="text-[11px] font-mono text-zinc-400 block font-semibold">
                          ইনডেক্স {idx}
                        </span>
                        {currentStep.comparing?.[0] === idx && (
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">
                            pointer j
                          </span>
                        )}
                        {currentStep.comparing?.[1] === idx && (
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">
                            j + 1
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Explanation Card */}
              <div className="w-full max-w-2xl mt-4 p-4 rounded-2xl bg-[#141022] border border-[#2a2044] text-center shadow-lg">
                <p className="text-xs md:text-sm font-medium text-zinc-200 leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Invariant Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-[#1f1933] text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">CURRENT PASS:</span>
                  <span className="text-white font-bold">পাস {currentStep.i + 1} / {initialArray.length}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">SORTED ELEMENTS:</span>
                  <span className="text-emerald-300 font-bold">{currentStep.sortedIndices.length} / {initialArray.length} টি স্থায়ী</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">EARLY-EXIT CHECK:</span>
                  <span className="text-amber-300 font-bold">{currentStep.swapped ? 'সোয়াপ ঘটেছে' : 'সোয়াপ ব্যতিরেকে স্ক্যান'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CODE WALKTHROUGH */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>TypeScript / JavaScript অপ্টিমাইজড ইমপ্লিমেন্টেশন</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              স্বাভাবিক বাবল সর্টে কোনো উপাদান সর্টেড থাকলেও পুরো লুপ সম্পন্ন করে $O(N^2)$ সময় নেয়। কিন্তু <code className="text-fuchsia-400">swapped</code> ফ্ল্যাগ ব্যবহারের মাধ্যমে অ্যারেটি আগেই সর্টেড থাকলে মাত্র ১টি পাসেই $O(N)$ সময়ে অ্যালগরিদম শেষ হতে পারে।
            </p>
            <pre className="p-4 rounded-2xl bg-[#07060d] border border-[#221a38] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function bubbleSortOptimized(arr: number[]): number[] {
  const n = arr.length;
  let swapped: boolean;

  for (let i = 0; i < n - 1; i++) {
    swapped = false; // প্রতিটি পাসের শুরুতে ফ্ল্যাগ রিসেট

    // শেষ i-সংখ্যক উপাদান ইতিমধ্যে তার চূড়ান্ত সঠিক জায়গায় বসে গেছে
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // পাশাপাশি দুটি উপাদান অদলবদল (Swap)
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // যদি পুরো পাসে কোনো সোয়াপ না ঘটে, অ্যারে ইতিমধ্যে সর্টেড (Best Case O(N))
    if (!swapped) break;
  }

  return arr;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* 5. COMPLEXITY & USE CASES */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-fuchsia-400" />
              <span>টাইম ও স্পেস কমপ্লেক্সিটি</span>
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Best Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N) (যখন অ্যারে অলরেডি সর্টেড)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Average Case Time:</span>
                <span className="text-amber-400 font-bold">O(N²)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Worst Case Time:</span>
                <span className="text-rose-400 font-bold">O(N²) (যখন অ্যারে উল্টো সাজানো)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Auxiliary Space:</span>
                <span className="text-emerald-400 font-bold">O(1) (In-Place Memory)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Stability:</span>
                <span className="text-emerald-400 font-bold">Stable (সমান মানের ক্রম বজায় থাকে)</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>কখন বাবল সর্ট ব্যবহার করবেন?</span>
            </h3>
            <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><b>একাডেমিক ভিত্তি বোঝা:</b> যে কোনো শিক্ষার্থীকে সর্টিং অ্যালগরিদমের মৌলিক ধারণা ও পাশাপাশি সোয়াপিং শেখানোর ক্ষেত্রে এটি সবচেয়ে সহজ।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><b>প্রায় সাজানো ছোট ডেটাসেট:</b> যখন ডেটার ৯০% ইতিমধ্যে সর্টেড এবং উপাদান সংখ্যা খুব কম ($N &lt; 20$)।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><b>বাস্তব উৎপাদনে পরিহার্য:</b> বৃহদাকার ডেটাসেটের জন্য কখনোই বাবল সর্ট ব্যবহার করা হয় না কারণ এর $O(N^2)$ গতি অত্যন্ত ধীর। কুইক সর্ট বা মার্জ সর্ট এখানে আদর্শ।</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 6. Footer Navigation to Next Algorithm */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1e1930]">
        <button
          onClick={() => onNavigate && onNavigate('sorting')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400" />
          <span>সর্টিং ওভারভিউ (Overview)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting-selection')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-mono text-xs font-bold shadow-lg shadow-fuchsia-600/20 transition-all cursor-pointer"
        >
          <span>পরবর্তী: সিলেকশন সর্ট (Selection Sort)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
