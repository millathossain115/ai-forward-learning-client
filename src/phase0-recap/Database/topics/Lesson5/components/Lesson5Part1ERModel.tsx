'use client';

import React, { useState, useEffect } from 'react';
import { Workflow, Building2, Sparkles, Layers, Eye, CheckCircle2, Compass, PlayCircle, ExternalLink, Maximize2, X, GraduationCap, BookOpen, Code2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part1ERModel() {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<'STUDENT' | 'COURSE' | 'PROFESSOR' | 'DEPARTMENT'>('STUDENT');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const universityEntitiesData = {
    STUDENT: {
      name: 'STUDENT',
      nameBn: 'STUDENT (শিক্ষার্থী সত্তা)',
      color: 'cyan',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      activeTab: 'bg-cyan-600 text-white  ',
      border: 'border-cyan-500/40',
      pk: 'Student_ID',
      pkType: 'INT PRIMARY KEY',
      pkNoteEn: 'Underlined Oval in Chen Notation (Primary Key)',
      pkNoteBn: 'চেন নোটেশনে আন্ডারলাইনযুক্ত ওভাল (প্রাইমারি কি)',
      attributes: [
        { name: 'Student_ID', type: 'Primary Key', isPk: true, descEn: 'Unique student identifier', descBn: 'শিক্ষার্থীর অনন্য শনাক্তকারী' },
        { name: 'Name', type: 'Simple Attribute', isPk: false, descEn: 'Full name of student', descBn: 'শিক্ষার্থীর পূর্ণ নাম' },
        { name: 'Major', type: 'Simple Attribute', isPk: false, descEn: 'Academic program (e.g. CS, EEE)', descBn: 'অধ্যয়নের প্রধান বিষয়' },
        { name: 'Date_of_Birth', type: 'Stored Attribute', isPk: false, descEn: 'Birthdate for age derivation', descBn: 'বয়স নির্ণয়ের সংরক্ষিত তারিখ' },
      ],
      relationships: [
        {
          name: '< ENROLLS >',
          target: 'COURSE',
          cardinality: 'M:N',
          cardinalityLabel: 'Many-to-Many',
          color: 'pink',
          descEn: 'A student can enroll in multiple courses, and each course enrolls multiple students.',
          descBn: 'একজন শিক্ষার্থী একাধিক কোর্সে ভর্তি হতে পারে এবং একটি কোর্সে বহু শিক্ষার্থী অংশ নেয়।',
          relAttribute: 'Grade (Relationship Attribute)',
        },
      ],
      sqlCode: `CREATE TABLE Students (
  Student_ID INT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Major VARCHAR(50),
  Date_of_Birth DATE
);`,
    },
    COURSE: {
      name: 'COURSE',
      nameBn: 'COURSE (কোর্স সত্তা)',
      color: 'emerald',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      activeTab: 'bg-emerald-600 text-white  ',
      border: 'border-emerald-500/40',
      pk: 'Course_ID',
      pkType: 'VARCHAR(10) PRIMARY KEY',
      pkNoteEn: 'Underlined Oval in Chen Notation (Primary Key)',
      pkNoteBn: 'চেন নোটেশনে আন্ডারলাইনযুক্ত ওভাল (প্রাইমারি কি)',
      attributes: [
        { name: 'Course_ID', type: 'Primary Key', isPk: true, descEn: 'Course code (e.g. CSE-101)', descBn: 'কোর্সের অনন্য কোড' },
        { name: 'Title', type: 'Simple Attribute', isPk: false, descEn: 'Course title', descBn: 'কোর্সের শিরোনাম' },
        { name: 'Credits', type: 'Simple (Integer)', isPk: false, descEn: 'Academic credit weight', descBn: 'কোর্সের ক্রেডিট সংখ্যা' },
      ],
      relationships: [
        {
          name: '< ENROLLS >',
          target: 'STUDENT',
          cardinality: 'M:N',
          cardinalityLabel: 'Many-to-Many',
          color: 'pink',
          descEn: 'Connects students to courses; realized via a bridge/enrollment table.',
          descBn: 'শিক্ষার্থীদের কোর্সের সাথে যুক্ত করে (ব্রিজ টেবিল দ্বারা বাস্তবায়িত)।',
          relAttribute: 'Grade',
        },
        {
          name: '< TEACHES >',
          target: 'PROFESSOR',
          cardinality: 'N:1',
          cardinalityLabel: 'Many-to-One (Course perspective)',
          color: 'emerald',
          descEn: 'Each course is taught by one assigned faculty instructor.',
          descBn: 'প্রতিটি কোর্স একজন নির্দিষ্ট অধ্যাপক দ্বারা পরিচালিত হয়।',
          relAttribute: 'None',
        },
      ],
      sqlCode: `CREATE TABLE Courses (
  Course_ID VARCHAR(10) PRIMARY KEY,
  Title VARCHAR(100) NOT NULL,
  Credits INT CHECK (Credits > 0),
  Prof_ID INT REFERENCES Professors(Prof_ID)
);`,
    },
    PROFESSOR: {
      name: 'PROFESSOR',
      nameBn: 'PROFESSOR (অধ্যাপক সত্তা)',
      color: 'purple',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      activeTab: 'bg-purple-600 text-white  ',
      border: 'border-purple-500/40',
      pk: 'Prof_ID',
      pkType: 'INT PRIMARY KEY',
      pkNoteEn: 'Underlined Oval in Chen Notation (Primary Key)',
      pkNoteBn: 'চেন নোটেশনে আন্ডারলাইনযুক্ত ওভাল (প্রাইমারি কি)',
      attributes: [
        { name: 'Prof_ID', type: 'Primary Key', isPk: true, descEn: 'Faculty ID badge', descBn: 'শিক্ষকের অনন্য আইডি' },
        { name: 'Name', type: 'Simple Attribute', isPk: false, descEn: 'Professor full name', descBn: 'অধ্যাপকের নাম' },
        { name: 'Office', type: 'Simple Attribute', isPk: false, descEn: 'Office room number', descBn: 'দপ্তর কক্ষ নম্বর' },
        { name: 'Specialization', type: 'Simple Attribute', isPk: false, descEn: 'Research domain', descBn: 'বিশেষজ্ঞতার বিষয়' },
      ],
      relationships: [
        {
          name: '< TEACHES >',
          target: 'COURSE',
          cardinality: '1:N',
          cardinalityLabel: 'One-to-Many',
          color: 'emerald',
          descEn: 'One professor can teach multiple different courses.',
          descBn: 'একজন অধ্যাপক একাধিক পৃথক কোর্স পাঠদান করতে পারেন।',
          relAttribute: 'None',
        },
        {
          name: '< BELONGS_TO >',
          target: 'DEPARTMENT',
          cardinality: 'N:1',
          cardinalityLabel: 'Many-to-One',
          color: 'amber',
          descEn: 'Many professors belong to a single parent department.',
          descBn: 'একাধিক শিক্ষক একটি মূল একাডেমিক বিভাগের অন্তর্ভুক্ত হন।',
          relAttribute: 'None',
        },
      ],
      sqlCode: `CREATE TABLE Professors (
  Prof_ID INT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Office VARCHAR(30),
  Specialization VARCHAR(50),
  Dept_ID INT REFERENCES Departments(Dept_ID)
);`,
    },
    DEPARTMENT: {
      name: 'DEPARTMENT',
      nameBn: 'DEPARTMENT (বিভাগ সত্তা)',
      color: 'amber',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      activeTab: 'bg-amber-600 text-white  ',
      border: 'border-amber-500/40',
      pk: 'Dept_ID',
      pkType: 'INT PRIMARY KEY',
      pkNoteEn: 'Underlined Oval in Chen Notation (Primary Key)',
      pkNoteBn: 'চেন নোটেশনে আন্ডারলাইনযুক্ত ওভাল (প্রাইমারি কি)',
      attributes: [
        { name: 'Dept_ID', type: 'Primary Key', isPk: true, descEn: 'Department code identifier', descBn: 'বিভাগের অনন্য কোড' },
        { name: 'Dept_Name', type: 'Simple Attribute', isPk: false, descEn: 'Department name (unique)', descBn: 'বিভাগের পূর্ণ নাম' },
        { name: 'Building', type: 'Simple Attribute', isPk: false, descEn: 'Campus building name', descBn: 'ক্যাম্পাস ভবন' },
        { name: 'Budget', type: 'Simple (Numeric)', isPk: false, descEn: 'Annual operating budget', descBn: 'বার্ষিক বাজেট' },
      ],
      relationships: [
        {
          name: '< BELONGS_TO >',
          target: 'PROFESSOR',
          cardinality: '1:N',
          cardinalityLabel: 'One-to-Many (Dept perspective)',
          color: 'amber',
          descEn: 'A department employs and hosts multiple professors.',
          descBn: 'একটি বিভাগে একাধিক অধ্যাপক কর্মরত থাকেন।',
          relAttribute: 'None',
        },
      ],
      sqlCode: `CREATE TABLE Departments (
  Dept_ID INT PRIMARY KEY,
  Dept_Name VARCHAR(100) NOT NULL UNIQUE,
  Building VARCHAR(50),
  Budget DECIMAL(12, 2)
);`,
    },
  };

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-8">
      {/* Header Badge */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • কনসেপচুয়াল ডেটাবেস ডিজাইন' : 'Part 1 of 13 • Conceptual Database Architecture'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="1. What is an ER Model? (Entity Relationship Model)"
              bn="১. ইআর (ER) মডেল কী ও কেন প্রয়োজন?"
            />
          </h2>
        </div>
      </div>

      {/* Real-World Motivation */}
      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Imagine you are building a database for a university. The university needs to store information about Students, Professors, Courses, Departments, and Enrollments. Before rushing to write SQL code or creating database tables, we must answer three fundamental design questions:"
            bn="মনে করুন আপনি একটি বিশ্ববিদ্যালয়ের জন্য ডেটাবেস তৈরি করছেন। বিশ্ববিদ্যালয়কে ছাত্র-ছাত্রী, শিক্ষক, কোর্স, বিভাগ এবং তাদের এনরোলমেন্টের তথ্য সংরক্ষণ করতে হবে। সরাসরি এসকিউএল কোড লেখা বা টেবিল তৈরির আগে আমাদের ৩টি মৌলিক ডিজাইনিং প্রশ্নের উত্তর জানতে হবে:"
          />
        </div>

        {/* 3 Fundamental Questions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#15171e] border border-cyan-900/40 space-y-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
              {language === 'bn' ? 'প্রশ্ন ১: কী তথ্য?' : 'Question 1: What Info?'}
            </span>
            <div className="text-sm font-bold text-white">
              <DualText en="What information should we store?" bn="আমাদের আসলে কোন কোন তথ্য সংরক্ষণ করা দরকার?" />
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              <DualText en="Names, IDs, dates of birth, semester grades, contact numbers." bn="নাম, আইডি, জন্মতারিখ, সেমিস্টার ফলাফল, ফোন নম্বর ইত্যাদি।" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#15171e] border border-indigo-900/40 space-y-1.5">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
              {language === 'bn' ? 'প্রশ্ন ২: কারা জড়িত?' : 'Question 2: What Things?'}
            </span>
            <div className="text-sm font-bold text-white">
              <DualText en="What real-world things are involved?" bn="বাস্তব জগতের কোন কোন বিষয় বা উপাদান জড়িত?" />
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              <DualText en="Students, Professors, Courses, Department rooms, Library books." bn="শিক্ষার্থী, প্রফেসর, কোর্স, অ্যাকাডেমিক বিভাগ ও বই।" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#15171e] border border-purple-900/40 space-y-1.5">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
              {language === 'bn' ? 'প্রশ্ন ৩: কীভাবে যুক্ত?' : 'Question 3: How Connected?'}
            </span>
            <div className="text-sm font-bold text-white">
              <DualText en="How are those things connected?" bn="এই উপাদানগুলো পরস্পরের সাথে কীভাবে সম্পর্কিত?" />
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              <DualText en="Students ENROLL in courses; Teachers TEACH courses; Profs BELONG to Dept." bn="শিক্ষার্থী কোর্সে ভর্তি হয়; শিক্ষক কোর্স পড়ান; শিক্ষক বিভাগের অন্তর্ভুক্ত।" />
            </div>
          </div>
        </div>

        {/* Exam Definition Box */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>{language === 'bn' ? 'বিশ্ববিদ্যালয় পরীক্ষার সংজ্ঞা (Exam Definition):' : 'University Exam Definition:'}</span>
          </div>
          <blockquote className="text-xs md:text-sm text-cyan-100 italic leading-relaxed font-sans pl-3 border-l-2 border-cyan-400">
            <DualText
              en="&ldquo;The Entity Relationship Model (ER Model) is a high-level conceptual data model used to represent the logical structure of a database through entities, attributes, and relationships.&rdquo;"
              bn="&ldquo;এনটিটি রিলেশনশিপ (ইআর) মডেল হলো একটি উচ্চ-স্তরের কনসেপচুয়াল ডেটা মডেল, যা এনটিটি (সত্তা), তাদের অ্যাট্রিবিউট (বৈশিষ্ট্য) এবং পারস্পরিক সম্পর্কের মাধ্যমে কোনো ডেটাবেসের যৌক্তিক কাঠামো উপস্থাপন করে।&rdquo;"
            />
          </blockquote>
          <div className="text-[11px] text-zinc-300 font-sans leading-relaxed pt-1">
            <DualText
              en="In simple words: An ER Model is the architectural blueprint of a database that shows what data we need to store and how different data items are connected together."
              bn="সহজ কথায়: ইআর মডেল হলো ডেটাবেসের একটি আর্কিটেকচারাল ব্লুপ্রিন্ট (নকশা), যা আমাদের স্পষ্ট দেখায় কোন ডেটা সংরক্ষণ করতে হবে এবং ডেটার বিভিন্ন অংশ কীভাবে পরস্পরের সাথে সংযুক্ত।"
            />
          </div>
        </div>

        {/* Blueprint Analogy Card */}
        <div className="p-4 rounded-2xl bg-[#101116] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-amber-400 font-bold block text-sm">
              {language === 'bn' ? 'স্থাপত্যের ব্লুপ্রিন্ট রূপক (Architectural Blueprint):' : 'Architectural Blueprint Analogy:'}
            </span>
            <div className="text-zinc-300 text-[11px] font-sans">
              {language === 'bn'
                ? 'একজন স্থপতি ভবন নির্মাণের আগে ব্লুপ্রিন্ট আঁকেন → ডেটাবেস ইঞ্জিনিয়ার টেবিল তৈরির আগে ইআর ডায়াগ্রাম তৈরি করেন।'
                : 'An architect drafts a floor blueprint before construction → A database engineer designs an ER Diagram before creating SQL tables.'}
            </div>
          </div>
          <div className="shrink-0 px-3.5 py-2 rounded-xl bg-cyan-950/40 border border-cyan-600/40 text-cyan-300 text-center font-bold">
            {language === 'bn' ? 'ইআর ডায়াগ্রাম = ইআর মডেলের চিত্ররূপ' : 'ER Diagram = Visual Representation of ER Model'}
          </div>
        </div>
      </div>

      {/* ========================================================
          AUTHENTIC UNIVERSITY DATABASE ER DIAGRAM (REFERENCED SHOWCASE)
          Full-View Thematic ER Diagram + Dynamic Component Breakdown
         ======================================================== */}
      <div className="p-5 md:p-7 rounded-3xl bg-[#080c18] border-2 border-cyan-500/40 space-y-6">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm md:text-base font-bold text-white font-mono">
                {language === 'bn'
                  ? 'বাস্তব উদাহরণ: বিশ্ববিদ্যালয় ডেটাবেসের পূর্ণাঙ্গ ইআর ডায়াগ্রাম'
                  : 'Real-World Example: University Database Complete ER Diagram'}
              </h3>
              <span className="text-[10px] text-zinc-400 font-sans">
                {language === 'bn'
                  ? 'Peter Chen Notation অনুযায়ী ৪টি এনটিটি, ৩টি রিলেশনশিপ ও তাদের অ্যাট্রিবিউট চিত্ররূপ'
                  : 'Authentic Peter Chen Notation: 4 Entities, 3 Relationships, and Connected Attributes'}
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-700 font-mono font-bold self-start sm:self-auto">
            Thematic Chen Notation
          </span>
        </div>

        {/* 1. FULL VIEW THEMATIC ER DIAGRAM (Widescreen Showcase) */}
        <div className="space-y-2">
          <div
            onClick={() => setIsModalOpen(true)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-[#070A14] border-2 border-cyan-500/40 transition-colors hover:border-cyan-400 hover: hover: p-2 sm:p-4 flex flex-col items-center justify-center"
          >
            <img
              src="/images/thematic-university-er-diagram.png"
              alt="University Database Thematic ER Diagram (Peter Chen Notation)"
              className="w-full h-auto max-h-[440px] md:max-h-[520px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/75 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity border border-white/[0.12]">
              <Maximize2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="w-full mt-2 pt-2 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-1">
              <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                4 Entities (▭) • 3 Relationships (◇) • 15 Attributes (⬭)
              </span>
              <span className="text-zinc-500 flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                Click diagram to view 100% full-screen ⤢
              </span>
            </div>
          </div>
        </div>

        {/* 2. DYNAMIC COMPONENT BREAKDOWN (Interactive Entity Explorer) */}
        <div className="p-4 md:p-5 rounded-2xl bg-[#0c1020] border border-white/[0.08] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5 uppercase">
                <Layers className="w-4 h-4 text-cyan-400" />
                {language === 'bn' ? 'ডায়নামিক উপাদান বিশ্লেষণ (Component Breakdown):' : 'Dynamic Component Breakdown:'}
              </span>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                {language === 'bn'
                  ? 'নিচের যেকোনো এনটিটিতে ক্লিক করে তার বিস্তারিত অ্যাট্রিবিউট, রিলেশন ও SQL টেবিল দেখুন:'
                  : 'Click an entity below to inspect its primary keys, connected attributes, and relationships:'}
              </p>
            </div>

            {/* Entity Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(universityEntitiesData) as Array<keyof typeof universityEntitiesData>).map((key) => {
                const ent = universityEntitiesData[key];
                const isActive = selectedEntity === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedEntity(key)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-colors cursor-pointer border ${
                      isActive
                        ? ent.activeTab
                        : 'bg-[#101428] text-zinc-400 border-white/[0.08] hover:text-white hover:border-white/[0.12]'
                    }`}
                  >
                    [{ent.name}]
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Entity Dynamic Detail Card */}
          {(() => {
            const active = universityEntitiesData[selectedEntity];
            return (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Active Entity Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#080b16] border border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs border ${active.badgeBg}`}>
                      [ {active.name} ]
                    </span>
                    <span className="text-xs font-sans text-zinc-300 font-medium">
                      {language === 'bn' ? active.nameBn : `Entity Type: ${active.name}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    <span className="text-zinc-500">PK:</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-600/60 font-bold">
                      <u>{active.pk}</u> ({active.pkType})
                    </span>
                  </div>
                </div>

                {/* 2-Column Grid: Attributes & Relationships */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Box: Attributes Breakdown */}
                  <div className="p-3.5 rounded-xl bg-[#090d1c] border border-white/[0.08] space-y-2.5">
                    <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {language === 'bn' ? 'অ্যাট্রিবিউট তালিকা (Ovals ⬭):' : 'Attributes Breakdown (Ovals):'}
                    </span>
                    <div className="space-y-1.5">
                      {active.attributes.map((attr, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#0e1326] border border-white/[0.08] text-[11px]"
                        >
                          <div className="flex items-center gap-2">
                            <span className={attr.isPk ? 'text-amber-300 font-mono font-bold' : 'text-zinc-200 font-mono'}>
                              {attr.isPk ? <u>{attr.name}</u> : attr.name}
                            </span>
                            {attr.isPk && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                                PK
                              </span>
                            )}
                          </div>
                          <span className="text-zinc-400 text-[10px] font-sans">
                            {language === 'bn' ? attr.descBn : attr.descEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Box: Connected Relationships */}
                  <div className="p-3.5 rounded-xl bg-[#090d1c] border border-white/[0.08] space-y-2.5">
                    <span className="text-[11px] font-mono font-bold text-purple-300 uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {language === 'bn' ? 'সংযুক্ত রিলেশনশিপ (Diamonds ◇):' : 'Connected Relationships (Diamonds):'}
                    </span>
                    <div className="space-y-2">
                      {active.relationships.map((rel, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-[#0e1326] border border-purple-900/40 space-y-1.5 text-[11px]"
                        >
                          <div className="flex items-center justify-between font-mono">
                            <span className="text-purple-300 font-bold">{rel.name}</span>
                            <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-700 text-purple-200 text-[10px] font-bold">
                              {rel.cardinality} ({rel.cardinalityLabel})
                            </span>
                          </div>
                          <div className="text-zinc-300 text-[10px] font-sans">
                            {language === 'bn' ? rel.descBn : rel.descEn}
                          </div>
                          {rel.relAttribute !== 'None' && (
                            <div className="text-[10px] font-mono text-pink-300 pt-0.5 border-t border-purple-900/40">
                              + Rel Attribute: {rel.relAttribute}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Box: SQL Table Translation */}
                <div className="p-3.5 rounded-xl bg-[#060812] border border-white/[0.08] space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/[0.08] pb-1.5">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <Code2 className="w-3.5 h-3.5" />
                      {language === 'bn' ? `SQL টেবিল ম্যাপিং: ${active.name}` : `SQL Physical Table Mapping: ${active.name}`}
                    </span>
                    <span className="text-[10px] text-zinc-500">Relational DDL Conversion</span>
                  </div>
                  <pre className="text-cyan-200 text-[11px] leading-relaxed overflow-x-auto pt-1 font-mono">
                    {active.sqlCode}
                  </pre>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Recommended Video Lecture: Neso Academy ER Diagram */}
      <div className="p-4 rounded-2xl bg-[#15171e] border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-600/30 shrink-0">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                YouTube • Neso Academy
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">1.2M+ Views</span>
            </div>
            <h4 className="text-xs md:text-sm font-bold text-white font-sans">
              <DualText
                en="Recommended Video: Entity-Relationship (ER) Diagram"
                bn="প্রস্তাবিত ভিডিও লেকচার: এনটিটি-রিলেশনশিপ (ইআর) ডায়াগ্রাম"
              />
            </h4>
            <div className="text-[11px] text-zinc-400 font-sans">
              <DualText
                en="Visual walkthrough covering Entities, Attribute sets, Recursive links, and Cardinality limits."
                bn="এনটিটি, অ্যাট্রিবিউট সেট, রিকার্সিভ রিলেশন ও কার্ডিনালিটি সীমার পরিষ্কার ভিডিও ব্যাখ্যা।"
              />
            </div>
          </div>
        </div>

        <a
          href="https://www.youtube.com/watch?v=rorft23glC0"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <span>{language === 'bn' ? 'ভিডিও দেখুন' : 'Watch Video'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full rounded-2xl bg-[#0B0F19] border border-cyan-500/40 p-4 md:p-6 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h3 className="text-sm md:text-base font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-cyan-400">▣</span>
                  {language === 'bn' ? 'ইউনিভার্সিটি ইআর ডায়াগ্রাম (Thematic Chen Notation)' : 'University ER Diagram (Thematic Chen Notation)'}
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">
                  Complete University Schema: 4 Entities (▭), 3 Relationships (◇), 15 Attributes (⬭), Cardinalities M:N & 1:N
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/[0.12]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center p-2 rounded-xl bg-[#060911] border border-white/[0.08]">
              <img
                src="/images/thematic-university-er-diagram.png"
                alt="University Database Thematic ER Diagram"
                className="w-full max-h-[78vh] object-contain rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
              <span>Press ESC or click anywhere outside to close</span>
              <span className="text-cyan-400 font-semibold">High-Resolution Vector Graphic (250 DPI)</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
