'use client';

import React, { useState } from 'react';
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
  Code2
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import {
  ProjectFile,
  ProjectSubFolder,
  ProjectFolder,
  PROJECT_FOLDERS
} from '@/data/databaseRoadmapData';

export type { ProjectFile, ProjectSubFolder, ProjectFolder };
export { PROJECT_FOLDERS };

export default function DatabaseRoadmapTopic({
  onNavigate
}: {
  onNavigate?: (id: TopicId) => void;
}) {
  const [viewMode, setViewMode] = useState<'folder-tree' | 'vertical-timeline'>('folder-tree');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'f-paradigm': true,
    'f-storage': true,
    'f-query': true,
    'f-indexing': true,
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
      {/* 1. Header Banner with View Switcher */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121626] via-[#0c0e18] to-[#070910] border border-[#232942] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5" />
                Phase 1 • ডেটাবেস ও সিস্টেম হায়ারার্কি
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                ফোল্ডার $\rightarrow$ সাব-ফোল্ডার $\rightarrow$ ফাইলস
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Database Systems Architecture &amp; Roadmap
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              প্রজেক্টের ফাইল সিস্টেমের মতো পরিষ্কার ফোল্ডার স্ট্রাকচারে সাজানো।
              ফোল্ডার ও ফাইলগুলোতে ক্লিক করে প্রতিটি মডিউলের অভ্যন্তরীণ কাজ ও কোড সংক্ষেপে দেখুন।
            </p>
          </div>

          {/* Toggle between Folder Tree View & Vertical Timeline */}
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
              প্রজেক্ট ফোল্ডার ট্রি ভিউ
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

      {/* 2. VIEW MODE 1: PROJECT FOLDER STRUCTURE (ফোল্ডার -> সাব-ফোল্ডার -> ফাইল) */}
      {viewMode === 'folder-tree' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Project Folder Explorer (5 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="p-4 rounded-2xl bg-[#0b0e18] border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 font-bold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  WORKSPACE: database-systems-roadmap/
                </span>
                <span className="text-[10px] text-slate-500">৬টি মডিউল</span>
              </div>

              {/* Folder Tree */}
              <div className="space-y-2 font-mono text-xs">
                {PROJECT_FOLDERS.map((folder) => {
                  const isOpen = openFolders[folder.id];
                  const Icon = folder.icon;

                  return (
                    <div key={folder.id} className="rounded-xl border border-slate-800/60 bg-[#0f121f] overflow-hidden">
                      {/* Top Level Folder */}
                      <button
                        onClick={() => toggleFolder(folder.id)}
                        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {isOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <Folder className={`w-4 h-4 ${folder.color} shrink-0`} />
                          <span className="font-bold text-slate-200">{folder.folderName}/</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-sans truncate pl-2">
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

      {/* 3. VIEW MODE 2: VERTICAL TIMELINE VIEW (আগের ভার্টিক্যাল ভিউ অক্ষত রাখা হয়েছে) */}
      {viewMode === 'vertical-timeline' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-6 md:p-8 rounded-3xl border border-indigo-950/80 bg-[#0d101b] space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Split className="w-4 h-4" />
              <span>SQL বনাম NoSQL পাথওয়ে সিদ্ধান্ত</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 space-y-2">
                <span className="font-bold text-sky-400 block">১. SQL (PostgreSQL, MySQL):</span>
                <p className="text-slate-300 leading-relaxed">
                  কঠোর টেবিল স্কিমা, ফরেন কী, রিলেশনাল জয়েন এবং pgvector-এর মাধ্যমে ভেক্টর এম্বেডিংস স্টোরেজ।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="font-bold text-emerald-400 block">২. NoSQL (MongoDB, Redis):</span>
                <p className="text-slate-300 leading-relaxed">
                  মঙ্গোডিবি ফ্লেক্সিবল JSON ডক (চ্যাট হিস্টোরি ও এজেন্ট স্টেট) এবং রেডিস ইন-মেমরি সেম্যান্টিক ক্যাশ।
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Hierarchy Flow */}
          <div className="relative pl-6 md:pl-10 space-y-8">
            <div className="absolute left-[15px] md:left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-sky-500 via-amber-500 via-emerald-500 via-purple-500 to-indigo-500" />

            {PROJECT_FOLDERS.slice(1).map((folder) => {
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

      {/* 4. Bottom Action Bar */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0d101a] via-[#121625] to-[#0d101a] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            আমরা এখন ঠিক কোন ল্যাবটি দিয়ে শুরু করব?
          </h3>
          <p className="text-xs text-slate-400">
            ফোল্ডার <span className="text-amber-400 font-semibold">02_query_execution_planner</span> এর SQL &amp; Query Planner ল্যাব থেকে আমরা সরাসরি কোড রান করে দেখা শুরু করব।
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
