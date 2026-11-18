'use client';

import React from 'react';
import { Database, Building2, Table as TableIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part3Database() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            Part 3 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'What is a Database?'}
            {language === 'bn' && 'ডেটাবেস কী? (What is a Database?)'}
            {language === 'dual' && 'What is a Database? (ডেটাবেস কী?)'}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
          {(language === 'en' || language === 'dual') && (
            <p>
              Now that you know what data and information are, ask yourself: <em>Where do we store all this interrelated data?</em>
              <br />
              A <strong>database</strong> is an organized collection of logically interrelated data stored electronically so that it can be easily accessed, managed, and retrieved.
            </p>
          )}
          {(language === 'bn' || language === 'dual') && (
            <p className={language === 'dual' ? 'text-xs text-indigo-300/90 border-l-2 border-indigo-500/40 pl-3 py-0.5' : ''}>
              ডেটা ও ইনফরমেশন সম্পর্কে জানার পর প্রশ্ন আসে: <em>এই বিপুল পরিমাণ সম্পর্কিত উপাত্ত আমরা কোথায় সংরক্ষণ করি?</em>
              <br />
              <strong>ডেটাবেস</strong> হলো কম্পিউটার সিস্টেমে ইলেকট্রনিকভাবে সংরক্ষিত পরস্পর সম্পর্কযুক্ত তথ্যের একটি সুসংগঠিত ভাণ্ডার, যেখান থেকে যেকোনো সময় নিরাপদে ও দ্রুত ডেটা অনুসন্ধান ও পরিবর্তন করা যায়।
            </p>
          )}
        </div>

        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-300 leading-relaxed">
          {language === 'bn' ? (
            <p>
              <strong>গুরুত্বপূর্ণ ধারণা:</strong> একটি ডেটাবেস কিন্তু কেবল একটিমাত্র টেবিল নয়। বাস্তব জগতের কোনো প্রতিষ্ঠান (যেমন বিশ্ববিদ্যালয়) চালাতে একাধিক সম্পর্কিত টেবিল একসাথে কাজ করে!
            </p>
          ) : (
            <p>
              <strong>Key Insight:</strong> A database does not just contain one single table. In a real-world system like a university, you have multiple related tables working together seamlessly!
            </p>
          )}
          {language === 'dual' && (
            <p className="text-xs text-purple-300/80 mt-1">
              (একটি ডেটাবেসে কেবল একটি টেবিল থাকে না; বরং পরস্পর সম্পর্কযুক্ত একাধিক টেবিল সমন্বিতভাবে কাজ করে।)
            </p>
          )}
        </div>

        {/* 4 University Tables Demo */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            {language === 'bn'
              ? 'বিশ্ববিদ্যালয় ডেটাবেস: পরস্পর সম্পর্কিত ৪টি টেবিল'
              : 'University Database: 4 Interrelated Tables'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Table 1: Students */}
            <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-amber-400 font-mono flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'টেবিল ১: শিক্ষার্থী (Students)' : 'Table 1: Students'}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {language === 'bn' ? 'শিক্ষার্থীদের প্রোফাইল' : 'Entities: Student records'}
                </span>
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
                  <TableIcon className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'টেবিল ২: কোর্স (Courses)' : 'Table 2: Courses'}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {language === 'bn' ? 'একাডেমিক কোর্সসমূহ' : 'Entities: Academic courses'}
                </span>
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
                  <TableIcon className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'টেবিল ৩: শিক্ষক (Teachers)' : 'Table 3: Teachers / Instructors'}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {language === 'bn' ? 'অনুষদের শিক্ষকবৃন্দ' : 'Entities: Faculty members'}
                </span>
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

            {/* Table 4: Enrollments */}
            <div className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-pink-400 font-mono flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'টেবিল ৪: এনরোলমেন্ট (Enrollments)' : 'Table 4: Enrollments (Relationship)'}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {language === 'bn' ? 'শিক্ষার্থী ও কোর্সের সংযোগকারী' : 'Connecting Student & Course'}
                </span>
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
  );
}
