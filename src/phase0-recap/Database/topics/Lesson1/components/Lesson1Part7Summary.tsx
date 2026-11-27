'use client';

import React from 'react';
import { Layers, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part7Summary() {
  const { language } = useLanguage();

  const summaryRows = [
    {
      conceptEn: 'Data',
      conceptBn: 'ডেটা (Data)',
      color: 'text-amber-400',
      whatEn: 'Raw facts and figures without context',
      whatBn: 'কোনো প্রসঙ্গ ছাড়া বিচ্ছিন্ন কাঁচা উপাত্ত',
      exampleEn: '101, Rahim, 3.80',
      exampleBn: '১০১, রহিম, ৩.৮০',
      roleEn: 'Building block of all computation',
      roleBn: 'সব হিসাব-নিকাশের মূল ভিত্তি বা কাঁচামাল',
    },
    {
      conceptEn: 'Information',
      conceptBn: 'তথ্য (Information)',
      color: 'text-cyan-400',
      whatEn: 'Processed, organized, and meaningful data',
      whatBn: 'প্রক্রিয়াজাত ও অর্থপূর্ণ উপাত্ত',
      exampleEn: 'Rahim has CGPA 3.80 (Grade A)',
      exampleBn: 'রহিম ৩.৮০ সিজিপিএ নিয়ে উত্তীর্ণ (গ্রেড A)',
      roleEn: 'Used directly for decision making',
      roleBn: 'সরাসরি সিদ্ধান্ত গ্রহণ ও বাস্তবায়নে ব্যবহৃত',
    },
    {
      conceptEn: 'Database',
      conceptBn: 'ডেটাবেস (Database)',
      color: 'text-purple-400',
      whatEn: 'Organized electronic repository of related tables',
      whatBn: 'পরস্পর সম্পর্কিত টেবিলের সুসংগঠিত ভাণ্ডার',
      exampleEn: 'University Database (Students + Courses)',
      exampleBn: 'বিশ্ববিদ্যালয়ের পুরো একাডেমিক ডেটাবেস',
      roleEn: 'Long-term, persistent structured storage',
      roleBn: 'স্থায়ী ও সুশৃঙ্খল স্টোরেজ নিশ্চিত করা',
    },
    {
      conceptEn: 'DBMS',
      conceptBn: 'ডিবিএমএস (DBMS)',
      color: 'text-emerald-400',
      whatEn: 'Software engine managing and controlling the database',
      whatBn: 'ডেটাবেস নিয়ন্ত্রণ ও ব্যবস্থাপনার সফটওয়্যার',
      exampleEn: 'PostgreSQL, MySQL, Oracle',
      exampleBn: 'পোস্টগ্রেস এসকিউএল (PostgreSQL), মাইএসকিউএল (MySQL)',
      roleEn: 'Execution, concurrency, query planning & security',
      roleBn: 'কুয়েরি সম্পাদন, গতি বৃদ্ধি ও সার্বিক নিরাপত্তা বিধান',
    },
  ];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            Part 7 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'Summary Comparison: Data vs Information vs Database vs DBMS'}
            {language === 'bn' && 'সারসংক্ষেপ তুলনা: ডেটা বনাম তথ্য বনাম ডেটাবেস বনাম ডিবিএমএস'}
            {language === 'dual' && 'Summary Comparison: Data vs Information vs Database vs DBMS'}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
              <th className="py-2.5 px-4 font-bold text-amber-400">
                {language === 'bn' ? 'ধারণা / পরিভাষা' : 'Concept'}
              </th>
              <th className="py-2.5 px-4 font-bold text-white">
                {language === 'bn' ? 'এটি আসলে কী?' : 'What is it?'}
              </th>
              <th className="py-2.5 px-4 font-bold text-cyan-400">
                {language === 'bn' ? 'বাস্তব উদাহরণ' : 'Example'}
              </th>
              <th className="py-2.5 px-4 font-bold text-emerald-400">
                {language === 'bn' ? 'সিস্টেমে এর ভূমিকা' : 'Role in System'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08] text-zinc-300">
            {summaryRows.map((r, i) => (
              <tr key={i}>
                <td className={`py-2.5 px-4 font-bold ${r.color}`}>
                  {language === 'bn' ? r.conceptBn : r.conceptEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-zinc-400 font-sans font-normal">{r.conceptBn}</span>
                  )}
                </td>
                <td className="py-2.5 px-4">
                  {language === 'bn' ? r.whatBn : r.whatEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-zinc-400 font-sans mt-0.5">{r.whatBn}</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-cyan-200">
                  {language === 'bn' ? r.exampleBn : r.exampleEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-cyan-300/80 font-sans mt-0.5">{r.exampleBn}</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-emerald-200">
                  {language === 'bn' ? r.roleBn : r.roleEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-emerald-300/80 font-sans mt-0.5">{r.roleBn}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mentor Advice Box */}
      <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-zinc-300 space-y-1.5 font-sans leading-relaxed">
        <span className="font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
          <GraduationCap className="w-4 h-4" />
          {language === 'bn' ? 'মেন্টরের বিশেষ পরামর্শ:' : 'One piece of mentor advice:'}
        </span>
        <p>
          {language === 'bn' ? (
            <>&quot;এখনই হুবহু ইংরেজি সংজ্ঞা মুখস্থ করার দরকার নেই। প্রতিটি পরিভাষার গভীর অর্থ এবং এদের মধ্যকার আন্তঃসম্পর্ক বোঝার চেষ্টা করুন। এতে বিশ্ববিদ্যালয়ের পরীক্ষা ও ক্যারিয়ারের ইন্টারভিউ—উভয় ক্ষেত্রেই আপনার ভিত্তি হবে সম্পূর্ণ অটুট।&quot;</>
          ) : (
            <>&quot;Don&apos;t try to memorize definitions word by word right now. Focus on understanding what each concept means and how they relate to one another. That is how you will build a solid, unshakable foundation in DBMS.&quot;</>
          )}
        </p>
        {language === 'dual' && (
          <p className="text-xs text-indigo-300/80 pt-1 border-t border-indigo-900/40">
            (মুখস্থ করার চেয়ে প্রতিটি ধারণার অন্তর্নিহিত কার্যপদ্ধতি বোঝা দীর্ঘমেয়াদে সবচেয়ে বেশি কাজে দেয়।)
          </p>
        )}
      </div>
    </section>
  );
}
