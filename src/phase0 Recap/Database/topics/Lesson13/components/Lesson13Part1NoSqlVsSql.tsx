'use client';

import React from 'react';
import { Boxes } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson13Part1NoSqlVsSql() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Boxes className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • NoSQL পরিচিতি ও SQL তুলনা' : 'Part 1 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="What is NoSQL (Not Only SQL) & SQL vs. NoSQL"
              bn="১. NoSQL (Not Only SQL) কী এবং SQL বনাম NoSQL তুলনা"
            />
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2 text-xs">
        <DualText
          as="p"
          className="text-zinc-300 font-sans leading-relaxed"
          en={<><strong className="text-white">NoSQL (&ldquo;Not Only SQL&rdquo;)</strong> refers to non-relational database systems designed for flexible schemas, massive horizontal scaling across commodity servers, and high-throughput workloads.</>}
          bn={<><strong className="text-white">NoSQL (&ldquo;Not Only SQL&rdquo;)</strong> হলো নন-রিলেশনাল ডেটাবেস সিস্টেম যা ফ্লেক্সিবল স্কিমা, হরাইজন্টাল স্কেলিং এবং উচ্চ-থ্রুপুট ডেটা প্রসেসিংয়ের জন্য তৈরি।</>}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Feature</th>
              <th className="py-2.5 px-3 text-cyan-300">SQL (Relational)</th>
              <th className="py-2.5 px-3 text-emerald-300">NoSQL (Non-Relational)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans text-zinc-300">
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Data Model</td>
              <td className="py-2 px-3">Fixed Tables (Rows &amp; Columns)</td>
              <td className="py-2 px-3">Documents, Key-Value, Columnar, Graph</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Schema</td>
              <td className="py-2 px-3">Schema-on-Write (Strict)</td>
              <td className="py-2 px-3">Schema-on-Read (Dynamic/Flexible)</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Scaling</td>
              <td className="py-2 px-3">Primarily Vertical (Scale-Up)</td>
              <td className="py-2 px-3">Built for Horizontal (Scale-Out / Sharding)</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Consistency</td>
              <td className="py-2 px-3 text-cyan-300 font-mono">ACID (Strong)</td>
              <td className="py-2 px-3 text-emerald-300 font-mono">BASE (Eventual / Tunable)</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-white">Best For</td>
              <td className="py-2 px-3">Banking, ERP, Complex Joins</td>
              <td className="py-2 px-3">Caching, Social Feeds, IoT, Catalogs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
