'use client';

import React, { useState } from 'react';
import { Minimize2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson8Part1WhatIsNorm() {
  const { language } = useLanguage();
  const [normalizationView, setNormalizationView] = useState<'unnormalized' | 'normalized'>('unnormalized');

  return (
    <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
          <Minimize2 className="w-4 h-4 stroke-[1.5]" />
        </div>
        <div>
          <span className="text-[11px] font-mono text-zinc-400">
            {language === 'bn' ? 'পার্ট ১ • নরমালাইজেশন পরিচিতি' : 'Part 1 of 8'}
          </span>
          <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
            <DualText as="span" en="What is Database Normalization?" bn="১. ডেটাবেস নরমালাইজেশন কী?" />
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-2">
        <span className="text-xs font-mono font-medium text-cyan-300">
          <DualText as="span" en="Formal definition" bn="মূল সংজ্ঞা" />
        </span>
        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en={<><strong className="text-zinc-100 font-medium">Database Normalization</strong> is the systematic process of organizing and decomposing relational tables to <strong className="text-zinc-100 font-medium">eliminate data redundancy</strong> and prevent <strong className="text-zinc-100 font-medium">insertion, update, and deletion anomalies</strong> while maintaining data integrity.</>}
          bn={<><strong className="text-zinc-100 font-medium">ডেটাবেস নরমালাইজেশন</strong> হলো রিলেশনাল টেবিলগুলোকে সুশৃঙ্খলভাবে ছোট টেবিলে ভাগ করার প্রক্রিয়া, যা <strong className="text-zinc-100 font-medium">ডেটা ডুপ্লিকেসি দূর করে</strong> এবং <strong className="text-zinc-100 font-medium">Insertion, Update ও Deletion অ্যানোমালি</strong> প্রতিরোধ করে।</>}
        />
        <blockquote className="p-3 bg-[#0a0d14] border-l-2 border-cyan-500/60 rounded text-xs text-zinc-300 font-sans mt-2">
          <DualText
            as="span"
            en='"Divide large, poorly organized tables into smaller, well-organized tables and link them losslessly using Primary and Foreign Keys."'
            bn='"বড় ও অগোছালো টেবিলকে ছোট ও নির্দিষ্ট বিষয়ের টেবিলে ভাগ করে Primary ও Foreign Key দিয়ে সংযুক্ত করাই নরমালাইজেশন।"'
          />
        </blockquote>
      </div>

      {/* Before vs After View Switcher */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-medium text-zinc-300">
            <DualText
              as="span"
              en="Visualizing normalization: Monolithic vs Decomposed tables"
              bn="ভিজ্যুয়ালাইজেশন: অপরিকল্পিত বনাম নরমালাইজড টেবিল"
            />
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setNormalizationView('unnormalized')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
                normalizationView === 'unnormalized'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                  : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
              }`}
            >
              {language === 'bn' ? '১. অপরিকল্পিত (Unnormalized)' : '1. Unnormalized'}
            </button>
            <button
              onClick={() => setNormalizationView('normalized')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${
                normalizationView === 'normalized'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
                  : 'bg-[#131824] text-zinc-400 hover:text-zinc-100 border border-white/[0.08]'
              }`}
            >
              {language === 'bn' ? '২. নরমালাইজড (৩টি ক্লিন টেবিল)' : '2. Normalized (3 Clean Tables)'}
            </button>
          </div>
        </div>

        {normalizationView === 'unnormalized' ? (
          <div className="p-5 rounded-2xl bg-[#14182d] border border-rose-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                Student_Course Table (Massive Duplication)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                Violates 2NF &amp; 3NF
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-zinc-300 font-mono">
                  <tr>
                    <th className="py-2 px-3">Student_ID</th>
                    <th className="py-2 px-3">Student_Name</th>
                    <th className="py-2 px-3">Course_ID</th>
                    <th className="py-2 px-3">Course_Name</th>
                    <th className="py-2 px-3">Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-cyan-300">101</td>
                    <td className="py-2 px-3 text-white font-sans">Rahim</td>
                    <td className="py-2 px-3 text-amber-300">C01</td>
                    <td className="py-2 px-3 text-zinc-300">Database</td>
                    <td className="py-2 px-3 text-purple-300">Mr. Hasan</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-cyan-300">101</td>
                    <td className="py-2 px-3 text-rose-400 font-bold font-sans">Rahim (Duplicated!)</td>
                    <td className="py-2 px-3 text-amber-300">C02</td>
                    <td className="py-2 px-3 text-zinc-300">Networking</td>
                    <td className="py-2 px-3 text-purple-300">Mr. Karim</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-cyan-300">102</td>
                    <td className="py-2 px-3 text-white font-sans">Karim</td>
                    <td className="py-2 px-3 text-amber-300">C01</td>
                    <td className="py-2 px-3 text-rose-400 font-bold">Database (Duplicated!)</td>
                    <td className="py-2 px-3 text-rose-400 font-bold">Mr. Hasan (Duplicated!)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-cyan-300">103</td>
                    <td className="py-2 px-3 text-white font-sans">Sumaiya</td>
                    <td className="py-2 px-3 text-amber-300">C01</td>
                    <td className="py-2 px-3 text-rose-400 font-bold">Database (Duplicated!)</td>
                    <td className="py-2 px-3 text-rose-400 font-bold">Mr. Hasan (Duplicated!)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
              <strong>
                <DualText as="span" en="4 Severe Flaws:" bn="৪টি প্রধান সমস্যা:" />
              </strong>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-zinc-300">
                <li><DualText as="span" en="Student names repeat for every enrolled course." bn="প্রতিটি কোর্সের সাথে শিক্ষার্থীর নাম বারবার পুনরাবৃত্তি হচ্ছে।" /></li>
                <li><DualText as="span" en="Course & instructor names repeat for every student." bn="প্রতি শিক্ষার্থীর জন্য কোর্স ও শিক্ষকের নাম বারবার লেখা হচ্ছে।" /></li>
                <li><DualText as="span" en="Updating an instructor risks partial, inconsistent rows." bn="শিক্ষকের নাম বদলাতে গিয়ে কিছু সারি বাদ পড়লে অসঙ্গতি তৈরি হয়।" /></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-900/40 space-y-4">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
              <DualText as="span" en="Clean Normalized Architecture: 3 Focused Tables" bn="পরিচ্ছন্ন নরমালাইজড কাঠামো: ৩টি আলাদা টেবিল" />
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400">1. Students</span>
                <table className="w-full text-[11px] font-mono">
                  <thead className="text-zinc-500 border-b border-slate-800">
                    <tr><th className="py-1 text-left">Student_ID (PK)</th><th className="py-1 text-left">Student_Name</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    <tr><td className="py-1 text-cyan-300">101</td><td className="py-1 text-white font-sans">Rahim</td></tr>
                    <tr><td className="py-1 text-cyan-300">102</td><td className="py-1 text-white font-sans">Karim</td></tr>
                    <tr><td className="py-1 text-cyan-300">103</td><td className="py-1 text-white font-sans">Sumaiya</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400">2. Courses</span>
                <table className="w-full text-[11px] font-mono">
                  <thead className="text-zinc-500 border-b border-slate-800">
                    <tr><th className="py-1 text-left">Course_ID (PK)</th><th className="py-1 text-left">Course_Name</th><th className="py-1 text-left">Instructor</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    <tr><td className="py-1 text-amber-300">C01</td><td className="py-1 text-zinc-300">Database</td><td className="py-1 text-purple-300">Mr. Hasan</td></tr>
                    <tr><td className="py-1 text-amber-300">C02</td><td className="py-1 text-zinc-300">Networking</td><td className="py-1 text-purple-300">Mr. Karim</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400">3. Enrollments (FK)</span>
                <table className="w-full text-[11px] font-mono">
                  <thead className="text-zinc-500 border-b border-slate-800">
                    <tr><th className="py-1 text-left">Student_ID (FK)</th><th className="py-1 text-left">Course_ID (FK)</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    <tr><td className="py-1 text-cyan-300">101</td><td className="py-1 text-amber-300">C01</td></tr>
                    <tr><td className="py-1 text-cyan-300">101</td><td className="py-1 text-amber-300">C02</td></tr>
                    <tr><td className="py-1 text-cyan-300">102</td><td className="py-1 text-amber-300">C01</td></tr>
                    <tr><td className="py-1 text-cyan-300">103</td><td className="py-1 text-amber-300">C01</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <DualText
              as="p"
              className="text-xs text-emerald-300 font-sans"
              en="✓ Every student and course fact is stored exactly once. Duplication eliminated!"
              bn="✓ প্রতিটি শিক্ষার্থী ও কোর্সের তথ্য মাত্র একবার করে সংরক্ষিত। ডুপ্লিকেসি সম্পূর্ণ দূর হয়েছে!"
            />
          </div>
        )}
      </div>
    </section>
  );
}
