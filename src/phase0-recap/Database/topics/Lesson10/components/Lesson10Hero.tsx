'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson10Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-cyan-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১০ • ইনডেক্সিং ও অপটিমাইজেশন' : 'Lesson 10 of 18 • Indexing & Tuning'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'B+ Tree ও EXPLAIN' : 'B+ Tree & EXPLAIN'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 10: Indexing & Query Optimization"
            bn="লেসন ১০: ডেটাবেস ইনডেক্সিং ও কুয়েরি অপটিমাইজেশন"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="B+ Trees, Clustered vs Non-Clustered, Hash & EXPLAIN"
              bn="B+ Tree, Clustered বনাম Non-Clustered, Hash ও EXPLAIN"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Learn how databases turn slow O(N) full table scans into sub-millisecond O(log N) lookups: Clustered vs Non-Clustered, Dense vs Sparse, B+ Trees, Hash Indexes, SQL EXPLAIN plans, and 10 production tuning rules."
          bn="ডেটাবেস কীভাবে ধীরগতির O(N) ফুল টেবিল স্ক্যানকে সাব-মিলিসেকেন্ড O(log N) লুকআপে রূপান্তর করে তা শিখুন: Clustered বনাম Non-Clustered, Dense বনাম Sparse, B+ Tree, Hash Index, EXPLAIN প্ল্যান ও ১০টি অপটিমাইজেশন নিয়ম।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="Full Scan vs B+ Tree Lookup" bn="ফুল স্ক্যান বনাম B+ Tree" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="Clustered, Non-Clustered, Dense & Sparse" bn="Clustered, Dense ও Sparse" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="Hash Buckets & EXPLAIN Simulator" bn="Hash ও EXPLAIN সিমুলেটর" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="10 Tuning Rules & Interview Q&A" bn="১০টি নিয়ম ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
