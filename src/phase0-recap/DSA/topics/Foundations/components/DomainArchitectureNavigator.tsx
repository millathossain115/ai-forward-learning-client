'use client';

import React, { useState } from 'react';
import { Scale, ArrowRight } from 'lucide-react';
import { DOMAINS } from '../types';

export default function DomainArchitectureNavigator() {
  const [activeDomain, setActiveDomain] = useState<string>('direct-access');
  const selectedDomainData = DOMAINS.find((d) => d.id === activeDomain) || DOMAINS[0];

  return (
    <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1b1f33] pb-4">
        <div className="space-y-1">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            <span>ব্যবহারিক প্রয়োগ: কোন প্রয়োজনে কোন ডেটা স্ট্রাকচার?</span>
          </h2>
          <p className="text-xs text-zinc-400">
            বাস্তব কাজের ৪টি প্রধান ক্ষেত্র নির্বাচন করে ডেটা স্ট্রাকচারের সুবিধা ও সীমাবদ্ধতা সরাসরি দেখুন।
          </p>
        </div>
      </div>

      {/* 4 Domain Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          const isSelected = domain.id === activeDomain;

          return (
            <button
              key={domain.id}
              onClick={() => setActiveDomain(domain.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#181d33] border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-[#101322] border-[#1c2238] hover:bg-[#141829] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-[#15192b] text-zinc-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">ক্ষেত্র</span>
              </div>

              <div>
                <h4 className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  {domain.title}
                </h4>
                <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{domain.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Domain Visual Comparison */}
      <div className="bg-[#090b14] border border-[#1d2238] rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Diagram */}
        <div className="lg:col-span-5 bg-[#0e101c] border border-[#232a45] rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
            তুলনামূলক চিত্র (Visual Preview)
          </span>

          {/* Dynamic illustration */}
          {selectedDomainData.visualType === 'grid' && (
            <div className="space-y-4 w-full">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-amber-400">Array: মেমরিতে একটানা ব্লক</div>
                <div className="grid grid-cols-4 gap-1">
                  {['[0] 10', '[1] 20', '[2] 30', '[3] 40'].map((val, i) => (
                    <div
                      key={i}
                      className="p-2 rounded bg-[#161a2e] border border-amber-500/30 text-center text-xs font-mono font-bold text-zinc-100"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-mono text-sky-400">Hash Table: কী ➔ হ্যাশ করে বাকেটে রাখা</div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-[#161a2e] border border-sky-500/30 text-zinc-200">
                    &quot;user_99&quot;
                  </span>
                  <span className="text-zinc-500">➔ hash%4 ➔</span>
                  <span className="px-2 py-1 rounded bg-sky-500/20 border border-sky-400 text-sky-300 font-bold">
                    বাকেট #3
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedDomainData.visualType === 'pipeline' && (
            <div className="space-y-4 w-full">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-amber-400">Stack (LIFO): ওপরে ইন ➔ ওপর থেকেই আউট</div>
                <div className="flex flex-col-reverse gap-1 max-w-[160px] mx-auto">
                  {['ফ্রেম ১ (নিচে)', 'ফ্রেম ২ (মাঝে)', 'ফ্রেম ৩ (ওপরে ➔ Pop)'].map((frame, i) => (
                    <div
                      key={i}
                      className="py-1 px-2 rounded bg-[#161a2e] border border-amber-500/30 text-center text-xs font-mono font-bold text-zinc-200"
                    >
                      {frame}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-mono text-emerald-400">Queue (FIFO): পেছনে ইন ➔ সামনে আউট</div>
                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  <span className="text-[10px] text-zinc-500 font-mono">ইন ➔</span>
                  {['টাস্ক ৩', 'টাস্ক ২', 'টাস্ক ১'].map((t, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded bg-[#161a2e] border border-emerald-500/30 text-xs font-mono text-zinc-200 shrink-0"
                    >
                      {t}
                    </div>
                  ))}
                  <span className="text-[10px] text-zinc-500 font-mono">➔ আউট</span>
                </div>
              </div>
            </div>
          )}

          {selectedDomainData.visualType === 'tree' && (
            <div className="space-y-4 w-full text-center">
              <div className="text-[10px] font-mono text-sky-400">ব্যালেন্সড ট্রি ও হিপের কাঠামো</div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                  50
                </div>
                <div className="flex gap-8">
                  <div className="w-8 h-8 rounded-full bg-[#181d33] border border-sky-400/50 flex items-center justify-center font-mono text-xs text-zinc-200">
                    25
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#181d33] border border-sky-400/50 flex items-center justify-center font-mono text-xs text-zinc-200">
                    75
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Left &lt; Root &lt; Right নিয়ম মেনে O(log N) নিশ্চিত করে
              </div>
            </div>
          )}

          {selectedDomainData.visualType === 'trie_graph' && (
            <div className="space-y-3 w-full text-center">
              <div className="text-[10px] font-mono text-purple-400">প্রিফিক্স ট্রি ও নেটওয়ার্ক গ্রাফ</div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-[#181d33] text-zinc-200 border border-zinc-700">R</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-[#181d33] text-zinc-200 border border-zinc-700">C</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500">A</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500">
                  R (car)
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                শব্দের দৈর্ঘ্যের (L) ওপর নির্ভর করে O(L) গতিতে সার্চ
              </div>
            </div>
          )}
        </div>

        {/* Right Explanations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
              প্রথম পছন্দ: {selectedDomainData.primaryDS}
            </span>
            <span className="text-xs text-zinc-500 font-mono">বনাম</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
              বিকল্প: {selectedDomainData.secondaryDS}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-zinc-300">
              <b className="text-white block mb-0.5">কখন এটি ব্যবহার করবেন:</b>
              {selectedDomainData.bestFor}
            </div>

            <div className="text-xs text-zinc-400">
              <b className="text-amber-400 block mb-0.5">সীমাবদ্ধতা বা ট্রেড-অফ:</b>
              {selectedDomainData.tradeoff}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1a1f33] flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>টপিকের ইন্টারঅ্যাক্টিভ সিমুলেশনের জন্য সাইডবার থেকে সিলেক্ট করুন</span>
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              Explore Modules <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
