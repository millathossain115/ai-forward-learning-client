'use client';

import React from 'react';
import { Globe, Network } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson16Part1DdbmsCompare() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Network className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • ডিস্ট্রিবিউটেড ধারণা ও তুলনা' : 'Part 1 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="What Does 'Distributed' Mean? Centralized vs. Distributed DB"
              bn="১. ডিস্ট্রিবিউটেড ডেটাবেস কী ও সেন্ট্রালাইজডের সাথে তুলনা"
            />
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2 text-xs">
        <span className="font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
          <Globe className="w-4 h-4" /> DDBMS Definition
        </span>
        <DualText
          as="p"
          className="text-zinc-300 font-sans leading-relaxed"
          en="A Distributed Database Management System (DDBMS) manages logically unified data physically spread across networked sites—providing location independence, local autonomy, and fault tolerance."
          bn="DDBMS নেটওয়ার্কে ছড়িয়ে থাকা একাধিক ডেটাবেসকে ব্যবহারকারীর কাছে একটি একক ও সমন্বিত ডেটাবেস হিসেবে পরিচালনা করে।"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Criteria</th>
              <th className="py-2.5 px-3 text-amber-300">Centralized DB</th>
              <th className="py-2.5 px-3 text-cyan-300">Distributed DB (DDBMS)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans text-zinc-300">
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Storage</td>
              <td className="py-2 px-3">Single site / machine</td>
              <td className="py-2 px-3">Multiple networked sites</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Reliability</td>
              <td className="py-2 px-3 text-rose-400">Single Point of Failure</td>
              <td className="py-2 px-3 text-emerald-400">Resilient via replication &amp; failover</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Query Speed</td>
              <td className="py-2 px-3">High latency for distant users</td>
              <td className="py-2 px-3">Low latency via local shard access</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Cost &amp; Ops</td>
              <td className="py-2 px-3 text-emerald-400">Simple administration</td>
              <td className="py-2 px-3 text-amber-300">Complex 2PC, CAP &amp; network sync</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
