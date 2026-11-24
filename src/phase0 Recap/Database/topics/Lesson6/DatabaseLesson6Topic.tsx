'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson6Hero from './components/Lesson6Hero';
import Lesson6Part1WhatIsSql from './components/Lesson6Part1WhatIsSql';
import Lesson6Part2HowSqlWorks from './components/Lesson6Part2HowSqlWorks';
import Lesson6Part3CommandFamilies from './components/Lesson6Part3CommandFamilies';
import Lesson6Part5CreatingDbAndTables from './components/Lesson6Part5CreatingDbAndTables';
import Lesson6Part7ConstraintsSandbox from './components/Lesson6Part7ConstraintsSandbox';
import Lesson6Part8QueryWorkbench from './components/Lesson6Part8QueryWorkbench';
import Lesson6Part13UpdateDelete from './components/Lesson6Part13UpdateDelete';
import Lesson6Part15AggregatesGroupBy from './components/Lesson6Part15AggregatesGroupBy';
import Lesson6Part17JoinsVisualizer from './components/Lesson6Part17JoinsVisualizer';
import Lesson6Part18AlterDropTruncate from './components/Lesson6Part18AlterDropTruncate';
import Lesson6Part19ProjectWalkthrough from './components/Lesson6Part19ProjectWalkthrough';
import Lesson6Part20InterviewPrep from './components/Lesson6Part20InterviewPrep';
import Lesson6Part22HomeworkCaseStudy from './components/Lesson6Part22HomeworkCaseStudy';
import Lesson6BottomNav from './components/Lesson6BottomNav';

interface DatabaseLesson6TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson6Topic({ onNavigate }: DatabaseLesson6TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson6Hero />
      <Lesson6Part1WhatIsSql />
      <Lesson6Part2HowSqlWorks />
      <Lesson6Part3CommandFamilies />
      <Lesson6Part5CreatingDbAndTables />
      <Lesson6Part7ConstraintsSandbox />
      <Lesson6Part8QueryWorkbench />
      <Lesson6Part13UpdateDelete />
      <Lesson6Part15AggregatesGroupBy />
      <Lesson6Part17JoinsVisualizer />
      <Lesson6Part18AlterDropTruncate />
      <Lesson6Part19ProjectWalkthrough />
      <Lesson6Part20InterviewPrep />
      <Lesson6Part22HomeworkCaseStudy />
      <Lesson6BottomNav onNavigate={onNavigate} />
    </div>
  );
}
