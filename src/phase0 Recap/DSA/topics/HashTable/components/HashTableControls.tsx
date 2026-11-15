'use client';

import React from 'react';
import { TableMode } from '../types';
import { RotateCcw, PlusCircle, Search } from 'lucide-react';

interface HashTableControlsProps {
  tableMode: TableMode;
  onSetTableMode: (mode: TableMode) => void;
  isAnimating: boolean;
  onReset: () => void;
  inputKey: string;
  setInputKey: (val: string) => void;
  inputVal: string;
  setInputVal: (val: string) => void;
  onPut: () => void;
  searchKey: string;
  setSearchKey: (val: string) => void;
  onSearch: () => void;
}

export default function HashTableControls({
  tableMode,
  onSetTableMode,
  isAnimating,
  onReset,
  inputKey,
  setInputKey,
  inputVal,
  setInputVal,
  onPut,
  searchKey,
  setSearchKey,
  onSearch
}: HashTableControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Tier 1: Mode Selector Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-2.5 rounded-xl border border-[#1d2030]">
        <div className="flex items-center gap-1 bg-[#090a10] p-1 rounded-lg border border-[#1e2235]">
          <button
            onClick={() => onSetTableMode('chaining')}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
              tableMode === 'chaining'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Chaining (লিংকড লিস্ট 🔗)
          </button>
          <button
            onClick={() => onSetTableMode('probing')}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
              tableMode === 'probing'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Linear Probing (পরবর্তী স্লট ➔)
          </button>
          <button
            onClick={() => onSetTableMode('set')}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
              tableMode === 'set'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Hash Set (ইউনিক কি 🎯)
          </button>
        </div>

        <button
          onClick={onReset}
          disabled={isAnimating}
          className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-300 border border-[#292c42] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> রিসেট
        </button>
      </div>

      {/* Tier 2: SEPARATE INSERT & SEARCH CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030] items-center">
        {/* Section A: INSERT CONTROLS */}
        <div className="lg:col-span-7 flex flex-wrap items-center gap-2 border-b lg:border-b-0 lg:border-r border-[#1f2336] pb-2.5 lg:pb-0 lg:pr-3">
          <span className="text-[11px] font-mono text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
            <PlusCircle className="w-3.5 h-3.5 text-pink-400" /> ইনসার্ট:
          </span>

          <div className="flex items-center gap-1.5 bg-[#090a10] px-2 py-1 rounded-lg border border-[#1a1c29]">
            <span className="text-[10px] font-mono text-zinc-400">Key:</span>
            <input
              type="text"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-20 bg-[#141624] text-pink-300 text-xs px-1.5 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-pink-500"
            />
          </div>

          {tableMode !== 'set' && (
            <div className="flex items-center gap-1.5 bg-[#090a10] px-2 py-1 rounded-lg border border-[#1a1c29]">
              <span className="text-[10px] font-mono text-zinc-400">Val:</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-20 bg-[#141624] text-rose-300 text-xs px-1.5 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-rose-500"
              />
            </div>
          )}

          <button
            onClick={onPut}
            disabled={isAnimating}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold shadow-md shadow-pink-600/20 transition-all disabled:opacity-40 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" /> PUT
          </button>
        </div>

        {/* Section B: SEARCH CONTROLS */}
        <div className="lg:col-span-5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Search className="w-3.5 h-3.5 text-rose-400" /> সার্চ:
          </span>

          <div className="flex items-center gap-1.5 bg-[#090a10] px-2.5 py-1 rounded-lg border border-[#1a1c29] flex-1 min-w-[130px]">
            <span className="text-[10px] font-mono text-zinc-400">Key:</span>
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full bg-[#141624] text-rose-300 text-xs px-2 py-0.5 rounded border border-[#23273d] font-mono focus:outline-none focus:border-rose-500"
              placeholder="Search key..."
            />
          </div>

          <button
            onClick={onSearch}
            disabled={isAnimating}
            className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md shadow-rose-600/20 transition-all disabled:opacity-40 shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" /> GET O(1)
          </button>
        </div>
      </div>
    </div>
  );
}
