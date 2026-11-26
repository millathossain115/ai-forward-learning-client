'use client';

import React, { useState } from 'react';
import {
  Terminal,
  Layers,
  Filter,
  Sliders,
  Zap,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA, DEPT_AVERAGES } from '../types';

export default function Lesson7Subqueries() {
  const { language } = useLanguage();
  const [subqueryStep, setSubqueryStep] = useState<number>(1);
  const [activeSubqueryType, setActiveSubqueryType] = useState<'single' | 'multiple_row' | 'multiple_col' | 'correlated'>('single');
  const [anyAllOperator, setAnyAllOperator] = useState<'ANY' | 'ALL'>('ANY');
  const [correlatedActiveStudentIdx, setCorrelatedActiveStudentIdx] = useState<number>(0);

  const overallAvgGpa = (STUDENTS_DATA.reduce((acc, s) => acc + s.gpa, 0) / STUDENTS_DATA.length).toFixed(4);
  const currentCorrelatedStudent = STUDENTS_DATA[correlatedActiveStudentIdx];
  const currentDeptAvg = DEPT_AVERAGES[currentCorrelatedStudent.dept];
  const isCorrelatedQualified = currentCorrelatedStudent.gpa > currentDeptAvg;

  return (
    <>
      {/* PART 2: SUBQUERIES & EXECUTION FLOW */}
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

      {/* PART 3: TYPES OF SUBQUERIES */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৩ • সাবকুয়েরির ধরন' : 'Part 3 • Subquery Types'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="4 Types of Subqueries: Single-Row, Multi-Row, Multi-Column & Correlated"
                bn="৪ ধরনের Subquery: Single-Row, Multi-Row, Multi-Column ও Correlated"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'single', label: '3.1 Single-Row', descEn: 'Returns 1 scalar value', descBn: 'মাত্র ১টি মান ফেরত দেয়' },
            { id: 'multiple_row', label: '3.2 Multiple-Row', descEn: '1 column, multiple rows', descBn: '১ কলাম, একাধিক সারি' },
            { id: 'multiple_col', label: '3.3 Multi-Column', descEn: 'Row-value tuple match', descBn: 'একাধিক কলামের টাপল তুলনা' },
            { id: 'correlated', label: '3.4 Correlated', descEn: 'Depends on outer row', descBn: 'বাইরের সারির ওপর নির্ভরশীল' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubqueryType(t.id as 'single' | 'multiple_row' | 'multiple_col' | 'correlated')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeSubqueryType === t.id
                  ? 'bg-purple-600/20 border-purple-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{t.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                {language === 'bn' ? t.descBn : t.descEn}
              </div>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeSubqueryType === 'single' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Single-Row Subquery" bn="Single-Row Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Returns exactly one row (scalar value). Evaluated using standard comparison operators (=, >, <, >=, <=, <>)."
                bn="ঠিক একটি সারি (একক মান) ফেরত দেয়। সাধারণ তুলনামূলক অপারেটর (=, >, <, >=, <=, <>) দিয়ে ব্যবহার হয়।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA 
FROM Students 
WHERE GPA > (SELECT AVG(GPA) FROM Students);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'multiple_row' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Multiple-Row Subquery" bn="Multiple-Row Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Returns a list of values. Must be paired with set operators (IN, NOT IN, ANY, ALL, EXISTS)."
                bn="একাধিক মানের তালিকা ফেরত দেয়। তাই IN, NOT IN, ANY, ALL বা EXISTS অপারেটর ব্যবহার করতে হয়।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Find all students enrolled in DBMS (Course C01):
SELECT Name FROM Students 
WHERE Student_ID IN (
    SELECT Student_ID FROM Enrollments WHERE Course_ID = 'C01'
);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'multiple_col' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Multiple-Column Subquery" bn="Multiple-Column Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Compares multiple column values simultaneously as a tuple. Supported by MySQL, PostgreSQL, and Oracle."
                bn="একসাথে একাধিক কলামের মান টাপল হিসেবে তুলনা করে। MySQL, PostgreSQL এবং Oracle-এ সাপোর্টেড।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Student_ID, Name, GPA FROM Students
WHERE (Student_ID, GPA) IN (
    SELECT Student_ID, GPA FROM Students WHERE Department = 'CSE'
);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'correlated' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Correlated Subquery" bn="Correlated Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="The inner query references a column from the outer query table, executing once for every single candidate row."
                bn="ভেতরের কুয়েরিটি বাইরের কুয়েরির কলাম রেফার করে এবং বাইরের প্রতিটি সারির জন্য আলাদাভাবে রান হয়।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT S.Name, S.GPA FROM Students S
WHERE S.GPA > (
    SELECT AVG(S2.GPA) FROM Students S2 
    WHERE S2.Department = S.Department
);`}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* PART 4 & 5: IN, NOT IN, EXISTS & THE NULL TRAP */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Filter className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৪ ও ৫ • IN, EXISTS ও NULL ফাঁদ' : 'Part 4 & 5 • IN, EXISTS & NULL Trap'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="IN, NOT IN, EXISTS, NOT EXISTS & The Dangerous NULL Trap"
                bn="IN, NOT IN, EXISTS, NOT EXISTS এবং বিপজ্জনক NULL ফাঁদ"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">IN / NOT IN</span>
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
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <DualText as="span" en="Warning: The NULL Trap with NOT IN!" bn="সতর্কতা: NOT IN-এর NULL ফাঁদ!" />
              </strong>
              <DualText
                as="p"
                className="text-[11px] text-zinc-300"
                en="If the subquery returns even one NULL value, NOT IN evaluates to UNKNOWN for all records and returns 0 rows! Always prefer NOT EXISTS for anti-matching."
                bn="Subquery থেকে একটি মাত্র NULL মান এলেও NOT IN পুরো শর্তকে UNKNOWN করে দেয় এবং ০টি সারি দেখায়! তাই নিরাপদ থাকতে সর্বদা NOT EXISTS ব্যবহার করুন।"
              />
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

      {/* PART 6: ANY AND ALL OPERATORS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৬ • ANY এবং ALL' : 'Part 6 • ANY & ALL'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText as="span" en="ANY and ALL Comparison Operators" bn="ANY এবং ALL তুলনামূলক অপারেটর" />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="ANY (equivalent to SOME) and ALL modify relational comparison operators (>, <, >=, <=, =) when comparing against a subquery result list."
          bn="Subquery থেকে আসা একাধিক মানের তালিকার সাথে তুলনা করতে >, <, >=, <=, = অপারেটরের সাথে ANY বা ALL ব্যবহৃত হয়।"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAnyAllOperator('ANY')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              anyAllOperator === 'ANY'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            GPA &gt; ANY (BBA GPAs)
          </button>
          <button
            onClick={() => setAnyAllOperator('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              anyAllOperator === 'ALL'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            GPA &gt; ALL (BBA GPAs)
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
            <span>Inner Subquery: </span>
            <span className="text-amber-300">SELECT GPA FROM Students WHERE Department = &apos;BBA&apos;</span>
            <span className="text-emerald-400 font-bold ml-2">=&gt; [3.40, 3.70]</span>
          </div>

          {anyAllOperator === 'ANY' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">GPA &gt; ANY [3.40, 3.70]</span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText as="span" en="Equivalent: GPA > 3.40 OR GPA > 3.70 (GPA > MIN)" bn="অর্থ: GPA > 3.40 অথবা GPA > 3.70 (সর্বনিম্নের চেয়ে বড়)" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="Any student whose GPA is higher than at least one BBA student qualifies."
                bn="যেকোনো শিক্ষার্থীর GPA যদি BBA-এর অন্তত একজনের চেয়ে বেশি হয়, তবেই সে নির্বাচিত হবে।"
              />
              <div className="p-3 rounded bg-black/50 text-xs font-mono text-emerald-400">
                Qualified: Sumaiya (3.90), Rahim (3.80), Ayesha (3.70), Tanvir (3.50)
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase">GPA &gt; ALL [3.40, 3.70]</span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText as="span" en="Equivalent: GPA > 3.40 AND GPA > 3.70 (GPA > MAX)" bn="অর্থ: GPA > 3.40 এবং GPA > 3.70 (সর্বোচ্চের চেয়ে বড়)" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="A student's GPA must exceed every single BBA student (strictly > 3.70)."
                bn="শিক্ষার্থীর GPA অবশ্যই BBA-এর প্রতিটি শিক্ষার্থীর চেয়ে (অর্থাৎ 3.70-এর চেয়ে) বেশি হতে হবে।"
              />
              <div className="p-3 rounded bg-black/50 text-xs font-mono text-emerald-400">
                Qualified: Sumaiya (3.90), Rahim (3.80)
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PART 7: CORRELATED SUBQUERIES */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৭ • কোরিলেটেড সাবকুয়েরি' : 'Part 7 • Correlated Subqueries'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Correlated Subqueries: Row-by-Row Execution Tracer"
                bn="Correlated Subqueries: সারি ধরে ধরে এক্সিকিউশন ট্রেসার"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="A correlated subquery cannot run alone. It takes the current outer row value as input, computes the matching department average, and compares them:"
          bn="Correlated subquery একা চলতে পারে না। এটি বাইরের বর্তমান সারির মান ইনপুট নিয়ে সংশ্লিষ্ট ডিপার্টমেন্টের গড় হিসাব করে এবং তুলনা করে:"
        />

        <pre className="p-3 rounded-lg bg-black/60 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Find students with GPA higher than their own department's average:
SELECT S.Name, S.Department, S.GPA 
FROM Students S
WHERE S.GPA > (
    SELECT AVG(S2.GPA) 
    FROM Students S2 
    WHERE S2.Department = S.Department  -- Correlated link!
);`}
        </pre>

        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            <DualText
              as="span"
              en="Click a Student to Trace Outer vs Inner Execution:"
              bn="Outer ও Inner কুয়েরির ধাপ দেখতে একজন শিক্ষার্থী বেছে নিন:"
            />
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STUDENTS_DATA.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCorrelatedActiveStudentIdx(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  correlatedActiveStudentIdx === idx
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                    : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold font-mono">{s.name}</div>
                <div className="text-[10px] text-zinc-400">{s.dept} • GPA {s.gpa.toFixed(2)}</div>
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-900/40 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                  <DualText as="span" en="1. Outer Query Current Row (S):" bn="১. Outer Query বর্তমান সারি (S):" />
                </span>
                <div className="text-sm font-bold text-white font-mono">
                  {currentCorrelatedStudent.name} (ID: {currentCorrelatedStudent.id}, Dept: {currentCorrelatedStudent.dept}, GPA: {currentCorrelatedStudent.gpa.toFixed(2)})
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  <DualText as="span" en="2. Inner Query Dept Average (S2):" bn="২. Inner Query ডিপার্টমেন্ট গড় (S2):" />
                </span>
                <div className="text-sm font-bold text-cyan-300 font-mono">
                  {currentCorrelatedStudent.dept} Avg = {currentDeptAvg.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="font-mono text-xs">
                <span>Comparison: </span>
                <span className="text-white font-bold">{currentCorrelatedStudent.gpa.toFixed(2)}</span>
                <span> &gt; </span>
                <span className="text-cyan-300 font-bold">{currentDeptAvg.toFixed(4)}</span>
              </div>
              <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                isCorrelatedQualified
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {isCorrelatedQualified
                  ? (language === 'bn' ? 'নির্বাচিত (আউটপুটে থাকবে)' : 'Qualified (Included in Output)')
                  : (language === 'bn' ? 'বাদ পড়েছে (শর্ত পূরণ করেনি)' : 'Disqualified (Filtered Out)')}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
