'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson6Hero from './components/Lesson6Hero';
import Lesson6Part1WhatIsSql from './components/Lesson6Part1WhatIsSql';
import Lesson6Part2HowSqlWorks from './components/Lesson6Part2HowSqlWorks';
import Lesson6Part3CommandFamilies from './components/Lesson6Part3CommandFamilies';
import Lesson6Part5CreatingDbAndTables from './components/Lesson6Part5CreatingDbAndTables';
import Lesson6Part7ConstraintsSandbox from './components/Lesson6Part7ConstraintsSandbox';
import Lesson6SelectBasics from './components/Lesson6SelectBasics';
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
      <div id="l6-what-is-sql" className="scroll-mt-4"><Lesson6Part1WhatIsSql /></div>
      <div id="l6-how-sql-works" className="scroll-mt-4"><Lesson6Part2HowSqlWorks /></div>
      <div id="l6-command-families" className="scroll-mt-4"><Lesson6Part3CommandFamilies /></div>
      <div id="l6-create-db-tables" className="scroll-mt-4"><Lesson6Part5CreatingDbAndTables /></div>
      <div id="l6-constraints" className="scroll-mt-4"><Lesson6Part7ConstraintsSandbox /></div>
      <div id="l6-select-basics" className="scroll-mt-4"><Lesson6SelectBasics /></div>
      <div id="l6-update-delete" className="scroll-mt-4"><Lesson6Part13UpdateDelete /></div>
      <div id="l6-aggregates" className="scroll-mt-4"><Lesson6Part15AggregatesGroupBy /></div>
      <div id="l6-joins" className="scroll-mt-4"><Lesson6Part17JoinsVisualizer /></div>
      <div id="l6-alter-drop-truncate" className="scroll-mt-4"><Lesson6Part18AlterDropTruncate /></div>
      <Lesson6Part19ProjectWalkthrough />
      <Lesson6Part22HomeworkCaseStudy />
      <Lesson6Part20InterviewPrep />
      <Lesson6BottomNav onNavigate={onNavigate} />
    </div>
  );
}
