'use client';

import React, { useState } from 'react';
import { Network, MousePointerClick, CheckCircle2, RotateCcw, Link2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type SelectedItem = 
  | { type: 'student'; id: string }
  | { type: 'course'; id: string }
  | { type: 'teacher'; id: string }
  | null;

export default function NetworkModelVisualizer() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<SelectedItem>({ type: 'student', id: 'rahim' });

  // Data matching user's scenario
  const students = [
    { id: 'rahim', name: 'Rahim', code: 'S-101', dept: 'CSE', courses: ['db', 'math'], y: 35 },
    { id: 'karim', name: 'Karim', code: 'S-102', dept: 'BBA', courses: ['db'], y: 120 },
    { id: 'nila', name: 'Nila', code: 'S-103', dept: 'EEE', courses: ['math', 'net'], y: 205 },
    { id: 'sami', name: 'Sami', code: 'S-104', dept: 'CSE', courses: ['net'], y: 290 },
  ];

  const courses = [
    { id: 'db', name: 'Database Systems', code: 'CSE-201', teacher: 'ali', students: ['rahim', 'karim'], y: 65 },
    { id: 'math', name: 'Mathematics', code: 'MTH-101', teacher: 'sara', students: ['rahim', 'nila'], y: 165 },
    { id: 'net', name: 'Computer Networks', code: 'CSE-301', teacher: 'kamal', students: ['nila', 'sami'], y: 265 },
  ];

  const teachers = [
    { id: 'ali', name: 'Mr. Ali', title: 'Prof. / Instructor', course: 'db', y: 65 },
    { id: 'sara', name: 'Ms. Sara', title: 'Asst. Professor', course: 'math', y: 165 },
    { id: 'kamal', name: 'Dr. Kamal', title: 'Department Head', course: 'net', y: 265 },
  ];

  // Helper to check active state
  const isStudentActive = (id: string) => {
    if (!selected) return true;
    if (selected.type === 'student' && selected.id === id) return true;
    if (selected.type === 'course') {
      const course = courses.find((c) => c.id === selected.id);
      return course?.students.includes(id) ?? false;
    }
    if (selected.type === 'teacher') {
      const teacher = teachers.find((t) => t.id === selected.id);
      const course = courses.find((c) => c.id === teacher?.course);
      return course?.students.includes(id) ?? false;
    }
    return false;
  };

  const isCourseActive = (id: string) => {
    if (!selected) return true;
    if (selected.type === 'course' && selected.id === id) return true;
    if (selected.type === 'student') {
      const student = students.find((s) => s.id === selected.id);
      return student?.courses.includes(id) ?? false;
    }
    if (selected.type === 'teacher') {
      const teacher = teachers.find((t) => t.id === selected.id);
      return teacher?.course === id;
    }
    return false;
  };

  const isTeacherActive = (id: string) => {
    if (!selected) return true;
    if (selected.type === 'teacher' && selected.id === id) return true;
    if (selected.type === 'course') {
      const course = courses.find((c) => c.id === selected.id);
      return course?.teacher === id;
    }
    if (selected.type === 'student') {
      const student = students.find((s) => s.id === selected.id);
      const activeCourses = courses.filter((c) => student?.courses.includes(c.id));
      return activeCourses.some((c) => c.teacher === id);
    }
    return false;
  };

  const isLinkActive = (studentId: string, courseId: string) => {
    if (!selected) return true;
    if (selected.type === 'student') return selected.id === studentId;
    if (selected.type === 'course') return selected.id === courseId;
    if (selected.type === 'teacher') {
      const teacher = teachers.find((t) => t.id === selected.id);
      return teacher?.course === courseId;
    }
    return false;
  };

  const isTeacherLinkActive = (teacherId: string, courseId: string) => {
    if (!selected) return true;
    if (selected.type === 'teacher') return selected.id === teacherId;
    if (selected.type === 'course') return selected.id === courseId;
    if (selected.type === 'student') {
      const student = students.find((s) => s.id === selected.id);
      return student?.courses.includes(courseId) ?? false;
    }
    return false;
  };

  return (
    <div className="p-5 md:p-6 rounded-2xl bg-[#101116] border border-emerald-900/40 space-y-5">
      {/* Header and Quick Exploration Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <div className="space-y-0.5">
          <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
            <Network className="w-4 h-4 text-emerald-400" />
            <DualText
              en="Interactive Network Model Diagram (CODASYL Set Architecture)"
              bn="ইন্টারেক্টিভ নেটওয়ার্ক মডেল ডায়াগ্রাম (পয়েন্টার ও সেট আর্কিটেকচার)"
            />
          </span>
          <div className="text-[11px] text-zinc-400 font-sans">
            <DualText
              en="Click any Student, Course, or Teacher to trace how pointers traverse across records."
              bn="যেকোনো শিক্ষার্থী, কোর্স বা শিক্ষকে ক্লিক করে দেখুন পয়েন্টার কীভাবে রেকর্ডগুলোর মধ্যে সংযোগ তৈরি করে।"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelected({ type: 'student', id: 'rahim' })}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
              selected?.type === 'student' && selected.id === 'rahim'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Rahim
          </button>
          <button
            onClick={() => setSelected({ type: 'student', id: 'karim' })}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
              selected?.type === 'student' && selected.id === 'karim'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Karim
          </button>
          <button
            onClick={() => setSelected({ type: 'course', id: 'db' })}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
              selected?.type === 'course' && selected.id === 'db'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-slate-800 text-zinc-300 hover:bg-slate-700'
            }`}
          >
            Database
          </button>
          <button
            onClick={() => setSelected(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reset highlights"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas for Network Graph */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px] relative bg-[#101116] rounded-xl border border-white/[0.08] p-4">
          {/* Column Titles */}
          <div className="grid grid-cols-3 text-center mb-3 font-mono text-xs font-bold">
            <div className="text-indigo-400 flex items-center justify-center gap-1.5">
              <span>👤 1. Students (Owner Record A)</span>
            </div>
            <div className="text-cyan-400 flex items-center justify-center gap-1.5">
              <span>📚 2. Courses (Member Record B)</span>
            </div>
            <div className="text-emerald-400 flex items-center justify-center gap-1.5">
              <span>👨‍🏫 3. Teachers (Owner Record C)</span>
            </div>
          </div>

          <svg viewBox="0 0 800 370" className="w-full h-auto select-none">
            <defs>
              {/* Arrow Markers */}
              <marker id="arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 10 0 L 0 5 L 10 10 z" fill="#64748b" />
              </marker>
              <marker id="arrow-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
              <marker id="arrow-active-right" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="arrow-active-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 10 0 L 0 5 L 10 10 z" fill="#34d399" />
              </marker>
              <marker id="arrow-vertical" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 5 L 10 5" stroke="#475569" strokeWidth="2" />
              </marker>
            </defs>

            {/* Vertical Bidirectional Links Between Students in Column 1 */}
            <g stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3">
              <line x1="105" y1="85" x2="105" y2="120" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
              <line x1="105" y1="170" x2="105" y2="205" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
              <line x1="105" y1="255" x2="105" y2="290" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
            </g>

            {/* Vertical Bidirectional Links Between Courses in Column 2 */}
            <g stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3">
              <line x1="400" y1="115" x2="400" y2="165" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
              <line x1="400" y1="215" x2="400" y2="265" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
            </g>

            {/* Vertical Bidirectional Links Between Teachers in Column 3 */}
            <g stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3">
              <line x1="685" y1="115" x2="685" y2="165" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
              <line x1="685" y1="215" x2="685" y2="265" markerStart="url(#arrow-vertical)" markerEnd="url(#arrow-vertical)" />
            </g>

            {/* Pointer Curves: Students -> Courses */}
            {/* 1. Rahim (x=190, y=60) -> Database (x=310, y=90) */}
            <path
              d="M 190 60 C 250 60, 250 90, 310 90"
              fill="none"
              stroke={isLinkActive('rahim', 'db') ? '#38bdf8' : '#334155'}
              strokeWidth={isLinkActive('rahim', 'db') ? '2.5' : '1'}
              opacity={isLinkActive('rahim', 'db') ? 1 : 0.25}
              markerEnd={isLinkActive('rahim', 'db') ? 'url(#arrow-active-right)' : 'url(#arrow-right)'}
              className="transition-colors duration-300"
            />

            {/* 2. Rahim (x=190, y=60) -> Mathematics (x=310, y=190) */}
            <path
              d="M 190 60 C 260 60, 240 190, 310 190"
              fill="none"
              stroke={isLinkActive('rahim', 'math') ? '#38bdf8' : '#334155'}
              strokeWidth={isLinkActive('rahim', 'math') ? '2.5' : '1'}
              opacity={isLinkActive('rahim', 'math') ? 1 : 0.25}
              markerEnd={isLinkActive('rahim', 'math') ? 'url(#arrow-active-right)' : 'url(#arrow-right)'}
              className="transition-colors duration-300"
            />

            {/* 3. Karim (x=190, y=145) -> Database (x=310, y=90) */}
            <path
              d="M 190 145 C 250 145, 250 90, 310 90"
              fill="none"
              stroke={isLinkActive('karim', 'db') ? '#fbbf24' : '#334155'}
              strokeWidth={isLinkActive('karim', 'db') ? '2.5' : '1'}
              opacity={isLinkActive('karim', 'db') ? 1 : 0.25}
              markerEnd={isLinkActive('karim', 'db') ? 'url(#arrow-active-right)' : 'url(#arrow-right)'}
              className="transition-colors duration-300"
            />

            {/* 4. Nila (x=190, y=230) -> Mathematics (x=310, y=190) */}
            <path
              d="M 190 230 C 250 230, 250 190, 310 190"
              fill="none"
              stroke={isLinkActive('nila', 'math') ? '#c084fc' : '#334155'}
              strokeWidth={isLinkActive('nila', 'math') ? '2.5' : '1'}
              opacity={isLinkActive('nila', 'math') ? 1 : 0.25}
              markerEnd={isLinkActive('nila', 'math') ? 'url(#arrow-active-right)' : 'url(#arrow-right)'}
              className="transition-colors duration-300"
            />

            {/* 5. Nila (x=190, y=230) -> Networks (x=310, y=290) */}
            <path
              d="M 190 230 C 250 230, 250 290, 310 290"
              fill="none"
              stroke={isLinkActive('nila', 'net') ? '#c084fc' : '#334155'}
              strokeWidth={isLinkActive('nila', 'net') ? '2.5' : '1'}
              opacity={isLinkActive('nila', 'net') ? 1 : 0.25}
              markerEnd={isLinkActive('nila', 'net') ? 'url(#arrow-active-right)' : 'url(#arrow-right)'}
              className="transition-colors duration-300"
            />

            {/* 6. Sami (x=190, y=315) -> Networks (x=310, y=290) */}
            <path
              d="M 190 315 C 250 315, 250 290, 310 290"
              fill="none"
              stroke={isLinkActive('sami', 'net') ? '#a78bfa' : '#334155'}
              strokeWidth={isLinkActive('sami', 'net') ? '2.5' : '1'}
              opacity={isLinkActive('sami', 'net') ? 1 : 0.25}
              markerEnd={isLinkActive('sami', 'net') ? 'url(#arrow-active-right)' : 'url(#arrow-right)'}
              className="transition-colors duration-300"
            />

            {/* Pointer Lines: Teachers -> Courses */}
            {/* Mr. Ali (x=600, y=90) -> Database (x=490, y=90) */}
            <line
              x1="600"
              y1="90"
              x2="490"
              y2="90"
              stroke={isTeacherLinkActive('ali', 'db') ? '#34d399' : '#334155'}
              strokeWidth={isTeacherLinkActive('ali', 'db') ? '2.5' : '1'}
              opacity={isTeacherLinkActive('ali', 'db') ? 1 : 0.25}
              markerEnd={isTeacherLinkActive('ali', 'db') ? 'url(#arrow-active-left)' : 'url(#arrow-left)'}
              className="transition-colors duration-300"
            />

            {/* Ms. Sara (x=600, y=190) -> Mathematics (x=490, y=190) */}
            <line
              x1="600"
              y1="190"
              x2="490"
              y2="190"
              stroke={isTeacherLinkActive('sara', 'math') ? '#34d399' : '#334155'}
              strokeWidth={isTeacherLinkActive('sara', 'math') ? '2.5' : '1'}
              opacity={isTeacherLinkActive('sara', 'math') ? 1 : 0.25}
              markerEnd={isTeacherLinkActive('sara', 'math') ? 'url(#arrow-active-left)' : 'url(#arrow-left)'}
              className="transition-colors duration-300"
            />

            {/* Dr. Kamal (x=600, y=290) -> Networks (x=490, y=290) */}
            <line
              x1="600"
              y1="290"
              x2="490"
              y2="290"
              stroke={isTeacherLinkActive('kamal', 'net') ? '#34d399' : '#334155'}
              strokeWidth={isTeacherLinkActive('kamal', 'net') ? '2.5' : '1'}
              opacity={isTeacherLinkActive('kamal', 'net') ? 1 : 0.25}
              markerEnd={isTeacherLinkActive('kamal', 'net') ? 'url(#arrow-active-left)' : 'url(#arrow-left)'}
              className="transition-colors duration-300"
            />

            {/* 1. Students Column (Cards) */}
            {students.map((s) => {
              const active = isStudentActive(s.id);
              const isDirectlySelected = selected?.type === 'student' && selected.id === s.id;

              return (
                <g
                  key={s.id}
                  onClick={() => setSelected({ type: 'student', id: s.id })}
                  className="cursor-pointer"
                >
                  <rect
                    x="20"
                    y={s.y}
                    width="170"
                    height="50"
                    rx="8"
                    fill={isDirectlySelected ? '#1e1b4b' : active ? '#181d38' : '#101322'}
                    stroke={isDirectlySelected ? '#818cf8' : active ? '#4f46e5' : '#334155'}
                    strokeWidth={isDirectlySelected ? 2 : 1}
                    className="transition-colors duration-200 hover:stroke-indigo-400"
                  />
                  <text x="32" y={s.y + 22} fill={active ? '#ffffff' : '#94a3b8'} fontSize="12" fontWeight="bold" fontFamily="monospace">
                    {s.name}
                  </text>
                  <text x="32" y={s.y + 38} fill="#818cf8" fontSize="10" fontFamily="monospace">
                    {s.code} • {s.dept}
                  </text>
                  <text x="175" y={s.y + 30} fill="#64748b" fontSize="11" textAnchor="end">
                    👉
                  </text>
                </g>
              );
            })}

            {/* 2. Courses Column (Cards) */}
            {courses.map((c) => {
              const active = isCourseActive(c.id);
              const isDirectlySelected = selected?.type === 'course' && selected.id === c.id;

              return (
                <g
                  key={c.id}
                  onClick={() => setSelected({ type: 'course', id: c.id })}
                  className="cursor-pointer"
                >
                  <rect
                    x="310"
                    y={c.y}
                    width="180"
                    height="50"
                    rx="8"
                    fill={isDirectlySelected ? '#083344' : active ? '#0f2942' : '#101322'}
                    stroke={isDirectlySelected ? '#38bdf8' : active ? '#0284c7' : '#334155'}
                    strokeWidth={isDirectlySelected ? 2 : 1}
                    className="transition-colors duration-200 hover:stroke-cyan-400"
                  />
                  <text x="322" y={c.y + 22} fill={active ? '#ffffff' : '#94a3b8'} fontSize="11.5" fontWeight="bold" fontFamily="monospace">
                    {c.name}
                  </text>
                  <text x="322" y={c.y + 38} fill="#38bdf8" fontSize="10" fontFamily="monospace">
                    {c.code}
                  </text>
                  {/* Multi-parent badge indicator on Database course */}
                  {c.id === 'db' && (
                    <text x="478" y={c.y + 38} fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">
                      [M:N Parents]
                    </text>
                  )}
                </g>
              );
            })}

            {/* 3. Teachers Column (Cards) */}
            {teachers.map((t) => {
              const active = isTeacherActive(t.id);
              const isDirectlySelected = selected?.type === 'teacher' && selected.id === t.id;

              return (
                <g
                  key={t.id}
                  onClick={() => setSelected({ type: 'teacher', id: t.id })}
                  className="cursor-pointer"
                >
                  <rect
                    x="600"
                    y={t.y}
                    width="170"
                    height="50"
                    rx="8"
                    fill={isDirectlySelected ? '#064e3b' : active ? '#0d3829' : '#101322'}
                    stroke={isDirectlySelected ? '#34d399' : active ? '#059669' : '#334155'}
                    strokeWidth={isDirectlySelected ? 2 : 1}
                    className="transition-colors duration-200 hover:stroke-emerald-400"
                  />
                  <text x="612" y={t.y + 22} fill={active ? '#ffffff' : '#94a3b8'} fontSize="12" fontWeight="bold" fontFamily="monospace">
                    {t.name}
                  </text>
                  <text x="612" y={t.y + 38} fill="#34d399" fontSize="10" fontFamily="monospace">
                    {t.title}
                  </text>
                  <text x="612" y={t.y + 30} fill="#64748b" fontSize="11">
                    👈
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Dynamic Pointer Explanation Strip */}
      <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] text-xs font-sans leading-relaxed space-y-1.5">
        <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 font-bold">
          <Link2 className="w-3.5 h-3.5" />
          <span>
            {language === 'bn' ? 'সরাসরি মেমোরি পয়েন্টার ট্রেসিং (Pointer Inspection):' : 'Active Network Pointer Traversal:'}
          </span>
        </div>

        {selected?.type === 'student' && selected.id === 'rahim' && (
          <div className="text-zinc-200">
            <strong>Rahim (S-101)</strong> holds pointers to <strong>Database Systems</strong> and <strong>Mathematics</strong>. Notice that <em>Database Systems</em> is also connected to <strong>Mr. Ali</strong>, while <em>Mathematics</em> connects to <strong>Ms. Sara</strong>.
          </div>
        )}

        {selected?.type === 'student' && selected.id === 'karim' && (
          <div className="text-zinc-200">
            <strong>Karim (S-102)</strong> points to <strong>Database Systems</strong>. Both Rahim AND Karim point to the same course without duplicating the course record!
          </div>
        )}

        {selected?.type === 'course' && selected.id === 'db' && (
          <div className="text-zinc-200">
            🎯 <strong>Database Systems</strong> is an owned member with <strong>multiple parent pointers</strong>: students <em>Rahim</em> and <em>Karim</em> (M:N relationship), and instructor <em>Mr. Ali</em>. In a Hierarchical tree, this would cause invalid duplicate course records.
          </div>
        )}

        {(!selected || (selected.type === 'teacher')) && (
          <div className="text-zinc-300">
            <DualText
              en="In the CODASYL Network Model, records are connected via bidirectional circular ring pointers. Each child record can have multiple parent owners."
              bn="কোডাসিল (CODASYL) নেটওয়ার্ক মডেলে প্রতিটি রেকর্ডে পয়েন্টার থাকে। একটি চাইল্ড রেকর্ডের একাধিক প্যারেন্ট ওনার থাকতে পারে, যা M:N সম্পর্ক সরাসরি সমাধান করে।"
            />
          </div>
        )}
      </div>

      {/* Landmark CODASYL Quote */}
      <div className="text-[11px] text-zinc-400 font-mono italic border-t border-white/[0.08] pt-2.5 flex items-center gap-2">
        <span className="text-emerald-400">Pojedini zapisi sadrže pokazivače na druge zapise:</span>
        <span className="text-zinc-300">Individual records contain direct pointers to other records they are connected with.</span>
      </div>
    </div>
  );
}
