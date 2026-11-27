import React from 'react';
import { PlusCircle, Play, RotateCcw } from 'lucide-react';
import { ListType } from '../types';

interface LinkedListControlsProps {
  listType: ListType;
  setListType: (t: ListType) => void;
  inputValue: number;
  setInputValue: (v: number) => void;
  insertIdx: number;
  setInsertIdx: (idx: number) => void;
  nodesLength: number;
  isAnimating: boolean;
  onInsertHead: () => void;
  onInsertTail: () => void;
  onInsertAt: () => void;
  onTraverse: () => void;
  onReset: () => void;
}

export default function LinkedListControls({
  listType,
  setListType,
  inputValue,
  setInputValue,
  insertIdx,
  setInsertIdx,
  nodesLength,
  isAnimating,
  onInsertHead,
  onInsertTail,
  onInsertAt,
  onTraverse,
  onReset,
}: LinkedListControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3.5 rounded-xl border border-[#1d2030]">
      <div className="flex flex-wrap items-center gap-3">
        {/* Singly vs Doubly vs Circular Toggle */}
        <div className="flex items-center gap-1 bg-[#090a10] p-1 rounded-lg border border-[#1e2235] text-xs md:text-sm">
          <button
            onClick={() => setListType('singly')}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-md font-mono transition-colors text-xs md:text-sm ${
              listType === 'singly' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Singly
          </button>
          <button
            onClick={() => setListType('doubly')}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-md font-mono transition-colors text-xs md:text-sm ${
              listType === 'doubly' ? 'bg-teal-400 text-slate-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Doubly
          </button>
          <button
            onClick={() => setListType('circular')}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-md font-mono transition-colors text-xs md:text-sm ${
              listType === 'circular' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Circular 🔄
          </button>
        </div>

        {/* Input with Label */}
        <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
          <span className="text-xs font-mono text-zinc-300 font-medium">মান:</span>
          <input
            type="number"
            value={inputValue}
            disabled={isAnimating}
            onChange={e => setInputValue(Number(e.target.value))}
            className="w-14 bg-[#141624] text-emerald-300 text-sm px-2 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Head & Tail Insert Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onInsertHead}
            disabled={isAnimating}
            className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold disabled:opacity-40 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Head O(1)
          </button>
          <button
            onClick={onInsertTail}
            disabled={isAnimating}
            className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold disabled:opacity-40 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" /> Tail
          </button>
        </div>

        {/* Insert At Specific Index */}
        <div className="flex items-center gap-1.5 bg-[#090a10] p-1.5 rounded-lg border border-[#1e2235]">
          <span className="text-xs font-mono text-zinc-300">@ Idx:</span>
          <input
            type="number"
            min={0}
            max={nodesLength}
            value={insertIdx}
            disabled={isAnimating}
            onChange={e => setInsertIdx(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-12 bg-[#141624] text-sky-300 text-sm px-1.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-sky-500"
          />
          <button
            onClick={onInsertAt}
            disabled={isAnimating}
            className="flex items-center gap-1 text-xs md:text-sm font-mono px-3 py-1 rounded bg-sky-600/30 hover:bg-sky-600/40 text-sky-300 border border-sky-500/40 font-semibold disabled:opacity-40 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Insert @
          </button>
        </div>

        <button
          onClick={onTraverse}
          disabled={isAnimating}
          className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold disabled:opacity-40 transition-colors cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> Traverse
        </button>
      </div>

      <button
        onClick={onReset}
        disabled={isAnimating}
        className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] disabled:opacity-40 cursor-pointer font-medium"
      >
        <RotateCcw className="w-4 h-4" /> Reset
      </button>
    </div>
  );
}
