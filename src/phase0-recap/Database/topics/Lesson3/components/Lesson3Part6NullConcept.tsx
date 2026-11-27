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
      sqlTest: 'WHERE Phone IS NULL  -- TRUE | WHERE Phone = NULL -- UNKNOWN (0 rows!)',
      sqlNoteEn: 'In SQL 3-valued logic, comparing anything with NULL using "=" returns UNKNOWN. Always use IS NULL / IS NOT NULL.',
      sqlNoteBn: 'SQL-এ NULL-এর সাথে "=" দিয়ে তুলনা করলে ফলাফল UNKNOWN হয়। তাই সর্বদা IS NULL / IS NOT NULL ব্যবহার করতে হয়।',
      color: 'text-rose-400',
    },
    {
      id: 'zero',
      title: '0 (Numeric Zero)',
      descEn: 'An actual mathematical quantity ($0 balance).',
      descBn: 'একটি বাস্তব গাণিতিক সংখ্যা (যেমন: একাউন্টে ০ টাকা)।',
      sqlTest: 'WHERE Balance = 0  -- TRUE | AVG() includes 0 in denominator!',
      sqlNoteEn: '0 is a known number. Aggregate functions like AVG(Balance) include 0 in the row count, whereas NULL is ignored.',
      sqlNoteBn: '০ একটি নির্দিষ্ট সংখ্যা। AVG() ফাংশন ০-কে হিসাবে ধরে, কিন্তু NULL মানকে সম্পূর্ণ উপেক্ষা করে।',
      color: 'text-amber-400',
    },
    {
      id: 'empty',
      title: '"" (Empty String)',
      descEn: 'Known text value with length of zero characters.',
      descBn: 'একটি জানা টেক্সট মান যার দৈর্ঘ্য শূন্য ক্যারেক্টার।',
      sqlTest: "WHERE MiddleName = ''  -- TRUE | LENGTH('') = 0 (Oracle treats '' as NULL)",
      sqlNoteEn: 'Empty string is a known string of length 0 (note: Oracle is a famous exception that treats "" as NULL).',
      sqlNoteBn: 'Empty string হলো ০ দৈর্ঘ্যের একটি পরিচিত টেক্সট (তবে Oracle ডেটাবেসে ""-কে NULL হিসেবে গণ্য করা হয়)।',
      color: 'text-cyan-400',
    },
    {
      id: 'literal',
      title: '"NULL" (Text)',
      descEn: 'Literal four-letter string (N-U-L-L), not a SQL null.',
      descBn: 'একটি চার অক্ষরের টেক্সট স্ট্রিং, এটি কিন্তু ডেটাবেস নাল নয়।',
      sqlTest: "WHERE Name = 'NULL'  -- Matches text 'NULL' | IS NULL is FALSE",
      sqlNoteEn: 'Quoted "NULL" is ordinary text data. Never insert literal "NULL" strings from forms or CSV imports!',
      sqlNoteBn: 'কোটেশনের ভেতরে "NULL" সাধারণ টেক্সট ডেটা। ফর্ম বা CSV থেকে কখনোই টেক্সট হিসেবে "NULL" সেভ করা উচিত নয়।',
      color: 'text-purple-400',
    },
  ];

  const activeItem = comparisonItems.find(i => i.id === nullCompVal) || comparisonItems[0];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৬ / ৯' : 'Part 6 of 9'}
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
        <DualText
          as="p"
          className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans"
          en="If a student does not have a registered phone number, the database stores NULL. NULL represents a missing, unknown, or inapplicable value."
          bn="যদি কোনো শিক্ষার্থীর ফোন নম্বর নিবন্ধিত না থাকে, ডেটাবেস সেখানে NULL সংরক্ষণ করে। NULL অর্থ অনুপস্থিত, অজানা বা অপ্রযোজ্য মান।"
        />

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300 space-y-1 font-sans">
          <strong className="text-rose-200 font-mono block">
            {language === 'bn' ? 'গুরুত্বপূর্ণ নিয়ম (Interview Trap):' : 'Critical Interview Rule:'}
          </strong>
          <DualText
            as="p"
            en="NULL does NOT mean zero (0), and it does NOT mean an empty string (“”)! Click any card below to inspect its SQL behavior:"
            bn="NULL মানে কখনোই সংখ্যা ০ (Zero) নয়, আবার এটি ফাঁকা টেক্সট (“”)-ও নয়! নিচের যেকোনো কার্ডে ক্লিক করে SQL আচরণ দেখুন:"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
          {comparisonItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setNullCompVal(item.id as typeof nullCompVal)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                nullCompVal === item.id
                  ? 'bg-[#15192e] border-indigo-500 ring-1 ring-indigo-500/40'
                  : 'bg-[#0c0e18] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <span className={`font-bold block ${item.color}`}>{item.title}</span>
              <p className="text-[10px] text-zinc-300 mt-1 leading-snug">
                {language === 'bn' ? item.descBn : item.descEn}
              </p>
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
          <div className="text-[11px] font-mono text-emerald-400 bg-black/50 p-2.5 rounded-lg border border-slate-800/80 overflow-x-auto">
            {activeItem.sqlTest}
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            {language === 'bn' ? activeItem.sqlNoteBn : activeItem.sqlNoteEn}
          </p>
        </div>
      </div>
    </section>
  );
}
