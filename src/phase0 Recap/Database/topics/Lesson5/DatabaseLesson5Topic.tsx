'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Building2,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Compass,
  FileCode2,
  Workflow,
  Share2,
  Box,
  Diamond,
  Circle,
  ShoppingBag,
  Eye,
  KeyRound,
  Calculator
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseLesson5TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson5Topic({ onNavigate }: DatabaseLesson5TopicProps) {
  // Part 3: Attribute Simulator - Derived Age calculation
  const [birthYear, setBirthYear] = useState<number>(2004);

  // Part 5 & 6: Active Cardinality Ratio Tab
  const [activeCardinality, setActiveCardinality] = useState<'1:1' | '1:N' | 'M:N'>('M:N');

  // Part 7: Participation Mode Toggle
  const [participationMode, setParticipationMode] = useState<'total' | 'partial'>('total');

  // Part 8: Weak Entity Selector
  const [selectedDependentEmployee, setSelectedDependentEmployee] = useState<string>('5001');

  // Part 12: Exam Questions Accordion State
  const [expandedExamQuestions, setExpandedExamQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  const toggleExamQuestion = (id: number) => {
    setExpandedExamQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Part 13: Case Study Solution Reveal State
  const [showCaseStudySolution, setShowCaseStudySolution] = useState(false);

  const calculatedAge = 2026 - birthYear;

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d1020] to-[#070810] border border-[#202744] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Lesson 5 of your DBMS journey • Beginner level
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Conceptual Database Blueprint
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Lesson 5: Entity Relationship (ER) Model
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              Welcome to Lesson 5! In Lesson 4, we mastered Primary Keys and Foreign Keys. Today, we learn how to design a database before writing code.
              The <strong>Entity Relationship (ER) Model</strong> is the architectural blueprint used to conceptualize entities, attributes, relationships, cardinality, and constraints.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate?.('backend-lesson4')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lesson 4 (Keys)</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson6')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <FileCode2 className="w-4 h-4" />
              <span>Next: Lesson 6 (Intro to SQL)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6 Core Concepts Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-cyan-400 block font-bold">Entity</span>
            <span className="text-[10px] text-zinc-400">[Rectangle]</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-amber-400 block font-bold">Attribute</span>
            <span className="text-[10px] text-zinc-400">(Oval / Ellipse)</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-purple-400 block font-bold">Relationship</span>
            <span className="text-[10px] text-zinc-400">&lt;Diamond&gt;</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-emerald-400 block font-bold">Cardinality</span>
            <span className="text-[10px] text-zinc-400">1:1, 1:N, M:N</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-pink-400 block font-bold">Participation</span>
            <span className="text-[10px] text-zinc-400">Total vs Partial</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-indigo-400 block font-bold">Weak Entity</span>
            <span className="text-[10px] text-zinc-400">[[Double Box]]</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1 & 2: WHAT IS AN ER MODEL & ENTITY?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 1 &amp; 2 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is an ER Model &amp; an Entity?</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-300 leading-relaxed font-sans">
            <strong className="text-cyan-200 block text-sm font-mono mb-1">
              University Exam Definition:
            </strong>
            &ldquo;The Entity Relationship (ER) Model is a high-level conceptual data model used to represent the logical structure of a database through entities, attributes, and relationships.&rdquo;
            <br />
            <span className="text-zinc-400 text-[11px] block mt-1">
              Think of it like an architect&apos;s blueprint: An architect draws blueprints before constructing a building; a database engineer draws an ER Diagram before creating SQL tables.
            </span>
          </div>

          {/* Entity vs Entity Type vs Entity Set */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold block">1. Entity</span>
              <h4 className="text-sm font-bold text-white">One Specific Object</h4>
              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                e.g. <strong>Rahim</strong> (Student ID 101, Age 22). A single real-world entity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block">2. Entity Type</span>
              <h4 className="text-sm font-bold text-white">Category / Blueprint</h4>
              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                e.g. <strong>STUDENT</strong>. The general category and schema definition.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
              <span className="text-[10px] text-purple-400 uppercase font-bold block">3. Entity Set</span>
              <h4 className="text-sm font-bold text-white">Collection of Entities</h4>
              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                e.g. <strong>All students</strong> enrolled in the university.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono flex items-center justify-between">
            <span className="text-zinc-400">ER Diagram Representation for Entity:</span>
            <span className="px-3 py-1 rounded-md bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
              [ RECTANGLE ] = Entity
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: ATTRIBUTES & THEIR 5 CORE TYPES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Circle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 3 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Attributes &amp; Their 5 Types (অ্যাট্রিবিউট ও তাদের প্রকারভেদ)</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          An <strong>Attribute</strong> is a property or characteristic of an entity (represented by an <strong>Oval / Ellipse</strong> in an ER Diagram).
          In exams, attributes are classified along several important dimensions:
        </p>

        {/* 5 Attribute Types Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          {/* Simple Attribute */}
          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-white">3.1 Simple Attribute</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-zinc-400 border border-slate-800">
                Single Oval
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-snug">
              Cannot be meaningfully divided into smaller components for the database.
            </p>
            <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-amber-300">
              Examples: <code>Age = 22</code>, <code>Gender = 'M'</code>, <code>Salary = 50000</code>
            </div>
          </div>

          {/* Composite Attribute */}
          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-white">3.2 Composite Attribute</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-cyan-300 border border-slate-800">
                Oval with Sub-Ovals
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-snug">
              Can be divided into smaller meaningful sub-attributes.
            </p>
            <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-0.5">
              <div>Name &rarr; [First_Name, Middle_Name, Last_Name]</div>
              <div>Address &rarr; [House_No, Street, City, Zip_Code]</div>
            </div>
          </div>

          {/* Single-Valued vs Multivalued Attribute */}
          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-white">3.3 &amp; 3.4 Single vs Multivalued</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Double Oval
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-snug">
              <strong>Single-Valued:</strong> Only one value per entity (e.g. <code>Student_ID</code>, <code>DOB</code>).
              <br />
              <strong>Multivalued:</strong> Can hold multiple values (e.g. a student has multiple <code>Phone_Numbers</code> or <code>Skills</code>).
            </p>
            <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 font-mono text-[11px] text-pink-300">
              ER Notation: Multivalued attribute = <strong>Double Oval (দ্বৈত ডিম্বাকৃতি)</strong>
            </div>
          </div>

          {/* Derived Attribute (Interactive Age Calculator) */}
          <div className="p-4 rounded-xl bg-[#121526] border border-emerald-900/40 space-y-2">
            <div className="flex items-center justify-between font-mono">
              <span className="font-bold text-white">3.5 Derived Attribute</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Dashed Oval
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-snug">
              Value is calculated dynamically from another stored attribute rather than stored directly.
            </p>

            {/* Live Interactive Derived Age Simulator */}
            <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-zinc-400 text-[11px]">Stored Attribute (DOB Year):</span>
                <input
                  type="number"
                  min="1950"
                  max="2026"
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value) || 2004)}
                  className="w-20 bg-[#14182a] border border-slate-700 rounded px-2 py-1 text-center text-white text-xs font-bold"
                />
              </div>
              <div className="pt-1 border-t border-slate-800 text-[11px] flex justify-between items-center text-emerald-300 font-bold">
                <span>Derived Attribute (Age in 2026):</span>
                <span className="text-sm px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600">
                  {calculatedAge} years old
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4 & 5: RELATIONSHIPS & DEGREE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 4 &amp; 5 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Relationships &amp; Degree of Relationship</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          A <strong>Relationship</strong> describes how two or more entities are associated with each other. In an ER Diagram, it is represented by a <strong>Diamond (&lt;&gt;)</strong>.
          <br />
          The <strong>Degree of a Relationship</strong> refers to the number of entity types participating in that relationship:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">1. Unary (Recursive)</span>
            <h4 className="text-sm font-bold text-white">Degree = 1</h4>
            <p className="text-[11px] text-zinc-300 font-sans leading-snug">
              A relationship between entities of the <strong>same</strong> entity type.
            </p>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] text-amber-300">
              Employee <em>supervises</em> Employee
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
            <span className="text-[10px] text-cyan-400 uppercase font-bold block">2. Binary (Most Common)</span>
            <h4 className="text-sm font-bold text-white">Degree = 2</h4>
            <p className="text-[11px] text-zinc-300 font-sans leading-snug">
              A relationship between <strong>two</strong> distinct entity types.
            </p>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] text-cyan-300">
              Student <em>enrolls in</em> Course
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
            <span className="text-[10px] text-purple-400 uppercase font-bold block">3. Ternary</span>
            <h4 className="text-sm font-bold text-white">Degree = 3</h4>
            <p className="text-[11px] text-zinc-300 font-sans leading-snug">
              A relationship between <strong>three</strong> entity types simultaneously.
            </p>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] text-purple-300">
              Supplier <em>supplies</em> Product to Project
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6: CARDINALITY RATIO (1:1, 1:N, M:N)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 6 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Cardinality Ratio: 1:1, 1:N, and M:N</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          Cardinality describes <strong>how many</strong> entities of one entity type can be associated with entities of another entity type.
        </p>

        {/* 3 Cardinality Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: '1:1', title: 'One-to-One (1:1)', subtitle: 'Person ↔ Passport' },
            { id: '1:N', title: 'One-to-Many (1:N)', subtitle: 'Department → Employees' },
            { id: 'M:N', title: 'Many-to-Many (M:N)', subtitle: 'Student ↔ Course' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCardinality(tab.id as typeof activeCardinality)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                activeCardinality === tab.id
                  ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold ring-1 ring-emerald-500/40 shadow-md'
                  : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <span className="text-xs block font-mono">{tab.title}</span>
              <span className="text-[10px] text-zinc-400">{tab.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Interactive Cardinality Visualizer */}
        <div className="p-5 rounded-2xl bg-[#14182e] border border-slate-800 space-y-4 font-mono text-xs">
          {activeCardinality === '1:1' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-indigo-300">
                <span className="font-bold">1:1 Relationship (One-to-One)</span>
                <span className="text-[10px]">Strict mutual exclusivity</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-700 w-36">
                  <span className="text-indigo-400 font-bold block">PERSON</span>
                  <span className="text-[11px] text-white">Rahim</span>
                </div>
                <div className="text-zinc-400 text-xs font-bold">&larr; (1:1 HAS) &rarr;</div>
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-700 w-36">
                  <span className="text-emerald-400 font-bold block">PASSPORT</span>
                  <span className="text-[11px] text-white">BP-091283</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                One person can hold at most one passport, and each passport belongs to strictly one person.
              </p>
            </div>
          )}

          {activeCardinality === '1:N' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-amber-300">
                <span className="font-bold">1:N Relationship (One-to-Many)</span>
                <span className="text-[10px]">Hierarchical ownership</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-700 w-44">
                  <span className="text-amber-400 font-bold block">DEPARTMENT (1)</span>
                  <span className="text-[11px] text-white">Computer Science</span>
                </div>
                <div className="text-zinc-400 text-xs font-bold">&rarr; EMPLOYS (1:N) &rarr;</div>
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-700 w-44 space-y-1">
                  <span className="text-cyan-400 font-bold block">EMPLOYEES (N)</span>
                  <div className="text-[11px] text-zinc-300">Dr. Hasan, Prof. Farhana, Sami</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                One department employs multiple professors, but each professor belongs to strictly one department.
              </p>
            </div>
          )}

          {activeCardinality === 'M:N' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-purple-300">
                <span className="font-bold">M:N Relationship (Many-to-Many)</span>
                <span className="text-[10px]">Cross-mesh network</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 p-4 rounded-xl bg-black/40 border border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-700 w-44 space-y-1">
                  <span className="text-purple-400 font-bold block">STUDENTS (M)</span>
                  <div className="text-[11px] text-zinc-300">Rahim, Karim, Nila</div>
                </div>
                <div className="text-zinc-400 text-xs font-bold">&larr; (M:N ENROLLS) &rarr;</div>
                <div className="p-3 rounded-xl bg-pink-950/60 border border-pink-700 w-44 space-y-1">
                  <span className="text-pink-400 font-bold block">COURSES (N)</span>
                  <div className="text-[11px] text-zinc-300">DBMS, Networking, AI</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-300 font-sans leading-snug">
                One student can enroll in multiple courses, and each course can have hundreds of students enrolled!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 7: PARTICIPATION CONSTRAINTS (TOTAL VS PARTIAL)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-bold">
              Part 7 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Participation Constraints: Total vs Partial</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          While cardinality tells us <strong>how many</strong>, participation tells us whether participation is <strong>mandatory or optional</strong>:
        </p>

        {/* Total vs Partial Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 uppercase">1. Total Participation</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                Double Line ════
              </span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              <strong>Mandatory:</strong> Every entity in the entity set <em>must</em> participate in at least one relationship.
            </p>
            <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 text-[11px] text-emerald-300">
              Example: Every Employee <em>must</em> belong to a Department. No employee can exist without a department.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-400 uppercase">2. Partial Participation</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                Single Line ────
              </span>
            </div>
            <p className="text-zinc-300 font-sans leading-relaxed">
              <strong>Optional:</strong> Some entities may participate, while others might not participate at all.
            </p>
            <div className="p-2.5 rounded-lg bg-[#0c0e18] border border-slate-800 text-[11px] text-indigo-300">
              Example: Not every Employee supervises another employee. Supervision is optional for junior staff.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8: STRONG ENTITY AND WEAK ENTITY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 8 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Strong Entity vs Weak Entity (খুব গুরুত্বপূর্ণ পরীক্ষার টপিক)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            A <strong>Strong Entity</strong> can be identified independently through its own Primary Key.
            In contrast, a <strong>Weak Entity</strong> cannot be identified on its own and strictly depends on an owner entity!
          </p>

          {/* Interactive Employee and Dependent Visualizer */}
          <div className="p-5 rounded-2xl bg-[#14182e] border border-slate-800 space-y-4 font-mono text-xs">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-400" />
              Real-World Case: Employee &amp; Family Dependents
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              {/* Strong Entity Box */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border-2 border-indigo-500 text-center space-y-1">
                <span className="text-[10px] font-bold text-indigo-400 block uppercase">[ Single Box ]</span>
                <h4 className="text-sm font-bold text-white">EMPLOYEE (Owner)</h4>
                <div className="text-[11px] text-amber-300 font-bold">PK: Employee_ID (5001)</div>
                <span className="text-[10px] text-zinc-400 block">Strong Entity (Independent)</span>
              </div>

              {/* Identifying Relationship Diamond */}
              <div className="p-3 rounded-xl bg-purple-950/40 border-2 border-purple-500 text-center space-y-1">
                <span className="text-[10px] font-bold text-purple-400 block uppercase">&lt;&lt; Double Diamond &gt;&gt;</span>
                <h4 className="text-xs font-bold text-white">HAS</h4>
                <span className="text-[10px] text-zinc-400 block">Identifying Relationship</span>
              </div>

              {/* Weak Entity Box */}
              <div className="p-4 rounded-xl bg-rose-950/40 border-2 border-rose-500 text-center space-y-1 ring-1 ring-rose-500/40">
                <span className="text-[10px] font-bold text-rose-400 block uppercase">[[ Double Rectangle ]]</span>
                <h4 className="text-sm font-bold text-white">DEPENDENT</h4>
                <div className="text-[11px] text-rose-300 font-bold">Partial Key: Dependent_Name</div>
                <span className="text-[10px] text-zinc-400 block">Weak Entity (Dependent)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 text-[11px] text-zinc-300 font-sans leading-relaxed">
              💡 <strong>Why is DEPENDENT weak?</strong> Two different employees can both have a child named &ldquo;Rahim&rdquo;. Therefore, <code>Dependent_Name</code> alone cannot identify the child. Identification requires: <code>(Employee_ID + Dependent_Name)</code>!
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 9 & 10: COMPLETE UNIVERSITY ER DIAGRAM
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 9 &amp; 10 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Complete Real-World ER Diagram: University Database</h2>
          </div>
        </div>

        {/* Visual ER Diagram Canvas */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0e18] via-[#111424] to-[#0c0e18] border border-slate-700 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              University Conceptual ER Architecture
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Chen Notation</span>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono text-xs">
            {/* Student Entity & Attributes */}
            <div className="p-4 rounded-2xl bg-[#14182d] border border-indigo-900/50 space-y-2">
              <div className="px-3 py-1.5 rounded bg-indigo-600 text-white font-bold text-center">
                [ ENTITY: STUDENT ]
              </div>
              <div className="space-y-1 text-[11px] text-zinc-300 pt-1">
                <div className="text-amber-400 underline font-bold">&bull; <u>Student_ID</u> (Key)</div>
                <div>&bull; Name [First, Last] (Composite)</div>
                <div>&bull; Date_of_Birth</div>
                <div className="text-pink-300 font-bold">&bull; (( Phone_Number )) (Multivalued)</div>
                <div className="text-emerald-400 italic">&bull; - - Age - - (Derived)</div>
              </div>
            </div>

            {/* Relationship Node */}
            <div className="space-y-3 text-center">
              <div className="p-3 rounded-2xl bg-purple-950/40 border-2 border-purple-500 text-purple-300 font-bold">
                &lt; ENROLLS &gt;
                <span className="block text-[10px] text-zinc-400 font-normal mt-0.5">M:N Relationship</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800 text-[10px] text-zinc-300 space-y-0.5">
                <span className="text-amber-400 font-bold block">Relationship Attributes:</span>
                <div>&bull; Enrollment_Date</div>
                <div>&bull; Grade</div>
              </div>
            </div>

            {/* Course & Department Node */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#14182d] border border-cyan-900/50 space-y-2">
                <div className="px-3 py-1.5 rounded bg-cyan-600 text-white font-bold text-center">
                  [ ENTITY: COURSE ]
                </div>
                <div className="space-y-1 text-[11px] text-zinc-300 pt-1">
                  <div className="text-amber-400 underline font-bold">&bull; <u>Course_ID</u> (Key)</div>
                  <div>&bull; Course_Name</div>
                  <div>&bull; Credits</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#101322] border border-slate-800 text-center text-[11px] text-zinc-400">
                Course &larr; (1:N OFFERS) &larr; [ DEPARTMENT ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 11: HOW TO CONVERT ER DIAGRAM INTO TABLES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TableIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 11 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Converting an ER Diagram into Database Tables</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          Notice how the conceptual ER Model seamlessly converts into the relational tables we studied in Lesson 4:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold block">1. STUDENT Table</span>
            <div className="text-[11px] text-zinc-300 space-y-0.5">
              <div>Student_ID <strong className="text-amber-400">[PK]</strong></div>
              <div>First_Name, Last_Name</div>
              <div>Date_of_Birth</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-purple-900/60 space-y-2 ring-1 ring-purple-500/30">
            <span className="text-purple-300 font-bold block">2. ENROLLMENT (Junction)</span>
            <div className="text-[11px] text-zinc-300 space-y-0.5">
              <div>Student_ID <strong className="text-indigo-400">[FK]</strong></div>
              <div>Course_ID <strong className="text-cyan-400">[FK]</strong></div>
              <div>Grade, Date</div>
              <span className="text-[10px] text-pink-400 block pt-1 font-bold">
                Composite PK: (Student_ID, Course_ID)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold block">3. COURSE Table</span>
            <div className="text-[11px] text-zinc-300 space-y-0.5">
              <div>Course_ID <strong className="text-amber-400">[PK]</strong></div>
              <div>Course_Name</div>
              <div>Dept_ID <strong className="text-indigo-400">[FK]</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 12: UNIVERSITY EXAM PREPARATION (Q&A ACCORDION)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 12 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Exam Preparation (Short &amp; Long Q&amp;A)</h2>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 1,
              q: 'Q1. What is an ER Model? (ইআর মডেল কী?)',
              a: 'The Entity Relationship Model is a high-level conceptual data model used to visually represent the structure of a database through entities, attributes, and relationships.',
            },
            {
              id: 2,
              q: 'Q2. What is an entity and an entity set?',
              a: 'An entity is a distinguishable real-world object (e.g. Rahim). An entity set is a collection of similar entities sharing identical attributes (e.g. all Students in a university).',
            },
            {
              id: 3,
              q: 'Q3. What is a multivalued attribute? Give an example.',
              a: 'A multivalued attribute can take multiple values for a single entity instance (e.g. Phone_Numbers or Skills). It is represented by a double oval in an ER diagram.',
            },
            {
              id: 4,
              q: 'Q4. What is a derived attribute? Give an example.',
              a: 'A derived attribute is an attribute whose value is computed dynamically from another attribute (e.g. Age calculated from Date_of_Birth). It is represented by a dashed oval.',
            },
            {
              id: 5,
              q: 'Q5. What is a weak entity? How is it represented?',
              a: 'A weak entity is an entity that does not possess a primary key of its own and depends on an identifying owner entity for unique identification. It is represented by a double rectangle.',
            },
            {
              id: 6,
              q: 'Q6. What is total participation versus partial participation?',
              a: 'Total participation (mandatory, double line) means every entity in the set must participate in the relationship. Partial participation (optional, single line) means only some entities participate.',
            },
            {
              id: 7,
              q: 'Q7. Differentiate between degree of relationship and cardinality ratio.',
              a: 'Degree refers to the number of entity types participating in the relationship (Unary, Binary, Ternary). Cardinality describes how many entities can be associated (1:1, 1:N, M:N).',
            },
            {
              id: 8,
              q: 'Q8. What are composite attributes? Give an example.',
              a: 'Composite attributes can be divided into smaller meaningful sub-parts (e.g. Name divided into First_Name and Last_Name; Address into Street, City, and Zip).',
            },
          ].map((item) => {
            const isExpanded = expandedExamQuestions[item.id];

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-[#121526] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExamQuestion(item.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs md:text-sm font-bold text-white font-sans">
                    {item.q}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-zinc-300 font-sans leading-relaxed border-t border-slate-800/60 bg-black/30">
                    <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-200">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          PART 13: PRACTICE EXERCISE (E-COMMERCE SHOPPING ER)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 13 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Practice Exercise: Online Shopping ER Design</h2>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4 text-xs font-sans">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">System Requirements:</h3>
            <ul className="list-disc list-inside text-zinc-300 space-y-1 text-[11px] leading-relaxed">
              <li>A Customer has Customer_ID, Name, Email, and Phone_Number.</li>
              <li>A Customer can place multiple Orders, but each Order belongs to strictly one Customer.</li>
              <li>Each Order contains multiple Products, and each Product can appear in multiple Orders.</li>
            </ul>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Task: Identify Entities, Attributes, Relationships, and Cardinality.
            </span>
            <button
              onClick={() => setShowCaseStudySolution(!showCaseStudySolution)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-md"
            >
              {showCaseStudySolution ? 'Hide Solution' : 'Show Mentor Solution'}
            </button>
          </div>

          {showCaseStudySolution && (
            <div className="p-4 rounded-xl bg-[#0c0e18] border border-purple-900/60 space-y-3 font-mono text-xs animate-in fade-in duration-200">
              <span className="text-emerald-400 font-bold block">✓ Verified Mentor Solution:</span>
              <div className="space-y-2 text-[11px] text-zinc-300">
                <div>
                  <strong className="text-cyan-300">1. Entities:</strong> CUSTOMER, ORDER, PRODUCT
                </div>
                <div>
                  <strong className="text-amber-300">2. Customer &rarr; Order:</strong> <strong>1:N (PLACES)</strong> &mdash; One customer places many orders; each order belongs to one customer.
                </div>
                <div>
                  <strong className="text-pink-300">3. Order &rarr; Product:</strong> <strong>M:N (CONTAINS)</strong> &mdash; One order has many products; each product is sold in many orders.
                </div>
                <div>
                  <strong className="text-purple-300">4. Relational Tables:</strong> Customers table, Orders table, Products table, and an <code>Order_Items</code> junction table with composite keys <code>(Order_ID, Product_ID)</code>.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Roadmap Bridge Navigation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Lesson 5 Completed
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              ✓ Database Design Blueprints Mastered
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            What&apos;s Next: Lesson 6 â€¢ Introduction to SQL (Structured Query Language)
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Now that you have mastered conceptual design with the <strong>ER Model</strong>, take the next big leap into writing actual queries: DDL, DML, DQL, DCL, TCL, table creation, constraints, joins, and aggregates!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson4')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lesson 4 (Keys)</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson6')}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <span>Go to Lesson 6: Introduction to SQL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
