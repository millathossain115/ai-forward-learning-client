'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  Columns3,
  Rows3,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Building2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Compass,
  FileCode2,
  Shuffle,
  ShieldCheck,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseLesson3TopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseLesson3Topic({ onNavigate }: DatabaseLesson3TopicProps) {
  // Part 2 & 12: Interactive Table Inspector State
  const [inspectedElement, setInspectedElement] = useState<{
    type: 'relation' | 'tuple' | 'attribute' | 'domain' | null;
    name?: string;
    index?: number;
    detail?: string;
  }>({ type: null });

  // Part 5: Domain Validator Playground State
  const [domainAttribute, setDomainAttribute] = useState<'Age' | 'CGPA' | 'Email' | 'Name'>('CGPA');
  const [testValue, setTestValue] = useState('3.80');

  // Part 7: Schema vs Instance Toggle
  const [viewMode, setViewMode] = useState<'schema' | 'instance'>('instance');

  // Part 10: NULL comparator tab
  const [nullCompVal, setNullCompVal] = useState<'null' | 'zero' | 'empty' | 'literal'>('null');

  // Part 11: Order Independence Demo State
  const [rowOrderReversed, setRowOrderReversed] = useState(false);
  const [colOrderSwapped, setColOrderSwapped] = useState(false);

  // Part 13: University Exam Questions Accordion
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

  // Sample Students Table Data
  const baseStudents = [
    { id: '101', name: 'Rahim', age: 22, dept: 'CSE', cgpa: 3.80, phone: '01712345678' },
    { id: '102', name: 'Karim', age: 23, dept: 'BBA', cgpa: 3.65, phone: null },
    { id: '103', name: 'Nila', age: 21, dept: 'EEE', cgpa: 3.90, phone: '01812345678' },
    { id: '104', name: 'Sami', age: 22, dept: 'CSE', cgpa: 3.50, phone: '01912345678' },
  ];

  const displayedStudents = rowOrderReversed ? [...baseStudents].reverse() : baseStudents;

  // Domain Validation Logic
  const validateDomain = () => {
    const val = testValue.trim();
    if (domainAttribute === 'Age') {
      const num = Number(val);
      if (!val || isNaN(num) || !Number.isInteger(num)) return { valid: false, msg: 'Age must be an integer number (e.g. 18 to 100).' };
      if (num < 16 || num > 100) return { valid: false, msg: 'Age out of reasonable student domain range (16–100).' };
      return { valid: true, msg: `✓ Valid Age domain value: ${num} years old.` };
    }
    if (domainAttribute === 'CGPA') {
      const num = Number(val);
      if (!val || isNaN(num)) return { valid: false, msg: 'CGPA must be a valid decimal number.' };
      if (num < 0.0 || num > 4.0) return { valid: false, msg: 'CGPA domain violation: Must be between 0.00 and 4.00.' };
      return { valid: true, msg: `✓ Valid CGPA domain value: ${num.toFixed(2)} out of 4.00.` };
    }
    if (domainAttribute === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) return { valid: false, msg: 'Invalid Email format: Must contain "@" and valid domain.' };
      return { valid: true, msg: `✓ Valid Email domain format: "${val}".` };
    }
    if (domainAttribute === 'Name') {
      if (val.length < 2) return { valid: false, msg: 'Name must be at least 2 characters long.' };
      if (/\d/.test(val)) return { valid: false, msg: 'Name domain violation: Person names cannot contain digits.' };
      return { valid: true, msg: `✓ Valid Name domain text: "${val}".` };
    }
    return { valid: true, msg: 'Valid value.' };
  };

  const domainValidationResult = validateDomain();

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
                Lesson 3 of your DBMS journey • Beginner level
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                The Relational Model Foundation
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Lesson 3: Introduction to Relational Databases
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              Welcome to Lesson 3! Today, we dive into the core foundation of modern database engineering: <strong>The Relational Database Model</strong>.
              By the end of this lesson, you will master the fundamental terminology: <strong>Relations</strong>, <strong>Tuples</strong>, <strong>Attributes</strong>, <strong>Domains</strong>, <strong>Schemas</strong>, <strong>Instances</strong>, <strong>Degree</strong>, <strong>Cardinality</strong>, and <strong>NULL</strong> values.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate?.('backend-lesson4')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Next: Lesson 4 (Keys in DBMS)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson2')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lesson 2</span>
            </button>
          </div>
        </div>

        {/* 6 Core Vocabulary Badges */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-amber-400 block font-bold">Relation</span>
            <span className="text-[10px] text-zinc-400">= Table</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-cyan-400 block font-bold">Tuple</span>
            <span className="text-[10px] text-zinc-400">= Row / Record</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-purple-400 block font-bold">Attribute</span>
            <span className="text-[10px] text-zinc-400">= Column / Field</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-emerald-400 block font-bold">Domain</span>
            <span className="text-[10px] text-zinc-400">= Valid Values</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-pink-400 block font-bold">Degree</span>
            <span className="text-[10px] text-zinc-400">= Column Count</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#101322] border border-slate-800">
            <span className="text-indigo-400 block font-bold">Cardinality</span>
            <span className="text-[10px] text-zinc-400">= Row Count</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1 & 2: WHAT IS A RELATIONAL DATABASE & RELATION?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <TableIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 1 &amp; 2 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a Relational Database &amp; a Relation?</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Imagine you manage a university. You have thousands of students, hundreds of courses, and dozens of faculty members. Instead of keeping everything in one messy file, you organize information into <strong>separate two-dimensional tables called Relations</strong>.
          </p>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 space-y-1 font-sans leading-relaxed">
            <strong className="text-amber-200 block text-sm font-mono">Formal Definition:</strong>
            &ldquo;A relational database is a database that organizes data into relations (tables), where each relation consists of rows and columns, and relationships between tables can be established using keys.&rdquo;
            <br />
            <span className="text-[11px] text-zinc-400 font-mono">
              The word &ldquo;relational&rdquo; originates from mathematical set theory (relations between sets proposed by E.F. Codd in 1970).
            </span>
          </div>

          {/* Interactive Inspection Callout */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <TableIcon className="w-4 h-4 text-indigo-400" />
                Live Relation: STUDENT RELATION
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Click any cell, header, or row to inspect its formal DBMS term
              </span>
            </div>

            {/* Students Table with Interactive Clicks */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    {['Student_ID', 'Name', 'Age', 'Department', 'CGPA'].map((col) => (
                      <th
                        key={col}
                        onClick={() =>
                          setInspectedElement({
                            type: 'attribute',
                            name: col,
                            detail: `"${col}" is an ATTRIBUTE (Column). It represents a named property or characteristic of the Student entity.`,
                          })
                        }
                        className="py-2.5 px-4 cursor-pointer hover:bg-slate-700/50 transition-colors font-bold text-indigo-300 hover:text-white"
                      >
                        {col}
                        <span className="block text-[9px] font-normal text-zinc-500">[Attribute]</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {baseStudents.map((st, idx) => (
                    <tr
                      key={st.id}
                      onClick={() =>
                        setInspectedElement({
                          type: 'tuple',
                          index: idx + 1,
                          name: `Tuple #${idx + 1} (${st.name})`,
                          detail: `Row #${idx + 1} is a TUPLE. It contains the complete set of attribute values for a single student record (${st.id}, ${st.name}, ${st.age}, ${st.dept}, ${st.cgpa}).`,
                        })
                      }
                      className="cursor-pointer hover:bg-indigo-600/10 transition-colors"
                    >
                      <td className="py-2.5 px-4 text-amber-400 font-bold">{st.id}</td>
                      <td className="py-2.5 px-4 font-sans font-medium text-white">{st.name}</td>
                      <td className="py-2.5 px-4 text-cyan-300">{st.age}</td>
                      <td className="py-2.5 px-4 text-purple-300">{st.dept}</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">{st.cgpa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Inspection Feedback Box */}
            {inspectedElement.type ? (
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/50 text-xs font-mono text-indigo-200">
                💡 <strong>Selected: {inspectedElement.name}</strong> &mdash; {inspectedElement.detail}
              </div>
            ) : (
              <p className="text-[11px] text-zinc-500 font-mono text-center">
                👆 Click any column header to see Attribute details, or click any row to see Tuple details.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3 & 4: TUPLES AND ATTRIBUTES IN DEPTH
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Rows3 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 3 &amp; 4 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Tuples (Rows) &amp; Attributes (Columns)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tuples Card */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-900/40 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
              <Rows3 className="w-4 h-4 text-cyan-400" />
              1. Tuple = Row = Record
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> A tuple is a single horizontal row or record in a relation that contains values for the attributes of that entity.
            </p>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono text-zinc-300 space-y-1">
              <span className="text-zinc-500 text-[10px] block">Hospital Patient Tuple Example:</span>
              <div className="text-cyan-300 font-bold">Tuple 1: [P01, Hasan, 30]</div>
              <div className="text-zinc-400">Tuple 2: [P02, Rina, 25]</div>
              <div className="text-zinc-400">Tuple 3: [P03, Kamal, 40]</div>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans">
              হাসানের সম্পূর্ণ তথ্য (ID, Name, Age) মিলে তৈরি হলো একটি একক <strong>Tuple</strong>।
            </p>
          </div>

          {/* Attributes Card */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-purple-900/40 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <Columns3 className="w-4 h-4 text-purple-400" />
              2. Attribute = Column = Field
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> An attribute is a named property or characteristic of an entity, represented by a vertical column in a relation.
            </p>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono text-zinc-300 space-y-1">
              <span className="text-zinc-500 text-[10px] block">Car Entity Attributes:</span>
              <div className="flex flex-wrap gap-1.5 text-purple-300 font-bold">
                <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-800">Car_ID</span>
                <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-800">Brand</span>
                <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-800">Model</span>
                <span className="px-2 py-0.5 rounded bg-black/40 border border-slate-800">Price</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans">
              গাড়ির ব্র্যান্ড, মডেল কিংবা দাম—প্রতিটি বৈশিষ্ট্য আলাদা আলাদা <strong>Attribute</strong>।
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 5: WHAT IS A DOMAIN? (INTERACTIVE VALIDATOR)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 5 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is a Domain? (অনুমোদিত মানের সীমানা)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            Would it make sense to store &ldquo;Rahim&rdquo; or &ldquo;Database&rdquo; in the <strong>Age</strong> column? Obviously not!
            <br />
            <strong>Definition:</strong> A <strong>Domain</strong> is the set of <em>permissible, valid values</em> that an attribute is allowed to hold.
          </p>

          {/* Interactive Domain Validator Simulator */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-emerald-950 space-y-4">
            <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Interactive Domain Validator: Test Permissible Values
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">Select Attribute:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['CGPA', 'Age', 'Email', 'Name'] as const).map((attr) => (
                    <button
                      key={attr}
                      onClick={() => {
                        setDomainAttribute(attr);
                        if (attr === 'CGPA') setTestValue('3.80');
                        if (attr === 'Age') setTestValue('22');
                        if (attr === 'Email') setTestValue('student@univ.edu');
                        if (attr === 'Name') setTestValue('Rahim');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all border ${
                        domainAttribute === attr
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-[#101322] border-slate-800 text-zinc-400'
                      }`}
                    >
                      {attr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                  Enter Test Value for {domainAttribute}:
                </label>
                <input
                  type="text"
                  value={testValue}
                  onChange={(e) => setTestValue(e.target.value)}
                  placeholder="e.g. 3.80, Hello, -5"
                  className="w-full bg-[#0c0e18] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Validation Outcome Banner */}
            <div
              className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
                domainValidationResult.valid
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
              }`}
            >
              {domainValidationResult.valid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span>{domainValidationResult.msg}</span>
            </div>

            {/* Domain Table Guide */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18] text-xs font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2 px-3 text-indigo-400">Attribute</th>
                    <th className="py-2 px-3 text-emerald-400">Permissible Domain</th>
                    <th className="py-2 px-3 text-rose-400">Domain Violations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Age</td>
                    <td className="py-2 px-3">Non-negative integers [16–100]</td>
                    <td className="py-2 px-3 text-rose-300">&quot;Rahim&quot;, -5, 3.14</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">CGPA</td>
                    <td className="py-2 px-3">Decimals between 0.00 and 4.00</td>
                    <td className="py-2 px-3 text-rose-300">4.50, -1.00, &quot;Pass&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold text-white">Email</td>
                    <td className="py-2 px-3">Standard email format (user@domain.com)</td>
                    <td className="py-2 px-3 text-rose-300">&quot;017123&quot;, plain text</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6 & 7: RELATIONAL SCHEMA VS RELATIONAL INSTANCE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 6 &amp; 7 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Relational Schema vs Relational Instance</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            One of the easiest ways to remember the difference is the <strong>Registration Form Analogy</strong>:
            <br />
            A <strong>blank form</strong> with field labels is the <strong>Schema</strong>.
            A <strong>filled-in form</strong> containing student information is the <strong>Instance</strong>!
          </p>

          {/* Interactive Toggle: Schema vs Instance */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Toggle Live View:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('schema')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    viewMode === 'schema'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-[#101322] border border-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Relational Schema (Blueprint)
                </button>
                <button
                  onClick={() => setViewMode('instance')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                    viewMode === 'instance'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-[#101322] border border-slate-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Relational Instance (Data)
                </button>
              </div>
            </div>

            {viewMode === 'schema' ? (
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-purple-900/40 space-y-2 font-mono text-xs">
                <span className="text-purple-400 font-bold block">
                  STUDENT(Student_ID, Name, Age, Department, CGPA)
                </span>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Notice that there is NO student data here yet. It only defines the table name, attribute names, and expected data types. A schema changes very rarely.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-[11px]">
                  <div className="p-2 rounded bg-black/40 border border-slate-800 text-center">
                    <span className="text-white block font-bold">Student_ID</span>
                    <span className="text-zinc-500">VARCHAR(10)</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800 text-center">
                    <span className="text-white block font-bold">Name</span>
                    <span className="text-zinc-500">VARCHAR(50)</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800 text-center">
                    <span className="text-white block font-bold">Age</span>
                    <span className="text-zinc-500">INT</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800 text-center">
                    <span className="text-white block font-bold">Department</span>
                    <span className="text-zinc-500">VARCHAR(20)</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-slate-800 text-center">
                    <span className="text-white block font-bold">CGPA</span>
                    <span className="text-zinc-500">DECIMAL(3,2)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-emerald-900/40 space-y-2 font-mono text-xs">
                <span className="text-emerald-400 font-bold block">
                  STUDENT Instance at Time $T_0$ (4 Tuples Currently Stored):
                </span>
                <div className="overflow-x-auto text-[11px]">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-zinc-400">
                        <th className="py-1 px-2">Student_ID</th>
                        <th className="py-1 px-2">Name</th>
                        <th className="py-1 px-2">Age</th>
                        <th className="py-1 px-2">Department</th>
                        <th className="py-1 px-2">CGPA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                      {baseStudents.map((s) => (
                        <tr key={s.id}>
                          <td className="py-1 px-2 font-bold text-amber-300">{s.id}</td>
                          <td className="py-1 px-2 text-white">{s.name}</td>
                          <td className="py-1 px-2">{s.age}</td>
                          <td className="py-1 px-2">{s.dept}</td>
                          <td className="py-1 px-2 font-bold text-emerald-400">{s.cgpa.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans pt-1">
                  An instance represents the actual snapshots of records at this exact second. It changes whenever a student registers, updates their phone, or graduates.
                </p>
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18] text-xs font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2 px-3 text-purple-400 w-1/3">Relational Schema</th>
                    <th className="py-2 px-3 text-emerald-400">Relational Instance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                  <tr><td className="py-2 px-3 font-bold text-white">Structure &amp; design of the table</td><td className="py-2 px-3 text-emerald-300">Actual data stored at a particular moment</td></tr>
                  <tr><td className="py-2 px-3 font-bold text-white">Changes relatively infrequently</td><td className="py-2 px-3 text-emerald-300">Changes continuously with inserts/updates</td></tr>
                  <tr><td className="py-2 px-3 font-bold text-white">Analogy: Blank application form</td><td className="py-2 px-3 text-emerald-300">Analogy: Completed form with student info</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8 & 9: DEGREE AND CARDINALITY (CORE MATH TERMS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/30 font-bold">
              Part 8 &amp; 9 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Degree vs Cardinality (খুব গুরুত্বপূর্ণ পরীক্ষার টপিক)</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#14182d] border border-pink-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-pink-400 uppercase">1. Degree (Arity)</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">
                Columns Count
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> The degree of a relation is the <strong>total number of attributes (columns)</strong> it contains.
            </p>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono">
              <div className="text-pink-300 font-bold">STUDENT Table Attributes:</div>
              <div className="text-zinc-400 mt-1">1. Student_ID, 2. Name, 3. Age, 4. Department, 5. CGPA</div>
              <div className="text-white font-bold mt-2 pt-2 border-t border-slate-800">
                $\rightarrow$ Degree = <span className="text-pink-400 text-sm">5</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">2. Cardinality</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                Rows Count
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              <strong>Definition:</strong> The cardinality of a relation is the <strong>total number of tuples (rows)</strong> it currently contains.
            </p>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono">
              <div className="text-indigo-300 font-bold">STUDENT Table Tuples:</div>
              <div className="text-zinc-400 mt-1">Rahim, Karim, Nila, Sami (4 records stored)</div>
              <div className="text-white font-bold mt-2 pt-2 border-t border-slate-800">
                $\rightarrow$ Cardinality = <span className="text-indigo-400 text-sm">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Trick Box */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/30 to-indigo-950/30 border border-slate-700 text-xs font-mono flex flex-col sm:flex-row items-center justify-around gap-3 text-center">
          <div>
            <span className="text-zinc-400 block text-[10px]">Short Memory Trick:</span>
            <span className="text-pink-300 font-bold text-sm">Degree = Columns</span>
          </div>
          <div className="hidden sm:block text-slate-700 text-lg">|</div>
          <div>
            <span className="text-zinc-400 block text-[10px]">Short Memory Trick:</span>
            <span className="text-indigo-300 font-bold text-sm">Cardinality = Rows</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10: WHAT IS NULL IN A DATABASE?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              Part 10 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">What is NULL in a Database? (NULL কী?)</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
            In our Student table, Karim does not have a registered phone number. In a database, we store this as <strong>NULL</strong>.
            <br />
            <strong>Definition:</strong> NULL represents a <em>missing, unknown, or inapplicable</em> value.
          </p>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300 space-y-1 font-sans">
            <strong className="text-rose-200 font-mono block">Critical Exam Trap:</strong>
            NULL does <strong>NOT</strong> mean zero (0), and it does <strong>NOT</strong> mean an empty string (&quot;&quot;)!
          </div>

          {/* Interactive NULL vs Zero vs Empty String */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
            {[
              { id: 'null', title: 'NULL', desc: 'Missing or unknown value. No value exists.', color: 'text-rose-400' },
              { id: 'zero', title: '0 (Numeric Zero)', desc: 'An actual mathematical quantity ($0 balance).', color: 'text-amber-400' },
              { id: 'empty', title: '"" (Empty String)', desc: 'Known text value with length of zero characters.', color: 'text-cyan-400' },
              { id: 'literal', title: '"NULL" (Text)', desc: 'Literal four-letter string (N-U-L-L), not a SQL null.', color: 'text-purple-400' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setNullCompVal(item.id as typeof nullCompVal)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  nullCompVal === item.id
                    ? 'bg-[#15192e] border-indigo-500 ring-1 ring-indigo-500/40'
                    : 'bg-[#0c0e18] border-slate-800 text-zinc-400'
                }`}
              >
                <span className={`font-bold block ${item.color}`}>{item.title}</span>
                <p className="text-[10px] text-zinc-300 mt-1 leading-snug">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 11: 7 BASIC PROPERTIES OF A RELATIONAL TABLE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              Part 11 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">7 Fundamental Properties of a Relational Table</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
          In relational theory (E.F. Codd&apos;s mathematical formulation), a proper relation must satisfy these 7 core rules:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
            <span className="font-bold text-white font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">1</span>
              Unique Relation Name
            </span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              Every table in a database schema must have a distinct name (e.g. STUDENT, COURSE).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
            <span className="font-bold text-white font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">2</span>
              Unique Attribute Names
            </span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              No two columns in the same table can share the identical column name.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
            <span className="font-bold text-white font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">3</span>
              Atomic Values (1NF Rule)
            </span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              Each cell contains exactly one indivisible value (e.g. not &quot;0171, 0182&quot; in a single cell).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
            <span className="font-bold text-white font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">4</span>
              Unique Tuples (No Duplicates)
            </span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              No two completely identical rows are permitted; rows are distinguished by keys.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
            <span className="font-bold text-white font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">5</span>
              Uniform Column Domain
            </span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              Every value in a column must adhere strictly to that column&apos;s specified data domain.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
            <span className="font-bold text-white font-mono flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] flex items-center justify-center font-bold">6 &amp; 7</span>
              Row &amp; Column Order Doesn&apos;t Matter
            </span>
            <p className="text-zinc-400 text-[11px] leading-snug">
              Mathematically, a relation is an unordered set. Swapping rows or columns represents the identical relation!
            </p>
          </div>
        </div>

        {/* Order Shuffle Simulator */}
        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-indigo-300 uppercase flex items-center gap-1.5">
              <Shuffle className="w-4 h-4" /> Test Rule 6: Shuffle Row Order (The relation remains unchanged)
            </span>
            <button
              onClick={() => setRowOrderReversed(!rowOrderReversed)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-bold cursor-pointer transition-all self-start sm:self-auto"
            >
              {rowOrderReversed ? 'Reset Original Order' : 'Reverse / Shuffle Rows'}
            </button>
          </div>

          <div className="overflow-x-auto text-[11px] font-mono">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-zinc-400">
                  <th className="py-1 px-3">Student_ID</th>
                  <th className="py-1 px-3">Name</th>
                  <th className="py-1 px-3">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                {displayedStudents.map((st) => (
                  <tr key={st.id}>
                    <td className="py-1 px-3 text-amber-300 font-bold">{st.id}</td>
                    <td className="py-1 px-3">{st.name}</td>
                    <td className="py-1 px-3">{st.dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 12: LET'S PUT EVERYTHING TOGETHER (MASTER VOCAB)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 12 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Summary Vocabulary Map (Master Breakdown)</h2>
          </div>
        </div>

        {/* Master Breakdown Table: Employee Relation */}
        <div className="p-5 rounded-2xl bg-[#14182e] border border-slate-800 space-y-4">
          <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            EMPLOYEE RELATION ANALYSIS:
          </h4>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                  <th className="py-2 px-4 text-amber-400">Employee_ID</th>
                  <th className="py-2 px-4 text-cyan-400">Name</th>
                  <th className="py-2 px-4 text-purple-400">Age</th>
                  <th className="py-2 px-4 text-emerald-400 text-right">Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                <tr><td className="py-2 px-4 font-bold text-amber-300">E01</td><td className="py-2 px-4 text-white">Rahim</td><td className="py-2 px-4">25</td><td className="py-2 px-4 text-right text-emerald-400 font-bold">30,000</td></tr>
                <tr><td className="py-2 px-4 font-bold text-amber-300">E02</td><td className="py-2 px-4 text-white">Karim</td><td className="py-2 px-4">28</td><td className="py-2 px-4 text-right text-emerald-400 font-bold">35,000</td></tr>
                <tr><td className="py-2 px-4 font-bold text-amber-300">E03</td><td className="py-2 px-4 text-white">Nila</td><td className="py-2 px-4">24</td><td className="py-2 px-4 text-right text-emerald-400 font-bold">32,000</td></tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">Relation Name</span>
              <span className="text-white font-bold">EMPLOYEE</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">Degree (Columns)</span>
              <span className="text-pink-400 font-bold">4 Attributes</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">Cardinality (Rows)</span>
              <span className="text-indigo-400 font-bold">3 Tuples</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] text-zinc-400 block">Sample Tuple</span>
              <span className="text-emerald-300 font-bold">E01, Rahim, 25</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 13: UNIVERSITY EXAM PREPARATION (Q&A STUDY GUIDE)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 13 of 13
            </span>
            <h2 className="text-xl font-bold text-white mt-1">University Exam Preparation (Short &amp; Long Q&amp;A)</h2>
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-sans">
          Click on each question to review the concise, high-scoring university examination answers:
        </p>

        {/* 8 Short Exam Questions Accordion */}
        <div className="space-y-3">
          {[
            {
              id: 1,
              q: 'Q1. Define a relation. (রিলেশন কাকে বলে?)',
              a: 'A relation is a two-dimensional mathematical structure consisting of named columns (attributes) and horizontal rows (tuples) representing data about a particular entity or subject.',
            },
            {
              id: 2,
              q: 'Q2. What is a tuple? (টাপল কী?)',
              a: 'A tuple is a single row or record in a relational database table that contains specific values corresponding to each attribute in that relation.',
            },
            {
              id: 3,
              q: 'Q3. What is an attribute? (অ্যাট্রিবিউট কাকে বলে?)',
              a: 'An attribute is a named property, characteristic, or field of an entity, represented by a column in a relational table.',
            },
            {
              id: 4,
              q: 'Q4. Define domain in relational databases. (ডোমেইন কী?)',
              a: 'A domain is the set of all permissible, valid atomic values that an attribute is allowed to hold (e.g. CGPA domain: 0.00 to 4.00; Age: positive integers).',
            },
            {
              id: 5,
              q: 'Q5. What is a relational schema? (রিলেশনাল স্কিমা কী?)',
              a: 'A relational schema defines the logical blueprint or design of a relation, specifying its relation name, attribute names, data types, and integrity constraints without any actual data records.',
            },
            {
              id: 6,
              q: 'Q6. Differentiate between relational schema and relational instance.',
              a: 'Schema is the static structural design (like a blank application form) that changes very rarely. Instance is the actual snapshot of records stored in the relation at a given moment in time (like completed forms), which changes frequently.',
            },
            {
              id: 7,
              q: 'Q7. What is degree? (ডিগ্রি কী?)',
              a: 'Degree (also called arity) is the total number of attributes (columns) present in a relation.',
            },
            {
              id: 8,
              q: 'Q8. What is cardinality? (কার্ডিনালিটি কী?)',
              a: 'Cardinality is the total number of tuples (rows) currently stored in a relation.',
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

        {/* Descriptive Exam Topics Box */}
        <div className="p-4 rounded-xl bg-[#14182e] border border-slate-800 space-y-2 text-xs font-sans">
          <span className="font-bold text-amber-300 font-mono uppercase block">
            Long Descriptive Questions to Practice for Exams (5–10 Marks):
          </span>
          <ul className="list-disc list-inside text-zinc-300 space-y-1 text-[11px] leading-relaxed">
            <li>Explain the relational database model with a suitable university example.</li>
            <li>Differentiate between relation, tuple, and attribute with real-world scenarios.</li>
            <li>Explain the 7 core properties of a relational table.</li>
            <li>What is NULL? Differentiate clearly between NULL, zero (0), and empty string (&quot;&quot;).</li>
          </ul>
        </div>

        {/* Bottom Roadmap Bridge Navigation */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-indigo-500/40 space-y-3 shadow-xl mt-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              Lesson 3 Completed
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              ✓ Relational Foundations Solidified
            </span>
          </div>

          <h3 className="text-base font-bold text-white">
            What&apos;s Next: Architecture Roadmap &amp; Keys
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Now that you thoroughly understand relations, tuples, attributes, schemas, domains, degree, and cardinality, you are fully equipped for the <strong>Database Architecture Roadmap</strong> and in-depth relational key constraints!
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson2')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Lesson 2</span>
            </button>
            <button
              onClick={() => onNavigate?.('backend-lesson4')}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              <span>Go to Lesson 4: Keys in DBMS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
