'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson17Hero from './components/Lesson17Hero';
import Lesson17Part1DwAndEtl from './components/Lesson17Part1DwAndEtl';
import Lesson17Part2OltpOlapTypes from './components/Lesson17Part2OltpOlapTypes';
import Lesson17Part3MiningKdd from './components/Lesson17Part3MiningKdd';
import Lesson17Part4Homework from './components/Lesson17Part4Homework';
import Lesson17Part5InterviewNav from './components/Lesson17Part5InterviewNav';

interface DatabaseLesson17TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson17Topic({ onNavigate }: DatabaseLesson17TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson17Hero />
      <Lesson17Part1DwAndEtl />
      <Lesson17Part2OltpOlapTypes />
      <Lesson17Part3MiningKdd />
      <Lesson17Part4Homework />
      <Lesson17Part5InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
