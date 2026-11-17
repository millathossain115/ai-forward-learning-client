'use client';

import React, { useState, useMemo } from 'react';
import {
  Network,
  Database,
  Server,
  Globe,
  Layers,
  Split,
  Copy,
  Shuffle,
  ShieldCheck,
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
  Terminal,
  Clock,
  Archive,
  RefreshCw,
  Building2,
  Plane,
  HeartPulse,
  ShoppingCart,
  Users
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson16TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 MCQ Questions for Lesson 16 (Matching user prompt exactly)
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
      { key: 'A', text: 'Database stored at only one central location' },
      { key: 'B', text: 'Collection of logically related data stored across multiple locations' },
      { key: 'C', text: 'Database without relational tables' },
      { key: 'D', text: 'Database without authenticated users' }
    ],
    correct: 'B',
    explanation: 'A distributed database is a collection of logically interrelated databases physically distributed over multiple sites connected via a computer network.'
  },
  {
    id: 2,
    question: 'What does DDBMS stand for?',
    options: [
      { key: 'A', text: 'Digital Database Management System' },
      { key: 'B', text: 'Distributed Database Management System' },
      { key: 'C', text: 'Dynamic Data Backup Management System' },
      { key: 'D', text: 'Distributed Data Monitoring System' }
    ],
    correct: 'B',
    explanation: 'DDBMS stands for Distributed Database Management System—the software system that coordinates and manages distributed database instances transparently.'
  },
  {
    id: 3,
    question: 'Which distributed database uses the exact same DBMS software at every location?',
    options: [
      { key: 'A', text: 'Heterogeneous Distributed Database' },
      { key: 'B', text: 'Centralized Database' },
      { key: 'C', text: 'Homogeneous Distributed Database' },
      { key: 'D', text: 'Hierarchical Database' }
    ],
    correct: 'C',
    explanation: 'A Homogeneous Distributed Database employs identical DBMS software (e.g., MySQL or Oracle across all branch sites), making data integration and query processing simpler.'
  },
  {
    id: 4,
    question: 'Horizontal fragmentation divides a table into groups of:',
    options: [
      { key: 'A', text: 'Rows (tuples)' },
      { key: 'B', text: 'Columns (attributes)' },
      { key: 'C', text: 'Indexes' },
      { key: 'D', text: 'Databases only' }
    ],
    correct: 'A',
    explanation: 'Horizontal fragmentation subsets a table by rows based on predicate conditions (e.g. City = "Dhaka"), keeping all original columns intact.'
  },
  {
    id: 5,
    question: 'Vertical fragmentation divides a table into groups of:',
    options: [
      { key: 'A', text: 'Rows' },
      { key: 'B', text: 'Columns (attributes), retaining the primary key' },
      { key: 'C', text: 'Networks' },
      { key: 'D', text: 'Servers' }
    ],
    correct: 'B',
    explanation: 'Vertical fragmentation partitions a table into subsets of columns, ensuring the primary key is included in every fragment so the original table can be reconstructed via a natural join.'
  },
  {
    id: 6,
    question: 'What does data replication mean in a distributed database?',
    options: [
      { key: 'A', text: 'Deleting duplicate records' },
      { key: 'B', text: 'Creating and maintaining copies of the same data at multiple locations' },
      { key: 'C', text: 'Dividing columns into separate tables' },
      { key: 'D', text: 'Removing database users' }
    ],
    correct: 'B',
    explanation: 'Data replication maintains redundant copies of fragments or tables at multiple physical nodes to enhance availability and local read performance.'
  },
  {
    id: 7,
    question: 'What is the first phase of the Two-Phase Commit (2PC) protocol?',
    options: [
      { key: 'A', text: 'Recovery Phase' },
      { key: 'B', text: 'Rollback Phase' },
      { key: 'C', text: 'Prepare Phase' },
      { key: 'D', text: 'Replication Phase' }
    ],
    correct: 'C',
    explanation: 'In the Prepare Phase (Voting Phase), the coordinator asks all participating nodes if they are ready to commit their local sub-transactions.'
  },
  {
    id: 8,
    question: 'Which CAP property deals with continuing operation despite network communication disconnections?',
    options: [
      { key: 'A', text: 'Consistency' },
      { key: 'B', text: 'Availability' },
      { key: 'C', text: 'Partition Tolerance' },
      { key: 'D', text: 'Confidentiality' }
    ],
    correct: 'C',
    explanation: 'Partition Tolerance (P) means the distributed system continues operating and executing requests even when network communication between nodes is severed or delayed.'
  },
  {
    id: 9,
    question: 'What is data allocation in a distributed database design?',
    options: [
      { key: 'A', text: 'Deleting unused fragments' },
      { key: 'B', text: 'Deciding which physical server node will store which fragment or replica' },
      { key: 'C', text: 'Encrypting database storage' },
      { key: 'D', text: 'Writing SQL queries' }
    ],
    correct: 'B',
    explanation: 'Data allocation is the process of assigning fragments and replicas to specific physical sites across the network to minimize communication costs and maximize query throughput.'
  },
  {
    id: 10,
    question: 'What does distribution transparency hide from end users and application developers?',
    options: [
      { key: 'A', text: 'Database user accounts' },
      { key: 'B', text: 'The physical location, fragmentation, and replication complexities of distributed data' },
      { key: 'C', text: 'Standard SQL syntax' },
      { key: 'D', text: 'Table relationships' }
    ],
    correct: 'B',
    explanation: 'Distribution transparency ensures that the distributed database appears as a single logical database, abstracting physical location, fragmentation, and replica management away from users.'
  }
];

export default function DatabaseLesson16Topic({ onNavigate }: DatabaseLesson16TopicProps) {
  // 1. Centralized vs Distributed Architecture Mode
  const [archMode, setArchMode] = useState<'centralized' | 'distributed'>('distributed');
  const [nodeDhakaCrashed, setNodeDhakaCrashed] = useState<boolean>(false);

  // 2. Homogeneous vs Heterogeneous Explorer
  const [engineType, setEngineType] = useState<'homogeneous' | 'heterogeneous'>('homogeneous');

  // 3. Distribution Transparency Active Tab
  const [activeTransparency, setActiveTransparency] = useState<'location' | 'fragmentation' | 'replication' | 'naming'>('location');

  // 4. Data Fragmentation Workbench
  const [fragmentationType, setFragmentationType] = useState<'horizontal' | 'vertical' | 'hybrid'>('horizontal');

  // 5. Data Replication Strategy
  const [replicationMode, setReplicationMode] = useState<'full' | 'partial' | 'none'>('partial');

  // 6. Two-Phase Commit (2PC) Simulator
  const [twoPcStage, setTwoPcStage] = useState<'idle' | 'prepare' | 'committed' | 'aborted'>('idle');
  const [nodeChattogramVote, setNodeChattogramVote] = useState<'YES' | 'NO'>('YES');

  // 7. Data Consistency Toggle
  const [consistencyModel, setConsistencyModel] = useState<'strong' | 'eventual'>('strong');

  // 8. CAP Theorem Network Partition Simulator
  const [capPartitionActive, setCapPartitionActive] = useState<boolean>(true);
  const [capSystemChoice, setCapSystemChoice] = useState<'CP' | 'AP'>('CP');
  const [capResultText, setCapResultText] = useState<string | null>(null);

  // 9. Interactive Practice Exercises State
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [exerciseRevealed, setExerciseRevealed] = useState<Record<number, boolean>>({});

  // 10. MCQ Assessment State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 11. University Exam Accordions
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 12. Revision Checklist State (16 Topics)
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

  // 2PC Execution Engine
  const run2PcSimulation = () => {
    setTwoPcStage('prepare');
    setTimeout(() => {
      if (nodeChattogramVote === 'YES') {
        setTwoPcStage('committed');
      } else {
        setTwoPcStage('aborted');
      }
    }, 1200);
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
              Lesson 16 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Distributed Databases &amp; DDBMS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
            Distributed Databases &amp; Distributed DBMS (DDBMS)
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Master the architecture powering hyperscale platforms like Google, banking networks, and Amazon: Centralized vs. Distributed systems, Homogeneous vs. Heterogeneous models, the 4 Distribution Transparencies, Data Fragmentation (Horizontal, Vertical, Hybrid), Replication, Allocation, Distributed Query Processing, Two-Phase Commit (2PC), and Brewer’s CAP Theorem.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-cyan-300/80">
            <div className="flex items-center gap-1.5">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>DDBMS Architecture</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Split className="w-4 h-4 text-emerald-400" />
              <span>Data Fragmentation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Two-Phase Commit (2PC)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>CAP Theorem in DDBMS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1 & 2: WHAT "DISTRIBUTED" MEANS & DISTRIBUTED DATABASE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 &amp; 2 of 23 • Core Concept
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What Does &quot;Distributed&quot; Mean?</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">The Core Definition</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Distributed</strong> means that data is spread across multiple physical locations, servers, or independent computers instead of being stored in a single monolithic box.
            </p>
            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 text-xs text-cyan-200 font-mono space-y-1">
              <div className="text-zinc-400 text-[10px] uppercase tracking-wider font-bold">Formal Definition:</div>
              <div>A <strong>Distributed Database</strong> is a collection of logically interrelated databases physically distributed over multiple sites interconnected by a computer network.</div>
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <h4 className="text-xs font-bold text-white font-mono uppercase">Key Architectural Pillars</h4>
              <ul className="space-y-1.5 text-zinc-300 font-sans list-disc pl-4">
                <li><strong className="text-cyan-300">Multiple Physical Locations:</strong> Servers located in Dhaka, Chattogram, and Sylhet.</li>
                <li><strong className="text-emerald-300">Network Interconnection:</strong> High-speed WAN/LAN connecting all participating nodes.</li>
                <li><strong className="text-purple-300">Single Logical View:</strong> Users query the database as if it were a single unified system.</li>
                <li><strong className="text-amber-300">Local Autonomy:</strong> Each site can process local queries independently without external dependency.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Multi-Branch Banking Scenario Card */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                  Real-World Scenario
                </span>
                <h3 className="text-sm font-bold text-white">Multi-Branch Nationwide Banking System</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                Live Topography
              </span>
            </div>

            {/* 3 Physical Branches */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <Server className="w-5 h-5 text-cyan-400 mx-auto" />
                <div className="font-bold text-white">Branch A</div>
                <div className="text-[10px] text-cyan-300">Dhaka Server</div>
                <div className="text-[10px] text-zinc-400 mt-1">Dhaka Accounts</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <Server className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="font-bold text-white">Branch B</div>
                <div className="text-[10px] text-emerald-300">Chattogram Server</div>
                <div className="text-[10px] text-zinc-400 mt-1">Ctg Accounts</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <Server className="w-5 h-5 text-purple-400 mx-auto" />
                <div className="font-bold text-white">Branch C</div>
                <div className="text-[10px] text-purple-300">Sylhet Server</div>
                <div className="text-[10px] text-zinc-400 mt-1">Sylhet Accounts</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs text-zinc-300 font-sans space-y-2">
              <div className="font-bold text-white font-mono flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Distributed Transaction Example:</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Customer Rahim in <strong>Dhaka</strong> transfers ৳5,000 to Karim in <strong>Chattogram</strong>. The distributed system automatically accesses Dhaka&apos;s server to deduct funds, accesses Chattogram&apos;s server to credit funds, and coordinates network commits transparently!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3 & 4: CENTRALIZED VS DISTRIBUTED DATABASE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
                Part 3 &amp; 4 of 23 • Crucial Exam Topic
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Centralized Database vs. Distributed Database</h2>
            </div>
          </div>

          {/* Architecture Switcher */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => {
                setArchMode('centralized');
                setNodeDhakaCrashed(false);
              }}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                archMode === 'centralized' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Centralized Model
            </button>
            <button
              onClick={() => {
                setArchMode('distributed');
                setNodeDhakaCrashed(false);
              }}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                archMode === 'distributed' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Distributed Model
            </button>
          </div>
        </div>

        {/* Dynamic Topology Visualizer */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-zinc-300 font-bold">
              Topology: {archMode === 'centralized' ? 'Single Centralized Server (SPOF Risk)' : 'Interconnected Autonomous Distributed Nodes'}
            </span>
            <button
              onClick={() => setNodeDhakaCrashed(!nodeDhakaCrashed)}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all border cursor-pointer ${
                nodeDhakaCrashed
                  ? 'bg-rose-950/40 text-rose-300 border-rose-500/50'
                  : 'bg-slate-900 hover:bg-slate-800 text-zinc-300 border-slate-800'
              }`}
            >
              {nodeDhakaCrashed ? 'Restore Crashed Node' : 'Simulate Dhaka Server Crash'}
            </button>
          </div>

          {archMode === 'centralized' ? (
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-black/40 border border-slate-800 flex flex-col items-center text-center space-y-3">
                <div className={`p-4 rounded-2xl border transition-all ${
                  nodeDhakaCrashed ? 'bg-rose-950/40 border-rose-500 text-rose-400' : 'bg-blue-950/30 border-blue-500/50 text-blue-400'
                }`}>
                  <Server className="w-10 h-10" />
                  <div className="text-xs font-bold mt-1 font-mono">Central Mainframe Database (Dhaka)</div>
                  <div className="text-[10px] text-zinc-400">{nodeDhakaCrashed ? 'OFFLINE (CRASHED)' : 'Single Point of Failure (SPOF)'}</div>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full max-w-lg pt-2 text-xs font-mono">
                  {['Dhaka User', 'Chattogram User', 'Sylhet User'].map((u, i) => (
                    <div key={i} className={`p-2.5 rounded-lg border ${
                      nodeDhakaCrashed ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' : 'bg-slate-900 border-slate-800 text-zinc-300'
                    }`}>
                      <Users className="w-4 h-4 mx-auto mb-1 text-zinc-400" />
                      <div>{u}</div>
                      <div className="text-[10px] font-bold mt-0.5">
                        {nodeDhakaCrashed ? '✕ ACCESS DENIED (Outage)' : '✓ Connected (WAN)'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-rose-300 font-sans leading-relaxed">
                {nodeDhakaCrashed && 'CRITICAL FAILURE: In a centralized system, when the central server crashes, 100% of the entire organization is immediately plunged into darkness!'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Node Dhaka */}
                <div className={`p-4 rounded-xl border space-y-2 text-center ${
                  nodeDhakaCrashed ? 'bg-rose-950/30 border-rose-500/50 text-rose-300' : 'bg-cyan-950/20 border-cyan-500/40'
                }`}>
                  <Server className="w-8 h-8 mx-auto text-cyan-400" />
                  <div className="text-xs font-bold font-mono">Dhaka Node (DDBMS)</div>
                  <div className="text-[10px] font-mono">
                    {nodeDhakaCrashed ? 'OFFLINE (Local Failure)' : '✓ Online (Autonomous)'}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-sans">Dhaka student &amp; banking records.</div>
                </div>

                {/* Node Chattogram */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 space-y-2 text-center">
                  <Server className="w-8 h-8 mx-auto text-emerald-400" />
                  <div className="text-xs font-bold font-mono text-emerald-300">Chattogram Node (DDBMS)</div>
                  <div className="text-[10px] font-mono text-emerald-400">✓ 100% Operational</div>
                  <div className="text-[11px] text-zinc-400 font-sans">Processes local queries without interruption.</div>
                </div>

                {/* Node Sylhet */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/40 space-y-2 text-center">
                  <Server className="w-8 h-8 mx-auto text-purple-400" />
                  <div className="text-xs font-bold font-mono text-purple-300">Sylhet Node (DDBMS)</div>
                  <div className="text-[10px] font-mono text-purple-400">✓ 100% Operational</div>
                  <div className="text-[11px] text-zinc-400 font-sans">Processes local queries without interruption.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-sans text-emerald-300">
                {nodeDhakaCrashed ? (
                  <span>
                    &check; <strong>Fault Tolerance Proven:</strong> While Dhaka is down, Chattogram and Sylhet continue operating normally with zero downtime for local customers!
                  </span>
                ) : (
                  <span>
                    &check; All distributed nodes operate autonomously and collaborate through the high-speed communication network.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Comparison Matrix Table */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">Centralized vs. Distributed Comparison Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Feature</th>
                    <th className="p-3 text-blue-400">Centralized Database</th>
                    <th className="p-3 text-cyan-400">Distributed Database</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Data Location</td>
                    <td className="p-3 text-zinc-300 font-sans">One single central physical server</td>
                    <td className="p-3 text-zinc-300 font-sans">Multiple physical locations / servers</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Availability</td>
                    <td className="p-3 text-rose-400 font-sans">Single point of failure (SPOF)</td>
                    <td className="p-3 text-emerald-400 font-sans">High availability; partial failures tolerated</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Communication Cost</td>
                    <td className="p-3 text-zinc-300 font-sans">High WAN traffic for remote users</td>
                    <td className="p-3 text-zinc-300 font-sans">Low local traffic via localized data allocation</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Complexity</td>
                    <td className="p-3 text-emerald-400 font-sans">Relatively simple architecture</td>
                    <td className="p-3 text-amber-400 font-sans">Complex (2PC, fragmentation, concurrency)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-zinc-400">Scalability</td>
                    <td className="p-3 text-zinc-300 font-sans">Vertical (upgrade single CPU/RAM)</td>
                    <td className="p-3 text-zinc-300 font-sans">Horizontal (add more nodes across regions)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: HOMOGENEOUS VS HETEROGENEOUS DDBMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Shuffle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                Part 5 of 23 • System Classification
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Homogeneous vs. Heterogeneous Distributed Databases</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setEngineType('homogeneous')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                engineType === 'homogeneous' ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Homogeneous (Same DBMS)
            </button>
            <button
              onClick={() => setEngineType('heterogeneous')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                engineType === 'heterogeneous' ? 'bg-amber-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Heterogeneous (Mixed DBMS)
            </button>
          </div>
        </div>

        {/* Dynamic Architecture Visualizer */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {engineType === 'homogeneous' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-purple-300 font-mono">Homogeneous DDBMS: Identical DBMS Engine at Every Site</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono">Same Dialect</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                All participating database servers run the <strong>exact same DBMS software</strong> (e.g. MySQL 8.0 at Dhaka, Chattogram, and Sylhet). They share identical data dictionaries, query languages, and transaction protocols.
              </p>
              <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-2 text-center">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">Dhaka Site</div>
                  <div className="text-cyan-400 font-bold mt-1">MySQL 8.0</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">Chattogram Site</div>
                  <div className="text-cyan-400 font-bold mt-1">MySQL 8.0</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">Sylhet Site</div>
                  <div className="text-cyan-400 font-bold mt-1">MySQL 8.0</div>
                </div>
              </div>
              <div className="p-3 rounded bg-black/40 border border-slate-800 text-[11px] text-zinc-300 font-sans">
                <strong className="text-emerald-400 font-mono">Key Advantage: </strong>
                Effortless query planning, native replication mechanisms, and standardized communication without translation middleware.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-300 font-mono">Heterogeneous DDBMS: Different DBMS Engines Federated via Gateways</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">Polyglot Engines</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Different sites employ <strong>different DBMS software and data models</strong> (e.g. Dhaka uses MySQL, Chattogram uses PostgreSQL, and Sylhet uses Oracle Database). Often created during corporate mergers or cross-department integrations.
              </p>
              <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-2 text-center">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">Dhaka Site</div>
                  <div className="text-cyan-400 font-bold mt-1">MySQL</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">Chattogram Site</div>
                  <div className="text-blue-400 font-bold mt-1">PostgreSQL</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="font-bold text-white">Sylhet Site</div>
                  <div className="text-rose-400 font-bold mt-1">Oracle DB</div>
                </div>
              </div>
              <div className="p-3 rounded bg-black/40 border border-slate-800 text-[11px] text-zinc-300 font-sans">
                <strong className="text-amber-400 font-mono">Key Challenge: </strong>
                Requires complex translation gateways and wrappers to resolve SQL dialect differences, data type incompatibilities, and conflicting concurrency algorithms.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 7: THE 4 DISTRIBUTION TRANSPARENCIES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 7 of 23 • Core Principles
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 4 Distribution Transparencies</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          <strong>Distribution Transparency</strong> means shielding users and application developers from the underlying complexities of physical data distribution, network partitioning, and multi-copy replication.
        </p>

        {/* 4 Interactive Transparency Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              id: 'location',
              title: '1. Location Transparency',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              bg: 'bg-cyan-950/20',
              hidden: 'Physical server IP / city location',
              sql: 'SELECT * FROM Students WHERE StudentID = 101;',
              desc: 'Users execute queries without knowing or specifying whether data is stored in Dhaka, Chattogram, or London.'
            },
            {
              id: 'fragmentation',
              title: '2. Fragmentation Transparency',
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              bg: 'bg-emerald-950/20',
              hidden: 'Division of table into row/col slices',
              sql: 'SELECT * FROM Students;',
              desc: 'Users interact with the logical table "Students" without knowing it is fragmented across 3 separate server nodes.'
            },
            {
              id: 'replication',
              title: '3. Replication Transparency',
              color: 'text-purple-400',
              border: 'border-purple-500/30',
              bg: 'bg-purple-950/20',
              hidden: 'Existence of duplicate copies',
              sql: 'UPDATE Students SET Department = "CSE";',
              desc: 'Users issue a single update command; the DDBMS automatically updates all 3 physical replica copies under the hood.'
            },
            {
              id: 'naming',
              title: '4. Naming Transparency',
              color: 'text-amber-400',
              border: 'border-amber-500/30',
              bg: 'bg-amber-950/20',
              hidden: 'Physical server path identifiers',
              sql: 'USE University; SELECT Name FROM Students;',
              desc: 'Objects possess a clean global name (e.g. Students) rather than server-qualified paths like server_dhaka.db_1.students.'
            }
          ].map(t => (
            <div
              key={t.id}
              onClick={() => setActiveTransparency(t.id as typeof activeTransparency)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                activeTransparency === t.id
                  ? `${t.border} ${t.bg} ring-1 ring-cyan-500/30 shadow-lg`
                  : 'bg-[#14182d] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`text-xs font-bold font-mono ${t.color}`}>{t.title}</div>
              <div className="p-2 rounded bg-black/40 border border-slate-800 text-[10px] font-mono text-zinc-300">
                <span className="text-zinc-500 block">Hides from User:</span>
                {t.hidden}
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 8: DATA FRAGMENTATION WORKBENCH
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Split className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                Part 8 of 23 • Essential University Exam Topic
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Data Fragmentation: Horizontal, Vertical &amp; Hybrid</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'horizontal', label: 'Horizontal (Rows)' },
              { id: 'vertical', label: 'Vertical (Columns)' },
              { id: 'hybrid', label: 'Hybrid (Mixed)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFragmentationType(f.id as typeof fragmentationType)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  fragmentationType === f.id ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master Students Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Original Global Table: <strong>Students</strong> (4 Rows &times; 4 Columns)</span>
            <span className="text-cyan-400 font-bold">Primary Key: StudentID</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-zinc-300 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">StudentID (PK)</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Department</th>
                  <th className="p-2.5">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                <tr><td className="p-2.5 font-bold text-cyan-300">101</td><td className="p-2.5">Rahim</td><td className="p-2.5">CSE</td><td className="p-2.5">Dhaka</td></tr>
                <tr><td className="p-2.5 font-bold text-cyan-300">102</td><td className="p-2.5">Karim</td><td className="p-2.5">BBA</td><td className="p-2.5">Chattogram</td></tr>
                <tr><td className="p-2.5 font-bold text-cyan-300">103</td><td className="p-2.5">Hasan</td><td className="p-2.5">EEE</td><td className="p-2.5">Dhaka</td></tr>
                <tr><td className="p-2.5 font-bold text-cyan-300">104</td><td className="p-2.5">Nabil</td><td className="p-2.5">CSE</td><td className="p-2.5">Sylhet</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Fragmentation Output */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {fragmentationType === 'horizontal' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400 font-mono">Horizontal Fragmentation: Partition by Row Tuples</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono">Same Columns, Different Rows</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Divides the table into subsets of rows using selection predicates (<code>WHERE City = &apos;Dhaka&apos;</code>). All columns are retained in each fragment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 font-bold">Fragment 1: Dhaka Campus (City = &apos;Dhaka&apos;)</div>
                  <table className="w-full text-left border border-slate-800 rounded">
                    <thead className="bg-black/40 text-[10px] text-zinc-400 border-b border-slate-800">
                      <tr><th className="p-1.5">ID</th><th className="p-1.5">Name</th><th className="p-1.5">Dept</th><th className="p-1.5">City</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-[11px]">
                      <tr><td className="p-1.5 text-cyan-300">101</td><td className="p-1.5">Rahim</td><td className="p-1.5">CSE</td><td className="p-1.5">Dhaka</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">103</td><td className="p-1.5">Hasan</td><td className="p-1.5">EEE</td><td className="p-1.5">Dhaka</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold">Fragment 2: Regional Campus (City != &apos;Dhaka&apos;)</div>
                  <table className="w-full text-left border border-slate-800 rounded">
                    <thead className="bg-black/40 text-[10px] text-zinc-400 border-b border-slate-800">
                      <tr><th className="p-1.5">ID</th><th className="p-1.5">Name</th><th className="p-1.5">Dept</th><th className="p-1.5">City</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-[11px]">
                      <tr><td className="p-1.5 text-cyan-300">102</td><td className="p-1.5">Karim</td><td className="p-1.5">BBA</td><td className="p-1.5">Chattogram</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">104</td><td className="p-1.5">Nabil</td><td className="p-1.5">CSE</td><td className="p-1.5">Sylhet</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {fragmentationType === 'vertical' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-purple-400 font-mono">Vertical Fragmentation: Partition by Attribute Columns</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono">Same Rows, Different Columns</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Divides the table into subsets of columns using projection. <strong>CRITICAL RULE:</strong> The primary key (<code>StudentID</code>) MUST be duplicated in every fragment so the original table can be reconstructed via a natural join!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-purple-400 font-bold">Fragment A: Personal Profile</div>
                  <table className="w-full text-left border border-slate-800 rounded">
                    <thead className="bg-black/40 text-[10px] text-zinc-400 border-b border-slate-800">
                      <tr><th className="p-1.5">StudentID (PK)</th><th className="p-1.5">Name</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-[11px]">
                      <tr><td className="p-1.5 text-cyan-300">101</td><td className="p-1.5">Rahim</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">102</td><td className="p-1.5">Karim</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">103</td><td className="p-1.5">Hasan</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">104</td><td className="p-1.5">Nabil</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 font-bold">Fragment B: Academic &amp; Location Record</div>
                  <table className="w-full text-left border border-slate-800 rounded">
                    <thead className="bg-black/40 text-[10px] text-zinc-400 border-b border-slate-800">
                      <tr><th className="p-1.5">StudentID (PK)</th><th className="p-1.5">Department</th><th className="p-1.5">City</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-[11px]">
                      <tr><td className="p-1.5 text-cyan-300">101</td><td className="p-1.5">CSE</td><td className="p-1.5">Dhaka</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">102</td><td className="p-1.5">BBA</td><td className="p-1.5">Chattogram</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">103</td><td className="p-1.5">EEE</td><td className="p-1.5">Dhaka</td></tr>
                      <tr><td className="p-1.5 text-cyan-300">104</td><td className="p-1.5">CSE</td><td className="p-1.5">Sylhet</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {fragmentationType === 'hybrid' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400 font-mono">Hybrid (Mixed) Fragmentation: 2-Tier Partitioning</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">Rows + Columns Combined</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Combines horizontal and vertical partitioning. For instance, first slicing horizontally by campus city (Dhaka vs. Regional), and then slicing each horizontal fragment vertically (Personal Name vs. Departmental Info).
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-emerald-400 font-bold">&bull; Step 1: Horizontal Partition &rarr; Students_Dhaka (Rows 101, 103)</div>
                <div className="text-purple-400 font-bold">&bull; Step 2: Vertical Partition on Students_Dhaka &rarr; Fragment D1 (StudentID, Name) &amp; Fragment D2 (StudentID, Department)</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 12: DISTRIBUTED TRANSACTIONS & TWO-PHASE COMMIT (2PC)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 12 of 23 • Concurrency &amp; ACID
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Two-Phase Commit Protocol (2PC) Simulator</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          When a transaction spans multiple physical database servers (e.g. transferring ৳5,000 from Rahim in Dhaka to Karim in Chattogram), atomic consistency requires all nodes to commit together or abort together. The <strong>Two-Phase Commit (2PC)</strong> protocol coordinates this via a <strong>Prepare Phase</strong> followed by a <strong>Commit/Abort Phase</strong>.
        </p>

        {/* 2PC Interactive State Machine */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Transaction Simulation
              </span>
              <h3 className="text-sm font-bold text-white">Inter-Branch Transfer: ৳5,000 from Dhaka to Chattogram</h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Node 2 Vote:</span>
              <button
                onClick={() => setNodeChattogramVote(nodeChattogramVote === 'YES' ? 'NO' : 'YES')}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all border cursor-pointer ${
                  nodeChattogramVote === 'YES'
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50'
                    : 'bg-rose-950/40 text-rose-300 border-rose-500/50'
                }`}
              >
                {nodeChattogramVote === 'YES' ? '✓ Vote YES (Healthy)' : '✕ Vote NO (Disk Full / Deadlock)'}
              </button>
            </div>
          </div>

          {/* Stepper Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs font-mono">
            {/* Coordinator */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <Building2 className="w-5 h-5 text-cyan-400 mx-auto" />
              <div className="font-bold text-white">Transaction Coordinator</div>
              <div className="text-[10px] text-cyan-300">Global DDBMS Engine</div>
              <div className="text-[10px] text-zinc-400 mt-1">
                Phase: <strong className="text-white uppercase">{twoPcStage}</strong>
              </div>
            </div>

            {/* Participant 1: Dhaka */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <Server className="w-5 h-5 text-emerald-400 mx-auto" />
              <div className="font-bold text-white">Participant 1: Dhaka</div>
              <div className="text-[10px] text-emerald-300">Debit Rahim ৳5,000</div>
              <div className="text-[10px] font-bold text-emerald-400 mt-1">
                Vote: YES (Ready to commit)
              </div>
            </div>

            {/* Participant 2: Chattogram */}
            <div className={`p-3.5 rounded-xl border space-y-1 ${
              nodeChattogramVote === 'YES' ? 'bg-slate-900 border-slate-800' : 'bg-rose-950/20 border-rose-500/40'
            }`}>
              <Server className={`w-5 h-5 mx-auto ${nodeChattogramVote === 'YES' ? 'text-purple-400' : 'text-rose-400'}`} />
              <div className="font-bold text-white">Participant 2: Chattogram</div>
              <div className="text-[10px] text-purple-300">Credit Karim ৳5,000</div>
              <div className={`text-[10px] font-bold mt-1 ${nodeChattogramVote === 'YES' ? 'text-emerald-400' : 'text-rose-400'}`}>
                Vote: {nodeChattogramVote} {nodeChattogramVote === 'NO' && '(Simulated Failure)'}
              </div>
            </div>
          </div>

          {/* Trigger Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={run2PcSimulation}
              disabled={twoPcStage === 'prepare'}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-lg shadow-cyan-600/20"
            >
              {twoPcStage === 'prepare' ? 'Broadcasting PREPARE to Participants...' : 'Execute Distributed Transaction (2PC)'}
            </button>

            {twoPcStage !== 'idle' && (
              <button
                onClick={() => setTwoPcStage('idle')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 font-mono text-xs cursor-pointer"
              >
                Reset Simulator
              </button>
            )}
          </div>

          {/* Result Output */}
          {twoPcStage === 'committed' && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-mono leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>GLOBAL COMMIT DECISION: SUCCESS</span>
              </div>
              <p className="font-sans text-[11px]">
                Both participants (Dhaka and Chattogram) returned &quot;YES&quot; in Phase 1 (Prepare). The coordinator issued a <code>GLOBAL_COMMIT</code> instruction. Rahim&apos;s account was debited ৳5,000 and Karim&apos;s account was credited ৳5,000 simultaneously. ACID atomicity maintained!
              </p>
            </div>
          )}

          {twoPcStage === 'aborted' && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs font-mono leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>GLOBAL ABORT DECISION: TRANSACTION CANCELLED</span>
              </div>
              <p className="font-sans text-[11px]">
                Participant 2 (Chattogram) voted &quot;NO&quot; due to a simulated local failure. The coordinator immediately issued a <code>GLOBAL_ABORT</code> instruction. Participant 1 rolled back Rahim&apos;s debit. Zero money was lost! Atomicity preserved.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 14: BREWER'S CAP THEOREM IN DDBMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 14 of 23 • Distributed Law
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Brewer’s CAP Theorem in Distributed Databases</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Brewer’s CAP theorem proves that in any asynchronous network susceptible to partitions ($P$), a distributed database system can guarantee at most <strong>two out of three</strong> properties: <strong>Consistency (C)</strong>, <strong>Availability (A)</strong>, and <strong>Partition Tolerance (P)</strong>. Since network disconnections are physically unavoidable, systems must choose between <strong>CP</strong> and <strong>AP</strong> when a split occurs.
        </p>

        {/* Interactive CAP Simulator */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase">Network Partition Concurrency Race</span>
            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
              <button
                onClick={() => {
                  setCapSystemChoice('CP');
                  setCapResultText(null);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  capSystemChoice === 'CP' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                CP System (e.g. MongoDB / CockroachDB)
              </button>
              <button
                onClick={() => {
                  setCapSystemChoice('AP');
                  setCapResultText(null);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  capSystemChoice === 'AP' ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                AP System (e.g. Cassandra / DynamoDB)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-cyan-400 font-bold">Node A (Dhaka Datacenter)</div>
              <div className="text-zinc-300 font-sans">Customer Rahim withdraws ৳5,000 from ৳20,000 balance.</div>
              <div className="text-emerald-400 font-bold mt-1">Status: Update processed locally (Balance: ৳15,000)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
              <div className="text-rose-400 font-bold">Node B (Chattogram Datacenter) [Partitioned]</div>
              <div className="text-zinc-300 font-sans">Customer Karim tries to check balance from Chattogram.</div>
              <div className="text-rose-300 font-bold mt-1">Network link to Dhaka is DISCONNECTED!</div>
            </div>
          </div>

          <button
            onClick={() => {
              if (capSystemChoice === 'CP') {
                setCapResultText(
                  'CP CHOICE: Node B refuses to serve Karim\'s read request with error: [503 Service Unavailable / Majority Quorum Unreachable]. System protects STRICT CONSISTENCY by preventing Karim from seeing stale data, sacrificing 100% availability.'
                );
              } else {
                setCapResultText(
                  'AP CHOICE: Node B returns Karim\'s read request immediately (showing ৳20,000). System guarantees 100% AVAILABILITY, but Karim temporarily sees stale data until the network partition heals and synchronization converges (Eventual Consistency).'
                );
              }
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow"
          >
            Simulate Query Resolution during Network Partition
          </button>

          {capResultText && (
            <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
              capSystemChoice === 'CP'
                ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200'
                : 'bg-purple-950/40 border-purple-500/40 text-purple-200'
            }`}>
              {capResultText}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 17 & 18: REAL-WORLD APPLICATIONS & CLOUD COMPARISON
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 17 &amp; 18 of 23 • Industry Landscape
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Real-World Industry Applications &amp; Cloud Comparison</h2>
          </div>
        </div>

        {/* 5 Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { title: 'Banking Networks', icon: Building2, color: 'text-cyan-400', desc: 'Synchronizes ledger balances across international branch offices using 2PC and multi-region replication.' },
            { title: 'Global E-Commerce', icon: ShoppingCart, color: 'text-emerald-400', desc: 'Distributes product catalogs and shopping cart sessions across geographic edge datacenters.' },
            { title: 'Airline Reservations', icon: Plane, color: 'text-purple-400', desc: 'Coordinates seat availability across thousands of travel agents without double-booking.' },
            { title: 'Healthcare Networks', icon: HeartPulse, color: 'text-rose-400', desc: 'Allows hospital emergency rooms to query patient medical history from regional clinics.' },
            { title: 'Social Platforms', icon: Users, color: 'text-amber-400', desc: 'Distributes follower graphs and timelines across global regions using eventual consistency.' }
          ].map((app, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
              <app.icon className={`w-5 h-5 ${app.color}`} />
              <div className="text-xs font-bold font-mono text-white">{app.title}</div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{app.desc}</p>
            </div>
          ))}
        </div>

        {/* Distributed DB vs Cloud DB Table */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">Distributed Database vs. Cloud Database</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                <tr>
                  <th className="p-3">Attribute</th>
                  <th className="p-3 text-cyan-400">Distributed Database</th>
                  <th className="p-3 text-purple-400">Cloud Database</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                <tr>
                  <td className="p-3 font-bold text-zinc-400">Core Focus</td>
                  <td className="p-3 text-zinc-300 font-sans">How data is stored and coordinated across multiple locations</td>
                  <td className="p-3 text-zinc-300 font-sans">Where and how the database is hosted (cloud provider infrastructure)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-400">Hosting Options</td>
                  <td className="p-3 text-zinc-300 font-sans">Can run on on-premise hardware, private networks, or cloud</td>
                  <td className="p-3 text-zinc-300 font-sans">Operates exclusively on cloud infrastructure (AWS, GCP, Azure)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-400">Key Takeaway</td>
                  <td className="p-3 text-emerald-400 font-mono text-[11px]" colSpan={2}>
                    &check; A cloud database can be distributed (e.g. Google Cloud Spanner, AWS Aurora), but not every cloud database is distributed!
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 20: UNIVERSITY EXAMINATION PREPARATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 20 of 23 • University Exam Prep
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
                q: 'Q1: What is a distributed database and DDBMS?',
                a: 'A distributed database is a collection of logically related data physically stored across multiple interconnected computers on a network. A DDBMS is the software that manages this distributed storage and transparently coordinates access, queries, transactions, and replication.'
              },
              {
                id: 'sq2',
                q: 'Q2: Differentiate between Homogeneous and Heterogeneous DDBMS.',
                a: '• Homogeneous: All sites use the same DBMS software (e.g. all MySQL) and data models, enabling easy coordination.\n• Heterogeneous: Different sites use different DBMS software (e.g. MySQL, PostgreSQL, Oracle), requiring gateways and query translation.'
              },
              {
                id: 'sq3',
                q: 'Q3: What is data fragmentation? Name its three types.',
                a: 'Data fragmentation is dividing a database table into smaller subsets called fragments. The three types are:\n1. Horizontal Fragmentation (divides by rows)\n2. Vertical Fragmentation (divides by columns, keeping primary key)\n3. Hybrid/Mixed Fragmentation (combines row and column partitioning)'
              },
              {
                id: 'sq4',
                q: 'Q4: What is data replication? What is the difference between Full and Partial replication?',
                a: 'Data replication is maintaining copies of data at multiple locations. In Full Replication, the entire database is copied to all sites. In Partial Replication, only selected frequently accessed tables or fragments are replicated.'
              },
              {
                id: 'sq5',
                q: 'Q5: Explain the Two-Phase Commit (2PC) protocol.',
                a: '2PC ensures atomic distributed transactions across multiple nodes:\n• Phase 1 (Prepare): Coordinator asks all nodes if they are ready to commit. Nodes vote YES or NO.\n• Phase 2 (Commit/Abort): If all vote YES, coordinator commands GLOBAL COMMIT; if any node votes NO, coordinator commands GLOBAL ABORT.'
              },
              {
                id: 'sq6',
                q: 'Q6: What is the CAP Theorem?',
                a: 'Brewer\'s CAP Theorem states that during a network partition (P), a distributed database must choose between Consistency (C) and Availability (A). It cannot guarantee both simultaneously under network partition failures.'
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
                q: 'Q1: Describe the 4 types of Distribution Transparency with examples.',
                a: '1. Location Transparency: Hides physical storage location. Query: SELECT * FROM Students works regardless of whether records are in Dhaka or Sylhet.\n2. Fragmentation Transparency: Hides table division. Users query "Students" as one logical table, unaware that rows or columns are split.\n3. Replication Transparency: Hides multiple copies. User updates a record, and the DDBMS synchronizes all physical replicas automatically.\n4. Naming Transparency: Provides uniform global identifiers without site prefixes like server1.db.students.'
              },
              {
                id: 'bq2',
                q: 'Q2: Explain Horizontal, Vertical, and Hybrid fragmentation with mathematical rules.',
                a: '• Horizontal: Uses relational selection (sigma). Rule: Reconstruction via UNION (F1 U F2 U ... = Table). Disjointness: Fi intersect Fj = empty.\n• Vertical: Uses relational projection (pi). Rule: Primary key must be included in all fragments. Reconstruction via NATURAL JOIN (F1 JOIN F2 = Table).\n• Hybrid: Combines horizontal and vertical partitioning in nested order.'
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
          PART 21: INTERACTIVE PRACTICE EXERCISES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 21 of 23 • Practice Lab
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Interactive Practice Exercises (Solve &amp; Check)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {[
            {
              id: 1,
              title: 'Exercise 1: Identify Fragmentation Type',
              scenario: 'A university divides its Students table into Dhaka students, Chattogram students, and Sylhet students.',
              answer: 'Horizontal Fragmentation (dividing records/rows by location while retaining all columns).'
            },
            {
              id: 2,
              title: 'Exercise 2: Identify Fragmentation Type',
              scenario: 'A Students table is divided into: Fragment A (StudentID, Name, Dept) and Fragment B (StudentID, Address, Phone).',
              answer: 'Vertical Fragmentation (dividing columns while repeating the primary key StudentID).'
            },
            {
              id: 3,
              title: 'Exercise 3: Identify Replication Type',
              scenario: 'A bank stores a complete byte-for-byte copy of its entire customer database on 3 different servers across Bangladesh.',
              answer: 'Full Replication (100% of the database duplicated across all sites).'
            },
            {
              id: 4,
              title: 'Exercise 4: Distributed Transaction Coordination',
              scenario: 'A customer transfers ৳10,000 between branches. Dhaka is debited, but the network crashes before Chattogram credits.',
              answer: 'Two-Phase Commit (2PC) coordinates the rollback so neither party loses money.'
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
          PART 22: INTERACTIVE KNOWLEDGE TEST (10 QUESTIONS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 22 of 23 • University Assessment
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 16 Knowledge Test (10 Questions · 10 Marks)</h2>
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
                {quizScore >= 8 ? 'Mastery demonstrated! Ready for advanced database systems.' : quizScore >= 6 ? 'Good performance! Review incorrect questions above.' : 'Keep studying! Re-read the fragmentation and 2PC sections.'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 23: REVISION CHECKLIST & NAVIGATION BRIDGE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 23 of 23 • Final Review
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 16 Final Revision Checklist (16 Topics)</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Distributed Databases &amp; DDBMS Mastery</span>
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
            'What "Distributed" means across multiple locations',
            'Definition and core components of a DDBMS',
            'Centralized vs Distributed database comparison',
            'Homogeneous (same DBMS) architectures',
            'Heterogeneous (mixed DBMS) architectures',
            'Location and Fragmentation distribution transparency',
            'Replication and Naming distribution transparency',
            'Horizontal fragmentation (row-level partitioning)',
            'Vertical fragmentation (column-level with primary key)',
            'Hybrid (mixed) fragmentation multi-step rules',
            'Full vs Partial vs No replication trade-offs',
            'Data allocation factors and network traffic reduction',
            'Distributed query processing and optimization plans',
            'Two-Phase Commit (2PC) Prepare & Commit phases',
            'Strong vs Eventual consistency synchronization',
            'Brewer\'s CAP Theorem during network partitions'
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
            Lesson 16 Complete &rarr; Ready for Architecture Roadmap &amp; AI Vector Engineering?
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            You have now mastered all 16 core DBMS lessons covering relational models, transactions, concurrency, NoSQL, security, database administration, and distributed DDBMS systems! Proceed to the end-to-end Database Architecture Roadmap or prepare for Lesson 17: Data Warehousing &amp; OLAP.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson15')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 15: Database Administration</span>
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
