'use client';

import React, { useState, useMemo } from 'react';
import {
  Compass,
  HardDrive,
  Search,
  Database,
  Cpu,
  Sparkles,
  Zap,
  ArrowRight,
  GitBranch,
  Layers,
  Table,
  CheckCircle2,
  FileCode2,
  Activity,
  Split,
  FileJson,
  Flame,
  Network,
  Server,
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Terminal,
  Code2,
  BookOpen,
  HelpCircle,
  ShieldAlert,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import {
  ProjectFile,
  ProjectSubFolder,
  ProjectFolder,
  PROJECT_FOLDERS,
  ParadigmType
} from '@/data/databaseRoadmapData';

export type { ProjectFile, ProjectSubFolder, ProjectFolder, ParadigmType };
export { PROJECT_FOLDERS };

export default function DatabaseRoadmapTopic({
  onNavigate
}: {
  onNavigate?: (id: TopicId) => void;
}) {
  const [viewMode, setViewMode] = useState<'folder-tree' | 'vertical-timeline'>('folder-tree');
  const [selectedParadigm, setSelectedParadigm] = useState<ParadigmType>('all');
  const [showFoundationIntro, setShowFoundationIntro] = useState(true);
  const [activeDatabasePillar, setActiveDatabasePillar] = useState<number>(1);

  // Filter folders based on selected paradigm
  const filteredFolders = useMemo(() => {
    if (selectedParadigm === 'all') return PROJECT_FOLDERS;
    return PROJECT_FOLDERS.filter((f) => {
      if (f.paradigm === 'all' || f.paradigm === 'hybrid') return true;
      return f.paradigm === selectedParadigm;
    });
  }, [selectedParadigm]);

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'f-foundations': true,
    'f-paradigm': true,
    'f-storage': true,
    'f-query': true,
    'f-indexing': true,
    'f-nosql-deepdive': true,
    'f-vector': true,
    'f-scaling': true,
  });

  const [selectedFile, setSelectedFile] = useState<ProjectFile>(
    PROJECT_FOLDERS[0].subfolders[0].files[0]
  );
  const [activeParentFolder, setActiveParentFolder] = useState<ProjectFolder>(PROJECT_FOLDERS[0]);
  const [activeSubFolder, setActiveSubFolder] = useState<ProjectSubFolder>(PROJECT_FOLDERS[0].subfolders[0]);

  const toggleFolder = (folderId: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleSelectFile = (
    file: ProjectFile,
    parentFolder: ProjectFolder,
    subfolder: ProjectSubFolder
  ) => {
    setSelectedFile(file);
    setActiveParentFolder(parentFolder);
    setActiveSubFolder(subfolder);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2 animate-in fade-in duration-300 text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121626] via-[#0c0e18] to-[#070910] border border-[#232942] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Phase 1 • ডেটাবেস সিস্টেমস আর্কিটেকচার
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                একদম শুরু থেকে: ডেটাবেস কী $\rightarrow$ SQL / NoSQL $\rightarrow$ pgvector
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Database Systems Architecture &amp; Roadmap
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              ডেটাবেস কী এবং কেন সাধারণ ফাইল দিয়ে সিস্টেম চালানো যায় না—সেখান থেকেই আমাদের জার্নি শুরু।
              এরপর আপনার পছন্দমতো <strong>SQL পাথ</strong> বা <strong>NoSQL পাথ</strong> বেছে নিয়ে পুরো হায়ারার্কি এক্সপ্লোর করুন।
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-[#101322] p-1.5 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('folder-tree')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'folder-tree'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              ফোল্ডার ট্রি ভিউ
            </button>
            <button
              onClick={() => setViewMode('vertical-timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'vertical-timeline'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              ভার্টিক্যাল টাইমলাইন
            </button>
          </div>
        </div>
      </div>

      {/* 2. FOUNDATION ACCORDION: শুরু করুন এখান থেকে - "ডেটাবেস কী এবং কেন প্রয়োজন?" */}
      <div className="p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#14120e] via-[#0f111a] to-[#0a0d17] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  জিরো গ্রাউন্ড
                </span>
                <h2 className="text-base md:text-lg font-bold text-white">
                  মৌলিক ধারণা: ডেটা, ইনফরমেশন, ডেটাবেস ও ডিবিএমএস
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                কম্পিউটার সায়েন্সের ৪টি মূল ভিত্তি এবং ডেটাবেসের অভ্যন্তরীণ ৪-স্তরের নিখুঁত হায়ারার্কি
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFoundationIntro(!showFoundationIntro)}
            className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            {showFoundationIntro ? 'সংক্ষেপ করুন ▲' : 'বিস্তারিত দেখুন ▼'}
          </button>
        </div>

        {showFoundationIntro && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* The 4 Core Concept Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Card 1: Data */}
              <div className="p-4 rounded-2xl bg-[#121524] border border-slate-800 space-y-2.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">১. Data (কাঁচা উপাত্ত)</span>
                  <div className="text-sm font-bold font-mono text-white bg-black/40 px-2.5 py-1 rounded my-2 border border-slate-800">
                    &quot;Rahim&quot;, 500, 10:30
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    যেকোনো বিচ্ছিন্ন কাঁচা তথ্য যার কোনো নির্দিষ্ট প্রেক্ষাপট বা মিনিং নেই।
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">কাঁচা ফ্যাক্টস</span>
              </div>

              {/* Card 2: Information */}
              <div className="p-4 rounded-2xl bg-[#121524] border border-slate-800 space-y-2.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">২. Information (তথ্য)</span>
                  <div className="text-xs font-semibold text-emerald-300 bg-black/40 p-2 rounded my-2 border border-slate-800">
                    &quot;রহিম সকাল ১০:৩০ এ ৫০০ টাকা পেমেন্ট করেছে&quot;
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    কাঁচা ডেটাকে নির্দিষ্ট নিয়মে সাজিয়ে যখন মানুষের বা অ্যাপের জন্য অর্থপূর্ণ করা হয়।
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">অর্থপূর্ণ উপাত্ত</span>
              </div>

              {/* Card 3: Database (Active Focus) */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/10 space-y-2.5 flex flex-col justify-between ring-1 ring-indigo-500/30">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">৩. Database (ডেটাবেস)</span>
                    <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono font-bold">ফোকাস টপিক</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-200 bg-black/60 p-2 rounded my-2 border border-indigo-800/40">
                    📁 accounts.db [Tables, Pages, Indexes, Logs]
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    সুসংগঠিত, ইলেকট্রনিক এবং ক্র্যাশ-প্রুফ উপায়ে ডেটা ধরে রাখার স্ট্রাকচার্ড আধার।
                  </p>
                </div>
                <span className="text-[10px] text-indigo-300 font-mono font-semibold">↓ নিচের ৪টি স্তরে ব্রেকডাউন দেখুন</span>
              </div>

              {/* Card 4: DBMS */}
              <div className="p-4 rounded-2xl bg-[#121524] border border-slate-800 space-y-2.5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">৪. DBMS (ম্যানেজমেন্ট সিস্টেম)</span>
                  <div className="text-xs font-bold text-white bg-purple-950/40 p-2 rounded my-2 border border-purple-800/40">
                    PostgreSQL, MySQL, SQLite, MongoDB
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    যে সফটওয়্যার ইঞ্জিন কুয়েরি অপ্টিমাইজেশন, মেমরি বাফার এবং ডিস্ক লক নিয়ন্ত্রণ করে।
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">ইঞ্জিন সফটওয়্যার</span>
              </div>
            </div>

            {/* DEEP HIERARCHICAL BREAKDOWN OF CARD 3: DATABASE */}
            <div className="border border-indigo-500/30 bg-[#0e1122] rounded-2xl p-5 md:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    টপিক ব্রেকডাউন • ৩. Database (ডেটাবেস)-এর অভ্যন্তরীণ ৪টি মৌলিক স্তর
                  </span>
                  <h3 className="text-base font-bold text-white">
                    একটি ডেটাবেস ভাঙলে ভেতরের যে আর্কিটেকচারাল হায়ারার্কি পাওয়া যায়
                  </h3>
                </div>
                <span className="text-xs text-zinc-400 font-mono">স্তম্ভগুলোতে ক্লিক করে গভীর বিশ্লেষণ দেখুন</span>
              </div>

              {/* 4 Pillars Tab Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 1, title: '১. ডেটা মডেল ও সংগঠন', sub: 'Data Representation', icon: FileText, color: 'text-amber-400' },
                  { id: 2, title: '২. স্টোরেজ ও ডিস্ক স্ট্রাকচার', sub: '8KB Slotted Page Engine', icon: HardDrive, color: 'text-cyan-400' },
                  { id: 3, title: '৩. রিট্রিভাল ও ইনডেক্সিং', sub: 'B+ Tree / O(log N)', icon: Cpu, color: 'text-purple-400' },
                  { id: 4, title: '৪. নির্ভরযোগ্যতা ও স্থায়িত্ব', sub: 'WAL & Constraints', icon: ShieldCheck, color: 'text-emerald-400' },
                ].map((p) => {
                  const Icon = p.icon;
                  const isSel = activeDatabasePillar === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveDatabasePillar(p.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSel
                          ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/40 text-white'
                          : 'bg-[#121528] border-slate-800 hover:border-slate-700 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${p.color}`} />
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-zinc-400">Pillar 0{p.id}</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{p.title}</div>
                        <div className="text-[10px] font-mono text-zinc-500 mt-0.5">{p.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pillar Content Viewer */}
              <div className="bg-[#13172e] border border-slate-800/80 rounded-xl p-5 space-y-4">
                {activeDatabasePillar === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase">স্তর ০১: ডেটা মডেল ও সংগঠন (Data Representation)</span>
                      <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">Schema &amp; Layout</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      ডেটাবেসের প্রথম দায়িত্ব হলো তথ্যকে মেমরিতে এমন একটি কাঠামোতে প্রকাশ করা যা কম্পিউটার এবং প্রোগ্রামার উভয়ই দ্রুত পড়তে পারে।
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">রিলেশনাল মডেল (Relational)</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">কঠোরভাবে নির্ধারিত কলাম ও রো। টেবিলগুলোর মাঝে Foreign Key দিয়ে সম্পর্ক বজায় থাকে (PostgreSQL, MySQL)।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">ডকুমেন্ট মডেল (Document)</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">প্রতিটি রেকর্ড এক একটি স্বাধীন JSON/BSON অবজেক্ট, যেখানে কোনো কঠোর পূর্বনির্ধারিত স্কিমা থাকে না (MongoDB)।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">হাই-ডাইমেনশনাল ভেক্টর (Vector)</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">এআই এর টেক্সট/ইমেজ অর্থ ধরে রাখতে ১৫৩৬ ডাইমেনশনের ফ্ল্যাটিং পয়েন্ট ভেক্টর (pgvector, Pinecone)।</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDatabasePillar === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase">স্তর ০২: স্টোরেজ ও ডিস্ক স্ট্রাকচার (Physical Storage Engine)</span>
                      <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">8KB Slotted Page</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      ডিস্কে ডেটা কীভাবে সংরক্ষিত থাকে? ডেটাবেস কখনো পুরো ফাইল একবারে পড়ে না; ডিস্ক ও মেমরির মাঝে <strong>8KB পেজ (Page)</strong> আকারে ট্রান্সফার হয়।
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">Slotted Page আর্কিটেকচার</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">পেজের শুরুতে থাকে হেডার ও অফসেট পয়েন্টার, আর শেষে থাকে রো-এর আসল ডেটা। মাঝের স্পেস স্বাধীনভাবে বাড়ে ও কমে।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">বাফার পুল (RAM ক্যাশ)</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">ডিস্ক অপারেশন খুবই ধীরগতির। তাই বহুল ব্যবহৃত 8KB পেজগুলোকে সরাসরি র‍্যামে রাখা হয় যাতে সাব-মিলিসেকেন্ডে পাওয়া যায়।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">রো বনাম কলাম স্টোর</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">OLTP (ট্রানজ্যাকশন) রো আকারে লেখে, আর OLAP (অ্যানালিটিক্স) কলাম আকারে রেখে দ্রুত এগ্রিগেশন হিসাব করে।</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDatabasePillar === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400 font-bold uppercase">স্তর ০৩: ডেটা রিট্রিভাল ও ইনডেক্সিং (Fast Access Path)</span>
                      <span className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">O(log N) Traversal</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      ১ কোটি ডেটার ভেতর থেকে মাইক্রোসেকেন্ডে নির্দিষ্ট একটি রেকর্ড কীভাবে খুঁজে পাওয়া যায়?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">B+ Tree ইনডেক্স</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">ডেটাবেসের গোল্ড স্ট্যান্ডার্ড। ব্যালান্সড মাল্টি-লেয়ার ট্রি যা মাত্র ৩-৪টি জাম্পেই কোটি রেকর্ডের পেজ এড্রেস এনে দেয়।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">Hash Index</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">নির্দিষ্ট সমতা চেক (id = 100) এর জন্য O(1) স্পিডে মেমরির পয়েন্টার বের করে দেয়।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">HNSW ভেক্টর গ্রাফ</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">এআই ভেক্টরের জন্য নেভিগেবল স্মল-ওয়ার্ল্ড গ্রাফ, যা কোটি এআই এমবেডিংয়ের ভেতরে সাব-মিলিসেকেন্ডে সিমিলার ডেটা খুঁজে দেয়।</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDatabasePillar === 4 && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase">স্তর ০৪: নির্ভরযোগ্যতা ও স্থায়িত্ব (Reliability &amp; Integrity)</span>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">WAL &amp; MVCC</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      হঠাৎ কারেন্ট চলে গেলে বা হার্ডডিস্কে লিখতে গিয়ে সার্ভার রিস্টার্ট নিলে ডেটা কীভাবে সুরক্ষিত থাকে?
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">Write-Ahead Logging (WAL)</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">ডিস্কের মূল ডেটা ফাইলে লেখার আগে একটি অ্যাপেন্ড-ওনলি লগে রেকর্ড রাখা হয়, যাতে ক্র্যাশের পর নির্ভুল রিকভারি হয়।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">স্কিমা কনস্ট্রেইন্ট (Constraints)</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">Primary Key, Unique, Check এবং Foreign Key যা কোনো অবৈধ বা ভুল ডেটা ইনসার্ট হতে দেয় না।</p>
                      </div>
                      <div className="p-3 bg-black/40 rounded-lg border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-white">MVCC কনকারেন্সি কন্ট্রোল</span>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">রিডার এবং রাইটার একে অপরকে কখনো ব্লক করে না; প্রতি ট্রানজ্যাকশন ডেটার একটি স্থির স্ন্যাপশট দেখে।</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DYNAMIC PEDAGOGICAL BRIDGE FOR EACH PILLAR */}
              <div className="bg-gradient-to-br from-[#111428] via-[#0c0f1e] to-[#070914] border border-cyan-900/40 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Split className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">
                      পিলার ০{activeDatabasePillar}-এর লজিক্যাল সেতু: আদিম ফাইলে কী সমস্যা হতো বনাম ডেটাবেস কীভাবে সমাধান করল?
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 shrink-0">
                    লজিক্যাল ব্রিজ
                  </span>
                </div>

                {activeDatabasePillar === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-black/40 border border-red-900/30 space-y-1.5">
                      <span className="font-bold text-red-400 font-mono">আদিম ফাইলে (CSV/JSON):</span>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        কলামের কোনো টাইপ বা স্কিমা নেই। টাকার ঘরে টেক্সট লিখে দিলে বা ভুল ফরমেট দিলে ওএস কিছু বোঝে না। টেবিলের মাঝে ফরেন কি সম্পর্ক থাকে না।
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/30 space-y-1.5">
                      <span className="font-bold text-emerald-400 font-mono">ডেটাবেস পিলারে (Data Models):</span>
                      <p className="text-zinc-300 leading-relaxed text-[11px]">
                        কঠোর ডেটা টাইপ, স্কিমা ভ্যালিডেশন এবং ফরেন কি দিয়ে নিশ্চিত করা হয় যে কোনো এতিম বা ভুল ডেটা ইনসার্ট হতে পারবে না।
                      </p>
                    </div>
                  </div>
                )}

                {activeDatabasePillar === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-black/40 border border-red-900/30 space-y-1.5">
                      <span className="font-bold text-red-400 font-mono">আদিম ফাইলে (OS File I/O):</span>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        ১টি শব্দ পরিবর্তন করতেও পুরো ৫০০MB ফাইল র‍্যামে এনে বদলিয়ে আবার সম্পূর্ণ ফাইল ডিস্কে নতুন করে রাইট করতে হয়।
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/30 space-y-1.5">
                      <span className="font-bold text-emerald-400 font-mono">ডেটাবেস পিলারে (8KB Slotted Page Engine):</span>
                      <p className="text-zinc-300 leading-relaxed text-[11px]">
                        পুরো ফাইল নয়; ডিস্কের নির্দিষ্ট 8KB পেজ র‍্যাম বাফার পুলে এনে স্লটের কয়েক বাইট বদলায়। ডিস্কের চাপ ৯৯% কমে যায়।
                      </p>
                    </div>
                  </div>
                )}

                {activeDatabasePillar === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-black/40 border border-red-900/30 space-y-1.5">
                      <span className="font-bold text-red-400 font-mono">আদিম ফাইলে (Sequential File Scan):</span>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        ১০ লাখ ইউজারের ভেতর নির্দিষ্ট কাউকে খুঁজতে প্রথম থেকে শেষ লাইন পর্যন্ত ওএস ফাইল পড়তে হয় ($O(N)$ স্ক্যান, ৫-১০ সেকেন্ড)।
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/30 space-y-1.5">
                      <span className="font-bold text-emerald-400 font-mono">ডেটাবেস পিলারে (B+ Tree &amp; HNSW Index):</span>
                      <p className="text-zinc-300 leading-relaxed text-[11px]">
                        ব্যালান্সড B+ Tree মাত্র ৩-৪টি ডিস্ক জাম্পেই কোটি রেকর্ডের ভেতর থেকে সঠিক 8KB পেজের অফসেট এনে দেয় ($O(\log N)$, ০.৩ms)।
                      </p>
                    </div>
                  </div>
                )}

                {activeDatabasePillar === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-black/40 border border-red-900/30 space-y-1.5">
                      <span className="font-bold text-red-400 font-mono">আদিম ফাইলে (No Lock &amp; No Log):</span>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        রাইট করার সময় কারেন্ট গেলে ফাইল অর্ধেক লেখা হয়ে চিরতরে নষ্ট হয়ে যায়। দুজন ইউজার একসাথে লিখলে ডেটা মুছে যায় (Race Condition)।
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/30 space-y-1.5">
                      <span className="font-bold text-emerald-400 font-mono">ডেটাবেস পিলারে (WAL &amp; MVCC):</span>
                      <p className="text-zinc-300 leading-relaxed text-[11px]">
                        মূল ফাইলে লেখার আগেই Write-Ahead Log (WAL)-এ এন্ট্রি থাকে, ফলে ক্র্যাশের পর স্বয়ংক্রিয় রিকভারি হয় এবং MVCC দিয়ে শত ইউজার একসাথে কাজ করে।
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. INTERACTIVE PARADIGM PATH SELECTOR: পাথ বাছাই করুন */}
      <div className="p-6 rounded-3xl border border-indigo-950/80 bg-[#0d101b] space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Split className="w-4 h-4" />
              <span>লার্নিং পাথ বাছাই করুন: আপনি কোন ধারায় আগাতে চান?</span>
            </div>
            <p className="text-xs text-slate-400">
              পাথ সিলেক্ট করলে নিচের সম্পূর্ণ রোডম্যাপ ও ফোল্ডার হায়ারার্কি সেই অনুযায়ী ফিল্টার ও অ্যাডাপ্ট হবে।
            </p>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 self-start sm:self-auto">
            ইন্টারেক্টিভ পাথ ফিল্টার
          </span>
        </div>

        {/* 3 Path Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Path 1: Unified AI Path */}
          <button
            onClick={() => setSelectedParadigm('all')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedParadigm === 'all'
                ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg'
                : 'bg-[#101322] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xs">
                  AI
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  প্রস্তাবিত (Recommended)
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">সবগুলো পাথ (Unified AI)</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                SQL + NoSQL + pgvector এর কমপ্লিট জার্নি। আধুনিক এআই ব্যাকএন্ডে কীভাবে তিনটি প্রযুক্তি একসাথে কাজ করে।
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-indigo-400 flex items-center gap-1">
              <span>৮টি মডিউল • সম্পূর্ণ রোডম্যাপ</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* Path 2: SQL / Relational Path */}
          <button
            onClick={() => setSelectedParadigm('sql')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedParadigm === 'sql'
                ? 'bg-sky-600/20 border-sky-500 ring-2 ring-sky-500/40 shadow-lg'
                : 'bg-[#101322] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold text-xs">
                  SQL
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  PostgreSQL Focus
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">১. Relational SQL পাথ</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                PostgreSQL/MySQL: টেবিল স্কিমা $\rightarrow$ ৮কেবি স্লটেড পেজ স্টোরেজ $\rightarrow$ কুয়েরি প্ল্যানার $\rightarrow$ B-Tree ইনডেক্স।
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-sky-400 flex items-center gap-1">
              <span>কোর রিলেশনাল হায়ারার্কি</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* Path 3: NoSQL Path */}
          <button
            onClick={() => setSelectedParadigm('nosql')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedParadigm === 'nosql'
                ? 'bg-emerald-600/20 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                : 'bg-[#101322] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  NoSQL
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  MongoDB &amp; Redis
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">২. NoSQL পাথ</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                মঙ্গোডিবি ফ্লেক্সিবল JSON ডকুমেন্ট (চ্যাট হিস্টোরি ও এজেন্ট স্টেট) এবং রেডিস ইন-মেমরি প্রম্পট ক্যাশ।
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span>ডকুমেন্ট ও ক্যাশিং হায়ারার্কি</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* Selected Path Breadcrumb Indicator */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">নির্বাচিত লার্নিং পাথ:</span>
          {selectedParadigm === 'all' && (
            <span className="text-indigo-300 font-bold flex items-center gap-1">
              <span>০০. ডেটাবেস কী</span> $\rightarrow$ <span>০১. SQL vs NoSQL</span> $\rightarrow$ <span>০২-০৪. স্টোরেজ ও B-Tree</span> $\rightarrow$ <span>০৫. NoSQL</span> $\rightarrow$ <span>০৬. pgvector</span> $\rightarrow$ <span>০৭. হাইব্রিড RAG</span>
            </span>
          )}
          {selectedParadigm === 'sql' && (
            <span className="text-sky-300 font-bold flex items-center gap-1">
              <span>০০. ডেটাবেস কী</span> $\rightarrow$ <span>০১. স্কিমা ও টেবিল</span> $\rightarrow$ <span>০২. পেজ লেআউট ও বাফার</span> $\rightarrow$ <span>০৩. কুয়েরি প্ল্যানার</span> $\rightarrow$ <span>০৪. B-Tree ইনডেক্স</span> $\rightarrow$ <span>০৬. pgvector</span>
            </span>
          )}
          {selectedParadigm === 'nosql' && (
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              <span>০০. ডেটাবেস কী</span> $\rightarrow$ <span>০১. নো-এসকিউএল ধারণা</span> $\rightarrow$ <span>০৫. মঙ্গোডিবি JSON ও রেডিস ক্যাশ</span> $\rightarrow$ <span>০৬. ভেক্টর ডেটাবেস</span> $\rightarrow$ <span>০৭. স্কেলিং</span>
            </span>
          )}
        </div>
      </div>

      {/* 4. VIEW MODE 1: PROJECT FOLDER STRUCTURE (ফোল্ডার -> সাব-ফোল্ডার -> ফাইল) */}
      {viewMode === 'folder-tree' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Project Folder Explorer (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 font-bold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  WORKSPACE: database-systems-roadmap/
                </span>
                <span className="text-[10px] text-slate-500">{filteredFolders.length}টি ফোল্ডার দৃশ্যমান</span>
              </div>

              {/* Folder Tree */}
              <div className="space-y-2 font-mono text-xs">
                {filteredFolders.map((folder) => {
                  const isOpen = openFolders[folder.id];
                  const Icon = folder.icon;

                  return (
                    <div key={folder.id} className="rounded-xl border border-slate-800/60 bg-[#0f121f] overflow-hidden">
                      {/* Top Level Folder */}
                      <button
                        onClick={() => toggleFolder(folder.id)}
                        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {isOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <Folder className={`w-4 h-4 ${folder.color} shrink-0`} />
                          <span className="font-bold text-slate-200 truncate">{folder.folderName}/</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-sans truncate pl-2 shrink-0">
                          {folder.titleBn}
                        </span>
                      </button>

                      {/* Subfolders and Files */}
                      {isOpen && (
                        <div className="pl-6 pr-2 pb-2 space-y-2 border-t border-slate-800/50 bg-[#0c0f1a]">
                          {folder.subfolders.map((sub, sIdx) => (
                            <div key={sIdx} className="space-y-1 pt-1.5">
                              {/* Subfolder Title */}
                              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                                <FolderOpen className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                                <span className="font-semibold text-slate-300">{sub.name}/</span>
                                <span className="text-[10px] text-slate-400 font-sans">({sub.nameBn})</span>
                              </div>

                              {/* Files inside Subfolder */}
                              <div className="pl-4 space-y-1 border-l border-slate-800/80 ml-1.5">
                                {sub.files.map((file, fIdx) => {
                                  const isSelected = selectedFile.name === file.name;

                                  return (
                                    <button
                                      key={fIdx}
                                      onClick={() => handleSelectFile(file, folder, sub)}
                                      className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-all flex items-center justify-between cursor-pointer ${
                                        isSelected
                                          ? 'bg-indigo-600/30 text-white font-semibold border border-indigo-500/50 shadow-sm'
                                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 truncate pr-2">
                                        <FileCode2
                                          className={`w-3.5 h-3.5 shrink-0 ${
                                            file.ext === 'sql'
                                              ? 'text-sky-400'
                                              : file.ext === 'json'
                                              ? 'text-emerald-400'
                                              : file.ext === 'py'
                                              ? 'text-amber-400'
                                              : file.ext === 'md'
                                              ? 'text-pink-400'
                                              : 'text-purple-400'
                                          }`}
                                        />
                                        <span className="truncate">{file.name}</span>
                                      </div>
                                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                                        .{file.ext}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Selected File Inspector / Preview (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-[#0e111d] shadow-2xl space-y-6">
              {/* File Breadcrumb */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400 pb-3 border-b border-slate-800">
                <span className="text-indigo-400 font-bold">{activeParentFolder.folderName}/</span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-amber-400">{activeSubFolder.name}/</span>
                <ChevronRight className="w-3 h-3 text-slate-600" />
                <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded">
                  {selectedFile.name}
                </span>
              </div>

              {/* Title & Tag */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                    {selectedFile.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">.{selectedFile.ext}</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white">
                  {selectedFile.nameBn}
                </h2>
              </div>

              {/* What it works on / What happens inside */}
              <div className="p-4 rounded-2xl bg-[#131728] border border-indigo-900/40 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>এটি কী নিয়ে কাজ করে এবং ভেতরে কী ঘটবে:</span>
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
                  {selectedFile.note}
                </p>
              </div>

              {/* Code / Config Preview Snippet if available */}
              {selectedFile.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-slate-400" />
                      কোড / আর্কিটেকচার স্নপেট
                    </span>
                    <span className="text-[10px] text-slate-500">Preview</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#090b14] border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                    {selectedFile.codeSnippet}
                  </pre>
                </div>
              )}

              {/* Lab Link if available */}
              {selectedFile.labId && onNavigate && (
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-sans">
                    এই মেকানিজমটি সরাসরি লাইভ কোডে পরীক্ষা করতে চান?
                  </span>
                  <button
                    onClick={() => onNavigate(selectedFile.labId!)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>{selectedFile.labLabel || 'ল্যাব ওপেন করুন'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. VIEW MODE 2: VERTICAL TIMELINE VIEW */}
      {viewMode === 'vertical-timeline' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="relative pl-6 md:pl-10 space-y-8">
            <div className="absolute left-[15px] md:left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber-500 via-sky-500 via-emerald-500 via-purple-500 to-indigo-500" />

            {filteredFolders.map((folder) => {
              const Icon = folder.icon;

              return (
                <div key={folder.id} className="relative space-y-4">
                  <div className="relative flex items-start gap-4">
                    <div className="absolute -left-[30px] md:-left-[39px] top-1 w-8 h-8 rounded-full bg-[#0a0d17] border-2 border-indigo-500/40 flex items-center justify-center shadow-lg shrink-0 z-10">
                      <Icon className={`w-4 h-4 ${folder.color}`} />
                    </div>
                    <div className="w-full p-4 rounded-2xl border border-slate-800 bg-[#0e111d] space-y-1">
                      <span className="text-xs font-mono text-indigo-400 font-bold">{folder.number}. {folder.folderName}/</span>
                      <h3 className="text-base font-bold text-white">{folder.titleBn}</h3>
                      <p className="text-xs text-slate-400">{folder.summary}</p>
                    </div>
                  </div>

                  <div className="pl-4 md:pl-8 space-y-3 border-l-2 border-slate-800/80 ml-1 md:ml-2">
                    {folder.subfolders.map((sub, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-xl bg-[#0f121e] border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
                          <span className="text-xs font-bold text-amber-400 font-mono">{sub.name}/</span>
                          <span className="text-xs font-semibold text-slate-200">({sub.nameBn})</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                          {sub.files.map((file, fIdx) => (
                            <div key={fIdx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-200">{file.name}</span>
                                <span className="text-[9px] font-mono text-slate-400">.{file.ext}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{file.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Bottom Action Bar */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0d101a] via-[#121625] to-[#0d101a] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            আমরা এখন ঠিক কোন ল্যাবটি দিয়ে শুরু করব?
          </h3>
          <p className="text-xs text-slate-400">
            রোডম্যাপের <span className="text-amber-400 font-semibold">03_query_execution_planner</span> এর SQL &amp; Query Planner ল্যাব থেকে আমরা সরাসরি কোড রান করে দেখা শুরু করব।
          </p>
        </div>

        {onNavigate && (
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('backend-sql')}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              ১. SQL প্ল্যানার ল্যাব
            </button>
            <button
              onClick={() => onNavigate('backend-indexing')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              ২. B-Tree বেঞ্চমার্ক
            </button>
            <button
              onClick={() => onNavigate('backend-pgvector')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              ৩. pgvector ল্যাব
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple internal icon for concurrency users
function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
