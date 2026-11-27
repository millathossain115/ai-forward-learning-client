'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson18Hero from './components/Lesson18Hero';
import Lesson18Part1Roadmap from './components/Lesson18Part1Roadmap';
import Lesson18Part2DesignSynthesis from './components/Lesson18Part2DesignSynthesis';
import Lesson18Part3SystemsSynthesis from './components/Lesson18Part3SystemsSynthesis';
import Lesson18Part4Comparisons from './components/Lesson18Part4Comparisons';
import Lesson18Part5SqlLab from './components/Lesson18Part5SqlLab';
import Lesson18Part6InterviewNav from './components/Lesson18Part6InterviewNav';

interface DatabaseLesson18TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson18Topic({ onNavigate }: DatabaseLesson18TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson18Hero />
      <Lesson18Part1Roadmap onNavigate={onNavigate} />
      <Lesson18Part2DesignSynthesis />
      <Lesson18Part3SystemsSynthesis />
      <Lesson18Part4Comparisons />
      <Lesson18Part5SqlLab />
      <Lesson18Part6InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
