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
  Target,
  Shuffle
} from 'lucide-react';

interface QuickStep {
  arr: number[];
  pivotIdx: number;
  pivotVal: number;
  comparingIdx?: number;
  leftZone: number[];
  rightZone: number[];
  placed?: boolean;
  desc: string;
  isComplete?: boolean;
}

export default function QuickSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Concrete trace illustrating 3-zone partitioning
  const trace = useMemo<QuickStep[]>(() => [
    {
      arr: [38, 82, 10, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      leftZone: [],
      rightZone: [],
      desc: 'ধাপ ১ (পিভট নির্বাচন): শেষ উপাদান ২৭-কে মূল রেফারেন্স পিভট (Pivot) ধরা হলো। লক্ষ্য: ২৭ এর চেয়ে ছোটগুলোকে বাম জোনে এবং বড়গুলোকে ডান জোনে ভাগ করা।'
    },
    {
      arr: [38, 82, 10, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 0,
      leftZone: [],
      rightZone: [38],
      desc: 'স্ক্যান ১: উপাদান ৩৮ > ২৭, এটি বড় হওয়ায় বড়দের জোন (Right Zone)-এ পাঠানো হলো।'
    },
    {
      arr: [38, 82, 10, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 1,
      leftZone: [],
      rightZone: [38, 82],
      desc: 'স্ক্যান ২: উপাদান ৮২ > ২৭, এটিও বড়দের জোন (Right Zone)-এ যুক্ত হলো।'
    },
    {
      arr: [10, 82, 38, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 2,
      leftZone: [10],
      rightZone: [38, 82],
      desc: 'স্ক্যান ৩: উপাদান ১০ < ২৭, এটি ছোট! তাই ১০-কে সোয়াপ করে সামনে ছোটদের জোন (Left Zone)-এ নেওয়া হলো।'
    },
    {
      arr: [10, 82, 38, 43, 27],
      pivotIdx: 4,
      pivotVal: 27,
      comparingIdx: 3,
      leftZone: [10],
      rightZone: [38, 82, 43],
      desc: 'স্ক্যান ৪: উপাদান ৪৩ > ২৭, এটি বড়দের জোন (Right Zone)-এ রাখা হলো। সবকটি উপাদানের তুলনা সম্পন্ন!'
    },
    {
      arr: [10, 27, 38, 43, 82],
      pivotIdx: 1,
      pivotVal: 27,
      leftZone: [10],
      rightZone: [38, 43, 82],
      placed: true,
      desc: 'ধাপ ২ (পিভট লক): পিভট ২৭-কে বাম জোন [১০] এবং ডান জোন [৩৮, ৪৩, ৮২]-এর ঠিক মাঝখানে ইনডেক্স ১ এ স্থায়ী লক করা হলো!'
    },
    {
      arr: [10, 27, 38, 43, 82],
      pivotIdx: -1,
      pivotVal: -1,
      leftZone: [10],
      rightZone: [38, 43, 82],
      placed: true,
      isComplete: true,
      desc: 'ধাপ ৩: উভয় পাশে রিকার্সিভ পার্টিশন চালিয়ে সম্পূর্ণ অ্যারে ও(N log N) গড়ে সর্টেড: [১০, ২৭, ৩৮, ৪৩, ৮২]!'
    }
  ], []);

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

  return (
    <div className="flex flex-col gap-8 w-full text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#281515] via-[#1c0d0d] to-[#0d0707] border border-[#522525] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
              Topic 13.5 • Sorting Algorithm
            </span>
            <span className="text-xs text-zinc-400 font-mono">Pivot Partitioning • In-Place Cache Locality</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <span>কুইক সর্ট (Quick Sort)</span>
            <span className="text-sm font-mono font-normal px-3 py-1 rounded-full bg-[#361616] border border-rose-500/30 text-rose-300">
              Blazing Fast O(N log N) Average • O(1) Extra Space
            </span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            টনি হোয়ার কর্তৃক ১৯৬০ সালে উদ্ভাবিত কুইক সর্ট কম্পিউটিং জগতের সবচেয়ে জনপ্রিয় এবং কার্যকর সর্টিং অ্যালগরিদম। একটি পিভট (Pivot) উপাদান বেছে নিয়ে অ্যারের সকল উপাদানকে পিভটের চেয়ে ছোট ও বড় অংশে ভাগ (Partition) করাই এর মূল কৌশল।
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
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            🎯 ৩-জোন পার্টিশন ভিউ (Live Canvas)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            💻 লোমুটো পার্টিশন কোড (TypeScript)
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            ⚡ ক্যাশ লোকালিটি ও ডুয়াল-পিভট
          </button>
        </div>

        {/* Pivot Indicator */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl font-mono text-xs font-bold bg-amber-950/50 border border-amber-500 text-amber-300 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>সক্রিয় পিভট: {currentStep.pivotVal > 0 ? currentStep.pivotVal : 'সম্পূর্ণ সর্টেড'}</span>
          </span>
        </div>
      </div>

      {/* 3. MAIN SIMULATION CANVAS */}
      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <div className="relative rounded-3xl bg-[#140b0b] border border-[#3d1919] p-6 shadow-2xl overflow-hidden">
            {/* Header Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2d1414]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play Simulation'}</span>
                </button>

                <div className="flex items-center gap-1 bg-[#201010] p-1 rounded-xl border border-[#3d1c1c]">
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(Math.max(0, stepIdx - 1)); }}
                    disabled={stepIdx === 0}
                    className="p-1.5 rounded-lg hover:bg-[#301616] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
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
                    className="p-1.5 rounded-lg hover:bg-[#301616] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                    title="Step Forward"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setIsPlaying(false); setStepIdx(0); }}
                    className="p-1.5 rounded-lg hover:bg-[#301616] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                    title="Reset to Step 1"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Speed presets */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  <span>গতি:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#201010] p-1 rounded-xl border border-[#3d1c1c] text-xs font-mono">
                  <button
                    onClick={() => setSpeedMs(1800)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1800 ? 'bg-rose-900/60 text-rose-300 font-bold' : 'text-zinc-400'}`}
                  >
                    0.5x
                  </button>
                  <button
                    onClick={() => setSpeedMs(1200)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 1200 ? 'bg-rose-900/60 text-rose-300 font-bold' : 'text-zinc-400'}`}
                  >
                    1.0x
                  </button>
                  <button
                    onClick={() => setSpeedMs(600)}
                    className={`px-2 py-1 rounded-md transition-colors ${speedMs === 600 ? 'bg-rose-900/60 text-rose-300 font-bold' : 'text-zinc-400'}`}
                  >
                    2.0x
                  </button>
                </div>
              </div>
            </div>

            {/* 3-Zone Compartments Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
              {/* Left Zone (< Pivot) */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-700/50 flex flex-col items-center justify-center min-h-[130px] space-y-2">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
                  Left Zone (&lt; Pivot)
                </span>
                <div className="flex items-center gap-2">
                  {(!currentStep.leftZone || currentStep.leftZone.length === 0) ? (
                    <span className="text-xs text-zinc-500 italic">এখনও কোনো ছোট মান নেই</span>
                  ) : (
                    currentStep.leftZone.map((v: number, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-indigo-900 border border-indigo-600 text-sm font-mono font-bold text-indigo-200">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Center Zone: Pivot Target */}
              <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-400 flex flex-col items-center justify-center min-h-[130px] space-y-2 shadow-lg shadow-amber-500/10">
                <span className="text-[10px] font-mono text-amber-300 uppercase font-bold tracking-wider flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>মূল পিভট (Pivot)</span>
                </span>
                <div className="text-3xl font-mono font-black text-white">
                  {currentStep.pivotVal > 0 ? currentStep.pivotVal : '✓'}
                </div>
                <span className="text-[10px] font-mono text-amber-400/80">
                  {currentStep.placed ? 'চূড়ান্ত স্থানে লকড' : 'রেফারেন্স এলিমেন্ট'}
                </span>
              </div>

              {/* Right Zone (> Pivot) */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-700/50 flex flex-col items-center justify-center min-h-[130px] space-y-2">
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider">
                  Right Zone (&gt; Pivot)
                </span>
                <div className="flex items-center gap-2">
                  {(!currentStep.rightZone || currentStep.rightZone.length === 0) ? (
                    <span className="text-xs text-zinc-500 italic">এখনও কোনো বড় মান নেই</span>
                  ) : (
                    currentStep.rightZone.map((v: number, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-rose-900 border border-rose-600 text-sm font-mono font-bold text-rose-200">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Overall Array View */}
            <div className="py-6 flex flex-col items-center justify-center border-t border-[#2d1414]">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold mb-4">
                সম্পূর্ণ অ্যারে ও সোয়াপ অবস্থা
              </span>
              <div className="flex items-center justify-center gap-3 md:gap-5">
                {currentStep.arr.map((val: number, idx: number) => {
                  const isPivot = idx === currentStep.pivotIdx;
                  const isComparing = idx === currentStep.comparingIdx;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-14 h-20 md:w-16 md:h-24 rounded-2xl flex flex-col items-center justify-center font-mono font-black text-xl transition-all duration-300 ${
                          isPivot
                            ? 'bg-amber-500 border-2 border-amber-300 text-black shadow-lg shadow-amber-500/40 -translate-y-2'
                            : isComparing
                            ? 'bg-rose-600/40 border-2 border-rose-400 text-rose-200 -translate-y-1'
                            : 'bg-[#201010] border border-[#3b1919] text-zinc-200'
                        }`}
                      >
                        {val}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">[{idx}]</span>
                      {isPivot && <span className="text-[10px] font-mono text-amber-400 font-bold">PIVOT</span>}
                      {isComparing && <span className="text-[10px] font-mono text-rose-400 font-bold">SCAN</span>}
                    </div>
                  );
                })}
              </div>

              {/* Status Explanation Card */}
              <div className="w-full max-w-2xl mt-6 p-4 rounded-2xl bg-[#1e0f0f] border border-[#3b1919] text-center shadow-lg">
                <p className="text-xs md:text-sm font-medium text-zinc-200 leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Invariant Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-[#2d1414] text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#1a0c0c] border border-[#2b1212] flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">CACHE EFFICIENCY:</span>
                  <span className="text-rose-300 font-bold">In-Place Array Partitioning</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1a0c0c] border border-[#2b1212] flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">AVERAGE PERFORMANCE:</span>
                  <span className="text-emerald-300 font-bold">O(N log N) Blazing Speed</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#1a0c0c] border border-[#2b1212] flex items-center gap-2.5">
                <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="text-zinc-400 block text-[10px]">EXTRA SPACE:</span>
                  <span className="text-sky-300 font-bold">O(log N) Call Stack Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CODE WALKTHROUGH */}
      {activeTab === 'code' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-[#140b0b] border border-[#3d1919] p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>TypeScript লোমুটো পার্টিশন (Lomuto Partition) কোড</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              লোমুটো স্কিমে শেষ উপাদানটিকে পিভট ধরা হয়। <code className="text-rose-400">i</code> পয়েন্টার ট্র্যাক করে ছোটদের সীমানা এবং <code className="text-rose-400">j</code> পয়েন্টার পুরো অ্যারে স্ক্যান করে। ছোট মান পেলে সাথে সাথে <code className="text-rose-400">i</code> বাড়িয়ে সোয়াপ করে সামনে নিয়ে আসা হয়।
            </p>
            <pre className="p-4 rounded-2xl bg-[#090505] border border-[#2d1414] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);  // বাম পাশ সর্ট
    quickSort(arr, pivotIdx + 1, high); // ডান পাশ সর্ট
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // শেষ উপাদান পিভট
  let i = low - 1; // ছোট উপাদানের সীমানা

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // সোয়াপ করে বামে নেওয়া
    }
  }

  // পিভটকে সঠিক মাঝের স্থানে বসানো
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}
            </pre>
          </div>
        </div>
      )}

      {/* 5. CASES & DUAL PIVOT */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#140b0b] border border-[#3d1919] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <span>কেন কুইক সর্ট মার্জ সর্টের চেয়েও দ্রুত?</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              উভয়ের গড় সময় $O(N \log N)$ হলেও বাস্তবে কুইক সর্ট মার্জ সর্টের চেয়ে ২ থেকে ৩ গুণ দ্রুত চলে।
            </p>
            <ul className="space-y-3 text-xs text-zinc-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><b>ক্যাশ লোকালিটি (CPU Cache Locality):</b> কুইক সর্ট ইন-প্লেস কাজ করে। কোনো অতিরিক্ত অ্যারে তৈরি না করায় ডেটা সরাসরি CPU L1/L2 ক্যাশে থাকে, যা মেমোরি রিডকে আলোর গতি দেয়।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><b>Dual-Pivot Quicksort (Java Runtime):</b> জাভার আদি রুটিনে ভ্লাদিমির ইয়ারোস্লাভস্কির ২-পিভট অ্যালগরিদম ব্যবহৃত হয় যা অ্যারেকে একবারে ৩ ভাগে ভাগ করে আরও ২০% গতি বাড়ায়।</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-[#140b0b] border border-[#3d1919] p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>কমপ্লেক্সিটি ও প্রতিকার</span>
            </h3>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1e0f0f] border border-[#3b1919]">
                <span className="text-zinc-400">Best Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N log N) (পিভট প্রতিবার মধ্যমান হলে)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1e0f0f] border border-[#3b1919]">
                <span className="text-zinc-400">Average Case Time:</span>
                <span className="text-emerald-400 font-bold">O(N log N) (বাস্তবে সাধারণ ঘটনা)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1e0f0f] border border-[#3b1919]">
                <span className="text-zinc-400">Worst Case Time:</span>
                <span className="text-rose-400 font-bold">O(N²) (যদি পিভট প্রতিবার চরম ছোট/বড় হয়)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1e0f0f] border border-[#3b1919]">
                <span className="text-zinc-400">Worst Case Avoidance:</span>
                <span className="text-emerald-400 font-bold">Randomized Pivot / Median-of-Three</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#1e0f0f] border border-[#3b1919]">
                <span className="text-zinc-400">Stability:</span>
                <span className="text-rose-400 font-bold">Unstable (দূরপাল্লার সোয়াপ হয়)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1e1930]">
        <button
          onClick={() => onNavigate && onNavigate('sorting-merge')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151224] hover:bg-[#201a35] border border-[#2b2444] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400" />
          <span>পূর্ববর্তী: মার্জ সর্ট (Merge Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-bold shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
        >
          <span>সর্টিং ওভারভিউ ও কমপ্লেক্সিটি তুলনামূলক চার্ট</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
