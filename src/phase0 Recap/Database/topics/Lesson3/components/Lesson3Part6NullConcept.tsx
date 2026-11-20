'use client';

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part6NullConcept() {
  const { language } = useLanguage();
  const [nullCompVal, setNullCompVal] = useState<'null' | 'zero' | 'empty' | 'literal'>('null');

  const comparisonItems = [
    {
      id: 'null',
      title: 'NULL',
      descEn: 'Missing or unknown value. No value exists.',
      descBn: 'অনুপস্থিত বা অজানা মান। কোনো মানই বরাদ্দ নেই।',
      color: 'text-rose-400',
    },
    {
      id: 'zero',
      title: '0 (Numeric Zero)',
      descEn: 'An actual mathematical quantity ($0 balance).',
      descBn: 'একটি বাস্তব গাণিতিক সংখ্যা (যেমন: একাউন্টে ০ টাকা)।',
      color: 'text-amber-400',
    },
    {
      id: 'empty',
      title: '"" (Empty String)',
      descEn: 'Known text value with length of zero characters.',
      descBn: 'একটি জানা টেক্সট মান যার দৈর্ঘ্য শূন্য ক্যারেক্টার।',
      color: 'text-cyan-400',
    },
    {
      id: 'literal',
      title: '"NULL" (Text)',
      descEn: 'Literal four-letter string (N-U-L-L), not a SQL null.',
      descBn: 'একটি চার অক্ষরের টেক্সট স্ট্রিং, এটি কিন্তু ডেটাবেস নাল নয়।',
      color: 'text-purple-400',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৮ / ১৩' : 'Part 8 of 13'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="What is NULL in a Database?"
              bn="ডেটাবেসে NULL কী এবং কেন এটি শূন্য বা ফাঁকা নয়?"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="In our Student table, Karim does not have a registered phone number. In a database, we store this as NULL. Definition: NULL represents a missing, unknown, or inapplicable value."
            bn="আমাদের স্টুডেন্ট টেবিলে করিমের কোনো ফোন নম্বর নিবন্ধিত নেই। ডেটাবেসে এই অবস্থাকে আমরা সংরক্ষণ করি NULL হিসেবে। সংজ্ঞা: ডেটাবেসে কোনো মান অনুপস্থিত, অজানা (unknown), কিংবা অপ্রযোজ্য (inapplicable) হলে তাকে NULL বলে।"
          />
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300 space-y-1 font-sans">
          <strong className="text-rose-200 font-mono block">
            {language === 'bn' ? 'পরীক্ষার সাধারণ ফাঁদ (Critical Exam Trap):' : 'Critical Exam Trap:'}
          </strong>
          <DualText
            en="NULL does NOT mean zero (0), and it does NOT mean an empty string (“”)!"
            bn="NULL মানে কখনোই সংখ্যা ০ (Zero) নয়, আবার এটি কোনো ফাঁকা টেক্সট (“”) বা ব্ল্যাঙ্ক স্পেসও নয়!"
          />
        </div>

        {/* Interactive NULL vs Zero vs Empty String */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
          {comparisonItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setNullCompVal(item.id as typeof nullCompVal)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                nullCompVal === item.id
                  ? 'bg-[#15192e] border-indigo-500 ring-1 ring-indigo-500/40'
                  : 'bg-[#0c0e18] border-slate-800 text-zinc-400'
              }`}
            >
              <span className={`font-bold block ${item.color}`}>{item.title}</span>
              <p className="text-[10px] text-zinc-300 mt-1 leading-snug">
                {language === 'bn' ? item.descBn : item.descEn}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
