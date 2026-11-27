'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson11Part1SecurityCia() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • CIA Triad' : 'Part 1 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Database Security & The CIA Triad"
              bn="১. ডেটাবেস সিকিউরিটি ও CIA Triad"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-2">
          <span className="font-mono font-bold text-cyan-400 uppercase">1. Confidentiality</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Only authorized users can view sensitive records. Example: Students see only their own grades; peers' scores remain sealed."
            bn="শুধু অনুমোদিত ব্যবহারকারী ডেটা দেখতে পারবে। উদাহরণ: শিক্ষার্থীরা কেবল নিজেদের গ্রেড দেখবে, অন্যদের নয়।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-2">
          <span className="font-mono font-bold text-emerald-400 uppercase">2. Integrity</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Data cannot be altered by unauthorized actors. Example: Only assigned instructors can update EXAM_MARKS."
            bn="অননুমোদিত কেউ ডেটা পরিবর্তন করতে পারবে না। উদাহরণ: শুধু শিক্ষক EXAM_MARKS আপডেট করতে পারবেন।"
          />
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-2">
          <span className="font-mono font-bold text-amber-400 uppercase">3. Availability</span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Database stays accessible under heavy load or failure. Example: Result portal handles 50,000 concurrent logins smoothly."
            bn="উচ্চ লোড বা ত্রুটিতেও ডেটাবেস সচল থাকবে। উদাহরণ: রেজাল্টের দিন ৫০ হাজার লগইনেও পোর্টাল সচল থাকা।"
          />
        </div>
      </div>
    </section>
  );
}
