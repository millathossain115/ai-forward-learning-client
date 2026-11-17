'use client';

import React, { useState, useMemo } from 'react';
import {
  Boxes,
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
  Radio,
  Zap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  HardDrive,
  Server,
  Globe,
  Network,
  Braces,
  Hash,
  Sliders
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson13TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 MCQ Questions for Lesson 13
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
    question: 'What does NoSQL stand for?',
    options: [
      { key: 'A', text: 'No Structured Query Language' },
      { key: 'B', text: 'Not Only SQL' },
      { key: 'C', text: 'New SQL' },
      { key: 'D', text: 'Network SQL' }
    ],
    correct: 'B',
    explanation: 'NoSQL stands for "Not Only SQL", emphasizing that it supports non-relational data structures in addition to or instead of traditional relational SQL tables.'
  },
  {
    id: 2,
    question: 'Which database type stores data in JSON-like documents?',
    options: [
      { key: 'A', text: 'Graph' },
      { key: 'B', text: 'Key-Value' },
      { key: 'C', text: 'Document' },
      { key: 'D', text: 'Column-Family' }
    ],
    correct: 'C',
    explanation: 'Document databases (like MongoDB and CouchDB) store data in semi-structured JSON or BSON documents with flexible, dynamic schemas.'
  },
  {
    id: 3,
    question: 'Which of these is a key-value database?',
    options: [
      { key: 'A', text: 'Neo4j' },
      { key: 'B', text: 'Redis' },
      { key: 'C', text: 'MongoDB' },
      { key: 'D', text: 'PostgreSQL' }
    ],
    correct: 'B',
    explanation: 'Redis is an in-memory key-value data store used widely for ultra-low latency caching, session state management, and pub/sub queues.'
  },
  {
    id: 4,
    question: 'Which database uses nodes and edges?',
    options: [
      { key: 'A', text: 'Document' },
      { key: 'B', text: 'Graph' },
      { key: 'C', text: 'Relational' },
      { key: 'D', text: 'Key-Value' }
    ],
    correct: 'B',
    explanation: 'Graph databases (like Neo4j) use nodes (entities), edges (relationships), and properties to store and query interconnected network structures.'
  },
  {
    id: 5,
    question: 'What does BSON mean?',
    options: [
      { key: 'A', text: 'Binary JSON' },
      { key: 'B', text: 'Basic SQL Object Notation' },
      { key: 'C', text: 'Binary Structured Object Network' },
      { key: 'D', text: 'Base System Object Name' }
    ],
    correct: 'A',
    explanation: 'BSON stands for Binary JSON, a binary-encoded serialization format used by MongoDB to store documents and make remote procedure calls.'
  },
  {
    id: 6,
    question: 'What does CRUD represent?',
    options: [
      { key: 'A', text: 'Create, Read, Update, Delete' },
      { key: 'B', text: 'Copy, Run, Undo, Delete' },
      { key: 'C', text: 'Create, Remove, Use, Download' },
      { key: 'D', text: 'Connect, Read, Update, Develop' }
    ],
    correct: 'A',
    explanation: 'CRUD represents the four fundamental persistent storage operations: Create (insert), Read (find), Update (modify), and Delete (remove).'
  },
  {
    id: 7,
    question: 'What is horizontal scaling?',
    options: [
      { key: 'A', text: 'Increasing RAM on one server' },
      { key: 'B', text: 'Adding more servers' },
      { key: 'C', text: 'Deleting database records' },
      { key: 'D', text: 'Reducing storage' }
    ],
    correct: 'B',
    explanation: 'Horizontal scaling (scaling out) increases capacity by adding more server machines to a distributed cluster rather than upgrading a single server.'
  },
  {
    id: 8,
    question: 'What is sharding?',
    options: [
      { key: 'A', text: 'Creating database backups' },
      { key: 'B', text: 'Dividing data across multiple servers' },
      { key: 'C', text: 'Encrypting all records' },
      { key: 'D', text: 'Deleting duplicate rows' }
    ],
    correct: 'B',
    explanation: 'Sharding is a database architecture pattern where a large dataset is partitioned into smaller subsets (shards) distributed across multiple servers.'
  },
  {
    id: 9,
    question: 'Which is a column-family database?',
    options: [
      { key: 'A', text: 'MongoDB' },
      { key: 'B', text: 'Redis' },
      { key: 'C', text: 'Apache Cassandra' },
      { key: 'D', text: 'Neo4j' }
    ],
    correct: 'C',
    explanation: 'Apache Cassandra and Apache HBase are wide-column / column-family stores that organize data into dynamic column families indexed by row keys.'
  },
  {
    id: 10,
    question: 'Which database is especially designed for relationship-focused data?',
    options: [
      { key: 'A', text: 'Neo4j' },
      { key: 'B', text: 'Redis' },
      { key: 'C', text: 'MongoDB' },
      { key: 'D', text: 'InfluxDB' }
    ],
    correct: 'A',
    explanation: 'Neo4j is specifically engineered for densely interconnected data like social graphs, fraud detection rings, and recommendation engines.'
  }
];

export default function DatabaseLesson13Topic({ onNavigate }: DatabaseLesson13TopicProps) {
  // 1. Schema Flexibility Paradigm Toggle: Relational Table vs NoSQL Document
  const [schemaMode, setSchemaMode] = useState<'relational' | 'document'>('document');

  // 2. 4 NoSQL Types Interactive Playground Active Tab
  const [activeNoSqlType, setActiveNoSqlType] = useState<'document' | 'keyvalue' | 'column' | 'graph'>('document');

  // Key-Value Simulator State
  const [kvStore, setKvStore] = useState<Record<string, string>>({
    'user_101': 'Rahim (Dhaka)',
    'user_102': 'Karim (Sylhet)',
    'cart_session_99': '3 Items [Laptop, Mouse, Bag]',
    'auth_token_xyz': 'Valid (Expires 1h)'
  });
  const [kvSearchKey, setKvSearchKey] = useState<string>('user_101');
  const [kvNewKey, setKvNewKey] = useState<string>('user_105');
  const [kvNewVal, setKvNewVal] = useState<string>('Rafi (Chittagong)');

  // 3. MongoDB Interactive CRUD Shell State
  const [mongoStudents, setMongoStudents] = useState<Array<{ id: number; name: string; age: number; dept: string; skills: string[] }>>([
    { id: 101, name: 'Rahim', age: 22, dept: 'CSE', skills: ['Java', 'Python', 'SQL'] },
    { id: 102, name: 'Karim', age: 25, dept: 'EEE', skills: ['C++', 'MATLAB'] },
    { id: 103, name: 'Hasan', age: 23, dept: 'CSE', skills: ['React', 'Node.js', 'MongoDB'] }
  ]);
  const [mongoLastAction, setMongoLastAction] = useState<string>('db.students.find() executed. 3 documents loaded.');

  // 4. Sharding Router Interactive Simulator State
  const [testCustomerId, setTestCustomerId] = useState<number>(642100);

  // 5. Scaling Strategy Toggle: Vertical vs Horizontal
  const [scaleStrategy, setScaleStrategy] = useState<'vertical' | 'horizontal'>('horizontal');
  const [nodeCount, setNodeCount] = useState<number>(4);

  // 6. CAP Theorem Simulator State
  const [capPartition, setCapPartition] = useState<boolean>(true);
  const [capMode, setCapMode] = useState<'CP' | 'AP'>('CP');
  const [capSimulationResult, setCapSimulationResult] = useState<string | null>(null);

  // 7. Pro/Con Filter State
  const [proConFilter, setProConFilter] = useState<'all' | 'pros' | 'cons'>('all');

  // 8. Real-world Case Study Active Tab
  const [activeCaseStudy, setActiveCaseStudy] = useState<'social' | 'ecommerce' | 'streaming' | 'iot' | 'fraud'>('ecommerce');

  // 9. MCQ Assessment State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // 10. Exam Questions Accordion
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // 11. Revision Checklist
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

  // Checklist completion calculation
  const checklistTotal = 16;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  // Key-Value Simulator Actions
  const handleKvSet = () => {
    if (!kvNewKey.trim()) return;
    setKvStore(prev => ({ ...prev, [kvNewKey.trim()]: kvNewVal.trim() }));
    setKvSearchKey(kvNewKey.trim());
  };

  // Mongo CRUD simulator actions
  const runMongoInsert = () => {
    const nextId = mongoStudents.length > 0 ? Math.max(...mongoStudents.map(s => s.id)) + 1 : 101;
    const names = ['Rafi', 'Tanvir', 'Anika', 'Mehedi', 'Sadia'];
    const chosenName = names[Math.floor(Math.random() * names.length)];
    const newDoc = { id: nextId, name: chosenName, age: 21 + (nextId % 4), dept: 'CSE', skills: ['Python', 'Docker'] };
    setMongoStudents(prev => [...prev, newDoc]);
    setMongoLastAction(`db.students.insertOne({ name: "${chosenName}", age: ${newDoc.age}, dept: "CSE" }) -> Generated _id: ObjectId("${nextId}a89c")`);
  };

  const runMongoUpdate = () => {
    if (mongoStudents.length === 0) return;
    setMongoStudents(prev => prev.map(s => s.name === 'Rahim' ? { ...s, age: s.age + 1 } : s));
    setMongoLastAction('db.students.updateOne({ name: "Rahim" }, { $inc: { age: 1 } }) -> 1 document updated.');
  };

  const runMongoDelete = () => {
    if (mongoStudents.length === 0) return;
    const last = mongoStudents[mongoStudents.length - 1];
    setMongoStudents(prev => prev.slice(0, prev.length - 1));
    setMongoLastAction(`db.students.deleteOne({ id: ${last.id} }) -> Deleted student ${last.name}.`);
  };

  // Calculate target shard based on customer ID
  const shardTarget = useMemo(() => {
    const id = Number(testCustomerId);
    if (isNaN(id) || id <= 0) return { shard: 1, range: '1 – 250,000', server: 'Server 1 (US-East)' };
    if (id <= 250000) return { shard: 1, range: '1 – 250,000', server: 'Server 1 (US-East)' };
    if (id <= 500000) return { shard: 2, range: '250,001 – 500,000', server: 'Server 2 (EU-West)' };
    if (id <= 750000) return { shard: 3, range: '500,001 – 750,000', server: 'Server 3 (AP-South)' };
    return { shard: 4, range: '750,001 – 1,000,000+', server: 'Server 4 (SA-East)' };
  }, [testCustomerId]);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06142e] via-[#0b1c42] to-[#040817] border border-cyan-800/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 13 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              NoSQL &amp; Modern Systems
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 13: NoSQL Databases <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-indigo-300 bg-clip-text text-transparent">
              &amp; Modern Database Architectures
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Understand how hyperscale platforms handle petabytes of semi-structured data: Relational SQL vs NoSQL, the 4 NoSQL archetypes (Document, Key-Value, Wide-Column, Graph), MongoDB BSON documents &amp; CRUD operations, Horizontal Sharding, Vertical vs Horizontal scaling, and the modern multi-model landscape (PostgreSQL JSONB, Redis, Cassandra, Neo4j, pgvector).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Boxes className="w-4 h-4 text-cyan-400" />
              <span>4 NoSQL Models</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Braces className="w-4 h-4 text-emerald-400" />
              <span>MongoDB BSON &amp; CRUD</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Split className="w-4 h-4 text-amber-400" />
              <span>Database Sharding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" />
              <span>Horizontal Scaling</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1 & 2: WHAT IS NOSQL & WHY DO WE NEED IT?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 &amp; 2 of 16
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is NoSQL &amp; Why Do We Need It?</h2>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <p>
            <strong>NoSQL</strong> stands for <strong>&ldquo;Not Only SQL&rdquo;</strong>. It refers to a modern category of non-relational database management systems designed to store, query, and process unstructured or semi-structured data across distributed commodity servers with flexible schemas and massive write throughput.
          </p>
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 font-mono text-cyan-200">
            &ldquo;Traditional relational databases require fixed predefined schemas. NoSQL provides schema flexibility where each record can contain different attributes without costly schema migrations!&rdquo;
          </div>
        </div>

        {/* Real-World Scenario: Social Media User Records */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                Schema Flexibility Demonstration: Rahim vs. Karim
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Notice how User 2 has extra fields (Education, Location) that User 1 does not possess.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSchemaMode('relational')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  schemaMode === 'relational' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Relational (Rigid Table)
              </button>
              <button
                onClick={() => setSchemaMode('document')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  schemaMode === 'document' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                NoSQL (Flexible Document)
              </button>
            </div>
          </div>

          {/* Interactive Schema Visualizer */}
          {schemaMode === 'relational' ? (
            <div className="p-4 bg-black/60 rounded-xl border border-indigo-500/30 space-y-3">
              <div className="text-xs font-mono text-indigo-300 font-bold">
                Relational Table: Requires Predefined Columns &bull; Forces Sparse NULL Values
              </div>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-zinc-300 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">User_ID</th>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Age</th>
                      <th className="p-2.5">Email</th>
                      <th className="p-2.5">Hobbies</th>
                      <th className="p-2.5 text-amber-300">Education</th>
                      <th className="p-2.5 text-amber-300">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#0d1020] text-zinc-300">
                    <tr>
                      <td className="p-2.5">1</td>
                      <td className="p-2.5 text-white">Rahim</td>
                      <td className="p-2.5">22</td>
                      <td className="p-2.5 text-cyan-300">rahim@gmail.com</td>
                      <td className="p-2.5">Reading, Football</td>
                      <td className="p-2.5 text-rose-400 italic">NULL</td>
                      <td className="p-2.5 text-rose-400 italic">NULL</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">2</td>
                      <td className="p-2.5 text-white">Karim</td>
                      <td className="p-2.5">25</td>
                      <td className="p-2.5 text-cyan-300">karim@gmail.com</td>
                      <td className="p-2.5">Cricket</td>
                      <td className="p-2.5 text-emerald-300">Graduate</td>
                      <td className="p-2.5 text-emerald-300">Dhaka</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-2 bg-indigo-950/40 rounded text-[11px] font-sans text-indigo-200">
                Notice: Adding new fields for a subset of users requires altering table schema and wastes storage on empty <code className="text-rose-400 font-mono">NULL</code> columns.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Document 1: Rahim</span>
                <pre className="p-3 bg-slate-900 rounded text-xs font-mono text-cyan-300 overflow-x-auto">
{`{
  "_id": 101,
  "name": "Rahim",
  "age": 22,
  "email": "rahim@gmail.com",
  "hobbies": ["Reading", "Football"]
}`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Document 2: Karim (Has Extra Attributes)</span>
                <pre className="p-3 bg-slate-900 rounded text-xs font-mono text-emerald-300 overflow-x-auto">
{`{
  "_id": 102,
  "name": "Karim",
  "age": 25,
  "email": "karim@gmail.com",
  "hobbies": ["Cricket"],
  "education": "University Graduate",
  "location": "Dhaka"
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* 5 Core Reasons for NoSQL Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {[
            { title: '1. Massive Data Volume', desc: 'Social media, IoT sensors, and logs generate terabytes per second beyond single-server capacity.' },
            { title: '2. Flexible Data Structures', desc: 'Different records store distinct attributes; fields can be arrays, nested objects, or key-value pairs.' },
            { title: '3. Horizontal Scalability', desc: 'Seamlessly scale out by adding commodity nodes rather than purchasing expensive multi-socket hardware.' },
            { title: '4. High Write Availability', desc: 'Architected with masterless topologies or automated failover to survive node crashes without downtime.' },
            { title: '5. Distributed Geographies', desc: 'Data is partitioned and replicated across multi-region data centers for ultra-low latency local access.' },
            { title: '6. Specialized Workloads', desc: 'Optimized engines for specific access patterns: caching (Redis), graphs (Neo4j), or time-series.' }
          ].map((r, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-300 block">{r.title}</span>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 3: SQL VS NOSQL PARADIGM COMPARISON
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 3 of 16 • Crucial Exam Topic
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL (Relational) vs. NoSQL (Non-Relational)</h2>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3.5">Feature</th>
                <th className="p-3.5 text-indigo-300">SQL (Relational Database)</th>
                <th className="p-3.5 text-cyan-300">NoSQL (Non-Relational Database)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#0d1020]">
              <tr>
                <td className="p-3.5 font-bold text-white">Data Model</td>
                <td className="p-3.5 text-zinc-300">Relational: Fixed tables, rows (tuples), columns</td>
                <td className="p-3.5 text-cyan-200">Non-relational: Documents, Key-Value, Column-Family, Graphs</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Schema Nature</td>
                <td className="p-3.5 text-zinc-300">Rigid, predefined schema (Schema-on-Write)</td>
                <td className="p-3.5 text-cyan-200">Dynamic, flexible schema (Schema-on-Read)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Primary Query Method</td>
                <td className="p-3.5 text-zinc-300">Standardized Structured Query Language (SQL)</td>
                <td className="p-3.5 text-cyan-200">Database-specific APIs, JSON query builders, Cypher, CQL</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Relationships &amp; Joins</td>
                <td className="p-3.5 text-zinc-300">Heavily normalized; complex multi-table JOINs</td>
                <td className="p-3.5 text-cyan-200">Denormalized; embedded sub-documents or graph traversals</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Transaction Guarantees</td>
                <td className="p-3.5 text-emerald-300">Strict ACID (Atomicity, Consistency, Isolation, Durability)</td>
                <td className="p-3.5 text-amber-300">Often BASE (Basically Available, Soft state, Eventual consistency)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Scaling Model</td>
                <td className="p-3.5 text-zinc-300">Primarily Vertical (Scale-up: beefier CPU &amp; RAM)</td>
                <td className="p-3.5 text-emerald-300">Primarily Horizontal (Scale-out: distributed sharding)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Prominent Examples</td>
                <td className="p-3.5 text-indigo-300 font-mono">PostgreSQL, MySQL, Oracle, SQL Server</td>
                <td className="p-3.5 text-cyan-300 font-mono">MongoDB, Redis, Apache Cassandra, Neo4j</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* When to Choose SQL vs NoSQL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-indigo-500/30 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-indigo-300 uppercase">When to Choose SQL:</span>
            <ul className="space-y-1 text-zinc-300 font-sans list-disc pl-4">
              <li>Data has strictly structured, predictable entity relationships.</li>
              <li>Financial, banking, and ledger integrity where <strong>ACID transactions</strong> are paramount.</li>
              <li>Reporting systems requiring complex joins and aggregations across dozens of tables.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">When to Choose NoSQL:</span>
            <ul className="space-y-1 text-zinc-300 font-sans list-disc pl-4">
              <li>Unstructured, rapidly changing data attributes (e.g. mobile sensor logs, game state).</li>
              <li>High-velocity ingestion demanding massive horizontal write throughput.</li>
              <li>Hierarchical, nested data (e.g. JSON e-commerce catalogs with varying product attributes).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4: FOUR MAJOR TYPES OF NOSQL DATABASES (PLAYGROUND)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 4 of 16 • Core Classification
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Four Major Types of NoSQL Databases: Interactive Playground</h2>
          </div>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'document', label: '1. Document DB', sub: 'JSON / BSON (MongoDB)' },
            { id: 'keyvalue', label: '2. Key-Value DB', sub: 'O(1) Map (Redis)' },
            { id: 'column', label: '3. Column-Family', sub: 'Wide-Column (Cassandra)' },
            { id: 'graph', label: '4. Graph DB', sub: 'Nodes & Edges (Neo4j)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveNoSqlType(tab.id as any)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeNoSqlType === tab.id
                  ? 'bg-purple-950/60 border-purple-400 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-mono font-bold">{tab.label}</div>
              <div className="text-[10px] text-zinc-400 font-sans mt-0.5">{tab.sub}</div>
            </button>
          ))}
        </div>

        {/* Active Tab Interactive Demonstration */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          {/* TAB 1: DOCUMENT DATABASE */}
          {activeNoSqlType === 'document' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Document Store Architecture</span>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Stores self-contained semi-structured records using nested JSON / BSON structures.</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">MongoDB &bull; CouchDB</span>
              </div>

              <div className="p-4 bg-black/60 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">E-Commerce Product Document (Rich Nested Fields &amp; Arrays):</span>
                <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
{`{
  "_id": ObjectId("64bf92a10e82c1"),
  "title": "Quantum Pro Ultrabook",
  "brand": "TechCorp",
  "price": 125000,
  "in_stock": true,
  "specs": {
    "cpu": "Intel i9 14th Gen",
    "ram_gb": 32,
    "ssd_tb": 1
  },
  "tags": ["laptop", "developer", "ultrabook", "oled"],
  "reviews": [
    { "user": "Rahim", "rating": 5, "comment": "Blazing fast compilation!" },
    { "user": "Karim", "rating": 4, "comment": "Battery life is decent." }
  ]
}`}
                </pre>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg text-xs font-sans text-zinc-300">
                <strong>Why it excels:</strong> All data required to display a product page (attributes, nested specs, review arrays) is fetched in <strong>a single disk read</strong> without joining 4 separate relational tables!
              </div>
            </div>
          )}

          {/* TAB 2: KEY-VALUE DATABASE */}
          {activeNoSqlType === 'keyvalue' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Key-Value Store Architecture</span>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Hash table associative array mapping a unique string Key to an arbitrary binary or string Value in O(1) time.</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">Redis &bull; Amazon DynamoDB</span>
              </div>

              {/* Interactive Key-Value Tester */}
              <div className="p-4 bg-black/60 rounded-xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Set New Key:</label>
                    <input
                      type="text"
                      value={kvNewKey}
                      onChange={e => setKvNewKey(e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">Set Value:</label>
                    <input
                      type="text"
                      value={kvNewVal}
                      onChange={e => setKvNewVal(e.target.value)}
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="self-end">
                    <button
                      onClick={handleKvSet}
                      className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold cursor-pointer transition-all"
                    >
                      SET Key
                    </button>
                  </div>
                </div>

                {/* Live Key-Value Table */}
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-zinc-400 block uppercase">In-Memory Hash Map Contents:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {Object.entries(kvStore).map(([k, v]) => (
                      <div
                        key={k}
                        onClick={() => setKvSearchKey(k)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          kvSearchKey === k ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200' : 'bg-slate-900 border-slate-800 text-zinc-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-bold text-cyan-300">{k}</span>
                        <span className="text-[11px] text-zinc-400 truncate max-w-[160px]">&rarr; {v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instant O(1) Lookup Result */}
                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span>GET &quot;{kvSearchKey}&quot; &rarr; {kvStore[kvSearchKey] || '(nil / cache miss)'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Lookup Cost: O(1) ~0.2ms</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLUMN-FAMILY DATABASE */}
          {activeNoSqlType === 'column' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Column-Family / Wide-Column Architecture</span>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Organizes data into rows where each row key maps to dynamic column families containing column name-value pairs.</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Apache Cassandra &bull; HBase</span>
              </div>

              {/* Sparse Wide-Column Table Representation */}
              <div className="p-4 bg-black/60 rounded-xl border border-slate-800 space-y-3">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">Cassandra Sparse Wide-Row Matrix:</span>
                <div className="overflow-x-auto rounded-lg border border-slate-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 text-zinc-300 border-b border-slate-800">
                      <tr>
                        <th className="p-2.5">Row Key (Partition Key)</th>
                        <th className="p-2.5 text-cyan-300">Family: UserInfo</th>
                        <th className="p-2.5 text-amber-300">Family: ActivityLog</th>
                        <th className="p-2.5 text-emerald-300">Family: SensorMetrics</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-[#0d1020] text-zinc-300">
                      <tr>
                        <td className="p-2.5 font-bold text-white">usr:101</td>
                        <td className="p-2.5 text-cyan-200">name=&apos;Rahim&apos;, age=22</td>
                        <td className="p-2.5 text-amber-200">last_login=&apos;10:15 AM&apos;, ip=&apos;10.0.1.5&apos;</td>
                        <td className="p-2.5 text-zinc-600 italic">(none)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-white">device:sensor_88</td>
                        <td className="p-2.5 text-zinc-600 italic">(none)</td>
                        <td className="p-2.5 text-zinc-600 italic">(none)</td>
                        <td className="p-2.5 text-emerald-200">temp=28.4C, humidity=65%, battery=98%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-2.5 bg-slate-900 rounded text-[11px] font-sans text-zinc-300">
                  <strong>Zero Space Penalty:</strong> If a row has no data for a column family, zero bytes are allocated on disk (unlike relational NULL padding).
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GRAPH DATABASE */}
          {activeNoSqlType === 'graph' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase">Graph Database Architecture</span>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">Represents entities as Nodes and relationships as direct Pointer Edges with Properties.</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">Neo4j &bull; Amazon Neptune</span>
              </div>

              {/* Social Graph Relationship Diagram */}
              <div className="p-5 bg-black/60 rounded-xl border border-slate-800 space-y-4">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">Social Network Friend Graph (Index-Free Adjacency):</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500 text-purple-200 font-mono text-xs">
                    <div className="font-bold">(:Person)</div>
                    <div className="text-sm font-bold text-white mt-1">Rahim</div>
                    <div className="text-[10px] text-zinc-400">age: 22</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500 text-purple-200 font-mono text-xs">
                    <div className="font-bold">(:Person)</div>
                    <div className="text-sm font-bold text-white mt-1">Karim</div>
                    <div className="text-[10px] text-zinc-400">age: 25</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500 text-purple-200 font-mono text-xs">
                    <div className="font-bold">(:Person)</div>
                    <div className="text-sm font-bold text-white mt-1">Hasan</div>
                    <div className="text-[10px] text-zinc-400">age: 23</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500 text-purple-200 font-mono text-xs">
                    <div className="font-bold">(:Person)</div>
                    <div className="text-sm font-bold text-white mt-1">Rafi</div>
                    <div className="text-[10px] text-zinc-400">age: 24</div>
                  </div>
                </div>

                {/* Graph Edges / Traversals */}
                <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-zinc-300">
                  <div className="text-purple-300 font-bold">Relationship Edges (Cypher Query Syntax):</div>
                  <div className="text-zinc-400">(Rahim)-[:FRIENDS_WITH &#123; since: 2022 &#125;]-&gt;(Karim)</div>
                  <div className="text-zinc-400">(Karim)-[:FRIENDS_WITH &#123; since: 2023 &#125;]-&gt;(Hasan)</div>
                  <div className="text-zinc-400">(Hasan)-[:FRIENDS_WITH &#123; since: 2024 &#125;]-&gt;(Rafi)</div>
                </div>

                <div className="p-2.5 bg-purple-950/30 border border-purple-500/30 rounded text-purple-200 text-xs font-sans">
                  <strong>Recommendation Superpower:</strong> To recommend friends of friends for Rahim, Neo4j follows physical memory pointers in <strong>O(1) time per hop</strong> without computing costly recursive SQL table self-joins!
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 5 & 6: MONGODB ARCHITECTURE & LIVE CRUD SIMULATOR
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Braces className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 5 &amp; 6 of 16 • Hands-On CRUD
            </span>
            <h2 className="text-xl font-bold text-white mt-1">MongoDB Architecture &amp; Interactive Web CRUD Shell</h2>
          </div>
        </div>

        {/* SQL vs MongoDB Terminology Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#14182d] text-zinc-300 border-b border-slate-800 font-mono text-[11px] uppercase">
              <tr>
                <th className="p-3">Relational SQL Concept</th>
                <th className="p-3 text-emerald-300">MongoDB Concept</th>
                <th className="p-3">Role / Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-[#0d1020] font-mono text-xs">
              <tr>
                <td className="p-3 font-bold text-white">Database</td>
                <td className="p-3 text-emerald-300">Database</td>
                <td className="p-3 font-sans text-zinc-400">Container for collections/tables</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Table</td>
                <td className="p-3 text-emerald-300">Collection</td>
                <td className="p-3 font-sans text-zinc-400">Group of documents (schema-free)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Row (Tuple)</td>
                <td className="p-3 text-emerald-300">Document (BSON)</td>
                <td className="p-3 font-sans text-zinc-400">Individual record stored as key-value pairs</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Column</td>
                <td className="p-3 text-emerald-300">Field</td>
                <td className="p-3 font-sans text-zinc-400">Attribute name within a document</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">Primary Key</td>
                <td className="p-3 text-emerald-300">_id (ObjectId)</td>
                <td className="p-3 font-sans text-zinc-400">Unique 12-byte BSON identifier generated automatically</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">JOIN</td>
                <td className="p-3 text-emerald-300">$lookup</td>
                <td className="p-3 font-sans text-zinc-400">Aggregation stage for left outer joins</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Interactive MongoDB Web CRUD Shell Playground */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-500/40 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Interactive MongoDB Web Shell &bull; Collection: db.students
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Execute live CRUD operations and watch the virtual BSON collection update in real time!
              </p>
            </div>
            {/* CRUD Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={runMongoInsert}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow"
              >
                + insertOne()
              </button>
              <button
                onClick={runMongoUpdate}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow"
              >
                &bull; updateOne()
              </button>
              <button
                onClick={runMongoDelete}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow"
              >
                &times; deleteOne()
              </button>
            </div>
          </div>

          {/* Terminal Console Feedback */}
          <div className="p-3 bg-black/80 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">&gt; {mongoLastAction}</span>
          </div>

          {/* Active Documents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mongoStudents.map(doc => (
              <div key={doc.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                  <span>_id: ObjectId(&quot;{doc.id}&quot;)</span>
                  <span className="text-emerald-400 font-bold">{doc.dept}</span>
                </div>
                <div className="text-sm font-bold text-white font-sans">{doc.name}</div>
                <div className="text-zinc-400 text-[11px]">age: {doc.age} years</div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {doc.skills.map(sk => (
                    <span key={sk} className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 7: SCALABILITY: VERTICAL VS HORIZONTAL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 7 of 16
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Scalability: Vertical (Scale-Up) vs. Horizontal (Scale-Out)</h2>
          </div>
        </div>

        {/* Visual Architecture Switcher */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
              Interactive Scaling Simulator
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setScaleStrategy('vertical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  scaleStrategy === 'vertical' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Vertical (Scale-Up Server)
              </button>
              <button
                onClick={() => setScaleStrategy('horizontal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  scaleStrategy === 'horizontal' ? 'bg-cyan-600 text-white shadow' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Horizontal (Scale-Out Cluster)
              </button>
            </div>
          </div>

          {scaleStrategy === 'vertical' ? (
            <div className="p-6 bg-black/60 rounded-xl border border-indigo-500/30 text-center space-y-4">
              <div className="text-xs font-mono font-bold text-indigo-300">
                Vertical Scaling: Upgrade CPU / RAM / Disk on a Single Machine
              </div>
              <div className="max-w-sm mx-auto p-5 rounded-2xl bg-indigo-950/40 border-2 border-indigo-500 space-y-3">
                <Server className="w-10 h-10 text-indigo-400 mx-auto" />
                <div className="text-sm font-bold text-white font-mono">Enterprise Database Server</div>
                <div className="text-xs font-mono text-cyan-300 space-y-1">
                  <div>CPU: Upgraded from 8 to 64 Cores</div>
                  <div>RAM: Upgraded from 16 GB to 512 GB</div>
                  <div>Storage: Enterprise NVMe RAID</div>
                </div>
                <div className="p-2 bg-rose-950/40 rounded border border-rose-500/40 text-[11px] font-sans text-rose-300">
                  ⚠️ Hard Hardware Ceiling: Extreme cost; eventually reaches motherboard capacity limits!
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-black/60 rounded-xl border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-cyan-300">Horizontal Scaling: Cluster Size = {nodeCount} Commodity Nodes</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setNodeCount(prev => Math.max(2, prev - 1))}
                    className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 cursor-pointer"
                  >
                    - Node
                  </button>
                  <button
                    onClick={() => setNodeCount(prev => Math.min(8, prev + 1))}
                    className="px-2.5 py-0.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
                  >
                    + Add Node
                  </button>
                </div>
              </div>

              {/* Dynamic Nodes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: nodeCount }).map((_, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-center space-y-1">
                    <Server className="w-6 h-6 text-cyan-400 mx-auto" />
                    <div className="text-xs font-bold text-white font-mono">Node {i + 1}</div>
                    <div className="text-[10px] font-mono text-zinc-400">Capacity: {(100 / nodeCount).toFixed(1)}% of Shards</div>
                  </div>
                ))}
              </div>
              <div className="p-2.5 bg-emerald-950/40 rounded border border-emerald-500/40 text-center text-xs font-mono text-emerald-300">
                &check; Unlimited Horizon: Double traffic tomorrow? Simply spin up {nodeCount} additional cheap nodes!
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 8: DATABASE SHARDING ARCHITECTURE (CUSTOM ROUTER)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 8 of 16 • Sharding Deep-Dive
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Sharding Architecture &amp; Live Route Router</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <strong>Database Sharding</strong> partitions a gigantic monolithic table into smaller, autonomous physical databases called <strong>shards</strong> based on a designated <strong>Shard Key</strong> (such as Customer ID, Zip Code, or Hash).
        </p>

        {/* Interactive Sharding Router Visualizer */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-amber-500/40 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Interactive Shard Route Simulator (1,000,000 Customers Across 4 Shards)
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Type any Customer ID to see how the Sharding Query Router resolves the physical server destination.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Customer ID:</span>
              <input
                type="number"
                value={testCustomerId}
                onChange={e => setTestCustomerId(Number(e.target.value))}
                className="w-32 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* 4 Shard Server Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 1, range: '1 – 250,000', server: 'Server 1 (US-East)' },
              { id: 2, range: '250,001 – 500,000', server: 'Server 2 (EU-West)' },
              { id: 3, range: '500,001 – 750,000', server: 'Server 3 (AP-South)' },
              { id: 4, range: '750,001 – 1,000,000+', server: 'Server 4 (SA-East)' }
            ].map(sh => {
              const isTarget = shardTarget.shard === sh.id;
              return (
                <div
                  key={sh.id}
                  className={`p-4 rounded-xl border text-center transition-all space-y-2 ${
                    isTarget
                      ? 'bg-amber-950/50 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/40 scale-105'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-zinc-400">SHARD #{sh.id}</div>
                  <HardDrive className={`w-8 h-8 mx-auto ${isTarget ? 'text-amber-400 animate-pulse' : 'text-zinc-600'}`} />
                  <div className="text-xs font-bold text-white font-mono">{sh.server}</div>
                  <div className="text-[11px] font-mono text-amber-300">ID Range: {sh.range}</div>
                  {isTarget && (
                    <div className="p-1 rounded bg-amber-500/20 text-[10px] font-mono text-amber-200 font-bold">
                      &bull; PACKET ROUTED HERE &bull;
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Router Decision Log */}
          <div className="p-3 bg-black/60 rounded-xl border border-slate-800 text-xs font-mono text-zinc-300 flex items-center justify-between">
            <span>
              Query: <code className="text-cyan-300">SELECT * FROM CUSTOMER WHERE ID = {testCustomerId};</code> &rarr; Target: <strong>Shard {shardTarget.shard} ({shardTarget.server})</strong>
            </span>
            <span className="text-emerald-400 font-bold">&check; Point Lookup Cost: 1 Disk Read</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9: CAP THEOREM AND NOSQL (FLASH SALE SIMULATOR)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 9 of 16 • Distributed Trade-Offs
            </span>
            <h2 className="text-xl font-bold text-white mt-1">CAP Theorem in NoSQL Databases</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          In Lesson 12, we learned that Brewer&apos;s CAP Theorem states a distributed database can guarantee at most <strong>two out of three</strong> properties simultaneously: <strong>Consistency (C)</strong>, <strong>Availability (A)</strong>, and <strong>Partition Tolerance (P)</strong>.
          Since network partitions (cable cuts, packet loss, hardware timeouts) are unavoidable in physical networks, distributed NoSQL databases must choose between <strong>CP (Consistency over Availability)</strong> and <strong>AP (Availability over Consistency)</strong> when a partition strikes.
        </p>

        {/* Interactive Flash Sale CAP Simulator */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Interactive Simulator
              </span>
              <h3 className="text-sm font-bold text-white">The Flash Sale Concurrency Race: 1 Unit in Stock</h3>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setCapPartition(!capPartition);
                  setCapSimulationResult(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border cursor-pointer ${
                  capPartition
                    ? 'bg-rose-950/40 text-rose-300 border-rose-500/50 hover:bg-rose-900/50'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/50'
                }`}
              >
                {capPartition ? '⚡ Network Partition: ACTIVE (Split)' : '✓ Network: HEALTHY (Syncing)'}
              </button>

              <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                <button
                  onClick={() => {
                    setCapMode('CP');
                    setCapSimulationResult(null);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    capMode === 'CP'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  CP Mode (MongoDB / HBase)
                </button>
                <button
                  onClick={() => {
                    setCapMode('AP');
                    setCapSimulationResult(null);
                  }}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    capMode === 'AP'
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  AP Mode (Cassandra / DynamoDB)
                </button>
              </div>
            </div>
          </div>

          {/* Node Diagram Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Datacenter Dhaka */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Server className="w-4 h-4" /> Datacenter A (Dhaka Node)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">Quorum Leader</span>
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-zinc-400">Inventory: <span className="text-white font-bold">1 MacBook Pro</span></div>
                <div className="text-zinc-400">Client: <span className="text-cyan-300">User Rahim (Dhaka)</span> &rarr; Buying 1 Unit</div>
              </div>
            </div>

            {/* Datacenter Chittagong */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              capPartition ? 'bg-rose-950/20 border-rose-500/30' : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Server className="w-4 h-4" /> Datacenter B (Chittagong Node)
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${
                  capPartition ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {capPartition ? 'Partitioned Subnet' : 'Synchronized'}
                </span>
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-zinc-400">Inventory: <span className="text-white font-bold">1 MacBook Pro</span></div>
                <div className="text-zinc-400">Client: <span className="text-amber-300">User Karim (Chittagong)</span> &rarr; Buying 1 Unit</div>
              </div>
            </div>
          </div>

          {/* Trigger Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                if (!capPartition) {
                  setCapSimulationResult(
                    'Network is healthy! Dhaka and Chittagong sync within 15ms. Rahim purchases the item. Karim receives instant "Sold Out (0 Left)" notification. System satisfies Consistency AND Availability!'
                  );
                } else if (capMode === 'CP') {
                  setCapSimulationResult(
                    'CP Mode: Partition detected! Datacenter A (Dhaka) holds quorum and confirms Rahim\'s order. Datacenter B (Chittagong) cannot reach quorum and REJECTS Karim\'s write with [503 Service Unavailable / WriteConcernError]. OVER-SELLING PREVENTED! Consistency preserved at the expense of availability.'
                  );
                } else {
                  setCapSimulationResult(
                    'AP Mode: Partition detected! Both nodes prioritize 100% uptime! Dhaka sells item to Rahim (Order #101). Chittagong also sells item to Karim (Order #102). 2 units sold for 1 unit in stock! System relies on Eventual Consistency conflict resolution (backorder queue / refund voucher) once the partition heals.'
                  );
                }
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/20"
            >
              <Zap className="w-4 h-4" />
              <span>Simulate Simultaneous Purchases in Dhaka &amp; Chittagong</span>
            </button>

            {capSimulationResult && (
              <span className="text-xs font-mono text-zinc-400">Simulation Executed</span>
            )}
          </div>

          {/* Simulator Feedback Log */}
          {capSimulationResult && (
            <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${
              !capPartition
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : capMode === 'CP'
                ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                : 'bg-purple-950/30 border-purple-500/40 text-purple-200'
            }`}>
              <div className="font-bold flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4" />
                <span>Simulation Outcome Log:</span>
              </div>
              <p className="font-sans">{capSimulationResult}</p>
            </div>
          )}

          {/* Configurable Consistency Matrix */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-white font-mono uppercase mb-2">NoSQL Consistency Configurability Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-900/80 text-zinc-300 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Database</th>
                    <th className="p-3">Default Bias</th>
                    <th className="p-3">Configurable Consistency Mechanism</th>
                    <th className="p-3">Typical Target Workload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-emerald-400">MongoDB</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">CP</span></td>
                    <td className="p-3 text-zinc-400 font-sans">Configurable write concerns (<code>w: &quot;majority&quot;</code>, <code>j: true</code>) and read preferences (<code>primary</code>, <code>secondaryPreferred</code>).</td>
                    <td className="p-3 text-zinc-400 font-sans">Catalogs, user accounts, transactional commerce</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-400">Apache Cassandra</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">AP</span></td>
                    <td className="p-3 text-zinc-400 font-sans">Tunable per-query consistency levels: <code>ONE</code>, <code>QUORUM</code>, <code>LOCAL_QUORUM</code>, <code>ALL</code> with Hinted Handoff.</td>
                    <td className="p-3 text-zinc-400 font-sans">High-throughput sensor logs, messaging, recommendations</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Amazon DynamoDB</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">AP</span></td>
                    <td className="p-3 text-zinc-400 font-sans">Eventual consistency by default; toggleable <code>ConsistentRead=true</code> flag for strong read consistency.</td>
                    <td className="p-3 text-zinc-400 font-sans">Shopping carts, gaming leaderboards, session states</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10: MODERN MULTI-MODEL DATABASE CATEGORIES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 10 of 16 • Landscape
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Modern Database Technologies &amp; Categories Beyond NoSQL</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Modern software architectures rarely use a single database engine for everything. Instead, organizations practice <strong>Polyglot Persistence</strong>—using the right database engine optimized for each distinct microservice workload.
        </p>

        {/* 5 Flagship Engines Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              name: 'MongoDB',
              type: 'Document Store',
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              bg: 'bg-emerald-950/20',
              desc: 'JSON/BSON documents with embedded sub-documents and expressive aggregation pipelines.'
            },
            {
              name: 'Redis',
              type: 'In-Memory Key-Value',
              color: 'text-rose-400',
              border: 'border-rose-500/30',
              bg: 'bg-rose-950/20',
              desc: 'Sub-millisecond latency RAM data structures for caching, rate limiters, and session storage.'
            },
            {
              name: 'Apache Cassandra',
              type: 'Wide-Column Store',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              bg: 'bg-cyan-950/20',
              desc: 'Masterless peer-to-peer ring designed for massive write throughput across multi-datacenter clusters.'
            },
            {
              name: 'Neo4j',
              type: 'Graph Database',
              color: 'text-indigo-400',
              border: 'border-indigo-500/30',
              bg: 'bg-indigo-950/20',
              desc: 'Index-free adjacency graph engine powered by Cypher for relationship traversal and fraud rings.'
            },
            {
              name: 'PostgreSQL',
              type: 'Multi-Model RDBMS',
              color: 'text-blue-400',
              border: 'border-blue-500/30',
              bg: 'bg-blue-950/20',
              desc: 'ACID relational foundation extended with JSONB, GIN indexing, and pgvector for AI embeddings.'
            }
          ].map((eng, idx) => (
            <div key={idx} className={`p-3.5 rounded-xl border ${eng.border} ${eng.bg} space-y-1.5`}>
              <div className={`text-sm font-bold font-mono ${eng.color}`}>{eng.name}</div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-zinc-300 font-semibold inline-block">
                {eng.type}
              </span>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{eng.desc}</p>
            </div>
          ))}
        </div>

        {/* Complete Database Categories Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { category: 'Relational (Extended)', eng: 'PostgreSQL, MySQL', purpose: 'Structured tabular data with JSONB support for hybrid document models.' },
            { category: 'Document Stores', eng: 'MongoDB, Couchbase', purpose: 'Hierarchical JSON catalogs, user content, and web applications.' },
            { category: 'In-Memory Key-Value', eng: 'Redis, Memcached', purpose: 'Sub-millisecond caching, session tokens, and distributed rate limiters.' },
            { category: 'Graph Databases', eng: 'Neo4j, Amazon Neptune', purpose: 'Knowledge graphs, anti-fraud rings, and interconnected social connections.' },
            { category: 'Wide-Column Stores', eng: 'Cassandra, ScyllaDB', purpose: 'Massive linear write throughput for distributed timeseries and telemetry.' },
            { category: 'Time-Series Databases', eng: 'InfluxDB, TimescaleDB', purpose: 'High-frequency stock ticks, IoT telemetry, and DevOps metrics.' },
            { category: 'Search Engines', eng: 'Elasticsearch, Meilisearch', purpose: 'Inverted indexes for full-text search, autocompletion, and log analytics.' },
            { category: 'Vector Databases (AI)', eng: 'Milvus, Pinecone, pgvector', purpose: 'High-dimensional embedding similarity search (HNSW/IVFFlat) for LLM RAG pipelines.' }
          ].map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold inline-block">
                {m.category}
              </span>
              <div className="text-xs font-bold text-white font-mono">{m.eng}</div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{m.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 11: ADVANTAGES AND DISADVANTAGES OF NOSQL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                Part 11 of 16 • Critical Evaluation
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Advantages &amp; Disadvantages of NoSQL</h2>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              onClick={() => setProConFilter('all')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                proConFilter === 'all' ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All (10)
            </button>
            <button
              onClick={() => setProConFilter('pros')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                proConFilter === 'pros' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Advantages (5)
            </button>
            <button
              onClick={() => setProConFilter('cons')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                proConFilter === 'cons' ? 'bg-rose-600 text-white shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Disadvantages (5)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Advantages Column */}
          {(proConFilter === 'all' || proConFilter === 'pros') && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 5 Core Advantages of NoSQL
              </h3>
              {[
                {
                  title: '1. Dynamic Schema Flexibility',
                  desc: 'Polymorphic documents accommodate rapidly changing data without requiring table lock migrations or schema version halts.'
                },
                {
                  title: '2. Elastic Horizontal Scalability',
                  desc: 'Scale out across hundreds of commodity server nodes smoothly without buying expensive enterprise mainframe hardware.'
                },
                {
                  title: '3. Ultra-High Read/Write Throughput',
                  desc: 'Denormalized data structures eliminate multi-table relational SQL JOIN overhead, allowing sub-millisecond document retrievals.'
                },
                {
                  title: '4. Built-In Fault Tolerance & Replication',
                  desc: 'Automated clustering, masterless peer replication, and seamless node failover ensure high availability across datacenters.'
                },
                {
                  title: '5. Workload-Specific Data Structures',
                  desc: 'Graph algorithms for social networks, in-memory hashes for caches, and wide columns for telemetry maximize hardware performance.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <div className="text-xs font-bold text-emerald-300 font-mono">{item.title}</div>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Disadvantages Column */}
          {(proConFilter === 'all' || proConFilter === 'cons') && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> 5 Core Limitations &amp; Trade-Offs
              </h3>
              {[
                {
                  title: '1. Lack of Standardized Query Interface',
                  desc: 'Unlike universal SQL (ANSI), each NoSQL database uses proprietary APIs, query operators, and language drivers, creating vendor lock-in.'
                },
                {
                  title: '2. Eventual Consistency Complications',
                  desc: 'BASE models do not guarantee immediate cross-node consistency; applications must handle temporary stale reads and conflict merges.'
                },
                {
                  title: '3. Costly Cross-Collection JOINs',
                  desc: 'NoSQL models discourage or prohibit declarative joins. Joining data requires multiple queries or client-side application logic.'
                },
                {
                  title: '4. Higher Storage Overhead (Denormalization)',
                  desc: 'Duplicating embedded documents and keys repeatedly across collections increases memory footprint and disk storage consumption.'
                },
                {
                  title: '5. Operational & Cluster Complexity',
                  desc: 'Managing distributed partitions, gossip rings, split-brain recovery, and compaction cycles requires deep DevOps expertise.'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                  <div className="text-xs font-bold text-rose-300 font-mono">{item.title}</div>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 12: REAL-WORLD APPLICATIONS OF NOSQL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 12 of 16 • Industry Case Studies
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Real-World Applications of NoSQL at Scale</h2>
          </div>
        </div>

        {/* Case Study Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'ecommerce', label: 'E-Commerce Catalogs', icon: Boxes },
            { id: 'social', label: 'Social Networks', icon: Share2 },
            { id: 'streaming', label: 'Streaming & OTT', icon: Zap },
            { id: 'iot', label: 'IoT & Telemetry', icon: Activity },
            { id: 'fraud', label: 'Fraud Detection', icon: ShieldCheck }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCaseStudy(tab.id as typeof activeCaseStudy)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeCaseStudy === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Case Study Card */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {activeCaseStudy === 'ecommerce' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Amazon / Shopify Product Catalog Architecture</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono">Document + Key-Value</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                An e-commerce platform sells millions of diverse items: T-shirts (size, color, cotton%), Laptops (RAM, CPU, GPU), and Groceries (expiry date, calories). Storing this in relational SQL requires either hundreds of empty NULL columns or complicated EAV (Entity-Attribute-Value) anti-patterns with slow joins.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Engines Used:</div>
                  <div className="text-zinc-300 font-sans">Amazon DynamoDB &amp; MongoDB</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Shopping Cart Sessions:</div>
                  <div className="text-zinc-300 font-sans">Redis In-Memory Key-Value (sub-millisecond checkout)</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Why NoSQL Won:</div>
                  <div className="text-zinc-300 font-sans">Zero schema migration downtime when vendors add new product specs.</div>
                </div>
              </div>
            </div>
          )}

          {activeCaseStudy === 'social' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Meta / Twitter Feed &amp; Follower Graph</span>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono">Graph + Document + Redis</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Calculating &quot;Friends of friends who liked this post&quot; across 3 billion active users requires recursive 5-way SQL JOINs that crash relational engines. Graph databases traverse relationship pointers in O(1) constant time per edge via index-free adjacency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Engines Used:</div>
                  <div className="text-zinc-300 font-sans">Neo4j (Connections), MongoDB (User Profiles)</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Timeline Caching:</div>
                  <div className="text-zinc-300 font-sans">Redis Sorted Sets (ZSET) for ordered timeline posts</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Why NoSQL Won:</div>
                  <div className="text-zinc-300 font-sans">Linear traversal latency independent of the total graph size.</div>
                </div>
              </div>
            </div>
          )}

          {activeCaseStudy === 'streaming' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Netflix / YouTube Viewing History &amp; Recommendations</span>
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono">Wide-Column (Cassandra)</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Every video pause, playback bookmark, and title click generates high-frequency write events across hundreds of millions of subscribers simultaneously. Cassandra&apos;s append-only commit log and SSTables handle millions of concurrent writes effortlessly.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Engines Used:</div>
                  <div className="text-zinc-300 font-sans">Apache Cassandra &amp; ScyllaDB</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Playback Bookmarks:</div>
                  <div className="text-zinc-300 font-sans">Memcached / EVCache for instantaneous resume</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Why NoSQL Won:</div>
                  <div className="text-zinc-300 font-sans">Masterless multi-region writes guarantee 99.999% streaming uptime.</div>
                </div>
              </div>
            </div>
          )}

          {activeCaseStudy === 'iot' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">Tesla / Smart City Sensor Telemetry Streams</span>
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono">Time-Series + Cassandra</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Connected vehicles and smart power grids stream battery temperatures, tire pressures, and GPS coordinates every millisecond. Time-series databases compress metric streams efficiently and auto-expire older raw data through automated retention policies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Engines Used:</div>
                  <div className="text-zinc-300 font-sans">InfluxDB, TimescaleDB, Apache Cassandra</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Throughput:</div>
                  <div className="text-zinc-300 font-sans">500,000+ metrics ingested per second per server node</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Why NoSQL Won:</div>
                  <div className="text-zinc-300 font-sans">Specialized column-oriented compression drops disk usage by 90%.</div>
                </div>
              </div>
            </div>
          )}

          {activeCaseStudy === 'fraud' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono">FinTech Real-Time Anti-Money Laundering (AML)</span>
                <span className="px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs font-mono">Property Graph (Neo4j)</span>
              </div>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Money laundering syndicates disguise illicit transfers through intricate circular chains: Account A &rarr; Account B &rarr; Account C &rarr; Account A. In relational databases, detecting cycles requires infinite SQL joins. Neo4j detects circular cycles in real time during the transaction authorization window (&lt;50ms).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Engines Used:</div>
                  <div className="text-zinc-300 font-sans">Neo4j Enterprise &amp; Amazon Neptune</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Detection Window:</div>
                  <div className="text-zinc-300 font-sans">&lt; 35ms latency to approve or freeze wire transfer</div>
                </div>
                <div className="p-3 rounded bg-black/40 border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">Why NoSQL Won:</div>
                  <div className="text-zinc-300 font-sans">Cypher pattern matching syntax natively expresses multi-hop cyclic paths.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 13: UNIVERSITY EXAMINATION QUESTIONS ACCORDION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 13 of 16
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
              q: 'Q1: What is NoSQL and why was it developed?',
              a: 'NoSQL stands for "Not Only SQL". It refers to non-relational database architectures designed to handle large-scale data volume, flexible schemas (unstructured/semi-structured), and horizontal scalability across distributed commodity servers where traditional RDBMS encounters bottlenecks.'
            },
            {
              id: 'q2',
              q: 'Q2: Differentiate between SQL and NoSQL databases.',
              a: '• SQL: Relational model, predefined rigid tables, joins, strict ACID transactions, primarily vertical scaling (e.g. PostgreSQL, MySQL).\n• NoSQL: Non-relational (Document, Key-Value, Column, Graph), flexible dynamic schema, denormalized, often BASE eventual consistency, primarily horizontal scaling (e.g. MongoDB, Redis).'
            },
            {
              id: 'q3',
              q: 'Q3: Name and describe the 4 major types of NoSQL databases with examples.',
              a: '1. Document Database: Stores JSON/BSON documents with nested objects (e.g. MongoDB).\n2. Key-Value Database: Associative array mapping unique keys to values in O(1) time (e.g. Redis).\n3. Column-Family Database: Wide-column matrix grouped into column families (e.g. Apache Cassandra).\n4. Graph Database: Uses nodes, edges, and properties for interconnected data (e.g. Neo4j).'
            },
            {
              id: 'q4',
              q: 'Q4: What is MongoDB and what is BSON?',
              a: 'MongoDB is a document-oriented NoSQL database. BSON stands for Binary JSON, which is a binary serialization format used to store documents in MongoDB, adding support for data types like Date, Int64, and raw byte arrays.'
            },
            {
              id: 'q5',
              q: 'Q5: What are CRUD operations in MongoDB? Give code examples.',
              a: '• Create: db.students.insertOne({ name: "Rahim", age: 22 });\n• Read: db.students.find({ name: "Rahim" });\n• Update: db.students.updateOne({ name: "Rahim" }, { $set: { age: 23 } });\n• Delete: db.students.deleteOne({ name: "Rahim" });'
            },
            {
              id: 'q6',
              q: 'Q6: Differentiate between Vertical Scaling (Scale-Up) and Horizontal Scaling (Scale-Out).',
              a: '• Vertical Scaling: Adds more CPU, RAM, or storage to a single server. Limited by physical hardware boundaries and incurs high cost.\n• Horizontal Scaling: Adds more independent server nodes to a cluster, distributing workload via sharding and partitioning.'
            },
            {
              id: 'q7',
              q: 'Q7: What is Database Sharding? Mention two advantages and two disadvantages.',
              a: 'Sharding is partitioning a large database horizontally across multiple server instances.\n• Advantages: 1. Infinite horizontal write/read scaling, 2. Distributes I/O bottlenecks.\n• Disadvantages: 1. Cross-shard joins are extremely slow, 2. Complex rebalancing and shard key selection.'
            },
            {
              id: 'q8',
              q: 'Q8: How does the CAP Theorem apply to NoSQL databases?',
              a: 'During a network partition (P), NoSQL systems choose between Consistency (CP) and Availability (AP). For instance, MongoDB default configurations lean toward CP (refusing writes if primary fails), whereas Cassandra defaults toward AP (allowing local writes with eventual consistency).'
            },
            {
              id: 'q9',
              q: 'Q9: What is a Graph Database and why is it preferred for social networks?',
              a: 'A Graph database stores entities as nodes and relationships as direct physical pointer edges. In social networks, computing "friends of friends" or recommendation paths requires O(1) pointer traversals per hop, avoiding the catastrophic multi-table self-join latency of relational SQL.'
            },
            {
              id: 'q10',
              q: 'Q10: What are 3 advantages and 3 disadvantages of NoSQL databases?',
              a: '• Advantages: 1. Schema flexibility, 2. High horizontal scalability, 3. Massive write throughput.\n• Disadvantages: 1. Lack of standardized query language across engines, 2. Weaker ACID transactional guarantees, 3. Difficult multi-entity join operations.'
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
          PART 14: LESSON 13 QUICK REVISION SUMMARY CARDS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 14 of 16 • Quick Revision
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 13 High-Yield Revision Summary</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {[
            {
              title: '1. NoSQL Definition & Purpose',
              badge: 'Not Only SQL',
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              points: [
                'Non-relational data management for petabyte-scale workloads.',
                'Flexible polymorphic schemas eliminate costly ALTER TABLE migrations.',
                'Optimized for horizontal scale-out across distributed commodity hardware.'
              ]
            },
            {
              title: '2. 4 Major NoSQL Archetypes',
              badge: 'Taxonomy',
              color: 'text-indigo-400',
              border: 'border-indigo-500/30',
              points: [
                'Document: JSON/BSON nested structures (MongoDB, CouchDB).',
                'Key-Value: O(1) in-memory key lookups (Redis, Memcached).',
                'Column-Family: Wide-row sparse tables (Cassandra, ScyllaDB).',
                'Graph: Nodes, edges, index-free adjacency (Neo4j, Neptune).'
              ]
            },
            {
              title: '3. MongoDB Architecture & BSON',
              badge: 'Document DB',
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              points: [
                'Hierarchy: Database &rarr; Collection &rarr; BSON Document.',
                'BSON (Binary JSON) adds binary support for Date, ObjectId, Int64.',
                'Core CRUD primitives: insertOne(), find(), updateOne(), deleteOne().'
              ]
            },
            {
              title: '4. Scaling: Vertical vs Horizontal',
              badge: 'Architecture',
              color: 'text-amber-400',
              border: 'border-amber-500/30',
              points: [
                'Vertical (Scale-Up): Upgrade CPU/RAM of 1 machine (hard hardware ceiling).',
                'Horizontal (Scale-Out): Add more commodity nodes to distributed cluster.',
                'NoSQL engines scale horizontally by design via automated repartitioning.'
              ]
            },
            {
              title: '5. Database Sharding Principles',
              badge: 'Partitioning',
              color: 'text-purple-400',
              border: 'border-purple-500/30',
              points: [
                'Horizontal partitioning of massive collections across discrete shard nodes.',
                'Query Router uses Shard Key (hash or range) to route lookups directly.',
                'Eliminates single-server I/O bottlenecks and distributes disk workloads.'
              ]
            },
            {
              title: '6. CAP Theorem Trade-Offs',
              badge: 'Distributed Law',
              color: 'text-rose-400',
              border: 'border-rose-500/30',
              points: [
                'Partitions (P) are physically unavoidable across network clusters.',
                'During a partition, system must choose CP (Consistency) or AP (Availability).',
                'MongoDB leans toward CP; Cassandra & DynamoDB lean toward AP (Eventual Consistency).'
              ]
            }
          ].map((card, idx) => (
            <div key={idx} className={`p-4 rounded-xl bg-[#14182d] border ${card.border} space-y-2.5`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-mono ${card.color}`}>{card.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-300 font-semibold">
                  {card.badge}
                </span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-zinc-300 font-sans list-disc pl-4 leading-relaxed">
                {card.points.map((p, pIdx) => (
                  <li key={pIdx} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 15: INTERACTIVE MCQ ASSESSMENT (10 MARKS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 15 of 16 • University Assessment
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Lesson 13 Knowledge Test (10 Questions · 10 Marks)</h2>
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
                {quizScore >= 8 ? 'Mastery verified! You understand NoSQL models, MongoDB CRUD, sharding, and scalability.' : 'Good review effort! Examine the answer explanations below.'}
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
          PART 16: REVISION CHECKLIST & NAVIGATION BRIDGE
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
            <h2 className="text-xl font-bold text-white mt-1">Lesson 13 Final Revision Checklist (16 Topics)</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">NoSQL &amp; Modern Systems Mastery</span>
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
            'NoSQL definition ("Not Only SQL")',
            'Limitations of traditional RDBMS for web scale',
            'SQL vs. NoSQL core differences',
            'Document databases (MongoDB & CouchDB)',
            'Key-Value databases (Redis & DynamoDB)',
            'Column-Family stores (Cassandra & HBase)',
            'Graph databases (Neo4j & Neptune)',
            'MongoDB BSON document format',
            'MongoDB hierarchy (DB, Collection, Document)',
            'CRUD operations in MongoDB',
            'Vertical scaling (Scale-up hardware limits)',
            'Horizontal scaling (Scale-out clusters)',
            'Database sharding and shard keys',
            'CAP theorem trade-offs in NoSQL',
            'Modern multi-model databases (PostgreSQL JSONB)',
            'Vector databases for AI embeddings'
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
            Ready to explore Database Architecture &amp; Vector Search?
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            You have now mastered core database systems from relational foundations, transactions, concurrency, and security to distributed databases and NoSQL! Proceed to the interactive Database Architecture Roadmap and pgvector AI embedding benchmarks.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson12')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 12: Distributed Databases</span>
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
