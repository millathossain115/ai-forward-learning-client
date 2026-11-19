'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Lock,
  Link2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson4Part2KeyTypes() {
  const { language } = useLanguage();

  const [activeKeyType, setActiveKeyType] = useState<
    'super' | 'candidate' | 'primary' | 'alternate' | 'foreign' | 'composite' | 'unique' | 'surrogate'
  >('primary');

  // Primary Key Playground State (Duplicate test)
  const [testPkId, setTestPkId] = useState('101');
  const [testPkName, setTestPkName] = useState('Sabbir');
  const [pkAlert, setPkAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  // Foreign Key Playground State (Referential integrity test)
  const [selectedDeptId, setSelectedDeptId] = useState('D01');
  const [fkAlert, setFkAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  // Existing Students Table
  const existingStudents = [
    { id: '101', name: 'Rahim', email: 'rahim@gmail.com', deptId: 'D01' },
    { id: '102', name: 'Karim', email: 'karim@gmail.com', deptId: 'D02' },
    { id: '103', name: 'Nila', email: 'nila@gmail.com', deptId: 'D03' },
  ];

  // Existing Departments Table
  const departments = [
    { id: 'D01', name: 'Computer Science & Engineering (CSE)' },
    { id: 'D02', name: 'Business Administration (BBA)' },
    { id: 'D03', name: 'Electrical & Electronic Engineering (EEE)' },
  ];

  // Handle PK Test Insert
  const handleTestInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingStudents.some((s) => s.id === testPkId.trim())) {
      setPkAlert({
        type: 'error',
        msgEn: `❌ Error: Primary Key Violation! Student_ID "${testPkId}" already exists. Duplicate keys are strictly rejected by the database engine.`,
        msgBn: `❌ ত্রুটি: প্রাইমারি কি লঙ্ঘন! Student_ID "${testPkId}" ইতিমধ্যে টেবিলে বিদ্যমান। ডেটাবেস ইঞ্জিন কোনো ডুপ্লিকেট কি গ্রহণ করে না।`,
      });
    } else if (!testPkId.trim()) {
      setPkAlert({
        type: 'error',
        msgEn: '❌ Error: Primary Key cannot be NULL or empty!',
        msgBn: '❌ ত্রুটি: প্রাইমারি কি কখনো NULL বা খালি হতে পারে না!',
      });
    } else {
      setPkAlert({
        type: 'success',
        msgEn: `✓ Success: Student "${testPkName}" with unique ID "${testPkId}" successfully accepted by the Primary Key constraint.`,
        msgBn: `✓ সফল: অনন্য আইডি "${testPkId}" সহ শিক্ষার্থী "${testPkName}" সফলভাবে প্রাইমারি কি কনস্ট্রেইন্ট দ্বারা গৃহীত হয়েছে।`,
      });
    }
  };

  // Handle FK Test Assignment
  const handleFkTest = (deptId: string) => {
    setSelectedDeptId(deptId);
    if (deptId === 'D99') {
      setFkAlert({
        type: 'error',
        msgEn: '❌ Referential Integrity Violation! Dept_ID "D99" does not exist in parent table "DEPARTMENT". Database rejected the orphan record!',
        msgBn: '❌ রেফারেন্সিয়াল ইন্টিগ্রিটি লঙ্ঘন! মূল টেবিল "DEPARTMENT"-এ "D99" নামের কোনো বিভাগ নেই। ডেটাবেস এই অনাথ রেকর্ড বাতিল করেছে!',
      });
    } else {
      setFkAlert({
        type: 'success',
        msgEn: `✓ Referential Integrity Verified: Foreign Key "${deptId}" matches a valid Primary Key in the DEPARTMENT parent table.`,
        msgBn: `✓ রেফারেন্সিয়াল ইন্টিগ্রিটি সঠিক: ফরেন কি "${deptId}" মূল DEPARTMENT টেবিলের একটি বৈধ প্রাইমারি কি-এর সাথে মিলে গেছে।`,
      });
    }
  };

  const keyTabs = [
    { id: 'super', labelEn: '1. Super Key', labelBn: '১. সুপার কী', tagEn: 'All Unique Combos', tagBn: 'সকল অনন্য কম্বিনেশন' },
    { id: 'candidate', labelEn: '2. Candidate Key', labelBn: '২. ক্যান্ডিডেট কী', tagEn: 'Minimal Super Key', tagBn: 'ন্যূনতম সুপার কী' },
    { id: 'primary', labelEn: '3. Primary Key', labelBn: '৩. প্রাইমারি কী', tagEn: 'Main Unique ID', tagBn: 'প্রধান অনন্য আইডি' },
    { id: 'alternate', labelEn: '4. Alternate Key', labelBn: '৪. অল্টারনেট কী', tagEn: 'Remaining Candidates', tagBn: 'বিকল্প ক্যান্ডিডেটসমূহ' },
    { id: 'foreign', labelEn: '5. Foreign Key', labelBn: '৫. ফরেন কী', tagEn: 'Connects Tables', tagBn: 'টেবিলের সংযোগ' },
    { id: 'composite', labelEn: '6. Composite Key', labelBn: '৬. কম্পোজিট কী', tagEn: 'Multiple Columns', tagBn: 'একাধিক কলামের কি' },
    { id: 'unique', labelEn: '7. Unique Key', labelBn: '৭. ইউনিক কী', tagEn: 'No Duplicates', tagBn: 'ডুপ্লিকেটহীন' },
    { id: 'surrogate', labelEn: '8. Natural vs Surrogate', labelBn: '৮. ন্যাচারাল বনাম সারোগেট', tagEn: 'Real vs Artificial', tagBn: 'বাস্তব বনাম কৃত্রিম' },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ২ / ৮' : 'Part 2 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="The 8 Types of Keys in DBMS"
              bn="ডিবিএমএস-এ ৮ ধরনের কী (8 Types of Keys)"
            />
          </h2>
        </div>
      </div>

      {/* 8 Key Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {keyTabs.map((tab) => {
          const isActive = activeKeyType === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveKeyType(tab.id as typeof activeKeyType)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-md'
                  : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <span className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {language === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {language === 'bn' ? tab.tagBn : tab.tagEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------
          TAB 1: SUPER KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'super' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText en="1. Super Key (সুপার কী)" bn="১. সুপার কী (Super Key)" />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {language === 'bn' ? 'যেকোনো অনন্য কম্বিনেশন' : 'Any Unique Combination'}
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A Super Key is a set of one or more attributes that uniquely identifies each tuple in a relation. Important Point: A Super Key can contain unnecessary (redundant) attributes!"
              bn="সংজ্ঞা: কোনো টেবিলের এক বা একাধিক অ্যাট্রিবিউটের এমন যেকোনো সেট যা প্রতিটি সারিকে অদ্বিতীয়ভাবে শনাক্ত করতে পারে, তাকে সুপার কী বলে। গুরুত্বপূর্ণ বিষয়: সুপার কীতে অপ্রয়োজনীয় বা অতিরিক্ত কলামও যুক্ত থাকতে পারে!"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-xs font-mono">
            <span className="text-zinc-400 text-[10px] uppercase font-bold block">
              {language === 'bn'
                ? 'STUDENT(Student_ID, Email, Name, Department) টেবিলের জন্য বৈধ সুপার কীসমূহ:'
                : 'Valid Super Keys for STUDENT(Student_ID, Email, Name, Department):'}
            </span>
            <div className="flex flex-wrap gap-2 text-indigo-300">
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Student_ID</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Email</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Student_ID + Name</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Email + Department</span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-800">• Student_ID + Email + Name</span>
            </div>
            <div className="text-[11px] text-zinc-400 font-sans pt-1">
              <DualText
                en="Notice: Student_ID alone is sufficient, but Student_ID + Name is ALSO a Super Key because it uniquely identifies the row."
                bn="খেয়াল করুন: শুধু Student_ID একাই রেকর্ডটি শনাক্ত করতে পারে, কিন্তু Student_ID + Name-ও একটি সুপার কী, কারণ এটি দিয়েও রেকর্ডটি ইউনিকভাবেই পাওয়া যায়।"
              />
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 2: CANDIDATE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'candidate' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText en="2. Candidate Key (ক্যান্ডিডেট কী)" bn="২. ক্যান্ডিডেট কী (Candidate Key)" />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'ন্যূনতম সুপার কী (Minimal SK)' : 'Minimal Super Key'}
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A Candidate Key is a minimal Super Key that uniquely identifies each tuple in a relation without any redundant attributes."
              bn="সংজ্ঞা: ক্যান্ডিডেট কী হলো এমন একটি ন্যূনতম (Minimal) সুপার কী, যেখান থেকে কোনো কলাম বাদ দিলে সেটি আর অনন্য বা ইউনিক থাকে না। এতে কোনো অপ্রয়োজনীয় কলাম থাকে না।"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
              <span className="text-indigo-400 font-bold block">
                {language === 'bn' ? 'সুপার কী (Super Key):' : 'Super Key:'}
              </span>
              <div className="text-zinc-300 leading-snug font-sans text-[11px]">
                <DualText
                  en="May contain extra fields (e.g. Student_ID + Name). Can be minimal or non-minimal."
                  bn="অতিরিক্ত কলাম থাকতে পারে (যেমন: Student_ID + Name)। এটি ন্যূনতম হতেও পারে, নাও হতে পারে।"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/40 space-y-1">
              <span className="text-cyan-400 font-bold block">
                {language === 'bn' ? 'ক্যান্ডিডেট কী (Candidate Key):' : 'Candidate Key:'}
              </span>
              <div className="text-zinc-300 leading-snug font-sans text-[11px]">
                <DualText
                  en="Must be minimal (e.g. Student_ID or Email). No attribute can be removed without losing uniqueness!"
                  bn="অবশ্যই ন্যূনতম হতে হবে (যেমন: Student_ID অথবা Email)। কোনো কলাম বাদ দেওয়া সম্ভব নয়!"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono text-center text-amber-300 font-bold">
            <DualText
              en="“Every Candidate Key is a Super Key, but every Super Key is NOT a Candidate Key!”"
              bn="“প্রতিটি ক্যান্ডিডেট কী-ই একটি সুপার কী, কিন্তু প্রতিটি সুপার কী ক্যান্ডিডেট কী নয়!”"
            />
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 3: PRIMARY KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'primary' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-amber-500/40 space-y-5 animate-in fade-in duration-200 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText en="3. Primary Key (প্রাইমারি কী)" bn="৩. প্রাইমারি কী (Primary Key)" />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
              Unique &amp; NOT NULL
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A Primary Key is the selected Candidate Key chosen by the database designer to uniquely identify each tuple in a relation."
              bn="সংজ্ঞা: কোনো টেবিলের একাধিক ক্যান্ডিডেট কী-এর মধ্য থেকে ডেটাবেস ডিজাইনার যেটিকে প্রধান শনাক্তকারী হিসেবে চূড়ান্তভাবে মনোনীত করেন, তাকে Primary Key বলে।"
            />
          </div>

          {/* 4 Strict Rules of Primary Key */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
            <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
              <strong className="text-amber-400 block">1. Unique</strong>
              <span className="text-[10px] text-zinc-500">
                {language === 'bn' ? 'কোনো ডুপ্লিকেট নেই' : 'No duplicates'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
              <strong className="text-rose-400 block">2. NOT NULL</strong>
              <span className="text-[10px] text-zinc-500">
                {language === 'bn' ? 'ফাঁকা থাকা চলবে না' : 'Cannot be empty'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
              <strong className="text-cyan-400 block">3. Only One PK</strong>
              <span className="text-[10px] text-zinc-500">
                {language === 'bn' ? 'টেবিল প্রতি মাত্র ১টি' : 'Per table constraint'}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#0c0e18] border border-slate-800">
              <strong className="text-emerald-400 block">4. Fast Index</strong>
              <span className="text-[10px] text-zinc-500">
                {language === 'bn' ? 'স্বয়ংক্রিয় ইনডেক্স' : 'B-Tree indexed'}
              </span>
            </div>
          </div>

          {/* Interactive Duplicate Insert Simulator */}
          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <DualText
                en="Primary Key Interactive Simulator: Try inserting Student_ID 101"
                bn="ইন্টারেক্টিভ সিমুলেটর: ডুপ্লিকেট Student_ID 101 ইনসার্ট করে পরীক্ষা করুন"
              />
            </span>

            <form onSubmit={handleTestInsert} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={testPkId}
                onChange={(e) => setTestPkId(e.target.value)}
                placeholder="Student ID (e.g. 101 or 105)"
                className="bg-[#121526] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono w-full sm:w-1/3"
              />
              <input
                type="text"
                value={testPkName}
                onChange={(e) => setTestPkName(e.target.value)}
                placeholder="Student Name"
                className="bg-[#121526] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-sans w-full sm:w-1/3"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer transition-all shadow-md shrink-0"
              >
                {language === 'bn' ? 'পরীক্ষামূলক ইনসার্ট' : 'Test Insert'}
              </button>
            </form>

            {pkAlert && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  pkAlert.type === 'error'
                    ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                    : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                }`}
              >
                {pkAlert.type === 'error' ? (
                  <XCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>{language === 'bn' ? pkAlert.msgBn : pkAlert.msgEn}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 4: ALTERNATE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'alternate' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText
                en="4. Alternate Key (অল্টারনেট বা বিকল্প কী)"
                bn="৪. অল্টারনেট বা বিকল্প কী (Alternate Key)"
              />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {language === 'bn' ? 'অবশিষ্ট ক্যান্ডিডেট কী' : 'Unselected Candidate Keys'}
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: An Alternate Key is any Candidate Key that was not chosen as the Primary Key."
              bn="সংজ্ঞা: কোনো টেবিলের যেসব ক্যান্ডিডেট কী-কে প্রাইমারি কী হিসেবে নির্বাচন করা হয়নি, তাদের প্রতিটিকে Alternate Key বা বিকল্প কী বলে।"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-xs font-mono">
            <span className="text-zinc-400 text-[10px] uppercase font-bold block">
              {language === 'bn' ? 'বাস্তব দৃশ্যপট:' : 'Example Scenario:'}
            </span>
            <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-1">
              <div>
                {language === 'bn'
                  ? 'উপলব্ধ ক্যান্ডিডেট কীসমূহ:'
                  : 'Candidate Keys available:'}{' '}
                <code>Student_ID</code>, <code>Email</code>
              </div>
              <div className="text-amber-400 font-bold">
                {language === 'bn'
                  ? 'প্রাইমারি কি নির্বাচিত:'
                  : 'Selected as Primary Key:'}{' '}
                Student_ID
              </div>
              <div className="text-purple-300 font-bold">
                {language === 'bn'
                  ? 'অল্টারনেট কি হিসেবে অবশিষ্ট:'
                  : 'Becomes Alternate Key:'}{' '}
                Email
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 5: FOREIGN KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'foreign' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-emerald-500/40 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText
                en="5. Foreign Key & Referential Integrity"
                bn="৫. ফরেন কী (Foreign Key) ও রেফারেন্সিয়াল ইন্টিগ্রিটি"
              />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              Parent ← Child Link
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A Foreign Key is an attribute in one table (child) that references the Primary Key or candidate key of another table (parent), establishing an unbreakable relationship."
              bn="সংজ্ঞা: ফরেন কি হলো কোনো চাইল্ড টেবিলের এমন একটি কলাম যা প্যারেন্ট টেবিলের প্রাইমারি কি-কে নির্দেশ করে এবং তাদের মাঝে দৃঢ় সম্পর্ক গড়ে তোলে।"
            />
          </div>

          {/* Parent-Child Table Visual Linkage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-amber-400 font-bold">
                  {language === 'bn' ? 'মূল টেবিল: DEPARTMENT (Parent)' : 'Parent Table: DEPARTMENT'}
                </span>
                <span className="text-[10px] text-zinc-500">PK: Dept_ID</span>
              </div>
              <div className="space-y-1">
                {departments.map((d) => (
                  <div
                    key={d.id}
                    className={`p-2 rounded-lg transition-all flex justify-between items-center ${
                      selectedDeptId === d.id
                        ? 'bg-amber-500/20 border border-amber-500/60 text-white font-bold'
                        : 'bg-black/30 border border-slate-800/80 text-zinc-400'
                    }`}
                  >
                    <span className="text-amber-300 font-bold">{d.id}</span>
                    <span className="text-[11px] text-zinc-300">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="text-emerald-400 font-bold">
                  {language === 'bn' ? 'অধীন টেবিল: STUDENT (Child)' : 'Child Table: STUDENT'}
                </span>
                <span className="text-[10px] text-zinc-500">FK: Dept_ID → Dept</span>
              </div>
              <div className="space-y-1">
                {existingStudents.map((s) => (
                  <div
                    key={s.id}
                    className={`p-2 rounded-lg transition-all flex justify-between items-center ${
                      selectedDeptId === s.deptId
                        ? 'bg-emerald-500/20 border border-emerald-500/60 text-white font-bold'
                        : 'bg-black/30 border border-slate-800/80 text-zinc-400'
                    }`}
                  >
                    <span>
                      {s.id} · {s.name}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-emerald-400 font-bold border border-emerald-500/30">
                      FK: {s.deptId}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Referential Integrity Tester */}
          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-emerald-400" />
              <DualText
                en="Referential Integrity Test: Select Department for Student"
                bn="রেফারেন্সিয়াল ইন্টিগ্রিটি টেস্ট: শিক্ষার্থীর বিভাগ নির্বাচন করুন"
              />
            </span>

            <div className="flex flex-wrap gap-2">
              {['D01', 'D02', 'D03', 'D99'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleFkTest(d)}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedDeptId === d
                      ? d === 'D99'
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                        : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-[#121526] border-slate-800 text-zinc-400'
                  }`}
                >
                  Dept_ID: {d} {d === 'D99' ? (language === 'bn' ? '(অবৈধ বিভাগ)' : '(Invalid Dept)') : ''}
                </button>
              ))}
            </div>

            {fkAlert && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  fkAlert.type === 'error'
                    ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                    : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                }`}
              >
                {fkAlert.type === 'error' ? (
                  <XCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                )}
                <span>{language === 'bn' ? fkAlert.msgBn : fkAlert.msgEn}</span>
              </div>
            )}
          </div>

          {/* Foreign Key Rules Strip */}
          <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-slate-800 text-xs font-mono space-y-1">
            <span className="text-zinc-400 font-bold block text-[10px] uppercase">
              {language === 'bn' ? 'ফরেন কী-এর মূল নিয়মসমূহ:' : 'Core Foreign Key Rules:'}
            </span>
            <ul className="list-disc list-inside text-zinc-300 space-y-0.5 text-[11px] font-sans">
              <li>
                {language === 'bn'
                  ? 'একটি টেবিলে একাধিক Foreign Key থাকতে পারে।'
                  : 'A table can have multiple Foreign Keys.'}
              </li>
              <li>
                {language === 'bn'
                  ? 'Foreign Key কলামে ডুপ্লিকেট মান থাকতে পারে (একাধিক ছাত্র একই বিভাগে পড়তে পারে)।'
                  : 'Foreign Keys CAN have duplicate values (many students in the same department).'}
              </li>
              <li>
                {language === 'bn'
                  ? 'Foreign Key কলামে NULL মান গ্রহণযোগ্য হতে পারে (যদি কোনো ছাত্র এখনো কোনো বিভাগে ভর্তি না হয়)।'
                  : 'Foreign Keys CAN be NULL if a student has not declared a major yet.'}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 6: COMPOSITE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'composite' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText
                en="6. Composite Key (কম্পোজিট বা যৌথ কী)"
                bn="৬. কম্পোজিট বা যৌথ কী (Composite Key)"
              />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
              ≥ 2 Attributes
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A Composite Key is a primary or candidate key that consists of two or more attributes combined together to uniquely identify a record."
              bn="সংজ্ঞা: যখন কোনো টেবিলে একক কোনো কলাম দিয়ে প্রতিটি সারি আলাদা করা যায় না, তখন দুই বা ততোধিক কলামকে একত্রিত করে যে অনন্য কি তৈরি করা হয়, তাকে Composite Key বলে।"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2 text-xs font-mono">
            <span className="text-zinc-400 text-[10px] uppercase font-bold block">
              {language === 'bn'
                ? 'ENROLLMENT টেবিলের বাস্তব উদাহরণ (Junction Table):'
                : 'ENROLLMENT Table Example (Junction Table):'}
            </span>
            <div className="overflow-x-auto text-[11px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-pink-300">
                    <th className="py-1 px-2">Student_ID</th>
                    <th className="py-1 px-2">Course_ID</th>
                    <th className="py-1 px-2">Semester</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                  <tr>
                    <td className="py-1 px-2 font-bold text-white">101</td>
                    <td className="py-1 px-2">CSE101</td>
                    <td className="py-1 px-2">Spring 2026</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-bold text-white">101</td>
                    <td className="py-1 px-2">CSE201</td>
                    <td className="py-1 px-2">Spring 2026</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 font-bold text-white">102</td>
                    <td className="py-1 px-2">CSE101</td>
                    <td className="py-1 px-2">Spring 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-zinc-400 font-sans pt-1">
              <DualText
                en="Notice: Student_ID repeats, Course_ID repeats. But (Student_ID + Course_ID + Semester) together is 100% unique!"
                bn="খেয়াল করুন: Student_ID বারবার আসছে, Course_ID-ও বারবার আসছে। কিন্তু (Student_ID + Course_ID + Semester) একত্রে শতভাগ ইউনিক!"
              />
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 7: UNIQUE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'unique' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText
                en="7. Unique Key (ইউনিক কী কনস্ট্রেইন্ট)"
                bn="৭. ইউনিক কী (Unique Key Constraint)"
              />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Integrity Constraint
            </span>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A Unique Key constraint prevents duplicate values in a column or set of columns while still permitting NULL values (depending on DBMS)."
              bn="সংজ্ঞা: ইউনিক কি কনস্ট্রেইন্ট কোনো কলামে একই মান ডুপ্লিকেট হিসেবে জমা হওয়া সম্পূর্ণ নিষিদ্ধ করে, তবে এটি NULL মান ধারণ করতে পারে।"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18] text-xs font-mono">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                  <th className="py-2 px-3 text-amber-400 w-1/2">
                    {language === 'bn' ? 'প্রাইমারি কী (Primary Key)' : 'Primary Key'}
                  </th>
                  <th className="py-2 px-3 text-cyan-400 w-1/2">
                    {language === 'bn' ? 'ইউনিক কী (Unique Key)' : 'Unique Constraint'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                <tr>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'সারিকে অনন্যভাবে চিহ্নিত করে' : 'Identifies the row uniquely'}
                  </td>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'কলামে পুনরাবৃত্তি রোধ করে' : 'Prevents duplicate values in specific column'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'কখনোই NULL হতে পারে না' : 'Strictly CANNOT contain NULL'}
                  </td>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'NULL মান গ্রহণ করতে পারে' : 'Can contain NULL (PostgreSQL allows multiple NULLs)'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'টেবিল প্রতি মাত্র একটিই থাকে' : 'Only ONE Primary Key per table'}
                  </td>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'টেবিলে একাধিক ইউনিক কী থাকতে পারে' : 'MULTIPLE Unique constraints allowed per table'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 8: NATURAL VS SURROGATE
         ---------------------------------------------------- */}
      {activeKeyType === 'surrogate' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              <DualText
                en="8. Natural Key vs Surrogate Key"
                bn="৮. ন্যাচারাল কী বনাম সারোগেট কী (Natural vs Surrogate Key)"
              />
            </h3>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Design Patterns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
              <span className="text-indigo-400 font-bold block">
                {language === 'bn' ? 'ন্যাচারাল কী (Natural Key):' : 'Natural Key:'}
              </span>
              <div className="text-zinc-300 leading-snug font-sans text-[11px]">
                <DualText
                  en="Has real-world business meaning outside the DB. Examples: National ID (NID), Passport Number, ISBN of a book, Product SKU."
                  bn="ডেটাবেসের বাইরেও বাস্তব জগতে এর সরাসরি অর্থ বা অস্তিত্ব রয়েছে। উদাহরণ: জাতীয় পরিচয়পত্র (NID), পাসপোর্ট নম্বর, বইয়ের ISBN নম্বর।"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40 space-y-1">
              <span className="text-emerald-400 font-bold block">
                {language === 'bn' ? 'সারোগেট কী (Surrogate Key):' : 'Surrogate Key:'}
              </span>
              <div className="text-zinc-300 leading-snug font-sans text-[11px]">
                <DualText
                  en="Artificially generated sequence with no outside meaning. Examples: id = 1001, 1002, auto-increment UUIDs. Much faster for joins!"
                  bn="কৃত্রিমভাবে উৎপন্ন অটো-ইনক্রিমেন্ট আইডি বা UUID, যার বাইরের জগতে কোনো অর্থ নেই। কিন্তু টেবিল জয়েন করতে এটি দ্রুততম ও কার্যকর।"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
