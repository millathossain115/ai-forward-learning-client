'use client';

import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson3HeroProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson3Hero({ onNavigate }: Lesson3HeroProps) {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-[#202744] p-6 md:p-8">

      {/* Top Banner Actions: Lesson Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn'
              ? 'লেসন ৩ • রিলেশনাল ডেটাবেস ভিত্তি'
              : language === 'en'
              ? 'Lesson 3 • Relational Model Foundation'
              : 'Lesson 3 • Relational Model Foundation (রিলেশনাল মডেলের ভিত্তি)'}
          </span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            {language === 'bn' ? 'মৌলিক ডেটাবেস কোর্স' : 'Beginner Level DBMS'}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            <DualText
              en="Lesson 3: Introduction to Relational Databases"
              bn="লেসন ৩: রিলেশনাল ডেটাবেসের মৌলিক পরিচিতি ও গাণিতিক টার্মিনোলজি"
            />
          </h1>

          <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Welcome to Lesson 3! Today, we dive into the core foundation of modern database engineering: The Relational Database Model. By the end of this lesson, you will master the fundamental concepts: Relations, Tuples, Attributes, Domains, Schemas, Instances, Degree, Cardinality, and NULL values."
              bn="লেসন ৩-এ স্বাগতম! আজ আমরা আধুনিক ডেটাবেস সফটওয়্যারের সবচেয়ে গুরুত্বপূর্ণ ভিত্তি রিলেশনাল ডেটাবেস মডেল বিস্তারিত শিখব। এই পাঠ শেষে আপনি রিলেশন, টাপল, অ্যাট্রিবিউট, ডোমেইন, স্কিমা, ইনস্ট্যান্স, ডিগ্রি, কার্ডিনালিটি এবং NULL-এর মতো মৌলিক গাণিতিক টার্মগুলো সম্পূর্ণ আত্মস্থ করতে পারবেন।"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onNavigate?.('db-lesson4')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            <span>
              {language === 'bn' ? 'পরবর্তী: লেসন ৪ (কি ও কনস্ট্রেইন্ট)' : 'Next: Lesson 4 (Keys in DBMS)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate?.('db-lesson2')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/[0.12]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'লেসন ২-এ ফিরে যান' : 'Back to Lesson 2'}</span>
          </button>
        </div>
      </div>

      {/* 6 Core Vocabulary Badges */}
      <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08]">
          <span className="text-amber-400 block font-bold">
            {language === 'bn' ? 'Relation (রিলেশন)' : 'Relation'}
          </span>
          <span className="text-[10px] text-zinc-400">= Table (টেবিল)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08]">
          <span className="text-cyan-400 block font-bold">
            {language === 'bn' ? 'Tuple (টাপল)' : 'Tuple'}
          </span>
          <span className="text-[10px] text-zinc-400">= Row (সারি / রেকর্ড)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08]">
          <span className="text-purple-400 block font-bold">
            {language === 'bn' ? 'Attribute (অ্যাট্রিবিউট)' : 'Attribute'}
          </span>
          <span className="text-[10px] text-zinc-400">= Column (কলাম / ফিল্ড)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08]">
          <span className="text-emerald-400 block font-bold">
            {language === 'bn' ? 'Domain (ডোমেইন)' : 'Domain'}
          </span>
          <span className="text-[10px] text-zinc-400">= Valid Values (অনুমোদিত মান)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08]">
          <span className="text-pink-400 block font-bold">
            {language === 'bn' ? 'Degree (ডিগ্রি)' : 'Degree'}
          </span>
          <span className="text-[10px] text-zinc-400">= Columns (কলামের সংখ্যা)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#101116] border border-white/[0.08]">
          <span className="text-indigo-400 block font-bold">
            {language === 'bn' ? 'Cardinality' : 'Cardinality'}
          </span>
          <span className="text-[10px] text-zinc-400">= Rows (সারির সংখ্যা)</span>
        </div>
      </div>
    </div>
  );
}
