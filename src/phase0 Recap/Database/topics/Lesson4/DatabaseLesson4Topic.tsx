'use client';

import React from 'react';
import { TopicId } from '@/components/Sidebar';
import Lesson4Hero from './components/Lesson4Hero';
import Lesson4Part1WhyKeys from './components/Lesson4Part1WhyKeys';
import Lesson4Part2KeyTypes from './components/Lesson4Part2KeyTypes';
import Lesson4Part3Comparison from './components/Lesson4Part3Comparison';
import Lesson4Part4SchemaSql from './components/Lesson4Part4SchemaSql';
import Lesson4Part5ExamPrep from './components/Lesson4Part5ExamPrep';
import Lesson4Part6CaseStudy from './components/Lesson4Part6CaseStudy';

interface DatabaseLesson4TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson4Topic({ onNavigate }: DatabaseLesson4TopicProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner with Language Toggle & Recap */}
      <Lesson4Hero onNavigate={onNavigate} />

      {/* Part 1: Why do we need keys? (The Problem of Ambiguity) */}
      <Lesson4Part1WhyKeys />

      {/* Part 2: The 8 Types of Keys in DBMS (Interactive PK & FK Testers) */}
      <Lesson4Part2KeyTypes />

      {/* Part 3: Master Key Comparison & Hierarchy */}
      <Lesson4Part3Comparison />

      {/* Part 4 & 5: Practical University Schema & SQL DDL Code */}
      <Lesson4Part4SchemaSql />

      {/* Part 6: University Exam Preparation (Q&A Accordion) */}
      <Lesson4Part5ExamPrep />

      {/* Part 8: Practical Case Study (EMPLOYEE Analysis) & Roadmap Bridge */}
      <Lesson4Part6CaseStudy onNavigate={onNavigate} />
    </div>
  );
}
