'use client';

import React from 'react';
import {
  Filter,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function SubqueryOperatorsSection() {
  const { language } = useLanguage();

  return (
      <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Filter className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ৪ ও ৫ • IN, EXISTS ও NULL ফাঁদ' : 'Part 4 & 5 • IN, EXISTS & NULL Trap'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="IN, NOT IN, EXISTS, NOT EXISTS & The NULL Trap"
                bn="IN, NOT IN, EXISTS, NOT EXISTS এবং NULL ফাঁদ"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#131824] border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono font-medium text-cyan-300">IN / NOT IN</span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans leading-relaxed"
              en="Checks whether a scalar value exists inside a returned list or subquery result set."
              bn="একটি নির্দিষ্ট মান প্রদত্ত তালিকা বা subquery-এর ফলাফলের ভেতর আছে কিনা যাচাই করে।"
            />
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Students not enrolled in DBMS:
SELECT Name FROM Students
WHERE Student_ID NOT IN (
    SELECT Student_ID FROM Enrollments 
    WHERE Course_ID = 'C01'
);`}
            </pre>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-2">
              <strong className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <DualText as="span" en="Warning: The NULL Trap with NOT IN!" bn="সতর্কতা: NOT IN-এর NULL ফাঁদ!" />
              </strong>
              <DualText
                as="p"
                className="text-[11px] text-zinc-300"
                en="If the subquery returns even one NULL value, NOT IN evaluates to UNKNOWN for all records and returns 0 rows! Always prefer NOT EXISTS for anti-matching (excluding unmatched rows)."
                bn="Subquery থেকে একটি মাত্র NULL মান এলেও NOT IN পুরো শর্তকে UNKNOWN করে দেয় এবং ০টি সারি দেখায়! তাই নিরাপদে অমিল সারি বাদ দিতে (anti-matching) সর্বদা NOT EXISTS ব্যবহার করুন।"
              />
              <div className="p-2.5 rounded-lg bg-black/50 border border-rose-500/20 font-mono text-[11px] space-y-1 text-zinc-300">
                <div><span className="text-zinc-400">Suppose subquery returns:</span> <span className="text-amber-300">[101, 102, NULL]</span></div>
                <div><span className="text-zinc-400">Check for 104:</span> 104 != 101 <span className="text-cyan-400">AND</span> 104 != 102 <span className="text-cyan-400">AND</span> <span className="text-rose-400">104 != NULL (UNKNOWN!)</span></div>
                <div><span className="text-zinc-400">Result:</span> <span className="text-rose-400 font-bold">TRUE AND TRUE AND UNKNOWN =&gt; UNKNOWN (0 rows!)</span></div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">EXISTS / NOT EXISTS</span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans leading-relaxed"
              en="Returns a pure boolean (TRUE/FALSE). Does not retrieve data rows; stops scanning the instant the first match is found!"
              bn="এটি সরাসরি বুলিয়ান (TRUE/FALSE) ফেরত দেয়। পুরো ডেটা না এনে প্রথম মিল পাওয়ার সাথে সাথেই স্ক্যান থামিয়ে দেয়।"
            />
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Find students who have NEVER enrolled in any course:
SELECT S.Name FROM Students S
WHERE NOT EXISTS (
    SELECT 1 FROM Enrollments E
    WHERE E.Student_ID = S.Student_ID
);`}
            </pre>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <DualText as="span" en="Why SELECT 1 inside EXISTS?" bn="EXISTS-এর ভেতরে SELECT 1 কেন লেখা হয়?" />
              </strong>
              <DualText
                as="p"
                className="text-[11px] text-zinc-300"
                en="SELECT 1 is a standard SQL convention. The optimizer ignores column values and only checks whether at least one matching row exists."
                bn="SELECT 1 একটি প্রচলিত SQL রীতি। অপটিমাইজার কলামের মান না দেখে শুধু অন্তত একটি সারি বিদ্যমান আছে কিনা তা যাচাই করে।"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3"><DualText as="span" en="Feature" bn="বৈশিষ্ট্য" /></th>
                <th className="py-2.5 px-3">IN</th>
                <th className="py-2.5 px-3">EXISTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">
                  <DualText as="span" en="Evaluation" bn="কাজের ধরন" />
                </td>
                <td className="py-2 px-3 text-zinc-300">
                  <DualText as="span" en="Compares discrete column values" bn="কলামের প্রতিটি মানের সাথে তুলনা করে" />
                </td>
                <td className="py-2 px-3 text-zinc-300">
                  <DualText as="span" en="Checks existence of at least 1 row" bn="অন্তত ১টি সারির অস্তিত্ব যাচাই করে" />
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">
                  <DualText as="span" en="Correlation" bn="নির্ভরশীলতা" />
                </td>
                <td className="py-2 px-3 text-zinc-300">
                  <DualText as="span" en="Often independent subquery" bn="সাধারণত স্বাধীন subquery" />
                </td>
                <td className="py-2 px-3 text-zinc-300">
                  <DualText as="span" en="Almost always correlated" bn="প্রায়ই correlated subquery" />
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">
                  <DualText as="span" en="NULL Safety" bn="NULL নিরাপত্তা" />
                </td>
                <td className="py-2 px-3 text-rose-400 font-semibold">
                  <DualText as="span" en="Breaks with NULL in NOT IN" bn="NOT IN-এ NULL থাকলে ভেঙে যায়" />
                </td>
                <td className="py-2 px-3 text-emerald-400 font-semibold">
                  <DualText as="span" en="100% NULL-safe" bn="১০০% NULL-নিরাপদ" />
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">
                  <DualText as="span" en="Best Use Case" bn="সেরা ব্যবহার" />
                </td>
                <td className="py-2 px-3 text-zinc-300">
                  <DualText as="span" en="Small static list: IN ('CSE', 'EEE')" bn="ছোট স্থির তালিকা: IN ('CSE', 'EEE')" />
                </td>
                <td className="py-2 px-3 text-zinc-300">
                  <DualText as="span" en="Large indexed tables" bn="বড় ইনডেক্সড টেবিল" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
  );
}
