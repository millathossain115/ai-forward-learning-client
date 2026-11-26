'use client';

import React, { useState, useMemo } from 'react';
import {
  Hash,
  Database,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Sparkles,
  Layers,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  GraduationCap,
  Users,
  Trophy,
  Calendar,
  Calculator
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { INITIAL_STUDENTS } from '../types';

type StepNumber = 1 | 2 | 3 | 4;
type AggregateType = 'COUNT' | 'AVG' | 'MAX' | 'MIN' | 'SUM';
type HavingFilter = 'NONE' | 'COUNT_GE_2' | 'AVG_GE_36';

export default function Lesson6Part15AggregatesGroupBy() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [activeAgg, setActiveAgg] = useState<AggregateType>('AVG');
  const [havingFilter, setHavingFilter] = useState<HavingFilter>('COUNT_GE_2');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Step 2 Calculations
  const ages = useMemo(() => INITIAL_STUDENTS.map(s => s.age), []);
  const gpas = useMemo(() => INITIAL_STUDENTS.map(s => s.gpa), []);

  const aggInfo = useMemo(() => {
    switch (activeAgg) {
      case 'COUNT':
        return {
          titleEn: 'COUNT(*): Count All Matching Rows',
          titleBn: 'COUNT(*): মোট সারির সংখ্যা গণনা',
          calcEn: 'Counts every row in the table: 1 + 1 + 1 + 1 + 1 + 1 = 6',
          calcBn: 'টেবিলের প্রতিটি সারি গণনা করে: ১ + ১ + ১ + ১ + ১ + ১ = ৬',
          result: '6 Students',
          sql: 'SELECT COUNT(*) AS total_students FROM Students;',
          targetCol: 'all'
        };
      case 'AVG':
        return {
          titleEn: 'AVG(GPA): Calculate Arithmetic Mean',
          titleBn: 'AVG(GPA): গাণিতিক গড় নির্ণয়',
          calcEn: '(3.80 + 3.45 + 3.92 + 3.60 + 3.20 + 3.85) ÷ 6 = 3.64',
          calcBn: '(৩.৮০ + ৩.৪৫ + ৩.৯২ + ৩.৬০ + ৩.২০ + ৩.৮৫) ÷ ৬ = ৩.৬৪',
          result: '3.64 Avg GPA',
          sql: 'SELECT ROUND(AVG(GPA), 2) AS avg_gpa FROM Students;',
          targetCol: 'gpa'
        };
      case 'MAX':
        return {
          titleEn: 'MAX(GPA): Find Highest Value',
          titleBn: 'MAX(GPA): সর্বোচ্চ মান খুঁজে বের করা',
          calcEn: 'Scans all GPAs: highest is 3.92 (Sumaiya, CSE)',
          calcBn: 'সব জিপিএ স্ক্যান করে: সর্বোচ্চ হলো ৩.৯২ (সুমাইয়া, CSE)',
          result: '3.92 Top GPA',
          sql: 'SELECT MAX(GPA) AS highest_gpa FROM Students;',
          targetCol: 'max_gpa'
        };
      case 'MIN':
        return {
          titleEn: 'MIN(Age): Find Lowest Value',
          titleBn: 'MIN(Age): সর্বনিম্ন মান খুঁজে বের করা',
          calcEn: 'Scans all ages: lowest is 20 years (Farhana, CSE)',
          calcBn: 'সকল বয়স স্ক্যান করে: সর্বনিম্ন হলো ২০ বছর (ফারহানা, CSE)',
          result: '20 Years',
          sql: 'SELECT MIN(Age) AS youngest_age FROM Students;',
          targetCol: 'min_age'
        };
      case 'SUM':
        return {
          titleEn: 'SUM(Age): Add Up All Values',
          titleBn: 'SUM(Age): সকল মানের সর্বমোট যোগফল',
          calcEn: '22 + 23 + 21 + 22 + 24 + 20 = 132 years combined',
          calcBn: '২২ + ২৩ + ২১ + ২২ + ২৪ + ২০ = ১৩২ বছর (মোট যোগফল)',
          result: '132 Years',
          sql: 'SELECT SUM(Age) AS total_years FROM Students;',
          targetCol: 'age'
        };
    }
  }, [activeAgg]);

  // Step 3 & 4: Group & Having data
  const departmentsData = useMemo(() => {
    const depts = ['CSE', 'BBA', 'EEE'] as const;
    return depts.map(dept => {
      const students = INITIAL_STUDENTS.filter(s => s.deptName === dept);
      const count = students.length;
      const avgGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / count).toFixed(2);

      let isPassed = true;
      let rejectReasonEn = '';
      let rejectReasonBn = '';

      if (havingFilter === 'COUNT_GE_2') {
        if (count < 2) {
          isPassed = false;
          rejectReasonEn = 'Has only 1 student (needs ≥ 2)';
          rejectReasonBn = 'শিক্ষার্থী মাত্র ১ জন (ন্যূনতম ২ প্রয়োজন)';
        }
      } else if (havingFilter === 'AVG_GE_36') {
        if (parseFloat(avgGpa) < 3.60) {
          isPassed = false;
          rejectReasonEn = 'Avg GPA 3.33 is below 3.60';
          rejectReasonBn = 'গড় জিপিএ ৩.৩৩ (৩.৬০ এর কম)';
        }
      }

      return {
        dept,
        students,
        count,
        avgGpa,
        isPassed,
        rejectReasonEn,
        rejectReasonBn
      };
    });
  }, [havingFilter]);

  const step4Sql = useMemo(() => {
    switch (havingFilter) {
      case 'NONE':
        return `SELECT Department, COUNT(*) AS Total, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department;`;
      case 'COUNT_GE_2':
        return `SELECT Department, COUNT(*) AS Total, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department\nHAVING COUNT(*) >= 2;`;
      case 'AVG_GE_36':
        return `SELECT Department, COUNT(*) AS Total, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department\nHAVING AVG(GPA) >= 3.60;`;
    }
  }, [havingFilter]);

  return (
    <>
      {/* ========================================================
          PART 15 & 16: AGGREGATE FUNCTIONS, GROUP BY & HAVING
          A 4-Step Intuitive University Storyline Flow
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold">
                {language === 'bn' ? 'পার্ট ৮ • ধাপে ধাপে এগ্রিগেশন গাইড' : 'Part 8 of 13 • Step-by-Step Aggregation Guide'}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
                <DualText
                  as="span"
                  en="Aggregates, GROUP BY & HAVING: The University Journey"
                  bn="অ্যাগ্রিগেট, GROUP BY এবং HAVING: ইউনিভার্সিটির বাস্তব উদাহরণে সম্পূর্ণ ফ্লো"
                />
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            Step {currentStep} of 4
          </span>
        </div>

        {/* 4-Step Interactive Progression Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            {
              step: 1 as StepNumber,
              num: '১',
              titleEn: '1. Raw Records',
              titleBn: '১. র ডেটাবেস সারি',
              descEn: '6 individual students',
              descBn: '৬ জন শিক্ষার্থীর সারি',
              icon: Database
            },
            {
              step: 2 as StepNumber,
              num: '২',
              titleEn: '2. Aggregates',
              titleBn: '২. অ্যাগ্রিগেট ফাংশন',
              descEn: 'Multiple rows ➔ 1 summary',
              descBn: 'সব সারি মিলে ১টি মান',
              icon: Calculator
            },
            {
              step: 3 as StepNumber,
              num: '৩',
              titleEn: '3. GROUP BY',
              titleBn: '৩. GROUP BY বাকেট',
              descEn: 'Bucket by Department',
              descBn: 'ডিপার্টমেন্ট অনুযায়ী গ্রুপিং',
              icon: Layers
            },
            {
              step: 4 as StepNumber,
              num: '৪',
              titleEn: '4. HAVING Clause',
              titleBn: '৪. HAVING দিয়ে ফিল্টার',
              descEn: 'Filter group summaries',
              descBn: 'গ্রুপ সামারি ফিল্টার করা',
              icon: Filter
            },
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`p-2.5 rounded-xl text-left transition border cursor-pointer ${
                  isActive
                    ? 'bg-purple-600/20 border-purple-500 shadow-md ring-1 ring-purple-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-purple-500 text-white' : 'bg-slate-800 text-zinc-400'
                  }`}>
                    {language === 'bn' ? item.num : `Step ${item.step}`}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                </div>
                <div className={`text-xs font-bold mt-1.5 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </div>
                <div className="text-[10px] text-zinc-400 truncate">
                  {language === 'bn' ? item.descBn : item.descEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            STEP 1: RAW INDIVIDUAL RECORDS
           ======================================================== */}
        {currentStep === 1 && (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  <DualText en="Step 1: The Raw Students Table" bn="ধাপ ১: স্টুডেন্টস টেবিলের মূল সারিগুলো" />
                </span>
                <DualText
                  as="p"
                  className="text-xs text-zinc-300 mt-0.5"
                  en="The university registrar stores individual student records. Each student is a separate, independent row."
                  bn="বিশ্ববিদ্যালয়ের রেজিস্ট্রারে প্রতিটি শিক্ষার্থীর রেকর্ড সংরক্ষিত থাকে। এখানে প্রতিটি সারি একক শিক্ষার্থীর ডেটা।"
                />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 self-start sm:self-auto">
                SELECT * FROM Students;
              </span>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">Student ID</th>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Department</th>
                    <th className="p-2.5">Age</th>
                    <th className="p-2.5">GPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-200">
                  {INITIAL_STUDENTS.map(s => (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-2.5 text-zinc-400">#{s.id}</td>
                      <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        {s.name}
                      </td>
                      <td className="p-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 text-[10px]">
                          {s.deptName}
                        </span>
                      </td>
                      <td className="p-2.5 text-zinc-300">{s.age} yrs</td>
                      <td className="p-2.5 font-bold text-amber-300">{s.gpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Transition Question */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-300">
                <strong className="text-purple-300 block mb-0.5">
                  <DualText en="The Registrar Problem:" bn="রেজিস্ট্রারের মূল সমস্যা:" />
                </strong>
                <DualText
                  as="p"
                  className="text-zinc-400 text-[11px]"
                  en="The Dean doesn't have time to read 10,000 individual student rows. The Dean asks: 'What is the average GPA of all students? Who scored highest?'"
                  bn="ডিন মহোদয়ের পক্ষে ১০,০০০ শিক্ষার্থীর একক সারি দেখা সম্ভব নয়। ডিন জানতে চান: 'সব শিক্ষার্থীর গড় জিপিএ কত? কে সর্বোচ্চ নম্বর পেয়েছে?'"
                />
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-purple-600 hover:bg-purple-500 text-white transition shrink-0 cursor-pointer"
              >
                <span>Step 2: Aggregate Them</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: AGGREGATE FUNCTIONS IN ACTION
           ======================================================== */}
        {currentStep === 2 && (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3.5">
            <div className="border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                <DualText
                  en="Step 2: Aggregate Functions (Multiple Rows ➔ 1 Summary Value)"
                  bn="ধাপ ২: অ্যাগ্রিগেট ফাংশন (বহু সারি ➔ ১টি সামারি মান)"
                />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 mt-0.5"
                en="Click any function below to see how it takes all student rows and crushes them into a single answer:"
                bn="নিচের যেকোনো ফাংশনে ক্লিক করে দেখুন কীভাবে সব সারি একত্র করে একটি নির্দিষ্ট ফলাফলে রূপান্তর করা হয়:"
              />
            </div>

            {/* 5 Function Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['COUNT', 'AVG', 'MAX', 'MIN', 'SUM'] as const).map(fn => {
                const isActive = activeAgg === fn;
                return (
                  <button
                    key={fn}
                    onClick={() => setActiveAgg(fn)}
                    className={`p-2 rounded-lg text-left transition border cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                        : 'bg-black/40 border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-bold block">{fn}()</span>
                    <span className="text-[10px] opacity-80 truncate block">
                      {fn === 'COUNT' && 'Count rows'}
                      {fn === 'AVG' && 'Mean GPA'}
                      {fn === 'MAX' && 'Highest GPA'}
                      {fn === 'MIN' && 'Lowest Age'}
                      {fn === 'SUM' && 'Total Years'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Calculation Spotlight Banner */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">{aggInfo.titleEn}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                    Result: {aggInfo.result}
                  </span>
                </div>
                <div className="text-xs text-zinc-300 font-mono flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{language === 'bn' ? aggInfo.calcBn : aggInfo.calcEn}</span>
                </div>
              </div>

              {/* Code snippet with copy */}
              <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1.5 rounded-lg border border-slate-800 text-xs font-mono self-stretch md:self-auto justify-between">
                <code className="text-emerald-300">{aggInfo.sql}</code>
                <button
                  onClick={() => handleCopy(aggInfo.sql, 'aggsql')}
                  className="p-1 rounded hover:bg-slate-800 text-zinc-400 hover:text-white transition"
                  title="Copy SQL"
                >
                  {copiedId === 'aggsql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            {/* Interactive Data Table with Dynamic Row/Column Highlights */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Department</th>
                    <th className={`p-2 transition ${activeAgg === 'MIN' || activeAgg === 'SUM' ? 'bg-purple-900/40 text-purple-200' : ''}`}>
                      Age {activeAgg === 'MIN' && '🔍 (MIN checks here)'} {activeAgg === 'SUM' && '➕ (SUM adds here)'}
                    </th>
                    <th className={`p-2 transition ${activeAgg === 'AVG' || activeAgg === 'MAX' ? 'bg-purple-900/40 text-purple-200' : ''}`}>
                      GPA {activeAgg === 'AVG' && '📊 (AVG computes here)'} {activeAgg === 'MAX' && '🏆 (MAX checks here)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {INITIAL_STUDENTS.map((s, idx) => {
                    const isMax = activeAgg === 'MAX' && s.gpa === 3.92;
                    const isMin = activeAgg === 'MIN' && s.age === 20;

                    return (
                      <tr
                        key={s.id}
                        className={`transition ${
                          isMax ? 'bg-amber-500/20 text-white font-bold' : isMin ? 'bg-cyan-500/20 text-white font-bold' : ''
                        }`}
                      >
                        <td className="p-2 text-zinc-500 font-mono">{idx + 1}</td>
                        <td className="p-2 font-bold text-white flex items-center gap-1.5">
                          {s.name}
                          {isMax && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">👑 Highest</span>}
                          {isMin && <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">🌱 Youngest</span>}
                        </td>
                        <td className="p-2 text-zinc-400">{s.deptName}</td>
                        <td className={`p-2 ${activeAgg === 'MIN' || activeAgg === 'SUM' ? 'font-bold text-cyan-300 bg-purple-950/20' : ''}`}>
                          {s.age}
                        </td>
                        <td className={`p-2 ${activeAgg === 'AVG' || activeAgg === 'MAX' ? 'font-bold text-amber-300 bg-purple-950/20' : ''}`}>
                          {s.gpa.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Next Step Teaser */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-300">
                <strong className="text-purple-300 block mb-0.5">
                  <DualText en="The Next Question from the Dean:" bn="ডিন মহোদয়ের পরবর্তী প্রশ্ন:" />
                </strong>
                <DualText
                  as="p"
                  className="text-zinc-400 text-[11px]"
                  en="'Wait! Don\'t give me 1 overall number for the whole university! Which department has the best students? Compare CSE vs BBA vs EEE!'"
                  bn="'দাঁড়ান! পুরো ইউনিভার্সিটির জন্য ১টি গড় মান দিয়ে কী হবে? কোন ডিপার্টমেন্টের শিক্ষার্থীরা সবচেয়ে ভালো করছে? CSE, BBA ও EEE কে আলাদা করে দেখান!'"
                />
              </div>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-purple-600 hover:bg-purple-500 text-white transition shrink-0 cursor-pointer"
              >
                <span>Step 3: GROUP BY Department</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: GROUP BY BUCKETS
           ======================================================== */}
        {currentStep === 3 && (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3.5">
            <div className="border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                <DualText
                  en="Step 3: GROUP BY (Collapsing Rows into Department Buckets)"
                  bn="ধাপ ৩: GROUP BY (সারিগুলোকে ডিপার্টমেন্ট বাকেটে রূপান্তর)"
                />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 mt-0.5"
                en="GROUP BY takes all 6 rows and sorts them into buckets by Department. Aggregate functions (COUNT, AVG) now run separately for each bucket!"
                bn="GROUP BY সমস্ত ৬টি সারিকে ডিপার্টমেন্ট অনুযায়ী আলাদা বাকেটে ভাগ করে। ফলে COUNT এবং AVG প্রতিটি ডিপার্টমেন্টের জন্য আলাদাভাবে হিসাব করা হয়!"
              />
            </div>

            {/* Generated SQL Snippet */}
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-between">
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto">
{`SELECT Department, COUNT(*) AS Total_Students, ROUND(AVG(GPA), 2) AS Avg_GPA
FROM Students
GROUP BY Department;`}
              </pre>
              <button
                onClick={() => handleCopy(`SELECT Department, COUNT(*) AS Total_Students, ROUND(AVG(GPA), 2) AS Avg_GPA\nFROM Students\nGROUP BY Department;`, 'step3sql')}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition"
              >
                {copiedId === 'step3sql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>Copy</span>
              </button>
            </div>

            {/* Visual Department Buckets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {departmentsData.map(d => (
                <div key={d.dept} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5 font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      {d.dept} Department
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                      {d.count} {d.count === 1 ? 'student' : 'students'}
                    </span>
                  </div>

                  {/* Student pills inside this bucket */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 block font-mono">Enrolled Students:</span>
                    <div className="flex flex-wrap gap-1">
                      {d.students.map(s => (
                        <span key={s.id} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 border border-slate-800">
                          {s.name} (GPA {s.gpa})
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Group Stats */}
                  <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 text-[11px]">AVG(GPA):</span>
                    <span className="font-bold text-amber-300">{d.avgGpa}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Step Teaser */}
            <div className="p-3 rounded-lg bg-purple-950/20 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-zinc-300">
                <strong className="text-purple-300 block mb-0.5">
                  <DualText en="The Dean's Final Filter:" bn="ডিন মহোদয়ের চূড়ান্ত শর্ত:" />
                </strong>
                <DualText
                  as="p"
                  className="text-zinc-400 text-[11px]"
                  en="'Only display departments that have at least 2 students enrolled!' Can we write WHERE COUNT(*) >= 2? No! Learn why in Step 4."
                  bn="'শুধু সেই ডিপার্টমেন্টগুলোকে দেখান যাদের অন্তত ২ জন শিক্ষার্থী আছে!' আমরা কি WHERE COUNT(*) >= 2 লিখতে পারি? না! ধাপ ৪-এ দেখুন কেন।"
                />
              </div>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono bg-purple-600 hover:bg-purple-500 text-white transition shrink-0 cursor-pointer"
              >
                <span>Step 4: Filter with HAVING</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: FILTERING GROUPS WITH HAVING
           ======================================================== */}
        {currentStep === 4 && (
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3.5">
            <div className="border-b border-slate-800/80 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                <DualText
                  en="Step 4: The HAVING Clause (Filtering Group Summaries)"
                  bn="ধাপ ৪: HAVING ক্লজ (গ্রুপ সামারির ওপর ফিল্টারিং)"
                />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 mt-0.5"
                en="WHERE filters individual rows BEFORE grouping. HAVING filters summarized groups AFTER grouping."
                bn="WHERE গ্রুপিংয়ের আগেই একক সারি ফিল্টার করে। আর HAVING গ্রুপিং সম্পন্ন হওয়ার পর গ্রুপ সামারিকে ফিল্টার করে।"
              />
            </div>

            {/* Interactive HAVING condition toggles */}
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs font-mono text-zinc-300 font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                <DualText en="Apply Group Condition:" bn="গ্রুপের শর্ত প্রয়োগ করুন:" />
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'NONE' as HavingFilter, label: 'All 3 Departments', desc: 'No HAVING' },
                  { id: 'COUNT_GE_2' as HavingFilter, label: 'HAVING COUNT(*) >= 2', desc: 'Filters EEE' },
                  { id: 'AVG_GE_36' as HavingFilter, label: 'HAVING AVG(GPA) >= 3.60', desc: 'Filters BBA' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setHavingFilter(opt.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      havingFilter === opt.id
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-black/50 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Screen: SQL on Left, Live Result on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Left: Dynamic Query with Explanation */}
              <div className="lg:col-span-5 flex flex-col justify-between p-3 rounded-xl bg-black/50 border border-slate-800 space-y-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                      Executable SQL Query
                    </span>
                    <button
                      onClick={() => handleCopy(step4Sql, 'step4sql')}
                      className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition"
                    >
                      {copiedId === 'step4sql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-500/20 leading-relaxed">
{step4Sql}
                  </pre>
                </div>

                <div className="p-2 rounded bg-purple-950/20 border border-purple-500/20 text-[11px] text-zinc-300">
                  <strong className="text-purple-300 block mb-0.5">
                    <DualText en="Why not WHERE?" bn="WHERE কেন ব্যবহার করা গেল না?" />
                  </strong>
                  <DualText
                    as="p"
                    className="text-zinc-400 leading-snug"
                    en="WHERE cannot evaluate COUNT(*) because rows are not grouped yet when WHERE executes! Only HAVING can inspect aggregate results."
                    bn="WHERE কখনো COUNT(*) এর মান চেক করতে পারে না কারণ WHERE যখন রান হয় তখন গ্রুপিং তৈরিই হয়নি! একমাত্র HAVING-ই অ্যাগ্রিগেট চেক করতে পারে।"
                  />
                </div>
              </div>

              {/* Right: Live Filtered Table */}
              <div className="lg:col-span-7 rounded-xl border border-slate-800 overflow-hidden bg-black/30">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">Department</th>
                      <th className="p-2.5">Count</th>
                      <th className="p-2.5">Avg GPA</th>
                      <th className="p-2.5 text-right">HAVING Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {departmentsData.map(d => (
                      <tr
                        key={d.dept}
                        className={`transition ${
                          d.isPassed ? 'bg-emerald-500/5 text-zinc-200' : 'opacity-40 bg-rose-500/5 text-zinc-500'
                        }`}
                      >
                        <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${d.isPassed ? 'bg-purple-400' : 'bg-zinc-600'}`} />
                          {d.dept}
                        </td>
                        <td className="p-2.5 font-bold text-cyan-300">{d.count}</td>
                        <td className="p-2.5 font-bold text-amber-300">{d.avgGpa}</td>
                        <td className="p-2.5 text-right">
                          {d.isPassed ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                              <XCircle className="w-3 h-3" /> Discarded
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Restart or Review */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Restart Story from Step 1</span>
              </button>
              <span className="text-emerald-400 text-[11px]">
                🎉 You now understand: Rows ➔ Aggregates ➔ GROUP BY ➔ HAVING!
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
