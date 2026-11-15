'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Shuffle
} from 'lucide-react';
import {
  InsertionStep,
  INSERTION_DEFAULT_ARRAY,
  generateInsertionTrace
} from './utils/insertionSortUtils';
import InsertionSortCanvas from './components/InsertionSortCanvas';
import InsertionSortCodeView from './components/InsertionSortCodeView';
import InsertionSortCases from './components/InsertionSortCases';

export default function InsertionSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [initialArray, setInitialArray] = useState<number[]>(INSERTION_DEFAULT_ARRAY);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace of Insertion Sort with Card Lifting and Slot Shifting
  const trace = useMemo<InsertionStep[]>(() => {
    return generateInsertionTrace(initialArray);
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
        <InsertionSortCanvas
          currentStep={currentStep}
          stepIdx={stepIdx}
          setStepIdx={setStepIdx}
          totalSteps={trace.length}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isAtEnd={isAtEnd}
          speedMs={speedMs}
          setSpeedMs={setSpeedMs}
        />
      )}

      {/* 4. CODE WALKTHROUGH */}
      {activeTab === 'code' && <InsertionSortCodeView />}

      {/* 5. V8 & TIMSORT CASES */}
      {activeTab === 'cases' && <InsertionSortCases />}

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
