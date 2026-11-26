'use client';

import React, { useState } from 'react';
import { Calendar, Check, Code2, Copy, Database, Hash, Sparkles, Table, Table as TableIcon, Type } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part5CreatingDbAndTables() {
  const { language } = useLanguage();
  const [schemaViewMode, setSchemaViewMode] = useState<'sql' | 'describe'>('sql');
  const [dataTypeCategoryTab, setDataTypeCategoryTab] = useState<'string' | 'numeric' | 'datetime' | 'special'>('string');
  const [charDemoInput, setCharDemoInput] = useState<string>('Rahim');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <>
{/* ========================================================
          PART 5 & 6: CREATE DATABASE, CREATE TABLE & DATA TYPES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৪ • ডেটাবেস, টেবিল ও ডেটা টাইপ' : 'Part 4 of 13'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="Creating Databases, Tables & SQL Data Types"
                bn="৪. ডেটাবেস ও টেবিল তৈরি এবং প্রয়োজনীয় ডেটা টাইপস"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Before storing and querying records, you must create a database workspace and define tables with optimal data types. Explore the complete DDL lifecycle below—from database creation to table anatomy and memory-efficient data types."
          bn="ডেটা সংরক্ষণ ও কুয়েরি করার পূর্বে প্রথমে একটি ডেটাবেস কন্টেইনার তৈরি করতে হয় এবং উপযুক্ত ডেটা টাইপ দিয়ে টেবিল ডিফাইন করতে হয়। নিচে ডেটাবেস তৈরি, টেবিল স্ট্রাকচার এবং মেমোরি-দক্ষ ডেটা টাইপের পূর্ণাঙ্গ লাইফসাইকেল দেখুন।"
        />

        {/* 2-Column Responsive Layout: Step 1 (Database Setup) & Step 2 (Table Creation & Anatomy) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* Step 1: Database Setup & Management */}
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-white">
                    <DualText en="Step 1: Database Setup (Container)" bn="ধাপ ১: ডেটাবেস তৈরি ও সক্রিয়করণ" />
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  {language === 'bn' ? 'কন্টেইনার লেভেল' : 'Container Level'}
                </span>
              </div>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 mt-2 leading-relaxed"
                en={<>Always use <code className="text-cyan-300 font-mono">IF NOT EXISTS</code> to prevent runtime execution errors if the database already exists. Switch context using <code className="text-amber-300 font-mono">USE</code>.</>}
                bn={<>ডেটাবেস আগে থেকেই তৈরি থাকলে যাতে কোনো এরর না দেয়, সেজন্য <code className="text-cyan-300 font-mono">IF NOT EXISTS</code> ক্লজ ব্যবহার করা ইন্ডাস্ট্রির সেরা অভ্যাস। এরপর <code className="text-amber-300 font-mono">USE</code> দিয়ে সক্রিয় করুন।</>}
              />
            </div>

            <div className="relative group">
              <pre className="text-[10px] text-emerald-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`-- 1. Create container if absent
CREATE DATABASE IF NOT EXISTS UniversityDB;

-- 2. Switch session context to this DB
USE UniversityDB;

-- 3. Verify existing databases
SHOW DATABASES;

-- 4. Safe removal if needed
-- DROP DATABASE IF EXISTS UniversityDB;`}
              </pre>
              <button
                onClick={() => handleCopy("CREATE DATABASE IF NOT EXISTS UniversityDB;\nUSE UniversityDB;\nSHOW DATABASES;", "db-create")}
                className="absolute top-1.5 right-1.5 px-2 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-[10px] font-mono text-zinc-300 flex items-center gap-1 transition-all cursor-pointer shadow"
                title="Copy SQL"
              >
                {copiedSnippet === "db-create" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet === "db-create" ? (language === 'bn' ? "কপি হয়েছে" : "Copied") : (language === 'bn' ? "কপি" : "Copy")}</span>
              </button>
            </div>
          </div>

          {/* Step 2: Table Creation Anatomy & Verification */}
          <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 flex flex-col justify-between space-y-2.5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <TableIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white">
                    <DualText en="Step 2: Table Creation (Anatomy)" bn="ধাপ ২: টেবিল তৈরি ও অ্যানাটমি" />
                  </span>
                </div>
                {/* View switcher: SQL vs DESCRIBE output */}
                <div className="flex items-center rounded-lg bg-black/40 p-0.5 border border-slate-800 text-[10px] font-mono">
                  <button
                    onClick={() => setSchemaViewMode('sql')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      schemaViewMode === 'sql' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    SQL
                  </button>
                  <button
                    onClick={() => setSchemaViewMode('describe')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      schemaViewMode === 'describe' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    DESCRIBE
                  </button>
                </div>
              </div>

              <DualText
                as="p"
                className="text-[11px] text-zinc-400 mt-2 leading-relaxed"
                en={<>A table definition specifies <strong className="text-white">Column Name</strong>, <strong className="text-cyan-300">Data Type</strong>, and optional integrity constraints. Inspect schema using <code className="text-emerald-300 font-mono">DESCRIBE students;</code>.</>}
                bn={<>টেবিল তৈরিতে প্রতিটি কলামের <strong className="text-white">নাম</strong>, উপযুক্ত <strong className="text-cyan-300">ডেটা টাইপ</strong> এবং প্রয়োজনে কনস্ট্রেইন্ট ঘোষণা করা হয়। তৈরির পর <code className="text-emerald-300 font-mono">DESCRIBE students;</code> দিয়ে স্কিমা যাচাই করা যায়।</>}
              />
            </div>

            {schemaViewMode === 'sql' ? (
              <div className="relative group">
                <pre className="text-[10px] text-emerald-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`CREATE TABLE IF NOT EXISTS students (
    student_id     INT PRIMARY KEY,
    full_name      VARCHAR(50) NOT NULL,
    email          VARCHAR(100) UNIQUE,
    cgpa           DECIMAL(3, 2),
    admission_date DATE,
    is_active      BOOLEAN DEFAULT TRUE
);`}
                </pre>
                <button
                  onClick={() => handleCopy("CREATE TABLE IF NOT EXISTS students (\n    student_id     INT PRIMARY KEY,\n    full_name      VARCHAR(50) NOT NULL,\n    email          VARCHAR(100) UNIQUE,\n    cgpa           DECIMAL(3, 2),\n    admission_date DATE,\n    is_active      BOOLEAN DEFAULT TRUE\n);", "tbl-create")}
                  className="absolute top-1.5 right-1.5 px-2 py-1 rounded bg-slate-800/90 hover:bg-slate-700 text-[10px] font-mono text-zinc-300 flex items-center gap-1 transition-all cursor-pointer shadow"
                  title="Copy SQL"
                >
                  {copiedSnippet === "tbl-create" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSnippet === "tbl-create" ? (language === 'bn' ? "কপি হয়েছে" : "Copied") : (language === 'bn' ? "কপি" : "Copy")}</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-black/60">
                <table className="w-full text-left font-mono text-[9.5px]">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/80 text-zinc-400">
                      <th className="py-1 px-2">Field</th>
                      <th className="py-1 px-2 text-cyan-300">Type</th>
                      <th className="py-1 px-2">Null</th>
                      <th className="py-1 px-2 text-amber-300">Key</th>
                      <th className="py-1 px-2">Default</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                    <tr><td className="py-1 px-2 font-bold text-white">student_id</td><td className="py-1 px-2 text-cyan-400">int</td><td className="py-1 px-2 text-rose-400">NO</td><td className="py-1 px-2 text-amber-400">PRI</td><td className="py-1 px-2 text-zinc-500">NULL</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">full_name</td><td className="py-1 px-2 text-cyan-400">varchar(50)</td><td className="py-1 px-2 text-rose-400">NO</td><td className="py-1 px-2 text-zinc-500">-</td><td className="py-1 px-2 text-zinc-500">NULL</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">email</td><td className="py-1 px-2 text-cyan-400">varchar(100)</td><td className="py-1 px-2 text-emerald-400">YES</td><td className="py-1 px-2 text-purple-400">UNI</td><td className="py-1 px-2 text-zinc-500">NULL</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">cgpa</td><td className="py-1 px-2 text-cyan-400">decimal(3,2)</td><td className="py-1 px-2 text-emerald-400">YES</td><td className="py-1 px-2 text-zinc-500">-</td><td className="py-1 px-2 text-zinc-500">NULL</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">admission_date</td><td className="py-1 px-2 text-cyan-400">date</td><td className="py-1 px-2 text-emerald-400">YES</td><td className="py-1 px-2 text-zinc-500">-</td><td className="py-1 px-2 text-zinc-500">NULL</td></tr>
                    <tr><td className="py-1 px-2 font-bold text-white">is_active</td><td className="py-1 px-2 text-cyan-400">tinyint(1)</td><td className="py-1 px-2 text-emerald-400">YES</td><td className="py-1 px-2 text-zinc-500">-</td><td className="py-1 px-2 text-emerald-400">1</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Essential SQL Data Types with Category Tabs */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <DualText
                  en="Step 3: Essential SQL Data Types (Categorized Reference)"
                  bn="ধাপ ৩: এসকিউএল ডেটা টাইপসমূহ (ক্যাটাগরিভিত্তিক রেফারেন্স)"
                />
              </h3>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 mt-0.5"
                en="Selecting the right data type enforces validation rules, minimizes disk storage, and maximizes query indexing performance."
                bn="সঠিক ডেটা টাইপ নির্বাচন করলে ডেটার নির্ভুলতা বাড়ে, ডিস্ক স্টোরেজ সাশ্রয় হয় এবং কুয়েরি পারফরম্যান্স বহু গুণ বৃদ্ধি পায়।"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1 bg-[#0a0d1e] p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
              {[
                { id: 'string', labelEn: 'String / Text', labelBn: 'স্ট্রিং / টেক্সট' },
                { id: 'numeric', labelEn: 'Numeric', labelBn: 'সংখ্যাতাত্ত্বিক' },
                { id: 'datetime', labelEn: 'Date & Time', labelBn: 'তারিখ ও সময়' },
                { id: 'special', labelEn: 'Boolean & Special', labelBn: 'বুলিয়ান ও স্পেশাল' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setDataTypeCategoryTab(tab.id as any)}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    dataTypeCategoryTab === tab.id
                      ? 'bg-cyan-600 text-white font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {language === 'bn' ? tab.labelBn : tab.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: STRING / TEXT (WITH INTERACTIVE CHAR VS VARCHAR SIMULATOR) */}
          {dataTypeCategoryTab === 'string' && (
            <div className="space-y-3">
              {/* Interactive CHAR(10) vs VARCHAR(10) Simulator */}
              <div className="p-3.5 rounded-xl bg-[#090d22] border border-cyan-500/30 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      INTERACTIVE MEMORY SIMULATOR
                    </span>
                    <h4 className="text-xs font-bold text-white">
                      <DualText en="CHAR(10) vs VARCHAR(10): How Storage Differs on Disk" bn="CHAR(10) বনাম VARCHAR(10): ডিস্কে মেমোরি স্টোরেজের পার্থক্য" />
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-[10px] text-zinc-400">{language === 'bn' ? 'টেস্ট শব্দ:' : 'Test string:'}</span>
                    <input
                      type="text"
                      maxLength={10}
                      value={charDemoInput}
                      onChange={(e) => setCharDemoInput(e.target.value)}
                      className="px-2 py-0.5 rounded bg-black/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono w-28 focus:outline-none focus:border-cyan-400"
                      placeholder="e.g. Rahim"
                    />
                  </div>
                </div>

                {/* Live Visual Byte Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                  {/* CHAR(10) Slots */}
                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-amber-400">CHAR(10) - Fixed Length</span>
                      <span className="text-[10px] text-amber-300/80">Always 10 bytes</span>
                    </div>
                    <div className="flex gap-1 overflow-x-auto py-1">
                      {Array.from({ length: 10 }).map((_, idx) => {
                        const char = charDemoInput[idx];
                        const isChar = char !== undefined;
                        return (
                          <div
                            key={idx}
                            className={`w-7 h-8 rounded flex flex-col items-center justify-center text-[11px] border font-bold ${
                              isChar
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-900/80 text-zinc-600 border-slate-800'
                            }`}
                            title={isChar ? `Byte ${idx + 1}: '${char}'` : `Byte ${idx + 1}: Blank Space Padding`}
                          >
                            <span>{isChar ? char : '⎵'}</span>
                            <span className="text-[7px] text-zinc-500 -mt-1">{idx + 1}</span>
                          </div>
                        );
                      })}
                    </div>
                    <DualText
                      as="p"
                      className="text-[10px] text-zinc-400 leading-snug"
                      en={<><strong className="text-amber-400">{charDemoInput.length}</strong> chars stored + <strong className="text-zinc-400">{10 - Math.min(10, charDemoInput.length)}</strong> padded blank spaces. Best for fixed codes (e.g., Country code <code className="text-cyan-300">&apos;BD&apos;</code>, Hash, UUID).</>}
                      bn={<><strong className="text-amber-400">{charDemoInput.length}</strong> ক্যারেক্টার + <strong className="text-zinc-400">{10 - Math.min(10, charDemoInput.length)}</strong> খালি স্পেস প্যাডিং। কান্ট্রি কোড (<code className="text-cyan-300">&apos;BD&apos;</code>) বা ফিক্সড কোডে সেরা।</>}
                    />
                  </div>

                  {/* VARCHAR(10) Slots */}
                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-cyan-400">VARCHAR(10) - Variable Length</span>
                      <span className="text-[10px] text-cyan-300/80">
                        {Math.min(10, charDemoInput.length) + 1} bytes ({10 - Math.min(10, charDemoInput.length)} saved!)
                      </span>
                    </div>
                    <div className="flex gap-1 overflow-x-auto py-1">
                      {/* 1 Byte Length Prefix */}
                      <div
                        className="w-8 h-8 rounded flex flex-col items-center justify-center text-[10px] border font-bold bg-purple-500/25 text-purple-300 border-purple-500/50"
                        title="1 Byte length prefix recording character count"
                      >
                        <span>len:{charDemoInput.length}</span>
                        <span className="text-[7px] text-purple-400/80 -mt-1">prefix</span>
                      </div>
                      {/* Character Slots */}
                      {Array.from(charDemoInput.slice(0, 10)).map((char, idx) => (
                        <div
                          key={idx}
                          className="w-7 h-8 rounded flex flex-col items-center justify-center text-[11px] border font-bold bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                          title={`Byte ${idx + 2}: '${char}'`}
                        >
                          <span>{char}</span>
                          <span className="text-[7px] text-zinc-500 -mt-1">{idx + 1}</span>
                        </div>
                      ))}
                      {/* Unallocated indicators */}
                      {Array.from({ length: Math.max(0, 10 - charDemoInput.length) }).map((_, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-8 rounded border border-dashed border-slate-800/80 flex items-center justify-center text-[9px] text-zinc-700 font-mono"
                          title="No memory allocated on disk"
                        >
                          ø
                        </div>
                      ))}
                    </div>
                    <DualText
                      as="p"
                      className="text-[10px] text-zinc-400 leading-snug"
                      en={<>Allocates only actual length (<strong className="text-cyan-400">{charDemoInput.length}B</strong>) + 1B prefix = <strong className="text-white">{charDemoInput.length + 1}B</strong> total. Saves disk on names, emails, addresses.</>}
                      bn={<>কেবলমাত্র আসল দৈর্ঘ্য (<strong className="text-cyan-400">{charDemoInput.length}B</strong>) + ১B প্রিফিক্স = <strong className="text-white">{charDemoInput.length + 1}B</strong> নেয়। নাম, ইমেইল বা পরিবর্তনশীল টেক্সটে মেমোরি বাঁচায়।</>}
                    />
                  </div>
                </div>
              </div>

              {/* String Types Summary Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#0a0d1e]">
                <table className="w-full text-left text-[11px] font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-400 font-mono text-[10px]">
                      <th className="py-1.5 px-2.5">Data Type</th>
                      <th className="py-1.5 px-2.5">Storage Mechanism</th>
                      <th className="py-1.5 px-2.5">Ideal Use Case</th>
                      <th className="py-1.5 px-2.5">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-[10.5px] text-zinc-300 font-sans">
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">CHAR(n)</td>
                      <td className="py-1.5 px-2.5 text-zinc-400">Fixed length (1 to 255 bytes). Padded with trailing spaces.</td>
                      <td className="py-1.5 px-2.5"><DualText en="Fixed-length codes: Country (BD, US), Gender (M, F), SHA hashes" bn="নির্দিষ্ট দৈর্ঘ্যের কোড: দেশের কোড (BD, US), জেন্ডার (M, F), হ্যাশ" /></td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">&apos;BD&apos;, &apos;CSE&apos;</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">VARCHAR(n)</td>
                      <td className="py-1.5 px-2.5 text-zinc-400">Variable length (up to 65,535 bytes in MySQL). 1-2B length prefix.</td>
                      <td className="py-1.5 px-2.5"><DualText en="Variable text: Student names, email addresses, phone numbers" bn="পরিবর্তনশীল টেক্সট: শিক্ষার্থীর নাম, ইমেইল, ঠিকানা" /></td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">&apos;Rahim Uddin&apos;</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">TEXT</td>
                      <td className="py-1.5 px-2.5 text-zinc-400">Long-form text (up to 64 KB). Stored out-of-row in overflow pages.</td>
                      <td className="py-1.5 px-2.5"><DualText en="Article bodies, descriptions, feedback comments" bn="বড় আর্টিকেল, বর্ণনামূলক মন্তব্য, কোর্সের বিস্তারিত বিবরণ" /></td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">&apos;Course syllabus...&apos;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: NUMERIC TYPES (WITH FLOAT VS DECIMAL ADVICE) */}
          {dataTypeCategoryTab === 'numeric' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#0a0d1e]">
                <table className="w-full text-left text-[11px] font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-400 font-mono text-[10px]">
                      <th className="py-1.5 px-2.5">Numeric Type</th>
                      <th className="py-1.5 px-2.5">Bytes</th>
                      <th className="py-1.5 px-2.5">Permitted Range</th>
                      <th className="py-1.5 px-2.5">Engineering Advice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-[10.5px] text-zinc-300 font-sans">
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">TINYINT</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">1 Byte</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">-128 to 127 (or 0 to 255 UNSIGNED)</td>
                      <td className="py-1.5 px-2.5"><DualText en="Used for student semester (1-8), ages, status flags." bn="সেমিস্টার নম্বর (১-৮), বয়স বা স্ট্যাটাস ফ্ল্যাগে ব্যবহৃত হয়।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">INT / INTEGER</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">4 Bytes</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">-2.14 Billion to +2.14 Billion</td>
                      <td className="py-1.5 px-2.5"><DualText en="Standard Primary Keys, Roll numbers, Foreign key references." bn="সাধারণ প্রাইমারি কি, রোল নম্বর এবং সাধারণ আইডির জন্য ডিফল্ট।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">BIGINT</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">8 Bytes</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">±9 Quintillion (10^18)</td>
                      <td className="py-1.5 px-2.5"><DualText en="High-scale systems (financial transactions, global event IDs)." bn="বিশাল সিস্টেম (ব্যাংক ট্রানজ্যাকশন আইডি, গ্লোবাল লগিং)।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 bg-emerald-950/15">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400">DECIMAL(p, s)</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">Variable</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">Exact fixed precision (up to 65 digits)</td>
                      <td className="py-1.5 px-2.5">
                        <span className="text-emerald-300 font-semibold">
                          <DualText en="MANDATORY for Money, Salaries & GPA." bn="টাকা-পয়সা, বেতন ও CGPA-এর জন্য বাধ্যতামূলক।" />
                        </span>
                        <span className="text-[10px] text-zinc-400 block">
                          <DualText en="Example: DECIMAL(3, 2) allows up to 4.00 without floating-point rounding errors." bn="উদাহরণ: DECIMAL(3, 2) কোনো দশমিক রাউন্ডিং এরর ছাড়া সর্বোচ্চ ৪.০০ পর্যন্ত সমর্থন করে।" />
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-rose-400">FLOAT / DOUBLE</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">4 / 8 Bytes</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">Approximate scientific values</td>
                      <td className="py-1.5 px-2.5 text-zinc-400">
                        <DualText en="Fast scientific math, GPS coordinates. AVOID for accounting due to IEEE 754 precision drift." bn="সায়েন্টিফিক ক্যালকুলেশন ও জিপিএস কোঅর্ডিনেট। রাউন্ডিং ড্রাফটের কারণে ফিন্যান্সে ব্যবহার অনুচিত।" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DATE & TIME */}
          {dataTypeCategoryTab === 'datetime' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#0a0d1e]">
                <table className="w-full text-left text-[11px] font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-400 font-mono text-[10px]">
                      <th className="py-1.5 px-2.5">Temporal Type</th>
                      <th className="py-1.5 px-2.5">Standard Format</th>
                      <th className="py-1.5 px-2.5">Storage & Range</th>
                      <th className="py-1.5 px-2.5">Key Difference & Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-[10.5px] text-zinc-300 font-sans">
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">DATE</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">YYYY-MM-DD</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">3 Bytes (1000 to 9999)</td>
                      <td className="py-1.5 px-2.5"><DualText en="Calendar dates without time: Birthdays, Admission dates." bn="সময় ছাড়া ক্যালেন্ডার তারিখ: জন্মদিন, ভর্তির তারিখ।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">TIME</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">HH:MM:SS</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">3 Bytes (-838h to +838h)</td>
                      <td className="py-1.5 px-2.5"><DualText en="Class schedules, exam start time, elapsed durations." bn="ক্লাস শিডিউল, পরীক্ষার শুরুর সময়, অতিবাহিত সময়।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">DATETIME</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">YYYY-MM-DD HH:MM:SS</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">5-8 Bytes (Year 1000 to 9999)</td>
                      <td className="py-1.5 px-2.5"><DualText en="Fixed point-in-time timestamp (stores exact entered value, NO timezone conversion)." bn="ফিক্সড সময়—টাইমজোন পরিবর্তন করলেও সংরক্ষিত সময়ের মান অপরিবর্তিত থাকে।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 bg-indigo-950/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-400">TIMESTAMP</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">YYYY-MM-DD HH:MM:SS</td>
                      <td className="py-1.5 px-2.5 font-mono text-zinc-400">4 Bytes (1970 to 2038 UTC)</td>
                      <td className="py-1.5 px-2.5">
                        <span className="text-indigo-300 font-semibold">
                          <DualText en="Auto converts to/from UTC based on server/client timezone." bn="সার্ভার বা ক্লায়েন্টের টাইমজোন অনুযায়ী স্বয়ংক্রিয়ভাবে UTC-তে কনভার্ট করে।" />
                        </span>
                        <span className="text-[10px] text-zinc-400 block">
                          <DualText en="Standard choice for created_at and updated_at audit columns." bn="created_at ও updated_at অডিট কলামের জন্য বিশ্বব্যাপী প্রথম পছন্দ।" />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BOOLEAN & SPECIAL */}
          {dataTypeCategoryTab === 'special' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-lg border border-slate-800/80 bg-[#0a0d1e]">
                <table className="w-full text-left text-[11px] font-sans">
                  <thead>
                    <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-400 font-mono text-[10px]">
                      <th className="py-1.5 px-2.5">Special Type</th>
                      <th className="py-1.5 px-2.5">Under the Hood</th>
                      <th className="py-1.5 px-2.5">Valid Values / Syntax</th>
                      <th className="py-1.5 px-2.5">Industry Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-[10.5px] text-zinc-300 font-sans">
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">BOOLEAN / BOOL</td>
                      <td className="py-1.5 px-2.5 text-zinc-400 font-mono">TINYINT(1)</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">TRUE (1) or FALSE (0)</td>
                      <td className="py-1.5 px-2.5"><DualText en="Flags: is_active, fee_paid, is_graduated." bn="ফ্ল্যাগ: is_active, fee_paid, is_graduated ইত্যাদি।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">ENUM(&apos;a&apos;, &apos;b&apos;, ...)</td>
                      <td className="py-1.5 px-2.5 text-zinc-400 font-mono">1-2 Bytes (Index mapped)</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">ENUM(&apos;CSE&apos;, &apos;EEE&apos;, &apos;BBA&apos;)</td>
                      <td className="py-1.5 px-2.5"><DualText en="Strict predefined options (departments, student blood groups)." bn="নির্দিষ্ট তালিকার বাইরে অন্য ডেটা ইনপুট ঠেকাতে দারুণ উপযোগী।" /></td>
                    </tr>
                    <tr className="hover:bg-slate-800/20">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">JSON</td>
                      <td className="py-1.5 px-2.5 text-zinc-400 font-mono">Binary JSON format</td>
                      <td className="py-1.5 px-2.5 font-mono text-amber-300">{'{"skills": ["SQL", "Java"]}'}</td>
                      <td className="py-1.5 px-2.5"><DualText en="Modern semi-structured document data inside relational tables." bn="রিলেশনাল টেবিলের ভেতর ফ্লেক্সিবল ডক্যুমেন্ট ডেটা সংরক্ষণ করতে।" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
