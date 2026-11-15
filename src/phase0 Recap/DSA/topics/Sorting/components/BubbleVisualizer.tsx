'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { BubbleStep } from '../types';

interface BubbleVisualizerProps {
  step: BubbleStep;
}

export default function BubbleVisualizer({ step }: BubbleVisualizerProps) {
  return (
    <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <span className="text-amber-400 font-bold">Bubble Swapping Slots:</span>
        <span>বড় মানগুলো প্রতি পাসে ডানে বুদবুদের মতো ভেসে ওঠে</span>
      </div>

      {/* Bubble Balls */}
      <div className="flex items-center justify-center gap-4 py-8">
        {step.arr.map((val: number, idx: number) => {
          const isComparing = step.pair.includes(idx);
          const isSorted = step.sorted.includes(idx);
          const isSwapped = step.swapped && isComparing;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center font-mono text-base font-black transition-all duration-300 ${
                  isSorted
                    ? 'bg-gradient-to-tr from-emerald-600 to-emerald-400 text-slate-950 ring-4 ring-emerald-500/30 scale-105 shadow-xl'
                    : isSwapped
                    ? 'bg-rose-500 text-white ring-4 ring-rose-400/50 scale-110 shadow-2xl animate-bounce'
                    : isComparing
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40 scale-110 shadow-lg'
                    : 'bg-[#15192c] border-2 border-[#283252] text-zinc-200'
                }`}
              >
                {val}
              </div>
              <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>{step.desc}</span>
      </div>
    </div>
  );
}
