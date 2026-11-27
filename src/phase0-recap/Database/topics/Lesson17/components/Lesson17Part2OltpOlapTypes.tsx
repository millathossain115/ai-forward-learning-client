'use client';

import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson17Part2OltpOlapTypes() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • OLTP বনাম OLAP ও ওয়্যারহাউস ধরন' : 'Part 2 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="OLTP vs. OLAP & 3 Types of Data Warehouses"
              bn="২. OLTP বনাম OLAP এবং ৩ ধরনের ডেটা ওয়্যারহাউস"
            />
          </h2>
        </div>
      </div>

      {/* OLTP vs OLAP */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">Feature</th>
              <th className="py-2.5 px-3 text-cyan-300">OLTP (Operational)</th>
              <th className="py-2.5 px-3 text-purple-300">OLAP (Analytical)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans text-zinc-300">
            <tr><td className="py-2 px-3 font-semibold text-white">Purpose</td><td className="py-2 px-3">Run daily business transactions</td><td className="py-2 px-3">BI reporting, trends &amp; forecasting</td></tr>
            <tr><td className="py-2 px-3 font-semibold text-white">Schema</td><td className="py-2 px-3">Normalized (3NF)</td><td className="py-2 px-3">Denormalized (Star / Snowflake)</td></tr>
            <tr><td className="py-2 px-3 font-semibold text-white">Queries</td><td className="py-2 px-3">Short, fast CRUD (ms)</td><td className="py-2 px-3">Complex aggregations over millions of rows</td></tr>
            <tr><td className="py-2 px-3 font-semibold text-white">Examples</td><td className="py-2 px-3 font-mono">PostgreSQL, MySQL</td><td className="py-2 px-3 font-mono">Snowflake, BigQuery, Redshift</td></tr>
          </tbody>
        </table>
      </div>

      {/* 3 Types of DW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1">
          <span className="font-mono font-bold text-cyan-300">1. Enterprise Data Warehouse (EDW)</span>
          <DualText as="p" className="text-zinc-300 font-sans" en="Centralized warehouse integrating data across the entire organization." bn="পুরো প্রতিষ্ঠানের সব বিভাগের ডেটা একত্রিত করা কেন্দ্রীয় ওয়্যারহাউস।" />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1">
          <span className="font-mono font-bold text-emerald-300">2. Operational Data Store (ODS)</span>
          <DualText as="p" className="text-zinc-300 font-sans" en="Near-real-time staging layer refreshed frequently for daily operational reporting." bn="দৈনন্দিন রিয়েল-টাইম রিপোর্টিংয়ের জন্য ব্যবহৃত অন্তর্বর্তী স্তর।" />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-purple-500/30 space-y-1">
          <span className="font-mono font-bold text-purple-300">3. Data Mart</span>
          <DualText as="p" className="text-zinc-300 font-sans" en="Focused subset of a DW built for one department (e.g., Finance Mart, Sales Mart)." bn="নির্দিষ্ট একটি ডিপার্টমেন্টের (যেমন Sales বা Finance) জন্য তৈরি ছোট ওয়্যারহাউস।" />
        </div>
      </div>
    </section>
  );
}
