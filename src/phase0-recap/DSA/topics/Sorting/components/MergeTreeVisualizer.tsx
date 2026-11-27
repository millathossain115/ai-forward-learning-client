'use client';

import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { MergeStep } from '../types';

interface MergeTreeVisualizerProps {
  step: MergeStep;
}

export default function MergeTreeVisualizer({ step }: MergeTreeVisualizerProps) {
  return (
    <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[340px] flex flex-col justify-between space-y-6">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-sky-400 font-bold">Divide &amp; Conquer Hierarchical Tree:</span>
        <span className="text-zinc-400">টুকরো করা (Divide) ➔ পুনরায় একত্র করে সাজানো (Merge)</span>
      </div>

      {/* Dynamic Hierarchical Tree View */}
      <div className="flex flex-col items-center gap-4 py-3">
        {/* Root Layer */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#12172a] border border-sky-500/40">
          <span className="text-xs font-mono font-bold text-sky-300">
            [{step.layers.root.join(', ')}]
          </span>
        </div>

        {/* Arrow down if split */}
        {step.layers.leftSplit && (
          <div className="flex items-center gap-16 text-zinc-500 text-xs font-mono">
            <span>↙ Divide</span>
            <span>Divide ↘</span>
          </div>
        )}

        {/* Halves Layer */}
        {step.layers.leftSplit && (
          <div className="flex items-center gap-10">
            <div className="px-3 py-1.5 rounded-xl bg-[#141b33] border border-indigo-500/50 font-mono text-xs text-indigo-300 font-bold">
              [{step.layers.leftSplit.join(', ')}]
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#141b33] border border-indigo-500/50 font-mono text-xs text-indigo-300 font-bold">
              [{step.layers.rightSplit ? step.layers.rightSplit.join(', ') : ''}]
            </div>
          </div>
        )}

        {/* Singletons Base Layer */}
        {step.layers.singletons && (
          <div className="flex items-center gap-4 pt-2">
            {step.layers.singletons.map((s: number[], i: number) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-xs text-amber-300"
              >
                {s[0]}
              </div>
            ))}
          </div>
        )}

        {/* Final Sorted Result Banner */}
        {step.layers.final && (
          <div className="mt-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 font-mono text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>চূড়ান্ত মার্জড সর্টেড অ্যারে: [{step.layers.final.join(', ')}]</span>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
        <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
        <span>{step.desc}</span>
      </div>
    </div>
  );
}
