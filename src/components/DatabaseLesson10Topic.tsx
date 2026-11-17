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
  AlertOctagon,
  Minimize2,
  Activity,
  Gauge,
  Cpu,
  Binary
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson10TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson10Topic({ onNavigate }: DatabaseLesson10TopicProps) {
  // Part 1: Problem Demo Toggle (Full Table Scan vs Index Lookup)
  const [scanDemoMode, setScanDemoMode] = useState<'scan' | 'index'>('index');

  // Part 3: Clustered vs Non-Clustered Tab
  const [activeClusterTab, setActiveClusterTab] = useState<'clustered' | 'non_clustered'>('clustered');

  // Part 4: Dense vs Sparse Tab
  const [denseSparseTab, setDenseSparseTab] = useState<'dense' | 'sparse'>('dense');

  // Part 5: B-Tree vs B+ Tree Tab
  const [treeTab, setTreeTab] = useState<'btree' | 'bplus'>('bplus');

  // Part 6: Hash Calculator State
  const [hashInputKey, setHashInputKey] = useState<number>(113);

  // Part 8: EXPLAIN Plan Simulation Toggle
  const [explainHasIndex, setExplainHasIndex] = useState<boolean>(true);

  // Part 9: Query Optimization Technique Active Tab
  const [activeOptRule, setActiveOptRule] = useState<number>(4);

  // Part 11: University Exam Q&A Accordion
  const [openExamQ, setOpenExamQ] = useState<Record<string, boolean>>({});

  // Part 13: Revision Checklist
  const [checkedChecklist, setCheckedChecklist] = useState<Record<number, boolean>>({});

  // Part 15: Homework Revealed Solutions
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

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

  // Hash Calculation for Section 6
  const computedHashBucket = useMemo(() => {
    return isNaN(hashInputKey) ? 0 : Math.abs(hashInputKey) % 10;
  }, [hashInputKey]);

  // Checklist completion calculation
  const checklistTotal = 18;
  const checklistDoneCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercent = Math.round((checklistDoneCount / checklistTotal) * 100);

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24 text-slate-200">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a122c] via-[#0f1d46] to-[#070b1e] border border-cyan-900/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Phase 1 • Data Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Lesson 10 of DBMS Series
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              High Performance &amp; Internals
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Lesson 10: Database Indexing <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-indigo-300 bg-clip-text text-transparent">
              &amp; Query Optimization Architecture
            </span>
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-3xl leading-relaxed font-sans">
            Understand how databases locate records in sub-milliseconds across millions of rows: B+ Tree search hierarchies, Clustered vs Non-Clustered files, Dense vs Sparse layouts, Hash tables, Cost-Based Query Optimizers, and reading SQL <code className="text-cyan-300 font-mono">EXPLAIN</code> execution plans.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>B+ Trees &amp; Sequential Leaf Chains</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Clustered vs Non-Clustered Storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Hash Collisions &amp; Range Scans</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>EXPLAIN Plans &amp; Optimization Rules</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS DATABASE INDEXING?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is Database Indexing? The Problem &amp; Core Concept</h2>
          </div>
        </div>

        {/* Problem Scenario */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Scenario: University Table with 1,000,000 Rows</span>
              <p className="text-xs text-zinc-300 font-sans mt-0.5">
                Query: <code className="text-emerald-400 font-mono">SELECT * FROM STUDENT WHERE Student_ID = 1004;</code>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setScanDemoMode('scan')}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                  scanDemoMode === 'scan' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Without Index (Full Table Scan)
              </button>
              <button
                onClick={() => setScanDemoMode('index')}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                  scanDemoMode === 'index' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                With B+ Tree Index (Lookup)
              </button>
            </div>
          </div>

          {scanDemoMode === 'scan' ? (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-rose-300 font-mono font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Full Table Scan (Sequential Scan): O(N) Complexity</span>
              </div>
              <p className="text-zinc-300 font-sans leading-relaxed">
                The database must read disk page by disk page, evaluating up to <strong>1,000,000 records</strong> one-by-one from the beginning of the table file. This incurs massive disk I/O, saturates the buffer pool, and causes noticeable query latency.
              </p>
              <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-rose-300">
                Estimated Disk Reads: ~10,000 Pages &bull; Execution Time: ~850 ms
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>B+ Tree Index Lookup: O(log N) Complexity</span>
              </div>
              <p className="text-zinc-300 font-sans leading-relaxed">
                The database consults a balanced tree data structure. In a tree with a branching factor of 500, finding any 1 record out of 1,000,000 requires traversing just <strong>3 or 4 index levels</strong> directly to the target record!
              </p>
              <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-emerald-300">
                Estimated Disk Reads: 3 to 4 Pages &bull; Execution Time: ~0.4 ms (2,000x Faster!)
              </div>
            </div>
          )}
        </div>

        {/* Book Index Analogy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">The Book Index Analogy</span>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Imagine searching a 1,000-page medical encyclopedia for the topic &ldquo;Antibiotics&rdquo;.
            </p>
            <ul className="space-y-1 list-disc pl-4 text-zinc-300">
              <li><strong>Without index:</strong> You read every page sequentially from page 1 to 1,000.</li>
              <li><strong>With index:</strong> You flip to the back-of-the-book alphabetical index, find &ldquo;Antibiotics &rarr; Page 412&rdquo;, and flip directly to page 412!</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">The Index Trade-Off (Write Penalty)</span>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Indexes are not free! Every index comes with a concrete write penalty:
            </p>
            <ul className="space-y-1 list-disc pl-4 text-zinc-300">
              <li><strong className="text-emerald-400">Pros:</strong> Accelerates <code className="text-cyan-300 font-mono">SELECT</code>, <code className="text-cyan-300 font-mono">WHERE</code>, <code className="text-cyan-300 font-mono">ORDER BY</code>, and <code className="text-cyan-300 font-mono">JOIN</code>.</li>
              <li><strong className="text-rose-400">Cons:</strong> Consumes extra storage; slows down <code className="text-amber-300 font-mono">INSERT</code>, <code className="text-amber-300 font-mono">UPDATE</code>, and <code className="text-amber-300 font-mono">DELETE</code> because every index tree must be rebalanced.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: CREATING INDEXES IN SQL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 2 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Creating &amp; Managing Indexes in SQL</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic & Unique */}
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Single &amp; Unique Indexes</span>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Basic secondary index
CREATE INDEX idx_student_name 
ON STUDENT (Name);

-- Unique index (enforces distinct values)
CREATE UNIQUE INDEX idx_student_email 
ON STUDENT (Email);`}
            </pre>
            <p className="text-xs text-zinc-400 font-sans">
              Accelerates searches like <code className="text-zinc-200">WHERE Name = &apos;Rahim&apos;</code> and enforces integrity.
            </p>
          </div>

          {/* Composite Index & Leftmost Prefix */}
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase">Composite Index &amp; Leftmost Prefix Rule</span>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Multi-column composite index
CREATE INDEX idx_dept_name 
ON STUDENT (Department, Name);`}
            </pre>
            <div className="p-2.5 bg-indigo-950/30 border border-indigo-500/30 rounded text-xs text-indigo-200 font-sans">
              <strong>Crucial Rule:</strong> An index on <code className="text-cyan-300 font-mono">(Department, Name)</code> helps queries filtering on <code className="text-emerald-400 font-mono">Department</code>, but CANNOT be used efficiently for a query filtering only on <code className="text-rose-400 font-mono">Name</code>!
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: CLUSTERED VS NON-CLUSTERED INDEXES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 3 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Clustered vs. Non-Clustered Indexes</h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveClusterTab('clustered')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              activeClusterTab === 'clustered' ? 'bg-purple-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Clustered Index (Physical Data Order)
          </button>
          <button
            onClick={() => setActiveClusterTab('non_clustered')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              activeClusterTab === 'non_clustered' ? 'bg-cyan-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Non-Clustered Index (Secondary Pointer Structure)
          </button>
        </div>

        {/* Card Content */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeClusterTab === 'clustered' ? (
            <div className="space-y-3 text-xs">
              <span className="text-purple-400 font-mono font-bold uppercase">Clustered Index: The Table IS the Index!</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                A clustered index dictates the actual <strong>physical on-disk storage order</strong> of the table rows. The leaf nodes of a clustered B+ tree contain the actual data rows themselves (no secondary pointer jump required!).
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-zinc-300 space-y-1">
                <div>&bull; Max Count: Strictly <strong>1 Clustered Index per table</strong> (data can only be physically sorted one way on disk).</div>
                <div>&bull; Superpower: Blazingly fast range queries (<code className="text-emerald-400">BETWEEN 100 AND 500</code>).</div>
                <div>&bull; Engine note: In MySQL InnoDB, the Primary Key is ALWAYS the Clustered Index.</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <span className="text-cyan-400 font-mono font-bold uppercase">Non-Clustered Index: Standalone Auxiliary Structure</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                A non-clustered index is completely decoupled from the physical order of table rows. It holds the sorted indexed values alongside a pointer or row locator (such as a RowID or Clustered Key value) pointing to where the real data resides.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-zinc-300 space-y-1">
                <div>&bull; Max Count: <strong>Multiple non-clustered indexes</strong> allowed per table (e.g. index on Email, index on Department).</div>
                <div>&bull; Lookup Cost: Requires an extra step (Bookmark Lookup / RowID pointer dereference) to retrieve non-indexed columns.</div>
                <div>&bull; Covering Index: If the index contains all queried columns, the extra table lookup is skipped!</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 4: DENSE VS SPARSE INDEXES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Minimize2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 4 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Dense vs. Sparse Indexes in File Organization</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3 text-xs">
            <span className="text-cyan-400 font-mono font-bold uppercase">Dense Index</span>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Contains an index record for <strong>every single search-key value</strong> in the table.
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-[11px] space-y-1 text-zinc-300">
              <div>Entry 101 &rarr; Row 101</div>
              <div>Entry 102 &rarr; Row 102</div>
              <div>Entry 103 &rarr; Row 103</div>
            </div>
            <p className="text-zinc-400 font-sans text-[11px]">
              &check; Direct, immediate lookup. &cross; Consumes significant memory and storage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3 text-xs">
            <span className="text-amber-400 font-mono font-bold uppercase">Sparse Index</span>
            <p className="text-zinc-300 font-sans leading-relaxed">
              Contains index entries for only <strong>some</strong> search keys—typically one entry per physical data block (Block Anchor).
            </p>
            <div className="p-3 bg-slate-900 rounded font-mono text-[11px] space-y-1 text-zinc-300">
              <div>Entry 101 &rarr; Points to Disk Block 1 (Holds 101–110)</div>
              <div>Entry 111 &rarr; Points to Disk Block 2 (Holds 111–120)</div>
            </div>
            <p className="text-zinc-400 font-sans text-[11px]">
              &check; Tiny memory footprint. &cross; Requires sorted data file; searches within the block.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: B-TREE VS B+ TREE INDEXING
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 5 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">B-Tree vs. B+ Tree Indexing Architecture</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          B+ Trees are the universal gold standard for relational database storage engines (MySQL InnoDB, PostgreSQL, Oracle, SQLite). Here is why:
        </p>

        {/* Tree Selector Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setTreeTab('bplus')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              treeTab === 'bplus' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            B+ Tree (Industry Standard)
          </button>
          <button
            onClick={() => setTreeTab('btree')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
              treeTab === 'btree' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
            }`}
          >
            Standard B-Tree
          </button>
        </div>

        {/* Tree Visualizer Card */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          {treeTab === 'bplus' ? (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-mono font-bold uppercase">B+ Tree: High Branching Factor &amp; Linked Leaves</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Optimal For Range Queries</span>
              </div>
              <div className="p-4 bg-black/60 rounded-xl font-mono text-[11px] space-y-2 text-zinc-300">
                <div className="text-center text-cyan-300 font-bold">[Root Node: 50 | 100]</div>
                <div className="text-center text-zinc-500">&darr; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &darr; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &darr;</div>
                <div className="text-center text-indigo-300">[Internal: 20] &nbsp; &nbsp; [Internal: 70] &nbsp; &nbsp; [Internal: 120]</div>
                <div className="text-center text-zinc-500">&darr; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &darr; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &darr;</div>
                <div className="p-2 bg-emerald-950/30 border border-emerald-500/40 rounded text-emerald-300 text-center font-bold">
                  [Leaf: 10, 20] &harr; [Leaf: 50, 70] &harr; [Leaf: 100, 120] (Doubly-Linked Chain!)
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans pt-1">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-white block font-mono">1. Shorter Height</strong>
                  <span className="text-[11px] text-zinc-400">Internal nodes store only keys and pointers, fitting thousands per 16KB disk page.</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-white block font-mono">2. Fast Range Queries</strong>
                  <span className="text-[11px] text-zinc-400">Range scans find the start key, then follow linked leaf pointers without traversing parent nodes!</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
                  <strong className="text-white block font-mono">3. Predictable Latency</strong>
                  <span className="text-[11px] text-zinc-400">Every single lookup traverses exactly the same depth (all leaves at same level).</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <span className="text-indigo-400 font-mono font-bold uppercase">Standard B-Tree: Keys &amp; Data at All Levels</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                In a standard B-Tree, actual record data pointers are stored in root and internal nodes as well as leaf nodes.
              </p>
              <div className="p-3 bg-black/60 rounded font-mono text-[11px] text-zinc-400 space-y-1">
                <div>&bull; Advantage: If a search key happens to be in the root node, search stops in 1 I/O.</div>
                <div>&bull; Disadvantage: Large internal nodes decrease branching factor, increasing tree height.</div>
                <div>&bull; Disadvantage: Leaves are not linked together; range scans require expensive in-order tree traversal.</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 6: HASH INDEXING & COLLISION CALCULATOR
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 6 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Hash Indexing &amp; Collision Playground</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          A hash index uses a mathematical function <code className="text-cyan-300 font-mono">h(k) = k mod 10</code> to achieve $O(1)$ constant time lookup for equality searches:
        </p>

        {/* Interactive Hash Calculator */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">Test Hash Function h(k) = k mod 10</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Input Key (k):</span>
              <input
                type="number"
                value={hashInputKey}
                onChange={e => setHashInputKey(parseInt(e.target.value) || 0)}
                className="w-24 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs">
            <div>
              <span>Calculation: </span>
              <span className="text-white font-bold">{hashInputKey}</span>
              <span> mod 10 = </span>
              <span className="text-emerald-400 font-extrabold text-sm">{computedHashBucket}</span>
            </div>
            <span className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Assigned Bucket: #{computedHashBucket}
            </span>
          </div>

          {/* Collision Warning */}
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1 font-sans">
            <strong className="flex items-center gap-1.5 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" /> What is a Hash Collision?
            </strong>
            <p className="text-[11px] text-zinc-300">
              Notice that <code className="text-amber-400 font-mono">101 mod 10 = 1</code> and <code className="text-amber-400 font-mono">111 mod 10 = 1</code> map to the exact same bucket! This is handled via <strong>Chaining</strong> (linked list in bucket) or <strong>Open Addressing</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 7 & 8: QUERY PROCESSING & SQL EXPLAIN PLANS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 7 &amp; 8 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Query Processing &amp; Reading SQL EXPLAIN Execution Plans</h2>
          </div>
        </div>

        {/* 5 Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { num: 1, name: 'SQL Query', desc: 'User submits text' },
            { num: 2, name: 'Parser & Lexer', desc: 'Syntax & permissions' },
            { num: 3, name: 'Query Optimizer', desc: 'Cost-based algorithm' },
            { num: 4, name: 'Execution Engine', desc: 'Runs the physical plan' },
            { num: 5, name: 'Storage Manager', desc: 'Fetches disk buffer pages' },
          ].map(st => (
            <div key={st.num} className="p-3 rounded-xl bg-[#14182d] border border-slate-700/60 text-center space-y-1">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold flex items-center justify-center mx-auto">
                {st.num}
              </span>
              <div className="text-xs font-mono font-bold text-white">{st.name}</div>
              <div className="text-[9px] text-zinc-400 font-sans">{st.desc}</div>
            </div>
          ))}
        </div>

        {/* EXPLAIN Plan Simulator */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              EXPLAIN SELECT * FROM STUDENT WHERE Department = &apos;CSE&apos;;
            </span>
            <button
              onClick={() => setExplainHasIndex(!explainHasIndex)}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 cursor-pointer"
            >
              {explainHasIndex ? 'Simulate Table Without Index' : 'Simulate Table With Index'}
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800 font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-zinc-400">
                <tr>
                  <th className="py-2 px-3">id</th>
                  <th className="py-2 px-3">select_type</th>
                  <th className="py-2 px-3">table</th>
                  <th className="py-2 px-3">type (Access Method)</th>
                  <th className="py-2 px-3">possible_keys</th>
                  <th className="py-2 px-3">key</th>
                  <th className="py-2 px-3">rows</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {explainHasIndex ? (
                  <tr className="bg-emerald-950/20 text-emerald-300">
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3">SIMPLE</td>
                    <td className="py-2 px-3 text-white">STUDENT</td>
                    <td className="py-2 px-3 font-bold text-emerald-400">ref (Index Scan)</td>
                    <td className="py-2 px-3">idx_department</td>
                    <td className="py-2 px-3 font-bold text-cyan-300">idx_department</td>
                    <td className="py-2 px-3 font-bold">3</td>
                  </tr>
                ) : (
                  <tr className="bg-rose-950/20 text-rose-300">
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3">SIMPLE</td>
                    <td className="py-2 px-3 text-white">STUDENT</td>
                    <td className="py-2 px-3 font-bold text-rose-400">ALL (Full Table Scan!)</td>
                    <td className="py-2 px-3 text-zinc-500">NULL</td>
                    <td className="py-2 px-3 text-zinc-500">NULL</td>
                    <td className="py-2 px-3 font-bold text-rose-400">1,000,000</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9: 10 PRACTICAL QUERY OPTIMIZATION RULES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 9 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">10 Production SQL Query Optimization Rules</h2>
          </div>
        </div>

        {/* 10 Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">1. Index Frequently Filtered Columns</span>
            <p className="text-zinc-300 font-sans">
              Add indexes to columns that appear consistently inside <code className="text-indigo-300 font-mono">WHERE</code> and <code className="text-indigo-300 font-mono">JOIN ON</code> conditions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">2. Avoid SELECT * in APIs</span>
            <p className="text-zinc-300 font-sans">
              Retrieve only necessary columns. Allows the query planner to use lightweight <strong>Covering Indexes</strong> without fetching full disk rows.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-rose-400 font-mono font-bold">3. Avoid Functions on Indexed Columns (Crucial!)</span>
            <p className="text-zinc-300 font-sans">
              <code className="text-rose-400 font-mono">WHERE YEAR(Admission_Date) = 2025</code> forces a full table scan! Instead write: <code className="text-emerald-400 font-mono">WHERE Admission_Date &gt;= &apos;2025-01-01&apos; AND Admission_Date &lt; &apos;2026-01-01&apos;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">4. Filter Early with WHERE</span>
            <p className="text-zinc-300 font-sans">
              Filter data as early as possible before applying expensive sorting (<code className="text-indigo-300 font-mono">ORDER BY</code>) or grouping operations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">5. Index Foreign Keys for Joins</span>
            <p className="text-zinc-300 font-sans">
              Always ensure foreign key columns in child tables are indexed to convert expensive Hash Joins / Nested Loop scans into fast Index Joins.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">6. Use LIMIT for Pagination</span>
            <p className="text-zinc-300 font-sans">
              Never return unbounded result sets to web frontends. Pair <code className="text-indigo-300 font-mono">ORDER BY</code> with <code className="text-indigo-300 font-mono">LIMIT 10</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">7. Avoid Unnecessary DISTINCT</span>
            <p className="text-zinc-300 font-sans">
              <code className="text-indigo-300 font-mono">DISTINCT</code> forces the database to sort or hash all returned records to purge duplicates. Use only when required.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">8. Choose Compact Data Types</span>
            <p className="text-zinc-300 font-sans">
              Prefer INT over BIGINT when values fit; prefer VARCHAR(50) over TEXT. Smaller rows mean more rows fit per 16KB buffer pool page.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-cyan-400 font-mono font-bold">9. Keep Database Statistics Fresh</span>
            <p className="text-zinc-300 font-sans">
              Run <code className="text-indigo-300 font-mono">ANALYZE TABLE STUDENT;</code> regularly so the query optimizer has accurate cardinality statistics.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5 text-xs">
            <span className="text-rose-400 font-mono font-bold">10. Beware of Over-Indexing</span>
            <p className="text-zinc-300 font-sans">
              Each index added degrades INSERT/UPDATE throughput. Only create indexes backed by concrete slow query logs.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10 & 11: MASTER COMPARISONS & UNIVERSITY EXAM PREP
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 10 &amp; 11 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Examination Questions &amp; Master Comparisons</h2>
          </div>
        </div>

        {/* Short Exam Q&A Accordion */}
        <div className="space-y-3">
          {[
            {
              id: 'q1',
              q: 'Q1: What is a Database Index and what are its primary advantages and disadvantages?',
              a: 'An index is an auxiliary data structure that enables fast record retrieval without full table scans. Advantages: Faster SELECT queries, efficient range retrieval, faster joins and sorts. Disadvantages: Consumes extra disk storage and adds write overhead (slower INSERT, UPDATE, DELETE).'
            },
            {
              id: 'q2',
              q: 'Q2: Differentiate between Clustered and Non-Clustered Indexes.',
              a: 'A Clustered Index physically reorders the actual table rows on disk to match the index key (only 1 per table; very fast for range queries). A Non-Clustered Index is stored separately from table rows and contains pointers/locators to the actual rows (multiple allowed per table).'
            },
            {
              id: 'q3',
              q: 'Q3: Differentiate between Dense and Sparse Indexes.',
              a: 'A Dense Index contains an index entry for every single search-key value in the table (fast lookup, higher storage). A Sparse Index contains entries for only some search keys—typically one entry per data block anchor (requires sorted table, lower storage).'
            },
            {
              id: 'q4',
              q: 'Q4: Why is a B+ Tree preferred over a standard B-Tree for relational databases?',
              a: '1. In B+ Trees, internal nodes store only keys and pointers, resulting in a much higher branching factor and shallower tree height (fewer disk I/Os). 2. All actual records/pointers reside at the leaf level, and all leaf nodes are doubly linked, enabling fast O(K) sequential range scans without re-traversing internal nodes.'
            },
            {
              id: 'q5',
              q: 'Q5: Compare Hash Indexing with B+ Tree Indexing.',
              a: 'Hash Indexing is optimal (O(1)) for exact equality lookups (WHERE ID = 100), but is completely useless for range queries (WHERE ID BETWEEN 100 AND 200). B+ Trees efficiently support both equality and range queries, which is why B+ Trees are preferred in RDBMS.'
            },
            {
              id: 'q6',
              q: 'Q6: What is SQL EXPLAIN and what does it tell you?',
              a: 'EXPLAIN is a command that reveals the execution plan chosen by the query optimizer. It shows the access method (Full Table Scan ALL vs Index Lookup ref/range), which index was chosen, estimated cost, and estimated rows processed.'
            },
            {
              id: 'q7',
              q: 'Q7: Why does wrapping an indexed column in a function degrade performance?',
              a: 'Functions (e.g. YEAR(date_col) = 2025) prevent the B+ Tree index from being searched via binary search, because the tree is sorted on the raw column value, not the computed function result. This forces a Full Table Scan unless a specialized Functional Index exists.'
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
          PART 15: HOMEWORK EXERCISES & SOLUTIONS (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 12 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practical Homework Exercises &amp; Solutions</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          Work through these 5 university-level indexing and query optimization exercises. Click <strong className="text-cyan-300">&quot;Reveal Mentor Solution&quot;</strong> to inspect verified solutions:
        </p>

        <div className="space-y-4">
          {[
            {
              id: 'hw1',
              title: 'Exercise 1: Basic Indexing Concepts (5 Marks)',
              problem: 'Explain database indexing. Write four advantages and three disadvantages of indexing.',
              sol: "• Definition: A database index is an auxiliary search data structure that maps column values to physical row locators to accelerate data retrieval.\n• 4 Advantages: 1. Drastically speeds up SELECT queries. 2. Accelerates WHERE range filtering. 3. Eliminates sorting overhead in ORDER BY. 4. Improves JOIN performance.\n• 3 Disadvantages: 1. Extra disk space consumption. 2. Write penalty (slower INSERT, UPDATE, DELETE). 3. Maintenance overhead."
            },
            {
              id: 'hw2',
              title: 'Exercise 2: Index Classification (5 Marks)',
              problem: 'Differentiate between: (a) Primary and Secondary, (b) Clustered and Non-Clustered, (c) Dense and Sparse indexes.',
              sol: "(a) Primary index is built on the table's ordering key (usually PK); Secondary index is an alternative search path on non-ordering attributes.\n(b) Clustered index physically re-orders table rows on disk (only 1 per table); Non-clustered index is stored separately with row pointers (multiple allowed).\n(c) Dense index has an entry for every search key value; Sparse index has entries for selected block anchors only (requires sorted table)."
            },
            {
              id: 'hw3',
              title: 'Exercise 3: B+ Tree Architecture (5 Marks)',
              problem: 'Explain the structure of a B+ Tree. Why are linked leaf nodes useful?',
              sol: "• Structure: Internal nodes contain only routing keys and child pointers. All actual records and data pointers reside at the leaf level.\n• Linked Leaf Utility: Leaf nodes are doubly linked in sequential order. Range queries (e.g. BETWEEN 10 AND 50) find the initial key '10' in O(log N) and then traverse the leaf chain sequentially without ever revisiting parent/internal nodes."
            },
            {
              id: 'hw4',
              title: 'Exercise 4: Hashing & Collision Analysis (5 Marks)',
              problem: 'Given h(k) = k mod 10, find bucket numbers for 123, 145, 167, 182, and 193. Identify whether any collision occurs.',
              sol: "Calculations:\n• h(123) = 123 mod 10 = 3 → Bucket 3\n• h(145) = 145 mod 10 = 5 → Bucket 5\n• h(167) = 167 mod 10 = 7 → Bucket 7\n• h(182) = 182 mod 10 = 2 → Bucket 2\n• h(193) = 193 mod 10 = 3 → Bucket 3\n\nCollision Result: YES. A collision occurs between key 123 and key 193 because both evaluate to Bucket 3. Handled via chaining or open addressing."
            },
            {
              id: 'hw5',
              title: 'Exercise 5: SQL Query Optimization (5 Marks)',
              problem: 'Given: SELECT * FROM STUDENT WHERE YEAR(Admission_Date) = 2025; Rewrite it in an index-friendly way and explain why.',
              sol: "Optimized Query:\nSELECT * FROM STUDENT \nWHERE Admission_Date >= '2025-01-01' AND Admission_Date < '2026-01-01';\n\nExplanation: In the original query, YEAR() wraps the column, forcing the engine to compute YEAR() on every single row (Full Table Scan). The rewritten query uses raw column comparison, allowing the B+ Tree index on Admission_Date to perform an instant range scan (Index Range Scan)."
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
          PART 13: REVISION CHECKLIST & NAVIGATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 13 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Lesson 10 Final Revision Checklist</h2>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Indexing &amp; Optimization Mastery</span>
            <span className="text-emerald-400 font-bold">{checklistDoneCount} of {checklistTotal} topics ({checklistPercent}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${checklistPercent}%` }}
            />
          </div>
        </div>

        {/* 18 Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            'Definition of database indexing.',
            'Advantages and disadvantages of indexes.',
            'Creating and dropping SQL indexes.',
            'Primary and secondary indexes.',
            'Clustered and non-clustered indexes.',
            'Dense and sparse index layouts.',
            'B-Tree hierarchical structure.',
            'B+ Tree leaf-linked structure.',
            'Why B+ Tree is preferred in RDBMS.',
            'Hash indexing and O(1) equality lookup.',
            'Hash collisions and resolution methods.',
            'Hash Index vs B+ Tree Index trade-offs.',
            '5 query processing stages in DBMS.',
            'Role of Cost-Based Query Optimizer.',
            'Reading SQL EXPLAIN execution plans.',
            'Full Table Scan vs Index Scan.',
            '10 query optimization practical rules.',
            'Rewriting function queries for index usage.'
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
              Upcoming • Lesson 11 Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
              Module 11
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Lesson 11: Database Security, Authorization and Backup &amp; Recovery
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            In Lesson 11, explore authentication and authorization, GRANT and REVOKE commands, Role-Based Access Control (RBAC), SQL injection prevention, backup strategies (Full, Differential, Incremental), and disaster recovery.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson9')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 9: Transactions</span>
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
