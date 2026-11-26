'use client';

import React, { useState } from 'react';
import { Check, Code2, Copy, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const NORMALIZED_DDL = `-- 1. Departments Table (3NF: Eliminates transitive FDs)
CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(100) NOT NULL
);

-- 2. Students Table (2NF & 3NF: Single PK with FK link)
CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Student_Name VARCHAR(100) NOT NULL,
    Department_ID INT,
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);

-- 3. Courses Table (Independent course facts)
CREATE TABLE Courses (
    Course_ID INT PRIMARY KEY,
    Course_Name VARCHAR(100) NOT NULL
);

-- 4. Enrollments Table (Composite PK: Full FD on Grade)
CREATE TABLE Enrollments (
    Student_ID INT,
    Course_ID INT,
    Grade VARCHAR(5),
    PRIMARY KEY (Student_ID, Course_ID),
    FOREIGN KEY (Student_ID) REFERENCES Students(Student_ID),
    FOREIGN KEY (Course_ID) REFERENCES Courses(Course_ID)
);`;

export default function Lesson8Part5ComparisonSql() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(NORMALIZED_DDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      {/* PART 5: CHEAT SHEET COMPARISON */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৫ • তুলনামূলক ছক' : 'Part 5 of 8'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Comparison: 1NF, 2NF, 3NF & BCNF Cheat Sheet"
                bn="৫. 1NF, 2NF, 3NF ও BCNF তুলনামূলক চিট শিট"
              />
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Normal Form</th>
                <th className="py-2.5 px-3">Primary Condition</th>
                <th className="py-2.5 px-3">Eliminates</th>
                <th className="py-2.5 px-3">Mnemonic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">1NF</td>
                <td className="py-2.5 px-3 text-zinc-300">Atomic values in every cell</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Repeating groups &amp; arrays</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;The Key&rdquo;</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">2NF</td>
                <td className="py-2.5 px-3 text-zinc-300">1NF + Full key dependency</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Partial key dependencies</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;The Whole Key&rdquo;</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-purple-400">3NF</td>
                <td className="py-2.5 px-3 text-zinc-300">2NF + No transitive dependencies</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Non-key → non-key FDs</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;Nothing but the Key&rdquo;</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">BCNF</td>
                <td className="py-2.5 px-3 text-zinc-300">Every determinant X is a superkey</td>
                <td className="py-2.5 px-3 text-rose-400 font-semibold">Non-superkey determinants</td>
                <td className="py-2.5 px-3 font-mono text-zinc-400">&ldquo;So Help Me Codd&rdquo;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs">
          <span className="text-emerald-400 font-extrabold">BCNF</span>
          <span className="text-zinc-500 mx-2">⇒</span>
          <span className="text-purple-400 font-extrabold">3NF</span>
          <span className="text-zinc-500 mx-2">⇒</span>
          <span className="text-amber-400 font-extrabold">2NF</span>
          <span className="text-zinc-500 mx-2">⇒</span>
          <span className="text-cyan-400 font-extrabold">1NF</span>
          <DualText
            as="p"
            className="text-[11px] text-zinc-400 font-sans mt-1"
            en="Every BCNF relation is guaranteed to be in 3NF, but not every 3NF relation satisfies BCNF."
            bn="প্রতিটি BCNF রিলেশন অবশ্যই 3NF হয়, কিন্তু সব 3NF রিলেশন BCNF নাও হতে পারে।"
          />
        </div>
      </section>

      {/* PART 6: PRACTICAL 3NF SQL DDL */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৬ • ৩এনএফ SQL ইমপ্লিমেন্টেশন' : 'Part 6 of 8'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Practical Normalized SQL Implementation (3NF)"
                bn="৬. ব্যবহারিক নরমালাইজড SQL ইমপ্লিমেন্টেশন (3NF)"
              />
            </h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300">Clean 3NF DDL Script: University Schema</span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'SQL কপি' : 'Copy SQL')}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-lg bg-black/60 text-xs font-mono text-emerald-400 overflow-x-auto">
            {NORMALIZED_DDL}
          </pre>
        </div>
      </section>
    </>
  );
}
