'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Network,
  Globe,
  Server,
  Database,
  Layers,
  Table as TableIcon,
  Workflow,
  Cpu,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
  Search,
  Building2,
  Eye,
  BookOpen,
  KeyRound,
  ShieldCheck,
  Terminal,
  Activity,
  FileText,
  HelpCircle,
  AlertOctagon,
  Split,
  GitMerge,
  Scale,
  Boxes,
  Radio,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson12TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 MCQ Questions for Lesson 12
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
    question: 'What is a distributed database?',
    options: [
      { key: 'A', text: 'A database stored at one location' },
      { key: 'B', text: 'A database distributed across multiple locations' },
      { key: 'C', text: 'A database without tables' },
      { key: 'D', text: 'A database without a server' }
    ],
    correct: 'B',
    explanation: 'A distributed database is a collection of multiple, logically interrelated databases distributed across different physical locations connected by a computer network.'
  },
  {
    id: 2,
    question: 'Horizontal fragmentation divides a table into:',
    options: [
      { key: 'A', text: 'Columns' },
      { key: 'B', text: 'Rows' },
      { key: 'C', text: 'Indexes' },
      { key: 'D', text: 'Databases only' }
    ],
    correct: 'B',
    explanation: 'Horizontal fragmentation splits a relation into horizontal subsets (tuples/rows) based on selection criteria (WHERE clause).'
  },
  {
    id: 3,
    question: 'Which fragmentation divides columns?',
    options: [
      { key: 'A', text: 'Horizontal' },
      { key: 'B', text: 'Vertical' },
      { key: 'C', text: 'Hybrid' },
      { key: 'D', text: 'None' }
    ],
    correct: 'B',
    explanation: 'Vertical fragmentation divides a relation into vertical subsets (attributes/columns), while retaining the primary key in each fragment to allow reconstruction via JOIN.'
  },
  {
    id: 4,
    question: 'What does replication mean?',
    options: [
      { key: 'A', text: 'Deleting duplicate data' },
      { key: 'B', text: 'Creating copies of data' },
      { key: 'C', text: 'Dividing rows' },
      { key: 'D', text: 'Removing indexes' }
    ],
    correct: 'B',
    explanation: 'Data replication refers to maintaining duplicate copies of data across multiple database nodes to enhance availability, fault tolerance, and read performance.'
  },
  {
    id: 5,
    question: 'How many phases does 2PC have?',
    options: [
      { key: 'A', text: 'One' },
      { key: 'B', text: 'Two' },
      { key: 'C', text: 'Three' },
      { key: 'D', text: 'Four' }
    ],
    correct: 'B',
    explanation: 'The Two-Phase Commit protocol (2PC) consists of exactly two phases: Phase 1 (Prepare Phase) and Phase 2 (Commit or Abort Phase).'
  },
  {
    id: 6,
    question: 'What does CAP stand for?',
    options: [
      { key: 'A', text: 'Consistency, Availability, Partition Tolerance' },
      { key: 'B', text: 'Control, Access, Processing' },
      { key: 'C', text: 'Consistency, Atomicity, Performance' },
      { key: 'D', text: 'Centralization, Availability, Processing' }
    ],
    correct: 'A',
    explanation: 'CAP stands for Consistency, Availability, and Partition Tolerance in Brewer’s CAP Theorem for distributed systems.'
  },
  {
    id: 7,
    question: 'Which database system uses the same DBMS at all sites?',
    options: [
      { key: 'A', text: 'Heterogeneous' },
      { key: 'B', text: 'Homogeneous' },
      { key: 'C', text: 'Centralized' },
      { key: 'D', text: 'Hierarchical' }
    ],
    correct: 'B',
    explanation: 'In a Homogeneous distributed database, all participating sites run the identical DBMS software and share the same underlying data model.'
  },
  {
    id: 8,
    question: 'What is location transparency?',
    options: [
      { key: 'A', text: 'Hiding the physical location of data' },
      { key: 'B', text: 'Hiding database passwords' },
      { key: 'C', text: 'Deleting database locations' },
      { key: 'D', text: 'Moving data automatically' }
    ],
    correct: 'A',
    explanation: 'Location transparency hides the physical storage location (network IP, server address) of data objects from the user and application query.'
  },
  {
    id: 9,
    question: 'What happens in eventual consistency?',
    options: [
      { key: 'A', text: 'All replicas are always identical' },
      { key: 'B', text: 'Replicas eventually converge if updates stop and synchronization succeeds' },
      { key: 'C', text: 'All updates are rejected' },
      { key: 'D', text: 'Data is never replicated' }
    ],
    correct: 'B',
    explanation: 'Under eventual consistency, replica nodes may temporarily hold stale or diverging data, but will guarantee convergence to the same state if no new updates are made.'
  },
  {
    id: 10,
    question: 'What happens if one participant votes NO in 2PC?',
    options: [
      { key: 'A', text: 'The transaction must commit' },
      { key: 'B', text: 'The coordinator decides to abort' },
      { key: 'C', text: 'The database is deleted' },
      { key: 'D', text: 'The transaction is ignored' }
    ],
    correct: 'B',
    explanation: 'In 2PC, all participants must vote YES to commit. If even a single participant votes NO (or times out), the coordinator broadcasts a global ABORT to all nodes.'
  }
];

export default function DatabaseLesson12Topic({ onNavigate }: DatabaseLesson12TopicProps) {
  // 1. Data Fragmentation Playground State
  const [fragMode, setFragMode] = useState<'horizontal' | 'vertical' | 'hybrid'>('horizontal');

  // 2. Two-Phase Commit (2PC) Interactive Simulator State
  const [nodeAVote, setNodeAVote] = useState<'YES' | 'NO'>('YES');
  const [nodeBVote, setNodeBVote] = useState<'YES' | 'NO'>('YES');
  const [twoPcStage, setTwoPcStage] = useState<'idle' | 'preparing' | 'decided'>('idle');

  // 3. CAP Theorem Simulator State
  const [networkPartitionActive, setNetworkPartitionActive] = useState<boolean>(true);
  const [capMode, setCapMode] = useState<'CP' | 'AP'>('CP');

  // 4. MCQ State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 5. Exam Questions Accordions
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 6. Revision Checklist (16 items)
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

  const quizScore = React.useMemo(() => {
    let score = 0;
    MCQ_DATA.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [selectedAnswers]);

  // Checklist completion calculation
  const checklistTotal = 16;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  // Execute 2PC Flow
  const runTwoPcSim = () => {
    setTwoPcStage('preparing');
    setTimeout(() => {
      setTwoPcStage('decided');
    }, 900);
  };

  const resetTwoPcSim = () => {
    setTwoPcStage('idle');
  };

  const final2PcDecision = nodeAVote === 'YES' && nodeBVote === 'YES' ? 'GLOBAL_COMMIT' : 'GLOBAL_ABORT';

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06142e] via-[#0b1c42] to-[#040817] border border-cyan-800/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 12 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Distributed Systems &amp; Scaling
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 12: Distributed Databases <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              &amp; Distributed DBMS (DDBMS)
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Explore how modern hyperscale platforms (Google Spanner, Amazon DynamoDB, Apache Cassandra, CockroachDB) partition, replicate, and coordinate data across global networks: Homogeneous vs Heterogeneous topologies, Client-Server vs Peer-to-Peer, 4 Distribution Transparencies, Horizontal/Vertical/Hybrid Fragmentation, Two-Phase Commit (2PC), Brewer&apos;s CAP Theorem, and Strong vs Eventual Consistency.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>Multi-Region Topologies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Split className="w-4 h-4 text-emerald-400" />
              <span>Data Fragmentation &amp; Allocation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitMerge className="w-4 h-4 text-amber-400" />
              <span>Two-Phase Commit (2PC)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-400" />
              <span>CAP Theorem &amp; Consistency</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS A DISTRIBUTED DATABASE?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 &amp; 2 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a Distributed Database &amp; DDBMS?</h2>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <p>
            A <strong>Distributed Database</strong> is a collection of multiple, logically interrelated databases that are physically stored at different physical locations (across servers, data centers, or geographic regions) and interconnected through a computer network.
          </p>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 font-mono text-cyan-200">
            &ldquo;A distributed database stores data in multiple locations but makes it work like one single unified database to end-users.&rdquo;
          </div>
        </div>

        {/* Real-World University & Banking Scenario */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
            Real-World Banking Scenario: 3 Branches Connected Across Bangladesh
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-center space-y-2">
              <Server className="w-6 h-6 text-cyan-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Dhaka Branch (Node 1)</div>
              <p className="text-[11px] text-zinc-400 font-sans">Customer opens a savings account and deposits ৳50,000.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 text-center space-y-2">
              <Server className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Chittagong Branch (Node 2)</div>
              <p className="text-[11px] text-zinc-400 font-sans">The same customer withdraws ৳10,000 from an ATM in Chittagong.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-center space-y-2">
              <Server className="w-6 h-6 text-purple-400 mx-auto" />
              <div className="text-xs font-bold text-white font-mono">Sylhet Branch (Node 3)</div>
              <p className="text-[11px] text-zinc-400 font-sans">Branch manager views real-time statement balance (৳40,000).</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Although the physical storage hardware is distributed 300+ kilometers apart, the <strong>DDBMS software layer</strong> coordinates synchronization so all 3 nodes appear as one unified logical ledger!
          </p>
        </div>

        {/* Industry DDBMS Systems */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { name: 'Google Spanner', role: 'Global ACID with atomic TrueTime GPS clocks' },
            { name: 'Apache Cassandra', role: 'Leaderless peer-to-peer linear write scaling' },
            { name: 'CockroachDB', role: 'Distributed SQL with automated range rebalancing' },
            { name: 'Amazon DynamoDB', role: 'Managed single-digit millisecond key-value scale' }
          ].map(db => (
            <div key={db.name} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300 block">{db.name}</span>
              <p className="text-[11px] text-zinc-400 font-sans leading-tight">{db.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 3: CENTRALIZED VS DISTRIBUTED DATABASE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 3 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Centralized Database vs. Distributed Database</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3.5">Comparison Factor</th>
                <th className="p-3.5 text-indigo-300">Centralized Database</th>
                <th className="p-3.5 text-cyan-300">Distributed Database</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
              <tr>
                <td className="p-3.5 font-bold text-white">Physical Location</td>
                <td className="p-3.5 text-zinc-300">All data stored on a single central server/site</td>
                <td className="p-3.5 text-cyan-200">Data distributed across multiple servers/locations</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Hardware Structure</td>
                <td className="p-3.5 text-zinc-300">Single database server (scale-up / vertical)</td>
                <td className="p-3.5 text-cyan-200">Cluster of nodes (scale-out / horizontal)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Failure Impact</td>
                <td className="p-3.5 text-rose-300">Single point of failure (SPOF) halts whole system</td>
                <td className="p-3.5 text-emerald-300">High fault tolerance: surviving nodes keep serving</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Network Sensitivity</td>
                <td className="p-3.5 text-zinc-300">Low network overhead for local queries</td>
                <td className="p-3.5 text-zinc-300">Network latency and bandwidth are critical factors</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Scalability</td>
                <td className="p-3.5 text-zinc-300">Limited by CPU/RAM limits of one machine</td>
                <td className="p-3.5 text-emerald-300">Near-infinite horizontal scaling by adding cheap nodes</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Administrative Complexity</td>
                <td className="p-3.5 text-emerald-300">Simple schema, backups, and single transaction log</td>
                <td className="p-3.5 text-rose-300">Complex: 2PC, data sync, fragmentation, quorum consensus</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 4: ARCHITECTURES (CLIENT-SERVER, P2P, THREE-TIER)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 4 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Distributed Database Architectures</h2>
          </div>
        </div>

        {/* 3 Architecture Cards with Uploaded Reference Visuals */}
        <div className="space-y-6">
          {/* 4.1 Client-Server */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">4.1 Client-Server Architecture</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Central Request-Response</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Clients submit SQL requests across a network to dedicated database servers that execute query parsing, optimization, and disk I/O before returning result sets.
            </p>
          </div>

          {/* 4.2 Peer-to-Peer with user image */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">4.2 Peer-to-Peer (Leaderless Ring) Architecture</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Apache Cassandra Style</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Every node in the cluster plays an identical role (symmetric no-master topology). Any node can receive a client read/write query, act as coordinator, and route requests to replica nodes. Eliminates master bottlenecks!
            </p>
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black/40 p-2 flex justify-center">
              <Image
                src="/images/lesson12/peer-to-peer-architecture.jpg"
                alt="Peer-to-Peer Distributed Database Ring Architecture"
                width={800}
                height={450}
                className="rounded-lg object-contain max-h-96 w-auto shadow-xl"
              />
            </div>
          </div>

          {/* 4.3 Three-Tier Web Architecture with user image */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">4.3 Three-Tier Web &amp; Database Architecture</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Enterprise Standard</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Separates the user interface (Presentation Tier / Web Browser), business application logic (Logic Tier / App Server), and relational storage (Data Tier / Distributed DB) for modularity, security, and connection pooling.
            </p>
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-black/40 p-2 flex justify-center">
              <Image
                src="/images/lesson12/three-tier-architecture.jpg"
                alt="Three-Tier Architecture Web Server App Server Database"
                width={700}
                height={380}
                className="rounded-lg object-contain max-h-80 w-auto shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: HOMOGENEOUS VS HETEROGENEOUS DDBMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 5 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Homogeneous vs. Heterogeneous Distributed Databases</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Homogeneous */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-500/30 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">
              Homogeneous Distributed Database
            </span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Every node across all sites runs the <strong>exact same DBMS software</strong> (e.g. all nodes run PostgreSQL or all run MySQL) and shares a unified global catalog.
            </p>
            <div className="rounded-xl overflow-hidden border border-slate-700 bg-black/40 p-2 flex justify-center">
              <Image
                src="/images/lesson12/homogeneous-architecture.jpg"
                alt="Homogeneous Distributed Database Architecture"
                width={500}
                height={300}
                className="rounded-lg object-contain max-h-56 w-auto"
              />
            </div>
            <div className="p-2.5 bg-black/40 rounded text-[11px] font-mono text-zinc-300 space-y-1">
              <div>&check; Easy schema synchronization &amp; unified SQL dialect.</div>
              <div>&check; Straightforward query planning &amp; distributed joins.</div>
            </div>
          </div>

          {/* Heterogeneous */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-500/30 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase block">
              Heterogeneous Distributed Database
            </span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Participating sites utilize <strong>different DBMS engines</strong> (e.g. Node 1 runs Oracle, Node 2 runs PostgreSQL, Node 3 runs MongoDB). Requires translation middleware and gateways!
            </p>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-2 text-zinc-300">
              <div className="text-purple-300 font-bold">Global Middleware Gateway</div>
              <div className="text-zinc-500">&darr; Translates queries via wrappers/mediators &darr;</div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                <div className="p-2 bg-black/50 rounded border border-slate-700 text-amber-300">Oracle</div>
                <div className="p-2 bg-black/50 rounded border border-slate-700 text-cyan-300">PostgreSQL</div>
                <div className="p-2 bg-black/50 rounded border border-slate-700 text-emerald-300">MySQL</div>
              </div>
            </div>
            <div className="p-2.5 bg-black/40 rounded text-[11px] font-mono text-zinc-300 space-y-1">
              <div>&check; Accommodates legacy enterprise mergers without migration.</div>
              <div>&cross; High translation overhead; distributed 2PC is difficult across engines.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6: DISTRIBUTION TRANSPARENCY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 6 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Distribution Transparency: The 4 Layers</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <strong>Distribution Transparency</strong> ensures the application developer or SQL user interacts with the system as if it were a single centralized database, completely oblivious to where data fragments and copies reside.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Location Transparency</span>
            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              Users run queries without knowing or specifying the server host, IP address, or city where records physically reside.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Fragmentation Transparency</span>
            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              Users query an entire logical table (<code className="text-emerald-300 font-mono">SELECT * FROM CUSTOMER</code>) without knowing it is partitioned into sub-tables.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-purple-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">3. Replication Transparency</span>
            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              Users update a record unaware that the DDBMS is silently propagating writes to 3 identical replica copies in the background.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">4. Naming Transparency</span>
            <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
              Each database object possesses a single unique global identifier rather than machine-specific paths like <code className="text-amber-300 font-mono">server12.dhaka.db.customer</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 7: DATA FRAGMENTATION & INTERACTIVE PLAYGROUND
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 7 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Data Fragmentation: Horizontal, Vertical &amp; Hybrid</h2>
          </div>
        </div>

        {/* Fragmentation Simulator Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFragMode('horizontal')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              fragMode === 'horizontal' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Horizontal (Rows / Tuples)
          </button>
          <button
            onClick={() => setFragMode('vertical')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              fragMode === 'vertical' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Vertical (Columns / Attributes)
          </button>
          <button
            onClick={() => setFragMode('hybrid')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              fragMode === 'hybrid' ? 'bg-purple-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Hybrid (Mixed)
          </button>
        </div>

        {/* Interactive Fragmentation Display */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          {fragMode === 'horizontal' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  Horizontal Fragmentation: Row Subsetting via Selection (&sigma;)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  Reconstructed via UNION
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Each site holds all columns, but only rows matching a specific geographical or department predicate:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-black/60 border border-cyan-500/30 space-y-1">
                  <div className="text-cyan-400 font-bold">Node 1 (Dhaka DB) &bull; WHERE City = &apos;Dhaka&apos;</div>
                  <div className="text-zinc-400">ID: 1 &bull; Name: Rahim &bull; City: Dhaka</div>
                  <div className="text-zinc-400">ID: 3 &bull; Name: Hasan &bull; City: Dhaka</div>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-400 font-bold">Node 2 (Sylhet DB) &bull; WHERE City = &apos;Sylhet&apos;</div>
                  <div className="text-zinc-400">ID: 2 &bull; Name: Karim &bull; City: Sylhet</div>
                  <div className="text-zinc-400">ID: 5 &bull; Name: Tariq &bull; City: Sylhet</div>
                </div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-cyan-300">
                Reconstruction Query: <code>SELECT * FROM CUSTOMER_DHAKA UNION ALL SELECT * FROM CUSTOMER_SYLHET;</code>
              </div>
            </div>
          )}

          {fragMode === 'vertical' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Vertical Fragmentation: Column Subsetting via Projection (&pi;)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Reconstructed via JOIN on PK
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                Attributes are segregated by privacy/frequency. <strong>The Primary Key (ID) MUST be duplicated in every fragment</strong> so they can be rejoined:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-black/60 border border-emerald-500/30 space-y-1">
                  <div className="text-emerald-400 font-bold">DB A: Public Employee Info</div>
                  <div className="text-zinc-400">[ID: 101, Name: &apos;Rahim&apos;, Dept: &apos;IT&apos;]</div>
                  <div className="text-zinc-400">[ID: 102, Name: &apos;Karim&apos;, Dept: &apos;HR&apos;]</div>
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-rose-500/30 space-y-1">
                  <div className="text-rose-400 font-bold">DB B: Confidential Payroll Ledger</div>
                  <div className="text-zinc-400">[ID: 101, Salary: ৳45,000, TaxID: &apos;TX-99&apos;]</div>
                  <div className="text-zinc-400">[ID: 102, Salary: ৳60,000, TaxID: &apos;TX-77&apos;]</div>
                </div>
              </div>
              <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-emerald-300">
                Reconstruction Query: <code>SELECT * FROM EMP_PUBLIC JOIN EMP_PAYROLL ON EMP_PUBLIC.ID = EMP_PAYROLL.ID;</code>
              </div>
            </div>
          )}

          {fragMode === 'hybrid' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                  Hybrid (Mixed) Fragmentation: Both Rows &amp; Columns
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                  Nested Selection &amp; Projection
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-sans">
                First, the table is horizontally partitioned by Department (IT vs HR). Then each department partition is vertically partitioned into public directory and private compensation!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 8 & 9: DATA REPLICATION & ALLOCATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 8 &amp; 9 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Data Replication Strategies &amp; Fragment Allocation</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-xs font-sans text-zinc-300 leading-relaxed">
            <p>
              <strong>Data Replication</strong> stores copies of the same logical data item across multiple physical server nodes. It eliminates single-site downtime and allows local users to execute lightning-fast reads without traversing cross-country WAN networks.
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <strong className="text-cyan-300">1. Full Replication:</strong> Complete database duplicated at every single site. Maximum read speed &amp; availability; heavy write penalty.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <strong className="text-emerald-300">2. Partial Replication:</strong> Critical or frequently accessed fragments copied to 2–3 regional nodes. Best real-world balance.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px]">
                <strong className="text-amber-300">3. No Replication:</strong> Each fragment exists exclusively on one node. Lowest storage cost; zero fault tolerance if node crashes.
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700 bg-black/40 p-2 flex justify-center">
            <Image
              src="/images/lesson12/replication-architecture.jpg"
              alt="Primary Database Replication to Multiple Replicas"
              width={500}
              height={320}
              className="rounded-lg object-contain max-h-72 w-auto shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 12: TWO-PHASE COMMIT PROTOCOL (2PC) SIMULATOR
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 12 of 19 • Critical University Topic
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Two-Phase Commit Protocol (2PC) Interactive Simulator</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          The <strong>Two-Phase Commit (2PC)</strong> protocol guarantees distributed transaction atomicity across multiple networked database servers. If even one participant cannot commit, the entire transaction is universally aborted!
        </p>

        {/* Interactive 2PC Simulator Playground */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                Simulate: ৳5,000 Transfer (Dhaka Node A &rarr; Sylhet Node B)
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Toggle the vote of each participant node to observe the Coordinator&apos;s decision.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={runTwoPcSim}
                disabled={twoPcStage !== 'idle'}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/30 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Execute 2PC Protocol</span>
              </button>
              <button
                onClick={resetTwoPcSim}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-mono cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Node Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-300">Node A (Dhaka - Debit ৳5,000)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Participant 1</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setNodeAVote('YES')}
                  disabled={twoPcStage !== 'idle'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    nodeAVote === 'YES' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                  }`}
                >
                  Vote: YES (Ready)
                </button>
                <button
                  onClick={() => setNodeAVote('NO')}
                  disabled={twoPcStage !== 'idle'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    nodeAVote === 'NO' ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                  }`}
                >
                  Vote: NO (Abort)
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">Node B (Sylhet - Credit ৳5,000)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Participant 2</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setNodeBVote('YES')}
                  disabled={twoPcStage !== 'idle'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    nodeBVote === 'YES' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                  }`}
                >
                  Vote: YES (Ready)
                </button>
                <button
                  onClick={() => setNodeBVote('NO')}
                  disabled={twoPcStage !== 'idle'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    nodeBVote === 'NO' ? 'bg-rose-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                  }`}
                >
                  Vote: NO (Abort)
                </button>
              </div>
            </div>
          </div>

          {/* Protocol Flow Visualization */}
          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-zinc-400 uppercase text-[10px] block font-bold">2PC Protocol Log &amp; Packet Exchange:</span>

            {twoPcStage === 'idle' && (
              <div className="text-zinc-500 italic">
                Ready to initiate. Select node votes above and click &quot;Execute 2PC Protocol&quot;.
              </div>
            )}

            {twoPcStage === 'preparing' && (
              <div className="space-y-1 text-cyan-300 animate-pulse">
                <div>[Phase 1 • Prepare Phase Initiated]</div>
                <div>&bull; Coordinator broadcasts &quot;PREPARE / CAN YOU COMMIT?&quot; to Node A and Node B.</div>
                <div>&bull; Node A writes undo/redo log to disk and prepares to respond...</div>
              </div>
            )}

            {twoPcStage === 'decided' && (
              <div className="space-y-2">
                <div className="text-zinc-400">
                  <div>[Phase 1 Summary] Node A replied: <span className={nodeAVote === 'YES' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{nodeAVote}</span> &bull; Node B replied: <span className={nodeBVote === 'YES' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{nodeBVote}</span></div>
                </div>
                <div className={`p-3 rounded-lg border font-bold text-xs ${
                  final2PcDecision === 'GLOBAL_COMMIT'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500 text-rose-200'
                }`}>
                  [Phase 2 • Decision Broadcast] Coordinator broadcast: {final2PcDecision}!
                  <p className="text-[11px] font-sans font-normal mt-1">
                    {final2PcDecision === 'GLOBAL_COMMIT'
                      ? 'All nodes voted YES. Both Node A and Node B flushed WAL logs and made updates permanent. ৳5,000 transferred with zero inconsistency.'
                      : 'At least one node voted NO (insufficient funds, constraint error, or disk fault). Coordinator broadcast ABORT. All participating nodes rolled back their changes.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 13: BREWER'S CAP THEOREM PLAYGROUND
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 13 of 19 • Crucial System Design Axiom
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Brewer&apos;s CAP Theorem: Consistency vs. Availability</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          In any asynchronous distributed network subject to network dropouts (Partition Tolerance, <strong>P</strong>), a distributed database <strong>CANNOT simultaneously guarantee both Consistency (C) and Availability (A)</strong>. It must choose between CP or AP during a network partition!
        </p>

        {/* Interactive CAP Mode Switcher */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-amber-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Interactive Network Partition Simulation
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Simulate a fiber-optic cable severance between Data Center 1 and Data Center 2.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCapMode('CP')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  capMode === 'CP' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Choose CP (Consistency Focus)
              </button>
              <button
                onClick={() => setCapMode('AP')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  capMode === 'AP' ? 'bg-purple-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Choose AP (Availability Focus)
              </button>
            </div>
          </div>

          {/* Active Mode Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border space-y-2 text-xs font-sans ${
              capMode === 'CP' ? 'bg-cyan-950/20 border-cyan-500/40' : 'bg-slate-900 border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between font-mono font-bold text-cyan-300">
                <span>CP: Consistency + Partition Tolerance</span>
                <span>Banking / Financial Ledgers</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                When the network partitions, the system <strong>rejects reads or writes on partitioned nodes</strong> to prevent stale data. Returns an error (e.g. 503 Service Unavailable) rather than serving an incorrect balance!
              </p>
              <div className="p-2 bg-black/40 rounded font-mono text-[11px] text-cyan-200">
                Real Engines: Google Spanner, CockroachDB, HBase
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 text-xs font-sans ${
              capMode === 'AP' ? 'bg-purple-950/20 border-purple-500/40' : 'bg-slate-900 border-slate-800 opacity-60'
            }`}>
              <div className="flex items-center justify-between font-mono font-bold text-purple-300">
                <span>AP: Availability + Partition Tolerance</span>
                <span>Social Feeds / Shopping Carts</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                The system <strong>always responds successfully</strong> to client reads and writes, even if the node is cut off and serving stale data. Replicas synchronize later when the partition heals (Eventual Consistency).
              </p>
              <div className="p-2 bg-black/40 rounded font-mono text-[11px] text-purple-200">
                Real Engines: Apache Cassandra, Amazon DynamoDB, CouchDB
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 14: STRONG VS EVENTUAL CONSISTENCY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 14 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Consistency Models: Strong vs. Eventual Consistency</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3.5">Property</th>
                <th className="p-3.5 text-cyan-300">Strong Consistency (Linearizable)</th>
                <th className="p-3.5 text-purple-300">Eventual Consistency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
              <tr>
                <td className="p-3.5 font-bold text-white">Read Guarantee</td>
                <td className="p-3.5 text-zinc-300">Every subsequent read strictly receives the most recent committed write</td>
                <td className="p-3.5 text-zinc-300">Reads may temporarily see stale data until synchronization completes</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Coordination Latency</td>
                <td className="p-3.5 text-rose-300">Higher write latency due to multi-node quorum consensus</td>
                <td className="p-3.5 text-emerald-300">Near-instantaneous local writes with async background replication</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Best Use Cases</td>
                <td className="p-3.5 text-cyan-200">Bank ledger transfers, flight seat reservation, inventory checkout</td>
                <td className="p-3.5 text-purple-200">Social media post likes, YouTube view counts, DNS cache records</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 17: UNIVERSITY EXAMINATION QUESTIONS ACCORDION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 17 of 19
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Model Answers</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Review these 10 university examination questions with verified model answers:
        </p>

        <div className="space-y-2.5">
          {[
            {
              id: 'q1',
              q: 'Q1: What is a distributed database and how does it differ from a centralized database?',
              a: 'A distributed database is a collection of logically related databases physically stored across multiple networked locations while appearing as a unified system to users. In contrast, a centralized database resides on a single computer server, making it vulnerable to single-point-of-failure bottlenecks.'
            },
            {
              id: 'q2',
              q: 'Q2: Define DDBMS and list its core responsibilities.',
              a: 'A Distributed DBMS (DDBMS) is the software system managing distributed databases. Responsibilities include: global query optimization, distributed transaction management (2PC), maintaining replication consistency, transparent data localization, and fault recovery.'
            },
            {
              id: 'q3',
              q: 'Q3: Differentiate between Homogeneous and Heterogeneous distributed databases.',
              a: '• Homogeneous: All participating sites execute identical DBMS software (e.g. all MySQL) and share the same data model, making integration simple.\n• Heterogeneous: Different sites run different DBMS engines (e.g. Oracle, PostgreSQL, MongoDB), requiring translation gateways and schema wrappers.'
            },
            {
              id: 'q4',
              q: 'Q4: Explain the 4 types of distribution transparency.',
              a: '1. Location Transparency: Users query data without knowing the physical server or IP address.\n2. Fragmentation Transparency: Users query whole tables unaware that rows/columns are partitioned.\n3. Replication Transparency: Users read/write without knowing multiple duplicate copies exist.\n4. Naming Transparency: Objects possess globally unique identifiers across the entire network.'
            },
            {
              id: 'q5',
              q: 'Q5: Compare Horizontal, Vertical, and Hybrid Data Fragmentation.',
              a: '• Horizontal: Divides relation rows (tuples) using selection conditions (reconstructed via UNION).\n• Vertical: Divides relation columns (attributes) using projection, retaining the Primary Key in all fragments (reconstructed via JOIN on PK).\n• Hybrid: Combines horizontal and vertical partitioning simultaneously.'
            },
            {
              id: 'q6',
              q: 'Q6: Explain Full Replication, Partial Replication, and No Replication.',
              a: '• Full: Complete database copied to every site (highest availability, slow writes).\n• Partial: Selected fragments copied to specific high-traffic regions (balanced).\n• No Replication: Each fragment stored at only 1 site (low storage, zero redundancy).'
            },
            {
              id: 'q7',
              q: 'Q7: Describe the Two-Phase Commit (2PC) protocol in detail.',
              a: 'Phase 1 (Prepare): Coordinator sends "PREPARE" to all participants. Each node writes undo/redo logs and votes "YES" or "NO".\nPhase 2 (Commit/Abort): If all nodes vote "YES", Coordinator broadcasts "COMMIT". If any node votes "NO" or times out, Coordinator broadcasts "ABORT". Guarantees distributed ACID atomicity.'
            },
            {
              id: 'q8',
              q: 'Q8: What is Brewer’s CAP Theorem and its fundamental trade-off?',
              a: 'CAP states that a distributed data store can guarantee at most two out of Consistency (C), Availability (A), and Partition Tolerance (P). Because network partitions (P) are unavoidable in real networks, distributed databases must choose between CP (rejecting stale reads) and AP (serving available stale reads).'
            },
            {
              id: 'q9',
              q: 'Q9: Differentiate between Strong Consistency and Eventual Consistency.',
              a: '• Strong Consistency: Guarantees that any subsequent read immediately returns the latest committed write across all nodes.\n• Eventual Consistency: Allows replicas to temporarily drift apart, guaranteeing they will eventually converge if no further updates occur.'
            },
            {
              id: 'q10',
              q: 'Q10: What are 4 main advantages and 4 disadvantages of distributed databases?',
              a: '• Advantages: 1. High availability/fault tolerance, 2. Improved local query performance, 3. Horizontal scalability, 4. Regional compliance.\n• Disadvantages: 1. Software complexity, 2. High network infrastructure cost, 3. Difficult replica synchronization, 4. Security vulnerability across multiple endpoints.'
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
          PART 19: INTERACTIVE MCQ ASSESSMENT (10 MARKS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 19 of 19 • University Assessment
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 12 Knowledge Test (10 Questions · 10 Marks)</h2>
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

        {/* Score Card if Submitted */}
        {quizSubmitted && (
          <div className={`p-4 rounded-xl border flex items-center justify-between font-mono text-xs ${
            quizScore >= 8
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
          }`}>
            <div className="space-y-1">
              <div className="text-sm font-bold">
                Final Score: {quizScore} / 10 ({Math.round((quizScore / 10) * 100)}%)
              </div>
              <p className="text-[11px] font-sans">
                {quizScore >= 8 ? 'Mastery verified! You understand distributed database topologies, 2PC, and CAP theorem.' : 'Good review effort! Examine the answer explanations below.'}
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

        {/* 10 Question Items */}
        <div className="space-y-4">
          {MCQ_DATA.map(q => {
            const userAnswer = selectedAnswers[q.id];
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
          REVISION CHECKLIST & NAVIGATION BRIDGE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Checklist &amp; Bridge
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 12 Final Revision Checklist (16 Topics)</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Distributed Architecture Mastery</span>
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
            'Distributed database definition',
            'Distributed DBMS (DDBMS) software role',
            'Centralized vs. Distributed comparison',
            'Client-Server architecture',
            'Peer-to-Peer architecture',
            'Three-Tier web architecture',
            'Homogeneous distributed database',
            'Heterogeneous distributed database',
            '4 Distribution transparencies',
            'Horizontal fragmentation (rows)',
            'Vertical fragmentation (columns + PK)',
            'Hybrid fragmentation (mixed)',
            'Data replication types (Full, Partial, None)',
            'Two-Phase Commit protocol (2PC)',
            'Brewer’s CAP theorem (CP vs AP)',
            'Strong vs. Eventual consistency models'
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
              Upcoming • Lesson 13 Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module 13
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 13: NoSQL and Modern Database Systems
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Explore SQL vs NoSQL, Document Databases (MongoDB, BSON), Key-Value Stores (Redis), Column-Family Stores (Cassandra), and Graph Databases (Neo4j, Cypher queries).
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson11')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 11: Security &amp; Recovery</span>
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
