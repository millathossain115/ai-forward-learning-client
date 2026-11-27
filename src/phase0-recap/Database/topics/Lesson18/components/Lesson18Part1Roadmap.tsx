'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface Lesson18Part1RoadmapProps {
  onNavigate?: (id: TopicId) => void;
}

const LESSON_PILLS: { id: TopicId; label: string }[] = [
  { id: 'db-lesson1', label: 'L1: Data & DBMS' },
  { id: 'db-lesson2', label: 'L2: 6 DB Models' },
  { id: 'db-lesson3', label: 'L3: Relational' },
  { id: 'db-lesson4', label: 'L4: Keys' },
  { id: 'db-lesson5', label: 'L5: ER Model' },
  { id: 'db-lesson6', label: 'L6: SQL Core' },
  { id: 'db-lesson7', label: 'L7: Adv SQL' },
  { id: 'db-lesson8', label: 'L8: Normalization' },
  { id: 'db-lesson9', label: 'L9: ACID & 2PL' },
  { id: 'db-lesson10', label: 'L10: Indexing' },
  { id: 'db-lesson11', label: 'L11: Backup & Sec' },
  { id: 'db-lesson12', label: 'L12: DDBMS & CAP' },
  { id: 'db-lesson13', label: 'L13: NoSQL' },
  { id: 'db-lesson14', label: 'L14: Auth & SQLi' },
  { id: 'db-lesson15', label: 'L15: DBA Ops' },
  { id: 'db-lesson16', label: 'L16: 2PC & Cloud' },
  { id: 'db-lesson17', label: 'L17: DW & Mining' },
];

export default function Lesson18Part1Roadmap({ onNavigate }: Lesson18Part1RoadmapProps) {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • সম্পূর্ণ সিলেবাস ম্যাপ' : 'Part 1 of 6 • Syllabus Map'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Complete 17-Lesson Jump Map"
              bn="১. সম্পূর্ণ ১৭টি লেসনের কুইক জাম্প ম্যাপ"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {LESSON_PILLS.map((l) => (
          <button
            key={l.id}
            onClick={() => onNavigate?.(l.id)}
            className="px-3 py-1.5 rounded-xl bg-[#14182d] hover:bg-cyan-600/20 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {l.label}
          </button>
        ))}
      </div>
    </section>
  );
}
