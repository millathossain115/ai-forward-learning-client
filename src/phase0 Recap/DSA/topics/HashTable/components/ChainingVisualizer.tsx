'use client';

import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { ChainItem, PipelineState, BUCKET_COUNT } from '../types';

interface ChainingVisualizerProps {
  chainBuckets: ChainItem[][];
  pipelineState: PipelineState;
}

export default function ChainingVisualizer({ chainBuckets, pipelineState }: ChainingVisualizerProps) {
  const totalChainItems = chainBuckets.reduce((acc, b) => acc + b.length, 0);
  const loadFactor = (totalChainItems / BUCKET_COUNT).toFixed(2);

  return (
    <div className="bg-[#090a10] rounded-xl border border-[#1a1d2e] p-3.5 sm:p-4 flex flex-col gap-2.5">
      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
        <span>Bucket Array (৭টি বাকেট • ২-কলাম ভিউ)</span>
        <span className="text-pink-400">Index = hash(key) % 7</span>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {chainBuckets.map((chain, bIdx) => {
          const isTargetBucket = pipelineState.bucketIndex === bIdx;
          return (
            <div
              key={bIdx}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border transition-all duration-300 min-h-[46px] ${
                isTargetBucket
                  ? 'bg-pink-950/40 border-pink-500 ring-2 ring-pink-500/30'
                  : 'bg-[#121422] border-[#1e2236]'
              }`}
            >
              {/* Compact Bucket Cell */}
              <div className="w-12 h-7 rounded-lg bg-[#1a1d30] border border-[#282d4d] flex items-center justify-center font-mono font-bold text-xs text-pink-300 shrink-0">
                [{bIdx}]
              </div>

              <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />

              {/* Compact Linked List Chained Nodes */}
              <div className="flex flex-wrap items-center gap-1.5 flex-1 overflow-x-auto py-0.5">
                {chain.length === 0 ? (
                  <span className="text-[10px] font-mono text-zinc-600 italic">খালি (NULL)</span>
                ) : (
                  chain.map((item, itemIdx) => {
                    let itemBadge = 'bg-[#1c1f33] border-pink-500/40 text-zinc-200';
                    if (item.state === 'inserted') {
                      itemBadge = 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold scale-105 shadow-md shadow-cyan-500/30 ring-2 ring-cyan-400';
                    } else if (item.state === 'found') {
                      itemBadge = 'bg-emerald-500 border-emerald-300 text-slate-950 font-bold scale-105 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-400 animate-pulse';
                    } else if (item.state === 'comparing') {
                      itemBadge = 'bg-amber-500/30 border-amber-400 text-amber-300 ring-2 ring-amber-400/40 animate-pulse';
                    }

                    return (
                      <React.Fragment key={item.id || itemIdx}>
                        {itemIdx > 0 && <span className="text-pink-500 font-bold text-[10px]">➔</span>}
                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[11px] font-mono transition-all duration-300 shrink-0 ${itemBadge}`}
                        >
                          <span className="font-semibold text-pink-300">{item.key}</span>
                          <span className="opacity-50">:</span>
                          <span className="text-emerald-300">{item.value}</span>
                        </div>
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}

        {/* 8th Slot in Grid: Summary & Load Factor Mini Card */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl border border-pink-500/20 bg-pink-950/15 text-xs font-mono min-h-[46px]">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-zinc-400 text-[11px]">লোড ফ্যাক্টর:</span>
            <span className="text-pink-300 font-bold">{totalChainItems}/7 ({loadFactor})</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
            O(1) Optimal
          </span>
        </div>
      </div>
    </div>
  );
}
