'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface HashSetVisualizerProps {
  setKeys: string[];
}

export default function HashSetVisualizer({ setKeys }: HashSetVisualizerProps) {
  return (
    <div className="bg-[#090a10] rounded-xl border border-[#1a1d2e] p-3.5 sm:p-4 flex flex-col gap-2.5">
      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
        <span>Hash Set Pool (শুধুমাত্র অনন্য কী-সমূহ সংরক্ষিত)</span>
        <span className="text-emerald-400">শূন্য ডুপ্লিকেট • O(1) Exists Check</span>
      </div>

      <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#111320] border border-[#1f2336] min-h-[64px] items-center">
        {setKeys.length === 0 ? (
          <span className="text-xs font-mono text-zinc-600 italic">সেট খালি।</span>
        ) : (
          setKeys.map((k, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>&quot;{k}&quot;</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
