'use client';

import React, { useState } from 'react';
import { KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson4Part1WhyKeys() {
  const { language } = useLanguage();
  const [simulatedUpdateMode, setSimulatedUpdateMode] = useState<'none' | 'by-name' | 'by-id'>('none');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ১ / ৬' : 'Part 1 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Why do we need keys? (The Problem of Ambiguity)"
              bn="আমাদের কি (Keys)-এর কেন প্রয়োজন? (দ্ব্যর্থতা ও বিভ্রান্তির সমস্যা)"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Imagine a university student database table without a unique ID. Look at what happens when two students share the same name and department:"
            bn="মনে করুন কোনো আইডি ছাড়া একটি বিশ্ববিদ্যালয়ের শিক্ষার্থী তালিকা রয়েছে। সেখানে যদি একই নামের দুজন শিক্ষার্থী একই বিভাগে পড়ে, তাহলে কী বিপজ্জনক ঘটনা ঘটে দেখুন:"
          />
        </div>

        {/* Interactive Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono">
          <span className="text-zinc-400 font-bold">
            {language === 'bn' ? 'ইন্টারেক্টিভ আপডেট পরীক্ষা করুন:' : 'Try Interactive Update:'}
          </span>
          <button
            onClick={() => setSimulatedUpdateMode('by-name')}
            className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
              simulatedUpdateMode === 'by-name'
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                : 'bg-[#121526] border-slate-700 text-zinc-300 hover:border-slate-500'
            }`}
          >
            {language === 'bn' ? '১. নাম দিয়ে আপডেট: WHERE Name=\'Rahim\'' : '1. UPDATE Age = 23 WHERE Name = \'Rahim\''}
          </button>
          <button
            onClick={() => setSimulatedUpdateMode('by-id')}
            className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
              simulatedUpdateMode === 'by-id'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                : 'bg-[#121526] border-slate-700 text-zinc-300 hover:border-slate-500'
            }`}
          >
            {language === 'bn' ? '২. আইডি দিয়ে আপডেট: WHERE Student_ID=101' : '2. UPDATE Age = 23 WHERE Student_ID = 101'}
          </button>
          {simulatedUpdateMode !== 'none' && (
            <button
              onClick={() => setSimulatedUpdateMode('none')}
              className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-white cursor-pointer underline ml-auto"
            >
              {language === 'bn' ? 'রিসেট' : 'Reset'}
            </button>
          )}
        </div>

        {/* Problem Table without Keys vs Solution Table with Keys */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl bg-[#0c0e18] border transition-colors space-y-2 ${
              simulatedUpdateMode === 'by-name'
                ? 'border-rose-500 ring-1 ring-rose-500/30'
                : 'border-rose-900/50'
            }`}
          >
            <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <DualText
                en="Problem: Table WITHOUT Keys"
                bn="সমস্যা: কি (Key) বিহীন টেবিল"
              />
            </span>
            <div className="overflow-x-auto text-[11px] font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-zinc-400">
                    <th className="py-1 px-2">{language === 'bn' ? 'নাম' : 'Name'}</th>
                    <th className="py-1 px-2">{language === 'bn' ? 'বয়স' : 'Age'}</th>
                    <th className="py-1 px-2">{language === 'bn' ? 'বিভাগ' : 'Department'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                  <tr
                    className={
                      simulatedUpdateMode === 'by-name'
                        ? 'bg-rose-950/40 text-rose-200 font-bold'
                        : 'bg-rose-950/20 text-rose-300 font-bold'
                    }
                  >
                    <td className="py-1 px-2">Rahim</td>
                    <td className="py-1 px-2">
                      {simulatedUpdateMode === 'by-name' ? '23 ⚠️' : '22'}
                    </td>
                    <td className="py-1 px-2">CSE</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">Karim</td>
                    <td className="py-1 px-2">23</td>
                    <td className="py-1 px-2">BBA</td>
                  </tr>
                  <tr
                    className={
                      simulatedUpdateMode === 'by-name'
                        ? 'bg-rose-950/40 text-rose-200 font-bold'
                        : 'bg-rose-950/20 text-rose-300 font-bold'
                    }
                  >
                    <td className="py-1 px-2">Rahim</td>
                    <td className="py-1 px-2">
                      {simulatedUpdateMode === 'by-name' ? '23 ⚠️' : '22'}
                    </td>
                    <td className="py-1 px-2">CSE</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">Nila</td>
                    <td className="py-1 px-2">21</td>
                    <td className="py-1 px-2">EEE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-rose-300 leading-snug">
              {simulatedUpdateMode === 'by-name' ? (
                <DualText
                  en="❌ Ambiguity Disaster! Both Rahim records got modified unintentionally. Data is now corrupted!"
                  bn="❌ মারাত্মক ভুল! অনিচ্ছাকৃতভাবে দুজন রহিমের বয়সই ২৩ হয়ে গেল। ডেটাবেস করাপ্ট হয়ে গেছে!"
                />
              ) : (
                <DualText
                  en="⚠️ Two completely different students share the name 'Rahim', age 22, and dept CSE. The DBMS cannot distinguish which row to target!"
                  bn="⚠️ দুজন সম্পূর্ণ ভিন্ন শিক্ষার্থীরই নাম 'Rahim', বয়স ২২ এবং ডিপার্টমেন্ট CSE। নির্দিষ্ট একজনকে আপডেট করার কোনো উপায় ডেটাবেসের নেই!"
                />
              )}
            </div>
          </div>

          {/* Solution Table with Student_ID Key */}
          <div
            className={`p-4 rounded-xl bg-[#0c0e18] border transition-colors space-y-2 ${
              simulatedUpdateMode === 'by-id'
                ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                : 'border-emerald-900/50'
            }`}
          >
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <DualText
                en="Solution: Table WITH Primary Key (Student_ID)"
                bn="সমাধান: প্রাইমারি কি (Student_ID) সহ টেবিল"
              />
            </span>
            <div className="overflow-x-auto text-[11px] font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-zinc-400">
                    <th className="py-1 px-2 text-amber-400">Student_ID (Key)</th>
                    <th className="py-1 px-2">{language === 'bn' ? 'নাম' : 'Name'}</th>
                    <th className="py-1 px-2">{language === 'bn' ? 'বয়স' : 'Age'}</th>
                    <th className="py-1 px-2">{language === 'bn' ? 'বিভাগ' : 'Department'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                  <tr
                    className={
                      simulatedUpdateMode === 'by-id'
                        ? 'bg-emerald-950/40 text-emerald-200 font-bold'
                        : ''
                    }
                  >
                    <td className="py-1 px-2 text-amber-400 font-bold">101</td>
                    <td className="py-1 px-2">Rahim</td>
                    <td className="py-1 px-2">
                      {simulatedUpdateMode === 'by-id' ? '23 ✓' : '22'}
                    </td>
                    <td className="py-1 px-2">CSE</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-amber-400 font-bold">102</td>
                    <td className="py-1 px-2">Karim</td>
                    <td className="py-1 px-2">23</td>
                    <td className="py-1 px-2">BBA</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-amber-400 font-bold">103</td>
                    <td className="py-1 px-2">Rahim</td>
                    <td className="py-1 px-2">22</td>
                    <td className="py-1 px-2">CSE</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-amber-400 font-bold">104</td>
                    <td className="py-1 px-2">Nila</td>
                    <td className="py-1 px-2">21</td>
                    <td className="py-1 px-2">EEE</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-emerald-300 leading-snug">
              {simulatedUpdateMode === 'by-id' ? (
                <DualText
                  en="✓ Precise Target! Only Student_ID = 101 was updated. The other Rahim's record remains perfectly safe."
                  bn="✓ নিখুঁত লক্ষ্য! শুধুমাত্র Student_ID = 101 এর বয়স আপডেট হয়েছে। অন্য রহিমের তথ্য সম্পূর্ণ নিরাপদ ও অপরিবর্তিত রয়েছে।"
                />
              ) : (
                <DualText
                  en="✓ With Student_ID as the Primary Key, every row is uniquely identifiable with 100% precision."
                  bn="✓ Student_ID থাকার কারণে প্রতিটি সারিকে শতভাগ নির্ভুলভাবে এবং অদ্বিতীয়ভাবে চেনা সম্ভব।"
                />
              )}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 leading-relaxed font-sans">
          <strong className="block text-amber-200 font-mono mb-1">
            {language === 'bn' ? 'বিধিবদ্ধ সংজ্ঞা (Formal Definition):' : 'Formal Definition:'}
          </strong>
          <DualText
            en="“A key is an attribute or a set of attributes used to identify records uniquely or establish relationships between database tables.”"
            bn="“কি (Key) হলো এক বা একাধিক অ্যাট্রিবিউটের এমন একটি সমষ্টি, যার সাহায্যে কোনো রিলেশনের প্রতিটি রেকর্ডকে অদ্বিতীয়ভাবে শনাক্ত করা যায় অথবা বিভিন্ন টেবিলের মধ্যে পারস্পরিক সম্পর্ক স্থাপন করা যায়।”"
          />
        </div>
      </div>
    </section>
  );
}
