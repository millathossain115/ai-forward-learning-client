'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Building2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  ShieldCheck,
  Compass,
  FileCode2,
  Link2,
  Lock,
  PlusCircle,
  AlertCircle,
  Workflow
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseLesson4TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson4Topic({ onNavigate }: DatabaseLesson4TopicProps) {
  // Part 1: Simulation Mode for Ambiguity Demo
  const [simulatedUpdateMode, setSimulatedUpdateMode] = useState<'none' | 'by-name' | 'by-id'>('none');

  // Part 2: Active Key Tab
  const [activeKeyType, setActiveKeyType] = useState<
    'super' | 'candidate' | 'primary' | 'alternate' | 'foreign' | 'composite' | 'unique' | 'surrogate'
  >('primary');

  // Primary Key Playground State (Duplicate test)
  const [testPkId, setTestPkId] = useState('101');
  const [testPkName, setTestPkName] = useState('Sabbir');
  const [pkAlert, setPkAlert] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);

  // Foreign Key Playground State (Referential integrity test)
  const [selectedDeptId, setSelectedDeptId] = useState('D01');
  const [fkAlert, setFkAlert] = useState<{ type: 'error' | 'success'; msg: string } | null>(null);

  // Part 6: Exam Questions Accordion
  const [expandedExamQuestions, setExpandedExamQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const toggleExamQuestion = (id: number) => {
    setExpandedExamQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Part 8: Homework Reveal State
  const [revealedHomework, setRevealedHomework] = useState<Record<number, boolean>>({});

  const toggleHomework = (id: number) => {
    setRevealedHomework((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Existing Students Table
  const existingStudents = [
    { id: '101', name: 'Rahim', email: 'rahim@gmail.com', deptId: 'D01' },
    { id: '102', name: 'Karim', email: 'karim@gmail.com', deptId: 'D02' },
    { id: '103', name: 'Nila', email: 'nila@gmail.com', deptId: 'D03' },
  ];

  // Existing Departments Table
  const departments = [
    { id: 'D01', name: 'Computer Science & Engineering (CSE)' },
    { id: 'D02', name: 'Business Administration (BBA)' },
    { id: 'D03', name: 'Electrical & Electronic Engineering (EEE)' },
  ];

  // Handle PK Test Insert
  const handleTestInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingStudents.some((s) => s.id === testPkId.trim())) {
      setPkAlert({
        type: 'error',
        msg: `❌ Error: Primary Key Violation! Student_ID "${testPkId}" already exists. Duplicate keys are strictly rejected by the database engine.`,
      });
    } else if (!testPkId.trim()) {
      setPkAlert({
        type: 'error',
        msg: '❌ Error: Primary Key cannot be NULL or empty!',
      });
    } else {
      setPkAlert({
        type: 'success',
        msg: `✓ Success: Student "${testPkName}" with unique ID "${testPkId}" successfully accepted by the Primary Key constraint.`,
      });
    }
  };

  // Handle FK Test Assignment
  const handleFkTest = (deptId: string) => {
    setSelectedDeptId(deptId);
    if (deptId === 'D99') {
      setFkAlert({
        type: 'error',
        msg: '❌ Referential Integrity Violation! Dept_ID "D99" does not exist in parent table "DEPARTMENT". Database rejected the orphan record!',
      });
    } else {
      setFkAlert({
        type: 'success',
        msg: `✓ Referential Integrity Verified: Foreign Key "${deptId}" matches a valid Primary Key in the DEPARTMENT parent table.`,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d1020] to-[#070810] border border-[#202744] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Lesson 4 of your DBMS journey • Beginner level
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Relational Keys &amp; Integrity
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Lesson 4: Keys in DBMS – Complete Beginner&apos;s Guide
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              Welcome to Lesson 4! Today, we study one of the most critical topics in DBMS: <strong>Keys</strong>.
              Keys are essential because they uniquely identify records, prevent unwanted duplication, and establish unbreakable relationships between tables.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate?.('backend-lesson5')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <Workflow className="w-4 h-4" />
              <span>Next: Lesson 5 (ER Model)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson3')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lesson 3</span>
            </button>
          </div>
        </div>

        {/* Lesson 3 Recap Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Quick Recap from Lesson 3:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-indigo-400 block">Relation:</strong> Table
            </div>
            <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-cyan-400 block">Tuple:</strong> Row / Record
            </div>
            <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-purple-400 block">Attribute:</strong> Column / Field
            </div>
            <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-pink-400 block">Degree:</strong> Number of Columns
            </div>
            <div className="p-2 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-emerald-400 block">Cardinality:</strong> Number of Rows
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHY DO WE NEED KEYS?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 1 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Why do we need keys? (কী-এর প্রয়োজনীয়তা)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Imagine a university student database table without an ID. Look at what happens:
          </p>

          {/* Interactive Simulation Controls */}
          <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono">
            <span className="text-zinc-400 font-bold">Try Interactive Update:</span>
            <button
              onClick={() => setSimulatedUpdateMode('by-name')}
              className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                simulatedUpdateMode === 'by-name'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                  : 'bg-[#121526] border-slate-700 text-zinc-300 hover:border-slate-500'
              }`}
            >
              1. UPDATE Age = 23 WHERE Name = &apos;Rahim&apos;
            </button>
            <button
              onClick={() => setSimulatedUpdateMode('by-id')}
              className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                simulatedUpdateMode === 'by-id'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-[#121526] border-slate-700 text-zinc-300 hover:border-slate-500'
              }`}
            >
              2. UPDATE Age = 23 WHERE Student_ID = 101
            </button>
            {simulatedUpdateMode !== 'none' && (
              <button
                onClick={() => setSimulatedUpdateMode('none')}
                className="px-2.5 py-1 text-[11px] text-zinc-400 hover:text-white cursor-pointer underline ml-auto"
              >
                Reset
              </button>
            )}
          </div>

          {/* Problem Table without Keys vs Solution Table with Keys */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl bg-[#0c0e18] border transition-all space-y-2 ${
              simulatedUpdateMode === 'by-name' ? 'border-rose-500 ring-1 ring-rose-500/30' : 'border-rose-900/50'
            }`}>
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Problem: Table WITHOUT Keys
              </span>
              <div className="overflow-x-auto text-[11px] font-mono">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-zinc-400">
                      <th className="py-1 px-2">Name</th>
                      <th className="py-1 px-2">Age</th>
                      <th className="py-1 px-2">Department</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                    <tr className={simulatedUpdateMode === 'by-name' ? 'bg-rose-950/40 text-rose-200 font-bold' : 'bg-rose-950/20 text-rose-300 font-bold'}>
                      <td className="py-1 px-2">Rahim</td>
                      <td className="py-1 px-2">{simulatedUpdateMode === 'by-name' ? '23 ⚠️' : '22'}</td>
                      <td className="py-1 px-2">CSE</td>
                    </tr>
                    <tr><td className="py-1 px-2">Karim</td><td className="py-1 px-2">23</td><td className="py-1 px-2">BBA</td></tr>
                    <tr className={simulatedUpdateMode === 'by-name' ? 'bg-rose-950/40 text-rose-200 font-bold' : 'bg-rose-950/20 text-rose-300 font-bold'}>
                      <td className="py-1 px-2">Rahim</td>
                      <td className="py-1 px-2">{simulatedUpdateMode === 'by-name' ? '23 ⚠️' : '22'}</td>
                      <td className="py-1 px-2">CSE</td>
                    </tr>
                    <tr><td className="py-1 px-2">Nila</td><td className="py-1 px-2">21</td><td className="py-1 px-2">EEE</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-rose-300 leading-snug">
                {simulatedUpdateMode === 'by-name'
                  ? '❌ Ambiguity Disaster! অনিচ্ছাকৃতভাবে দুজন রহিমের বয়সই পরিবর্তিত হয়ে গেল। ডেটা করাপ্ট হলো!'
                  : '⚠️ দুটি ভিন্ন ছাত্রেরই নাম "Rahim", বয়স ২২ এবং ডিপার্টমেন্ট CSE। ডেটাবেস কোনোভাবেই নিশ্চিত হতে পারবে না কোন রহিমের রেজাল্ট আপডেট করতে হবে!'}
              </p>
            </div>

            {/* Solution Table with Student_ID Key */}
            <div className={`p-4 rounded-xl bg-[#0c0e18] border transition-all space-y-2 ${
              simulatedUpdateMode === 'by-id' ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-emerald-900/50'
            }`}>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Solution: Table WITH Primary Key (Student_ID)
              </span>
              <div className="overflow-x-auto text-[11px] font-mono">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-zinc-400">
                      <th className="py-1 px-2 text-amber-400">Student_ID (Key)</th>
                      <th className="py-1 px-2">Name</th>
                      <th className="py-1 px-2">Age</th>
                      <th className="py-1 px-2">Department</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                    <tr className={simulatedUpdateMode === 'by-id' ? 'bg-emerald-950/40 text-emerald-200 font-bold' : ''}>
                      <td className="py-1 px-2 text-amber-400 font-bold">101</td>
                      <td className="py-1 px-2">Rahim</td>
                      <td className="py-1 px-2">{simulatedUpdateMode === 'by-id' ? '23 ✓' : '22'}</td>
                      <td className="py-1 px-2">CSE</td>
                    </tr>
                    <tr><td className="py-1 px-2 text-amber-400 font-bold">102</td><td className="py-1 px-2">Karim</td><td className="py-1 px-2">23</td><td className="py-1 px-2">BBA</td></tr>
                    <tr><td className="py-1 px-2 text-amber-400 font-bold">103</td><td className="py-1 px-2">Rahim</td><td className="py-1 px-2">22</td><td className="py-1 px-2">CSE</td></tr>
                    <tr><td className="py-1 px-2 text-amber-400 font-bold">104</td><td className="py-1 px-2">Nila</td><td className="py-1 px-2">21</td><td className="py-1 px-2">EEE</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-emerald-300 leading-snug">
                {simulatedUpdateMode === 'by-id'
                  ? '✓ Precise Target! শুধু Student_ID = 101 বিশিষ্ট কাঙ্ক্ষিত রহিমকে আপডেট করা হয়েছে। অন্য রহিমের ডেটা অক্ষত রয়েছে।'
                  : '✓ এখন Student_ID দিয়ে প্রতিটি রেকর্ড নির্ভুল ও অদ্বিতীয়ভাবে শনাক্ত করা সম্ভব।'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 leading-relaxed font-sans">
            <strong>Formal Definition:</strong> A key is an attribute or a set of attributes used to identify records uniquely or establish relationships between database tables.
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: THE 8 CORE TYPES OF KEYS IN DBMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 2 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 8 Types of Keys in DBMS</h2>
          </div>
        </div>

        {/* 8 Key Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'super', label: '1. Super Key', tag: 'All Unique Combos' },
            { id: 'candidate', label: '2. Candidate Key', tag: 'Minimal Super Key' },
            { id: 'primary', label: '3. Primary Key', tag: 'Main Unique ID' },
            { id: 'alternate', label: '4. Alternate Key', tag: 'Remaining Candidates' },
            { id: 'foreign', label: '5. Foreign Key', tag: 'Connects Tables' },
            { id: 'composite', label: '6. Composite Key', tag: 'Multiple Columns' },
            { id: 'unique', label: '7. Unique Key', tag: 'No Duplicates' },
            { id: 'surrogate', label: '8. Natural vs Surrogate', tag: 'Real vs Artificial' },
          ].map((tab) => {
            const isActive = activeKeyType === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveKeyType(tab.id as typeof activeKeyType)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-md'
                    : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
                }`}
              >
                <span className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                  {tab.label}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono">{tab.tag}</span>
              </button>
            );
          })}
        </div>

        {/* ----------------------------------------------------
            TAB 1: SUPER KEY
           ---------------------------------------------------- */}
        {activeKeyType === 'super' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">1. Super Key (সুপার কী)</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Any Unique Combination
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A Super Key is a set of one or more attributes that uniquely identifies each tuple in a relation.
              <br />
              <strong className="text-amber-300">Important Point:</strong> A Super Key can contain <em>unnecessary (redundant)</em> attributes!
            </p>

            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-zinc-400 text-[10px] uppercase font-bold block">
                Valid Super Keys for STUDENT(Student_ID, Email, Name, Department):
              </span>
              <div className="flex flex-wrap gap-2 text-indigo-300">
                <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Student_ID</span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Email</span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Student_ID + Name</span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Email + Department</span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Student_ID + Email + Name</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans pt-1">
                Notice: <code>Student_ID</code> একাই যথেষ্ট হলেও <code>Student_ID + Name</code> ও একটি সুপার কী, কারণ এটি দিয়েও রেকর্ডটি ইউনিকভাবে চেনা যায়।
              </p>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 2: CANDIDATE KEY
           ---------------------------------------------------- */}
        {activeKeyType === 'candidate' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">2. Candidate Key (ক্যান্ডিডেট কী)</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                Minimal Super Key
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A Candidate Key is a <strong>minimal Super Key</strong> that uniquely identifies each tuple in a relation without any redundant attributes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold block">Super Key:</span>
                <p className="text-zinc-300 leading-snug">
                  May contain extra fields (e.g. <code>Student_ID + Name</code>). Can be minimal or non-minimal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/40 space-y-1">
                <span className="text-cyan-400 font-bold block">Candidate Key:</span>
                <p className="text-zinc-300 leading-snug">
                  Must be minimal (e.g. <code>Student_ID</code> or <code>Email</code>). No extra attribute can be removed!
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono text-center text-amber-300 font-bold">
              &ldquo;Every Candidate Key is a Super Key, but every Super Key is NOT a Candidate Key!&rdquo;
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 3: PRIMARY KEY (WITH INTERACTIVE TESTER)
           ---------------------------------------------------- */}
        {activeKeyType === 'primary' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-amber-500/40 space-y-5 animate-in fade-in duration-200 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">3. Primary Key (প্রাইমারি কী)</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                Unique &amp; NOT NULL
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A Primary Key is the selected Candidate Key chosen by the database designer to uniquely identify each tuple in a relation.
            </p>

            {/* 4 Strict Rules of Primary Key */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
              <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
                <strong className="text-amber-400 block">1. Unique</strong>
                <span className="text-[10px] text-zinc-500">No duplicates</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
                <strong className="text-rose-400 block">2. NOT NULL</strong>
                <span className="text-[10px] text-zinc-500">Cannot be empty</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
                <strong className="text-cyan-400 block">3. Only One PK</strong>
                <span className="text-[10px] text-zinc-500">Per table constraint</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
                <strong className="text-emerald-400 block">4. Fast Index</strong>
                <span className="text-[10px] text-zinc-500">B-Tree indexed</span>
              </div>
            </div>

            {/* Interactive Duplicate Insert Simulator */}
            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                Primary Key Interactive Simulator: Try inserting Student_ID 101
              </span>

              <form onSubmit={handleTestInsert} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={testPkId}
                  onChange={(e) => setTestPkId(e.target.value)}
                  placeholder="Student ID (e.g. 101 or 105)"
                  className="bg-[#121526] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono w-full sm:w-1/3"
                />
                <input
                  type="text"
                  value={testPkName}
                  onChange={(e) => setTestPkName(e.target.value)}
                  placeholder="Student Name"
                  className="bg-[#121526] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-sans w-full sm:w-1/3"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer transition-all shadow-md shrink-0"
                >
                  Test Insert
                </button>
              </form>

              {pkAlert && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    pkAlert.type === 'error'
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                      : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  }`}
                >
                  {pkAlert.type === 'error' ? <XCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                  <span>{pkAlert.msg}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 4: ALTERNATE KEY
           ---------------------------------------------------- */}
        {activeKeyType === 'alternate' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">4. Alternate Key (অল্টারনেট বা বিকল্প কী)</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Unselected Candidate Keys
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> An Alternate Key is any Candidate Key that was <em>not chosen</em> as the Primary Key.
            </p>

            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-zinc-400 text-[10px] uppercase font-bold block">Example Scenario:</span>
              <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-1">
                <div>Candidate Keys available: <code>Student_ID</code>, <code>Email</code></div>
                <div className="text-amber-400 font-bold">Selected as Primary Key: Student_ID</div>
                <div className="text-purple-300 font-bold">Becomes Alternate Key: Email</div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 5: FOREIGN KEY (WITH REFERENTIAL INTEGRITY TESTER)
           ---------------------------------------------------- */}
        {activeKeyType === 'foreign' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-emerald-500/40 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">5. Foreign Key &amp; Referential Integrity</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                Parent $\leftarrow$ Child Link
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A Foreign Key is an attribute in one table (child) that references the Primary Key or candidate key of another table (parent), establishing an unbreakable relationship.
            </p>

            {/* Parent-Child Table Visual Linkage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-amber-400 font-bold">Parent Table: DEPARTMENT</span>
                  <span className="text-[10px] text-zinc-500">PK: Dept_ID</span>
                </div>
                <div className="space-y-1">
                  {departments.map((d) => (
                    <div
                      key={d.id}
                      className={`p-2 rounded-lg transition-all flex justify-between items-center ${
                        selectedDeptId === d.id
                          ? 'bg-amber-500/20 border border-amber-500/60 text-white font-bold'
                          : 'bg-black/30 border border-slate-800/80 text-zinc-400'
                      }`}
                    >
                      <span className="text-amber-300 font-bold">{d.id}</span>
                      <span className="text-[11px] text-zinc-300">{d.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-emerald-400 font-bold">Child Table: STUDENT</span>
                  <span className="text-[10px] text-zinc-500">FK: Dept_ID &rarr; Dept</span>
                </div>
                <div className="space-y-1">
                  {existingStudents.map((s) => (
                    <div
                      key={s.id}
                      className={`p-2 rounded-lg transition-all flex justify-between items-center ${
                        selectedDeptId === s.deptId
                          ? 'bg-emerald-500/20 border border-emerald-500/60 text-white font-bold'
                          : 'bg-black/30 border border-slate-800/80 text-zinc-400'
                      }`}
                    >
                      <span>{s.id} · {s.name}</span>
                      <span className="px-2 py-0.5 rounded bg-black/60 text-emerald-400 font-bold border border-emerald-500/30">
                        FK: {s.deptId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Referential Integrity Tester */}
            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-400" />
                Referential Integrity Test: Select Department for Student
              </span>

              <div className="flex flex-wrap gap-2">
                {['D01', 'D02', 'D03', 'D99'].map((d) => (
                  <button
                    key={d}
                    onClick={() => handleFkTest(d)}
                    className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedDeptId === d
                        ? d === 'D99'
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                          : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-[#121526] border-slate-800 text-zinc-400'
                    }`}
                  >
                    Dept_ID: {d} {d === 'D99' ? '(Invalid Dept)' : ''}
                  </button>
                ))}
              </div>

              {fkAlert && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    fkAlert.type === 'error'
                      ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                      : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  }`}
                >
                  {fkAlert.type === 'error' ? <XCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                  <span>{fkAlert.msg}</span>
                </div>
              )}
            </div>

            {/* Foreign Key Rules Strip */}
            <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono space-y-1">
              <span className="text-zinc-400 font-bold block text-[10px] uppercase">Core Foreign Key Rules:</span>
              <ul className="list-disc list-inside text-zinc-300 space-y-0.5 text-[11px]">
                <li>A table can have multiple Foreign Keys.</li>
                <li>Foreign Keys CAN have duplicate values (many students in the same department).</li>
                <li>Foreign Keys CAN be NULL if a student has not declared a major yet.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 6: COMPOSITE KEY
           ---------------------------------------------------- */}
        {activeKeyType === 'composite' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">6. Composite Key (কম্পোজিট বা যৌথ কী)</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                $\ge 2$ Attributes
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A Composite Key is a primary or candidate key that consists of <strong>two or more attributes</strong> combined together to uniquely identify a record.
            </p>

            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-zinc-400 text-[10px] uppercase font-bold block">
                ENROLLMENT Table Example (Junction Table):
              </span>
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-pink-300">
                      <th className="py-1 px-2">Student_ID</th>
                      <th className="py-1 px-2">Course_ID</th>
                      <th className="py-1 px-2">Semester</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                    <tr><td className="py-1 px-2 font-bold text-white">101</td><td className="py-1 px-2">CSE101</td><td className="py-1 px-2">Spring 2026</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">101</td><td className="py-1 px-2">CSE201</td><td className="py-1 px-2">Spring 2026</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">102</td><td className="py-1 px-2">CSE101</td><td className="py-1 px-2">Spring 2026</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans pt-1">
                Notice: Student_ID repeats, Course_ID repeats. But <code>(Student_ID + Course_ID + Semester)</code> together is 100% unique!
              </p>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 7: UNIQUE KEY
           ---------------------------------------------------- */}
        {activeKeyType === 'unique' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">7. Unique Key (ইউনিক কী)</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Integrity Constraint
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A Unique Key constraint prevents duplicate values in a column or set of columns while still permitting NULL values (depending on the DBMS).
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18] text-xs font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2 px-3 text-amber-400 w-1/2">Primary Key</th>
                    <th className="py-2 px-3 text-cyan-400 w-1/2">Unique Constraint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                  <tr><td className="py-2 px-3">Identifies the row uniquely</td><td className="py-2 px-3">Prevents duplicate values in specific column</td></tr>
                  <tr><td className="py-2 px-3">Strictly CANNOT contain NULL</td><td className="py-2 px-3">Can contain NULL (PostgreSQL allows multiple NULLs)</td></tr>
                  <tr><td className="py-2 px-3">Only ONE Primary Key per table</td><td className="py-2 px-3">MULTIPLE Unique constraints allowed per table</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 8: NATURAL VS SURROGATE
           ---------------------------------------------------- */}
        {activeKeyType === 'surrogate' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">8. Natural Key vs Surrogate Key</h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Design Patterns
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
                <span className="text-indigo-400 font-bold block">Natural Key:</span>
                <p className="text-zinc-300 leading-snug">
                  Has real-world business meaning outside the DB.
                  <br />
                  <em>Examples:</em> National ID (NID), Passport Number, ISBN of a book, Product SKU.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40 space-y-1">
                <span className="text-emerald-400 font-bold block">Surrogate Key:</span>
                <p className="text-zinc-300 leading-snug">
                  Artificially generated sequence with no outside meaning.
                  <br />
                  <em>Examples:</em> <code>id = 1001, 1002</code>, auto-increment UUIDs. Faster joins!
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          PART 3: MASTER KEY COMPARISON TABLE & HIERARCHY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 3 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Master Key Comparison &amp; Hierarchy</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                <th className="py-2.5 px-4 font-bold text-amber-400">Key Type</th>
                <th className="py-2.5 px-4 font-bold text-white">Main Purpose</th>
                <th className="py-2.5 px-4 font-bold text-cyan-400">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr><td className="py-2 px-4 font-bold text-amber-300">Super Key</td><td className="py-2 px-4">All combinations that uniquely identify a row</td><td className="py-2 px-4 text-cyan-300">Student_ID + Name</td></tr>
              <tr><td className="py-2 px-4 font-bold text-cyan-300">Candidate Key</td><td className="py-2 px-4">Minimal Super Key (no redundant columns)</td><td className="py-2 px-4 text-cyan-300">Student_ID, Email</td></tr>
              <tr className="bg-amber-950/20"><td className="py-2 px-4 font-bold text-amber-400">Primary Key</td><td className="py-2 px-4 font-bold text-white">The chosen Candidate Key for row identity</td><td className="py-2 px-4 text-amber-300 font-bold">Student_ID</td></tr>
              <tr><td className="py-2 px-4 font-bold text-purple-300">Alternate Key</td><td className="py-2 px-4">Remaining Candidate Keys not picked as PK</td><td className="py-2 px-4 text-cyan-300">Email</td></tr>
              <tr className="bg-emerald-950/20"><td className="py-2 px-4 font-bold text-emerald-400">Foreign Key</td><td className="py-2 px-4 font-bold text-white">Connects child table to parent table PK</td><td className="py-2 px-4 text-emerald-300 font-bold">Dept_ID in Student</td></tr>
              <tr><td className="py-2 px-4 font-bold text-pink-300">Composite Key</td><td className="py-2 px-4">Key created from 2 or more columns</td><td className="py-2 px-4 text-cyan-300">Student_ID + Course_ID</td></tr>
              <tr><td className="py-2 px-4 font-bold text-indigo-300">Unique Key</td><td className="py-2 px-4">Enforces uniqueness constraint on column</td><td className="py-2 px-4 text-cyan-300">Phone_Number</td></tr>
            </tbody>
          </table>
        </div>

        {/* Visual Hierarchy Diagram */}
        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-center font-mono text-xs">
          <span className="text-[10px] text-zinc-400 uppercase font-bold block">The Hierarchy of Keys:</span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-700 text-indigo-300">
              Super Keys (All combos)
            </span>
            <span className="text-zinc-500">&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300">
              Candidate Keys (Minimal)
            </span>
            <span className="text-zinc-500">&rarr;</span>
            <span className="px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-700 text-amber-300 font-bold">
              Primary Key (1 Selected) + Alternate Keys
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4 & 5: PRACTICAL DB DESIGN & SQL DDL PREVIEW
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 4 &amp; 5 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical University Schema &amp; SQL DDL Code</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Table Architecture */}
          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-cyan-400 font-bold block uppercase text-[11px]">
              Relational Linkages:
            </span>
            <div className="space-y-2 text-[11px] text-zinc-300">
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <strong className="text-amber-400 block">1. DEPARTMENT</strong>
                <span>Dept_ID [PRIMARY KEY], Dept_Name</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <strong className="text-indigo-400 block">2. STUDENT</strong>
                <span>Student_ID [PK], Email [UNIQUE], Dept_ID [FOREIGN KEY &rarr; Department]</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <strong className="text-pink-400 block">3. ENROLLMENT</strong>
                <span>(Student_ID + Course_ID + Semester) [COMPOSITE KEY]</span>
              </div>
            </div>
          </div>

          {/* SQL DDL Snippet */}
          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 font-mono text-xs">
            <span className="text-emerald-400 font-bold block uppercase text-[11px]">
              Actual SQL DDL Syntax:
            </span>
            <pre className="p-3 rounded-lg bg-black/60 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-800">
{`CREATE TABLE Department (
    Dept_ID INT PRIMARY KEY,
    Dept_Name VARCHAR(50)
);

CREATE TABLE Student (
    Student_ID INT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,
    Name VARCHAR(50),
    Dept_ID INT,
    FOREIGN KEY (Dept_ID)
        REFERENCES Department(Dept_ID)
);`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6: UNIVERSITY EXAM PREPARATION (Q&A ACCORDION)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 6 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Exam Preparation (Short &amp; Long Q&amp;A)</h2>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 1,
              q: 'Q1. What is a Primary Key? (প্রাইমারি কী কী?)',
              a: 'A Primary Key is a selected Candidate Key that uniquely identifies each tuple in a relation. It cannot contain duplicate values and strictly cannot contain NULL values.',
            },
            {
              id: 2,
              q: 'Q2. What is a Foreign Key? (ফরেন কী কী?)',
              a: 'A Foreign Key is an attribute or set of attributes in a relation that references a candidate key (commonly the Primary Key) of another table, enforcing referential integrity.',
            },
            {
              id: 3,
              q: 'Q3. Define Candidate Key. (ক্যান্ডিডেট কী কাকে বলে?)',
              a: 'A Candidate Key is a minimal Super Key that uniquely identifies each tuple in a relation without any redundant attributes.',
            },
            {
              id: 4,
              q: 'Q4. What is a Super Key? (সুপার কী কী?)',
              a: 'A Super Key is an attribute or combination of attributes that uniquely identifies each tuple in a relation. It may contain redundant or unnecessary attributes.',
            },
            {
              id: 5,
              q: 'Q5. What is an Alternate Key? (অল্টারনেট কী কী?)',
              a: 'An Alternate Key is a Candidate Key that has not been selected as the Primary Key of the table.',
            },
            {
              id: 6,
              q: 'Q6. What is a Composite Key? (কম্পোজিট কী কী?)',
              a: 'A Composite Key is a key formed by combining two or more attributes together to collectively identify each tuple uniquely.',
            },
          ].map((item) => {
            const isExpanded = expandedExamQuestions[item.id];

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-[#121526] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExamQuestion(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs md:text-sm font-bold text-white font-sans">
                    {item.q}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-slate-800/60 bg-black/30">
                    <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          PART 8: GUIDED PRACTICAL CASE STUDY (EMPLOYEE TABLE)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 8 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical Case Study: EMPLOYEE Relation Analysis</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Consider the following employee relation where both <code>Employee_ID</code> and <code>Email</code> are unique:
        </p>

        {/* Employee Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                <th className="py-2 px-4 text-amber-400">Employee_ID</th>
                <th className="py-2 px-4 text-cyan-400">Email</th>
                <th className="py-2 px-4 text-white">Name</th>
                <th className="py-2 px-4 text-emerald-400">Department_ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr><td className="py-2 px-4 font-bold text-amber-300">E01</td><td className="py-2 px-4">a@gmail.com</td><td className="py-2 px-4">Rahim</td><td className="py-2 px-4 text-emerald-300">D01</td></tr>
              <tr><td className="py-2 px-4 font-bold text-amber-300">E02</td><td className="py-2 px-4">b@gmail.com</td><td className="py-2 px-4">Karim</td><td className="py-2 px-4 text-emerald-300">D02</td></tr>
              <tr><td className="py-2 px-4 font-bold text-amber-300">E03</td><td className="py-2 px-4">c@gmail.com</td><td className="py-2 px-4">Nila</td><td className="py-2 px-4 text-emerald-300">D01</td></tr>
              <tr><td className="py-2 px-4 font-bold text-amber-300">E04</td><td className="py-2 px-4">d@gmail.com</td><td className="py-2 px-4">Sami</td><td className="py-2 px-4 text-emerald-300">D03</td></tr>
            </tbody>
          </table>
        </div>

        {/* 8 Case Study Questions with Click to Reveal Mentor Solution */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider block">
            Click each question to inspect the verified mentor analysis:
          </span>

          {[
            {
              id: 1,
              q: '1. Identify all Candidate Keys in this table.',
              a: 'Candidate Keys: {Employee_ID} and {Email}. Both can independently and minimally identify every employee uniquely.',
            },
            {
              id: 2,
              q: '2. If Employee_ID is selected as Primary Key, what is the Alternate Key?',
              a: 'Alternate Key: {Email}. It was a candidate key that was not chosen as the primary identifier.',
            },
            {
              id: 3,
              q: '3. Is {Employee_ID + Name} a Super Key?',
              a: 'YES! Because Employee_ID is already unique, adding Name will still uniquely identify every row. Any superset of a candidate key is a Super Key.',
            },
            {
              id: 4,
              q: '4. Is {Employee_ID + Name} a Candidate Key?',
              a: 'NO! A Candidate Key must be minimal. Since "Name" is redundant and can be removed without losing uniqueness, {Employee_ID + Name} is not minimal.',
            },
            {
              id: 5,
              q: '5. Can Department_ID be a Foreign Key?',
              a: 'YES! Department_ID in EMPLOYEE can reference the Dept_ID Primary Key in the DEPARTMENT table.',
            },
            {
              id: 6,
              q: '6. Can Department_ID contain duplicate values in EMPLOYEE?',
              a: 'YES! Notice that Rahim and Nila both have Department_ID = D01. Foreign keys are allowed to have duplicates because multiple employees work in the same department (1:N relationship).',
            },
            {
              id: 7,
              q: '7. What happens if two employees try to register with the same Employee_ID?',
              a: 'The DBMS rejects the second insert with a "PRIMARY KEY constraint violation" error, keeping the database consistent.',
            },
            {
              id: 8,
              q: '8. Which key would you use to uniquely identify an employee?',
              a: 'Employee_ID is the recommended Primary Key (often as a compact surrogate or business identifier).',
            },
          ].map((item) => {
            const isRevealed = revealedHomework[item.id];

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-800 bg-[#121526] space-y-2 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white font-sans">{item.q}</span>
                  <button
                    onClick={() => toggleHomework(item.id)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 font-mono text-[11px] font-bold cursor-pointer transition-all border border-indigo-500/40 shrink-0"
                  >
                    {isRevealed ? 'Hide Solution' : 'Reveal Solution'}
                  </button>
                </div>

                {isRevealed && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 font-mono">
                    💡 <strong>Mentor Answer:</strong> {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Roadmap Bridge Navigation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Lesson 4 Completed
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              ✓ Keys &amp; Integrity Mastered
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            What&apos;s Next: Database Systems Architecture Roadmap
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Now that you have mastered <strong>Relational Keys</strong>, <strong>Foreign Key Constraints</strong>, and <strong>Referential Integrity</strong>, you are ready to explore the <strong>Sequential Architecture Roadmap</strong> covering buffer management, query execution plans, and indexing!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson3')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lesson 3</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson5')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Go to Lesson 5: ER Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
