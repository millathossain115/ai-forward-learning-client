'use client';

import React, { useState } from 'react';
import { Check, Copy, Layers, Table } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part3CommandFamilies() {
  const { language } = useLanguage();
  const [activeCommandTab, setActiveCommandTab] = useState<'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL'>('DDL');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <>
{/* ========================================================
          PART 3: THE 5 COMMAND FAMILIES (DDL, DQL, DML, DCL, TCL)
          Inspired by GeeksforGeeks Standard Reference
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৩ • ৫টি কমান্ড ফ্যামিলি' : 'Part 3 of 20'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="The 5 Command Families in SQL (DDL, DQL, DML, DCL, TCL)"
                bn="৩. এসকিউএলের ৫টি প্রধান কমান্ড ফ্যামিলি (DDL, DQL, DML, DCL, TCL)"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="SQL statements are categorized into 5 functional families: defining table structure (DDL), querying records (DQL), modifying data (DML), managing security permissions (DCL), and controlling transactions (TCL). Explore the unified Student_info examples below with minimal vertical overhead."
          bn="কাজের ধরনের ওপর ভিত্তি করে SQL কমান্ডগুলোকে ৫টি প্রধান শ্রেণীতে ভাগ করা হয়: টেবিল কাঠামো তৈরি (DDL), ডেটা খোঁজা (DQL), ডেটা পরিবর্তন (DML), পারমিশন নিয়ন্ত্রণ (DCL) এবং ট্রানজ্যাকশন সেভ/রোলব্যাক (TCL)। নিচে Student_info টেবিলের বাস্তব উদাহরণের মাধ্যমে প্রতিটি কমান্ডের কার্যপদ্ধতি দেখুন।"
        />

        {/* Compact Quick Reference Summary Matrix (GeeksforGeeks Inspired) */}
        <div className="overflow-x-auto rounded-lg border border-slate-800/90 bg-[#0a0d1e]">
          <table className="w-full text-left text-[11px] font-sans">
            <thead>
              <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-300 font-mono text-[10px]">
                <th className="py-1.5 px-2.5 font-bold text-purple-300">Category</th>
                <th className="py-1.5 px-2.5 font-bold text-slate-300">Full Form</th>
                <th className="py-1.5 px-2.5 font-bold text-slate-300">Primary Purpose</th>
                <th className="py-1.5 px-2.5 font-bold text-cyan-300">Key Commands</th>
                <th className="py-1.5 px-2.5 font-bold text-amber-300">Transaction Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-zinc-300 text-[10.5px]">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-purple-400">DDL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Definition Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Defines & modifies database structure / schema" bn="ডেটাবেসের টেবিল ও স্কিমার কাঠামো তৈরি/পরিবর্তন করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">CREATE, ALTER, DROP, TRUNCATE, RENAME</td>
                <td className="py-1.5 px-2.5 font-mono text-amber-400">Auto-Committed (No Rollback)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">DQL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Query Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Retrieves records matching filter criteria" bn="নির্দিষ্ট শর্তে ডেটা খুঁজে বের করে প্রদর্শন করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">SELECT</td>
                <td className="py-1.5 px-2.5 font-mono text-emerald-400">Read-Only (Data Safe)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400">DML</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Manipulation Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Inserts, updates, or deletes stored rows" bn="টেবিলের ভেতরের ডেটা যোগ, পরিবর্তন বা মুছে ফেলে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">INSERT, UPDATE, DELETE</td>
                <td className="py-1.5 px-2.5 font-mono text-emerald-400">Transaction-Safe (Rollback OK)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-rose-400">DCL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Control Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Controls user privileges & security access" bn="ইউজারের পারমিশন ও নিরাপত্তা অধিকার নিয়ন্ত্রণ করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">GRANT, REVOKE</td>
                <td className="py-1.5 px-2.5 font-mono text-zinc-400">Admin Privileges</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-400">TCL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Transaction Control Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Manages ACID transactions and rollbacks" bn="ট্রানজ্যাকশনের সেভ, রোলব্যাক ও ACID স্থায়িত্ব রক্ষা করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">COMMIT, ROLLBACK, SAVEPOINT</td>
                <td className="py-1.5 px-2.5 font-mono text-indigo-300">Controls DML Transactions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compact Category Tabs (GeeksforGeeks Order) */}
        <div className="flex flex-wrap gap-1.5">
          {(['DDL', 'DQL', 'DML', 'DCL', 'TCL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveCommandTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCommandTab === tab
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{tab}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-purple-200">
                {tab === 'DDL' && (language === 'bn' ? 'স্ট্রাকচার' : 'Definition')}
                {tab === 'DQL' && (language === 'bn' ? 'কোয়েরি' : 'Query')}
                {tab === 'DML' && (language === 'bn' ? 'ম্যানিপুলেশন' : 'Manipulation')}
                {tab === 'DCL' && (language === 'bn' ? 'কন্ট্রোল' : 'Control')}
                {tab === 'TCL' && (language === 'bn' ? 'ট্রানজ্যাকশন' : 'Transaction')}
              </span>
            </button>
          ))}
        </div>

        {/* Compact Tab Detail Display */}
        <div className="p-4 md:p-5 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {/* ==================== DDL TAB ==================== */}
          {activeCommandTab === 'DDL' && (
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
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
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
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
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
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
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
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
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
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-rename" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DQL TAB ==================== */}
          {activeCommandTab === 'DQL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs">DQL</span>
                    <DualText en="Data Query Language: Data Retrieval & Analytics" bn="ডেটা কোয়েরি ল্যাঙ্গুয়েজ: ডেটা অনুসন্ধান ও অ্যানালিটিক্স" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Used exclusively to fetch, filter, and project data records without mutating database state."
                    bn="ডেটাবেসের কোনো তথ্য পরিবর্তন না করে কেবল ডেটা খুঁজে বের ও প্রদর্শন করতে ব্যবহৃত হয়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'রিড-অনলি (ডেটা নিরাপদ)' : 'Read-Only (Data Safe)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">SELECT</span>
                    <span className="text-[11px] text-zinc-400 font-mono">The Universal Query Operator</span>
                  </div>
                  <DualText
                    as="p"
                    className="text-xs text-zinc-300 leading-relaxed"
                    en="Retrieves matching records using projection, filtering (WHERE), sorting (ORDER BY), and limits without altering rows."
                    bn="প্রজেকশন, শর্তযুক্ত ফিল্টার (WHERE) ও সর্টিং (ORDER BY) ব্যবহার করে রেকর্ড প্রদর্শন করে; কোনো ডেটা পরিবর্তন হয় না।"
                  />
                </div>
                <div className="relative group">
                  <pre className="text-[10.5px] text-cyan-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`SELECT Roll_No, Name, Branch, CGPA 
FROM Student_info 
WHERE Branch = 'CSE' AND CGPA >= 3.50
ORDER BY CGPA DESC;`}
                  </pre>
                  <button
                    onClick={() => handleCopy("SELECT Roll_No, Name, Branch, CGPA \nFROM Student_info \nWHERE Branch = 'CSE' AND CGPA >= 3.50\nORDER BY CGPA DESC;", "dql-select")}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                    title="Copy SQL"
                  >
                    {copiedSnippet === "dql-select" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DML TAB ==================== */}
          {activeCommandTab === 'DML' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs">DML</span>
                    <DualText en="Data Manipulation Language: Record Operations" bn="ডেটা ম্যানিপুলেশন ল্যাঙ্গুয়েজ: রেকর্ড ইনসার্ট, আপডেট ও ডিলিট" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Commands that operate directly on the tuples/rows stored inside existing tables."
                    bn="টেবিলের ভেতরে থাকা ডেটা বা রেকর্ডের ওপর সরাসরি কাজ করে (যোগ, সংশোধন ও মোছা)।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'ট্রানজ্যাকশন-সেফ (রোলব্যাক সম্ভব)' : 'Transaction-Safe (Can Rollback)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* INSERT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">INSERT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Row Insertion</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Adds new student records into the table."
                      bn="টেবিলে এক বা একাধিক নতুন রো বা রেকর্ড যুক্ত করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`INSERT INTO Student_info 
(Roll_No, Name, Branch, CGPA) 
VALUES (101, 'Rahim', 'CSE', 3.85);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("INSERT INTO Student_info (Roll_No, Name, Branch, CGPA) VALUES (101, 'Rahim', 'CSE', 3.85);", "dml-insert")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-insert" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* UPDATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">UPDATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Value Modification</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Modifies column values matching WHERE condition."
                      bn="WHERE শর্ত অনুযায়ী নির্দিষ্ট শিক্ষার্থীর ডেটা আপডেট করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`UPDATE Student_info 
SET CGPA = 3.92 
WHERE Roll_No = 101;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("UPDATE Student_info SET CGPA = 3.92 WHERE Roll_No = 101;", "dml-update")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-update" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* DELETE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">DELETE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Row Removal</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Removes specific rows matching condition (can rollback)."
                      bn="শর্ত অনুযায়ী নির্দিষ্ট রো মুছে ফেলে (রোলব্যাক সম্ভব)।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`DELETE FROM Student_info 
WHERE Roll_No = 101;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DELETE FROM Student_info WHERE Roll_No = 101;", "dml-delete")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-delete" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DCL TAB ==================== */}
          {activeCommandTab === 'DCL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs">DCL</span>
                    <DualText en="Data Control Language: Access & Privileges" bn="ডেটা কন্ট্রোল ল্যাঙ্গুয়েজ: ব্যবহারকারীর অ্যাক্সেস ও পারমিশন" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Manages database security, user roles, authentication privileges, and access permissions."
                    bn="ডেটাবেসের নিরাপত্তা, ইউজারের অধিকার ও অ্যাক্সেস পারমিশন নিয়ন্ত্রণ করে।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'নিরাপত্তা ও অ্যাক্সেস কন্ট্রোল' : 'Security Access Control'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {/* GRANT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">GRANT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Assign Privileges</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Gives specific users read/write permissions on database objects."
                      bn="নির্দিষ্ট ব্যবহারকারীকে টেবিলে ডেটা পড়া বা লেখার অধিকার দেয়।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Grant query & insert access to faculty
GRANT SELECT, INSERT 
ON Student_info 
TO 'faculty_user';`}
                    </pre>
                    <button
                      onClick={() => handleCopy("GRANT SELECT, INSERT ON Student_info TO 'faculty_user';", "dcl-grant")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dcl-grant" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* REVOKE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">REVOKE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Withdraw Privileges</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Takes away previously granted user permissions."
                      bn="পূর্বে দেওয়া ব্যবহারকারীর পারমিশন প্রত্যাহার করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Revoke write access from faculty
REVOKE INSERT 
ON Student_info 
FROM 'faculty_user';`}
                    </pre>
                    <button
                      onClick={() => handleCopy("REVOKE INSERT ON Student_info FROM 'faculty_user';", "dcl-revoke")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dcl-revoke" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TCL TAB ==================== */}
          {activeCommandTab === 'TCL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs">TCL</span>
                    <DualText en="Transaction Control Language: ACID & Rollback" bn="ট্রানজ্যাকশন কন্ট্রোল ল্যাঙ্গুয়েজ: ACID ও রোলব্যাক নিয়ন্ত্রণ" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Manages transactional integrity, guaranteeing that modifications are either fully committed or safely rolled back."
                    bn="ট্রানজ্যাকশনের স্থায়িত্ব রক্ষা করে, যাতে কোনো ত্রুটি হলে পূর্বের অবস্থায় ফিরে যাওয়া যায়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'ACID গ্যারান্টি' : 'ACID Guarantee'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* COMMIT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">COMMIT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Save to Disk</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Permanently writes transaction changes to disk."
                      bn="ট্রানজ্যাকশনের সমস্ত পরিবর্তন স্থায়ীভাবে ডিস্কে সেভ করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`INSERT INTO Student_info 
VALUES (102, 'Karim', 'BBA', 3.45);
COMMIT; -- Saved permanently`}
                    </pre>
                    <button
                      onClick={() => handleCopy("INSERT INTO Student_info VALUES (102, 'Karim', 'BBA', 3.45);\nCOMMIT;", "tcl-commit")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-commit" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* ROLLBACK */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">ROLLBACK</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Undo Changes</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Reverts uncommitted modifications if an error occurs."
                      bn="ভুল কোনো অপারেশন হলে পরিবর্তন বাতিল করে আগের অবস্থায় নেয়।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`DELETE FROM Student_info 
WHERE Branch = 'BBA';
ROLLBACK; -- Rows restored!`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DELETE FROM Student_info WHERE Branch = 'BBA';\nROLLBACK;", "tcl-rollback")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-rollback" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* SAVEPOINT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">SAVEPOINT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Partial Checkpoint</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Sets a checkpoint for safe partial rollbacks."
                      bn="ট্রানজ্যাকশনের মাঝে আংশিক রোলব্যাকের চেকপয়েন্ট তৈরি করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`SAVEPOINT sp_grade_entry;
-- Partial rollback to checkpoint
ROLLBACK TO sp_grade_entry;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("SAVEPOINT sp_grade_entry;\nROLLBACK TO sp_grade_entry;", "tcl-savepoint")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-savepoint" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
