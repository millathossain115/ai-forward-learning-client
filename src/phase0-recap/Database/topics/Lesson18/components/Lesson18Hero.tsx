'use client';

import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson18Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-amber-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            {language === 'bn' ? 'ফেজ ১ • ফাইনাল ক্যাপস্টোন' : 'Phase 1 • Final Capstone'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১৮ • পূর্ণাঙ্গ DBMS রিভিশন' : 'Lesson 18 of 18 • Complete Revision'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 18: Complete DBMS Synthesis & Mastery"
            bn="লেসন ১৮: সম্পূর্ণ DBMS রিভিশন ও মাস্টারি"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="18-Lesson Blueprint, Comparisons & Final Interview Prep"
              bn="১৮টি লেসনের সারসংক্ষেপ, তুলনা ও ফাইনাল ইন্টারভিউ প্রস্তুতি"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Consolidate everything from Lessons 1 to 17 in one high-yield command center: ER Modeling, Keys, Normalization, SQL, ACID & 2PL, B+ Tree Indexing, NoSQL, Security, DBA Ops, DDBMS, and Data Warehousing."
          bn="লেসন ১ থেকে ১৭ পর্যন্ত সব গুরুত্বপূর্ণ বিষয় একসাথে রিভিশন করুন: ER মডেল, Keys, নরমালাইজেশন, SQL, ACID ও 2PL, B+ Tree ইনডেক্সিং, NoSQL, সিকিউরিটি, DBA ও DDBMS।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="18-Lesson Quick Navigator" bn="১৮টি লেসনের নেভিগেটর" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="Design & Systems Synthesis" bn="ডিজাইন ও সিস্টেমস রিভিশন" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="SQL Practical Lab" bn="SQL প্র্যাকটিক্যাল ল্যাব" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="Senior Interview Q&A" bn="ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
