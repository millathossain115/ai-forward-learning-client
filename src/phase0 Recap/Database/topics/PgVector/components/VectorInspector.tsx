import React from 'react';
import { Compass } from 'lucide-react';
import { RankedVectorPoint, IndexType } from '../types';

interface VectorInspectorProps {
  queryText: string;
  top3: RankedVectorPoint[];
  probedCount: number;
  totalDatasetCount: number;
  indexType: IndexType;
}

export default function VectorInspector({
  queryText,
  top3,
  probedCount,
  totalDatasetCount,
  indexType,
}: VectorInspectorProps) {
  return (
    <div className="flex flex-col justify-between bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl gap-4">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2233]">
          <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Top-K Nearest Neighbors
          </h3>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
            K=3
          </span>
        </div>

        {/* Query Meta */}
        <div className="py-2.5 text-xs font-mono text-zinc-400 border-b border-[#181a28]">
          <span>Query: </span>
          <span className="text-zinc-100 font-semibold">&quot;{queryText}&quot;</span>
        </div>

        {/* Match Cards */}
        <div className="flex flex-col gap-2.5 mt-3">
          {top3.map((match, rank) => (
            <div
              key={match.id}
              className={`p-3 rounded-lg border flex items-center justify-between ${
                rank === 0
                  ? 'bg-cyan-950/30 border-cyan-600/60 text-cyan-200'
                  : 'bg-[#121422] border-[#1e2238] text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    rank === 0 ? 'bg-cyan-500 text-slate-950' : 'bg-[#1c1f32] text-zinc-400'
                  }`}
                >
                  {rank + 1}
                </span>
                <div>
                  <span className="text-sm font-bold text-zinc-100 block">{match.label}</span>
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    {match.category}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-[#090a10] px-2 py-1 rounded border border-[#1a1c29]">
                {match.scoreText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pruning Efficiency Stat */}
      <div className="p-3 rounded-lg bg-[#090a10] border border-[#1a1c29] text-xs font-mono flex items-center justify-between">
        <span className="text-zinc-400">Vectors Evaluated:</span>
        <span className="text-emerald-400 font-bold">
          {probedCount} / {totalDatasetCount} (
          {indexType === 'exact'
            ? '100% brute scan'
            : `${Math.round((probedCount / totalDatasetCount) * 100)}% pruned search`}
          )
        </span>
      </div>
    </div>
  );
}
