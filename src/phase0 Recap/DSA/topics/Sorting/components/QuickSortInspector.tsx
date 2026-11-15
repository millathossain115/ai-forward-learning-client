'use client';

import React from 'react';
import { Target } from 'lucide-react';
import { TreePartitionStep, BarSortStep } from '../utils/quickSortUtils';

interface QuickSortInspectorProps {
  visualMode: 'tree' | 'bars';
  treeStepIdx: number;
  totalTreeSteps: number;
  currentTreeStep: TreePartitionStep;
  barStepIdx: number;
  currentBarStep: BarSortStep;
}

export default function QuickSortInspector({
  visualMode,
  treeStepIdx,
  totalTreeSteps,
  currentTreeStep,
  barStepIdx,
  currentBarStep
}: QuickSortInspectorProps) {
  return (
    <div className="flex flex-col space-y-3">
      {/* Step Description Card */}
      <div className="p-4 rounded-2xl bg-[#0e0707] border border-[#2e1414] shadow-lg space-y-2">
        <div className="flex items-center justify-between border-b border-[#210f0f] pb-2">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
            {visualMode === 'tree'
              ? `ধাপ ${treeStepIdx + 1} / ${totalTreeSteps}`
              : `বার স্টেপ ${barStepIdx + 1}`}
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
            {visualMode === 'tree'
              ? currentTreeStep.finalAssembly
                ? 'ASSEMBLY'
                : 'PARTITION'
              : 'IN-PLACE'}
          </span>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug">
          {visualMode === 'tree' ? currentTreeStep.title : 'লাইভ পার্টিশনিং স্ট্যাটাস'}
        </h3>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          {visualMode === 'tree' ? currentTreeStep.desc : currentBarStep.desc}
        </p>
      </div>

      {/* LIVE FINAL ASSEMBLY ARENA (Visible in Tree mode during assembly steps) */}
      {visualMode === 'tree' && currentTreeStep.finalAssembly && (
        <div className="p-4 rounded-2xl bg-[#09111c] border-2 border-rose-500/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center gap-1.5 border-b border-[#182a40] pb-2">
            <Target className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider">
              চূড়ান্ত সংযোজন (Left + Pivot + Right)
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {/* Left block */}
            <div className="p-2 rounded-xl bg-[#060c14] border border-sky-500/30 flex items-center justify-between">
              <span className="text-[10px] text-sky-400 uppercase font-bold">
                ১. বামের সর্টেড (&lt; 8):
              </span>
              <div className="flex items-center gap-1">
                {currentTreeStep.finalAssembly.leftBlock.map((v, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-sky-900 border border-sky-500 text-sky-100 font-bold text-[11px]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Pivot */}
            <div className="p-2 rounded-xl bg-[#1c1204] border border-amber-500/40 flex items-center justify-between">
              <span className="text-[10px] text-amber-300 uppercase font-bold flex items-center gap-1">
                <Target className="w-3 h-3 text-amber-400" />
                <span>২. কেন্দ্রীয় পিভট:</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500 border border-amber-300 text-black font-black text-xs">
                {currentTreeStep.finalAssembly.pivotVal}
              </span>
            </div>

            {/* Right block */}
            <div className="p-2 rounded-xl bg-[#060c14] border border-rose-500/30 flex items-center justify-between">
              <span className="text-[10px] text-rose-400 uppercase font-bold">
                ৩. ডানের সর্টেড (&gt;= 8):
              </span>
              <div className="flex items-center gap-1">
                {currentTreeStep.finalAssembly.rightBlock.map((v, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-rose-900 border border-rose-500 text-rose-100 font-bold text-[11px]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Combined Assembled Array */}
          <div className="p-2 rounded-xl bg-[#050912] border border-emerald-500/30 flex flex-col items-center space-y-1.5">
            <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">
              সমন্বিত পূর্ণাঙ্গ সর্টেড অ্যারে
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {currentTreeStep.finalAssembly.assembledSoFar.map((v, idx) => {
                const isP = v === currentTreeStep.finalAssembly?.pivotVal;
                return (
                  <span
                    key={idx}
                    className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-black border ${
                      isP
                        ? 'bg-amber-500 text-black border-amber-300 scale-105'
                        : 'bg-emerald-950 text-emerald-200 border-emerald-700'
                    }`}
                  >
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Invariants & Complexity Matrix */}
      <div className="p-3.5 rounded-2xl bg-[#0e0707] border border-[#2e1414] text-xs font-mono space-y-2">
        <span className="text-[10px] uppercase font-bold text-zinc-400 block border-b border-[#210f0f] pb-1">
          মৌলিক ইনভ্যারিয়েন্ট (Invariants)
        </span>
        <div className="flex justify-between">
          <span className="text-zinc-400">Average Time:</span>
          <span className="text-emerald-300 font-bold">O(N log N) Fast</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Auxiliary Space:</span>
          <span className="text-sky-300 font-bold">O(log N) Call Stack</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">In-Place:</span>
          <span className="text-emerald-300 font-bold">Yes (RAM Locality)</span>
        </div>
      </div>
    </div>
  );
}
