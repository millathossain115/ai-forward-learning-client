'use client';

import React, { useState } from 'react';
import { Table as TableIcon, Key, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type SelectionState =
  | { type: 'student'; id: string }
  | { type: 'course'; id: string }
  | { type: 'enrollment'; studentId: string; courseId: string }
  | null;

export default function RelationalModelVisualizer() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<SelectionState>({ type: 'student', id: '101' });

  // Original Lesson 2 Dataset (preserved exactly)
  const students = [
    { id: '101', name: 'Rahim', dept: 'CSE' },
    { id: '102', name: 'Karim', dept: 'BBA' },
    { id: '103', name: 'Nila', dept: 'EEE' },
  ];

  const enrollments = [
    { studentId: '101', courseId: 'C01', semester: 'Spring 2026' },
    { studentId: '101', courseId: 'C02', semester: 'Spring 2026' },
    { studentId: '102', courseId: 'C01', semester: 'Spring 2026' },
    { studentId: '103', courseId: 'C02', semester: 'Spring 2026' },
  ];

  const courses = [
    { id: 'C01', name: 'Database Systems', code: 'CSE201' },
    { id: 'C02', name: 'Discrete Mathematics', code: 'MTH101' },
  ];

  // Highlighting helpers
  const isStudentRowHighlighted = (id: string) => {
    if (!selected) return true;
    if (selected.type === 'student') return selected.id === id;
    if (selected.type === 'course') {
      return enrollments.some((enr) => enr.courseId === selected.id && enr.studentId === id);
    }
    if (selected.type === 'enrollment') return selected.studentId === id;
    return false;
  };

  const isCourseRowHighlighted = (id: string) => {
    if (!selected) return true;
    if (selected.type === 'course') return selected.id === id;
    if (selected.type === 'student') {
      return enrollments.some((enr) => enr.studentId === selected.id && enr.courseId === id);
    }
    if (selected.type === 'enrollment') return selected.courseId === id;
    return false;
  };

  const isEnrollmentRowHighlighted = (sId: string, cId: string) => {
    if (!selected) return true;
    if (selected.type === 'enrollment') {
      return selected.studentId === sId && selected.courseId === cId;
    }
    if (selected.type === 'student') return selected.id === sId;
    if (selected.type === 'course') return selected.id === cId;
    return false;
  };

  // Dynamic summary
  const getActiveSummary = () => {
    if (!selected) {
      return {
        en: 'Click any Student, Course, or Enrollment row to trace foreign key relationships.',
        bn: 'যেকোনো শিক্ষার্থী, কোর্স বা রেজিস্ট্রেশন সারিতে ক্লিক করে ফরেন কি সম্পর্ক পরীক্ষা করুন।',
      };
    }

    if (selected.type === 'student') {
      const s = students.find((st) => st.id === selected.id);
      const enrolled = enrollments
        .filter((enr) => enr.studentId === selected.id)
        .map((enr) => courses.find((c) => c.id === enr.courseId)?.name)
        .filter(Boolean);

      return {
        en: `Student #${s?.id} (${s?.name}) is enrolled in ${enrolled.length} courses: ${enrolled.join(', ')} via Foreign Key matches in Enrollments.`,
        bn: `শিক্ষার্থী #${s?.id} (${s?.name}) Enrollments টেবিলের ফরেন কি রেফারেন্সের মাধ্যমে ${enrolled.length}টি কোর্সে (${enrolled.join(', ')}) যুক্ত।`,
      };
    }

    if (selected.type === 'course') {
      const c = courses.find((co) => co.id === selected.id);
      const enrolledStudents = enrollments
        .filter((enr) => enr.courseId === selected.id)
        .map((enr) => students.find((st) => st.id === enr.studentId)?.name)
        .filter(Boolean);

      return {
        en: `Course ${c?.id} (${c?.name}) has ${enrolledStudents.length} enrolled students: ${enrolledStudents.join(', ')}.`,
        bn: `কোর্স ${c?.id} (${c?.name})-এ ${enrolledStudents.length} জন শিক্ষার্থী (${enrolledStudents.join(', ')}) ভর্তি আছেন।`,
      };
    }

    if (selected.type === 'enrollment') {
      const s = students.find((st) => st.id === selected.studentId);
      const c = courses.find((co) => co.id === selected.courseId);
      return {
        en: `Junction record: Student #${s?.id} (${s?.name}) ↔ Course ${c?.id} (${c?.name}) [Semester: Spring 2026].`,
        bn: `জাংশন রেকর্ড: শিক্ষার্থী #${s?.id} (${s?.name}) ↔ কোর্স ${c?.id} (${c?.name}) [সেমিস্টার: Spring 2026]।`,
      };
    }

    return { en: '', bn: '' };
  };

  const summary = getActiveSummary();

  return (
    <div className="p-5 md:p-7 rounded-2xl bg-[#0a0d18] border border-emerald-500/40 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
            <TableIcon className="w-4 h-4 text-emerald-400" />
            <DualText
              en="Relational Database Model (Tables, Foreign Keys & Junction Architecture)"
              bn="রিলেশনাল ডেটাবেস মডেল (টেবিল, ফরেন কি ও জাংশন টেবিল স্থাপত্য)"
            />
          </span>
          <div className="text-[11px] text-zinc-400 font-sans mt-0.5">
            <DualText
              en="Interactive 3-table relational schema matching real-world normalization (Many-to-Many resolved into two One-to-Many relationships)."
              bn="বাস্তব ডেটাবেসের ৩-টেবিল স্কিমা: জাংশন টেবিলের মাধ্যমে মেনি-টু-মেনি (M:N) সম্পর্ককে দুটি ওয়ান-টু-মেনি (1:N) সম্পর্কে রূপান্তর।"
            />
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setSelected({ type: 'student', id: '101' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              selected?.type === 'student' && selected.id === '101'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Rahim (101)
          </button>
          <button
            onClick={() => setSelected({ type: 'student', id: '102' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              selected?.type === 'student' && selected.id === '102'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Karim (102)
          </button>
          <button
            onClick={() => setSelected({ type: 'student', id: '103' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              selected?.type === 'student' && selected.id === '103'
                ? 'bg-emerald-600 text-white font-bold shadow'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Nila (103)
          </button>
          <button
            onClick={() => setSelected({ type: 'course', id: 'C01' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              selected?.type === 'course' && selected.id === 'C01'
                ? 'bg-cyan-600 text-white font-bold shadow'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Database (C01)
          </button>
          <button
            onClick={() => setSelected(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Show all records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Relational Visual Canvas */}
      <div className="relative overflow-x-auto pb-4 pt-2">
        <div className="min-w-[760px] mx-auto p-6 rounded-2xl bg-[#080a14] border border-emerald-900/40 relative">
          {/* Main Diagram Title like uploaded image */}
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-emerald-400 tracking-tight font-sans">
              Relational Database
            </h3>
            <p className="text-[11px] font-mono text-zinc-400 mt-1">
              {language === 'bn'
                ? 'প্রাইমারি কি (PK) ও ফরেন কি (FK)-এর মাধ্যমে ডেটা লিঙ্কিং'
                : 'Primary Key (PK) & Foreign Key (FK) Referential Integrity'}
            </p>
          </div>

          {/* 3-Column Tables Layout with Connectors */}
          <div className="grid grid-cols-12 gap-4 items-start relative z-10">
            {/* 1. Left Table: Students */}
            <div className="col-span-3 space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                <span className="text-emerald-500 font-semibold">&rarr;</span>
                <span>Students</span>
              </div>

              <div className="rounded-xl overflow-hidden border-2 border-emerald-600/80 bg-[#0e1322]">
                {/* Header banner matching reference image */}
                <div className="bg-[#15803d] text-white font-bold text-center py-2 px-3 text-sm font-sans tracking-wide">
                  Students
                </div>
                {/* Columns */}
                <div className="grid grid-cols-12 bg-[#1b253b] border-b border-emerald-900/60 text-xs font-mono font-bold text-zinc-200 py-1.5 px-3">
                  <div className="col-span-4 text-emerald-300 flex items-center gap-1">
                    <Key className="w-3 h-3 text-amber-400" /> Id (PK)
                  </div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-4 text-right text-zinc-400">Dept</div>
                </div>
                {/* Rows */}
                <div className="divide-y divide-slate-800 text-xs font-mono">
                  {students.map((st) => {
                    const isRowActive = isStudentRowHighlighted(st.id);
                    const isDirect = selected?.type === 'student' && selected.id === st.id;

                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelected({ type: 'student', id: st.id })}
                        className={`w-full grid grid-cols-12 py-2 px-3 text-left transition-colors cursor-pointer ${
                          isDirect
                            ? 'bg-emerald-500/25 text-white font-bold ring-1 ring-emerald-400'
                            : isRowActive
                            ? 'bg-emerald-950/20 text-emerald-200'
                            : 'text-zinc-500 opacity-40 hover:opacity-100 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="col-span-4 font-bold text-amber-400">{st.id}</div>
                        <div className="col-span-4 text-zinc-200 font-semibold">{st.name}</div>
                        <div className="col-span-4 text-right text-zinc-400 text-[10px]">{st.dept}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Middle Column: Connector Line + Junction Table */}
            <div className="col-span-5 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                <span className="text-emerald-400 font-semibold">&uarr;</span>
                <span>Enrollments (Junction Table)</span>
              </div>

              <div className="rounded-xl overflow-hidden border-2 border-emerald-500 bg-[#0e1322] ring-1 ring-emerald-500/40">
                {/* Header banner */}
                <div className="bg-[#15803d] text-white font-bold text-center py-2 px-3 text-sm font-sans tracking-wide flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Enrollments</span>
                </div>
                {/* Columns */}
                <div className="grid grid-cols-12 bg-[#1b253b] border-b border-emerald-900/60 text-xs font-mono font-bold text-zinc-200 py-1.5 px-3 text-center">
                  <div className="col-span-4 text-emerald-300 border-r border-slate-700/60">
                    StudentId (FK)
                  </div>
                  <div className="col-span-4 text-cyan-300 border-r border-slate-700/60">
                    CourseId (FK)
                  </div>
                  <div className="col-span-4 text-zinc-400 text-[11px]">
                    Semester
                  </div>
                </div>
                {/* Rows */}
                <div className="divide-y divide-slate-800 text-xs font-mono">
                  {enrollments.map((enr, idx) => {
                    const isRowActive = isEnrollmentRowHighlighted(enr.studentId, enr.courseId);
                    const isDirect =
                      selected?.type === 'enrollment' &&
                      selected.studentId === enr.studentId &&
                      selected.courseId === enr.courseId;

                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          setSelected({
                            type: 'enrollment',
                            studentId: enr.studentId,
                            courseId: enr.courseId,
                          })
                        }
                        className={`w-full grid grid-cols-12 py-2 px-3 text-center transition-colors cursor-pointer ${
                          isDirect
                            ? 'bg-emerald-500/30 text-white font-bold ring-1 ring-emerald-400'
                            : isRowActive
                            ? 'bg-emerald-950/40 text-emerald-200 font-semibold'
                            : 'text-zinc-500 opacity-40 hover:opacity-100 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="col-span-4 border-r border-slate-800/80 font-bold text-amber-400">
                          {enr.studentId}
                        </div>
                        <div className="col-span-4 border-r border-slate-800/80 font-bold text-cyan-400">
                          {enr.courseId}
                        </div>
                        <div className="col-span-4 text-[10px] text-zinc-400">
                          {enr.semester}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Right Table: Courses */}
            <div className="col-span-4 space-y-2">
              <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono text-emerald-400 font-bold">
                <span>Courses</span>
                <span className="text-emerald-500 font-semibold">&larr;</span>
              </div>

              <div className="rounded-xl overflow-hidden border-2 border-emerald-600/80 bg-[#0e1322]">
                {/* Header banner */}
                <div className="bg-[#15803d] text-white font-bold text-center py-2 px-3 text-sm font-sans tracking-wide">
                  Courses
                </div>
                {/* Columns */}
                <div className="grid grid-cols-12 bg-[#1b253b] border-b border-emerald-900/60 text-xs font-mono font-bold text-zinc-200 py-1.5 px-3">
                  <div className="col-span-3 text-cyan-300 flex items-center gap-1">
                    <Key className="w-3 h-3 text-amber-400" /> Id (PK)
                  </div>
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3 text-right text-zinc-400 text-[10px]">Code</div>
                </div>
                {/* Rows */}
                <div className="divide-y divide-slate-800 text-xs font-mono">
                  {courses.map((co) => {
                    const isRowActive = isCourseRowHighlighted(co.id);
                    const isDirect = selected?.type === 'course' && selected.id === co.id;

                    return (
                      <button
                        key={co.id}
                        onClick={() => setSelected({ type: 'course', id: co.id })}
                        className={`w-full grid grid-cols-12 py-2 px-3 text-left transition-colors cursor-pointer ${
                          isDirect
                            ? 'bg-cyan-500/25 text-white font-bold ring-1 ring-cyan-400'
                            : isRowActive
                            ? 'bg-cyan-950/20 text-cyan-200'
                            : 'text-zinc-500 opacity-40 hover:opacity-100 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="col-span-3 font-bold text-cyan-400">{co.id}</div>
                        <div className="col-span-6 text-zinc-200 font-semibold">{co.name}</div>
                        <div className="col-span-3 text-right text-zinc-400 text-[10px]">{co.code}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* SVG Orthogonal Relationship Connectors matching the uploaded diagram */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <svg viewBox="0 0 760 70" className="w-full h-auto select-none">
              <defs>
                <marker id="rel-arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#10b981" />
                </marker>
                <marker id="rel-arrow-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Left Arrow: Students.Id -> Enrollments.StudentId */}
              <path
                d="M 110 50 L 110 20 L 320 20 L 320 45"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinejoin="round"
                markerEnd="url(#rel-arrow-right)"
              />
              <text x="215" y="14" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                FK: Enrollments.StudentId &rarr; Students.Id
              </text>

              {/* Right Arrow: Courses.Id -> Enrollments.CourseId */}
              <path
                d="M 640 50 L 640 20 L 440 20 L 440 45"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinejoin="round"
                markerEnd="url(#rel-arrow-left)"
              />
              <text x="540" y="14" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                FK: Enrollments.CourseId &rarr; Courses.Id
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Dynamic Foreign Key Explanation Box */}
      <div className="p-4 rounded-xl bg-[#15171e] border border-emerald-900/60 text-xs font-sans leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 font-bold uppercase">
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {language === 'bn'
              ? 'রিলেশনাল ফরেন কি (Foreign Key) বিশ্লেষণ:'
              : 'Relational Foreign Key Traversal:'}
          </span>
        </div>

        <div className="text-zinc-200">
          <DualText en={summary.en} bn={summary.bn} />
        </div>

        <div className="pt-1 text-[11px] text-zinc-400 border-t border-slate-800/80 leading-relaxed">
          <DualText
            en="💡 Why not store courses inside Students? Because Rahim takes 2 courses (Database & Math). Storing multiple courses in one cell violates 1st Normal Form (Atomic Values), while duplicating Rahim's row creates redundant data. The Enrollments Junction Table resolves this with mathematical integrity!"
            bn="💡 কেন ছাত্রদের ভেতরেই কোর্সের নাম বারবার লিখছি না? কারণ রহিম একই সাথে ২টি কোর্স করছে (Database ও Math)। একটি ঘরে কমা দিয়ে একাধিক কোর্স লিখলে 1NF নিয়ম ভঙ্গ হয়, আবার রহিমের সারি বারবার ডুপ্লিকেট করলে ডেটা অসঙ্গতি ঘটে। মাঝখানের Enrollments জাংশন টেবিল ফরেন কি-এর মাধ্যমে নিখুঁত গাণিতিক সমাধান নিশ্চিত করে!"
          />
        </div>
      </div>

      {/* RDBMS Industry Engines Grid */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-mono font-bold text-zinc-300">
          {language === 'bn' ? 'শীর্ষস্থানীয় রিলেশনাল ইঞ্জিনসমূহ:' : 'Leading Relational Engines Implementing This:'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
            <strong className="text-cyan-400 block">PostgreSQL</strong>
            <span className="text-[10px] text-zinc-500">ACID + JSONB</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
            <strong className="text-amber-400 block">MySQL</strong>
            <span className="text-[10px] text-zinc-500">InnoDB FK Constraints</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
            <strong className="text-rose-400 block">Oracle DB</strong>
            <span className="text-[10px] text-zinc-500">Enterprise High Availability</span>
          </div>
          <div className="p-3 rounded-lg bg-[#0e1122] border border-slate-800 text-center">
            <strong className="text-emerald-400 block">SQL Server</strong>
            <span className="text-[10px] text-zinc-500">T-SQL &amp; Foreign Keys</span>
          </div>
        </div>
      </div>
    </div>
  );
}
