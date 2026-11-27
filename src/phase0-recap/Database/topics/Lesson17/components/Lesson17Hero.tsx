'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson17Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1228] via-[#121c42] to-[#070b1a] border border-purple-900/40 p-6 md:p-10 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১৭ • ডেটা ওয়্যারহাউজিং ও মাইনিং' : 'Lesson 17 of 18 • DW & Data Mining'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'ETL, OLAP ও KDD' : 'ETL, OLAP & KDD'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 17: Data Warehousing & Data Mining"
            bn="লেসন ১৭: ডেটা ওয়্যারহাউজিং ও ডেটা মাইনিং"
          />
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-purple-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            <DualText
              as="span"
              en="ETL Pipelines, OLTP vs OLAP, Star Schema & KDD"
              bn="ETL পাইপলাইন, OLTP বনাম OLAP, Star স্কিমা ও KDD"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Turn fragmented operational data silos into strategic business intelligence: Data Warehouse architecture, ETL vs ELT, OLTP vs OLAP, Star/Snowflake schemas, 5 Data Mining techniques, and the 8-step KDD process."
          bn="বিচ্ছিন্ন ডেটাকে ব্যবসায়িক সিদ্ধান্তে রূপান্তর করতে শিখুন: ডেটা ওয়্যারহাউস আর্কিটেকচার, ETL বনাম ELT, OLTP বনাম OLAP, Star স্কিমা, ৫টি ডেটা মাইনিং টেকনিক ও ৮-ধাপের KDD প্রক্রিয়া।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="Data Silos & ETL/ELT" bn="ডেটা সাইলো ও ETL/ELT" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="OLTP vs OLAP & Star Schema" bn="OLTP বনাম OLAP ও Star স্কিমা" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="5 Mining Techniques & KDD" bn="৫টি মাইনিং টেকনিক ও KDD" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="Practice Lab & Interview Q&A" bn="প্র্যাকটিস ল্যাব ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
