'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson14Hero() {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-rose-900/40 p-6 md:p-10">

      <div className="relative z-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {language === 'bn' ? 'লেসন ১৪ • সিকিউরিটি ও অথোরাইজেশন' : 'Lesson 14 of 18 • Security & Auth'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {language === 'bn' ? 'DAC, MAC, RBAC ও এনক্রিপশন' : 'DAC, MAC, RBAC & Encryption'}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <DualText
            as="span"
            en="Lesson 14: Database Security & Authorization"
            bn="লেসন ১৪: ডেটাবেস সিকিউরিটি ও অথোরাইজেশন"
          />
          <br className="hidden md:block" />
          <span className="bg-[#15171e] text-[#f4f4f7]">
            <DualText
              as="span"
              en="CIA, Access Control (DAC/MAC/RBAC), PoLP & Auditing"
              bn="CIA, অ্যাক্সেস কন্ট্রোল (DAC/MAC/RBAC), PoLP ও অডিটিং"
            />
          </span>
        </h1>

        <DualText
          as="p"
          className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans"
          en="Build defense-in-depth database architectures: CIA Triad, Authentication vs Authorization, DAC/MAC/RBAC models, GRANT/REVOKE with CASCADE, Principle of Least Privilege, SQL Injection defense, AES-256/TLS encryption, and forensic auditing."
          bn="বহু-স্তরের ডেটাবেস সিকিউরিটি শিখুন: CIA Triad, Authentication বনাম Authorization, DAC/MAC/RBAC, GRANT/REVOKE CASCADE, Least Privilege, SQLi প্রতিরোধ, এনক্রিপশন ও অডিটিং।"
        />

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-rose-400" />
            <DualText as="span" en="CIA Triad & AuthN/AuthZ" bn="CIA Triad ও AuthN/AuthZ" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <DualText as="span" en="DAC vs MAC vs RBAC" bn="DAC বনাম MAC বনাম RBAC" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <DualText as="span" en="GRANT, PoLP & SQLi Defense" bn="GRANT, PoLP ও SQLi প্রতিরোধ" />
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <DualText as="span" en="Encryption, Auditing & Q&A" bn="এনক্রিপশন, অডিটিং ও প্রশ্নোত্তর" />
          </div>
        </div>
      </div>
    </div>
  );
}
