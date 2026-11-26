'use client';

import React from 'react';
import { TopicId } from '@/config/navigation';
import Lesson16Hero from './components/Lesson16Hero';
import Lesson16Part1DdbmsCompare from './components/Lesson16Part1DdbmsCompare';
import Lesson16Part2ArchTransparency from './components/Lesson16Part2ArchTransparency';
import Lesson16Part3FragReplication from './components/Lesson16Part3FragReplication';
import Lesson16Part4TwoPcCapCloud from './components/Lesson16Part4TwoPcCapCloud';
import Lesson16Part5Homework from './components/Lesson16Part5Homework';
import Lesson16Part6InterviewNav from './components/Lesson16Part6InterviewNav';

interface DatabaseLesson16TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson16Topic({ onNavigate }: DatabaseLesson16TopicProps) {
  return (
    <div className="w-full space-y-10 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      <Lesson16Hero />
      <Lesson16Part1DdbmsCompare />
      <Lesson16Part2ArchTransparency />
      <Lesson16Part3FragReplication />
      <Lesson16Part4TwoPcCapCloud />
      <Lesson16Part5Homework />
      <Lesson16Part6InterviewNav onNavigate={onNavigate} />
    </div>
  );
}
