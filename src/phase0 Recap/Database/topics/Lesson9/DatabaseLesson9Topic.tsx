'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson9Hero from './components/Lesson9Hero';
import Lesson9Part1TxAndAcid from './components/Lesson9Part1TxAndAcid';
import Lesson9Part3LifecycleSavepoint from './components/Lesson9Part3LifecycleSavepoint';
import Lesson9Part4ConcurrencySerial from './components/Lesson9Part4ConcurrencySerial';
import Lesson9Part5LockingDeadlockIsoWal from './components/Lesson9Part5LockingDeadlockIsoWal';
import Lesson9Part6Homework from './components/Lesson9Part6Homework';
import Lesson9Part7InterviewNav from './components/Lesson9Part7InterviewNav';

interface DatabaseLesson9TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson9Topic({ onNavigate }: DatabaseLesson9TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson9Hero />
      <Lesson9Part1TxAndAcid />
      <Lesson9Part3LifecycleSavepoint />
      <Lesson9Part4ConcurrencySerial />
      <Lesson9Part5LockingDeadlockIsoWal />
      <Lesson9Part6Homework />
      <Lesson9Part7InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
