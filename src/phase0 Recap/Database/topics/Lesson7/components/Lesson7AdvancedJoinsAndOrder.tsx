'use client';

import React, { useState } from 'react';
import { GitMerge, ListOrdered, Workflow, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson7AdvancedJoinsAndOrder() {
  const { language } = useLanguage();
  const [activeProblem, setActiveProblem] = useState<number>(1);

  return (
    <>
      {/* PART 11: ADVANCED JOIN PRACTICE (SELF JOIN & CROSS JOIN) */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১১ • SELF ও CROSS JOIN' : 'Part 11 • SELF & CROSS JOIN'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Advanced JOIN Practice: SELF JOIN & CROSS JOIN"
                bn="অ্যাডভান্সড JOIN অনুশীলন: SELF JOIN ও CROSS JOIN"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">11.1 SELF JOIN (Hierarchy)</span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans"
              en="Joining a table to itself using two distinct aliases to model hierarchies (e.g. Employee -> Manager)."
              bn="একই টেবিলকে দুটি আলাদা Alias দিয়ে নিজের সাথেই Join করে হায়ারার্কি (যেমন Employee ও Manager) দেখানো।"
            />
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT 
    E.Name AS Employee, 
    COALESCE(M.Name, 'CEO / Top Level') AS Manager
FROM Employees E
LEFT JOIN Employees M 
ON E.Manager_ID = M.Employee_ID;`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">11.2 CROSS JOIN (Cartesian Product)</span>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans"
              en="Produces every possible combination of rows from two tables (N x M rows)."
              bn="দুটি টেবিলের প্রতিটি সারির সম্ভাব্য সব জোড়া তৈরি করে (N x M সংখ্যক সারি)।"
            />
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- 2 Colors x 2 Sizes = 4 Cartesian combinations:
SELECT Colors.Color, Sizes.Size 
FROM Colors 
CROSS JOIN Sizes;`}
            </pre>
          </div>
        </div>
      </section>

      {/* PART 12: SQL LOGICAL QUERY EXECUTION ORDER */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ListOrdered className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১২ • এক্সিকিউশন অর্ডার' : 'Part 12 • Execution Order'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText as="span" en="SQL Logical Query Execution Order" bn="SQL কুয়েরির লজিক্যাল এক্সিকিউশন অর্ডার" />
            </h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1">
          <strong className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <DualText
              as="span"
              en="Why You Cannot Use a SELECT Alias in WHERE:"
              bn="কেন WHERE ক্লজে SELECT-এর Alias ব্যবহার করা যায় না:"
            />
          </strong>
          <DualText
            as="p"
            className="text-[11px] text-zinc-300 font-sans"
            en="FROM and WHERE execute BEFORE SELECT runs. So an alias created in SELECT (like AVG(GPA) AS Avg_GPA) does not exist yet when WHERE runs!"
            bn="SELECT চলার আগেই FROM এবং WHERE এক্সিকিউট হয়। তাই SELECT-এ তৈরি করা কোনো Alias (যেমন Avg_GPA) WHERE চালানোর সময় অস্তিত্বেই থাকে না!"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { num: 1, name: 'FROM', descEn: 'Identify table & joins', descBn: 'টেবিল ও জয়েন নির্ধারণ' },
            { num: 2, name: 'WHERE', descEn: 'Filter individual rows', descBn: 'একক সারি ফিল্টার' },
            { num: 3, name: 'GROUP BY', descEn: 'Aggregate rows', descBn: 'সারি গ্রুপিং' },
            { num: 4, name: 'HAVING', descEn: 'Filter summary groups', descBn: 'গ্রুপ ফিল্টার' },
            { num: 5, name: 'SELECT', descEn: 'Compute projections', descBn: 'কলাম নির্বাচন' },
            { num: 6, name: 'DISTINCT', descEn: 'Remove duplicates', descBn: 'ডুপ্লিকেট বাদ' },
            { num: 7, name: 'ORDER BY', descEn: 'Sort result set', descBn: 'ফলাফল সাজানো' },
            { num: 8, name: 'LIMIT', descEn: 'Slice row bounds', descBn: 'সারির সীমা নির্ধারণ' },
          ].map(s => (
            <div
              key={s.num}
              className="p-3 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1"
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center mx-auto">
                {s.num}
              </span>
              <div className="text-xs font-mono font-bold text-white">{s.name}</div>
              <div className="text-[9px] text-zinc-400">{language === 'bn' ? s.descBn : s.descEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PART 13: ADVANCED PROBLEM SOLVING & RELATIONAL DIVISION */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৩ • রিলেশনাল ডিভিশন ও সমস্যা সমাধান' : 'Part 13 • Problem Solving'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Advanced Problem Solving & Relational Division"
                bn="অ্যাডভান্সড সমস্যা সমাধান ও Relational Division"
              />
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 1, titleEn: '2nd Highest GPA', titleBn: '২য় সর্বোচ্চ GPA' },
            { id: 2, titleEn: 'Highest GPA Student', titleBn: 'সর্বোচ্চ GPA শিক্ষার্থী' },
            { id: 3, titleEn: 'Depts with >1 Student', titleBn: '১+ শিক্ষার্থীযুক্ত Dept' },
            { id: 4, titleEn: 'Unenrolled Students', titleBn: 'কোর্স না নেওয়া শিক্ষার্থী' },
            { id: 5, titleEn: 'Relational Division (ALL Courses)', titleBn: 'সব কোর্স নেওয়া শিক্ষার্থী' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProblem(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                activeProblem === p.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {language === 'bn' ? p.titleBn : p.titleEn}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeProblem === 1 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Problem 1: Find the 2nd Highest GPA" bn="সমস্যা ১: ২য় সর্বোচ্চ GPA নির্ণয়" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT MAX(GPA) AS Second_Highest_GPA 
FROM Students
WHERE GPA < (SELECT MAX(GPA) FROM Students);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="Inner query finds 3.90 (highest). Outer query finds max GPA strictly below 3.90 => 3.80 (Rahim)."
                bn="ভেতরের কুয়েরি সর্বোচ্চ মান 3.90 বের করে। বাইরের কুয়েরি 3.90-এর চেয়ে ছোট সর্বোচ্চ মান => 3.80 (Rahim) বের করে।"
              />
            </div>
          )}

          {activeProblem === 2 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Problem 2: Find Student(s) with Highest GPA" bn="সমস্যা ২: সর্বোচ্চ GPA পাওয়া শিক্ষার্থী" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA FROM Students
WHERE GPA = (SELECT MAX(GPA) FROM Students);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="Returns Sumaiya (3.90). Handles ties cleanly if multiple students share the top GPA."
                bn="Sumaiya (3.90) রিটার্ন করে। একাধিক শিক্ষার্থীর সর্বোচ্চ GPA সমান হলেও সবাইকে দেখাবে।"
              />
            </div>
          )}

          {activeProblem === 3 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Problem 3: Find Departments with > 1 Student" bn="সমস্যা ৩: ১ জনের বেশি শিক্ষার্থী থাকা ডিপার্টমেন্ট" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Department, COUNT(*) AS Total_Students
FROM Students
GROUP BY Department
HAVING COUNT(*) > 1;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="Returns CSE (3 students) and BBA (2 students). EEE (1 student) is filtered out by HAVING."
                bn="CSE (৩ জন) ও BBA (২ জন) রিটার্ন করে। EEE (১ জন) HAVING দ্বারা বাদ পড়ে।"
              />
            </div>
          )}

          {activeProblem === 4 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Problem 4: Find Students Not Enrolled in Any Course" bn="সমস্যা ৪: কোনো কোর্সে এনরোল না করা শিক্ষার্থী" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT S.Name FROM Students S
WHERE NOT EXISTS (
    SELECT 1 FROM Enrollments E 
    WHERE E.Student_ID = S.Student_ID
);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-300"
                en="Checks if a student has zero matching rows in Enrollments (returns empty if all students have >=1 course)."
                bn="Enrollments টেবিলে কোনো সারি নেই এমন শিক্ষার্থী খোঁজে (সবাই অন্তত ১টি কোর্সে থাকলে খালি রিটার্ন করে)।"
              />
            </div>
          )}

          {activeProblem === 5 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">
                  <DualText as="span" en="Problem 5: Relational Division (Double NOT EXISTS)" bn="সমস্যা ৫: রিলেশনাল ডিভিশন (Double NOT EXISTS)" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  {language === 'bn' ? 'গুরুত্বপূর্ণ টপিক' : 'Crucial Topic'}
                </span>
              </div>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Find students enrolled in EVERY course offered in Courses table:
SELECT S.Name FROM Students S
WHERE NOT EXISTS (
    SELECT 1 FROM Courses C
    WHERE NOT EXISTS (
        SELECT 1 FROM Enrollments E
        WHERE E.Student_ID = S.Student_ID
          AND E.Course_ID = C.Course_ID
    )
);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-300 leading-relaxed font-sans"
                en='Relational Division Logic: "Find a student S for whom there does NOT exist any course C that student S has NOT enrolled in."'
                bn='রিলেশনাল ডিভিশন যুক্তি: "এমন শিক্ষার্থী S খোঁজো যার জন্য এমন কোনো কোর্স C নেই যাতে S এনরোল করেনি।"'
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
