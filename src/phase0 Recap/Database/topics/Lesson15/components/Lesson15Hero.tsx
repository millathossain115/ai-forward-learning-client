'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson15Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1228] via-[#121c42] to-[#070b1a] border border-cyan-900/40 p-6 md:p-10 shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১৫ • ডেটাবেস অ্যাডমিনিস্ট্রেশন (DBA)' : 'Lesson 15 of 18 • DBA Operations'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {language === 'bn' ? 'NOC, HA ও টিউনিং' : 'NOC, HA & Tuning'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 15: Database Administration & Management (DBA)"
            bn="লেসন ১৫: ডেটাবেস অ্যাডমিনিস্ট্রেশন ও ম্যানেজমেন্ট (DBA)"
          />
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-indigo-400 bg-clip-text text-transparent">
            <DualText
              as="span"
              en="Roles, NOC Monitoring, Performance Tuning & HA/DR"
              bn="DBA দায়িত্ব, NOC মনিটরিং, টিউনিং ও HA/DR"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Step into the shoes of a Production DBA: core responsibilities, DBA specializations, live NOC telemetry monitoring, query & buffer pool tuning, PITR backups, and High Availability failover architectures."
          bn="প্রোডাকশন DBA-এর বাস্তব কাজ শিখুন: মূল দায়িত্ব, DBA-এর ধরন, NOC টেলিমেট্রি মনিটরিং, পারফরম্যান্স টিউনিং, PITR ব্যাকআপ ও হাই-অ্যাভেইলেবিলিটি (HA) ফেইলওভার।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="8 DBA Roles & 4 Types" bn="৮টি দায়িত্ব ও ৪ ধরনের DBA" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="NOC Monitoring Center" bn="NOC মনিটরিং সেন্টার" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <DualText as="span" en="Performance & HA/DR" bn="পারফরম্যান্স ও HA/DR" />
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
