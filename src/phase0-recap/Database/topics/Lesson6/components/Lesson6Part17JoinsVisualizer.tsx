'use client';

import React, { useState, useMemo } from 'react';
import {
  GitMerge,
  Copy,
  Check,
  CheckCircle2,
  Database,
  ArrowRight,
  Sparkles,
  Link2,
  Lightbulb,
  Compass
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';

const TABLE_A_STUDENTS = [
  { id: 101, name: 'Rahim', deptId: 1 },
  { id: 102, name: 'Karim', deptId: 2 },
  { id: 103, name: 'Tareq', deptId: null },
];

const TABLE_B_DEPTS = [
  { id: 1, name: 'CSE', room: 'Lab 402' },
  { id: 2, name: 'BBA', room: 'Tower 301' },
  { id: 3, name: 'Civil', room: 'Design 204' },
];

const JOIN_CHEAT_SHEET: Array<{
  type: JoinType;
  accent: string;
  activeRing: string;
  ruleEn: string;
  ruleBn: string;
  whenEn: string;
  whenBn: string;
}> = [
  {
    type: 'INNER',
    accent: 'text-emerald-400',
    activeRing: 'border-emerald-500/60 bg-emerald-500/10',
    ruleEn: 'Only matching pairs',
    ruleBn: 'শুধু দুই টেবিলে মিল থাকলে',
    whenEn: 'Use when you only want complete records (e.g., students with an assigned dept).',
    whenBn: 'যখন শুধু সম্পূর্ণ ডেটা দরকার (যেমন: যাদের ডিপার্টমেন্ট আছে শুধু সেই শিক্ষার্থী)।',
  },
  {
    type: 'LEFT',
    accent: 'text-cyan-400',
    activeRing: 'border-cyan-500/60 bg-cyan-500/10',
    ruleEn: 'All Left + matches',
    ruleBn: 'বাম টেবিলের সব + মিল',
    whenEn: 'Use when every Left row matters (e.g., show all students, even unassigned ones).',
    whenBn: 'যখন বাম টেবিলের সব রো রাখা জরুরি (যেমন: ডিপার্টমেন্টহীন নতুন শিক্ষার্থীসহ সবাই)।',
  },
  {
    type: 'RIGHT',
    accent: 'text-purple-400',
    activeRing: 'border-purple-500/60 bg-purple-500/10',
    ruleEn: 'All Right + matches',
    ruleBn: 'ডান টেবিলের সব + মিল',
    whenEn: 'Use when every Right row matters (e.g., list all depts, even empty Civil dept).',
    whenBn: 'যখন ডান টেবিলের সব রো দরকার (যেমন: শিক্ষার্থীহীন নতুন ডিপার্টমেন্টও দেখাবে)।',
  },
  {
    type: 'FULL',
    accent: 'text-amber-400',
    activeRing: 'border-amber-500/60 bg-amber-500/10',
    ruleEn: 'Everything from both',
    ruleBn: 'উভয় টেবিলের সবকিছু',
    whenEn: 'Use for full audits (e.g., spot both unassigned students AND empty depts).',
    whenBn: 'সম্পূর্ণ অডিটের জন্য (ডিপার্টমেন্টহীন শিক্ষার্থী ও শিক্ষার্থীহীন ডিপার্টমেন্ট একসাথে)।',
  },
];

export default function Lesson6Part17JoinsVisualizer() {
  const { language } = useLanguage();
  const [activeJoinType, setActiveJoinType] = useState<JoinType>('INNER');
  const [useSvg, setUseSvg] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const studentRowStatus = useMemo(() => {
    return TABLE_A_STUDENTS.map(s => {
      const hasMatch = s.deptId !== null && TABLE_B_DEPTS.some(d => d.id === s.deptId);
      if (hasMatch) return { ...s, included: true, tag: 'Matched' };
      const isIncluded = activeJoinType === 'LEFT' || activeJoinType === 'FULL';
      return { ...s, included: isIncluded, tag: isIncluded ? 'Kept (NULL)' : 'Excluded' };
    });
  }, [activeJoinType]);

  const deptRowStatus = useMemo(() => {
    return TABLE_B_DEPTS.map(d => {
      const hasMatch = TABLE_A_STUDENTS.some(s => s.deptId === d.id);
      if (hasMatch) return { ...d, included: true, tag: 'Matched' };
      const isIncluded = activeJoinType === 'RIGHT' || activeJoinType === 'FULL';
      return { ...d, included: isIncluded, tag: isIncluded ? 'Kept (NULL)' : 'Excluded' };
    });
  }, [activeJoinType]);

  const outputRows = useMemo(() => {
    const matched = [
      { id: 101, name: 'Rahim', deptName: 'CSE', room: 'Lab 402', status: 'matched' as const },
      { id: 102, name: 'Karim', deptName: 'BBA', room: 'Tower 301', status: 'matched' as const },
    ];
    const leftUnmatched = [
      { id: 103, name: 'Tareq', deptName: null, room: null, status: 'left_only' as const },
    ];
    const rightUnmatched = [
      { id: null, name: null, deptName: 'Civil', room: 'Design 204', status: 'right_only' as const },
    ];

    switch (activeJoinType) {
      case 'INNER': return matched;
      case 'LEFT': return [...matched, ...leftUnmatched];
      case 'RIGHT': return [...matched, ...rightUnmatched];
      case 'FULL': return [...matched, ...leftUnmatched, ...rightUnmatched];
    }
  }, [activeJoinType]);

  const joinMeta = useMemo(() => {
    switch (activeJoinType) {
      case 'INNER':
        return {
          titleEn: 'INNER JOIN: Exact Key Matches Only',
          titleBn: 'INNER JOIN: শুধুমাত্র দুই টেবিলে মিল থাকা সারি',
          whenEn: 'Pick INNER JOIN when you only care about connected records and want to ignore incomplete/orphan rows.',
          whenBn: 'যখন শুধু সম্পূর্ণ সংযুক্ত ডেটা দরকার এবং অসম্পূর্ণ বা ম্যাচ না হওয়া রো বাদ দিতে চান, তখন INNER JOIN ব্যবহার করুন।',
          descEn: 'Only Rahim (CSE) and Karim (BBA) have matching dept_id = id. Tareq and Civil are excluded.',
          descBn: 'শুধু রহিম (CSE) ও করিমের (BBA) ক্ষেত্রে dept_id = id মিলেছে। তারেক ও সিভিল বাদ পড়েছে।',
          sql: `SELECT Students.name, Departments.name AS dept, Departments.room\nFROM Students\nINNER JOIN Departments\n  ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/inner-join.svg',
          imgPath: '/images/joins/inner-join-venn.jpg'
        };
      case 'LEFT':
        return {
          titleEn: 'LEFT JOIN: Keep Every Student',
          titleBn: 'LEFT JOIN: বাম টেবিলের সব শিক্ষার্থী রাখুন',
          whenEn: 'Pick LEFT JOIN when the Left table is your main list (e.g., all registered students) and Right details are optional.',
          whenBn: 'যখন বাম টেবিলটি মূল তালিকা (যেমন: সব নিবন্ধিত শিক্ষার্থী) এবং ডান টেবিলের তথ্য ঐচ্ছিক, তখন LEFT JOIN নিন।',
          descEn: 'All 3 students stay. Tareq has no department yet, so dept & room become NULL.',
          descBn: '৩ জন শিক্ষার্থীই থাকবে। তারেকের ডিপার্টমেন্ট না থাকায় dept ও room ঘরে NULL বসবে।',
          sql: `SELECT Students.name, Departments.name AS dept, Departments.room\nFROM Students\nLEFT JOIN Departments\n  ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/left-join.svg',
          imgPath: '/images/joins/left-join-venn.jpg'
        };
      case 'RIGHT':
        return {
          titleEn: 'RIGHT JOIN: Keep Every Department',
          titleBn: 'RIGHT JOIN: ডান টেবিলের সব ডিপার্টমেন্ট রাখুন',
          whenEn: 'Pick RIGHT JOIN when you must list every Right-side category (e.g., all departments), even if nobody enrolled yet.',
          whenBn: 'যখন ডান টেবিলের সব ক্যাটাগরি দেখানো জরুরি (যেমন: সব ডিপার্টমেন্ট, শিক্ষার্থী না থাকলেও), তখন RIGHT JOIN ব্যবহার করুন।',
          descEn: 'All 3 departments stay. Civil has 0 students, so Student becomes NULL.',
          descBn: '৩টি ডিপার্টমেন্টই থাকবে। সিভিলে কোনো শিক্ষার্থী না থাকায় Student ঘরে NULL বসবে।',
          sql: `SELECT Students.name, Departments.name AS dept, Departments.room\nFROM Students\nRIGHT JOIN Departments\n  ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/right-join.svg',
          imgPath: '/images/joins/right-join-venn.jpg'
        };
      case 'FULL':
        return {
          titleEn: 'FULL OUTER JOIN: Keep Everything',
          titleBn: 'FULL OUTER JOIN: দুই টেবিলের সব তথ্যই রাখুন',
          whenEn: 'Pick FULL JOIN when you cannot afford to lose any row from either table—great for data auditing & finding gaps.',
          whenBn: 'যখন কোনো টেবিলের কোনো রো-ই বাদ দেওয়া যাবে না (ডেটা অডিট বা অমিল খুঁজে বের করতে), তখন FULL JOIN ব্যবহার হয়।',
          descEn: 'Unmatched rows from both sides stay and get NULL in missing columns. (MySQL uses UNION).',
          descBn: 'উভয় দিকের সব সারিই থাকবে, অমিল অংশে NULL বসবে। (MySQL-এ UNION দিয়ে করতে হয়)।',
          sql: `-- PostgreSQL / Oracle / SQL Server:\nSELECT Students.name, Departments.name AS dept\nFROM Students\nFULL OUTER JOIN Departments\n  ON Students.dept_id = Departments.id;\n\n-- MySQL (LEFT + RIGHT via UNION):\nSELECT Students.name, Departments.name FROM Students LEFT JOIN Departments ON Students.dept_id = Departments.id\nUNION\nSELECT Students.name, Departments.name FROM Students RIGHT JOIN Departments ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/full-join.svg',
          imgPath: '/images/joins/full-join-venn.jpg'
        };
    }
  }, [activeJoinType]);

  return (
    <section className="bg-[#0c101d] border border-slate-800/90 rounded-2xl p-4 md:p-6 space-y-5">
      {/* Header & Join Type Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৯ • জয়েন ভিজ্যুয়ালাইজার' : 'Part 9 of 13 • SQL Joins'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-slate-100 mt-1 tracking-tight">
              <DualText
                as="span"
                en="SQL Joins: Why, When & Visual Flow"
                bn="SQL JOIN: কেন, কখন এবং কীভাবে কাজ করে"
              />
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#080b14] p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as const).map(j => (
            <button
              key={j}
              onClick={() => setActiveJoinType(j)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeJoinType === j
                  ? 'bg-cyan-600 text-white  '
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeJoinType === j ? 'bg-white' : 'bg-slate-600'}`} />
              <span>{j} JOIN</span>
            </button>
          ))}
        </div>
      </div>

      {/* Beginner Foundation: Why Use JOIN at All? */}
      <div className="p-3.5 rounded-xl bg-[#12172a] border border-cyan-500/20 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs leading-relaxed">
          <div className="font-bold text-slate-100">
            <DualText
              as="span"
              en="Why do we need JOIN? (Beginner Rule)"
              bn="JOIN কেন দরকার? (সহজ কথায়)"
            />
          </div>
          <DualText
            as="p"
            className="text-slate-300"
            en="Databases split data into separate tables (Students & Departments) so info like Room numbers is not repeated 1,000 times. Use JOIN whenever you need columns from two or more related tables in one result—linked by a shared key (dept_id = id)."
            bn="ডেটা ডুপ্লিকেট না করতে তথ্য আলাদা টেবিলে (Students ও Departments) রাখা হয়। যখন একটি আউটপুটেই দুই টেবিলের কলাম একসাথে দরকার হয়, তখন কমন কী (dept_id = id) দিয়ে টেবিল জুড়ে দিতে JOIN ব্যবহার করা হয়।"
          />
        </div>
      </div>

      {/* Active Join "When to Use" Spotlight */}
      <div className="p-3.5 rounded-xl bg-[#15171e] border border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Compass className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono font-bold text-cyan-300">
              {language === 'bn' ? `কখন ${activeJoinType} JOIN ব্যবহার করবেন?` : `When to use ${activeJoinType} JOIN`}
            </span>
            <DualText
              as="p"
              className="text-xs text-slate-200 leading-relaxed"
              en={joinMeta.whenEn}
              bn={joinMeta.whenBn}
            />
          </div>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#080b14] border border-slate-800 text-emerald-400 shrink-0 self-start sm:self-center">
          {outputRows.length} {outputRows.length === 1 ? 'row' : 'rows'} output
        </span>
      </div>

      {/* Pipeline Stage Headers */}
      <div className="hidden lg:grid grid-cols-12 gap-4 text-xs font-mono font-bold">
        <div className="col-span-4 flex items-center justify-between text-cyan-400 bg-[#12172a] px-3 py-2 rounded-lg border border-slate-800">
          <span>1. Input Tables (A & B)</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="col-span-4 flex items-center justify-between text-purple-400 bg-[#12172a] px-3 py-2 rounded-lg border border-slate-800">
          <span>2. Venn Logic & SQL</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="col-span-4 flex items-center justify-between text-emerald-400 bg-[#12172a] px-3 py-2 rounded-lg border border-slate-800">
          <span>3. Final Joined Output</span>
          <span className="text-[10px] text-slate-400 font-normal">{outputRows.length} rows</span>
        </div>
      </div>

      {/* 3-Column Visual Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Column 1: Input Tables */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3 p-3.5 rounded-xl bg-[#12172a] border border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Table A: Students (Left)
              </span>
              <span className="text-[10px] text-slate-400 bg-[#080b14] px-2 py-0.5 rounded border border-slate-800">
                FK: dept_id
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#080b14]">
              <table className="w-full text-left text-[11px] font-mono">
                <thead className="bg-[#0c101d] text-slate-400 text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-2.5 py-1.5">id</th>
                    <th className="px-2.5 py-1.5">name</th>
                    <th className="px-2.5 py-1.5 text-center">dept_id</th>
                    <th className="px-2.5 py-1.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {studentRowStatus.map(s => (
                    <tr
                      key={s.id}
                      className={`transition-opacity ${
                        s.included ? 'bg-cyan-500/5 text-slate-200' : 'opacity-40 bg-rose-500/5 text-slate-500 line-through'
                      }`}
                    >
                      <td className="px-2.5 py-1.5 text-slate-400">#{s.id}</td>
                      <td className="px-2.5 py-1.5 font-bold text-slate-100">{s.name}</td>
                      <td className="px-2.5 py-1.5 text-center">
                        {s.deptId !== null ? (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px]">
                            {s.deptId}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                            NULL
                          </span>
                        )}
                      </td>
                      <td className="px-2.5 py-1.5 text-right">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          s.tag === 'Matched' ? 'bg-emerald-500/20 text-emerald-400' :
                          s.tag.startsWith('Kept') ? 'bg-cyan-500/20 text-cyan-300' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {s.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080b14] border border-slate-700/80 text-[10px] font-mono text-slate-300">
              <Link2 className="w-3 h-3 text-cyan-400" />
              <span>ON Students.dept_id = Departments.id</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Table B: Departments (Right)
              </span>
              <span className="text-[10px] text-slate-400 bg-[#080b14] px-2 py-0.5 rounded border border-slate-800">
                PK: id
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#080b14]">
              <table className="w-full text-left text-[11px] font-mono">
                <thead className="bg-[#0c101d] text-slate-400 text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-2.5 py-1.5">id</th>
                    <th className="px-2.5 py-1.5">dept</th>
                    <th className="px-2.5 py-1.5 text-center">room</th>
                    <th className="px-2.5 py-1.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {deptRowStatus.map(d => (
                    <tr
                      key={d.id}
                      className={`transition-opacity ${
                        d.included ? 'bg-purple-500/5 text-slate-200' : 'opacity-40 bg-rose-500/5 text-slate-500 line-through'
                      }`}
                    >
                      <td className="px-2.5 py-1.5 text-purple-300 font-bold">#{d.id}</td>
                      <td className="px-2.5 py-1.5 font-bold text-slate-100">{d.name}</td>
                      <td className="px-2.5 py-1.5 text-center text-slate-400">{d.room}</td>
                      <td className="px-2.5 py-1.5 text-right">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                          d.tag === 'Matched' ? 'bg-emerald-500/20 text-emerald-400' :
                          d.tag.startsWith('Kept') ? 'bg-purple-500/20 text-purple-300' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {d.tag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Column 2: Venn Diagram & SQL */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3 p-3.5 rounded-xl bg-[#12172a] border border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-purple-300 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Venn Diagram
            </span>
            <div className="flex items-center gap-1 bg-[#080b14] p-0.5 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setUseSvg(true)}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${useSvg ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Vector SVG
              </button>
              <button
                onClick={() => setUseSvg(false)}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${!useSvg ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                HD Art
              </button>
            </div>
          </div>

          <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#080b14] p-2 flex items-center justify-center">
            <div className="w-full aspect-[16/10] max-h-48 flex items-center justify-center">
              <img
                src={useSvg ? joinMeta.svgPath : joinMeta.imgPath}
                alt={`${activeJoinType} JOIN Venn Diagram`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="font-bold text-emerald-400 uppercase">SQL Query</span>
              <button
                onClick={() => handleCopy(joinMeta.sql, 'joinsql')}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                {copiedId === 'joinsql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'joinsql' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded-lg bg-[#080b14] text-[11px] font-mono text-emerald-300 overflow-x-auto border border-emerald-500/20 leading-relaxed max-h-28">
{joinMeta.sql}
            </pre>
          </div>
        </div>

        {/* Column 3: Joined Output */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-3 p-3.5 rounded-xl bg-[#12172a] border border-slate-800">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-100 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <DualText as="span" en={joinMeta.titleEn} bn={joinMeta.titleBn} />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold shrink-0">
                {outputRows.length} Rows
              </span>
            </div>
            <DualText
              as="p"
              className="text-[11px] text-slate-300 mt-1.5 leading-relaxed"
              en={joinMeta.descEn}
              bn={joinMeta.descBn}
            />
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#080b14]">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0c101d] text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-2">Student</th>
                  <th className="p-2">Dept</th>
                  <th className="p-2">Room</th>
                  <th className="p-2 text-right">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {outputRows.map((r, i) => (
                  <tr
                    key={i}
                    className={r.status === 'matched' ? 'bg-emerald-500/5' : 'bg-amber-500/5'}
                  >
                    <td className="p-2 font-bold text-slate-100">
                      {r.name ?? (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                          NULL
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      {r.deptName ? (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-[11px]">
                          {r.deptName}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          NULL
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-slate-400">
                      {r.room ?? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          NULL
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-right">
                      {r.status === 'matched' ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Matched
                        </span>
                      ) : r.status === 'left_only' ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                          NULL Dept
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                          NULL Student
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 rounded-lg bg-[#080b14] border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>{activeJoinType === 'FULL' ? 'MySQL: simulate with UNION' : 'NULL = missing match on opposite side'}</span>
            <span className="text-cyan-400 font-bold">{outputRows.length} rows</span>
          </div>
        </div>
      </div>

      {/* Quick Cheat Sheet: All 4 Joins Compared */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-300">
            <DualText as="span" en="Quick Cheat Sheet: Which JOIN Should I Pick?" bn="দ্রুত গাইড: কোন JOIN কখন বাছবেন?" />
          </span>
          <span className="text-[10px] text-slate-400">
            <DualText as="span" en="Click card to preview" bn="প্রিভিউ দেখতে কার্ডে ক্লিক করুন" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {JOIN_CHEAT_SHEET.map(item => {
            const isSelected = activeJoinType === item.type;
            return (
              <button
                key={item.type}
                onClick={() => setActiveJoinType(item.type)}
                className={`text-left p-3 rounded-xl border transition-colors duration-200 cursor-pointer space-y-1.5 ${
                  isSelected
                    ? item.activeRing
                    : 'bg-[#12172a] border-slate-800 hover:border-slate-700 hover:bg-[#161d33]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs font-bold">
                  <span className={item.accent}>{item.type} JOIN</span>
                  <DualText as="span" className="text-[10px] text-slate-400 font-normal" en={item.ruleEn} bn={item.ruleBn} />
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-slate-300 leading-relaxed"
                  en={item.whenEn}
                  bn={item.whenBn}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
