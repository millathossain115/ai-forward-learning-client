'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  Server,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Building2,
  Share2,
  FolderTree,
  Boxes,
  FileSpreadsheet,
  Network,
  Gamepad2,
  CheckCircle2,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Workflow,
  Compass,
  FileCode2,
  Hash,
  Share
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseLesson2TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson2Topic({ onNavigate }: DatabaseLesson2TopicProps) {
  // Part 1: Selected Organization
  const [selectedOrg, setSelectedOrg] = useState<'university' | 'bank' | 'social'>('university');

  // Part 3: Active Model Tab
  const [activeModel, setActiveModel] = useState<
    'flat' | 'hierarchical' | 'network' | 'relational' | 'oop' | 'nosql'
  >('relational');

  // Part 3.4: Relational Model Highlight
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>('101');

  // Part 3.6: NoSQL Sub-tab
  const [activeNoSqlType, setActiveNoSqlType] = useState<'document' | 'key-value' | 'column' | 'graph'>('document');

  // Part 3.6: Key-Value Interactive lookup
  const [lookupKey, setLookupKey] = useState('user_101');

  // Part 5: Exam Questions Accordion
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Sample data for Relational model
  const relationalStudents = [
    { id: '101', name: 'Rahim', dept: 'CSE' },
    { id: '102', name: 'Karim', dept: 'BBA' },
    { id: '103', name: 'Nila', dept: 'EEE' },
  ];

  const relationalCourses = [
    { id: 'C01', name: 'Database Systems', code: 'CSE201' },
    { id: 'C02', name: 'Discrete Mathematics', code: 'MTH101' },
  ];

  const relationalEnrollments = [
    { studentId: '101', courseId: 'C01', semester: 'Spring 2026' },
    { studentId: '101', courseId: 'C02', semester: 'Spring 2026' },
    { studentId: '102', courseId: 'C01', semester: 'Spring 2026' },
    { studentId: '103', courseId: 'C02', semester: 'Spring 2026' },
  ];

  // Key-value sample store
  const kvStore: Record<string, string> = {
    user_101: 'Rahim (Active, Dhaka, Balance: $5,240)',
    user_102: 'Karim (Active, Chittagong, Balance: $1,890)',
    user_103: 'Nila (Active, Sylhet, Balance: $9,400)',
    session_tok_99: 'Valid • Expires in 15 mins • Role: Student',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d1020] to-[#070810] border border-[#202744] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Lesson 2 of your DBMS journey • Beginner level
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Architectural Blueprints
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Lesson 2: Types of Databases and Database Models
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              Welcome to Lesson 2! In Lesson 1, we learned that Data is raw facts, Information is processed insight, a Database is an organized collection, and DBMS is the managing engine. Today, we explore how different databases organize data—from <strong>Flat Files</strong> and <strong>Hierarchical Trees</strong> to <strong>Relational Tables</strong> and modern <strong>NoSQL</strong> architectures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate?.('backend-lesson3')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <TableIcon className="w-4 h-4" />
              <span>Next: Lesson 3 (Relational Model)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson1')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lesson 1</span>
            </button>
          </div>
        </div>

        {/* Lesson 1 Quick Recap Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Lesson 1 Recap in 30 Seconds:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-amber-400 block">Data:</strong> Raw facts (e.g. 101, Rahim, 3.80)
            </div>
            <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-cyan-400 block">Information:</strong> Processed &amp; meaningful context
            </div>
            <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-purple-400 block">Database:</strong> Organized collection of data
            </div>
            <div className="p-2.5 rounded-lg bg-[#101322] border border-slate-800 text-zinc-300">
              <strong className="text-emerald-400 block">DBMS:</strong> The software engine managing it
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: WHY DO WE HAVE DIFFERENT TYPES OF DATABASES?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 1 of 5
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Why do we have different types of databases?</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Imagine three completely different organizations. Do all three need the exact same database structure?
          </p>

          {/* 3 Organization Interactive Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'university',
                title: '1. University',
                icon: GraduationCap,
                color: 'text-amber-400',
                borderActive: 'border-amber-500 bg-amber-500/10 text-amber-300',
                summary: 'Structured records: Students, Courses, Teachers, CGPA, Attendance.',
              },
              {
                id: 'bank',
                title: '2. Commercial Bank',
                icon: Building2,
                color: 'text-emerald-400',
                borderActive: 'border-emerald-500 bg-emerald-500/10 text-emerald-300',
                summary: 'Strict ACID: Customer accounts, transactions, transfers, loans, audit logs.',
              },
              {
                id: 'social',
                title: '3. Social Media (FB / IG)',
                icon: Share2,
                color: 'text-cyan-400',
                borderActive: 'border-cyan-500 bg-cyan-500/10 text-cyan-300',
                summary: 'Unstructured & Graph: Posts, videos, stories, comments, likes, friend networks.',
              },
            ].map((org) => {
              const Icon = org.icon;
              const isSelected = selectedOrg === org.id;

              return (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrg(org.id as typeof selectedOrg)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? org.borderActive
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                      <Icon className={`w-4 h-4 ${org.color}`} /> {org.title}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />}
                  </div>
                  <p className="text-[11px] leading-snug">{org.summary}</p>
                </button>
              );
            })}
          </div>

          {/* Dynamic Insight based on selected Org */}
          <div className="p-5 rounded-2xl bg-[#14182e] border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Requirements Analysis for{' '}
              <span className="text-indigo-300">
                {selectedOrg === 'university'
                  ? 'University Management'
                  : selectedOrg === 'bank'
                  ? 'Banking & Finance System'
                  : 'Social Media Platform'}
              </span>
              :
            </h4>

            {selectedOrg === 'university' && (
              <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                <p>
                  A university deals primarily with <strong>structured tabular entities</strong>. Students enroll in courses, courses belong to departments, and teachers give letter grades. A <strong>Relational Database (SQL)</strong> is ideal because referential integrity (foreign keys) ensures an enrollment record cannot exist without a valid student.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-amber-900/40 text-amber-300">Fixed Schemas</span>
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-amber-900/40 text-amber-300">Foreign Keys</span>
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-amber-900/40 text-amber-300">Tabular Reports</span>
                </div>
              </div>
            )}

            {selectedOrg === 'bank' && (
              <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                <p>
                  A bank requires <strong>absolute zero data loss and strict consistency (ACID)</strong>. If \$500 is debited from Rahim&apos;s account, it must instantly credit Karim&apos;s account or fail completely. Traditional relational systems (like PostgreSQL or Oracle) with Write-Ahead Logging (WAL) and Row-Level Locking guarantee that financial transactions are bulletproof.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-emerald-900/40 text-emerald-300">ACID Compliance</span>
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-emerald-900/40 text-emerald-300">Audit Trails</span>
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-emerald-900/40 text-emerald-300">High Reliability</span>
                </div>
              </div>
            )}

            {selectedOrg === 'social' && (
              <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
                <p>
                  A social media platform processes billions of likes, polymorphic posts (images, text, video streams), and friend recommendation paths across millions of users worldwide. A single relational table would crawl under this load! That is why social networks use <strong>Graph Databases</strong> (like Neo4j for friend connections), <strong>Document Databases</strong> (for flexible posts), and <strong>Key-Value Caches</strong> (like Redis for rapid feeds).
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-cyan-900/40 text-cyan-300">Graph Networks</span>
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-cyan-900/40 text-cyan-300">Polymorphic JSON</span>
                  <span className="px-2.5 py-1 rounded bg-black/40 border border-cyan-900/40 text-cyan-300">Microsecond In-Memory Feeds</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-300 leading-relaxed font-sans">
            <strong>Key Conclusion:</strong> Different applications have vastly different data requirements. There is no &ldquo;one-size-fits-all&rdquo; database. That is why distinct <strong>Database Models</strong> were invented.
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: UNDERSTANDING DATABASE MODELS (BLUEPRINT)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 2 of 5
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a Database Model? (ব্লুপ্রিন্ট ধারণা)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-300 leading-relaxed">
            <strong className="text-purple-200 block text-sm font-mono mb-1">
              Definition (সংজ্ঞা):
            </strong>
            &ldquo;A database model describes how data is structured, organized, stored, and related within a database system.&rdquo;
            <br />
            (একটি ডেটাবেস মডেল নির্ধারণ করে যে কীভাবে ডেটা সংগঠিত হবে, কীভাবে সংরক্ষিত থাকবে এবং একটি তথ্যের সাথে অন্য তথ্যের সম্পর্ক কীভাবে স্থাপিত হবে।)
          </div>

          {/* Architectural Blueprint Analogy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                বাস্তব জীবনের অ্যানালজি
              </span>
              <h3 className="text-sm font-bold text-white">ভবন নির্মাণের ব্লুপ্রিন্ট (Architectural Blueprint)</h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                একটি বহুতল ভবন নির্মাণের আগে আর্কিটেক্ট একটি নীল নকশা বা ব্লুপ্রিন্ট তৈরি করেন। নকশায় স্থির থাকে কোথায় পিলার থাকবে, কতগুলো কক্ষ হবে এবং কীভাবে পানির পাইপলাইন সাজানো হবে।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-2 ring-1 ring-indigo-500/30">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                সফটওয়্যার ইঞ্জিনিয়ারিং অ্যানালজি
              </span>
              <h3 className="text-sm font-bold text-white">ডেটাবেস মডেল (Database Model)</h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                ডেটাবেসে ডেটা ঢোকানোর আগে আমরা মডেলের মাধ্যমে ঠিক করি ডেটা কি টেবিলে থাকবে, গাছের মতো শাখাপ্রশাখায় থাকবে, নাকি অবজেক্ট আকারে থাকবে। এই কাঠামোগত সিদ্ধান্তই হলো ডেটাবেস মডেল।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: THE 6 CORE DATABASE MODELS (DEEP DIVE)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 3 of 5
            </span>
            <h2 className="text-xl font-bold text-white mt-1">The 6 Important Database Models</h2>
          </div>
        </div>

        {/* Model Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'flat', label: '1. Flat File', icon: FileSpreadsheet, tag: 'Single File' },
            { id: 'hierarchical', label: '2. Hierarchical', icon: FolderTree, tag: 'Tree Structure' },
            { id: 'network', label: '3. Network', icon: Network, tag: 'Graph of Links' },
            { id: 'relational', label: '4. Relational', icon: TableIcon, tag: 'Tables & Keys' },
            { id: 'oop', label: '5. Object-Oriented', icon: Gamepad2, tag: 'OOP Objects' },
            { id: 'nosql', label: '6. NoSQL Models', icon: Boxes, tag: 'Flexible Scale' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeModel === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveModel(tab.id as typeof activeModel)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-md'
                    : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                </div>
                <div>
                  <h4 className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {tab.label}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono">{tab.tag}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ----------------------------------------------------
            MODEL 1: FLAT FILE
           ---------------------------------------------------- */}
        {activeModel === 'flat' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Model 01</span>
                <h3 className="text-base font-bold text-white">Flat File Database Model (ফ্ল্যাট ফাইল মডেল)</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                Simplest Format
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A flat-file database stores data in a <em>single file</em> (such as a CSV or TSV spreadsheet) without built-in relational links or foreign keys.
            </p>

            {/* Students.csv Live Representation */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                Example File: Students.csv
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                      <th className="py-2 px-4 text-amber-400">ID</th>
                      <th className="py-2 px-4 text-cyan-400">Name</th>
                      <th className="py-2 px-4 text-purple-400">Department</th>
                      <th className="py-2 px-4 text-emerald-400 text-right">CGPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                    <tr><td className="py-2 px-4">101</td><td className="py-2 px-4">Rahim</td><td className="py-2 px-4">CSE</td><td className="py-2 px-4 text-right">3.80</td></tr>
                    <tr><td className="py-2 px-4">102</td><td className="py-2 px-4">Karim</td><td className="py-2 px-4">BBA</td><td className="py-2 px-4 text-right">3.65</td></tr>
                    <tr><td className="py-2 px-4">103</td><td className="py-2 px-4">Nila</td><td className="py-2 px-4">EEE</td><td className="py-2 px-4 text-right">3.90</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pros and Cons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                <span className="font-bold text-emerald-400 font-mono block">✓ Advantages (সুবিধাসমূহ):</span>
                <ul className="list-disc list-inside text-zinc-300 space-y-0.5">
                  <li>Simple to understand and create</li>
                  <li>No complex installation required</li>
                  <li>Ideal for small, single-purpose datasets (e.g. daily grocery shop sales)</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                <span className="font-bold text-rose-400 font-mono block">✗ Disadvantages (সীমাবদ্ধতা):</span>
                <ul className="list-disc list-inside text-zinc-300 space-y-0.5">
                  <li>Data duplication and inconsistency occur easily</li>
                  <li>Zero relationships between multiple datasets</li>
                  <li>No concurrency or granular security locks</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODEL 2: HIERARCHICAL MODEL
           ---------------------------------------------------- */}
        {activeModel === 'hierarchical' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">Model 02</span>
                <h3 className="text-base font-bold text-white">Hierarchical Database Model (হায়ারার্কিক্যাল বা বৃক্ষ মডেল)</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
                1 Parent $\rightarrow$ N Children
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A hierarchical database model organizes data in a <em>tree-like structure</em> using <strong>parent-child relationships</strong>. A parent can have multiple children, but each child has strictly <strong>only one parent</strong>.
            </p>

            {/* Tree Structure Visualizer */}
            <div className="p-5 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                Tree Hierarchy Representation (কম্পিউটারের ফোল্ডারের মতো):
              </span>
              <div className="p-4 rounded-lg bg-black/50 border border-slate-800 text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <FolderTree className="w-4 h-4" /> [Root Parent] University
                </div>
                <div className="pl-6 space-y-2 border-l-2 border-indigo-500/30 ml-2">
                  <div className="text-sky-300 font-semibold flex items-center gap-1.5">
                    📁 CSE Department
                  </div>
                  <div className="pl-6 space-y-1 border-l-2 border-sky-500/30 ml-2 text-zinc-400">
                    <div>👤 Student 101 (Rahim) $\rightarrow$ 📚 Course CSE201</div>
                    <div>👤 Student 102 (Sami) $\rightarrow$ 📚 Course CSE101</div>
                  </div>

                  <div className="text-sky-300 font-semibold flex items-center gap-1.5 pt-1">
                    📁 BBA Department
                  </div>
                  <div className="pl-6 space-y-1 border-l-2 border-sky-500/30 ml-2 text-zinc-400">
                    <div>👤 Student 103 (Karim) $\rightarrow$ 📚 Course MKT101</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pros & Cons & Historical Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                <span className="font-bold text-emerald-400 font-mono block">✓ Advantages:</span>
                <p className="text-zinc-300 leading-snug">
                  Fast 1:N navigations, clear corporate hierarchies, easy parent-to-child lookups.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                <span className="font-bold text-rose-400 font-mono block">✗ Disadvantages:</span>
                <p className="text-zinc-300 leading-snug">
                  A child cannot have multiple parents! Representing many-to-many causes massive data duplication.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-[11px] text-zinc-400 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span><strong>Historical Landmark:</strong> IBM IMS (Information Management System) launched for NASA’s Apollo program.</span>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODEL 3: NETWORK MODEL
           ---------------------------------------------------- */}
        {activeModel === 'network' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Model 03</span>
                <h3 className="text-base font-bold text-white">Network Database Model (নেটওয়ার্ক মডেল)</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                N Parents $\leftrightarrow$ N Children (M:N)
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> The network database model organizes data as records connected through links, allowing a child record to have <strong>multiple parents</strong>. It was designed to solve the rigidity of hierarchical trees.
            </p>

            {/* University Multi-parent Scenario Demo */}
            <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                বাস্তব জীবনের M:N সমস্যা ও নেটওয়ার্ক সমাধান:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-center">
                  <span className="text-indigo-400 font-bold block">Students</span>
                  <p className="text-zinc-300 mt-1">Rahim &amp; Karim</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-900/40 text-center flex flex-col justify-center">
                  <span className="text-purple-300 text-[10px]">Connected Links</span>
                  <span className="text-zinc-400">$\longleftrightarrow$</span>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-center">
                  <span className="text-emerald-400 font-bold block">Courses &amp; Teachers</span>
                  <p className="text-zinc-300 mt-1">Database (Mr. Ali)</p>
                  <p className="text-zinc-300">Math (Ms. Sara)</p>
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Notice: রহিম একই সাথে Database এবং Math নিচ্ছে। আবার করিমও Database নিচ্ছে। ফলে Database কোর্সটির প্যারেন্ট দুজন ছাত্র হতে পারছে।
              </p>
            </div>

            {/* Pros, Cons, Milestone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                <span className="font-bold text-emerald-400 font-mono block">✓ Advantages:</span>
                <p className="text-zinc-300 leading-snug">
                  Naturally models complex many-to-many relationships without duplicate records.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
                <span className="font-bold text-rose-400 font-mono block">✗ Disadvantages:</span>
                <p className="text-zinc-300 leading-snug">
                  Extreme pointer complexity; if a pointer breaks, navigating the database corrupts.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-[11px] text-zinc-400 font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>Historical Landmark:</strong> IDMS (Integrated Database Management System) by Cullinet.</span>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODEL 4: RELATIONAL MODEL (HERO MODEL)
           ---------------------------------------------------- */}
        {activeModel === 'relational' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-indigo-500/40 space-y-5 animate-in fade-in duration-200 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">Model 04 • The Standard</span>
                <h3 className="text-base font-bold text-white">Relational Database Model (রিলেশনাল মডেল)</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-bold">
                Tables, Rows, Columns &amp; Keys
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> The relational model organizes data into <strong>tables (relations)</strong> consisting of rows (tuples) and columns (attributes), with relationships between tables established through <strong>keys (Primary Key &amp; Foreign Key)</strong>.
            </p>

            {/* Interactive 3-Table Relational Explorer */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-indigo-400" />
                  Interactive 3-Table Explorer (Click a Student to highlight their Enrollments):
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Active ID: <strong className="text-indigo-400">{selectedStudentId}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                {/* Students Table */}
                <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-amber-900/40 space-y-2">
                  <div className="border-b border-slate-800 pb-1.5 flex justify-between items-center">
                    <span className="text-amber-400 font-bold">1. STUDENTS</span>
                    <span className="text-[10px] text-zinc-500">PK: Student_ID</span>
                  </div>
                  <div className="space-y-1">
                    {relationalStudents.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStudentId(s.id)}
                        className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer flex justify-between items-center ${
                          selectedStudentId === s.id
                            ? 'bg-amber-500/20 border border-amber-500/60 text-white font-bold'
                            : 'hover:bg-slate-800/40 text-zinc-400'
                        }`}
                      >
                        <span>{s.id} · {s.name}</span>
                        <span className="text-[10px] text-zinc-500">{s.dept}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enrollments Table (Junction) */}
                <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-indigo-900/40 space-y-2 ring-1 ring-indigo-500/20">
                  <div className="border-b border-slate-800 pb-1.5 flex justify-between items-center">
                    <span className="text-indigo-300 font-bold">2. ENROLLMENTS</span>
                    <span className="text-[10px] text-zinc-500">FKs: Student &amp; Course</span>
                  </div>
                  <div className="space-y-1">
                    {relationalEnrollments.map((enr, idx) => {
                      const isHighlighted = enr.studentId === selectedStudentId;

                      return (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg transition-all flex justify-between items-center ${
                            isHighlighted
                              ? 'bg-indigo-600/30 border border-indigo-400 text-white font-bold'
                              : 'bg-black/30 text-zinc-500 opacity-60'
                          }`}
                        >
                          <span className={isHighlighted ? 'text-amber-300' : ''}>Student: {enr.studentId}</span>
                          <span className={isHighlighted ? 'text-cyan-300' : ''}>Course: {enr.courseId}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Courses Table */}
                <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-cyan-900/40 space-y-2">
                  <div className="border-b border-slate-800 pb-1.5 flex justify-between items-center">
                    <span className="text-cyan-400 font-bold">3. COURSES</span>
                    <span className="text-[10px] text-zinc-500">PK: Course_ID</span>
                  </div>
                  <div className="space-y-1">
                    {relationalCourses.map((c) => (
                      <div
                        key={c.id}
                        className="p-2 rounded-lg bg-black/40 border border-slate-800 flex justify-between items-center text-zinc-300"
                      >
                        <span className="font-bold text-cyan-300">{c.id}</span>
                        <span className="text-[11px]">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-300 font-sans leading-relaxed">
                💡 <strong>Notice how elegant this is:</strong> We do not duplicate student names inside courses. We simply link them via <code>Student_ID</code> and <code>Course_ID</code> in the <code>Enrollments</code> table. That is the genius of the Relational Model!
              </div>
            </div>

            {/* Popular RDBMS Engines */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                Industry-Leading Relational DBMS Engines:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
                  <strong className="text-cyan-400 block">PostgreSQL</strong>
                  <span className="text-[10px] text-zinc-500">JSONB + pgvector</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
                  <strong className="text-amber-400 block">MySQL</strong>
                  <span className="text-[10px] text-zinc-500">Web applications</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
                  <strong className="text-rose-400 block">Oracle DB</strong>
                  <span className="text-[10px] text-zinc-500">Banking enterprises</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
                  <strong className="text-indigo-400 block">SQL Server</strong>
                  <span className="text-[10px] text-zinc-500">Microsoft ecosystems</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODEL 5: OBJECT-ORIENTED MODEL
           ---------------------------------------------------- */}
        {activeModel === 'oop' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-pink-400 font-bold">Model 05</span>
                <h3 className="text-base font-bold text-white">Object-Oriented Database Model (অবজেক্ট ওরিয়েন্টেড মডেল)</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300">
                Attributes + Methods
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> An object-oriented database model stores information as <strong>objects</strong> (combining data fields and executable methods), mirroring modern OOP languages like Java, C++, and Python.
            </p>

            {/* Video Game Character Interactive Card */}
            <div className="p-5 rounded-2xl bg-[#0c0e18] border border-pink-900/40 space-y-4">
              <span className="text-xs font-mono font-bold text-pink-300 uppercase flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-pink-400" />
                Video Game Character Object Representation:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
                  <span className="text-[10px] text-amber-400 uppercase font-bold block">1. Attributes (Data State)</span>
                  <div className="text-zinc-300 space-y-1">
                    <div>name: <span className="text-white">&ldquo;Rahim_Warrior&rdquo;</span></div>
                    <div>health: <span className="text-emerald-400">100 / 100</span></div>
                    <div>level: <span className="text-cyan-400">5</span></div>
                    <div>weapon: <span className="text-purple-300">&ldquo;B-Tree Sword&rdquo;</span></div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">2. Methods (Behaviors)</span>
                  <div className="text-zinc-300 space-y-1">
                    <div>attack(targetEnemy) <span className="text-zinc-500">// inflicts damage</span></div>
                    <div>jump() <span className="text-zinc-500">// changes Y-coordinate</span></div>
                    <div>run(speedMultiplier) <span className="text-zinc-500">// updates position</span></div>
                    <div>defend() <span className="text-zinc-500">// reduces incoming hit</span></div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                সাধারন রিলেশনাল টেবিলে শুধু ডেটা রাখা যায়, কোনো ফাংশন বা বিহেভিয়ার রাখা যায় না। অবজেক্ট-ওরিয়েন্টেড ডেটাবেস এই দুটিকে একসাথে ক্যাপসিউল হিসেবে সংরক্ষণ করে।
              </p>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            MODEL 6: NOSQL MODELS
           ---------------------------------------------------- */}
        {activeModel === 'nosql' && (
          <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Model 06 • Modern Web Scale</span>
                <h3 className="text-base font-bold text-white">NoSQL Database Models (Not Only SQL)</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                4 Architectural Types
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> NoSQL databases are non-relational database systems designed for high velocity, flexible polyglot schemas, and horizontal distributed scaling across thousands of cloud servers.
            </p>

            {/* 4 NoSQL Sub-Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {[
                { id: 'document', label: 'A. Document', engine: 'MongoDB' },
                { id: 'key-value', label: 'B. Key-Value', engine: 'Redis' },
                { id: 'column', label: 'C. Column-Family', engine: 'Cassandra' },
                { id: 'graph', label: 'D. Graph', engine: 'Neo4j' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveNoSqlType(sub.id as typeof activeNoSqlType)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    activeNoSqlType === sub.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-1 ring-cyan-500/40'
                      : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs block">{sub.label}</span>
                  <span className="text-[10px] font-mono text-cyan-300">{sub.engine}</span>
                </button>
              ))}
            </div>

            {/* Sub-tab 1: Document (JSON) */}
            {activeNoSqlType === 'document' && (
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <FileCode2 className="w-4 h-4" /> Document Model (JSON Structure in MongoDB):
                </span>
                <pre className="p-3 rounded-lg bg-black/60 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-800">
{`{
  "student_id": 101,
  "name": "Rahim",
  "department": "CSE",
  "skills": ["Python", "JavaScript", "SQL", "Docker"],
  "social_links": {
    "github": "github.com/rahim",
    "linkedin": "linkedin.com/in/rahim"
  }
}`}
                </pre>
                <p className="text-[11px] text-zinc-400 font-sans leading-snug">
                  Notice how skills and social links are nested naturally within the same document without needing a separate join table!
                </p>
              </div>
            )}

            {/* Sub-tab 2: Key-Value (Redis) */}
            {activeNoSqlType === 'key-value' && (
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <Hash className="w-4 h-4" /> Key-Value Pair Store (Redis High-Speed Caching):
                </span>
                <div className="flex gap-2">
                  {Object.keys(kvStore).map((key) => (
                    <button
                      key={key}
                      onClick={() => setLookupKey(key)}
                      className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                        lookupKey === key
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-[#121526] border-slate-800 text-zinc-400'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-black/60 border border-slate-800">
                  <span className="text-zinc-500 text-[10px] block">GET {lookupKey}</span>
                  <span className="text-emerald-300 font-bold">{kvStore[lookupKey]}</span>
                </div>
              </div>
            )}

            {/* Sub-tab 3: Column-Family (Cassandra) */}
            {activeNoSqlType === 'column' && (
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4" /> Column-Family Store (Apache Cassandra):
                </span>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  Data is organized into column families rather than rigid fixed-column tables. Each row key can hold dynamic columns, making it capable of processing billions of sensor data points or analytics events across distributed server racks.
                </p>
                <div className="p-3 rounded-lg bg-black/50 border border-slate-800 text-[11px] text-purple-300">
                  RowKey: Sensor_Dhaka_01 $\rightarrow$ [timestamp: 2026-11-17, temp: 29C, humidity: 80%]
                </div>
              </div>
            )}

            {/* Sub-tab 4: Graph (Neo4j) */}
            {activeNoSqlType === 'graph' && (
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Graph Database (Neo4j Social Network Graph):
                </span>
                <div className="p-4 rounded-lg bg-black/50 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-center gap-3 text-xs">
                    <span className="px-3 py-1.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
                      👤 Rahim
                    </span>
                    <span className="text-zinc-500 text-[10px] font-mono">&mdash;[FRIENDS_WITH]&rarr;</span>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                      👤 Karim
                    </span>
                    <span className="text-zinc-500 text-[10px] font-mono">&mdash;[FRIENDS_WITH]&rarr;</span>
                    <span className="px-3 py-1.5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold">
                      👤 Nila
                    </span>
                  </div>
                  <p className="text-[11px] text-center text-zinc-400 font-sans pt-1">
                    Nodes = People, Edges = Social Relationships, Properties = Age, Mutual Friends.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ========================================================
          PART 4: COMPARING ALL DATABASE MODELS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 4 of 5
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Comparing All 6 Database Models</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                <th className="py-2.5 px-4 font-bold text-indigo-400">Model</th>
                <th className="py-2.5 px-4 font-bold text-amber-400">Structure</th>
                <th className="py-2.5 px-4 font-bold text-white">Main Characteristic</th>
                <th className="py-2.5 px-4 font-bold text-cyan-400">Primary Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">Flat File</td>
                <td className="py-2.5 px-4">Single file (.csv, .tsv)</td>
                <td className="py-2.5 px-4">Simple tabular records, zero foreign keys</td>
                <td className="py-2.5 px-4 text-cyan-300">Excel, CSV</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">Hierarchical</td>
                <td className="py-2.5 px-4">Tree structure</td>
                <td className="py-2.5 px-4">1 parent to multiple children</td>
                <td className="py-2.5 px-4 text-cyan-300">IBM IMS, Windows Registry</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">Network</td>
                <td className="py-2.5 px-4">Graph of linked records</td>
                <td className="py-2.5 px-4">Multiple parents and children (M:N)</td>
                <td className="py-2.5 px-4 text-cyan-300">IDMS</td>
              </tr>
              <tr className="bg-indigo-950/20">
                <td className="py-2.5 px-4 font-bold text-indigo-300">Relational</td>
                <td className="py-2.5 px-4 font-bold text-indigo-300">Tables (Relations)</td>
                <td className="py-2.5 px-4 font-bold text-indigo-200">Rows, columns, Primary &amp; Foreign Keys</td>
                <td className="py-2.5 px-4 text-indigo-300 font-bold">PostgreSQL, MySQL</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">Object-Oriented</td>
                <td className="py-2.5 px-4">OOP Objects</td>
                <td className="py-2.5 px-4">Attributes combined with callable methods</td>
                <td className="py-2.5 px-4 text-cyan-300">db4o, ObjectDB</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">NoSQL</td>
                <td className="py-2.5 px-4">JSON, KV, Columns, Graphs</td>
                <td className="py-2.5 px-4">Schema-less, horizontally distributed</td>
                <td className="py-2.5 px-4 text-cyan-300">MongoDB, Redis, Neo4j</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 5: IMPORTANT EXAM QUESTIONS (ACCORDION / FLASHCARDS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 5 of 5
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Important Exam &amp; Interview Questions</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-sans">
          These are the most common questions you will encounter in academic exams and technical interviews. Click each question to reveal the comprehensive model answer:
        </p>

        {/* 5 Questions Accordion */}
        <div className="space-y-3">
          {[
            {
              id: 1,
              q: 'Q1. What is a database model? (ডেটাবেস মডেল কাকে বলে?)',
              a: 'A database model defines the logical structure, organization, storage format, and relationships of data within a database system. It acts as an architectural blueprint before physical tables or collections are created.',
            },
            {
              id: 2,
              q: 'Q2. What is the fundamental difference between hierarchical and network database models?',
              a: 'In a hierarchical model, data is structured as a strict tree where each child can have only ONE parent. In contrast, the network model allows a child record to have MULTIPLE parents, enabling direct representation of many-to-many (M:N) relationships without duplicating records.',
            },
            {
              id: 3,
              q: 'Q3. What is the relational database model? (রিলেশনাল মডেল কী?)',
              a: 'The relational database model organizes data into two-dimensional tables (called relations) composed of rows (tuples) and columns (attributes). Data across different tables is interconnected through keys (Primary Keys and Foreign Keys), providing strong integrity and mathematical querying via SQL.',
            },
            {
              id: 4,
              q: 'Q4. What is NoSQL and why did it become popular?',
              a: 'NoSQL stands for "Not Only SQL". It refers to non-relational database management systems designed for handling flexible polymorphic data structures, high-velocity streaming, and massive horizontal scaling across distributed clouds where rigid table schemas become a bottleneck.',
            },
            {
              id: 5,
              q: 'Q5. What are the four major types of NoSQL databases?',
              a: '1. Document Databases (e.g. MongoDB, storing JSON-like documents)\n2. Key-Value Databases (e.g. Redis, ultra-fast dictionary pairs in memory)\n3. Column-Family Databases (e.g. Apache Cassandra, distributed sparse columns)\n4. Graph Databases (e.g. Neo4j, storing nodes and interconnected relationship edges)',
            },
          ].map((item) => {
            const isExpanded = expandedQuestions[item.id];

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-[#121526] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs md:text-sm font-bold text-white font-sans">
                    {item.q}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-slate-800/60 bg-black/30">
                    <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200 whitespace-pre-line">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Roadmap Bridge Navigation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Lesson 2 Completed
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              ✓ Ready for Architecture Roadmap
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            What&apos;s Next: Database Systems Architecture Roadmap
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Now that you understand the six database models, you are ready to explore how real databases are built under the hood: <strong>8KB Paging</strong>, <strong>Buffer Pools</strong>, <strong>B-Tree Indexes</strong>, and modern <strong>Vector Databases (pgvector)</strong>.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson1')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lesson 1</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson3')}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <span>Go to Lesson 3: Relational Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
