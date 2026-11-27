'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Table as TableIcon,
  Sparkles,
  Layers,
  AlertTriangle,
  RotateCcw,
  UserPlus,
  Hash,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function CompositeKeyTab() {
  const { language } = useLanguage();
  // Composite Key State & Interactive Tester
  const [compositeTestMode, setCompositeTestMode] = useState<'both' | 'student_only' | 'course_only'>('both');
  const [compositeAlert, setCompositeAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);
  const [collidingCompositePair, setCollidingCompositePair] = useState<{ studentId: string; courseId: string } | null>(null);
  const [lastInsertedCompositePair, setLastInsertedCompositePair] = useState<{ studentId: string; courseId: string } | null>(null);
  const [customStudentId, setCustomStudentId] = useState<string>('104');
  const [customCourseId, setCustomCourseId] = useState<string>('CSE201');

  const compositeStudentDirectory: Record<string, string> = {
    '101': 'Rahim',
    '102': 'Karim',
    '103': 'Nila',
    '104': 'Afsana',
    '105': 'Tanvir',
  };

  const compositeCourseDirectory: Record<string, string> = {
    'CSE101': 'Structured Programming',
    'CSE201': 'Database Systems',
    'MAT101': 'Linear Algebra',
    'CSE301': 'Algorithms',
  };

  const initialEnrollments = [
    { studentId: '101', studentName: 'Rahim', courseId: 'CSE101', courseName: 'Structured Programming', semester: 'Spring 2026', grade: 'A' },
    { studentId: '101', studentName: 'Rahim', courseId: 'CSE201', courseName: 'Database Systems', semester: 'Spring 2026', grade: 'A-' },
    { studentId: '102', studentName: 'Karim', courseId: 'CSE101', courseName: 'Structured Programming', semester: 'Spring 2026', grade: 'B+' },
    { studentId: '102', studentName: 'Karim', courseId: 'MAT101', courseName: 'Linear Algebra', semester: 'Summer 2026', grade: 'A' },
    { studentId: '103', studentName: 'Nila', courseId: 'CSE101', courseName: 'Structured Programming', semester: 'Spring 2026', grade: 'A+' },
  ];
  const [enrollments, setEnrollments] = useState(initialEnrollments);

  const handleTestCompositeCollision = (studentId: string, courseId: string) => {
    const studentName = compositeStudentDirectory[studentId] || `Student ${studentId}`;
    const courseName = compositeCourseDirectory[courseId] || `Course ${courseId}`;
    const existingIndex = enrollments.findIndex((e) => e.studentId === studentId && e.courseId === courseId);

    if (existingIndex !== -1) {
      setCollidingCompositePair({ studentId, courseId });
      setLastInsertedCompositePair(null);
      setCompositeAlert({
        type: 'error',
        msgEn: `❌ Composite Primary Key Violation! Student "${studentName}" (${studentId}) is ALREADY enrolled in Course "${courseName}" (${courseId}) at Row #${existingIndex + 1}! The composite pair (${studentId}, ${courseId}) cannot be duplicated in the ENROLLMENT table.`,
        msgBn: `❌ কম্পোজিট প্রাইমারি কি লঙ্ঘন! শিক্ষার্থী "${studentName}" (${studentId}) ইতিমধ্যে #${existingIndex + 1} নম্বর সারিতে "${courseName}" (${courseId}) কোর্সে নিবন্ধিত! এই যৌথ জোড়া (${studentId}, ${courseId}) ENROLLMENT টেবিলে দ্বিতীয়বার ইনসার্ট হতে পারে না।`,
      });
    } else {
      setCollidingCompositePair(null);
      setLastInsertedCompositePair({ studentId, courseId });
      const newEnrollment = {
        studentId,
        studentName,
        courseId,
        courseName,
        semester: 'Fall 2026',
        grade: 'Enrolled',
      };
      setEnrollments((prev) => [...prev, newEnrollment]);
      setCompositeAlert({
        type: 'success',
        msgEn: `✓ Success! The composite pair (${studentId}, ${courseId}) is unique. Student "${studentName}" was successfully enrolled in "${courseName}" and appended as Row #${enrollments.length + 1} below!`,
        msgBn: `✓ সফল! যৌথ জোড়া (${studentId}, ${courseId}) সম্পূর্ণ ইউনিক। শিক্ষার্থী "${studentName}" সফলভাবে "${courseName}" কোর্সে নিবন্ধিত হয়েছে এবং নিচের টেবিলে #${enrollments.length + 1} নম্বর সারি হিসেবে যুক্ত হয়েছে!`,
      });
    }
  };

  const handleResetEnrollments = () => {
    setEnrollments(initialEnrollments);
    setCompositeAlert(null);
    setCollidingCompositePair(null);
    setLastInsertedCompositePair(null);
  };

  return (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-pink-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  <Hash className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="6. Composite Key (যৌথ বা কম্পোজিট কী)"
                    bn="৬. কম্পোজিট বা যৌথ কী (Composite Key)"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="When a single attribute cannot identify rows uniquely, multiple columns unite to form the primary identifier."
                  bn="যখন কোনো একক কলাম প্রতিটি রেকর্ডকে আলাদা করতে ব্যর্থ হয়, তখন একাধিক কলাম একত্র হয়ে অনন্য কী গঠন করে।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              ≥ 2 Attributes Combined
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800/80 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="The Junction Table Problem (Many-to-Many Relationships):"
                bn="জাংশন টেবিলের সমস্যা (Many-to-Many সম্পর্ক):"
              />
            </div>
            <DualText
              en="A Composite Key is a Primary Key or Candidate Key composed of two or more attributes. In relational design, many-to-many relationships (e.g. Students enrolling in multiple Courses, and Courses containing multiple Students) are modeled using a Junction Table (like ENROLLMENT). In this table, Student_ID repeats because a student takes several courses. Course_ID repeats because a course has many students. But the combined pair { Student_ID, Course_ID } is strictly unique!"
              bn="কম্পোজিট কী হলো দুই বা ততোধিক অ্যাট্রিবিউট বা কলামের সমন্বয়ে গঠিত প্রাইমারি কী। রিলেশনাল ডেটাবেসে Many-to-Many সম্পর্ক (যেমন: একজন শিক্ষার্থী একাধিক কোর্স নেয়, আবার একটি কোর্সে বহু শিক্ষার্থী থাকে) সমাধান করতে একটি Junction Table (যেমন: ENROLLMENT) ব্যবহার করা হয়। এখানে Student_ID কলামে ডুপ্লিকেট থাকে কারণ এক ছাত্র একাধিক কোর্স নেয়; আবার Course_ID কলামেও ডুপ্লিকেট থাকে কারণ এক কোর্সে বহু ছাত্র পড়ে। কিন্তু এদের যৌথ জোড়া { Student_ID, Course_ID } সর্বদা ১০০% অনন্য বা ইউনিক হয়!"
            />
          </div>

          {/* Interactive Column Mode Switcher & Collision Simulator */}
          <div className="p-4 rounded-xl bg-[#0a0d1a] border border-pink-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <DualText
                  en="Attribute Uniqueness Tester (Compare Single vs Composite):"
                  bn="অ্যাট্রিবিউট ইউনিকনেস পরীক্ষক (একক বনাম যৌথ তুলনা করুন):"
                />
              </span>
              <button
                onClick={handleResetEnrollments}
                className="self-start sm:self-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                {language === 'bn' ? 'টেবিল রিসেট' : 'Reset Enrollments'}
              </button>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নিচের মোড পরিবর্তন করে দেখুন কেন একক কলাম ব্যর্থ হয় কিন্তু যৌথ কম্বিনেশন সফল হয়:'
                  : 'Switch modes to see why individual columns fail uniqueness while the composite pair succeeds:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCompositeTestMode('student_only')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    compositeTestMode === 'student_only'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-lg shadow-rose-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-pink-500/40 hover:text-zinc-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Test Student_ID Alone {language === 'bn' ? '(ব্যর্থ)' : '(Fails)'}
                </button>

                <button
                  onClick={() => setCompositeTestMode('course_only')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    compositeTestMode === 'course_only'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-lg shadow-rose-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-pink-500/40 hover:text-zinc-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Test Course_ID Alone {language === 'bn' ? '(ব্যর্থ)' : '(Fails)'}
                </button>

                <button
                  onClick={() => setCompositeTestMode('both')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    compositeTestMode === 'both'
                      ? 'bg-pink-500/20 border-pink-400 text-pink-200 font-bold shadow-lg shadow-pink-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-pink-500/40 hover:text-zinc-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Test {`{ Student_ID + Course_ID }`} Composite {language === 'bn' ? '(সফল!)' : '(100% Unique!)'}
                </button>
              </div>
            </div>

            {/* Live Interactive Collision Tester Buttons */}
            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-semibold text-zinc-300 font-sans flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  {language === 'bn'
                    ? 'টেস্ট ১: রিয়েল-টাইম কুইক সিনারিও (ডুপ্লিকেট কোলাইশন টেস্ট):'
                    : 'Test 1: Real-Time Quick Scenarios (Duplicate Collision Testing):'}
                </span>
                <button
                  onClick={handleResetEnrollments}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-400 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors w-fit"
                  title="Reset enrollments table to initial 5 rows"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'টেবিল রিসেট' : 'Reset Table'}
                </button>
              </div>

              {/* Scenario Quick Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(() => {
                  const isRahimDuplicate = enrollments.some((e) => e.studentId === '101' && e.courseId === 'CSE101');
                  return (
                    <button
                      onClick={() => handleTestCompositeCollision('101', 'CSE101')}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                        isRahimDuplicate
                          ? 'border-rose-500/50 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40'
                          : 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {isRahimDuplicate ? (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <span className="truncate">Rahim (101) → CSE101</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                          isRahimDuplicate
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isRahimDuplicate
                          ? language === 'bn'
                            ? 'কোলাইশন টেস্ট'
                            : 'Collision'
                          : language === 'bn'
                          ? 'বৈধ ইনসার্ট'
                          : 'Valid Insert'}
                      </span>
                    </button>
                  );
                })()}

                {(() => {
                  const isNilaEnrolled = enrollments.some((e) => e.studentId === '103' && e.courseId === 'CSE201');
                  return (
                    <button
                      onClick={() => handleTestCompositeCollision('103', 'CSE201')}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                        isNilaEnrolled
                          ? 'border-rose-500/50 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40'
                          : 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {isNilaEnrolled ? (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <span className="truncate">Nila (103) → CSE201</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                          isNilaEnrolled
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isNilaEnrolled
                          ? language === 'bn'
                            ? 'ডুপ্লিকেট হবে'
                            : 'Already In'
                          : language === 'bn'
                          ? 'বৈধ ইনসার্ট'
                          : 'Valid Insert'}
                      </span>
                    </button>
                  );
                })()}

                {(() => {
                  const isKarimEnrolled = enrollments.some((e) => e.studentId === '102' && e.courseId === 'CSE201');
                  return (
                    <button
                      onClick={() => handleTestCompositeCollision('102', 'CSE201')}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all cursor-pointer flex items-center justify-between gap-2 text-left ${
                        isKarimEnrolled
                          ? 'border-rose-500/50 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40'
                          : 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {isKarimEnrolled ? (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        <span className="truncate">Karim (102) → CSE201</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                          isKarimEnrolled
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isKarimEnrolled
                          ? language === 'bn'
                            ? 'ডুপ্লিকেট হবে'
                            : 'Already In'
                          : language === 'bn'
                          ? 'বৈধ ইনসার্ট'
                          : 'Valid Insert'}
                      </span>
                    </button>
                  );
                })()}
              </div>

              {/* Custom Combination Interactive Sandbox */}
              <div className="p-3 rounded-lg bg-[#0c0e1a] border border-slate-800/80 space-y-2">
                <span className="text-[11px] text-zinc-400 font-sans block font-semibold">
                  {language === 'bn'
                    ? 'টেস্ট ২: কাস্টম শিক্ষার্থী ও কোর্স কম্বিনেশন বিল্ডার (যেকোনো জোড়া টেস্ট করুন):'
                    : 'Test 2: Custom Student & Course Combo Builder (Test Any Pair):'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={customStudentId}
                    onChange={(e) => setCustomStudentId(e.target.value)}
                    className="bg-[#121629] border border-slate-700 text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-pink-500 focus:outline-none font-mono"
                  >
                    {Object.entries(compositeStudentDirectory).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name} ({id})
                      </option>
                    ))}
                  </select>

                  <span className="text-zinc-500 text-xs font-mono">+</span>

                  <select
                    value={customCourseId}
                    onChange={(e) => setCustomCourseId(e.target.value)}
                    className="bg-[#121629] border border-slate-700 text-zinc-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-pink-500 focus:outline-none font-mono"
                  >
                    {Object.entries(compositeCourseDirectory).map(([id, name]) => (
                      <option key={id} value={id}>
                        {id}: {name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleTestCompositeCollision(customStudentId, customCourseId)}
                    className="px-3.5 py-1.5 rounded-lg border border-pink-500/50 bg-pink-600/20 text-pink-200 hover:bg-pink-600/30 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-pink-400" />
                    {language === 'bn' ? 'কম্বিনেশন ইনসার্ট টেস্ট' : 'Test Insert Combination'}
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Alert Banner */}
            {compositeAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  compositeAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-sans'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-sans'
                }`}
              >
                {compositeAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {compositeAlert.type === 'error'
                      ? language === 'bn'
                        ? 'কম্পোজিট প্রাইমারি কি লঙ্ঘন (ডুপ্লিকেট বাতিল)'
                        : 'Composite Primary Key Violation (Duplicate Pair Rejected)'
                      : language === 'bn'
                      ? 'অনন্য কম্পোজিট জোড়া সফলভাবে গৃহীত হয়েছে'
                      : 'Distinct Composite Key Accepted & Row Appended'}
                  </div>
                  <div className="text-[11px] opacity-90 leading-relaxed">
                    {language === 'bn' ? compositeAlert.msgBn : compositeAlert.msgEn}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live ENROLLMENT Junction Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-zinc-200 font-bold">
                <TableIcon className="w-4 h-4 text-pink-400" />
                {language === 'bn'
                  ? 'লাইভ ENROLLMENT টেবিল (Junction Table):'
                  : 'Live ENROLLMENT Table (Junction Table):'}
              </span>
              <span className="text-[11px] text-zinc-500">
                {enrollments.length} {language === 'bn' ? 'টি এনরোলমেন্ট রেকর্ড' : 'Enrollment Records'}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#090b14]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                    <th className="py-2.5 px-3 text-center w-12 text-zinc-500">#</th>

                    {/* Column: Student_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        compositeTestMode === 'student_only'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : compositeTestMode === 'both'
                          ? 'bg-pink-950/30 text-pink-300 border-b-2 border-pink-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Student_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            compositeTestMode === 'both'
                              ? 'bg-pink-500/30 text-pink-200'
                              : 'bg-slate-800 text-zinc-400'
                          }`}
                        >
                          {compositeTestMode === 'both' ? '[Part 1 of PK]' : '[FK]'}
                        </span>
                      </div>
                    </th>

                    <th className="py-2.5 px-3 text-zinc-400">Student Name</th>

                    {/* Column: Course_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        compositeTestMode === 'course_only'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : compositeTestMode === 'both'
                          ? 'bg-pink-950/30 text-pink-300 border-b-2 border-pink-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Course_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            compositeTestMode === 'both'
                              ? 'bg-pink-500/30 text-pink-200'
                              : 'bg-slate-800 text-zinc-400'
                          }`}
                        >
                          {compositeTestMode === 'both' ? '[Part 2 of PK]' : '[FK]'}
                        </span>
                      </div>
                    </th>

                    <th className="py-2.5 px-3 text-zinc-400">Course Name</th>
                    <th className="py-2.5 px-3 text-zinc-400">Semester</th>
                    <th className="py-2.5 px-3 text-zinc-400">Grade</th>

                    {/* Mode Evaluation Result */}
                    <th className="py-2.5 px-3 text-right bg-slate-900/80 text-pink-300 border-l border-slate-800">
                      {language === 'bn' ? 'ইউনিকনেস নিরীক্ষা' : 'Uniqueness Audit'}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                  {enrollments.map((enr, idx) => {
                    const isDupStudent =
                      compositeTestMode === 'student_only' &&
                      enrollments.filter((e) => e.studentId === enr.studentId).length > 1;

                    const isDupCourse =
                      compositeTestMode === 'course_only' &&
                      enrollments.filter((e) => e.courseId === enr.courseId).length > 1;

                    const isColliding =
                      collidingCompositePair?.studentId === enr.studentId &&
                      collidingCompositePair?.courseId === enr.courseId;

                    const isJustInserted =
                      lastInsertedCompositePair?.studentId === enr.studentId &&
                      lastInsertedCompositePair?.courseId === enr.courseId;

                    return (
                      <tr
                        key={`${enr.studentId}-${enr.courseId}-${idx}`}
                        className={`transition-all duration-300 ${
                          isColliding
                            ? 'bg-rose-950/60 ring-2 ring-rose-500/80 animate-pulse text-white'
                            : isJustInserted
                            ? 'bg-emerald-950/50 ring-2 ring-emerald-500/70 text-white'
                            : idx % 2 === 0
                            ? 'bg-[#0f1224]/30'
                            : 'bg-[#0c0e18]'
                        } ${
                          isDupStudent || isDupCourse
                            ? 'bg-rose-950/20'
                            : compositeTestMode === 'both' && !isColliding && !isJustInserted
                            ? 'hover:bg-pink-950/10'
                            : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-center text-zinc-500 border-r border-slate-800/60">
                          {idx + 1}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            isColliding
                              ? 'bg-rose-900/60 text-rose-100'
                              : isJustInserted
                              ? 'bg-emerald-900/50 text-emerald-100'
                              : compositeTestMode === 'student_only'
                              ? 'bg-rose-950/30 text-rose-300'
                              : compositeTestMode === 'both'
                              ? 'bg-pink-950/20 text-pink-300'
                              : 'text-zinc-300'
                          }`}
                        >
                          {enr.studentId}
                        </td>

                        <td className="py-2 px-3 text-zinc-300">{enr.studentName}</td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            isColliding
                              ? 'bg-rose-900/60 text-rose-100'
                              : isJustInserted
                              ? 'bg-emerald-900/50 text-emerald-100'
                              : compositeTestMode === 'course_only'
                              ? 'bg-rose-950/30 text-rose-300'
                              : compositeTestMode === 'both'
                              ? 'bg-pink-950/20 text-pink-300'
                              : 'text-zinc-300'
                          }`}
                        >
                          {enr.courseId}
                        </td>

                        <td className="py-2 px-3 text-zinc-300">{enr.courseName}</td>
                        <td className="py-2 px-3 text-zinc-400">{enr.semester}</td>
                        <td className="py-2 px-3 text-zinc-300 font-bold">{enr.grade}</td>

                        {/* Audit Result Column */}
                        <td className="py-2 px-3 text-right border-l border-slate-800 font-mono text-[11px]">
                          {isColliding ? (
                            <span className="text-rose-300 font-bold flex items-center justify-end gap-1 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                              {language === 'bn'
                                ? `ডুপ্লিকেট টার্গেট (Row #${idx + 1})`
                                : `Collision Target (Row #${idx + 1})`}
                            </span>
                          ) : isJustInserted ? (
                            <span className="text-emerald-300 font-bold flex items-center justify-end gap-1 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              {language === 'bn'
                                ? `সফলভাবে যুক্ত হয়েছে (Row #${idx + 1})`
                                : `Just Inserted (Row #${idx + 1})`}
                            </span>
                          ) : compositeTestMode === 'student_only' ? (
                            <span className="text-rose-400 font-bold flex items-center justify-end gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              {language === 'bn'
                                ? `Student ${enr.studentId} ডুপ্লিকেট!`
                                : `ID ${enr.studentId} Repeats!`}
                            </span>
                          ) : compositeTestMode === 'course_only' ? (
                            <span className="text-rose-400 font-bold flex items-center justify-end gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              {language === 'bn'
                                ? `${enr.courseId} ডুপ্লিকেট!`
                                : `${enr.courseId} Repeats!`}
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              ({enr.studentId}, {enr.courseId}){' '}
                              <span className="text-[9px] bg-emerald-500/20 px-1 rounded text-emerald-200">
                                100% Unique
                              </span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Generated SQL DDL Schema */}
          <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                {language === 'bn'
                  ? 'লাইভ SQL টেবিল স্কিমা (Composite Primary Key সিনট্যাক্স):'
                  : 'Live Generated SQL Schema (Composite Primary Key Syntax):'}
              </span>
              <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-pink-300 font-bold">ENROLLMENT</span> (<br />
              {'  '}Student_ID <span className="text-cyan-400">VARCHAR(10)</span>,<br />
              {'  '}Course_ID  <span className="text-cyan-400">VARCHAR(10)</span>,<br />
              {'  '}Semester   <span className="text-cyan-400">VARCHAR(20)</span>,<br />
              {'  '}Grade      <span className="text-cyan-400">VARCHAR(5)</span>,<br />
              {'  '}<span className="text-zinc-500">-- Composite Primary Key defined over TWO columns:</span><br />
              {'  '}<span className="text-pink-400 font-bold">PRIMARY KEY</span> (<span className="text-white font-bold">Student_ID</span>, <span className="text-white font-bold">Course_ID</span>),<br />
              {'  '}<span className="text-zinc-500">-- Both columns also act as Foreign Keys to their respective tables:</span><br />
              {'  '}<span className="text-emerald-400 font-bold">FOREIGN KEY</span> (Student_ID) <span className="text-emerald-400 font-bold">REFERENCES</span> STUDENT(Student_ID),<br />
              {'  '}<span className="text-emerald-400 font-bold">FOREIGN KEY</span> (Course_ID)  <span className="text-emerald-400 font-bold">REFERENCES</span> COURSE(Course_ID)<br />
              );
            </pre>
          </div>
        </div>
  );
}
