'use client';

import React, { useState } from 'react';
import { Workflow, Building2, Sparkles, Layers, Eye, CheckCircle2, Compass, Image as ImageIcon, Table as TableIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part1ERModel() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'diagram' | 'breakdown'>('diagram');

  const diagramEntities = [
    {
      name: 'STUDENT',
      roleEn: 'Entity (Sharp Rectangle)',
      roleBn: 'এনটিটি (আয়তক্ষেত্র)',
      keyEn: 'Student_ID (Underlined Key)',
      keyBn: 'Student_ID (আন্ডারলাইনযুক্ত কী)',
      attributesEn: ['Name', 'Major'],
      attributesBn: ['Name', 'Major'],
      relationsEn: 'Connected to COURSE via < ENROLLS-IN >',
      relationsBn: '< ENROLLS-IN > এর মাধ্যমে COURSE-এর সাথে যুক্ত',
    },
    {
      name: 'COURSE',
      roleEn: 'Entity (Sharp Rectangle)',
      roleBn: 'এনটিটি (আয়তক্ষেত্র)',
      keyEn: 'Course_ID (Underlined Key)',
      keyBn: 'Course_ID (আন্ডারলাইনযুক্ত কী)',
      attributesEn: ['Title', 'Credits'],
      attributesBn: ['Title', 'Credits'],
      relationsEn: 'Connected to STUDENT via < ENROLLS-IN > and PROFESSOR via < TEACHES >',
      relationsBn: '< ENROLLS-IN > এবং < TEACHES > এর সাথে যুক্ত',
    },
    {
      name: 'PROFESSOR',
      roleEn: 'Entity (Sharp Rectangle)',
      roleBn: 'এনটিটি (আয়তক্ষেত্র)',
      keyEn: 'Professor_ID (Underlined Key)',
      keyBn: 'Professor_ID (আন্ডারলাইনযুক্ত কী)',
      attributesEn: ['Name', 'Specialization'],
      attributesBn: ['Name', 'Specialization'],
      relationsEn: 'Teaches COURSE and belongs to DEPARTMENT',
      relationsBn: 'কোর্স পরিচালনা করে এবং বিভাগের অন্তর্ভুক্ত',
    },
    {
      name: 'DEPARTMENT',
      roleEn: 'Entity (Sharp Rectangle)',
      roleBn: 'এনটিটি (আয়তক্ষেত্র)',
      keyEn: 'Dept_ID (Underlined Key)',
      keyBn: 'Dept_ID (আন্ডারলাইনযুক্ত কী)',
      attributesEn: ['Name', 'Office_Loc'],
      attributesBn: ['Name', 'Office_Loc'],
      relationsEn: 'Connected to PROFESSOR via < BELONGS-TO >',
      relationsBn: '< BELONGS-TO > এর মাধ্যমে অধ্যাপকের সাথে যুক্ত',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Header Badge */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ১ • কনসেপচুয়াল ডেটাবেস ডিজাইন' : 'Part 1 of 13 • Conceptual Database Architecture'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="1. What is an ER Model? (Entity Relationship Model)"
              bn="১. ইআর (ER) মডেল কী ও কেন প্রয়োজন?"
            />
          </h2>
        </div>
      </div>

      {/* Real-World Motivation */}
      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Imagine you are building a database for a university. The university needs to store information about Students, Professors, Courses, Departments, and Enrollments. Before rushing to write SQL code or creating database tables, we must answer three fundamental design questions:"
            bn="মনে করুন আপনি একটি বিশ্ববিদ্যালয়ের জন্য ডেটাবেস তৈরি করছেন। বিশ্ববিদ্যালয়কে ছাত্র-ছাত্রী, শিক্ষক, কোর্স, বিভাগ এবং তাদের এনরোলমেন্টের তথ্য সংরক্ষণ করতে হবে। সরাসরি এসকিউএল কোড লেখা বা টেবিল তৈরির আগে আমাদের ৩টি মৌলিক ডিজাইনিং প্রশ্নের উত্তর জানতে হবে:"
          />
        </div>

        {/* 3 Fundamental Questions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#121526] border border-cyan-900/40 space-y-1.5">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
              {language === 'bn' ? 'প্রশ্ন ১: কী তথ্য?' : 'Question 1: What Info?'}
            </span>
            <div className="text-sm font-bold text-white">
              <DualText en="What information should we store?" bn="আমাদের আসলে কোন কোন তথ্য সংরক্ষণ করা দরকার?" />
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              <DualText en="Names, IDs, dates of birth, semester grades, contact numbers." bn="নাম, আইডি, জন্মতারিখ, সেমিস্টার ফলাফল, ফোন নম্বর ইত্যাদি।" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121526] border border-indigo-900/40 space-y-1.5">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">
              {language === 'bn' ? 'প্রশ্ন ২: কারা জড়িত?' : 'Question 2: What Things?'}
            </span>
            <div className="text-sm font-bold text-white">
              <DualText en="What real-world things are involved?" bn="বাস্তব জগতের কোন কোন বিষয় বা উপাদান জড়িত?" />
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              <DualText en="Students, Professors, Courses, Department rooms, Library books." bn="শিক্ষার্থী, প্রফেসর, কোর্স, অ্যাকাডেমিক বিভাগ ও বই।" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121526] border border-purple-900/40 space-y-1.5">
            <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">
              {language === 'bn' ? 'প্রশ্ন ৩: কীভাবে যুক্ত?' : 'Question 3: How Connected?'}
            </span>
            <div className="text-sm font-bold text-white">
              <DualText en="How are those things connected?" bn="এই উপাদানগুলো পরস্পরের সাথে কীভাবে সম্পর্কিত?" />
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              <DualText en="Students ENROLL in courses; Teachers TEACH courses; Profs BELONG to Dept." bn="শিক্ষার্থী কোর্সে ভর্তি হয়; শিক্ষক কোর্স পড়ান; শিক্ষক বিভাগের অন্তর্ভুক্ত।" />
            </div>
          </div>
        </div>

        {/* Exam Definition Box */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>{language === 'bn' ? 'বিশ্ববিদ্যালয় পরীক্ষার সংজ্ঞা (Exam Definition):' : 'University Exam Definition:'}</span>
          </div>
          <blockquote className="text-xs md:text-sm text-cyan-100 italic leading-relaxed font-sans pl-3 border-l-2 border-cyan-400">
            <DualText
              en="&ldquo;The Entity Relationship Model (ER Model) is a high-level conceptual data model used to represent the logical structure of a database through entities, attributes, and relationships.&rdquo;"
              bn="&ldquo;এনটিটি রিলেশনশিপ (ইআর) মডেল হলো একটি উচ্চ-স্তরের কনসেপচুয়াল ডেটা মডেল, যা এনটিটি (সত্তা), তাদের অ্যাট্রিবিউট (বৈশিষ্ট্য) এবং পারস্পরিক সম্পর্কের মাধ্যমে কোনো ডেটাবেসের যৌক্তিক কাঠামো উপস্থাপন করে।&rdquo;"
            />
          </blockquote>
          <div className="text-[11px] text-zinc-300 font-sans leading-relaxed pt-1">
            <DualText
              en="In simple words: An ER Model is the architectural blueprint of a database that shows what data we need to store and how different data items are connected together."
              bn="সহজ কথায়: ইআর মডেল হলো ডেটাবেসের একটি আর্কিটেকচারাল ব্লুপ্রিন্ট (নকশা), যা আমাদের স্পষ্ট দেখায় কোন ডেটা সংরক্ষণ করতে হবে এবং ডেটার বিভিন্ন অংশ কীভাবে পরস্পরের সাথে সংযুক্ত।"
            />
          </div>
        </div>

        {/* Blueprint Analogy Card */}
        <div className="p-4 rounded-2xl bg-[#090b14] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-amber-400 font-bold block text-sm">
              {language === 'bn' ? 'স্থাপত্যের ব্লুপ্রিন্ট রূপক (Architectural Blueprint):' : 'Architectural Blueprint Analogy:'}
            </span>
            <div className="text-zinc-300 text-[11px] font-sans">
              {language === 'bn'
                ? 'একজন স্থপতি ভবন নির্মাণের আগে ব্লুপ্রিন্ট আঁকেন → ডেটাবেস ইঞ্জিনিয়ার টেবিল তৈরির আগে ইআর ডায়াগ্রাম তৈরি করেন।'
                : 'An architect drafts a floor blueprint before construction → A database engineer designs an ER Diagram before creating SQL tables.'}
            </div>
          </div>
          <div className="shrink-0 px-3.5 py-2 rounded-xl bg-cyan-950/40 border border-cyan-600/40 text-cyan-300 text-center font-bold">
            {language === 'bn' ? 'ইআর ডায়াগ্রাম = ইআর মডেলের চিত্ররূপ' : 'ER Diagram = Visual Representation of ER Model'}
          </div>
        </div>
      </div>

      {/* ========================================================
          AUTHENTIC UNIVERSITY DATABASE ER DIAGRAM (REFERENCED SHOWCASE)
         ======================================================== */}
      <div className="p-6 rounded-3xl bg-[#080c18] border-2 border-cyan-500/40 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                {language === 'bn'
                  ? 'বাস্তব উদাহরণ: বিশ্ববিদ্যালয় ডেটাবেসের পূর্ণাঙ্গ ইআর ডায়াগ্রাম'
                  : 'Real-World Example: University Database Complete ER Diagram'}
              </h3>
              <span className="text-[10px] text-zinc-400 font-sans">
                {language === 'bn'
                  ? 'Peter Chen Notation অনুযায়ী ৪টি এনটিটি, ৩টি রিলেশনশিপ ও তাদের অ্যাট্রিবিউট চিত্ররূপ'
                  : 'Authentic Chen Notation: 4 Entities, 3 Relationships, and Connected Attributes'}
              </span>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c1020] border border-slate-800">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'diagram'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ইআর ডায়াগ্রাম' : 'ER Diagram'}</span>
            </button>

            <button
              onClick={() => setActiveTab('breakdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'breakdown'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'উপাদান বিশ্লেষণ' : 'Components Breakdown'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: The Authentic Textbook ER Diagram */}
        {activeTab === 'diagram' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Textbook Diagram Container */}
            <div className="p-3 sm:p-5 rounded-2xl bg-white border border-slate-700 shadow-2xl flex flex-col items-center justify-center">
              <img
                src="/images/lesson5-university-er-diagram.jpg"
                alt="University Database ER Diagram (Peter Chen Notation)"
                className="w-full max-w-4xl h-auto rounded-lg object-contain shadow-inner"
              />
            </div>

            {/* Quick Guide to Reading the Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#0c1022] border border-cyan-800/60 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase block">
                  1. Entities (আয়তক্ষেত্র ▭)
                </span>
                <div className="text-white font-bold">STUDENT, COURSE, PROFESSOR, DEPARTMENT</div>
                <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                  {language === 'bn'
                    ? '৪টি মূল সত্তা যাদের চারকোনা তীক্ষ্ণ আয়তক্ষেত্র দিয়ে ড্র করা হয়েছে।'
                    : '4 core real-world objects drawn as sharp rectangles.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c1022] border border-purple-800/60 space-y-1">
                <span className="text-[10px] text-purple-400 font-bold uppercase block">
                  2. Relationships (হীরক/রম্বস ◇)
                </span>
                <div className="text-purple-300 font-bold">&lt;ENROLLS-IN&gt;, &lt;TEACHES&gt;, &lt;BELONGS-TO&gt;</div>
                <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                  {language === 'bn'
                    ? 'সত্তাগুলোর পারস্পরিক সংযোগ নির্দেশকারী ৩টি রিলেশনশিপ।'
                    : '3 associations connecting entities with directional arrows.'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0c1022] border border-amber-800/60 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">
                  3. Key Attributes (আন্ডারলাইন ⬭)
                </span>
                <div className="text-amber-300 font-bold"><u>Student_ID</u>, <u>Course_ID</u>, <u>Prof_ID</u>, <u>Dept_ID</u></div>
                <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                  {language === 'bn'
                    ? 'আন্ডারলাইনযুক্ত ওভালগুলো হলো সংশ্লিষ্ট এনটিটির প্রাইমারি কি।'
                    : 'Underlined attribute ovals designate the Primary Key.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Component Breakdown */}
        {activeTab === 'breakdown' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                    <th className="py-2.5 px-4">{language === 'bn' ? 'এনটিটি' : 'Entity'}</th>
                    <th className="py-2.5 px-4">{language === 'bn' ? 'প্রাইমারি কি (PK)' : 'Primary Key'}</th>
                    <th className="py-2.5 px-4">{language === 'bn' ? 'অন্যান্য অ্যাট্রিবিউট' : 'Attributes'}</th>
                    <th className="py-2.5 px-4">{language === 'bn' ? 'সম্পর্ক সংযোগ' : 'Connected Relationships'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300">
                  {diagramEntities.map((ent, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                      <td className="py-3 px-4 font-bold text-cyan-300">{ent.name}</td>
                      <td className="py-3 px-4 text-amber-300 font-bold">
                        {language === 'bn' ? ent.keyBn : ent.keyEn}
                      </td>
                      <td className="py-3 px-4 text-zinc-300">
                        {(language === 'bn' ? ent.attributesBn : ent.attributesEn).join(', ')}
                      </td>
                      <td className="py-3 px-4 text-purple-300">
                        {language === 'bn' ? ent.relationsBn : ent.relationsEn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs font-sans text-cyan-200 leading-relaxed">
              <strong className="text-cyan-300 font-mono block mb-1">
                {language === 'bn' ? '💡 আর্কিটেকচারাল সারাংশ:' : '💡 Architecture Summary:'}
              </strong>
              <DualText
                en="In this ER Diagram: Students enroll in Courses (M:N). Professors teach Courses (1:N). Professors belong to Departments (N:1). Each entity has its underlined primary key attribute and supporting properties. This visual blueprint gives developers the complete schema before creating SQL tables!"
                bn="এই ইআর ডায়াগ্রামে: শিক্ষার্থীরা কোর্সে এনরোল হয় (M:N)। শিক্ষকেরা কোর্স পড়ান (১:N)। অধ্যাপকেরা নির্দিষ্ট বিভাগের অন্তর্ভুক্ত হন (N:১)। প্রতিটি সত্তার নিজস্ব আন্ডারলাইনযুক্ত প্রাইমারি কি ও অন্যান্য বৈশিষ্ট্য রয়েছে। এই ব্লুপ্রিন্টটি এসকিউএল টেবিল তৈরির আগেই পুরো ডেটাবেস আর্কিটেকচারের সুস্পষ্ট নকশা নিশ্চিত করে!"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
