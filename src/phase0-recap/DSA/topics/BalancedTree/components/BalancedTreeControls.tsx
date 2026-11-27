'use client';

import React from 'react';
import { PlusCircle, RotateCcw } from 'lucide-react';

interface BalancedTreeControlsProps {
  activeModel: 'avl' | 'redblack';
  onSelectModel: (model: 'avl' | 'redblack') => void;
  inputVal: number;
  setInputVal: (val: number) => void;
  onInsert: () => void;
  onTriggerPreset: (type: 'LL' | 'RR' | 'LR' | 'RL') => void;
  onReset: () => void;
  isPlaying: boolean;
}

export default function BalancedTreeControls({
  activeModel,
  onSelectModel,
  inputVal,
  setInputVal,
  onInsert,
  onTriggerPreset,
  onReset,
  isPlaying
}: BalancedTreeControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Simulator Top Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-[#1b1e2e]">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono text-zinc-400 font-semibold">
            ট্রি মডেল ফিল্টার:
          </span>
          <div className="flex items-center bg-[#090a10] p-1 rounded-xl border border-[#1f2338]">
            <button
              onClick={() => onSelectModel('avl')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                activeModel === 'avl'
                  ? 'bg-sky-600 text-white '
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-300"></span>
              AVL Tree (Strict)
            </button>
            <button
              onClick={() => onSelectModel('redblack')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                activeModel === 'redblack'
                  ? 'bg-rose-600 text-white '
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Red-Black Tree (Standard)
            </button>
          </div>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 bg-[#131522] px-3 py-1 rounded-lg border border-[#1e2235]">
          {activeModel === 'avl' ? 'Balance Factor: |hL - hR| ≤ 1' : '5 Color-Coding Invariants'}
        </span>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3.5 rounded-xl border border-[#1d2030]">
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="flex items-center gap-2 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
            <span className="text-xs font-mono text-zinc-300 font-medium">Insert:</span>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(Number(e.target.value))}
              className="w-16 bg-[#141624] text-sky-300 text-sm px-2.5 py-0.5 rounded border border-[#23273d] text-center font-mono focus:outline-none focus:border-sky-500"
            />
            <button
              onClick={onInsert}
              disabled={isPlaying}
              className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-slate-950 font-bold transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Insert
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#090a10] px-3 py-1.5 rounded-lg border border-[#1a1c29]">
            <span className="text-xs font-mono text-zinc-400">Test Rotations:</span>
            <button
              onClick={() => onTriggerPreset('LL')}
              disabled={isPlaying}
              className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-sky-300 border border-[#26304d] cursor-pointer"
              title="Left-Left imbalance ➔ Right Rotate"
            >
              LL
            </button>
            <button
              onClick={() => onTriggerPreset('RR')}
              disabled={isPlaying}
              className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-indigo-300 border border-[#26304d] cursor-pointer"
              title="Right-Right imbalance ➔ Left Rotate"
            >
              RR
            </button>
            <button
              onClick={() => onTriggerPreset('LR')}
              disabled={isPlaying}
              className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-emerald-300 border border-[#26304d] cursor-pointer"
              title="Left-Right zig-zag ➔ Double Rotate"
            >
              LR
            </button>
            <button
              onClick={() => onTriggerPreset('RL')}
              disabled={isPlaying}
              className="px-2 py-0.5 rounded bg-[#161a29] hover:bg-[#20273d] text-xs font-mono text-amber-300 border border-[#26304d] cursor-pointer"
              title="Right-Left zig-zag ➔ Double Rotate"
            >
              RL
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs md:text-sm font-mono px-3.5 py-1.5 rounded-lg bg-[#181a26] hover:bg-[#202336] text-zinc-200 border border-[#292c42] cursor-pointer font-medium"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
