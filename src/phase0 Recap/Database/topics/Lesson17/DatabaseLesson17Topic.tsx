'use client';

import React, { useState, useMemo } from 'react';
import {
  Layers,
  Database,
  Search,
  TrendingUp,
  BarChart3,
  PieChart,
  Brain,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  BookOpen,
  KeyRound,
  FileText,
  HelpCircle,
  Zap,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Sliders,
  Play,
  Server,
  Building2,
  ShoppingCart,
  HeartPulse,
  Users,
  Clock,
  Calendar,
  Network
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson17TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 MCQ Questions for Lesson 17 (Matching user prompt exactly)
interface MCQQuestion {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const MCQ_DATA: MCQQuestion[] = [
  {
    id: 1,
    question: 'What is the main purpose of a Data Warehouse?',
    options: [
      { key: 'A', text: 'Processing daily OLTP transactions' },
      { key: 'B', text: 'Storing integrated historical data for analysis and decision-making' },
      { key: 'C', text: 'Creating computer network cables' },
      { key: 'D', text: 'Managing server operating systems' }
    ],
    correct: 'B',
    explanation: 'A Data Warehouse is a centralized historical repository specifically designed to aggregate data from disparate sources to support reporting, OLAP queries, and strategic business intelligence.'
  },
  {
    id: 2,
    question: 'What does ETL stand for in Data Warehousing?',
    options: [
      { key: 'A', text: 'Extract, Transform, Load' },
      { key: 'B', text: 'Enter, Transfer, Link' },
      { key: 'C', text: 'Execute, Test, Learn' },
      { key: 'D', text: 'Extract, Translate, Link' }
    ],
    correct: 'A',
    explanation: 'ETL stands for Extract (collect data from multiple source databases), Transform (cleanse, standardize, and format data), and Load (insert the cleaned data into the warehouse).'
  },
  {
    id: 3,
    question: 'Which system is designed primarily for everyday business transactions?',
    options: [
      { key: 'A', text: 'OLAP' },
      { key: 'B', text: 'Data Mining' },
      { key: 'C', text: 'OLTP' },
      { key: 'D', text: 'KDD' }
    ],
    correct: 'C',
    explanation: 'OLTP (Online Transaction Processing) manages high-frequency, atomic everyday business operations like ATM withdrawals, point-of-sale checkouts, and booking tickets.'
  },
  {
    id: 4,
    question: 'Which Data Warehouse characteristic means storing historical data over long periods (5–10 years)?',
    options: [
      { key: 'A', text: 'Integrated' },
      { key: 'B', text: 'Time-Variant' },
      { key: 'C', text: 'Non-Volatile' },
      { key: 'D', text: 'Subject-Oriented' }
    ],
    correct: 'B',
    explanation: 'Time-Variant means data in a warehouse is explicitly indexed across chronological time horizons, allowing analysts to examine historical trends and longitudinal patterns.'
  },
  {
    id: 5,
    question: 'Which data mining technique assigns data into predefined categories or classes?',
    options: [
      { key: 'A', text: 'Clustering' },
      { key: 'B', text: 'Classification' },
      { key: 'C', text: 'Association Rule Mining' },
      { key: 'D', text: 'Anomaly Detection' }
    ],
    correct: 'B',
    explanation: 'Classification is a supervised machine learning technique that assigns data objects to predefined categorical classes (e.g. Loan Risk: Low, Medium, High; Email: Spam vs Ham).'
  },
  {
    id: 6,
    question: 'Which data mining technique groups similar customers together WITHOUT predefined categories?',
    options: [
      { key: 'A', text: 'Classification' },
      { key: 'B', text: 'ETL' },
      { key: 'C', text: 'Clustering' },
      { key: 'D', text: 'Loading' }
    ],
    correct: 'C',
    explanation: 'Clustering is an unsupervised learning technique that automatically groups items based on intrinsic mathematical similarities without requiring predefined label tags.'
  },
  {
    id: 7,
    question: 'Which technique discovers products frequently purchased together in Market Basket Analysis?',
    options: [
      { key: 'A', text: 'Association Rule Mining' },
      { key: 'B', text: 'Normalization' },
      { key: 'C', text: 'Indexing' },
      { key: 'D', text: 'Encryption' }
    ],
    correct: 'A',
    explanation: 'Association Rule Mining (e.g. Apriori algorithm) discovers co-occurrence relationships between items purchased simultaneously (e.g., Bread -> Butter).'
  },
  {
    id: 8,
    question: 'What is a Data Mart?',
    options: [
      { key: 'A', text: 'A complete operating system' },
      { key: 'B', text: 'A smaller, departmental subset of a Data Warehouse' },
      { key: 'C', text: 'A database programming language' },
      { key: 'D', text: 'A transaction redo log' }
    ],
    correct: 'B',
    explanation: 'A Data Mart is a focused, departmental mini-warehouse (e.g. Marketing Data Mart, Finance Data Mart) customized for the analytical needs of a single business unit.'
  },
  {
    id: 9,
    question: 'What does OLAP mainly support?',
    options: [
      { key: 'A', text: 'Daily cashier payment processing' },
      { key: 'B', text: 'Complex multidimensional analytical queries and reporting' },
      { key: 'C', text: 'Single-row data entry forms only' },
      { key: 'D', text: 'User password resets' }
    ],
    correct: 'B',
    explanation: 'OLAP (Online Analytical Processing) empowers analysts and executives to execute complex aggregate queries across multiple dimensions (slice-and-dice, drill-down, rollup).'
  },
  {
    id: 10,
    question: 'Which data mining technique identifies unusual, suspicious, or abnormal transactions?',
    options: [
      { key: 'A', text: 'Clustering' },
      { key: 'B', text: 'Classification' },
      { key: 'C', text: 'Anomaly Detection' },
      { key: 'D', text: 'ETL' }
    ],
    correct: 'C',
    explanation: 'Anomaly Detection (Outlier Analysis) identifies patterns that deviate significantly from expected normal behavior, making it invaluable for credit card fraud detection and network intrusion monitoring.'
  }
];

export default function DatabaseLesson17Topic({ onNavigate }: DatabaseLesson17TopicProps) {
  // 1. Department Silos vs Central Data Warehouse Toggle
  const [siloConsolidated, setSiloConsolidated] = useState<boolean>(false);

  // 2. Interactive ETL Pipeline Active Stage
  const [etlStage, setEtlStage] = useState<'extract' | 'transform' | 'load' | 'report'>('extract');

  // 3. OLTP vs OLAP Architecture Mode
  const [processingMode, setProcessingMode] = useState<'oltp' | 'olap'>('oltp');

  // 4. Data Warehouse Types Selector
  const [dwType, setDwType] = useState<'edw' | 'datamart' | 'virtual'>('edw');

  // 5. Data Mining Techniques Interactive Playground
  const [miningTechnique, setMiningTechnique] = useState<'classification' | 'clustering' | 'association' | 'prediction' | 'anomaly'>('classification');

  // Classification State: Loan Applicant
  const [applicantIncome, setApplicantIncome] = useState<number>(65000);
  const [applicantDebt, setApplicantDebt] = useState<number>(12000);

  // Market Basket Association Rule Sliders
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(75);

  // 6. KDD Process Stepper
  const [kddStep, setKddStep] = useState<number>(6); // Default on Data Mining

  // 7. Practice Exercises Reveal State
  const [exerciseRevealed, setExerciseRevealed] = useState<Record<number, boolean>>({});

  // 8. MCQ Assessment State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 9. University Exam Accordions
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 10. Revision Checklist State (16 Topics)
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  const toggleExamQ = (id: string) => {
    setOpenExamQ(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleChecklist = (idx: number) => {
    setCheckedChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectAnswer = (qId: number, key: 'A' | 'B' | 'C' | 'D') => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: key }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const quizScore = useMemo(() => {
    let score = 0;
    MCQ_DATA.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [selectedAnswers]);

  const checklistTotal = 16;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  // Dynamic Loan Risk Classification Calculator
  const loanRiskClass = useMemo(() => {
    const dti = (applicantDebt / applicantIncome) * 100;
    if (dti < 25) return { category: 'Low Risk (Approved)', color: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' };
    if (dti < 45) return { category: 'Medium Risk (Manual Review)', color: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300' };
    return { category: 'High Risk (Rejected)', color: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300' };
  }, [applicantIncome, applicantDebt]);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06142a] via-[#091f42] to-[#040a18] border border-cyan-800/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Lesson 17 of 18 • Business Intelligence
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Data Warehousing &amp; Data Mining
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
            Data Warehousing, OLAP &amp; Data Mining
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Bridge the gap between operational databases and executive decision-making. Master the <strong>4 Inmon Characteristics</strong> of Data Warehouses, the <strong>ETL pipeline</strong> (Extract, Transform, Load), <strong>OLTP vs. OLAP</strong> architectures, and the <strong>5 Core Data Mining Techniques</strong> (Classification, Clustering, Association Rules, Prediction, and Anomaly Detection) across the <strong>KDD process</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-cyan-300/80">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Central Data Warehouse</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span>ETL Pipeline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>OLTP vs. OLAP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-amber-400" />
              <span>Data Mining &amp; KDD</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS A DATA WAREHOUSE & UNIVERSITY SILOS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 12 • Foundations
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What Is a Data Warehouse? Solving the &quot;Data Silo&quot; Problem</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">The Executive Dilemma</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              In a university, each department maintains its own operational database: <strong>Admission</strong> stores entrance applications, <strong>Accounts</strong> tracks tuition fees, <strong>Examinations</strong> records semester grades, and <strong>HR</strong> manages payroll.
            </p>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              When the Vice-Chancellor asks: <em>&quot;How has overall university performance, revenue, and retention changed over the past 10 years?&quot;</em>, answering requires pulling data from 5 isolated database silos. Running massive analytical queries directly on live operational databases locks tables and crashes everyday student portals!
            </p>

            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 text-xs text-cyan-200 font-mono space-y-1">
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">Formal Definition:</div>
              <div>A <strong>Data Warehouse</strong> is a subject-oriented, integrated, time-variant, and non-volatile collection of data in support of management&apos;s decision-making process.</div>
            </div>
          </div>

          {/* Interactive Silos vs Warehouse Visualizer */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-white uppercase">Departmental Data Silos vs. Central EDW</span>
              <button
                onClick={() => setSiloConsolidated(!siloConsolidated)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                  siloConsolidated
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50'
                    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow'
                }`}
              >
                {siloConsolidated ? '✓ Consolidated into Warehouse' : 'Simulate Warehouse ETL Integration'}
              </button>
            </div>

            {!siloConsolidated ? (
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-zinc-400">Current State: 5 Disconnected Siloed Databases</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-center">
                  {[
                    { dept: 'Admission', data: 'MySQL (Student ID)', color: 'border-blue-500/30 text-blue-300' },
                    { dept: 'Accounts', data: 'Oracle (Tuition & Fees)', color: 'border-emerald-500/30 text-emerald-300' },
                    { dept: 'Exams', data: 'PostgreSQL (Grades)', color: 'border-purple-500/30 text-purple-300' },
                    { dept: 'Library', data: 'Excel Sheets (Books)', color: 'border-amber-500/30 text-amber-300' },
                    { dept: 'HR & Staff', data: 'Legacy Access DB', color: 'border-rose-500/30 text-rose-300' }
                  ].map((s, idx) => (
                    <div key={idx} className={`p-2.5 rounded-lg bg-black/40 border ${s.color}`}>
                      <div className="font-bold">{s.dept}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{s.data}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded bg-rose-950/20 border border-rose-500/30 text-[11px] text-rose-300 font-sans">
                  ⚠️ <strong>Problem:</strong> Inconsistent date formats, duplicate records, isolated servers, zero unified historical perspective.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 text-center space-y-2">
                  <Database className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold font-mono text-white">Central Enterprise Data Warehouse (EDW)</div>
                  <div className="text-xs text-emerald-300 font-sans">
                    All 5 sources standardized, cleansed, deduplicated, and organized into a time-variant star schema!
                  </div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800 text-[11px] font-mono text-zinc-300 space-y-1">
                  <div>&check; Dates unified to ISO <code>YYYY-MM-DD</code></div>
                  <div>&check; Student IDs mapped to single Global Surrogate Key</div>
                  <div>&check; 10-Year historical trends queryable in seconds without impacting live student portals!</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4 Inmon Characteristics */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-white font-mono uppercase mb-3">The 4 Classic Characteristics of a Data Warehouse (W.H. Inmon)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              {
                title: '1. Subject-Oriented',
                desc: 'Organized around major business subjects (Students, Products, Sales, Claims) rather than ongoing company processes (registration, billing).',
                color: 'text-cyan-400',
                border: 'border-cyan-500/30'
              },
              {
                title: '2. Integrated',
                desc: 'Constructed by consolidating data from diverse operational databases, standardizing conflicting naming conventions, formats, and encodings.',
                color: 'text-emerald-400',
                border: 'border-emerald-500/30'
              },
              {
                title: '3. Time-Variant',
                desc: 'Every key structure contains an explicit time element (e.g. Year, Quarter, Month) spanning 5–10 years to track historical trajectories.',
                color: 'text-amber-400',
                border: 'border-amber-500/30'
              },
              {
                title: '4. Non-Volatile',
                desc: 'Historical records are read-only append logs. Operational data is loaded periodically but never altered or deleted in-place.',
                color: 'text-purple-400',
                border: 'border-purple-500/30'
              }
            ].map((c, idx) => (
              <div key={idx} className={`p-4 rounded-xl bg-[#14182d] border ${c.border} space-y-1.5`}>
                <div className={`font-bold font-mono ${c.color}`}>{c.title}</div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: HOW DOES A DATA WAREHOUSE WORK? (ETL PIPELINE)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                Part 2 of 12 • Data Engineering
              </span>
              <h2 className="text-xl font-bold text-white mt-1">How a Data Warehouse Works: The ETL Pipeline</h2>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'extract', label: '1. Extract' },
              { id: 'transform', label: '2. Transform' },
              { id: 'load', label: '3. Load' },
              { id: 'report', label: '4. Analyze' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setEtlStage(s.id as typeof etlStage)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  etlStage === s.id ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic ETL Stage Card */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {etlStage === 'extract' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-400 font-mono">Stage 1: Extraction (Collecting Raw Data)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Raw Ingestion</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Connects to heterogeneous OLTP databases, log files, flat Excel spreadsheets, and web APIs without disrupting transactional production workloads.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-zinc-400">Source A (MySQL):</div>
                  <div className="text-cyan-300 mt-1">{`{ id: 101, dob: "17-11-2004", gpa: "3.90" }`}</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-zinc-400">Source B (Oracle):</div>
                  <div className="text-cyan-300 mt-1">{`{ student_no: "101", birth_dt: "2004/11/17" }`}</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-zinc-400">Source C (Excel Flatfile):</div>
                  <div className="text-cyan-300 mt-1">{`[ 101, "Rahim", "Nov 17, 2004", 45000 ]`}</div>
                </div>
              </div>
            </div>
          )}

          {etlStage === 'transform' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400 font-mono">Stage 2: Transformation (Cleaning &amp; Standardization)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Data Scrubbing</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Cleanses dirty data, resolves conflicting date formats, strips special characters, standardizes currency values, and calculates derived analytical metrics.
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono space-y-2">
                <div className="text-emerald-400 font-bold">Transformation Rules Applied:</div>
                <div className="text-zinc-300 space-y-1 text-[11px]">
                  <div>&bull; Date Standardization: <code>&quot;17-11-2004&quot;</code> &amp; <code>&quot;Nov 17, 2004&quot;</code> &rarr; <strong className="text-emerald-300">&quot;2004-11-17&quot; (ISO-8601)</strong></div>
                  <div>&bull; Schema Mapping: <code>student_no</code> &rarr; <code>StudentID</code></div>
                  <div>&bull; Data Type Casting: String GPA <code>&quot;3.90&quot;</code> &rarr; Float <code>3.90</code></div>
                  <div>&bull; Surrogate Key: Generates unique warehouse dimension ID: <code>Dim_Student_SK = 89412</code></div>
                </div>
              </div>
            </div>
          )}

          {etlStage === 'load' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-purple-400 font-mono">Stage 3: Loading (Writing to Data Warehouse)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Bulk Ingestion</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Bulk-inserts cleaned dimensional records and aggregated facts into the central repository (Star Schema or Snowflake Schema) during low-traffic batch windows.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Dimension Table (Dim_Student):</div>
                  <div className="text-[11px] text-zinc-300">Stores descriptive attributes: Name, Department, City, Admission Cohort.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Fact Table (Fact_Tuition_Revenue):</div>
                  <div className="text-[11px] text-zinc-300">Stores measurable numerical metrics: Amount Paid, Scholarship Deductions, Fees Due.</div>
                </div>
              </div>
            </div>
          )}

          {etlStage === 'report' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400 font-mono">Stage 4: Analysis, OLAP &amp; Business Intelligence</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Executive Insight</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Management generates multi-year comparative reports, cohort retention funnels, and revenue forecasts.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono pt-1">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-zinc-400">10-Yr Enrollment Growth</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">+142%</div>
                  <div className="text-[10px] text-zinc-500">2,000 &rarr; 4,850 Students</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-zinc-400">Top Revenue Dept</div>
                  <div className="text-lg font-bold text-cyan-400 mt-1">CSE Dept</div>
                  <div className="text-[10px] text-zinc-500">৳14.2 Crore Annual</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-zinc-400">Average Pass Rate</div>
                  <div className="text-lg font-bold text-purple-400 mt-1">94.8%</div>
                  <div className="text-[10px] text-zinc-500">Consistently Rising</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 2: OLTP VS OLAP
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                Part 3 of 12 • Paradigm Comparison
              </span>
              <h2 className="text-xl font-bold text-white mt-1">OLTP vs. OLAP: Transactional vs. Analytical Processing</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setProcessingMode('oltp')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                processingMode === 'oltp' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              OLTP (Transactions)
            </button>
            <button
              onClick={() => setProcessingMode('olap')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                processingMode === 'olap' ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              OLAP (Analytics)
            </button>
          </div>
        </div>

        {/* Dynamic Paradigm Viewer */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {processingMode === 'oltp' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-400 font-mono">OLTP: Running Everyday Real-Time Business Operations</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Fast Writes (5ms)</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Handles thousands of concurrent reads and updates per second. Characterized by simple, normalized SQL statements operating on a single row (e.g. withdrawing money at an ATM, charging a credit card).
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-zinc-300 space-y-1">
                <div className="text-zinc-400">Typical SQL Statement:</div>
                <code className="text-cyan-300">UPDATE Accounts SET balance = balance - 500 WHERE account_id = 4912;</code>
                <div className="text-[10px] text-zinc-400 pt-1 font-sans">Touches 1 row, completes in &lt;5ms, enforces strict ACID atomicity.</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-purple-400 font-mono">OLAP: Complex Multi-Dimensional Analysis &amp; Aggregations</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Read-Heavy Scans</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Aggregates millions of historical rows across multiple dimensions (Time, Product, Region, Department) to discover macro trends and support executive planning.
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-zinc-300 space-y-1">
                <div className="text-zinc-400">Typical SQL Statement:</div>
                <code className="text-purple-300">{`SELECT d.dept_name, t.year, SUM(f.tuition_paid) AS total_revenue\nFROM Fact_Tuition f\nJOIN Dim_Department d ON f.dept_id = d.id\nJOIN Dim_Time t ON f.time_id = t.id\nGROUP BY d.dept_name, t.year;`}</code>
                <div className="text-[10px] text-zinc-400 pt-1 font-sans">Scans 5,000,000 rows across 10 years, aggregates totals in 1.4s.</div>
              </div>
            </div>
          )}

          {/* Master Comparison Matrix */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">OLTP vs. OLAP University Examination Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Feature</th>
                    <th className="p-3 text-cyan-400">OLTP (Online Transaction Processing)</th>
                    <th className="p-3 text-purple-400">OLAP (Online Analytical Processing)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Primary Purpose</td>
                    <td className="p-3 text-zinc-300 font-sans">Manage daily transactional operations</td>
                    <td className="p-3 text-zinc-300 font-sans">Analyze historical data for decision-making</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Data Scope</td>
                    <td className="p-3 text-zinc-300 font-sans">Current, up-to-the-second operational state</td>
                    <td className="p-3 text-zinc-300 font-sans">Multi-year historical, consolidated snapshots</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Schema Design</td>
                    <td className="p-3 text-zinc-300 font-sans">Highly normalized (3NF/BCNF) to eliminate update anomalies</td>
                    <td className="p-3 text-zinc-300 font-sans">Denormalized Star / Snowflake schemas for rapid reads</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Typical Operations</td>
                    <td className="p-3 text-zinc-300 font-sans">High-frequency INSERT, UPDATE, DELETE</td>
                    <td className="p-3 text-zinc-300 font-sans">Periodic batch loads + complex aggregate SELECTs</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Target Users</td>
                    <td className="p-3 text-zinc-300 font-sans">Clerks, cashiers, customers, web users</td>
                    <td className="p-3 text-zinc-300 font-sans">Data analysts, business managers, executives</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Exam Mnemonic</td>
                    <td className="p-3 text-cyan-300 font-bold font-sans">Doing business</td>
                    <td className="p-3 text-purple-300 font-bold font-sans">Analyzing business</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: TYPES OF DATA WAREHOUSES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 4 of 12 • Architecture Types
            </span>
            <h2 className="text-xl font-bold text-white mt-1">3 Major Types of Data Warehouses</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              id: 'edw',
              title: 'Enterprise Data Warehouse (EDW)',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              bg: 'bg-cyan-950/20',
              scope: 'Whole Enterprise',
              desc: 'Centralized repository collecting data from every division across the entire organization (Accounts, Loans, Cards, Deposits) into a unified enterprise data model.'
            },
            {
              id: 'datamart',
              title: 'Data Mart (Departmental)',
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              bg: 'bg-emerald-950/20',
              scope: 'Single Department',
              desc: 'A focused, customized slice of a data warehouse built specifically for a single business unit (e.g. Marketing Data Mart, Student Examination Data Mart).'
            },
            {
              id: 'virtual',
              title: 'Virtual Data Warehouse',
              color: 'text-purple-400',
              border: 'border-purple-500/30',
              bg: 'bg-purple-950/20',
              scope: 'Federated Logical View',
              desc: 'Provides a unified semantic view of operational data without physically duplicating or staging it in a separate physical repository (uses query federation middleware).'
            }
          ].map(dw => (
            <div key={dw.id} className={`p-4 rounded-xl border ${dw.border} ${dw.bg} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-mono ${dw.color}`}>{dw.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-300">
                  {dw.scope}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">{dw.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 4: UNDERSTANDING DATA MINING & 5 CORE TECHNIQUES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                Part 5 of 12 • Pattern Discovery Lab
              </span>
              <h2 className="text-xl font-bold text-white mt-1">What Is Data Mining? The 5 Core Techniques</h2>
            </div>
          </div>

          {/* Technique Selector Pills */}
          <div className="flex flex-wrap items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'classification', label: '1. Classification' },
              { id: 'clustering', label: '2. Clustering' },
              { id: 'association', label: '3. Association' },
              { id: 'prediction', label: '4. Prediction' },
              { id: 'anomaly', label: '5. Anomaly Detection' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setMiningTechnique(t.id as typeof miningTechnique)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  miningTechnique === t.id ? 'bg-amber-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Data Mining Interactive Workbench */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {miningTechnique === 'classification' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400 font-mono">Classification: Assigning Data to Predefined Categories (Supervised)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Labeled Classes</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Analyzes input features and maps them to a set of discrete, predefined category labels. Test the interactive bank loan risk classifier below:
              </p>

              {/* Interactive Classifier Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-black/40 border border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>Applicant Annual Income:</span>
                    <span className="text-white font-bold">৳{applicantIncome.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="150000"
                    step="5000"
                    value={applicantIncome}
                    onChange={e => setApplicantIncome(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>Existing Debt Obligations:</span>
                    <span className="text-white font-bold">৳{applicantDebt.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80000"
                    step="2000"
                    value={applicantDebt}
                    onChange={e => setApplicantDebt(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Classification Prediction Output */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs">
                <span>
                  Debt-to-Income Ratio: <strong className="text-white">{((applicantDebt / applicantIncome) * 100).toFixed(1)}%</strong>
                </span>
                <span className={`px-3 py-1 rounded-lg font-bold ${loanRiskClass.badge}`}>
                  Predicted Category: {loanRiskClass.category}
                </span>
              </div>
            </div>
          )}

          {miningTechnique === 'clustering' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400 font-mono">Clustering: Discovering Natural Groups (Unsupervised)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">No Predefined Labels</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Unlike classification, clustering does NOT use predefined categories. It groups items based solely on feature similarity (e.g. customer segmentation in an e-commerce platform):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-1">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-cyan-400 font-bold">Cluster 1: Gadget Enthusiasts</div>
                  <div className="text-[11px] text-zinc-300 font-sans">High purchase frequency, electronics &amp; accessories, prime members.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-purple-400 font-bold">Cluster 2: Bargain Hunters</div>
                  <div className="text-[11px] text-zinc-300 font-sans">Low average cart size, high coupon redemption, purchases during flash sales.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold">Cluster 3: Bulk Grocery Buyers</div>
                  <div className="text-[11px] text-zinc-300 font-sans">Bi-weekly purchase interval, high volume food items, recurring subscriptions.</div>
                </div>
              </div>
            </div>
          )}

          {miningTechnique === 'association' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-cyan-400 font-mono">Association Rule Mining: Market Basket Analysis</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Co-Occurrence Rules</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Uncovers dependencies between products purchased in the same transaction basket: <code>{"{ Bread, Butter } -> Milk"}</code>.
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Confidence Threshold Filter:</span>
                  <span className="text-cyan-400 font-bold">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={confidenceThreshold}
                  onChange={e => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="space-y-1.5 text-[11px] pt-1">
                  <div className="p-2 rounded bg-slate-900 flex justify-between">
                    <span>Rule: <strong>[ Bread ] &rarr; [ Butter ]</strong></span>
                    <span className="text-emerald-400 font-bold">Confidence: 82% (Support: 18%)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 flex justify-between">
                    <span>Rule: <strong>[ Bread, Butter ] &rarr; [ Milk ]</strong></span>
                    <span className="text-emerald-400 font-bold">Confidence: 76% (Support: 12%)</span>
                  </div>
                  {confidenceThreshold <= 65 && (
                    <div className="p-2 rounded bg-slate-900 flex justify-between text-zinc-400">
                      <span>Rule: <strong>[ Diapers ] &rarr; [ Beer ]</strong></span>
                      <span className="text-amber-400 font-bold">Confidence: 62% (Support: 6%)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {miningTechnique === 'prediction' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-400 font-mono">Prediction: Numerical Value Forecasting (Regression)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Continuous Values</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Uses historical regression equations to predict continuous future variables: forecasting quarterly revenue, predicting hospital patient readmission counts, or estimating future student enrollment.
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-zinc-400">Regression Forecast Formula:</div>
                <div className="text-blue-300 font-bold">Enrollment_2027 = 2,000 + (Year_Index &times; 520) &plusmn; 45</div>
                <div className="text-emerald-400 text-[11px] pt-1">Predicted 2027 Influx: <strong>4,550 Students</strong></div>
              </div>
            </div>
          )}

          {miningTechnique === 'anomaly' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-rose-400 font-mono">Anomaly Detection: Identifying Outliers &amp; Intrusions</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Fraud Alert</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Detects rare events that deviate drastically from normal statistical baselines:
              </p>
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 text-xs font-mono space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <AlertOctagon className="w-4 h-4" />
                  <span>SUSPICIOUS TRANSACTION FLAGGED BY BANK ENGINE</span>
                </div>
                <div className="space-y-1 text-zinc-300 text-[11px] font-sans">
                  <div>&bull; Normal Customer Pattern: ৳2,000–৳5,000 ATM withdrawals in Dhaka between 9 AM–9 PM.</div>
                  <div>&bull; Anomalous Event: <strong>৳200,000 withdrawal at 3:12 AM from a foreign IP in Eastern Europe!</strong></div>
                  <div>&bull; Action: Automated freeze triggered, SMS verification dispatched to user.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 5: THE KDD PROCESS (8 STEPS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 6 of 12 • KDD Methodology
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 8 Steps of Knowledge Discovery in Databases (KDD)</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          <strong>Data Mining is not the entire process</strong>—it is the core algorithmic phase within the broader <strong>Knowledge Discovery in Databases (KDD)</strong> lifecycle.
        </p>

        {/* 8-Step KDD Pipeline Visualizer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
          {[
            { step: 1, name: 'Collection', desc: 'Raw sources' },
            { step: 2, name: 'Cleaning', desc: 'Remove noise' },
            { step: 3, name: 'Integration', desc: 'Merge sources' },
            { step: 4, name: 'Selection', desc: 'Relevant subset' },
            { step: 5, name: 'Transform', desc: 'Format data' },
            { step: 6, name: 'Data Mining', desc: 'Extract patterns' },
            { step: 7, name: 'Evaluation', desc: 'Validate rules' },
            { step: 8, name: 'Presentation', desc: 'Dashboards' }
          ].map(s => (
            <div
              key={s.step}
              onClick={() => setKddStep(s.step)}
              className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                kddStep === s.step
                  ? 'bg-purple-950/40 border-purple-500 text-purple-300 shadow-lg ring-1 ring-purple-500/40'
                  : 'bg-slate-900 border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-bold text-zinc-500">Step {s.step}</div>
              <div className="font-bold text-white text-[11px]">{s.name}</div>
              <div className="text-[9px] text-zinc-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 6: DATA WAREHOUSING VS DATA MINING
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 7 of 12 • Direct Comparison
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Data Warehousing vs. Data Mining</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
              <tr>
                <th className="p-3">Attribute</th>
                <th className="p-3 text-cyan-400">Data Warehousing</th>
                <th className="p-3 text-amber-400">Data Mining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
              <tr>
                <td className="p-3 font-bold text-zinc-400">Core Action</td>
                <td className="p-3 text-zinc-300 font-sans">Collects, integrates, cleans, and stores data</td>
                <td className="p-3 text-zinc-300 font-sans">Extracts hidden patterns, rules, and associations from data</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-zinc-400">Primary Objective</td>
                <td className="p-3 text-zinc-300 font-sans">Organizing historical data for reporting</td>
                <td className="p-3 text-zinc-300 font-sans">Discovering actionable predictive knowledge</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-zinc-400">Underlying Tools</td>
                <td className="p-3 text-zinc-300 font-sans">ETL pipelines, relational star schemas, OLAP cubes</td>
                <td className="p-3 text-zinc-300 font-sans">Machine learning, decision trees, neural networks, clustering</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-zinc-400">Example Output</td>
                <td className="p-3 text-cyan-300 font-sans">A bar chart showing 10 years of sales growth</td>
                <td className="p-3 text-amber-300 font-sans">Discovering that customers buying diapers also buy beer</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-zinc-400">Relationship</td>
                <td className="p-3 text-emerald-400 font-sans" colSpan={2}>
                  &check; <strong>Complementary:</strong> The Data Warehouse provides the clean, high-quality historical data that Data Mining algorithms mine!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 8: UNIVERSITY EXAMINATION PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 9 of 12 • University Exam Prep
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Model Answers</h2>
          </div>
        </div>

        {/* Section A: Short Questions (2-3 Marks) */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider">
            Section A: Short Questions (2–3 Marks)
          </h3>
          <div className="space-y-2">
            {[
              {
                id: 'sq1',
                q: 'Q1: What is a Data Warehouse and what are its four characteristics?',
                a: 'A Data Warehouse is a centralized repository of integrated historical data. Its 4 Inmon characteristics are:\n1. Subject-Oriented (organized by business entity)\n2. Integrated (standardized across sources)\n3. Time-Variant (indexed historically over 5-10 years)\n4. Non-Volatile (read-only historical snapshots)'
              },
              {
                id: 'sq2',
                q: 'Q2: What is ETL and why is it necessary?',
                a: 'ETL stands for Extract, Transform, Load. It is necessary because raw operational databases contain conflicting formats, missing values, and incompatible schemas that must be scrubbed before analytical modeling.'
              },
              {
                id: 'sq3',
                q: 'Q3: Differentiate between OLTP and OLAP.',
                a: '• OLTP: Fast, atomic everyday transactional processing on normalized schemas (e.g. ATM withdrawal).\n• OLAP: Complex multidimensional queries and historical aggregations on denormalized star schemas (e.g. quarterly sales analysis).'
              },
              {
                id: 'sq4',
                q: 'Q4: What is the difference between Classification and Clustering in Data Mining?',
                a: '• Classification: Supervised technique that maps data into predefined, labeled classes (e.g. High Risk vs Low Risk).\n• Clustering: Unsupervised technique that groups data by mathematical proximity without any predefined categories.'
              },
              {
                id: 'sq5',
                q: 'Q5: What is a Data Mart?',
                a: 'A Data Mart is a subset of an enterprise data warehouse tailored to the reporting and analytical needs of a single specific department (e.g. Finance Data Mart, Marketing Data Mart).'
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
                  <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Broad Questions (5-10 Marks) */}
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-bold text-purple-400 font-mono uppercase tracking-wider">
            Section B: Broad Questions (5–10 Marks)
          </h3>
          <div className="space-y-2">
            {[
              {
                id: 'bq1',
                q: 'Q1: Explain Data Warehouse architecture and the complete ETL process with a diagram.',
                a: '1. Data Sources: Operational OLTP, CRM, flatfiles.\n2. Staging & ETL: Extract data -> Transform (scrubbing, date format standardization, surrogate keys) -> Load.\n3. Warehouse Storage: Fact tables (metrics) and Dimension tables (attributes).\n4. Analytics Layer: OLAP cubes, executive dashboards, and data mining models.'
              },
              {
                id: 'bq2',
                q: 'Q2: Discuss the 5 major techniques of Data Mining with real-world industry examples.',
                a: '1. Classification: Supervised prediction of labels (Loan credit approval).\n2. Clustering: Unsupervised customer segmentation (E-commerce buyer personas).\n3. Association Rules: Market basket analysis ({Diapers} -> {Beer}).\n4. Prediction: Time-series revenue forecasting.\n5. Anomaly Detection: Financial fraud and cyber-attack detection.'
              }
            ].map(item => (
              <div key={item.id} className="rounded-xl border border-slate-800 bg-[#14182d] overflow-hidden">
                <button
                  onClick={() => toggleExamQ(item.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {openExamQ[item.id] ? <ChevronUp className="w-4 h-4 text-purple-400" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </button>
                {openExamQ[item.id] && (
                  <div className="p-3.5 bg-slate-900/80 border-t border-slate-800 text-xs text-zinc-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10: PRACTICE EXERCISES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 10 of 12 • Problem Solving
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practice Exercises (Solve &amp; Check)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {[
            {
              id: 1,
              title: 'Exercise 1: University Cross-Department Consolidation',
              scenario: 'A university collects records from admission, examination, and finance departments into one central repository for long-term trend analysis.',
              answer: 'Technology: Data Warehouse (EDW). Purpose: Eliminating departmental silos and providing integrated historical reporting.'
            },
            {
              id: 2,
              title: 'Exercise 2: Retail Market Basket Association',
              scenario: 'An e-commerce store discovers that customers buying smartphones frequently buy phone screen protectors in the same order.',
              answer: 'Technique: Association Rule Mining. Discovered Relationship: { Smartphone } -> { Screen Protector }.'
            },
            {
              id: 3,
              title: 'Exercise 3: Loan Risk Classification vs. Clustering',
              scenario: 'A commercial bank categorizes credit applicants into Low Risk, Medium Risk, and High Risk.',
              answer: 'Technique: Classification. Why: The target risk categories are predefined, discrete labeled classes.'
            },
            {
              id: 4,
              title: 'Exercise 4: Banking ATM vs. Annual Trend Analysis',
              scenario: 'Explain the difference between customer ATM withdrawals and annual regional banking profitability analysis.',
              answer: 'ATM withdrawals are OLTP operations (real-time atomic updates); annual profitability analysis is an OLAP operation (multi-year aggregation).'
            }
          ].map(ex => (
            <div key={ex.id} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2.5">
              <div className="text-cyan-400 font-bold">{ex.title}</div>
              <p className="text-zinc-300 font-sans text-[11px] leading-relaxed">{ex.scenario}</p>
              <button
                onClick={() => setExerciseRevealed(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-800 text-[11px] font-mono cursor-pointer transition-all"
              >
                {exerciseRevealed[ex.id] ? 'Hide Answer' : 'Reveal Model Answer'}
              </button>
              {exerciseRevealed[ex.id] && (
                <div className="p-2.5 rounded bg-black/40 border border-slate-800 text-emerald-300 text-[11px] font-sans">
                  <strong>Answer: </strong>{ex.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 11: INTERACTIVE KNOWLEDGE TEST (10 QUESTIONS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 11 of 12 • University Assessment
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 17 Knowledge Test (10 Questions · 10 Marks)</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              {Object.keys(selectedAnswers).length} / 10 answered
            </span>
            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 10 Quiz Questions */}
        <div className="space-y-4">
          {MCQ_DATA.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correct;
            return (
              <div
                key={q.id}
                className={`p-4 md:p-5 rounded-xl border transition-all ${
                  quizSubmitted
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-[#14182d] border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{q.question}</h3>
                  </div>

                  {quizSubmitted && (
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isCorrect ? '✓ Correct (+1)' : '✕ Incorrect (0)'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {q.options.map(opt => {
                    const isSelected = userAnswer === opt.key;
                    const isOptionCorrect = opt.key === q.correct;
                    return (
                      <button
                        key={opt.key}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectAnswer(q.id, opt.key)}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          quizSubmitted
                            ? isOptionCorrect
                              ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200 font-bold'
                              : isSelected
                              ? 'bg-rose-900/40 border-rose-500 text-rose-200'
                              : 'bg-slate-900/60 border-slate-800 text-zinc-400'
                            : isSelected
                            ? 'bg-cyan-600/30 border-cyan-500 text-white font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-zinc-300 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'bg-cyan-500 text-black' : 'bg-black/40 text-zinc-400'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="font-sans text-xs">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mt-3 p-3 rounded-lg bg-black/40 border border-slate-800 text-xs text-zinc-300 font-sans leading-relaxed">
                    <span className="font-bold text-cyan-300 font-mono">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          {!quizSubmitted ? (
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              Submit Quiz &amp; Calculate Score
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-base font-bold font-mono text-white">
                Score: <span className="text-emerald-400 text-xl font-black">{quizScore}</span> / 10
              </div>
              <span className="text-xs font-sans text-zinc-400">
                {quizScore >= 8 ? 'Mastery achieved! Outstanding score.' : quizScore >= 6 ? 'Solid performance! Review incorrect items.' : 'Keep studying! Revisit the OLTP/OLAP and Data Mining sections.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 12: REVISION CHECKLIST & NAVIGATION BRIDGE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 12 of 12 • Lesson 17 of 18 Complete
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 17 Final Revision Checklist (16 Topics)</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Data Warehousing &amp; Mining Mastery</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} topics ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* 16 Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            'Data Warehouse definition & purpose',
            'Departmental data silos problem',
            '4 Inmon Characteristics (Subject, Integrated, Time, Non-Volatile)',
            'ETL: Extraction mechanics',
            'ETL: Transformation & cleansing rules',
            'ETL: Loading into Star/Snowflake schemas',
            'OLTP characteristics (Fast writes & ACID)',
            'OLAP characteristics (Multi-dimensional queries)',
            'Enterprise Data Warehouse (EDW) vs. Data Mart',
            'Data Mining definition and discovery goals',
            'Classification technique (Supervised learning)',
            'Clustering technique (Unsupervised learning)',
            'Association Rule Mining & Market Basket Analysis',
            'Prediction & Continuous variable forecasting',
            'Anomaly Detection for financial fraud',
            '8-Step KDD (Knowledge Discovery in Databases) process'
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
              17 of 18 Complete
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Only 1 Lesson Remains!
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 17 Complete &rarr; Ready for Final Grand Revision (Lesson 18) &amp; Architecture Roadmap?
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            You have now mastered 17 of 18 comprehensive lessons in the DBMS curriculum! Explore the end-to-end Database Architecture Roadmap or prepare for Lesson 18: Complete DBMS Revision &amp; University Examination Grand Master Review.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson16')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 16: Distributed Databases</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson18')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Next: Lesson 18 (Grand Revision &amp; Mock Examination)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
