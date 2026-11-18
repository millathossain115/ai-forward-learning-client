'use client';

import React from 'react';
import { TopicId } from '@/components/Sidebar';
import Lesson3Hero from './lessons/lesson3/Lesson3Hero';
import Lesson3Part1Relation from './lessons/lesson3/Lesson3Part1Relation';
import Lesson3Part2TuplesAttrs from './lessons/lesson3/Lesson3Part2TuplesAttrs';
import Lesson3Part3Domain from './lessons/lesson3/Lesson3Part3Domain';
import Lesson3Part4SchemaInstance from './lessons/lesson3/Lesson3Part4SchemaInstance';
import Lesson3Part5DegreeCard from './lessons/lesson3/Lesson3Part5DegreeCard';
import Lesson3Part6NullConcept from './lessons/lesson3/Lesson3Part6NullConcept';
import Lesson3Part7Properties from './lessons/lesson3/Lesson3Part7Properties';
import Lesson3Part8SummaryExam from './lessons/lesson3/Lesson3Part8SummaryExam';

interface DatabaseLesson3TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson3Topic({ onNavigate }: DatabaseLesson3TopicProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner with Language Toggle */}
      <Lesson3Hero onNavigate={onNavigate} />

      {/* Part 1 & 2: What is a Relational Database & a Relation? */}
      <Lesson3Part1Relation />

      {/* Part 3 & 4: Tuples (Rows) & Attributes (Columns) */}
      <Lesson3Part2TuplesAttrs />

      {/* Part 5: What is a Domain? Interactive Validator */}
      <Lesson3Part3Domain />

      {/* Part 6 & 7: Relational Schema vs Relational Instance */}
      <Lesson3Part4SchemaInstance />

      {/* Part 8 & 9: Degree vs Cardinality */}
      <Lesson3Part5DegreeCard />

      {/* Part 10: What is NULL in a Database? */}
      <Lesson3Part6NullConcept />

      {/* Part 11: 7 Fundamental Properties of a Relational Table */}
      <Lesson3Part7Properties />

      {/* Part 12 & 13: Master Summary & University Exam Preparation */}
      <Lesson3Part8SummaryExam onNavigate={onNavigate} />
    </div>
  );
}
