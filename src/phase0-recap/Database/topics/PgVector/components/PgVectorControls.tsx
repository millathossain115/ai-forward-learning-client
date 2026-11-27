import React from 'react';
import { Search } from 'lucide-react';
import { MetricType, IndexType, PresetQuery, PRESET_QUERIES } from '../types';

interface PgVectorControlsProps {
  queryText: string;
  onSelectPreset: (p: PresetQuery) => void;
  metric: MetricType;
  setMetric: (m: MetricType) => void;
  indexType: IndexType;
  setIndexType: (i: IndexType) => void;
  isSearching: boolean;
  onSearch: () => void;
}

export default function PgVectorControls({
  queryText,
  onSelectPreset,
  metric,
  setMetric,
  indexType,
  setIndexType,
  isSearching,
  onSearch,
}: PgVectorControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-[#11131f] p-4 rounded-xl border border-[#1d2030]">
      {/* Preset Prompts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-300 font-medium">Test Prompt:</span>
        {PRESET_QUERIES.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPreset(p)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              queryText === p.text
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'bg-[#181a28] text-zinc-300 hover:text-zinc-100 border border-[#23273d]'
            }`}
          >
            &quot;{p.text}&quot;
          </button>
        ))}
      </div>

      {/* Metric Selector */}
      <div className="flex items-center gap-1.5 bg-[#090a10] p-1 rounded-lg border border-[#1e2235] text-xs">
        <span className="text-xs font-mono text-zinc-400 px-2">Metric:</span>
        {(['cosine', 'l2', 'inner'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`px-2.5 py-1 rounded-md font-mono transition-colors text-xs cursor-pointer ${
              metric === m
                ? 'bg-cyan-600 text-white font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {m === 'cosine' ? 'Cosine (<=>)' : m === 'l2' ? 'L2 (<->)' : 'Dot (<#>)'}
          </button>
        ))}
      </div>

      {/* Index Type Selector */}
      <div className="flex items-center gap-1.5 bg-[#090a10] p-1 rounded-lg border border-[#1e2235] text-xs">
        <span className="text-xs font-mono text-zinc-400 px-2">Index:</span>
        {(['exact', 'ivfflat', 'hnsw'] as const).map((idxType) => (
          <button
            key={idxType}
            onClick={() => setIndexType(idxType)}
            className={`px-2.5 py-1 rounded-md font-mono transition-colors text-xs cursor-pointer ${
              indexType === idxType
                ? 'bg-indigo-600 text-white font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {idxType === 'exact' ? 'Exact (No Index)' : idxType === 'ivfflat' ? 'IVFFlat' : 'HNSW'}
          </button>
        ))}
      </div>

      {/* Search Trigger */}
      <button
        onClick={onSearch}
        disabled={isSearching}
        className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
      >
        <Search className="w-4 h-4" /> Run Vector Search
      </button>
    </div>
  );
}
