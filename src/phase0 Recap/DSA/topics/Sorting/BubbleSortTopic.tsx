'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Shuffle
} from 'lucide-react';
import {
  BubbleStep,
  DEFAULT_ARRAY,
  generateBubbleTrace
} from './utils/bubbleSortUtils';
import BubbleSortCanvas from './components/BubbleSortCanvas';
import BubbleSortCodeView from './components/BubbleSortCodeView';
import BubbleSortCases from './components/BubbleSortCases';

export default function BubbleSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [initialArray, setInitialArray] = useState<number[]>(DEFAULT_ARRAY);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace of Bubble Sort with early exit flag
  const trace = useMemo<BubbleStep[]>(() => {
    return generateBubbleTrace(initialArray);
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
        <BubbleSortCanvas
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
      {activeTab === 'code' && <BubbleSortCodeView />}

      {/* 5. COMPLEXITY & USE CASES */}
      {activeTab === 'cases' && <BubbleSortCases />}

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
