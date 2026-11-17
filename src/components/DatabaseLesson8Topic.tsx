'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Building2,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Compass,
  FileCode2,
  Workflow,
  Share2,
  Terminal,
  Code2,
  Play,
  RotateCcw,
  Copy,
  Check,
  Search,
  Filter,
  Server,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Hash,
  Calendar,
  DollarSign,
  Type,
  Sliders,
  Eye,
  Zap,
  GitMerge,
  Trash2,
  Edit3,
  Plus,
  KeyRound,
  ListOrdered,
  Split,
  AlertOctagon,
  Minimize2
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson8TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson8Topic({ onNavigate }: DatabaseLesson8TopicProps) {
  // Section 1: Before vs After Normalization View
  const [normalizationView, setNormalizationView] = useState<'unnormalized' | 'normalized'>('unnormalized');

  // Section 3: Anomaly Simulator Active Tab
  const [activeAnomaly, setActiveAnomaly] = useState<'insertion' | 'update' | 'deletion'>('insertion');
  const [anomalySimulated, setAnomalySimulated] = useState<boolean>(false);

  // Section 4: Functional Dependency Explorer Tab
  const [activeFdType, setActiveFdType] = useState<'trivial' | 'nontrivial' | 'full' | 'partial' | 'transitive'>('partial');

  // Section 5-8: Normal Forms Step-by-Step Stepper
  const [activeNormalFormStep, setActiveNormalFormStep] = useState<'1NF' | '2NF' | '3NF' | 'BCNF'>('1NF');

  // Section 11: Exam Q&A Accordion State
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // Section 13: Homework Revealed Solutions
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Section 14: Revision Checklist Items
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  // Copy Snippet Feedback
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toggleSolution = (key: string) => {
    setRevealedSolutions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChecklist = (idx: number) => {
    setCheckedChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleExamQ = (id: string) => {
    setOpenExamQ(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Checklist completion calculation
  const checklistTotal = 15;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1228] via-[#121c42] to-[#070b1a] border border-indigo-900/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 8 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Schema Design Mastery
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 8: Database Normalization <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              1NF, 2NF, 3NF &amp; BCNF Step-by-Step
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Eliminate data redundancy, avoid devastating insertion/update/deletion anomalies, master Functional Dependencies (<code className="text-cyan-300 font-mono">A &rarr; B</code>), and decompose monolithic relations into elegant, lossless, third-normal-form schemas.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Anomalies: Insertion, Update &amp; Deletion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Full, Partial &amp; Transitive FDs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>1NF &rarr; 2NF &rarr; 3NF &rarr; BCNF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>University Exam Prep &amp; Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS DATABASE NORMALIZATION?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Minimize2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is Database Normalization?</h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Formal Definition</span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            <strong className="text-white">Database Normalization</strong> is the systematic process of organizing and decomposing relational tables to <strong>eliminate data redundancy</strong> and prevent <strong>insertion, update, and deletion anomalies</strong> while maintaining data integrity.
          </p>
          <blockquote className="p-3 bg-black/40 border-l-2 border-indigo-400 rounded text-xs text-indigo-200 italic font-sans mt-2">
            &ldquo;Normalization means dividing large, poorly organized tables into smaller, well-organized tables and establishing lossless relationships between them using Primary and Foreign Keys.&rdquo;
          </blockquote>
        </div>

        {/* Before vs After View Switcher */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              Visualizing Normalization: Monolithic vs Decomposed Tables
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setNormalizationView('unnormalized')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  normalizationView === 'unnormalized'
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                1. Poorly Designed (Unnormalized)
              </button>
              <button
                onClick={() => setNormalizationView('normalized')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  normalizationView === 'normalized'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                2. Normalized (3 Clean Tables)
              </button>
            </div>
          </div>

          {normalizationView === 'unnormalized' ? (
            <div className="p-5 rounded-2xl bg-[#14182d] border border-rose-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                  Student_Course Table (Massive Duplication)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  Violates 2NF &amp; 3NF
                </span>
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-zinc-300 font-mono">
                    <tr>
                      <th className="py-2 px-3">Student_ID</th>
                      <th className="py-2 px-3">Student_Name</th>
                      <th className="py-2 px-3">Course_ID</th>
                      <th className="py-2 px-3">Course_Name</th>
                      <th className="py-2 px-3">Instructor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-cyan-300">101</td>
                      <td className="py-2 px-3 text-white font-sans">Rahim</td>
                      <td className="py-2 px-3 text-amber-300">C01</td>
                      <td className="py-2 px-3 text-zinc-300">Database</td>
                      <td className="py-2 px-3 text-purple-300">Mr. Hasan</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-cyan-300">101</td>
                      <td className="py-2 px-3 text-rose-400 font-bold font-sans">Rahim (Duplicated!)</td>
                      <td className="py-2 px-3 text-amber-300">C02</td>
                      <td className="py-2 px-3 text-zinc-300">Networking</td>
                      <td className="py-2 px-3 text-purple-300">Mr. Karim</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-cyan-300">102</td>
                      <td className="py-2 px-3 text-white font-sans">Karim</td>
                      <td className="py-2 px-3 text-amber-300">C01</td>
                      <td className="py-2 px-3 text-rose-400 font-bold">Database (Duplicated!)</td>
                      <td className="py-2 px-3 text-rose-400 font-bold">Mr. Hasan (Duplicated!)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-cyan-300">103</td>
                      <td className="py-2 px-3 text-white font-sans">Sumaiya</td>
                      <td className="py-2 px-3 text-amber-300">C01</td>
                      <td className="py-2 px-3 text-rose-400 font-bold">Database (Duplicated!)</td>
                      <td className="py-2 px-3 text-rose-400 font-bold">Mr. Hasan (Duplicated!)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                <strong>4 Severe Flaws in this Table:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-zinc-300">
                  <li>Student names repeated for every course they register for.</li>
                  <li>Course names repeated for every student enrolled.</li>
                  <li>Instructor names repeated dozens or hundreds of times.</li>
                  <li>Changing an instructor requires modifying multiple rows, risking inconsistent data.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-900/40 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
                Clean Normalized Architecture: 3 Focused Relational Tables
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Students Table */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">1. Students Table</span>
                  <table className="w-full text-[11px] font-mono">
                    <thead className="text-zinc-500 border-b border-slate-800">
                      <tr>
                        <th className="py-1">Student_ID (PK)</th>
                        <th className="py-1">Student_Name</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      <tr><td className="py-1 text-cyan-300">101</td><td className="py-1 text-white font-sans">Rahim</td></tr>
                      <tr><td className="py-1 text-cyan-300">102</td><td className="py-1 text-white font-sans">Karim</td></tr>
                      <tr><td className="py-1 text-cyan-300">103</td><td className="py-1 text-white font-sans">Sumaiya</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Courses Table */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-amber-400">2. Courses Table</span>
                  <table className="w-full text-[11px] font-mono">
                    <thead className="text-zinc-500 border-b border-slate-800">
                      <tr>
                        <th className="py-1">Course_ID (PK)</th>
                        <th className="py-1">Course_Name</th>
                        <th className="py-1">Instructor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      <tr><td className="py-1 text-amber-300">C01</td><td className="py-1 text-zinc-300">Database</td><td className="py-1 text-purple-300">Mr. Hasan</td></tr>
                      <tr><td className="py-1 text-amber-300">C02</td><td className="py-1 text-zinc-300">Networking</td><td className="py-1 text-purple-300">Mr. Karim</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Enrollments Table */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">3. Enrollments (FK Links)</span>
                  <table className="w-full text-[11px] font-mono">
                    <thead className="text-zinc-500 border-b border-slate-800">
                      <tr>
                        <th className="py-1">Student_ID (FK)</th>
                        <th className="py-1">Course_ID (FK)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      <tr><td className="py-1 text-cyan-300">101</td><td className="py-1 text-amber-300">C01</td></tr>
                      <tr><td className="py-1 text-cyan-300">101</td><td className="py-1 text-amber-300">C02</td></tr>
                      <tr><td className="py-1 text-cyan-300">102</td><td className="py-1 text-amber-300">C01</td></tr>
                      <tr><td className="py-1 text-cyan-300">103</td><td className="py-1 text-amber-300">C01</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs text-emerald-300 font-sans">
                &check; Every student and course fact is stored exactly once. Duplication eliminated!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 2 & 3: DATABASE ANOMALIES INTERACTIVE SIMULATOR
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 2 &amp; 3 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 3 Deadly Database Anomalies</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          An <strong className="text-white">anomaly</strong> is a fatal side-effect that occurs during insertion, update, or deletion when data is stored in unnormalized tables. Click each anomaly below to simulate its real-world failure:
        </p>

        {/* Anomaly Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: 'insertion', title: '3.1 Insertion Anomaly', desc: 'Cannot insert without unwanted data' },
            { id: 'update', title: '3.2 Update Anomaly', desc: 'Inconsistent data when updating multi-rows' },
            { id: 'deletion', title: '3.3 Deletion Anomaly', desc: 'Deleting a row destroys independent facts' },
          ].map(a => (
            <button
              key={a.id}
              onClick={() => {
                setActiveAnomaly(a.id as any);
                setAnomalySimulated(false);
              }}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeAnomaly === a.id
                  ? 'bg-rose-500/20 border-rose-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{a.title}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{a.desc}</div>
            </button>
          ))}
        </div>

        {/* Anomaly Interactive Demonstration Box */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-rose-900/40 space-y-4">
          {activeAnomaly === 'insertion' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">Insertion Anomaly</span>
                <span className="text-[10px] font-mono text-zinc-400">Scenario: Adding a Brand New Course</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                The university introduces a new course: <code className="text-cyan-300">C03: Artificial Intelligence</code>. However, no student has enrolled in it yet!
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
                Attempt: INSERT INTO Student_Course VALUES (NULL, NULL, &apos;C03&apos;, &apos;AI&apos;);
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAnomalySimulated(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold cursor-pointer transition-all"
                >
                  Simulate Insert Operation
                </button>
              </div>

              {anomalySimulated && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs font-mono">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>ERROR 1048 (23000): Column &apos;Student_ID&apos; cannot be null!</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans">
                    Because <code className="text-rose-400">Student_ID</code> forms part of the primary key, it cannot be NULL! We literally <strong>cannot offer the new course</strong> unless we invent a fake fictitious student!
                  </p>
                  <p className="text-[11px] text-emerald-300 font-sans font-bold">
                    &check; Normalization Solution: Store course records in an independent Courses table.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeAnomaly === 'update' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Update Anomaly</span>
                <span className="text-[10px] font-mono text-zinc-400">Scenario: Renaming &apos;Database&apos; Course</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                The course name changes from &ldquo;Database&rdquo; to &ldquo;Database Management Systems&rdquo;.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
                Course C01 appears in 50 student rows across the database.
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAnomalySimulated(true)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold cursor-pointer transition-all"
                >
                  Simulate Incomplete Batch Update
                </button>
              </div>

              {anomalySimulated && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Data Inconsistency Warning!</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans">
                    If 49 rows are updated but the system crashes or misses row 50, the database now reports two conflicting names for the exact same course ID <code className="text-amber-300">C01</code>!
                  </p>
                  <p className="text-[11px] text-emerald-300 font-sans font-bold">
                    &check; Normalization Solution: Store course name once in the Courses table; update exactly 1 row.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeAnomaly === 'deletion' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">Deletion Anomaly</span>
                <span className="text-[10px] font-mono text-zinc-400">Scenario: Karim Drops Networking</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Karim (102) is the only student currently enrolled in <code className="text-cyan-300">C02: Networking</code>. Karim decides to drop the semester.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-zinc-300">
                DELETE FROM Student_Course WHERE Student_ID = 102 AND Course_ID = &apos;C02&apos;;
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setAnomalySimulated(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold cursor-pointer transition-all"
                >
                  Simulate Row Deletion
                </button>
              </div>

              {anomalySimulated && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs font-mono">
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>Catastrophic Data Loss: Networking Course Wiped Out!</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans">
                    By deleting Karim&apos;s registration, we accidentally deleted the course name <code className="text-rose-400">&apos;Networking&apos;</code> and instructor name <code className="text-rose-400">&apos;Mr. Karim&apos;</code> from the entire university system!
                  </p>
                  <p className="text-[11px] text-emerald-300 font-sans font-bold">
                    &check; Normalization Solution: Store course information in its own dedicated table.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 4: FUNCTIONAL DEPENDENCY (FD)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 4 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Functional Dependency (FD): The Mathematical Core</h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Concept: A &rarr; B (A determines B)</span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            A <strong>functional dependency</strong> is a constraint between two sets of attributes in a relation. If the value of attribute <strong className="text-cyan-400">A</strong> uniquely determines the value of attribute <strong className="text-purple-400">B</strong> for every tuple, we write <code className="text-emerald-400 font-mono">A &rarr; B</code>. Attribute <code className="text-cyan-300">A</code> is called the <strong>determinant</strong>.
          </p>
          <div className="p-3 bg-black/40 rounded-lg text-xs font-mono text-zinc-300">
            Student_ID &rarr; Student_Name &nbsp;|&nbsp; Course_ID &rarr; Course_Name
          </div>
          <p className="text-[11px] text-zinc-400 font-sans">
            * Note: FDs are strictly one-way! <code className="text-amber-300">Student_ID &rarr; Name</code> is valid, but <code className="text-rose-400">Name &#8603; Student_ID</code> is invalid because multiple students can share the same name.
          </p>
        </div>

        {/* 5 Types of Functional Dependencies */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
            5 Essential Types of Functional Dependencies
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'trivial', label: '1. Trivial', formula: '(A, B) → B' },
              { id: 'nontrivial', label: '2. Non-Trivial', formula: 'A → B' },
              { id: 'full', label: '3. Full FD', formula: '(A, B) → C' },
              { id: 'partial', label: '4. Partial FD', formula: 'A → C (Violates 2NF)' },
              { id: 'transitive', label: '5. Transitive', formula: 'A → B → C (Violates 3NF)' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveFdType(t.id as any)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  activeFdType === t.id
                    ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg'
                    : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-mono font-bold">{t.label}</div>
                <div className="text-[10px] text-cyan-300 mt-0.5 font-mono">{t.formula}</div>
              </button>
            ))}
          </div>

          {/* FD Detail Card */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-2">
            {activeFdType === 'trivial' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Trivial Functional Dependency</span>
                <p className="text-xs text-zinc-300 font-sans">
                  A dependency is trivial if the right-hand attribute is a subset of the left-hand attribute: <code className="text-emerald-400 font-mono">Y &sube; X</code>.
                </p>
                <div className="p-3 bg-black/60 rounded font-mono text-xs text-amber-300">
                  (Student_ID, Name) &rarr; Name &nbsp;&nbsp;[Guaranteed to be true by definition]
                </div>
              </div>
            )}

            {activeFdType === 'nontrivial' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Non-Trivial Functional Dependency</span>
                <p className="text-xs text-zinc-300 font-sans">
                  A dependency is non-trivial if the right-hand attribute is NOT included in the left-hand side: <code className="text-emerald-400 font-mono">Y &nsub; X</code>.
                </p>
                <div className="p-3 bg-black/60 rounded font-mono text-xs text-amber-300">
                  Student_ID &rarr; Student_Name &nbsp;&nbsp;[Meaningful constraint in real schemas]
                </div>
              </div>
            )}

            {activeFdType === 'full' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Full Functional Dependency</span>
                <p className="text-xs text-zinc-300 font-sans">
                  An attribute depends on the <strong>entire composite key</strong>, and removing any attribute from the key breaks the dependency.
                </p>
                <div className="p-3 bg-black/60 rounded font-mono text-xs text-emerald-400">
                  (Student_ID, Course_ID) &rarr; Grade &nbsp;&nbsp;[Grade requires BOTH student and course!]
                </div>
              </div>
            )}

            {activeFdType === 'partial' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">Partial Dependency (Target of 2NF)</span>
                <p className="text-xs text-zinc-300 font-sans">
                  A non-prime attribute depends on only <strong>part of a composite candidate key</strong>.
                </p>
                <div className="p-3 bg-black/60 rounded font-mono text-xs text-rose-400">
                  (Student_ID, Course_ID) &rarr; Student_Name &nbsp;&nbsp;[Student_Name depends ONLY on Student_ID!]
                </div>
              </div>
            )}

            {activeFdType === 'transitive' && (
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">Transitive Dependency (Target of 3NF)</span>
                <p className="text-xs text-zinc-300 font-sans">
                  A non-key attribute determines another non-key attribute through an intermediary: <code className="text-cyan-300 font-mono">A &rarr; B and B &rarr; C &rArr; A &rarr; C</code>.
                </p>
                <div className="p-3 bg-black/60 rounded font-mono text-xs text-purple-300">
                  Student_ID &rarr; Department_ID and Department_ID &rarr; Department_Name &nbsp;&rArr; Student_ID &rarr; Department_Name
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5 - 8: THE 4 NORMAL FORMS (1NF, 2NF, 3NF, BCNF)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 5 to 8 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Step-by-Step Normal Forms: 1NF, 2NF, 3NF &amp; BCNF</h2>
          </div>
        </div>

        {/* Normal Form Stepper Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: '1NF', label: '1NF: Atomic Values', rule: 'No repeating groups' },
            { id: '2NF', label: '2NF: No Partial FDs', rule: 'Full key dependency' },
            { id: '3NF', label: '3NF: No Transitive FDs', rule: 'No non-key to non-key' },
            { id: 'BCNF', label: 'BCNF: Superkey Determinants', rule: 'Every determinant is superkey' },
          ].map(nf => (
            <button
              key={nf.id}
              onClick={() => setActiveNormalFormStep(nf.id as any)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeNormalFormStep === nf.id
                  ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-300">{nf.id}</div>
              <div className="text-xs font-bold text-white mt-0.5 font-sans">{nf.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">{nf.rule}</div>
            </button>
          ))}
        </div>

        {/* Active Normal Form Explanation Card */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          {activeNormalFormStep === '1NF' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">First Normal Form (1NF)</h3>
                  <p className="text-xs text-zinc-400">Rule: Every attribute cell must contain a single atomic (indivisible) value.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Atomic Integrity
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 space-y-2">
                  <span className="text-xs font-mono font-bold text-rose-400">&cross; Violates 1NF (Multi-valued cells):</span>
                  <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-zinc-300">
                    <div>101 | Rahim | 01711111111, 01822222222</div>
                    <div>102 | Karim | 01933333333</div>
                    <div>103 | Sumaiya | 01644444444, 01555555555</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/40 space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">&check; 1NF Achieved (Atomic values):</span>
                  <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-zinc-300">
                    <div>101 | Rahim | 01711111111</div>
                    <div>101 | Rahim | 01822222222</div>
                    <div>102 | Karim | 01933333333</div>
                    <div>103 | Sumaiya | 01644444444</div>
                    <div>103 | Sumaiya | 01555555555</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNormalFormStep === '2NF' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Second Normal Form (2NF)</h3>
                  <p className="text-xs text-zinc-400">Rule: Must be in 1NF + NO partial dependencies on composite candidate keys.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  No Partial FDs
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="text-amber-400 font-mono font-bold">The Problem: Composite Key = (Student_ID, Course_ID)</span>
                <p className="text-zinc-300 font-sans">
                  In <code className="text-cyan-300 font-mono">(Student_ID, Course_ID) &rarr; Student_Name, Course_Name, Grade</code>:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-300 font-mono">
                  <li>Student_Name depends ONLY on Student_ID (Partial FD &cross;)</li>
                  <li>Course_Name depends ONLY on Course_ID (Partial FD &cross;)</li>
                  <li>Only Grade depends on BOTH (Full FD &check;)</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-sans">
                <strong>Decomposition Solution:</strong>
                <p className="text-[11px] text-zinc-300 font-mono">
                  Table 1: Students(Student_ID, Student_Name)<br />
                  Table 2: Courses(Course_ID, Course_Name)<br />
                  Table 3: Enrollments(Student_ID, Course_ID, Grade)
                </p>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-[11px] text-indigo-300 font-sans">
                <strong>Crucial Exam Note:</strong> If a relation has a <strong>single-attribute candidate key</strong>, it can never suffer from partial dependency. Hence, any 1NF relation with a single-attribute key is <strong>automatically in 2NF</strong>!
              </div>
            </div>
          )}

          {activeNormalFormStep === '3NF' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Third Normal Form (3NF)</h3>
                  <p className="text-xs text-zinc-400">Rule: Must be in 2NF + NO transitive dependencies of non-prime attributes.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  No Transitive FDs
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="text-purple-400 font-mono font-bold">The Problem: Non-key attribute determines another non-key attribute</span>
                <p className="text-zinc-300 font-sans">
                  In <code className="text-cyan-300 font-mono">Students(Student_ID, Name, Department_ID, Department_Name)</code>:
                </p>
                <div className="p-2 bg-black/40 rounded font-mono text-[11px] text-amber-300">
                  Student_ID &rarr; Department_ID &nbsp;and&nbsp; Department_ID &rarr; Department_Name
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  <code className="text-purple-300">Department_Name</code> transitively depends on <code className="text-cyan-300">Student_ID</code> via <code className="text-amber-300">Department_ID</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-sans">
                <strong>Decomposition Solution:</strong>
                <p className="text-[11px] text-zinc-300 font-mono">
                  Table 1: Students(Student_ID, Name, Department_ID [FK])<br />
                  Table 2: Departments(Department_ID [PK], Department_Name)
                </p>
              </div>
            </div>
          )}

          {activeNormalFormStep === 'BCNF' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Boyce-Codd Normal Form (BCNF)</h3>
                  <p className="text-xs text-zinc-400">Rule: For every non-trivial FD (X &rarr; Y), X MUST BE A SUPERKEY.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Strictest Normal Form
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="text-emerald-400 font-mono font-bold">The Scenario: Student_Instructor(Student, Course, Instructor)</span>
                <p className="text-zinc-300 font-sans">
                  Business Rule: An instructor teaches strictly one course, but a course can have multiple instructors.
                </p>
                <div className="p-2 bg-black/40 rounded font-mono text-[11px] text-rose-400">
                  Instructor &rarr; Course
                </div>
                <p className="text-[11px] text-zinc-300 font-sans">
                  Here, <code className="text-amber-300 font-mono">Instructor</code> is a determinant, but it is NOT a superkey (one instructor teaches many students)! This violates BCNF.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-sans">
                <strong>BCNF Decomposition:</strong>
                <p className="text-[11px] text-zinc-300 font-mono">
                  Table 1: Instructor_Course(Instructor [PK], Course)<br />
                  Table 2: Student_Instructor(Student, Instructor [FK])
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 9: PROGRESSIVE NORMALIZATION COMPARISON
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 9 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Comparison: 1NF, 2NF, 3NF &amp; BCNF Cheat Sheet</h2>
          </div>
        </div>

        {/* Master Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Normal Form</th>
                <th className="py-2.5 px-3">Primary Condition</th>
                <th className="py-2.5 px-3">What it Eliminates</th>
                <th className="py-2.5 px-3">Mnemonic Motto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">1NF</td>
                <td className="py-2.5 px-3 text-zinc-300">Atomic attribute values in every cell</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Repeating groups &amp; arrays</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;The Key&rdquo;</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">2NF</td>
                <td className="py-2.5 px-3 text-zinc-300">1NF + Full functional dependency</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Partial key dependencies</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;The Whole Key&rdquo;</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-purple-400">3NF</td>
                <td className="py-2.5 px-3 text-zinc-300">2NF + No transitive dependencies</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Non-key to non-key dependencies</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;And Nothing but the Key&rdquo;</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">BCNF</td>
                <td className="py-2.5 px-3 text-zinc-300">Every determinant X in (X &rarr; Y) must be a superkey</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Non-superkey determinants</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;So Help Me Codd!&rdquo;</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Hierarchy Chain */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs">
          <span className="text-zinc-400 font-bold uppercase block mb-1">Strictness Hierarchy:</span>
          <span className="text-emerald-400 font-extrabold">BCNF</span>
          <span className="text-zinc-500 mx-2">&rArr;</span>
          <span className="text-purple-400 font-extrabold">3NF</span>
          <span className="text-zinc-500 mx-2">&rArr;</span>
          <span className="text-amber-400 font-extrabold">2NF</span>
          <span className="text-zinc-500 mx-2">&rArr;</span>
          <span className="text-cyan-400 font-extrabold">1NF</span>
          <p className="text-[11px] text-zinc-500 font-sans font-normal mt-1">
            Every BCNF relation is guaranteed to be in 3NF, but not every 3NF relation is in BCNF.
          </p>
        </div>
      </section>

      {/* ========================================================
          PART 10: PRACTICAL SQL DDL IMPLEMENTATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 10 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical Normalized SQL Implementation</h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300">Clean 3NF DDL Script: University Schema</span>
            <button
              onClick={() => handleCopy(
`-- 1. Departments Table (3NF)
CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(100) NOT NULL
);

-- 2. Students Table (References Department)
CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Student_Name VARCHAR(100) NOT NULL,
    Department_ID INT,
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);

-- 3. Courses Table (Independent Course Facts)
CREATE TABLE Courses (
    Course_ID INT PRIMARY KEY,
    Course_Name VARCHAR(100) NOT NULL
);

-- 4. Enrollments Table (Composite PK)
CREATE TABLE Enrollments (
    Student_ID INT,
    Course_ID INT,
    Grade VARCHAR(5),
    PRIMARY KEY (Student_ID, Course_ID),
    FOREIGN KEY (Student_ID) REFERENCES Students(Student_ID),
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
);`, "normalized-ddl")}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSnippet === "normalized-ddl" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === "normalized-ddl" ? "Copied" : "Copy SQL"}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-lg bg-black/60 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- 1. Departments Table (3NF: Separated to eliminate transitive FDs)
CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(100) NOT NULL
);

-- 2. Students Table (2NF & 3NF: Single PK with FK link)
CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Student_Name VARCHAR(100) NOT NULL,
    Department_ID INT,
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);

-- 3. Courses Table (Independent course facts)
CREATE TABLE Courses (
    Course_ID INT PRIMARY KEY,
    Course_Name VARCHAR(100) NOT NULL
);

-- 4. Enrollments Table (Composite PK: Full FD on Grade)
CREATE TABLE Enrollments (
    Student_ID INT,
    Course_ID INT,
    Grade VARCHAR(5),
    PRIMARY KEY (Student_ID, Course_ID),
    FOREIGN KEY (Student_ID) REFERENCES Students(Student_ID),
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
);`}
          </pre>
        </div>
      </section>

      {/* ========================================================
          PART 11: UNIVERSITY EXAM PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 11 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Model Answers</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Click any question below to inspect model answers and key technical keywords for exams:
        </p>

        {/* Short & Broad Questions Accordion */}
        <div className="space-y-3">
          {[
            {
              id: 'q1',
              q: 'Q1: What is Database Normalization and why is it needed?',
              a: 'Database Normalization is the formal process of decomposing large tables into smaller, well-structured relations to reduce data redundancy, avoid insertion/update/deletion anomalies, and enforce referential integrity.'
            },
            {
              id: 'q2',
              q: 'Q2: Explain Insertion, Update, and Deletion Anomalies with examples.',
              a: 'Insertion Anomaly occurs when a fact cannot be recorded without unrelated data (e.g. adding a course without students). Update Anomaly occurs when redundant data is modified inconsistently across multiple rows. Deletion Anomaly occurs when deleting one record accidentally wipes out unrelated valuable information (e.g. deleting a student enrollment drops the course itself).'
            },
            {
              id: 'q3',
              q: 'Q3: What is a Functional Dependency (A → B)?',
              a: 'A Functional Dependency describes a constraint where the value of attribute A uniquely determines the value of attribute B for every tuple in the relation. A is the determinant.'
            },
            {
              id: 'q4',
              q: 'Q4: What is the difference between Partial and Transitive Dependency?',
              a: 'Partial Dependency occurs when a non-prime attribute depends on only part of a composite candidate key (violates 2NF). Transitive Dependency occurs when a non-prime attribute depends on another non-prime attribute rather than directly on candidate keys (violates 3NF).'
            },
            {
              id: 'q5',
              q: 'Q5: What are the conditions for a relation to be in 2NF?',
              a: '1. The relation must already be in First Normal Form (1NF). 2. Every non-prime attribute must be fully functionally dependent on the entire candidate key (no partial dependencies).'
            },
            {
              id: 'q6',
              q: 'Q6: What are the conditions for 3NF and BCNF?',
              a: '3NF requires 2NF and no transitive dependencies (for X → Y, either X is a superkey or Y is a prime attribute). BCNF is stricter: for every non-trivial FD (X → Y), X MUST be a superkey.'
            },
            {
              id: 'q7',
              q: 'Q7: Is every BCNF relation in 3NF? Justify.',
              a: 'Yes. BCNF is a strictly stronger normal form than 3NF. Any relation that satisfies BCNF automatically satisfies 3NF, 2NF, and 1NF.'
            }
          ].map(item => (
            <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
              <button
                onClick={() => toggleExamQ(item.id)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                {openExamQ[item.id] ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              {openExamQ[item.id] && (
                <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 13: HOMEWORK & PRACTICE EXERCISES (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 12 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Homework: Normalization Practice &amp; Solutions</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Work through these 4 university exam exercises. Click <strong className="text-cyan-300">&quot;Reveal Mentor Solution&quot;</strong> to inspect verified decompositions:
        </p>

        {/* 4 Exercises */}
        <div className="space-y-4">
          {[
            {
              id: 'ex1',
              title: 'Exercise 1: Identify the Anomaly',
              problem: 'In Student_Course(Student_ID, Student_Name, Course_ID, Course_Name), if the course name changes and only some rows are updated, what anomaly occurs?',
              sol: "An Update Anomaly occurs. Multiple copies of the same course name exist; failing to update all rows results in contradictory data where Course_ID C01 is simultaneously associated with two different names."
            },
            {
              id: 'ex2',
              title: 'Exercise 2: Convert to 1NF',
              problem: 'Orders(Customer_ID, Customer_Name, Products) where Products cell contains: "Laptop, Mouse". Convert this table into 1NF.',
              sol: "1NF Decomposition:\nExpand multivalued product items into atomic single rows:\n(1, 'Rahim', 'Laptop')\n(1, 'Rahim', 'Mouse')\nOr decompose into Customers(Customer_ID, Customer_Name) and Customer_Products(Customer_ID, Product_Name)."
            },
            {
              id: 'ex3',
              title: 'Exercise 3: Convert to 2NF',
              problem: 'Student_Course(Student_ID, Course_ID, Student_Name, Course_Name, Grade) with composite key (Student_ID, Course_ID). Decompose into 2NF.',
              sol: "Identify Partial Dependencies:\n• Student_ID → Student_Name (Partial)\n• Course_ID → Course_Name (Partial)\n• (Student_ID, Course_ID) → Grade (Full)\n\n2NF Decomposed Schema:\n1. Students(Student_ID [PK], Student_Name)\n2. Courses(Course_ID [PK], Course_Name)\n3. Enrollments(Student_ID [FK], Course_ID [FK], Grade)"
            },
            {
              id: 'ex4',
              title: 'Exercise 4: Convert to 3NF',
              problem: 'Employees(Employee_ID, Employee_Name, Department_ID, Department_Name) where Employee_ID → Department_ID and Department_ID → Department_Name. Decompose into 3NF.',
              sol: "Identify Transitive Dependency:\n• Employee_ID → Department_ID (Direct)\n• Department_ID → Department_Name (Non-key to non-key)\n• Employee_ID → Department_Name (Transitive via Department_ID)\n\n3NF Decomposed Schema:\n1. Employees(Employee_ID [PK], Employee_Name, Department_ID [FK])\n2. Departments(Department_ID [PK], Department_Name)"
            }
          ].map(ex => (
            <div key={ex.id} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">{ex.title}</span>
                <button
                  onClick={() => toggleSolution(ex.id)}
                  className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{revealedSolutions[ex.id] ? 'Hide Solution' : 'Reveal Mentor Solution'}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-300 font-sans">{ex.problem}</p>
              {revealedSolutions[ex.id] && (
                <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                  {ex.sol}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 14: REVISION CHECKLIST & NAVIGATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 14 of 14
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 8 Final Revision Checklist</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Normalization Mastery Progress</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} topics ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* 15 Interactive Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Definition and core purpose of normalization.',
            'Data redundancy and data consistency principles.',
            'Insertion anomaly mechanism and real-world impact.',
            'Update anomaly and inconsistent states.',
            'Deletion anomaly and accidental fact destruction.',
            'Functional dependency definition (A → B).',
            'Trivial and non-trivial functional dependencies.',
            'Full vs Partial functional dependencies.',
            'Transitive dependencies (A → B → C).',
            'First Normal Form (1NF: atomic values, no arrays).',
            'Second Normal Form (2NF: eliminate partial FDs).',
            'Third Normal Form (3NF: eliminate transitive FDs).',
            'Boyce-Codd Normal Form (BCNF: superkey determinants).',
            'Differences and strictness hierarchy (BCNF ⇒ 3NF ⇒ 2NF ⇒ 1NF).',
            'Normalized practical SQL DDL implementation.'
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggleChecklist(idx)}
              className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer flex items-start gap-2.5 ${
                checkedChecklist[idx]
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-[#14182d] border-slate-800 text-zinc-300 hover:border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border flex-shrink-0 transition-colors ${
                checkedChecklist[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-900'
              }`}>
                {checkedChecklist[idx] && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Next Module Bridge Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Next in Series • Concurrency &amp; Reliability
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Module 9 Preview
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 9: Database Transactions &amp; Concurrency Control
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            In Lesson 9, explore transactional integrity: ACID properties, transaction state machines, COMMIT &amp; ROLLBACK, concurrency anomalies (Dirty Read, Non-repeatable Read, Phantom Read), 2-Phase Locking (2PL), and deadlock recovery.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson7')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 7: Advanced SQL</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson9')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Go to Lesson 9: Transactions &amp; Concurrency</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
