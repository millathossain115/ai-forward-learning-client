'use client';

import React from 'react';
import { LinearStep, SORTED_ARRAY } from '../types';

interface LinearSearchVisualizerProps {
  currentStep: LinearStep;
  stepIdx: number;
}

export default function LinearSearchVisualizer({ currentStep, stepIdx }: LinearSearchVisualizerProps) {
  return (
    <div className="space-y-6">
      <div className="p-3 rounded-xl bg-[#0e1120] border border-[#1d233c] font-mono text-xs flex items-center justify-between">
        <div>
          <span className="text-zinc-400">বর্তমান অবস্থান: </span>
          <span className="text-rose-400 font-bold">ইন্ডেক্স {currentStep.currIndex}</span>
        </div>
        <div>
          মান: <b className="text-white text-sm">{currentStep.val}</b>
        </div>
        <div className="text-zinc-400">
          মোট ধাপ: <b className="text-rose-400">{stepIdx + 1}</b>
        </div>
      </div>

      {/* Array Cells with Linear Scanner Pointer */}
      <div className="space-y-2">
        {/* Pointer indicator */}
        <div className="grid grid-cols-12 gap-1.5 text-center text-[10px] font-mono font-bold">
          {SORTED_ARRAY.map((_, i) => (
            <div key={i} className="h-5 flex items-center justify-center">
              {currentStep.currIndex === i && (
                <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white shadow">SCAN</span>
              )}
            </div>
          ))}
        </div>

        {/* Array Boxes */}
        <div className="grid grid-cols-12 gap-1.5">
          {SORTED_ARRAY.map((v, i) => {
            const isCurrent = currentStep.currIndex === i;
            const isFound = isCurrent && currentStep.action === 'found';
            const isPassed = i < currentStep.currIndex;

            return (
              <div
                key={i}
                className={`h-14 rounded-xl border font-mono flex flex-col items-center justify-center transition-colors ${
                  isFound
                    ? 'bg-emerald-500 text-slate-950 font-semibold ring-4 ring-emerald-500/40 scale-105 '
                    : isCurrent
                    ? 'bg-rose-500 text-white font-semibold ring-4 ring-rose-500/30 scale-105 '
                    : isPassed
                    ? 'bg-[#0b0d18] border-[#181d30] text-zinc-500 opacity-40'
                    : 'bg-[#13172b] border-[#293354] text-zinc-100 font-bold'
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
