'use client';

import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, Trash2, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson8Part2Anomalies() {
  const { language } = useLanguage();
  const [activeAnomaly, setActiveAnomaly] = useState<'insertion' | 'update' | 'deletion'>('insertion');
  const [anomalySimulated, setAnomalySimulated] = useState<boolean>(false);

  return (
    <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
          <AlertOctagon className="w-4 h-4 stroke-[1.5]" />
        </div>
        <div>
          <span className="text-[11px] font-mono text-zinc-400">
            {language === 'bn' ? 'পার্ট ২ • ডেটাবেস অ্যানোমালি' : 'Part 2 of 8'}
          </span>
          <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
            <DualText as="span" en="The 3 Database Anomalies" bn="২. তিনটি প্রধান ডেটাবেস অ্যানোমালি" />
          </h2>
        </div>
      </div>

      <DualText
        as="p"
        className="text-xs text-zinc-400 leading-relaxed font-sans"
        en={<>An <strong className="text-zinc-200 font-medium">anomaly</strong> is a side-effect during insertion, update, or deletion in unnormalized tables. Select an anomaly below to simulate its failure:</>}
        bn={<><strong className="text-zinc-200 font-medium">অ্যানোমালি</strong> হলো অপরিকল্পিত টেবিলে ডেটা ইনসার্ট, আপডেট বা ডিলিট করার সময় সৃষ্ট ত্রুটি। নিচে ক্লিক করে প্রতিটি ত্রুটি সিমুলেট করুন:</>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { id: 'insertion' as const, titleEn: '2.1 Insertion Anomaly', titleBn: '২.১ Insertion অ্যানোমালি', descEn: 'Cannot insert without unrelated data', descBn: 'অন্য ডেটা ছাড়া ইনসার্ট করা যায় না' },
          { id: 'update' as const, titleEn: '2.2 Update Anomaly', titleBn: '২.২ Update অ্যানোমালি', descEn: 'Inconsistent partial batch updates', descBn: 'আংশিক আপডেটে অসঙ্গতি তৈরি হয়' },
          { id: 'deletion' as const, titleEn: '2.3 Deletion Anomaly', titleBn: '২.৩ Deletion অ্যানোমালি', descEn: 'Deleting a row destroys other facts', descBn: 'একটি সারি মুছলে অন্য তথ্যও হারিয়ে যায়' },
        ].map((a) => (
          <button
            key={a.id}
            onClick={() => {
              setActiveAnomaly(a.id);
              setAnomalySimulated(false);
            }}
            className={`p-3 rounded-xl text-left border transition-colors cursor-pointer ${
              activeAnomaly === a.id
                ? 'bg-cyan-500/10 border-cyan-500/40 text-zinc-100'
                : 'bg-[#131824] border-white/[0.08] text-zinc-400 hover:text-zinc-100'
            }`}
          >
            <div className="text-xs font-mono font-medium">{language === 'bn' ? a.titleBn : a.titleEn}</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">{language === 'bn' ? a.descBn : a.descEn}</div>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-4">
        {activeAnomaly === 'insertion' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Insertion Anomaly</span>
              <span className="text-[10px] font-mono text-zinc-400">Scenario: Adding a Brand New Course</span>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans leading-relaxed"
              en={<>The university introduces <code className="text-cyan-300">C03: Artificial Intelligence</code>, but no student has enrolled yet.</>}
              bn={<>বিশ্ববিদ্যালয় <code className="text-cyan-300">C03: Artificial Intelligence</code> নামে নতুন কোর্স চালু করেছে, কিন্তু এখনো কোনো শিক্ষার্থী ভর্তি হয়নি।</>}
            />
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
              Attempt: INSERT INTO Student_Course VALUES (NULL, NULL, &apos;C03&apos;, &apos;AI&apos;);
            </div>
            <button
              onClick={() => setAnomalySimulated(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold cursor-pointer transition-colors"
            >
              {language === 'bn' ? 'ইনসার্ট সিমুলেট করুন' : 'Simulate Insert Operation'}
            </button>
            {anomalySimulated && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs font-mono">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>ERROR 1048 (23000): Column &apos;Student_ID&apos; cannot be null!</span>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-300 font-sans"
                  en="Because Student_ID is part of the Primary Key, it cannot be NULL. You cannot add the course without inventing a fake student."
                  bn="Student_ID প্রাইমারি কি-এর অংশ হওয়ায় NULL হতে পারে না। ভুয়া শিক্ষার্থী ছাড়া নতুন কোর্স যোগ করাই সম্ভব হচ্ছে না!"
                />
                <DualText
                  as="p"
                  className="text-[11px] text-emerald-300 font-sans font-bold"
                  en="✓ Fix: Store courses in an independent Courses table."
                  bn="✓ সমাধান: কোর্সের তথ্য আলাদা Courses টেবিলে রাখুন।"
                />
              </div>
            )}
          </div>
        )}

        {activeAnomaly === 'update' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Update Anomaly</span>
              <span className="text-[10px] font-mono text-zinc-400">Scenario: Renaming &apos;Database&apos; Course</span>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans leading-relaxed"
              en="Course C01 appears in 50 student rows. Renaming it requires updating all 50 rows."
              bn="Course C01 ৫০টি সারিতে আছে। নাম পরিবর্তন করতে হলে ৫০টি সারিই আপডেট করতে হবে।"
            />
            <button
              onClick={() => setAnomalySimulated(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold cursor-pointer transition-colors"
            >
              {language === 'bn' ? 'আংশিক আপডেট সিমুলেট করুন' : 'Simulate Incomplete Batch Update'}
            </button>
            {anomalySimulated && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Data Inconsistency Warning!</span>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-300 font-sans"
                  en="If 49 rows update and row 50 fails, C01 now has two conflicting names across the database."
                  bn="৪৯টি সারি আপডেট হয়ে ৫০তম সারি বাদ পড়লে একই C01 কোর্সের দুটি ভিন্ন নাম দেখাবে!"
                />
                <DualText
                  as="p"
                  className="text-[11px] text-emerald-300 font-sans font-bold"
                  en="✓ Fix: Store course name once in Courses; update 1 row."
                  bn="✓ সমাধান: Courses টেবিলে মাত্র ১টি সারি আপডেট করলেই হবে।"
                />
              </div>
            )}
          </div>
        )}

        {activeAnomaly === 'deletion' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase">Deletion Anomaly</span>
              <span className="text-[10px] font-mono text-zinc-400">Scenario: Karim Drops Networking</span>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans leading-relaxed"
              en={<>Karim (102) is the only student in <code className="text-cyan-300">C02: Networking</code> and drops the semester.</>}
              bn={<>করিম (১০২) <code className="text-cyan-300">C02: Networking</code> কোর্সের একমাত্র শিক্ষার্থী এবং সে সেমিস্টার ড্রপ করেছে।</>}
            />
            <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
              DELETE FROM Student_Course WHERE Student_ID = 102 AND Course_ID = &apos;C02&apos;;
            </div>
            <button
              onClick={() => setAnomalySimulated(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold cursor-pointer transition-colors"
            >
              {language === 'bn' ? 'ডিলিট সিমুলেট করুন' : 'Simulate Row Deletion'}
            </button>
            {anomalySimulated && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs font-mono">
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <span>Catastrophic Data Loss: Networking Course Wiped Out!</span>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-300 font-sans"
                  en="Deleting Karim's row accidentally erased 'Networking' and instructor 'Mr. Karim' from the entire university!"
                  bn="করিমের সারি ডিলিট করার সাথে সাথে 'Networking' কোর্স এবং শিক্ষক 'Mr. Karim'-এর তথ্যও মুছে গেছে!"
                />
                <DualText
                  as="p"
                  className="text-[11px] text-emerald-300 font-sans font-bold"
                  en="✓ Fix: Keep course facts in a dedicated Courses table."
                  bn="✓ সমাধান: কোর্সের তথ্য আলাদা Courses টেবিলে সংরক্ষণ করুন।"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
