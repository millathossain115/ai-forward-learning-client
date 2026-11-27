'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  CheckCircle2,
  XCircle,
  Table as TableIcon,
  Layers,
  Check,
  X,
  RotateCcw,
  UserPlus,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function PrimaryKeyTab() {
  const { language } = useLanguage();
  // Primary Key Playground State & Live Interactive Table
  const initialPkStudents = [
    { id: '101', name: 'Rahim', email: 'rahim@edu.bd', dept: 'CSE' },
    { id: '102', name: 'Karim', email: 'karim@edu.bd', dept: 'BBA' },
    { id: '103', name: 'Nila', email: 'nila@edu.bd', dept: 'EEE' },
    { id: '104', name: 'Afsana', email: 'afsana@edu.bd', dept: 'SWE' },
  ];
  const [pkStudents, setPkStudents] = useState(initialPkStudents);
  const [collidingId, setCollidingId] = useState<string | null>(null);
  const [lastInsertedId, setLastInsertedId] = useState<string | null>(null);
  const [testPkId, setTestPkId] = useState('101');
  const [testPkName, setTestPkName] = useState('Sabbir');
  const [pkAlert, setPkAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  const executePkTest = (idToTest: string, nameToTest: string) => {
    const trimmedId = idToTest.trim();
    const trimmedName = nameToTest.trim();
    setTestPkId(trimmedId);
    setTestPkName(trimmedName);

    if (!trimmedId) {
      setCollidingId(null);
      setLastInsertedId(null);
      setPkAlert({
        type: 'error',
        msgEn: '❌ Error: NOT NULL Constraint Violation! In a relational database, a Primary Key cannot be NULL or empty. Database engine rejected the insert!',
        msgBn: '❌ ত্রুটি: NOT NULL শর্ত লঙ্ঘন! রিলেশনাল ডেটাবেসে প্রাইমারি কি কখনো NULL বা খালি হতে পারে না। ডেটাবেস ইঞ্জিন ইনসার্ট বাতিল করেছে!',
      });
      return;
    }

    const existingMatch = pkStudents.find((s) => s.id === trimmedId);
    if (existingMatch) {
      setCollidingId(trimmedId);
      setLastInsertedId(null);
      setPkAlert({
        type: 'error',
        msgEn: `❌ Error: Primary Key Violation! Student_ID "${trimmedId}" already exists in the table (assigned to ${existingMatch.name}). Primary Keys must be strictly UNIQUE!`,
        msgBn: `❌ ত্রুটি: প্রাইমারি কি ডুপ্লিকেট লঙ্ঘন! Student_ID "${trimmedId}" ইতিমধ্যে টেবিলে বিদ্যমান (${existingMatch.name}-এর জন্য বরাদ্দ)। প্রাইমারি কি অবশ্যই ১০০% ইউনিক হতে হবে!`,
      });
      return;
    }

    // Valid unique insert
    setCollidingId(null);
    setLastInsertedId(trimmedId);
    const newStudent = {
      id: trimmedId,
      name: trimmedName || `Student ${trimmedId}`,
      email: `${(trimmedName || 'student').toLowerCase().replace(/\s+/g, '')}@edu.bd`,
      dept: 'CSE',
    };
    setPkStudents((prev) => [...prev, newStudent]);
    setPkAlert({
      type: 'success',
      msgEn: `✓ Success: Primary Key "${trimmedId}" passed both UNIQUE and NOT NULL constraints! Student "${newStudent.name}" was appended to the live STUDENT table below.`,
      msgBn: `✓ সফল: প্রাইমারি কি "${trimmedId}" ইউনিকনেস এবং NOT NULL উভয় শর্তই পূরণ করেছে! শিক্ষার্থী "${newStudent.name}" নিচের টেবিলে সফলভাবে যুক্ত হয়েছে।`,
    });
  };

  const handleTestInsert = (e: React.FormEvent) => {
    e.preventDefault();
    executePkTest(testPkId, testPkName);
  };

  const handleResetPkTable = () => {
    setPkStudents(initialPkStudents);
    setCollidingId(null);
    setLastInsertedId(null);
    setPkAlert(null);
    setTestPkId('101');
    setTestPkName('Sabbir');
  };

  return (
        <div className="p-6 rounded-2xl bg-[#15171e] border border-amber-500/40 space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <DualText en="3. Primary Key (প্রাইমারি কী)" bn="৩. প্রাইমারি কী (Primary Key)" />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'টেবিলের প্রধান শনাক্তকারী — যা শতভাগ ইউনিক এবং কখনোই NULL হতে পারে না'
                  : 'The principal unique identifier of a relation — strictly UNIQUE and NOT NULL'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shrink-0">
              Unique &amp; NOT NULL
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: A Primary Key is the designated Candidate Key selected by the database designer to uniquely identify every tuple in a table. Once declared, the database engine strictly enforces two iron-clad constraints: No Duplicate Values and No NULL Values!"
              bn="সংজ্ঞা: কোনো টেবিলের সম্ভাব্য ক্যান্ডিডেট কী-সমূহের মধ্য থেকে ডেটাবেস ডিজাইনার যেটিকে প্রধান শনাক্তকারী হিসেবে আনুষ্ঠানিকভাবে বেছে নেন, তাকে Primary Key বলে। প্রাইমারি কি ঘোষণা করলে ডেটাবেস ইঞ্জিন স্বয়ংক্রিয়ভাবে দুটি কঠোর শর্ত বজায় রাখে: কোনো ডুপ্লিকেট মান গ্রহণ করা হবে না এবং মান কখনোই NULL বা ফাঁকা হতে পারবে না!"
            />
          </div>

          {/* 4 Strict Rules of Primary Key */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono text-center">
            <div className="p-3 rounded-xl bg-[#101116] border border-amber-500/30">
              <strong className="text-amber-400 block font-bold">1. 100% Unique</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'কোনো ডুপ্লিকেট নেই' : 'No duplicates allowed'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#101116] border border-rose-500/30">
              <strong className="text-rose-400 block font-bold">2. NOT NULL</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'ফাঁকা থাকা অসম্ভব' : 'Cannot be empty or NULL'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#101116] border border-cyan-500/30">
              <strong className="text-cyan-400 block font-bold">3. Only One PK</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'টেবিল প্রতি মাত্র ১টি' : 'Single key per relation'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#101116] border border-emerald-500/30">
              <strong className="text-emerald-400 block font-bold">4. Fast Index</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'স্বয়ংক্রিয় B-Tree ইনডেক্স' : 'Clustered Index O(log N)'}
              </span>
            </div>
          </div>

          {/* Interactive Simulation & Test Control Center */}
          <div className="p-5 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <DualText
                    en="LIVE PRIMARY KEY CONSTRAINT TESTER & ENGINE SIMULATOR:"
                    bn="লাইভ প্রাইমারি কি সিমুলেটর ও কনস্ট্রেইন্ট পরীক্ষক:"
                  />
                </span>
                <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                  {language === 'bn'
                    ? 'নিচের বোতামগুলো বা ইনপুট ফিল্ড ব্যবহার করে ডুপ্লিকেট ও নাল ভ্যালু টেস্ট করুন এবং টেবিলে তার ফলাফল দেখুন:'
                    : 'Use the quick scenarios or manual input to test duplicate and null violations live against the table:'}
                </span>
              </div>

              {pkStudents.length > initialPkStudents.length && (
                <button
                  onClick={handleResetPkTable}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/[0.12] shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'bn' ? 'টেবিল রিসেট করুন' : 'Reset Table'}</span>
                </button>
              )}
            </div>

            {/* Quick 1-Click Test Scenarios */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">
                {language === 'bn' ? 'দ্রুত টেস্ট সিনারিও (এক ক্লিকে পরীক্ষা করুন):' : 'One-Click Quick Test Scenarios:'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => executePkTest('101', 'Sabbir')}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/50 text-rose-300 cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  <span>{language === 'bn' ? '🔴 টেস্ট ১: ডুপ্লিকেট ID (101 ইনসার্ট করুন)' : '🔴 Test 1: Duplicate ID (101)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => executePkTest('', 'Fahim')}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/50 text-amber-300 cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{language === 'bn' ? '🟡 টেস্ট ২: ফাঁকা / NULL ID ইনসার্ট' : '🟡 Test 2: NULL / Empty ID'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => executePkTest('105', 'Tanvir')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/50 text-emerald-300 cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{language === 'bn' ? '🟢 টেস্ট ৩: নতুন ইউনিক ID (105 ইনসার্ট করুন)' : '🟢 Test 3: Valid New ID (105)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetPkTable}
                  className="px-3 py-1.5 rounded-lg bg-[#15171e] hover:bg-slate-800 border border-white/[0.12] text-zinc-400 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Manual Custom Insert Form */}
            <form onSubmit={handleTestInsert} className="flex flex-col sm:flex-row gap-2 pt-1">
              <div className="relative sm:w-1/3">
                <input
                  type="text"
                  value={testPkId}
                  onChange={(e) => setTestPkId(e.target.value)}
                  placeholder="Student_ID (Primary Key)"
                  className="bg-[#15171e] border border-white/[0.12] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono w-full"
                />
                <span className="absolute right-2.5 top-2.5 text-[9px] font-mono text-amber-400 font-bold">
                  [PK]
                </span>
              </div>
              <input
                type="text"
                value={testPkName}
                onChange={(e) => setTestPkName(e.target.value)}
                placeholder="Student Name (e.g. Tanvir)"
                className="bg-[#15171e] border border-white/[0.12] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-sans sm:w-1/3"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold cursor-pointer transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === 'bn' ? 'ইনসার্ট টেস্ট চালান' : 'Execute Test Insert'}</span>
              </button>
            </form>

            {/* Visual Constraint Feedback Notification */}
            {pkAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-sans flex items-start gap-3 transition-colors ${
                  pkAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                }`}
              >
                {pkAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-mono font-bold block mb-0.5">
                    {pkAlert.type === 'error'
                      ? language === 'bn'
                        ? 'ডেটাবেস ইঞ্জিন কনস্ট্রেইন্ট ভায়োলেশন:'
                        : 'Database Engine Constraint Rejection:'
                      : language === 'bn'
                      ? 'ডেটাবেস ইঞ্জিন ভ্যালিডেশন সফল:'
                      : 'Database Engine Insertion Accepted:'}
                  </span>
                  <span>{language === 'bn' ? pkAlert.msgBn : pkAlert.msgEn}</span>
                </div>
              </div>
            )}
          </div>

          {/* THE LIVE STUDENT RELATION TABLE */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-300 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5" />
                  STUDENT Relation (Live In-Memory State)
                </span>
                <span className="text-zinc-400 font-sans">
                  {language === 'bn'
                    ? `মোট সংরক্ষিত সারি: ${pkStudents.length}টি`
                    : `Total Records in Table: ${pkStudents.length}`}
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {language === 'bn'
                  ? 'Student_ID কলামটি হলো Primary Key [PK]'
                  : 'Student_ID column is designated as Primary Key [PK]'}
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
                    <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-white/[0.08]">
                      {language === 'bn' ? 'রো #' : 'Row #'}
                    </th>

                    {/* Column 1: Student_ID (Primary Key) */}
                    <th className="py-2.5 px-4 bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-extrabold w-44">
                      <div className="flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                        <span>Student_ID</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-bold">
                          [PK]
                        </span>
                      </div>
                    </th>

                    {/* Column 2: Name */}
                    <th className="py-2.5 px-4 text-zinc-300">Name</th>

                    {/* Column 3: Email */}
                    <th className="py-2.5 px-4 text-zinc-300">Email</th>

                    {/* Column 4: Department */}
                    <th className="py-2.5 px-4 text-zinc-300">Department</th>

                    {/* Verification Status */}
                    <th className="py-2.5 px-3 text-right bg-[#15171e] text-amber-300 border-l border-white/[0.08] w-52">
                      {language === 'bn' ? 'প্রাইমারি কি স্ট্যাটাস' : 'PK Integrity Status'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                  {pkStudents.map((student, idx) => {
                    const isColliding = student.id === collidingId;
                    const isNew = student.id === lastInsertedId;

                    return (
                      <tr
                        key={student.id}
                        className={`transition-colors duration-300 ${
                          isColliding
                            ? 'bg-rose-950/50 border-2 border-rose-500 text-white font-bold '
                            : isNew
                            ? 'bg-emerald-950/40 border-2 border-emerald-500 text-white font-bold'
                            : idx % 2 === 0
                            ? 'bg-[#0f1224]/30'
                            : 'bg-[#101116]'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center text-zinc-500 border-r border-white/[0.08] font-mono">
                          {idx + 1}
                        </td>

                        <td
                          className={`py-2.5 px-4 font-bold font-mono ${
                            isColliding
                              ? 'text-rose-300 bg-rose-950/60'
                              : isNew
                              ? 'text-emerald-300 bg-emerald-950/50'
                              : 'text-amber-300 bg-amber-950/20'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{student.id}</span>
                            {isColliding && (
                              <span className="text-[9px] px-1 rounded bg-rose-500 text-white font-bold">
                                COLLISION!
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-2.5 px-4">{student.name}</td>
                        <td className="py-2.5 px-4 text-zinc-400">{student.email}</td>
                        <td className="py-2.5 px-4 text-zinc-400">{student.dept}</td>

                        <td className="py-2.5 px-3 text-right border-l border-white/[0.08] font-mono">
                          {isColliding ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/30 text-rose-300 border border-rose-500/50 inline-flex items-center gap-1">
                              <X className="w-3 h-3" />
                              {language === 'bn' ? 'ডুপ্লিকেট সংঘর্ষ!' : 'Duplicate Collision!'}
                            </span>
                          ) : isNew ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 inline-flex items-center gap-1 animate-bounce">
                              <Check className="w-3 h-3" />
                              {language === 'bn' ? 'নতুন সারি যুক্ত হয়েছে' : 'New Row Inserted'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 text-zinc-400 border border-white/[0.08] inline-flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-400" />
                              {language === 'bn' ? 'অনন্য ও বৈধ' : 'Unique & Valid'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Educational Takeaway Callout */}
            <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] text-xs font-sans flex items-start sm:items-center gap-3">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Layers className="w-4 h-4" />
              </span>
              <div className="leading-snug text-zinc-300 text-[11px]">
                <DualText
                  en="DBMS Storage Insight: Because Student_ID is the Primary Key, the database engine creates a clustered B-Tree index on it. Looking up any student by ID runs in O(log N) time, and the engine automatically prevents duplicates before writing to disk."
                  bn="ডিবিএমএস স্টোরেজ মূল ধারণা: Student_ID প্রাইমারি কি হওয়ায় ডেটাবেস ইঞ্জিন এর ওপর স্বয়ংক্রিয়ভাবে একটি Clustered B-Tree Index তৈরি করে। ফলে যেকোনো শিক্ষার্থীর তথ্য খোঁজা O(log N) সময়ে সম্পন্ন হয় এবং হার্ডডিস্কে লেখার আগেই ইঞ্জিন ডুপ্লিকেট রোধ করে।"
                />
              </div>
            </div>
          </div>
        </div>
  );
}
