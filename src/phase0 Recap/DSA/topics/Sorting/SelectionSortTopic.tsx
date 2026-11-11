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
  Crown,
  Shuffle
} from 'lucide-react';

interface SelectionStep {
  arr: number[];
  i: number;
  j: number;
  minIdx: number;
  sortedUpTo: number; // Index up to which array is strictly sorted
  isScanning: boolean;
  isSwapping: boolean;
  desc: string;
  isComplete?: boolean;
}

const DEFAULT_ARRAY = [64, 25, 12, 22, 11];

export default function SelectionSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [initialArray, setInitialArray] = useState<number[]>(DEFAULT_ARRAY);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace of Selection Sort
  const trace = useMemo<SelectionStep[]>(() => {
    const steps: SelectionStep[] = [];
    const a = [...initialArray];
    const n = a.length;

    steps.push({
      arr: [...a],
      i: 0,
      j: 0,
      minIdx: 0,
      sortedUpTo: -1,
      isScanning: false,
      isSwapping: false,
      desc: 'শুরু: প্রাথমিক অ্যারে। সিলেকশন সর্ট পুরো অ্যারেকে দুটি অংশে ভাগ করে: বামে সর্টেড জোন এবং ডানে আন-সর্টেড জোন। প্রতি পাসে আন-সর্টেড জোন থেকে সর্বনিম্ন মানটি খুঁজে বের করা হয়।'
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      steps.push({
        arr: [...a],
        i,
        j: i,
        minIdx,
        sortedUpTo: i - 1,
        isScanning: true,
        isSwapping: false,
        desc: `ধাপ ${i + 1} শুরু: ইনডেক্স ${i} এর মান (${a[i]})-কে সাময়িক সর্বনিম্ন (Minimum) ধরে স্ক্যান শুরু করা হলো।`
      });

      for (let j = i + 1; j < n; j++) {
        const isNewMin = a[j] < a[minIdx];
        if (isNewMin) {
          minIdx = j;
        }

        steps.push({
          arr: [...a],
          i,
          j,
          minIdx,
          sortedUpTo: i - 1,
          isScanning: true,
          isSwapping: false,
          desc: `স্ক্যানিং ইনডেক্স ${j} (${a[j]}): ${
            isNewMin
              ? `নতুন সর্বনিম্ন মান পাওয়া গেছে! নতুন চ্যাম্পিয়ন মিনিমাম = ${a[j]} (ইনডেক্স ${j})`
              : `মানটি বর্তমান সর্বনিম্ন (${a[minIdx]}) থেকে বড়, তাই স্ক্যানিং সামনে এগোবে।`
          }`
        });
      }

      // Perform swap if minIdx != i
      if (minIdx !== i) {
        const temp = a[i];
        a[i] = a[minIdx];
        a[minIdx] = temp;

        steps.push({
          arr: [...a],
          i,
          j: n - 1,
          minIdx: i,
          sortedUpTo: i,
          isScanning: false,
          isSwapping: true,
          desc: `সোয়াপ সম্পন্ন! সর্বনিম্ন মান ${a[i]}-কে আন-সর্টেড জোনের শুরুতে (ইনডেক্স ${i}) নিয়ে আসা হলো। সর্টেড জোনের পরিধি ১ ঘর বাড়ল।`
        });
      } else {
        steps.push({
          arr: [...a],
          i,
          j: n - 1,
          minIdx: i,
          sortedUpTo: i,
          isScanning: false,
          isSwapping: false,
          desc: `ইনডেক্স ${i} এর উপাদান (${a[i]}) নিজেই সর্বনিম্ন ছিল, তাই কোনো সোয়াপের প্রয়োজন হয়নি। এটি সর্টেড জোনে যুক্ত হলো।`
        });
      }
    }

    steps.push({
      arr: [...a],
      i: n - 1,
      j: n - 1,
      minIdx: n - 1,
      sortedUpTo: n - 1,
      isScanning: false,
      isSwapping: false,
      isComplete: true,
      desc: 'অভিনন্দন! সিলেকশন সর্ট সম্পন্ন হয়েছে। সবকটি উপাদান চূড়ান্ত সঠিক স্থানে সুবিন্যস্ত।'
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

  return (
    <div className="flex flex-col gap-8 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b1928] via-[#110f1c] to-[#090812] border border-[#3b3252] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Topic 13.2 • Sorting Algorithm
            </span>
            <span className="text-xs text-zinc-400 font-mono">Minimum Value Selector & In-Place Boundary</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>সিলেকশন সর্ট (Selection Sort)</span>
            <span className="text-sm font-mono font-normal px-3 py-1 rounded-full bg-[#2a2218] border border-amber-500/30 text-amber-300">
              O(N²) Comparisons • Strictly O(N) Swaps
            </span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            সিলেকশন সর্ট বারবার অবশিষ্ট অবিন্যস্ত অংশ (Unsorted Zone) থেকে সর্বনিম্ন উপাদানটি বাছাই (Select) করে এবং সেটিকে সর্টেড জোনের শেষে যুক্ত করে। এর বিশেষত্ব হলো প্রতি পাসে সর্বোচ্চ মাত্র ১টি সোয়াপ ঘটে, অর্থাৎ পুরো সর্টিংয়ে মোট সোয়াপ মাত্র $O(N)$!
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
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            🎯 মিনিমাম স্ক্যানার (Live Canvas)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            💻 কোড ও ইনভ্যারিয়েন্ট (TS / Python)
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            📊 মেমোরি রাইট ও ফ্ল্যাশ স্টোরেজ সুবিধা
          </button>
        </div>

        {/* Input presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span>নতুন অ্যারে জেনারেট করুন</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN SIMULATION CANVAS */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="relative rounded-3xl bg-[#0e0c18] border border-[#2d2444] p-6 shadow-2xl overflow-hidden">
            {/* Header Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f1933]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs font-bold shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
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
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>গতি:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#151222] p-1 rounded-xl border border-[#292240] text-xs font-mono">
                  <button
                    onClick={() => setSpeedMs(1800)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1800 ? 'bg-amber-900/60 text-amber-300 font-bold' : 'text-zinc-400'}`}
                  >
                    0.5x
                  </button>
                  <button
                    onClick={() => setSpeedMs(1000)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1000 ? 'bg-amber-900/60 text-amber-300 font-bold' : 'text-zinc-400'}`}
                  >
                    1.0x
                  </button>
                  <button
                    onClick={() => setSpeedMs(500)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 500 ? 'bg-amber-900/60 text-amber-300 font-bold' : 'text-zinc-400'}`}
                  >
                    2.0x
                  </button>
                </div>
              </div>
            </div>

            {/* 2-Zone Visual Representation Bar */}
            <div className="grid grid-cols-2 gap-4 py-4 max-w-xl mx-auto text-xs font-mono">
              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-600/40 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">Sorted Zone (বাম পাশ)</span>
                  <span className="text-zinc-300 font-semibold">{currentStep.sortedUpTo >= 0 ? `ইনডেক্স 0 থেকে ${currentStep.sortedUpTo}` : 'এখনও খালি'}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-600/40 flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">Unsorted Scanner Zone</span>
                  <span className="text-zinc-300 font-semibold">{currentStep.sortedUpTo < initialArray.length - 1 ? `ইনডেক্স ${currentStep.sortedUpTo + 1} থেকে ${initialArray.length - 1}` : 'সম্পূর্ণ সর্টেড'}</span>
                </div>
              </div>
            </div>

            {/* Selection Array Canvas */}
            <div className="py-12 flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-full flex items-end justify-center gap-3 md:gap-5 pb-6">
                {currentStep.arr.map((val: number, idx: number) => {
                  const isSorted = idx <= currentStep.sortedUpTo;
                  const isMin = idx === currentStep.minIdx && !isSorted;
                  const isScanning = idx === currentStep.j && !isSorted && idx !== currentStep.minIdx;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      {/* Card Container */}
                      <div
                        className={`relative w-14 h-24 md:w-16 md:h-28 rounded-2xl flex flex-col items-center justify-between p-2.5 transition-all duration-500 shadow-xl ${
                          isSorted
                            ? 'bg-gradient-to-b from-emerald-900/50 to-emerald-950/80 border-2 border-emerald-500 shadow-emerald-500/20 text-emerald-200'
                            : isMin
                            ? 'bg-gradient-to-b from-amber-500/40 to-amber-900/70 border-2 border-amber-400 -translate-y-4 shadow-amber-500/30 text-white scale-105'
                            : isScanning
                            ? 'bg-gradient-to-b from-sky-600/30 to-sky-950/70 border-2 border-sky-400 -translate-y-2 text-sky-200'
                            : 'bg-[#151224] border border-[#2d2448] text-zinc-300'
                        }`}
                      >
                        {/* Upper Badge */}
                        <div className="text-[10px] font-mono font-bold tracking-tight opacity-90 flex items-center gap-1">
                          {isMin && <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />}
                          <span>{isSorted ? 'SORTED' : isMin ? 'MIN' : isScanning ? 'SCAN' : `[${idx}]`}</span>
                        </div>

                        {/* Value */}
                        <div className="text-xl md:text-2xl font-black font-mono tracking-tight">
                          {val}
                        </div>

                        {/* Bottom Status Indicator */}
                        <div className="w-full flex justify-center">
                          {isSorted ? (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          ) : isMin ? (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          ) : isScanning ? (
                            <span className="w-2 h-2 rounded-full bg-sky-400" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          )}
                        </div>
                      </div>

                      {/* Pointer Labels */}
                      <div className="text-center">
                        <span className="text-[11px] font-mono text-zinc-400 block font-semibold">
                          [{idx}]
                        </span>
                        {idx === currentStep.minIdx && (
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">
                            min_index
                          </span>
                        )}
                        {idx === currentStep.j && idx !== currentStep.minIdx && (
                          <span className="text-[10px] font-mono text-sky-400 font-bold block">
                            scanner j
                          </span>
                        )}
                        {idx === currentStep.i && (
                          <span className="text-[10px] font-mono text-fuchsia-400 font-semibold block">
                            target i
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
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">CURRENT MINIMUM:</span>
                  <span className="text-amber-300 font-bold">{currentStep.arr[currentStep.minIdx]} (ইনডেক্স {currentStep.minIdx})</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">SORTED BOUNDARY:</span>
                  <span className="text-emerald-300 font-bold">{currentStep.sortedUpTo + 1} টি উপাদান স্থায়ী</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">MEMORY WRITES / SWAPS:</span>
                  <span className="text-sky-300 font-bold">সর্বোচ্চ মাত্র O(N) টি সোয়াপ</span>
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
              <span>TypeScript ইমপ্লিমেন্টেশন ও মিনিমাম ইনভ্যারিয়েন্ট</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              প্রতিটি আউটার লুপ পাসে <code className="text-amber-400">minIdx</code> ট্র্যাক করা হয়। পুরো আন-সর্টেড অংশ স্ক্যান শেষ হওয়া মাত্র ১টি সিঙ্গেল সোয়াপের মাধ্যমে ক্ষুদ্রতম মানটি সঠিক জায়গায় বসে যায়।
            </p>
            <pre className="p-4 rounded-2xl bg-[#07060d] border border-[#221a38] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i; // শুরুতে বর্তমান পাসের প্রথম উপাদানকেই সর্বনিম্ন ধরা হয়

    // আন-সর্টেড অংশ স্ক্যান করে আসল সর্বনিম্ন উপাদানের ইনডেক্স খুঁজে বের করা
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j; // নতুন সর্বনিম্ন পেলে ট্র্যাকার আপডেট
      }
    }

    // পাসের শেষে মাত্র ১টি সোয়াপ (যদি ইতিমধ্যে সঠিক স্থানে না থাকে)
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }

  return arr;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* 5. COMPLEXITY & HARDWARE BENEFIT */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>কমপ্লেক্সিটি ম্যাট্রিক্স</span>
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Best Case Time:</span>
                <span className="text-rose-400 font-bold">O(N²) (কারণ পুরো আন-সর্টেড স্ক্যান করতেই হয়)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Average Case Time:</span>
                <span className="text-amber-400 font-bold">O(N²)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Worst Case Time:</span>
                <span className="text-rose-400 font-bold">O(N²)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Memory Swaps (Writes):</span>
                <span className="text-emerald-400 font-bold">Strictly O(N) — সর্বোচ্চ N-1 টি সোয়াপ</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#141022] border border-[#261d3d]">
                <span className="text-zinc-400">Stability:</span>
                <span className="text-rose-400 font-bold">Unstable (দূরপাল্লার সোয়াপে সমমানের ক্রম নষ্ট হতে পারে)</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-sky-400" />
              <span>হার্ডওয়্যার ও ফ্ল্যাশ মেমোরির বিশেষ সুবিধা</span>
            </h3>
            <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><b>EEPROM ও Flash Memory:</b> ফ্ল্যাশ স্টোরেজে রিড অপারেশন সস্তা কিন্তু রাইট অপারেশন হার্ডওয়্যার ক্ষয় (Wear-out) করে। যেহেতু সিলেকশন সর্টে সর্বোচ্চ $N-1$ টি রাইট হয়, তাই যেখানে মেমোরি রাইট সীমিত করা বাধ্যতামূলক সেখানে এটি অত্যন্ত উপযোগী।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><b>সহজ মেমোরি সীমাবদ্ধতা:</b> এক্সট্রা কোনো মেমোরি বরাদ্দ নেয় না ($O(1)$ auxiliary space)।</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 6. Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1e1930]">
        <button
          onClick={() => onNavigate && onNavigate('sorting-bubble')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400" />
          <span>পূর্ববর্তী: বাবল সর্ট (Bubble Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting-insertion')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-mono text-xs font-bold shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
        >
          <span>পরবর্তী: ইনসার্শন সর্ট (Insertion Sort)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
