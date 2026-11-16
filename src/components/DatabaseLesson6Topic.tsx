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
  ListOrdered
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson6TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// Sample Student Data for Interactive Visualizers
interface StudentRecord {
  id: number;
  name: string;
  age: number;
  email: string;
  deptId: number;
  deptName: string;
  gpa: number;
}

const INITIAL_STUDENTS: StudentRecord[] = [
  { id: 101, name: 'Rahim', age: 22, email: 'rahim@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.80 },
  { id: 102, name: 'Karim', age: 23, email: 'karim@gmail.com', deptId: 2, deptName: 'BBA', gpa: 3.45 },
  { id: 103, name: 'Sumaiya', age: 21, email: 'sumaiya@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.92 },
  { id: 104, name: 'Nabila', age: 22, email: 'nabila@gmail.com', deptId: 3, deptName: 'EEE', gpa: 3.60 },
  { id: 105, name: 'Tanvir', age: 24, email: 'tanvir@gmail.com', deptId: 2, deptName: 'BBA', gpa: 3.20 },
  { id: 106, name: 'Farhana', age: 20, email: 'farhana@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.85 },
];

const DEPARTMENTS = [
  { id: 1, name: 'CSE', head: 'Dr. Hasan', room: 'Lab 402' },
  { id: 2, name: 'BBA', head: 'Prof. Kabir', room: 'Tower 301' },
  { id: 3, name: 'EEE', head: 'Dr. Nazmul', room: 'Circuits 105' },
  { id: 4, name: 'Civil', head: 'Prof. Alam', room: 'Design 204' } // Empty dept for Right Join demo
];

export default function DatabaseLesson6Topic({ onNavigate }: DatabaseLesson6TopicProps) {
  // Command Family Tabs (DDL, DML, DQL, DCL, TCL)
  const [activeCommandTab, setActiveCommandTab] = useState<'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL'>('DDL');

  // Interactive Live Query Playground
  const [activeQueryPreset, setActiveQueryPreset] = useState<string>('all');
  const [customWhereFilter, setCustomWhereFilter] = useState<'ALL' | 'CSE' | 'BBA' | 'AGE_OVER_21' | 'HIGH_GPA'>('ALL');
  const [sortOrder, setSortOrder] = useState<'NONE' | 'AGE_ASC' | 'AGE_DESC' | 'GPA_DESC'>('NONE');

  // Constraint Sandbox State
  const [constraintDemo, setConstraintDemo] = useState<'PK' | 'NOT_NULL' | 'UNIQUE' | 'CHECK' | 'FK' | 'DEFAULT'>('PK');
  const [constraintTestStatus, setConstraintTestStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Joins Explorer State
  const [activeJoinType, setActiveJoinType] = useState<'INNER' | 'LEFT' | 'RIGHT' | 'FULL'>('INNER');

  // Aggregate Calculator Active Tab
  const [activeAggregate, setActiveAggregate] = useState<'COUNT' | 'AVG' | 'MAX' | 'MIN' | 'SUM'>('COUNT');

  // Complete Project Step
  const [activeProjectStep, setActiveProjectStep] = useState<number>(1);

  // Homework Task Solution Revealer
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  // Checklist Completion
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // Exam Q&A Accordion State
  const [openExamQuestions, setOpenExamQuestions] = useState<Record<string, boolean>>({});

  // Copy Feedback state
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toggleSolution = (taskNum: number) => {
    setRevealedSolutions(prev => ({ ...prev, [taskNum]: !prev[taskNum] }));
  };

  const toggleChecklist = (itemIdx: number) => {
    setCheckedItems(prev => ({ ...prev, [itemIdx]: !prev[itemIdx] }));
  };

  const toggleExamQ = (id: string) => {
    setOpenExamQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered dataset for live query visualizer
  const displayStudents = useMemo(() => {
    let result = [...INITIAL_STUDENTS];

    if (customWhereFilter === 'CSE') {
      result = result.filter(s => s.deptName === 'CSE');
    } else if (customWhereFilter === 'BBA') {
      result = result.filter(s => s.deptName === 'BBA');
    } else if (customWhereFilter === 'AGE_OVER_21') {
      result = result.filter(s => s.age > 21);
    } else if (customWhereFilter === 'HIGH_GPA') {
      result = result.filter(s => s.gpa >= 3.80);
    }

    if (sortOrder === 'AGE_ASC') {
      result.sort((a, b) => a.age - b.age);
    } else if (sortOrder === 'AGE_DESC') {
      result.sort((a, b) => b.age - a.age);
    } else if (sortOrder === 'GPA_DESC') {
      result.sort((a, b) => b.gpa - a.gpa);
    }

    return result;
  }, [customWhereFilter, sortOrder]);

  // Aggregate stats computed live
  const aggregateResult = useMemo(() => {
    const ages = INITIAL_STUDENTS.map(s => s.age);
    const gpas = INITIAL_STUDENTS.map(s => s.gpa);
    switch (activeAggregate) {
      case 'COUNT':
        return { label: 'COUNT(Student_ID)', value: INITIAL_STUDENTS.length, unit: 'students enrolled' };
      case 'AVG':
        return { label: 'AVG(GPA)', value: (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2), unit: 'average GPA' };
      case 'MAX':
        return { label: 'MAX(GPA)', value: Math.max(...gpas).toFixed(2), unit: 'highest GPA (Sumaiya)' };
      case 'MIN':
        return { label: 'MIN(Age)', value: Math.min(...ages), unit: 'youngest student age (Farhana, 20)' };
      case 'SUM':
        return { label: 'SUM(Age)', value: ages.reduce((a, b) => a + b, 0), unit: 'total years combined' };
    }
  }, [activeAggregate]);

  // Checklist completion count
  const checklistTotal = 13;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklistTotal) * 100);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1024] via-[#101535] to-[#080b18] border border-indigo-900/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Phase 1 â€¢ Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 6 of 6 â€¢ Practical SQL
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Zero to Query Hero
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 6: Introduction to SQL <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Structured Query Language
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Now we transition from database theory to real-world command execution. Learn how to create databases, construct tables with constraints, query and filter records, perform joins, compute aggregates, and write high-scoring exam answers.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>DDL, DML, DQL, DCL, TCL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Interactive SQL Visualizers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Join Venn Diagrams</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>University Exam Prep & Case Study</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS SQL?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is SQL? (Structured Query Language)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
              <h3 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Standard Definition
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                <strong className="text-white">SQL</strong> stands for <span className="text-cyan-400 font-semibold">Structured Query Language</span>. It is the standardized, declarative computer language used to communicate with and manipulate <strong className="text-indigo-300">Relational Database Management Systems (RDBMS)</strong>.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                It allows software engineers and analysts to create databases, define schemas, insert data, query records with filtering, modify rows, and secure user permissions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-2">
              <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase">Real-World Analogy</h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Think of <strong>English</strong> as a human language. People in the UK, USA, Australia, and Canada speak English with small local dialect variations. Similarly:
              </p>
              <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc marker:text-indigo-400">
                <li><strong>SQL</strong> is the standard language specification.</li>
                <li><strong>MySQL, PostgreSQL, Oracle, SQLite, and MS SQL Server</strong> are different database engines that "speak" SQL.</li>
              </ul>
            </div>
          </div>

          {/* RDBMS Comparison Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">Popular RDBMS Engines That Speak SQL</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#14182d] border border-cyan-500/20 space-y-1">
                <span className="text-xs font-bold text-cyan-300">MySQL</span>
                <p className="text-[11px] text-zinc-400">The world&apos;s most popular open-source web database. Powers WordPress, Facebook, YouTube.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#14182d] border border-indigo-500/20 space-y-1">
                <span className="text-xs font-bold text-indigo-300">PostgreSQL</span>
                <p className="text-[11px] text-zinc-400">Advanced enterprise-grade object-relational DBMS with rich extensions (JSON, pgvector).</p>
              </div>
              <div className="p-3 rounded-xl bg-[#14182d] border border-rose-500/20 space-y-1">
                <span className="text-xs font-bold text-rose-300">Oracle Database</span>
                <p className="text-[11px] text-zinc-400">Mission-critical high-throughput database used by global banks, telecom, and airlines.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#14182d] border border-emerald-500/20 space-y-1">
                <span className="text-xs font-bold text-emerald-300">SQLite</span>
                <p className="text-[11px] text-zinc-400">Serverless, single-file database embedded inside every smartphone, browser, and macOS/Windows app.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-zinc-400 font-mono">
              <span className="text-emerald-400 font-bold">SQL Syntax Sample:</span>
              <div className="mt-1 text-slate-300 bg-black/40 p-2 rounded">
                SELECT * FROM Students WHERE Department = &apos;CSE&apos;;
              </div>
              <p className="mt-1 text-zinc-500">Meaning: &quot;Please retrieve all columns and all records from the Students table where the department is CSE.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: HOW DOES SQL WORK?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 2 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">How Does SQL Work? The Internal Engine Pipeline</h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Unlike procedural programming languages (C, Python, Java) where you write step-by-step loops and memory pointers (<em className="text-amber-300">imperative</em>), SQL is a <strong className="text-emerald-300">declarative language</strong>. You simply tell the database <strong>WHAT data you want</strong>, and the DBMS query engine figures out the most optimal algorithm to retrieve it.
          </p>

          {/* Flow Pipeline Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center mx-auto">1</div>
              <div className="text-xs font-bold text-white">Client / App</div>
              <div className="text-[10px] text-zinc-400">Sends SQL query text string</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center mx-auto">2</div>
              <div className="text-xs font-bold text-white">Parser & Lexer</div>
              <div className="text-[10px] text-zinc-400">Validates syntax & checks table permissions</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/30 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold flex items-center justify-center mx-auto">3</div>
              <div className="text-xs font-bold text-white">Query Optimizer</div>
              <div className="text-[10px] text-zinc-400">Chooses Index scan vs sequential table scan</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold flex items-center justify-center mx-auto">4</div>
              <div className="text-xs font-bold text-white">Execution Engine</div>
              <div className="text-[10px] text-zinc-400">Reads disk pages into buffer pool</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center mx-auto">5</div>
              <div className="text-xs font-bold text-white">Result Set</div>
              <div className="text-[10px] text-zinc-400">Returns rows & columns to user</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: RELATIONAL CONCEPTS IN SQL CONTEXT
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TableIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 3 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Relational Theory to SQL Terms Mapping</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          In Lesson 3, we studied relational theory invented by E.F. Codd. In SQL, those mathematical concepts map directly into practical database objects:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Theoretical Term</span>
            <div className="text-sm font-bold text-indigo-300 font-mono">Relation</div>
            <span className="text-xs font-bold text-emerald-400">â†’ Table</span>
            <p className="text-[10px] text-zinc-500">A 2D matrix of data</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Theoretical Term</span>
            <div className="text-sm font-bold text-indigo-300 font-mono">Tuple</div>
            <span className="text-xs font-bold text-emerald-400">â†’ Row / Record</span>
            <p className="text-[10px] text-zinc-500">Single horizontal entity entry</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Theoretical Term</span>
            <div className="text-sm font-bold text-indigo-300 font-mono">Attribute</div>
            <span className="text-xs font-bold text-emerald-400">â†’ Column / Field</span>
            <p className="text-[10px] text-zinc-500">Vertical data category</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Theoretical Term</span>
            <div className="text-sm font-bold text-indigo-300 font-mono">Degree</div>
            <span className="text-xs font-bold text-emerald-400">â†’ Column Count</span>
            <p className="text-[10px] text-zinc-500">Total number of columns</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Theoretical Term</span>
            <div className="text-sm font-bold text-indigo-300 font-mono">Cardinality</div>
            <span className="text-xs font-bold text-emerald-400">â†’ Row Count</span>
            <p className="text-[10px] text-zinc-500">Total number of records</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4: THE 5 COMMAND FAMILIES (DDL, DML, DQL, DCL, TCL)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 4 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 5 Command Families in SQL</h2>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['DDL', 'DML', 'DQL', 'DCL', 'TCL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveCommandTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCommandTab === tab
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-purple-200">
                {tab === 'DDL' && 'Definition'}
                {tab === 'DML' && 'Manipulation'}
                {tab === 'DQL' && 'Query'}
                {tab === 'DCL' && 'Control'}
                {tab === 'TCL' && 'Transaction'}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Detail Display */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          {activeCommandTab === 'DDL' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">DDL: Data Definition Language</h3>
                  <p className="text-xs text-zinc-400">Used to define, create, alter, and delete database structures (tables, schemas, indexes).</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Auto-Committed (Cannot Rollback in most DBs)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">CREATE</span>
                  <p className="text-[11px] text-zinc-400">Creates new databases, tables, views, or indexes.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">CREATE TABLE Students (...);</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">ALTER</span>
                  <p className="text-[11px] text-zinc-400">Modifies the schema of an existing table (adds/drops columns).</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">ALTER TABLE Students ADD Phone VARCHAR(15);</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">DROP</span>
                  <p className="text-[11px] text-zinc-400">Permanently deletes a table or database and all its structure.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">DROP TABLE Students;</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">TRUNCATE</span>
                  <p className="text-[11px] text-zinc-400">Wipes all rows instantly while preserving the table schema structure.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">TRUNCATE TABLE Students;</code>
                </div>
              </div>
            </div>
          )}

          {activeCommandTab === 'DML' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">DML: Data Manipulation Language</h3>
                  <p className="text-xs text-zinc-400">Operates directly on the records/rows inside existing tables.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Transaction Safe (Can be Rolled Back)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-400">INSERT</span>
                  <p className="text-[11px] text-zinc-400">Adds one or more new rows into a table.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">INSERT INTO Students VALUES (101, &apos;Rahim&apos;);</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-400">UPDATE</span>
                  <p className="text-[11px] text-zinc-400">Modifies values in existing rows matching a WHERE condition.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">UPDATE Students SET Age = 23 WHERE id = 101;</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-400">DELETE</span>
                  <p className="text-[11px] text-zinc-400">Removes specific rows matching a WHERE clause.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">DELETE FROM Students WHERE id = 101;</code>
                </div>
              </div>
            </div>
          )}

          {activeCommandTab === 'DQL' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">DQL: Data Query Language</h3>
                  <p className="text-xs text-zinc-400">Responsible for fetching and retrieving records from one or more tables.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Read-Only (Never Modifies Data)
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-sm font-mono font-bold text-cyan-400">SELECT</span>
                <p className="text-xs text-zinc-300">The most widely used statement in SQL. Extracts data into a virtual tabular result set.</p>
                <div className="p-3 rounded bg-black/50 font-mono text-xs text-slate-200">
                  SELECT Name, Department FROM Students WHERE Age &gt;= 21 ORDER BY Name ASC;
                </div>
              </div>
            </div>
          )}

          {activeCommandTab === 'DCL' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">DCL: Data Control Language</h3>
                  <p className="text-xs text-zinc-400">Manages database security, user privileges, and access permissions.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  Admin Security
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-rose-400">GRANT</span>
                  <p className="text-[11px] text-zinc-400">Gives specific users read/write permissions on database objects.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">GRANT SELECT, INSERT ON Students TO &apos;teacher_user&apos;;</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-rose-400">REVOKE</span>
                  <p className="text-[11px] text-zinc-400">Takes away previously granted user permissions.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">REVOKE INSERT ON Students FROM &apos;teacher_user&apos;;</code>
                </div>
              </div>
            </div>
          )}

          {activeCommandTab === 'TCL' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">TCL: Transaction Control Language</h3>
                  <p className="text-xs text-zinc-400">Controls transactions to guarantee ACID compliance (e.g. during bank fund transfers).</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  ACID Guarantee
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-indigo-400">COMMIT</span>
                  <p className="text-[11px] text-zinc-400">Permanently saves all changes made in the current transaction to disk.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">COMMIT;</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-indigo-400">ROLLBACK</span>
                  <p className="text-[11px] text-zinc-400">Undoes uncommitted modifications if an error occurs.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">ROLLBACK;</code>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono font-bold text-indigo-400">SAVEPOINT</span>
                  <p className="text-[11px] text-zinc-400">Sets a checkpoint within a transaction for partial rollbacks.</p>
                  <code className="text-[10px] text-slate-300 block font-mono bg-black/40 p-1 rounded">SAVEPOINT sp1;</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 5 & 6: CREATE DATABASE, CREATE TABLE & DATA TYPES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 5 & 6 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Creating Databases, Tables & SQL Data Types</h2>
          </div>
        </div>

        {/* Database Creation Snippet */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300">Step 1: Create & Activate the Database</span>
            <button
              onClick={() => handleCopy("CREATE DATABASE UniversityDB;\nUSE UniversityDB;", "db-create")}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSnippet === "db-create" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === "db-create" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-black/50 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Create a new database container
CREATE DATABASE UniversityDB;

-- Tell MySQL/DBMS to use this database for all subsequent commands
USE UniversityDB;`}
          </pre>
        </div>

        {/* Common Data Types Guide */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">Essential SQL Data Types</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-zinc-400 font-mono">
                  <th className="py-2.5 px-3">Data Type</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3">Example</th>
                  <th className="py-2.5 px-3">Storage / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">INT / INTEGER</td>
                  <td className="py-2.5 px-3 text-zinc-300">Whole numbers (positive, negative, zero)</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">101, 22, -5</td>
                  <td className="py-2.5 px-3 text-zinc-400 font-mono">4 bytes (-2B to +2B)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">VARCHAR(n)</td>
                  <td className="py-2.5 px-3 text-zinc-300">Variable-length text string up to max length <code className="text-indigo-300">n</code></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">&apos;Rahim&apos;, &apos;CSE&apos;</td>
                  <td className="py-2.5 px-3 text-zinc-400">Allocates only actual string length + 1 byte overhead</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">DECIMAL(p, s)</td>
                  <td className="py-2.5 px-3 text-zinc-300">Exact precision decimal: <code className="text-indigo-300">p</code> total digits, <code className="text-indigo-300">s</code> decimal places</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">DECIMAL(10,2) â†’ 35000.50</td>
                  <td className="py-2.5 px-3 text-zinc-400">Required for money, salary, and accounting (avoids float drift)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">DATE</td>
                  <td className="py-2.5 px-3 text-zinc-300">Calendar date in standard ISO format</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">&apos;2004-10-15&apos;</td>
                  <td className="py-2.5 px-3 text-zinc-400 font-mono">YYYY-MM-DD</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">FLOAT / DOUBLE</td>
                  <td className="py-2.5 px-3 text-zinc-300">Approximate scientific floating-point numbers</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">3.14159, 98.4</td>
                  <td className="py-2.5 px-3 text-zinc-400">Fast math computations, scientific measurements</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">BOOLEAN</td>
                  <td className="py-2.5 px-3 text-zinc-300">True or False flag (stored as 1 or 0 in MySQL TINYINT)</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">TRUE / FALSE</td>
                  <td className="py-2.5 px-3 text-zinc-400 font-mono">1 bit / 1 byte</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 7: SQL CONSTRAINTS & INTERACTIVE ERROR SANDBOX
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 7 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Constraints & Integrity Rules Sandbox</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Constraints enforce <strong>data integrity</strong> at the database engine level. If an INSERT or UPDATE violates a constraint, the DBMS aborts the transaction immediately.
        </p>

        {/* Constraint Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'PK', label: 'PRIMARY KEY', icon: KeyRound },
            { id: 'NOT_NULL', label: 'NOT NULL', icon: AlertTriangle },
            { id: 'UNIQUE', label: 'UNIQUE', icon: Sparkles },
            { id: 'DEFAULT', label: 'DEFAULT', icon: RotateCcw },
            { id: 'CHECK', label: 'CHECK', icon: CheckCircle2 },
            { id: 'FK', label: 'FOREIGN KEY', icon: GitMerge },
          ].map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setConstraintDemo(c.id as any);
                  setConstraintTestStatus('idle');
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-1 ${
                  constraintDemo === c.id
                    ? 'bg-amber-500/20 border-amber-400/50 text-white shadow-lg'
                    : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold">7.{['PK','NOT_NULL','UNIQUE','DEFAULT','CHECK','FK'].indexOf(c.id)+1}</span>
                </div>
                <span className="text-xs font-mono font-bold truncate">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Constraint Demonstration Sandbox */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-amber-900/30 space-y-4">
          {constraintDemo === 'PK' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">7.1 PRIMARY KEY Constraint</span>
                <span className="text-[10px] font-mono text-zinc-400">Rule: Unique + NOT NULL</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Uniquely identifies each record. No two rows can have the same primary key, and it can never be NULL.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Student_ID INT PRIMARY KEY
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Valid: INSERT INTO Students VALUES (107, &apos;Tahsin&apos;);
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Duplicate Error: INSERT INTO Students VALUES (101, &apos;Duplicate&apos;);
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'NOT_NULL' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">7.2 NOT NULL Constraint</span>
                <span className="text-[10px] font-mono text-zinc-400">Rule: Must have a value</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Prevents a column from storing a NULL (empty/missing) value. Crucial for names, passwords, and titles.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Name VARCHAR(100) NOT NULL
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Valid: INSERT ... VALUES (108, &apos;Sadia&apos;);
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  Test NULL Error: INSERT ... VALUES (108, NULL);
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'UNIQUE' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">7.3 UNIQUE Constraint</span>
                <span className="text-[10px] font-mono text-zinc-400">Rule: All values distinct (allows 1 NULL)</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Ensures all values in the column are different. Perfect for email addresses, phone numbers, and NID numbers.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Email VARCHAR(100) UNIQUE
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Valid: Email = &apos;unique_new@gmail.com&apos;
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Duplicate Error: Email = &apos;rahim@gmail.com&apos;
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'DEFAULT' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">7.4 DEFAULT Constraint</span>
                <span className="text-[10px] font-mono text-zinc-400">Rule: Fallback value when unspecified</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Automatically populates a specified default value if no value is passed during INSERT.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Country VARCHAR(50) DEFAULT &apos;Bangladesh&apos;
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Insert without Country (Defaults to &apos;Bangladesh&apos;)
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'CHECK' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">7.5 CHECK Constraint</span>
                <span className="text-[10px] font-mono text-zinc-400">Rule: Boolean condition validation</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Ensures that all values in a column satisfy a specific logical condition (e.g. Age must be at least 16).
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Age INT CHECK (Age &gt;= 16)
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Valid: Age = 22 (&gt;= 16)
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Check Violation: Age = 14 (&lt; 16)
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'FK' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">7.6 FOREIGN KEY Constraint</span>
                <span className="text-[10px] font-mono text-zinc-400">Rule: Referential Integrity Link</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Links a column in the child table to the Primary Key of a parent table, guaranteeing that you cannot reference a non-existent parent ID.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Valid: Department_ID = 1 (Exists: CSE)
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  Test Orphan Key Error: Department_ID = 99 (Does not exist)
                </button>
              </div>
            </div>
          )}

          {/* Engine Output Box */}
          {constraintTestStatus !== 'idle' && (
            <div className={`p-3 rounded-xl border text-xs font-mono mt-3 ${
              constraintTestStatus === 'valid'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {constraintTestStatus === 'valid' ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Query OK, 1 row affected (0.01 sec). All constraints satisfied!</span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">ERROR 1062 (23000): Constraint Violation!</span>
                    <p className="text-[11px] text-rose-400/80 mt-0.5">
                      The RDBMS engine rejected this transaction because it violates integrity rules. No data was corrupted.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 8 - 12: QUERY WORKBENCH (SELECT, WHERE, OPERATORS, ORDER BY)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 8 to 12 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Interactive SQL Query Workbench</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Experiment with live queries on our university student database. Test out <code className="text-cyan-400">SELECT</code> projections, <code className="text-indigo-400">WHERE</code> filtering operators (<code className="text-amber-300">AND, OR, LIKE, BETWEEN</code>), and <code className="text-purple-400">ORDER BY</code> sorting.
        </p>

        {/* Query Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#14182d] border border-slate-700/60">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Condition (WHERE Clause)
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCustomWhereFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'ALL'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                (No WHERE) All Rows
              </button>
              <button
                onClick={() => setCustomWhereFilter('CSE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'CSE'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE Dept = &apos;CSE&apos;
              </button>
              <button
                onClick={() => setCustomWhereFilter('BBA')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'BBA'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE Dept = &apos;BBA&apos;
              </button>
              <button
                onClick={() => setCustomWhereFilter('AGE_OVER_21')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'AGE_OVER_21'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE Age &gt; 21
              </button>
              <button
                onClick={() => setCustomWhereFilter('HIGH_GPA')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'HIGH_GPA'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE GPA &gt;= 3.80
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> Sorting Order (ORDER BY Clause)
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSortOrder('NONE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'NONE'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                Default (PK Order)
              </button>
              <button
                onClick={() => setSortOrder('AGE_ASC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'AGE_ASC'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                ORDER BY Age ASC
              </button>
              <button
                onClick={() => setSortOrder('AGE_DESC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'AGE_DESC'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                ORDER BY Age DESC
              </button>
              <button
                onClick={() => setSortOrder('GPA_DESC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'GPA_DESC'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                ORDER BY GPA DESC
              </button>
            </div>
          </div>
        </div>

        {/* Live SQL Preview Banner */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="text-zinc-300">
            <span className="text-cyan-400 font-bold">Generated SQL: </span>
            <span className="text-emerald-300">SELECT</span> Student_ID, Name, Age, Department, GPA <span className="text-emerald-300">FROM</span> Students
            {customWhereFilter === 'CSE' && <span className="text-amber-300"> WHERE Department = &apos;CSE&apos;</span>}
            {customWhereFilter === 'BBA' && <span className="text-amber-300"> WHERE Department = &apos;BBA&apos;</span>}
            {customWhereFilter === 'AGE_OVER_21' && <span className="text-amber-300"> WHERE Age &gt; 21</span>}
            {customWhereFilter === 'HIGH_GPA' && <span className="text-amber-300"> WHERE GPA &gt;= 3.80</span>}
            {sortOrder === 'AGE_ASC' && <span className="text-purple-300"> ORDER BY Age ASC</span>}
            {sortOrder === 'AGE_DESC' && <span className="text-purple-300"> ORDER BY Age DESC</span>}
            {sortOrder === 'GPA_DESC' && <span className="text-purple-300"> ORDER BY GPA DESC</span>}
            ;
          </div>
          <span className="text-[10px] text-zinc-500">{displayStudents.length} rows returned</span>
        </div>

        {/* Live Result Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Student_ID (PK)</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Age</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {displayStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{student.id}</td>
                  <td className="py-2 px-3 text-white font-medium">{student.name}</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">{student.age}</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">{student.email}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      student.deptName === 'CSE'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : student.deptName === 'BBA'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {student.deptName}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{student.gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 13 & 14: UPDATE & DELETE WITH CRITICAL WARNINGS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 13 & 14 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">UPDATE and DELETE: Syntax & Safety Best Practices</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* UPDATE Box */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">UPDATE Command</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">Modifies Data</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans">
              Used to alter existing column values in rows that match the given <code className="text-amber-300">WHERE</code> clause.
            </p>
            <pre className="p-3 rounded-lg bg-black/50 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Correct: Modifies only Rahim's email
UPDATE Students 
SET Email = 'rahim_new@gmail.com' 
WHERE Student_ID = 101;`}
            </pre>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> What happens if you forget WHERE?
              </strong>
              <p className="text-[11px] text-zinc-300">
                <code className="text-rose-400 font-mono">UPDATE Students SET Email = &apos;xyz@gmail.com&apos;;</code> will rewrite <strong>EVERY SINGLE STUDENT&apos;S</strong> email in the entire database!
              </p>
            </div>
          </div>

          {/* DELETE Box */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-300 uppercase">DELETE Command</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400">Removes Rows</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans">
              Removes specified rows from a table while keeping the table structure intact.
            </p>
            <pre className="p-3 rounded-lg bg-black/50 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Safe Practice: Check target row with SELECT first!
SELECT * FROM Students WHERE Student_ID = 105;

-- Then execute DELETE
DELETE FROM Students 
WHERE Student_ID = 105;`}
            </pre>
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Golden Rule for Production Engineers:
              </strong>
              <p className="text-[11px] text-zinc-300">
                Always wrap destructive DML in a transaction block (<code className="text-amber-400 font-mono">START TRANSACTION; ... ROLLBACK;</code>) or test with <code className="text-cyan-400 font-mono">SELECT COUNT(*)</code> before hitting execute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 15 & 16: AGGREGATE FUNCTIONS, GROUP BY & HAVING
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 15 & 16 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Aggregate Functions, GROUP BY & HAVING</h2>
          </div>
        </div>

        {/* Live Aggregate Calculator Switcher */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">Try 5 SQL Aggregate Functions Live</span>
          <div className="flex flex-wrap gap-2">
            {(['COUNT', 'AVG', 'MAX', 'MIN', 'SUM'] as const).map(fn => (
              <button
                key={fn}
                onClick={() => setActiveAggregate(fn)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  activeAggregate === fn
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {fn}()
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-purple-300 font-bold">{aggregateResult.label}</span>
              <div className="text-2xl font-extrabold text-white mt-0.5 font-mono">{aggregateResult.value}</div>
              <span className="text-[11px] text-zinc-400">{aggregateResult.unit}</span>
            </div>
            <div className="font-mono text-xs text-zinc-400 bg-black/40 p-3 rounded-lg border border-slate-800">
              <span className="text-emerald-400">SELECT </span>
              {activeAggregate === 'COUNT' && 'COUNT(Student_ID) FROM Students;'}
              {activeAggregate === 'AVG' && 'AVG(GPA) FROM Students;'}
              {activeAggregate === 'MAX' && 'MAX(GPA) FROM Students;'}
              {activeAggregate === 'MIN' && 'MIN(Age) FROM Students;'}
              {activeAggregate === 'SUM' && 'SUM(Age) FROM Students;'}
            </div>
          </div>
        </div>

        {/* WHERE vs HAVING Comparison */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">Crucial Exam Topic: WHERE vs HAVING</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">WHERE Clause</span>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-4 marker:text-cyan-400">
                <li>Filters <strong>individual rows</strong> before any grouping occurs.</li>
                <li><strong>Cannot</strong> be used with aggregate functions (e.g. <code className="text-rose-400">WHERE AVG(GPA) &gt; 3.0</code> is invalid syntax!).</li>
                <li>Used directly after the <code className="text-indigo-300">FROM</code> table specification.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400">HAVING Clause</span>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-4 marker:text-purple-400">
                <li>Filters <strong>grouped summary records</strong> after <code className="text-indigo-300">GROUP BY</code> has run.</li>
                <li><strong>Can</strong> filter using aggregate results (e.g. <code className="text-emerald-400">HAVING COUNT(*) &gt; 1</code>).</li>
                <li>Always written after the <code className="text-indigo-300">GROUP BY</code> statement.</li>
              </ul>
            </div>
          </div>

          <pre className="p-3 rounded-lg bg-black/60 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Group departments having more than 1 student enrolled:
SELECT Department, COUNT(*) AS Total_Students, AVG(GPA) AS Avg_GPA
FROM Students
WHERE Age >= 21             -- Filters rows first
GROUP BY Department         -- Groups remaining rows
HAVING COUNT(*) > 1;        -- Filters summary groups`}
          </pre>
        </div>
      </section>

      {/* ========================================================
          PART 17: SQL JOINS VISUALIZER & VENN DIAGRAMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 17 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Joins: Combining Multiple Tables</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A <strong className="text-white">JOIN</strong> combines rows from two or more tables based on a related column between them (Primary Key â†’ Foreign Key).
        </p>

        {/* Join Type Selector */}
        <div className="flex flex-wrap gap-2">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as const).map(join => (
            <button
              key={join}
              onClick={() => setActiveJoinType(join)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeJoinType === join
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{join} JOIN</span>
              {join === 'FULL' && <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">PgSQL/Oracle</span>}
            </button>
          ))}
        </div>

        {/* Join Venn Visual Representation */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            {/* Visual Venn Diagram */}
            <div className="relative w-48 h-28 flex items-center justify-center">
              {/* Left Circle (Students) */}
              <div className={`absolute left-4 w-24 h-24 rounded-full border-2 transition-all flex items-center justify-start pl-3 text-[10px] font-mono font-bold ${
                activeJoinType === 'LEFT' || activeJoinType === 'FULL'
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                  : 'bg-slate-800/40 border-slate-700 text-zinc-500'
              }`}>
                Students
              </div>
              {/* Right Circle (Departments) */}
              <div className={`absolute right-4 w-24 h-24 rounded-full border-2 transition-all flex items-center justify-end pr-2 text-[10px] font-mono font-bold ${
                activeJoinType === 'RIGHT' || activeJoinType === 'FULL'
                  ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                  : 'bg-slate-800/40 border-slate-700 text-zinc-500'
              }`}>
                Depts
              </div>
              {/* Overlap Intersection */}
              <div className={`absolute w-12 h-16 rounded-full transition-all flex items-center justify-center text-[9px] font-mono font-bold ${
                activeJoinType === 'INNER' || activeJoinType === 'LEFT' || activeJoinType === 'RIGHT' || activeJoinType === 'FULL'
                  ? 'bg-emerald-500/50 border border-emerald-400 text-white'
                  : 'bg-transparent'
              }`}>
                Match
              </div>
            </div>

            {/* Explanation text */}
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-white">
                {activeJoinType === 'INNER' && 'INNER JOIN (Only Exact Matches)'}
                {activeJoinType === 'LEFT' && 'LEFT JOIN (All Left Students + Matching Depts)'}
                {activeJoinType === 'RIGHT' && 'RIGHT JOIN (All Depts + Matching Students)'}
                {activeJoinType === 'FULL' && 'FULL OUTER JOIN (Everything from Both Sides)'}
              </h3>
              <p className="text-xs text-zinc-300">
                {activeJoinType === 'INNER' && 'Returns rows only when there is a match in BOTH the Students and Departments tables.'}
                {activeJoinType === 'LEFT' && 'Returns all records from Students, plus matched records from Departments. If no match, right side values are NULL.'}
                {activeJoinType === 'RIGHT' && 'Returns all records from Departments (even the empty Civil Engineering dept), plus matched student rows.'}
                {activeJoinType === 'FULL' && 'Combines the result of both LEFT and RIGHT joins. Supported natively in PostgreSQL and Oracle (in MySQL simulated via UNION).'}
              </p>
              <pre className="p-2.5 rounded bg-black/50 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`SELECT Students.Name, Departments.Department_Name 
FROM Students 
${activeJoinType} JOIN Departments 
ON Students.Department_ID = Departments.Department_ID;`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 18: ALTER, DROP, AND TRUNCATE DEEP DIVE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 18 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">ALTER, DROP, and TRUNCATE Comparison</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          This is one of the most heavily tested theoretical distinctions in university DBMS exams:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Command</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">WHERE Clause?</th>
                <th className="py-2.5 px-3">Rollback Possible?</th>
                <th className="py-2.5 px-3">Table Structure</th>
                <th className="py-2.5 px-3">Auto-Increment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">DELETE</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DML</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">Yes (Selective)</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">Yes (in transaction)</td>
                <td className="py-2.5 px-3 text-zinc-300">Preserved</td>
                <td className="py-2.5 px-3 text-zinc-400">Not reset</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">TRUNCATE</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DDL</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">No (All rows)</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">No (in most DBs)</td>
                <td className="py-2.5 px-3 text-zinc-300">Preserved (Empty table)</td>
                <td className="py-2.5 px-3 text-amber-300 font-bold">Reset back to 1</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-rose-400">DROP</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DDL</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">No</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">No</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">Destroyed Permanently</td>
                <td className="py-2.5 px-3 text-zinc-500">Deleted with table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 19: COMPLETE SQL PRACTICE PROJECT WALKTHROUGH
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 19 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Complete SQL Practice Project: University System</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Walk through the complete lifecycle of a relational database step-by-step:
        </p>

        {/* Step Buttons */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
            <button
              key={step}
              onClick={() => setActiveProjectStep(step)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                activeProjectStep === step
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              Step {step}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeProjectStep === 1 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 1: Create Database</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE DATABASE UniversityDB;
USE UniversityDB;`}
              </pre>
              <p className="text-xs text-zinc-400">Creates the container and sets it as the active working schema.</p>
            </div>
          )}

          {activeProjectStep === 2 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 2: Create Departments Table (Parent)</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(50) NOT NULL
);`}
              </pre>
              <p className="text-xs text-zinc-400">Always create parent tables first so child tables can reference their Primary Keys.</p>
            </div>
          )}

          {activeProjectStep === 3 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 3: Insert Departments</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`INSERT INTO Departments VALUES 
(1, 'CSE'),
(2, 'BBA'),
(3, 'EEE');`}
              </pre>
              <p className="text-xs text-zinc-400">Batch-inserts 3 department records into the Departments table.</p>
            </div>
          )}

          {activeProjectStep === 4 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 4: Create Students Table with Foreign Key</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 16),
    Email VARCHAR(100) UNIQUE,
    Department_ID INT,
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);`}
              </pre>
              <p className="text-xs text-zinc-400">Enforces PK, NOT NULL, CHECK, UNIQUE, and FOREIGN KEY integrity.</p>
            </div>
          )}

          {activeProjectStep === 5 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 5: Insert Student Records</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`INSERT INTO Students VALUES 
(101, 'Rahim', 22, 'rahim@gmail.com', 1),
(102, 'Karim', 23, 'karim@gmail.com', 2),
(103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1),
(104, 'Nabila', 22, 'nabila@gmail.com', 3);`}
              </pre>
              <p className="text-xs text-zinc-400">Populates students referencing existing department foreign keys (1, 2, 3).</p>
            </div>
          )}

          {activeProjectStep === 6 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 6: Display All Students</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students;`}
              </pre>
              <p className="text-xs text-zinc-400">Returns all 4 student records with their raw Department_IDs.</p>
            </div>
          )}

          {activeProjectStep === 7 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 7: Filter CSE Students</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students WHERE Department_ID = 1;`}
              </pre>
              <p className="text-xs text-zinc-400">Returns Rahim (101) and Sumaiya (103).</p>
            </div>
          )}

          {activeProjectStep === 8 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">Step 8: Join Students with Department Names</span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Students.Name, Departments.Department_Name 
FROM Students 
INNER JOIN Departments 
ON Students.Department_ID = Departments.Department_ID;`}
              </pre>
              <p className="text-xs text-zinc-400">Generates clean human-readable output replacing department IDs with actual names (CSE, BBA, EEE).</p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 20: UNIVERSITY EXAM PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 20 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Exam Preparation: Short & Descriptive Q&A</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Review standard university exam questions with concise model answers and essential technical keywords:
        </p>

        {/* Short Questions Accordion */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase">Short Questions (2â€“3 Marks Each)</h3>

          {[
            {
              id: 'sq1',
              q: 'Q1: What is SQL and why is it used?',
              a: 'SQL (Structured Query Language) is the standardized declarative language used to define, manipulate, and query relational databases. It allows users to create tables, insert records, query data with conditions, and manage transactions.'
            },
            {
              id: 'sq2',
              q: 'Q2: What is the difference between SQL and MySQL?',
              a: 'SQL is the abstract query language specification. MySQL is a concrete software application (RDBMS server) developed to store data and execute SQL queries.'
            },
            {
              id: 'sq3',
              q: 'Q3: Define DDL, DML, DQL, DCL, and TCL with one example each.',
              a: 'DDL (Data Definition: CREATE), DML (Data Manipulation: INSERT), DQL (Data Query: SELECT), DCL (Data Control: GRANT), and TCL (Transaction Control: COMMIT).'
            },
            {
              id: 'sq4',
              q: 'Q4: What is the difference between DELETE, TRUNCATE, and DROP?',
              a: 'DELETE is a DML command that removes specific rows matching WHERE and can be rolled back. TRUNCATE is DDL that wipes all rows instantly and resets auto-increment counters. DROP deletes the entire table and its schema from disk.'
            },
            {
              id: 'sq5',
              q: 'Q5: What is the purpose of the WHERE clause vs HAVING clause?',
              a: 'WHERE filters individual tuples before grouping and cannot use aggregate functions. HAVING filters grouped summary rows after GROUP BY and can evaluate aggregate expressions like HAVING COUNT(*) > 2.'
            },
            {
              id: 'sq6',
              q: 'Q6: What is a Foreign Key and why is it essential?',
              a: 'A Foreign Key is an attribute in a child table that points to the Primary Key of a parent table. It enforces referential integrity by preventing orphan records and invalid references.'
            },
            {
              id: 'sq7',
              q: 'Q7: What are SQL aggregate functions?',
              a: 'Aggregate functions compute a single scalar value from a column of multiple rows. Standard functions are COUNT(), SUM(), AVG(), MAX(), and MIN().'
            },
            {
              id: 'sq8',
              q: 'Q8: What is an INNER JOIN vs LEFT JOIN?',
              a: 'INNER JOIN returns only matching rows present in both tables. LEFT JOIN returns all rows from the left table regardless of whether there is a match in the right table (unmatched right columns become NULL).'
            },
            {
              id: 'sq9',
              q: 'Q9: What does the DISTINCT keyword do?',
              a: 'SELECT DISTINCT eliminates duplicate row values from the returned result set, displaying each unique value only once.'
            },
            {
              id: 'sq10',
              q: 'Q10: Explain the LIKE operator and its wildcards.',
              a: 'LIKE performs pattern matching on text. "%" represents zero or more arbitrary characters (e.g. "R%" finds any name starting with R), while "_" represents exactly one character.'
            }
          ].map(item => (
            <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
              <button
                onClick={() => toggleExamQ(item.id)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                {openExamQuestions[item.id] ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
              </button>
              {openExamQuestions[item.id] && (
                <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick SQL Cheat Sheet */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase">Exam Syntax Quick Cheat Sheet</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 font-mono text-[11px] text-zinc-300">
            <div className="p-2 bg-black/40 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">CREATE TABLE</span>
              <code>CREATE TABLE t (id INT PK, name VARCHAR(50));</code>
            </div>
            <div className="p-2 bg-black/40 rounded border border-slate-800">
              <span className="text-emerald-400 font-bold block">INSERT INTO</span>
              <code>INSERT INTO t VALUES (1, &apos;Data&apos;);</code>
            </div>
            <div className="p-2 bg-black/40 rounded border border-slate-800">
              <span className="text-purple-400 font-bold block">SELECT + WHERE</span>
              <code>SELECT * FROM t WHERE id = 1;</code>
            </div>
            <div className="p-2 bg-black/40 rounded border border-slate-800">
              <span className="text-amber-400 font-bold block">UPDATE + WHERE</span>
              <code>UPDATE t SET name=&apos;X&apos; WHERE id=1;</code>
            </div>
            <div className="p-2 bg-black/40 rounded border border-slate-800">
              <span className="text-rose-400 font-bold block">DELETE + WHERE</span>
              <code>DELETE FROM t WHERE id=1;</code>
            </div>
            <div className="p-2 bg-black/40 rounded border border-slate-800">
              <span className="text-indigo-400 font-bold block">INNER JOIN</span>
              <code>SELECT * FROM a JOIN b ON a.id = b.a_id;</code>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 22: HOMEWORK & CASE STUDY (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 21 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical Case Study: CompanyDB & Employees Schema</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Practice writing queries for a real-world enterprise database scenario. Click <strong className="text-cyan-300">&quot;Reveal Mentor Solution&quot;</strong> on each task to verify your SQL syntax and logic:
        </p>

        {/* Schema Blueprint */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase">Target Schema: Employees Table</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px] pt-1">
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Employee_ID</span>
              <span className="text-zinc-400">INT (PK)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Name</span>
              <span className="text-zinc-400">VARCHAR(100)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Age</span>
              <span className="text-zinc-400">INT</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Salary</span>
              <span className="text-zinc-400">DECIMAL(10,2)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Department</span>
              <span className="text-zinc-400">VARCHAR(50)</span>
            </div>
          </div>
        </div>

        {/* 11 Interactive Tasks with Reveal Buttons */}
        <div className="space-y-3">
          {[
            {
              num: 1,
              task: 'Task 1: Create a database named CompanyDB and switch to it.',
              sol: "CREATE DATABASE CompanyDB;\nUSE CompanyDB;"
            },
            {
              num: 2,
              task: 'Task 2: Create the Employees table with appropriate constraints.',
              sol: "CREATE TABLE Employees (\n    Employee_ID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT,\n    Salary DECIMAL(10,2) NOT NULL,\n    Department VARCHAR(50)\n);"
            },
            {
              num: 3,
              task: 'Task 3: Insert five employee records across different departments.',
              sol: "INSERT INTO Employees VALUES\n(1, 'Ahmed', 28, 45000.00, 'IT'),\n(2, 'Sara', 32, 55000.00, 'HR'),\n(3, 'Tariq', 25, 32000.00, 'IT'),\n(4, 'Mona', 29, 48000.00, 'Finance'),\n(5, 'Zubair', 35, 60000.00, 'IT');"
            },
            {
              num: 4,
              task: 'Task 4: Display all records from the Employees table.',
              sol: "SELECT * FROM Employees;"
            },
            {
              num: 5,
              task: 'Task 5: Display only the Name and Salary of all employees.',
              sol: "SELECT Name, Salary FROM Employees;"
            },
            {
              num: 6,
              task: 'Task 6: Find all employees whose salary is greater than 35,000.',
              sol: "SELECT * FROM Employees WHERE Salary > 35000;"
            },
            {
              num: 7,
              task: 'Task 7: Find all employees working in the IT department.',
              sol: "SELECT * FROM Employees WHERE Department = 'IT';"
            },
            {
              num: 8,
              task: 'Task 8: Sort all employees by salary in descending order (highest first).',
              sol: "SELECT * FROM Employees ORDER BY Salary DESC;"
            },
            {
              num: 9,
              task: 'Task 9: Update the salary of Ahmed (Employee_ID = 1) to 50,000.',
              sol: "UPDATE Employees SET Salary = 50000.00 WHERE Employee_ID = 1;"
            },
            {
              num: 10,
              task: 'Task 10: Delete the record of Tariq using his Employee_ID (3).',
              sol: "DELETE FROM Employees WHERE Employee_ID = 3;"
            },
            {
              num: 11,
              task: 'Bonus Challenge: Find the average salary of employees in each department using GROUP BY.',
              sol: "SELECT Department, COUNT(*) AS Headcount, AVG(Salary) AS Average_Salary\nFROM Employees\nGROUP BY Department;"
            }
          ].map(taskItem => (
            <div key={taskItem.num} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">{taskItem.task}</span>
                <button
                  onClick={() => toggleSolution(taskItem.num)}
                  className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{revealedSolutions[taskItem.num] ? 'Hide Solution' : 'Reveal Mentor Query'}</span>
                </button>
              </div>
              {revealedSolutions[taskItem.num] && (
                <div className="pt-2">
                  <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                    {taskItem.sol}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 23: REVISION CHECKLIST & NAVIGATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 22 of 22
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 6 Final Revision Checklist</h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">SQL Mastery Progress</span>
            <span className="text-emerald-400 font-bold">{completedCount} of {checklistTotal} items ({progressPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Checkbox List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'I understand what SQL and RDBMS mean.',
            'I understand database, table, row, and column mapping.',
            'I can identify DDL, DML, DQL, DCL, and TCL commands.',
            'I can create a database and a table using SQL.',
            'I understand common SQL data types (INT, VARCHAR, DECIMAL, DATE).',
            'I understand and can apply table constraints (PK, FK, NOT NULL, UNIQUE, CHECK).',
            'I can insert records using INSERT INTO.',
            'I can retrieve and filter records using SELECT and WHERE.',
            'I can use logical operators (AND, OR, NOT, BETWEEN, IN, LIKE).',
            'I can sort data using ORDER BY ASC and DESC.',
            'I can update and delete records safely with WHERE.',
            'I understand aggregate functions (COUNT, SUM, AVG) and GROUP BY vs HAVING.',
            'I understand INNER JOIN, LEFT JOIN, and RIGHT JOIN.'
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggleChecklist(idx)}
              className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer flex items-start gap-2.5 ${
                checkedItems[idx]
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : 'bg-[#14182d] border-slate-800 text-zinc-300 hover:border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border flex-shrink-0 transition-colors ${
                checkedItems[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-900'
              }`}>
                {checkedItems[idx] && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{item}</span>
            </button>
          ))}
        </div>

        {/* Next Module Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Next in Series â€¢ Advanced Query Mastery
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module 7
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 7: Advanced SQL Queries (Subqueries, CTEs, Window Functions)
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Now that you master SQL fundamentals, take your skills to an advanced level: Single &amp; Multi-row subqueries, correlated inner-outer evaluations, Common Table Expressions (<code className="text-cyan-300">WITH</code>), set operations, and analytical window functions.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson5')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 5: ER Model</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson7')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Go to Lesson 7: Advanced SQL Queries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
