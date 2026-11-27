'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface InterviewQuestion {
  id: number;
  level: 'Core' | 'Mid-Level' | 'Senior';
  qEn: string;
  qBn: string;
  takeawayEn: string;
  takeawayBn: string;
  aEn: string;
  aBn: string;
  codeSnippet?: string;
}

interface Lesson4Part5ExamPrepProps {
  onNavigate?: (id: TopicId) => void;
}

const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    level: 'Core',
    qEn: 'Q1. How do Super Key, Candidate Key, Primary Key, and Alternate Key relate?',
    qBn: 'প্রশ্ন ১: Super Key, Candidate Key, Primary Key ও Alternate Key-এর সম্পর্ক কী?',
    takeawayEn: 'Super Keys = all unique combos; Candidate Keys = minimal Super Keys; Primary Key = 1 elected Candidate Key; Alternate Keys = remaining Candidate Keys.',
    takeawayBn: 'Super Key = সব ইউনিক কম্বিনেশন; Candidate Key = ন্যূনতম Super Key; Primary Key = নির্বাচিত ১টি Candidate Key; Alternate Key = বাকি Candidate Key।',
    aEn: 'Every Candidate Key is a minimal Super Key (removing any column breaks uniqueness). From all Candidate Keys (e.g., Student_ID, NID, Email), the architect picks ONE as the Primary Key (NOT NULL + UNIQUE). Every unchosen Candidate Key becomes an Alternate Key.',
    aBn: 'প্রতিটি Candidate Key হলো একটি ন্যূনতম Super Key (কোনো কলাম বাদ দিলে ইউনিকনেস নষ্ট হয়)। সব Candidate Key-এর মধ্য থেকে ১টি Primary Key হিসেবে বেছে নেওয়া হয়, আর বাকিগুলো Alternate Key হিসেবে থাকে।',
  },
  {
    id: 2,
    level: 'Core',
    qEn: 'Q2. Primary Key vs Unique Key: why can UNIQUE accept multiple NULLs?',
    qBn: 'প্রশ্ন ২: Primary Key বনাম Unique Key — UNIQUE কলামে একাধিক NULL রাখা যায় কেন?',
    takeawayEn: '1 Primary Key per table (no NULLs). Multiple UNIQUE keys allowed (NULLs permitted because NULL != NULL in SQL 3-valued logic).',
    takeawayBn: 'প্রতি টেবিলে ১টি Primary Key (NULL নিষিদ্ধ)। একাধিক UNIQUE Key হতে পারে এবং NULL রাখা যায় (কারণ SQL-এ NULL != NULL)।',
    aEn: 'A Primary Key enforces identity (strictly 1 per table, NOT NULL). A UNIQUE constraint enforces uniqueness on secondary attributes (multiple allowed). Because NULL means "unknown", two NULLs are never considered equal, so SQL allows multiple NULLs in a UNIQUE column.',
    aBn: 'Primary Key রেকর্ডের মূল পরিচয় বহন করে (মাত্র ১টি, NULL নয়)। UNIQUE অন্যান্য কলামের ডুপ্লিকেট ঠেকায়। SQL থ্রি-ভ্যালুড লজিকে NULL মানে অজানা—তাই দুটি NULL সমান গণ্য হয় না এবং একাধিক NULL অনুমোদিত।',
    codeSnippet: `CREATE TABLE STUDENT (
  Student_ID INT PRIMARY KEY,       -- Strictly 1, NOT NULL
  Email      VARCHAR(100) UNIQUE    -- Multiple NULLs allowed
);`,
  },
  {
    id: 3,
    level: 'Senior',
    qEn: 'Q3. Natural Key vs Surrogate Key: why are random UUIDs (v4) bad as Clustered PKs?',
    qBn: 'প্রশ্ন ৩: Natural Key বনাম Surrogate Key — ক্লাস্টার্ড PK হিসেবে র‍্যান্ডম UUID (v4) কেন সমস্যা তৈরি করে?',
    takeawayEn: 'Surrogate keys (INT/BIGINT/UUIDv7) are immutable and sequential. Random UUIDv4 causes B-Tree page splits and bloats secondary indexes.',
    takeawayBn: 'Surrogate Key অপরিবর্তনীয় ও ক্রমিক। র‍্যান্ডম UUIDv4 B-Tree পেজ স্প্লিট ঘটায় এবং সেকেন্ডারি ইনডেক্স ভারী করে।',
    aEn: 'Clustered Primary Keys physically order rows on disk. Random UUIDv4 inserts land in random B+ Tree pages, causing frequent page splits and cache misses. Also, InnoDB stores the PK inside every secondary index—so a 36-byte UUID or long Natural Key bloats RAM, and editing a Natural Key (like NID) triggers heavy CASCADE locks.',
    aBn: 'ক্লাস্টার্ড PK ডিস্কে সারির ক্রম ঠিক করে। র‍্যান্ডম UUIDv4 ইনসার্ট করলে B+ Tree-তে ঘনঘন পেজ স্প্লিট হয়। এছাড়া প্রতিটি সেকেন্ডারি ইনডেক্স PK-কে পয়েন্টার হিসেবে রাখে—তাই বড় স্ট্রিং PK মেমরি অপচয় করে এবং ন্যাচারাল কী বদলালে ভারী CASCADE লক পড়ে।',
  },
  {
    id: 4,
    level: 'Mid-Level',
    qEn: 'Q4. Can a Foreign Key reference a column that is NOT a Primary Key?',
    qBn: 'প্রশ্ন ৪: Foreign Key কি এমন কলামকে রেফারেন্স করতে পারে যা Primary Key নয়?',
    takeawayEn: 'Yes! A Foreign Key can reference any parent column (or tuple) enforced by a PRIMARY KEY or UNIQUE constraint.',
    takeawayBn: 'হ্যাঁ! প্যারেন্ট টেবিলের যেকোনো PRIMARY KEY অথবা UNIQUE কলামকে Foreign Key রেফারেন্স করতে পারে।',
    aEn: 'Under ANSI SQL, the target column in the parent table only needs to guarantee uniqueness—either via PRIMARY KEY or UNIQUE. Referencing an Alternate Key (e.g., REFERENCES CUSTOMER(email)) is valid in PostgreSQL, MySQL, Oracle, and SQL Server.',
    aBn: 'ANSI SQL অনুযায়ী প্যারেন্ট কলামের ইউনিকনেস নিশ্চিত থাকলেই চলে—তা PRIMARY KEY হোক বা UNIQUE কনস্ট্রেইন্ট। তাই Alternate Key রেফারেন্স করা সম্পূর্ণ বৈধ।',
  },
  {
    id: 5,
    level: 'Mid-Level',
    qEn: 'Q5. Junction Table (ENROLLMENT): Composite PK vs Surrogate PK + Composite UNIQUE?',
    qBn: 'প্রশ্ন ৫: জাংশন টেবিলে Composite PK নাকি Surrogate PK + Composite UNIQUE — কোনটি ভালো?',
    takeawayEn: 'Composite PK saves space for pure M:N links; Surrogate PK + Composite UNIQUE works better with ORMs or when child tables reference the junction row.',
    takeawayBn: 'সহজ M:N লিংকে Composite PK মেমরি বাঁচায়; তবে ORM বা চাইল্ড টেবিল থাকলে Surrogate PK + Composite UNIQUE ভালো।',
    aEn: 'PRIMARY KEY (student_id, course_id) is compact and blocks duplicate enrollments naturally. Add a Surrogate id PK + UNIQUE(student_id, course_id) when using ORMs expecting single-column IDs or when child tables (like Attendance) reference an enrollment_id.',
    aBn: 'PRIMARY KEY (student_id, course_id) অতিরিক্ত কলাম ছাড়াই ডুপ্লিকেট ঠেকায়। কিন্তু ORM বা সাব-টেবিল থাকলে id PRIMARY KEY ও UNIQUE (student_id, course_id) ব্যবহার করা সহজ।',
  },
  {
    id: 6,
    level: 'Mid-Level',
    qEn: 'Q6. What is an Orphan Record, and how do RESTRICT, CASCADE, and SET NULL prevent it?',
    qBn: 'প্রশ্ন ৬: Orphan Record কী এবং RESTRICT, CASCADE ও SET NULL কীভাবে এটি ঠেকায়?',
    takeawayEn: 'Orphan = child FK pointing to missing parent. RESTRICT blocks delete, CASCADE deletes children, SET NULL clears child FK (high-scale apps often prefer Soft Delete).',
    takeawayBn: 'Orphan = প্যারেন্টহীন চাইল্ড রেকর্ড। RESTRICT ডিলিট আটকায়, CASCADE চাইল্ডও মুছে দেয়, SET NULL চাইল্ড FK-তে NULL বসায়।',
    aEn: '1) RESTRICT / NO ACTION: rejects parent deletion if children exist.\n2) CASCADE: deletes dependent child rows automatically (risks lock contention on huge tables, where Soft Delete deleted_at is safer).\n3) SET NULL: sets child FK to NULL when parent is deleted.',
    aBn: '১) RESTRICT: চাইল্ড থাকলে প্যারেন্ট ডিলিট করতে দেয় না।\n২) CASCADE: প্যারেন্টের সাথে চাইল্ডও মুছে দেয় (বড় সিস্টেমে লক এড়াতে Soft Delete বেশি ব্যবহৃত হয়)।\n৩) SET NULL: প্যারেন্ট মুছলে চাইল্ডের ফরেন কি NULL হয়ে যায়।',
  },
];

export default function Lesson4Part5ExamPrep({ onNavigate }: Lesson4Part5ExamPrepProps) {
  const { language } = useLanguage();
  // All selective interview questions closed by default
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পর্ব ৬ / ৬ • বাছাইকৃত ইন্টারভিউ প্রশ্নোত্তর' : 'Part 6 of 6 • Selective Interview Q&A'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Technical Interview Preparation: High-Yield DBMS Keys Questions"
                bn="টেকনিক্যাল ইন্টারভিউ প্রস্তুতি: বাছাইকৃত DBMS Keys প্রশ্নোত্তর"
              />
            </h2>
          </div>
        </div>
      </div>

      <DualText
        as="p"
        className="text-xs text-zinc-400 font-sans leading-relaxed"
        en="Click any question below to inspect the concise takeaway, detailed explanation, and SQL pattern:"
        bn="সংক্ষিপ্ত মূল পয়েন্ট, বিস্তারিত ব্যাখ্যা ও SQL উদাহরণ দেখতে নিচের যেকোনো প্রশ্নে ক্লিক করুন:"
      />

      <div className="space-y-2.5">
        {INTERVIEW_QUESTIONS.map((item) => {
          const isExpanded = !!expandedQuestions[item.id];
          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-colors ${
                isExpanded
                  ? 'border-amber-500/40 bg-[#121528]  shadow-black/40'
                  : 'border-slate-800/80 bg-[#0e1122] hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                      item.level === 'Senior'
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : item.level === 'Mid-Level'
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.level}
                  </span>
                  <h3 className="text-xs md:text-sm font-bold text-white font-sans leading-snug">
                    {language === 'bn' ? item.qBn : item.qEn}
                  </h3>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 space-y-3 border-t border-slate-800/60 bg-black/30">
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs font-sans flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {language === 'bn' ? item.takeawayBn : item.takeawayEn}
                    </p>
                  </div>

                  <div className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-line">
                    {language === 'bn' ? item.aBn : item.aEn}
                  </div>

                  {item.codeSnippet && (
                    <pre className="p-3 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-[11px] overflow-x-auto text-emerald-300 leading-relaxed">
                      {item.codeSnippet}
                    </pre>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Roadmap Bridge Navigation */}
      <div className="p-6 rounded-2xl bg-[#15171e] border border-indigo-500/40 space-y-3 mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-indigo-400 font-bold">
            {language === 'bn' ? 'লেসন ৪ সম্পন্ন' : 'Lesson 4 Completed'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            {language === 'bn' ? '✓ রিলেশনাল কি ও ইন্টিগ্রিটি করায়ত্ত' : '✓ Keys & Integrity Mastered'}
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            as="span"
            en="What's Next: ER Model & Diagrams"
            bn="পরবর্তী ধাপ: এন্টিটি-রিলেশনশিপ (ER) মডেল ও ডায়াগ্রাম"
          />
        </h3>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Now that you have mastered Relational Keys and Referential Integrity, you are ready for Lesson 5: Entity-Relationship (ER) modeling and real-world database design!"
          bn="রিলেশনাল কি ও রেফারেন্সিয়াল ইন্টিগ্রিটি আয়ত্ত করার পর আপনি প্রস্তুত পরবর্তী ধাপের জন্য: লেসন ৫ (ER মডেল ও বাস্তব ডেটাবেস ডিজাইন)!"
        />

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('db-lesson3')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লেসন ৩-এ ফিরে যান' : 'Back to Lesson 3'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('db-lesson5')}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'লেসন ৫-এ যান: ER Model' : 'Go to Lesson 5: ER Model'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
