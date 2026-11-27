'use client';

import React, { useState } from 'react';
import { BookOpen, Shuffle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part7Properties() {
  const { language } = useLanguage();
  const [rowOrderReversed, setRowOrderReversed] = useState(false);

  const baseStudents = [
    { id: '101', name: 'Rahim', dept: 'CSE' },
    { id: '102', name: 'Karim', dept: 'BBA' },
    { id: '103', name: 'Nila', dept: 'EEE' },
    { id: '104', name: 'Sami', dept: 'CSE' },
  ];

  const displayedStudents = rowOrderReversed ? [...baseStudents].reverse() : baseStudents;

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৭ / ৯' : 'Part 7 of 9'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="7 Fundamental Properties of a Relational Table"
              bn="একটি রিলেশনাল টেবিলের ৭টি মৌলিক বৈশিষ্ট্য (Core Rules)"
            />
          </h2>
        </div>
      </div>

      <div className="text-xs text-zinc-300 leading-relaxed font-sans">
        <DualText
          en="In relational theory (E.F. Codd's mathematical formulation), a proper relation must satisfy these 7 core rules:"
          bn="রিলেশনাল মডেলের প্রবক্তা ই. এফ. কড (E.F. Codd)-এর গাণিতিক নিয়ম অনুযায়ী, যেকোনো রিলেশনকে অবশ্যই এই ৭টি মৌলিক বৈশিষ্ট্য পূরণ করতে হয়:"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
        {/* Rule 1 */}
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
          <span className="font-bold text-white font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">
              1
            </span>
            <DualText en="Unique Relation Name" bn="অনন্য রিলেশন নাম (Unique Relation Name)" />
          </span>
          <div className="text-zinc-400 text-[11px] leading-snug">
            <DualText
              en="Every table in a database schema must have a distinct, unique name (e.g. STUDENT, COURSE)."
              bn="একটি ডেটাবেস স্কিমায় প্রতিটি টেবিলের নাম সম্পূর্ণ অনন্য ও পৃথক হতে হবে (যেমন: STUDENT, COURSE)।"
            />
          </div>
        </div>

        {/* Rule 2 */}
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
          <span className="font-bold text-white font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">
              2
            </span>
            <DualText en="Unique Attribute Names" bn="অনন্য অ্যাট্রিবিউট নাম (Unique Attribute Names)" />
          </span>
          <div className="text-zinc-400 text-[11px] leading-snug">
            <DualText
              en="No two columns in the same table can share the identical column name."
              bn="একই টেবিলের ভেতরে দুটি কলাম কখনোই একই নামের হতে পারবে না।"
            />
          </div>
        </div>

        {/* Rule 3 */}
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
          <span className="font-bold text-white font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">
              3
            </span>
            <DualText en="Atomic Values (1NF Rule)" bn="পরমাণুসম বা অবিভাজ্য মান (Atomic Values / 1NF)" />
          </span>
          <div className="text-zinc-400 text-[11px] leading-snug">
            <DualText
              en="Each cell contains exactly one indivisible value (e.g. not '0171, 0182' grouped in a single cell)."
              bn="টেবিলের প্রতিটি ঘরে একটিমাত্র অবিভাজ্য মান থাকতে হবে (যেমন: এক ঘরে একাধিক ফোন নম্বর রাখা যাবে না)।"
            />
          </div>
        </div>

        {/* Rule 4 */}
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
          <span className="font-bold text-white font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">
              4
            </span>
            <DualText en="Unique Tuples (No Duplicates)" bn="অনন্য টাপল বা সারি (Unique Tuples)" />
          </span>
          <div className="text-zinc-400 text-[11px] leading-snug">
            <DualText
              en="No two completely identical rows are permitted; rows are distinguished by keys."
              bn="টেবিলে কখনোই দুটি সম্পূর্ণ একইরকম সারি থাকতে পারে না; প্রাইমারি কি দিয়ে তাদের আলাদা করতে হয়।"
            />
          </div>
        </div>

        {/* Rule 5 */}
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
          <span className="font-bold text-white font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">
              5
            </span>
            <DualText en="Uniform Column Domain" bn="একই ডোমেইনের মান (Uniform Column Domain)" />
          </span>
          <div className="text-zinc-400 text-[11px] leading-snug">
            <DualText
              en="Every value in a column must adhere strictly to that column's specified data domain."
              bn="একটি কলামের সকল মানকে অবশ্যই ঐ নির্দিষ্ট কলামের জন্য নির্ধারিত ডেটা ডোমেইন মেনে চলতে হবে।"
            />
          </div>
        </div>

        {/* Rule 6 & 7 */}
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
          <span className="font-bold text-white font-mono flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">
              6 &amp; 7
            </span>
            <DualText
              en="Row & Column Order Doesn't Matter"
              bn="সারি ও কলামের ক্রম তাৎপর্যহীন (Order Independence)"
            />
          </span>
          <div className="text-zinc-400 text-[11px] leading-snug">
            <DualText
              en="Mathematically, a relation is an unordered set. Swapping rows or columns represents the identical relation!"
              bn="গাণিতিক সেটের মতো টেবিলে সারির ক্রম বা কলামের অবস্থান পরিবর্তন করলেও রিলেশনটি অপরিবর্তিত থাকে!"
            />
          </div>
        </div>
      </div>

      {/* Order Shuffle Simulator */}
      <div className="p-4 rounded-xl bg-[#101116] border border-white/[0.08] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-indigo-300 uppercase flex items-center gap-1.5">
            <Shuffle className="w-4 h-4" />
            <DualText
              en="Test Rule 6: Shuffle Row Order (The relation remains unchanged)"
              bn="নিয়ম ৬ পরীক্ষা: সারির ক্রম উল্টে দিন (রিলেশনের কোনো অর্থ পরিবর্তন হয় না)"
            />
          </span>
          <button
            onClick={() => setRowOrderReversed(!rowOrderReversed)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-bold cursor-pointer transition-colors self-start sm:self-auto"
          >
            {rowOrderReversed
              ? language === 'bn'
                ? 'আসল ক্রম ফিরিয়ে আনুন'
                : 'Reset Original Order'
              : language === 'bn'
              ? 'সারির ক্রম উল্টে দিন (Reverse)'
              : 'Reverse / Shuffle Rows'}
          </button>
        </div>

        <div className="overflow-x-auto text-[11px] font-mono">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.08] text-zinc-400">
                <th className="py-1 px-3">Student_ID</th>
                <th className="py-1 px-3">Name</th>
                <th className="py-1 px-3">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08] text-zinc-300">
              {displayedStudents.map((st) => (
                <tr key={st.id}>
                  <td className="py-1 px-3 text-amber-300 font-bold">{st.id}</td>
                  <td className="py-1 px-3">{st.name}</td>
                  <td className="py-1 px-3">{st.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
