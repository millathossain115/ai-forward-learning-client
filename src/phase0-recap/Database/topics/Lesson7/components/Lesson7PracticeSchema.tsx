'use client';

import React, { useState, useEffect } from 'react';
import { Database, Maximize2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENTS_DATA, COURSES_DATA, ENROLLMENTS_DATA } from '../types';

export default function Lesson7PracticeSchema() {
  const { language } = useLanguage();
  const [activeTableTab, setActiveTableTab] = useState<'students' | 'courses' | 'enrollments'>('students');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isPopupOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPopupOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPopupOpen]);

  return (
    <section className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
            <Database className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn' ? 'পার্ট ১ • প্র্যাকটিস ডেটাবেস' : 'Part 1 • Practice Schema'}
            </span>
            <h2 className="text-lg font-semibold text-zinc-100 mt-0.5">
              <DualText
                as="span"
                en="Our Practice Database: Students, Courses & Enrollments"
                bn="আমাদের প্র্যাকটিস ডেটাবেস: Students, Courses ও Enrollments"
              />
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsPopupOpen(true)}
          title={language === 'bn' ? 'ফুলস্ক্রিন পপ-আপ ভিউ' : 'Open Fullscreen Popup View'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131824] hover:bg-[#1a2130] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>{language === 'bn' ? 'ফুলস্ক্রিন পপ-আপ' : 'Fullscreen Popup'}</span>
        </button>
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
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'students'
              ? 'bg-cyan-600 text-white  '
              : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>Students</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">6 rows</span>
        </button>
        <button
          onClick={() => setActiveTableTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'courses'
              ? 'bg-cyan-600 text-white  '
              : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>Courses</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-cyan-200">4 courses</span>
        </button>
        <button
          onClick={() => setActiveTableTab('enrollments')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTableTab === 'enrollments'
              ? 'bg-cyan-600 text-white  '
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

      {/* Fullscreen Popup Modal */}
      {isPopupOpen && (
        <div
          onClick={() => setIsPopupOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f1220] border border-slate-700 shadow-2xl p-6 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    <DualText
                      as="span"
                      en="Practice Database: Students, Courses & Enrollments"
                      bn="প্র্যাকটিস ডেটাবেস: Students, Courses ও Enrollments"
                    />
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    {language === 'bn' ? 'সবগুলো টেবিল একসাথে বড় ভিউতে দেখুন (Esc চাপলে বন্ধ হবে)' : 'Full schema overview (Press Esc to close)'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPopupOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-cyan-300">1. Students (6 rows)</div>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900 text-zinc-300 font-mono text-xs border-b border-slate-800">
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
                          <td className="py-2 px-3 font-mono text-zinc-300">{s.email ?? <span className="text-amber-300 font-bold">NULL</span>}</td>
                          <td className="py-2 px-3 font-mono text-indigo-300">{s.dept}</td>
                          <td className="py-2 px-3 font-mono text-zinc-300">{s.semester}</td>
                          <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{s.gpa.toFixed(2)}</td>
                          <td className="py-2 px-3 font-mono text-zinc-400">{s.admissionDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-amber-300">2. Courses (4 courses)</div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">Course_ID</th>
                          <th className="py-2.5 px-3">Code</th>
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">Dept</th>
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
                            <td className="py-2 px-3 font-mono text-purple-300 font-bold">{c.credits}</td>
                            <td className="py-2 px-3 text-zinc-300">{c.instructor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-emerald-300">3. Enrollments (8 enrollments)</div>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#14182d]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-zinc-300 font-mono border-b border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3">ID</th>
                          <th className="py-2.5 px-3">Student_ID</th>
                          <th className="py-2.5 px-3">Course_ID</th>
                          <th className="py-2.5 px-3">Semester</th>
                          <th className="py-2.5 px-3">Grade</th>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
