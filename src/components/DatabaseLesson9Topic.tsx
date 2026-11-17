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
  Minimize2,
  Lock,
  Unlock,
  Clock,
  Activity,
  FileText,
  RefreshCw
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson9TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson9Topic({ onNavigate }: DatabaseLesson9TopicProps) {
  // Part 2: Active ACID Tab
  const [activeAcidTab, setActiveAcidTab] = useState<'A' | 'C' | 'I' | 'D'>('A');

  // Part 3: Active Transaction State in Lifecycle
  const [activeLifecycleState, setActiveLifecycleState] = useState<'active' | 'partially_committed' | 'committed' | 'failed' | 'aborted'>('active');

  // Part 4: Savepoint Simulation Step
  const [savepointStep, setSavepointStep] = useState<number>(1);

  // Part 5: Concurrency Problem Interactive Switcher
  const [activeAnomaly, setActiveAnomaly] = useState<'lost_update' | 'dirty_read' | 'unrepeatable_read' | 'phantom_read'>('lost_update');

  // Part 6: Serializability Graph Tester
  const [scheduleType, setScheduleType] = useState<'serial' | 'conflict_serializable' | 'non_serializable'>('conflict_serializable');

  // Part 7: Two-Phase Locking (2PL) Phase Stepper
  const [twoplPhase, setTwoplPhase] = useState<'growing' | 'lock_point' | 'shrinking'>('growing');

  // Part 9: Isolation Level Matrix Active Selector
  const [activeIsolationLevel, setActiveIsolationLevel] = useState<'RU' | 'RC' | 'RR' | 'S'>('RC');

  // Part 10: Recovery WAL Simulator (UNDO vs REDO)
  const [recoveryScenario, setRecoveryScenario] = useState<'crash_before_commit' | 'crash_after_commit'>('crash_before_commit');

  // Part 12: Exam Q&A Accordion State
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // Part 14: Homework Revealed Solutions
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Part 15: Revision Checklist
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  // Copy Feedback
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
  const checklistTotal = 21;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c132c] via-[#101b44] to-[#070b1c] border border-cyan-900/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 9 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Transactions &amp; Concurrency
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 9: Database Transactions <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              &amp; Concurrency Control Architecture
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Master the core mechanics of reliable databases: ACID properties, transaction state machines, lost updates, dirty reads, conflict serializability, Two-Phase Locking (2PL), deadlock prevention, ANSI isolation levels, and Write-Ahead Log (WAL) recovery.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ACID Guarantees</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Concurrency Anomalies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>2PL &amp; Deadlock Cycles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>WAL, UNDO &amp; REDO Recovery</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS A DATABASE TRANSACTION?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a Database Transaction?</h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Core Definition</span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            A <strong className="text-white">database transaction</strong> is a logical unit of database processing that includes one or more database access operations (read, write, update, delete). It must be treated as an indivisible unit: <strong className="text-emerald-300">it must either execute in its entirety or not execute at all</strong>.
          </p>
        </div>

        {/* Bank Transfer Example */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">Real-World Case: Bank Fund Transfer</span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Suppose Rahim wants to transfer <strong>৳5,000</strong> to Karim. Total initial bank reserves: ৳30,000.
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-800 font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-zinc-400">
                  <tr>
                    <th className="py-1.5 px-3">Account</th>
                    <th className="py-1.5 px-3">Initial</th>
                    <th className="py-1.5 px-3 text-emerald-400">After Transfer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  <tr><td className="py-1.5 px-3 text-white">Rahim (101)</td><td className="py-1.5 px-3">৳20,000</td><td className="py-1.5 px-3 text-emerald-300 font-bold">৳15,000 (-5k)</td></tr>
                  <tr><td className="py-1.5 px-3 text-white">Karim (102)</td><td className="py-1.5 px-3">৳10,000</td><td className="py-1.5 px-3 text-emerald-300 font-bold">৳15,000 (+5k)</td></tr>
                  <tr className="bg-black/30 font-bold"><td className="py-1.5 px-3 text-cyan-300">Total Sum</td><td className="py-1.5 px-3 text-cyan-300">৳30,000</td><td className="py-1.5 px-3 text-cyan-300">৳30,000 (Invariance Preserved!)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
              <strong className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> What happens if the server crashes in Step 2?
              </strong>
              <p className="text-[11px] text-zinc-300">
                If Rahim&apos;s ৳5,000 is deducted but the power cuts before Karim&apos;s account receives it, ৳5,000 would disappear into thin air! Transaction atomicity guarantees that Rahim&apos;s deduction is automatically rolled back.
              </p>
            </div>
          </div>

          {/* SQL Implementation */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">SQL Transaction Block</span>
              <button
                onClick={() => handleCopy(
`START TRANSACTION;

UPDATE Accounts 
SET Balance = Balance - 5000 
WHERE Account_ID = 101;

UPDATE Accounts 
SET Balance = Balance + 5000 
WHERE Account_ID = 102;

COMMIT;`, "sql-tx")}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedSnippet === "sql-tx" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === "sql-tx" ? "Copied" : "Copy SQL"}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Step 1: Begin transactional envelope
START TRANSACTION;

-- Step 2: Deduct from Rahim
UPDATE Accounts 
SET Balance = Balance - 5000 
WHERE Account_ID = 101;

-- Step 3: Credit to Karim
UPDATE Accounts 
SET Balance = Balance + 5000 
WHERE Account_ID = 102;

-- Step 4: Atomically persist both operations
COMMIT;

-- If an error happens midway:
-- ROLLBACK;`}
            </pre>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: ACID PROPERTIES DEEP DIVE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 2 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">ACID Properties: The 4 Pillars of Transaction Integrity</h2>
          </div>
        </div>

        {/* ACID Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'A', name: 'Atomicity', motto: 'All or Nothing' },
            { id: 'C', name: 'Consistency', motto: 'Preserves Invariants' },
            { id: 'I', name: 'Isolation', motto: 'Independent Concurrency' },
            { id: 'D', name: 'Durability', motto: 'Survives Crashes' },
          ].map(acid => (
            <button
              key={acid.id}
              onClick={() => setActiveAcidTab(acid.id as any)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeAcidTab === acid.id
                  ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-base font-extrabold font-mono text-cyan-300">{acid.id} &bull; {acid.name}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">{acid.motto}</div>
            </button>
          ))}
        </div>

        {/* ACID Content Card */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeAcidTab === 'A' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Atomicity: All or Nothing</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Recovery Manager</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                A transaction cannot be partially executed. If any statement fails or the machine restarts mid-stream, every modification made so far is rolled back completely. The database state reverts to exactly where it was before the transaction started.
              </p>
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Rule: If (Step 1 succeeds AND Step 2 fails) &rArr; System automatically executes ROLLBACK.
              </div>
            </div>
          )}

          {activeAcidTab === 'C' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Consistency: Preserving Invariants</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Integrity Subsystem</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                The database must begin in a valid state that obeys all constraints, and must end in a valid state obeying all constraints.
              </p>
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Bank Invariant Check: Sum(Accounts) before = ৳30,000 &bull; Sum(Accounts) after = ৳30,000. Balance never drops below zero if CHECK (Balance &gt;= 0) is enforced.
              </div>
            </div>
          )}

          {activeAcidTab === 'I' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Isolation: Concurrent Non-Interference</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Concurrency Control Manager</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Even though hundreds of transactions run at the same millisecond on a multi-core CPU, each transaction executes as if it were the <strong>only transaction running in the entire database</strong>. Uncommitted modifications are hidden from other queries.
              </p>
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Mechanism: Enforced via locks (2PL) or multi-version concurrency control (MVCC).
              </div>
            </div>
          )}

          {activeAcidTab === 'D' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Durability: Surviving Power Cuts &amp; Crashes</span>
                <span className="text-[10px] font-mono text-zinc-400">Component: Write-Ahead Logging (WAL)</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Once a transaction issues <code className="text-cyan-300 font-mono">COMMIT</code> and receives an acknowledgment, its modifications will never be lost, even if the datacenter loses power a nanosecond later!
              </p>
              <div className="p-3 bg-black/50 rounded-lg text-xs font-mono text-emerald-400">
                Mechanism: Write-Ahead Log (WAL) records are flushed to non-volatile disk/SSD prior to confirming the commit.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 3: TRANSACTION STATES & LIFECYCLE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 3 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Transaction Lifecycle &amp; State Transitions</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          During its lifespan, every database transaction transitions through 5 formal states:
        </p>

        {/* State Machine Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'active', label: '1. Active', desc: 'Currently executing' },
            { id: 'partially_committed', label: '2. Partially Committed', desc: 'Final statement ran' },
            { id: 'committed', label: '3. Committed', desc: 'Changes permanent' },
            { id: 'failed', label: '4. Failed', desc: 'Error or crash' },
            { id: 'aborted', label: '5. Aborted', desc: 'Rolled back & cleaned' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setActiveLifecycleState(st.id as any)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeLifecycleState === st.id
                  ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-300">{st.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">{st.desc}</div>
            </button>
          ))}
        </div>

        {/* State Detail Box */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-3">
          {activeLifecycleState === 'active' && (
            <div className="space-y-2 text-xs">
              <span className="text-cyan-400 font-mono font-bold uppercase">Active State</span>
              <p className="text-zinc-300 font-sans">
                The transaction has started and is currently issuing read/write operations to the buffer pool. If an error occurs here, it transitions to <strong className="text-rose-400">Failed</strong>. If all operations finish, it transitions to <strong className="text-indigo-400">Partially Committed</strong>.
              </p>
            </div>
          )}

          {activeLifecycleState === 'partially_committed' && (
            <div className="space-y-2 text-xs">
              <span className="text-indigo-400 font-mono font-bold uppercase">Partially Committed State</span>
              <p className="text-zinc-300 font-sans">
                The final SQL query in the block has successfully completed in memory, but the log records have not yet been fully flushed to disk. If a power cut hits during the flush, it goes to <strong className="text-rose-400">Failed</strong>. If the disk write succeeds, it enters <strong className="text-emerald-400">Committed</strong>.
              </p>
            </div>
          )}

          {activeLifecycleState === 'committed' && (
            <div className="space-y-2 text-xs">
              <span className="text-emerald-400 font-mono font-bold uppercase">Committed State (Terminal)</span>
              <p className="text-zinc-300 font-sans">
                The transaction has safely concluded. All changes are written to disk / WAL. The transaction can never be undone; it is permanent.
              </p>
            </div>
          )}

          {activeLifecycleState === 'failed' && (
            <div className="space-y-2 text-xs">
              <span className="text-rose-400 font-mono font-bold uppercase">Failed State</span>
              <p className="text-zinc-300 font-sans">
                A software bug, constraint violation (e.g. negative balance), system crash, or deadlock forced the transaction to stop. The recovery manager must now undo its partial footprint.
              </p>
            </div>
          )}

          {activeLifecycleState === 'aborted' && (
            <div className="space-y-2 text-xs">
              <span className="text-purple-400 font-mono font-bold uppercase">Aborted State (Terminal)</span>
              <p className="text-zinc-300 font-sans">
                The rollback operation has completed. The database state is restored to its pre-transaction consistency. The DBMS can now choose to either restart the transaction or kill it.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 4: COMMIT, ROLLBACK & SAVEPOINT SIMULATOR
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 4 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Transaction Commands: COMMIT, ROLLBACK &amp; SAVEPOINT</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A <strong className="text-cyan-300">SAVEPOINT</strong> creates an intermediate checkpoint within a transaction, allowing you to undo a specific buggy statement without discarding the entire batch:
        </p>

        {/* Step-by-Step Savepoint Runner */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">Savepoint Execution Stepper</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(st => (
                <button
                  key={st}
                  onClick={() => setSavepointStep(st)}
                  className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                    savepointStep === st ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                  }`}
                >
                  Step {st}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-black/60 rounded-xl font-mono text-xs text-zinc-300 space-y-2">
            <div className={savepointStep >= 1 ? 'text-emerald-400' : 'text-zinc-600'}>
              START TRANSACTION;<br />
              UPDATE Accounts SET Balance = Balance - 1000 WHERE Account_ID = 101;
            </div>
            <div className={savepointStep >= 2 ? 'text-amber-300 font-bold' : 'text-zinc-600'}>
              SAVEPOINT step_one;  -- Checkpoint created!
            </div>
            <div className={savepointStep >= 3 ? 'text-rose-400' : 'text-zinc-600'}>
              UPDATE Accounts SET Balance = Balance + 999999 WHERE Account_ID = 999; -- Erroneous Account!
            </div>
            <div className={savepointStep >= 4 ? 'text-purple-300 font-bold' : 'text-zinc-600'}>
              ROLLBACK TO SAVEPOINT step_one; -- Reverts ONLY the bad update!<br />
              COMMIT; -- Persists Account 101 deduction safely!
            </div>
          </div>

          <div className="text-xs text-zinc-400 font-sans">
            {savepointStep === 1 && 'Deducts ৳1,000 from Account 101. Change is in uncommitted transaction memory.'}
            {savepointStep === 2 && 'Marks a bookmark labeled step_one. We can now return here anytime.'}
            {savepointStep === 3 && 'Simulates an erroneous update applied to a non-existent account.'}
            {savepointStep === 4 && 'ROLLBACK TO SAVEPOINT step_one wipes out the erroneous second update while keeping the valid first update, then commits successfully!'}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: CONCURRENCY CONTROL & THE 4 CLASSIC ANOMALIES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 5 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Concurrency Control &amp; The 4 Classic Anomalies</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          When multiple transactions interleave without proper isolation, four disastrous concurrency phenomena can occur. Click each anomaly below to see how it corrupts data:
        </p>

        {/* Anomaly Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'lost_update', label: '1. Lost Update', desc: 'Overwriting committed data' },
            { id: 'dirty_read', label: '2. Dirty Read', desc: 'Reading uncommitted rollbacks' },
            { id: 'unrepeatable_read', label: '3. Unrepeatable Read', desc: 'Values change between reads' },
            { id: 'phantom_read', label: '4. Phantom Read', desc: 'Rows appear between reads' },
          ].map(a => (
            <button
              key={a.id}
              onClick={() => setActiveAnomaly(a.id as any)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeAnomaly === a.id
                  ? 'bg-rose-500/20 border-rose-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{a.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">{a.desc}</div>
            </button>
          ))}
        </div>

        {/* Anomaly Detail Card */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-rose-900/40 space-y-3">
          {activeAnomaly === 'lost_update' && (
            <div className="space-y-3 text-xs">
              <span className="text-rose-400 font-mono font-bold uppercase">1. The Lost Update Problem</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Initial Account Balance: <strong>৳10,000</strong>. T1 wants to withdraw ৳2,000. T2 wants to deposit ৳3,000. Correct math: 10,000 - 2,000 + 3,000 = <strong>৳11,000</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold block">Transaction T1</span>
                  <div>Reads Balance = 10,000</div>
                  <div>Calculates: 10k - 2k = 8,000</div>
                  <div className="text-emerald-400 font-bold">Writes Balance = 8,000</div>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">Transaction T2 (Interleaved)</span>
                  <div>Reads Balance = 10,000 (Stale!)</div>
                  <div>Calculates: 10k + 3k = 13,000</div>
                  <div className="text-rose-400 font-bold">Writes Balance = 13,000 (Overwrites T1!)</div>
                </div>
              </div>
              <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded text-rose-300 font-mono">
                Final Result: ৳13,000 &bull; Disaster: Rahim&apos;s ৳2,000 withdrawal completely disappeared!
              </div>
            </div>
          )}

          {activeAnomaly === 'dirty_read' && (
            <div className="space-y-3 text-xs">
              <span className="text-rose-400 font-mono font-bold uppercase">2. The Dirty Read Problem</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                A transaction reads data that was modified by an in-flight transaction that subsequently <strong>rolls back</strong>.
              </p>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1">
                <div>1. T1 updates Rahim&apos;s balance from ৳10,000 to ৳5,000 (Uncommitted).</div>
                <div className="text-amber-300 font-bold">2. T2 reads balance as ৳5,000 and approves a loan based on this value.</div>
                <div className="text-rose-400 font-bold">3. T1 crashes or issues ROLLBACK! Rahim&apos;s balance reverts to ৳10,000.</div>
                <div className="text-zinc-400">4. T2 acted on phantom uncommitted data that never existed permanently!</div>
              </div>
            </div>
          )}

          {activeAnomaly === 'unrepeatable_read' && (
            <div className="space-y-3 text-xs">
              <span className="text-rose-400 font-mono font-bold uppercase">3. The Unrepeatable (Fuzzy) Read Problem</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                T1 reads the exact same row twice during its execution, but gets different values because T2 committed an update in between.
              </p>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1">
                <div>1. T1 reads Student 101 GPA = 3.80.</div>
                <div className="text-cyan-300">2. T2 updates Student 101 GPA = 3.95 and executes COMMIT.</div>
                <div className="text-amber-300 font-bold">3. T1 reads Student 101 GPA again and gets 3.95!</div>
                <div className="text-zinc-400">Within the same transaction, identical read queries returned two conflicting results!</div>
              </div>
            </div>
          )}

          {activeAnomaly === 'phantom_read' && (
            <div className="space-y-3 text-xs">
              <span className="text-rose-400 font-mono font-bold uppercase">4. The Phantom Read Problem</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                T1 executes a query with a range condition (<code className="text-cyan-300 font-mono">WHERE Dept=&apos;CSE&apos;</code>). T2 inserts or deletes a row matching that condition and commits. When T1 re-executes the query, a new &ldquo;phantom&rdquo; row has appeared!
              </p>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] space-y-1">
                <div>1. T1 executes: SELECT COUNT(*) FROM Students WHERE Dept = &apos;CSE&apos;; &rarr; Returns 10.</div>
                <div className="text-cyan-300">2. T2 inserts new student Tariq (Dept: &apos;CSE&apos;) and commits.</div>
                <div className="text-amber-300 font-bold">3. T1 re-runs the same query &rarr; Returns 11!</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 6: SERIALIZABILITY & PRECEDENCE GRAPHS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 6 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Transaction Schedules &amp; Conflict Serializability</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A schedule is <strong>serializable</strong> if its final outcome is equivalent to running the transactions one after another without any interleaving.
        </p>

        {/* Schedule Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setScheduleType('serial')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              scheduleType === 'serial' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            1. Pure Serial (T1 &rarr; T2)
          </button>
          <button
            onClick={() => setScheduleType('conflict_serializable')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              scheduleType === 'conflict_serializable' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            2. Conflict Serializable (Acyclic Graph)
          </button>
          <button
            onClick={() => setScheduleType('non_serializable')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              scheduleType === 'non_serializable' ? 'bg-rose-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            3. Non-Serializable (Cycle: T1 &harr; T2)
          </button>
        </div>

        {/* Graph Display */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {scheduleType === 'conflict_serializable' && (
            <div className="space-y-2 text-xs">
              <span className="text-emerald-400 font-mono font-bold uppercase">&check; Conflict Serializable Schedule</span>
              <p className="text-zinc-300 font-sans">
                Interleaved execution where every conflicting operation maintains a unidirectional order:
              </p>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] text-cyan-300">
                Precedence Graph: (Node T1) &mdash;&mdash;&gt; (Node T2)<br />
                Graph has NO cycle (Acyclic) &rArr; Equivalent to serial order T1 &rarr; T2! Safe to run!
              </div>
            </div>
          )}

          {scheduleType === 'non_serializable' && (
            <div className="space-y-2 text-xs">
              <span className="text-rose-400 font-mono font-bold uppercase">&cross; Cyclic Precedence Graph (Not Serializable)</span>
              <p className="text-zinc-300 font-sans">
                T1 reads A before T2 writes A (T1 &rarr; T2), but T2 reads B before T1 writes B (T2 &rarr; T1):
              </p>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] text-rose-400">
                Precedence Graph: (T1) &mdash;&gt; (T2) &mdash;&gt; (T1)<br />
                CYCLE DETECTED! &rArr; Cannot be serialized. Will produce corrupted or inconsistent results!
              </div>
            </div>
          )}

          {scheduleType === 'serial' && (
            <div className="space-y-2 text-xs">
              <span className="text-cyan-400 font-mono font-bold uppercase">Pure Serial Schedule</span>
              <p className="text-zinc-300 font-sans">
                T1 executes completely from start to commit. Then T2 begins. Guaranteed correct, but wastes CPU idle time while waiting for disk I/O.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 7: LOCKING & TWO-PHASE LOCKING (2PL)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 7 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lock-Based Concurrency &amp; Two-Phase Locking (2PL)</h2>
          </div>
        </div>

        {/* Lock Compatibility Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Lock Compatibility Matrix</span>
            <table className="w-full text-xs text-left font-mono">
              <thead className="text-zinc-400 border-b border-slate-800">
                <tr>
                  <th className="py-1.5">Requested \ Held</th>
                  <th className="py-1.5">Shared (S-Lock / Read)</th>
                  <th className="py-1.5">Exclusive (X-Lock / Write)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                <tr>
                  <td className="py-2 text-white font-bold">Shared (S)</td>
                  <td className="py-2 text-emerald-400 font-bold">&check; Compatible (Multiple Readers)</td>
                  <td className="py-2 text-rose-400 font-bold">&cross; Conflict (Must Wait)</td>
                </tr>
                <tr>
                  <td className="py-2 text-white font-bold">Exclusive (X)</td>
                  <td className="py-2 text-rose-400 font-bold">&cross; Conflict (Must Wait)</td>
                  <td className="py-2 text-rose-400 font-bold">&cross; Conflict (Must Wait)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">The 2PL Protocol Rules</span>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Two-Phase Locking guarantees conflict serializability by enforcing that once a transaction releases a lock, <strong>it can never acquire any other lock again</strong>!
            </p>
            <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-amber-300">
              Phase 1 (Growing): Locks can be acquired &bull; No locks released.<br />
              Phase 2 (Shrinking): Locks can be released &bull; No new locks acquired.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8: DEADLOCKS & PREVENTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 8 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Deadlock: Detection, Prevention &amp; 4 Coffman Conditions</h2>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Deadlock Scenario</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Deadly Embrace</span>
          </div>
          <div className="p-3 bg-black/60 rounded font-mono text-xs text-zinc-300">
            Transaction T1 holds Lock on Account A &mdash;&gt; Wants Lock on Account B.<br />
            Transaction T2 holds Lock on Account B &mdash;&gt; Wants Lock on Account A.<br />
            <span className="text-rose-400 font-bold">Both transactions wait on each other forever!</span>
          </div>
        </div>

        {/* 4 Conditions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-cyan-400 font-mono font-bold block">1. Mutual Exclusion</span>
            <p className="text-[11px] text-zinc-400 mt-1">Exclusive lock held by only one TX.</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-cyan-400 font-mono font-bold block">2. Hold &amp; Wait</span>
            <p className="text-[11px] text-zinc-400 mt-1">Holds resource A while requesting B.</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-cyan-400 font-mono font-bold block">3. No Preemption</span>
            <p className="text-[11px] text-zinc-400 mt-1">Locks cannot be forcibly seized.</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-cyan-400 font-mono font-bold block">4. Circular Wait</span>
            <p className="text-[11px] text-zinc-400 mt-1">T1 waits for T2, T2 waits for T1.</p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9: TRANSACTION ISOLATION LEVELS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 9 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">ANSI SQL Transaction Isolation Levels</h2>
          </div>
        </div>

        {/* Master Isolation Matrix */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Isolation Level</th>
                <th className="py-2.5 px-3">Dirty Read</th>
                <th className="py-2.5 px-3">Unrepeatable Read</th>
                <th className="py-2.5 px-3">Phantom Read</th>
                <th className="py-2.5 px-3">Default Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-rose-400">Read Uncommitted</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Possible</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Possible</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Possible</td>
                <td className="py-2.5 px-3 text-zinc-500">Rarely used in prod</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">Read Committed</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">&check; Prevented</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Possible</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Possible</td>
                <td className="py-2.5 px-3 text-cyan-300 font-mono">PostgreSQL / Oracle</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">Repeatable Read</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">&check; Prevented</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">&check; Prevented</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Possible (SQL Std)</td>
                <td className="py-2.5 px-3 text-cyan-300 font-mono">MySQL InnoDB</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">Serializable</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">&check; Prevented</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">&check; Prevented</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">&check; Prevented</td>
                <td className="py-2.5 px-3 text-zinc-400">Maximum Safety (Locks/SSI)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 10: DATABASE RECOVERY, WAL & CHECKPOINTS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 10 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Recovery: Write-Ahead Log (WAL), UNDO &amp; REDO</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Write-Ahead Logging (WAL) Protocol</span>
            <p className="text-zinc-300 font-sans leading-relaxed">
              No database page can be written to disk until the corresponding log records detailing the change have been flushed to stable storage.
            </p>
            <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-zinc-400">
              Log Record: &lt;T1, Account_ID, Old_Val: 10000, New_Val: 8000&gt;
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">UNDO vs REDO Decisions</span>
            <ul className="space-y-1.5 list-disc pl-4 text-zinc-300 font-sans">
              <li><strong className="text-amber-300">REDO:</strong> If &lt;T, COMMIT&gt; is in the log, replay changes to ensure permanence.</li>
              <li><strong className="text-rose-400">UNDO:</strong> If &lt;T, START&gt; exists without &lt;T, COMMIT&gt;, reverse all old values.</li>
              <li><strong className="text-cyan-300">Checkpoint:</strong> Flushes all dirty buffer pages to disk, pruning ancient log files.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 11 & 12: UNIVERSITY EXAM PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 11 &amp; 12 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Model Answers</h2>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'q1',
              q: 'Q1: Define a Database Transaction and explain the ACID properties.',
              a: 'A transaction is a logical unit of work consisting of one or more database operations. ACID properties are: Atomicity (all operations execute or none do), Consistency (preserves database integrity constraints), Isolation (concurrent transactions execute without interference), and Durability (committed modifications persist across system crashes).'
            },
            {
              id: 'q2',
              q: 'Q2: What is the difference between a Dirty Read and an Unrepeatable Read?',
              a: 'A Dirty Read occurs when a transaction reads uncommitted data that is later rolled back. An Unrepeatable Read occurs when a transaction re-reads a row and finds that another committed transaction has modified its values.'
            },
            {
              id: 'q3',
              q: 'Q3: What are the two phases of Two-Phase Locking (2PL)?',
              a: 'Phase 1 is the Growing Phase, during which a transaction can acquire locks but cannot release any. Phase 2 is the Shrinking Phase, during which a transaction can release locks but cannot acquire new ones. The lock point is the boundary between the two phases.'
            },
            {
              id: 'q4',
              q: 'Q4: Explain the four necessary conditions for Deadlock.',
              a: 'The four Coffman conditions are: Mutual Exclusion (resources held exclusively), Hold and Wait (holding resources while requesting others), No Preemption (resources cannot be forcibly revoked), and Circular Wait (a circular chain of waiting transactions).'
            },
            {
              id: 'q5',
              q: 'Q5: How does a Precedence Graph determine Conflict Serializability?',
              a: 'Nodes represent transactions. A directed edge Ti → Tj is drawn if Ti executes a conflicting operation before Tj. If the resulting graph contains a cycle, the schedule is not conflict serializable. If it is acyclic, it is conflict serializable.'
            },
            {
              id: 'q6',
              q: 'Q6: Differentiate between UNDO and REDO during recovery.',
              a: 'UNDO restores the old values (before-images) of data items modified by active transactions that did not commit before a crash. REDO applies the new values (after-images) of committed transactions whose buffer updates may not have reached disk before the crash.'
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
          PART 14: PRACTICAL HOMEWORK EXERCISES (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 13 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical Homework Exercises &amp; Solutions</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Work through these 5 university-level transaction exercises. Click <strong className="text-cyan-300">&quot;Reveal Mentor Solution&quot;</strong> to inspect verified solutions:
        </p>

        <div className="space-y-4">
          {[
            {
              id: 'hw1',
              title: 'Exercise 1: ACID Properties of a ৳2,000 Transfer',
              problem: 'A customer transfers ৳2,000 from Account A to Account B. Explain how each ACID property applies.',
              sol: "• Atomicity: Deducting ৳2,000 from A and adding ৳2,000 to B both succeed together. If the network drops midway, A's deduction is rolled back.\n• Consistency: Total bank balance (A + B) before transfer equals total bank balance after transfer.\n• Isolation: Concurrent shoppers cannot see A's intermediate balance while B has not yet received funds.\n• Durability: Once committed, the ৳2,000 remains transferred even if power fails."
            },
            {
              id: 'hw2',
              title: 'Exercise 2: Identify the Concurrency Problem',
              problem: 'Initial balance = ৳10,000. T1 reads 10k, T2 reads 10k. T1 subtracts 1k (writes 9k). T2 adds 2k (writes 12k). Diagnose the problem and correct balance.',
              sol: "1. Problem: Lost Update Problem.\n2. Correct final balance should be ৳11,000 (10,000 - 1,000 + 2,000).\n3. Prevention: Enforce Exclusive (X) locking on the account row during updates (e.g. SELECT ... FOR UPDATE) or use Serializable isolation."
            },
            {
              id: 'hw3',
              title: 'Exercise 3: Precedence Graph & Serializability Analysis',
              problem: 'Schedule: 1: T1 Read(A), 2: T2 Read(A), 3: T1 Write(A), 4: T2 Write(A). Is this conflict serializable?',
              sol: "Conflicting Operations:\n• T2 Read(A) occurs before T1 Write(A) → Edge T2 → T1\n• T1 Read(A) occurs before T2 Write(A) → Edge T1 → T2\n• T1 Write(A) occurs before T2 Write(A) → Edge T1 → T2\n\nPrecedence Graph contains a directed cycle: T1 → T2 → T1. Therefore, the schedule is NOT conflict serializable."
            },
            {
              id: 'hw4',
              title: 'Exercise 4: Deadlock Diagnosis',
              problem: 'T1 holds resource A and waits for B. T2 holds resource B and waits for A. Diagnose the issue and prevention.',
              sol: "1. Problem: Deadlock (Deadly Embrace).\n2. Satisfies all 4 Coffman conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.\n3. Solutions: Lock ordering (always acquire A before B), Wait-Die / Wound-Wait timestamps, or detection via Wait-For graph and aborting a victim."
            },
            {
              id: 'hw5',
              title: 'Exercise 5: Production SQL Transaction Script',
              problem: 'Write a robust SQL transaction deducting ৳1,000 from 101 and adding ৳1,000 to 102 with error rollback.',
              sol: "START TRANSACTION;\n\nUPDATE Accounts SET Balance = Balance - 1000 WHERE Account_ID = 101;\nUPDATE Accounts SET Balance = Balance + 1000 WHERE Account_ID = 102;\n\n-- In application layer:\n-- If error: ROLLBACK;\n-- Else: COMMIT;"
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
                <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                  {hw.sol}
                </pre>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 15: REVISION CHECKLIST & NAVIGATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 14 of 15
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 9 Final Revision Checklist</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Transaction &amp; Concurrency Mastery</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} topics ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* 21 Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            'Definition of database transaction.',
            'ACID properties in detail.',
            'Transaction states and lifecycle.',
            'COMMIT and ROLLBACK commands.',
            'SAVEPOINT and partial rollbacks.',
            'Concurrency control rationale.',
            'Lost update problem.',
            'Dirty read problem.',
            'Unrepeatable read problem.',
            'Phantom read problem.',
            'Serial and non-serial schedules.',
            'Conflict serializability criteria.',
            'View serializability concept.',
            'Precedence graph cycle analysis.',
            'Shared and exclusive lock compatibility.',
            'Two-Phase Locking (2PL) protocol.',
            'Deadlock and 4 Coffman conditions.',
            'Deadlock prevention and recovery.',
            '4 ANSI SQL isolation levels.',
            'Database failure categories.',
            'WAL, UNDO, REDO and checkpoints.'
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
              Upcoming â€¢ Lesson 10 Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module 10
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 10: Database Indexing &amp; Query Optimization
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            In Lesson 10, dive into database search engine mechanics: Primary vs Secondary indexes, Clustered vs Non-clustered, Dense vs Sparse, B-Tree &amp; B+ Tree node splitting, Hash indexing, and SQL EXPLAIN plans.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson8')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 8: Normalization</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson10')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Go to Lesson 10: Indexing &amp; Query Optimization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
