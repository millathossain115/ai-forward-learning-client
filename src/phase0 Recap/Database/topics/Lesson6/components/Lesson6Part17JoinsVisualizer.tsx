'use client';

import React, { useState, useMemo } from 'react';
import {
  GitMerge,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Database,
  ArrowRight,
  Sparkles,
  Link2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';

// Minimal 3-row teaching datasets (Zero cognitive fatigue)
const TABLE_A_STUDENTS = [
  { id: 101, name: 'Rahim', deptId: 1 },
  { id: 102, name: 'Karim', deptId: 2 },
  { id: 103, name: 'Tareq', deptId: null }, // Unassigned student (no dept)
];

const TABLE_B_DEPTS = [
  { id: 1, name: 'CSE', room: 'Lab 402' },
  { id: 2, name: 'BBA', room: 'Tower 301' },
  { id: 3, name: 'Civil', room: 'Design 204' }, // Empty dept (0 students)
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

  // Row selection logic for Table A & B to visually demonstrate inclusion
  const studentRowStatus = useMemo(() => {
    return TABLE_A_STUDENTS.map(s => {
      const hasMatch = s.deptId !== null && TABLE_B_DEPTS.some(d => d.id === s.deptId);
      if (hasMatch) {
        return { ...s, included: true, tag: 'Matched' };
      }
      // Unassigned student (Tareq)
      const isIncluded = activeJoinType === 'LEFT' || activeJoinType === 'FULL';
      return { ...s, included: isIncluded, tag: isIncluded ? 'Kept (NULL)' : 'Excluded' };
    });
  }, [activeJoinType]);

  const deptRowStatus = useMemo(() => {
    return TABLE_B_DEPTS.map(d => {
      const hasMatch = TABLE_A_STUDENTS.some(s => s.deptId === d.id);
      if (hasMatch) {
        return { ...d, included: true, tag: 'Matched' };
      }
      // Empty dept (Civil)
      const isIncluded = activeJoinType === 'RIGHT' || activeJoinType === 'FULL';
      return { ...d, included: isIncluded, tag: isIncluded ? 'Kept (NULL)' : 'Excluded' };
    });
  }, [activeJoinType]);

  // Output Rows (Clean 2 to 4 rows)
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
      case 'INNER':
        return matched;
      case 'LEFT':
        return [...matched, ...leftUnmatched];
      case 'RIGHT':
        return [...matched, ...rightUnmatched];
      case 'FULL':
        return [...matched, ...leftUnmatched, ...rightUnmatched];
    }
  }, [activeJoinType]);

  // Join details & files
  const joinMeta = useMemo(() => {
    switch (activeJoinType) {
      case 'INNER':
        return {
          titleEn: 'INNER JOIN: Only Exact Key Matches',
          titleBn: 'INNER JOIN: শুধুমাত্র নিখুঁত মিল থাকা সারি',
          descEn: 'Only rows where dept_id = id match in BOTH tables. Tareq and Civil are excluded.',
          descBn: 'শুধুমাত্র যে সারিতে dept_id = id মিলেছে (রহিম ও করিম)। তারেক ও সিভিল উভয়ই বাদ।',
          sql: `SELECT Students.name, Departments.name AS dept, Departments.room\nFROM Students\nINNER JOIN Departments\n  ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/inner-join.svg',
          imgPath: '/images/joins/inner-join-venn.jpg'
        };
      case 'LEFT':
        return {
          titleEn: 'LEFT JOIN: Preserve All Students',
          titleBn: 'LEFT JOIN: বাম টেবিলের সব শিক্ষার্থী থাকবে',
          descEn: 'All 3 students are preserved. Tareq has no department, so department columns show NULL.',
          descBn: 'সব শিক্ষার্থী অক্ষুণ্ণ থাকবে। তারেকের কোনো ডিপার্টমেন্ট না থাকায় ডিপার্টমেন্ট কলামে NULL বসবে।',
          sql: `SELECT Students.name, Departments.name AS dept, Departments.room\nFROM Students\nLEFT JOIN Departments\n  ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/left-join.svg',
          imgPath: '/images/joins/left-join-venn.jpg'
        };
      case 'RIGHT':
        return {
          titleEn: 'RIGHT JOIN: Preserve All Departments',
          titleBn: 'RIGHT JOIN: ডান টেবিলের সব ডিপার্টমেন্ট থাকবে',
          descEn: 'All 3 departments are preserved. Civil has 0 students, so student columns show NULL.',
          descBn: 'সব ডিপার্টমেন্ট অক্ষুণ্ণ থাকবে। সিভিল ইঞ্জিনিয়ারিংয়ে কোনো শিক্ষার্থী না থাকায় শিক্ষার্থীর ঘরে NULL বসবে।',
          sql: `SELECT Students.name, Departments.name AS dept, Departments.room\nFROM Students\nRIGHT JOIN Departments\n  ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/right-join.svg',
          imgPath: '/images/joins/right-join-venn.jpg'
        };
      case 'FULL':
        return {
          titleEn: 'FULL OUTER JOIN: Complete Union of Both',
          titleBn: 'FULL OUTER JOIN: উভয় টেবিলের পূর্ণ ইউনিয়ন',
          descEn: 'Combines both tables. Non-matching students and departments are filled with NULL values.',
          descBn: 'উভয় টেবিলের সব রেকর্ড একসাথে। অমিল থাকা অংশে স্বয়ংক্রিয়ভাবে NULL বসবে।',
          sql: `-- Standard SQL (PostgreSQL, Oracle, SQL Server):\nSELECT Students.name, Departments.name AS dept\nFROM Students\nFULL OUTER JOIN Departments\n  ON Students.dept_id = Departments.id;\n\n-- MySQL Simulation:\nSELECT Students.name, Departments.name FROM Students LEFT JOIN Departments ON Students.dept_id = Departments.id\nUNION\nSELECT Students.name, Departments.name FROM Students RIGHT JOIN Departments ON Students.dept_id = Departments.id;`,
          svgPath: '/images/joins/full-join.svg',
          imgPath: '/images/joins/full-join-venn.jpg'
        };
    }
  }, [activeJoinType]);

  return (
    <>
      {/* ========================================================
          PART 17: SQL JOINS VISUALIZER & 3-STAGE FLOW PIPELINE
          Left-to-Right Flow: 1. Input Tables ➔ 2. Venn Logic ➔ 3. Output Table
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-3.5 md:p-5 space-y-3.5">
        {/* Header with 4 Interactive Join Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                {language === 'bn' ? 'পার্ট ১৭ • ৩-ধাপের জয়েন পাইপলাইন' : 'Part 17 of 20 • 3-Stage Joins Pipeline'}
              </span>
              <h2 className="text-base md:text-lg font-bold text-white mt-0.5">
                <DualText
                  as="span"
                  en="SQL Joins Visual Flow: Inputs ➔ Venn Set Logic ➔ Result"
                  bn="এসকিউএল জয়েনস ভিজ্যুয়াল ফ্লো: ইনপুট টেবিলদ্বয় ➔ ভেন ডায়াগ্রাম ➔ আউটপুট"
                />
              </h2>
            </div>
          </div>

          {/* 4 Join Toggles */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as const).map(j => (
              <button
                key={j}
                onClick={() => setActiveJoinType(j)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeJoinType === j
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeJoinType === j ? 'bg-white' : 'bg-zinc-600'}`} />
                <span>{j} JOIN</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline Step Headers (Desktop Guide) */}
        <div className="hidden lg:grid grid-cols-12 gap-3.5 text-xs font-mono font-bold">
          <div className="col-span-4 flex items-center justify-between text-cyan-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Stage 1: Input Tables (A & B)</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="col-span-4 flex items-center justify-between text-purple-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Stage 2: Venn Set Operation</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </div>
          <div className="col-span-4 flex items-center justify-between text-emerald-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Stage 3: Joined Result Table</span>
            <span className="text-[10px] text-zinc-400 font-normal">{outputRows.length} rows</span>
          </div>
        </div>

        {/* 3-Column Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          
          {/* ========================================================
              COLUMN 1: INPUT TABLES (Table A & Table B)
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2.5 p-3 rounded-xl bg-[#14182d] border border-slate-700/60">
            {/* Table A (Students) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-cyan-300 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" />
                  Table A: Students (Left)
                </span>
                <span className="text-[10px] text-zinc-400 bg-black/40 px-1.5 py-0.2 rounded border border-slate-800">
                  Key: dept_id (FK)
                </span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/50">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-slate-950 text-zinc-400 text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-2 py-1">id</th>
                      <th className="px-2 py-1">name</th>
                      <th className="px-2 py-1 text-center">dept_id</th>
                      <th className="px-2 py-1 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {studentRowStatus.map(s => (
                      <tr
                        key={s.id}
                        className={`transition ${
                          s.included ? 'bg-cyan-500/5 text-zinc-200' : 'opacity-40 bg-rose-500/5 text-zinc-500 line-through'
                        }`}
                      >
                        <td className="px-2 py-1 text-zinc-400">#{s.id}</td>
                        <td className="px-2 py-1 font-bold text-white">{s.name}</td>
                        <td className="px-2 py-1 text-center">
                          {s.deptId !== null ? (
                            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px]">
                              {s.deptId}
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold">
                              NULL
                            </span>
                          )}
                        </td>
                        <td className="px-2 py-1 text-right">
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
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

            {/* Visual ON Condition Bridge */}
            <div className="flex items-center justify-center py-0.5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-zinc-300 shadow-sm">
                <Link2 className="w-3 h-3 text-cyan-400" />
                <span>ON Students.dept_id = Depts.id</span>
              </div>
            </div>

            {/* Table B (Departments) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="font-bold text-purple-300 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" />
                  Table B: Departments (Right)
                </span>
                <span className="text-[10px] text-zinc-400 bg-black/40 px-1.5 py-0.2 rounded border border-slate-800">
                  Key: id (PK)
                </span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/50">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-slate-950 text-zinc-400 text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="px-2 py-1">id (PK)</th>
                      <th className="px-2 py-1">dept_name</th>
                      <th className="px-2 py-1 text-center">room</th>
                      <th className="px-2 py-1 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {deptRowStatus.map(d => (
                      <tr
                        key={d.id}
                        className={`transition ${
                          d.included ? 'bg-purple-500/5 text-zinc-200' : 'opacity-40 bg-rose-500/5 text-zinc-500 line-through'
                        }`}
                      >
                        <td className="px-2 py-1 text-purple-300 font-bold">#{d.id}</td>
                        <td className="px-2 py-1 font-bold text-white">{d.name}</td>
                        <td className="px-2 py-1 text-center text-zinc-400">{d.room}</td>
                        <td className="px-2 py-1 text-right">
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
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

          {/* ========================================================
              COLUMN 2: UNCROPPED VENN DIAGRAM & SQL QUERY
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
            {/* Venn Diagram Header with SVG / Art toggle */}
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-purple-300 flex items-center gap-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Venn Diagram
              </span>
              <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded border border-slate-800 text-[10px]">
                <button
                  onClick={() => setUseSvg(true)}
                  className={`px-2 py-0.2 rounded transition cursor-pointer ${useSvg ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  Vector SVG
                </button>
                <button
                  onClick={() => setUseSvg(false)}
                  className={`px-2 py-0.2 rounded transition cursor-pointer ${!useSvg ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
                >
                  HD Art
                </button>
              </div>
            </div>

            {/* UNCROPPED VENN DIAGRAM (aspect-ratio preserved, object-contain, zero cropping) */}
            <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#0b0f19] p-2 flex items-center justify-center shadow-inner">
              <div className="w-full aspect-[16/10] max-h-48 flex items-center justify-center">
                <img
                  src={useSvg ? joinMeta.svgPath : joinMeta.imgPath}
                  alt={`${activeJoinType} JOIN Venn Diagram`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Generated SQL Code with Copy */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-emerald-400 uppercase">Generated SQL Query</span>
                <button
                  onClick={() => handleCopy(joinMeta.sql, 'joinsql')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  {copiedId === 'joinsql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy SQL</span>
                </button>
              </div>
              <pre className="p-2 rounded bg-black/80 text-[11px] font-mono text-emerald-300 overflow-x-auto border border-emerald-500/20 leading-relaxed max-h-24">
{joinMeta.sql}
              </pre>
            </div>
          </div>

          {/* ========================================================
              COLUMN 3: JOINED OUTPUT RESULT TABLE
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2.5 p-3 rounded-xl bg-[#14182d] border border-slate-700/60">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <DualText en={joinMeta.titleEn} bn={joinMeta.titleBn} />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                  {outputRows.length} Rows
                </span>
              </div>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 mt-1 leading-snug"
                en={joinMeta.descEn}
                bn={joinMeta.descBn}
              />
            </div>

            {/* Output Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/50">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-zinc-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-2">Student</th>
                    <th className="p-2">Department</th>
                    <th className="p-2">Room</th>
                    <th className="p-2 text-right">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {outputRows.map((r, i) => (
                    <tr
                      key={i}
                      className={`transition ${
                        r.status === 'matched' ? 'bg-emerald-500/5' : 'bg-amber-500/5'
                      }`}
                    >
                      <td className="p-2 font-bold text-white">
                        {r.name ? (
                          r.name
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                            NULL
                          </span>
                        )}
                      </td>
                      <td className="p-2">
                        {r.deptName ? (
                          <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-[11px]">
                            {r.deptName}
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            NULL
                          </span>
                        )}
                      </td>
                      <td className="p-2 text-zinc-400">
                        {r.room ? (
                          r.room
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                            NULL
                          </span>
                        )}
                      </td>
                      <td className="p-2 text-right">
                        {r.status === 'matched' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                            ✅ Matched
                          </span>
                        ) : r.status === 'left_only' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold">
                            ⚠️ NULL Dept
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                            ⚠️ NULL Student
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Insight Footer */}
            <div className="p-2 rounded-lg bg-black/40 border border-slate-800 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
              <span>💡 {activeJoinType === 'FULL' ? 'Simulated via UNION in MySQL' : 'Notice: NULL appears only on non-matching side!'}</span>
              <span className="text-cyan-400 font-bold">{outputRows.length} rows returned</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
