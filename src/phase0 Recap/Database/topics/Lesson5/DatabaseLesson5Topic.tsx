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
import Lesson5Part5WeakEntity from './components/Lesson5Part5WeakEntity';
import Lesson5Part6SymbolsAndUniversityER from './components/Lesson5Part6SymbolsAndUniversityER';
import Lesson5Part7InterviewPrep from './components/Lesson5Part7InterviewPrep';
import Lesson5BottomNav from './components/Lesson5BottomNav';

interface DatabaseLesson5TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson5Topic({ onNavigate }: DatabaseLesson5TopicProps) {
  return (
    <div className="w-full space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* Hero Banner with Breadcrumbs, Objectives & Symbol Ribbon */}
      <Lesson5Hero onNavigate={onNavigate} />

      {/* Part 1: What is an ER Model? (With University Blueprint Visualizer) */}
      <Lesson5Part1ERModel />

      {/* Core Components & Key Concepts (Entities, Attributes, Relationships, Cardinality, Participation, Design Levels) */}
      <Lesson5CoreConcepts />

      {/* Part 2: What is an Entity? (With Strict Sharp Chen Rectangle Showcase) */}
      <Lesson5Part2Entity />

      {/* Part 3: What are Attributes? & 5 Core Attribute Types */}
      <Lesson5Part2Attributes />

      {/* Part 4 & 5: Relationships & Degree of Relationship */}
      <Lesson5Part3Relationships />

      {/* Part 6 & 7: Cardinality Ratios (1:1, 1:N, M:N) & Participation Constraints */}
      <Lesson5Part4CardinalityParticipation />

      {/* Part 8: Strong Entity and Weak Entity (Employee vs Dependent) */}
      <Lesson5Part5WeakEntity />

      {/* Part 9, 10 & 11: Symbols Cheat Sheet, Complete University ER & Table Mapping */}
      <Lesson5Part6SymbolsAndUniversityER />

      {/* Part 12: Selective Technical Interview Questions (System Design & Relational Mapping) */}
      <Lesson5Part7InterviewPrep />

      {/* Lesson 5 Roadmap Bridge & Navigation */}
      <Lesson5BottomNav onNavigate={onNavigate} />
    </div>
  );
}
