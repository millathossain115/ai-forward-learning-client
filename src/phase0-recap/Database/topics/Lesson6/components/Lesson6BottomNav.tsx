'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Table } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { TopicId } from '@/config/navigation';

interface Lesson6BottomNavProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson6BottomNav({ onNavigate }: Lesson6BottomNavProps) {
  const { language } = useLanguage();


  return (
    <>
{/* ========================================================
          BOTTOM NAVIGATION & ROADMAP BRIDGE
         ======================================================== */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#15171e] border border-cyan-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {language === 'bn' ? 'লেসন ৬ সম্পন্ন হয়েছে' : 'Lesson 6 Completed'}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            {language === 'bn' ? '✓ এসকিউএল মৌলিক দক্ষতা অর্জিত' : '✓ SQL Core Mastered'}
          </span>
        </div>

        <h3 className="text-base md:text-xl font-bold text-white font-sans">
          <DualText
            en="What's Next: Lesson 7 • Advanced SQL Queries (Subqueries, CTEs, Window Functions)"
            bn="পরবর্তী ধাপ: লেসন ৭ • অ্যাডভান্সড এসকিউএল (সাবকুয়েরি, CTE ও উইন্ডো ফাংশন)"
          />
        </h3>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Now that you master SQL fundamentals, take your skills to an advanced level: Single & Multi-row subqueries, correlated inner-outer evaluations, Common Table Expressions (WITH), set operations, and analytical window functions."
            bn="মৌলিক এসকিউএল আয়ত্ত করার পর এবার আমরা অ্যাডভান্সড কুয়েরি দক্ষতা অর্জন করব: সিঙ্গেল ও মাল্টি-রো সাবকুয়েরি, কোরিলেটেড মূল্যায়ন, কমন টেবিল এক্সপ্রেশন (CTE - WITH ক্লজ), সেট অপারেশন এবং অ্যানালিটিক্যাল উইন্ডো ফাংশন।"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson5')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'পূর্ববর্তী: লেসন ৫ (ER Model)' : 'Back to Lesson 5: ER Model'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson7')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'লেসন ৭ শুরু করুন (Advanced SQL)' : 'Go to Lesson 7: Advanced SQL Queries'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
