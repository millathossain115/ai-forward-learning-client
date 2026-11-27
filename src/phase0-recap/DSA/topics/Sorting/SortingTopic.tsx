'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AlgoKey, ALGOS } from './types';
import {
  BUBBLE_TRACE,
  SELECTION_TRACE,
  INSERTION_TRACE,
  MERGE_TRACE,
  QUICK_TRACE
} from './utils/sortingOverviewTraces';

const TabFallback = () => (
  <div className="h-64 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
    Loading visualizer...
  </div>
);

const BubbleVisualizer = dynamic(() => import('./components/BubbleVisualizer'), {
  loading: () => <TabFallback />
});
const SelectionVisualizer = dynamic(() => import('./components/SelectionVisualizer'), {
  loading: () => <TabFallback />
});
const InsertionVisualizer = dynamic(() => import('./components/InsertionVisualizer'), {
  loading: () => <TabFallback />
});
const MergeTreeVisualizer = dynamic(() => import('./components/MergeTreeVisualizer'), {
  loading: () => <TabFallback />
});
const QuickZoneVisualizer = dynamic(() => import('./components/QuickZoneVisualizer'), {
  loading: () => <TabFallback />
});
const ComplexityGrowthTable = dynamic(() => import('./components/ComplexityGrowthTable'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
      Loading table...
    </div>
  )
});

export default function SortingTopic() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgoKey>('bubble');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const speedMs = 1200; // 0.5x readable speed
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active algorithm info
  const algo = ALGOS.find((a) => a.id === selectedAlgo) || ALGOS[0];

  // Determine current active trace length
  const activeTraceLength = useMemo(() => {
    switch (selectedAlgo) {
      case 'bubble': return BUBBLE_TRACE.length;
      case 'selection': return SELECTION_TRACE.length;
      case 'insertion': return INSERTION_TRACE.length;
      case 'merge': return MERGE_TRACE.length;
      case 'quick': return QUICK_TRACE.length;
    }
  }, [selectedAlgo]);

  // Handle switching algorithm
  const handleSelectAlgo = (key: AlgoKey) => {
    setIsPlaying(false);
    setSelectedAlgo(key);
    setStepIdx(0);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < activeTraceLength - 1) return prev + 1;
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
  }, [isPlaying, activeTraceLength, speedMs]);

  const isAtEnd = stepIdx >= activeTraceLength - 1;

  return (
    <div className="flex flex-col gap-10 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1429] via-[#100d1c] to-[#080710] border border-[#33224f] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Topic 13 • Sorting Algorithms
            </span>
            <span className="text-xs text-zinc-500 font-mono">Dedicated Visual Metaphors</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white">
            সর্টিং অ্যালগরিদম: নিজস্ব মেকানিজম ও ভিজ্যুয়াল সিমুলেশন
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            প্রতিটি সর্টিং অ্যালগরিদমের নিজস্ব স্বকীয় গাণিতিক সৌন্দর্য রয়েছে। সাধারণ বার চার্টের কৃত্রিম রূপ বাদ দিয়ে প্রতিটি অ্যালগরিদমের মূল তত্ত্ব অনুযায়ী—যেমন <b>তাসের পকেট ইনসার্শন</b>, <b>মার্জ সর্টের ডিভাইড ট্রি</b> এবং <b>কুইক সর্টের পিভট জোন</b>—আলাদাভাবে নিচে সাজানো হয়েছে।
          </p>
        </div>
      </div>

      {/* 2. THE 5 DEDICATED ALGORITHM SELECTOR CARDS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>সর্টিং অ্যালগরিদম বেছে নিন (Choose Algorithm):</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-400">ডিফল্ট স্পিড: ০.৫x (আরামদায়ক ১.২ সেকেন্ড)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ALGOS.map((item) => {
            const isSelected = selectedAlgo === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectAlgo(item.id)}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between space-y-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#18152e] border-amber-500/80 shadow-lg shadow-amber-500/15'
                    : 'bg-[#0f111a] border-[#1d2235] hover:border-[#2f3856] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        item.badgeType === 'amber'
                          ? 'bg-amber-950/80 border-amber-700/80 text-amber-300'
                          : 'bg-sky-950/80 border-sky-700/80 text-sky-300'
                      }`}
                    >
                      {item.timeComplexity}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">{item.spaceComplexity} mem</span>
                  </div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                    {item.name}
                  </h4>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {item.badge}
                </p>

                <div className="pt-2 border-t border-[#1e243a] text-[10px] font-mono text-amber-400/90 flex items-center justify-between">
                  <span>{isSelected ? '✓ সক্রিয় ক্যানভাস' : 'দেখতে ক্লিক করুন'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DEDICATED VISUAL CANVAS FOR THE SELECTED ALGORITHM */}
      <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
        {/* Top Control Overlay & Context */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
          <div className="space-y-1">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{algo.name}: নিজস্ব ভিজ্যুয়াল সিমুলেশন</span>
            </h2>
            <p className="text-xs text-zinc-400">{algo.mechanic}</p>
          </div>

          {/* Integrated Playback Controls */}
          <div className="bg-[#0d101e]/90 backdrop-blur-md border border-[#212742] p-1.5 rounded-xl flex items-center gap-2 shadow-xl">
            {/* Step Back */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx((prev) => Math.max(0, prev - 1));
              }}
              disabled={stepIdx === 0 || isPlaying}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
              title="এক ধাপ পেছনে যান"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={isAtEnd}
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
                setStepIdx((prev) => Math.min(activeTraceLength - 1, prev + 1));
              }}
              disabled={isAtEnd || isPlaying}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] disabled:opacity-30 text-zinc-300 border border-[#232942] transition-colors cursor-pointer"
              title="এক ধাপ সামনে যান"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Reset */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx(0);
              }}
              className="p-1.5 rounded-lg bg-[#141726] hover:bg-[#1d2238] text-zinc-400 hover:text-zinc-200 border border-[#232942] transition-colors cursor-pointer"
              title="রিসেট করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Step indicator */}
            <div className="text-[11px] font-mono text-zinc-400 px-1 border-l border-[#212742]">
              ধাপ <span className="text-amber-400 font-bold">{stepIdx + 1}</span> / {activeTraceLength}
            </div>
          </div>
        </div>

        {/* Dynamic Canvas Selection */}
        {selectedAlgo === 'bubble' && <BubbleVisualizer step={BUBBLE_TRACE[stepIdx]} />}
        {selectedAlgo === 'selection' && <SelectionVisualizer step={SELECTION_TRACE[stepIdx]} />}
        {selectedAlgo === 'insertion' && <InsertionVisualizer step={INSERTION_TRACE[stepIdx]} />}
        {selectedAlgo === 'merge' && <MergeTreeVisualizer step={MERGE_TRACE[stepIdx]} />}
        {selectedAlgo === 'quick' && <QuickZoneVisualizer step={QUICK_TRACE[stepIdx]} />}
      </div>

      {/* 4. Efficiency Growth Table: Quadratic O(N^2) vs Log-Linear O(N log N) */}
      <ComplexityGrowthTable />

      {/* 5. Real-Life Production Engineering Scenarios */}
      <RealLifeScenario
        topicName="সর্টিং অ্যালগরিদমের বাস্তব প্রয়োগ (Real-World Scenarios)"
        scenarios={[
          {
            title: "১. হাতের খেলার তাস ক্রমানুসারে সাজানো (Playing Cards)",
            subtitle: "নতুন কার্ড এলে বাঁহাতের সঠিক স্লটে গুঁজে দেওয়া",
            badge: "Insertion Sort (Small Data)",
            visualTag: "Adaptive O(N)",
            accentColor: "amber",
            analogy:
              "তাসের খেলায় হাতে নতুন কার্ড আসলে আমরা বাঁহাতের সাজানো কার্ডগুলোর মাঝে সঠিক স্লটটি খুঁজে সেখানে গুঁজে দেই। ডানের কার্ডগুলো সামান্য ডানে সরে গিয়ে জায়গা করে দেয়। ছোট ডেটাসেটে এটি দ্রুততম!",
            whyItFits:
              "বাস্তবে মানুষ স্বজ্ঞাতভাবে ছোট ডেটা বা প্রায় সাজানো ডেটায় Insertion Sort ব্যবহার করে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-300 py-1">
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800">[3, 7, 9]</span>
                <span>+ তাস 5 ➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">[3, 5, 7, 9]</span>
              </div>
            ),
          },
          {
            title: "২. ডেটাবেজে গিগাবাইট পরিমাণ ডেটা সাজানো (SQL ORDER BY)",
            subtitle: "র‍্যামের বাইরে ডিস্কে থাকা কোটি কোটি রেকর্ডের এক্সটার্নাল সর্ট",
            badge: "Merge Sort (External)",
            visualTag: "O(N log N) Stable",
            accentColor: "sky",
            analogy:
              "ডেটাবেজে যখন ১০০ গিগাবাইটের টেবিল সর্ট করতে হয় যা ১৬ জিবি র‍্যামে ধরে না, তখন ডেটাবেজ এক্সটার্নাল মার্জ সর্ট ব্যবহার করে। ছোট ছোট চাঙ্ক ডিস্কে সর্ট করে নিয়ে পরে মার্জ করে ফেলে।",
            whyItFits:
              "মার্জ সর্টের স্থিতিশীলতা (Stability) এবং সিকোয়েনশিয়াল রিড-রাইট প্যাটার্ন ডেটাবেজ ইঞ্জিনের জন্য অপরিহার্য।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">Chunk 1</span>
                <span>+</span>
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-800">Chunk 2</span>
                <span>➔ Merge ➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold">Sorted File</span>
              </div>
            ),
          },
          {
            title: "৩. ভি৮ জাভাস্ক্রিপ্ট ও পাইথনে বিল্ট-ইন সর্ট (Timsort & Quicksort)",
            subtitle: "প্রোগ্রামিং ল্যাঙ্গুয়েজের Array.prototype.sort() মেকানিজম",
            badge: "Quick Sort / Timsort",
            visualTag: "High Cache Locality",
            accentColor: "emerald",
            analogy:
              "জাভাস্ক্রিপ্ট বা পাইথনের মতো আধুনিক প্রোগ্রামিং ল্যাঙ্গুয়েজ সাধারণ একটি অ্যালগরিদমের ওপর নির্ভর করে না। বড় অংশের জন্য কুইক/মার্জ সর্ট চালায় এবং খণ্ডগুলো যখন ছোট (যেমন ৩২-এর নিচে) হয়ে যায়, তখন ইনসার্শন সর্ট দিয়ে শেষ করে। একে বলে হাইব্রিড সর্ট!",
            whyItFits:
              "CPU ক্যাশ লোকালিটি এবং প্র্যাকটিক্যাল গতির সমন্বয়ে কুইক সর্টের নীতি আধুনিক সফটওয়্যারের প্রাণ।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">Divide &amp; Conquer</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">Optimal Speed</span>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
