'use client';

import RealLifeScenario from '@/components/RealLifeScenario';

import React, { useState } from 'react';
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  Table
} from 'lucide-react';

export default function ParadigmsTopic() {
  const [activeTab, setActiveTab] = useState<'greedy' | 'dp' | 'divide' | 'backtracking'>('dp');

  // DP Fibonacci state
  const [fibN, setFibN] = useState<number>(6);

  const computeFibTable = (n: number) => {
    const table = [0, 1];
    for (let i = 2; i <= n; i++) {
      table[i] = table[i - 1] + table[i - 2];
    }
    return table;
  };

  const fibTable = computeFibTable(fibN);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-amber-400/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-100">The 4 Core Algorithmic Paradigms</h2>
            <span className="text-[11px] font-mono text-amber-400">Greedy • Divide &amp; Conquer • Dynamic Programming • Backtracking</span>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
          Every complex algorithm boils down to one of these four master problem-solving strategies.
          Understanding which philosophy matches your problem avoids brute-force exponential deadlocks.
        </p>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'dp' as const, label: 'Dynamic Programming (Memoization)' },
            { id: 'greedy' as const, label: 'Greedy Approach (Local Optimal)' },
            { id: 'divide' as const, label: 'Divide & Conquer (Split & Merge)' },
            { id: 'backtracking' as const, label: 'Backtracking (Pruning Dead Ends)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'bg-[#141624] text-zinc-400 hover:text-zinc-200 border border-[#202438]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Real-Life Scenarios */}
            <RealLifeScenario
        topicName="অ্যালগরিদমিক প্যারাডাইম (Greedy vs Dynamic Programming)"
        scenarios={[
          {
            title: "১. ক্যাশিয়ারের সবচেয়ে কম নোটে ভাঙতি ফেরত দেওয়া",
            subtitle: "তাৎক্ষণিক সবচেয়ে বড় মানের নোটটি আগে বেছে নেওয়া",
            badge: "Greedy Choice",
            visualTag: "Locally Optimal Choice",
            accentColor: "emerald",
            analogy:
              "দোকানদার আপনাকে ৩৬০ টাকা ফেরত দিতে গিয়ে সবার আগে সবচেয়ে বড় নোট (১০০×৩=৩০০, ৫০×১=৫০, ১০×১=১০) বাছাই করে। প্রতি পদক্ষেপে তাৎক্ষণিক সর্বোচ্চ লাভ নেওয়া!",
            whyItFits:
              "Greedy মেথড সবসময় বর্তমান মুহূর্তের সেরা সিদ্ধান্তটি আগে গ্রহণ করে যাতে দ্রুত সমাধানে পৌঁছানো যায়।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">৩৬০ টাকা</span>
                <span>➔ -৩০০ ➔</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800">৬০ টাকা বাকি</span>
                <span>➔ -৫০ ➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold">১০ টাকা বাকি = ৫টি নোট</span>
              </div>
            ),
          },
          {
            title: "২. পরীক্ষার খাতার রাফ পাতায় অঙ্ক টুকে রাখা (Memoization)",
            subtitle: "একবার করা হিসাব মনে রেখে পরের বার সরাসরি মান বসানো",
            badge: "Dynamic Programming (DP)",
            visualTag: "Don't Repeat Yourself",
            accentColor: "violet",
            analogy:
              "ধরা যাক ৩ পাতার একটি বড় সমীকরণ করতে গিয়ে মাঝপথে '17 × 19' করতে হলো। স্মার্ট ছাত্র পাশে লিখে রাখে '= 323'। পরবর্তীতে সমীকরণের ৩য় পৃষ্ঠায় আবারও '17 × 19' আসলে সে গুণ না করে খাতার রাফ দেখে উত্তর ৩২৩ বসিয়ে দেয়!",
            whyItFits:
              "DP-র মূল কথা: যে সাব-প্রবলেম একবার সমাধান করেছ, তা মেমরিতে ক্যাশ করে রাখো যাতে দ্বিতীয়বার একই কাজ করতে না হয়।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-violet-300 py-1">
                <span className="px-1.5 py-0.5 rounded bg-violet-950 border border-violet-800">17 × 19 (হিসাব: 323)</span>
                <span>➔ Memoize ➔</span>
                <span className="px-2 py-0.5 rounded bg-violet-500 text-slate-950 font-bold">আবার 17 × 19? সরাসরি 323!</span>
              </div>
            ),
          },
        ]}
      />

      {/* 2. Dynamic Programming Interactive Sandbox */}
      {activeTab === 'dp' && (
        <div className="bg-[#0c0d15] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <Table className="w-4 h-4 text-amber-400" />
                DP Memoization Table: Fibonacci Sequence
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Naive recursion recomputes subproblems exponentially ($O(2^N)$). Dynamic Programming stores answers in an array ($O(N)$ linear time).
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#121422] p-1.5 rounded-lg border border-[#202438]">
              <span className="text-xs font-mono text-zinc-400">N:</span>
              <input
                type="number"
                min={2}
                max={12}
                value={fibN}
                onChange={e => setFibN(Math.min(12, Math.max(2, Number(e.target.value))))}
                className="w-12 bg-[#090a10] border border-[#23273d] text-xs font-mono text-amber-300 text-center rounded p-1"
              />
            </div>
          </div>

          {/* Memoization Table Visualizer */}
          <div className="p-5 rounded-xl bg-[#090a10] border border-[#1a1d2e] overflow-x-auto">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-3">
              Memoization Lookup Cache: dp[i] = dp[i-1] + dp[i-2]
            </span>

            <div className="flex items-center gap-2">
              {fibTable.map((val, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-zinc-500">n = {idx}</span>
                  <div className="w-14 h-12 rounded-lg bg-[#141726] border border-amber-500/40 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shadow">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090a10] border border-[#1a1c29] text-xs font-mono text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Fibonacci({fibN}) = {fibTable[fibN]}. Solved with zero redundant function calls!
            </span>
          </div>
        </div>
      )}

      {/* 3. Real World Paradigms Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-amber-400 font-mono uppercase">1. Greedy Approach</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Makes the locally optimal choice at each step without ever reconsidering.
          </p>
          <span className="text-[11px] font-mono text-zinc-500 block pt-1 border-t border-[#1c1f30]">
            Real world: Dijkstra’s shortest path, Huffman data compression, Kruskal’s minimum spanning tree.
          </span>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-sky-400 font-mono uppercase">2. Divide and Conquer</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Breaks problem into disjoint independent subproblems, recursively solves them, and combines outputs.
          </p>
          <span className="text-[11px] font-mono text-zinc-500 block pt-1 border-t border-[#1c1f30]">
            Real world: Merge Sort, Quick Sort, Strassen’s Matrix Multiplication.
          </span>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase">3. Dynamic Programming</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Breaks problem into overlapping subproblems and stores results in a table (memoization) so work is never repeated.
          </p>
          <span className="text-[11px] font-mono text-zinc-500 block pt-1 border-t border-[#1c1f30]">
            Real world: LLM KV-cache attention, Levenshtein string edit distance (spell check), RNA folding.
          </span>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-purple-400 font-mono uppercase">4. Backtracking</h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Systematically builds candidates, immediately abandoning (pruning) any candidate that violates problem constraints.
          </p>
          <span className="text-[11px] font-mono text-zinc-500 block pt-1 border-t border-[#1c1f30]">
            Real world: Sudoku solvers, N-Queens puzzle, AI chess game tree minimax pruning.
          </span>
        </div>
      </div>
    </div>
  );
}
