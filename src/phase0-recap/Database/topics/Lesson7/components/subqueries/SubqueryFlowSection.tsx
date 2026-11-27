'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Filter,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA } from '../../types';

export default function SubqueryFlowSection() {
  const { language } = useLanguage();
  const [subqueryStep, setSubqueryStep] = useState<number>(1);
  const overallAvgGpa = (STUDENTS_DATA.reduce((acc, s) => acc + s.gpa, 0) / STUDENTS_DATA.length).toFixed(4);

  return (
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২ • সাবকুয়েরি' : 'Part 2 • Subqueries'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Subqueries: Query Inside Another Query"
                bn="Subqueries: একটি কুয়েরির ভেতরে আরেকটি কুয়েরি"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
              <DualText as="span" en="Core Definition" bn="মূল সংজ্ঞা" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 leading-relaxed font-sans"
              en="A subquery (inner/nested query) is a SQL query written inside another query (outer query). The inner query runs first and supplies intermediate data that the outer query uses to filter or compute the final result."
              bn="Subquery (inner বা nested query) হলো অন্য একটি SQL কুয়েরির (outer query) ভেতরে লেখা কুয়েরি। ভেতরের কুয়েরিটি আগে চলে একটি অন্তর্বর্তী ফলাফল তৈরি করে, যা বাইরের কুয়েরি চূড়ান্ত ফলাফল বের করতে ব্যবহার করে।"
            />
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <DualText as="span" en="Why Not WHERE GPA > AVG(GPA)?" bn="কেন WHERE GPA > AVG(GPA) লেখা যায় না?" />
            </span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 leading-relaxed font-sans"
              en="Writing WHERE GPA > AVG(GPA) throws a SQL error because WHERE filters rows before aggregates run. Hardcoding 3.58 also breaks when new students enroll. A subquery solves both dynamically!"
              bn="WHERE GPA > AVG(GPA) লিখলে SQL এরর দেয়, কারণ WHERE অ্যাগ্রিগেট ফাংশনের আগে চলে। আবার 3.58 হার্ডকোড করলে নতুন ডেটা এলে ভুল হবে। Subquery ডায়নামিকভাবে সমস্যার সমাধান করে!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-cyan-400">1. Inside WHERE</span>
            <DualText as="p" className="text-[11px] text-zinc-400" en="Filter rows dynamically (most common)." bn="ডায়নামিকভাবে সারি ফিল্টার করতে (সবচেয়ে বেশি ব্যবহৃত)।" />
          </div>
          <div className="p-3 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-purple-400">2. Inside SELECT</span>
            <DualText as="p" className="text-[11px] text-zinc-400" en="Show a computed scalar column per row." bn="প্রতি সারির পাশে হিসাবকৃত মান দেখাতে।" />
          </div>
          <div className="p-3 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
            <span className="font-mono font-bold text-emerald-400">3. Inside FROM</span>
            <DualText as="p" className="text-[11px] text-zinc-400" en="Treat query output as a temporary derived table." bn="কুয়েরির আউটপুটকে অস্থায়ী টেবিল হিসেবে ব্যবহার করতে।" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              <DualText
                as="span"
                en="Example: Find Students with GPA > Average GPA"
                bn="উদাহরণ: গড় GPA-এর চেয়ে বেশি GPA পাওয়া শিক্ষার্থী খুঁজুন"
              />
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSubqueryStep(1)}
                className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                  subqueryStep === 1 ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'ধাপ ১: Inner Query' : 'Step 1: Inner Query'}
              </button>
              <button
                onClick={() => setSubqueryStep(2)}
                className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                  subqueryStep === 2 ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'ধাপ ২: মান প্রতিস্থাপন' : 'Step 2: Value Handoff'}
              </button>
              <button
                onClick={() => setSubqueryStep(3)}
                className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                  subqueryStep === 3 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'ধাপ ৩: Outer Filter' : 'Step 3: Outer Filter'}
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
            {subqueryStep === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    <DualText as="span" en="Step 1: Inner Query Evaluates First" bn="ধাপ ১: Inner Query আগে চলে" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    <DualText as="span" en="Computes Scalar Average" bn="গড় মান হিসাব করে" />
                  </span>
                </div>
                <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400">
{`SELECT AVG(GPA) FROM Students;`}
                </pre>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-zinc-300 font-mono">
                    (3.80 + 3.40 + 3.90 + 3.20 + 3.50 + 3.70) / 6 =
                  </span>
                  <span className="text-sm font-mono font-bold text-cyan-300 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                    {overallAvgGpa}
                  </span>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 font-sans"
                  en="The database evaluates the inner query first and gets a single number: 3.5833."
                  bn="ডেটাবেস প্রথমে ভেতরের কুয়েরি চালিয়ে একটি একক মান (3.5833) বের করে।"
                />
              </div>
            )}

            {subqueryStep === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-400">
                    <DualText as="span" en="Step 2: Inner Query Replaced by Result" bn="ধাপ ২: Subquery-র বদলে মান বসানো হয়" />
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">Dynamic Substitution</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase">Before (What you write):</span>
                    <pre className="text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students
WHERE GPA > (
  SELECT AVG(GPA) FROM Students
);`}
                    </pre>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-purple-500/40 space-y-1">
                    <span className="text-[10px] text-purple-300 uppercase">After (What SQL runs):</span>
                    <pre className="text-cyan-300 overflow-x-auto">
{`SELECT * FROM Students
WHERE GPA > ${overallAvgGpa};`}
                    </pre>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 font-sans"
                  en="Notice how the entire inner query disappears and turns into the plain threshold 3.5833."
                  bn="লক্ষ্য করুন, পুরো inner query-টি মুছে গিয়ে তার জায়গায় সরাসরি 3.5833 বসে গেছে।"
                />
              </div>
            )}

            {subqueryStep === 3 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    <DualText as="span" en="Step 3: Outer Query Filters Every Row" bn="ধাপ ৩: Outer Query প্রতিটি সারি যাচাই করে" />
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Threshold: GPA &gt; {overallAvgGpa}</span>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-zinc-300 font-mono">
                      <tr>
                        <th className="py-2 px-3">Student_ID</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Department</th>
                        <th className="py-2 px-3">GPA</th>
                        <th className="py-2 px-3 text-right">Condition (&gt; {overallAvgGpa})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {STUDENTS_DATA.map(s => {
                        const passed = s.gpa > parseFloat(overallAvgGpa);
                        return (
                          <tr key={s.id} className={passed ? 'bg-emerald-500/5' : 'opacity-45 bg-rose-500/5'}>
                            <td className="py-1.5 px-3 font-mono text-cyan-300">{s.id}</td>
                            <td className="py-1.5 px-3 text-white font-medium">{s.name}</td>
                            <td className="py-1.5 px-3 font-mono text-zinc-300">{s.dept}</td>
                            <td className="py-1.5 px-3 font-mono font-bold text-emerald-400">{s.gpa.toFixed(2)}</td>
                            <td className="py-1.5 px-3 text-right font-mono">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                passed
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              }`}>
                                {passed ? 'Kept' : 'Filtered Out'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
  );
}
