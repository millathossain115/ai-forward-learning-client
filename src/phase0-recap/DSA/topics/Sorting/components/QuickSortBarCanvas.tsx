'use client';

import React from 'react';
import { Terminal } from 'lucide-react';
import { BarSortStep } from '../utils/quickSortUtils';

interface QuickSortBarCanvasProps {
  barArrayLength: number;
  currentBarStep: BarSortStep;
  barStepIdx: number;
  totalBarSteps: number;
}

export default function QuickSortBarCanvas({
  barArrayLength,
  currentBarStep,
  barStepIdx,
  totalBarSteps
}: QuickSortBarCanvasProps) {
  return (
    <div className="relative rounded-2xl bg-[#07090e] border border-[#1f283d] overflow-hidden p-3 flex flex-col space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#1b253b] text-xs font-mono">
        <span className="text-orange-400 font-bold flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          <span>লাইভ বার সর্টিং সিমুলেটর ({barArrayLength} টি বার)</span>
        </span>
        <span className="text-zinc-400">কিবোর্ড: &apos;Enter&apos; (সর্ট/পজ), &apos;R&apos; (নতুন বার)</span>
      </div>

      <div className="w-full h-64 bg-[#04060a] border border-[#151f33] rounded-xl p-3 flex items-end justify-center gap-1 relative overflow-hidden">
        {currentBarStep.arr.map((val: number, idx: number) => {
          const isPivot = idx === currentBarStep.pivotIdx;
          const isComparing = idx === currentBarStep.comparingIdx;
          const isSorted = currentBarStep.sortedIndices.includes(idx);
          const isInActivePartition =
            idx >= currentBarStep.partitionStart && idx <= currentBarStep.partitionEnd;

          let barColor = 'bg-[#f97316]';
          let barBorder = 'border-orange-500';

          if (isSorted) {
            barColor = 'bg-[#22c55e]';
            barBorder = 'border-emerald-400';
          } else if (isPivot) {
            barColor = 'bg-[#38bdf8]';
            barBorder = 'border-sky-300';
          } else if (isComparing) {
            barColor = 'bg-[#ef4444]';
            barBorder = 'border-rose-400';
          } else if (!isInActivePartition) {
            barColor = 'bg-[#334155] opacity-50';
            barBorder = 'border-slate-600';
          }

          return (
            <div
              key={idx}
              className={`flex-1 min-w-[3px] max-w-[12px] rounded-t-sm transition-colors duration-75 ${barColor} border-t ${barBorder}`}
              style={{ height: `${val}%` }}
            />
          );
        })}
      </div>

      <div className="p-2.5 rounded-xl bg-[#0b101c] border border-[#18253b] text-xs font-mono flex items-center justify-between">
        <span className="text-orange-300 font-bold">
          স্টেপ {barStepIdx + 1} / {totalBarSteps}:
        </span>
        <span className="text-zinc-300 truncate max-w-md">{currentBarStep.desc}</span>
      </div>
    </div>
  );
}
