'use client';

import React from 'react';
import {
  Code2,
  KeyRound,
  Table,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function TableLevelTab() {
  const { language } = useLanguage();

  return (
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
  );
}
