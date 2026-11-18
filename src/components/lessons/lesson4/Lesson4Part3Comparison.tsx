'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson4Part3Comparison() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৩ / ৮' : 'Part 3 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Master Key Comparison & Hierarchy"
              bn="মাস্টার কি তুলনা ও শ্রেণিবিন্যাস কাঠামো (Master Key Comparison & Hierarchy)"
            />
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
              <th className="py-2.5 px-4 font-bold text-amber-400">
                {language === 'bn' ? 'কী-এর ধরন' : 'Key Type'}
              </th>
              <th className="py-2.5 px-4 font-bold text-white">
                {language === 'bn' ? 'মূল উদ্দেশ্য' : 'Main Purpose'}
              </th>
              <th className="py-2.5 px-4 font-bold text-cyan-400">
                {language === 'bn' ? 'উদাহরণ' : 'Example'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-zinc-300">
            <tr>
              <td className="py-2 px-4 font-bold text-amber-300">Super Key</td>
              <td className="py-2 px-4">
                {language === 'bn'
                  ? 'সারিকে অনন্যভাবে শনাক্তকারী যেকোনো কম্বিনেশন'
                  : 'All combinations that uniquely identify a row'}
              </td>
              <td className="py-2 px-4 text-cyan-300">Student_ID + Name</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-cyan-300">Candidate Key</td>
              <td className="py-2 px-4">
                {language === 'bn'
                  ? 'ন্যূনতম সুপার কী (অপ্রয়োজনীয় কলামহীন)'
                  : 'Minimal Super Key (no redundant columns)'}
              </td>
              <td className="py-2 px-4 text-cyan-300">Student_ID, Email</td>
            </tr>
            <tr className="bg-amber-950/20">
              <td className="py-2 px-4 font-bold text-amber-400">Primary Key</td>
              <td className="py-2 px-4 font-bold text-white">
                {language === 'bn'
                  ? 'রেকর্ড শনাক্তকরণের জন্য নির্বাচিত প্রধান ক্যান্ডিডেট কী'
                  : 'The chosen Candidate Key for row identity'}
              </td>
              <td className="py-2 px-4 text-amber-300 font-bold">Student_ID</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-purple-300">Alternate Key</td>
              <td className="py-2 px-4">
                {language === 'bn'
                  ? 'প্রাইমারি কি হিসেবে মনোনীত না হওয়া অবশিষ্ট ক্যান্ডিডেট কী'
                  : 'Remaining Candidate Keys not picked as PK'}
              </td>
              <td className="py-2 px-4 text-cyan-300">Email</td>
            </tr>
            <tr className="bg-emerald-950/20">
              <td className="py-2 px-4 font-bold text-emerald-400">Foreign Key</td>
              <td className="py-2 px-4 font-bold text-white">
                {language === 'bn'
                  ? 'চাইল্ড টেবিলকে প্যারেন্ট টেবিলের প্রাইমারি কি-এর সাথে যুক্ত করে'
                  : 'Connects child table to parent table PK'}
              </td>
              <td className="py-2 px-4 text-emerald-300 font-bold">Dept_ID in Student</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-pink-300">Composite Key</td>
              <td className="py-2 px-4">
                {language === 'bn'
                  ? 'দুই বা ততোধিক কলামের সমন্বয়ে গঠিত একক অনন্য কি'
                  : 'Key created from 2 or more columns'}
              </td>
              <td className="py-2 px-4 text-cyan-300">Student_ID + Course_ID</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-bold text-indigo-300">Unique Key</td>
              <td className="py-2 px-4">
                {language === 'bn'
                  ? 'কলামের মানের পুনরাবৃত্তি নিষিদ্ধ করে'
                  : 'Enforces uniqueness constraint on column'}
              </td>
              <td className="py-2 px-4 text-cyan-300">Phone_Number</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-center font-mono text-xs">
        <span className="text-[10px] text-zinc-400 uppercase font-bold block">
          {language === 'bn' ? 'কী-এর অনুক্রম কাঠামো (Key Hierarchy):' : 'The Hierarchy of Keys:'}
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300">
            {language === 'bn' ? 'সুপার কী (সকল কম্বিনেশন)' : 'Super Keys (All combos)'}
          </span>
          <span className="text-zinc-500">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300">
            {language === 'bn' ? 'ক্যান্ডিডেট কী (ন্যূনতম)' : 'Candidate Keys (Minimal)'}
          </span>
          <span className="text-zinc-500">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-700 text-amber-300 font-bold">
            {language === 'bn'
              ? 'প্রাইমারি কি (১টি নির্বাচিত) + অল্টারনেট কি'
              : 'Primary Key (1 Selected) + Alternate Keys'}
          </span>
        </div>
      </div>
    </section>
  );
}
