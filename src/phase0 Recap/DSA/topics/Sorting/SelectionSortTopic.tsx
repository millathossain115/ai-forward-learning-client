'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Shuffle
} from 'lucide-react';
import {
  SelectionStep,
  SELECTION_DEFAULT_ARRAY,
  generateSelectionTrace
} from './utils/selectionSortUtils';
import SelectionSortCanvas from './components/SelectionSortCanvas';
import SelectionSortCodeView from './components/SelectionSortCodeView';
import SelectionSortCases from './components/SelectionSortCases';

export default function SelectionSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [initialArray, setInitialArray] = useState<number[]>(SELECTION_DEFAULT_ARRAY);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace of Selection Sort
  const trace = useMemo<SelectionStep[]>(() => {
    return generateSelectionTrace(initialArray);
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
        <SelectionSortCanvas
          currentStep={currentStep}
          stepIdx={stepIdx}
          setStepIdx={setStepIdx}
          totalSteps={trace.length}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isAtEnd={isAtEnd}
          speedMs={speedMs}
          setSpeedMs={setSpeedMs}
          initialArrayLength={initialArray.length}
        />
      )}

      {/* 4. CODE WALKTHROUGH */}
      {activeTab === 'code' && <SelectionSortCodeView />}

      {/* 5. COMPLEXITY & HARDWARE BENEFIT */}
      {activeTab === 'cases' && <SelectionSortCases />}

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
