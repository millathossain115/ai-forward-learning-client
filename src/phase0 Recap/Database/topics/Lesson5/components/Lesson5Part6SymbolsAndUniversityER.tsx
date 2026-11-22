'use client';

import React from 'react';
import { Sparkles, Workflow, GraduationCap, Table as TableIcon, Layers, CheckCircle2, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part6SymbolsAndUniversityER() {
  const { language } = useLanguage();

  const symbolsCheatSheet = [
    { symbol: 'Rectangle [ ]', nameEn: 'Entity', nameBn: 'এনটিটি (Entity)', notation: '[ RECTANGLE ]', descEn: 'Strong real-world object (e.g. Student, Course)', descBn: 'স্বতন্ত্র বাস্তব সত্তা (যেমন: Student)' },
    { symbol: 'Oval ( )', nameEn: 'Attribute', nameBn: 'অ্যাট্রিবিউট (Attribute)', notation: '( OVAL )', descEn: 'Property or characteristic of an entity', descBn: 'এনটিটির বৈশিষ্ট্য বা গুণাবলী' },
    { symbol: 'Diamond < >', nameEn: 'Relationship', nameBn: 'রিলেশনশিপ (Relationship)', notation: '< DIAMOND >', descEn: 'Association between two or more entities', descBn: 'দুই বা ততোধিক এনটিটির মধ্যকার সম্পর্ক' },
    { symbol: 'Double Oval (( ))', nameEn: 'Multivalued Attribute', nameBn: 'মাল্টিভ্যালুড অ্যাট্রিবিউট', notation: '(( DOUBLE OVAL ))', descEn: 'Can hold multiple values (e.g. Phone_Number)', descBn: 'একাধিক মান ধারণ করে (যেমন: Phone)' },
    { symbol: 'Dashed Oval - -', nameEn: 'Derived Attribute', nameBn: 'ডিরাইভড অ্যাট্রিবিউট', notation: '- - DASHED OVAL - -', descEn: 'Calculated from another attribute (e.g. Age)', descBn: 'অন্য অ্যাট্রিবিউট থেকে গণনাকৃত (যেমন: Age)' },
    { symbol: 'Double Rectangle [[ ]]', nameEn: 'Weak Entity', nameBn: 'উইক এনটিটি (Weak Entity)', notation: '[[ DOUBLE BOX ]]', descEn: 'Entity that depends on an owner entity', descBn: 'ওনার এনটিটির ওপর নির্ভরশীল সত্তা' },
    { symbol: 'Underlined Text <u>A</u>', nameEn: 'Key Attribute (Primary Key)', nameBn: 'কী অ্যাট্রিবিউট (প্রাইমারি কি)', notation: '<u>Attribute_Name</u>', descEn: 'Uniquely identifies each entity instance', descBn: 'প্রতিটি এনটিটিকে অনন্যভাবে শনাক্তকারী কি' },
    { symbol: 'Double Line ════', nameEn: 'Total Participation', nameBn: 'টোটাল পার্টিসিপেশন', notation: '════ DOUBLE LINE', descEn: 'Mandatory participation in relationship', descBn: 'সম্পর্কে অংশগ্রহণ বাধ্যতামূলক' },
    { symbol: 'Single Line ────', nameEn: 'Partial Participation', nameBn: 'পার্শিয়াল পার্টিসিপেশন', notation: '──── SINGLE LINE', descEn: 'Optional participation in relationship', descBn: 'সম্পর্কে অংশগ্রহণ ঐচ্ছিক' },
    { symbol: 'Double Diamond << >>', nameEn: 'Identifying Relationship', nameBn: 'আইডেন্টিফাইং রিলেশনশিপ', notation: '<< DOUBLE DIAMOND >>', descEn: 'Connects weak entity to owner entity', descBn: 'উইক এনটিটিকে ওনার এনটিটির সাথে যুক্ত করে' },
  ];

  const universityComponents = [
    { component: 'Student', typeEn: 'Entity', typeBn: 'এনটিটি', roleEn: 'Represents university student body', roleBn: 'বিশ্ববিদ্যালয়ের শিক্ষার্থীদের প্রতিনিধিত্ব করে' },
    { component: 'Course', typeEn: 'Entity', typeBn: 'এনটিটি', roleEn: 'Represents academic courses', roleBn: 'অ্যাকাডেমিক কোর্সসমূহের প্রতিনিধিত্ব করে' },
    { component: 'Department', typeEn: 'Entity', typeBn: 'এনটিটি', roleEn: 'Represents academic department hosting courses', roleBn: 'কোর্স পরিচালনাকারী বিভাগ' },
    { component: 'Student_ID', typeEn: 'Key Attribute', typeBn: 'প্রাইমারি কি অ্যাট্রিবিউট', roleEn: 'Underlined primary key of Student', roleBn: 'Student এনটিটির আন্ডারলাইনযুক্ত প্রাইমারি কি' },
    { component: 'ENROLLS', typeEn: 'Relationship (M:N)', typeBn: 'রিলেশনশিপ (M:N)', roleEn: 'Associates students with courses they study', roleBn: 'শিক্ষার্থীদের তাদের পঠিত কোর্সের সাথে যুক্ত করে' },
    { component: 'OFFERS', typeEn: 'Relationship (1:N)', typeBn: 'রিলেশনশিপ (১:N)', roleEn: 'One department offers many courses', roleBn: 'একটি বিভাগ একাধিক কোর্স অফার ও পরিচালনা করে' },
  ];

  const relationshipAttributeData = [
    { student: 'Rahim (101)', course: 'DBMS (C01)', date: '01-09-2026', grade: 'A' },
    { student: 'Rahim (101)', course: 'Networking (C02)', date: '05-09-2026', grade: 'B+' },
    { student: 'Karim (102)', course: 'DBMS (C01)', date: '02-09-2026', grade: 'A-' },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৯, ১০ ও ১১ • প্রতীক, বিশ্ববিদ্যালয় নকশা ও টেবিল ম্যাপিং' : 'Part 9, 10 & 11 • Symbols, University ER & Table Mapping'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="9. ER Diagram Symbols, 10. Complete University ER, & 11. Relational Table Conversion"
              bn="৯. ইআর ডায়াগ্রামের প্রতীকসমূহ, ১০. পূর্ণাঙ্গ বিশ্ববিদ্যালয় ইআর ডায়াগ্রাম এবং ১১. রিলেশনাল টেবিলে রূপান্তর"
            />
          </h2>
        </div>
      </div>

      {/* ========================================================
          9. ER DIAGRAM SYMBOLS: COMPLETE REVISION
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300 font-mono">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{language === 'bn' ? '৯. ইআর ডায়াগ্রামের প্রতীকসমূহ: পরীক্ষার পূর্ণাঙ্গ চিটশিট' : '9. ER Diagram Symbols: Complete University Exam Cheat Sheet'}</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">10 Core Symbols</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Memorizing these 10 standard Peter Chen notation symbols is essential before stepping into any database university exam:"
            bn="বিশ্ববিদ্যালয়ের ডেটাবেস পরীক্ষায় যাওয়ার আগে এই ১০টি স্ট্যান্ডার্ড পিটার চেন (Chen Notation) প্রতীক ভালোভাবে মুখস্থ রাখা অপরিহার্য:"
          />
        </div>

        {/* Symbols Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                <th className="py-2.5 px-4">{language === 'bn' ? 'প্রতীক চিত্র' : 'Visual Symbol'}</th>
                <th className="py-2.5 px-4">{language === 'bn' ? 'অর্থ ও নাম' : 'Component Name'}</th>
                <th className="py-2.5 px-4">{language === 'bn' ? 'ব্যাখ্যা ও ব্যবহার' : 'Description & Use Case'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300">
              {symbolsCheatSheet.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                  <td className="py-2.5 px-4 font-bold text-cyan-300">
                    <span className="px-2.5 py-1 rounded bg-[#101426] border border-cyan-800/50 block w-fit">
                      {item.notation}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-bold text-white">
                    {language === 'bn' ? item.nameBn : item.nameEn}
                  </td>
                  <td className="py-2.5 px-4 text-zinc-400 font-sans">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GeeksforGeeks Symbols Diagram */}
        <div className="p-3 rounded-2xl bg-white border border-slate-700 flex flex-col items-center justify-center">
          <img
            src="/images/gfg-er-symbols.webp"
            alt="Symbols Used in ER Diagram (GeeksforGeeks)"
            className="w-full max-w-2xl max-h-64 object-contain"
          />
          <span className="text-[10px] font-mono text-zinc-600 mt-1">
            GeeksforGeeks Reference: Standard Peter Chen ER Symbols
          </span>
        </div>
      </div>

      {/* ========================================================
          10. COMPLETE REAL-WORLD ER DIAGRAM: UNIVERSITY DATABASE
         ======================================================== */}
      <div className="space-y-5 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-300 font-mono">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>{language === 'bn' ? '১০. পূর্ণাঙ্গ বাস্তবভিত্তিক ইআর ডায়াগ্রাম: বিশ্ববিদ্যালয় ডেটাবেস' : '10. Complete Real-World ER Diagram: University Database'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Now let's synthesize everything we've learned into one comprehensive real-world model. A university needs a database with Students, Courses, and Departments:"
            bn="এবার আমরা এতক্ষণ যা যা শিখলাম তার সবগুলোকে সমন্বিত করে একটি পূর্ণাঙ্গ বাস্তবভিত্তিক আর্কিটেকচার তৈরি করব। একটি বিশ্ববিদ্যালয়ে Student, Course এবং Department নিয়ে নিম্নোক্ত শর্ত অনুযায়ী ডেটাবেস প্রয়োজন:"
          />
        </div>

        {/* Requirements Box */}
        <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2 text-xs font-sans">
          <div className="font-bold text-white font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{language === 'bn' ? 'সিস্টেমের প্রয়োজনীয় শর্তাবলী (System Requirements):' : 'System Requirements:'}</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-zinc-300 text-[11px] leading-relaxed">
            <li>{language === 'bn' ? 'প্রতিটি শিক্ষার্থীর Student_ID (PK), Name, Date_of_Birth এবং একাধিক Phone_Number থাকবে।' : 'Every student has Student_ID (PK), Name, Date_of_Birth, and multiple Phone_Numbers.'}</li>
            <li>{language === 'bn' ? 'একজন শিক্ষার্থী একাধিক কোর্সে এনরোল হতে পারে এবং একটি কোর্সে শত শত শিক্ষার্থী থাকতে পারে (M:N)।' : 'A student can enroll in multiple courses, and each course can have multiple students (M:N).'}</li>
            <li>{language === 'bn' ? 'প্রতিটি কোর্স একটি নির্দিষ্ট বিভাগের অধীন; একটি বিভাগ একাধিক কোর্স অফার করতে পারে (1:N)।' : 'Each course belongs to one department; a department can offer multiple courses (1:N).'}</li>
          </ul>
        </div>

        {/* Visual Architecture Canvas */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c0e18] via-[#101428] to-[#090b14] border border-cyan-800/40 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
              <Workflow className="w-4 h-4 text-cyan-400" />
              {language === 'bn' ? 'বিশ্ববিদ্যালয় কনসেপচুয়াল স্থাপত্য (Chen Notation)' : 'University Conceptual Architecture (Chen Notation)'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">M:N &amp; 1:N Schema</span>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center font-mono text-xs">
            {/* Student Entity & Attributes */}
            <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-900/60 space-y-3 shadow-lg">
              <div className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-center text-sm">
                [ STUDENT ]
              </div>
              <div className="space-y-1.5 text-[11px] text-zinc-300 pt-1">
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="text-zinc-500">&bull;</span>
                  <u>Student_ID (Key)</u>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">&bull;</span>
                  <span>Name (Composite: First, Last)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">&bull;</span>
                  <span>Date_of_Birth</span>
                </div>
                <div className="text-pink-300 font-bold flex items-center gap-1.5">
                  <span className="text-zinc-500">&bull;</span>
                  <span>(( Phone_Number )) (Multivalued)</span>
                </div>
                <div className="text-emerald-400 italic flex items-center gap-1.5">
                  <span className="text-zinc-500">&bull;</span>
                  <span>- - Age - - (Derived)</span>
                </div>
              </div>
            </div>

            {/* Relationship Node: ENROLLS */}
            <div className="space-y-3 text-center">
              <div className="p-4 rounded-2xl bg-purple-950/50 border-2 border-purple-500 text-purple-200 font-bold shadow-lg">
                &lt; ENROLLS &gt;
                <span className="block text-[10px] text-zinc-400 font-normal mt-0.5">
                  M:N Relationship
                </span>
              </div>
              {/* Relationship Attributes Badge */}
              <div className="p-3 rounded-xl bg-black/50 border border-slate-800 text-[10px] text-zinc-300 space-y-1">
                <span className="text-amber-300 font-bold block uppercase">
                  {language === 'bn' ? 'সম্পর্কের নিজস্ব অ্যাট্রিবিউট:' : 'Relationship Attributes:'}
                </span>
                <div>( Enrollment_Date )</div>
                <div>( Grade )</div>
              </div>
            </div>

            {/* Course & Department Node */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#14182d] border border-cyan-900/60 space-y-3 shadow-lg">
                <div className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-bold text-center text-sm">
                  [ COURSE ]
                </div>
                <div className="space-y-1.5 text-[11px] text-zinc-300 pt-1">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <span className="text-zinc-500">&bull;</span>
                    <u>Course_ID (Key)</u>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500">&bull;</span>
                    <span>Course_Name</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500">&bull;</span>
                    <span>Credits</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101322] border border-slate-800 text-center text-xs text-zinc-300 space-y-1">
                <span className="text-amber-400 font-bold block">[ DEPARTMENT ] (1)</span>
                <span className="text-[11px] text-zinc-400">&darr; (1:N OFFERS) &darr;</span>
                <span className="text-cyan-400 font-bold block">[ COURSE ] (N)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Components Table */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-white">
            {language === 'bn' ? 'বিশ্ববিদ্যালয় ইআর উপাদানের বিশ্লেষণ টেবিল' : 'University ER Architecture Components Breakdown'}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                  <th className="py-2.5 px-4">{language === 'bn' ? 'উপাদান' : 'Component'}</th>
                  <th className="py-2.5 px-4">{language === 'bn' ? 'মডেল টাইপ' : 'Model Type'}</th>
                  <th className="py-2.5 px-4">{language === 'bn' ? 'ভূমিকা ও তাৎপর্য' : 'Role & Purpose'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300 font-sans">
                {universityComponents.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                    <td className="py-2.5 px-4 font-bold text-white font-mono">{c.component}</td>
                    <td className="py-2.5 px-4 text-cyan-300 font-mono font-bold">
                      {language === 'bn' ? c.typeBn : c.typeEn}
                    </td>
                    <td className="py-2.5 px-4 text-zinc-300">
                      {language === 'bn' ? c.roleBn : c.roleEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Relationship Attributes Callout */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-amber-900/40 space-y-3 text-xs font-sans">
          <div className="flex items-center gap-2 text-amber-300 font-mono font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'bn'
                ? 'একটি সম্পর্কেরও নিজস্ব অ্যাট্রিবিউট থাকতে পারে (Relationship Attributes)!'
                : 'A Relationship Can Also Have Its Own Attributes!'}
            </span>
          </div>

          <DualText
            en="Suppose we want to record the exact date a student enrolled in a course, and the letter grade achieved in that course. Notice: A grade does NOT belong exclusively to Student (a student takes many courses with different grades). Nor does it belong exclusively to Course (a course has many students with varying grades). The Grade belongs strictly to the ENROLLS relationship between that specific Student and that specific Course!"
            bn="মনে করুন, আমরা সংরক্ষণ করতে চাই একজন শিক্ষার্থী ঠিক কোন তারিখে কোর্সে ভর্তি হয়েছে এবং সে ওই কোর্সে কী গ্রেড পেয়েছে। খেয়াল করুন: গ্রেড কিন্তু কেবল Student-এর হতে পারে না (কারণ একজন শিক্ষার্থী বিভিন্ন কোর্সে ভিন্ন ভিন্ন গ্রেড পায়)। আবার গ্রেড কেবল Course-এরও হতে পারে না (কারণ একই কোর্সে একেক শিক্ষার্থী একেক গ্রেড পায়)। গ্রেড হলো নির্দিষ্ট শিক্ষার্থী এবং নির্দিষ্ট কোর্সের মধ্যকার ENROLLS সম্পর্কের নিজস্ব বৈশিষ্ট্য বা অ্যাট্রিবিউট!"
          />

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#090b14] pt-1">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                  <th className="py-2 px-3">Student</th>
                  <th className="py-2 px-3">Course</th>
                  <th className="py-2 px-3 text-cyan-300">Enrollment Date (Rel. Attribute)</th>
                  <th className="py-2 px-3 text-amber-300">Grade (Rel. Attribute)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300">
                {relationshipAttributeData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                    <td className="py-2 px-3 text-white font-bold">{row.student}</td>
                    <td className="py-2 px-3 text-white">{row.course}</td>
                    <td className="py-2 px-3 text-cyan-300">{row.date}</td>
                    <td className="py-2 px-3 font-bold text-amber-300">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================
          11. CONVERTING ER DIAGRAM INTO DATABASE TABLES
         ======================================================== */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-emerald-300 font-mono">
          <TableIcon className="w-4 h-4 text-emerald-400" />
          <span>{language === 'bn' ? '১১. কীভাবে ইআর ডায়াগ্রামকে ডেটাবেস টেবিলে রূপান্তর করবেন?' : '11. How to Convert an ER Diagram into Database Tables'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="This provides a direct bridge from conceptual design into relational implementation. Notice how the university ER model seamlessly maps into the SQL tables we examined in Lesson 4:"
            bn="এটি আমাদের কনসেপচুয়াল ব্লুপ্রিন্ট থেকে বাস্তব এসকিউএল টেবিল তৈরির সরাসরি সেতুবন্ধন। খেয়াল করুন কীভাবে আমাদের বিশ্ববিদ্যালয়ের ইআর মডেলটি লেসন ৪-এ আলোচিত রিলেশনাল টেবিলে রূপান্তরিত হয়:"
          />
        </div>

        {/* 3 Relational Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          {/* Table 1: Student */}
          <div className="p-4 rounded-2xl bg-[#0c0e18] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-amber-400 font-bold">1. STUDENT Table</span>
              <span className="text-[10px] text-zinc-500">Strong Entity</span>
            </div>
            <div className="space-y-1 text-[11px] text-zinc-300">
              <div className="text-amber-300 font-bold">Student_ID [PK]</div>
              <div>First_Name, Last_Name</div>
              <div>Date_of_Birth</div>
              <div>Email</div>
            </div>
            <div className="pt-2 text-[10px] text-zinc-500 font-sans border-t border-slate-800/80">
              {language === 'bn'
                ? 'স্ট্রং এনটিটি সরাসরি একটি টেবিলে রূপান্তরিত হয় এবং তার কী কলামটি Primary Key হয়।'
                : 'Strong entity maps directly to a table with its key as the Primary Key.'}
            </div>
          </div>

          {/* Table 2: Enrollment Junction */}
          <div className="p-4 rounded-2xl bg-[#0c0e18] border border-purple-900/60 space-y-2 ring-1 ring-purple-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-purple-300 font-bold">2. ENROLLMENT Table</span>
              <span className="text-[10px] text-pink-400 font-bold">Junction Table</span>
            </div>
            <div className="space-y-1 text-[11px] text-zinc-300">
              <div className="text-indigo-400 font-bold">Student_ID [FK &rarr; STUDENT]</div>
              <div className="text-cyan-400 font-bold">Course_ID [FK &rarr; COURSE]</div>
              <div>Enrollment_Date, Grade</div>
              <div className="text-pink-400 font-bold pt-1 text-[10px]">
                Composite PK: (Student_ID, Course_ID)
              </div>
            </div>
            <div className="pt-2 text-[10px] text-zinc-400 font-sans border-t border-slate-800/80">
              {language === 'bn'
                ? 'M:N রিলেশনশিপকে রিলেশনাল ডেটাবেসে আলাদা জাংশন টেবিলে পরিণত করতে হয়।'
                : 'M:N relationship transforms into a separate junction table holding both Foreign Keys.'}
            </div>
          </div>

          {/* Table 3: Course */}
          <div className="p-4 rounded-2xl bg-[#0c0e18] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-cyan-400 font-bold">3. COURSE Table</span>
              <span className="text-[10px] text-zinc-500">Child Table</span>
            </div>
            <div className="space-y-1 text-[11px] text-zinc-300">
              <div className="text-amber-300 font-bold">Course_ID [PK]</div>
              <div>Course_Name</div>
              <div>Credits</div>
              <div className="text-indigo-400 font-bold">Dept_ID [FK &rarr; DEPARTMENT]</div>
            </div>
            <div className="pt-2 text-[10px] text-zinc-500 font-sans border-t border-slate-800/80">
              {language === 'bn'
                ? '1:N সম্পর্কের ক্ষেত্রে প্যারেন্টের PK চাইল্ড টেবিলে Foreign Key হিসেবে যোগ হয়।'
                : 'In 1:N relationship, parent PK (Dept_ID) is posted as Foreign Key in Course.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
