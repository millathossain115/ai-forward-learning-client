'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part6Need() {
  const { language } = useLanguage();

  const fileVsDbms = [
    {
      problemEn: 'Data redundancy / duplication',
      problemBn: 'ডেটার দ্বৈততা বা অনর্থক পুনরাবৃত্তি (Redundancy)',
      solutionEn: 'Reduces unnecessary repetition through systematic normalization',
      solutionBn: 'নরমালাইজেশনের মাধ্যমে টেবিল ভাগ করে অযথা পুনরাবৃত্তি রোধ করে',
    },
    {
      problemEn: 'Data inconsistency',
      problemBn: 'ডেটার অসঙ্গতি (এক জায়গায় আপডেট হলে অন্য জায়গায় না হওয়া)',
      solutionEn: 'Maintains synchronized, unified data across all related tables',
      solutionBn: 'সম্পর্কিত সব টেবিলে একই সময়ে ডেটা সমন্বিত ও নির্ভুল রাখে',
    },
    {
      problemEn: 'Lack of granular security',
      problemBn: 'নিরাপত্তার অভাব (ফাইল খুললেই সব ডেটা যে কেউ দেখে ফেলতে পারে)',
      solutionEn: 'Controls permissions down to specific tables, rows, and columns',
      solutionBn: 'ব্যবহারকারীর ভূমিকা অনুযায়ী নির্দিষ্ট রো ও কলামে এক্সেস সীমাবদ্ধ করে (RBAC)',
    },
    {
      problemEn: 'Difficulty in concurrent data sharing',
      problemBn: 'একসাথে বহু ব্যবহারকারীর কাজ করার জটিলতা (File Lock)',
      solutionEn: 'Allows thousands of authorized users to read and write simultaneously',
      solutionBn: 'হাজার হাজার ব্যবহারকারীকে নিরাপদে ও কোনো কলিশন ছাড়া একযোগে কাজ করতে দেয়',
    },
    {
      problemEn: 'Slow & complex data retrieval',
      problemBn: 'ধীরগতির খোঁজাখুঁজি (লাখ লাখ লাইনের ফাইল লাইন ধরে স্ক্যান করা)',
      solutionEn: 'Uses B-Tree and Hash indexes to query millions of rows in milliseconds',
      solutionBn: 'বি-ট্রি (B-Tree) ইনডেক্সিংয়ের মাধ্যমে কোটি রেকর্ডের মধ্যেও চোখের পলকে সার্চ করে',
    },
    {
      problemEn: 'Lack of data integrity rules',
      problemBn: 'নিয়ম রক্ষার অভাব (ভুল ফরম্যাট বা নেগেটিভ বেতন ঢুকে যাওয়া)',
      solutionEn: 'Enforces constraints (Primary Keys, Foreign Keys, Check validations)',
      solutionBn: 'প্রাইমারি কি, ফরেন কি এবং চেক কনস্ট্রেইন্ট দিয়ে ভুল ডেটা প্রবেশ ঠেকায়',
    },
    {
      problemEn: 'Crash vulnerabilities (Backup & recovery)',
      problemBn: 'সিস্টেম ক্র্যাশ বা বিদ্যুৎ চলে গেলে পুরো ফাইল নষ্ট হওয়া',
      solutionEn: 'Automated logging (Write-Ahead Logging / WAL) recovers data after crashes',
      solutionBn: 'রাইট-অ্যাহেড লগিং (WAL) ও স্বয়ংক্রিয় ব্যাকআপের মাধ্যমে ক্র্যাশের পর নির্ভুল রিকভারি করে',
    },
  ];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
            Part 6 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'Why do we need databases? (Why not plain files?)'}
            {language === 'bn' && 'কেন সাধারণ ফাইলের বদলে ডেটাবেস প্রয়োজন?'}
            {language === 'dual' && 'Why do we need databases? (কেন সাধারণ ফাইল বা এক্সেল নয়?)'}
          </h2>
        </div>
      </div>

      <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
        <p>
          {language === 'bn'
            ? 'অনেকের মনে প্রশ্ন জাগতে পারে: সাধারণ এক্সেল শিট বা টেক্সট ফাইল দিয়ে কি কাজ চালানো যেত না?'
            : 'You might wonder: Why not just use Excel sheets or ordinary text files?'}
        </p>
        <p>
          {language === 'bn'
            ? 'খুব ভালো প্রশ্ন! সাধারণ ফাইল সিস্টেমের মারাত্মক কিছু সীমাবদ্ধতা রয়েছে, যা কোটি কোটি মানুষের ডেটা ব্যবস্থাপনায় অচল হয়ে পড়ে। নিচে দেখুন DBMS কীভাবে সেই সমস্যাগুলো স্থায়ীভাবে দূর করে:'
            : 'Good question! Plain file systems suffer from severe architectural limitations. Databases and DBMS are indispensable because they solve major computational bottlenecks:'}
        </p>
        {language === 'dual' && (
          <p className="text-xs text-indigo-300/80">
            (সাধারণ ফাইল সিস্টেমে ডেটা ডুপ্লিকেশন, অসঙ্গতি ও সিকিউরিটির মারাত্মক ঝুঁকি থাকে যা DBMS সমাধান করে।)
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
              <th className="py-2.5 px-4 font-bold text-red-400 w-1/3">
                {language === 'bn' ? 'সাধারণ ফাইলের সাধারণ সমস্যা' : 'Common File Problem'}
              </th>
              <th className="py-2.5 px-4 font-bold text-emerald-400">
                {language === 'bn' ? 'DBMS যেভাবে সমাধান করে' : 'How a DBMS Solves It'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.08] text-zinc-300">
            {fileVsDbms.map((r, i) => (
              <tr key={i}>
                <td className="py-2.5 px-4 font-bold text-white">
                  {language === 'bn' ? r.problemBn : r.problemEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] font-normal text-red-300/80 font-sans mt-0.5">
                      {r.problemBn}
                    </span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-emerald-300 font-medium">
                  {language === 'bn' ? r.solutionBn : r.solutionEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-emerald-200/80 font-sans mt-0.5">
                      {r.solutionBn}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
