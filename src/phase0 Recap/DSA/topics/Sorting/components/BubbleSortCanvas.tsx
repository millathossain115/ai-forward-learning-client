import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Clock,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BubbleStep } from '../utils/bubbleSortUtils';

interface BubbleSortCanvasProps {
  currentStep: BubbleStep;
  stepIdx: number;
  setStepIdx: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  isAtEnd: boolean;
  speedMs: number;
  setSpeedMs: (ms: number) => void;
  initialArrayLength: number;
}

export default function BubbleSortCanvas({
  currentStep,
  stepIdx,
  setStepIdx,
  totalSteps,
  isPlaying,
  setIsPlaying,
  isAtEnd,
  speedMs,
  setSpeedMs,
  initialArrayLength,
}: BubbleSortCanvasProps) {
  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 shadow-2xl overflow-hidden">
        {/* Header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1f1933]">
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-mono text-xs font-bold shadow-lg shadow-fuchsia-600/30 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : isAtEnd ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : isAtEnd ? 'Replay' : 'Play Simulation'}</span>
            </button>

            <div className="flex items-center gap-1 bg-[#151222] p-1 rounded-xl border border-[#292240]">
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setStepIdx((prev) => Math.max(0, prev - 1));
                }}
                disabled={stepIdx === 0}
                className="p-1.5 rounded-lg hover:bg-[#231d36] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
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
                className="p-1.5 rounded-lg hover:bg-[#231d36] disabled:opacity-30 disabled:hover:bg-transparent text-zinc-300 cursor-pointer"
                title="Step Forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setStepIdx(0);
                }}
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
              <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
              <span>গতি:</span>
            </span>
            <div className="flex items-center gap-1 bg-[#151222] p-1 rounded-xl border border-[#292240] text-xs font-mono">
              <button
                onClick={() => setSpeedMs(1800)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  speedMs === 1800 ? 'bg-fuchsia-900/60 text-fuchsia-300 font-bold' : 'text-zinc-400'
                }`}
              >
                0.5x
              </button>
              <button
                onClick={() => setSpeedMs(1000)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  speedMs === 1000 ? 'bg-fuchsia-900/60 text-fuchsia-300 font-bold' : 'text-zinc-400'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => setSpeedMs(500)}
                className={`px-2 py-1 rounded-md transition-colors ${
                  speedMs === 500 ? 'bg-fuchsia-900/60 text-fuchsia-300 font-bold' : 'text-zinc-400'
                }`}
              >
                2.0x
              </button>
            </div>
          </div>
        </div>

        {/* Bubble Visual Canvas */}
        <div className="py-12 flex flex-col items-center justify-center min-h-[300px]">
          {/* Floating Bubble Elevation Indicators */}
          <div className="w-full flex items-end justify-center gap-3 md:gap-5 pb-6">
            {currentStep.arr.map((val: number, idx: number) => {
              const isComparing = currentStep.comparing?.includes(idx);
              const isSorted = currentStep.sortedIndices.includes(idx);
              const isBubbleRising = isComparing && currentStep.swapped;

              return (
                <div key={idx} className="flex flex-col items-center gap-3">
                  {/* Bubble elevation container */}
                  <div
                    className={`relative w-14 h-24 md:w-16 md:h-28 rounded-2xl flex flex-col items-center justify-between p-2.5 transition-all duration-500 shadow-xl ${
                      isSorted
                        ? 'bg-gradient-to-b from-emerald-900/50 to-emerald-950/80 border-2 border-emerald-500 shadow-emerald-500/20 text-emerald-200'
                        : isBubbleRising
                        ? 'bg-gradient-to-b from-fuchsia-600/40 to-pink-900/70 border-2 border-fuchsia-400 -translate-y-4 shadow-fuchsia-500/30 text-white scale-105'
                        : isComparing
                        ? 'bg-gradient-to-b from-amber-600/30 to-amber-950/70 border-2 border-amber-400 -translate-y-2 text-amber-200'
                        : 'bg-[#151224] border border-[#2d2448] text-zinc-300'
                    }`}
                  >
                    {/* Upper Badge */}
                    <div className="text-[10px] font-mono font-bold tracking-tight opacity-75">
                      {isSorted ? '✓ LOCK' : isComparing ? 'COMPARE' : `[${idx}]`}
                    </div>

                    {/* Value */}
                    <div className="text-xl md:text-2xl font-black font-mono tracking-tight">
                      {val}
                    </div>

                    {/* Bottom Status Indicator */}
                    <div className="w-full flex justify-center">
                      {isSorted ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ) : isComparing ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                      )}
                    </div>
                  </div>

                  {/* Pointer Labels */}
                  <div className="text-center">
                    <span className="text-[11px] font-mono text-zinc-400 block font-semibold">
                      ইনডেক্স {idx}
                    </span>
                    {currentStep.comparing?.[0] === idx && (
                      <span className="text-[10px] font-mono text-amber-400 font-bold block">
                        pointer j
                      </span>
                    )}
                    {currentStep.comparing?.[1] === idx && (
                      <span className="text-[10px] font-mono text-amber-400 font-bold block">
                        j + 1
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
            <Zap className="w-4 h-4 text-fuchsia-400 shrink-0" />
            <div>
              <span className="text-zinc-400 block text-[10px]">CURRENT PASS:</span>
              <span className="text-white font-bold">
                পাস {currentStep.i + 1} / {initialArrayLength}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-zinc-400 block text-[10px]">SORTED ELEMENTS:</span>
              <span className="text-emerald-300 font-bold">
                {currentStep.sortedIndices.length} / {initialArrayLength} টি স্থায়ী
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#120f20] border border-[#231b38] flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-zinc-400 block text-[10px]">EARLY-EXIT CHECK:</span>
              <span className="text-amber-300 font-bold">
                {currentStep.swapped ? 'সোয়াপ ঘটেছে' : 'সোয়াপ ব্যতিরেকে স্ক্যান'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
