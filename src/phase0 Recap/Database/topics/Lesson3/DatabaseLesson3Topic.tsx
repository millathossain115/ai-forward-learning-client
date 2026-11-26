'use client';

import React from 'react';
import { TopicId } from '@/components/Sidebar';
import Lesson3Hero from './components/Lesson3Hero';
import Lesson3Part1Relation from './components/Lesson3Part1Relation';
import Lesson3Part2TuplesAttrs from './components/Lesson3Part2TuplesAttrs';
import Lesson3Part3Domain from './components/Lesson3Part3Domain';
import Lesson3Part4SchemaInstance from './components/Lesson3Part4SchemaInstance';
import Lesson3Part5DegreeCard from './components/Lesson3Part5DegreeCard';
import Lesson3Part6NullConcept from './components/Lesson3Part6NullConcept';
import Lesson3Part7Properties from './components/Lesson3Part7Properties';
import Lesson3Part8SummaryExam from './components/Lesson3Part8SummaryExam';

interface DatabaseLesson3TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson3Topic({ onNavigate }: DatabaseLesson3TopicProps) {
  return (
    <div className="w-full space-y-10 py-2 pb-24 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* Header Hero Banner */}
      <Lesson3Hero onNavigate={onNavigate} />

      {/* Part 1: What is a Relational Database & a Relation? */}
      <div id="l3-relation" className="scroll-mt-4"><Lesson3Part1Relation /></div>

      {/* Part 2: Tuples (Rows) & Attributes (Columns) */}
      <div id="l3-tuples-attrs" className="scroll-mt-4"><Lesson3Part2TuplesAttrs /></div>

      {/* Part 3: What is a Domain? Interactive Validator */}
      <div id="l3-domain" className="scroll-mt-4"><Lesson3Part3Domain /></div>

      {/* Part 4: Degree vs Cardinality */}
      <div id="l3-degree-card" className="scroll-mt-4"><Lesson3Part5DegreeCard /></div>

      {/* Part 5: Relational Schema vs Relational Instance */}
      <div id="l3-schema-instance" className="scroll-mt-4"><Lesson3Part4SchemaInstance /></div>

      {/* Part 6: What is NULL in a Database? */}
      <div id="l3-null" className="scroll-mt-4"><Lesson3Part6NullConcept /></div>

      {/* Part 7: 7 Fundamental Properties of a Relational Table */}
      <div id="l3-properties" className="scroll-mt-4"><Lesson3Part7Properties /></div>

      {/* Part 8 & 9: Master Summary & Selective Interview Q&A */}
      <Lesson3Part8SummaryExam onNavigate={onNavigate} />
    </div>
  );
}
