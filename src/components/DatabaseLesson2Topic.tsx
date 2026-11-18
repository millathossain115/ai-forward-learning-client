'use client';

import React from 'react';
import { TopicId } from '@/components/Sidebar';
import Lesson2Hero from './lessons/lesson2/Lesson2Hero';
import Lesson2Part1WhyTypes from './lessons/lesson2/Lesson2Part1WhyTypes';
import Lesson2Part2ModelConcept from './lessons/lesson2/Lesson2Part2ModelConcept';
import Lesson2Part3SixModels from './lessons/lesson2/Lesson2Part3SixModels';
import Lesson2Part4Comparison from './lessons/lesson2/Lesson2Part4Comparison';
import Lesson2Part5ExamQuestions from './lessons/lesson2/Lesson2Part5ExamQuestions';

interface DatabaseLesson2TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson2Topic({ onNavigate }: DatabaseLesson2TopicProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* Hero Banner & Language Switcher & Lesson 1 Recap */}
      <Lesson2Hero onNavigate={onNavigate} />

      {/* Part 1: Why do we have different types of databases? */}
      <Lesson2Part1WhyTypes />

      {/* Part 2: What is a Database Model? (Blueprint Analogy) */}
      <Lesson2Part2ModelConcept />

      {/* Part 3: The 6 Core Database Models */}
      <Lesson2Part3SixModels />

      {/* Part 4: Comparing All 6 Models */}
      <Lesson2Part4Comparison />

      {/* Part 5: Important Exam & Interview Questions + Next Lesson Bridge */}
      <Lesson2Part5ExamQuestions onNavigate={onNavigate} />
    </div>
  );
}
