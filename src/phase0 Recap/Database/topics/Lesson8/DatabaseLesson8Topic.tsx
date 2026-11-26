'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson8Hero from './components/Lesson8Hero';
import Lesson8Part1WhatIsNorm from './components/Lesson8Part1WhatIsNorm';
import Lesson8Part2Anomalies from './components/Lesson8Part2Anomalies';
import Lesson8Part3FunctionalDep from './components/Lesson8Part3FunctionalDep';
import Lesson8Part4NormalForms from './components/Lesson8Part4NormalForms';
import Lesson8Part5ComparisonSql from './components/Lesson8Part5ComparisonSql';
import Lesson8Part7Homework from './components/Lesson8Part7Homework';
import Lesson8Part8InterviewNav from './components/Lesson8Part8InterviewNav';

interface DatabaseLesson8TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson8Topic({ onNavigate }: DatabaseLesson8TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson8Hero />
      <Lesson8Part1WhatIsNorm />
      <Lesson8Part2Anomalies />
      <Lesson8Part3FunctionalDep />
      <Lesson8Part4NormalForms />
      <Lesson8Part5ComparisonSql />
      <Lesson8Part7Homework />
      <Lesson8Part8InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
