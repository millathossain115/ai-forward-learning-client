'use client';

import React, { useState } from 'react';
import { Gauge } from 'lucide-react';
import { COMPLEXITY_DATA } from '../types';

export default function ComplexityDashboard() {
  const [selectedOp, setSelectedOp] = useState<'search' | 'insert' | 'delete' | 'space'>('search');

  return (
    <div className="bg-[#0e101c] border border-[#1f2438] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1b1f33] pb-4">
        <div className="space-y-1">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-emerald-400" />
            <span>দক্ষতা ও মেমরি জটিলতা বিশ্লেষণ (Time &amp; Memory Complexity)</span>
          </h2>
          <p className="text-xs text-zinc-400">
            বিভিন্ন অপারেশনে সিস্টেমের সময় (Time) এবং RAM মেমরি ব্যবহারের (Memory/Space) সরাসরি তুলনা।
          </p>
        </div>

        {/* Operation Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090b14] border border-[#1d2238]">
          {(
            [
              { id: 'search', label: 'Search (খোঁজা)' },
              { id: 'insert', label: 'Insert (যোগ)' },
              { id: 'delete', label: 'Delete (মুছে ফেলা)' },
              { id: 'space', label: 'Memory (মেমরি খরচ)' },
            ] as const
          ).map((op) => (
            <button
              key={op.id}
              onClick={() => setSelectedOp(op.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedOp === op.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#131627]'
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Efficiency Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COMPLEXITY_DATA.map((item, idx) => {
          const currentMetric =
            selectedOp === 'search'
              ? item.search
              : selectedOp === 'insert'
              ? item.insert
              : selectedOp === 'delete'
              ? item.delete
              : item.space;

          const isBest = currentMetric.cost === 1;
          const isMedium = currentMetric.cost === 2;

          return (
            <div
              key={idx}
              className="bg-[#111425] border border-[#1e243d] rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-[#2d365a] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-500 block">{item.category}</span>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                      isBest
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                        : isMedium
                        ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300'
                        : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {currentMetric.val}
                  </span>
                </div>

                {/* Visual Cost Meter Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span>কাজের গতি ও খরচ</span>
                    <span>
                      {isBest ? '⚡ সর্বোচ্চ দ্রুত (O(1))' : isMedium ? '⚖ মাঝারি (O(log N))' : '⏳ ধীর (O(N))'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0a0c16] overflow-hidden p-0.5 border border-[#1b2036]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isBest ? 'w-1/4 bg-emerald-400' : isMedium ? 'w-1/2 bg-sky-400' : 'w-4/5 bg-amber-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Operation Description */}
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{currentMetric.desc}</p>
              </div>

              {/* Hardware Cache Locality */}
              <div className="pt-3 border-t border-[#1a1f36] flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500">মেমরি ক্যাশ এক্সেস:</span>
                <span
                  className={`font-semibold ${
                    item.cacheLocality === 'উচ্চ (High)'
                      ? 'text-emerald-400'
                      : item.cacheLocality === 'মাঝারি (Medium)'
                      ? 'text-sky-400'
                      : 'text-amber-400'
                  }`}
                >
                  {item.cacheLocality}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
