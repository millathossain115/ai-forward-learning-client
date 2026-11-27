'use client';

import React from 'react';
import { BookOpen, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';

interface Lesson1HeroProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson1Hero({ onNavigate }: Lesson1HeroProps) {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-[#202744] p-6 md:p-8">

      {/* Top Banner Actions: Lesson Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'bn'
              ? 'লেসন ১ • একদম শূন্য থেকে শুরু'
              : language === 'en'
              ? 'Lesson 1 • Beginner Level'
              : 'Lesson 1 • শুরু থেকে শুরু (Beginner)'}
          </span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            {language === 'bn'
              ? 'DBMS ফাউন্ডেশন'
              : language === 'en'
              ? 'Start from absolute zero'
              : 'Start from absolute zero'}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {language === 'en' && 'Lesson 1: Understanding Data, Information, Database, and DBMS'}
            {language === 'bn' && 'লেসন ১: ডেটা, ইনফরমেশন, ডেটাবেস এবং DBMS পরিচিতি'}
            {language === 'dual' && (
              <span className="flex flex-col gap-1">
                <span>Lesson 1: Understanding Data, Information, Database, and DBMS</span>
                <span className="text-lg md:text-xl font-bold text-indigo-300">
                  (লেসন ১: ডেটা, ইনফরমেশন, ডেটাবেস ও DBMS-এর মৌলিক ধারণা)
                </span>
              </span>
            )}
          </h1>

          <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
            {(language === 'en' || language === 'dual') && (
              <p>
                Welcome to your first lesson! Imagine you have never heard the word &ldquo;database&rdquo; before.
                By the end of this lesson, you will master four fundamental concepts:{' '}
                <strong>Data</strong>, <strong>Information</strong>, <strong>Database</strong>, and <strong>DBMS</strong> through real-world everyday analogies.
              </p>
            )}
            {(language === 'bn' || language === 'dual') && (
              <p className={language === 'dual' ? 'text-xs text-indigo-300/90 border-l-2 border-indigo-500/40 pl-3 py-0.5' : ''}>
                প্রথম পাঠে স্বাগতম! ধরুন আপনি এর আগে &ldquo;Database&rdquo; শব্দটি কখনো শোনেননি। এই পাঠ শেষ করার মাধ্যমে আপনি ৪টি মূল স্তম্ভ—
                <strong>ডেটা (Data)</strong>, <strong>ইনফরমেশন (Information)</strong>, <strong>ডেটাবেস (Database)</strong> এবং <strong>DBMS</strong>—দৈনন্দিন জীবনের সহজ উদাহরণের মাধ্যমে গভীরভাবে আয়ত্ত করতে পারবেন।
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
          <button
            onClick={() => onNavigate?.('db-lesson2')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>
              {language === 'bn' ? 'পরবর্তী লেসন: লেসন ২ (ডেটাবেস মডেল)' : 'Next Lesson: Lesson 2 (Database Models)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate?.('db-directory')}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/[0.12]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'ডেটাবেস ১০১ বেসিক্স' : 'Back to Database 101 Basics'}</span>
          </button>
        </div>
      </div>

      {/* 4 Pillars Quick Preview */}
      <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            title: '1. Data',
            titleBn: '১. ডেটা (Data)',
            desc: 'Raw facts, numbers, observations without context',
            descBn: 'অসংগঠিত কাঁচা তথ্য বা উপাত্ত যার নির্দিষ্ট অর্থ নেই',
          },
          {
            title: '2. Information',
            titleBn: '২. ইনফরমেশন (Information)',
            desc: 'Processed, organized data with clear meaning',
            descBn: 'প্রক্রিয়াজাত ও অর্থপূর্ণ উপাত্ত যা সিদ্ধান্ত নিতে সাহায্য করে',
          },
          {
            title: '3. Database',
            titleBn: '৩. ডেটাবেস (Database)',
            desc: 'An organized repository of related tables',
            descBn: 'পরস্পর সম্পর্কিত একাধিক টেবিলের সুসংগঠিত ভাণ্ডার',
          },
          {
            title: '4. DBMS',
            titleBn: '৪. ডিবিএমএস (DBMS)',
            desc: 'The software engine managing the database',
            descBn: 'ডেটাবেস তৈরি, নিয়ন্ত্রণ ও সুরক্ষার সফটওয়্যার ইঞ্জিন',
          },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-[#101116] border border-white/[0.08] space-y-1">
            <span className="text-xs font-mono font-bold text-indigo-400">
              {language === 'bn' ? item.titleBn : language === 'en' ? item.title : `${item.title} • ${item.titleBn.split('.')[1]}`}
            </span>
            <p className="text-[11px] text-zinc-400 leading-snug">
              {language === 'bn' ? item.descBn : item.desc}
            </p>
            {language === 'dual' && (
              <p className="text-[10px] text-indigo-300/80 leading-snug">
                {item.descBn}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
