'use client';

import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';

interface Lesson1Part8ReviewProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson1Part8Review({ onNavigate }: Lesson1Part8ReviewProps) {
  const { language } = useLanguage();

  const takeaways = [
    {
      titleEn: '1. Data',
      titleBn: '১. ডেটা (Data)',
      descEn: 'Raw facts, figures, and observations without context.',
      descBn: 'কোনো নির্দিষ্ট অর্থ বা প্রসঙ্গ ছাড়া অপরিশোধিত কাঁচা তথ্য।',
      color: 'border-amber-900/40 text-amber-400',
    },
    {
      titleEn: '2. Information',
      titleBn: '২. ইনফরমেশন (Information)',
      descEn: 'Processed, structured data that conveys clear, actionable meaning.',
      descBn: 'প্রক্রিয়াজাত ও সুসংগঠিত উপাত্ত যা সিদ্ধান্ত নিতে কাজে লাগে।',
      color: 'border-cyan-900/40 text-cyan-400',
    },
    {
      titleEn: '3. Database',
      titleBn: '৩. ডেটাবেস (Database)',
      descEn: 'Organized electronic collection of logically related tables and records.',
      descBn: 'পরস্পর সম্পর্কযুক্ত একাধিক টেবিলের সুসংগঠিত ইলেকট্রনিক ভাণ্ডার।',
      color: 'border-purple-900/40 text-purple-400',
    },
    {
      titleEn: '4. DBMS',
      titleBn: '৪. ডিবিএমএস (DBMS)',
      descEn: 'Software engine that creates, manages, queries, and protects the database.',
      descBn: 'ডেটাবেস পরিচালনা, অনুসন্ধান, ইনডেক্সিং ও সুরক্ষার সফটওয়্যার ইঞ্জিন।',
      color: 'border-emerald-900/40 text-emerald-400',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            Part 8 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'What you should remember from Lesson 1'}
            {language === 'bn' && 'লেসন ১ থেকে যা যা মনে রাখা প্রয়োজন'}
            {language === 'dual' && 'What you should remember from Lesson 1 (মূল স্মর্তব্য বিষয়)'}
          </h2>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {takeaways.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-xl bg-[#14182d] border ${item.color.split(' ')[0]} space-y-1`}>
            <span className={`text-xs font-mono font-bold uppercase ${item.color.split(' ')[1]}`}>
              {language === 'bn' ? item.titleBn : item.titleEn}
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              {language === 'bn' ? item.descBn : item.descEn}
            </p>
            {language === 'dual' && (
              <p className="text-[11px] text-zinc-400 leading-snug pt-0.5">
                {item.descBn}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Coming Next: Lesson 2 Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            {language === 'bn' ? 'পরবর্তী অধ্যায় • লেসন ২' : 'Coming next • Lesson 2'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
            Next Module
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          {language === 'bn'
            ? 'ডেটাবেসের প্রকারভেদ এবং ডেটাবেস মডেলসমূহ (Database Models)'
            : 'Types of Databases and Database Models'}
          {language === 'dual' && (
            <span className="block text-sm font-normal text-indigo-300 mt-0.5">
              (ডেটাবেসের প্রকারভেদ এবং ডেটাবেস মডেলসমূহ)
            </span>
          )}
        </h3>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          {language === 'bn'
            ? 'লেসন ২-এ আমরা শিখব: ফ্ল্যাট-ফাইল ডেটাবেস, রিলেশনাল ডেটাবেস (RDBMS), হায়ারারকিক্যাল ডেটাবেস, নেটওয়ার্ক ডেটাবেস এবং আধুনিক NoSQL ডেটাবেস—এবং কেন রিলেশনাল মডেল আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মূল ভিত্তি হয়ে উঠল।'
            : 'In Lesson 2, we will explore: Flat-file databases, Relational databases (RDBMS), Hierarchical databases, Network databases, and NoSQL databases—and why relational databases became the backbone of modern computing.'}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-basics')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'ডেটাবেস ১০১ বেসিক্স রিভিশন' : 'Review Database 101 Basics'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson2')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
          >
            <span>
              {language === 'bn' ? 'লেসন ২-এ যান: ডেটাবেস মডেল' : 'Go to Lesson 2: Database Models'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
