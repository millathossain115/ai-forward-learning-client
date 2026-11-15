'use client';

import React from 'react';
import { ListFilter, CheckCircle2 } from 'lucide-react';
import { BfsStep, GRAPH_NODES } from '../bfsTypes';

interface BfsQueueDistancePanelProps {
  currentStep: BfsStep;
}

export default function BfsQueueDistancePanel({ currentStep }: BfsQueueDistancePanelProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4">
      {/* Card 1: FIFO Queue */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
            <ListFilter className="w-3.5 h-3.5 text-sky-400" />
            <span>BFS FIFO Queue</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300">
            Front ➔ Tail
          </span>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#07080f] border border-[#181d30] overflow-x-auto min-h-[64px]">
          {currentStep.queue.length === 0 ? (
            <span className="text-[11px] font-mono text-zinc-500 m-auto">
              কিউ খালি (Queue Empty)
            </span>
          ) : (
            currentStep.queue.map((node, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border flex flex-col items-center shrink-0 ${
                  idx === 0
                    ? 'bg-sky-500 text-slate-950 border-sky-300 shadow ring-2 ring-sky-300/40'
                    : 'bg-[#0f172a] text-sky-300 border-[#1e293b]'
                }`}
              >
                <span>{node}</span>
                <span className="text-[8px] opacity-75 font-normal">
                  {idx === 0 ? 'HEAD' : `#${idx + 1}`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Card 2: Shortest Distance Array */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 shadow-xl text-xs font-mono">
        <span className="font-bold text-white flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>সোর্স A থেকে সর্বনিম্ন দূরত্ব (Shortest Hops)</span>
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {GRAPH_NODES.map(node => {
            const dist = currentStep.distances[node.id];
            return (
              <div
                key={node.id}
                className={`p-2 rounded-lg border text-center ${
                  dist !== undefined
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-[#07080f] border-[#181d30] text-zinc-600'
                }`}
              >
                <div className="text-[10px] text-zinc-400">{node.id}</div>
                <div className="font-bold text-xs">{dist !== undefined ? dist : '∞'}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
