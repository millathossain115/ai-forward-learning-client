'use client';

import React from 'react';
import { FileCode2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson4Part4SchemaSql() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <FileCode2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৪ ও ৫ / ৮' : 'Part 4 & 5 of 8'}
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
            {language === 'bn' ? 'রিলেশনাল টেবিল সংযোগসমূহ:' : 'Relational Linkages:'}
          </span>
          <div className="space-y-2 text-[11px] text-zinc-300">
            <div className="p-2 rounded bg-black/40 border border-slate-800">
              <strong className="text-amber-400 block">1. DEPARTMENT</strong>
              <span>Dept_ID [PRIMARY KEY], Dept_Name</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800">
              <strong className="text-indigo-400 block">2. STUDENT</strong>
              <span>Student_ID [PK], Email [UNIQUE], Dept_ID [FOREIGN KEY &rarr; Department]</span>
            </div>
            <div className="p-2 rounded bg-black/40 border border-slate-800">
              <strong className="text-pink-400 block">3. ENROLLMENT</strong>
              <span>(Student_ID + Course_ID + Semester) [COMPOSITE KEY]</span>
            </div>
          </div>
        </div>

        {/* SQL DDL Snippet */}
        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 font-mono text-xs">
          <span className="text-emerald-400 font-bold block uppercase text-[11px]">
            {language === 'bn' ? 'প্রকৃত SQL DDL কোড সিনট্যাক্স:' : 'Actual SQL DDL Syntax:'}
          </span>
          <pre className="p-3 rounded-lg bg-black/60 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-800 font-mono">
{`CREATE TABLE Department (
    Dept_ID INT PRIMARY KEY,
    Dept_Name VARCHAR(50)
);

CREATE TABLE Student (
    Student_ID INT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,
    Name VARCHAR(50),
    Dept_ID INT,
    FOREIGN KEY (Dept_ID)
        REFERENCES Department(Dept_ID)
);`}
          </pre>
        </div>
      </div>
    </section>
  );
}
