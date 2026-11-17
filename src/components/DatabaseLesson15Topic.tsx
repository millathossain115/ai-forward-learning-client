'use client';

import React, { useState, useMemo } from 'react';
import {
  Server,
  Database,
  Cpu,
  Activity,
  ShieldCheck,
  ShieldAlert,
  HardDrive,
  RefreshCw,
  Clock,
  Archive,
  Terminal,
  Layers,
  Users,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertOctagon,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Search,
  BookOpen,
  KeyRound,
  FileText,
  HelpCircle,
  Zap,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  Sliders,
  Play,
  Network
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson15TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 MCQ Questions for Lesson 15 (Incorporates all 7 user questions + 3 university exam questions)
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
    question: 'Who is primarily responsible for managing, securing, and maintaining an organization\'s database?',
    options: [
      { key: 'A', text: 'Web Designer' },
      { key: 'B', text: 'Database Administrator (DBA)' },
      { key: 'C', text: 'Graphic Designer' },
      { key: 'D', text: 'Network User' }
    ],
    correct: 'B',
    explanation: 'A Database Administrator (DBA) is the IT professional designated to maintain, secure, tune, back up, and ensure high availability of an organization’s database systems.'
  },
  {
    id: 2,
    question: 'Which type of DBA focuses mainly on live production database environments and 24/7 uptime?',
    options: [
      { key: 'A', text: 'Development DBA' },
      { key: 'B', text: 'Application DBA' },
      { key: 'C', text: 'Production DBA' },
      { key: 'D', text: 'Systems Analyst' }
    ],
    correct: 'C',
    explanation: 'Production DBAs specialize in operational live database systems, real-time monitoring, backup/recovery verification, failovers, and ensuring mission-critical SLA uptime.'
  },
  {
    id: 3,
    question: 'Which type of backup copies the entire database including all tables, schemas, and logs?',
    options: [
      { key: 'A', text: 'Incremental Backup' },
      { key: 'B', text: 'Differential Backup' },
      { key: 'C', text: 'Full Backup' },
      { key: 'D', text: 'Transaction Backup' }
    ],
    correct: 'C',
    explanation: 'A Full Backup makes a complete duplicate of the entire database, providing the simplest and fastest recovery baseline but requiring the most storage space.'
  },
  {
    id: 4,
    question: 'What does database replication mean?',
    options: [
      { key: 'A', text: 'Deleting duplicate records' },
      { key: 'B', text: 'Maintaining synchronized copies of data on multiple database servers' },
      { key: 'C', text: 'Encrypting passwords' },
      { key: 'D', text: 'Removing unused indexes' }
    ],
    correct: 'B',
    explanation: 'Database replication involves continuously copying and synchronizing database changes from a primary server to one or more secondary replica servers for fault tolerance and read scaling.'
  },
  {
    id: 5,
    question: 'What does RPO (Recovery Point Objective) measure?',
    options: [
      { key: 'A', text: 'The maximum acceptable amount of data loss measured backward in time' },
      { key: 'B', text: 'Database SQL query execution speed' },
      { key: 'C', text: 'Total server RAM allocation' },
      { key: 'D', text: 'Database installation time' }
    ],
    correct: 'A',
    explanation: 'RPO defines the maximum acceptable age of files or transactions that an organization is willing to lose in a disaster (e.g., an RPO of 15 minutes means losing at most 15 minutes of data).'
  },
  {
    id: 6,
    question: 'Which administrative activity helps identify slow-running SQL queries and bottlenecked resources?',
    options: [
      { key: 'A', text: 'Database performance monitoring' },
      { key: 'B', text: 'Deleting database users' },
      { key: 'C', text: 'Changing user passwords only' },
      { key: 'D', text: 'Creating database backups only' }
    ],
    correct: 'A',
    explanation: 'Database monitoring continuously observes query latency, CPU/memory consumption, lock contention, and active connections to diagnose and tune performance bottlenecks.'
  },
  {
    id: 7,
    question: 'What is the primary purpose of database recovery?',
    options: [
      { key: 'A', text: 'Designing mobile application screens' },
      { key: 'B', text: 'Restoring a database to a correct, consistent, and usable state after a failure' },
      { key: 'C', text: 'Creating frontend user interfaces' },
      { key: 'D', text: 'Installing an operating system' }
    ],
    correct: 'B',
    explanation: 'Database recovery restores database consistency and data state following hardware crashes, software bugs, power outages, human errors, or cyberattacks.'
  },
  {
    id: 8,
    question: 'Why is database replication NOT a substitute for regular database backups?',
    options: [
      { key: 'A', text: 'Replication is too slow' },
      { key: 'B', text: 'Accidental deletions or malicious modifications are instantly replicated to all secondary copies' },
      { key: 'C', text: 'Replication cannot store relational tables' },
      { key: 'D', text: 'Replication requires continuous manual user intervention' }
    ],
    correct: 'B',
    explanation: 'If an operator or attacker accidentally runs "DROP TABLE Students;", the deletion command propagates to all replicas immediately. Only immutable separate backups allow point-in-time restoration.'
  },
  {
    id: 9,
    question: 'What does RTO (Recovery Time Objective) define?',
    options: [
      { key: 'A', text: 'The maximum allowable time a business can tolerate its database being down before service is restored' },
      { key: 'B', text: 'The time required to compile an index' },
      { key: 'C', text: 'The speed of network bandwidth between servers' },
      { key: 'D', text: 'The frequency of password changes' }
    ],
    correct: 'A',
    explanation: 'RTO defines the target duration of time within which a business process or database system must be restored after an outage to avoid catastrophic disruption.'
  },
  {
    id: 10,
    question: 'What is the main focus difference between a System DBA and an Application DBA?',
    options: [
      { key: 'A', text: 'System DBAs manage hardware, OS, and server infrastructure; Application DBAs optimize queries, schemas, and app logic' },
      { key: 'B', text: 'System DBAs only write SQL; Application DBAs build motherboards' },
      { key: 'C', text: 'System DBAs work for banks; Application DBAs work for universities' },
      { key: 'D', text: 'There is no difference between them' }
    ],
    correct: 'A',
    explanation: 'System DBAs focus on the foundational database server infrastructure (OS configuration, patching, clustering, storage), while Application DBAs focus on app-specific query tuning, schemas, and developer support.'
  }
];

export default function DatabaseLesson15Topic({ onNavigate }: DatabaseLesson15TopicProps) {
  // 1. Roles & Responsibilities Active Tab
  const [activeRespTab, setActiveRespTab] = useState<'install' | 'config' | 'security' | 'backup' | 'perf' | 'troubleshoot'>('install');

  // 2. Types of DBAs Selector
  const [activeDbaType, setActiveDbaType] = useState<'system' | 'application' | 'development' | 'production'>('production');

  // 3. Real-Time NOC Database Monitoring Simulator
  const [concurrentUsers, setConcurrentUsers] = useState<number>(1200);
  const [isMitigated, setIsMitigated] = useState<boolean>(false);

  // 4. Query Optimizer Performance Lab (Before vs After)
  const [hasOptimizationApplied, setHasOptimizationApplied] = useState<boolean>(false);

  // 5. Backup & Recovery Timeline Simulator State
  const [backupStrategy, setBackupStrategy] = useState<'incremental' | 'differential'>('incremental');
  const [recoveryStep, setRecoveryStep] = useState<number>(0);

  // 6. High Availability Failover Cluster Simulator State
  const [clusterState, setClusterState] = useState<'healthy' | 'primary_down' | 'promoted'>('healthy');
  const [haLogs, setHaLogs] = useState<string[]>(['Cluster healthy. Primary Server node_01 accepting writes. Replicas node_02 & node_03 synced via Raft.']);

  // 7. Disaster Recovery RPO / RTO Calculator
  const [orgTier, setOrgTier] = useState<'tier1_bank' | 'tier2_hospital' | 'tier3_school'>('tier1_bank');

  // 8. Hands-on University DBA Simulator Console
  const [dbaStep, setDbaStep] = useState<number>(1);
  const [dbaConsoleOutput, setDbaConsoleOutput] = useState<string>('DBA Session initialized. Ready for Step 1: Database Creation.');

  // 9. MCQ Assessment State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 10. Exam Accordions
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 11. Revision Checklist (16 topics)
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

  // Dynamic Telemetry Metrics derived from Concurrent Users & Mitigation
  const telemetry = useMemo(() => {
    const rawCpu = isMitigated ? Math.round(18 + (concurrentUsers / 10000) * 22) : Math.min(99, Math.round(25 + (concurrentUsers / 10000) * 80));
    const rawRam = isMitigated ? Math.round(42 + (concurrentUsers / 10000) * 20) : Math.min(96, Math.round(50 + (concurrentUsers / 10000) * 48));
    const rawLatency = isMitigated ? Math.max(12, Math.round(10 + (concurrentUsers / 1000) * 3)) : Math.round(45 + Math.pow(concurrentUsers / 1000, 2) * 280);
    const rawConns = Math.round(concurrentUsers * 0.15);
    const maxConns = 1500;
    const isOverloaded = rawCpu > 85 || rawLatency > 3000 || rawConns > 1200;

    return {
      cpu: rawCpu,
      ram: rawRam,
      latency: rawLatency,
      conns: rawConns,
      maxConns,
      isOverloaded
    };
  }, [concurrentUsers, isMitigated]);

  // Failover Cluster Actions
  const simulatePrimaryCrash = () => {
    setClusterState('primary_down');
    setHaLogs(prev => [
      'CRITICAL ALERT: Primary Server (node_01) heartbeat timed out (No response for 3000ms).',
      'Consensus engine triggered leader election between replica_01 and replica_02...',
      ...prev
    ]);
  };

  const promoteReplica = () => {
    setClusterState('promoted');
    setHaLogs(prev => [
      '✓ FAILOVER SUCCESSFUL: Replica node_02 elected as NEW PRIMARY (Term 4). Virtual IP re-routed. System uptime restored (Total Downtime: 2.8 seconds).',
      ...prev
    ]);
  };

  const resetCluster = () => {
    setClusterState('healthy');
    setHaLogs(['Cluster reset to normal baseline. node_01 restored as primary. All 3 nodes synchronized.']);
  };

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
              Lesson 15 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Database Administration &amp; Management
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
            Database Administration, Operations &amp; Management (DBA)
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Explore the vital discipline of <strong>Database Administration</strong> and the responsibilities of a <strong>Database Administrator (DBA)</strong>: from engine installation and tuning to live performance telemetry, automated backup strategies, point-in-time recovery, high availability clustering, and enterprise disaster recovery planning.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-cyan-300/80">
            <div className="flex items-center gap-1.5">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>DBA Roles &amp; Types</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Monitoring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Archive className="w-4 h-4 text-amber-400" />
              <span>Backup &amp; Recovery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>HA Clustering &amp; DR</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1 & 2: WHAT IS DATABASE ADMINISTRATION & WHO IS A DBA?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 &amp; 2 of 19 • Foundational Role
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What Is Database Administration &amp; Who Is a DBA?</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Formal Definition</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Database Administration</strong> is the operational process of installing, configuring, securing, monitoring, optimizing, and maintaining a database management system to guarantee that organizational data remains <strong>available 24/7, confidential, structurally intact, and performing at peak efficiency</strong>.
            </p>
            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 text-xs text-cyan-200 font-mono space-y-1">
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">In Simple Words:</div>
              <div>A <strong>Database Administrator (DBA)</strong> is the specialized IT guardian who takes care of an enterprise&apos;s data assets so that applications run without outages or latency crashes.</div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-white font-mono uppercase">Cross-Functional Collaboration</h4>
              <p className="text-xs text-zinc-400 font-sans">
                A DBA operates at the nexus of technology and business, coordinating daily with:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { role: 'Software Developers', task: 'Query tuning, ORM schema reviews, migration scripts.' },
                  { role: 'System Admins', task: 'Server hardware, OS kernel tuning, memory provisioning.' },
                  { role: 'Network Engineers', task: 'Firewall rules, connection latency, subnet routing.' },
                  { role: 'Cybersecurity Teams', task: 'Audits, encryption keys, vulnerability patches.' },
                  { role: 'Business Analysts', task: 'Data warehouses, reporting replicas, ETL pipelines.' },
                  { role: 'Database Designers', task: 'Normalization, ER diagrams, primary/foreign keys.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-0.5">
                    <div className="font-bold text-cyan-300 font-mono text-[11px]">{item.role}</div>
                    <div className="text-[10px] text-zinc-400 font-sans">{item.task}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-World University Datacenter Scenario Card */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Real-World Case Study
                </span>
                <h3 className="text-sm font-bold text-white">University Campus Central Database Operations</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                Production Scale
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-zinc-400">Total Student Records:</div>
                <div className="text-xl font-bold text-white mt-1">20,000+</div>
                <div className="text-[10px] text-cyan-400">Transcripts, GPA, fees</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-zinc-400">Faculty &amp; Staff:</div>
                <div className="text-xl font-bold text-white mt-1">500+</div>
                <div className="text-[10px] text-cyan-400">Grading, payroll, schedules</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-2 text-xs font-sans">
              <span className="font-bold text-white font-mono">What the University DBA Must Guarantee:</span>
              <ul className="space-y-1.5 text-zinc-300 text-[11px] list-disc pl-4">
                <li><strong className="text-cyan-300">Continuous Availability:</strong> The exam portal cannot crash when 10,000 students log in simultaneously at 2:00 PM on result release day.</li>
                <li><strong className="text-emerald-300">Data Integrity:</strong> Prevent unauthorized modifications or grade tampering from students.</li>
                <li><strong className="text-purple-300">Disaster Recovery:</strong> If the central storage fails, restore student academic records without losing a single grade.</li>
                <li><strong className="text-amber-300">Performance SLAs:</strong> Ensure student transcript queries return in under 2 seconds instead of timing out.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: ROLES AND RESPONSIBILITIES OF A DBA
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 3 of 19 • Core Curriculum
            </span>
            <h2 className="text-xl font-bold text-white mt-1">8 Core Roles and Responsibilities of a DBA</h2>
          </div>
        </div>

        {/* Interactive Responsibility Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'install', label: '1. Installation', icon: HardDrive },
            { id: 'config', label: '2. Configuration', icon: Sliders },
            { id: 'security', label: '3. Security', icon: ShieldCheck },
            { id: 'backup', label: '4. Backup & Recovery', icon: Archive },
            { id: 'perf', label: '5. Performance Tuning', icon: Activity },
            { id: 'troubleshoot', label: '6. Troubleshooting', icon: AlertTriangle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveRespTab(tab.id as typeof activeRespTab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeRespTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900 text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Detail Card */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {activeRespTab === 'install' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-cyan-400 font-mono">Database Software Installation &amp; Provisioning</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">DBMS Provisioning</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                A DBA selects, installs, and provisions enterprise DBMS engines on production physical servers or cloud virtual instances (AWS EC2, Google Cloud Compute Engine, on-prem bare-metal).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono pt-2">
                {[
                  { name: 'MySQL', type: 'Open-Source Relational', desc: 'World’s most popular web app database engine.' },
                  { name: 'PostgreSQL', type: 'Advanced Object-Relational', desc: 'Enterprise-grade extensibility with JSONB and pgvector.' },
                  { name: 'Oracle Database', type: 'Commercial Enterprise', desc: 'Mission-critical core banking and ERP architectures.' },
                  { name: 'Microsoft SQL Server', type: 'Enterprise Windows/Linux', desc: 'T-SQL integration with Microsoft enterprise ecosystems.' }
                ].map((e, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-1">
                    <div className="font-bold text-white">{e.name}</div>
                    <div className="text-[10px] text-cyan-400">{e.type}</div>
                    <div className="text-[11px] text-zinc-400 font-sans">{e.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeRespTab === 'config' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-emerald-400 font-mono">Engine Configuration &amp; Parameter Tuning</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Memory &amp; Storage Tuning</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Default out-of-the-box database configurations are designed for minimal hardware (e.g. 512MB RAM). A DBA tunes parameters to exploit high-capacity enterprise hardware:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold">Buffer Pool &amp; Shared Memory:</div>
                  <div className="text-[11px] text-zinc-300 font-sans">Allocates 60-80% of server RAM to database caching (e.g., <code>innodb_buffer_pool_size</code>, <code>shared_buffers</code>).</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold">Connection Limits &amp; Pooling:</div>
                  <div className="text-[11px] text-zinc-300 font-sans">Sets <code>max_connections</code> and deploys connection poolers (PgBouncer, ProxySQL) to avoid thread thrashing.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold">WAL &amp; Disk Flush Policies:</div>
                  <div className="text-[11px] text-zinc-300 font-sans">Tunes commit log flushing (<code>fsync</code>, redo log sizing) to balance ACID durability with write throughput.</div>
                </div>
              </div>
            </div>
          )}

          {activeRespTab === 'security' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-purple-400 font-mono">Database Security, Access Control &amp; Hardening</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Defense &amp; Auditing</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                DBAs configure user accounts, enforce strong password expiration policies, revoke unnecessary default privileges, apply encryption (TDE at rest, TLS in transit), and inspect audit trails for suspicious SQL activities.
              </p>
            </div>
          )}

          {activeRespTab === 'backup' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-amber-400 font-mono">Automated Backups &amp; Disaster Recovery Drills</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Data Protection</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                A DBA establishes automated backup pipelines (Full, Incremental, Differential), validates offsite archival to secondary data centers, and performs regular <strong>restore drills</strong> to prove that backups can actually be recovered during an emergency.
              </p>
            </div>
          )}

          {activeRespTab === 'perf' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-cyan-400 font-mono">Performance Monitoring &amp; Index Optimization</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Query Speed</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Observes slow query logs (`pg_stat_statements`, slow query log), adds missing composite indexes, restructures expensive joins, and defragments bloated indexes to maintain snappy response times.
              </p>
            </div>
          )}

          {activeRespTab === 'troubleshoot' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-rose-400 font-mono">Incident Response &amp; Emergency Troubleshooting</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">Root Cause Analysis</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                Diagnoses and resolves production emergencies: connection pool exhaustion, deadlock graphs, corrupted table pages, disk space saturation, and hardware failovers.
              </p>
            </div>
          )}
        </div>

        {/* Summary Table of Responsibilities */}
        <div className="pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                <tr>
                  <th className="p-3">Responsibility</th>
                  <th className="p-3">Main Purpose</th>
                  <th className="p-3">Key Tools &amp; Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-cyan-400">Installation</td>
                  <td className="p-3 text-zinc-300 font-sans">Install and initialize DBMS software</td>
                  <td className="p-3 text-zinc-400 font-sans">Package managers, Docker containers, Kubernetes operators</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-400">Configuration</td>
                  <td className="p-3 text-zinc-300 font-sans">Tune database settings to workload size</td>
                  <td className="p-3 text-zinc-400 font-sans">Memory buffers, connection pools, WAL flushing</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-purple-400">Security</td>
                  <td className="p-3 text-zinc-300 font-sans">Protect database against unauthorized access</td>
                  <td className="p-3 text-zinc-400 font-sans">GRANT/REVOKE, RBAC, TLS encryption, audit logs</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-400">Backup</td>
                  <td className="p-3 text-zinc-300 font-sans">Create redundant copies of database records</td>
                  <td className="p-3 text-zinc-400 font-sans">pg_dump, mysqldump, RMAN, snapshots, S3 cold storage</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-rose-400">Recovery</td>
                  <td className="p-3 text-zinc-300 font-sans">Restore database after a crash or corruption</td>
                  <td className="p-3 text-zinc-400 font-sans">Point-in-Time Recovery (PITR), transaction log replay</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-blue-400">Monitoring</td>
                  <td className="p-3 text-zinc-300 font-sans">Observe database health and latency</td>
                  <td className="p-3 text-zinc-400 font-sans">Prometheus, Grafana, Datadog, CloudWatch, slow logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4: TYPES OF DATABASE ADMINISTRATORS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                Part 4 of 19 • DBA Specializations
              </span>
              <h2 className="text-xl font-bold text-white mt-1">4 Types of Database Administrators</h2>
            </div>
          </div>

          {/* Type Selector Pills */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'system', label: 'System DBA' },
              { id: 'application', label: 'App DBA' },
              { id: 'development', label: 'Dev DBA' },
              { id: 'production', label: 'Production DBA' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveDbaType(t.id as typeof activeDbaType)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeDbaType === t.id ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Persona Spotlight Card */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {activeDbaType === 'system' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-cyan-400 font-mono">System DBA (Infrastructure &amp; Server Focus)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Infrastructure Layer</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Focuses on the physical and virtual environment housing the database. Works closely with system administrators and network engineers to manage OS patches, disk array RAID configurations, kernel tuning, and DBMS version upgrades.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Key Responsibility:</div>
                  <div className="text-zinc-300 font-sans">Installing DBMS, applying vendor security patches, configuring storage mount points.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Primary Tools:</div>
                  <div className="text-zinc-300 font-sans">Linux CLI, Ansible, Terraform, Puppet, SAN/NAS storage arrays.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Example Task:</div>
                  <div className="text-zinc-300 font-sans">Upgrading PostgreSQL from version 15 to 16 with minimal downtime.</div>
                </div>
              </div>
            </div>
          )}

          {activeDbaType === 'application' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-emerald-400 font-mono">Application DBA (Software &amp; Workload Focus)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Software Integration</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Dedicated to a specific business application (e.g. ERP, CRM, or E-Commerce portal). Bridges the gap between application developers and the database, ensuring that application queries are written efficiently and ORM models do not degrade performance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">Key Responsibility:</div>
                  <div className="text-zinc-300 font-sans">Optimizing application SQL, creating stored procedures, managing application-specific objects.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">Primary Tools:</div>
                  <div className="text-zinc-300 font-sans">EXPLAIN plans, SQL profilers, Prisma/Hibernate ORM logs.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">Example Task:</div>
                  <div className="text-zinc-300 font-sans">Refactoring a slow 6-table shopping cart join query to drop latency from 8s to 120ms.</div>
                </div>
              </div>
            </div>
          )}

          {activeDbaType === 'development' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-amber-400 font-mono">Development DBA (Schema Design &amp; SDLC Focus)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Design &amp; Pre-Prod</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Partners with software architects and engineering teams during the development lifecycle. Guides database normalization, writes migration scripts, benchmarks test datasets, and ensures schemas are clean before reaching production.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-amber-400 font-bold mb-1">Key Responsibility:</div>
                  <div className="text-zinc-300 font-sans">Data modeling, migration scripts (Liquibase, Flyway), stress testing dev databases.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-amber-400 font-bold mb-1">Primary Tools:</div>
                  <div className="text-zinc-300 font-sans">ERwin, DBeaver, Flyway, Git, CI/CD pipeline automation.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-amber-400 font-bold mb-1">Example Task:</div>
                  <div className="text-zinc-300 font-sans">Designing 3NF normalized tables for a new banking loan origination module.</div>
                </div>
              </div>
            </div>
          )}

          {activeDbaType === 'production' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-purple-400 font-mono">Production DBA (Live Operations &amp; High Availability Focus)</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">24/7 Operations</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                The frontline defender of live revenue-generating production databases. Responsible for 99.999% uptime, real-time alerts, backup execution, failover testing, lock contention resolution, and emergency disaster recovery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Key Responsibility:</div>
                  <div className="text-zinc-300 font-sans">24/7 incident response, automated backup verification, replication health, failover execution.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Primary Tools:</div>
                  <div className="text-zinc-300 font-sans">PagerDuty, Prometheus, Grafana, Patroni, pacemaker, failover orchestrators.</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-purple-400 font-bold mb-1">Example Task:</div>
                  <div className="text-zinc-300 font-sans">Performing zero-downtime failover to replica server when primary hardware suffers disk crash.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 7: REAL-TIME NOC DATABASE MONITORING CENTER
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 7 of 19 • Live Telemetry
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Database Monitoring Operations Center (NOC)</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMitigated(!isMitigated)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                isMitigated
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/40 text-rose-300 border-rose-500/50 hover:bg-rose-900/50'
              }`}
            >
              {isMitigated ? '✓ DBA Tuning Applied (Optimized)' : '⚡ Baseline Configuration (Unoptimized)'}
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Simulate what happens inside a database server when thousands of concurrent students access their results simultaneously. Use the slider below to scale traffic and observe how a DBA detects spikes and applies optimizations.
        </p>

        {/* Interactive Stress Slider */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" /> Concurrent Student Traffic Load:
              </span>
              <span className="text-cyan-400 font-bold text-sm">{concurrentUsers.toLocaleString()} Users</span>
            </div>
            <input
              type="range"
              min="200"
              max="10000"
              step="200"
              value={concurrentUsers}
              onChange={e => setConcurrentUsers(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>200 (Low Traffic)</span>
              <span>5,000 (Result Release Spike)</span>
              <span>10,000 (Severe Surge)</span>
            </div>
          </div>

          {/* Real-Time Telemetry Meters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 font-mono">
            {/* CPU */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>CPU Usage:</span>
                <span className={`font-bold ${telemetry.cpu > 80 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {telemetry.cpu}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    telemetry.cpu > 80 ? 'bg-rose-500' : telemetry.cpu > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${telemetry.cpu}%` }}
                />
              </div>
            </div>

            {/* RAM */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>Buffer Pool RAM:</span>
                <span className={`font-bold ${telemetry.ram > 85 ? 'text-amber-400' : 'text-cyan-400'}`}>
                  {telemetry.ram}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${telemetry.ram}%` }}
                />
              </div>
            </div>

            {/* Active Connections */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>Connections:</span>
                <span className={`font-bold ${telemetry.conns > 1000 ? 'text-rose-400' : 'text-purple-400'}`}>
                  {telemetry.conns} / {telemetry.maxConns}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${(telemetry.conns / telemetry.maxConns) * 100}%` }}
                />
              </div>
            </div>

            {/* Query Latency */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>P99 Query Latency:</span>
                <span className={`font-bold ${telemetry.latency > 2000 ? 'text-rose-400' : telemetry.latency > 500 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {telemetry.latency} ms
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    telemetry.latency > 2000 ? 'bg-rose-500' : telemetry.latency > 500 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (telemetry.latency / 4000) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Status Alert Banner */}
          <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed flex items-center justify-between ${
            telemetry.isOverloaded
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              {telemetry.isOverloaded ? <AlertOctagon className="w-5 h-5 text-rose-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              <span>
                {telemetry.isOverloaded
                  ? 'ALERT: High load bottleneck detected! Queries taking >3000ms. CPU saturated by unindexed table scans.'
                  : 'STATUS: Systems optimal. Queries running sub-50ms within SLA. Connection pool healthy.'}
              </span>
            </div>

            {telemetry.isOverloaded && !isMitigated && (
              <button
                onClick={() => setIsMitigated(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow"
              >
                Apply DBA Index &amp; Pool Tuning
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8: PERFORMANCE TUNING & QUERY OPTIMIZATION LAB
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 8 of 19 • Optimization
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Performance Management in Action</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A core responsibility of a DBA is analyzing slow-query logs and eliminating inefficient table scans. See how adding an index and projecting specific columns reduces query latency from <strong>15.2 seconds down to 2.4 milliseconds</strong>!
        </p>

        {/* Interactive Query Execution Comparison */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase">Query Execution Benchmark (50,000 Records)</span>
            <button
              onClick={() => setHasOptimizationApplied(!hasOptimizationApplied)}
              className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-mono cursor-pointer transition-all"
            >
              {hasOptimizationApplied ? 'View Unoptimized Scan' : 'Apply DBA Optimization'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Query 1: Before */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              !hasOptimizationApplied ? 'bg-rose-950/20 border-rose-500/40 ring-1 ring-rose-500/30' : 'bg-slate-900 border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400">1. Unoptimized Full Table Scan</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px]">Slow (15.2s)</span>
              </div>
              <pre className="p-2.5 rounded bg-black/40 border border-slate-800 text-zinc-300 text-[11px] overflow-x-auto">
{`-- No index on Name column
SELECT * 
FROM Students 
WHERE Name = 'Rahim';`}
              </pre>
              <div className="space-y-1 text-[11px] text-zinc-400 font-sans">
                <div>&bull; Execution Plan: <code>Sequential Table Scan (Seq Scan)</code></div>
                <div>&bull; Disk I/O: Scans 50,000 data blocks sequentially</div>
                <div>&bull; Memory Load: Loads all 18 table columns into buffer</div>
              </div>
            </div>

            {/* Query 2: After */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              hasOptimizationApplied ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/30' : 'bg-slate-900 border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">2. DBA Optimized B-Tree Seek</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">Fast (2.4ms)</span>
              </div>
              <pre className="p-2.5 rounded bg-black/40 border border-slate-800 text-emerald-300 text-[11px] overflow-x-auto">
{`-- Step 1: Create B-Tree index
CREATE INDEX idx_student_name ON Students(Name);

-- Step 2: Project required columns only
SELECT StudentID, Name, Department 
FROM Students 
WHERE Name = 'Rahim';`}
              </pre>
              <div className="space-y-1 text-[11px] text-zinc-300 font-sans">
                <div>&bull; Execution Plan: <code>Index Seek on idx_student_name</code></div>
                <div>&bull; Disk I/O: Only 3 B-Tree leaf node lookups ($O(\log N)$)</div>
                <div>&bull; Speedup: <strong className="text-emerald-400">6,300x faster execution</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9 & 10: BACKUP STRATEGIES & POINT-IN-TIME RECOVERY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 9 &amp; 10 of 19 • Reliability &amp; PITR
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Backup Strategies &amp; Point-in-Time Recovery (PITR)</h2>
          </div>
        </div>

        {/* 3 Core Backup Archetypes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Full Backup',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              bg: 'bg-cyan-950/20',
              desc: 'Duplicates 100% of all databases, schemas, tables, and indexes onto backup media.',
              pros: 'Fastest and simplest recovery (only 1 file required).',
              cons: 'Very slow to run; requires massive storage capacity.'
            },
            {
              title: 'Incremental Backup',
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              bg: 'bg-emerald-950/20',
              desc: 'Copies ONLY records modified since the previous backup of any type.',
              pros: 'Fastest backup execution; smallest storage footprint.',
              cons: 'Slowest recovery: requires Full Backup + ALL sequential incrementals in order.'
            },
            {
              title: 'Differential Backup',
              color: 'text-amber-400',
              border: 'border-amber-500/30',
              bg: 'bg-amber-950/20',
              desc: 'Copies ALL records modified since the LAST FULL BACKUP.',
              pros: 'Simpler recovery: requires only Full Backup + LATEST differential.',
              cons: 'Backup size expands each subsequent day until next full backup.'
            }
          ].map((b, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${b.border} ${b.bg} space-y-2`}>
              <div className={`text-sm font-bold font-mono ${b.color}`}>{b.title}</div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">{b.desc}</p>
              <div className="text-[11px] font-sans pt-1 space-y-0.5">
                <div className="text-emerald-300"><span className="font-bold font-mono">Pro: </span>{b.pros}</div>
                <div className="text-rose-300"><span className="font-bold font-mono">Con: </span>{b.cons}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Point-in-Time Recovery (PITR) Simulator */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Disaster Simulation
              </span>
              <h3 className="text-sm font-bold text-white">Thursday 3:15 PM Crash: Step-by-Step PITR Pipeline</h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Zero Data Loss Recovery
            </span>
          </div>

          <p className="text-xs text-zinc-300 font-sans">
            Scenario: The server disk fails at <strong>Thursday 3:15 PM</strong>. The last Full Backup was taken <strong>Sunday Midnight</strong>. Use the interactive step-by-step slider to witness how the DBA recovers every transaction up to 3:14:59 PM:
          </p>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
            {[
              { step: 1, label: '1. Sunday Full' },
              { step: 2, label: '2. Wed Differential' },
              { step: 3, label: '3. Replay WAL Logs' },
              { step: 4, label: '4. Consistent State' }
            ].map(s => (
              <button
                key={s.step}
                onClick={() => setRecoveryStep(s.step)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  recoveryStep >= s.step
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-200 font-bold'
                    : 'bg-slate-900 border-slate-800 text-zinc-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Recovery Stage Explanation */}
          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono space-y-2">
            {recoveryStep === 0 && (
              <div className="text-zinc-400">Click a recovery step above to initiate the restoration sequence.</div>
            )}
            {recoveryStep === 1 && (
              <div className="space-y-1">
                <div className="text-cyan-400 font-bold">Step 1: Restoring Base Full Backup</div>
                <div className="text-zinc-300 font-sans">Restores Sunday midnight full image (100 GB). Database brought up to state as of Sunday 23:59:59.</div>
              </div>
            )}
            {recoveryStep === 2 && (
              <div className="space-y-1">
                <div className="text-amber-400 font-bold">Step 2: Applying Wednesday Cumulative Differential</div>
                <div className="text-zinc-300 font-sans">Applies Wednesday night differential backup (15 GB). Database brought up to state as of Wednesday 23:59:59.</div>
              </div>
            )}
            {recoveryStep === 3 && (
              <div className="space-y-1">
                <div className="text-purple-400 font-bold">Step 3: Replaying WAL / Transaction Logs (PITR)</div>
                <div className="text-zinc-300 font-sans">Replays sequential Write-Ahead Logs from Thursday 00:00:00 to 15:14:59. Incomplete transactions rolled back; committed transactions redone.</div>
              </div>
            )}
            {recoveryStep === 4 && (
              <div className="space-y-1">
                <div className="text-emerald-400 font-bold">&check; Step 4: Verification &amp; Service Online</div>
                <div className="text-zinc-300 font-sans">Integrity check passed. Point-in-Time Recovery completed with ZERO data loss. Service back online within 18 minutes!</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 12 & 13: HIGH AVAILABILITY & DISASTER RECOVERY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 12 &amp; 13 of 19 • Enterprise Resilience
            </span>
            <h2 className="text-xl font-bold text-white mt-1">High Availability (HA), Replication &amp; Disaster Recovery</h2>
          </div>
        </div>

        {/* Interactive HA Cluster Simulator */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Live Cluster Simulator
              </span>
              <h3 className="text-sm font-bold text-white">Primary-Replica Automatic Failover Engine</h3>
            </div>

            <div className="flex gap-2">
              {clusterState === 'healthy' && (
                <button
                  onClick={simulatePrimaryCrash}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-500/40 text-xs font-mono font-bold cursor-pointer transition-colors"
                >
                  Simulate Primary Hardware Crash
                </button>
              )}
              {clusterState === 'primary_down' && (
                <button
                  onClick={promoteReplica}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold cursor-pointer transition-colors shadow"
                >
                  Elect &amp; Promote Replica 1 to New Primary
                </button>
              )}
              {clusterState === 'promoted' && (
                <button
                  onClick={resetCluster}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-mono cursor-pointer"
                >
                  Reset Cluster Baseline
                </button>
              )}
            </div>
          </div>

          {/* 3 Node Cluster Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            {/* Node 1 */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              clusterState === 'healthy'
                ? 'bg-cyan-950/20 border-cyan-500/40'
                : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <Server className="w-4 h-4" /> Node 01 (Datacenter A)
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  clusterState === 'healthy' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {clusterState === 'healthy' ? 'PRIMARY (Active)' : 'OFFLINE (Crashed)'}
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                {clusterState === 'healthy' ? 'Handling 100% of read/write transactions.' : 'Heartbeat failure detected by consensus quorum.'}
              </div>
            </div>

            {/* Node 2 */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              clusterState === 'promoted'
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <Server className="w-4 h-4" /> Node 02 (Datacenter B)
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  clusterState === 'promoted' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-slate-800 text-zinc-400'
                }`}>
                  {clusterState === 'promoted' ? 'NEW PRIMARY (Promoted)' : 'READ REPLICA'}
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                {clusterState === 'promoted' ? 'Successfully assumed leadership. Accepting read/write queries.' : 'Streaming replication log via WAL stream.'}
              </div>
            </div>

            {/* Node 3 */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <Server className="w-4 h-4" /> Node 03 (Datacenter C)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-zinc-400">
                  READ REPLICA
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                Continuous standby replica serving analytical read queries.
              </div>
            </div>
          </div>

          {/* Real-Time Cluster Event Log */}
          <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] font-mono space-y-1">
            <span className="text-zinc-400 font-bold block mb-1">High Availability Orchestrator Logs:</span>
            {haLogs.map((log, idx) => (
              <div key={idx} className={log.includes('CRITICAL') ? 'text-rose-400' : log.includes('FAILOVER') ? 'text-emerald-400' : 'text-zinc-300'}>
                &bull; {log}
              </div>
            ))}
          </div>

          {/* Crucial Distinctions: RPO vs RTO */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold">RPO (Recovery Point Objective)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Data Loss Metric</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                Maximum allowable amount of data loss measured in time backward from failure.
                <br /><strong className="text-white">Banking Standard:</strong> RPO = 0 seconds (zero lost dollars).
                <br /><strong className="text-zinc-400">Campus LMS Standard:</strong> RPO = 1 to 2 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-bold">RTO (Recovery Time Objective)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Downtime Metric</span>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                Maximum acceptable duration of time to restore service after a crash.
                <br /><strong className="text-white">E-Commerce Standard:</strong> RTO &lt; 5 minutes (automated failover).
                <br /><strong className="text-zinc-400">Internal Archive Standard:</strong> RTO = 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 16: UNIVERSITY EXAMINATION PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 16 of 19 • University Exam Prep
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
                q: 'Q1: What is Database Administration (DBA)?',
                a: 'Database Administration is the continuous process of managing, securing, configuring, maintaining, and monitoring a database system to ensure high performance, security compliance, reliability, and uninterrupted operational availability.'
              },
              {
                id: 'sq2',
                q: 'Q2: Who is a Database Administrator?',
                a: 'A Database Administrator (DBA) is a specialized IT professional responsible for overseeing an organization\'s database environment, including user authorization, software installation, backup/recovery, query optimization, and capacity planning.'
              },
              {
                id: 'sq3',
                q: 'Q3: Define Database Monitoring and Database Maintenance.',
                a: '• Monitoring: Continuously observing server CPU, RAM, disk I/O, slow query logs, and active connections.\n• Maintenance: Performing scheduled preventative tasks such as index defragmentation, log rotations, software patches, and backup restore testing.'
              },
              {
                id: 'sq4',
                q: 'Q4: What is Database Replication?',
                a: 'Database replication is the technique of copying and synchronizing data continuously from a primary database server to one or more secondary replica servers to provide high availability and balance read traffic.'
              },
              {
                id: 'sq5',
                q: 'Q5: Define High Availability (HA) and Disaster Recovery (DR).',
                a: '• High Availability (HA): Engineering a database cluster to minimize routine downtime via redundant failover nodes (e.g. 99.999% uptime).\n• Disaster Recovery (DR): The overarching strategy and procedures to restore database services after a catastrophic facility-wide disruption (fire, flood, cyberattack).'
              },
              {
                id: 'sq6',
                q: 'Q6: What is the difference between RPO and RTO?',
                a: '• RPO (Recovery Point Objective): Measures acceptable data loss in time (how much data can we afford to lose?).\n• RTO (Recovery Time Objective): Measures acceptable downtime duration (how fast must the database be brought back online?).'
              },
              {
                id: 'sq7',
                q: 'Q7: Differentiate between a System DBA and an Application DBA.',
                a: '• System DBA: Focuses on physical/virtual database infrastructure, DBMS installation, operating system kernel tuning, and patching.\n• Application DBA: Focuses on application-specific database objects, ORM performance, complex query tuning, and developer support.'
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
                q: 'Q1: Explain the complete Database Administration Life Cycle.',
                a: '1. Planning: Requirement gathering, capacity forecasting, engine selection.\n2. Installation: Provisioning servers, deploying binaries (PostgreSQL, Oracle, MySQL).\n3. Configuration: Memory buffer allocation (shared buffers/buffer pool), connection pools.\n4. Security Setup: RBAC roles, principle of least privilege, TDE encryption, auditing.\n5. Monitoring: Observing query latency, CPU, RAM, connection saturation via Prometheus/Grafana.\n6. Maintenance: Reindexing, vacuuming bloated tables, rotating log files.\n7. Backup & Recovery: Scheduling Full/Inc/Diff backups and conducting PITR restore drills.\n8. Optimization: Adding composite B-Trees, rewriting slow joins, tuning server parameters.'
              },
              {
                id: 'bq2',
                q: 'Q2: Compare Full, Incremental, and Differential backup strategies with restoration steps.',
                a: '• Full Backup: Copies entire database. Restore requires only the 1 full backup file.\n• Incremental Backup: Copies changes since previous backup of any type. Restore requires Full Backup + EVERY subsequent incremental in chronological order.\n• Differential Backup: Copies changes since the last Full Backup. Restore requires Full Backup + LATEST differential backup only.'
              },
              {
                id: 'bq3',
                q: 'Q3: Differentiate between Backup, Recovery, and Disaster Recovery.',
                a: '• Backup: Preventative creation of data duplicates stored in secondary locations.\n• Recovery: Operational restoration of a database to a consistent state following localized failure.\n• Disaster Recovery: Comprehensive organizational plan restoring complete datacenter services after major destruction.'
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
          PART 17: PRACTICE QUIZ (10 QUESTIONS · 10 MARKS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 17 of 19 • University Assessment
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 15 Knowledge Test (10 Questions · 10 Marks)</h2>
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
                {quizScore >= 8 ? 'Mastery demonstrated! Ready for enterprise operations.' : quizScore >= 6 ? 'Solid performance! Review incorrect items above.' : 'Keep studying! Re-examine the DBA responsibilities and backup techniques.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 18 & 19: REVISION CHECKLIST & NAVIGATION BRIDGE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 18 &amp; 19 of 19 • Final Mastery
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 15 Final Revision Checklist (16 Topics)</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">DBA Operations &amp; Management Mastery</span>
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
            'What is database administration & core objectives',
            'Who is a Database Administrator (DBA)',
            '8 Core DBA roles and responsibilities',
            'System DBA infrastructure focus',
            'Application DBA query and ORM focus',
            'Development DBA schema & SDLC focus',
            'Production DBA 24/7 uptime & HA focus',
            'Database installation and configuration parameters',
            'User creation and permission management in SQL',
            'Database monitoring: CPU, RAM, disk, connection pools',
            'Query optimization and B-Tree indexing benchmarks',
            'Full vs. Incremental vs. Differential backups',
            'Point-in-Time Recovery (PITR) and WAL log replay',
            'Database maintenance: reindexing and health audits',
            'High Availability (HA) clustering & automatic failover',
            'Disaster Recovery (DR), RPO, and RTO metrics'
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
              Roadmap Connection
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module Complete
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 15 Complete &rarr; Ready for Architecture Roadmap &amp; AI Vector Engineering?
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            You have now mastered all 15 core DBMS lessons from relational foundations, transactions, concurrency, and distributed databases to modern NoSQL, security, and enterprise database administration! Continue your journey into the end-to-end Database Architecture Roadmap and pgvector AI embedding benchmarks.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson14')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 14: Security &amp; Authorization</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson16')}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-600/20 cursor-pointer"
            >
              <span>Next: Lesson 16 (Distributed Databases &amp; DDBMS)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
