'use client';

import React from 'react';
import { User, Layers, CheckCircle2, Box } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part2Entity() {
  const { language } = useLanguage();

  const entityExamples = [
    { itemEn: 'Student', itemBn: 'শিক্ষার্থী (Student)', isEntity: true, reasonEn: 'We store ID, name, email, department', reasonBn: 'আমরা আইডি, নাম, ইমেইল, ডিপার্টমেন্ট সংরক্ষণ করি' },
    { itemEn: 'Teacher', itemBn: 'শিক্ষক (Teacher)', isEntity: true, reasonEn: 'We store Teacher_ID, designation, salary', reasonBn: 'টিচার আইডি, পদবী, বেতন ইত্যাদি ডেটা থাকে' },
    { itemEn: 'Book', itemBn: 'বই (Book)', isEntity: true, reasonEn: 'Library stores ISBN, title, author, copies', reasonBn: 'লাইব্রেরিতে ISBN, শিরোনাম, লেখক ও কপি সংরক্ষিত হয়' },
    { itemEn: 'Employee', itemBn: 'কর্মচারী (Employee)', isEntity: true, reasonEn: 'HR stores Emp_ID, joining date, role', reasonBn: 'HR সিস্টেমে Emp_ID, যোগদানের তারিখ, পদবী থাকে' },
    { itemEn: 'Department', itemBn: 'বিভাগ (Department)', isEntity: true, reasonEn: 'University stores Dept_ID, name, building', reasonBn: 'Dept_ID, বিভাগের নাম, ভবন নম্বর সংরক্ষিত থাকে' },
    { itemEn: 'University', itemBn: 'বিশ্ববিদ্যালয় (University)', isEntity: true, reasonEn: 'Stores Reg_No, ranking, location', reasonBn: 'রেজিস্ট্রেশন নম্বর, র্যাঙ্কিং, লোকেশন ইত্যাদি থাকে' },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      {/* Header Badge */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <User className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • এনটিটি পরিচিতি' : 'Part 2 • Entities'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="2. What is an Entity?"
              bn="২. এনটিটি (Entity) কী?"
            />
          </h2>
        </div>
      </div>

      {/* Intro Definition */}
      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="An Entity is any real-world object, person, place, concept, or thing about which we want to store information in a database."
            bn="এনটিটি (Entity) হলো বাস্তব জগতের এমন যেকোনো ব্যক্তি, বস্তু, স্থান বা ধারণা, যার সম্পর্কে আমরা ডেটাবেসে তথ্য সংরক্ষণ করতে চাই।"
          />
        </div>

        {/* Examples Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                <th className="py-2.5 px-4">{language === 'bn' ? 'বাস্তব অবজেক্ট' : 'Real-World Object'}</th>
                <th className="py-2.5 px-4 text-center">{language === 'bn' ? 'এনটিটি কি না?' : 'Is it an Entity?'}</th>
                <th className="py-2.5 px-4">{language === 'bn' ? 'কেন আমরা তথ্য সংরক্ষণ করি' : 'Why We Store Information'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300">
              {entityExamples.map((ex, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                  <td className="py-2.5 px-4 font-bold text-white">
                    {language === 'bn' ? ex.itemBn : ex.itemEn}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                      Yes ✓
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-zinc-400 font-sans">
                    {language === 'bn' ? ex.reasonBn : ex.reasonEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Concrete Example: Student Rahim */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span>{language === 'bn' ? 'বাস্তব উদাহরণ: স্টুডেন্ট রহিম (Student Entity Instance)' : 'Concrete Example: Student Rahim (An Entity Instance)'}</span>
            <span className="text-[10px] text-zinc-400">[ Real-World Instance ]</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-zinc-500 text-[10px] block">Student_ID</span>
              <span className="text-white font-bold text-sm">101</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-zinc-500 text-[10px] block">Name</span>
              <span className="text-amber-300 font-bold text-sm">Rahim</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-zinc-500 text-[10px] block">Age</span>
              <span className="text-cyan-300 font-bold text-sm">22</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-zinc-500 text-[10px] block">Email</span>
              <span className="text-pink-300 text-[11px] truncate block">rahim@gmail.com</span>
            </div>
          </div>
          <div className="text-[11px] text-zinc-300 font-sans leading-relaxed">
            <DualText
              en="Here, Rahim is an entity because we want to store specific, distinguishable information about him in our university system."
              bn="এখানে রহিম হলো একটি একক এনটিটি (Entity), কারণ আমরা তার নির্দিষ্ট তথ্যগুলো আমাদের বিশ্ববিদ্যালয়ের ডেটাবেস সিস্টেমে সংরক্ষণ করতে চাই।"
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          AUTHENTIC ER DIAGRAM NOTATION: 2-COLUMN COMPACT LAYOUT
          (Excluding inaccurate rounded corners)
         ======================================================== */}
      <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-[#0c0f1d] via-[#101426] to-[#0a0d18] border border-indigo-500/30 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-white text-xs md:text-sm font-mono">
              {language === 'bn'
                ? 'ইআর ডায়াগ্রামে এনটিটি দেখতে কেমন হয়?'
                : 'What Does an Entity Look Like in an ER Diagram?'}
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold">
            Peter Chen Strict Notation
          </span>
        </div>

        {/* 2-Column Organization for low vertical overhead */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Left Column: Standard Rule & Description */}
          <div className="space-y-2 text-xs text-zinc-300 font-sans leading-relaxed">
            <div>
              <DualText
                en="In Peter Chen ER notation, an Entity is drawn strictly as a SHARP 90-DEGREE RECTANGLE with flat edges and 0px border radius."
                bn="পিটার চেনের স্ট্যান্ডার্ড ইআর নোটেশনে এনটিটি সবসময় খাঁটি ৯০-ডিগ্রি সোজা কোণবিশিষ্ট আয়তক্ষেত্র (Sharp Rectangle) দিয়ে আঁকা হয়।"
              />
            </div>
            <div className="text-[11px] text-zinc-400 font-sans">
              <DualText
                en="✓ Standard textbook notation: right-angled corners ensure clear differentiation from rounded attributes (ovals) and relationships (diamonds)."
                bn="✓ স্ট্যান্ডার্ড পাঠ্যবই নিয়ম: সোজা কোণ ডিম্বাকৃতি অ্যাট্রিবিউট বা রম্বস সম্পর্কের সাথে বিভ্রান্তি দূর করে।"
              />
            </div>
          </div>

          {/* Right Column: Visual Sharp Rectangle */}
          <div className="p-4 bg-[#05070f] border border-emerald-500/40 rounded-xl flex flex-col items-center justify-center space-y-2">
            <div
              className="w-44 py-2.5 bg-[#0d1428] border-2 border-cyan-400 text-white font-mono font-bold text-center text-sm shadow-[0_0_12px_rgba(6,182,212,0.2)] uppercase tracking-wider"
              style={{ borderRadius: '0px' }}
            >
              STUDENT
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Standard Sharp Rectangle (0px Radius)
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          ENTITY VS ENTITY TYPE VS ENTITY SET
         ======================================================== */}
      <div className="space-y-3 pt-1">
        {/* Subtitle Style */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-zinc-400 font-mono">
          <Layers className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="text-zinc-300">
            {language === 'bn'
              ? 'পার্থক্য: Entity বনাম Entity Type বনাম Entity Set'
              : 'Crucial Distinction: Entity vs Entity Type vs Entity Set'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#14182e] border border-amber-900/40 space-y-1">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">1. Entity</span>
            <h4 className="text-xs font-bold text-white">
              {language === 'bn' ? 'একক অবজেক্ট' : 'One Specific Object'}
            </h4>
            <div className="text-[11px] text-zinc-300 font-sans leading-snug">
              {language === 'bn'
                ? 'একটি নির্দিষ্ট অস্তিত্ব, যেমন শিক্ষার্থী "Rahim" (ID: 101)।'
                : 'A specific concrete instance, e.g. "Rahim" (Student ID 101).'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#14182e] border border-cyan-900/40 space-y-1">
            <span className="text-[10px] text-cyan-400 uppercase font-bold block">2. Entity Type</span>
            <h4 className="text-xs font-bold text-white">
              {language === 'bn' ? 'ক্যাটাগরি বা কাঠামো' : 'The Category / Schema'}
            </h4>
            <div className="text-[11px] text-zinc-300 font-sans leading-snug">
              {language === 'bn'
                ? 'এনটিটিগুলোর সাধারণ ব্লুপ্রিন্ট বা ক্যাটাগরি, যেমন "STUDENT"।'
                : 'The schema definition or category, e.g. "STUDENT".'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#14182e] border border-purple-900/40 space-y-1">
            <span className="text-[10px] text-purple-400 uppercase font-bold block">3. Entity Set</span>
            <h4 className="text-xs font-bold text-white">
              {language === 'bn' ? 'এনটিটিগুলোর সমষ্টি' : 'Collection of Similar Entities'}
            </h4>
            <div className="text-[11px] text-zinc-300 font-sans leading-snug">
              {language === 'bn'
                ? 'একই ধরনের সকল এনটিটির কালেকশন, যেমন "বিশ্ববিদ্যালয়ের সকল ছাত্র-ছাত্রী"।'
                : 'Collection of similar entities sharing identical attributes, e.g. "All students".'}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-xs font-mono text-purple-200">
          <strong className="text-purple-300">
            {language === 'bn' ? 'পরীক্ষার সংজ্ঞা:' : 'Exam Definition:'}{' '}
          </strong>
          {language === 'bn'
            ? 'এনটিটি সেট (Entity Set) হলো সমজাতীয় এনটিটিগুলোর একটি কালেকশন, যা একই বৈশিষ্ট্য বা অ্যাট্রিবিউট শেয়ার করে।'
            : 'An Entity Set is a collection of similar entities that share the same attributes.'}
        </div>
      </div>
    </section>
  );
}
