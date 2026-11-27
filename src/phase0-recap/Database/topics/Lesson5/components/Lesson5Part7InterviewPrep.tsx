'use client';

import React, { useState } from 'react';
import { 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Database, 
  KeyRound, 
  Code2,
  Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface InterviewQuestion {
  id: number;
  tagEn: string;
  tagBn: string;
  difficultyEn: string;
  difficultyBn: string;
  qEn: string;
  qBn: string;
  summaryEn: string;
  summaryBn: string;
  bulletsEn: string[];
  bulletsBn: string[];
  codeSnippet?: {
    lang: string;
    code: string;
    captionEn: string;
    captionBn: string;
  };
}

export default function Lesson5Part7InterviewPrep() {
  const { language } = useLanguage();

  // Accordion state - all questions collapsed by default
  const [expanded, setExpanded] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleQuestion = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpanded({ 1: true, 2: true, 3: true, 4: true, 5: true });
  };

  const collapseAll = () => {
    setExpanded({ 1: false, 2: false, 3: false, 4: false, 5: false });
  };

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      tagEn: 'System Design & Architecture',
      tagBn: 'সিস্টেম ডিজাইন ও আর্কিটেকচার',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'Why do we design an ER Model before writing SQL tables?',
      qBn: 'সরাসরি এসকিউএল টেবিল তৈরি না করে প্রথমে ইআর মডেল ডিজাইন করা কেন জরুরি?',
      summaryEn: 'The ER Model is a high-level conceptual blueprint. It catches circular dependencies, redundant attributes, and incorrect cardinality early—preventing painful and expensive production migrations later.',
      summaryBn: 'ইআর মডেল হলো ডেটাবেসের কনসেপচুয়াল ব্লুপ্রিন্ট। কোডিংয়ের আগেই এটি অতিরিক্ত রিডান্ড্যান্সি, সাইক্লিক নির্ভরতা এবং ভুল সম্পর্ক শনাক্ত করে—ফলে পরবর্তীতে প্রোডাকশনে স্কিমা মাইগ্রেশনের ঝামেলা এড়ানো যায়।',
      bulletsEn: [
        '3-Stage Pipeline: Conceptual (ER Diagram) → Logical (Normalized Relational Schema) → Physical (SQL DDL & Indexes).',
        'Business Alignment: Non-technical stakeholders and engineers can both review business logic before writing code.',
        'Prevents Anomalies: Guarantees every real-world relationship (1:1, 1:N, M:N) is structurally planned.',
      ],
      bulletsBn: [
        '৩-ধাপের পাইপলাইন: কনসেপচুয়াল (ইআর ডায়াগ্রাম) → লজিক্যাল (রিলেশনাল স্কিমা) → ফিজিক্যাল (SQL কোড ও ইনডেক্সিং)।',
        'ব্যবসায়িক পর্যালোচনা: কোড লেখার আগেই ক্লায়েন্ট ও টিম মেম্বারদের সাথে ডেটার লজিক যাচাই করা যায়।',
        'অসঙ্গতি রোধ: বাস্তব সম্পর্কের সব ধরন (১:১, ১:N, M:N) আগেই সুনির্দিষ্ট নিয়ম মেনে প্ল্যান করা থাকে।',
      ],
    },
    {
      id: 2,
      tagEn: 'Relational Mapping',
      tagBn: 'রিলেশনাল টেবিল ম্যাপিং',
      difficultyEn: 'Very Common',
      difficultyBn: 'সবচেয়ে জনপ্রিয়',
      qEn: 'How is a Many-to-Many (M:N) relationship implemented in a relational database?',
      qBn: 'রিলেশনাল ডেটাবেসে Many-to-Many (M:N) রিলেশনশিপ কীভাবে বাস্তবায়ন করা হয়?',
      summaryEn: 'Relational tables cannot store M:N directly because columns must hold atomic values (1NF). We resolve M:N by introducing an intermediate Junction Table (Associative Table) that pairs Foreign Keys from both entities.',
      summaryBn: 'রিলেশনাল ডেটাবেসে কলামে একাধিক মান রাখা যায় না (1NF নিয়ম)। তাই M:N সম্পর্ক ভাঙতে মাঝখানে একটি জাংশন টেবিল (Junction Table) তৈরি করা হয়, যা উভয় টেবিলের প্রাইমারি কি-কে ফরেন কি হিসেবে ধারণ করে।',
      bulletsEn: [
        'Decomposition: Entity A (1) ── (N) Junction Table (N) ── (1) Entity B.',
        'Primary Key: Usually a Composite PK made of both Foreign Keys: (student_id, course_id).',
        'Descriptive Attributes: Attributes belonging to the relationship (e.g. enrollment_date, grade) live in this junction table.',
      ],
      bulletsBn: [
        'বিভাজন: Entity A (১) ── (N) Junction Table (N) ── (১) Entity B।',
        'প্রাইমারি কি: সাধারণত উভয় ফরেন কি মিলিয়ে গঠিত একটি কম্পোজিট প্রাইমারি কি: (student_id, course_id)।',
        'সম্পর্কের অ্যাট্রিবিউট: সম্পর্কের নিজস্ব বৈশিষ্ট্যগুলো (যেমন: ভর্তির তারিখ, গ্রেড) এই জাংশন টেবিলে সংরক্ষিত হয়।',
      ],
      codeSnippet: {
        lang: 'sql',
        code: `-- M:N resolved via Enrollment Junction Table\nCREATE TABLE enrollment (\n  student_id INT REFERENCES student(student_id),\n  course_id  INT REFERENCES course(course_id),\n  enrolled_on DATE DEFAULT CURRENT_DATE,\n  grade VARCHAR(2),\n  PRIMARY KEY (student_id, course_id)\n);`,
        captionEn: 'Standard SQL Junction Table with Composite Primary Key',
        captionBn: 'কম্পোজিট প্রাইমারি কি সমন্বিত আদর্শ SQL জাংশন টেবিল',
      },
    },
    {
      id: 3,
      tagEn: 'Entity Modeling & Constraints',
      tagBn: 'এনটিটি ও কনস্ট্রেইন্ট',
      difficultyEn: 'Core Architecture',
      difficultyBn: 'আর্কিটেকচার প্রশ্ন',
      qEn: 'When should you use a Weak Entity instead of a Strong Entity?',
      qBn: 'সাধারণ স্ট্রং এনটিটির পরিবর্তে কখন উইক এনটিটি (Weak Entity) ব্যবহার করা উচিত?',
      summaryEn: 'Use a Weak Entity when an entity cannot be uniquely identified by its own attributes and its existence depends entirely on an identifying owner entity (e.g. Employee Dependents or Invoice Line Items).',
      summaryBn: 'যখন কোনো এনটিটির নিজস্ব কোনো স্বতন্ত্র প্রাইমারি কি থাকে না এবং এর অস্তিত্ব পুরোপুরি অন্য একটি ওনার এনটিটির ওপর নির্ভরশীল থাকে (যেমন: কর্মচারীর ডিপেন্ডেন্ট বা ইনভয়েস আইটেম), তখন উইক এনটিটি ব্যবহার করা হয়।',
      bulletsEn: [
        'Partial Key (Discriminator): Weak entities use a partial key (dashed underline) that distinguishes instances only within the same owner.',
        'Composite Identification: In SQL, PK of weak entity = (Owner PK + Partial Key).',
        'Lifecycle Dependency: In SQL, weak entities always require ON DELETE CASCADE so children are deleted when the parent entity is removed.',
      ],
      bulletsBn: [
        'পার্শিয়াল কি (Discriminator): উইক এনটিটিতে ড্যাশড আন্ডারলাইনযুক্ত পার্শিয়াল কি থাকে, যা কেবল একই ওনারের অধীনে অনন্য।',
        'যৌথ আইডেন্টিফিকেশন: SQL-এ উইক এনটিটির প্রাইমারি কি = (ওনারের PK + উইক এনটিটির পার্শিয়াল কি)।',
        'লাইফসাইকেল ডিপেন্ডেন্সি: ওনার ডিলিট হলে উইক রেকর্ড যাতে নিজে থেকেই ডিলিট হয়, সেজন্য SQL-এ ON DELETE CASCADE ব্যবহৃত হয়।',
      ],
      codeSnippet: {
        lang: 'sql',
        code: `CREATE TABLE dependent (\n  emp_id INT REFERENCES employee(emp_id) ON DELETE CASCADE,\n  dep_name VARCHAR(50),\n  relation VARCHAR(30),\n  PRIMARY KEY (emp_id, dep_name) -- Composite PK\n);`,
        captionEn: 'Weak entity table with ON DELETE CASCADE constraint',
        captionBn: 'ON DELETE CASCADE কনস্ট্রেইন্টসহ উইক এনটিটি টেবিল',
      },
    },
    {
      id: 4,
      tagEn: 'Attribute Semantics',
      tagBn: 'অ্যাট্রিবিউট সিম্যান্টিক্স',
      difficultyEn: 'Conceptual',
      difficultyBn: 'কনসেপচুয়াল',
      qEn: 'Can a Relationship have its own attributes? Give a real-world production example.',
      qBn: 'একটি রিলেশনশিপের কি নিজস্ব কোনো অ্যাট্রিবিউট থাকতে পারে? বাস্তব একটি উদাহরণ দিন।',
      summaryEn: 'Yes. When an attribute describes the interaction between two entities rather than either entity alone, it must be placed directly on the relationship (e.g. score in an exam, quantity in an order, or access role in permissions).',
      summaryBn: 'হ্যাঁ। যখন কোনো তথ্য কোনো নির্দিষ্ট এনটিটির একার নয়, বরং দুটি এনটিটির সংযোগের বৈশিষ্ট্য নির্দেশ করে, তখন তা রিলেশনশিপেই যুক্ত করতে হয় (যেমন: পরীক্ষার গ্রেড, অর্ডারের পরিমাণ, বা পারমিশনের রোল)।',
      bulletsEn: [
        'Why not on Student? A student has different grades across different courses; Student table cannot store a single grade.',
        'Why not on Course? A course gives different grades to different students; Course table cannot store a single grade.',
        'Relational Destination: When mapped to SQL, relationship attributes become columns in the junction table.',
      ],
      bulletsBn: [
        'Student-এ কেন নয়? একজন ছাত্র প্রতিটি কোর্সে ভিন্ন গ্রেড পায়; তাই স্টুডেন্ট টেবিলে কেবল একটি গ্রেড রাখা অসম্ভব।',
        'Course-এ কেন নয়? একটি কোর্সে বিভিন্ন ছাত্র বিভিন্ন গ্রেড পায়; তাই কোর্স টেবিলেও একক গ্রেড রাখা যায় না।',
        'SQL রূপান্তর: ডেটাবেসে রূপান্তরের সময় এই অ্যাট্রিবিউটগুলো জাংশন টেবিলের সাধারণ কলামে পরিণত হয়।',
      ],
    },
    {
      id: 5,
      tagEn: 'Integrity & Constraints',
      tagBn: 'ইন্টিগ্রিটি ও কনস্ট্রেইন্ট',
      difficultyEn: 'Senior Level',
      difficultyBn: 'সিনিয়র লেভেল',
      qEn: 'What is the architectural difference between Cardinality Ratio and Participation Constraint?',
      qBn: 'কার্ডিনালিটি রেশিও (Cardinality) এবং পার্টিসিপেশন কনস্ট্রেইন্ট (Participation)-এর মধ্যে মৌলিক পার্থক্য কী?',
      summaryEn: 'Cardinality defines the MAXIMUM number of entity instances that can participate in a relationship (1:1, 1:N, M:N). Participation defines the MINIMUM participation requirement (0 = Optional/Partial, ≥1 = Mandatory/Total).',
      summaryBn: 'কার্ডিনালিটি নির্ধারণ করে সম্পর্কের সর্বোচ্চ (Maximum) কতগুলো সত্তা যুক্ত হতে পারে (১:১, ১:N, M:N)। আর পার্টিসিপেশন নির্ধারণ করে সর্বনিম্ন (Minimum) অংশগ্রহণের শর্ত (০ = ঐচ্ছিক বা পার্শিয়াল, ≥১ = বাধ্যতামূলক বা টোটাল)।',
      bulletsEn: [
        'Cardinality (Max constraint): Governs table structural mapping (e.g. foreign key placement vs junction table creation).',
        'Participation (Min constraint): Governs nullability in SQL. Total participation (double line) maps to NOT NULL foreign key columns.',
        'Orthogonal Concepts: A relationship can be 1:N with Total participation on one side and Partial on the other.',
      ],
      bulletsBn: [
        'কার্ডিনালিটি (সর্বোচ্চ সীমা): টেবিলের স্ট্রাকচার কেমন হবে তা ঠিক করে (কোথায় FK বসবে নাকি আলাদা জাংশন টেবিল লাগবে)।',
        'পার্টিসিপেশন (সর্বনিম্ন সীমা): SQL কলামে NULL বসবে কি না তা ঠিক করে। টোটাল পার্টিসিপেশন (ডাবল লাইন) মানে কলামে NOT NULL বাধ্যতামূলক।',
        'স্বাধীন কনসেপ্ট: একটি সম্পর্ক ১:N হতে পারে, যার একপাশে টোটাল (বাধ্যতামূলক) এবং অন্যপাশে পার্শিয়াল (ঐচ্ছিক) শর্ত থাকতে পারে।',
      ],
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৮ • ইন্টারভিউ প্রস্তুতি' : 'Part 8 • Interview Preparation'}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              <DualText
                en="8. Selective Technical Interview Questions (ER Modeling & System Design)"
                bn="৮. বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (ইআর মডেল ও সিস্টেম ডিজাইন)"
              />
            </h2>
          </div>
        </div>

        {/* Global Expand/Collapse Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'সব প্রসারিত করুন' : 'Expand All'}
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'সব বন্ধ করুন' : 'Collapse All'}
          </button>
        </div>
      </div>

      {/* Intro Subtitle - Crisp and short */}
      <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
        <DualText
          en="Top 5 high-yield database architecture questions frequently asked in backend, full-stack, and system design interviews. Focused on practical mapping trade-offs rather than memorized definitions."
          bn="ব্যাকএন্ড, ফুল-স্ট্যাক ও সিস্টেম ডিজাইন ইন্টারভিউতে বারবার জিজ্ঞেস করা সেরা ৫টি হাই-ইল্ড ডেটাবেস আর্কিটেকচার প্রশ্ন। অপ্রয়োজনীয় মুখস্থ সংজ্ঞার বদলে এখানে বাস্তব টেবিল রূপান্তর ও সিস্টেম ডিজাইনের মূল টেকনিক তুলে ধরা হয়েছে।"
        />
      </div>

      {/* 5 Selective Question Cards */}
      <div className="space-y-4">
        {interviewQuestions.map((q) => {
          const isOpen = !!expanded[q.id];

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-[#121629] border-indigo-500/40  '
                  : 'bg-[#101322] border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header (Clickable Accordion) */}
              <button
                onClick={() => toggleQuestion(q.id)}
                className="w-full text-left p-4 md:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {language === 'bn' ? q.tagBn : q.tagEn}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {language === 'bn' ? q.difficultyBn : q.difficultyEn}
                    </span>
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-white font-sans leading-snug">
                    <span className="text-amber-400 font-mono mr-2">Q{q.id}.</span>
                    {language === 'bn' ? q.qBn : q.qEn}
                  </h3>
                </div>

                <div className="p-1.5 rounded-lg bg-slate-800/80 text-zinc-400 hover:text-white shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-4 pb-5 md:px-5 space-y-4 border-t border-slate-800/60 pt-4">
                  {/* Punchy Core Answer / TL;DR Box */}
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-300 uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{language === 'bn' ? 'সংক্ষিপ্ত উত্তর (TL;DR)' : 'Quick Answer (TL;DR)'}</span>
                    </div>
                    <div className="text-xs md:text-sm text-zinc-200 font-sans leading-relaxed">
                      {language === 'bn' ? q.summaryBn : q.summaryEn}
                    </div>
                  </div>

                  {/* Bullet Points: Key Architectural Takeaways */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-zinc-400 font-bold">
                      {language === 'bn' ? 'ইন্টারভিউতে বলার মতো মূল পয়েন্টসমূহ:' : 'Key Architectural Takeaways:'}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {(language === 'bn' ? q.bulletsBn : q.bulletsEn).map((bullet, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-zinc-300 font-sans"
                        >
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional SQL / Schema Code Snippet */}
                  {q.codeSnippet && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1.5 text-amber-300">
                          <Code2 className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? q.codeSnippet.captionBn : q.codeSnippet.captionEn}</span>
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase">{q.codeSnippet.lang}</span>
                      </div>
                      <pre className="p-3 rounded-xl bg-[#090b14] border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                        <code>{q.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
