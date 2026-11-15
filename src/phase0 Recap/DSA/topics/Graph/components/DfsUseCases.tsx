'use client';

import React from 'react';
import { Cpu, Boxes, ShieldAlert, FileCode2, GitBranch, Sparkles } from 'lucide-react';

export default function DfsUseCases() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>কম্পিউটার সায়েন্সে DFS-এর ৪টি প্রধান ব্যবহার</span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
              CS Computing
            </span>
          </h2>
          <p className="text-[11px] text-zinc-400">
            বাস্তব সিস্টেম আর্কিটেকচারে যেসকল কাজের জন্য DFS আবশ্যক
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Card 1: Build Systems */}
        <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-indigo-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5 text-indigo-400" />
              ১. প্যাকেজ বিল্ড ও মডিউল বান্ডলার
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-semibold">
              Topological Sort
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-indigo-400 font-bold">•</span>
              <span><b>Webpack / Vite / NPM:</b> ডিপেনডেন্সি ট্রি বিশ্লেষণ করে কম্পাইলেশন অর্ডার ঠিক করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-indigo-400 font-bold">•</span>
              <span><b>কারণ:</b> লিফ ডিপেনডেন্সি আগে সমাধান করে নিরাপদ এক্সিকিউশন নিশ্চিত করে।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101428] text-indigo-300 border border-indigo-900/60">npm install</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101428] text-indigo-300 border border-indigo-900/60">DAG Order</span>
          </div>
        </div>

        {/* Card 2: Deadlock Detection */}
        <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-rose-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              ২. ওএস ডেডলক ও সাইকেল ডিটেকশন
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-semibold">
              Cycle Detection
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-rose-400 font-bold">•</span>
              <span><b>OS ও ডেটাবেজ (Postgres/MySQL):</b> লক ট্রানজ্যাকশন গ্রাফে সাইকেল খোঁজে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-rose-400 font-bold">•</span>
              <span><b>কারণ:</b> কল স্ট্যাকে ব্যাক-এজ (Back-Edge) পেলেই দ্রুত ডেডলক রোলব্যাক করা যায়।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1015] text-rose-300 border border-rose-900/60">Wait-For Graph</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f1015] text-rose-300 border border-rose-900/60">Auto Rollback</span>
          </div>
        </div>

        {/* Card 3: AST & Tree-shaking */}
        <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-emerald-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
              ৩. কম্পাইলার AST ও ট্রি-শেকিং
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
              Dead Code Pruning
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>Babel / SWC / TypeScript:</b> কোড পার্স করে অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি তৈরি করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold">•</span>
              <span><b>কারণ:</b> রুট থেকে আনরিচেবল ফাংশনগুলো ডেড কোড হিসেবে ছাঁটাই (Tree-shaking) করে।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091a14] text-emerald-300 border border-emerald-900/60">Tree-Shaking</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#091a14] text-emerald-300 border border-emerald-900/60">Minify Bundle</span>
          </div>
        </div>

        {/* Card 4: Backtracking & Game AI */}
        <div className="p-3.5 rounded-xl bg-[#0a0c16] border border-[#1f2640] hover:border-amber-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-amber-400" />
              ৪. ব্যাকট্র্যাকিং ও গেম এআই
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-semibold">
              State Tree Search
            </span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><b>দাবা / সুডোকু / Minimax AI:</b> সম্ভাব্য সব মুভ গভীরে গিয়ে মূল্যায়ন করে।</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-400 font-bold">•</span>
              <span><b>কারণ:</b> মেমরি খরচ ন্যূনতম (O(Depth)) এবং ভুল পথে গেলে সহজে ব্যাকট্র্যাক করে।</span>
            </li>
          </ul>
          <div className="flex gap-1.5 pt-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c160a] text-amber-300 border border-amber-900/60">Alpha-Beta Pruning</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c160a] text-amber-300 border border-amber-900/60">O(Depth) Space</span>
          </div>
        </div>
      </div>

      {/* Compact Rule */}
      <div className="p-3 rounded-xl bg-[#0c0e1a] border border-[#232948] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span><b>কখন DFS:</b> মেমরি সীমাবদ্ধ, গভীর সলিউশন খোঁজা, সাইকেল নির্ণয় ও ডিপেনডেন্সি বিল্ড।</span>
        </div>
        <span className="font-mono text-[10px] text-indigo-300 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 shrink-0">
          Space: O(Depth)
        </span>
      </div>
    </div>
  );
}
