'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { TreeStep } from '../utils/mergeSortUtils';

interface MergeSortInspectorProps {
  stepIdx: number;
  totalSteps: number;
  currentStep: TreeStep;
}

export default function MergeSortInspector({
  stepIdx,
  totalSteps,
  currentStep
}: MergeSortInspectorProps) {
  return (
    <div className="flex flex-col space-y-3">
      {/* Step Intuition & Description Card */}
      <div className="p-4 rounded-2xl bg-[#090e17] border border-[#1b2b3f] space-y-2">
        <div className="flex items-center justify-between border-b border-[#142336] pb-2">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
            ধাপ {stepIdx + 1} / {totalSteps}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              currentStep.phase === 'divide'
                ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30'
                : currentStep.phase === 'base'
                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                : currentStep.phase === 'complete'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
            }`}
          >
            {currentStep.phase.toUpperCase()}
          </span>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug">{currentStep.title}</h3>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{currentStep.desc}</p>
      </div>

      {/* LIVE FINAL GRAND MERGE 2-POINTER INSPECTOR (When merging) */}
      {currentStep.finalZipper && (
        <div className="p-4 rounded-2xl bg-[#09111c] border-2 border-amber-500/40 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-1.5 border-b border-[#182a40] pb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-300">
              চূড়ান্ত ২-পয়েন্টার জিপার তুলনা
            </span>
          </div>

          {/* Dual pointers comparison */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {/* Left array */}
            <div className="p-2 rounded-xl bg-[#060c14] border border-sky-500/30 flex flex-col items-center">
              <span className="text-[9px] text-sky-400 uppercase font-bold mb-1">পয়েন্টার i (Left)</span>
              <div className="flex items-center gap-1">
                {currentStep.finalZipper.leftVals.map((v, idx) => {
                  const isPtr = idx === currentStep.finalZipper?.leftPtr;
                  return (
                    <span
                      key={idx}
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold border ${
                        isPtr
                          ? 'bg-amber-500 text-black border-amber-300 scale-110 font-semibold'
                          : 'bg-sky-950 text-sky-200 border-sky-800 opacity-60'
                      }`}
                    >
                      {v}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right array */}
            <div className="p-2 rounded-xl bg-[#060c14] border border-sky-500/30 flex flex-col items-center">
              <span className="text-[9px] text-sky-400 uppercase font-bold mb-1">পয়েন্টার j (Right)</span>
              <div className="flex items-center gap-1">
                {currentStep.finalZipper.rightVals.map((v, idx) => {
                  const isPtr = idx === currentStep.finalZipper?.rightPtr;
                  return (
                    <span
                      key={idx}
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold border ${
                        isPtr
                          ? 'bg-amber-500 text-black border-amber-300 scale-110 font-semibold'
                          : 'bg-sky-950 text-sky-200 border-sky-800 opacity-60'
                      }`}
                    >
                      {v}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 8-Slot Output Tray */}
          <div className="p-2 rounded-xl bg-[#050912] border border-emerald-500/30 flex flex-col items-center space-y-1.5">
            <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">
              সর্টেড ট্রে (Final Tray Filling)
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {Array.from({ length: 8 }).map((_, slotIdx) => {
                const val = currentStep.finalZipper?.mergedOut[slotIdx];
                const isFilled = val !== undefined;
                const isLatest = slotIdx === (currentStep.finalZipper?.mergedOut.length ?? 0) - 1;
                return (
                  <span
                    key={slotIdx}
                    className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-semibold border transition-colors ${
                      isLatest
                        ? 'bg-emerald-500 text-black border-emerald-300 scale-105'
                        : isFilled
                        ? 'bg-emerald-950 text-emerald-200 border-emerald-700'
                        : 'bg-zinc-900/40 text-zinc-600 border-zinc-800 border-dashed'
                    }`}
                  >
                    {isFilled ? val : '?'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Invariants & Complexity Matrix */}
      <div className="p-3.5 rounded-2xl bg-[#090e17] border border-[#1b2b3f] text-xs font-mono space-y-2">
        <span className="text-[10px] uppercase font-bold text-zinc-400 block border-b border-[#142336] pb-1">
          মৌলিক ইনভ্যারিয়েন্ট (Invariants)
        </span>
        <div className="flex justify-between">
          <span className="text-zinc-400">Time Complexity:</span>
          <span className="text-teal-300 font-bold">O(N log N) Strict</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Auxiliary Space:</span>
          <span className="text-amber-300 font-bold">O(N) Buffer</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">Stability:</span>
          <span className="text-emerald-300 font-bold">100% Stable</span>
        </div>
      </div>
    </div>
  );
}
