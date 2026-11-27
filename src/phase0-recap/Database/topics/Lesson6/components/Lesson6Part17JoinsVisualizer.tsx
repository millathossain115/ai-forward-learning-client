'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  Target,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';
type ModalTarget = 'students' | 'depts' | 'venn' | 'sql' | 'output' | null;

const TABLE_A_STUDENTS = [
  { id: 101, name: 'Rahim', cgpa: 3.82, deptId: 1 },
  { id: 102, name: 'Karim', cgpa: 3.45, deptId: 2 },
  { id: 103, name: 'Tareq', cgpa: 3.20, deptId: null },
];

const TABLE_B_DEPTS = [
  { id: 1, name: 'CSE', room: 'Lab 402', head: 'Dr. Hasan' },
  { id: 2, name: 'BBA', room: 'Tower 301', head: 'Prof. Alam' },
  { id: 3, name: 'Civil', room: 'Design 204', head: 'Dr. Karim' },
];

export default function Lesson6Part17JoinsVisualizer() {
  const { language } = useLanguage();
  const [activeJoinType, setActiveJoinType] = useState<JoinType>('INNER');
  const [useSvg, setUseSvg] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [modalTarget, setModalTarget] = useState<ModalTarget>(null);

  useEffect(() => {
    if (!isFullscreen && !modalTarget) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (modalTarget) {
          setModalTarget(null);
        } else {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen, modalTarget]);

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
      { id: 101, name: 'Rahim', cgpa: 3.82, deptName: 'CSE', room: 'Lab 402', head: 'Dr. Hasan', status: 'matched' as const },
      { id: 102, name: 'Karim', cgpa: 3.45, deptName: 'BBA', room: 'Tower 301', head: 'Prof. Alam', status: 'matched' as const },
    ];
    const leftUnmatched = [
      { id: 103, name: 'Tareq', cgpa: 3.20, deptName: null, room: null, head: null, status: 'left_only' as const },
    ];
    const rightUnmatched = [
      { id: null, name: null, cgpa: null, deptName: 'Civil', room: 'Design 204', head: 'Dr. Karim', status: 'right_only' as const },
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
          problemEn: 'Problem: List only enrolled students who already have an assigned department & lab room.',
          problemBn: 'সমস্যা: শুধুমাত্র সেইসব শিক্ষার্থীর তালিকা বের করো যাদের ডিপার্টমেন্ট ও রুম নির্ধারিত আছে।',
          outcomeEn: 'Expected Outcome: 2 matched rows (Rahim → CSE, Karim → BBA). Tareq & Civil are excluded.',
          outcomeBn: 'প্রত্যাশিত ফলাফল: ২টি ম্যাচিং সারি (Rahim → CSE, Karim → BBA)। Tareq ও Civil বাদ পড়বে।',
          sql: `SELECT S.name AS student, S.cgpa, D.name AS dept, D.room\nFROM Students S\nINNER JOIN Departments D\n  ON S.dept_id = D.id;`,
          svgPath: '/images/joins/inner-join.svg',
          imgPath: '/images/joins/inner-join-venn.jpg'
        };
      case 'LEFT':
        return {
          titleEn: 'LEFT JOIN: Keep Every Student',
          titleBn: 'LEFT JOIN: বাম টেবিলের সব শিক্ষার্থী রাখুন',
          problemEn: 'Problem: Generate a complete student roster—including newly admitted students with no department yet.',
          problemBn: 'সমস্যা: ডিপার্টমেন্ট পায়নি এমন নতুন শিক্ষার্থীসহ সব শিক্ষার্থীর পূর্ণাঙ্গ তালিকা তৈরি করো।',
          outcomeEn: 'Expected Outcome: All 3 students appear. Tareq has NULL in dept & room columns.',
          outcomeBn: 'প্রত্যাশিত ফলাফল: ৩ জন শিক্ষার্থীই আসবে। Tareq-এর dept ও room কলামে NULL বসবে।',
          sql: `SELECT S.name AS student, S.cgpa, D.name AS dept, D.room\nFROM Students S\nLEFT JOIN Departments D\n  ON S.dept_id = D.id;`,
          svgPath: '/images/joins/left-join.svg',
          imgPath: '/images/joins/left-join-venn.jpg'
        };
      case 'RIGHT':
        return {
          titleEn: 'RIGHT JOIN: Keep Every Department',
          titleBn: 'RIGHT JOIN: ডান টেবিলের সব ডিপার্টমেন্ট রাখুন',
          problemEn: 'Problem: Audit all university departments and rooms—even newly opened ones with 0 enrolled students.',
          problemBn: 'সমস্যা: কোনো শিক্ষার্থী ভর্তি না হলেও বিশ্ববিদ্যালয়ের সব ডিপার্টমেন্ট ও রুমের অডিট তালিকা বের করো।',
          outcomeEn: 'Expected Outcome: All 3 departments appear. Civil has NULL in student & cgpa columns.',
          outcomeBn: 'প্রত্যাশিত ফলাফল: ৩টি ডিপার্টমেন্টই আসবে। Civil-এর student ও cgpa কলামে NULL বসবে।',
          sql: `SELECT S.name AS student, S.cgpa, D.name AS dept, D.room\nFROM Students S\nRIGHT JOIN Departments D\n  ON S.dept_id = D.id;`,
          svgPath: '/images/joins/right-join.svg',
          imgPath: '/images/joins/right-join-venn.jpg'
        };
      case 'FULL':
        return {
          titleEn: 'FULL OUTER JOIN: Keep Everything',
          titleBn: 'FULL OUTER JOIN: দুই টেবিলের সব তথ্যই রাখুন',
          problemEn: 'Problem: Run a full data-gap audit to spot BOTH unassigned students AND empty departments together.',
          problemBn: 'সমস্যা: ডেটা অডিটের জন্য ডিপার্টমেন্টহীন শিক্ষার্থী এবং শিক্ষার্থীহীন ডিপার্টমেন্ট—দুটোই একসাথে খুঁজে বের করো।',
          outcomeEn: 'Expected Outcome: All 4 rows appear—matched pairs plus both NULL gaps (Tareq & Civil).',
          outcomeBn: 'প্রত্যাশিত ফলাফল: ৪টি সারিই আসবে—ম্যাচিং ডেটা এবং উভয় দিকের NULL গ্যাপ (Tareq ও Civil)।',
          sql: `-- PostgreSQL / SQL Server / Oracle:\nSELECT S.name AS student, S.cgpa, D.name AS dept, D.room\nFROM Students S\nFULL OUTER JOIN Departments D\n  ON S.dept_id = D.id;\n\n-- MySQL (LEFT + RIGHT via UNION):\nSELECT S.name AS student, S.cgpa, D.name AS dept, D.room\nFROM Students S LEFT JOIN Departments D ON S.dept_id = D.id\nUNION\nSELECT S.name AS student, S.cgpa, D.name AS dept, D.room\nFROM Students S RIGHT JOIN Departments D ON S.dept_id = D.id;`,
          svgPath: '/images/joins/full-join.svg',
          imgPath: '/images/joins/full-join-venn.jpg'
        };
    }
  }, [activeJoinType]);

  return (
    <section
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0c101d] p-4 md:p-6 overflow-y-auto flex flex-col'
          : 'bg-[#0c101d] border border-slate-800/90 rounded-2xl p-4 md:p-5 space-y-3'
      }
    >
      <div className={isFullscreen ? 'w-full max-w-[1440px] mx-auto my-auto space-y-3' : 'space-y-3'}>
      {/* Header & Join Type Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৯ • জয়েন ভিজ্যুয়ালাইজার' : 'Part 9 of 13 • SQL Joins'}
            </span>
            <h2 className="text-base md:text-lg font-bold text-slate-100 mt-0.5 tracking-tight">
              <DualText
                as="span"
                en="SQL Joins: Problem, Logic & Visual Flow"
                bn="SQL JOIN: সমস্যা, লজিক এবং ভিজ্যুয়াল ফ্লো"
              />
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="flex flex-wrap items-center gap-1 bg-[#080b14] p-1 rounded-xl border border-slate-800">
            {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as const).map(j => (
              <button
                key={j}
                onClick={() => setActiveJoinType(j)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeJoinType === j
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeJoinType === j ? 'bg-white' : 'bg-slate-600'}`} />
                <span>{j} JOIN</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(prev => !prev)}
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen View'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#12172a] hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-slate-200 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-cyan-400" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Compact Problem Statement & Expected Outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-4 p-2.5 rounded-xl bg-[#12172a] border border-cyan-500/20 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-snug">
            <span className="font-bold text-slate-100 block">
              <DualText as="span" en="Why JOIN?" bn="JOIN কেন দরকার?" />
            </span>
            <DualText
              as="span"
              className="text-slate-300"
              en="Combine normalized tables (Students + Departments) via dept_id = id without duplicating data."
              bn="ডেটা ডুপ্লিকেট না করে dept_id = id দিয়ে আলাদা টেবিল (Students + Departments) একসাথে দেখতে।"
            />
          </div>
        </div>

        <div className="lg:col-span-8 p-2.5 rounded-xl bg-[#15171e] border border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <Target className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[11px] leading-snug">
              <DualText as="div" className="font-semibold text-cyan-300" en={joinMeta.problemEn} bn={joinMeta.problemBn} />
              <DualText as="div" className="text-slate-300" en={joinMeta.outcomeEn} bn={joinMeta.outcomeBn} />
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#080b14] border border-slate-800 text-emerald-400 shrink-0 self-start sm:self-center font-bold">
            {outputRows.length} {outputRows.length === 1 ? 'row' : 'rows'}
          </span>
        </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Column 1: Input Tables */}
        <div className="lg:col-span-4 flex flex-col gap-3 p-3.5 rounded-xl bg-[#12172a] border border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                Table A: Students (Left)
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 bg-[#080b14] px-2 py-0.5 rounded border border-slate-800">
                  FK: dept_id
                </span>
                <button
                  onClick={() => setModalTarget('students')}
                  title="Expand Students Table"
                  className="p-1 rounded bg-[#080b14] hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#080b14]">
              <table className="w-full text-left text-[11px] font-mono">
                <thead className="bg-[#0c101d] text-slate-400 text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-2 py-1.5">id</th>
                    <th className="px-2 py-1.5">name</th>
                    <th className="px-2 py-1.5 text-center">cgpa</th>
                    <th className="px-2 py-1.5 text-center">dept_id</th>
                    <th className="px-2 py-1.5 text-right">Status</th>
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
                      <td className="px-2 py-1.5 text-slate-400">#{s.id}</td>
                      <td className="px-2 py-1.5 font-bold text-slate-100">{s.name}</td>
                      <td className="px-2 py-1.5 text-center text-emerald-300">{s.cgpa.toFixed(2)}</td>
                      <td className="px-2 py-1.5 text-center">
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
                      <td className="px-2 py-1.5 text-right">
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
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 bg-[#080b14] px-2 py-0.5 rounded border border-slate-800">
                  PK: id
                </span>
                <button
                  onClick={() => setModalTarget('depts')}
                  title="Expand Departments Table"
                  className="p-1 rounded bg-[#080b14] hover:bg-slate-800 text-slate-400 hover:text-purple-300 border border-slate-800 transition cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#080b14]">
              <table className="w-full text-left text-[11px] font-mono">
                <thead className="bg-[#0c101d] text-slate-400 text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="px-2 py-1.5">id</th>
                    <th className="px-2 py-1.5">dept</th>
                    <th className="px-2 py-1.5 text-center">room</th>
                    <th className="px-2 py-1.5 text-center">head</th>
                    <th className="px-2 py-1.5 text-right">Status</th>
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
                      <td className="px-2 py-1.5 text-purple-300 font-bold">#{d.id}</td>
                      <td className="px-2 py-1.5 font-bold text-slate-100">{d.name}</td>
                      <td className="px-2 py-1.5 text-center text-slate-400">{d.room}</td>
                      <td className="px-2 py-1.5 text-center text-slate-400 text-[10px]">{d.head}</td>
                      <td className="px-2 py-1.5 text-right">
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
        <div className="lg:col-span-4 flex flex-col gap-3 p-3.5 rounded-xl bg-[#12172a] border border-slate-800">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="font-bold text-purple-300 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Venn Diagram
            </span>
            <div className="flex items-center gap-1.5">
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
              <button
                onClick={() => setModalTarget('venn')}
                title="Expand Venn Diagram"
                className="p-1 rounded bg-[#080b14] hover:bg-slate-800 text-slate-400 hover:text-purple-300 border border-slate-800 transition cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="w-full rounded-xl overflow-hidden border border-slate-800 bg-[#080b14] p-2 flex items-center justify-center">
            <div className="w-full aspect-[16/10] max-h-40 flex items-center justify-center">
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
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(joinMeta.sql, 'joinsql')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  {copiedId === 'joinsql' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'joinsql' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => setModalTarget('sql')}
                  title="Expand SQL Query"
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Pop-up</span>
                </button>
              </div>
            </div>
            <pre
              onClick={() => setModalTarget('sql')}
              title="Click to open full SQL Query pop-up"
              className="p-2.5 rounded-lg bg-[#080b14] text-xs font-mono text-emerald-300 overflow-x-auto border border-emerald-500/20 leading-relaxed max-h-32 cursor-pointer hover:border-emerald-400/50 transition"
            >
{joinMeta.sql}
            </pre>
          </div>
        </div>

        {/* Column 3: Joined Output */}
        <div className="lg:col-span-4 flex flex-col gap-3 p-3.5 rounded-xl bg-[#12172a] border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 gap-2">
            <span className="text-xs font-bold text-slate-100 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <DualText as="span" en={joinMeta.titleEn} bn={joinMeta.titleBn} />
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                {outputRows.length} Rows
              </span>
              <button
                onClick={() => setModalTarget('output')}
                title="Expand Output Table"
                className="p-1 rounded bg-[#080b14] hover:bg-slate-800 text-slate-400 hover:text-emerald-300 border border-slate-800 transition cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#080b14] flex-1">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0c101d] text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-2">Student</th>
                  <th className="p-2">CGPA</th>
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
                    <td className="p-2 text-emerald-300">
                      {r.cgpa !== null ? r.cgpa.toFixed(2) : (
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

          <div className="p-2 rounded-lg bg-[#080b14] border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>{activeJoinType === 'FULL' ? 'MySQL: simulate with UNION' : 'NULL = missing match on opposite side'}</span>
            <span className="text-cyan-400 font-bold">{outputRows.length} rows</span>
          </div>
        </div>
      </div>
      </div>

      {/* Pop-up Zoom Modal for Any Sub-Component */}
      {modalTarget && (
        <div
          onClick={() => setModalTarget(null)}
          className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl bg-[#0f1424] border border-slate-700 shadow-2xl p-5 md:p-6 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-100">
                <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs">
                  {activeJoinType} JOIN
                </span>
                <span>
                  {modalTarget === 'students' && 'Table A: Students (Left)'}
                  {modalTarget === 'depts' && 'Table B: Departments (Right)'}
                  {modalTarget === 'venn' && `${activeJoinType} JOIN — Venn Diagram`}
                  {modalTarget === 'sql' && `${activeJoinType} JOIN — Full SQL Query`}
                  {modalTarget === 'output' && `${activeJoinType} JOIN — Final Output (${outputRows.length} Rows)`}
                </span>
              </div>
              <button
                onClick={() => setModalTarget(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {modalTarget === 'students' && (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#080b14]">
                <table className="w-full text-left text-sm font-mono">
                  <thead className="bg-[#0c101d] text-slate-300 text-xs border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">id (PK)</th>
                      <th className="px-4 py-3">name</th>
                      <th className="px-4 py-3 text-center">cgpa</th>
                      <th className="px-4 py-3 text-center">dept_id (FK)</th>
                      <th className="px-4 py-3 text-right">Status ({activeJoinType})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {studentRowStatus.map(s => (
                      <tr key={s.id} className={s.included ? 'bg-cyan-500/5 text-slate-100' : 'opacity-45 bg-rose-500/5 text-slate-500 line-through'}>
                        <td className="px-4 py-3 text-slate-400">#{s.id}</td>
                        <td className="px-4 py-3 font-bold">{s.name}</td>
                        <td className="px-4 py-3 text-center text-emerald-300">{s.cgpa.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">{s.deptId ?? 'NULL'}</td>
                        <td className="px-4 py-3 text-right font-bold">{s.tag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {modalTarget === 'depts' && (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#080b14]">
                <table className="w-full text-left text-sm font-mono">
                  <thead className="bg-[#0c101d] text-slate-300 text-xs border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">id (PK)</th>
                      <th className="px-4 py-3">dept</th>
                      <th className="px-4 py-3 text-center">room</th>
                      <th className="px-4 py-3 text-center">head</th>
                      <th className="px-4 py-3 text-right">Status ({activeJoinType})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {deptRowStatus.map(d => (
                      <tr key={d.id} className={d.included ? 'bg-purple-500/5 text-slate-100' : 'opacity-45 bg-rose-500/5 text-slate-500 line-through'}>
                        <td className="px-4 py-3 text-purple-300 font-bold">#{d.id}</td>
                        <td className="px-4 py-3 font-bold">{d.name}</td>
                        <td className="px-4 py-3 text-center text-slate-300">{d.room}</td>
                        <td className="px-4 py-3 text-center text-slate-300">{d.head}</td>
                        <td className="px-4 py-3 text-right font-bold">{d.tag}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {modalTarget === 'venn' && (
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-800 bg-[#080b14] p-4 flex items-center justify-center">
                  <img
                    src={useSvg ? joinMeta.svgPath : joinMeta.imgPath}
                    alt={`${activeJoinType} JOIN Venn Diagram`}
                    className="w-full max-h-[55vh] object-contain"
                  />
                </div>
                <DualText as="p" className="text-xs text-slate-300" en={joinMeta.outcomeEn} bn={joinMeta.outcomeBn} />
              </div>
            )}

            {modalTarget === 'sql' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <DualText as="span" className="text-xs text-slate-300" en={joinMeta.problemEn} bn={joinMeta.problemBn} />
                  <button
                    onClick={() => handleCopy(joinMeta.sql, 'modal-sql')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer shrink-0"
                  >
                    {copiedId === 'modal-sql' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'modal-sql' ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#080b14] text-sm font-mono text-emerald-300 overflow-x-auto border border-emerald-500/30 leading-relaxed whitespace-pre-wrap">
{joinMeta.sql}
                </pre>
              </div>
            )}

            {modalTarget === 'output' && (
              <div className="space-y-3">
                <DualText as="p" className="text-xs text-slate-300" en={joinMeta.outcomeEn} bn={joinMeta.outcomeBn} />
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#080b14]">
                  <table className="w-full text-left text-sm font-mono">
                    <thead className="bg-[#0c101d] text-slate-300 text-xs uppercase border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">CGPA</th>
                        <th className="px-4 py-3">Dept</th>
                        <th className="px-4 py-3">Room</th>
                        <th className="px-4 py-3">Head</th>
                        <th className="px-4 py-3 text-right">Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      {outputRows.map((r, i) => (
                        <tr key={i} className={r.status === 'matched' ? 'bg-emerald-500/5' : 'bg-amber-500/5'}>
                          <td className="px-4 py-3 font-bold">{r.name ?? 'NULL'}</td>
                          <td className="px-4 py-3 text-emerald-300">{r.cgpa !== null ? r.cgpa.toFixed(2) : 'NULL'}</td>
                          <td className="px-4 py-3 text-purple-300 font-bold">{r.deptName ?? 'NULL'}</td>
                          <td className="px-4 py-3 text-slate-300">{r.room ?? 'NULL'}</td>
                          <td className="px-4 py-3 text-slate-300">{r.head ?? 'NULL'}</td>
                          <td className="px-4 py-3 text-right text-xs font-bold">
                            {r.status === 'matched' ? 'Matched' : r.status === 'left_only' ? 'NULL Dept' : 'NULL Student'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
