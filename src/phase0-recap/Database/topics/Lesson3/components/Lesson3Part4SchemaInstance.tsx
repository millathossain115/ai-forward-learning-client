'use client';

import React, { useState } from 'react';
import { Layers, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part4SchemaInstance() {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'schema' | 'instance'>('schema');
  const [timeSnapshot, setTimeSnapshot] = useState<'T0' | 'T1' | 'T2'>('T0');

  const instanceSnapshots = {
    T0: {
      time: '09:00 AM (সকাল ৯:০০)',
      noteEn: 'Initial morning state: 4 active students enrolled.',
      noteBn: 'সকালের প্রাথমিক অবস্থা: ৪ জন সক্রিয় শিক্ষার্থী নিবন্ধিত।',
      rows: [
        { id: '101', name: 'Rahim', age: 22, dept: 'CSE', cgpa: 3.80, status: 'Existing' },
        { id: '102', name: 'Karim', age: 23, dept: 'BBA', cgpa: 3.65, status: 'Existing' },
        { id: '103', name: 'Nila', age: 21, dept: 'EEE', cgpa: 3.90, status: 'Existing' },
        { id: '104', name: 'Sami', age: 22, dept: 'CSE', cgpa: 3.50, status: 'Existing' },
      ],
    },
    T1: {
      time: '02:30 PM (দুপুর ২:৩০)',
      noteEn: 'Afternoon update: New student "Tanvir" registered. Karim updated CGPA to 3.70.',
      noteBn: 'দুপুরের আপডেট: নতুন শিক্ষার্থী "তানভীর" যোগ হয়েছে এবং করিমের সিজিপিএ আপডেট হয়ে ৩.৭০ হয়েছে।',
      rows: [
        { id: '101', name: 'Rahim', age: 22, dept: 'CSE', cgpa: 3.80, status: 'Existing' },
        { id: '102', name: 'Karim', age: 23, dept: 'BBA', cgpa: 3.70, status: 'Updated' },
        { id: '103', name: 'Nila', age: 21, dept: 'EEE', cgpa: 3.90, status: 'Existing' },
        { id: '104', name: 'Sami', age: 22, dept: 'CSE', cgpa: 3.50, status: 'Existing' },
        { id: '105', name: 'Tanvir', age: 20, dept: 'CSE', cgpa: 3.85, status: 'Inserted' },
      ],
    },
    T2: {
      time: 'Next Semester (পরবর্তী সেমিস্টার)',
      noteEn: 'Graduation update: Sami graduated & departed. New freshman "Afsana" enrolled.',
      noteBn: 'সেমিস্টার পরিবর্তন: সামি গ্র্যাজুয়েশন সম্পন্ন করায় বাদ পড়েছে এবং নতুন ছাত্রী "আফসানা" ভর্তি হয়েছে।',
      rows: [
        { id: '101', name: 'Rahim', age: 23, dept: 'CSE', cgpa: 3.82, status: 'Existing' },
        { id: '102', name: 'Karim', age: 24, dept: 'BBA', cgpa: 3.70, status: 'Existing' },
        { id: '103', name: 'Nila', age: 22, dept: 'EEE', cgpa: 3.92, status: 'Existing' },
        { id: '105', name: 'Tanvir', age: 21, dept: 'CSE', cgpa: 3.88, status: 'Existing' },
        { id: '106', name: 'Afsana', age: 19, dept: 'SWE', cgpa: 3.95, status: 'Inserted' },
      ],
    },
  };

  const currentSnapshot = instanceSnapshots[timeSnapshot];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৫ / ৯' : 'Part 5 of 9'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Relational Schema vs Relational Instance"
              bn="রিলেশনাল স্কিমা (Schema) বনাম রিলেশনাল ইনস্ট্যান্স (Instance)"
            />
          </h2>
        </div>
      </div>

      {/* Core Insight */}
      <div className="p-4 rounded-xl bg-[#15171e] border border-purple-800/40 space-y-1.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wide">
            {language === 'bn'
              ? 'মূল ধারণা: স্কিমা হলো স্থায়ী কাঠামো, ইনস্ট্যান্স হলো নির্দিষ্ট সময়ের ডেটা'
              : 'Core Insight: Schema is the Static Blueprint; Instance is Live Data at Time T'}
          </span>
        </div>
        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="A Relational Instance cannot exist without a Relational Schema. Schema defines the column names, data types, and constraints (like a blank form); Instance is the live rows stored at a specific moment (like filled forms)."
          bn="স্কিমা ছাড়া ইনস্ট্যান্স তৈরি হতে পারে না। স্কিমা টেবিলের কলাম, ডেটা টাইপ ও নিয়ম নির্ধারণ করে (খালি ফরমের মতো); আর ইনস্ট্যান্স হলো নির্দিষ্ট মুহূর্তে সেই ঘরে সংরক্ষিত বাস্তব রেকর্ড (পূরণকৃত ফরমের মতো)।"
        />
      </div>

      {/* Interactive Toggle: Schema vs Instance */}
      <div className="p-5 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            {language === 'bn' ? 'লাইভ আর্কিটেকচার ভিউ (টগল করুন):' : 'Live Architecture View (Toggle):'}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setViewMode('schema')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                viewMode === 'schema'
                  ? 'bg-purple-600 text-white   ring-1 ring-purple-400'
                  : 'bg-[#101116] border border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              {language === 'bn' ? '১. রিলেশনাল স্কিমা (ব্লুপ্রিন্ট)' : '1. Relational Schema (Blueprint)'}
            </button>
            <button
              onClick={() => setViewMode('instance')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                viewMode === 'instance'
                  ? 'bg-emerald-600 text-white   ring-1 ring-emerald-400'
                  : 'bg-[#101116] border border-white/[0.08] text-zinc-400 hover:text-white'
              }`}
            >
              {language === 'bn' ? '২. রিলেশনাল ইনস্ট্যান্স (টাইম স্ন্যাপশট)' : '2. Relational Instance (Time Snapshots)'}
            </button>
          </div>
        </div>

        {viewMode === 'schema' ? (
          <div className="p-5 rounded-xl bg-[#101116] border border-purple-900/50 space-y-4 font-mono text-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] text-purple-400 uppercase font-bold block">
                  {language === 'bn' ? 'গাণিতিক স্কিমা সংকেত:' : 'Mathematical Schema Notation:'}
                </span>
                <span className="text-white font-bold text-sm tracking-wide">
                  STUDENT(<u>Student_ID</u>, Name, Age, Department, CGPA)
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold self-start sm:self-auto">
                {language === 'bn' ? 'Degree = ৫টি কলাম | ০টি রো' : 'Degree = 5 Columns | Zero Data Rows'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-left space-y-1">
                <span className="text-[10px] text-purple-400 font-bold uppercase block">
                  {language === 'bn' ? 'প্রাথমিক কি (PK)' : 'Primary Key'}
                </span>
                <span className="text-white font-bold text-xs block">Student_ID</span>
                <span className="text-[10px] text-zinc-400 block">VARCHAR(10)</span>
                <span className="text-[9px] text-amber-400/90 block">Unique / Not NULL</span>
              </div>
              <div className="p-3 rounded-xl bg-[#15171e] border border-white/[0.08] text-left space-y-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block">Attribute 2</span>
                <span className="text-white font-bold text-xs block">Name</span>
                <span className="text-[10px] text-zinc-400 block">VARCHAR(50)</span>
                <span className="text-[9px] text-zinc-500 block">Alphabetical</span>
              </div>
              <div className="p-3 rounded-xl bg-[#15171e] border border-white/[0.08] text-left space-y-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block">Attribute 3</span>
                <span className="text-white font-bold text-xs block">Age</span>
                <span className="text-[10px] text-zinc-400 block">INT</span>
                <span className="text-[9px] text-zinc-500 block">Range: 16–100</span>
              </div>
              <div className="p-3 rounded-xl bg-[#15171e] border border-white/[0.08] text-left space-y-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block">Attribute 4</span>
                <span className="text-white font-bold text-xs block">Department</span>
                <span className="text-[10px] text-zinc-400 block">VARCHAR(20)</span>
                <span className="text-[9px] text-zinc-500 block">Academic Dept</span>
              </div>
              <div className="p-3 rounded-xl bg-[#15171e] border border-white/[0.08] text-left space-y-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block">Attribute 5</span>
                <span className="text-white font-bold text-xs block">CGPA</span>
                <span className="text-[10px] text-zinc-400 block">DECIMAL(3,2)</span>
                <span className="text-[9px] text-emerald-400/90 block">0.00 to 4.00</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-[#101116] border border-emerald-900/50 space-y-4 font-mono text-xs animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-xs">
                  {language === 'bn' ? 'ইনস্ট্যান্স টাইম স্ন্যাপশট:' : 'Instance Snapshot Time:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['T0', 'T1', 'T2'] as const).map((snapKey) => (
                  <button
                    key={snapKey}
                    onClick={() => setTimeSnapshot(snapKey)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                      timeSnapshot === snapKey
                        ? 'bg-emerald-500 text-black  font-extrabold'
                        : 'bg-[#15171e] text-zinc-400 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {snapKey} {snapKey === 'T0' ? '(Morning)' : snapKey === 'T1' ? '(Afternoon)' : '(Semester 2)'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 text-[11px] font-sans flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-mono text-emerald-200 block">{currentSnapshot.time}</strong>
                <span>{language === 'bn' ? currentSnapshot.noteBn : currentSnapshot.noteEn}</span>
              </div>
            </div>

            <div className="overflow-x-auto text-[11px] rounded-lg border border-white/[0.08]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#12162a] border-b border-white/[0.08] text-zinc-300">
                    <th className="py-2 px-3">Student_ID</th>
                    <th className="py-2 px-3">Name</th>
                    <th className="py-2 px-3">Age</th>
                    <th className="py-2 px-3">Department</th>
                    <th className="py-2 px-3">CGPA</th>
                    <th className="py-2 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                  {currentSnapshot.rows.map((s) => (
                    <tr
                      key={s.id}
                      className={
                        s.status === 'Inserted'
                          ? 'bg-emerald-500/10'
                          : s.status === 'Updated'
                          ? 'bg-amber-500/10'
                          : 'hover:bg-slate-800/30'
                      }
                    >
                      <td className="py-2 px-3 font-bold text-amber-300">{s.id}</td>
                      <td className="py-2 px-3 text-white font-sans">{s.name}</td>
                      <td className="py-2 px-3">{s.age}</td>
                      <td className="py-2 px-3">{s.dept}</td>
                      <td className="py-2 px-3 font-bold text-emerald-400">{s.cgpa.toFixed(2)}</td>
                      <td className="py-2 px-3 text-right">
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded font-mono ${
                            s.status === 'Inserted'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                              : s.status === 'Updated'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                              : 'text-zinc-500'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116] text-xs font-mono">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
                <th className="py-2 px-3 text-purple-400 w-1/2">
                  {language === 'bn' ? 'রিলেশনাল স্কিমা (Schema)' : 'Relational Schema'}
                </th>
                <th className="py-2 px-3 text-emerald-400 w-1/2">
                  {language === 'bn' ? 'রিলেশনাল ইনস্ট্যান্স (Instance)' : 'Relational Instance'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.08] text-zinc-300 text-[11px]">
              <tr>
                <td className="py-2 px-3 font-bold text-white">
                  {language === 'bn' ? 'টেবিলের স্থায়ী গঠন, কলাম ও ডেটা টাইপ' : 'Static table structure, columns & types'}
                </td>
                <td className="py-2 px-3 text-emerald-300">
                  {language === 'bn' ? 'নির্দিষ্ট সময়ে সংরক্ষিত ডেটার স্ন্যাপশট' : 'Actual rows stored at a moment in time'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-white">
                  {language === 'bn' ? 'খুব কম পরিবর্তিত হয় (DDL: ALTER TABLE)' : 'Changes rarely (DDL: ALTER TABLE)'}
                </td>
                <td className="py-2 px-3 text-emerald-300">
                  {language === 'bn' ? 'প্রতিনিয়ত পরিবর্তিত হয় (DML: INSERT/UPDATE/DELETE)' : 'Changes constantly (DML: INSERT/UPDATE/DELETE)'}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-white">
                  {language === 'bn' ? 'উপমা: খালি হাজিরা খাতা বা ব্যাংক ফরম' : 'Analogy: Blank attendance sheet / form'}
                </td>
                <td className="py-2 px-3 text-emerald-300">
                  {language === 'bn' ? 'উপমা: আজকের পূরণ করা হাজিরা বা আবেদনপত্র' : 'Analogy: Today’s filled attendance / form'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
