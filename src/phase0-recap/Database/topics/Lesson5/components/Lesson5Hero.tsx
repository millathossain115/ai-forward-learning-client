'use client';

import React from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Workflow } from 'lucide-react';
import { TopicId } from '@/components/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson5HeroProps {
  onNavigate?: (id: TopicId) => void;
}

export default function Lesson5Hero({ onNavigate }: Lesson5HeroProps) {
  const { language } = useLanguage();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#15171e] border border-[#202744] p-5 md:p-6">

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Badge, Title & Short Intro */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              {language === 'bn'
                ? 'লেসন ৫ • কনসেপচুয়াল ডেটাবেস ডিজাইন'
                : 'Lesson 5 • Conceptual Database Design'}
            </span>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
              {language === 'bn' ? 'মৌলিক স্তর' : 'Beginner Level'}
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            <DualText
              en="Lesson 5: Entity Relationship (ER) Model"
              bn="লেসন ৫: এনটিটি রিলেশনশিপ (ইআর) মডেল"
            />
          </h1>

          <div className="text-xs text-zinc-300 font-sans leading-relaxed">
            <DualText
              en="Master database architecture before writing SQL code. The ER Model visually maps entities, attributes, and relationships into production-ready schemas."
              bn="এসকিউএল কোড লেখার আগে ডেটাবেসের আর্কিটেকচার ডিজাইন আয়ত্ত করুন। ইআর মডেলের মাধ্যমে এনটিটি, অ্যাট্রিবিউট ও সম্পর্ককে প্রোডাকশন স্কিমায় রূপান্তর করা হয়।"
            />
          </div>
        </div>

        {/* Right Side: Quick Compact Navigation */}
        <div className="flex sm:flex-row md:flex-col items-stretch md:items-end gap-2 shrink-0">
          <button
            onClick={() => onNavigate?.('db-lesson4')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/[0.12]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'লেসন ৪ (Keys)' : 'Lesson 4 (Keys)'}
            </span>
          </button>
          <button
            onClick={() => onNavigate?.('db-lesson6')}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>
              {language === 'bn' ? 'লেসন ৬ (SQL)' : 'Lesson 6 (SQL)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
