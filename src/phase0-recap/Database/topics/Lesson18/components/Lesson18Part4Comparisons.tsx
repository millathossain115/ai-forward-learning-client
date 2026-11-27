'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const COMPARISONS = [
  { pair: 'Primary Key vs Unique Key', left: '1 per table, NEVER NULL', right: 'Multiple allowed, allows NULL' },
  { pair: 'DELETE vs TRUNCATE vs DROP', left: 'DELETE: DML row-by-row (rollbackable)', right: 'TRUNCATE: DDL resets table • DROP: removes schema' },
  { pair: 'WHERE vs HAVING', left: 'WHERE filters raw rows before GROUP BY', right: 'HAVING filters groups after aggregation' },
  { pair: '3NF vs BCNF', left: '3NF: No transitive FDs', right: 'BCNF: Every determinant MUST be a superkey' },
  { pair: 'Clustered vs Non-Clustered', left: 'Clustered: physical row order (1/table)', right: 'Non-Clustered: separate pointer tree (many)' },
  { pair: 'OLTP vs OLAP', left: 'OLTP: fast 3NF daily transactions', right: 'OLAP: Star-Schema multi-year analytics' },
  { pair: 'RPO vs RTO', left: 'RPO: max acceptable data loss (time)', right: 'RTO: max acceptable recovery downtime' },
];

export default function Lesson18Part4Comparisons() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • গুরুত্বপূর্ণ তুলনামূলক ছক' : 'Part 4 of 6 • Rapid Comparisons'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="High-Yield DBMS Comparison Matrix"
              bn="৪. হাই-ইল্ড DBMS তুলনামূলক ম্যাট্রিক্স"
            />
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Concept Pair</th>
              <th className="py-2.5 px-3 text-cyan-300">Left Side</th>
              <th className="py-2.5 px-3 text-emerald-300">Right Side</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans text-zinc-300">
            {COMPARISONS.map((c) => (
              <tr key={c.pair} className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono font-bold text-white">{c.pair}</td>
                <td className="py-2 px-3">{c.left}</td>
                <td className="py-2 px-3">{c.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
