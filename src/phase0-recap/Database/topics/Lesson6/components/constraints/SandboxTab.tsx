'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  GitMerge,
  KeyRound,
  RotateCcw,
  Sparkles,
  Table,
  Table as TableIcon,
  Terminal,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function SandboxTab() {
  const { language } = useLanguage();
  const [constraintDemo, setConstraintDemo] = useState<'PK' | 'NOT_NULL' | 'UNIQUE' | 'DEFAULT' | 'CHECK' | 'FK'>('PK');
  const [constraintTestStatus, setConstraintTestStatus] = useState<string>('idle');

  return (
          <div className="space-y-3">
            {/* Constraint Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
              {(
                [
                  { id: 'PK', label: 'PRIMARY KEY', icon: KeyRound, desc: 'Unique + NOT NULL' },
                  { id: 'NOT_NULL', label: 'NOT NULL', icon: AlertTriangle, desc: 'Value Required' },
                  { id: 'UNIQUE', label: 'UNIQUE', icon: Sparkles, desc: 'No Duplicates' },
                  { id: 'DEFAULT', label: 'DEFAULT', icon: RotateCcw, desc: 'Fallback Value' },
                  { id: 'CHECK', label: 'CHECK', icon: CheckCircle2, desc: 'Boolean Rule' },
                  { id: 'FK', label: 'FOREIGN KEY', icon: GitMerge, desc: 'Parent Link' },
                ] as const
              ).map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setConstraintDemo(c.id);
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
  );
}
