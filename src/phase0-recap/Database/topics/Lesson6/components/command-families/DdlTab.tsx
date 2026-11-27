'use client';

import React, { useState } from 'react';
import { Check, Copy, Table } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function DdlTab() {
  const { language } = useLanguage();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs">DDL</span>
                    <DualText en="Data Definition Language: Schema & Table Structure" bn="ডেটা ডেফিনিশন ল্যাঙ্গুয়েজ: টেবিল ও স্কিমা স্ট্রাকচার" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Commands that define, modify, or drop the structure of database objects (tables, indexes, views)."
                    bn="যেসব কমান্ডের সাহায্যে ডেটাবেস অবজেক্টের (টেবিল, ইনডেক্স, ভিউ) কাঠামো তৈরি, সংশোধন বা মুছে ফেলা হয়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'অটো-কমিটেড (রোলব্যাক সম্ভব নয়)' : 'Auto-Committed (Cannot Rollback)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {/* CREATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">CREATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Table Creation</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Creates a new table, database, view, or index."
                      bn="নতুন টেবিল, ডেটাবেস, ভিউ বা ইনডেক্স তৈরি করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`CREATE TABLE Student_info (
    Roll_No INT PRIMARY KEY,
    Name VARCHAR(30),
    Branch VARCHAR(10)
);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("CREATE TABLE Student_info (\n    Roll_No INT PRIMARY KEY,\n    Name VARCHAR(30),\n    Branch VARCHAR(10)\n);", "ddl-create")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-create" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* ALTER */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">ALTER</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Schema Modification</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Adds or modifies columns in an existing table structure."
                      bn="বিদ্যমান টেবিলের কাঠামোতে নতুন কলাম যোগ করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Add new CGPA column
ALTER TABLE Student_info 
ADD CGPA DECIMAL(3, 2);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("ALTER TABLE Student_info ADD CGPA DECIMAL(3, 2);", "ddl-alter")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-alter" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* TRUNCATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">TRUNCATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Fast Data Purge</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Clears all rows instantly; keeps table structure intact."
                      bn="কাঠামো ঠিক রেখে নিমিষেই টেবিলের সমস্ত ডেটা মুছে ফেলে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Wipes all rows, resets pages
TRUNCATE TABLE Student_info;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("TRUNCATE TABLE Student_info;", "ddl-truncate")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-truncate" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* DROP */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">DROP</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Permanent Destruction</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Permanently deletes schema, indexes & data from disk."
                      bn="স্কিমা ও ডেটাসহ পুরো টেবিল চিরতরে মুছে ফেলে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Completely destroys table
DROP TABLE Student_info;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DROP TABLE Student_info;", "ddl-drop")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-drop" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* RENAME */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">RENAME</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Object Rename</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Renames existing table object in data catalog."
                      bn="বিদ্যমান টেবিল বা অবজেক্টের নাম নিরাপদে পরিবর্তন করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Renames table in catalog
ALTER TABLE Student_info 
RENAME TO Students;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("ALTER TABLE Student_info RENAME TO Students;", "ddl-rename")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-rename" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
}
