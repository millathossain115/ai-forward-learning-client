'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  ArrowRight,
  ArrowLeft,
  Shuffle
} from 'lucide-react';
import {
  DEFAULT_8_ARRAY,
  PRESETS,
  buildTreeStructure,
  generateTreeSteps
} from './utils/mergeSortUtils';
import MergeSortTreeCanvas from './components/MergeSortTreeCanvas';
import MergeSortInspector from './components/MergeSortInspector';

const MergeSortCodeView = dynamic(() => import('./components/MergeSortCodeView'), {
  loading: () => (
    <div className="p-8 text-center text-xs font-mono text-zinc-500">
      Loading code view...
    </div>
  )
});
const MergeSortCases = dynamic(() => import('./components/MergeSortCases'), {
  loading: () => (
    <div className="p-8 text-center text-xs font-mono text-zinc-500">
      Loading case studies...
    </div>
  )
});

export default function MergeSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [arrayData, setArrayData] = useState<number[]>(DEFAULT_8_ARRAY);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const [treeViewMode, setTreeViewMode] = useState<'stepper' | 'blueprint'>('stepper');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fixed comfortable 0.5x speed
  const FIXED_SPEED_MS = 1400;

  const tree = useMemo(() => buildTreeStructure(arrayData), [arrayData]);
  const steps = useMemo(() => generateTreeSteps(tree), [tree]);
  const currentStep = steps[stepIdx] || steps[0];
  const isAtEnd = stepIdx >= steps.length - 1;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setStepIdx((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, FIXED_SPEED_MS);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  const handlePresetSelect = (arr: number[]) => {
    setIsPlaying(false);
    setArrayData(arr);
    setStepIdx(0);
  };

  const handleRandomize = () => {
    setIsPlaying(false);
    const newArr: number[] = [];
    for (let i = 0; i < 8; i++) {
      newArr.push(Math.floor(Math.random() * 89) + 10);
    }
    setArrayData(newArr);
    setStepIdx(0);
  };

  return (
    <div className="flex flex-col gap-4 w-full text-zinc-100">
      {/* 1. COMPACT UNIFIED TOP TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#090e17] border border-[#1b2b3f]">
        {/* Left: Brand Pill & Preset / Randomize */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 pr-2 border-r border-[#1a283b]">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold">
              Topic 13.4 • Merge Sort
            </span>
            <span className="text-xs font-mono font-bold text-teal-300 hidden sm:inline">
              O(N log N)
            </span>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1d3049] text-xs font-mono">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetSelect(p.array)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  JSON.stringify(arrayData) === JSON.stringify(p.array)
                    ? 'bg-sky-500/30 text-sky-200 font-bold border border-sky-500/40'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Randomize Button */}
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15171e] hover:from-teal-600/50 hover:to-emerald-600/50 border border-teal-500/40 text-teal-200 font-mono text-xs font-bold transition-colors shadow cursor-pointer"
            title="নতুন ৮টি র্যান্ডম সংখ্যা তৈরি করুন"
          >
            <Shuffle className="w-3.5 h-3.5 text-teal-300" />
            <span>Randomize</span>
          </button>
        </div>

        {/* Right: Integrated Player Controls & Tab Switcher */}
        <div className="flex items-center gap-2">
          {/* Player Controls */}
          <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1d3049]">
            <button
              onClick={() => {
                if (isAtEnd) {
                  setStepIdx(0);
                  setIsPlaying(true);
                } else {
                  setIsPlaying(!isPlaying);
                }
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer shadow"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : isAtEnd ? (
                <RotateCcw className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx(Math.max(0, stepIdx - 1));
              }}
              disabled={stepIdx === 0}
              className="p-1 rounded-md hover:bg-[#162538] disabled:opacity-30 text-zinc-300 cursor-pointer"
              title="Step Back"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-xs text-zinc-300 font-medium">
              {stepIdx + 1}/{steps.length}
            </span>
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx(Math.min(steps.length - 1, stepIdx + 1));
              }}
              disabled={isAtEnd}
              className="p-1 rounded-md hover:bg-[#162538] disabled:opacity-30 text-zinc-300 cursor-pointer"
              title="Step Forward"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setStepIdx(0);
              }}
              className="p-1 rounded-md hover:bg-[#162538] text-zinc-400 hover:text-zinc-100 cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* View Tab Toggle */}
          <div className="flex items-center gap-1 bg-[#0d1624] p-1 rounded-xl border border-[#1d3049] text-xs font-mono">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'visualizer'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              সিমুলেশন
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কোড
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cases'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কেস স্টাডি
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN STUDIO LAYOUT */}
      {activeTab === 'visualizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT COLUMN: THE VISUAL CANVAS (8 cols = 66%) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <MergeSortTreeCanvas
              tree={tree}
              currentStep={currentStep}
              treeViewMode={treeViewMode}
              onSetTreeViewMode={setTreeViewMode}
            />
          </div>

          {/* RIGHT COLUMN: TELEMETRY & LIVE INSPECTOR DECK (4 cols = 34%) */}
          <div className="lg:col-span-4">
            <MergeSortInspector
              stepIdx={stepIdx}
              totalSteps={steps.length}
              currentStep={currentStep}
            />
          </div>
        </div>
      )}

      {/* 3. CODE TAB */}
      {activeTab === 'code' && <MergeSortCodeView />}

      {/* 4. CASE STUDIES TAB */}
      {activeTab === 'cases' && <MergeSortCases />}

      {/* 5. FOOTER NAVIGATION */}
      <div className="flex items-center justify-between pt-2 border-t border-[#152336] text-xs font-mono">
        <button
          onClick={() => onNavigate && onNavigate('sorting-insertion')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1624] hover:bg-[#162538] border border-[#1d3049] text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span>ইনসার্শন সর্ট (Insertion Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting-quick')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15171e] hover:from-teal-500 hover:to-emerald-500 text-white font-bold transition-colors shadow cursor-pointer"
        >
          <span>পরবর্তী: কুইক সর্ট (Quick Sort)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
