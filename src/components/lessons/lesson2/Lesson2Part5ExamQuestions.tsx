'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson2Part5ExamQuestionsProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson2Part5ExamQuestions({ onNavigate }: Lesson2Part5ExamQuestionsProps) {
  const { language } = useLanguage();

  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const questions = [
    {
      id: 1,
      enQ: 'Q1. What is a database model?',
      bnQ: 'প্রশ্ন ১. ডেটাবেস মডেল কাকে বলে?',
      enA: 'A database model defines the logical structure, organization, storage format, and relationships of data within a database system. It acts as an architectural blueprint before physical tables or collections are created.',
      bnA: 'ডেটাবেস মডেল হলো ডেটাবেসের লজিক্যাল কাঠামো, নকশা ও সংগঠনের রূপরেখা যা নির্ধারণ করে ডেটা কীভাবে জমা থাকবে এবং উপাদানগুলোর মধ্যকার পারস্পরিক সম্পর্ক কী হবে। এটি ভবন নির্মাণের ব্লুপ্রিন্টের মতোই কাজ করে।',
    },
    {
      id: 2,
      enQ: 'Q2. What is the fundamental difference between hierarchical and network database models?',
      bnQ: 'প্রশ্ন ২. হায়ারার্কিক্যাল এবং নেটওয়ার্ক মডেলের মধ্যকার মূল পার্থক্য কী?',
      enA: 'In a hierarchical model, data is structured as a strict tree where each child can have only ONE parent (1:N). In contrast, the network model allows a child record to have MULTIPLE parents (M:N), enabling direct representation of many-to-many relationships without duplicating records.',
      bnA: 'হায়ারার্কিক্যাল মডেলে প্রতিটি চাইল্ডের কেবলমাত্র একটিই প্যারেন্ট থাকতে পারে (1:N বৃক্ষ কাঠামো)। কিন্তু নেটওয়ার্ক মডেলে একটি চাইল্ড রেকর্ডের একাধিক প্যারেন্ট থাকতে পারে (M:N সম্পর্ক), যার ফলে ডেটা ডুপ্লিকেশন ছাড়াই জটিল সম্পর্ক তৈরি করা যায়।',
    },
    {
      id: 3,
      enQ: 'Q3. What is the relational database model?',
      bnQ: 'প্রশ্ন ৩. রিলেশনাল ডেটাবেস মডেল কী এবং কেন এটি এত জনপ্রিয়?',
      enA: 'The relational database model organizes data into two-dimensional tables (called relations) composed of rows (tuples) and columns (attributes). Data across different tables is interconnected through keys (Primary Keys and Foreign Keys), providing strong mathematical integrity and standard SQL querying.',
      bnA: 'রিলেশনাল মডেলে ডেটা দ্বিমাত্রিক টেবিলে সারি (Row/Tuple) ও কলাম (Column/Attribute) আকারে সাজানো থাকে। একাধিক টেবিলের সংযোগ ঘটে প্রাইমারি কি ও ফরেন কি-এর মাধ্যমে। এর সহজ গঠন, গাণিতিক ভিত্তি এবং শক্তিশালী SQL কুয়েরির কারণে এটি বিশ্বজুড়ে সবচেয়ে জনপ্রিয়।',
    },
    {
      id: 4,
      enQ: 'Q4. What is NoSQL and why did it become popular?',
      bnQ: 'প্রশ্ন ৪. NoSQL কী এবং আধুনিক সফটওয়্যারে কেন এটি জনপ্রিয় হলো?',
      enA: 'NoSQL stands for "Not Only SQL". It refers to non-relational database management systems designed for handling flexible polymorphic data structures, high-velocity streaming, and massive horizontal scaling across distributed clouds where rigid table schemas become a bottleneck.',
      bnA: 'NoSQL মানে হলো "Not Only SQL"। এটি অ-রিলেশনাল ডেটাবেস যা বিপুল পরিমাণ অসংগঠিত বা পরিবর্তনশীল ডেটা, তাৎক্ষণিক ক্লাউড স্কেলিং ও অত্যন্ত উচ্চগতির রিড/রাইট অপারেশনের জন্য ডিজাইন করা হয়েছে, যেখানে প্রচলিত রিলেশনাল স্কিমা সীমাবদ্ধ হয়ে পড়ে।',
    },
    {
      id: 5,
      enQ: 'Q5. What are the four major types of NoSQL databases?',
      bnQ: 'প্রশ্ন ৫. NoSQL ডেটাবেসের প্রধান চারটি ধরণ কী কী?',
      enA: '1. Document Databases (e.g. MongoDB, storing flexible JSON-like documents)\n2. Key-Value Databases (e.g. Redis, ultra-fast dictionary pairs in memory)\n3. Column-Family Databases (e.g. Apache Cassandra, distributed sparse columns)\n4. Graph Databases (e.g. Neo4j, storing nodes and interconnected relationship edges)',
      bnA: '১. ডকুমেন্ট ডেটাবেস (যেমন MongoDB - JSON ডকুমেন্ট)\n২. কি-ভ্যালু ডেটাবেস (যেমন Redis - মেমোরিতে অতি দ্রুত জোড়া)\n৩. কলাম-ফ্যামিলি ডেটাবেস (যেমন Apache Cassandra - বিশাল ডিস্ট্রিবিউটেড কলাম)\n৪. গ্রাফ ডেটাবেস (যেমন Neo4j - নোড ও সম্পর্কের নেটওয়ার্ক)',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৫ / ৫' : 'Part 5 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Important Exam & Interview Questions"
              bn="পরীক্ষা ও ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্নোত্তর"
            />
          </h2>
        </div>
      </div>

      <div className="text-xs text-zinc-400 font-sans">
        <DualText
          en="These are the most common questions you will encounter in academic exams and technical interviews. Click each question to reveal the comprehensive model answer:"
          bn="বিশ্ববিদ্যালয় পরীক্ষা এবং চাকরির টেকনিক্যাল ইন্টারভিউতে প্রায়ই এই প্রশ্নগুলো আসে। প্রতিটি প্রশ্নে ক্লিক করে বিস্তারিত আদর্শ উত্তরটি দেখে নিন:"
        />
      </div>

      {/* 5 Questions Accordion */}
      <div className="space-y-3">
        {questions.map((item) => {
          const isExpanded = expandedQuestions[item.id];

          return (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-[#121526] overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <span className="text-xs md:text-sm font-bold text-white font-sans">
                  {language === 'bn' ? item.bnQ : item.enQ}
                  {language === 'dual' && (
                    <span className="block text-xs font-normal text-indigo-300 mt-0.5">
                      {item.bnQ}
                    </span>
                  )}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-slate-800/60 bg-black/30">
                  <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200 whitespace-pre-line">
                    <DualText en={item.enA} bn={item.bnA} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Roadmap Bridge Navigation */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            {language === 'bn' ? 'লেসন ২ সম্পন্ন হয়েছে' : 'Lesson 2 Completed'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
            {language === 'bn' ? '✓ লেসন ৩-এর জন্য প্রস্তুত' : '✓ Ready for Lesson 3'}
          </span>
        </div>

        <h3 className="text-base font-bold text-white">
          <DualText
            en="What's Next: Lesson 3 (Relational Database Model Deep Dive)"
            bn="পরবর্তী ধাপ: লেসন ৩ (রিলেশনাল ডেটাবেস মডেলের বিস্তারিত ও রিলেশনাল বীজগণিত)"
          />
        </h3>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Now that you understand the six database models, you are ready to master the core foundation of modern software: Relational Model, Tables, Primary & Foreign Keys, Tuples, Attributes, and Integrity Constraints."
            bn="এখন যেহেতু আপনি ছয়টি ডেটাবেস মডেলের তুলনামূলক ধারণা পেয়েছেন, পরবর্তী ধাপে আমরা সফটওয়্যার শিল্পের কেন্দ্রবিন্দু রিলেশনাল মডেল, টেবিল, প্রাইমারি ও ফরেন কি এবং ইন্টিগ্রিটি কনস্ট্রেইন্ট নিয়ে বিস্তারিত শিখব।"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson1')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'লেসন ১-এ ফিরে যান' : 'Back to Lesson 1'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson3')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
          >
            <span>{language === 'bn' ? 'লেসন ৩ শুরু করুন (Relational Model)' : 'Go to Lesson 3: Relational Model'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
