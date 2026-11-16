'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  Server,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Compass,
  CheckCircle2,
  Calculator,
  Building2,
  CreditCard,
  Layers,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseLesson1TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson1Topic({ onNavigate }: DatabaseLesson1TopicProps) {
  // Part 1: Interactive Raw Data Inspector
  const [inspectedRawToken, setInspectedRawToken] = useState<string | null>(null);

  // Part 2: Interactive Average Calculation
  const [mark1, setMark1] = useState(80);
  const [mark2, setMark2] = useState(90);
  const [mark3, setMark3] = useState(70);

  // Part 5: Practical Bank Balance Simulation Flow
  const [bankBalanceRequested, setBankBalanceRequested] = useState(false);
  const [bankStep, setBankStep] = useState<number>(0);

  const runBankSimulation = () => {
    setBankBalanceRequested(true);
    setBankStep(1);
    setTimeout(() => setBankStep(2), 600);
    setTimeout(() => setBankStep(3), 1200);
    setTimeout(() => setBankStep(4), 1800);
  };

  const calculatedTotal = mark1 + mark2 + mark3;
  const calculatedAvg = (calculatedTotal / 3).toFixed(1);
  const calculatedGrade =
    Number(calculatedAvg) >= 80 ? 'A+ (Distinction)' : Number(calculatedAvg) >= 70 ? 'A (Excellent)' : 'B (Good)';

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2 animate-in fade-in duration-300 text-zinc-100 font-sans">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d1020] to-[#070810] border border-[#202744] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Lesson 1 of your DBMS journey • Beginner level
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Start from absolute zero
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Lesson 1: Understanding Data, Information, Database, and DBMS
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              Welcome to your first lesson! Imagine you have never heard the word &ldquo;database&rdquo; before.
              By the end of this lesson, you will master four fundamental concepts: <strong>Data</strong>, <strong>Information</strong>, <strong>Database</strong>, and <strong>DBMS</strong> through real-world everyday analogies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate?.('backend-lesson2')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Next Lesson: Lesson 2 (Database Models)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('backend-basics')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Database 101 Basics</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Quick Preview */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { title: '1. Data', desc: 'Raw facts, numbers, observations without context' },
            { title: '2. Information', desc: 'Processed, organized data with clear meaning' },
            { title: '3. Database', desc: 'An organized repository of related tables' },
            { title: '4. DBMS', desc: 'The software engine managing the database' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#101322] border border-slate-800 space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-400">{item.title}</span>
              <p className="text-[11px] text-zinc-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS DATA?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 1 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is Data? (ডেটা কী?)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            First, let&apos;s understand the word <strong>Data</strong>.
            <br />
            <strong>Data</strong> means <em>raw facts, figures, or observations</em> that have not yet been processed or organized to provide meaningful context.
          </p>

          {/* Interactive Raw Data Example Box */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-950 space-y-4">
            <h3 className="text-xs font-bold text-indigo-300 uppercase font-mono flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Imagine I give you these 5 isolated values:
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {[
                { val: '101', meaning: 'Could be a Student ID, a room number, or an invoice code.' },
                { val: 'Rahim', meaning: 'Could be a student name, teacher name, or customer name.' },
                { val: '22', meaning: 'Could be age in years, attendance days, or marks scored.' },
                { val: 'CSE', meaning: 'Could be department, course code, or an abbreviation.' },
                { val: '3.80', meaning: 'Could be a CGPA, hourly wage, or price of an item.' },
              ].map((token) => (
                <button
                  key={token.val}
                  onClick={() => setInspectedRawToken(token.val)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                    inspectedRawToken === token.val
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                      : 'bg-[#101324] border-slate-700 text-zinc-300 hover:border-slate-500'
                  }`}
                >
                  &ldquo;{token.val}&rdquo;
                </button>
              ))}
            </div>

            {inspectedRawToken ? (
              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 font-mono">
                💡 <strong>Inspecting &ldquo;{inspectedRawToken}&rdquo;:</strong>{' '}
                {
                  [
                    { val: '101', meaning: 'Without column headers or labels, 101 is just an isolated number. It has no definite meaning on its own.' },
                    { val: 'Rahim', meaning: 'A text string. Without context, we do not know if Rahim is an employee, a student, or a patient.' },
                    { val: '22', meaning: 'Could be an age, a score, or an item quantity. Data alone lacks interpretation.' },
                    { val: 'CSE', meaning: 'Three letters. Does it mean Computer Science & Engineering, or something else?' },
                    { val: '3.80', meaning: 'A decimal value. It only becomes useful information when labeled as CGPA out of 4.00.' },
                  ].find((t) => t.val === inspectedRawToken)?.meaning
                }
              </div>
            ) : (
              <p className="text-[11px] text-zinc-500 font-mono">
                👆 Click any raw data token above to see why raw facts lack complete meaning without context.
              </p>
            )}

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-zinc-300 leading-relaxed">
              If I simply give you these five values without explaining what they represent, you might not fully understand them. That is because they are just <strong>raw data</strong>.
            </div>
          </div>

          {/* Everyday Examples of Data */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
              More examples of raw data in daily life:
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2.5 px-4 font-bold text-indigo-400 w-1/3">Situation</th>
                    <th className="py-2.5 px-4 font-bold text-amber-400">Raw Data Elements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  <tr><td className="py-2.5 px-4 font-bold text-white">School / University</td><td className="py-2.5 px-4">Student names, Roll numbers, Raw exam marks</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold text-white">Bank</td><td className="py-2.5 px-4">Account numbers, Raw transaction amounts ($50, -$20)</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold text-white">Hospital</td><td className="py-2.5 px-4">Patient IDs, Blood pressure digits (120, 80), Body temperatures</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold text-white">E-Commerce / Shopping</td><td className="py-2.5 px-4">Product SKUs, Item quantities, Currency digits</td></tr>
                  <tr><td className="py-2.5 px-4 font-bold text-white">Weather Station</td><td className="py-2.5 px-4">Sensor readings: 31°C, 88% humidity, 1013 hPa pressure</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: WHAT IS INFORMATION?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 2 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is Information? (ইনফরমেশন বা তথ্য কী?)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Now let&apos;s see what happens when data is processed.
            <br />
            <strong>Information</strong> is data that has been <em>processed, organized, structured, or presented</em> in a given context to make it useful and meaningful.
          </p>

          {/* Interactive Processing Pipeline */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-950 space-y-5">
            <h3 className="text-xs font-bold text-cyan-300 uppercase font-mono flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              Interactive Pipeline: Turning Raw Marks into Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Subject 1 (Math):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mark1}
                  onChange={(e) => setMark1(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="w-full bg-[#0c0e18] border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Subject 2 (Science):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mark2}
                  onChange={(e) => setMark2(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="w-full bg-[#0c0e18] border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Subject 3 (English):</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={mark3}
                  onChange={(e) => setMark3(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="w-full bg-[#0c0e18] border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Visual Step-by-Step Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-amber-900/40 text-center space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">Step 1: Raw Data</span>
                <p className="text-sm font-mono font-bold text-white">{mark1}, {mark2}, {mark3}</p>
                <span className="text-[10px] text-zinc-500">Unprocessed individual scores</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0e18] border border-indigo-900/40 text-center space-y-1">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Step 2: Processing</span>
                <p className="text-xs font-mono text-indigo-300">Sum = {calculatedTotal}</p>
                <p className="text-xs font-mono text-indigo-300">Average = {calculatedTotal} ÷ 3</p>
                <span className="text-[10px] text-zinc-500">Mathematical computation</span>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 text-center space-y-1 ring-1 ring-cyan-500/30">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Step 3: Information</span>
                <p className="text-sm font-mono font-bold text-cyan-300">Avg: {calculatedAvg}% • {calculatedGrade}</p>
                <span className="text-[10px] text-cyan-400 font-semibold">Actionable &amp; meaningful result!</span>
              </div>
            </div>
          </div>

          {/* Data vs Information Comparison Table */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
              Data vs Information: Direct Comparison
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2.5 px-4 font-bold text-amber-400 w-1/4">Aspect</th>
                    <th className="py-2.5 px-4 font-bold text-amber-300 w-1/3">Data (ডেটা)</th>
                    <th className="py-2.5 px-4 font-bold text-cyan-400">Information (তথ্য)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Meaning</td>
                    <td className="py-2.5 px-4">Raw facts and figures without context</td>
                    <td className="py-2.5 px-4 text-cyan-300 font-medium">Processed data that conveys clear meaning</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Form</td>
                    <td className="py-2.5 px-4">Unorganized, isolated values</td>
                    <td className="py-2.5 px-4 text-cyan-300 font-medium">Organized, structured, and contextualized</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Dependability</td>
                    <td className="py-2.5 px-4">Does not depend on information</td>
                    <td className="py-2.5 px-4 text-cyan-300 font-medium">Completely depends on underlying data</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Example</td>
                    <td className="py-2.5 px-4">80, 90, 70</td>
                    <td className="py-2.5 px-4 text-cyan-300 font-medium">Average score is 80 (Grade A)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: WHAT IS A DATABASE?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 3 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a Database? (ডেটাবেস কী?)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Now that you know what data is, ask yourself: <em>Where do we store all this data?</em>
            <br />
            A <strong>database</strong> is an organized collection of interrelated data stored so that it can be easily accessed, managed, and retrieved.
          </p>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-300 leading-relaxed">
            <strong>Key Insight:</strong> A database does not just contain one single table. In a real-world system like a university, you have multiple related tables working together seamlessly!
          </div>

          {/* 4 University Tables Demo */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" />
              University Database: 4 Interrelated Tables
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Table 1: Students */}
              <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5" /> Table 1: Students
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Entities: Student records</span>
                </div>
                <div className="overflow-x-auto text-[11px] font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-zinc-400 border-b border-slate-800/80">
                        <th className="py-1 px-2">StudentID</th>
                        <th className="py-1 px-2">Name</th>
                        <th className="py-1 px-2">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                      <tr><td className="py-1 px-2 font-bold text-indigo-400">101</td><td className="py-1 px-2">Rahim</td><td className="py-1 px-2">CSE</td></tr>
                      <tr><td className="py-1 px-2 font-bold text-indigo-400">102</td><td className="py-1 px-2">Karim</td><td className="py-1 px-2">BBA</td></tr>
                      <tr><td className="py-1 px-2 font-bold text-indigo-400">103</td><td className="py-1 px-2">Nila</td><td className="py-1 px-2">EEE</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: Courses */}
              <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5" /> Table 2: Courses
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Entities: Academic courses</span>
                </div>
                <div className="overflow-x-auto text-[11px] font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-zinc-400 border-b border-slate-800/80">
                        <th className="py-1 px-2">CourseID</th>
                        <th className="py-1 px-2">CourseTitle</th>
                        <th className="py-1 px-2">Credits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                      <tr><td className="py-1 px-2 font-bold text-cyan-400">CSE101</td><td className="py-1 px-2">Intro to Programming</td><td className="py-1 px-2">3</td></tr>
                      <tr><td className="py-1 px-2 font-bold text-cyan-400">CSE201</td><td className="py-1 px-2">Database Systems</td><td className="py-1 px-2">3</td></tr>
                      <tr><td className="py-1 px-2 font-bold text-cyan-400">EEE101</td><td className="py-1 px-2">Basic Electrical Eng</td><td className="py-1 px-2">4</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 3: Teachers */}
              <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5" /> Table 3: Teachers / Instructors
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Entities: Faculty members</span>
                </div>
                <div className="overflow-x-auto text-[11px] font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-zinc-400 border-b border-slate-800/80">
                        <th className="py-1 px-2">TeacherID</th>
                        <th className="py-1 px-2">Name</th>
                        <th className="py-1 px-2">Specialization</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                      <tr><td className="py-1 px-2 font-bold text-emerald-400">T-01</td><td className="py-1 px-2">Dr. Hasan</td><td className="py-1 px-2">Distributed Databases</td></tr>
                      <tr><td className="py-1 px-2 font-bold text-emerald-400">T-02</td><td className="py-1 px-2">Prof. Farhana</td><td className="py-1 px-2">Marketing Analytics</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 4: Enrollments (Connecting Table) */}
              <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-pink-400 font-mono flex items-center gap-1.5">
                    <TableIcon className="w-3.5 h-3.5" /> Table 4: Enrollments (Relationship)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Connecting Student &amp; Course</span>
                </div>
                <div className="overflow-x-auto text-[11px] font-mono">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-zinc-400 border-b border-slate-800/80">
                        <th className="py-1 px-2">StudentID</th>
                        <th className="py-1 px-2">CourseID</th>
                        <th className="py-1 px-2">Semester</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                      <tr><td className="py-1 px-2 text-indigo-400 font-bold">101</td><td className="py-1 px-2 text-cyan-400 font-bold">CSE201</td><td className="py-1 px-2">Spring 2026</td></tr>
                      <tr><td className="py-1 px-2 text-indigo-400 font-bold">102</td><td className="py-1 px-2 text-cyan-400 font-bold">CSE101</td><td className="py-1 px-2">Spring 2026</td></tr>
                      <tr><td className="py-1 px-2 text-indigo-400 font-bold">103</td><td className="py-1 px-2 text-cyan-400 font-bold">EEE101</td><td className="py-1 px-2">Spring 2026</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4: WHAT IS A DBMS?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 4 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a DBMS? (ডিবিএমএস কী?)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Now comes the critical distinction.
            <br />
            <strong>DBMS</strong> stands for <strong>Database Management System</strong>.
            <br />
            A database by itself is just a collection of organized files sitting on disk. You need a dedicated, powerful software engine to create, manage, query, modify, and protect that data. That software engine is the <strong>DBMS</strong>!
          </p>

          {/* Library Analogy Visual */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12172d] to-[#0c0e1a] border border-indigo-900/40 space-y-4">
            <h3 className="text-xs font-mono font-bold text-indigo-300 uppercase flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              The Classic Library Analogy:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#0e1122] border border-amber-900/40 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">1. The Books</span>
                <h4 className="text-sm font-bold text-white">Database</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The actual physical books and journals stored neatly across the library shelves.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1122] border border-emerald-900/40 space-y-1.5 ring-1 ring-emerald-500/30">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">2. The Librarian &amp; Software</span>
                <h4 className="text-sm font-bold text-white">DBMS</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  The person and system who registers books, tells you where a book is in 2 seconds, and stops book theft.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0e1122] border border-cyan-900/40 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">3. The Readers</span>
                <h4 className="text-sm font-bold text-white">Users &amp; Applications</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Students and teachers requesting books, borrowing them, or searching catalogs.
                </p>
              </div>
            </div>
          </div>

          {/* Popular DBMS Systems Grid */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
              Popular DBMS Software in the Industry:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: 'MySQL', type: 'Relational DBMS', desc: 'World’s most popular open-source SQL database for web apps.' },
                { name: 'PostgreSQL', type: 'Relational DBMS', desc: 'Advanced enterprise database supporting JSONB & AI vectors.' },
                { name: 'Oracle Database', type: 'Relational DBMS', desc: 'High-performance database for banks and large corporations.' },
                { name: 'MongoDB', type: 'Document Database', desc: 'Leading NoSQL database storing flexible JSON-like documents.' },
              ].map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-white font-mono">{d.name}</span>
                  <span className="text-[10px] font-mono text-indigo-400 block">{d.type}</span>
                  <p className="text-[11px] text-zinc-400">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: DATABASE VS DBMS - PRACTICAL BANK FLOW
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 5 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database vs DBMS: What&apos;s the Difference?</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          This is one of the most important foundational differences to understand before going further:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                <th className="py-2.5 px-4 font-bold text-purple-400 w-1/2">Database</th>
                <th className="py-2.5 px-4 font-bold text-emerald-400 w-1/2">DBMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr><td className="py-2.5 px-4">A collection of organized data</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Software used to manage databases</td></tr>
              <tr><td className="py-2.5 px-4">Contains the actual stored data</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Provides ways to work with the data</td></tr>
              <tr><td className="py-2.5 px-4">Example: University database</td><td className="py-2.5 px-4 text-emerald-300 font-bold">Example: MySQL, PostgreSQL</td></tr>
              <tr><td className="py-2.5 px-4">Stores information</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Creates, retrieves, updates and controls data</td></tr>
            </tbody>
          </table>
        </div>

        {/* Practical Example: Banking App Balance Check */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              Practical Example: Checking Your Bank Balance in a Mobile App
            </h4>
            <button
              onClick={runBankSimulation}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold cursor-pointer transition-all shadow-md"
            >
              Simulate Balance Check
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
            <div className={`p-3 rounded-xl border transition-all ${bankStep >= 1 ? 'bg-indigo-950/40 border-indigo-500 text-white' : 'bg-black/30 border-slate-800 text-zinc-500'}`}>
              <span className="text-[10px] block text-zinc-400">Step 1</span>
              <span>1. App sends request</span>
            </div>
            <div className={`p-3 rounded-xl border transition-all ${bankStep >= 2 ? 'bg-indigo-950/40 border-indigo-500 text-white' : 'bg-black/30 border-slate-800 text-zinc-500'}`}>
              <span className="text-[10px] block text-zinc-400">Step 2</span>
              <span>2. DBMS processes</span>
            </div>
            <div className={`p-3 rounded-xl border transition-all ${bankStep >= 3 ? 'bg-indigo-950/40 border-indigo-500 text-white' : 'bg-black/30 border-slate-800 text-zinc-500'}`}>
              <span className="text-[10px] block text-zinc-400">Step 3</span>
              <span>3. Retrieves from DB</span>
            </div>
            <div className={`p-3 rounded-xl border transition-all ${bankStep >= 4 ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold' : 'bg-black/30 border-slate-800 text-zinc-500'}`}>
              <span className="text-[10px] block text-zinc-400">Step 4</span>
              <span>4. Balance: $5,240</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6: WHY DO WE NEED DATABASES?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 6 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Why do we need databases? (কেন সাধারণ ফাইল নয়?)</h2>
          </div>
        </div>

        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          You might wonder: <em>Why not just use Excel or ordinary text files?</em>
          <br />
          Good question! Databases and DBMS are indispensable because they solve major computational problems:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                <th className="py-2.5 px-4 font-bold text-red-400 w-1/3">Common File Problem</th>
                <th className="py-2.5 px-4 font-bold text-emerald-400">How a DBMS Solves It</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr><td className="py-2.5 px-4 font-bold text-white">Data duplication</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Reduces unnecessary repetition through normalization</td></tr>
              <tr><td className="py-2.5 px-4 font-bold text-white">Data inconsistency</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Helps maintain consistent, synchronized data across tables</td></tr>
              <tr><td className="py-2.5 px-4 font-bold text-white">Security</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Controls who can view or modify specific rows and columns</td></tr>
              <tr><td className="py-2.5 px-4 font-bold text-white">Data sharing</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Allows thousands of authorized users to work simultaneously</td></tr>
              <tr><td className="py-2.5 px-4 font-bold text-white">Data retrieval</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Uses indexes to search in milliseconds instead of slow scans</td></tr>
              <tr><td className="py-2.5 px-4 font-bold text-white">Data integrity</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Enforces constraints (e.g. unique keys, check conditions)</td></tr>
              <tr><td className="py-2.5 px-4 font-bold text-white">Backup and recovery</td><td className="py-2.5 px-4 text-emerald-300 font-medium">Automated logging (WAL) prevents data loss if servers crash</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 7: SUMMARY COMPARISON TABLE & MENTOR ADVICE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 7 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Summary Comparison: Data vs Information vs Database vs DBMS</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                <th className="py-2.5 px-4 font-bold text-amber-400">Concept</th>
                <th className="py-2.5 px-4 font-bold text-white">What is it?</th>
                <th className="py-2.5 px-4 font-bold text-cyan-400">Example</th>
                <th className="py-2.5 px-4 font-bold text-emerald-400">Role in System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-zinc-300">
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-300">Data</td>
                <td className="py-2.5 px-4">Raw facts and figures without context</td>
                <td className="py-2.5 px-4 text-cyan-200">101, Rahim, 3.80</td>
                <td className="py-2.5 px-4 text-emerald-200">Building block</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-cyan-300">Information</td>
                <td className="py-2.5 px-4">Processed, meaningful data</td>
                <td className="py-2.5 px-4 text-cyan-200">Rahim has CGPA 3.80 (Top 5%)</td>
                <td className="py-2.5 px-4 text-emerald-200">Decision making</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-purple-300">Database</td>
                <td className="py-2.5 px-4">Organized repository of related tables</td>
                <td className="py-2.5 px-4 text-cyan-200">University Database</td>
                <td className="py-2.5 px-4 text-emerald-200">Persistent storage</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-emerald-300">DBMS</td>
                <td className="py-2.5 px-4">Software used to manage the database</td>
                <td className="py-2.5 px-4 text-cyan-200">PostgreSQL, MySQL</td>
                <td className="py-2.5 px-4 text-emerald-200">Management &amp; security</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mentor Advice Box */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-zinc-300 space-y-1.5 font-sans leading-relaxed">
          <span className="font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
            <GraduationCap className="w-4 h-4" /> One piece of mentor advice:
          </span>
          <p>
            &quot;Don&apos;t try to memorize definitions word by word right now. Focus on understanding what each concept means and how they relate to one another. That is how you will build a solid, unshakable foundation in DBMS.&quot;
          </p>
        </div>
      </section>

      {/* ========================================================
          PART 8: WHAT YOU SHOULD REMEMBER & NEXT LESSON
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 8 of 8
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What you should remember from Lesson 1</h2>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-[#14182d] border border-amber-900/40 space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">1. Data</span>
            <p className="text-xs text-zinc-300">Raw facts, figures, and observations without context.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-900/40 space-y-1">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Information</span>
            <p className="text-xs text-zinc-300">Processed, structured data that conveys clear meaning.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-purple-900/40 space-y-1">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">3. Database</span>
            <p className="text-xs text-zinc-300">Organized collection of logically related data and tables.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#14182d] border border-emerald-900/40 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">4. DBMS</span>
            <p className="text-xs text-zinc-300">Software that manages, queries, and protects the database.</p>
          </div>
        </div>

        {/* Coming Next: Lesson 2 Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Coming next • Lesson 2
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Next Module
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            Types of Databases and Database Models
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            In Lesson 2, we will explore: Flat-file databases, Relational databases, Hierarchical databases, Network databases, and NoSQL databases—and why relational databases became the backbone of modern computing.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-basics')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Database 101 Basics</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson2')}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 cursor-pointer"
            >
              <span>Go to Lesson 2: Database Models</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
