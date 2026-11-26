'use client';

import React, { useState } from 'react';
import { Check, CheckCircle2, Copy, GraduationCap, Table2, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface WalkthroughStep {
  step: number;
  labelEn: string;
  labelBn: string;
  titleEn: string;
  titleBn: string;
  sql: string;
  descEn: string;
  descBn: string;
  outputTitleEn: string;
  outputTitleBn: string;
  statusMsg?: string;
  headers?: string[];
  rows?: (string | number)[][];
}

const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    step: 1,
    labelEn: '1. CREATE DB',
    labelBn: '১. ডেটাবেস তৈরি',
    titleEn: 'Step 1: Create Database',
    titleBn: 'ধাপ ১: ডেটাবেস তৈরি',
    sql: `CREATE DATABASE UniversityDB;\nUSE UniversityDB;`,
    descEn: 'Creates the container and sets it as the active working schema.',
    descBn: 'ডেটাবেস কন্টেইনার তৈরি করে এবং এটিকে সক্রিয় ওয়ার্কিং স্কিমা হিসেবে সেট করে।',
    outputTitleEn: 'Execution Output',
    outputTitleBn: 'এক্সিকিউশন আউটপুট',
    statusMsg: 'Query OK, 1 row affected • Active schema switched to `UniversityDB`',
  },
  {
    step: 2,
    labelEn: '2. Parent Table',
    labelBn: '২. প্যারেন্ট টেবিল',
    titleEn: 'Step 2: Create Departments Table (Parent)',
    titleBn: 'ধাপ ২: Departments টেবিল তৈরি (প্যারেন্ট টেবিল)',
    sql: `CREATE TABLE Departments (\n    Department_ID INT PRIMARY KEY,\n    Department_Name VARCHAR(50) NOT NULL\n);`,
    descEn: 'Always create parent tables first so child tables can reference their Primary Keys.',
    descBn: 'সর্বদা প্যারেন্ট টেবিল আগে তৈরি করবেন যেন চাইল্ড টেবিলগুলো এর Primary Key রেফারেন্স করতে পারে।',
    outputTitleEn: 'Table Schema Created: Departments',
    outputTitleBn: 'তৈরিকৃত টেবিল স্কিমা: Departments',
    headers: ['Field', 'Type', 'Null', 'Key'],
    rows: [
      ['Department_ID', 'INT', 'NO', 'PRI'],
      ['Department_Name', 'VARCHAR(50)', 'NO', ''],
    ],
  },
  {
    step: 3,
    labelEn: '3. Insert Depts',
    labelBn: '৩. ডিপার্টমেন্ট ইনসার্ট',
    titleEn: 'Step 3: Insert Departments',
    titleBn: 'ধাপ ৩: ডিপার্টমেন্ট ডেটা ইনসার্ট',
    sql: `INSERT INTO Departments VALUES \n(1, 'CSE'),\n(2, 'BBA'),\n(3, 'EEE');`,
    descEn: 'Batch-inserts 3 department records into the Departments table.',
    descBn: 'Departments টেবিলে একবারে ৩টি ডিপার্টমেন্ট রেকর্ড ইনসার্ট করে।',
    outputTitleEn: 'Resulting Table: Departments (3 rows inserted)',
    outputTitleBn: 'ফলাফল টেবিল: Departments (৩টি সারি ইনসার্ট হয়েছে)',
    headers: ['Department_ID', 'Department_Name'],
    rows: [
      [1, 'CSE'],
      [2, 'BBA'],
      [3, 'EEE'],
    ],
  },
  {
    step: 4,
    labelEn: '4. Child + FK',
    labelBn: '৪. চাইল্ড + FK',
    titleEn: 'Step 4: Create Students Table with Foreign Key',
    titleBn: 'ধাপ ৪: Foreign Key সহ Students টেবিল তৈরি',
    sql: `CREATE TABLE Students (\n    Student_ID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT CHECK (Age >= 16),\n    Email VARCHAR(100) UNIQUE,\n    Department_ID INT,\n    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)\n);`,
    descEn: 'Enforces PK, NOT NULL, CHECK, UNIQUE, and FOREIGN KEY integrity.',
    descBn: 'PK, NOT NULL, CHECK, UNIQUE এবং FOREIGN KEY এর ইন্টিগ্রিটি নিশ্চিত করে।',
    outputTitleEn: 'Table Schema Created: Students',
    outputTitleBn: 'তৈরিকৃত টেবিল স্কিমা: Students',
    headers: ['Field', 'Type', 'Constraint / Key'],
    rows: [
      ['Student_ID', 'INT', 'PRIMARY KEY'],
      ['Name', 'VARCHAR(100)', 'NOT NULL'],
      ['Age', 'INT', 'CHECK (Age >= 16)'],
      ['Email', 'VARCHAR(100)', 'UNIQUE'],
      ['Department_ID', 'INT', 'FOREIGN KEY → Departments(Department_ID)'],
    ],
  },
  {
    step: 5,
    labelEn: '5. Insert Students',
    labelBn: '৫. শিক্ষার্থী ইনসার্ট',
    titleEn: 'Step 5: Insert Student Records',
    titleBn: 'ধাপ ৫: শিক্ষার্থী রেকর্ড ইনসার্ট',
    sql: `INSERT INTO Students VALUES \n(101, 'Rahim', 22, 'rahim@gmail.com', 1),\n(102, 'Karim', 23, 'karim@gmail.com', 2),\n(103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1),\n(104, 'Nabila', 22, 'nabila@gmail.com', 3);`,
    descEn: 'Populates students referencing existing department foreign keys (1, 2, 3).',
    descBn: 'বিদ্যমান ডিপার্টমেন্ট ফরেন কি (১, ২, ৩) রেফারেন্স করে শিক্ষার্থীদের ডেটা সংরক্ষণ করে।',
    outputTitleEn: 'Resulting Table: Students (4 rows inserted)',
    outputTitleBn: 'ফলাফল টেবিল: Students (৪টি সারি ইনসার্ট হয়েছে)',
    headers: ['Student_ID', 'Name', 'Age', 'Email', 'Department_ID'],
    rows: [
      [101, 'Rahim', 22, 'rahim@gmail.com', 1],
      [102, 'Karim', 23, 'karim@gmail.com', 2],
      [103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1],
      [104, 'Nabila', 22, 'nabila@gmail.com', 3],
    ],
  },
  {
    step: 6,
    labelEn: '6. SELECT All',
    labelBn: '৬. সব রেকর্ড দেখুন',
    titleEn: 'Step 6: Display All Students',
    titleBn: 'ধাপ ৬: সব শিক্ষার্থীর তালিকা প্রদর্শন',
    sql: `SELECT * FROM Students;`,
    descEn: 'Returns all 4 student records with their raw Department_IDs.',
    descBn: 'সকল ৪ জন শিক্ষার্থীর রেকর্ড তাদের ডিপার্টমেন্ট আইডি সহ রিটার্ন করে।',
    outputTitleEn: 'Query Result: 4 rows returned',
    outputTitleBn: 'কুয়েরি আউটপুট: ৪টি সারি পাওয়া গেছে',
    headers: ['Student_ID', 'Name', 'Age', 'Email', 'Department_ID'],
    rows: [
      [101, 'Rahim', 22, 'rahim@gmail.com', 1],
      [102, 'Karim', 23, 'karim@gmail.com', 2],
      [103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1],
      [104, 'Nabila', 22, 'nabila@gmail.com', 3],
    ],
  },
  {
    step: 7,
    labelEn: '7. WHERE Filter',
    labelBn: '৭. WHERE ফিল্টার',
    titleEn: 'Step 7: Filter CSE Students',
    titleBn: 'ধাপ ৭: শুধু CSE শিক্ষার্থীদের ফিল্টার করা',
    sql: `SELECT * FROM Students WHERE Department_ID = 1;`,
    descEn: 'Returns Rahim (101) and Sumaiya (103).',
    descBn: 'রহিম (১০১) এবং সুমাইয়া (১০৩) এর তথ্য রিটার্ন করে।',
    outputTitleEn: 'Query Result: 2 rows returned (Department_ID = 1)',
    outputTitleBn: 'কুয়েরি আউটপুট: ২টি সারি পাওয়া গেছে (Department_ID = 1)',
    headers: ['Student_ID', 'Name', 'Age', 'Email', 'Department_ID'],
    rows: [
      [101, 'Rahim', 22, 'rahim@gmail.com', 1],
      [103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1],
    ],
  },
  {
    step: 8,
    labelEn: '8. INNER JOIN',
    labelBn: '৮. INNER JOIN',
    titleEn: 'Step 8: Join Students with Department Names',
    titleBn: 'ধাপ ৮: ডিপার্টমেন্টের নাম সহ জয়েন করা',
    sql: `SELECT Students.Name, Departments.Department_Name \nFROM Students \nINNER JOIN Departments \nON Students.Department_ID = Departments.Department_ID;`,
    descEn: 'Generates clean human-readable output replacing department IDs with actual names (CSE, BBA, EEE).',
    descBn: 'ডিপার্টমেন্ট আইডির পরিবর্তে পাঠযোগ্য প্রকৃত নাম (CSE, BBA, EEE) প্রতিস্থাপন করে সুন্দর আউটপুট দেয়।',
    outputTitleEn: 'Joined Result: 4 rows returned',
    outputTitleBn: 'জয়েন আউটপুট: ৪টি সারি পাওয়া গেছে',
    headers: ['Name', 'Department_Name'],
    rows: [
      ['Rahim', 'CSE'],
      ['Karim', 'BBA'],
      ['Sumaiya', 'CSE'],
      ['Nabila', 'EEE'],
    ],
  },
];

export default function Lesson6Part19ProjectWalkthrough() {
  const { language } = useLanguage();
  const [activeProjectStep, setActiveProjectStep] = useState<number>(1);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (sql: string, step: number) => {
    navigator.clipboard.writeText(sql);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 1800);
  };

  const currentStepObj = WALKTHROUGH_STEPS.find(s => s.step === activeProjectStep) || WALKTHROUGH_STEPS[0];

  return (
    <>
{/* ========================================================
          PART 11: COMPLETE SQL PRACTICE PROJECT WALKTHROUGH
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১১ • রিয়েল-লাইফ প্রজেক্ট' : 'Part 11 of 13'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Complete SQL Practice Project: University System"
                bn="পূর্ণাঙ্গ এসকিউএল অনুশীলন প্রকল্প: বিশ্ববিদ্যালয় সিস্টেম"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Walk through the complete lifecycle of a relational database step-by-step, with live execution results below each query:"
          bn="একটি রিলেশনাল ডেটাবেসের সম্পূর্ণ লাইফসাইকেল ধাপে ধাপে অনুশীলন করুন এবং প্রতিটি কোয়েরির নিচে এর বাস্তব আউটপুট দেখুন:"
        />

        {/* Step Buttons */}
        <div className="flex flex-wrap gap-2">
          {WALKTHROUGH_STEPS.map(({ step, labelEn, labelBn }) => (
            <button
              key={step}
              onClick={() => setActiveProjectStep(step)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                activeProjectStep === step
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {language === 'bn' ? labelBn : labelEn}
            </button>
          ))}
        </div>

        {/* Step Content & Execution Result */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300">
              <DualText en={currentStepObj.titleEn} bn={currentStepObj.titleBn} />
            </span>
            <button
              onClick={() => handleCopy(currentStepObj.sql, currentStepObj.step)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copiedStep === currentStepObj.step ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedStep === currentStepObj.step ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'SQL কপি' : 'Copy SQL')}</span>
            </button>
          </div>

          <pre className="p-3 bg-black/60 rounded-lg border border-slate-800/80 text-xs font-mono text-emerald-400 overflow-x-auto">
            {currentStepObj.sql}
          </pre>

          <DualText
            as="p"
            className="text-xs text-zinc-400"
            en={currentStepObj.descEn}
            bn={currentStepObj.descBn}
          />

          {/* Visual Output / Result Table */}
          <div className="rounded-xl bg-[#0a0d1a] border border-emerald-500/20 overflow-hidden">
            <div className="px-3.5 py-2 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center gap-2 text-[11px] font-mono text-emerald-300 font-semibold">
              {currentStepObj.statusMsg ? (
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Table2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <DualText en={currentStepObj.outputTitleEn} bn={currentStepObj.outputTitleBn} />
            </div>

            {currentStepObj.statusMsg && (
              <div className="px-4 py-3 flex items-center gap-2 text-xs font-mono text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{currentStepObj.statusMsg}</span>
              </div>
            )}

            {currentStepObj.headers && currentStepObj.rows && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800 text-cyan-300">
                      {currentStepObj.headers.map((header) => (
                        <th key={header} className="px-3.5 py-2 font-semibold whitespace-nowrap">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {currentStepObj.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3.5 py-2 text-zinc-200 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
