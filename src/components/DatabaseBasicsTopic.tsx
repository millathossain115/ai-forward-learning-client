'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Database,
  Table as TableIcon,
  Columns3,
  Rows3,
  KeyRound,
  Network,
  ShieldAlert,
  Search,
  Eye,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Server,
  Layers,
  GraduationCap,
  Users,
  Compass,
  HelpCircle,
  ChevronRight,
  Filter,
  PlusCircle,
  FileCode2,
  RefreshCw
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseBasicsTopicProps {
  onNavigate?: (id: TopicId) => void;
}

export default function DatabaseBasicsTopic({ onNavigate }: DatabaseBasicsTopicProps) {
  // Navigation tabs within Phase 0
  const [activeTab, setActiveTab] = useState<'what-is-db' | 'inside-db' | 'keys-relations' | 'constraints-views' | 'db-vs-dbms' | 'roadmap'>('what-is-db');

  // Interactive Table Inspection State
  const [hoveredElement, setHoveredElement] = useState<{ type: 'row' | 'column' | 'cell' | 'key' | null; index?: number; name?: string }>({ type: null });

  // Relationship viewer tab
  const [activeRelationType, setActiveRelationType] = useState<'1:1' | '1:N' | 'M:N'>('1:N');

  // Constraint Interactive Playground State
  const [newStudentId, setNewStudentId] = useState('105');
  const [newStudentName, setNewStudentName] = useState('Anik');
  const [newStudentDept, setNewStudentDept] = useState('CSE');
  const [newStudentCgpa, setNewStudentCgpa] = useState('3.75');
  const [constraintAlert, setConstraintAlert] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // View Toggle Demo State
  const [activeViewMode, setActiveViewMode] = useState<'full' | 'teacher'>('full');

  // Dynamic Students Table State
  const [students, setStudents] = useState([
    { id: '101', name: 'Rahim', dept: 'CSE', cgpa: 3.80, phone: '01711-000001', address: 'Dhaka' },
    { id: '102', name: 'Karim', dept: 'BBA', cgpa: 3.65, phone: '01811-000002', address: 'Chittagong' },
    { id: '103', name: 'Nila', dept: 'EEE', cgpa: 3.90, phone: '01911-000003', address: 'Sylhet' },
    { id: '104', name: 'Sami', dept: 'CSE', cgpa: 3.50, phone: '01611-000004', address: 'Rajshahi' },
  ]);

  const courses = [
    { id: 'C01', name: 'Database Systems', credits: 3 },
    { id: 'C02', name: 'Mathematics & Algorithms', credits: 3 },
    { id: 'C03', name: 'Computer Networks', credits: 4 },
  ];

  const enrollments = [
    { studentId: '101', courseId: 'C01', semester: 'Spring 2026' },
    { studentId: '101', courseId: 'C02', semester: 'Spring 2026' },
    { studentId: '102', courseId: 'C02', semester: 'Spring 2026' },
    { studentId: '103', courseId: 'C01', semester: 'Spring 2026' },
    { studentId: '104', courseId: 'C03', semester: 'Spring 2026' },
  ];

  const departments = [
    { id: 'CSE', name: 'Computer Science & Engineering', dean: 'Dr. Hasan' },
    { id: 'BBA', name: 'Business Administration', dean: 'Dr. Farhana' },
    { id: 'EEE', name: 'Electrical & Electronic Engineering', dean: 'Dr. Alam' },
  ];

  // Constraint Playground Insert Handler
  const handleInsertStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setConstraintAlert(null);

    // 1. NOT NULL Constraint on Name
    if (!newStudentName.trim()) {
      setConstraintAlert({
        type: 'error',
        message: '❌ NOT NULL Violation: Student Name cannot be empty!'
      });
      return;
    }

    // 2. PRIMARY KEY / UNIQUE Constraint on ID
    if (students.some((s) => s.id === newStudentId.trim())) {
      setConstraintAlert({
        type: 'error',
        message: `❌ PRIMARY KEY Violation: Student ID '${newStudentId}' already exists in the table! Primary keys must be strictly unique.`
      });
      return;
    }

    // 3. CHECK Constraint on CGPA (0.00 to 4.00)
    const cgpaNum = parseFloat(newStudentCgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 4.0) {
      setConstraintAlert({
        type: 'error',
        message: `❌ CHECK Constraint Violation: CGPA must be between 0.00 and 4.00 (Grading Scale Rule)! Value '${newStudentCgpa}' was rejected.`
      });
      return;
    }

    // Success: Insert row into table
    const newStudent = {
      id: newStudentId.trim(),
      name: newStudentName.trim(),
      dept: newStudentDept,
      cgpa: cgpaNum,
      phone: '01511-999999',
      address: 'Campus Hostel'
    };

    setStudents([...students, newStudent]);
    setConstraintAlert({
      type: 'success',
      message: `✅ All constraints passed! New record inserted into 'Students' table successfully.`
    });
    setNewStudentId((prev) => (parseInt(prev) + 1).toString());
    setNewStudentName('');
  };

  const navTabs = [
    { id: 'what-is-db', label: '১. ডেটাবেস কী?', tag: 'University Analogy', icon: GraduationCap },
    { id: 'inside-db', label: '২. ডেটাবেসের উপাদান', tag: 'Tables, Rows & Columns', icon: TableIcon },
    { id: 'keys-relations', label: '৩. Keys ও সম্পর্ক', tag: 'PK, FK, 1:1, 1:N, M:N', icon: KeyRound },
    { id: 'constraints-views', label: '৪. Constraints, Indexes & Views', tag: 'নিয়ম ও গতি', icon: ShieldAlert },
    { id: 'db-vs-dbms', label: '৫. Database vs DBMS', tag: 'লাইব্রেরিয়ান অ্যানালজি', icon: Server },
    { id: 'roadmap', label: '৬. লার্নিং রোডম্যাপ', tag: 'পরবর্তী ধাপগুলো', icon: Compass },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2 animate-in fade-in duration-300 text-zinc-100">
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12162a] via-[#0d1020] to-[#070810] border border-[#202744] p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Phase 0 • একদম শূন্য থেকে শুরু
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                No previous knowledge required
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Database 101: ডেটাবেস পরিচিতি ও সংগঠন
            </h1>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
              ধরা যাক আপনি একটি বিশ্ববিদ্যালয়ের মালিক। হাজার হাজার শিক্ষার্থীর তথ্য কোথায় ও কীভাবে গুছিয়ে রাখবেন?
              নোটবুক বনাম এক্সেল বনাম ডেটাবেস—টেবিল, রো, কলাম, প্রাইমারি কি এবং রিলেশনশিপের সম্পূর্ণ ভিজ্যুয়াল গাইড।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
            <button
              onClick={() => onNavigate?.('backend-lesson1')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>পরবর্তী পাঠ: Lesson 1 (Data, Info, DB &amp; DBMS)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate?.('backend-roadmap')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <Compass className="w-4 h-4" />
              <span>আর্কিটেকচার রোডম্যাপ</span>
            </button>
          </div>
        </div>

        {/* 6 Core Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-md ring-1 ring-indigo-500/40 text-white'
                    : 'bg-[#101322] border-slate-800 hover:border-slate-700 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                </div>
                <div>
                  <h4 className={`text-xs font-semibold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {tab.label}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono line-clamp-1">{tab.tag}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: 1. What is a Database? (University Analogy) */}
      {activeTab === 'what-is-db' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">১. ডেটাবেস আসলে কী? (What is a Database?)</h2>
                <p className="text-xs text-zinc-400">বাস্তব জীবনের বিশ্ববিদ্যালয়ের উদাহরণ দিয়ে ভাবুন</p>
              </div>
            </div>

            {/* University Scenario Callout */}
            <div className="bg-gradient-to-r from-indigo-950/40 via-[#13172b] to-purple-950/20 border border-indigo-900/40 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                কল্পনা করুন আপনি একটি বিশ্ববিদ্যালয়ের প্রতিষ্ঠাতা ও পরিচালক
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                আপনার বিশ্ববিদ্যালয়ে হাজার হাজার শিক্ষার্থী পড়াশোনা করে। প্রতিটি শিক্ষার্থীর জন্য আপনাকে বেশ কিছু তথ্য সংরক্ষণ করতে হয়:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Student ID', 'Name', 'Age', 'Department', 'Email', 'Phone Number', 'CGPA'].map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-md bg-black/40 border border-indigo-800/40 text-indigo-200 text-xs font-mono">
                    ✓ {item}
                  </span>
                ))}
              </div>
              <p className="text-xs text-zinc-300 pt-2 leading-relaxed">
                এই বিপুল তথ্য আপনি কোথায় রাখবেন? হাতে লেখা <strong>নোটবুকে</strong>? কম্পিউটারের <strong>এক্সেলে</strong>? নাকি একটি <strong>ডেটাবেসে</strong>?
              </p>
            </div>

            {/* Notebook vs Excel vs Database 3-way Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#141829] border border-slate-800 space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-red-400 font-bold">পদ্ধতি ০১: খাতা বা নোটবুক</span>
                <h4 className="text-sm font-bold text-white">হাতে লেখা রেজিস্টার</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  পৃষ্ঠা উল্টে উল্টে খুঁজে বের করা দুঃসাধ্য। খাতা হারিয়ে গেলে বা আগুন লাগলে সব ডেটা চিরতরে শেষ।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141829] border border-slate-800 space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">পদ্ধতি ০২: এক্সেল / CSV ফাইল</span>
                <h4 className="text-sm font-bold text-white">স্প্রেডশিট ফাইল</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  ১০-২০ জন শিক্ষকের জন্য ঠিক আছে। কিন্তু একসাথে শত শত ইউজার লিখতে গেলে ফাইল লক হয়ে যায় এবং ডেটা ওভাররাইট হয়ে নষ্ট হয়।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141829] border border-emerald-900/50 space-y-2.5 ring-1 ring-emerald-500/30">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">পদ্ধতি ০৩: ডেটাবেস (আধুনিক সমাধান)</span>
                <h4 className="text-sm font-bold text-white">রিলেশনাল ডেটাবেস</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  সুসংগঠিত আধার যেখানে কোটি ডেটার মধ্যে মাইক্রোসেকেন্ডে নির্দিষ্ট ছাত্রের তথ্য পাওয়া যায় এবং হাজার ইউজার একসাথে কাজ করতে পারে।
                </p>
              </div>
            </div>

            {/* Formal Definition Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-300 space-y-1">
              <span className="font-bold text-emerald-400 uppercase font-mono tracking-wider">ডেটাবেসের সংজ্ঞা (Definition):</span>
              <p className="leading-relaxed">
                &quot;A database is an organized collection of data that can be easily stored, accessed, managed, updated, and retrieved.&quot;
                (ডেটাবেস হলো ডেটার একটি সুসংগঠিত সংগ্রহ, যা খুব সহজে সংরক্ষণ, অ্যাক্সেস, পরিচালনা, আপডেট এবং দ্রুত খুঁজে বের করা যায়।)
              </p>
            </div>

            {/* University Live Example Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase flex items-center gap-1.5">
                  <TableIcon className="w-4 h-4 text-indigo-400" />
                  একটি বিশ্ববিদ্যালয়ের ডেটাবেস কেমন দেখায়? (Student Database Example)
                </span>
                <span className="text-[11px] font-mono text-zinc-500">৪টি রেকর্ড সংরক্ষিত</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300 font-mono">
                      <th className="py-2.5 px-4 font-bold text-amber-400">Student ID</th>
                      <th className="py-2.5 px-4 font-bold text-cyan-400">Name</th>
                      <th className="py-2.5 px-4 font-bold text-purple-400">Department</th>
                      <th className="py-2.5 px-4 font-bold text-emerald-400 text-right">CGPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-zinc-300">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-indigo-300">{student.id}</td>
                        <td className="py-2.5 px-4 text-white font-sans font-medium">{student.name}</td>
                        <td className="py-2.5 px-4 text-purple-300">{student.dept}</td>
                        <td className="py-2.5 px-4 text-right font-bold text-emerald-400">{student.cgpa.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveTab('inside-db')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                পরবর্তী অধ্যায়: ডেটাবেসের ভেতরের উপাদান <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 2. What is inside a database? (Tables, Rows, Columns) */}
      {activeTab === 'inside-db' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <TableIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">২. একটি ডেটাবেসের ভেতরে কী কী থাকে? (Inside a Database)</h2>
                <p className="text-xs text-zinc-400">টেবিল, রো এবং কলামের গঠন ও তাদের প্রযুক্তিগত পরিভাষা</p>
              </div>
            </div>

            {/* 8 Core Concepts Breakdown Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Tables (টেবিল)', desc: 'ডেটা সুসংগঠিতভাবে সাজানোর ঘর', icon: TableIcon, color: 'text-indigo-400' },
                { title: 'Columns (কলাম)', desc: 'Attributes / তথ্যের ধরন', icon: Columns3, color: 'text-cyan-400' },
                { title: 'Rows (রো / রেকর্ড)', desc: 'Tuples / নির্দিষ্ট একক ব্যক্তির তথ্য', icon: Rows3, color: 'text-emerald-400' },
                { title: 'Keys (চাবি)', desc: 'শনাক্তকারী ও টেবিলের সংযোগ', icon: KeyRound, color: 'text-amber-400' },
                { title: 'Relationships', desc: 'টেবিলগুলোর পারস্পরিক সম্পর্ক', icon: Network, color: 'text-purple-400' },
                { title: 'Constraints', desc: 'নিয়মাবলী (ভুল ডেটা রোধ)', icon: ShieldAlert, color: 'text-rose-400' },
                { title: 'Indexes', desc: 'বইয়ের সূচিপত্রের মতো দ্রুত সার্চ', icon: Search, color: 'text-blue-400' },
                { title: 'Views', desc: 'কাস্টমাইজড নিরাপদ ডিসপ্লে', icon: Eye, color: 'text-teal-400' },
              ].map((c, idx) => {
                const Icon = c.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#13172c] border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${c.color}`} />
                      <span className="text-xs font-bold text-white">{c.title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-tight">{c.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Look at Tables, Rows, Columns */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                টেবিল ৩টিতে বিভক্ত কেন? (Why Multiple Tables?)
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                সব তথ্য যদি একটি বিশাল টেবিলে রাখা হতো, তবে একই শিক্ষকের নাম বা কোর্সের বিবরণ হাজার বার কপি হতো (Data Duplication)।
                তাই আমরা তথ্যকে যৌক্তিকভাবে ৩টি পৃথক টেবিলে ভাগ করি:
              </p>

              {/* 3 Split Tables Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Table 1: Students */}
                <div className="bg-[#121526] border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <span className="text-xs font-bold text-amber-400 font-mono">Table 1: Students</span>
                  <p className="text-[10px] text-zinc-400">শিক্ষার্থীদের ব্যক্তিগত পরিচয়</p>
                  <div className="overflow-x-auto rounded border border-slate-800">
                    <table className="w-full text-[11px] font-mono">
                      <thead className="bg-[#181d33] text-zinc-300">
                        <tr><th className="p-1.5 text-left">ID</th><th className="p-1.5 text-left">Name</th><th className="p-1.5 text-left">Dept</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-zinc-400">
                        <tr><td className="p-1.5 text-indigo-300">101</td><td className="p-1.5 text-white">Rahim</td><td className="p-1.5">CSE</td></tr>
                        <tr><td className="p-1.5 text-indigo-300">102</td><td className="p-1.5 text-white">Karim</td><td className="p-1.5">BBA</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Courses */}
                <div className="bg-[#121526] border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <span className="text-xs font-bold text-cyan-400 font-mono">Table 2: Courses</span>
                  <p className="text-[10px] text-zinc-400">বিশ্ববিদ্যালয়ের বিষয়সমূহ</p>
                  <div className="overflow-x-auto rounded border border-slate-800">
                    <table className="w-full text-[11px] font-mono">
                      <thead className="bg-[#181d33] text-zinc-300">
                        <tr><th className="p-1.5 text-left">Course ID</th><th className="p-1.5 text-left">Course Name</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-zinc-400">
                        <tr><td className="p-1.5 text-cyan-300">C01</td><td className="p-1.5 text-white">Database</td></tr>
                        <tr><td className="p-1.5 text-cyan-300">C02</td><td className="p-1.5 text-white">Mathematics</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 3: Enrollments */}
                <div className="bg-[#121526] border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <span className="text-xs font-bold text-purple-400 font-mono">Table 3: Enrollments</span>
                  <p className="text-[10px] text-zinc-400">কে কোন কোর্সে ভর্তি হয়েছে</p>
                  <div className="overflow-x-auto rounded border border-slate-800">
                    <table className="w-full text-[11px] font-mono">
                      <thead className="bg-[#181d33] text-zinc-300">
                        <tr><th className="p-1.5 text-left">Student ID</th><th className="p-1.5 text-left">Course ID</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-zinc-400">
                        <tr><td className="p-1.5 text-indigo-300">101</td><td className="p-1.5 text-cyan-300">C01</td></tr>
                        <tr><td className="p-1.5 text-indigo-300">102</td><td className="p-1.5 text-cyan-300">C02</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Row (Tuple) vs Column (Attribute) Inspector */}
            <div className="bg-[#13172c] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  হাতে-কলমে পরীক্ষা: নিচের টেবিলে মাউস নিয়ে দেখুন
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {hoveredElement.type === 'row' && `রো সিলেক্টেড (Record / Tuple #${hoveredElement.index})`}
                  {hoveredElement.type === 'column' && `কলাম সিলেক্টেড (Attribute: ${hoveredElement.name})`}
                  {!hoveredElement.type && 'যেকোনো রো বা কলামে মাউস রাখুন'}
                </span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-800 bg-[#090b14]">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="bg-[#161a30] text-zinc-300 border-b border-slate-800">
                      {['ID (Primary Key)', 'Name (Attribute)', 'Department (Attribute)', 'CGPA (Attribute)'].map((col, idx) => (
                        <th
                          key={col}
                          onMouseEnter={() => setHoveredElement({ type: 'column', name: col })}
                          onMouseLeave={() => setHoveredElement({ type: null })}
                          className={`p-3 text-left font-bold cursor-pointer transition-colors ${
                            hoveredElement.type === 'column' && hoveredElement.name === col
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : ''
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-zinc-300">
                    {students.slice(0, 3).map((student, idx) => (
                      <tr
                        key={student.id}
                        onMouseEnter={() => setHoveredElement({ type: 'row', index: idx + 1 })}
                        onMouseLeave={() => setHoveredElement({ type: null })}
                        className={`transition-colors cursor-pointer ${
                          hoveredElement.type === 'row' && hoveredElement.index === idx + 1
                            ? 'bg-emerald-500/20 text-emerald-200'
                            : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <td className="p-3 font-bold text-indigo-300">{student.id}</td>
                        <td className="p-3 font-sans text-white">{student.name}</td>
                        <td className="p-3 text-purple-300">{student.dept}</td>
                        <td className="p-3 font-bold text-emerald-400">{student.cgpa.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Terminology Comparison Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/40">
                  <strong className="text-emerald-400 font-mono">Row (আড়াআড়ি সারি) = Record / Tuple:</strong>
                  <p className="text-zinc-400 mt-0.5 text-[11px]">
                    একজন পূর্ণাঙ্গ শিক্ষার্থীর সম্পূর্ণ তথ্যের সমাহার। অর্থাৎ: <em>One student = One row</em>।
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-cyan-900/40">
                  <strong className="text-cyan-400 font-mono">Column (লম্বালম্বি স্তম্ভ) = Attribute / Field:</strong>
                  <p className="text-zinc-400 mt-0.5 text-[11px]">
                    একটি নির্দিষ্ট বৈশিষ্ট্যের ধরন (যেমন: কেবল নাম অথবা কেবল সিজিপিএ)।
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('what-is-db')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-zinc-300 cursor-pointer"
              >
                আগের অধ্যায়
              </button>
              <button
                onClick={() => setActiveTab('keys-relations')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                পরবর্তী অধ্যায়: Keys ও সম্পর্ক (1:1, 1:N, M:N) <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 3. Keys and Relationships (PK, FK, 1:1, 1:N, M:N) */}
      {activeTab === 'keys-relations' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">৩. চাবি ও সম্পর্ক (Keys &amp; Relationships)</h2>
                <p className="text-xs text-zinc-400">একই নামের দুজন ছাত্রকে কীভাবে আলাদা করা হয় এবং টেবিলগুলো কীভাবে কথা বলে</p>
              </div>
            </div>

            {/* Keys Explanation & Table */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  চাবি (Keys) কী এবং কেন দরকার?
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  ধরা যাক ক্লাসে &quot;Rahim&quot; নামের দুজন শিক্ষার্থী আছে। ডেটাবেস কীভাবে বুঝবে কার গ্রেড কোনটা?
                  এজন্য প্রতি রেকর্ডকে অনন্যভাবে শনাক্ত করার জন্য আমরা <strong>Primary Key</strong> ব্যবহার করি।
                </p>
              </div>

              {/* Types of Keys Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#14182d] border border-amber-900/40 space-y-1">
                  <span className="text-xs font-bold text-amber-400 font-mono">Primary Key (PK)</span>
                  <p className="text-[11px] text-zinc-300">প্রতিটি রেকর্ডকে অনন্যভাবে চিহ্নিত করে (কখনো নাল বা ডুপ্লিকেট হতে পারে না)।</p>
                  <span className="text-[10px] font-mono text-zinc-500">উদাহরণ: Student_ID (101)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14182d] border border-cyan-900/40 space-y-1">
                  <span className="text-xs font-bold text-cyan-400 font-mono">Foreign Key (FK)</span>
                  <p className="text-[11px] text-zinc-300">অন্য একটি টেবিলের প্রাইমারি কি-কে রেফারেন্স করে দুটো টেবিলকে লিংক করে।</p>
                  <span className="text-[10px] font-mono text-zinc-500">উদাহরণ: Enrollments.Student_ID</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14182d] border border-purple-900/40 space-y-1">
                  <span className="text-xs font-bold text-purple-400 font-mono">Candidate Key</span>
                  <p className="text-[11px] text-zinc-300">একটি টেবিলের যেকোনো কলাম যা প্রাইমারি কি হওয়ার যোগ্যতা রাখে (যেমন: NID বা Email)।</p>
                  <span className="text-[10px] font-mono text-zinc-500">যোগ্য চাবিদের তালিকা</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-zinc-300 font-mono">Alternate Key</span>
                  <p className="text-[11px] text-zinc-400">যে ক্যান্ডিডেট কি-কে প্রাইমারি কি হিসেবে নির্বাচন করা হয়নি।</p>
                  <span className="text-[10px] font-mono text-zinc-500">বিকল্প চাবি</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-zinc-300 font-mono">Composite Key</span>
                  <p className="text-[11px] text-zinc-400">একাধিক কলাম একসাথে মিলিয়ে যখন একটি ইউনিক কি গঠন করা হয়।</p>
                  <span className="text-[10px] font-mono text-zinc-500">(Student_ID + Course_ID)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-zinc-300 font-mono">Unique Key</span>
                  <p className="text-[11px] text-zinc-400">কলামের মান সর্বদা ইউনিক হওয়া নিশ্চিত করে (একটি নাল ভ্যালু সমর্থন করতে পারে)।</p>
                  <span className="text-[10px] font-mono text-zinc-500">Email, Phone No</span>
                </div>
              </div>
            </div>

            {/* RELATIONSHIPS SECTION (1:1, 1:N, M:N) */}
            <div className="border-t border-slate-800 pt-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Network className="w-4 h-4 text-purple-400" />
                    টেবিলদের সম্পর্ক (Relationships: How Tables Communicate)
                  </h3>
                  <p className="text-xs text-zinc-400">রিলেশনাল ডেটাবেসে প্রধানত ৩ ধরণের সম্পর্ক দেখা যায়</p>
                </div>

                {/* Relationship Mode Switcher */}
                <div className="flex items-center gap-1.5 bg-[#121528] p-1.5 rounded-xl border border-slate-800">
                  {(['1:1', '1:N', 'M:N'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActiveRelationType(mode)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        activeRelationType === mode
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {mode} সম্পর্ক
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Relationship Card */}
              <div className="p-5 rounded-2xl bg-[#13172e] border border-purple-900/30 space-y-4">
                {activeRelationType === '1:1' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400 font-bold uppercase">One-to-One (1:1) সম্পর্ক</span>
                      <span className="text-[11px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">একজনের একটাই</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      একজন শিক্ষার্থীর <strong>একটিই ডিজিটাল আইডি কার্ড</strong> থাকে, এবং প্রতিটি আইডি কার্ড কেবল একজন শিক্ষার্থীরই হতে পারে।
                    </p>
                    <div className="flex items-center justify-center gap-4 py-3 font-mono text-xs text-zinc-300">
                      <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-center">
                        <span className="text-indigo-400 font-bold">Student #101</span><br />
                        <span className="text-[10px] text-zinc-500">Rahim</span>
                      </div>
                      <div className="flex flex-col items-center text-purple-400 text-[10px]">
                        <span>[1:1 রিলেশন]</span>
                        <span>───────►</span>
                      </div>
                      <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-center">
                        <span className="text-emerald-400 font-bold">ID Card #CARD-881</span><br />
                        <span className="text-[10px] text-zinc-500">Issued to Rahim</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeRelationType === '1:N' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400 font-bold uppercase">One-to-Many (1:N) সম্পর্ক</span>
                      <span className="text-[11px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">এক ডিপার্টমেন্টে বহু ছাত্র</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      একটি ডিপার্টমেন্টের (CSE) অধীনে <strong>অনেক শিক্ষার্থী</strong> থাকতে পারে, কিন্তু প্রতিটি শিক্ষার্থী কেবল একটিই ডিপার্টমেন্টের অন্তর্ভুক্ত।
                    </p>
                    <div className="flex items-center justify-center gap-4 py-3 font-mono text-xs text-zinc-300">
                      <div className="p-3 bg-black/40 rounded-xl border border-purple-800/60 text-center">
                        <span className="text-purple-300 font-bold">Department (CSE)</span><br />
                        <span className="text-[10px] text-zinc-500">Dean: Dr. Hasan</span>
                      </div>
                      <div className="flex flex-col items-center text-purple-400 text-[10px]">
                        <span>[1:N সম্পর্ক]</span>
                        <span>───────►</span>
                      </div>
                      <div className="space-y-1">
                        <div className="px-2.5 py-1 bg-black/40 rounded border border-slate-800 text-[11px] text-indigo-300">
                          Student 101 (Rahim)
                        </div>
                        <div className="px-2.5 py-1 bg-black/40 rounded border border-slate-800 text-[11px] text-indigo-300">
                          Student 104 (Sami)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeRelationType === 'M:N' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400 font-bold uppercase">Many-to-Many (M:N) সম্পর্ক (জংশন টেবিল)</span>
                      <span className="text-[11px] font-mono bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">Enrollments জংশন</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      একজন শিক্ষার্থী একাধিক কোর্সে ভর্তি হতে পারে, আবার একটি কোর্সেও অনেক শিক্ষার্থী থাকতে পারে। রিলেশনাল ডেটাবেসে এই ধরণের সম্পর্ক রক্ষা করতে মাঝখানে একটি <strong>Enrollments</strong> টেবিল প্রয়োজন হয়।
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-2 font-mono text-xs">
                      <div className="p-2.5 bg-black/40 rounded border border-indigo-800/40 text-center">
                        <span className="text-indigo-400 font-bold">Students (M)</span>
                      </div>
                      <span className="text-purple-400">◄───►</span>
                      <div className="p-2.5 bg-purple-950/40 rounded border border-purple-600 text-center ring-1 ring-purple-500/30">
                        <span className="text-purple-200 font-bold">Enrollments (Junction Table)</span><br />
                        <span className="text-[9px] text-zinc-400">Student_ID (FK) + Course_ID (FK)</span>
                      </div>
                      <span className="text-purple-400">◄───►</span>
                      <div className="p-2.5 bg-black/40 rounded border border-cyan-800/40 text-center">
                        <span className="text-cyan-400 font-bold">Courses (N)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('inside-db')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-zinc-300 cursor-pointer"
              >
                আগের অধ্যায়
              </button>
              <button
                onClick={() => setActiveTab('constraints-views')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                পরবর্তী অধ্যায়: Constraints, Indexes &amp; Views <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 4. Constraints, Indexes, Views */}
      {activeTab === 'constraints-views' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">৪. নিয়মাবলী, গতি ও নিরাপত্তা (Constraints, Indexes &amp; Views)</h2>
                <p className="text-xs text-zinc-400">ডেটাবেস কীভাবে ভুল তথ্য ঢোকা বন্ধ করে এবং সার্চ সুপারফাস্ট রাখে</p>
              </div>
            </div>

            {/* 1. Constraints Simulator */}
            <div className="bg-[#13172c] border border-slate-800 rounded-2xl p-5 md:p-6 space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  কনস্ট্রেইন্ট সিমুলেটর: ভুল ডেটা দিয়ে টেস্ট করুন
                </h3>
                <p className="text-xs text-zinc-400">
                  নিচের ফর্মে ইচ্ছাকৃতভাবে কোনো ভুল ডেটা ইনসার্ট করার চেষ্টা করুন (যেমন: ডুপ্লিকেট আইডি ১০১, খালি নাম, অথবা CGPA ৫.০০)!
                </p>
              </div>

              {/* Interactive Insert Form */}
              <form onSubmit={handleInsertStudent} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400">Student ID (PK)</label>
                  <input
                    type="text"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-800 text-xs text-white font-mono"
                    placeholder="e.g. 101"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400">Name (NOT NULL)</label>
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-800 text-xs text-white font-mono"
                    placeholder="Student Name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400">Department</label>
                  <select
                    value={newStudentDept}
                    onChange={(e) => setNewStudentDept(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-800 text-xs text-white font-mono"
                  >
                    <option value="CSE">CSE</option>
                    <option value="BBA">BBA</option>
                    <option value="EEE">EEE</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400">CGPA (CHECK &le; 4.00)</label>
                  <input
                    type="text"
                    value={newStudentCgpa}
                    onChange={(e) => setNewStudentCgpa(e.target.value)}
                    className="w-full mt-1 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-800 text-xs text-white font-mono"
                    placeholder="0.00 - 4.00"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    ইনসার্ট করুন
                  </button>
                </div>
              </form>

              {/* Feedback Alert */}
              {constraintAlert && (
                <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 animate-in fade-in duration-150 ${
                  constraintAlert.type === 'error'
                    ? 'bg-rose-950/30 border-rose-900/50 text-rose-300'
                    : 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300'
                }`}>
                  {constraintAlert.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span>{constraintAlert.message}</span>
                </div>
              )}
            </div>

            {/* 2. Indexes and Views Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Indexes Box */}
              <div className="p-5 rounded-2xl bg-[#13172c] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">ইনডেক্স (Indexes: Making Searching Faster)</h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  ধরা যাক আপনার বিশ্ববিদ্যালয়ে <strong>১,০০,০০০ (১ লাখ)</strong> শিক্ষার্থীর রেকর্ড রয়েছে। আপনি ৫০,২৫০ নম্বর আইডিওয়ালা ছাত্রকে খুঁজতে চান।
                </p>
                <div className="p-3 bg-black/40 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-red-400">ইনডেক্স ছাড়া:</span>
                    <span className="text-zinc-500">৫০,২৫০টি রো পড়তে হবে (ধীরগতি)</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="text-emerald-400">ইনডেক্স সহ (B-Tree):</span>
                    <span className="text-emerald-300 font-bold">মাত্র ৩-৪টি জাম্পে নিমেষে হাজির!</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400">
                  <strong>বইয়ের উদাহরণ:</strong> কোনো টপিক খুঁজতে আপনি বইয়ের প্রতিটি পাতা এক এক করে পড়েন না; বইয়ের পেছনে থাকা সূচিপত্রে (Index) দেখে এক সেকেন্ডে ওই পৃষ্ঠায় চলে যান!
                </p>
              </div>

              {/* Views Box */}
              <div className="p-5 rounded-2xl bg-[#13172c] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-teal-400" />
                    <h3 className="text-sm font-bold text-white">ভিউ (Views: A Customized Way to See Data)</h3>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => setActiveViewMode(activeViewMode === 'full' ? 'teacher' : 'full')}
                    className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 text-[10px] font-mono cursor-pointer hover:bg-teal-500/20"
                  >
                    {activeViewMode === 'full' ? 'শিক্ষক ভিউ দেখুন' : 'পূর্ণাঙ্গ টেবিল দেখুন'}
                  </button>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  শিক্ষকের শুধু শিক্ষার্থীর <strong>নাম এবং CGPA</strong> দেখা দরকার। তার ফোন নম্বর বা বাড়ির ঠিকানা দেখার প্রয়োজন নেই। View আসল টেবিল গোপন রেখে নির্দিষ্ট কলাম দেখায়:
                </p>

                {/* View Output Table */}
                <div className="overflow-x-auto rounded border border-slate-800 bg-black/40">
                  <table className="w-full text-[11px] font-mono">
                    <thead className="bg-[#181d33] text-zinc-300">
                      <tr>
                        <th className="p-1.5 text-left">Name</th>
                        <th className="p-1.5 text-left">CGPA</th>
                        {activeViewMode === 'full' && (
                          <>
                            <th className="p-1.5 text-left text-zinc-500">Phone (গোপন)</th>
                            <th className="p-1.5 text-left text-zinc-500">Address (গোপন)</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-zinc-300">
                      {students.slice(0, 2).map((s) => (
                        <tr key={s.id}>
                          <td className="p-1.5 font-sans font-medium text-white">{s.name}</td>
                          <td className="p-1.5 font-bold text-emerald-400">{s.cgpa.toFixed(2)}</td>
                          {activeViewMode === 'full' && (
                            <>
                              <td className="p-1.5 text-zinc-500">{s.phone}</td>
                              <td className="p-1.5 text-zinc-500">{s.address}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {activeViewMode === 'teacher' ? '🔒 শিক্ষক ভিউ: ব্যক্তিগত ফোন ও ঠিকানা সুরক্ষিত' : '🔓 অ্যাডমিন ভিউ: সমস্ত কলাম দৃশ্যমান'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('keys-relations')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-zinc-300 cursor-pointer"
              >
                আগের অধ্যায়
              </button>
              <button
                onClick={() => setActiveTab('db-vs-dbms')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                পরবর্তী অধ্যায়: Database vs DBMS <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 5. Database vs DBMS (The Librarian Analogy & Popular Software) */}
      {activeTab === 'db-vs-dbms' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">৫. Database বনাম DBMS-এর আসল পার্থক্য কী?</h2>
                <p className="text-xs text-zinc-400">লাইব্রেরিয়ান অ্যানালজি এবং জনপ্রিয় ডেটাবেস সফটওয়্যারসমূহ</p>
              </div>
            </div>

            {/* Direct Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#141829] border border-purple-900/40 space-y-3">
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">১. Database (ডেটাবেস)</span>
                <h3 className="text-base font-bold text-white">সুসংগঠিত তথ্যের আধার (The Data Store)</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  ডেটাবেস হলো একটি পাত্র বা ফাইল যেখানে টেবিল, রো এবং কলামের আকারে আসল ডেটা জমা থাকে।
                </p>
                <div className="p-3 bg-black/40 rounded-lg border border-slate-800 text-xs text-purple-200 font-mono">
                  উদাহরণ: University Database (সকল ছাত্র ও রেজাল্টের তথ্য)
                </div>
              </div>

              <div className="p-5 rounded-xl bg-[#141829] border border-emerald-900/40 space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">২. DBMS (ম্যানেজমেন্ট সিস্টেম)</span>
                <h3 className="text-base font-bold text-white">পরিচালনা করার সফটওয়্যার (The Software Engine)</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  যে সফটওয়্যার ডেটাবেস তৈরি করে, কুয়েরি এক্সিকিউট করে, পারমিশন দেয় এবং সুরক্ষিত রাখে।
                </p>
                <div className="p-3 bg-black/40 rounded-lg border border-slate-800 text-xs text-emerald-200 font-mono">
                  উদাহরণ: MySQL, PostgreSQL, Oracle, MongoDB
                </div>
              </div>
            </div>

            {/* Analogy Box */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/20 via-[#131728] to-indigo-950/20 border border-amber-900/30 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> এভাবে মনে রাখুন: বই বনাম লাইব্রেরিয়ান
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong>Database</strong> = আলমারিতে সাজিয়ে রাখা সমস্ত বই ও ডকুমেন্টস।<br />
                <strong>DBMS</strong> = সেই দক্ষ লাইব্রেরিয়ান, যিনি বইগুলোকে সাজান, আপনি চাইতে গেলে এক সেকেন্ডে খুঁজে দেন এবং কেউ যাতে নষ্ট না করে তা পাহারা দেন!
              </p>
            </div>

            {/* Popular DBMS Software Showcase */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-white font-mono uppercase text-zinc-400">
                জনপ্রিয় ৪টি DBMS সফটওয়্যার:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'MySQL', type: 'Relational DBMS', desc: 'ওয়েব ও অ্যাপের জন্য সবচেয়ে জনপ্রিয় ওপেন-সোর্স SQL ডেটাবেস।' },
                  { name: 'PostgreSQL', type: 'Advanced Relational', desc: 'ভেক্টর (pgvector), JSONB ও উচ্চক্ষমতাসম্পন্ন ডেভেলপারদের গোল্ড স্ট্যান্ডার্ড।' },
                  { name: 'Oracle Database', type: 'Enterprise Relational', desc: 'ব্যাংক ও বড় বড় কর্পোরেট ফাইন্যান্সিয়াল সিস্টেমের প্রধান ভরসা।' },
                  { name: 'MongoDB', type: 'Document NoSQL', desc: 'JSON মতো ফ্লেক্সিবল স্কিমায় দ্রুত ডেটা প্রসেসিংয়ের আধুনিক সিস্টেম।' },
                ].map((db, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1.5">
                    <span className="text-xs font-bold text-white font-mono">{db.name}</span>
                    <span className="text-[10px] font-mono block text-indigo-400">{db.type}</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{db.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveTab('constraints-views')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-zinc-300 cursor-pointer"
              >
                আগের অধ্যায়
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                পরবর্তী অধ্যায়: আপনার লার্নিং রোডম্যাপ <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 6. Your Learning Roadmap (Recommended Next Steps) */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">৬. আপনার সম্পূর্ণ শেখার রোডম্যাপ (Learning Roadmap)</h2>
                <p className="text-xs text-zinc-400">জিরো থেকে প্রো-লেভেল ডেটাবেস ইঞ্জিনিয়ার হওয়ার ধারাবাহিক পাঠ্যক্রম</p>
              </div>
            </div>

            {/* Mentor Recommendation Banner */}
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-zinc-300 space-y-1.5">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5 font-mono">
                <GraduationCap className="w-4 h-4" /> মেন্টরের পরামর্শ:
              </span>
              <p className="leading-relaxed">
                &quot;সরাসরি জটিল SQL কুয়েরি বা ডেটাবেস ইঞ্জিনের আর্কিটেকচারে ঝাঁপিয়ে পড়বেন না। প্রথমে টেবিল, রো, কলাম, প্রাইমারি-ফরেন কি এবং রিলেশনশিপের ধারণায় সম্পূর্ণ স্বচ্ছন্দ হোন। এরপর নিচের রোডম্যাপ অনুযায়ী ধাপে ধাপে এগিয়ে চলুন।&quot;
              </p>
            </div>

            {/* 6 Sequenced Milestones */}
            <div className="space-y-3">
              {[
                {
                  step: '১',
                  title: 'Database Fundamentals (সম্পন্ন)',
                  tag: 'Level 01',
                  status: 'completed',
                  items: ['Data ও Information কী', 'Database কী ও কেন দরকার', 'Database বনাম DBMS এর পার্থক্য']
                },
                {
                  step: '২',
                  title: 'Relational Database Concepts',
                  tag: 'Level 02',
                  status: 'ready',
                  items: ['Tables, Rows (Tuples) ও Columns (Attributes)', 'Primary Key ও Foreign Key', '1:1, 1:N ও M:N রিলেশনশিপ']
                },
                {
                  step: '৩',
                  title: 'ER Model (Entity Relationship Model)',
                  tag: 'Level 03',
                  status: 'upcoming',
                  items: ['Entity এবং Attributes এর প্রকারভেদ', 'ER ডায়াগ্রাম আঁকা ও রিলেশনশিপ ম্যাপিং', 'বাস্তব প্রজেক্টের ডাটা মডেলিং']
                },
                {
                  step: '৪',
                  title: 'SQL Fundamentals (হাতে-কলমে কোডিং)',
                  tag: 'Level 04',
                  status: 'upcoming',
                  items: ['CREATE ও ALTER টেবিল', 'INSERT ও UPDATE স্টেটমেন্ট', 'SELECT, WHERE ও JOIN কুয়েরি']
                },
                {
                  step: '৫',
                  title: 'Database Design & Normalization',
                  tag: 'Level 05',
                  status: 'upcoming',
                  items: ['ফাংশনাল ডিপেন্ডেন্সি (Functional Dependencies)', '1NF, 2NF ও 3NF নরমালাইজেশন', 'ডেটা ডুপ্লিকেশন সম্পূর্ণ দূরীকরণ']
                },
                {
                  step: '৬',
                  title: 'Advanced Systems & Indexing',
                  tag: 'Level 06',
                  status: 'upcoming',
                  items: ['ট্রানজ্যাকশন ও ACID গ্যারান্টি', 'B-Tree ইনডেক্সিং ও অপ্টিমাইজেশন', '8KB পেজিং, বাফার পুল ও WAL লগিং']
                },
              ].map((m) => (
                <div
                  key={m.step}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    m.status === 'completed'
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                      : m.status === 'ready'
                      ? 'bg-[#13172e] border-indigo-500/40 ring-1 ring-indigo-500/30'
                      : 'bg-[#101322] border-slate-800 text-zinc-400'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 font-bold">
                        ধাপ {m.step}
                      </span>
                      <h4 className="text-xs font-bold text-white">{m.title}</h4>
                      <span className="text-[10px] font-mono text-zinc-500">{m.tag}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400 font-sans">
                      {m.items.map((it) => (
                        <span key={it}>• {it}</span>
                      ))}
                    </div>
                  </div>

                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded shrink-0 self-start md:self-auto ${
                    m.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : m.status === 'ready'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'bg-slate-800 text-zinc-500'
                  }`}>
                    {m.status === 'completed' ? '✓ সম্পন্ন' : m.status === 'ready' ? 'পরবর্তী পাঠ' : 'আসন্ন'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('what-is-db')}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-zinc-300 cursor-pointer"
              >
                প্রথম অধ্যায়ে ফিরে যান
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigate?.('backend-lesson1')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>পরবর্তী পাঠ: Lesson 1 এ যান</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate?.('backend-roadmap')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <span>Phase 1: আর্কিটেকচার রোডম্যাপ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
