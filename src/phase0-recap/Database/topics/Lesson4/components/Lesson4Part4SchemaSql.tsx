'use client';

import React, { useState } from 'react';
import { FileCode2, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const CORE_DDL = `CREATE TABLE Department (
    Dept_ID INT PRIMARY KEY,
    Dept_Name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Student (
    Student_ID INT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,          -- Nullable Alternate Key
    Name VARCHAR(50) NOT NULL,
    Dept_ID INT,
    FOREIGN KEY (Dept_ID)
        REFERENCES Department(Dept_ID)
        ON DELETE SET NULL              -- Prevents orphan error
);`;

const ENROLLMENT_DDL = `CREATE TABLE Course (
    Course_ID VARCHAR(10) PRIMARY KEY,
    Title VARCHAR(80) NOT NULL,
    Credits INT NOT NULL
);

CREATE TABLE Enrollment (
    Student_ID INT,
    Course_ID VARCHAR(10),
    Semester VARCHAR(20),
    Grade CHAR(2),
    PRIMARY KEY (Student_ID, Course_ID, Semester), -- Composite Key
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID) ON DELETE CASCADE,
    FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID) ON DELETE RESTRICT
);`;

export default function Lesson4Part4SchemaSql() {
  const { language } = useLanguage();
  const [activeSqlTab, setActiveSqlTab] = useState<'core' | 'enrollment'>('core');
  const [copied, setCopied] = useState(false);

  const activeSql = activeSqlTab === 'core' ? CORE_DDL : ENROLLMENT_DDL;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <FileCode2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৪ / ৬' : 'Part 4 of 6'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Practical University Schema & SQL DDL Code"
              bn="বাস্তব বিশ্ববিদ্যালয়ের স্কিমা ও এসকিউএল (SQL DDL) কোড"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Table Architecture */}
        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
          <span className="text-cyan-400 font-bold block uppercase text-[11px]">
            {language === 'bn' ? 'রিলেশনাল টেবিল সংযোগসমূহ:' : 'Relational Linkages (4 Tables):'}
          </span>
          <div className="space-y-2 text-[11px] text-zinc-300">
            <div className="p-2.5 rounded bg-black/40 border border-slate-800">
              <strong className="text-amber-400 block">1. DEPARTMENT</strong>
              <span>Dept_ID [PRIMARY KEY], Dept_Name [UNIQUE]</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-slate-800">
              <strong className="text-indigo-400 block">2. STUDENT</strong>
              <span>Student_ID [PK], Email [UNIQUE], Dept_ID [FK &rarr; Department]</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-slate-800">
              <strong className="text-emerald-400 block">3. COURSE</strong>
              <span>Course_ID [PRIMARY KEY], Title, Credits</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-slate-800">
              <strong className="text-pink-400 block">4. ENROLLMENT (M:N Junction)</strong>
              <span>(Student_ID, Course_ID, Semester) [COMPOSITE PK] + 2 FKs</span>
            </div>
          </div>
        </div>

        {/* SQL DDL Snippet with 2-Tab Switcher */}
        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2.5 font-mono text-xs flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-slate-800 text-[10px]">
              <button
                onClick={() => setActiveSqlTab('core')}
                className={`px-2.5 py-1 rounded transition cursor-pointer ${
                  activeSqlTab === 'core'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Dept &amp; Student
              </button>
              <button
                onClick={() => setActiveSqlTab('enrollment')}
                className={`px-2.5 py-1 rounded transition cursor-pointer ${
                  activeSqlTab === 'enrollment'
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Course &amp; Enrollment
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-black/60 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-800 font-mono flex-1">
            {activeSql}
          </pre>
        </div>
      </div>
    </section>
  );
}
