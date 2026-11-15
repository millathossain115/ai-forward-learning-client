'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { InsertionStep } from '../types';

interface InsertionVisualizerProps {
  step: InsertionStep;
}

export default function InsertionVisualizer({ step }: InsertionVisualizerProps) {
  return (
    <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-amber-400 font-bold">Hand of Cards (খেলোয়াড়ের তাসের হাত):</span>
        <span className="text-zinc-400">নতুন কার্ড তুলে আগের সাজানো স্লটে গুঁজে দেওয়া</span>
      </div>

      {/* Hand Key Floating Card */}
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 flex items-center justify-center">
          {step.handKey !== null ? (
            <div className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow-lg animate-pulse flex items-center gap-1.5">
              <span>হাতে তোলা Key কার্ড: {step.handKey}</span>
            </div>
          ) : (
            <span className="text-[11px] font-mono text-zinc-500">সব কার্ড বর্তমানে ডেক বা টেবিলে সাজানো</span>
          )}
        </div>

        {/* Cards in Deck */}
        <div className="flex items-center justify-center gap-3">
          {step.arr.map((val: number | null, idx: number) => {
            const isEmptySlot = val === null;
            const isSorted = idx < step.sortedCount;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className={`w-14 h-20 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                    isEmptySlot
                      ? 'border-dashed border-amber-400/60 bg-amber-500/10 text-amber-300'
                      : isSorted
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow'
                      : 'bg-[#121626] border-[#222a44] text-zinc-300'
                  }`}
                >
                  <span className="text-[10px] opacity-75">{isEmptySlot ? 'SLOT' : 'CARD'}</span>
                  <span className="text-base">{isEmptySlot ? '___' : val}</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>{step.desc}</span>
      </div>
    </div>
  );
}
