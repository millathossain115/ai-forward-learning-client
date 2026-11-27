'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson12Hero from './components/Lesson12Hero';
import Lesson12Part1DdbmsBasics from './components/Lesson12Part1DdbmsBasics';
import Lesson12Part2ArchTransparency from './components/Lesson12Part2ArchTransparency';
import Lesson12Part3FragReplication from './components/Lesson12Part3FragReplication';
import Lesson12Part4QueryAnd2PC from './components/Lesson12Part4QueryAnd2PC';
import Lesson12Part5CapConsistency from './components/Lesson12Part5CapConsistency';
import Lesson12Part6Homework from './components/Lesson12Part6Homework';
import Lesson12Part7InterviewNav from './components/Lesson12Part7InterviewNav';

interface DatabaseLesson12TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson12Topic({ onNavigate }: DatabaseLesson12TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson12Hero />
      <Lesson12Part1DdbmsBasics />
      <Lesson12Part2ArchTransparency />
      <Lesson12Part3FragReplication />
      <Lesson12Part4QueryAnd2PC />
      <Lesson12Part5CapConsistency />
      <Lesson12Part6Homework />
      <Lesson12Part7InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
