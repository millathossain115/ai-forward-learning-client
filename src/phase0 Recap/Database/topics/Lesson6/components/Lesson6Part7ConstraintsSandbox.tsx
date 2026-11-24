'use client';

import React, { useState } from 'react';
import { AlertTriangle, Check, CheckCircle2, Code2, GitMerge, KeyRound, RotateCcw, ShieldCheck, Sparkles, Table, Table as TableIcon, Terminal, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part7ConstraintsSandbox() {
  const { language } = useLanguage();
  const [constraintDemo, setConstraintDemo] = useState<'PK' | 'NOT_NULL' | 'UNIQUE' | 'DEFAULT' | 'CHECK' | 'FK'>('PK');
  const [constraintTestStatus, setConstraintTestStatus] = useState<string>('idle');
  const [constraintSectionTab, setConstraintSectionTab] = useState<'sandbox' | 'cascade' | 'table_level' | 'matrix'>('sandbox');
  const [cascadeMode, setCascadeMode] = useState<'RESTRICT' | 'CASCADE' | 'SET_NULL'>('CASCADE');

  return (
    <>
{/* ========================================================
          PART 7: SQL CONSTRAINTS & INTERACTIVE ERROR SANDBOX
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Header Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৭ • কনস্ট্রেইন্টস ও ইন্টিগ্রিটি রুলস' : 'Part 7 of 20'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="SQL Constraints & Integrity Rules Sandbox"
                bn="৭. এসকিউএল কনস্ট্রেইন্টস ও ডেটা ইন্টিগ্রিটি স্যান্ডবক্স"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Constraints enforce integrity rules at the storage engine level. If an INSERT or UPDATE violates a rule, the DBMS aborts the transaction immediately with a specific error code. Explore the interactive sandbox, cascade actions, and table-level constraints below."
          bn="কনস্ট্রেইন্টস হলো ডেটাবেসের ইঞ্জিনে তৈরি করা কিছু অলঙ্ঘনীয় নিয়ম যা ডেটার শুদ্ধতা (Data Integrity) নিশ্চিত করে। কোনো কুয়েরি নিয়ম ভঙ্গ করলে DBMS সাথে সাথে বাস্তব এরর কোডসহ তা বাতিল করে দেয়। নিচে লাইভ স্যান্ডবক্স, ক্যাস্কেড অ্যাকশন এবং কম্পোজিট কি এক্সপ্লোর করুন।"
        />

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-[#0a0d1e] p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
          {[
            { id: 'sandbox', labelEn: 'Interactive Sandbox & Terminal', labelBn: 'ইন্টারেক্টিভ স্যান্ডবক্স ও টার্মিনাল' },
            { id: 'cascade', labelEn: 'Foreign Key & ON DELETE CASCADE', labelBn: 'ফরেন কি ও ON DELETE ক্যাস্কেডিং' },
            { id: 'table_level', labelEn: 'Column vs Table Level & Composite Keys', labelBn: 'কলাম বনাম টেবিল লেভেল ও কম্পোজিট কি' },
            { id: 'matrix', labelEn: 'Quick Comparison Matrix', labelBn: 'কনস্ট্রেইন্ট তুলনা ম্যাট্রিক্স' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setConstraintSectionTab(tab.id as any);
                setConstraintTestStatus('idle');
              }}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                constraintSectionTab === tab.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {language === 'bn' ? tab.labelBn : tab.labelEn}
            </button>
          ))}
        </div>

        {/* ========================================================
            TAB 1: INTERACTIVE SANDBOX & TERMINAL
           ======================================================== */}
        {constraintSectionTab === 'sandbox' && (
          <div className="space-y-3">
            {/* Constraint Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
              {[
                { id: 'PK', label: 'PRIMARY KEY', icon: KeyRound, desc: 'Unique + NOT NULL' },
                { id: 'NOT_NULL', label: 'NOT NULL', icon: AlertTriangle, desc: 'Value Required' },
                { id: 'UNIQUE', label: 'UNIQUE', icon: Sparkles, desc: 'No Duplicates' },
                { id: 'DEFAULT', label: 'DEFAULT', icon: RotateCcw, desc: 'Fallback Value' },
                { id: 'CHECK', label: 'CHECK', icon: CheckCircle2, desc: 'Boolean Rule' },
                { id: 'FK', label: 'FOREIGN KEY', icon: GitMerge, desc: 'Parent Link' },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setConstraintDemo(c.id as any);
                      setConstraintTestStatus('idle');
                    }}
                    className={`p-2 rounded-lg text-left border transition-all cursor-pointer flex flex-col gap-0.5 ${
                      constraintDemo === c.id
                        ? 'bg-amber-500/20 border-amber-400/60 text-white shadow'
                        : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[9px] font-mono text-zinc-500">Rule</span>
                    </div>
                    <span className="text-xs font-mono font-bold truncate">{c.label}</span>
                    <span className="text-[9.5px] text-zinc-400 truncate font-sans">{c.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* 2-Column Responsive Layout: Left (Code & Action Buttons) / Right (Engine Terminal & Live Table) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
              {/* Left Column (5 Cols): Definition & Action Buttons */}
              <div className="lg:col-span-5 p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                      {constraintDemo === 'PK' && 'PRIMARY KEY (Entity Integrity)'}
                      {constraintDemo === 'NOT_NULL' && 'NOT NULL (Required Value)'}
                      {constraintDemo === 'UNIQUE' && 'UNIQUE (Distinct Index)'}
                      {constraintDemo === 'DEFAULT' && 'DEFAULT (Fallback Value)'}
                      {constraintDemo === 'CHECK' && 'CHECK (Domain Validation)'}
                      {constraintDemo === 'FK' && 'FOREIGN KEY (Referential Integrity)'}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-zinc-400">
                      MySQL Engine
                    </span>
                  </div>

                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-300 leading-relaxed font-sans"
                    en={
                      constraintDemo === 'PK' ? "Uniquely identifies every tuple in the table. Combining UNIQUE and NOT NULL, it creates a primary clustered index." :
                      constraintDemo === 'NOT_NULL' ? "Guarantees that a column cannot store a NULL (empty/missing) state. Critical for student names and login identifiers." :
                      constraintDemo === 'UNIQUE' ? "Ensures all values in the column are distinct. Unlike PRIMARY KEY, allows NULL (in MySQL, multiple NULLs are accepted)." :
                      constraintDemo === 'DEFAULT' ? "Automatically assigns a predefined constant if the column is omitted during INSERT." :
                      constraintDemo === 'CHECK' ? "Validates that every stored value satisfies an inline logical condition (e.g. age >= 16)." :
                      "Enforces referential integrity by linking student department_id to parent departments(id). Prevents orphaned child records."
                    }
                    bn={
                      constraintDemo === 'PK' ? "টেবিলের প্রতিটি সারিকে অনন্যভাবে শনাক্ত করে। এটি UNIQUE এবং NOT NULL-এর সমন্বয়ে ক্লাস্টারড ইনডেক্স তৈরি করে।" :
                      constraintDemo === 'NOT_NULL' ? "কলামে কোনো খালি বা মিসিং (NULL) মান রাখা প্রতিরোধ করে। শিক্ষার্থীর নাম ও আবশ্যিক তথ্যের জন্য বাধ্যতামূলক।" :
                      constraintDemo === 'UNIQUE' ? "কলামের প্রতিটি মান যেন সম্পূর্ণ আলাদা হয় তা নিশ্চিত করে। ইমেইল বা ফোন নম্বরের ডুপ্লিকেট রোধে ব্যবহৃত হয়।" :
                      constraintDemo === 'DEFAULT' ? "ইনসার্ট করার সময় কোনো কলামের মান না দিলে স্বয়ংক্রিয়ভাবে পূর্বনির্ধারিত ডিফল্ট মান বসিয়ে দেয়।" :
                      constraintDemo === 'CHECK' ? "কলামের মানগুলো যেন একটি নির্দিষ্ট লজিক্যাল শর্ত পূরণ করে তা নিশ্চিত করে (যেমন: বয়স অবশ্যই ১৬ বা তার বেশি হতে হবে)।" :
                      "চাইল্ড টেবিলের কলামকে প্যারেন্ট টেবিলের প্রাইমারি কি-এর সাথে যুক্ত করে। অস্তিত্বহীন প্যারেন্ট আইডির রেফারেন্স দেওয়া সম্পূর্ণ অসম্ভব করে।"
                    }
                  />

                  {/* DDL Code Snippet */}
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded-lg font-mono overflow-x-auto leading-tight">
{constraintDemo === 'PK' && `student_id INT PRIMARY KEY`}
{constraintDemo === 'NOT_NULL' && `full_name VARCHAR(50) NOT NULL`}
{constraintDemo === 'UNIQUE' && `email VARCHAR(100) UNIQUE`}
{constraintDemo === 'DEFAULT' && `country VARCHAR(30) DEFAULT 'Bangladesh'`}
{constraintDemo === 'CHECK' && `age INT CHECK (age >= 16)`}
{constraintDemo === 'FK' && `dept_id INT,
FOREIGN KEY (dept_id) REFERENCES departments(id)`}
                    </pre>
                  </div>
                </div>

                {/* Scenario Trigger Buttons */}
                <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-zinc-400 block font-bold">
                    {language === 'bn' ? 'স্যান্ডবক্স টেস্ট ক্লিপস চালান:' : 'Trigger Engine Test:'}
                  </span>

                  {constraintDemo === 'PK' && (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setConstraintTestStatus('pk_valid')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (ID: 104, &apos;Nusrat&apos;)</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-950/60 text-emerald-400">Valid</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('pk_dup')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (ID: 101, &apos;Duplicate&apos;)</span>
                        <span className="text-[9px] px-1 rounded bg-rose-950/60 text-rose-400">Error 1062</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('pk_null')}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 border border-amber-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (ID: NULL, &apos;No ID&apos;)</span>
                        <span className="text-[9px] px-1 rounded bg-amber-950/60 text-amber-400">Error 1048</span>
                      </button>
                    </div>
                  )}

                  {constraintDemo === 'NOT_NULL' && (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setConstraintTestStatus('not_null_valid')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (Name = &apos;Nusrat Karim&apos;)</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-950/60 text-emerald-400">Valid</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('not_null_error')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (Name = NULL)</span>
                        <span className="text-[9px] px-1 rounded bg-rose-950/60 text-rose-400">Error 1048</span>
                      </button>
                    </div>
                  )}

                  {constraintDemo === 'UNIQUE' && (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setConstraintTestStatus('unique_valid')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (Email = &apos;nusrat@univ.edu&apos;)</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-950/60 text-emerald-400">Valid</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('unique_dup')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (Email = &apos;rahim@univ.edu&apos;)</span>
                        <span className="text-[9px] px-1 rounded bg-rose-950/60 text-rose-400">Error 1062</span>
                      </button>
                    </div>
                  )}

                  {constraintDemo === 'DEFAULT' && (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setConstraintTestStatus('default_implicit')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT without &apos;country&apos; column</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-950/60 text-emerald-400">Auto Default</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('default_override')}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT with country = &apos;Canada&apos;</span>
                        <span className="text-[9px] px-1 rounded bg-cyan-950/60 text-cyan-400">Override</span>
                      </button>
                    </div>
                  )}

                  {constraintDemo === 'CHECK' && (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setConstraintTestStatus('check_valid')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (Age = 19, &gt;= 16)</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-950/60 text-emerald-400">Valid</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('check_violation')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (Age = 13, &lt; 16)</span>
                        <span className="text-[9px] px-1 rounded bg-rose-950/60 text-rose-400">Error 3819</span>
                      </button>
                    </div>
                  )}

                  {constraintDemo === 'FK' && (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setConstraintTestStatus('fk_valid')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (dept_id = 2, EEE exists)</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-950/60 text-emerald-400">Valid Parent</span>
                      </button>
                      <button
                        onClick={() => setConstraintTestStatus('fk_orphan')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 text-[10.5px] font-mono text-left transition-all cursor-pointer flex items-center justify-between"
                      >
                        <span>INSERT (dept_id = 99, Not found)</span>
                        <span className="text-[9px] px-1 rounded bg-rose-950/60 text-rose-400">Error 1452</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (7 Cols): Engine Terminal & Live Table */}
              <div className="lg:col-span-7 space-y-2.5">
                {/* Live Engine Console Terminal */}
                <div className="rounded-xl border border-slate-800 bg-black/80 p-3 font-mono space-y-1.5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 text-[10px]">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      <span>mysql-terminal • UniversityDB</span>
                    </div>
                    <span className="text-[9px] text-zinc-500">Live Engine Verdict</span>
                  </div>

                  {constraintTestStatus === 'idle' ? (
                    <div className="py-2 text-[10.5px] text-zinc-500">
                      {language === 'bn'
                        ? '-- বাম পাশের টেস্ট বাটনে ক্লিক করে MySQL ইঞ্জিনের সরাসরি আউটপুট ও এরর কোড দেখুন।'
                        : '-- Click any test scenario on the left to execute an INSERT statement and observe engine verdict.'}
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-[10.5px]">
                      {/* Executed Query */}
                      <div className="text-cyan-300 leading-tight">
                        <span className="text-zinc-500">mysql&gt; </span>
                        {constraintTestStatus === 'pk_valid' && "INSERT INTO students VALUES (104, 'Nusrat Karim', 'nusrat@univ.edu', 21, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'pk_dup' && "INSERT INTO students VALUES (101, 'Duplicate Rahim', 'dup@univ.edu', 20, 1, 'Bangladesh');"}
                        {constraintTestStatus === 'pk_null' && "INSERT INTO students VALUES (NULL, 'No ID', 'noid@univ.edu', 22, 1, 'Bangladesh');"}
                        {constraintTestStatus === 'not_null_valid' && "INSERT INTO students VALUES (104, 'Nusrat Karim', 'nusrat@univ.edu', 21, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'not_null_error' && "INSERT INTO students VALUES (104, NULL, 'nusrat@univ.edu', 21, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'unique_valid' && "INSERT INTO students VALUES (104, 'Nusrat Karim', 'nusrat@univ.edu', 21, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'unique_dup' && "INSERT INTO students VALUES (104, 'Impostor', 'rahim@univ.edu', 21, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'default_implicit' && "INSERT INTO students (id, name, email, age, dept_id) VALUES (104, 'Nusrat Karim', 'nusrat@univ.edu', 21, 2);"}
                        {constraintTestStatus === 'default_override' && "INSERT INTO students VALUES (104, 'Alex Smith', 'alex@univ.edu', 22, 1, 'Canada');"}
                        {constraintTestStatus === 'check_valid' && "INSERT INTO students VALUES (104, 'Nusrat Karim', 'nusrat@univ.edu', 19, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'check_violation' && "INSERT INTO students VALUES (104, 'Little Kid', 'kid@univ.edu', 13, 1, 'Bangladesh');"}
                        {constraintTestStatus === 'fk_valid' && "INSERT INTO students VALUES (104, 'Nusrat Karim', 'nusrat@univ.edu', 21, 2, 'Bangladesh');"}
                        {constraintTestStatus === 'fk_orphan' && "INSERT INTO students VALUES (104, 'Ghost Student', 'ghost@univ.edu', 21, 99, 'Bangladesh');"}
                      </div>

                      {/* Engine Output */}
                      {['pk_valid', 'not_null_valid', 'unique_valid', 'default_implicit', 'default_override', 'check_valid', 'fk_valid'].includes(constraintTestStatus) ? (
                        <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-0.5">
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Query OK, 1 row affected (0.01 sec)</span>
                          </div>
                          <span className="text-[9.5px] text-emerald-400/80 block">Records: 1  Duplicates: 0  Warnings: 0</span>
                        </div>
                      ) : (
                        <div className="p-2 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 space-y-1">
                          <div className="flex items-start gap-1.5 font-bold text-rose-400">
                            <XCircle className="w-3.5 h-3.5 text-rose-400 mt-0.5 flex-shrink-0" />
                            <span>
                              {constraintTestStatus === 'pk_dup' && "ERROR 1062 (23000): Duplicate entry '101' for key 'students.PRIMARY'"}
                              {constraintTestStatus === 'pk_null' && "ERROR 1048 (23000): Column 'id' cannot be null"}
                              {constraintTestStatus === 'not_null_error' && "ERROR 1048 (23000): Column 'full_name' cannot be null"}
                              {constraintTestStatus === 'unique_dup' && "ERROR 1062 (23000): Duplicate entry 'rahim@univ.edu' for key 'students.email_UNIQUE'"}
                              {constraintTestStatus === 'check_violation' && "ERROR 3819 (HY000): Check constraint 'chk_student_age' is violated."}
                              {constraintTestStatus === 'fk_orphan' && "ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails ('UniversityDB'.'students', CONSTRAINT 'fk_dept' FOREIGN KEY ('dept_id') REFERENCES 'departments' ('id'))"}
                            </span>
                          </div>
                          <div className="text-[10px] text-rose-300/80 font-sans border-t border-rose-500/20 pt-1">
                            <DualText
                              en={
                                constraintTestStatus === 'pk_dup' ? "Engine rejected duplicate PRIMARY KEY. ID 101 already belongs to Rahim." :
                                constraintTestStatus === 'pk_null' ? "Entity integrity failed: Primary Key cannot be NULL under any condition." :
                                constraintTestStatus === 'not_null_error' ? "Mandatory column constraint violated: 'full_name' cannot be left empty." :
                                constraintTestStatus === 'unique_dup' ? "Duplicate email collision. UNIQUE constraint guarantees only 1 owner per email." :
                                constraintTestStatus === 'check_violation' ? "Domain validation failed: age (13) is less than required minimum age (16)." :
                                "Referential integrity failed: Department ID 99 does not exist in parent departments table."
                              }
                              bn={
                                constraintTestStatus === 'pk_dup' ? "ইঞ্জিন ডুপ্লিকেট প্রাইমারি কি বাতিল করেছে। আইডি ১০১ ইতিমধ্যে রহিমের দখলে।" :
                                constraintTestStatus === 'pk_null' ? "এনটিটি ইন্টিগ্রিটি ভঙ্গ: প্রাইমারি কি কখনোই NULL হতে পারে না।" :
                                constraintTestStatus === 'not_null_error' ? "আবশ্যিক কলাম শর্ত ভঙ্গ: শিক্ষার্থীর নাম খালি রাখা অসম্ভব।" :
                                constraintTestStatus === 'unique_dup' ? "ইমেইল ডুপ্লিকেট হয়েছে। UNIQUE নিয়মে একই ইমেইল দুজনের হতে পারে না।" :
                                constraintTestStatus === 'check_violation' ? "ডোমেইন ভ্যালিডেশন ব্যর্থ: বয়স (১৩) অনুমোদিত নূন্যতম বয়স (১৬)-এর চেয়ে কম।" :
                                "রেফারেন্সিয়াল ইন্টিগ্রিটি ব্যর্থ: ডিপার্টমেন্ট ৯৯ প্যারেন্ট টেবিলে অনুপস্থিত।"
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Live Mini-Table Representation */}
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c1024]">
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 bg-[#14182d] text-[10px] font-mono">
                    <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                      <TableIcon className="w-3 h-3 text-cyan-400" />
                      <span>Live Table: students</span>
                    </span>
                    <span className="text-zinc-500">UniversityDB</span>
                  </div>
                  <table className="w-full text-left font-mono text-[9.5px]">
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-black/30 text-zinc-400">
                        <th className="py-1 px-2">id (PK)</th>
                        <th className="py-1 px-2">name (NOT NULL)</th>
                        <th className="py-1 px-2">email (UNIQUE)</th>
                        <th className="py-1 px-2">age (CHECK &gt;= 16)</th>
                        <th className="py-1 px-2">dept_id (FK)</th>
                        <th className="py-1 px-2">country (DEFAULT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                      {/* Row 101 */}
                      <tr className={`transition-colors ${
                        ['pk_dup', 'unique_dup'].includes(constraintTestStatus)
                          ? 'bg-rose-950/60 text-rose-200 border-l-2 border-rose-500 font-bold'
                          : 'hover:bg-slate-800/30'
                      }`}>
                        <td className="py-1 px-2 font-bold text-amber-300">
                          101 {constraintTestStatus === 'pk_dup' && <span className="text-[8px] px-1 rounded bg-rose-900 text-rose-200 ml-1">CONFLICT</span>}
                        </td>
                        <td className="py-1 px-2 text-white">Rahim Uddin</td>
                        <td className="py-1 px-2 text-cyan-400">
                          rahim@univ.edu {constraintTestStatus === 'unique_dup' && <span className="text-[8px] px-1 rounded bg-rose-900 text-rose-200 ml-1">COLLISION</span>}
                        </td>
                        <td className="py-1 px-2">21</td>
                        <td className="py-1 px-2 text-emerald-400">1 (CSE)</td>
                        <td className="py-1 px-2 text-zinc-400">Bangladesh</td>
                      </tr>

                      {/* Row 102 */}
                      <tr className="hover:bg-slate-800/30">
                        <td className="py-1 px-2 font-bold text-amber-300">102</td>
                        <td className="py-1 px-2 text-white">Sadia Jahan</td>
                        <td className="py-1 px-2 text-cyan-400">sadia@univ.edu</td>
                        <td className="py-1 px-2">20</td>
                        <td className="py-1 px-2 text-emerald-400">2 (EEE)</td>
                        <td className="py-1 px-2 text-zinc-400">Bangladesh</td>
                      </tr>

                      {/* Row 103 */}
                      <tr className="hover:bg-slate-800/30">
                        <td className="py-1 px-2 font-bold text-amber-300">103</td>
                        <td className="py-1 px-2 text-white">Tanvir Ahmed</td>
                        <td className="py-1 px-2 text-cyan-400">tanvir@univ.edu</td>
                        <td className="py-1 px-2">22</td>
                        <td className="py-1 px-2 text-emerald-400">1 (CSE)</td>
                        <td className="py-1 px-2 text-zinc-400">Bangladesh</td>
                      </tr>

                      {/* Simulated Newly Added Row 104 on Valid Test */}
                      {['pk_valid', 'not_null_valid', 'unique_valid', 'default_implicit', 'default_override', 'check_valid', 'fk_valid'].includes(constraintTestStatus) && (
                        <tr className="bg-emerald-950/50 text-emerald-200 border-l-2 border-emerald-400 font-bold animate-in fade-in duration-200">
                          <td className="py-1 px-2 text-emerald-300">104 <span className="text-[8px] px-1 rounded bg-emerald-900 text-emerald-200 ml-1">NEW</span></td>
                          <td className="py-1 px-2 text-white">{constraintTestStatus === 'default_override' ? 'Alex Smith' : 'Nusrat Karim'}</td>
                          <td className="py-1 px-2 text-cyan-300">{constraintTestStatus === 'default_override' ? 'alex@univ.edu' : 'nusrat@univ.edu'}</td>
                          <td className="py-1 px-2">{constraintTestStatus === 'check_valid' ? '19' : '21'}</td>
                          <td className="py-1 px-2 text-emerald-300">{constraintTestStatus === 'default_override' ? '1 (CSE)' : '2 (EEE)'}</td>
                          <td className="py-1 px-2 text-amber-300">
                            {constraintTestStatus === 'default_override' ? 'Canada' : 'Bangladesh'}
                            {constraintTestStatus === 'default_implicit' && <span className="text-[8px] px-1 rounded bg-amber-950 text-amber-300 ml-1">DEFAULT</span>}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: FOREIGN KEY & ON DELETE CASCADE
           ======================================================== */}
        {constraintSectionTab === 'cascade' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                  <GitMerge className="w-3.5 h-3.5 text-cyan-400" />
                  <DualText
                    en="Referential Actions: What Happens When a Parent Row is Deleted?"
                    bn="রেফারেন্সিয়াল অ্যাকশন: প্যারেন্ট রো মুছে ফেললে চাইল্ড টেবিলের কী হয়?"
                  />
                </h3>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 mt-0.5"
                  en="Foreign keys don't just validate insertions—they govern what happens to related child rows when a parent department is deleted."
                  bn="ফরেন কি শুধু ডেটা ইনসার্ট আটকে দেয় না—প্যারেন্ট ডিপার্টমেন্ট ডিলিট করলে যুক্ত শিক্ষার্থীদের রো কী হবে তা নিয়ন্ত্রণ করে।"
                />
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center rounded-lg bg-black/40 p-0.5 border border-slate-800 text-[10.5px] font-mono">
                {(['RESTRICT', 'CASCADE', 'SET_NULL'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setCascadeMode(mode)}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      cascadeMode === mode ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mode === 'RESTRICT' && 'ON DELETE RESTRICT'}
                    {mode === 'CASCADE' && 'ON DELETE CASCADE'}
                    {mode === 'SET_NULL' && 'ON DELETE SET NULL'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Scenario Card */}
            <div className="p-3.5 rounded-xl bg-[#090d22] border border-indigo-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-indigo-300">
                  Scenario: Admin executes <code className="text-rose-400 bg-black/50 px-1.5 py-0.5 rounded">DELETE FROM departments WHERE id = 1; (CSE)</code>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  Active Mode: ON DELETE {cascadeMode}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                {/* Engine Behavior Explanation */}
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase block">Engine Verdict:</span>
                  {cascadeMode === 'RESTRICT' && (
                    <div className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300">
                        ERROR 1451 (23000): Cannot delete parent row: a foreign key constraint fails
                      </div>
                      <DualText
                        as="p"
                        en="Engine REFUSES deletion! Because students 101 (Rahim) and 103 (Tanvir) still reference Department 1, deleting it would leave orphan records. Default behavior in MySQL."
                        bn="ইঞ্জিন ডিলিট করতে সম্পূর্ণ অস্বীকৃতি জানায়! যেহেতু শিক্ষার্থী ১০১ (রহিম) ও ১০৩ (তানভীর) এখনও ডিপার্টমেন্ট ১-এ রয়েছে, তাই ডিলিট করলে তারা অভিভাবকহীন হয়ে পড়বে। এটি MySQL-এর ডিফল্ট নিয়ম।"
                      />
                    </div>
                  )}

                  {cascadeMode === 'CASCADE' && (
                    <div className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 font-mono text-[10px] text-amber-300">
                        Query OK, 1 row affected -- Cascaded: 2 dependent rows in students automatically deleted!
                      </div>
                      <DualText
                        as="p"
                        en="Engine WIPES parent AND children! Department 1 is deleted, and the engine automatically cascades down to delete Rahim (101) and Tanvir (103) from students as well. Powerful but dangerous!"
                        bn="ইঞ্জিন প্যারেন্ট ও চাইল্ড উভয়ই মুছে ফেলে! ডিপার্টমেন্ট ১ ডিলিট হওয়ার সাথে সাথে চাইল্ড টেবিলের রহিম (১০১) ও তানভীর (১০৩)-এর ডেটাও স্বয়ংক্রিয়ভাবে মুছে যায়। শক্তিশালী হলেও অত্যন্ত সতর্কতার সাথে ব্যবহার্য!"
                      />
                    </div>
                  )}

                  {cascadeMode === 'SET_NULL' && (
                    <div className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 font-mono text-[10px] text-emerald-300">
                        Query OK, 1 row affected -- Cascaded: 2 rows in students updated (dept_id = NULL)
                      </div>
                      <DualText
                        as="p"
                        en="Department 1 is deleted, but students stay enrolled in the university! Rahim (101) and Tanvir (103) have their dept_id set to NULL (Unassigned major). Requires dept_id to allow NULL."
                        bn="ডিপার্টমেন্ট ১ মুছে গেলেও শিক্ষার্থীরা বহাল থাকে! রহিম (১০১) ও তানভীর (১০৩)-এর dept_id স্বয়ংক্রিয়ভাবে NULL হয়ে যায় (অনির্দিষ্ট বিভাগ)। এর জন্য dept_id কলামে NULL অনুমোদন থাকতে হয়।"
                      />
                    </div>
                  )}
                </div>

                {/* DDL Syntax Snippet */}
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">DDL Declaration:</span>
                  <pre className="text-[10px] font-mono text-emerald-300 bg-black/70 p-2.5 rounded overflow-x-auto leading-tight">
{`CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) 
        REFERENCES departments(id)
        ON DELETE ${cascadeMode}
        ON UPDATE CASCADE
);`}
                  </pre>
                  <DualText
                    as="p"
                    className="text-[10px] text-zinc-400 font-sans"
                    en="ON UPDATE CASCADE also keeps IDs synchronized if the parent Department ID changes."
                    bn="ON UPDATE CASCADE রাখলে প্যারেন্টের আইডি পরিবর্তন করলেও চাইল্ডের আইডি স্বয়ংক্রিয়ভাবে আপডেট হয়ে যায়।"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: COLUMN VS TABLE LEVEL & COMPOSITE KEYS
           ======================================================== */}
        {constraintSectionTab === 'table_level' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Card 1: Column-Level vs Table-Level */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-2.5">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  <DualText en="Column-Level vs Table-Level Syntax" bn="কলাম-লেভেল বনাম টেবিল-লেভেল সিনট্যাক্স" />
                </span>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-300 leading-relaxed font-sans"
                  en="Column-level constraints are defined immediately after the data type on the same line. Table-level constraints are declared at the end of the CREATE TABLE block and can span multiple columns."
                  bn="কলাম-লেভেল কনস্ট্রেইন্ট লাইনের শেষেই ডেটা টাইপের সাথে লেখা হয়। টেবিল-লেভেল কনস্ট্রেইন্ট টেবিলের শেষে কমা দিয়ে আলাদা লাইনে লেখা হয় এবং এটি একাধিক কলামে একসাথে কাজ করতে পারে।"
                />
                <pre className="text-[10px] text-emerald-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`-- Column-Level (Inline)
id INT PRIMARY KEY,
email VARCHAR(100) UNIQUE

-- Table-Level (Explicit Constraint Name)
CONSTRAINT pk_students PRIMARY KEY (id),
CONSTRAINT uq_email UNIQUE (email),
CONSTRAINT chk_gpa CHECK (cgpa >= 0.0 AND cgpa <= 4.0)`}
                </pre>
                <div className="text-[10.5px] text-zinc-400 font-sans border-t border-slate-800 pt-1.5">
                  <strong className="text-amber-300 font-mono">Pro Tip: </strong>
                  <DualText
                    en="Always name constraints explicitly with CONSTRAINT name. It makes future ALTER TABLE and DROP CONSTRAINT migrations predictable."
                    bn="সবসময় CONSTRAINT নাম দিয়ে ডিক্লেয়ার করা ভালো। এতে ভবিষ্যতে ALTER TABLE দিয়ে নির্দিষ্ট নিয়মটি ড্রপ বা পরিবর্তন করা সহজ হয়।"
                  />
                </div>
              </div>

              {/* Card 2: Composite Primary Key (Exam Favorite) */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-2.5">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4" />
                  <DualText en="Composite Primary Keys (Mandatory Table-Level)" bn="কম্পোজিট প্রাইমারি কি (বাধ্যতামূলক টেবিল-লেভেল)" />
                </span>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-300 leading-relaxed font-sans"
                  en="When uniqueness requires 2 or more columns combined (e.g. course_enrollments where student_id + course_id together are unique), you MUST use table-level constraint syntax."
                  bn="যখন দুটি বা ততোধিক কলাম মিলে একটি অনন্য কি তৈরি হয় (যেমন: একজন ছাত্র একই কোর্সে দুবার এনরোল হতে পারবে না), তখন বাধ্যতামূলকভাবে টেবিল-লেভেল সিনট্যাক্স ব্যবহার করতে হয়।"
                />
                <pre className="text-[10px] text-emerald-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`CREATE TABLE course_enrollments (
    student_id INT,
    course_id  INT,
    enroll_date DATE,
    grade VARCHAR(2),
    -- Composite Key: combination is unique!
    CONSTRAINT pk_enrollment 
        PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);`}
                </pre>
                <div className="text-[10.5px] text-zinc-400 font-sans border-t border-slate-800 pt-1.5">
                  <strong className="text-cyan-300 font-mono">ALTER TABLE: </strong>
                  <code className="text-emerald-300 font-mono text-[9.5px] block">ALTER TABLE students ADD CONSTRAINT chk_age CHECK (age &gt;= 16);</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: QUICK COMPARISON MATRIX
           ======================================================== */}
        {constraintSectionTab === 'matrix' && (
          <div className="overflow-x-auto rounded-lg border border-slate-800/90 bg-[#0a0d1e]">
            <table className="w-full text-left text-[11px] font-sans">
              <thead>
                <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-300 font-mono text-[10px]">
                  <th className="py-1.5 px-2.5 font-bold text-amber-300">Constraint</th>
                  <th className="py-1.5 px-2.5 font-bold text-slate-300">Integrity Rule</th>
                  <th className="py-1.5 px-2.5 font-bold text-cyan-300">Multiple Allowed?</th>
                  <th className="py-1.5 px-2.5 font-bold text-rose-300">Allows NULL?</th>
                  <th className="py-1.5 px-2.5 font-bold text-purple-300">Auto Index?</th>
                  <th className="py-1.5 px-2.5 font-bold text-emerald-300">Syntax Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-zinc-300 text-[10.5px]">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-amber-400">PRIMARY KEY</td>
                  <td className="py-1.5 px-2.5">Uniquely identifies each row; never duplicate or null</td>
                  <td className="py-1.5 px-2.5 font-mono text-rose-400">No (Only 1)</td>
                  <td className="py-1.5 px-2.5 font-mono text-rose-400">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Clustered)</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">id INT PRIMARY KEY</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">UNIQUE</td>
                  <td className="py-1.5 px-2.5">All column values must be distinct across table</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (In MySQL)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Unique Index)</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">email VARCHAR(100) UNIQUE</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-rose-400">NOT NULL</td>
                  <td className="py-1.5 px-2.5">Prohibits empty or missing value; mandatory attribute</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-rose-400">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-zinc-500">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">name VARCHAR(50) NOT NULL</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400">CHECK</td>
                  <td className="py-1.5 px-2.5">Enforces inline boolean condition on all inserted values</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (NULL passes check)</td>
                  <td className="py-1.5 px-2.5 font-mono text-zinc-500">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">CHECK (age &gt;= 16)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-purple-400">DEFAULT</td>
                  <td className="py-1.5 px-2.5">Provides fallback value when column is omitted in INSERT</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Default can be NULL)</td>
                  <td className="py-1.5 px-2.5 font-mono text-zinc-500">No</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">country DEFAULT &apos;BD&apos;</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-400">FOREIGN KEY</td>
                  <td className="py-1.5 px-2.5">Maintains referential integrity to a parent Primary Key</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Many)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Allows orphan nulls)</td>
                  <td className="py-1.5 px-2.5 font-mono text-emerald-400">Yes (Foreign Index)</td>
                  <td className="py-1.5 px-2.5 font-mono text-cyan-300">FOREIGN KEY (d_id) REFERENCES dept(id)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
