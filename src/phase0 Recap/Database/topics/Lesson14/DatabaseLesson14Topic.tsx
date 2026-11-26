'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson14Hero from './components/Lesson14Hero';
import Lesson14Part1SecurityCia from './components/Lesson14Part1SecurityCia';
import Lesson14Part2AuthModels from './components/Lesson14Part2AuthModels';
import Lesson14Part3GrantPolp from './components/Lesson14Part3GrantPolp';
import Lesson14Part4SqlInjection from './components/Lesson14Part4SqlInjection';
import Lesson14Part5EncryptionAudit from './components/Lesson14Part5EncryptionAudit';
import Lesson14Part6Homework from './components/Lesson14Part6Homework';
import Lesson14Part7InterviewNav from './components/Lesson14Part7InterviewNav';

interface DatabaseLesson14TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson14Topic({ onNavigate }: DatabaseLesson14TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson14Hero />
      <Lesson14Part1SecurityCia />
      <Lesson14Part2AuthModels />
      <Lesson14Part3GrantPolp />
      <Lesson14Part4SqlInjection />
      <Lesson14Part5EncryptionAudit />
      <Lesson14Part6Homework />
      <Lesson14Part7InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
