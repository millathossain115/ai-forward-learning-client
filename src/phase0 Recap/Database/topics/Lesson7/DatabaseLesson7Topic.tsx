'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson7Hero from './components/Lesson7Hero';
import Lesson7PracticeSchema from './components/Lesson7PracticeSchema';
import Lesson7Subqueries from './components/Lesson7Subqueries';
import Lesson7CtesAndSetOps from './components/Lesson7CtesAndSetOps';
import Lesson7AdvancedJoinsAndOrder from './components/Lesson7AdvancedJoinsAndOrder';
import Lesson7WindowAndBestPractices from './components/Lesson7WindowAndBestPractices';
import Lesson7InterviewAndNav from './components/Lesson7InterviewAndNav';

interface DatabaseLesson7TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson7Topic({ onNavigate }: DatabaseLesson7TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 font-sans">
      <Lesson7Hero />
      <Lesson7PracticeSchema />
      <Lesson7Subqueries />
      <Lesson7CtesAndSetOps />
      <Lesson7AdvancedJoinsAndOrder />
      <Lesson7WindowAndBestPractices />
      <Lesson7InterviewAndNav onNavigate={onNavigate} />
    </div>
  );
}
