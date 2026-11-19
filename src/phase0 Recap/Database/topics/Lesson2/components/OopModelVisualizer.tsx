'use client';

import React, { useState } from 'react';
import { Gamepad2, GraduationCap, Briefcase, UserCheck, Play, Sparkles, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type ClassType = 'student' | 'professor' | 'staff' | 'person';
type ViewDirection = 'inheritance' | 'specialization';

export default function OopModelVisualizer() {
  const { language } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<ClassType>('student');
  const [direction, setDirection] = useState<ViewDirection>('inheritance');

  const classDetails = {
    person: {
      name: 'Person (Superclass / Parent)',
      roleBadge: 'Base Blueprint',
      enDesc: 'The generic root class containing shared identity attributes and common methods for all university members.',
      bnDesc: 'মূল প্যারেন্ট ক্লাস যা বিশ্ববিদ্যালয়ের সকল মানুষের সাধারণ পরিচিতি এবং মৌলিক মেথড ধারণ করে।',
      inheritedAttrs: [],
      ownAttrs: ['- Name: String (e.g. "Rahim")', '- Age: Integer (e.g. 21)', '- Email: String', '- Phone: String'],
      ownMethods: ['+ SetName(name)', '+ GetDetails()', '+ UpdateContact()'],
    },
    student: {
      name: 'Student (Subclass / Child)',
      roleBadge: 'IS-A Person',
      enDesc: 'Inherits Person. Automatically receives Name and Age, then adds academic roll, department, and CGPA logic.',
      bnDesc: 'Person ক্লাসকে ইনহেরিট করে। স্বয়ংক্রিয়ভাবে Name ও Age পেয়ে যায় এবং নিজের Roll, Dept ও সিজিপিএ মেথড যুক্ত করে।',
      sampleObject: 'Student #101: Rahim',
      inheritedAttrs: ['Name: "Rahim" (from Person)', 'Age: 21 (from Person)', 'Email: "rahim@univ.edu" (from Person)'],
      ownAttrs: ['- RollNo: "101"', '- Branch / Dept: "CSE"', '- EnrolledCourses: ["C01", "C02"]'],
      ownMethods: ['+ CalculateCGPA()', '+ EnrollCourse(courseId)', '+ SetMarks(sub, mark)'],
      methodResult: 'rahim.calculateCGPA() → Returns: 3.80 (First Class Honors)',
    },
    professor: {
      name: 'Professor (Subclass / Child)',
      roleBadge: 'IS-A Person',
      enDesc: 'Inherits Person. Reuses personal fields and adds faculty ID, salary, and grading methods.',
      bnDesc: 'Person ক্লাসকে ইনহেরিট করে। শিক্ষক পরিচিতি, বেতন এবং গ্রেড বরাদ্দ করার নিজস্ব মেথড যুক্ত করে।',
      sampleObject: 'Professor #T01: Mr. Ali',
      inheritedAttrs: ['Name: "Mr. Ali" (from Person)', 'Age: 42 (from Person)', 'Email: "ali@univ.edu" (from Person)'],
      ownAttrs: ['- Faculty_ID: "T01"', '- Designation: "Associate Professor"', '- Salary: $75,000'],
      ownMethods: ['+ AssignGrade(studentId, grade)', '+ ConductLecture(topic)', '+ PublishPaper(title)'],
      methodResult: 'mrAli.assignGrade("101", "A") → Committed to Database!',
    },
    staff: {
      name: 'Staff (Subclass / Child)',
      roleBadge: 'IS-A Person',
      enDesc: 'Inherits Person. Reuses basic identity and adds staff payroll and student ID card issuing operations.',
      bnDesc: 'Person ক্লাসকে ইনহেরিট করে। পরিচয় পুনর্ব্যবহার করে এবং পেরোল ও আইডি কার্ড তৈরির মেথড পরিচালনা করে।',
      sampleObject: 'Staff #S01: Officer Hafiz',
      inheritedAttrs: ['Name: "Hafiz Uddin" (from Person)', 'Age: 35 (from Person)', 'Email: "hafiz@univ.edu" (from Person)'],
      ownAttrs: ['- Staff_ID: "S01"', '- Department: "Registrar Office"', '- Shift: "Morning"'],
      ownMethods: ['+ ProcessPayroll()', '+ IssueStudentID(studentId)', '+ ManageLab()'],
      methodResult: 'hafiz.issueStudentID("101") → RFID Smart Card Issued!',
    },
  };

  const active = classDetails[selectedClass];

  return (
    <div className="p-5 md:p-7 rounded-2xl bg-[#0d1022] border border-pink-500/40 space-y-6 shadow-2xl">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
            <Gamepad2 className="w-4 h-4 text-pink-400" />
            <DualText
              en="Object-Oriented Database Model (UML Class & Inheritance Hierarchy)"
              bn="অবজেক্ট-ওরিয়েন্টেড ডেটাবেস মডেল (UML ক্লাস ও ইনহেরিটেন্স স্থাপত্য)"
            />
          </span>
          <div className="text-[11px] text-zinc-400 font-sans mt-0.5">
            <DualText
              en="University Inheritance: Student, Professor, and Staff extend the Person superclass, inheriting common attributes and methods."
              bn="বিশ্ববিদ্যালয় ক্লাস হায়ারার্কি: Student, Professor ও Staff সরাসরি Person ক্লাসকে এক্সটেন্ড করে এবং সব সাধারণ অ্যাট্রিবিউট ও মেথড ইনহেরিট করে।"
            />
          </div>
        </div>

        {/* Direction Toggle & Class Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Direction toggle */}
          <div className="flex items-center rounded-lg bg-black/50 border border-slate-800 p-0.5 font-mono text-[11px]">
            <button
              onClick={() => setDirection('inheritance')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                direction === 'inheritance'
                  ? 'bg-pink-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Child extends Parent (Standard UML IS-A relation)"
            >
              <ArrowUp className="w-3 h-3" />
              <span>IS-A (Child &rarr; Parent)</span>
            </button>
            <button
              onClick={() => setDirection('specialization')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                direction === 'specialization'
                  ? 'bg-pink-600 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Parent specializes into Children (Top-down view)"
            >
              <ArrowDown className="w-3 h-3" />
              <span>Specializes (Top &rarr; Down)</span>
            </button>
          </div>

          {/* Class pills */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setSelectedClass('student')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                selectedClass === 'student'
                  ? 'bg-pink-600 text-white font-bold shadow'
                  : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              onClick={() => setSelectedClass('professor')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                selectedClass === 'professor'
                  ? 'bg-pink-600 text-white font-bold shadow'
                  : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professor</span>
            </button>
            <button
              onClick={() => setSelectedClass('staff')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                selectedClass === 'staff'
                  ? 'bg-pink-600 text-white font-bold shadow'
                  : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Staff</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="min-w-[760px] mx-auto p-6 rounded-2xl bg-[#080914] border border-pink-900/40 relative">
          {/* Header Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-black text-pink-400 tracking-tight font-sans">
              Basic Object Oriented University Data Model
            </h3>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
              {direction === 'inheritance'
                ? 'Standard UML Generalization: Subclasses point to Superclass with solid generalization arrows (IS-A Relationship)'
                : 'Top-down Specialization: Person parent class branches out into specialized Student, Professor, and Staff roles'}
            </p>
          </div>

          {/* SVG Diagram Canvas */}
          <svg viewBox="0 0 760 380" className="w-full h-auto select-none">
            {/* Top Superclass: Person */}
            <g
              onClick={() => setSelectedClass('person')}
              className="cursor-pointer"
            >
              <rect
                x="250"
                y="15"
                width="260"
                height="105"
                rx="8"
                fill={selectedClass === 'person' ? '#351228' : '#141224'}
                stroke={selectedClass === 'person' ? '#f472b6' : '#ec4899'}
                strokeWidth={selectedClass === 'person' ? 2.5 : 1.5}
                className="transition-all"
              />
              {/* Header Banner */}
              <rect x="250" y="15" width="260" height="28" rx="8" fill="#be185d" />
              <text x="380" y="34" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Person (Superclass)
              </text>
              {/* Attributes Section */}
              <text x="265" y="60" fill="#a7f3d0" fontSize="11" fontFamily="monospace">
                - Name: String
              </text>
              <text x="265" y="75" fill="#a7f3d0" fontSize="11" fontFamily="monospace">
                - Age: Integer
              </text>
              {/* Divider */}
              <line x1="250" y1="84" x2="510" y2="84" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
              {/* Methods Section */}
              <text x="265" y="102" fill="#93c5fd" fontSize="11" fontFamily="monospace" fontWeight="bold">
                + SetName() &bull; + GetDetails()
              </text>
            </g>

            {/* Central Relation Badge between tiers */}
            <g>
              <rect
                x="290"
                y="140"
                width="180"
                height="22"
                rx="11"
                fill="#1e1329"
                stroke="#ec4899"
                strokeWidth="1.5"
              />
              <text
                x="380"
                y="155"
                fill="#fbcfe8"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {direction === 'inheritance' ? '▲ extends (IS-A) ▲' : '▼ specializes into ▼'}
              </text>
            </g>

            {/* ========================================================
                3 NON-OVERLAPPING CONNECTOR PATHS WITH DIRECT ARROWS
               ======================================================== */}

            {/* 1. Left Path: Student (x=140) <-> Person (x=300) */}
            <path
              d="M 140 200 L 140 151 L 290 151"
              fill="none"
              stroke={selectedClass === 'student' ? '#f472b6' : '#475569'}
              strokeWidth={selectedClass === 'student' ? 3 : 1.5}
              strokeDasharray={selectedClass === 'student' ? 'none' : '4 3'}
              className="transition-all duration-200"
            />
            {/* Student Arrow Head */}
            {direction === 'inheritance' ? (
              // Arrow points UP into Person (x=300, y=120)
              <path
                d="M 300 151 L 300 128"
                fill="none"
                stroke={selectedClass === 'student' ? '#f472b6' : '#475569'}
                strokeWidth={selectedClass === 'student' ? 3 : 1.5}
              />
            ) : (
              // Arrow points DOWN into Student (x=140, y=192)
              <polygon
                points="140,198 134,188 146,188"
                fill={selectedClass === 'student' ? '#f472b6' : '#94a3b8'}
              />
            )}
            {direction === 'inheritance' && (
              <polygon
                points="300,120 294,132 306,132"
                fill={selectedClass === 'student' ? '#f472b6' : '#080914'}
                stroke={selectedClass === 'student' ? '#f472b6' : '#94a3b8'}
                strokeWidth="1.5"
              />
            )}

            {/* 2. Center Path: Professor (x=380) <-> Person (x=380) */}
            <path
              d={direction === 'inheritance' ? 'M 380 200 L 380 162' : 'M 380 120 L 380 190'}
              fill="none"
              stroke={selectedClass === 'professor' ? '#f472b6' : '#475569'}
              strokeWidth={selectedClass === 'professor' ? 3 : 1.5}
              strokeDasharray={selectedClass === 'professor' ? 'none' : '4 3'}
              className="transition-all duration-200"
            />
            {direction === 'inheritance' ? (
              <polygon
                points="380,120 374,132 386,132"
                fill={selectedClass === 'professor' ? '#f472b6' : '#080914'}
                stroke={selectedClass === 'professor' ? '#f472b6' : '#94a3b8'}
                strokeWidth="1.5"
              />
            ) : (
              <polygon
                points="380,198 374,188 386,188"
                fill={selectedClass === 'professor' ? '#f472b6' : '#94a3b8'}
              />
            )}

            {/* 3. Right Path: Staff (x=620) <-> Person (x=460) */}
            <path
              d="M 620 200 L 620 151 L 470 151"
              fill="none"
              stroke={selectedClass === 'staff' ? '#f472b6' : '#475569'}
              strokeWidth={selectedClass === 'staff' ? 3 : 1.5}
              strokeDasharray={selectedClass === 'staff' ? 'none' : '4 3'}
              className="transition-all duration-200"
            />
            {/* Staff Arrow Head */}
            {direction === 'inheritance' ? (
              <path
                d="M 460 151 L 460 128"
                fill="none"
                stroke={selectedClass === 'staff' ? '#f472b6' : '#475569'}
                strokeWidth={selectedClass === 'staff' ? 3 : 1.5}
              />
            ) : (
              <polygon
                points="620,198 614,188 626,188"
                fill={selectedClass === 'staff' ? '#f472b6' : '#94a3b8'}
              />
            )}
            {direction === 'inheritance' && (
              <polygon
                points="460,120 454,132 466,132"
                fill={selectedClass === 'staff' ? '#f472b6' : '#080914'}
                stroke={selectedClass === 'staff' ? '#f472b6' : '#94a3b8'}
                strokeWidth="1.5"
              />
            )}

            {/* ========================================================
                SUBCLASS CARDS (STUDENT, PROFESSOR, STAFF)
               ======================================================== */}

            {/* 1. Subclass Card: Student */}
            <g
              onClick={() => setSelectedClass('student')}
              className="cursor-pointer"
            >
              <rect
                x="30"
                y="200"
                width="220"
                height="155"
                rx="8"
                fill={selectedClass === 'student' ? '#2e1224' : '#121424'}
                stroke={selectedClass === 'student' ? '#f472b6' : '#334155'}
                strokeWidth={selectedClass === 'student' ? 2.5 : 1}
                className="transition-all"
              />
              <rect x="30" y="200" width="220" height="28" rx="8" fill={selectedClass === 'student' ? '#db2777' : '#1e2338'} />
              <text x="140" y="219" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Student
              </text>
              {/* Inherited badge */}
              <text x="140" y="242" fill="#f472b6" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                [inherits Person: Name, Age]
              </text>
              {/* Own Attributes */}
              <text x="45" y="262" fill="#a7f3d0" fontSize="10.5" fontFamily="monospace">
                - RollNo: &quot;101&quot;
              </text>
              <text x="45" y="276" fill="#a7f3d0" fontSize="10.5" fontFamily="monospace">
                - Branch: &quot;CSE&quot;
              </text>
              <line x1="30" y1="286" x2="250" y2="286" stroke="#334155" strokeWidth="1" />
              {/* Own Methods */}
              <text x="45" y="306" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + CalculateCGPA()
              </text>
              <text x="45" y="322" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + EnrollCourse()
              </text>
              <text x="45" y="338" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + SetMarks()
              </text>
            </g>

            {/* 2. Subclass Card: Professor */}
            <g
              onClick={() => setSelectedClass('professor')}
              className="cursor-pointer"
            >
              <rect
                x="270"
                y="200"
                width="220"
                height="155"
                rx="8"
                fill={selectedClass === 'professor' ? '#2e1224' : '#121424'}
                stroke={selectedClass === 'professor' ? '#f472b6' : '#334155'}
                strokeWidth={selectedClass === 'professor' ? 2.5 : 1}
                className="transition-all"
              />
              <rect x="270" y="200" width="220" height="28" rx="8" fill={selectedClass === 'professor' ? '#db2777' : '#1e2338'} />
              <text x="380" y="219" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Professor
              </text>
              {/* Inherited badge */}
              <text x="380" y="242" fill="#f472b6" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                [inherits Person: Name, Age]
              </text>
              {/* Own Attributes */}
              <text x="285" y="262" fill="#a7f3d0" fontSize="10.5" fontFamily="monospace">
                - Faculty_ID: &quot;T01&quot;
              </text>
              <text x="285" y="276" fill="#a7f3d0" fontSize="10.5" fontFamily="monospace">
                - Designation: &quot;Prof&quot;
              </text>
              <line x1="270" y1="286" x2="490" y2="286" stroke="#334155" strokeWidth="1" />
              {/* Own Methods */}
              <text x="285" y="306" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + AssignGrade()
              </text>
              <text x="285" y="322" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + ConductLecture()
              </text>
              <text x="285" y="338" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + PublishPaper()
              </text>
            </g>

            {/* 3. Subclass Card: Staff */}
            <g
              onClick={() => setSelectedClass('staff')}
              className="cursor-pointer"
            >
              <rect
                x="510"
                y="200"
                width="220"
                height="155"
                rx="8"
                fill={selectedClass === 'staff' ? '#2e1224' : '#121424'}
                stroke={selectedClass === 'staff' ? '#f472b6' : '#334155'}
                strokeWidth={selectedClass === 'staff' ? 2.5 : 1}
                className="transition-all"
              />
              <rect x="510" y="200" width="220" height="28" rx="8" fill={selectedClass === 'staff' ? '#db2777' : '#1e2338'} />
              <text x="620" y="219" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                Staff
              </text>
              {/* Inherited badge */}
              <text x="620" y="242" fill="#f472b6" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                [inherits Person: Name, Age]
              </text>
              {/* Own Attributes */}
              <text x="525" y="262" fill="#a7f3d0" fontSize="10.5" fontFamily="monospace">
                - Staff_ID: &quot;S01&quot;
              </text>
              <text x="525" y="276" fill="#a7f3d0" fontSize="10.5" fontFamily="monospace">
                - Department: &quot;Admin&quot;
              </text>
              <line x1="510" y1="286" x2="730" y2="286" stroke="#334155" strokeWidth="1" />
              {/* Own Methods */}
              <text x="525" y="306" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + ProcessPayroll()
              </text>
              <text x="525" y="322" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + IssueStudentID()
              </text>
              <text x="525" y="338" fill="#93c5fd" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
                + ManageLab()
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Clear Explanation of Arrows & Relations */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#170e24] via-[#120f26] to-[#0a1120] border border-pink-900/60 text-xs font-sans leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-pink-400 font-bold uppercase">
          <Info className="w-4 h-4 text-pink-400" />
          <span>
            {language === 'bn'
              ? 'তীরচিহ্ন ও সম্পর্কের স্পষ্ট ব্যাখ্যা (How Inheritance Arrows Work):'
              : 'Understanding the Arrow & Inheritance Relationship:'}
          </span>
        </div>

        <div className="text-zinc-200 space-y-1.5">
          <DualText
            en="1. Why do arrows point UP to Person? In standard software engineering (UML), the arrow points from the Child class (Student) toward the Parent class (Person). It reads: 'Student IS-A Person' (extends/generalization)."
            bn="১. তীরচিহ্ন কেন উপরের দিকে Person-এর দিকে নির্দেশ করছে? সফটওয়্যার ইঞ্জিনিয়ারিং ও UML নিয়মানুযায়ী চাইল্ড ক্লাস (Student) থেকে প্যারেন্ট ক্লাসের (Person) দিকে তীরচিহ্ন যায়, যার অর্থ: 'Student হলো একজন Person' (IS-A সম্পর্ক বা ইনহেরিটেন্স)।"
          />
          <DualText
            en="2. What is shared? The Student object never duplicates code. It automatically receives 'Name' and 'Age' directly from Person, and adds its own specific fields ('RollNo', 'Branch') and methods ('CalculateCGPA()')."
            bn="২. কী শেয়ার হচ্ছে? Student ক্লাসে Name বা Age-এর কোড পুনরায় লিখতে হয় না। এটি সরাসরি Person থেকে স্বয়ংক্রিয়ভাবে ইনহেরিট হয় এবং শুধু নিজের নিজস্ব ফিল্ড (RollNo, Branch) ও মেথড (CalculateCGPA) যোগ করে।"
          />
        </div>
      </div>

      {/* Interactive Object Inspector & Method Execution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Active Class Inspection Card */}
        <div className="p-4 rounded-xl bg-[#090b17] border border-pink-900/50 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-pink-400 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              {active.name}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">
              {active.roleBadge}
            </span>
          </div>

          <div className="text-zinc-300 font-sans text-xs leading-relaxed">
            {language === 'bn' ? active.bnDesc : active.enDesc}
          </div>

          {/* Inherited vs Own Attributes */}
          <div className="space-y-1.5 pt-1">
            {selectedClass !== 'person' && (
              <div>
                <span className="text-[10px] uppercase font-bold text-pink-300">
                  {language === 'bn' ? '✓ Person থেকে ইনহেরিট করা ফিল্ডস:' : '✓ Inherited from Person Superclass:'}
                </span>
                <div className="pl-2 text-[11px] text-zinc-400 space-y-0.5">
                  {active.inheritedAttrs.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400">
                {language === 'bn' ? '✓ নিজস্ব অ্যাট্রিবিউটস (State):' : '✓ Own Subclass Attributes (State):'}
              </span>
              <div className="pl-2 text-[11px] text-emerald-300/90 space-y-0.5">
                {active.ownAttrs.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400">
                {language === 'bn' ? '✓ মেথডস বা কোড ফাংশন (Behavior):' : '✓ Executable Methods (Behavior):'}
              </span>
              <div className="pl-2 text-[11px] text-cyan-300 space-y-0.5">
                {active.ownMethods.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Method Simulation Console */}
        <div className="p-4 rounded-xl bg-[#090b17] border border-slate-800 space-y-3 font-mono text-xs flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-zinc-400 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-pink-400" />
              {language === 'bn' ? 'মেথড এক্সিকিউশন কনসোল (Live Method Invocation):' : 'Live Object Method Invocation:'}
            </span>

            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-[11px] space-y-1.5">
              <span className="text-zinc-500 block">// In Relational SQL: Only passive data rows exist.</span>
              <span className="text-zinc-500 block">// In OODBMS: You invoke methods directly on stored objects!</span>
              <div className="pt-1 text-pink-300 font-bold">
                {selectedClass === 'student' && '> studentRahim.calculateCGPA();'}
                {selectedClass === 'professor' && '> mrAli.assignGrade("101", "A");'}
                {selectedClass === 'staff' && '> hafiz.issueStudentID("101");'}
                {selectedClass === 'person' && '> person.getDetails();'}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-emerald-300 text-[11px] font-sans">
              <span className="font-mono text-emerald-400 font-bold block mb-0.5">Result:</span>
              {selectedClass === 'student' && 'CGPA: 3.80 • Status: Passed • Honors: Dean\'s List'}
              {selectedClass === 'professor' && 'Grade A committed for Student #101 (Course CSE201). GPA updated.'}
              {selectedClass === 'staff' && 'Student ID #101 RFID chip programmed with library & hostel permissions.'}
              {selectedClass === 'person' && 'Person record verified. Name: Rahim, Email: rahim@univ.edu.'}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-indigo-300 text-[11px] font-sans leading-relaxed">
            <DualText
              en="Key Advantage: Polymorphism and Reusability. If you add a new attribute (e.g., 'Address') to Person, every Student, Professor, and Staff automatically gains it without rewriting code!"
              bn="মূল সুবিধা: পলিমরফিজম ও কোড পুনঃব্যবহার। ভবিষ্যতে Person ক্লাসে নতুন কোনো ফিল্ড (যেমন Address) যোগ করলে Student, Professor ও Staff সবাই তা কোনো অতিরিক্ত কোড ছাড়া সরাসরি পেয়ে যাবে!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
