'use client';

import React, { useState } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Search,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingDown,
  Cpu
} from 'lucide-react';

const SORTED_ARRAY = [4, 12, 19, 27, 35, 42, 58, 64, 71, 83, 91, 99];

export default function SearchingTopic() {
  const [target, setTarget] = useState<number>(83);
  const [linearIdx, setLinearIdx] = useState<number | null>(null);
  const [linearSteps, setLinearSteps] = useState<number>(0);
  const [binaryRange, setBinaryRange] = useState<{ low: number; mid: number; high: number } | null>(null);
  const [binarySteps, setBinarySteps] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [message, setMessage] = useState('Ready. Select a target number and run the Linear vs Binary search race!');

  const runRace = async () => {
    setIsRunning(true);
    setLinearIdx(null);
    setBinaryRange(null);
    setMessage('Race started! Watch Linear Search O(N) vs Binary Search O(log N)...');

    // 1. Run Linear Search Step by Step
    let lSteps = 0;
    for (let i = 0; i < SORTED_ARRAY.length; i++) {
      setLinearIdx(i);
      lSteps++;
      setLinearSteps(lSteps);
      await new Promise(r => setTimeout(r, 200));
      if (SORTED_ARRAY[i] === target) break;
    }

    // 2. Run Binary Search Step by Step
    let low = 0;
    let high = SORTED_ARRAY.length - 1;
    let bSteps = 0;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      bSteps++;
      setBinarySteps(bSteps);
      setBinaryRange({ low, mid, high });
      await new Promise(r => setTimeout(r, 400));

      if (SORTED_ARRAY[mid] === target) {
        break;
      } else if (SORTED_ARRAY[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    setIsRunning(false);
    setMessage(`🏁 Race complete! Linear Search took ${lSteps} steps (O(N)). Binary Search found it in only ${bSteps} steps (O(log N))!`);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow-lg shadow-sky-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100">Searching Algorithms: Linear vs Binary Search</h2>
            <span className="text-[11px] font-mono text-sky-400">Sequential Scan O(N) vs Logarithmic Divide O(log N)</span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          While <b>Linear Search</b> checks every single element sequentially, <b>Binary Search</b> requires the array to be sorted.
          It inspects the middle element and discards half the remaining items on every single step. In an array of 1,000,000 items,
          Binary Search takes at most <b>20 steps</b> ($\log_2(1,000,000) \approx 20$)!
        </p>
      </div>

      {/* 2. Interactive Search Race Canvas */}
      <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-6">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#11131f] p-3 rounded-xl border border-[#1d2030]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">Target to Find:</span>
            <select
              value={target}
              onChange={e => setTarget(Number(e.target.value))}
              disabled={isRunning}
              className="bg-[#090a10] border border-[#23273d] text-xs font-mono text-sky-300 px-3 py-1.5 rounded-lg focus:outline-none"
            >
              {SORTED_ARRAY.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <button
              onClick={runRace}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 font-semibold text-xs text-white shadow-lg transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Start Search Race!
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-zinc-400">Linear: <span className="text-rose-400 font-bold">{linearSteps}</span> steps</span>
            <span className="text-zinc-400">Binary: <span className="text-emerald-400 font-bold">{binarySteps}</span> steps</span>
          </div>
        </div>

        {/* Array Visualization Lanes */}
        <div className="space-y-6">
          {/* Lane 1: Linear Search */}
          <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1d2e] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Linear Search (Step-by-step scanner O(N))
              </span>
              <span className="text-zinc-500">Inspecting 1 item per cycle</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {SORTED_ARRAY.map((v, i) => (
                <div
                  key={i}
                  className={`w-11 h-11 rounded-lg border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                    linearIdx === i
                      ? v === target
                        ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 scale-110'
                        : 'bg-rose-500 text-white ring-2 ring-rose-500/40'
                      : 'bg-[#121422] border-[#222538] text-zinc-400'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Lane 2: Binary Search */}
          <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1d2e] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Binary Search (Halving Search Space O(log N))
              </span>
              <span className="text-zinc-500">Discarding 50% each jump</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {SORTED_ARRAY.map((v, i) => {
                const isMid = binaryRange?.mid === i;
                const inRange = binaryRange ? i >= binaryRange.low && i <= binaryRange.high : true;

                return (
                  <div
                    key={i}
                    className={`w-11 h-11 rounded-lg border font-mono text-xs flex items-center justify-center font-bold transition-all ${
                      isMid
                        ? v === target
                          ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 scale-110'
                          : 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-105'
                        : inRange
                        ? 'bg-[#151829] border-emerald-500/40 text-emerald-300'
                        : 'bg-[#0a0b12] border-[#181a26] text-zinc-600 opacity-40 line-through'
                    }`}
                  >
                    {v}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Feedback Banner */}
        <div className="p-3.5 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-sky-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{message}</span>
        </div>
      </div>

      {/* 3. Real World Usages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Zap className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-zinc-200">1. Git Bisect (Debugging Regressions)</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            When a bug appears across 1,000 commits, <code>git bisect</code> runs Binary Search on the git commit graph, finding the exact broken commit in just ~10 tests.
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Cpu className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-bold text-zinc-200">2. Database Index Range Scans</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            SQL queries with <code>WHERE age BETWEEN 25 AND 35</code> use Binary Search to jump immediately to age 25 in $O(\log N)$ time, avoiding millions of row scans.
          </p>
        </div>
      </div>
    </div>
  );
}
