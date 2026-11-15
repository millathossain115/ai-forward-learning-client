'use client';

import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';
import { DfsStep } from '../dfsTypes';

interface DfsStackPanelProps {
  currentStep: DfsStep;
}

export default function DfsStackPanel({ currentStep }: DfsStackPanelProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4">
      {/* Card 1: LIFO Call Stack */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>DFS Call Stack (LIFO)</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300">
            Depth #{currentStep.callStack.length}
          </span>
        </div>

        <div className="flex flex-col-reverse gap-1.5 min-h-[160px] p-2 rounded-xl bg-[#07080f] border border-[#181d30]">
          {currentStep.callStack.length === 0 ? (
            <div className="m-auto text-[11px] font-mono text-zinc-500">
              কল স্ট্যাক খালি (Stack Empty)
            </div>
          ) : (
            currentStep.callStack.map((node, idx) => {
              const isTop = idx === currentStep.callStack.length - 1;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-lg font-mono text-xs flex items-center justify-between border transition-all ${
                    isTop
                      ? 'bg-indigo-950/80 border-indigo-400 text-white font-bold ring-1 ring-indigo-400'
                      : 'bg-[#0f1222] border-[#1d243f] text-zinc-400'
                  }`}
                >
                  <span>DFS({node})</span>
                  <span className="text-[10px] text-zinc-500">
                    {isTop ? 'TOP (Active)' : `#${idx + 1}`}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Card 2: Traversal Order */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 shadow-xl text-xs font-mono">
        <span className="font-bold text-white flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>ভিজিট করার ক্রম (Visited Order)</span>
        </span>
        <div className="flex flex-wrap gap-1.5 p-2 bg-[#07080f] rounded-xl border border-[#181d30]">
          {currentStep.visitedNodes.map((n, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                {n}
              </span>
              {idx < currentStep.visitedNodes.length - 1 && (
                <span className="text-zinc-600">➔</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
