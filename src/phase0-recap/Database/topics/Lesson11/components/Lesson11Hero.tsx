'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson11Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-emerald-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'লেসন ১১ • সিকিউরিটি, ব্যাকআপ ও রিকভারি' : 'Lesson 11 of 18 • Security & Recovery'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {language === 'bn' ? 'RBAC, SQLi ও PITR' : 'RBAC, SQLi & PITR'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 11: Security, Backup & Recovery"
            bn="লেসন ১১: ডেটাবেস সিকিউরিটি, ব্যাকআপ ও রিকভারি"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="CIA Triad, RBAC, SQL Injection, PITR & 3-2-1 Rule"
              bn="CIA Triad, RBAC, SQL Injection, PITR ও 3-2-1 নিয়ম"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Protect production databases from breaches and catastrophic outages: CIA Triad, Authentication vs Authorization, RBAC GRANT/REVOKE, SQL Injection defense, Full/Incremental/Differential backups, WAL PITR, and RPO/RTO planning."
          bn="ডেটাবেসকে হ্যাকিং ও সার্ভার ক্র্যাশ থেকে রক্ষা করতে শিখুন: CIA Triad, Authentication বনাম Authorization, RBAC GRANT/REVOKE, SQL Injection প্রতিরোধ, ব্যাকআপের ধরন, PITR ও RPO/RTO।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="CIA Triad & RBAC" bn="CIA Triad ও RBAC" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-rose-400" />
            <DualText as="span" en="SQL Injection Lab" bn="SQL Injection ল্যাব" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="Backups, PITR & 3-2-1" bn="ব্যাকআপ, PITR ও 3-2-1" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="RPO/RTO & Interview Q&A" bn="RPO/RTO ও ইন্টারভিউ প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
