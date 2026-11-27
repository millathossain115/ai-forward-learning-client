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
    <div className="w-full space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner & Recap */}
      <Lesson4Hero onNavigate={onNavigate} />

      {/* Part 1: Why do we need keys? (The Problem of Ambiguity) */}
      <div id="l4-why-keys" className="scroll-mt-4"><Lesson4Part1WhyKeys /></div>

      {/* Part 2: The Types of Keys in DBMS (Interactive PK & FK Testers) */}
      <div id="l4-key-types" className="scroll-mt-4"><Lesson4Part2KeyTypes /></div>

      {/* Part 3: Master Key Comparison & Hierarchy */}
      <Lesson4Part3Comparison />

      {/* Part 4: Practical University Schema & SQL DDL Code */}
      <Lesson4Part4SchemaSql />

      {/* Part 5: Practical Case Study (EMPLOYEE Analysis) */}
      <Lesson4Part6CaseStudy />

      {/* Part 6: Selective Technical Interview Q&A & Roadmap Bridge */}
      <Lesson4Part5ExamPrep onNavigate={onNavigate} />
    </div>
  );
}
