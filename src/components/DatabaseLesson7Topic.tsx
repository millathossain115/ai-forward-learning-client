'use client';

import React, { useState, useMemo } from 'react';
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
  Divide
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson7TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// ==========================================
// SAMPLE DATASETS FOR LESSON 7
// ==========================================

interface Student {
  id: number;
  name: string;
  dept: string;
  gpa: number;
}

const STUDENTS_DATA: Student[] = [
  { id: 101, name: 'Rahim', dept: 'CSE', gpa: 3.80 },
  { id: 102, name: 'Karim', dept: 'BBA', gpa: 3.40 },
  { id: 103, name: 'Sumaiya', dept: 'CSE', gpa: 3.90 },
  { id: 104, name: 'Nabila', dept: 'EEE', gpa: 3.20 },
  { id: 105, name: 'Tanvir', dept: 'CSE', gpa: 3.50 },
  { id: 106, name: 'Ayesha', dept: 'BBA', gpa: 3.70 },
];

const COURSES_DATA = [
  { id: 'C01', name: 'DBMS', credits: 3 },
  { id: 'C02', name: 'Networking', credits: 3 },
  { id: 'C03', name: 'Programming', credits: 4 },
  { id: 'C04', name: 'Mathematics', credits: 3 },
];

const ENROLLMENTS_DATA = [
  { studentId: 101, courseId: 'C01', grade: 'A' },
  { studentId: 101, courseId: 'C02', grade: 'A-' },
  { studentId: 102, courseId: 'C01', grade: 'B' },
  { studentId: 103, courseId: 'C01', grade: 'A+' },
  { studentId: 103, courseId: 'C03', grade: 'A' },
  { studentId: 104, courseId: 'C04', grade: 'B+' },
  { studentId: 105, courseId: 'C02', grade: 'B' },
  { studentId: 106, courseId: 'C01', grade: 'A-' },
];

export default function DatabaseLesson7Topic({ onNavigate }: DatabaseLesson7TopicProps) {
  // Active Sample Table Tab
  const [activeTableTab, setActiveTableTab] = useState<'students' | 'courses' | 'enrollments'>('students');

  // Subquery Visualizer Step
  const [subqueryStep, setSubqueryStep] = useState<number>(1);

  // Subquery Types Tab (Section 3)
  const [activeSubqueryType, setActiveSubqueryType] = useState<'single' | 'multiple_row' | 'multiple_col' | 'correlated'>('single');

  // Any vs All comparison state
  const [anyAllOperator, setAnyAllOperator] = useState<'ANY' | 'ALL'>('ANY');

  // Correlated Subquery Step-by-Step active student index
  const [correlatedActiveStudentIdx, setCorrelatedActiveStudentIdx] = useState<number>(0);

  // Set Operations Active Tab
  const [activeSetOp, setActiveSetOp] = useState<'UNION' | 'UNION_ALL' | 'INTERSECT' | 'EXCEPT'>('UNION');

  // Functions Playground Active Category
  const [activeFunctionCat, setActiveFunctionCat] = useState<'string' | 'numeric' | 'date' | 'null'>('string');
  const [activeFunctionTest, setActiveFunctionTest] = useState<string>('UPPER');

  // Execution Order Active Step
  const [executionOrderStep, setExecutionOrderStep] = useState<number>(1);

  // Window Functions vs GROUP BY view toggle
  const [windowDemoMode, setWindowDemoMode] = useState<'window' | 'groupby'>('window');

  // Ranking ties toggle
  const [hasRankingTies, setHasRankingTies] = useState<boolean>(false);

  // Problem Solver Active Tab
  const [activeProblem, setActiveProblem] = useState<number>(1);

  // Homework Revealed Solutions
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Checklist Items
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  // University Exam Accordion State
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // Copy Snippet feedback
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

  // Calculations for Subqueries
  const overallAvgGpa = (STUDENTS_DATA.reduce((acc, s) => acc + s.gpa, 0) / STUDENTS_DATA.length).toFixed(4); // 3.5833
  const studentsAboveAvg = STUDENTS_DATA.filter(s => s.gpa > parseFloat(overallAvgGpa));

  // Department averages for Correlated demo
  const deptAverages: Record<string, number> = {
    CSE: (3.80 + 3.90 + 3.50) / 3, // 3.7333
    BBA: (3.40 + 3.70) / 2,         // 3.5500
    EEE: 3.20                      // 3.2000
  };

  const currentCorrelatedStudent = STUDENTS_DATA[correlatedActiveStudentIdx];
  const currentDeptAvg = deptAverages[currentCorrelatedStudent.dept];
  const isCorrelatedQualified = currentCorrelatedStudent.gpa > currentDeptAvg;

  // Checklist completion
  const checklistTotal = 15;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0f28] via-[#10173d] to-[#070a1a] border border-cyan-900/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 7 of 7 • Advanced SQL Queries
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Intermediate to Advanced
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 7: Advanced SQL Queries <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Subqueries, CTEs, Window Functions & Set Ops
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Level up from basic queries to complex relational problem solving: Single-row & multiple-row subqueries, correlated inner-outer evaluations, Common Table Expressions (<code className="text-cyan-300 font-mono">WITH</code>), set operations (<code className="text-amber-300 font-mono">UNION / INTERSECT / EXCEPT</code>), and non-collapsing analytical Window Functions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Correlated Subqueries & EXISTS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>CTEs & Query Execution Order</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>OVER(PARTITION BY) & RANK()</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Relational Division & Exam Prep</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: OUR PRACTICE DATABASE BENCHMARK
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Our Practice Database: Students, Courses & Enrollments</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          To understand advanced queries deeply, we will use this standardized university schema throughout all examples:
        </p>

        {/* Table Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTableTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTableTab === 'students'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Students Table</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">6 rows</span>
          </button>
          <button
            onClick={() => setActiveTableTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTableTab === 'courses'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Courses Table</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">4 courses</span>
          </button>
          <button
            onClick={() => setActiveTableTab('enrollments')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTableTab === 'enrollments'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Enrollments (Junction) Table</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">8 enrollments</span>
          </button>
        </div>

        {/* Live Table Display */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
          {activeTableTab === 'students' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student_ID (PK)</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">GPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {STUDENTS_DATA.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{s.id}</td>
                    <td className="py-2 px-3 text-white font-medium">{s.name}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {s.dept}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTableTab === 'courses' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Course_ID (PK)</th>
                  <th className="py-2.5 px-3">Course_Name</th>
                  <th className="py-2.5 px-3">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {COURSES_DATA.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono text-amber-300 font-bold">{c.id}</td>
                    <td className="py-2 px-3 text-white font-medium">{c.name}</td>
                    <td className="py-2 px-3 font-mono text-purple-300 font-bold">{c.credits} Credits</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTableTab === 'enrollments' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student_ID (FK)</th>
                  <th className="py-2.5 px-3">Course_ID (FK)</th>
                  <th className="py-2.5 px-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {ENROLLMENTS_DATA.map((e, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono text-cyan-300">{e.studentId}</td>
                    <td className="py-2 px-3 font-mono text-amber-300">{e.courseId}</td>
                    <td className="py-2 px-3 font-mono font-bold text-emerald-400">{e.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 2: SUBQUERIES & EXECUTION FLOW VISUALIZER
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 2 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Subqueries: Query Inside Another Query</h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Core Exam Definition</span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            A <strong>subquery</strong> (also called an <em>inner query</em> or <em>nested query</em>) is a SQL query written inside another query (the <em>outer query</em>). The inner query supplies intermediate data that the outer query consumes to calculate the final result set.
          </p>
        </div>

        {/* Step-by-Step Interactive Execution Flow */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              Real-World Problem: Find Students with GPA &gt; Average GPA
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setSubqueryStep(1)}
                className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                  subqueryStep === 1 ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Step 1: Inner Query
              </button>
              <button
                onClick={() => setSubqueryStep(2)}
                className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                  subqueryStep === 2 ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Step 2: Outer Query
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
            {subqueryStep === 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">Step 1: Inner Query Evaluates First</span>
                  <span className="text-[10px] font-mono text-zinc-400">Computes Scalar Average</span>
                </div>
                <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400">
{`SELECT AVG(GPA) FROM Students;`}
                </pre>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-300">
                    Math: (3.80 + 3.40 + 3.90 + 3.20 + 3.50 + 3.70) / 6 =
                  </span>
                  <span className="text-sm font-mono font-bold text-cyan-300 px-3 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                    {overallAvgGpa}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  The database replaces the parenthesized subquery with this computed scalar float value.
                </p>
              </div>
            )}

            {subqueryStep === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">Step 2: Outer Query Filters Rows</span>
                  <span className="text-[10px] font-mono text-zinc-400">WHERE GPA &gt; 3.5833</span>
                </div>
                <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400">
{`SELECT * FROM Students 
WHERE GPA > (
    SELECT AVG(GPA) FROM Students
);`}
                </pre>
                <div className="overflow-x-auto rounded-lg border border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-900 text-zinc-300 font-mono">
                      <tr>
                        <th className="py-2 px-3">Student_ID</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Department</th>
                        <th className="py-2 px-3">GPA (&gt; 3.5833)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {studentsAboveAvg.map(s => (
                        <tr key={s.id} className="bg-slate-900/40">
                          <td className="py-1.5 px-3 font-mono text-cyan-300">{s.id}</td>
                          <td className="py-1.5 px-3 text-white font-medium">{s.name}</td>
                          <td className="py-1.5 px-3 font-mono text-zinc-300">{s.dept}</td>
                          <td className="py-1.5 px-3 font-mono font-bold text-emerald-400">{s.gpa.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: TYPES OF SUBQUERIES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 3 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">4 Types of Subqueries: Single-Row, Multi-Row, Multi-Column &amp; Correlated</h2>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'single', label: '3.1 Single-Row', desc: 'Returns 1 row / value' },
            { id: 'multiple_row', label: '3.2 Multiple-Row', desc: 'Returns 1 column, multiple rows' },
            { id: 'multiple_col', label: '3.3 Multi-Column', desc: 'Row-value tuples comparison' },
            { id: 'correlated', label: '3.4 Correlated', desc: 'Depends on outer loop' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubqueryType(t.id as any)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeSubqueryType === t.id
                  ? 'bg-purple-600/20 border-purple-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{t.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{t.desc}</div>
            </button>
          ))}
        </div>

        {/* Tab Detail */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeSubqueryType === 'single' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Single-Row Subquery Example:</span>
              <p className="text-xs text-zinc-300 font-sans">
                Returns exactly one row (scalar value). Evaluated using standard comparison operators (<code className="text-amber-300">=, &gt;, &lt;, &gt;=, &lt;=, &lt;&gt;</code>).
              </p>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA 
FROM Students 
WHERE GPA > (SELECT AVG(GPA) FROM Students);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'multiple_row' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Multiple-Row Subquery Example:</span>
              <p className="text-xs text-zinc-300 font-sans">
                Returns a list of values. Must be paired with set-membership operators (<code className="text-amber-300">IN, NOT IN, ANY, ALL, EXISTS</code>).
              </p>
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
              <span className="text-xs font-mono font-bold text-cyan-400">Multiple-Column Subquery Example:</span>
              <p className="text-xs text-zinc-300 font-sans">
                Compares multiple column values simultaneously as a tuple. Supported by MySQL, PostgreSQL, and Oracle.
              </p>
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
              <span className="text-xs font-mono font-bold text-cyan-400">Correlated Subquery Example:</span>
              <p className="text-xs text-zinc-300 font-sans">
                The inner query references a column from the outer query table, executing once for every single candidate row.
              </p>
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

      {/* ========================================================
          PART 4 & 5: IN, NOT IN, EXISTS & THE NULL TRAP
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Filter className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 4 &amp; 5 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">IN, NOT IN, EXISTS, NOT EXISTS &amp; The Dangerous NULL Trap</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IN vs NOT IN */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">IN / NOT IN Operators</span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Checks whether a scalar value exists inside a returned list or subquery result set.
            </p>
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
                <AlertTriangle className="w-3.5 h-3.5" /> Exam Warning: The NULL Trap with NOT IN!
              </strong>
              <p className="text-[11px] text-zinc-300">
                If the subquery returns even a single <code className="text-rose-400 font-mono">NULL</code> value, <code className="text-rose-400 font-mono">NOT IN</code> evaluates to <em className="text-amber-300">UNKNOWN</em> for all records, returning <strong>0 rows</strong>! Always use <code className="text-emerald-400 font-mono">NOT EXISTS</code> for anti-matching.
              </p>
            </div>
          </div>

          {/* EXISTS vs NOT EXISTS */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">EXISTS / NOT EXISTS Operators</span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Returns a pure boolean (TRUE/FALSE). Does not retrieve data rows; simply stops scanning the instant the first matching row is found!
            </p>
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
                <CheckCircle2 className="w-3.5 h-3.5" /> Why SELECT 1 inside EXISTS?
              </strong>
              <p className="text-[11px] text-zinc-300">
                <code className="text-cyan-400 font-mono">SELECT 1</code> is a standard SQL convention. The DBMS optimizer ignores the projection list and checks only if a row exists in the buffer pool.
              </p>
            </div>
          </div>
        </div>

        {/* IN vs EXISTS Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Feature</th>
                <th className="py-2.5 px-3">IN Operator</th>
                <th className="py-2.5 px-3">EXISTS Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">Evaluation Mechanism</td>
                <td className="py-2 px-3 text-zinc-300">Compares discrete column values</td>
                <td className="py-2 px-3 text-zinc-300">Checks for existence of at least 1 row</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">Query Correlation</td>
                <td className="py-2 px-3 text-zinc-300">Often independent subquery</td>
                <td className="py-2 px-3 text-zinc-300">Almost always a correlated subquery</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">NULL Value Handling</td>
                <td className="py-2 px-3 text-rose-400 font-semibold">Fails / breaks with NOT IN</td>
                <td className="py-2 px-3 text-emerald-400 font-semibold">100% NULL-safe</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2 px-3 font-mono text-cyan-400 font-bold">Best Use Case</td>
                <td className="py-2 px-3 text-zinc-300">Small static list: IN (&apos;CSE&apos;, &apos;EEE&apos;)</td>
                <td className="py-2 px-3 text-zinc-300">Large tables with index on foreign key</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 6: ANY AND ALL OPERATORS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 6 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">ANY and ALL Comparison Operators</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          <code className="text-cyan-300 font-mono">ANY</code> (equivalent to <code className="text-cyan-300 font-mono">SOME</code>) and <code className="text-purple-300 font-mono">ALL</code> modify relational comparison operators (<code className="text-amber-300">&gt;, &lt;, &gt;=, &lt;=, =</code>) when comparing against a subquery list.
        </p>

        {/* Interactive Operator Toggle */}
        <div className="flex gap-2">
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
            <span className="text-emerald-400 font-bold ml-2">â†’ [3.40, 3.70]</span>
          </div>

          {anyAllOperator === 'ANY' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">GPA &gt; ANY [3.40, 3.70]</span>
                <span className="text-[10px] font-mono text-zinc-400">Equivalent to: GPA &gt; 3.40 OR GPA &gt; 3.70 (GPA &gt; MIN)</span>
              </div>
              <p className="text-xs text-zinc-300">
                Any student whose GPA is higher than at least one BBA student qualifies.
              </p>
              <div className="p-3 rounded bg-black/50 text-xs font-mono text-emerald-400">
                Qualified Students: Sumaiya (3.90), Rahim (3.80), Ayesha (3.70), Tanvir (3.50)
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase">GPA &gt; ALL [3.40, 3.70]</span>
                <span className="text-[10px] font-mono text-zinc-400">Equivalent to: GPA &gt; 3.40 AND GPA &gt; 3.70 (GPA &gt; MAX)</span>
              </div>
              <p className="text-xs text-zinc-300">
                A student&apos;s GPA must exceed every single BBA student (must be strictly &gt; 3.70).
              </p>
              <div className="p-3 rounded bg-black/50 text-xs font-mono text-emerald-400">
                Qualified Students: Sumaiya (3.90), Rahim (3.80)
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 7: CORRELATED SUBQUERIES (STEP-BY-STEP TRACER)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 7 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Correlated Subqueries: Row-by-Row Execution Tracer</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A correlated subquery cannot be executed standalone. It takes the current outer row value as input, computes a dynamic inner result, and compares them:
        </p>

        {/* Code Snippet */}
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

        {/* Step-by-Step Interactive Row Selector */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Click a Student to Trace the Outer â†” Inner Query Execution:
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
                <div className="text-[10px] text-zinc-400">{s.dept} â€¢ GPA {s.gpa.toFixed(2)}</div>
              </button>
            ))}
          </div>

          {/* Interactive Tracer Output Box */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-900/40 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">1. Outer Query Current Row (S):</span>
                <div className="text-sm font-bold text-white font-mono">
                  {currentCorrelatedStudent.name} (ID: {currentCorrelatedStudent.id}, Dept: {currentCorrelatedStudent.dept}, GPA: {currentCorrelatedStudent.gpa.toFixed(2)})
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">2. Inner Query Dept Average (S2):</span>
                <div className="text-sm font-bold text-cyan-300 font-mono">
                  {currentCorrelatedStudent.dept} Avg = {currentDeptAvg.toFixed(4)}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
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
                {isCorrelatedQualified ? 'âœ“ Qualified (Included in Output)' : 'âœ— Disqualified (Filtered Out)'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8: COMMON TABLE EXPRESSIONS (CTEs)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 8 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Common Table Expressions (CTEs) â€” The WITH Clause</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A <strong className="text-white">CTE</strong> creates a temporary, named result set defined before the main query using the <code className="text-cyan-300 font-mono">WITH</code> keyword. It makes complex nested queries infinitely easier to read, debug, and maintain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Example 1: Average GPA CTE</span>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`WITH AverageGPA AS (
    SELECT AVG(GPA) AS Avg_GPA 
    FROM Students
)
SELECT Name, GPA 
FROM Students, AverageGPA
WHERE GPA > Avg_GPA;`}
            </pre>
            <p className="text-[11px] text-zinc-400">
              The CTE computes <code className="text-cyan-300">Avg_GPA</code> once, and the outer SELECT joins with it cleanly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Example 2: Chaining &amp; Filtering CTE</span>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`WITH CSE_Students AS (
    SELECT Student_ID, Name, GPA 
    FROM Students 
    WHERE Department = 'CSE'
)
SELECT Name, GPA 
FROM CSE_Students 
WHERE GPA >= 3.80;`}
            </pre>
            <p className="text-[11px] text-zinc-400">
              Allows breaking complex multi-stage pipelines into isolated, testable modules.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9: SQL SET OPERATIONS (UNION, INTERSECT, EXCEPT)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 9 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Set Operations: UNION, UNION ALL, INTERSECT &amp; EXCEPT</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Set operations combine the results of two or more independent <code className="text-cyan-300 font-mono">SELECT</code> statements into a unified result set:
        </p>

        {/* Set Operation Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['UNION', 'UNION_ALL', 'INTERSECT', 'EXCEPT'] as const).map(op => (
            <button
              key={op}
              onClick={() => setActiveSetOp(op)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeSetOp === op
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {op.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Set Operation Visualizer */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400">Query 1: CSE Students</span>
              <div className="text-xs text-zinc-300 font-mono">[101: Rahim, 103: Sumaiya, 105: Tanvir]</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400">Query 2: BBA Students + Rahim</span>
              <div className="text-xs text-zinc-300 font-mono">[102: Karim, 106: Ayesha, 101: Rahim]</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">Output Result Set:</span>
              <span className="text-[10px] font-mono text-zinc-500">
                {activeSetOp === 'UNION' && 'Duplicates Removed (Unique Rows Only)'}
                {activeSetOp === 'UNION_ALL' && 'Duplicates Preserved (Fastest)'}
                {activeSetOp === 'INTERSECT' && 'Shared Rows Common to Both Sets'}
                {activeSetOp === 'EXCEPT' && 'Left Query Minus Right Query'}
              </span>
            </div>

            <div className="font-mono text-xs text-zinc-200">
              {activeSetOp === 'UNION' && (
                <div className="space-y-1">
                  <div>101 - Rahim (Appears once)</div>
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <div>102 - Karim</div>
                  <div>106 - Ayesha</div>
                </div>
              )}
              {activeSetOp === 'UNION_ALL' && (
                <div className="space-y-1 text-amber-300">
                  <div>101 - Rahim</div>
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <div>102 - Karim</div>
                  <div>106 - Ayesha</div>
                  <div className="text-rose-400 font-bold">101 - Rahim (Duplicate row retained!)</div>
                </div>
              )}
              {activeSetOp === 'INTERSECT' && (
                <div className="text-emerald-300 font-bold">
                  <div>101 - Rahim (Only student present in both queries)</div>
                  <p className="text-[10px] text-zinc-400 font-sans font-normal mt-1">
                    * Note: INTERSECT is native in PostgreSQL/Oracle; MySQL simulates via INNER JOIN or EXISTS.
                  </p>
                </div>
              )}
              {activeSetOp === 'EXCEPT' && (
                <div className="text-cyan-300">
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <p className="text-[10px] text-zinc-400 font-sans font-normal mt-1">
                    * Note: EXCEPT removes Rahim because he exists in Query 2.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10: SQL BUILT-IN FUNCTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 10 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Functions: String, Numeric, Date &amp; NULL Helpers</h2>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['string', 'numeric', 'date', 'null'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFunctionCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize cursor-pointer transition-all ${
                activeFunctionCat === cat
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat} Functions
            </button>
          ))}
        </div>

        {/* Function Reference Cards */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeFunctionCat === 'string' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">UPPER(str) / LOWER(str)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Case conversion</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">UPPER(&apos;rahim&apos;) â†’ &apos;RAHIM&apos;</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">CONCAT(s1, s2, ...)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">String concatenation</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">CONCAT(Name, &apos; - &apos;, Dept)</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">SUBSTRING(str, pos, len)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Extract sub-part</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">SUBSTRING(&apos;Database&apos;, 1, 4) â†’ &apos;Data&apos;</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'numeric' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">ROUND(val, decimals)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Standard rounding</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">ROUND(3.567, 2) â†’ 3.57</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">CEIL(val) / FLOOR(val)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Ceiling and Floor bounds</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">CEIL(3.1) â†’ 4 | FLOOR(3.9) â†’ 3</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">MOD(N, M)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Remainder of division</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">MOD(10, 3) â†’ 1</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'date' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">CURRENT_DATE()</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Today&apos;s system date</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">Returns &apos;2026-11-17&apos;</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">YEAR(date) / MONTH(date)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Extract temporal parts</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">YEAR(&apos;2026-11-17&apos;) â†’ 2026</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">DATEDIFF(d1, d2)</span>
                <p className="text-[11px] text-zinc-400 font-sans mt-1">Days between two dates</p>
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">DATEDIFF(now, dob) / 365</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'null' && (
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-cyan-400 font-mono font-bold">COALESCE(val1, val2, ... fallback)</span>
              <p className="text-zinc-300 font-sans">
                Returns the <strong>first non-NULL value</strong> in the list. Essential for replacing missing values with graceful defaults:
              </p>
              <pre className="p-2.5 bg-black/50 rounded font-mono text-emerald-400">
{`SELECT Name, COALESCE(Email, 'No Email Provided') AS Contact_Status
FROM Students;`}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 11: ADVANCED JOIN PRACTICE (SELF JOIN & CROSS JOIN)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 11 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Advanced JOIN Practice: SELF JOIN &amp; CROSS JOIN</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SELF JOIN */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">11.1 SELF JOIN (Hierarchy)</span>
            <p className="text-xs text-zinc-300 font-sans">
              Joining a table to itself using two distinct aliases to model hierarchical relationships (e.g. Employee â†’ Manager).
            </p>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT 
    E.Name AS Employee, 
    COALESCE(M.Name, 'CEO / Top Level') AS Manager
FROM Employees E
LEFT JOIN Employees M 
ON E.Manager_ID = M.Employee_ID;`}
            </pre>
          </div>

          {/* CROSS JOIN */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">11.2 CROSS JOIN (Cartesian Product)</span>
            <p className="text-xs text-zinc-300 font-sans">
              Produces every possible combination of rows from two tables ($N \times M$ rows).
            </p>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- 2 Colors x 2 Sizes = 4 Cartesian combinations:
SELECT Colors.Color, Sizes.Size 
FROM Colors 
CROSS JOIN Sizes;`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 12: SQL LOGICAL QUERY EXECUTION ORDER
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ListOrdered className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 12 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Logical Query Execution Order</h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1">
          <strong className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> Why You Cannot Use a Column Alias in the WHERE Clause:
          </strong>
          <p className="text-[11px] text-zinc-300 font-sans">
            In SQL, <code className="text-cyan-400 font-mono">FROM</code> and <code className="text-cyan-400 font-mono">WHERE</code> execute <strong>BEFORE</strong> the <code className="text-cyan-400 font-mono">SELECT</code> clause is reached. Therefore, an alias like <code className="text-rose-400 font-mono">SELECT AVG(GPA) AS Avg_GPA ... WHERE Avg_GPA &gt; 3.5</code> triggers a compile error!
          </p>
        </div>

        {/* Pipeline Execution Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { num: 1, name: 'FROM', desc: 'Identify table & joins' },
            { num: 2, name: 'WHERE', desc: 'Filter individual rows' },
            { num: 3, name: 'GROUP BY', desc: 'Aggregate rows' },
            { num: 4, name: 'HAVING', desc: 'Filter summary groups' },
            { num: 5, name: 'SELECT', desc: 'Compute projections' },
            { num: 6, name: 'DISTINCT', desc: 'Remove duplicates' },
            { num: 7, name: 'ORDER BY', desc: 'Sort result set' },
            { num: 8, name: 'LIMIT', desc: 'Slice row bounds' },
          ].map(s => (
            <div
              key={s.num}
              className="p-3 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1"
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold flex items-center justify-center mx-auto">
                {s.num}
              </span>
              <div className="text-xs font-mono font-bold text-white">{s.name}</div>
              <div className="text-[9px] text-zinc-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 13: ADVANCED PROBLEM SOLVING & RELATIONAL DIVISION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 13 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Advanced Problem Solving &amp; Relational Division</h2>
          </div>
        </div>

        {/* Problem Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 1, title: '2nd Highest GPA' },
            { id: 2, title: 'Highest GPA Student' },
            { id: 3, title: 'Depts with >1 Student' },
            { id: 4, title: 'Unenrolled Students' },
            { id: 5, title: 'Relational Division (Enrolled in ALL Courses)' },
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
              {p.title}
            </button>
          ))}
        </div>

        {/* Problem Solution Card */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeProblem === 1 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Problem 1: Find the 2nd Highest GPA</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT MAX(GPA) AS Second_Highest_GPA 
FROM Students
WHERE GPA < (SELECT MAX(GPA) FROM Students);`}
              </pre>
              <p className="text-xs text-zinc-300">
                Inner query finds 3.90 (highest). Outer query finds maximum GPA strictly less than 3.90 â†’ <strong className="text-emerald-300">3.80 (Rahim)</strong>.
              </p>
            </div>
          )}

          {activeProblem === 2 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Problem 2: Find Student(s) with Highest GPA</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA FROM Students
WHERE GPA = (SELECT MAX(GPA) FROM Students);`}
              </pre>
              <p className="text-xs text-zinc-300">
                Returns Sumaiya (3.90). Handles ties gracefully if multiple students share the highest GPA.
              </p>
            </div>
          )}

          {activeProblem === 3 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Problem 3: Find Departments with &gt; 1 Student</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Department, COUNT(*) AS Total_Students
FROM Students
GROUP BY Department
HAVING COUNT(*) > 1;`}
              </pre>
              <p className="text-xs text-zinc-300">
                Returns CSE (3 students) and BBA (2 students). EEE (1 student) is filtered out by HAVING.
              </p>
            </div>
          )}

          {activeProblem === 4 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">Problem 4: Find Students Not Enrolled in Any Course</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT S.Name FROM Students S
WHERE NOT EXISTS (
    SELECT 1 FROM Enrollments E 
    WHERE E.Student_ID = S.Student_ID
);`}
              </pre>
              <p className="text-xs text-zinc-300">
                Returns Nabila (104).
              </p>
            </div>
          )}

          {activeProblem === 5 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">Problem 5: Relational Division (Double NOT EXISTS)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Crucial Exam Topic</span>
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
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                <strong>Relational Division Logic:</strong> &quot;Find a student S for whom there does NOT exist a course C that student S has NOT enrolled in.&quot; If no such missing course exists, student S has enrolled in all courses!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 14: WINDOW FUNCTIONS (OVER, RANK, DENSE_RANK)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 14 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Introduction to Window Functions: OVER, PARTITION BY, RANK &amp; DENSE_RANK</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Unlike <code className="text-amber-300 font-mono">GROUP BY</code> which collapses multiple rows into a single summary row, <strong className="text-cyan-300">Window Functions</strong> perform aggregated calculations across related rows <strong>while preserving every individual row</strong>!
        </p>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setWindowDemoMode('window')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              windowDemoMode === 'window'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Window Function: OVER (PARTITION BY Department)
          </button>
          <button
            onClick={() => setWindowDemoMode('groupby')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              windowDemoMode === 'groupby'
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Traditional GROUP BY Department
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
          {windowDemoMode === 'window' ? (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Student GPA</th>
                  <th className="py-2.5 px-3 text-cyan-400">Department_Average (Preserves Row)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {STUDENTS_DATA.map(s => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-white font-medium">{s.name}</td>
                    <td className="py-2 px-3 font-mono">{s.dept}</td>
                    <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                    <td className="py-2 px-3 font-mono text-cyan-300 font-bold">
                      {deptAverages[s.dept].toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3 text-amber-400">Department_Average (Collapsed Rows)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {Object.entries(deptAverages).map(([dept, avg]) => (
                  <tr key={dept} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-mono font-bold text-white">{dept}</td>
                    <td className="py-2 px-3 font-mono text-amber-300 font-bold">{avg.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Ranking Comparison: ROW_NUMBER vs RANK vs DENSE_RANK */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              Ranking Functions Comparison: ROW_NUMBER() vs RANK() vs DENSE_RANK()
            </span>
            <button
              onClick={() => setHasRankingTies(!hasRankingTies)}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 cursor-pointer"
            >
              {hasRankingTies ? 'View Distinct GPAs' : 'Simulate Tied GPAs (Two 3.90s)'}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">GPA</th>
                  <th className="py-2.5 px-3 text-indigo-400">ROW_NUMBER()</th>
                  <th className="py-2.5 px-3 text-amber-400">RANK() (With Gaps)</th>
                  <th className="py-2.5 px-3 text-emerald-400">DENSE_RANK() (No Gaps)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {hasRankingTies ? (
                  <>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-white">Rahim</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">3.90 (Tied)</td>
                      <td className="py-2 px-3 text-indigo-300">1</td>
                      <td className="py-2 px-3 text-amber-300 font-bold">1</td>
                      <td className="py-2 px-3 text-emerald-300 font-bold">1</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-white">Karim</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">3.90 (Tied)</td>
                      <td className="py-2 px-3 text-indigo-300">2</td>
                      <td className="py-2 px-3 text-amber-300 font-bold">1</td>
                      <td className="py-2 px-3 text-emerald-300 font-bold">1</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 text-white">Sumaiya</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold">3.70</td>
                      <td className="py-2 px-3 text-indigo-300">3</td>
                      <td className="py-2 px-3 text-amber-400 font-bold bg-amber-500/10">3 (Gap skipped 2!)</td>
                      <td className="py-2 px-3 text-emerald-400 font-bold bg-emerald-500/10">2 (Continuous!)</td>
                    </tr>
                  </>
                ) : (
                  STUDENTS_DATA.slice()
                    .sort((a, b) => b.gpa - a.gpa)
                    .map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 text-white">{s.name}</td>
                        <td className="py-2 px-3 text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                        <td className="py-2 px-3 text-indigo-300">{idx + 1}</td>
                        <td className="py-2 px-3 text-amber-300">{idx + 1}</td>
                        <td className="py-2 px-3 text-emerald-300">{idx + 1}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 15: SQL PERFORMANCE & PRODUCTION BEST PRACTICES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 15 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Performance &amp; Production Best Practices</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">1. Avoid SELECT * in Production APIs</span>
            <p className="text-xs text-zinc-300 font-sans">
              Retrieving unnecessary text/blob columns wastes network bandwidth and database server memory buffers. Always explicitly specify required column names.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">2. Meaningful Table Aliases</span>
            <p className="text-xs text-zinc-300 font-sans">
              Use clean single or two-letter aliases (<code className="text-indigo-300 font-mono">Students S, Enrollments E</code>) to keep complex join expressions readable.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">3. Strategic Indexing (B-Tree)</span>
            <p className="text-xs text-zinc-300 font-sans">
              Create indexes on foreign keys and columns frequently used in <code className="text-indigo-300 font-mono">WHERE</code> and <code className="text-indigo-300 font-mono">JOIN ON</code> clauses. Beware: too many indexes slow down INSERT/UPDATE operations.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400">4. Parameterized Queries (Anti-SQLi)</span>
            <p className="text-xs text-zinc-300 font-sans">
              Never concatenate user input strings directly into SQL statements. Always use parameterized prepared statements to prevent fatal SQL Injection attacks.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 16: UNIVERSITY EXAM PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 16 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Exam Preparation: Short &amp; Descriptive Q&amp;A</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Click any question below to inspect model university examination answers:
        </p>

        {/* Short Questions Accordion */}
        <div className="space-y-3">
          {[
            {
              id: 'q1',
              q: 'Q1: What is a subquery and what are its common types?',
              a: 'A subquery (nested/inner query) is a SQL query nested within another query. Common types include: Single-Row (returns 1 scalar value), Multiple-Row (returns multiple rows using IN/ANY/ALL), Multiple-Column, and Correlated Subqueries.'
            },
            {
              id: 'q2',
              q: 'Q2: What is a correlated subquery? How does it differ from a regular subquery?',
              a: 'A regular subquery executes once independently and passes its result to the outer query. A correlated subquery references columns from the outer query table, executing repeatedly for each candidate row in the outer query.'
            },
            {
              id: 'q3',
              q: 'Q3: What is a Common Table Expression (CTE)?',
              a: 'A CTE is a temporary named result set defined before a SELECT, INSERT, UPDATE, or DELETE query using the WITH clause. It simplifies complex nested logic, enhances readability, and supports recursive queries.'
            },
            {
              id: 'q4',
              q: 'Q4: Differentiate between UNION and UNION ALL.',
              a: 'UNION merges query results and performs duplicate elimination (slower on large datasets). UNION ALL merges query results while preserving all duplicate rows (faster because no sorting/hashing is required).'
            },
            {
              id: 'q5',
              q: 'Q5: Explain the difference between ANY and ALL operators.',
              a: 'ANY requires the comparison condition to be true for at least one value returned by the subquery (equivalent to OR, > ANY means > MIN). ALL requires the condition to be true for every returned value (equivalent to AND, > ALL means > MAX).'
            },
            {
              id: 'q6',
              q: 'Q6: Differentiate between ROW_NUMBER(), RANK(), and DENSE_RANK().',
              a: 'ROW_NUMBER() assigns continuous sequential integers (1,2,3,4). RANK() assigns identical ranks to tied rows but leaves gaps after ties (1,1,3,4). DENSE_RANK() assigns identical ranks to ties without leaving any gaps (1,1,2,3).'
            },
            {
              id: 'q7',
              q: 'Q7: Explain Relational Division in SQL.',
              a: 'Relational division answers queries involving "for all" or "every" (e.g. students who took all courses). In SQL, it is standardly implemented using double NOT EXISTS or COUNT(DISTINCT) with GROUP BY and HAVING.'
            },
            {
              id: 'q8',
              q: 'Q8: What is the logical execution order of a SQL query?',
              a: '1. FROM (and JOINs) â†’ 2. WHERE â†’ 3. GROUP BY â†’ 4. HAVING â†’ 5. SELECT â†’ 6. DISTINCT â†’ 7. ORDER BY â†’ 8. LIMIT / OFFSET.'
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
          PART 18: HOMEWORK: ADVANCED SQL PRACTICE (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 17 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Homework: Advanced SQL Practice &amp; Case Study</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Practice writing advanced queries on the <strong>Employees</strong> &amp; <strong>Departments</strong> schema. Click <strong className="text-cyan-300">&quot;Reveal Mentor Query&quot;</strong> to view verified solution code:
        </p>

        {/* 10 Standard Exercises */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Exercise A: 10 Standard Advanced Queries</span>

          {[
            {
              id: 'hw1',
              title: '1. Find the employee with the highest salary',
              sol: "SELECT * FROM Employees\nWHERE Salary = (SELECT MAX(Salary) FROM Employees);"
            },
            {
              id: 'hw2',
              title: '2. Find the second-highest salary',
              sol: "SELECT MAX(Salary) AS Second_Highest\nFROM Employees\nWHERE Salary < (SELECT MAX(Salary) FROM Employees);"
            },
            {
              id: 'hw3',
              title: '3. Find employees earning more than the company average salary',
              sol: "SELECT Name, Salary FROM Employees\nWHERE Salary > (SELECT AVG(Salary) FROM Employees);"
            },
            {
              id: 'hw4',
              title: '4. Find employees earning more than their department\'s average salary',
              sol: "SELECT E.Name, E.Department, E.Salary\nFROM Employees E\nWHERE E.Salary > (\n    SELECT AVG(E2.Salary) FROM Employees E2\n    WHERE E2.Department = E.Department\n);"
            },
            {
              id: 'hw5',
              title: '5. Find the average salary of each department',
              sol: "SELECT Department, AVG(Salary) AS Dept_Avg_Salary\nFROM Employees\nGROUP BY Department;"
            },
            {
              id: 'hw6',
              title: '6. Find departments where average salary is greater than 50,000',
              sol: "SELECT Department, AVG(Salary) AS Dept_Avg_Salary\nFROM Employees\nGROUP BY Department\nHAVING AVG(Salary) > 50000;"
            },
            {
              id: 'hw7',
              title: '7. Find departments that have no employees',
              sol: "SELECT D.Department_Name FROM Departments D\nWHERE NOT EXISTS (\n    SELECT 1 FROM Employees E\n    WHERE E.Department = D.Department_Name\n);"
            },
            {
              id: 'hw8',
              title: '8. Find employees in IT or HR using IN operator',
              sol: "SELECT Name, Department, Salary FROM Employees\nWHERE Department IN ('IT', 'HR');"
            },
            {
              id: 'hw9',
              title: '9. Use a CTE to find employees whose salary > 55,000',
              sol: "WITH HighEarners AS (\n    SELECT * FROM Employees\n    WHERE Salary > 55000\n)\nSELECT Name, Department, Salary FROM HighEarners;"
            },
            {
              id: 'hw10',
              title: '10. Use DENSE_RANK() to rank employees by salary',
              sol: "SELECT Name, Department, Salary,\n       DENSE_RANK() OVER (ORDER BY Salary DESC) AS Salary_Rank\nFROM Employees;"
            }
          ].map(hw => (
            <div key={hw.id} className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">{hw.title}</span>
                <button
                  onClick={() => toggleSolution(hw.id)}
                  className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{revealedSolutions[hw.id] ? 'Hide Solution' : 'Reveal Mentor Query'}</span>
                </button>
              </div>
              {revealedSolutions[hw.id] && (
                <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                  {hw.sol}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 19: REVISION CHECKLIST
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 19 of 20
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 7 Final Revision Checklist</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Advanced SQL Concepts Mastered</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} items ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'I understand subqueries and nested queries.',
            'I understand single-row and multiple-row subqueries.',
            'I can use IN and understand the NULL trap with NOT IN.',
            'I understand EXISTS and NOT EXISTS with SELECT 1.',
            'I can use ANY and ALL comparison operators.',
            'I understand correlated subqueries and table aliasing.',
            'I can write modular queries using CTEs (WITH clause).',
            'I understand UNION, UNION ALL, INTERSECT, and EXCEPT.',
            'I understand SQL string, numeric, date, and COALESCE functions.',
            'I can write self joins and cross joins.',
            'I understand SQL logical query execution order (FROM to LIMIT).',
            'I can solve second-highest value queries using subqueries.',
            'I understand relational division using double NOT EXISTS.',
            'I understand window functions, OVER, RANK, and DENSE_RANK.',
            'I can solve complex multi-table analytical SQL problems.'
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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-cyan-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Next in Series â€¢ Relational Design Mastery
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module 8 Preview
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 8: Database Normalization (1NF, 2NF, 3NF, BCNF)
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            In Lesson 8, we will explore database normalization: eliminating data anomalies (Insertion, Update, Deletion), understanding functional dependencies, and mastering First, Second, Third, and Boyce-Codd Normal Forms.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson6')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 6: SQL Basics</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-roadmap')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Explore Database Architecture Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
