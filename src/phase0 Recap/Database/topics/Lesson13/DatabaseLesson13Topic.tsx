'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson13Hero from './components/Lesson13Hero';
import Lesson13Part1NoSqlVsSql from './components/Lesson13Part1NoSqlVsSql';
import Lesson13Part2FourTypes from './components/Lesson13Part2FourTypes';
import Lesson13Part3MongoCrud from './components/Lesson13Part3MongoCrud';
import Lesson13Part4ShardingCap from './components/Lesson13Part4ShardingCap';
import Lesson13Part5ModernProsCons from './components/Lesson13Part5ModernProsCons';
import Lesson13Part6Homework from './components/Lesson13Part6Homework';
import Lesson13Part7InterviewNav from './components/Lesson13Part7InterviewNav';

interface DatabaseLesson13TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson13Topic({ onNavigate }: DatabaseLesson13TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson13Hero />
      <Lesson13Part1NoSqlVsSql />
      <Lesson13Part2FourTypes />
      <Lesson13Part3MongoCrud />
      <Lesson13Part4ShardingCap />
      <Lesson13Part5ModernProsCons />
      <Lesson13Part6Homework />
      <Lesson13Part7InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
