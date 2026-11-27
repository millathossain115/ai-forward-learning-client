'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { QuickStep } from '../types';

interface QuickZoneVisualizerProps {
  step: QuickStep;
}

export default function QuickZoneVisualizer({ step }: QuickZoneVisualizerProps) {
  return (
    <div className="bg-[#080a12] border border-[#1b1f33] rounded-2xl p-6 min-h-[300px] flex flex-col justify-between space-y-6">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-amber-400 font-bold">3-Zone Pivot Partitioning:</span>
        <span className="text-zinc-400">ছোটগুলো বাম জোনে, পিভট মাঝে, বড়গুলো ডান জোনে</span>
      </div>

      {/* 3-Zone Visual Partition Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
        {/* Left Zone (< Pivot) */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-700/50 flex flex-col items-center justify-center min-h-[110px] space-y-2">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
            Left Zone (&lt; Pivot)
          </span>
          <div className="flex items-center gap-2">
            {(!step.leftZone || step.leftZone.length === 0) ? (
              <span className="text-xs text-zinc-500 italic">এখনও কোনো ছোট মান নেই</span>
            ) : (
              step.leftZone.map((v: number, i: number) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-900 border border-indigo-600 text-xs font-mono font-bold text-indigo-200">
                  {v}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Center Zone: Pivot */}
        <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-400 flex flex-col items-center justify-center min-h-[110px] space-y-2 shadow-lg shadow-amber-500/10">
          <span className="text-[10px] font-mono text-amber-300 uppercase font-bold tracking-wider">
            🎯 মূল পিভট (Pivot)
          </span>
          <div className="text-2xl font-mono font-black text-white">
            {step.pivotVal > 0 ? step.pivotVal : '✓'}
          </div>
        </div>

        {/* Right Zone (> Pivot) */}
        <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-700/50 flex flex-col items-center justify-center min-h-[110px] space-y-2">
          <span className="text-[10px] font-mono text-rose-400 uppercase font-bold tracking-wider">
            Right Zone (&gt; Pivot)
          </span>
          <div className="flex items-center gap-2">
            {(!step.rightZone || step.rightZone.length === 0) ? (
              <span className="text-xs text-zinc-500 italic">এখনও কোনো বড় মান নেই</span>
            ) : (
              step.rightZone.map((v: number, i: number) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-900 border border-rose-600 text-xs font-mono font-bold text-rose-200">
                  {v}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Overall Array View below */}
      <div className="flex items-center justify-center gap-2 pt-1 border-t border-[#1b2034]">
        {step.arr.map((val: number, idx: number) => (
          <span
            key={idx}
            className={`px-3 py-1 rounded-lg font-mono text-xs font-bold ${
              step.pivotIdx === idx
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400'
                : 'bg-[#121626] border border-[#212a44] text-zinc-300'
            }`}
          >
            {val}
          </span>
        ))}
      </div>

      {/* Explanation */}
      <div className="p-3.5 rounded-xl bg-[#0e1222] border border-[#1e2540] text-xs text-zinc-200 font-sans flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>{step.desc}</span>
      </div>
    </div>
  );
}
