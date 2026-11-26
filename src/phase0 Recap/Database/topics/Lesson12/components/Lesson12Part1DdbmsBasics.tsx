'use client';

import React from 'react';
import { Globe, Network } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson12Part1DdbmsBasics() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Network className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • ডিস্ট্রিবিউটেড ডেটাবেস পরিচিতি' : 'Part 1 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="What is a Distributed Database (DDBMS) & Centralized Comparison"
              bn="১. ডিস্ট্রিবিউটেড ডেটাবেস (DDBMS) ও সেন্ট্রালাইজড তুলনা"
            />
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2 text-xs">
        <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
          <Globe className="w-4 h-4" /> Core Definition
        </span>
        <DualText
          as="p"
          className="text-zinc-300 font-sans leading-relaxed"
          en="A Distributed Database (DDB) is a collection of logically interrelated databases spread across multiple physical network nodes, managed by a DDBMS so they appear to users as a single unified system."
          bn="ডিস্ট্রিবিউটেড ডেটাবেস (DDB) হলো নেটওয়ার্কের মাধ্যমে যুক্ত একাধিক ফিজিক্যাল সার্ভারে ছড়িয়ে থাকা একটি যৌক্তিকভাবে সম্পর্কিত ডেটাবেস, যা ব্যবহারকারীর কাছে একটি একক সিস্টেম হিসেবে কাজ করে।"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Dimension</th>
              <th className="py-2.5 px-3 text-amber-300">Centralized DB</th>
              <th className="py-2.5 px-3 text-cyan-300">Distributed DB (DDBMS)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans text-zinc-300">
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Physical Location</td>
              <td className="py-2 px-3">Single server / datacenter</td>
              <td className="py-2 px-3">Multiple networked sites/regions</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Fault Tolerance</td>
              <td className="py-2 px-3 text-rose-400">Single Point of Failure (SPOF)</td>
              <td className="py-2 px-3 text-emerald-400">High availability if one node fails</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Scalability</td>
              <td className="py-2 px-3">Vertical (expensive hardware limits)</td>
              <td className="py-2 px-3">Horizontal (add commodity nodes)</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Complexity</td>
              <td className="py-2 px-3 text-emerald-400">Simple ACID &amp; joins</td>
              <td className="py-2 px-3 text-amber-300">Network latency, 2PC &amp; CAP trade-offs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
