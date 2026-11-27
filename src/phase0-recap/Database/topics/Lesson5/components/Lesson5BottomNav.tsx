'use client';

import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson5BottomNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson5BottomNav({ onNavigate }: Lesson5BottomNavProps) {
  const { language } = useLanguage();

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {language === 'bn' ? 'লেসন ৫ সম্পন্ন হয়েছে' : 'Lesson 5 Completed'}
        </span>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
          {language === 'bn' ? '✓ আর্কিটেকচার ব্লুপ্রিন্ট সফলভাবে আয়ত্ত' : '✓ ER Blueprints Mastered'}
        </span>
      </div>

      <h3 className="text-base md:text-xl font-bold text-white font-sans">
        <DualText
          en="What's Next: Lesson 6 • Introduction to SQL (Structured Query Language)"
          bn="পরবর্তী ধাপ: লেসন ৬ • এসকিউএল (SQL) পরিচিতি ও হ্যান্ডস-অন কুয়েরি"
        />
      </h3>

      <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
        <DualText
          en="Now that you've mastered high-level database architecture with the ER Model, you're ready to write actual database commands: creating tables, applying PRIMARY KEY & FOREIGN KEY constraints, inserting real data, and running SELECT queries in SQL!"
          bn="ইআর মডেলের মাধ্যমে ডেটাবেসের আর্কিটেকচারাল ব্লুপ্রিন্ট তৈরির পর, এবার আমরা বাস্তব এসকিউএল কুয়েরি লিখতে শুরু করব: ডেটাবেস ও টেবিল তৈরি, প্রাইমারি ও ফরেন কি কনস্ট্রেইন্ট যোগ করা, রেকর্ড ইনসার্ট করা এবং সিলেক্ট কুয়েরির মাধ্যমে ডেটা রিটার্ন করা!"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => onNavigate?.('backend-lesson4')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'পূর্ববর্তী: লেসন ৪ (Keys)' : 'Back to Lesson 4 (Keys)'}</span>
        </button>
        <button
          onClick={() => onNavigate?.('backend-lesson6')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
        >
          <span>{language === 'bn' ? 'লেসন ৬ শুরু করুন (Intro to SQL)' : 'Start Lesson 6: Intro to SQL'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
