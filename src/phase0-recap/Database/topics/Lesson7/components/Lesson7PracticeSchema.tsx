'use client';

import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA, COURSES_DATA, ENROLLMENTS_DATA } from '../types';

export default function Lesson7PracticeSchema() {
  const { language } = useLanguage();
  const [activeTableTab, setActiveTableTab] = useState<'students' | 'courses' | 'enrollments'>('students');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • প্র্যাকটিস ডেটাবেস' : 'Part 1 • Practice Schema'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Our Practice Database: Students, Courses & Enrollments"
              bn="আমাদের প্র্যাকটিস ডেটাবেস: Students, Courses ও Enrollments"
            />
          </h2>
        </div>
      </div>

      <DualText
        as="p"
        className="text-xs text-zinc-300 leading-relaxed font-sans"
        en="To understand advanced queries deeply, we will use this standardized university schema throughout all examples:"
        bn="অ্যাডভান্সড SQL কুয়েরিগুলো গভীরভাবে বুঝতে পুরো লেসনে এই ইউনিভার্সিটি ডেটাবেস স্কিমা ব্যবহার করা হবে:"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTableTab('students')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'students'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>Students</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">6 rows</span>
        </button>
        <button
          onClick={() => setActiveTableTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'courses'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>Courses</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">4 courses</span>
        </button>
        <button
          onClick={() => setActiveTableTab('enrollments')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'enrollments'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>Enrollments</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">8 enrollments</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
        {activeTableTab === 'students' && (
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Student_ID (PK)</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Semester</th>
                <th className="py-2.5 px-3">GPA</th>
                <th className="py-2.5 px-3">Admission_Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {STUDENTS_DATA.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{s.id}</td>
                  <td className="py-2 px-3 text-white font-medium">{s.name}</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">
                    {s.email ?? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                        NULL
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {s.dept}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-zinc-300">{s.semester}</td>
                  <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">{s.admissionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTableTab === 'courses' && (
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Course_ID (PK)</th>
                <th className="py-2.5 px-3">Course_Code</th>
                <th className="py-2.5 px-3">Course_Name</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Credits</th>
                <th className="py-2.5 px-3">Instructor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {COURSES_DATA.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-mono text-amber-300 font-bold">{c.id}</td>
                  <td className="py-2 px-3 font-mono text-cyan-300">{c.code}</td>
                  <td className="py-2 px-3 text-white font-medium">{c.name}</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">{c.dept}</td>
                  <td className="py-2 px-3 font-mono text-purple-300 font-bold">{c.credits} Credits</td>
                  <td className="py-2 px-3 text-zinc-300">{c.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTableTab === 'enrollments' && (
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Enrollment_ID (PK)</th>
                <th className="py-2.5 px-3">Student_ID (FK)</th>
                <th className="py-2.5 px-3">Course_ID (FK)</th>
                <th className="py-2.5 px-3">Semester</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">Enrolled_Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {ENROLLMENTS_DATA.map(e => (
                <tr key={e.enrollmentId} className="hover:bg-slate-800/40">
                  <td className="py-2 px-3 font-mono text-zinc-400">#{e.enrollmentId}</td>
                  <td className="py-2 px-3 font-mono text-cyan-300">{e.studentId}</td>
                  <td className="py-2 px-3 font-mono text-amber-300">{e.courseId}</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">{e.semester}</td>
                  <td className="py-2 px-3 font-mono font-bold text-emerald-400">{e.grade}</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">{e.enrolledAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
