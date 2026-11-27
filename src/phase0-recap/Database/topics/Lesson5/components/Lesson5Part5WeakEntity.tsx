'use client';

import React from 'react';
import { Box, KeyRound, Sparkles, Layers, ShieldAlert, CheckCircle2, Diamond } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part5WeakEntity() {
  const { language } = useLanguage();

  const strongVsWeakTable = [
    {
      featureEn: 'Primary Key',
      featureBn: 'প্রাইমারি কি',
      strongEn: 'Has its own Primary Key',
      strongBn: 'নিজস্ব স্বয়ংসম্পূর্ণ প্রাইমারি কি থাকে',
      weakEn: 'Does NOT possess a primary key of its own',
      weakBn: 'নিজস্ব কোনো প্রাইমারি কি থাকে না',
    },
    {
      featureEn: 'Identification',
      featureBn: 'শনাক্তকরণ পদ্ধতি',
      strongEn: 'Identified completely independently',
      strongBn: 'সম্পূর্ণ স্বাধীনভাবে এককভাবে শনাক্ত করা যায়',
      weakEn: 'Depends on an Owner (Strong) Entity',
      weakBn: 'প্যারেন্ট বা ওনার এনটিটির ওপর নির্ভরশীল',
    },
    {
      featureEn: 'Key Component',
      featureBn: 'মূল চাবিকাঠি',
      strongEn: 'Primary Key (Underlined Attribute)',
      strongBn: 'Primary Key (টানা দাগযুক্ত ওভাল)',
      weakEn: 'Partial Key / Discriminator (Dashed Underline)',
      weakBn: 'Partial Key (ড্যাশড বা ভাঙা দাগের আন্ডারলাইন)',
    },
    {
      featureEn: 'ER Symbol',
      featureBn: 'ইআর ডায়াগ্রামের প্রতীক',
      strongEn: '[ Single Rectangle ]',
      strongBn: '[ একক আয়তক্ষেত্র ]',
      weakEn: '[[ Double Rectangle ]]',
      weakBn: '[[ ডাবল বা দ্বৈত আয়তক্ষেত্র ]]',
    },
    {
      featureEn: 'Relationship Symbol',
      featureBn: 'সম্পর্কের প্রতীক',
      strongEn: '< Single Diamond >',
      strongBn: '< একক রম্বস (Single Diamond) >',
      weakEn: '<< Double Diamond >> (Identifying Relationship)',
      weakBn: '<< ডাবল রম্বস >> (আইডেন্টিফাইং রিলেশন)',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Box className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৬ • স্ট্রং ও উইক এনটিটি' : 'Part 6 • Strong & Weak Entities'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="6. Strong Entity and Weak Entity"
              bn="৬. স্ট্রং এনটিটি এবং উইক এনটিটি (Strong vs Weak Entity)"
            />
          </h2>
        </div>
      </div>

      {/* Intro Definition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
        {/* Strong Entity */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-indigo-900/50 space-y-3">
          <div className="flex items-center justify-between font-mono">
            <span className="text-sm font-bold text-indigo-300">8.1 Strong Entity</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 border border-indigo-600 text-indigo-200 font-bold">
              [ Single Box ]
            </span>
          </div>
          <div className="text-zinc-300 leading-relaxed text-[11px]">
            <DualText
              en="A Strong Entity possesses its own Primary Key and can be identified independently without relying on any other entity."
              bn="যে এনটিটির নিজস্ব স্বয়ংসম্পূর্ণ প্রাইমারি কি থাকে এবং অন্য কোনো এনটিটির সাহায্য ছাড়াই স্বাধীনভাবে যাকে অদ্বিতীয়ভাবে চেনা যায়, তাকে স্ট্রং এনটিটি বলে।"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-[11px] text-indigo-300 space-y-1">
            <div><strong>Example:</strong> STUDENT Entity</div>
            <div className="text-zinc-400 text-[10px]">
              <code>Student_ID = 101</code>, <code>Name = &apos;Rahim&apos;</code>, <code>Dept = &apos;CSE&apos;</code>
            </div>
            <div className="text-zinc-500 text-[10px] pt-1 border-t border-slate-800/80">
              {language === 'bn'
                ? 'Student এনটিটি শনাক্ত হতে অন্য কোনো টেবিলের ওপর নির্ভর করে না।'
                : 'Student does not rely on any parent table for identification.'}
            </div>
          </div>
        </div>

        {/* Weak Entity */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-rose-900/50 space-y-3 ring-1 ring-rose-500/20">
          <div className="flex items-center justify-between font-mono">
            <span className="text-sm font-bold text-rose-300">8.2 Weak Entity</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 border border-rose-600 text-rose-200 font-bold">
              [[ Double Box ]]
            </span>
          </div>
          <div className="text-zinc-300 leading-relaxed text-[11px]">
            <DualText
              en="A Weak Entity cannot be uniquely identified by its own attributes alone. It depends on an Owner (Strong) Entity for its identification."
              bn="যে এনটিটি কেবল নিজের অ্যাট্রিবিউট দিয়ে এককভাবে শনাক্ত হতে পারে না এবং অস্তিত্ব ও চেনার জন্য একটি ওনার (স্ট্রং) এনটিটির ওপর নির্ভর করে, তাকে উইক এনটিটি বলে।"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-[11px] text-rose-300 space-y-1">
            <div><strong>Example:</strong> DEPENDENT (কর্মচারীর সন্তান/পরিবার)</div>
            <div className="text-zinc-400 text-[10px]">
              <code>Dependent_Name = &apos;Rahim&apos;</code>, <code>Relationship = &apos;Son&apos;</code>
            </div>
            <div className="text-zinc-500 text-[10px] pt-1 border-t border-slate-800/80">
              {language === 'bn'
                ? 'একাধিক কর্মীর সন্তানের নাম "Rahim" হতে পারে। তাই এটি উইক এনটিটি।'
                : 'Multiple employees may have a son named "Rahim". Name alone is not unique!'}
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Visual Architecture: Employee & Dependent */}
      <div className="p-6 rounded-2xl bg-[#14182e] border border-slate-800 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            {language === 'bn' ? 'বাস্তব দৃশ্যপট: Employee বনাম Dependent রিলেশন' : 'Real-World Architecture: Employee & Family Dependents'}
          </span>
          <span className="text-[10px] text-zinc-400">Chen Notation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Owner Entity */}
          <div className="p-4 rounded-xl bg-indigo-950/60 border-2 border-indigo-500 text-center space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-400 uppercase block">[ Single Rectangle ]</span>
            <h4 className="text-sm font-bold text-white">EMPLOYEE</h4>
            <div className="text-[11px] text-amber-300 font-bold">
              <u>Employee_ID (PK)</u>
            </div>
            <span className="text-[10px] text-zinc-400 block">Owner / Strong Entity</span>
          </div>

          {/* Identifying Relationship */}
          <div className="p-4 rounded-xl bg-purple-950/60 border-2 border-purple-500 text-center space-y-1.5">
            <span className="text-[10px] font-bold text-purple-400 uppercase block">&lt;&lt; Double Diamond &gt;&gt;</span>
            <h4 className="text-sm font-bold text-purple-200">HAS</h4>
            <span className="text-[10px] text-zinc-400 block">Identifying Relationship</span>
          </div>

          {/* Weak Entity */}
          <div className="p-4 rounded-xl bg-rose-950/60 border-2 border-rose-500 text-center space-y-1.5 ring-2 ring-rose-500/30">
            <span className="text-[10px] font-bold text-rose-400 uppercase block">[[ Double Rectangle ]]</span>
            <h4 className="text-sm font-bold text-white">DEPENDENT</h4>
            <div className="text-[11px] text-rose-300 font-bold border-b border-dashed border-rose-400 inline-block">
              Dependent_Name
            </div>
            <span className="text-[10px] text-zinc-400 block">Partial Key (Discriminator)</span>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 space-y-2 text-[11px] text-zinc-300 font-sans leading-relaxed">
          <div className="text-amber-300 font-bold font-mono">
            {language === 'bn' ? '💡 DEPENDENT কেন উইক এনটিটি?' : '💡 Why is DEPENDENT classified as a Weak Entity?'}
          </div>
          <DualText
            en="Consider Employee #5001 has a son named 'Rahim'. Another Employee #5002 also has a son named 'Rahim'. If you search the database with only Dependent_Name = 'Rahim', the database cannot tell whose son he is! To uniquely identify the dependent, we MUST combine: (Employee_ID + Dependent_Name). Together, they form the Primary Key."
            bn="মনে করুন, ৫০০১ আইডিধারী কর্মচারীর এক ছেলের নাম 'রহিম'। আবার ৫০০২ আইডিধারী অন্য এক কর্মচারীর ছেলের নামও 'রহিম'। আপনি যদি শুধু Dependent_Name = 'Rahim' দিয়ে খোঁজেন, তবে ডেটাবেস বলতে পারবে না সে কার সন্তান! সন্তানকে অনন্যভাবে শনাক্ত করতে আমাদের অবশ্যই (Employee_ID + Dependent_Name) জোড়া ব্যবহার করতে হবে। উভয়ে মিলে কম্পোজিট কি গঠন করে।"
          />
        </div>
      </div>

      {/* 3 Important Weak Entity Terms */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>{language === 'bn' ? 'উইক এনটিটির ৩টি মূল পরিভাষা (পরীক্ষার জন্য মুখস্থ করুন):' : '3 Crucial Weak Entity Terms for University Exams:'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-1.5">
            <span className="text-[10px] text-indigo-400 uppercase font-bold block">1. Owner Entity</span>
            <div className="text-white font-bold text-sm">
              {language === 'bn' ? 'ওনার এনটিটি' : 'Owner / Parent Entity'}
            </div>
            <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="The strong entity upon which the weak entity depends for identification. (e.g. Employee)"
                bn="যে স্ট্রং এনটিটির ওপর উইক এনটিটি শনাক্তকরণের জন্য নির্ভরশীল থাকে। (যেমন: Employee)"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-1.5">
            <span className="text-[10px] text-rose-400 uppercase font-bold block">2. Partial Key</span>
            <div className="text-white font-bold text-sm">
              {language === 'bn' ? 'পার্শিয়াল কি (ডিসক্রিমিনেটর)' : 'Partial Key (Discriminator)'}
            </div>
            <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="The attribute that distinguishes weak entities belonging to the same owner. Represented by a dashed underline."
                bn="যে অ্যাট্রিবিউট একই ওনারের অধীনস্থ একাধিক উইক এনটিটিকে পরস্পরের থেকে আলাদা করে। এটি ভাঙা রেখা (Dashed Underline) দিয়ে চিহ্নিত হয়।"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-1.5">
            <span className="text-[10px] text-purple-400 uppercase font-bold block">3. Identifying Rel.</span>
            <div className="text-white font-bold text-sm">
              {language === 'bn' ? 'আইডেন্টিফাইং রিলেশনশিপ' : 'Identifying Relationship'}
            </div>
            <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              <DualText
                en="The relationship connecting a weak entity to its owner entity. Represented by a double diamond."
                bn="যে সম্পর্ক উইক এনটিটিকে তার ওনার বা প্যারেন্ট এনটিটির সাথে যুক্ত করে। এটি ডাবল রম্বস (Double Diamond) দিয়ে প্রকাশ পায়।"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strong vs Weak Entity Revision Table */}
      <div className="space-y-2 pt-2">
        <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>{language === 'bn' ? 'স্ট্রং বনাম উইক এনটিটি পার্থক্য টেবিল' : 'Strong vs Weak Entity: Comprehensive Exam Comparison'}</span>
          <span className="text-[10px] text-zinc-400">Direct Exam Question</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                <th className="py-2.5 px-4">{language === 'bn' ? 'পার্থক্যের বিষয়' : 'Feature'}</th>
                <th className="py-2.5 px-4 text-indigo-400">{language === 'bn' ? 'স্ট্রং এনটিটি (Strong)' : 'Strong Entity'}</th>
                <th className="py-2.5 px-4 text-rose-400">{language === 'bn' ? 'উইক এনটিটি (Weak)' : 'Weak Entity'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300 font-sans">
              {strongVsWeakTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                  <td className="py-3 px-4 font-bold text-white font-mono">
                    {language === 'bn' ? row.featureBn : row.featureEn}
                  </td>
                  <td className="py-3 px-4 text-indigo-300">
                    {language === 'bn' ? row.strongBn : row.strongEn}
                  </td>
                  <td className="py-3 px-4 text-rose-300">
                    {language === 'bn' ? row.weakBn : row.weakEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
