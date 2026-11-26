'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson11Hero from './components/Lesson11Hero';
import Lesson11Part1SecurityCia from './components/Lesson11Part1SecurityCia';
import Lesson11Part2AuthRbacGrant from './components/Lesson11Part2AuthRbacGrant';
import Lesson11Part4SqlInjection from './components/Lesson11Part4SqlInjection';
import Lesson11Part5Backups from './components/Lesson11Part5Backups';
import Lesson11Part6RecoveryRpoRto from './components/Lesson11Part6RecoveryRpoRto';
import Lesson11Part7Homework from './components/Lesson11Part7Homework';
import Lesson11Part8InterviewNav from './components/Lesson11Part8InterviewNav';

interface DatabaseLesson11TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson11Topic({ onNavigate }: DatabaseLesson11TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson11Hero />
      <Lesson11Part1SecurityCia />
      <Lesson11Part2AuthRbacGrant />
      <Lesson11Part4SqlInjection />
      <Lesson11Part5Backups />
      <Lesson11Part6RecoveryRpoRto />
      <Lesson11Part7Homework />
      <Lesson11Part8InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
