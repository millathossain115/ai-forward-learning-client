'use client';

import React from 'react';
import { Scale, RefreshCw, Layers } from 'lucide-react';

export default function BalancedTreeHeader() {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#15171e] text-slate-950 flex items-center justify-center font-bold">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-100">ব্যালেন্সড ট্রি (Balanced Trees)</h2>
          <span className="text-xs font-mono text-sky-400 font-medium">
            Self-Balancing Binary Search Trees • উচ্চতার ভারসাম্য • O(log N) নিশ্চিত সময়
          </span>
        </div>
      </div>

      {/* What is a Balanced Tree & Why it matters */}
      <div className="space-y-3">
        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          <b>ব্যালেন্সড ট্রি (Balanced Tree)</b> হলো এমন এক ধরণের বাইনারি সার্চ ট্রি, যা স্বয়ংক্রিয়ভাবে
          প্রতিটি নোডের বাম ও ডান শাখার উচ্চতার ভারসাম্য বজায় রাখে। সাধারণ BST-তে ডেটা একাধারে ইনসার্ট
          করলে তা একপাশে হেলে গিয়ে লিংকড লিস্টের মতো বাঁকা ($O(N)$) হয়ে পড়ে। ব্যালেন্সড ট্রি{' '}
          <b>Rotations</b> বা কালারিং কৌশলে উচ্চতা সবসময় $\log N$-এর মধ্যে সীমাবদ্ধ রেখে $O(\log N)$
          নিশ্চিত পারফরম্যান্স বজায় রাখে।
        </p>
      </div>

      {/* Visual Diagram: Unbalanced vs Balanced Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#090a10] border border-[#1b1f2e] p-4 rounded-xl">
        {/* Left: Unbalanced Skewed Tree */}
        <div className="flex-1 w-full flex flex-col items-center bg-[#130d12]/70 border border-rose-950/60 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            সাধারণ BST: আন-ব্যালেন্সড (Skewed Degraded)
          </div>
          <svg viewBox="0 0 200 90" className="w-48 h-20 select-none">
            <line x1="40" y1="20" x2="80" y2="40" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="80" y1="40" x2="120" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="120" y1="60" x2="160" y2="80" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="40" cy="20" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="40" y="24" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">10</text>
            <circle cx="80" cy="40" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="80" y="44" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">20</text>
            <circle cx="120" cy="60" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="120" y="64" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>
            <circle cx="160" cy="80" r="11" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="160" y="84" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold" fontFamily="monospace">40</text>
          </svg>
          <span className="text-[11px] font-mono text-rose-300 mt-1">
            উচ্চতা = N • সার্চ টাইম খারাপ: <strong className="text-rose-400">O(N)</strong>
          </span>
        </div>

        {/* Center: Balance Transformation Arrow */}
        <div className="flex flex-col items-center justify-center text-zinc-500 font-mono text-xs">
          <span className="text-sky-400 font-bold mb-1">Self-Balancing</span>
          <div className="w-10 h-10 rounded-full bg-[#151928] border border-[#232b45] flex items-center justify-center text-sky-400">
            <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <span className="text-[10px] text-zinc-400 mt-1">Rotations</span>
        </div>

        {/* Right: Balanced Tree */}
        <div className="flex-1 w-full flex flex-col items-center bg-[#11131f]/70 border border-sky-950/60 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            ব্যালেন্সড ট্রি: সুষম শাখা (Optimal Balanced)
          </div>
          <svg viewBox="0 0 200 90" className="w-48 h-20 select-none">
            <line x1="100" y1="20" x2="50" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="100" y1="20" x2="150" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="150" y1="55" x2="175" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="50" y1="55" x2="25" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="100" cy="20" r="12" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="24" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">20</text>
            <circle cx="50" cy="55" r="11" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="50" y="59" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">10</text>
            <circle cx="150" cy="55" r="11" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="150" y="59" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">30</text>
            <circle cx="25" cy="80" r="9" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="25" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">5</text>
            <circle cx="175" cy="80" r="9" fill="#0c1b30" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="175" y="83" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold" fontFamily="monospace">40</text>
          </svg>
          <span className="text-[11px] font-mono text-sky-300 mt-1">
            উচ্চতা = log N • সার্চ টাইম দ্রুততম: <strong className="text-sky-400">O(log N)</strong>
          </span>
        </div>
      </div>

      {/* 2 Popular Types Note */}
      <div className="bg-[#141624]/60 border border-[#202538] rounded-xl p-3.5 flex items-start gap-3">
        <Layers className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-300 leading-relaxed">
          ব্যালেন্সড ট্রির মধ্যে বহুল ব্যবহৃত ও জনপ্রিয় দুটি রূপ হলো:{' '}
          <strong className="text-sky-300">১. AVL Tree</strong> (কড়াকড়ি উচ্চতা বজায় রাখে) এবং{' '}
          <strong className="text-rose-300">২. Red-Black Tree</strong> (কালার রুলস দিয়ে কম রোটেশনে দ্রুত কাজ
          করে)। নিচের সিমুলেশন ফিল্টারে এই দুটি ট্রি আলাদাভাবে নির্বাচন করে পর্যবেক্ষণ করতে পারেন।
        </p>
      </div>
    </div>
  );
}
