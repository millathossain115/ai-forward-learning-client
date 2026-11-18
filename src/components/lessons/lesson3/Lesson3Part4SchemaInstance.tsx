'use client';

import React, { useState } from 'react';
import {
  Layers,
  FileSpreadsheet,
  Building,
  GraduationCap,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part4SchemaInstance() {
  const { language } = useLanguage();

  // Default view is set to 'schema' as requested
  const [viewMode, setViewMode] = useState<'schema' | 'instance'>('schema');

  // Instance time snapshot selector: T0, T1, T2
  const [timeSnapshot, setTimeSnapshot] = useState<'T0' | 'T1' | 'T2'>('T0');

  // Active Real-World Analogy Tab
  const [analogyTab, setAnalogyTab] = useState<'attendance' | 'bank' | 'university'>('attendance');

  // Data snapshots for Instance visualization
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
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৬ ও ৭ / ১৩' : 'Part 6 & 7 of 13'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Relational Schema vs Relational Instance"
              bn="রিলেশনাল স্কিমা (Schema) বনাম রিলেশনাল ইনস্ট্যান্স (Instance)"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Core Theoretical Insight Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#0e1224] border border-purple-800/40 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wide">
              {language === 'bn'
                ? 'মূল বোঝাপড়া: ইনস্ট্যান্সের অস্তিত্ব স্কিমার ওপর নির্ভরশীল'
                : 'Core Insight: Instance strictly depends on Schema'}
            </span>
          </div>
          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="A Relational Instance cannot exist without a Relational Schema! The Schema serves as the non-negotiable structural foundation, blueprinted rules, and data types. The Instance is merely the live information occupying those pre-designed slots at a specific moment in time."
              bn="একটি রিলেশনাল ইনস্ট্যান্স সম্পূর্ণভাবে তার রিলেশনাল স্কিমার ওপর নির্ভরশীল! স্কিমা ছাড়া কখনো কোনো ইনস্ট্যান্স তৈরি হতে পারে না। কারণ স্কিমা হলো ভিত্তি ও অনুমোদিত ঘর—আর ইনস্ট্যান্স হলো নির্দিষ্ট মুহূর্তে সেই ঘরে সংরক্ষিত বাস্তব তথ্যের একটি জীবন্ত প্রতিচ্ছবি।"
            />
          </div>
        </div>

        {/* Visual Relationship Flow (Premium Illustrated Comparison) */}
        <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-b from-[#0c0e18] to-[#101322] border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              {language === 'bn'
                ? 'ভিজ্যুয়াল আর্কিটেকচার: ব্লুপ্রিন্ট কীভাবে ডেটা ধারণ করে'
                : 'Visual Architecture: How Blueprint Governs Live Data'}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {language === 'bn'
                ? 'স্কিমা (খালি কাঠামো) ➔ ইনস্ট্যান্স (বাস্তব রেকর্ড)'
                : 'Schema (Empty Skeleton) ➔ Instance (Live Tuples)'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-center">
            {/* 1. Schema Card (Columns 1-5) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-[#12162a]/90 border border-purple-500/30 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  {language === 'bn' ? '১. রিলেশনাল স্কিমা (ব্লুপ্রিন্ট)' : '1. Relational Schema (Blueprint)'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                  {language === 'bn' ? 'স্থায়ী কাঠামো (Static)' : 'Static Blueprint'}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  STUDENT(<u>Student_ID</u>, Name, Dept, CGPA)
                </span>
                <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                  {language === 'bn'
                    ? 'কলাম, ডেটা টাইপ ও নিয়মের ছক (কোনো ডেটা রো নেই)'
                    : 'Definition of columns & types with zero data rows'}
                </span>
              </div>

              {/* Mini Skeleton Table with Types & Empty Slots */}
              <div className="rounded-lg border border-purple-900/40 bg-[#090b14] overflow-hidden text-[10px] font-mono">
                <div className="grid grid-cols-4 bg-purple-950/30 border-b border-purple-900/50 py-1.5 px-2 text-purple-300 font-bold text-center">
                  <span>ID (PK)</span>
                  <span>Name</span>
                  <span>Dept</span>
                  <span>CGPA</span>
                </div>
                <div className="grid grid-cols-4 bg-black/40 border-b border-slate-800/60 py-1 px-2 text-zinc-500 text-center text-[9px]">
                  <span>VARCHAR(10)</span>
                  <span>VARCHAR(50)</span>
                  <span>VARCHAR(20)</span>
                  <span>DECIMAL(3,2)</span>
                </div>
                {/* Empty dashed placeholder slots indicating schema has no data */}
                <div className="py-2.5 px-2 text-center text-zinc-500 italic border-b border-dashed border-slate-800 bg-[#070910]">
                  {language === 'bn' ? '┄ [খালি স্লট ১ : ডেটার জন্য প্রস্তুত] ┄' : '┄ [Slot 1: Awaiting Records] ┄'}
                </div>
                <div className="py-2.5 px-2 text-center text-zinc-600 italic bg-[#070910]">
                  {language === 'bn' ? '┄ [খালি স্লট ২ : ডেটার জন্য প্রস্তুত] ┄' : '┄ [Slot 2: Awaiting Records] ┄'}
                </div>
              </div>

              <div className="text-[10px] text-purple-300/80 font-sans flex items-center justify-between">
                <span>Degree: 4 Attributes</span>
                <span className="text-zinc-500">Cardinality: 0 Tuples</span>
              </div>
            </div>

            {/* Middle Connector Bridge (Column 6) */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center gap-1.5 py-2 lg:py-0 text-center">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-300">
                {language === 'bn' ? 'নিয়ন্ত্রণ করে' : 'Governs'}
              </span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600/30 to-emerald-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-md">
                <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
              </div>
              <span className="text-[8px] font-mono text-zinc-400">
                {language === 'bn' ? 'স্কিমা ছাড়া ইনস্ট্যান্স অসম্ভব' : 'Instance depends on Schema'}
              </span>
            </div>

            {/* 2. Instance Card (Columns 7-11) */}
            <div className="lg:col-span-5 p-4 rounded-xl bg-[#12221e]/80 border border-emerald-500/30 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'bn' ? '২. রিলেশনাল ইনস্ট্যান্স (ডেটা)' : '2. Relational Instance (Live Data)'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                  {language === 'bn' ? 'সময় T-এর স্ন্যাপশট' : 'Snapshot at Time T'}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  {language === 'bn' ? 'সময় T₀-তে সংরক্ষিত রেকর্ডসমূহ' : 'Live Population at Time T₀'}
                </span>
                <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                  {language === 'bn'
                    ? 'স্কিমার ঘরগুলোতে পূরণকৃত বাস্তব শিক্ষার্থীদের তথ্য'
                    : 'Actual records residing in the pre-defined schema slots'}
                </span>
              </div>

              {/* Mini Live Data Table */}
              <div className="rounded-lg border border-emerald-900/40 bg-[#090b14] overflow-hidden text-[10px] font-mono">
                <div className="grid grid-cols-4 bg-emerald-950/30 border-b border-emerald-900/50 py-1.5 px-2 text-emerald-300 font-bold text-center">
                  <span>Student_ID</span>
                  <span>Name</span>
                  <span>Dept</span>
                  <span>CGPA</span>
                </div>
                <div className="grid grid-cols-4 border-b border-slate-800/60 py-1.5 px-2 text-zinc-300 text-center hover:bg-emerald-950/20 transition-colors">
                  <span className="text-amber-300 font-bold">101</span>
                  <span className="text-white">Rahim</span>
                  <span className="text-purple-300">CSE</span>
                  <span className="text-emerald-400 font-bold">3.80</span>
                </div>
                <div className="grid grid-cols-4 border-b border-slate-800/60 py-1.5 px-2 text-zinc-300 text-center hover:bg-emerald-950/20 transition-colors">
                  <span className="text-amber-300 font-bold">102</span>
                  <span className="text-white">Karim</span>
                  <span className="text-purple-300">BBA</span>
                  <span className="text-emerald-400 font-bold">3.65</span>
                </div>
                <div className="grid grid-cols-4 py-1.5 px-2 text-zinc-300 text-center hover:bg-emerald-950/20 transition-colors">
                  <span className="text-amber-300 font-bold">103</span>
                  <span className="text-white">Nila</span>
                  <span className="text-purple-300">EEE</span>
                  <span className="text-emerald-400 font-bold">3.90</span>
                </div>
              </div>

              <div className="text-[10px] text-emerald-300/80 font-sans flex items-center justify-between">
                <span>Degree: 4 Attributes</span>
                <span className="text-emerald-300 font-bold">Cardinality: 3 Tuples</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Everyday Analogies Section */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                {language === 'bn'
                  ? 'বাস্তব জীবনের ৩টি সহজ উপমা (স্কিমা বনাম ইনস্ট্যান্স)'
                  : 'Real-World Everyday Analogies (Schema vs Instance)'}
              </span>
              <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                {language === 'bn'
                  ? 'আমাদের দৈনন্দিন জীবনের সর্বত্রই এই স্কিমা ও ইনস্ট্যান্সের সম্পর্ক দেখা যায়:'
                  : 'How this duality exists in our daily lives outside of computers:'}
              </span>
            </div>

            {/* Analogy Tabs */}
            <div className="flex gap-1 bg-[#0c0e18] p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setAnalogyTab('attendance')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  analogyTab === 'attendance'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? '১. হাজিরা খাতা' : '1. Attendance'}
              </button>
              <button
                onClick={() => setAnalogyTab('bank')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  analogyTab === 'bank'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? '২. ব্যাংক ফরম' : '2. Bank Form'}
              </button>
              <button
                onClick={() => setAnalogyTab('university')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  analogyTab === 'university'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? '৩. আবেদনপত্র' : '3. University'}
              </button>
            </div>
          </div>

          {/* Analogy Content Card */}
          {analogyTab === 'attendance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-purple-900/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" />
                  {language === 'bn' ? 'হাজিরা খাতার স্কিমা (Schema):' : 'Attendance Schema:'}
                </span>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                  <DualText
                    en="The printed template of the class register with pre-printed column headers: [Roll No, Student Name, 1st Nov, 2nd Nov...]. There are no tick marks yet."
                    bn="খাতার মধ্যে ছাপা থাকা খালি ছক: [রোল নম্বর, শিক্ষার্থীর নাম, তারিখের ঘর...]। এটি হলো স্কিমা। ছকটি পুরো বছরজুড়ে একই থাকে।"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-emerald-900/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  {language === 'bn' ? 'হাজিরা খাতার ইনস্ট্যান্স (Instance):' : 'Attendance Instance:'}
                </span>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                  <DualText
                    en="Today's actual attendance filled by the teacher at 10:00 AM (Roll 1: Present, Roll 2: Absent). Tomorrow's tick marks will be a new instance!"
                    bn="আজ সকাল ১০:০০ টায় শিক্ষক যে টিকচিহ্ন ও উপস্থিতির তথ্য পূরণ করলেন। কালকের উপস্থিতি হবে আরেকটি নতুন ইনস্ট্যান্স!"
                  />
                </div>
              </div>
            </div>
          )}

          {analogyTab === 'bank' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-purple-900/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  {language === 'bn' ? 'ব্যাংক ফরমের স্কিমা (Schema):' : 'Bank Form Schema:'}
                </span>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                  <DualText
                    en="The blank account opening form distributed at the bank counter with predefined boxes: [Account Name, NID No, Mobile No, Initial Deposit]."
                    bn="ব্যাংকের কাউন্টারে সাজিয়ে রাখা খালি আবেদনপত্র: [হিসাবধারীর নাম, জাতীয় পরিচয়পত্র নম্বর, ফোন নম্বর, জমার পরিমাণ]। এটি হলো স্কিমা।"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-emerald-900/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  {language === 'bn' ? 'ব্যাংক ফরমের ইনস্ট্যান্স (Instance):' : 'Bank Form Instance:'}
                </span>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                  <DualText
                    en="Mr. Rahim's submitted form with his name, NID number, signature, and an initial deposit of 5,000 BDT."
                    bn="জনাব রহিমের নিজ হাতে পূরণকৃত আবেদনপত্র, যেখানে তার নাম, এনআইডি এবং ৫,০০০ টাকা প্রাথমিক জমার তথ্য সংরক্ষিত আছে।"
                  />
                </div>
              </div>
            </div>
          )}

          {analogyTab === 'university' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-purple-900/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  {language === 'bn' ? 'বিশ্ববিদ্যালয় ডেটাবেসের স্কিমা (Schema):' : 'University DB Schema:'}
                </span>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                  <DualText
                    en="The table declaration: STUDENT(Student_ID, Name, Age, Department, CGPA) defining columns and constraints created by DBA."
                    bn="ডেটাবেস অ্যাডমিনিস্ট্রেটরের তৈরি করা টেবিলের গঠন: STUDENT(Student_ID, Name, Age, Dept, CGPA) যেখানে কোনো শিক্ষার্থী নেই।"
                  />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#0c0e18] border border-emerald-900/30 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  {language === 'bn' ? 'বিশ্ববিদ্যালয় ডেটাবেসের ইনস্ট্যান্স (Instance):' : 'University DB Instance:'}
                </span>
                <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                  <DualText
                    en="The 4,250 registered students currently active in the database server at this exact second."
                    bn="ঠিক এই মুহূর্তে ডেটাবেস সার্ভারে সক্রিয় থাকা ৪,২৫০ জন শিক্ষার্থীর লাইভ তথ্যের রেকর্ড।"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Toggle: Schema vs Instance (Defaulting to Schema) */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
              {language === 'bn' ? 'লাইভ আর্কিটেকচার ভিউ (টগল করুন):' : 'Live Architecture View (Toggle):'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('schema')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  viewMode === 'schema'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400'
                    : 'bg-[#101322] border border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn'
                  ? '১. রিলেশনাল স্কিমা (ডিফল্ট ব্লুপ্রিন্ট)'
                  : '1. Relational Schema (Default Blueprint)'}
              </button>
              <button
                onClick={() => setViewMode('instance')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                  viewMode === 'instance'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-1 ring-emerald-400'
                    : 'bg-[#101322] border border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn'
                  ? '২. রিলেশনাল ইনস্ট্যান্স (টাইম স্ন্যাপশট)'
                  : '2. Relational Instance (Time Snapshots)'}
              </button>
            </div>
          </div>

          {/* VIEW 1: RELATIONAL SCHEMA BLUEPRINT */}
          {viewMode === 'schema' ? (
            <div className="p-5 rounded-xl bg-[#0c0e18] border border-purple-900/50 space-y-4 font-mono text-xs animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
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

              <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                <DualText
                  en="The schema represents the permanent skeleton of the database. Notice that there is ZERO student data here. It defines only the entity name, attribute names, data types, and integrity constraints. This structural blueprint changes very rarely."
                  bn="স্কিমা হলো ডেটাবেসের স্থায়ী কঙ্কাল বা ব্লুপ্রিন্ট। লক্ষ্য করুন এখানে কোনো শিক্ষার্থীর ব্যক্তিগত ডেটা বা রেকর্ড নেই। এটি কেবল টেবিলের নাম, কলামের নাম, ডেটা টাইপ এবং কনস্ট্রেইন্ট নির্ধারণ করে। এই আর্কিটেকচারাল নকশা খুব কমই পরিবর্তিত হয়।"
                />
              </div>

              {/* Visual Schema Field Blueprint Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-left space-y-1">
                  <span className="text-[10px] text-purple-400 font-bold uppercase block">
                    {language === 'bn' ? 'প্রাথমিক কি (PK)' : 'Primary Key'}
                  </span>
                  <span className="text-white font-bold text-xs block">Student_ID</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">VARCHAR(10)</span>
                  <span className="text-[9px] text-amber-400/90 font-mono block">Unique / Not NULL</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121526] border border-slate-800 text-left space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">
                    {language === 'bn' ? 'অ্যাট্রিবিউট ২' : 'Attribute 2'}
                  </span>
                  <span className="text-white font-bold text-xs block">Name</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">VARCHAR(50)</span>
                  <span className="text-[9px] text-zinc-500 font-mono block">Alphabetical only</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121526] border border-slate-800 text-left space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">
                    {language === 'bn' ? 'অ্যাট্রিবিউট ৩' : 'Attribute 3'}
                  </span>
                  <span className="text-white font-bold text-xs block">Age</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">INT</span>
                  <span className="text-[9px] text-zinc-500 font-mono block">Range: 16 to 100</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121526] border border-slate-800 text-left space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">
                    {language === 'bn' ? 'অ্যাট্রিবিউট ৪' : 'Attribute 4'}
                  </span>
                  <span className="text-white font-bold text-xs block">Department</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">VARCHAR(20)</span>
                  <span className="text-[9px] text-zinc-500 font-mono block">Valid Academic Dept</span>
                </div>

                <div className="p-3 rounded-xl bg-[#121526] border border-slate-800 text-left space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">
                    {language === 'bn' ? 'অ্যাট্রিবিউট ৫' : 'Attribute 5'}
                  </span>
                  <span className="text-white font-bold text-xs block">CGPA</span>
                  <span className="text-[10px] text-zinc-400 font-mono block">DECIMAL(3,2)</span>
                  <span className="text-[9px] text-emerald-400/90 font-mono block">0.00 to 4.00</span>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: RELATIONAL INSTANCE TIME-SNAPSHOTS */
            <div className="p-5 rounded-xl bg-[#0c0e18] border border-emerald-900/50 space-y-4 font-mono text-xs animate-in fade-in duration-200">
              {/* Snapshot Time Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-xs">
                    {language === 'bn'
                      ? 'ইনস্ট্যান্স টাইম স্ন্যাপশট পরিবর্তন করুন:'
                      : 'Select Instance Snapshot Time:'}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  {(['T0', 'T1', 'T2'] as const).map((snapKey) => (
                    <button
                      key={snapKey}
                      onClick={() => setTimeSnapshot(snapKey)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                        timeSnapshot === snapKey
                          ? 'bg-emerald-500 text-black shadow-md font-extrabold'
                          : 'bg-[#121526] text-zinc-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {snapKey} {snapKey === 'T0' ? '(Morning)' : snapKey === 'T1' ? '(Afternoon)' : '(Semester 2)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Snapshot Info Banner */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-300 text-[11px] font-sans flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-mono text-emerald-200 block">
                    {language === 'bn'
                      ? `মুহূর্ত: ${currentSnapshot.time}`
                      : `Time: ${currentSnapshot.time}`}
                  </strong>
                  <span>
                    {language === 'bn' ? currentSnapshot.noteBn : currentSnapshot.noteEn}
                  </span>
                </div>
              </div>

              {/* Instance Data Table */}
              <div className="overflow-x-auto text-[11px] rounded-lg border border-slate-800">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#12162a] border-b border-slate-800 text-zinc-300">
                      <th className="py-2 px-3">Student_ID</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Age</th>
                      <th className="py-2 px-3">Department</th>
                      <th className="py-2 px-3">CGPA</th>
                      <th className="py-2 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-zinc-300">
                    {currentSnapshot.rows.map((s) => (
                      <tr
                        key={s.id}
                        className={`transition-colors ${
                          s.status === 'Inserted'
                            ? 'bg-emerald-500/10'
                            : s.status === 'Updated'
                            ? 'bg-amber-500/10'
                            : 'hover:bg-slate-800/30'
                        }`}
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

              <div className="text-[11px] text-zinc-400 font-sans leading-relaxed pt-1">
                <DualText
                  en="Notice: As time passes from T0 to T1 to T2, the instance data continuously mutates (students register, update CGPA, or graduate). Yet, the column structure (Schema) remains 100% constant and identical!"
                  bn="লক্ষ্য করুন: সময় T₀ থেকে T₁ ও T₂-এ যাওয়ার সাথে সাথে ইনস্ট্যান্সের রেকর্ডগুলো ক্রমাগত পরিবর্তিত হচ্ছে (নতুন শিক্ষার্থী আসছে, সিজিপিএ আপডেট হচ্ছে বা গ্র্যাজুয়েশন হচ্ছে)। কিন্তু টেবিলের কলামের গঠন বা স্কিমা সবসময় ১০০% অপরিবর্তিত ও স্থায়ী থাকছে!"
                />
              </div>
            </div>
          )}

          {/* Side-by-Side Architectural Summary Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18] text-xs font-mono">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                  <th className="py-2 px-3 text-purple-400 w-1/2">
                    {language === 'bn' ? 'রিলেশনাল স্কিমা (Relational Schema)' : 'Relational Schema'}
                  </th>
                  <th className="py-2 px-3 text-emerald-400 w-1/2">
                    {language === 'bn' ? 'রিলেশনাল ইনস্ট্যান্স (Relational Instance)' : 'Relational Instance'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                <tr>
                  <td className="py-2 px-3 font-bold text-white">
                    {language === 'bn' ? 'টেবিলের সামগ্রিক গঠন, ব্লুপ্রিন্ট ও টাইপ সংজ্ঞা' : 'Structure, design, and blueprint of table'}
                  </td>
                  <td className="py-2 px-3 text-emerald-300">
                    {language === 'bn' ? 'কোনো নির্দিষ্ট মুহূর্তে সংরক্ষিত বাস্তব তথ্যের স্ন্যাপশট' : 'Actual data stored at a particular moment in time'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">
                    {language === 'bn' ? 'খুব কমই পরিবর্তিত হয় (ডিজাইনার দ্বারা নির্ধারিত)' : 'Changes very rarely (architected by DBA)'}
                  </td>
                  <td className="py-2 px-3 text-emerald-300">
                    {language === 'bn' ? 'INSERT, UPDATE, DELETE এর মাধ্যমে প্রতিনিয়ত পরিবর্তিত হয়' : 'Changes continuously with inserts, updates, and deletes'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">
                    {language === 'bn' ? 'নির্ভরশীলতা: স্বাধীন (ইনস্ট্যান্সের ওপর নির্ভর করে না)' : 'Dependency: Independent of data rows'}
                  </td>
                  <td className="py-2 px-3 text-emerald-300">
                    {language === 'bn' ? 'নির্ভরশীলতা: সম্পূর্ণভাবে স্কিমার ওপর নির্ভরশীল' : 'Dependency: 100% dependent on Schema structure'}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">
                    {language === 'bn' ? 'বাস্তব উপমা: ক্লাসের হাজিরা খাতার খালি ছক / ব্যাংকের ব্ল্যাঙ্ক ফরম' : 'Analogy: Blank attendance sheet / Blank bank form'}
                  </td>
                  <td className="py-2 px-3 text-emerald-300">
                    {language === 'bn' ? 'বাস্তব উপমা: আজকের ক্লাসের হাজিরা টিক / পূরণ করা ফরম' : 'Analogy: Today\'s class attendance / Filled-in form'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
