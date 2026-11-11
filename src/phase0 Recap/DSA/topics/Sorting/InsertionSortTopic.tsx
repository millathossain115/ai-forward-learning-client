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
  Shuffle,
  Layers
} from 'lucide-react';

interface InsertionStep {
  arr: (number | null)[]; // null represents open slot where card was lifted
  keyVal: number | null;
  keyOriginalIdx: number;
  activeCompareIdx: number | null;
  sortedUpTo: number;
  shiftingIdx: number | null;
  desc: string;
  isComplete?: boolean;
}

const DEFAULT_ARRAY = [43, 31, 26, 88, 12];

export default function InsertionSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [initialArray, setInitialArray] = useState<number[]>(DEFAULT_ARRAY);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace of Insertion Sort with Card Lifting and Slot Shifting
  const trace = useMemo<InsertionStep[]>(() => {
    const steps: InsertionStep[] = [];
    const a: number[] = [...initialArray];
    const n = a.length;

    steps.push({
      arr: [...a],
      keyVal: null,
      keyOriginalIdx: 0,
      activeCompareIdx: null,
      sortedUpTo: 0,
      shiftingIdx: null,
      desc: 'শুরু: প্রথম কার্ডটি [ইনডেক্স 0] ইতিমধ্যে একা থাকায় নিজ স্থানে সর্টেড হিসেবে গণ্য হয়। ইনডেক্স ১ থেকে কি-কার্ড তোলা শুরু হবে।'
    });

    for (let i = 1; i < n; i++) {
      const key = a[i];

      // Step 1: Lift key card
      const displayArr: (number | null)[] = [...a];
      displayArr[i] = null; // empty pocket slot

      steps.push({
        arr: [...displayArr],
        keyVal: key,
        keyOriginalIdx: i,
        activeCompareIdx: i - 1,
        sortedUpTo: i - 1,
        shiftingIdx: null,
        desc: `কার্ড তোলা হলো (Lift Key): ইনডেক্স ${i}-এর কার্ড (${key})-কে হাত থেকে উপরে তুলে নেওয়া হলো। বামের সর্টেড কার্ডগুলোর সাথে তুলনা করে এর সঠিক পকেট খোঁজা হবে।`
      });

      let j = i - 1;

      while (j >= 0 && a[j] > key) {
        // Step 2: Shift right
        displayArr[j + 1] = a[j];
        displayArr[j] = null; // pocket moves left
        a[j + 1] = a[j];

        steps.push({
          arr: [...displayArr],
          keyVal: key,
          keyOriginalIdx: i,
          activeCompareIdx: j,
          sortedUpTo: i - 1,
          shiftingIdx: j,
          desc: `ডানে শিফট: ${a[j + 1]} > ${key}, তাই ${a[j + 1]}-কে এক ঘর ডানে সরিয়ে পকেট খালি করা হলো।`
        });

        j--;
      }

      // Step 3: Insert into pocket
      a[j + 1] = key;
      displayArr[j + 1] = key;

      steps.push({
        arr: [...a],
        keyVal: null,
        keyOriginalIdx: i,
        activeCompareIdx: null,
        sortedUpTo: i,
        shiftingIdx: null,
        desc: `কার্ড স্থাপন (Insert): কি-কার্ড (${key})-কে ইনডেক্স ${j + 1}-এর ফাঁকা পকেটে নামিয়ে দেওয়া হলো! ইনডেক্স ০ থেকে ${i} পর্যন্ত অংশটি এখন সর্টেড।`
      });
    }

    steps.push({
      arr: [...a],
      keyVal: null,
      keyOriginalIdx: n - 1,
      activeCompareIdx: null,
      sortedUpTo: n - 1,
      shiftingIdx: null,
      isComplete: true,
      desc: 'অভিনন্দন! খেলোয়াড়ের তাসের হাতের মতোই সমস্ত উপাদান নিজ নিজ সঠিক পকেটে ইনসার্ট হয়ে সর্টেড হয়ে গেছে!'
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
    const newArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
    setInitialArray(newArr);
    setStepIdx(0);
  };

  const handleNearlySorted = () => {
    setIsPlaying(false);
    setInitialArray([10, 20, 30, 25, 50]);
    setStepIdx(0);
  };

  return (
    <div className="flex flex-col gap-8 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161a2b] via-[#0d1221] to-[#070914] border border-[#2b395e] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold">
              Topic 13.3 • Sorting Algorithm
            </span>
            <span className="text-xs text-zinc-400 font-mono">Hand of Cards Metaphor & Shift-Insertion</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>ইনসার্শন সর্ট (Insertion Sort)</span>
            <span className="text-sm font-mono font-normal px-3 py-1 rounded-full bg-[#17203b] border border-indigo-500/30 text-indigo-300">
              O(N) Best • Real Engine Hybrid Standard
            </span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            তাসের খেলোয়াড়রা যেভাবে হাতে একটি নতুন কার্ড তুলে নিয়ে বামের সাজানো কার্ডগুলোর সাথে তুলনা করে ডানদিকে জায়গা ফাঁকা করে সঠিক খাঁজে কার্ডটি ঢুকিয়ে দেয়—ইনসার্শন সর্ট ঠিক সেভাবেই কাজ করে।
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
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            🃏 তাসের হাত সিমুলেশন (Card Canvas)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            💻 কোড ও শিফটিং মেকানিজম
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            🚀 V8 Engine & Timsort এ ব্যবহার
          </button>
        </div>

        {/* Input presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Randomize</span>
          </button>
          <button
            onClick={handleNearlySorted}
            className="px-3 py-1.5 rounded-xl bg-[#161224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
          >
            Nearly Sorted (O(N) Demo)
          </button>
        </div>
      </div>

      {/* 3. MAIN SIMULATION CANVAS */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="relative rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl overflow-hidden">
            {/* Header Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1c2642]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play Simulation'}</span>
                </button>

                <div className="flex items-center gap-1 bg-[#12182b] p-1 rounded-xl border border-[#202d4e]">
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(Math.max(0, stepIdx - 1)); }}
                    disabled={stepIdx === 0}
                    className="p-1.5 rounded-lg hover:bg-[#1a2542] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
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
                    className="p-1.5 rounded-lg hover:bg-[#1a2542] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                    title="Step Forward"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(0); }}
                    className="p-1.5 rounded-lg hover:bg-[#1a2542] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                    title="Reset to Step 1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Speed presets */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>গতি:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#12182b] p-1 rounded-xl border border-[#202d4e] text-xs font-mono">
                  <button
                    onClick={() => setSpeedMs(1800)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1800 ? 'bg-indigo-900/60 text-indigo-300 font-bold' : 'text-zinc-400'}`}
                  >
                    0.5x
                  </button>
                  <button
                    onClick={() => setSpeedMs(1000)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1000 ? 'bg-indigo-900/60 text-indigo-300 font-bold' : 'text-zinc-400'}`}
                  >
                    1.0x
                  </button>
                  <button
                    onClick={() => setSpeedMs(500)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 500 ? 'bg-indigo-900/60 text-indigo-300 font-bold' : 'text-zinc-400'}`}
                  >
                    2.0x
                  </button>
                </div>
              </div>
            </div>

            {/* Lifted Key Card Viewport */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="h-20 flex flex-col items-center justify-center">
                {currentStep.keyVal !== null ? (
                  <div className="flex flex-col items-center animate-bounce">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider mb-1">
                      হাতে তোলা কি-কার্ড (Active Key)
                    </span>
                    <div className="w-16 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 border-2 border-indigo-300 flex items-center justify-center text-xl font-mono font-black text-white shadow-xl shadow-indigo-500/40">
                      {currentStep.keyVal}
                    </div>
                  </div>
                ) : (
                  <span className="text-xs font-mono text-zinc-500 italic">
                    কোনো কার্ড বর্তমানে উপরে তোলা নেই (হাতে কার্ড সাজানো রয়েছে)
                  </span>
                )}
              </div>

              {/* Hand of Cards Rack */}
              <div className="w-full flex items-end justify-center gap-3 md:gap-5 py-6">
                {currentStep.arr.map((val: number | null, idx: number) => {
                  const isSortedHand = idx <= currentStep.sortedUpTo;
                  const isSlotEmpty = val === null;
                  const isBeingCompared = currentStep.activeCompareIdx === idx;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-3">
                      {/* Slot Container */}
                      <div
                        className={`relative w-14 h-24 md:w-16 md:h-28 rounded-2xl flex flex-col items-center justify-between p-2.5 transition-all duration-500 shadow-xl ${
                          isSlotEmpty
                            ? 'bg-transparent border-2 border-dashed border-indigo-500/40 text-indigo-400/40'
                            : isBeingCompared
                            ? 'bg-gradient-to-b from-amber-600/40 to-amber-950/70 border-2 border-amber-400 -translate-y-2 text-amber-200'
                            : isSortedHand
                            ? 'bg-gradient-to-b from-indigo-900/40 to-indigo-950/80 border-2 border-indigo-500 shadow-indigo-500/20 text-indigo-200'
                            : 'bg-[#121626] border border-[#212b45] text-zinc-400'
                        }`}
                      >
                        {/* Upper Badge */}
                        <div className="text-[10px] font-mono font-bold tracking-tight opacity-90">
                          {isSlotEmpty ? 'EMPTY' : isSortedHand ? 'HAND' : `[${idx}]`}
                        </div>

                        {/* Value */}
                        <div className="text-xl md:text-2xl font-black font-mono tracking-tight">
                          {isSlotEmpty ? '?' : val}
                        </div>

                        {/* Bottom Status */}
                        <div className="w-full flex justify-center">
                          {isSlotEmpty ? (
                            <span className="w-2 h-2 rounded-full border border-indigo-400" />
                          ) : isSortedHand ? (
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                          )}
                        </div>
                      </div>

                      {/* Labels */}
                      <div className="text-center">
                        <span className="text-[11px] font-mono text-zinc-400 block font-semibold">
                          পকেট {idx}
                        </span>
                        {isBeingCompared && (
                          <span className="text-[10px] font-mono text-amber-400 font-bold block">
                            তুলনাধীন
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Explanation Card */}
              <div className="w-full max-w-2xl mt-4 p-4 rounded-2xl bg-[#12182b] border border-[#202d4e] text-center shadow-lg">
                <p className="text-xs md:text-sm font-medium text-zinc-200 leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Invariant Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-[#1c2642] text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#0f1424] border border-[#1b253f] flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">SORTED HAND:</span>
                  <span className="text-indigo-300 font-bold">০ থেকে {currentStep.sortedUpTo} ইনডেক্স সুবিন্যস্ত</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0f1424] border border-[#1b253f] flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">BEST CASE ADAPTIVITY:</span>
                  <span className="text-amber-300 font-bold">প্রায় সর্টেড হলে মাত্র O(N)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0f1424] border border-[#1b253f] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">STABILITY:</span>
                  <span className="text-emerald-300 font-bold">Strictly Stable (অর্ডার অক্ষুণ্ণ থাকে)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CODE WALKTHROUGH */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>TypeScript ইমপ্লিমেন্টেশন ও শিফট লুপ</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              ইনসার্শন সর্টের মূল সৌন্দর্য হলো এটি সোয়াপ (Swap) করার বদলে উপাদানগুলোকে সরাসরি এক ঘর করে ডানে শিফট করে, যা মেমোরি অ্যাসাইনমেন্টের সংখ্যা অর্ধেক কমিয়ে দেয়।
            </p>
            <pre className="p-4 rounded-2xl bg-[#070914] border border-[#1d2742] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i]; // কার্ডটি তুলে নেওয়া হলো
    let j = i - 1;

    // কি-কার্ডের চেয়ে বড় উপাদানগুলোকে ডানে ১ ঘর শিফট করা
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // ফাঁকা হওয়া সঠিক পকেটে কি-কার্ডটি স্থাপন
    arr[j + 1] = key;
  }

  return arr;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* 5. V8 & TIMSORT CASES */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>বাস্তব ইঞ্জিনগুলোতে ব্যবহারের গোপন রহস্য</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              তাত্ত্বিকভাবে $O(N^2)$ হলেও ক্ষুদ্র ডেটাসেটে ($N \le 32$) ইনসার্শন সর্ট এমনকি কুইক সর্ট বা মার্জ সর্টের চেয়েও দ্রুত কাজ করে!
            </p>
            <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span><b>V8 JavaScript Engine (Node.js & Chrome):</b> অ্যারের দৈর্ঘ্য ১০ এর কম হলে V8 স্বয়ংক্রিয়ভাবে ইনসার্শন সর্ট ব্যবহার করে।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><b>Python & Java (Timsort):</b> পাইথনের ডিফল্ট <code>sort()</code> এবং জাভার অবজেক্ট সর্টে মার্জ সর্ট ও ইনসার্শন সর্টের সংকর তৈরি করা হয়েছে। পার্টিশনের আকার ৩২ এর নিচে নামলেই ইনসার্শন সর্ট কার্যকর হয়।</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>কমপ্লেক্সিটি চার্ট</span>
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
                <span className="text-zinc-400">Best Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N) (অলরেডি সাজানো থাকলে)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
                <span className="text-zinc-400">Average Case Time:</span>
                <span className="text-amber-400 font-bold">O(N²)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
                <span className="text-zinc-400">Worst Case Time:</span>
                <span className="text-rose-400 font-bold">O(N²) (সম্পূর্ণ বিপরীত ক্রম)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
                <span className="text-zinc-400">Auxiliary Space:</span>
                <span className="text-emerald-400 font-bold">O(1) (In-Place Memory)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#12182b] border border-[#202d4e]">
                <span className="text-zinc-400">Adaptive & Online:</span>
                <span className="text-emerald-400 font-bold">Yes (লাইভ ডেটা স্ট্রিমে উপযুক্ত)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1e1930]">
        <button
          onClick={() => onNavigate && onNavigate('sorting-selection')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400" />
          <span>পূর্ববর্তী: সিলেকশন সর্ট (Selection Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting-merge')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span>পরবর্তী: মার্জ সর্ট (Merge Sort)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
