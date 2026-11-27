'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { SelectionStep } from '../types';

interface SelectionVisualizerProps {
  step: SelectionStep;
}

export default function SelectionVisualizer({ step }: SelectionVisualizerProps) {
  return (
    <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-emerald-400 font-bold">
          সাজানো জোন (Sorted) ➔ <span className="text-sky-400">অগোছালো জোন (Unsorted Scanner)</span>
        </span>
        <span className="text-zinc-400">সর্বনিম্ন মান নির্বাচন করে সামনে আনা</span>
      </div>

      {/* Split Cards */}
      <div className="flex items-center justify-center gap-3 py-6">
        {step.arr.map((val: number, idx: number) => {
          const isSorted = idx <= step.sortedUntil;
          const isScanning = step.scanIdx === idx;
          const isMin = step.minIdx === idx;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-colors duration-300 ${
                  isSorted
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300  '
                    : isMin
                    ? 'bg-amber-400 border-amber-300 text-slate-950 ring-4 ring-amber-400/40 scale-105 '
                    : isScanning
                    ? 'bg-sky-600 border-sky-400 text-white ring-2 ring-sky-400'
                    : 'bg-[#121626] border-[#222a44] text-zinc-300'
                }`}
              >
                <span className="text-[10px] opacity-75">{isSorted ? 'SORTED' : isMin ? 'MIN' : 'UNSORT'}</span>
                <span className="text-base">{val}</span>
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
