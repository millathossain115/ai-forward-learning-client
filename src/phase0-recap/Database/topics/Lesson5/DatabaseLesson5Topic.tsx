'use client';

import React from 'react';
import { TopicId } from '@/components/Sidebar';
import Lesson5Hero from './components/Lesson5Hero';
import Lesson5Part1ERModel from './components/Lesson5Part1ERModel';
import Lesson5CoreConcepts from './components/Lesson5CoreConcepts';
import Lesson5Part2Entity from './components/Lesson5Part2Entity';
import Lesson5Part2Attributes from './components/Lesson5Part2Attributes';
import Lesson5Part3Relationships from './components/Lesson5Part3Relationships';
import Lesson5Part4CardinalityParticipation from './components/Lesson5Part4CardinalityParticipation';
import Lesson5Part6SymbolsAndUniversityER from './components/Lesson5Part6SymbolsAndUniversityER';
import Lesson5ERPracticeProblems from './components/Lesson5ERPracticeProblems';
import Lesson5Part7InterviewPrep from './components/Lesson5Part7InterviewPrep';
import Lesson5BottomNav from './components/Lesson5BottomNav';

interface DatabaseLesson5TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson5Topic({ onNavigate }: DatabaseLesson5TopicProps) {
  return (
    <div className="w-full space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      <Lesson5Hero onNavigate={onNavigate} />
      <div id="l5-er-model" className="scroll-mt-4"><Lesson5Part1ERModel /></div>
      <div id="l5-core-concepts" className="scroll-mt-4"><Lesson5CoreConcepts /></div>
      <div id="l5-entity" className="scroll-mt-4"><Lesson5Part2Entity /></div>
      <div id="l5-attributes" className="scroll-mt-4"><Lesson5Part2Attributes /></div>
      <div id="l5-relationships" className="scroll-mt-4"><Lesson5Part3Relationships /></div>
      <div id="l5-cardinality" className="scroll-mt-4"><Lesson5Part4CardinalityParticipation /></div>
      <Lesson5Part6SymbolsAndUniversityER />
      <Lesson5ERPracticeProblems />
      <Lesson5Part7InterviewPrep />
      <Lesson5BottomNav onNavigate={onNavigate} />
    </div>
  );
}
