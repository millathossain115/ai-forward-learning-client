'use client';

import React from 'react';
import { LinearSlot, PipelineState } from '../types';

interface LinearProbingVisualizerProps {
  probingSlots: LinearSlot[];
  pipelineState: PipelineState;
}

export default function LinearProbingVisualizer({ probingSlots, pipelineState }: LinearProbingVisualizerProps) {
  return (
    <div className="bg-[#090a10] rounded-xl border border-[#1a1d2e] p-3.5 sm:p-4 flex flex-col gap-2.5">
      <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
        <span>Open Addressing: Linear Probing Array (কোনো লিংকড লিস্ট নেই)</span>
        <span className="text-amber-400">Collision: (Index + 1) % 7</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 bg-[#111320] p-2 rounded-xl border border-[#1f2336]">
        {probingSlots.map((slot, idx) => {
          const isTarget = pipelineState.bucketIndex === idx;
          const isOccupied = slot.key !== null;

          let cardStyle = 'bg-black/30 border-zinc-800 text-zinc-600';
          if (slot.state === 'inserted') {
            cardStyle = 'bg-amber-500 border-amber-300 text-slate-950 font-bold scale-105   ring-2 ring-amber-400';
          } else if (slot.state === 'found') {
            cardStyle = 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold scale-105   ring-2 ring-emerald-400 ';
          } else if (slot.state === 'collision') {
            cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-300 ring-2 ring-rose-500/40';
          } else if (isOccupied) {
            cardStyle = 'bg-[#181b2e] border-pink-500/40 text-zinc-200';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-mono text-zinc-400 font-bold">[{idx}]</span>
              <div
                className={`w-full h-14 rounded-lg border p-1 flex flex-col items-center justify-center text-center font-mono transition-colors duration-300 ${cardStyle} ${
                  isTarget ? 'ring-2 ring-cyan-400' : ''
                }`}
              >
                {isOccupied ? (
                  <>
                    <span className="text-xs font-bold truncate w-full text-pink-300">{slot.key}</span>
                    <span className="text-[9px] truncate w-full opacity-75 text-emerald-300">{slot.value}</span>
                  </>
                ) : (
                  <span className="text-[10px] italic text-zinc-600">খালি</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
