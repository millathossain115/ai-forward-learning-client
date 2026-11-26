'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson14Part1SecurityCia() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • সিকিউরিটি ও CIA Triad' : 'Part 1 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="What Is Database Security & The CIA Triad"
              bn="১. ডেটাবেস সিকিউরিটি ও CIA Triad"
            />
          </h2>
        </div>
      </div>

      <DualText
        as="p"
        className="text-xs text-zinc-300 leading-relaxed font-sans"
        en="Database security protects stored data from unauthorized disclosure, tampering, and service disruption using layered technical and administrative controls."
        bn="ডেটাবেস সিকিউরিটি বলতে অননুমোদিত প্রবেশ, ডেটা বিকৃতি এবং সিস্টেম ডাউনটাইম থেকে ডেটাবেসকে রক্ষা করার সমন্বিত ব্যবস্থাকে বোঝায়।"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-1.5">
          <span className="font-mono font-bold text-cyan-400 uppercase">Confidentiality</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Prevent unauthorized reads using RBAC, column/row masking, and TLS/AES encryption."
            bn="RBAC, ডেটা মাস্কিং ও এনক্রিপশন দিয়ে অননুমোদিত রিড বন্ধ করা।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-1.5">
          <span className="font-mono font-bold text-emerald-400 uppercase">Integrity</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Prevent unauthorized writes via constraints, checksums, and strict GRANT controls."
            bn="কনস্ট্রেইন্ট ও কঠোর GRANT নীতিমালার মাধ্যমে ডেটার শুদ্ধতা রক্ষা।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-1.5">
          <span className="font-mono font-bold text-amber-400 uppercase">Availability</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Ensure uptime under spikes or attacks via replication, rate limits, and tested backups."
            bn="রেপ্লিকেশন, রেট-লিমিটিং ও ব্যাকআপের মাধ্যমে সিস্টেম সর্বদা সচল রাখা।"
          />
        </div>
      </div>
    </section>
  );
}
