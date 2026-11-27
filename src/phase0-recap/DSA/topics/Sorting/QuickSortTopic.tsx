'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  GitBranch,
  BarChart3
} from 'lucide-react';
import {
  generateBarTrace,
  generateRandomBarArray,
  QUICK_SORT_TREE_STEPS
} from './utils/quickSortUtils';
import QuickSortTreeCanvas from './components/QuickSortTreeCanvas';
import QuickSortInspector from './components/QuickSortInspector';

const QuickSortBarCanvas = dynamic(() => import('./components/QuickSortBarCanvas'), {
  loading: () => (
    <div className="h-64 flex items-center justify-center text-xs font-mono text-zinc-500">
      Loading bar canvas...
    </div>
  )
});
const QuickSortCodeView = dynamic(() => import('./components/QuickSortCodeView'), {
  loading: () => (
    <div className="p-8 text-center text-xs font-mono text-zinc-500">
      Loading code view...
    </div>
  )
});
const QuickSortCases = dynamic(() => import('./components/QuickSortCases'), {
  loading: () => (
    <div className="p-8 text-center text-xs font-mono text-zinc-500">
      Loading case studies...
    </div>
  )
});

export default function QuickSortTopic({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'code' | 'cases'>('visualizer');
  const [visualMode, setVisualMode] = useState<'tree' | 'bars'>('tree');

  // TREE MODE STATE
  const [treeStepIdx, setTreeStepIdx] = useState<number>(0);
  const [isTreePlaying, setIsTreePlaying] = useState<boolean>(false);
  const treeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BAR VISUALIZER STATE
  const [barArray, setBarArray] = useState<number[]>(() => generateRandomBarArray(36));
  const [barStepIdx, setBarStepIdx] = useState<number>(0);
  const [isBarPlaying, setIsBarPlaying] = useState<boolean>(false);
  const barTimerRef = useRef<NodeJS.Timeout | null>(null);

  const FIXED_TREE_SPEED_MS = 1400; // comfortable 0.5x
  const FIXED_BAR_SPEED_MS = 60;

  const barTrace = useMemo(() => generateBarTrace(barArray), [barArray]);
  const currentBarStep = barTrace[barStepIdx] || barTrace[0];

  const treeSteps = QUICK_SORT_TREE_STEPS;
  const currentTreeStep = treeSteps[treeStepIdx] || treeSteps[0];

  useEffect(() => {
    if (isTreePlaying) {
      treeTimerRef.current = setInterval(() => {
        setTreeStepIdx((prev) => {
          if (prev < treeSteps.length - 1) return prev + 1;
          setIsTreePlaying(false);
          return prev;
        });
      }, FIXED_TREE_SPEED_MS);
    } else if (treeTimerRef.current) {
      clearInterval(treeTimerRef.current);
    }
    return () => {
      if (treeTimerRef.current) clearInterval(treeTimerRef.current);
    };
  }, [isTreePlaying, treeSteps.length]);

  useEffect(() => {
    if (isBarPlaying) {
      barTimerRef.current = setInterval(() => {
        setBarStepIdx((prev) => {
          if (prev < barTrace.length - 1) return prev + 1;
          setIsBarPlaying(false);
          return prev;
        });
      }, FIXED_BAR_SPEED_MS);
    } else if (barTimerRef.current) {
      clearInterval(barTimerRef.current);
    }
    return () => {
      if (barTimerRef.current) clearInterval(barTimerRef.current);
    };
  }, [isBarPlaying, barTrace.length]);

  const handleRandomizeBars = useCallback(() => {
    setIsBarPlaying(false);
    setBarArray(generateRandomBarArray(36));
    setBarStepIdx(0);
  }, []);

  const handleRandomizeTree = () => {
    setIsTreePlaying(false);
    setTreeStepIdx(0);
  };

  return (
    <div className="flex flex-col gap-4 w-full text-zinc-100">
      {/* 1. COMPACT UNIFIED TOP TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0e0707] border border-[#2e1414]">
        {/* Left: Brand Pill & Visual Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 pr-2 border-r border-[#241111]">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold">
              Topic 13.5 • Quick Sort
            </span>
            <span className="text-xs font-mono font-bold text-rose-300 hidden sm:inline">
              O(N log N) Avg
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212] text-xs font-mono">
            <button
              onClick={() => setVisualMode('tree')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                visualMode === 'tree'
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>পার্টিশন ট্রি</span>
            </button>
            <button
              onClick={() => setVisualMode('bars')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                visualMode === 'bars'
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>লাইভ বার চার্ট</span>
            </button>
          </div>

          {/* Randomize Button */}
          <button
            onClick={visualMode === 'tree' ? handleRandomizeTree : handleRandomizeBars}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15171e] hover:from-rose-600/50 hover:to-amber-600/50 border border-rose-500/40 text-rose-200 font-mono text-xs font-bold transition-colors shadow cursor-pointer"
            title="নতুন ডাটাসেট লোড বা রিসেট করুন"
          >
            <Shuffle className="w-3.5 h-3.5 text-rose-300" />
            <span>Randomize</span>
          </button>
        </div>

        {/* Right: Integrated Player Controls & Tab Switcher */}
        <div className="flex items-center gap-2">
          {visualMode === 'tree' ? (
            <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212]">
              <button
                onClick={() => {
                  if (treeStepIdx >= treeSteps.length - 1) {
                    setTreeStepIdx(0);
                    setIsTreePlaying(true);
                  } else {
                    setIsTreePlaying(!isTreePlaying);
                  }
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer shadow"
              >
                {isTreePlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : treeStepIdx >= treeSteps.length - 1 ? (
                  <RotateCcw className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>
                  {isTreePlaying
                    ? 'Pause'
                    : treeStepIdx >= treeSteps.length - 1
                    ? 'Replay'
                    : 'Play'}
                </span>
              </button>
              <button
                onClick={() => {
                  setIsTreePlaying(false);
                  setTreeStepIdx(Math.max(0, treeStepIdx - 1));
                }}
                disabled={treeStepIdx === 0}
                className="p-1 rounded-md hover:bg-[#201010] disabled:opacity-30 text-zinc-300 cursor-pointer"
                title="Step Back"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 font-mono text-xs text-zinc-300 font-medium">
                {treeStepIdx + 1}/{treeSteps.length}
              </span>
              <button
                onClick={() => {
                  setIsTreePlaying(false);
                  setTreeStepIdx(Math.min(treeSteps.length - 1, treeStepIdx + 1));
                }}
                disabled={treeStepIdx >= treeSteps.length - 1}
                className="p-1 rounded-md hover:bg-[#201010] disabled:opacity-30 text-zinc-300 cursor-pointer"
                title="Step Forward"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setIsTreePlaying(false);
                  setTreeStepIdx(0);
                }}
                className="p-1 rounded-md hover:bg-[#201010] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212]">
              <button
                onClick={() => {
                  if (barStepIdx >= barTrace.length - 1) {
                    setBarStepIdx(0);
                    setIsBarPlaying(true);
                  } else {
                    setIsBarPlaying(!isBarPlaying);
                  }
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer shadow"
              >
                {isBarPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : barStepIdx >= barTrace.length - 1 ? (
                  <RotateCcw className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>
                  {isBarPlaying
                    ? 'Pause'
                    : barStepIdx >= barTrace.length - 1
                    ? 'Replay'
                    : 'Sort Bars'}
                </span>
              </button>
              <button
                onClick={() => {
                  setIsBarPlaying(false);
                  setBarStepIdx(0);
                }}
                className="p-1 rounded-md hover:bg-[#201010] text-zinc-400 hover:text-zinc-100 cursor-pointer"
                title="Reset Bars"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* View Tab Toggle */}
          <div className="flex items-center gap-1 bg-[#150a0a] p-1 rounded-xl border border-[#2b1212] text-xs font-mono">
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'visualizer'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              সিমুলেশন
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              কোড
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cases'
                  ? 'bg-rose-600 text-white font-bold'
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
            {visualMode === 'tree' ? (
              <QuickSortTreeCanvas currentTreeStep={currentTreeStep} />
            ) : (
              <QuickSortBarCanvas
                barArrayLength={barArray.length}
                currentBarStep={currentBarStep}
                barStepIdx={barStepIdx}
                totalBarSteps={barTrace.length}
              />
            )}
          </div>

          {/* RIGHT COLUMN: TELEMETRY & LIVE INSPECTOR DECK (4 cols = 34%) */}
          <div className="lg:col-span-4">
            <QuickSortInspector
              visualMode={visualMode}
              treeStepIdx={treeStepIdx}
              totalTreeSteps={treeSteps.length}
              currentTreeStep={currentTreeStep}
              barStepIdx={barStepIdx}
              currentBarStep={currentBarStep}
            />
          </div>
        </div>
      )}

      {/* 3. CODE TAB */}
      {activeTab === 'code' && <QuickSortCodeView />}

      {/* 4. CASE STUDIES TAB */}
      {activeTab === 'cases' && <QuickSortCases />}

      {/* 5. FOOTER NAVIGATION */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2e1414] text-xs font-mono">
        <button
          onClick={() => onNavigate && onNavigate('sorting-merge')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#150a0a] hover:bg-[#201010] border border-[#2b1212] text-zinc-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span>পূর্ববর্তী: মার্জ সর্ট (Merge Sort)</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('sorting')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15171e] hover:from-rose-500 hover:to-red-500 text-white font-bold transition-colors shadow cursor-pointer"
        >
          <span>সর্টিং ওভারভিউ ও ম্যাট্রিক্স</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
