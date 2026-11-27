'use client';

import React, { useState } from 'react';
import { CheckCircle2, CreditCard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part5Diff() {
  const { language } = useLanguage();
  const [bankStep, setBankStep] = useState<number>(0);

  const runBankSimulation = () => {
    setBankStep(1);
    setTimeout(() => setBankStep(2), 600);
    setTimeout(() => setBankStep(3), 1200);
    setTimeout(() => setBankStep(4), 1800);
  };

  const diffRows = [
    {
      dbEn: 'A collection of organized data and records',
      dbBn: 'সুসংগঠিত উপাত্ত ও রেকর্ডের সংগ্রহ',
      dbmsEn: 'Software engine used to manage, query & control databases',
      dbmsBn: 'ডেটাবেস নিয়ন্ত্রণ, পরিচালনা ও কুয়েরি করার সফটওয়্যার ইঞ্জিন',
    },
    {
      dbEn: 'Contains the actual stored files and tables',
      dbBn: 'মূল সংরক্ষিত ফাইল, সারি ও কলাম ধারণ করে',
      dbmsEn: 'Provides interfaces, drivers & query languages (SQL) to manipulate data',
      dbmsBn: 'ডেটার সাথে কাজ করার জন্য ইন্টারফেস ও কুয়েরি ভাষা (SQL) সরবরাহ করে',
    },
    {
      dbEn: 'Example: University database, Bank customer database',
      dbBn: 'উদাহরণ: বিশ্ববিদ্যালয়ের ডেটাবেস, ব্যাংকের লেনদেন ডেটাবেস',
      dbmsEn: 'Example: PostgreSQL, MySQL, Oracle, SQL Server',
      dbmsBn: 'উদাহরণ: PostgreSQL, MySQL, Oracle Database',
    },
    {
      dbEn: 'Passive: Simply stores information on storage medium',
      dbBn: 'নিষ্ক্রিয়: কেবল ডিস্ক বা স্টোরেজ মিডিয়ামে তথ্য ধরে রাখে',
      dbmsEn: 'Active: Creates, retrieves, indexes, updates, caches & secures data',
      dbmsBn: 'সক্রিয়: স্বয়ংক্রিয়ভাবে তথ্য ইনডেক্সিং, ক্যাশিং, ব্যাকআপ ও সুরক্ষা দেয়',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            Part 5 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && "Database vs DBMS: What's the Difference?"}
            {language === 'bn' && 'ডেটাবেস বনাম ডিবিএমএস: মৌলিক পার্থক্য'}
            {language === 'dual' && "Database vs DBMS: What's the Difference? (ডেটাবেস বনাম ডিবিএমএস)"}
          </h2>
        </div>
      </div>

      <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1">
        <p>
          {language === 'bn'
            ? 'পরবর্তী বিষয়ে যাওয়ার আগে এই দুটি শব্দের পার্থক্য পরিষ্কার জানা থাকা অত্যন্ত জরুরি:'
            : 'This is one of the most critical foundational differences to understand before going further:'}
        </p>
        {language === 'dual' && (
          <p className="text-xs text-indigo-300/80">
            (ডেটাবেস হলো ডেটার ভাণ্ডার, আর DBMS হলো সেই ভাণ্ডার পরিচালনার সফটওয়্যার হাতিয়ার।)
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
              <th className="py-2.5 px-4 font-bold text-purple-400 w-1/2">
                {language === 'bn' ? 'ডেটাবেস (Database)' : 'Database'}
              </th>
              <th className="py-2.5 px-4 font-bold text-emerald-400 w-1/2">
                {language === 'bn' ? 'ডিবিএমএস (DBMS)' : 'DBMS'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-zinc-300">
            {diffRows.map((r, i) => (
              <tr key={i}>
                <td className="py-2.5 px-4">
                  {language === 'bn' ? r.dbBn : r.dbEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-zinc-400 font-sans mt-0.5">{r.dbBn}</span>
                  )}
                </td>
                <td className="py-2.5 px-4 text-emerald-300 font-medium">
                  {language === 'bn' ? r.dbmsBn : r.dbmsEn}
                  {language === 'dual' && (
                    <span className="block text-[11px] text-emerald-200/80 font-sans mt-0.5">{r.dbmsBn}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Practical Example: Banking App Balance Check */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            {language === 'bn'
              ? 'বাস্তব উদাহরণ: মোবাইল ব্যাংকিং অ্যাপে ব্যালেন্স চেক করার ধাপসমূহ'
              : 'Practical Example: Checking Your Bank Balance in a Mobile App'}
          </h4>
          <button
            onClick={runBankSimulation}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold cursor-pointer transition-colors shrink-0"
          >
            {language === 'bn' ? 'সিমুলেশন চালান (Run Simulation)' : 'Simulate Balance Check'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
          <div
            className={`p-3 rounded-xl border transition-colors ${
              bankStep >= 1
                ? 'bg-indigo-950/40 border-indigo-500 text-white'
                : 'bg-black/30 border-slate-800 text-zinc-500'
            }`}
          >
            <span className="text-[10px] block text-zinc-400">Step 1</span>
            <span>{language === 'bn' ? '১. অ্যাপ রিকোয়েস্ট পাঠায়' : '1. App sends request'}</span>
            <span className="text-[9px] block text-zinc-500 mt-1">Client to Server</span>
          </div>
          <div
            className={`p-3 rounded-xl border transition-colors ${
              bankStep >= 2
                ? 'bg-indigo-950/40 border-indigo-500 text-white'
                : 'bg-black/30 border-slate-800 text-zinc-500'
            }`}
          >
            <span className="text-[10px] block text-zinc-400">Step 2</span>
            <span>{language === 'bn' ? '২. DBMS কুয়েরি প্রসেস করে' : '2. DBMS processes'}</span>
            <span className="text-[9px] block text-zinc-500 mt-1">Auth &amp; Query Planner</span>
          </div>
          <div
            className={`p-3 rounded-xl border transition-colors ${
              bankStep >= 3
                ? 'bg-indigo-950/40 border-indigo-500 text-white'
                : 'bg-black/30 border-slate-800 text-zinc-500'
            }`}
          >
            <span className="text-[10px] block text-zinc-400">Step 3</span>
            <span>{language === 'bn' ? '৩. DB ফাইল থেকে রিড করে' : '3. Retrieves from DB'}</span>
            <span className="text-[9px] block text-zinc-500 mt-1">Storage B-Tree Index</span>
          </div>
          <div
            className={`p-3 rounded-xl border transition-colors ${
              bankStep >= 4
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold'
                : 'bg-black/30 border-slate-800 text-zinc-500'
            }`}
          >
            <span className="text-[10px] block text-zinc-400">Step 4</span>
            <span>{language === 'bn' ? '৪. ব্যালেন্স: $৫,২৪০' : '4. Balance: $5,240'}</span>
            <span className="text-[9px] block text-emerald-400 mt-1">Secure Result Displayed</span>
          </div>
        </div>
      </div>
    </section>
  );
}
