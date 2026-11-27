'use client';

import React from 'react';
import { BinaryStep, SORTED_ARRAY } from '../types';

interface BinarySearchVisualizerProps {
  currentStep: BinaryStep;
}

export default function BinarySearchVisualizer({ currentStep }: BinarySearchVisualizerProps) {
  return (
    <div className="space-y-6">
      {/* Formula & Range Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#0e1120] border border-[#1d233c] font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400">বর্তমান রেঞ্জ:</span>
          <span className="text-sky-300 font-bold">Low = {currentStep.low}</span>
          <span className="text-zinc-500">|</span>
          <span className="text-purple-300 font-bold">High = {currentStep.high}</span>
        </div>
        <div className="text-amber-300 font-bold">
          mid = floor(({currentStep.low} + {currentStep.high}) / 2) = {currentStep.mid}
        </div>
        <div className="text-zinc-300">
          Array[{currentStep.mid}] = <b className="text-white text-sm">{currentStep.val}</b>
        </div>
      </div>

      {/* Array Cells with Pointer Tags */}
      <div className="space-y-2">
        {/* Top Pointers Line */}
        <div className="grid grid-cols-12 gap-1.5 text-center text-[10px] font-mono font-bold">
          {SORTED_ARRAY.map((_, i) => {
            const isLow = currentStep.low === i;
            const isMid = currentStep.mid === i;
            const isHigh = currentStep.high === i;
            return (
              <div key={i} className="h-5 flex items-center justify-center">
                {isMid ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shadow">MID</span>
                ) : isLow ? (
                  <span className="px-1.5 py-0.5 rounded bg-sky-500 text-slate-950">LOW</span>
                ) : isHigh ? (
                  <span className="px-1.5 py-0.5 rounded bg-purple-500 text-white">HIGH</span>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Array Boxes */}
        <div className="grid grid-cols-12 gap-1.5">
          {SORTED_ARRAY.map((v, i) => {
            const isMid = currentStep.mid === i;
            const isFound = isMid && currentStep.action === 'found';
            const inRange = i >= currentStep.low && i <= currentStep.high;

            return (
              <div
                key={i}
                className={`h-14 rounded-xl border font-mono flex flex-col items-center justify-center transition-colors ${
                  isFound
                    ? 'bg-emerald-500 text-slate-950 font-semibold ring-4 ring-emerald-500/40 scale-105 '
                    : isMid
                    ? 'bg-amber-400 text-slate-950 font-semibold ring-4 ring-amber-400/30 scale-105 '
                    : inRange
                    ? 'bg-[#13172b] border-[#293354] text-zinc-100 font-bold hover:border-sky-500'
                    : 'bg-[#090b14] border-[#141829] text-zinc-600 opacity-30 line-through'
                }`}
              >
                <span className="text-xs md:text-sm">{v}</span>
                <span className="text-[9px] opacity-70">[{i}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
