'use client';

import React, { useState } from 'react';
import { GitMerge, ListOrdered, Workflow, AlertTriangle, Check, Copy, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const EXEC_STEPS = [
  {
    num: 1,
    name: 'FROM',
    descEn: 'Load base Students table (6 rows)',
    descBn: 'Students টেবিল লোড (৬টি সারি)',
    rowsNote: '6 rows loaded: Rahim (CSE, 3.8), Karim (BBA, 3.4), Sumaiya (CSE, 3.9), Nabila (EEE, 3.2), Tanvir (CSE, 3.5), Ayesha (BBA, 3.7)',
    previewHeaders: ['Name', 'Dept', 'GPA'],
    previewRows: [
      ['Rahim', 'CSE', '3.80'],
      ['Karim', 'BBA', '3.40'],
      ['Sumaiya', 'CSE', '3.90'],
      ['Nabila', 'EEE', '3.20'],
      ['Tanvir', 'CSE', '3.50'],
      ['Ayesha', 'BBA', '3.70'],
    ],
  },
  {
    num: 2,
    name: 'WHERE',
    descEn: 'Filter GPA >= 3.40 (5 rows remain)',
    descBn: 'GPA >= 3.40 ফিল্টার (৫টি সারি বাকি)',
    rowsNote: 'Nabila (3.20) dropped before grouping!',
    previewHeaders: ['Name', 'Dept', 'GPA'],
    previewRows: [
      ['Rahim', 'CSE', '3.80'],
      ['Karim', 'BBA', '3.40'],
      ['Sumaiya', 'CSE', '3.90'],
      ['Tanvir', 'CSE', '3.50'],
      ['Ayesha', 'BBA', '3.70'],
    ],
  },
  {
    num: 3,
    name: 'GROUP BY',
    descEn: 'Group remaining rows by Dept (2 groups)',
    descBn: 'Dept অনুযায়ী গ্রুপিং (২টি গ্রুপ)',
    rowsNote: 'CSE -> 3 students (avg 3.73), BBA -> 2 students (avg 3.55)',
    previewHeaders: ['Dept', 'Count', 'AVG(GPA)'],
    previewRows: [
      ['CSE', '3', '3.73'],
      ['BBA', '2', '3.55'],
    ],
  },
  {
    num: 4,
    name: 'HAVING',
    descEn: 'Keep groups with AVG(GPA) > 3.60',
    descBn: 'AVG(GPA) > 3.60 গ্রুপ রাখা',
    rowsNote: 'BBA (3.55) filtered out; only CSE passes!',
    previewHeaders: ['Dept', 'Count', 'AVG(GPA)'],
    previewRows: [['CSE', '3', '3.73']],
  },
  {
    num: 5,
    name: 'SELECT',
    descEn: 'Project Dept & aliased Avg_GPA',
    descBn: 'Dept ও Avg_GPA কলাম তৈরি',
    rowsNote: 'Alias Avg_GPA is created ONLY at this step.',
    previewHeaders: ['Department', 'Avg_GPA'],
    previewRows: [['CSE', '3.73']],
  },
  {
    num: 6,
    name: 'ORDER BY',
    descEn: 'Sort by Avg_GPA DESC',
    descBn: 'Avg_GPA DESC অনুযায়ী সাজানো',
    rowsNote: 'Aliases from SELECT CAN be used in ORDER BY!',
    previewHeaders: ['Department', 'Avg_GPA'],
    previewRows: [['CSE', '3.73']],
  },
  {
    num: 7,
    name: 'LIMIT',
    descEn: 'Slice top N rows (LIMIT 1)',
    descBn: 'সর্বোচ্চ N সারি নেওয়া',
    rowsNote: 'Final 1-row result returned to client.',
    previewHeaders: ['Department', 'Avg_GPA'],
    previewRows: [['CSE', '3.73']],
  },
];

export default function Lesson7AdvancedJoinsAndOrder() {
  const { language } = useLanguage();
  const [activeProblem, setActiveProblem] = useState<number>(1);
  const [activeExecStep, setActiveExecStep] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const selfJoinSql = `SELECT 
    E.Name AS Employee, 
    COALESCE(M.Name, 'CEO / Top Level') AS Manager
FROM Employees E
LEFT JOIN Employees M 
ON E.Manager_ID = M.Employee_ID;`;

  const crossJoinSql = `-- 2 Colors x 2 Sizes = 4 Cartesian combinations:
SELECT Colors.Color, Sizes.Size 
FROM Colors 
CROSS JOIN Sizes;`;

  const currentExec = EXEC_STEPS.find((s) => s.num === activeExecStep) || EXEC_STEPS[0];

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
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">11.1 SELF JOIN (Hierarchy)</span>
              <button
                onClick={() => handleCopy(selfJoinSql, 'self')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'self' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'self' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans"
              en="Joining a table to itself using two distinct aliases to model hierarchies (e.g. Employee -> Manager)."
              bn="একই টেবিলকে দুটি আলাদা Alias দিয়ে নিজের সাথেই Join করে হায়ারার্কি (যেমন Employee ও Manager) দেখানো।"
            />
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
              {selfJoinSql}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">11.2 CROSS JOIN (Cartesian Product)</span>
              <button
                onClick={() => handleCopy(crossJoinSql, 'cross')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'cross' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'cross' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans"
              en="Produces every possible combination of rows from two tables (N x M rows)."
              bn="দুটি টেবিলের প্রতিটি সারির সম্ভাব্য সব জোড়া তৈরি করে (N x M সংখ্যক সারি)।"
            />
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
              {crossJoinSql}
            </pre>
          </div>
        </div>
      </section>

      {/* PART 12: SQL LOGICAL QUERY EXECUTION ORDER + CASE WHEN */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ListOrdered className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১২ • এক্সিকিউশন অর্ডার ও CASE WHEN' : 'Part 12 • Execution Order & CASE WHEN'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText as="span" en="SQL Logical Execution Order Simulator & CASE WHEN" bn="SQL লজিক্যাল এক্সিকিউশন সিমুলেটর ও CASE WHEN" />
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
            en="FROM and WHERE execute BEFORE SELECT runs. Click any step below to watch how the 6 Students rows shrink through the SQL pipeline:"
            bn="SELECT চলার আগেই FROM এবং WHERE এক্সিকিউট হয়। নিচের যেকোনো ধাপে ক্লিক করে দেখুন ৬টি সারি কীভাবে ফিল্টার ও প্রসেস হয়:"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {EXEC_STEPS.map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveExecStep(s.num)}
              className={`p-3 rounded-xl border text-center space-y-1 cursor-pointer transition-all ${
                activeExecStep === s.num
                  ? 'bg-amber-600/20 border-amber-400 shadow-lg'
                  : 'bg-[#14182d] border-slate-700/60 hover:border-slate-500'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center mx-auto">
                {s.num}
              </span>
              <div className="text-xs font-mono font-bold text-white">{s.name}</div>
              <div className="text-[9px] text-zinc-400">{language === 'bn' ? s.descBn : s.descEn}</div>
            </button>
          ))}
        </div>

        {/* Live Pipeline Stage Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
          <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-amber-300 font-bold">
              Active Stage: {currentExec.num}. {currentExec.name}
            </span>
            <pre className="p-3 rounded bg-[#080b14] text-xs font-mono text-zinc-400 overflow-x-auto leading-relaxed">
              <span className={activeExecStep === 5 ? 'text-emerald-400 font-bold' : ''}>SELECT Department, AVG(GPA) AS Avg_GPA</span>{'\n'}
              <span className={activeExecStep === 1 ? 'text-emerald-400 font-bold' : ''}>FROM Students</span>{'\n'}
              <span className={activeExecStep === 2 ? 'text-emerald-400 font-bold' : ''}>WHERE GPA &gt;= 3.40</span>{'\n'}
              <span className={activeExecStep === 3 ? 'text-emerald-400 font-bold' : ''}>GROUP BY Department</span>{'\n'}
              <span className={activeExecStep === 4 ? 'text-emerald-400 font-bold' : ''}>HAVING AVG(GPA) &gt; 3.60</span>{'\n'}
              <span className={activeExecStep === 6 ? 'text-emerald-400 font-bold' : ''}>ORDER BY Avg_GPA DESC</span>{'\n'}
              <span className={activeExecStep === 7 ? 'text-emerald-400 font-bold' : ''}>LIMIT 1;</span>
            </pre>
            <p className="text-[11px] font-mono text-cyan-300">{currentExec.rowsNote}</p>
          </div>

          <div className="rounded-xl bg-[#14182d] border border-slate-800 overflow-hidden">
            <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-emerald-300 font-bold">
              Pipeline State After {currentExec.name}
            </div>
            <table className="w-full text-xs font-mono text-left">
              <thead className="text-cyan-300 border-b border-slate-800">
                <tr>
                  {currentExec.previewHeaders.map((h) => (
                    <th key={h} className="px-3.5 py-2">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                {currentExec.previewRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-1.5">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CASE WHEN Conditional Logic */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
            <Filter className="w-4 h-4" />
            <DualText
              as="span"
              en="CASE WHEN: Conditional Bucketing & Pivot Counts"
              bn="CASE WHEN: শর্তসাপেক্ষ গ্রুপিং ও পিভট গণনা"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA,
  CASE 
    WHEN GPA >= 3.80 THEN 'Dean List'
    WHEN GPA >= 3.50 THEN 'Honors'
    ELSE 'Standard'
  END AS Standing
FROM Students;`}
            </pre>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-cyan-300 overflow-x-auto">
{`-- Conditional Pivot Aggregation:
SELECT Department,
  SUM(CASE WHEN GPA >= 3.80 THEN 1 ELSE 0 END) AS Dean_Count,
  COUNT(*) AS Total_Students
FROM Students
GROUP BY Department;`}
            </pre>
          </div>
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
