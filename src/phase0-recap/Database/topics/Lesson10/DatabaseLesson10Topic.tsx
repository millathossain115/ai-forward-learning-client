'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson10Hero from './components/Lesson10Hero';
import Lesson10Part1IndexBasicsSql from './components/Lesson10Part1IndexBasicsSql';
import Lesson10Part3ClusteredDenseSparse from './components/Lesson10Part3ClusteredDenseSparse';
import Lesson10Part4TreesAndHash from './components/Lesson10Part4TreesAndHash';
import Lesson10Part5ExplainAndRules from './components/Lesson10Part5ExplainAndRules';
import Lesson10Part6Homework from './components/Lesson10Part6Homework';
import Lesson10Part7InterviewNav from './components/Lesson10Part7InterviewNav';

interface DatabaseLesson10TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson10Topic({ onNavigate }: DatabaseLesson10TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson10Hero />
      <Lesson10Part1IndexBasicsSql />
      <Lesson10Part3ClusteredDenseSparse />
      <Lesson10Part4TreesAndHash />
      <Lesson10Part5ExplainAndRules />
      <Lesson10Part6Homework />
      <Lesson10Part7InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
