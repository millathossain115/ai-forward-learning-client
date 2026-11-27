'use client';

import React from 'react';
import { TopicId } from '@/components/Sidebar';
import Lesson1Hero from './components/Lesson1Hero';
import Lesson1Part1Data from './components/Lesson1Part1Data';
import Lesson1Part2Info from './components/Lesson1Part2Info';
import Lesson1Part3Database from './components/Lesson1Part3Database';
import Lesson1Part4DBMS from './components/Lesson1Part4DBMS';
import Lesson1Part5Diff from './components/Lesson1Part5Diff';
import Lesson1Part6Need from './components/Lesson1Part6Need';
import Lesson1Part7Summary from './components/Lesson1Part7Summary';
import Lesson1Part8Review from './components/Lesson1Part8Review';

interface DatabaseLesson1TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson1Topic({ onNavigate }: DatabaseLesson1TopicProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* Hero Banner */}
      <Lesson1Hero onNavigate={onNavigate} />

      {/* Part 1: What is Data? */}
      <div id="l1-data" className="scroll-mt-4"><Lesson1Part1Data /></div>

      {/* Part 2: What is Information? */}
      <div id="l1-info" className="scroll-mt-4"><Lesson1Part2Info /></div>

      {/* Part 3: What is a Database? */}
      <div id="l1-database" className="scroll-mt-4"><Lesson1Part3Database /></div>

      {/* Part 4: What is a DBMS? */}
      <div id="l1-dbms" className="scroll-mt-4"><Lesson1Part4DBMS /></div>

      {/* Part 5: Database vs DBMS Difference */}
      <div id="l1-diff" className="scroll-mt-4"><Lesson1Part5Diff /></div>

      {/* Part 6: Why do we need databases? */}
      <div id="l1-need" className="scroll-mt-4"><Lesson1Part6Need /></div>

      {/* Part 7: Summary Comparison & Mentor Advice */}
      <Lesson1Part7Summary />

      {/* Part 8: Takeaways & Next Lesson 2 Banner */}
      <Lesson1Part8Review onNavigate={onNavigate} />
    </div>
  );
}
