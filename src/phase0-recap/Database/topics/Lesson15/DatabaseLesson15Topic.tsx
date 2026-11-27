'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson15Hero from './components/Lesson15Hero';
import Lesson15Part1DbaRoles from './components/Lesson15Part1DbaRoles';
import Lesson15Part2NocMonitor from './components/Lesson15Part2NocMonitor';
import Lesson15Part3PerfTuning from './components/Lesson15Part3PerfTuning';
import Lesson15Part4HaDrPitr from './components/Lesson15Part4HaDrPitr';
import Lesson15Part5Homework from './components/Lesson15Part5Homework';
import Lesson15Part6InterviewNav from './components/Lesson15Part6InterviewNav';

interface DatabaseLesson15TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson15Topic({ onNavigate }: DatabaseLesson15TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson15Hero />
      <Lesson15Part1DbaRoles />
      <Lesson15Part2NocMonitor />
      <Lesson15Part3PerfTuning />
      <Lesson15Part4HaDrPitr />
      <Lesson15Part5Homework />
      <Lesson15Part6InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
