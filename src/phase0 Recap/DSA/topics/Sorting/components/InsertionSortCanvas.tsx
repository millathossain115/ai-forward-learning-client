import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Clock,
  Layers,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { InsertionStep } from '../utils/insertionSortUtils';

interface InsertionSortCanvasProps {
  currentStep: InsertionStep;
  stepIdx: number;
  setStepIdx: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  isAtEnd: boolean;
  speedMs: number;
  setSpeedMs: (ms: number) => void;
}

export default function InsertionSortCanvas({
  currentStep,
  stepIdx,
  setStepIdx,
  totalSteps,
  isPlaying,
  setIsPlaying,
  isAtEnd,
  speedMs,
  setSpeedMs,
}: InsertionSortCanvasProps) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl bg-[#0c101c] border border-[#253254] p-6 shadow-2xl overflow-hidden">
        {/* Header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1c2642]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isAtEnd) {
                  setStepIdx(0);
                  setIsPlaying(true);
                } else {
                  setIsPlaying(!isPlaying);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-mono text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : isAtEnd ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play Simulation'}</span>
            </button>

            <div className="flex items-center gap-1 bg-[#12182b] p-1 rounded-xl border border-[#202d4e]">
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setStepIdx((prev) => Math.max(0, prev - 1));
                }}
                disabled={stepIdx === 0}
                className="p-1.5 rounded-lg hover:bg-[#1a2542] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                title="Step Back"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-xs text-zinc-400 font-medium">
                {stepIdx + 1} / {totalSteps}
              </span>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setStepIdx((prev) => Math.min(totalSteps - 1, prev + 1));
                }}
                disabled={isAtEnd}
                className="p-1.5 rounded-lg hover:bg-[#1a2542] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                title="Step Forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setStepIdx(0);
                }}
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
                className={`px-2 py-1 rounded-md transition-colors ${
                  speedMs === 1800 ? 'bg-indigo-900/60 text-indigo-300 font-bold' : 'text-zinc-400'
                }`}
              >
                0.5x
              </button>
              <button
                onClick={() => setSpeedMs(1000)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  speedMs === 1000 ? 'bg-indigo-900/60 text-indigo-300 font-bold' : 'text-zinc-400'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => setSpeedMs(500)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  speedMs === 500 ? 'bg-indigo-900/60 text-indigo-300 font-bold' : 'text-zinc-400'
                }`}
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
              <span className="text-indigo-300 font-bold">
                ০ থেকে {currentStep.sortedUpTo} ইনডেক্স সুবিন্যস্ত
              </span>
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
  );
}
