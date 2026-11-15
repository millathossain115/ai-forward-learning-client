'use client';

import React from 'react';
import { BinaryStep, LinearStep, SORTED_ARRAY } from '../types';

interface RaceSearchVisualizerProps {
  currentBinaryStep: BinaryStep;
  currentLinearStep: LinearStep;
  binaryStepIdx: number;
  linearStepIdx: number;
}

export default function RaceSearchVisualizer({
  currentBinaryStep,
  currentLinearStep,
  binaryStepIdx,
  linearStepIdx
}: RaceSearchVisualizerProps) {
  return (
    <div className="space-y-6">
      {/* Lane 1: Binary Search */}
      <div className="p-4 rounded-xl bg-[#090b14] border border-emerald-500/30 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            বাইনারি সার্চ (Binary Search O(log N))
          </span>
          <span className="text-zinc-300 font-bold">
            ধাপ: <span className="text-emerald-400 text-sm">{binaryStepIdx + 1}</span> (বাকি ৫০% এলিমিনেট)
          </span>
        </div>

        <div className="grid grid-cols-12 gap-1 pt-1">
          {SORTED_ARRAY.map((v, i) => {
            const isMid = currentBinaryStep.mid === i;
            const isFound = isMid && currentBinaryStep.action === 'found';
            const inRange = i >= currentBinaryStep.low && i <= currentBinaryStep.high;

            return (
              <div
                key={i}
                className={`h-10 rounded-lg border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                  isFound
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-500'
                    : isMid
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400'
                    : inRange
                    ? 'bg-[#13172b] border-[#293354] text-zinc-200'
                    : 'bg-[#090a10] border-[#151928] text-zinc-700 opacity-20 line-through'
                }`}
              >
                {v}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lane 2: Linear Search */}
      <div className="p-4 rounded-xl bg-[#090b14] border border-rose-500/30 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-rose-400 font-bold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            লিনিয়ার সার্চ (Linear Search O(N))
          </span>
          <span className="text-zinc-300 font-bold">
            ধাপ: <span className="text-rose-400 text-sm">{linearStepIdx + 1}</span> (১টি করে স্ক্যান)
          </span>
        </div>

        <div className="grid grid-cols-12 gap-1 pt-1">
          {SORTED_ARRAY.map((v, i) => {
            const isCurrent = currentLinearStep.currIndex === i;
            const isFound = isCurrent && currentLinearStep.action === 'found';
            const isPassed = i < currentLinearStep.currIndex;

            return (
              <div
                key={i}
                className={`h-10 rounded-lg border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                  isFound
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-500'
                    : isCurrent
                    ? 'bg-rose-500 text-white ring-2 ring-rose-500'
                    : isPassed
                    ? 'bg-[#090a10] border-[#151928] text-zinc-600 opacity-30'
                    : 'bg-[#13172b] border-[#293354] text-zinc-200'
                }`}
              >
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
