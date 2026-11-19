'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Users,
  ShieldAlert,
  Database,
  RotateCcw,
  FileCode2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Server,
  HardDrive,
  Clock,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Search,
  Building2,
  Eye,
  BookOpen,
  Layers,
  Table as TableIcon,
  Workflow,
  Cpu,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Zap,
  Sparkles,
  Terminal,
  Activity,
  FileText,
  Flame,
  Archive,
  LifeBuoy,
  HelpCircle,
  AlertOctagon,
  Globe
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson11TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// Model for 15 MCQ Questions
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
    question: 'What does database confidentiality ensure?',
    options: [
      { key: 'A', text: 'Data is always deleted' },
      { key: 'B', text: 'Only authorized users can access information' },
      { key: 'C', text: 'All users can modify data' },
      { key: 'D', text: 'Backups are unnecessary' }
    ],
    correct: 'B',
    explanation: 'Confidentiality ensures that only authorized entities can view or access sensitive information, preventing unauthorized disclosure.'
  },
  {
    id: 2,
    question: 'What does authentication answer?',
    options: [
      { key: 'A', text: 'What can you do?' },
      { key: 'B', text: 'Where is the database?' },
      { key: 'C', text: 'Who are you?' },
      { key: 'D', text: 'When is backup created?' }
    ],
    correct: 'C',
    explanation: 'Authentication is the process of verifying a user’s identity (answering "Who are you?"), whereas Authorization answers "What can you do?".'
  },
  {
    id: 3,
    question: 'Which command gives privileges to a database user?',
    options: [
      { key: 'A', text: 'REVOKE' },
      { key: 'B', text: 'GRANT' },
      { key: 'C', text: 'ROLLBACK' },
      { key: 'D', text: 'DROP' }
    ],
    correct: 'B',
    explanation: 'GRANT is a Data Control Language (DCL) command used to assign permissions/privileges on database objects to users or roles.'
  },
  {
    id: 4,
    question: 'Which command removes a granted privilege?',
    options: [
      { key: 'A', text: 'INSERT' },
      { key: 'B', text: 'CREATE' },
      { key: 'C', text: 'REVOKE' },
      { key: 'D', text: 'COMMIT' }
    ],
    correct: 'C',
    explanation: 'REVOKE is the DCL command used to withdraw or remove previously granted privileges from a user or role.'
  },
  {
    id: 5,
    question: 'What is RBAC?',
    options: [
      { key: 'A', text: 'Role-Based Access Control' },
      { key: 'B', text: 'Random Backup Access Control' },
      { key: 'C', text: 'Remote Binary Access Code' },
      { key: 'D', text: 'Recovery-Based Authentication Control' }
    ],
    correct: 'A',
    explanation: 'RBAC stands for Role-Based Access Control, an access control model where permissions are grouped into roles and assigned to users.'
  },
  {
    id: 6,
    question: 'What is the principle of least privilege?',
    options: [
      { key: 'A', text: 'Give everyone administrator access' },
      { key: 'B', text: 'Give users only the permissions they need' },
      { key: 'C', text: 'Disable all database users' },
      { key: 'D', text: 'Give all users identical passwords' }
    ],
    correct: 'B',
    explanation: 'The Principle of Least Privilege states that every user, process, or program should be granted the minimum privileges necessary to perform its intended job.'
  },
  {
    id: 7,
    question: 'What is SQL injection?',
    options: [
      { key: 'A', text: 'A backup technique' },
      { key: 'B', text: 'An attack that manipulates SQL through untrusted input' },
      { key: 'C', text: 'A database indexing method' },
      { key: 'D', text: 'A transaction recovery process' }
    ],
    correct: 'B',
    explanation: 'SQL Injection is a code injection attack where malicious SQL instructions are entered into user inputs and executed by the database engine.'
  },
  {
    id: 8,
    question: 'Which technique is most important for preventing SQL injection?',
    options: [
      { key: 'A', text: 'Using SELECT *' },
      { key: 'B', text: 'Using parameterized queries' },
      { key: 'C', text: 'Giving applications administrator privileges' },
      { key: 'D', text: 'Disabling backups' }
    ],
    correct: 'B',
    explanation: 'Parameterized queries (and prepared statements) strictly separate code from user-supplied data, neutralizing SQL injection attempts.'
  },
  {
    id: 9,
    question: 'Which backup copies the entire selected database?',
    options: [
      { key: 'A', text: 'Incremental' },
      { key: 'B', text: 'Differential' },
      { key: 'C', text: 'Full' },
      { key: 'D', text: 'Partial log' }
    ],
    correct: 'C',
    explanation: 'A Full Backup copies 100% of the selected database at the time of execution, providing an independent recovery baseline.'
  },
  {
    id: 10,
    question: 'An incremental backup copies changes since:',
    options: [
      { key: 'A', text: 'The last full backup only' },
      { key: 'B', text: 'The most recent backup' },
      { key: 'C', text: 'The first day of the year' },
      { key: 'D', text: 'The last server restart' }
    ],
    correct: 'B',
    explanation: 'An Incremental Backup copies only the data changed since the most recent backup of any type (full or incremental).'
  },
  {
    id: 11,
    question: 'A differential backup copies changes since:',
    options: [
      { key: 'A', text: 'The previous incremental backup' },
      { key: 'B', text: 'The most recent full backup' },
      { key: 'C', text: 'The last transaction only' },
      { key: 'D', text: 'The most recent server restart' }
    ],
    correct: 'B',
    explanation: 'A Differential Backup accumulates and copies all changes made since the most recent full backup was taken.'
  },
  {
    id: 12,
    question: 'What does UNDO do?',
    options: [
      { key: 'A', text: 'Reverses changes' },
      { key: 'B', text: 'Creates an index' },
      { key: 'C', text: 'Reapplies committed changes' },
      { key: 'D', text: 'Encrypts a table' }
    ],
    correct: 'A',
    explanation: 'The UNDO operation rolls back changes made by uncommitted or aborted transactions to restore prior consistent values.'
  },
  {
    id: 13,
    question: 'What is the main purpose of REDO?',
    options: [
      { key: 'A', text: 'Delete all transactions' },
      { key: 'B', text: 'Reapply committed changes when required' },
      { key: 'C', text: 'Remove user privileges' },
      { key: 'D', text: 'Create a backup schedule' }
    ],
    correct: 'B',
    explanation: 'REDO reapplies updates made by committed transactions that may not have been flushed from volatile RAM buffer pool to durable disk before a crash.'
  },
  {
    id: 14,
    question: 'What does RPO measure?',
    options: [
      { key: 'A', text: 'Time to restore service' },
      { key: 'B', text: 'Maximum acceptable data loss measured in time' },
      { key: 'C', text: 'Number of database users' },
      { key: 'D', text: 'Backup storage size' }
    ],
    correct: 'B',
    explanation: 'Recovery Point Objective (RPO) specifies the maximum acceptable age of files/data that must be recovered from backup storage (acceptable data loss).'
  },
  {
    id: 15,
    question: 'Which statement describes the 3-2-1 backup rule?',
    options: [
      { key: 'A', text: '3 users, 2 roles, 1 password' },
      { key: 'B', text: '3 copies, 2 media types, 1 off-site copy' },
      { key: 'C', text: '3 full backups every day' },
      { key: 'D', text: '3 servers, 2 databases, 1 table' }
    ],
    correct: 'B',
    explanation: 'The 3-2-1 backup rule prescribes keeping at least 3 copies of data, across 2 different media types, with at least 1 copy off-site.'
  }
];

export default function DatabaseLesson11Topic({ onNavigate }: DatabaseLesson11TopicProps) {
  // 1. RBAC Matrix Interactive Simulator State
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student' | 'accountant' | 'guest'>('teacher');
  const [targetTable, setTargetTable] = useState<'STUDENT' | 'EXAM_MARKS' | 'PAYMENTS' | 'AUDIT_LOG'>('STUDENT');
  const [customPermissions, setCustomPermissions] = useState<Record<string, Record<string, boolean>>>({
    admin: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': true, 'STUDENT:UPDATE': true, 'STUDENT:DELETE': true, 'EXAM_MARKS:SELECT': true, 'EXAM_MARKS:UPDATE': true, 'PAYMENTS:SELECT': true, 'PAYMENTS:UPDATE': true },
    teacher: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': true, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': true, 'EXAM_MARKS:UPDATE': true, 'PAYMENTS:SELECT': false, 'PAYMENTS:UPDATE': false },
    student: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': false, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': true, 'EXAM_MARKS:UPDATE': false, 'PAYMENTS:SELECT': false, 'PAYMENTS:UPDATE': false },
    accountant: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': false, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': false, 'EXAM_MARKS:UPDATE': false, 'PAYMENTS:SELECT': true, 'PAYMENTS:UPDATE': true },
    guest: { 'STUDENT:SELECT': false, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': false, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': false, 'EXAM_MARKS:UPDATE': false, 'PAYMENTS:SELECT': false, 'PAYMENTS:UPDATE': false }
  });

  // 2. SQL Injection Interactive Playground State
  const [injectionMode, setInjectionMode] = useState<'vulnerable' | 'parameterized'>('vulnerable');
  const [usernameInput, setUsernameInput] = useState<string>("' OR '1'='1' --");
  const [passwordInput, setPasswordInput] = useState<string>("anything");

  // 3. Backup Strategy & Recovery Calculator State
  const [backupScheduleMode, setBackupScheduleMode] = useState<'incremental' | 'differential' | 'full_only'>('incremental');
  const [missingDay, setMissingDay] = useState<'none' | 'wednesday'>('none');

  // 4. UNDO / REDO WAL Interactive State
  const [walSimStep, setWalSimStep] = useState<number>(3); // 1: Begin, 2: Logging, 3: Crash, 4: Recovery Done

  // 5. MCQ Test State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 6. Exam Questions Accordions
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 7. Homework Solutions Revealed
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // 8. Revision Checklist
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  // Copy Snippet Feedback
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toggleExamQ = (id: string) => {
    setOpenExamQ(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSolution = (key: string) => {
    setRevealedSolutions(prev => ({ ...prev, [key]: !prev[key] }));
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

  // Checklist completion calculation (30 topics)
  const checklistTotal = 30;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  // Toggle single permission in RBAC lab
  const togglePermission = (perm: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE') => {
    const key = `${targetTable}:${perm}`;
    setCustomPermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [key]: !prev[selectedRole]?.[key]
      }
    }));
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071329] via-[#0d1f44] to-[#080d21] border border-cyan-800/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 11 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Security &amp; Reliability Engineering
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 11: Database Security, Authorization, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              Backup &amp; Crash Recovery
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Master the defense and resilience pillars of modern databases: CIA Triad, Authentication vs Authorization, SQL <code className="text-cyan-300 font-mono">GRANT</code> &amp; <code className="text-cyan-300 font-mono">REVOKE</code>, Role-Based Access Control (RBAC), SQL Injection neutralization, Full/Incremental/Differential backup architectures, Write-Ahead Logging (WAL), UNDO/REDO crash recovery, Point-in-Time Recovery (PITR), and Disaster Recovery RPO &amp; RTO metrics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CIA Triad &amp; Least Privilege</span>
            </div>
            <div className="flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>RBAC &amp; DCL Permissions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>SQL Injection &amp; Parameterization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>WAL, UNDO/REDO &amp; Checkpoints</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: INTRODUCTION TO DATABASE SECURITY & CIA TRIAD
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Introduction to Database Security &amp; The CIA Triad</h2>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <p>
            <strong>Database Security</strong> refers to the collection of techniques, policies, and procedures used to protect a database from unauthorized access, misuse, modification, disclosure, or physical and digital destruction.
          </p>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 font-mono text-cyan-200">
            &ldquo;Database security ensures that only authorized entities can access the correct information and perform permitted operations.&rdquo;
          </div>
        </div>

        {/* Real-World University Database Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Real-World Scenario: University Database Privileges</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3">User Role</th>
                  <th className="p-3">Allowed Activities</th>
                  <th className="p-3">Forbidden Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
                <tr>
                  <td className="p-3 font-bold text-amber-300">Administrator</td>
                  <td className="p-3 text-zinc-300">Manage entire database, assign roles, schedule backups</td>
                  <td className="p-3 text-zinc-500">None (subject to audit logging)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-cyan-300">Teacher</td>
                  <td className="p-3 text-zinc-300">View enrolled students, enter and update exam marks</td>
                  <td className="p-3 text-rose-300">Cannot alter financial records or delete student accounts</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-300">Student</td>
                  <td className="p-3 text-zinc-300">View their own published examination results and course status</td>
                  <td className="p-3 text-rose-300">Cannot alter any marks or view other students&apos; private data</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-300">Accountant</td>
                  <td className="p-3 text-zinc-300">Manage student fee payments and generate ledger reports</td>
                  <td className="p-3 text-rose-300">Cannot view or modify academic exam scores</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-400">Guest</td>
                  <td className="p-3 text-zinc-300">View public department catalog and general notices</td>
                  <td className="p-3 text-rose-300">No access to any private or transactional tables</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* The CIA Triad */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-rose-400 uppercase">The Security Core: The CIA Triad</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">University Exam Essential</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-sm">
                <Lock className="w-4 h-4" />
                <span>C — Confidentiality</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Only authorized people can view private data.
              </p>
              <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-cyan-300">
                Example: Students can only view their own grades; peers&apos; personal details remain strictly sealed.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>I — Integrity</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Data remains accurate, uncorrupted, and trustworthy throughout its lifecycle.
              </p>
              <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-emerald-300">
                Example: No student or unauthorized staff can alter examination scores or tuition balances.
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>A — Availability</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Data and services are reliably accessible to authorized users whenever required.
              </p>
              <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-amber-300">
                Example: The portal withstands traffic spikes when semester results are published; zero downtime.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: AUTHENTICATION VS AUTHORIZATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 2 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Authentication vs. Authorization</h2>
          </div>
        </div>

        {/* 4-Step Process Pipeline */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <span className="text-xs font-mono font-bold text-indigo-300 uppercase">Real-World Access Control Pipeline</span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-[10px] font-mono text-zinc-500 font-bold">STEP 1</div>
              <div className="text-xs font-bold text-white">Login Request</div>
              <p className="text-[11px] text-zinc-400">User enters username &amp; password or biometric token.</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/40 space-y-1">
              <div className="text-[10px] font-mono text-indigo-400 font-bold">STEP 2 • AUTHENTICATION</div>
              <div className="text-xs font-bold text-indigo-200">Verify Identity</div>
              <p className="text-[11px] text-zinc-400">&ldquo;Who are you?&rdquo; Validates credentials, OTP, or certificates.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-1">
              <div className="text-[10px] font-mono text-purple-400 font-bold">STEP 3 • AUTHORIZATION</div>
              <div className="text-xs font-bold text-purple-200">Check Permissions</div>
              <p className="text-[11px] text-zinc-400">&ldquo;What can you do?&rdquo; Evaluates roles, table privileges, and policies.</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <div className="text-[10px] font-mono text-emerald-400 font-bold">STEP 4 • ACCESS</div>
              <div className="text-xs font-bold text-emerald-200">Operation Executed</div>
              <p className="text-[11px] text-zinc-400">Authorized query runs; unauthorized actions fail with SQL errors.</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3">Dimension</th>
                <th className="p-3 text-indigo-300">Authentication (AuthN)</th>
                <th className="p-3 text-purple-300">Authorization (AuthZ)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
              <tr>
                <td className="p-3 font-bold text-white">Core Question</td>
                <td className="p-3 font-mono text-indigo-200">&ldquo;Who are you?&rdquo;</td>
                <td className="p-3 font-mono text-purple-200">&ldquo;What are you allowed to do?&rdquo;</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Primary Purpose</td>
                <td className="p-3 text-zinc-300">Verifies identity of the user or client system</td>
                <td className="p-3 text-zinc-300">Determines access rights and permitted operations</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Execution Timing</td>
                <td className="p-3 text-zinc-300">Happens first, before any resource access is granted</td>
                <td className="p-3 text-zinc-300">Follows successful identity verification</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Mechanisms Used</td>
                <td className="p-3 text-zinc-300">Passwords, salted hashes, MFA/OTP, SSH keys, biometrics</td>
                <td className="p-3 text-zinc-300">Roles, privileges, ACLs, RBAC policies, row-level security (RLS)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Failure Outcome</td>
                <td className="p-3 text-rose-300">Connection rejected (e.g. 401 Unauthorized / Invalid password)</td>
                <td className="p-3 text-rose-300">Permission denied (e.g. 403 Forbidden / Error 1142: SELECT denied)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 3: DATABASE USERS, ROLES & PRIVILEGES (RBAC)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 3 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Users, Roles &amp; Access Control Models</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">1. Database User</span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              An account configured inside the DBMS engine that can connect and execute queries (e.g., <code className="text-cyan-300 font-mono">admin_user</code>, <code className="text-cyan-300 font-mono">teacher_rahim</code>).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">2. Database Privilege</span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              A specific permission granting permission to execute an operation on an object (<code className="text-emerald-300 font-mono">SELECT</code>, <code className="text-emerald-300 font-mono">INSERT</code>, <code className="text-emerald-300 font-mono">UPDATE</code>, <code className="text-emerald-300 font-mono">DELETE</code>, <code className="text-emerald-300 font-mono">CREATE</code>, <code className="text-emerald-300 font-mono">DROP</code>).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase">3. Database Role (RBAC)</span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              A named collection of privileges assigned as a bundle to multiple users, eliminating repetitive and error-prone individual grants.
            </p>
          </div>
        </div>

        {/* Access Control Models Comparison */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-amber-300 uppercase">Comparison of Access Control Models</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3">Model</th>
                  <th className="p-3">Full Form</th>
                  <th className="p-3">How Access is Determined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
                <tr>
                  <td className="p-3 font-bold text-cyan-300">DAC</td>
                  <td className="p-3 font-mono">Discretionary Access Control</td>
                  <td className="p-3 text-zinc-300">The owner of an object can grant or revoke access to others at their discretion (standard SQL GRANT/REVOKE).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-300">MAC</td>
                  <td className="p-3 font-mono">Mandatory Access Control</td>
                  <td className="p-3 text-zinc-300">Access is governed by fixed central security labels (e.g. Top Secret, Confidential) that users cannot reassign.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-300">RBAC</td>
                  <td className="p-3 font-mono">Role-Based Access Control</td>
                  <td className="p-3 text-zinc-300">Permissions are bound to institutional roles; users inherit access through their assigned role(s). Most common in enterprise DBMS.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-300">ABAC</td>
                  <td className="p-3 font-mono">Attribute-Based Access Control</td>
                  <td className="p-3 text-zinc-300">Dynamic evaluation of user attributes (department), resource attributes (confidentiality tier), and environmental attributes (time of day, IP subnet).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Principle of Least Privilege */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-mono font-bold text-xs">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Golden Rule: Principle of Least Privilege (PoLP)</span>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            Every user and application database service account should receive <strong>strictly the bare minimum permissions</strong> required to accomplish its job, and nothing more. If an application only reads student bios, do not grant it <code className="text-rose-300 font-mono">DROP TABLE</code> or <code className="text-rose-300 font-mono">DELETE</code> privileges!
          </p>
        </div>
      </section>

      {/* ========================================================
          PART 4: SQL GRANT, REVOKE & INTERACTIVE PERMISSION LAB
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 4 &amp; 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL GRANT &amp; REVOKE: Syntax &amp; Interactive Lab</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* GRANT Syntax */}
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">GRANT Command (DCL)</span>
            <pre className="p-3 bg-black/60 rounded text-[11px] font-mono text-emerald-300 overflow-x-auto">
{`-- Grant specific privileges
GRANT SELECT, UPDATE
ON STUDENT
TO teacher_role;

-- With delegation option
GRANT SELECT ON STUDENT
TO teacher_user
WITH GRANT OPTION;`}
            </pre>
            <p className="text-zinc-400 font-sans text-[11px]">
              Gives privileges to a user or role. Always pairs with keyword <code className="text-emerald-400 font-mono">TO</code>.
            </p>
          </div>

          {/* REVOKE Syntax */}
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">REVOKE Command (DCL)</span>
            <pre className="p-3 bg-black/60 rounded text-[11px] font-mono text-rose-300 overflow-x-auto">
{`-- Withdraw specific privilege
REVOKE UPDATE
ON STUDENT
FROM teacher_role;

-- Revoke all table rights
REVOKE ALL PRIVILEGES
ON STUDENT
FROM guest_user;`}
            </pre>
            <p className="text-zinc-400 font-sans text-[11px]">
              Removes previously granted privileges. Always pairs with keyword <code className="text-rose-400 font-mono">FROM</code>.
            </p>
          </div>
        </div>

        {/* Interactive Permission Matrix & Simulator */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Interactive RBAC Permission Playground
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Select a role and toggle privileges to see live generated SQL and access enforcement.
              </p>
            </div>
            {/* Role Select Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {(['admin', 'teacher', 'student', 'accountant', 'guest'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize cursor-pointer transition-all ${
                    selectedRole === role
                      ? 'bg-cyan-600 text-white shadow'
                      : 'bg-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Target Table Selector */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-400">Target Object:</span>
            <div className="flex gap-2">
              {(['STUDENT', 'EXAM_MARKS', 'PAYMENTS', 'AUDIT_LOG'] as const).map(tbl => (
                <button
                  key={tbl}
                  onClick={() => setTargetTable(tbl)}
                  className={`px-2.5 py-1 rounded text-xs cursor-pointer ${
                    targetTable === tbl
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50 font-bold'
                      : 'bg-slate-900 text-zinc-400 border border-slate-800'
                  }`}
                >
                  {tbl}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Privileges for Current Role & Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {(['SELECT', 'INSERT', 'UPDATE', 'DELETE'] as const).map(perm => {
              const key = `${targetTable}:${perm}`;
              const isGranted = !!customPermissions[selectedRole]?.[key];
              return (
                <button
                  key={perm}
                  onClick={() => togglePermission(perm)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isGranted
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-zinc-500 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs">{perm}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isGranted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-zinc-500'}`}>
                      {isGranted ? 'GRANTED' : 'REVOKED'}
                    </span>
                  </div>
                  <span className="text-[11px] font-sans mt-2">
                    {isGranted ? `Role can ${perm.toLowerCase()} on ${targetTable}` : `Forbidden`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Live Generated SQL Output */}
          <div className="p-3 bg-black/60 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Generated DCL State for {selectedRole} on {targetTable}:</span>
            <div className="text-cyan-300">
              {['SELECT', 'INSERT', 'UPDATE', 'DELETE'].filter(p => customPermissions[selectedRole]?.[`${targetTable}:${p}`]).length > 0 ? (
                `GRANT ${['SELECT', 'INSERT', 'UPDATE', 'DELETE'].filter(p => customPermissions[selectedRole]?.[`${targetTable}:${p}`]).join(', ')} ON ${targetTable} TO ${selectedRole}_role;`
              ) : (
                `REVOKE ALL PRIVILEGES ON ${targetTable} FROM ${selectedRole}_role;`
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: DATABASE THREATS & SQL INJECTION PLAYGROUND
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 5 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Threats &amp; SQL Injection Neutralization</h2>
          </div>
        </div>

        <div className="space-y-3 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <p>
            <strong>SQL Injection (SQLi)</strong> occurs when untrusted user input is directly concatenated into a dynamic SQL string without proper separation. The database parser is tricked into treating data values as executable SQL syntax commands!
          </p>
        </div>

        {/* Interactive SQL Injection Simulator */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-rose-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                Interactive SQL Injection Attack vs Defense Playground
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Test malicious payloads and observe how parameterized queries completely prevent query manipulation.
              </p>
            </div>
            {/* Mode Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setInjectionMode('vulnerable')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  injectionMode === 'vulnerable'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                Vulnerable Concatenation
              </button>
              <button
                onClick={() => setInjectionMode('parameterized')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  injectionMode === 'parameterized'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                Parameterized Query (Secure)
              </button>
            </div>
          </div>

          {/* Quick Payload Presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-zinc-400">Presets:</span>
            <button
              onClick={() => { setUsernameInput("' OR '1'='1' --"); setPasswordInput("anything"); }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-[11px] cursor-pointer"
            >
              Classic Bypass: &apos; OR &apos;1&apos;=&apos;1&apos; --
            </button>
            <button
              onClick={() => { setUsernameInput("admin' --"); setPasswordInput("ignored"); }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-[11px] cursor-pointer"
            >
              Admin Comment Out: admin&apos; --
            </button>
            <button
              onClick={() => { setUsernameInput("rahim"); setPasswordInput("12345"); }}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-[11px] cursor-pointer"
            >
              Legitimate User: rahim
            </button>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Supplied Username:</label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Supplied Password:</label>
              <input
                type="text"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/60 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Generated Code & Query Evaluation */}
          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3 font-mono text-xs">
            {injectionMode === 'vulnerable' ? (
              <div className="space-y-2">
                <span className="text-[11px] text-rose-400 font-bold block uppercase">
                  Vulnerable App Code: &ldquo;SELECT * FROM USERS WHERE username = &apos;&rdquo; + user + &ldquo;&apos; AND password = &apos;&rdquo; + pass + &ldquo;&apos;&rdquo;
                </span>
                <div className="p-3 bg-rose-950/20 border border-rose-500/40 rounded text-rose-200 overflow-x-auto whitespace-pre-wrap">
                  {`SELECT * FROM USERS WHERE username = '${usernameInput}' AND password = '${passwordInput}';`}
                </div>
                <div className="p-3 bg-rose-900/30 rounded border border-rose-600/40 text-rose-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Vulnerability Result: Unintended Execution!</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans">
                    The condition <code className="text-rose-300">&apos;1&apos;=&apos;1&apos;</code> is always TRUE. The trailing <code className="text-rose-300">--</code> comments out password checking entirely! An attacker logs in as the first user (often Administrator) without providing a valid password!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[11px] text-emerald-400 font-bold block uppercase">
                  Secure Parameterized Code (e.g. Python / Node.js / Go):
                </span>
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/40 rounded text-emerald-200 overflow-x-auto whitespace-pre-wrap">
{`cursor.execute(
  "SELECT * FROM USERS WHERE username = %s AND password_hash = %s",
  (username, password_hash)
)`}
                </div>
                <div className="p-3 bg-emerald-900/30 rounded border border-emerald-600/40 text-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Defense Verified: Safe Literal Data Binding!</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 font-sans">
                    The database driver binds <code className="text-cyan-300 font-mono">&apos;{usernameInput}&apos;</code> strictly as a raw string literal value. It searches for an actual user whose literal name is <code className="text-cyan-300 font-mono">&apos; OR &apos;1&apos;=&apos;1&apos; --</code>. The SQL AST cannot be altered!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5 Prevention Techniques */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">5 Pillars of SQL Injection Prevention</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <strong className="text-emerald-400 font-mono block">1. Parameterized Queries</strong>
              <p className="text-zinc-400 font-sans text-[11px]">Primary defense. Uses placeholders (<code className="text-cyan-300">?</code>, <code className="text-cyan-300">%s</code>, <code className="text-cyan-300">$1</code>) so SQL AST remains immutable.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <strong className="text-indigo-400 font-mono block">2. Prepared Statements</strong>
              <p className="text-zinc-400 font-sans text-[11px]">Compiles query structure on server before parameter values are transmitted.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <strong className="text-purple-400 font-mono block">3. Input Validation &amp; Allowlisting</strong>
              <p className="text-zinc-400 font-sans text-[11px]">Validates expected data types, string length, regex format (e.g. numeric Student ID).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <strong className="text-amber-400 font-mono block">4. Least Privilege Accounts</strong>
              <p className="text-zinc-400 font-sans text-[11px]">App database user should not have DROP or ALTER privileges if only querying data.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <strong className="text-rose-400 font-mono block">5. Safe Error Handling</strong>
              <p className="text-zinc-400 font-sans text-[11px]">Never leak database internal errors, table names, or stack traces to end users.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1 text-xs">
              <strong className="text-cyan-400 font-mono block">6. Web Application Firewalls (WAF)</strong>
              <p className="text-zinc-400 font-sans text-[11px]">Detects and blocks known malicious SQL attack signatures at network perimeter.</p>
            </div>
          </div>
        </div>

        {/* Encryption vs Hashing Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Cryptography in DBMS: Encryption vs. Hashing</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Important Exam Distinction</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-cyan-300">Encryption (AES-256, TLS)</th>
                  <th className="p-3 text-purple-300">Cryptographic Hashing (Argon2id, bcrypt)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
                <tr>
                  <td className="p-3 font-bold text-white">Reversibility</td>
                  <td className="p-3 text-zinc-300">Two-way: Reversible with the secret decryption key</td>
                  <td className="p-3 text-zinc-300">One-way: Mathematically irreversible by design</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Primary Goal</td>
                  <td className="p-3 text-zinc-300">Protects confidentiality of data in transit &amp; at rest</td>
                  <td className="p-3 text-zinc-300">Verifies data integrity &amp; securely validates passwords</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Typical Database Use</td>
                  <td className="p-3 text-zinc-300">Disk volume encryption (TDE), TLS client-server traffic, credit cards</td>
                  <td className="p-3 text-zinc-300">User password storage with cryptographic salt, audit log checksums</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Password Rule</td>
                  <td className="p-3 text-rose-300">Never encrypt passwords if you can hash them with salt!</td>
                  <td className="p-3 text-emerald-300">Use slow salted hashes: <strong>Argon2id, bcrypt, or scrypt</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6: DATABASE BACKUP TYPES & COMPARISON
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 6 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Backup Architecture: Full, Incremental &amp; Differential</h2>
          </div>
        </div>

        {/* 3 Core Backup Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">A. Full Backup</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">100% Data</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Copies all selected database tables, schemas, and files at that point in time.
            </p>
            <div className="p-2.5 bg-black/40 rounded text-[11px] font-mono space-y-1 text-zinc-300">
              <div>&bull; Restore: Simplest (Requires only 1 file)</div>
              <div>&bull; Backup Speed: Slowest</div>
              <div>&bull; Storage: Highest</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">B. Incremental Backup</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Changes Since ANY Last</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Copies only the data that changed since the <strong>most recent backup</strong> (full or incremental).
            </p>
            <div className="p-2.5 bg-black/40 rounded text-[11px] font-mono space-y-1 text-zinc-300">
              <div>&bull; Restore: Full + Every single incremental file in order!</div>
              <div>&bull; Backup Speed: Fastest</div>
              <div>&bull; Risk: 1 broken incremental link breaks entire restore</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">C. Differential Backup</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Changes Since Last FULL</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Copies all changes accumulated since the <strong>most recent full backup</strong>.
            </p>
            <div className="p-2.5 bg-black/40 rounded text-[11px] font-mono space-y-1 text-zinc-300">
              <div>&bull; Restore: Requires Full + Only the LATEST differential</div>
              <div>&bull; Backup Size: Grows each day until next full backup</div>
              <div>&bull; Restore Speed: Faster than incremental chain</div>
            </div>
          </div>
        </div>

        {/* Interactive Backup & Recovery Timeline Simulator */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                Backup Schedule &amp; Restore Chain Simulator
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Simulate a Friday morning server failure and see which files are needed for recovery.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBackupScheduleMode('incremental')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  backupScheduleMode === 'incremental'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Strategy: Incremental
              </button>
              <button
                onClick={() => setBackupScheduleMode('differential')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  backupScheduleMode === 'differential'
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Strategy: Differential
              </button>
            </div>
          </div>

          {/* Missing Backup Toggle */}
          {backupScheduleMode === 'incremental' && (
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-zinc-400">Simulate Disaster Condition:</span>
              <button
                onClick={() => setMissingDay(missingDay === 'none' ? 'wednesday' : 'none')}
                className={`px-3 py-1 rounded cursor-pointer transition-all ${
                  missingDay === 'wednesday'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-300 hover:text-white'
                }`}
              >
                {missingDay === 'wednesday' ? '⚠ Wednesday Backup Corrupted!' : 'All Backups Healthy'}
              </button>
            </div>
          )}

          {/* Days Timeline Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/40 text-center space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 font-bold">MONDAY</div>
              <div className="text-xs font-bold text-white">Full Backup</div>
              <div className="text-[10px] font-mono text-zinc-400">100 GB (Base)</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 font-bold">TUESDAY</div>
              <div className="text-xs font-bold text-white">
                {backupScheduleMode === 'incremental' ? 'Incremental' : 'Differential'}
              </div>
              <div className="text-[10px] font-mono text-emerald-400">
                {backupScheduleMode === 'incremental' ? '+5 GB (Tue changes)' : '+5 GB (since Mon)'}
              </div>
            </div>

            <div className={`p-3 rounded-xl text-center space-y-1 ${
              missingDay === 'wednesday' && backupScheduleMode === 'incremental'
                ? 'bg-rose-950/30 border border-rose-500/60'
                : 'bg-slate-900 border border-slate-800'
            }`}>
              <div className="text-[10px] font-mono text-zinc-400 font-bold">WEDNESDAY</div>
              <div className="text-xs font-bold text-white">
                {backupScheduleMode === 'incremental' ? 'Incremental' : 'Differential'}
              </div>
              <div className={`text-[10px] font-mono ${missingDay === 'wednesday' && backupScheduleMode === 'incremental' ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                {missingDay === 'wednesday' && backupScheduleMode === 'incremental'
                  ? 'CORRUPTED / LOST'
                  : backupScheduleMode === 'incremental' ? '+8 GB (Wed changes)' : '+13 GB (since Mon)'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 font-bold">THURSDAY</div>
              <div className="text-xs font-bold text-white">
                {backupScheduleMode === 'incremental' ? 'Incremental' : 'Differential'}
              </div>
              <div className="text-[10px] font-mono text-emerald-400">
                {backupScheduleMode === 'incremental' ? '+6 GB (Thu changes)' : '+19 GB (since Mon)'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/40 text-center space-y-1">
              <div className="text-[10px] font-mono text-rose-400 font-bold">FRIDAY 08:00 AM</div>
              <div className="text-xs font-bold text-rose-300">DISK CRASH!</div>
              <div className="text-[10px] font-mono text-zinc-400">Recovery Triggered</div>
            </div>
          </div>

          {/* Restoration Requirement Analysis */}
          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono space-y-2">
            <span className="text-amber-400 font-bold block uppercase">
              Restore Chain Analysis for Friday Disaster:
            </span>
            {backupScheduleMode === 'incremental' ? (
              missingDay === 'wednesday' ? (
                <div className="text-rose-300 space-y-1">
                  <div>&bull; Attempted Chain: Mon Full &rarr; Tue Inc &rarr; 💥 Missing Wed Inc &rarr; Thu Inc</div>
                  <div className="text-zinc-300 font-sans">
                    <strong>Catastrophic failure:</strong> Because Wednesday is missing, the incremental chain is broken. You can only recover up to <strong>Tuesday night</strong>. Thursday&apos;s incremental backup cannot be applied without Wednesday!
                  </div>
                </div>
              ) : (
                <div className="text-emerald-300 space-y-1">
                  <div>&bull; Required Files: <strong>Mon Full + Tue Inc + Wed Inc + Thu Inc</strong> (4 backup sets)</div>
                  <div className="text-zinc-300 font-sans">
                    Database successfully recovered to Thursday night. Slower restore because each incremental file must be sequentially replayed.
                  </div>
                </div>
              )
            ) : (
              <div className="text-purple-300 space-y-1">
                <div>&bull; Required Files: <strong>Mon Full + Thu Differential ONLY!</strong> (Only 2 backup sets!)</div>
                <div className="text-zinc-300 font-sans">
                  Even if Tuesday or Wednesday differentials are corrupted or deleted, recovery is 100% successful because Thursday&apos;s differential contains all changes accumulated since Monday!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logical vs Physical & Hot vs Cold Backups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Logical vs. Physical Backups</span>
            <ul className="space-y-1.5 text-zinc-300 font-sans list-disc pl-4">
              <li><strong>Logical Backup:</strong> Exports database schema and row records as SQL insert statements or JSON/CSV files (e.g. <code className="text-cyan-300 font-mono">mysqldump</code>, <code className="text-cyan-300 font-mono">pg_dump</code>). Highly portable across DBMS versions; slower to restore.</li>
              <li><strong>Physical Backup:</strong> Direct binary copy of physical data pages, transaction logs, and control files (e.g. <code className="text-cyan-300 font-mono">pg_basebackup</code>). Blazingly fast for terabyte-scale databases; tied to OS and engine architecture.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">Hot vs. Cold Backups</span>
            <ul className="space-y-1.5 text-zinc-300 font-sans list-disc pl-4">
              <li><strong>Hot Backup (Online):</strong> Performed while the database server is running and active client transactions are processing. Requires WAL/redo log consistency mechanisms.</li>
              <li><strong>Cold Backup (Offline):</strong> Executed while the database is completely shut down. Guarantees 100% clean consistency without log replay, but requires planned downtime.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 7: DATABASE FAILURES (TRANSACTION, SYSTEM, MEDIA)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 7 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Classification of Database Failures</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>1. Transaction Failure</span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              An individual transaction cannot execute to completion.
            </p>
            <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-zinc-300 space-y-1">
              <div>&bull; Causes: Deadlock, division by zero, foreign key violation, explicit <code className="text-rose-300">ROLLBACK</code>.</div>
              <div>&bull; Recovery: UNDO transaction changes via rollback log.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-rose-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm">
              <Server className="w-4 h-4" />
              <span>2. System Failure (Crash)</span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              The operating system or DBMS hardware abruptly halts.
            </p>
            <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-zinc-300 space-y-1">
              <div>&bull; Causes: Power failure, OS kernel panic, DBMS process crash.</div>
              <div>&bull; State: Volatile RAM is lost; non-volatile disk is intact.</div>
              <div>&bull; Recovery: Automatic crash recovery via WAL (REDO &amp; UNDO).</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-purple-500/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-purple-400 font-mono font-bold text-sm">
              <HardDrive className="w-4 h-4" />
              <span>3. Media Failure (Disk)</span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Physical storage device becomes unreadable or destroyed.
            </p>
            <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-zinc-300 space-y-1">
              <div>&bull; Causes: Hard drive head crash, bad sectors, RAID controller fault, fire.</div>
              <div>&bull; State: Secondary storage data destroyed.</div>
              <div>&bull; Recovery: Restore external backup + replay archived WAL logs.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8 & 9: RECOVERY TECHNIQUES — UNDO, REDO & WAL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 8 &amp; 9 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Recovery Mechanisms: UNDO, REDO, Write-Ahead Logging &amp; Checkpoints</h2>
          </div>
        </div>

        {/* UNDO vs REDO Mathematical Step */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-rose-500/30 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-rose-400 font-mono font-bold uppercase">UNDO Operation (Rollback)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">Reverse Uncommitted</span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Reverses modifications made by transactions that were active or uncommitted when the failure occurred.
            </p>
            <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1 text-zinc-300">
              <div>Initial Balance: A = ৳10,000</div>
              <div>T1 updates: A = A - 2,000 (Buffer = ৳8,000)</div>
              <div className="text-rose-400 font-bold">💥 Crash before COMMIT!</div>
              <div className="text-emerald-400 font-bold">&rarr; UNDO restores prior value: A = ৳10,000</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-mono font-bold uppercase">REDO Operation (Roll-Forward)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Reapply Committed</span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Reapplies modifications of transactions that successfully COMMITTED, but whose dirty pages were not yet flushed to disk.
            </p>
            <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1 text-zinc-300">
              <div>Initial Balance: A = ৳10,000</div>
              <div>T1 updates: A = A - 2,000 &amp; COMMITS!</div>
              <div className="text-rose-400 font-bold">💥 Crash before dirty page flushed to disk!</div>
              <div className="text-emerald-400 font-bold">&rarr; REDO reads WAL log and enforces: A = ৳8,000</div>
            </div>
          </div>
        </div>

        {/* Write-Ahead Logging (WAL) Sequence */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">Write-Ahead Logging (WAL) Core Invariant</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Essential Axiom</span>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            <strong>The Golden Rule of WAL:</strong> Before any dirty database page is flushed from volatile memory (RAM Buffer Pool) to persistent disk storage, the corresponding log record describing the update MUST already be written and safely synced to non-volatile stable storage (WAL file)!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 font-bold">STEP 1</span>
              <div className="text-xs font-bold text-white">Modify In-Memory Page</div>
              <p className="text-[11px] text-zinc-400">Transaction alters data page inside DBMS RAM Buffer Pool.</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold">STEP 2 (MANDATORY FIRST)</span>
              <div className="text-xs font-bold text-amber-200">Append &amp; Sync WAL Log</div>
              <p className="text-[11px] text-zinc-400">Log entry &lt;T, Object, OldVal, NewVal&gt; flushed to disk log.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 font-bold">STEP 3 (LAZY FLUSH)</span>
              <div className="text-xs font-bold text-white">Write Dirty Page to Disk</div>
              <p className="text-[11px] text-zinc-400">DBMS background writer asynchronously flushes dirty data pages.</p>
            </div>
          </div>
        </div>

        {/* Checkpoint Mechanism */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">The Checkpoint Mechanism</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Log Pruning</span>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            Without checkpoints, the database would have to parse and replay the entire transaction log from the very inception of the database during crash recovery!
          </p>
          <div className="p-3 bg-black/60 rounded font-mono text-xs text-zinc-300 space-y-1">
            <div>10:00 AM &bull; Transaction T1 begins</div>
            <div>10:05 AM &bull; Transaction T1 commits</div>
            <div>10:10 AM &bull; Transaction T2 begins</div>
            <div className="text-emerald-400 font-bold">10:15 AM &bull; [CHECKPOINT RECORD RECORDED] (Dirty pages flushed to disk)</div>
            <div>10:20 AM &bull; Transaction T3 begins</div>
            <div className="text-rose-400 font-bold">10:25 AM &bull; 💥 SYSTEM CRASH!</div>
          </div>
          <div className="p-2.5 bg-slate-900 rounded text-[11px] font-sans text-zinc-300">
            <strong>Recovery Rule:</strong> Transactions committed prior to Checkpoint (T1) need no action. T2 committed after checkpoint requires <strong>REDO</strong>. T3 active at crash requires <strong>UNDO</strong>. Recovery time is reduced from hours to seconds!
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10: POINT-IN-TIME RECOVERY (PITR)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 10 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Point-in-Time Recovery (PITR) Architecture</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <strong>Point-in-Time Recovery (PITR)</strong> enables a database to be restored to any arbitrary second in the past by restoring a physical base backup and then sequentially replaying archived transaction logs (WAL) up to the exact microsecond before a human error occurred.
        </p>

        {/* Real-World Timeline Scenario */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <span className="text-xs font-mono font-bold text-indigo-300 uppercase">Scenario: Accidental Record Deletion at 02:30 PM</span>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-zinc-500">02:00 PM</span>
              <div className="font-bold text-white">Base Backup</div>
              <p className="text-[10px] text-zinc-400 font-sans">Full binary snapshot saved</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-zinc-500">02:15 PM</span>
              <div className="font-bold text-white">Normal Traffic</div>
              <p className="text-[10px] text-zinc-400 font-sans">10,000 legit transactions logged</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/50 text-center space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold">02:29:59 PM</span>
              <div className="font-bold text-emerald-200">Target Time</div>
              <p className="text-[10px] text-zinc-400 font-sans">Desired recovery stop point</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/50 text-center space-y-1">
              <span className="text-[10px] text-rose-400 font-bold">02:30:00 PM</span>
              <div className="font-bold text-rose-200">Accidental DROP!</div>
              <p className="text-[10px] text-zinc-400 font-sans">500 students deleted by mistake</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-zinc-500">02:35 PM</span>
              <div className="font-bold text-white">Discovered</div>
              <p className="text-[10px] text-zinc-400 font-sans">PITR restore initiated</p>
            </div>
          </div>

          <div className="p-4 bg-black/60 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
            <span className="text-cyan-400 font-bold block uppercase">How the DBA Restores via PITR:</span>
            <div className="text-zinc-300 space-y-1">
              <div>1. Restore the 02:00 PM Base Physical Backup to a staging server.</div>
              <div>2. Set recovery target: <code className="text-emerald-400 font-mono">recovery_target_time = &apos;2026-11-17 14:29:59&apos;</code></div>
              <div>3. Replay WAL transaction logs continuously until the target timestamp is hit, then stop!</div>
              <div className="text-emerald-300 font-bold">&check; All legitimate 02:00–02:29 transactions are kept; the 02:30 deletion never happens!</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 11: DISASTER RECOVERY, RPO & RTO
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 11 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Disaster Recovery (DR): RPO, RTO &amp; Site Architectures</h2>
          </div>
        </div>

        {/* RPO vs RTO Deep Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">RPO — Recovery Point Objective</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Data Loss Limit</span>
            </div>
            <div className="text-lg font-bold text-white">&ldquo;How much data can we afford to lose?&rdquo;</div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Measured in <strong>time backward</strong> from the moment of disruption.
            </p>
            <div className="p-3 bg-black/60 rounded font-mono text-xs text-zinc-300 space-y-1">
              <div>&bull; Example: Bank RPO = 15 minutes.</div>
              <div>&bull; Meaning: At most 15 minutes of uncommitted transactions may be lost; if a crash happens at 10:00, data must be recoverable to at least 09:45.</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">RTO — Recovery Time Objective</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Downtime Limit</span>
            </div>
            <div className="text-lg font-bold text-white">&ldquo;How quickly must we restore service?&rdquo;</div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Measured in <strong>time forward</strong> from the moment of disruption until operational.
            </p>
            <div className="p-3 bg-black/60 rounded font-mono text-xs text-zinc-300 space-y-1">
              <div>&bull; Example: University Portal RTO = 2 hours.</div>
              <div>&bull; Meaning: The application and database must be fully restored, verified, and serving student requests within 120 minutes of a failure.</div>
            </div>
          </div>
        </div>

        {/* DR Recovery Sites Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase">Disaster Recovery Site Types</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
                <tr>
                  <th className="p-3">Site Type</th>
                  <th className="p-3">Description &amp; Hardware Status</th>
                  <th className="p-3">Data Freshness</th>
                  <th className="p-3">Recovery Speed</th>
                  <th className="p-3">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
                <tr>
                  <td className="p-3 font-bold text-cyan-300">Cold Site</td>
                  <td className="p-3 text-zinc-300">Basic physical facility with power, AC, and network cables; no servers or data pre-installed.</td>
                  <td className="p-3 text-zinc-500">Requires purchasing or shipping hardware and restoring from tape/cloud.</td>
                  <td className="p-3 text-rose-400 font-mono font-bold">Slowest (Days to Weeks)</td>
                  <td className="p-3 text-emerald-400 font-mono">Lowest</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-300">Warm Site</td>
                  <td className="p-3 text-zinc-300">Partially equipped data center with operational servers and network switches ready.</td>
                  <td className="p-3 text-zinc-300">Periodic backups restored (e.g. daily/weekly snapshots loaded).</td>
                  <td className="p-3 text-amber-300 font-mono font-bold">Moderate (Hours to 1-2 Days)</td>
                  <td className="p-3 text-amber-300 font-mono">Medium</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-300">Hot Site</td>
                  <td className="p-3 text-zinc-300">Fully equipped, mirror production environment running 24/7 with active data replication.</td>
                  <td className="p-3 text-emerald-300">Near-zero lag continuous synchronous/asynchronous replication.</td>
                  <td className="p-3 text-emerald-400 font-mono font-bold">Fastest (Seconds to Minutes / Instant Failover)</td>
                  <td className="p-3 text-rose-400 font-mono">Highest</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 12: THE 3-2-1 BACKUP RULE & REPLICATION DISTINCTION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 12 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 3-2-1 Backup Strategy &amp; Backup vs. Replication</h2>
          </div>
        </div>

        {/* 3-2-1 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-500/30 space-y-2 text-center">
            <div className="text-4xl font-extrabold text-cyan-400 font-mono">3</div>
            <div className="text-sm font-bold text-white">Copies of Data</div>
            <p className="text-xs text-zinc-400 font-sans">
              1 Primary production operational dataset + 2 distinct backup copies.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-500/30 space-y-2 text-center">
            <div className="text-4xl font-extrabold text-emerald-400 font-mono">2</div>
            <div className="text-sm font-bold text-white">Different Media Types</div>
            <p className="text-xs text-zinc-400 font-sans">
              Store backups across different technologies (e.g. NVMe SSD server + magnetic LTO tape or NAS).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-500/30 space-y-2 text-center">
            <div className="text-4xl font-extrabold text-purple-400 font-mono">1</div>
            <div className="text-sm font-bold text-white">Off-Site Copy (Immutable)</div>
            <p className="text-xs text-zinc-400 font-sans">
              At least 1 copy stored in a separate geographical region or immutable cloud vault to survive ransomware and natural disasters.
            </p>
          </div>
        </div>

        {/* Backup vs Replication Warning */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/40 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Crucial Exam Trap: Replication is NOT a Backup!</span>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            If a developer accidentally runs <code className="text-rose-300 font-mono">DROP TABLE STUDENTS;</code> on the primary database, the replica server will instantly and obediently replicate and drop the table too! Replication ensures high availability, but <strong>only historical backups</strong> can recover deleted data.
          </p>
        </div>
      </section>

      {/* ========================================================
          PART 14: IMPORTANT UNIVERSITY EXAMINATION QUESTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 14 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Model Answers</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Click any university examination question below to inspect comprehensive model answers for 2–3 mark short questions, broad theory topics, and comparison matrixes:
        </p>

        {/* Accordions for 12 Short Questions */}
        <div className="space-y-2.5">
          {[
            {
              id: 'eq1',
              q: 'Q1: What is database security and why is it important?',
              a: 'Database security refers to the collection of techniques, policies, and procedures used to protect a database from unauthorized access, misuse, modification, disclosure, or destruction. It is important because it safeguards the CIA Triad (Confidentiality, Integrity, Availability), protects sensitive personal information (Privacy), and establishes Accountability.'
            },
            {
              id: 'eq2',
              q: 'Q2: Differentiate between Authentication and Authorization with examples.',
              a: 'Authentication verifies identity ("Who are you?"), e.g., logging in with a username, password, or fingerprint. Authorization determines access rights and permissions ("What can you do?"), e.g., allowing a teacher to update grades while restricting students to view-only access.'
            },
            {
              id: 'eq3',
              q: 'Q3: What is a database privilege and how is it managed using GRANT and REVOKE?',
              a: 'A privilege is permission granted to a user or role to perform specific SQL operations (SELECT, INSERT, UPDATE, DELETE). GRANT assigns privileges (e.g. GRANT SELECT ON STUDENT TO teacher_user;), while REVOKE withdraws privileges (e.g. REVOKE SELECT ON STUDENT FROM teacher_user;).'
            },
            {
              id: 'eq4',
              q: 'Q4: What is Role-Based Access Control (RBAC) and its advantages?',
              a: 'RBAC is an access control model where permissions are assigned to roles rather than individual users, and users receive permissions by belonging to those roles. Advantages: simplifies administrative overhead, eliminates repetitive permission grants, and enforces institutional policies.'
            },
            {
              id: 'eq5',
              q: 'Q5: What is SQL Injection and how do parameterized queries prevent it?',
              a: 'SQL Injection is an attack where malicious SQL instructions are embedded into untrusted user inputs to alter query execution logic. Parameterized queries prevent it by treating input values strictly as literal data rather than executable syntax, ensuring the SQL abstract syntax tree (AST) cannot be manipulated.'
            },
            {
              id: 'eq6',
              q: 'Q6: Differentiate between Full, Incremental, and Differential Backups.',
              a: '• Full Backup: Copies 100% of all data; fastest restore, largest size.\n• Incremental Backup: Copies changes since the most recent backup of any kind; fastest backup speed, smallest size, complex chained restore.\n• Differential Backup: Copies changes accumulated since the most recent full backup; faster restore than incremental, size grows over time.'
            },
            {
              id: 'eq7',
              q: 'Q7: Explain Transaction Failure, System Failure, and Media Failure.',
              a: '• Transaction Failure: Single transaction aborts due to deadlock, constraint violation, or explicit rollback. Recovery: Rollback via log.\n• System Failure: OS crash or power cut; volatile RAM lost, disk intact. Recovery: Crash recovery replaying WAL (REDO & UNDO).\n• Media Failure: Physical disk damage. Recovery: Restore latest backup + archived WAL logs.'
            },
            {
              id: 'eq8',
              q: 'Q8: Differentiate between UNDO and REDO operations.',
              a: '• UNDO: Reverses changes made by uncommitted or aborted transactions to restore prior consistent state.\n• REDO: Reapplies changes made by successfully committed transactions that were not yet flushed from RAM buffer pool to disk prior to a crash.'
            },
            {
              id: 'eq9',
              q: 'Q9: Explain Write-Ahead Logging (WAL) and its core rule.',
              a: 'WAL requires that all log records describing a modification must be written and synced to non-volatile stable storage before the modified dirty data page can be written to disk. This guarantees recovery information is durable before any page overwrite.'
            },
            {
              id: 'eq10',
              q: 'Q10: What is a Checkpoint and why is it important in database recovery?',
              a: 'A Checkpoint is a mechanism that flushes dirty buffer pages to disk and writes a checkpoint record to the log. It is important because it establishes a known safe recovery baseline, dramatically limiting how far back the transaction log must be scanned during crash recovery.'
            },
            {
              id: 'eq11',
              q: 'Q11: Differentiate between RPO and RTO.',
              a: '• RPO (Recovery Point Objective): Measures acceptable data loss backward in time (e.g., maximum 15 minutes of lost data).\n• RTO (Recovery Time Objective): Measures acceptable downtime forward in time (e.g., maximum 2 hours to restore operational service).'
            },
            {
              id: 'eq12',
              q: 'Q12: Explain the 3-2-1 Backup Rule.',
              a: 'Maintain at least 3 copies of data, stored on 2 different media types, with at least 1 copy located off-site (preferably immutable/isolated against ransomware).'
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
      </section>

      {/* ========================================================
          PART 15: INTERACTIVE UNIVERSITY-LEVEL MCQ TEST (15 MARKS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 15 of 17 • University Test
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 11 Knowledge Test (15 Questions · 15 Marks)</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              {Object.keys(selectedAnswers).length} / 15 answered
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

        {/* Score Card if Submitted */}
        {quizSubmitted && (
          <div className={`p-4 rounded-xl border flex items-center justify-between font-mono text-xs ${
            quizScore >= 12
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
          }`}>
            <div className="space-y-1">
              <div className="text-sm font-bold">
                Final Score: {quizScore} / 15 ({Math.round((quizScore / 15) * 100)}%)
              </div>
              <p className="text-[11px] font-sans">
                {quizScore >= 12 ? 'Outstanding performance! You are fully prepared for university-level security & recovery exams.' : 'Good review effort! Review explanations below for any missed questions.'}
              </p>
            </div>
            <button
              onClick={() => setQuizSubmitted(false)}
              className="px-3 py-1.5 rounded bg-black/40 border border-slate-700 text-white font-mono text-xs cursor-pointer"
            >
              Edit Answers
            </button>
          </div>
        )}

        {/* 15 Question Items */}
        <div className="space-y-4">
          {MCQ_DATA.map(q => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer === q.correct;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  quizSubmitted
                    ? isCorrect
                      ? 'bg-emerald-950/10 border-emerald-500/30'
                      : 'bg-rose-950/10 border-rose-500/30'
                    : 'bg-[#14182d] border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold text-white font-sans">
                    Q{q.id}. {q.question}
                  </span>
                  {quizSubmitted && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isCorrect ? '1 / 1' : '0 / 1'}
                    </span>
                  )}
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {q.options.map(opt => {
                    const isSelected = userAnswer === opt.key;
                    let optStyle = 'bg-slate-900 border-slate-800 text-zinc-300 hover:border-slate-700';

                    if (quizSubmitted) {
                      if (opt.key === q.correct) {
                        optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        optStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-cyan-600/30 border-cyan-500 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectAnswer(q.id, opt.key)}
                        disabled={quizSubmitted}
                        className={`p-2.5 rounded-lg border text-left text-xs font-sans transition-all flex items-center gap-2 cursor-pointer ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded flex items-center justify-center bg-black/40 font-mono text-[11px] font-bold shrink-0">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {quizSubmitted && (
                  <div className="mt-3 p-2.5 bg-black/40 rounded border border-slate-800 text-[11px] text-zinc-300 font-sans space-y-0.5">
                    <span className="text-cyan-400 font-mono font-bold block">Explanation:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!quizSubmitted && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/30 cursor-pointer"
            >
              <span>Submit &amp; Evaluate Answers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ========================================================
          PART 16: HOMEWORK ASSIGNMENT (30 MARKS) WITH SOLUTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 16 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical Homework Assignment (Total: 30 Marks)</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Complete these 6 university-level practical exercises. Click <strong className="text-cyan-300">&quot;Reveal Mentor Solution&quot;</strong> to inspect verified solutions:
        </p>

        <div className="space-y-4">
          {[
            {
              id: 'hw1',
              title: 'Exercise 1: CIA Triad in University Database (5 Marks)',
              problem: 'A university database stores student names, results, and payment information. Explain how confidentiality, integrity, and availability can be maintained in this database with one practical example for each.',
              sol: `• Confidentiality: Encrypt student records using AES-256 and restrict table access via Role-Based Access Control (RBAC).
  Practical Example: Students can only view their own semester GPA through a secure view; an accountant cannot view academic grades.

• Integrity: Enforce referential integrity foreign keys, database check constraints, and role permissions.
  Practical Example: Only authorized instructors can modify exam marks during grading window; students cannot alter their own marks.

• Availability: Deploy database server clusters with automatic failover, load balancing, and automated hourly backups.
  Practical Example: The portal remains responsive and accessible even when 50,000 students log in simultaneously on publication day.`
            },
            {
              id: 'hw2',
              title: 'Exercise 2: SQL GRANT & REVOKE (5 Marks)',
              problem: 'Write SQL statements to: 1. Give teacher_user SELECT on STUDENT, 2. Give teacher_user UPDATE on STUDENT, 3. Remove UPDATE from teacher_user, 4. Explain the purpose of each command.',
              sol: `-- 1. Give SELECT permission:
GRANT SELECT ON STUDENT TO teacher_user;
-- Purpose: Allows teacher_user to query and read records from the STUDENT table.

-- 2. Give UPDATE permission:
GRANT UPDATE ON STUDENT TO teacher_user;
-- Purpose: Allows teacher_user to edit existing rows (e.g. adjust student contact info or bio).

-- 3. Remove UPDATE permission:
REVOKE UPDATE ON STUDENT FROM teacher_user;
-- Purpose: Withdraws the update privilege, preventing teacher_user from modifying STUDENT rows while retaining SELECT.`
            },
            {
              id: 'hw3',
              title: 'Exercise 3: SQL Injection Vulnerability & Prevention (5 Marks)',
              problem: 'Explain SQL injection with a simple vulnerable SQL example. Then describe at least four techniques used to prevent SQL injection.',
              sol: `• Vulnerable SQL Example:
query = "SELECT * FROM USERS WHERE username = '" + username + "' AND password = '" + password + "'";
If an attacker inputs: ' OR '1'='1' --
The executed query becomes:
SELECT * FROM USERS WHERE username = '' OR '1'='1' --' AND password = '...';
The condition '1'='1' is always true, and '--' comments out password verification, letting the attacker bypass login.

• 4 Prevention Techniques:
1. Parameterized Queries (Prepared Statements): Binds inputs as literal data values, making AST manipulation impossible.
2. Input Validation & Allowlisting: Restrict inputs to expected data types, formats, and characters (e.g., regex checks).
3. Principle of Least Privilege: The application's DB user account should only have SELECT/INSERT, never administrative rights.
4. Safe Error Handling & WAF: Never leak database schema details or stack traces to users; employ a Web Application Firewall.`
            },
            {
              id: 'hw4',
              title: 'Exercise 4: Backup Schedule Calculation (5 Marks)',
              problem: 'A company schedule is: Monday Full, Tuesday Incremental, Wednesday Incremental, Thursday Incremental. On Friday, the database fails. 1. Which backups are needed to restore Thursday state? 2. What happens if Wednesday backup is missing? 3. How would a differential schedule differ?',
              sol: `1. Backups needed for Thursday:
   Monday Full + Tuesday Incremental + Wednesday Incremental + Thursday Incremental (all 4 files).

2. If Wednesday's Incremental is missing:
   The restore chain is broken at Wednesday. Recovery is only possible up to Tuesday's state. Thursday's backup is useless without Wednesday.

3. How Differential Schedule Differs:
   With Differential backups (Tue Diff, Wed Diff, Thu Diff), Thursday's file contains all changes since Monday. To restore, you only need:
   Monday Full + Thursday Differential (only 2 files). A missing Wednesday backup causes zero data loss.`
            },
            {
              id: 'hw5',
              title: 'Exercise 5: UNDO and REDO Operations (5 Marks)',
              problem: 'A transaction changes an account balance from ৳20,000 to ৳15,000 and commits successfully. The system crashes before the updated data page is written to disk. 1. Should the change be undone or redone? 2. What should the final balance be? 3. Explain your answer.',
              sol: `1. Recovery Action: REDO operation.
2. Final Balance: ৳15,000.
3. Explanation:
   Because the transaction successfully COMMITTED, the ACID Durability property guarantees that its modifications must persist despite system failure.
   Under Write-Ahead Logging (WAL), the COMMIT log record was flushed to stable storage before the crash. During recovery, the DBMS reads the log, recognizes T as committed, and REDO applies the updated balance ৳15,000 to disk.`
            },
            {
              id: 'hw6',
              title: 'Exercise 6: RPO and RTO in Disaster Recovery (5 Marks)',
              problem: 'A university has targets: RPO = 30 minutes, RTO = 3 hours. Explain what each target means using a real-world example.',
              sol: `• RPO (Recovery Point Objective) = 30 minutes:
  Defines the maximum acceptable data loss measured backwards in time.
  Real-world example: If the university server crashes at 02:00 PM, the DBA must be able to recover all academic records up to at least 01:30 PM. At most 30 minutes of recent transactions may be lost.

• RTO (Recovery Time Objective) = 3 hours:
  Defines the maximum acceptable downtime measured forwards from the disruption.
  Real-world example: If the portal goes down at 02:00 PM, technical staff must have the database restored, verified, and student portal back online by 05:00 PM.`
            }
          ].map(hw => (
            <div key={hw.id} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">{hw.title}</span>
                <button
                  onClick={() => toggleSolution(hw.id)}
                  className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{revealedSolutions[hw.id] ? 'Hide Solution' : 'Reveal Mentor Solution'}</span>
                </button>
              </div>
              <p className="text-xs text-zinc-300 font-sans">{hw.problem}</p>
              {revealedSolutions[hw.id] && (
                <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30 whitespace-pre-wrap">
                  {hw.sol}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 17: REVISION CHECKLIST (30 TOPICS) & NAVIGATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 17 of 17
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 11 Final Exam Revision Checklist (30 Topics)</h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Security &amp; Recovery Mastery</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} topics ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* 30 Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            'Database security definition and importance',
            'CIA Triad (Confidentiality, Integrity, Availability)',
            'Authentication concept and mechanisms',
            'Authorization concept and role assignment',
            'Authentication vs. Authorization distinction',
            'Database users and object privileges',
            'Database roles and role hierarchy',
            'DAC, MAC, RBAC and ABAC access control models',
            'Principle of Least Privilege (PoLP)',
            'SQL GRANT command and syntax',
            'SQL REVOKE command and syntax',
            'WITH GRANT OPTION delegation mechanics',
            'SQL Injection mechanism and risks',
            'Parameterized queries and prepared statements',
            'Input validation and least privilege in app accounts',
            'Encryption at rest vs. encryption in transit',
            'Encryption vs. Cryptographic Hashing (Argon2id)',
            'Full backup definition, pros and cons',
            'Incremental backup and chained dependencies',
            'Differential backup and accumulation behavior',
            'Logical vs. physical backups',
            'Hot (online) vs. cold (offline) backups',
            'Database recovery vs. backup distinction',
            'Transaction, system and media failures',
            'UNDO operation (rollback uncommitted)',
            'REDO operation (roll-forward committed)',
            'Write-Ahead Logging (WAL) core invariant',
            'Checkpoints and log examination reduction',
            'Point-in-Time Recovery (PITR) with WAL replay',
            'Disaster Recovery Plan, RPO, RTO & 3-2-1 rule'
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
              Upcoming • Lesson 12 Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module 12
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 12: Distributed Databases &amp; Distributed DBMS
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Explore horizontal &amp; vertical data fragmentation, replication protocols, distributed query optimization, distributed deadlocks, and the Two-Phase Commit (2PC) protocol across networked nodes.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson10')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 10: Indexing &amp; Optimization</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson12')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Next: Lesson 12 (Distributed Databases)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
