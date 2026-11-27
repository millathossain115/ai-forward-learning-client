'use client';

import React, { useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, Code2, Copy, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const INDEX_SQL_1 = `-- Basic secondary index
CREATE INDEX idx_student_name 
ON STUDENT (Name);

-- Unique index (enforces distinct values)
CREATE UNIQUE INDEX idx_student_email 
ON STUDENT (Email);`;

const INDEX_SQL_2 = `-- Multi-column composite index
CREATE INDEX idx_dept_name 
ON STUDENT (Department, Name);`;

export default function Lesson10Part1IndexBasicsSql() {
  const { language } = useLanguage();
  const [scanDemoMode, setScanDemoMode] = useState<'scan' | 'index'>('index');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <>
      {/* PART 1: WHAT IS DATABASE INDEXING? */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১ • ইনডেক্সিং পরিচিতি' : 'Part 1 of 7'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="What is Database Indexing? The Problem & Core Concept"
                bn="১. ডেটাবেস ইনডেক্সিং কী? মূল সমস্যা ও সমাধান"
              />
            </h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Scenario: University Table with 1,000,000 Rows</span>
              <p className="text-xs text-zinc-300 font-sans mt-0.5">
                Query: <code className="text-emerald-400 font-mono">SELECT * FROM STUDENT WHERE Student_ID = 1004;</code>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setScanDemoMode('scan')}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                  scanDemoMode === 'scan' ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                Without Index (Full Scan)
              </button>
              <button
                onClick={() => setScanDemoMode('index')}
                className={`px-3 py-1 rounded-lg text-xs font-mono cursor-pointer transition-colors ${
                  scanDemoMode === 'index' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-zinc-400'
                }`}
              >
                With B+ Tree Index
              </button>
            </div>
          </div>

          {scanDemoMode === 'scan' ? (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-rose-300 font-mono font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Full Table Scan (Sequential Scan): O(N) Complexity</span>
              </div>
              <DualText
                as="p"
                className="text-zinc-300 font-sans leading-relaxed"
                en="The engine reads disk pages sequentially across up to 1,000,000 records, incurring massive disk I/O and high latency."
                bn="ইঞ্জিনকে টেবিলের শুরু থেকে একে একে ১,০০০,০০০ রেকর্ড পড়তে হয়, যা প্রচুর ডিস্ক I/O ও সময় নষ্ট করে।"
              />
              <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-rose-300">
                Estimated Disk Reads: ~10,000 Pages • Execution Time: ~850 ms
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>B+ Tree Index Lookup: O(log N) Complexity</span>
              </div>
              <DualText
                as="p"
                className="text-zinc-300 font-sans leading-relaxed"
                en="The engine traverses a balanced B+ Tree (branching factor 500) in just 3–4 page hops directly to the target row."
                bn="ব্যালেন্সড B+ Tree ব্যবহার করে মাত্র ৩–৪টি ধাপেই সরাসরি কাঙ্ক্ষিত সারিতে পৌঁছে যাওয়া যায়।"
              />
              <div className="p-2.5 bg-black/40 rounded font-mono text-[11px] text-emerald-300">
                Estimated Disk Reads: 3 to 4 Pages • Execution Time: ~0.4 ms (2,000x Faster!)
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">
              <DualText as="span" en="The Book Index Analogy" bn="বইয়ের সূচিপত্রের উপমা" />
            </span>
            <ul className="space-y-1 list-disc pl-4 text-zinc-300">
              <li><DualText as="span" en="Without index: read pages 1 to 1,000 sequentially." bn="ইনডেক্স ছাড়া: ১ থেকে ১,০০০ পৃষ্ঠা পর্যন্ত প্রতিটি পাতা উল্টে খোঁজা।" /></li>
              <li><DualText as="span" en="With index: check the back index → jump straight to page 412!" bn="ইনডেক্স থাকলে: সূচিপত্র দেখে সরাসরি ৪১২ নম্বর পৃষ্ঠায় চলে যাওয়া।" /></li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 text-xs">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">
              <DualText as="span" en="The Index Trade-Off (Write Penalty)" bn="ইনডেক্সের সীমাবদ্ধতা (Write Penalty)" />
            </span>
            <ul className="space-y-1 list-disc pl-4 text-zinc-300">
              <li><strong className="text-emerald-400">Pros:</strong> Accelerates <code className="text-cyan-300 font-mono">SELECT / WHERE / ORDER BY / JOIN</code>.</li>
              <li><strong className="text-rose-400">Cons:</strong> Extra disk space + slows <code className="text-amber-300 font-mono">INSERT / UPDATE / DELETE</code> (trees must rebalance).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PART 2: CREATING INDEXES IN SQL */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২ • SQL ইনডেক্স তৈরি' : 'Part 2 of 7'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText as="span" en="Creating & Managing Indexes in SQL" bn="২. SQL-এ ইনডেক্স তৈরি ও ব্যবস্থাপনা" />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Single &amp; Unique Indexes</span>
              <button
                onClick={() => handleCopy(INDEX_SQL_1, 'idx1')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'idx1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'idx1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
              {INDEX_SQL_1}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-300 uppercase">Composite Index &amp; Leftmost Prefix</span>
              <button
                onClick={() => handleCopy(INDEX_SQL_2, 'idx2')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copiedId === 'idx2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'idx2' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
              {INDEX_SQL_2}
            </pre>
            <div className="p-2.5 bg-indigo-950/30 border border-indigo-500/30 rounded text-xs text-indigo-200 font-sans">
              <DualText
                as="span"
                en={<><strong>Leftmost Prefix Rule:</strong> Index on <code className="text-cyan-300 font-mono">(Department, Name)</code> works for <code className="text-emerald-400 font-mono">Department</code>, but NOT for <code className="text-rose-400 font-mono">Name</code> alone!</>}
                bn={<><strong>Leftmost Prefix নিয়ম:</strong> <code className="text-cyan-300 font-mono">(Department, Name)</code> ইনডেক্স <code className="text-emerald-400 font-mono">Department</code> ফিল্টারে কাজ করবে, কিন্তু শুধু <code className="text-rose-400 font-mono">Name</code> ফিল্টারে কাজ করবে না!</>}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
