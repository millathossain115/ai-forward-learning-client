'use client';

import React from 'react';
import { Compass, Table } from 'lucide-react';
import { DijkstraStep, GRAPH_NODES } from '../dijkstraTypes';

interface DijkstraQueueDistancePanelProps {
  currentStep: DijkstraStep;
}

export default function DijkstraQueueDistancePanel({ currentStep }: DijkstraQueueDistancePanelProps) {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4">
      {/* Card 1: Min-Heap Priority Queue */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Min-Heap Priority Queue</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
            Min First
          </span>
        </div>

        <div className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-[#07080f] border border-[#181d30] min-h-[60px] items-center">
          {currentStep.priorityQueue.length === 0 ? (
            <span className="text-[11px] font-mono text-zinc-500 m-auto">
              Min-Heap খালি
            </span>
          ) : (
            currentStep.priorityQueue.map((item, idx) => (
              <div
                key={idx}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs flex items-center gap-1.5 border ${
                  idx === 0
                    ? 'bg-amber-950 border-amber-500 text-amber-200 font-bold ring-1 ring-amber-400'
                    : 'bg-[#101426] border-[#1f2845] text-zinc-400'
                }`}
              >
                <span>{item.node}</span>
                <span className="text-[10px] text-amber-400">({item.dist})</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Card 2: Distance Table dist[] */}
      <div className="bg-[#0c0e18] border border-[#212740] rounded-2xl p-4 space-y-2.5 text-xs font-mono">
        <span className="font-bold text-white flex items-center gap-1.5">
          <Table className="w-3.5 h-3.5 text-emerald-400" />
          <span>দূরত্ব টেবিল (Tentative Distance Table)</span>
        </span>
        <div className="grid grid-cols-3 gap-2">
          {GRAPH_NODES.map((node) => {
            const dist = currentStep.distances[node.id];
            const isVisited = currentStep.visited.includes(node.id);
            const parent = currentStep.previous[node.id];

            return (
              <div
                key={node.id}
                className={`p-2 rounded-xl border flex flex-col items-center justify-between ${
                  isVisited
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : dist !== Infinity
                    ? 'bg-amber-950/30 border-amber-600/40 text-amber-200'
                    : 'bg-[#07080f] border-[#181d30] text-zinc-600'
                }`}
              >
                <div className="text-[10px] text-zinc-400 font-bold">{node.id}</div>
                <div className="text-sm font-bold my-0.5">
                  {dist === Infinity ? '∞' : dist}
                </div>
                <div className="text-[9px] text-zinc-500">
                  via {parent || 'null'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
