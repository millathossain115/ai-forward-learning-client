'use client';

import React from 'react';
import { Share2, Sparkles, Workflow, ArrowRight, UserCheck, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson5Part3Relationships() {
  const { language } = useLanguage();

  const degreeExamples = [
    {
      degreeEn: 'Unary (Recursive)',
      degreeBn: 'ইউনারি (Unary / Recursive)',
      numTypes: 1,
      meaningEn: 'Relationship between entities of the SAME entity type',
      meaningBn: 'একই এনটিটি টাইপের অন্তর্গত সত্তাগুলোর মধ্যকার সম্পর্ক',
      exampleEn: 'Employee supervises Employee (ম্যানেজার ও অধীনস্থ কর্মী)',
      exampleBn: 'Employee supervises Employee',
      color: 'amber',
    },
    {
      degreeEn: 'Binary (Most Common)',
      degreeBn: 'বাইনারি (Binary - সর্বাধিক ব্যবহৃত)',
      numTypes: 2,
      meaningEn: 'Relationship between TWO distinct entity types',
      meaningBn: 'দুটি পৃথক এনটিটি টাইপের মধ্যকার দ্বিপাক্ষিক সম্পর্ক',
      exampleEn: 'Student enrolls in Course (শিক্ষার্থী ও কোর্স)',
      exampleBn: 'Student enrolls in Course',
      color: 'cyan',
    },
    {
      degreeEn: 'Ternary',
      degreeBn: 'টারনারি (Ternary)',
      numTypes: 3,
      meaningEn: 'Relationship among THREE entity types simultaneously',
      meaningBn: 'একই সাথে তিনটি ভিন্ন এনটিটি টাইপের মধ্যকার ত্রিপাক্ষিক সম্পর্ক',
      exampleEn: 'Supplier supplies Product to Project (সরবরাহকারী, পণ্য ও প্রকল্প)',
      exampleBn: 'Supplier supplies Product to Project',
      color: 'purple',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Share2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ ও ৫ • রিলেশনশিপ ও ডিগ্রি' : 'Part 4 & 5 • Relationships & Degree'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="4. What is a Relationship? & 5. Degree of Relationship"
              bn="৪. রিলেশনশিপ কী? এবং ৫. সম্পর্কের ডিগ্রি (Degree of Relationship)"
            />
          </h2>
        </div>
      </div>

      {/* ========================================================
          4. WHAT IS A RELATIONSHIP?
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-purple-300 font-mono">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{language === 'bn' ? '৪. রিলেশনশিপ (সম্পর্ক) ও রিলেশনশিপ সেট কী?' : '4. What is a Relationship & Relationship Set?'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="A Relationship describes how two or more entities are associated with each other. Real-world systems are not isolated silos; entities continually interact:"
            bn="রিলেশনশিপ (Relationship) হলো দুই বা ততোধিক এনটিটির মধ্যকার যৌক্তিক সংযোগ বা পারস্পরিক সম্পর্ক। বাস্তব জগতে এনটিটিগুলো কখনো বিচ্ছিন্ন থাকে না, তারা পরস্পরের সাথে সম্পর্কিত হয়:"
          />
        </div>

        {/* 3 Real-World Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">Example 1: University</div>
            <div className="p-2.5 rounded-xl bg-[#0c0e18] border border-cyan-800/40 text-cyan-300 text-center font-bold">
              [ Student ] &rarr; &lt; ENROLLS IN &gt; &rarr; [ Course ]
            </div>
            <div className="text-[11px] text-zinc-300 font-sans">
              <DualText
                en="A student enrolls in a university academic course."
                bn="একজন শিক্ষার্থী একটি অ্যাকাডেমিক কোর্সে এনরোল বা ভর্তি হয়।"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">Example 2: Faculty</div>
            <div className="p-2.5 rounded-xl bg-[#0c0e18] border border-amber-800/40 text-amber-300 text-center font-bold">
              [ Teacher ] &rarr; &lt; TEACHES &gt; &rarr; [ Course ]
            </div>
            <div className="text-[11px] text-zinc-300 font-sans">
              <DualText
                en="A professor conducts and teaches an assigned course."
                bn="একজন শিক্ষক বা প্রফেসর নির্দিষ্ট কোর্সটিতে পাঠদান করেন।"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#121526] border border-slate-800 space-y-2">
            <div className="text-zinc-400 text-[10px] uppercase font-bold">Example 3: Admin</div>
            <div className="p-2.5 rounded-xl bg-[#0c0e18] border border-purple-800/40 text-purple-300 text-center font-bold">
              [ Department ] &rarr; &lt; EMPLOYS &gt; &rarr; [ Teacher ]
            </div>
            <div className="text-[11px] text-zinc-300 font-sans">
              <DualText
                en="An academic department employs faculties and instructors."
                bn="একটি অ্যাকাডেমিক বিভাগ শিক্ষকদের নিয়োগ প্রদান করে।"
              />
            </div>
          </div>
        </div>

        {/* Notation Badge */}
        <div className="p-3.5 rounded-xl bg-[#090b14] border border-slate-800 flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-400">
            {language === 'bn' ? 'ইআর ডায়াগ্রামে রিলেশনশিপের প্রতীক:' : 'ER Diagram Symbol for Relationship:'}
          </span>
          <span className="px-3.5 py-1 rounded-lg bg-purple-950 border border-purple-500 text-purple-300 font-bold">
            &lt; DIAMOND (রম্বস বা হীরক আকৃতি) &gt; = Relationship
          </span>
        </div>

        {/* What is a Relationship Set */}
        <div className="p-5 rounded-2xl bg-[#121526] border border-purple-900/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>{language === 'bn' ? 'রিলেশনশিপ সেট (Relationship Set) কী?' : 'What is a Relationship Set?'}</span>
          </div>

          <div className="text-xs text-zinc-300 font-sans leading-relaxed">
            <DualText
              en="A Relationship Set is a collection of similar relationships of the same type between entity sets."
              bn="রিলেশনশিপ সেট (Relationship Set) হলো বিভিন্ন এনটিটি সেটের মধ্যকার একই জাতীয় সকল সম্পর্কের সমষ্টি।"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-1 text-purple-200">
            <div>&bull; Rahim <em>enrolls in</em> DBMS</div>
            <div>&bull; Karim <em>enrolls in</em> Networking</div>
            <div>&bull; Sumaiya <em>enrolls in</em> Programming</div>
            <div className="pt-1.5 text-zinc-400 text-[11px] font-sans border-t border-slate-800">
              {language === 'bn'
                ? 'এই সব একক এনরোলমেন্টগুলো একত্রে মিলে তৈরি করে "ENROLLS" রিলেশনশিপ সেট।'
                : 'All these individual enrollment associations form the ENROLLS relationship set.'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          5. DEGREE OF RELATIONSHIP
         ======================================================== */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-300 font-mono">
          <Workflow className="w-4 h-4 text-cyan-400" />
          <span>{language === 'bn' ? '৫. ডিগ্রি অফ রিলেশনশিপ (Degree of Relationship)' : '5. Degree of Relationship'}</span>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="The Degree of a Relationship means the number of entity types participating in that relationship. For exams, remember the 3 common types:"
            bn="ডিগ্রি অফ রিলেশনশিপ (Degree of a Relationship) বলতে একটি সম্পর্কে কতগুলো এনটিটি টাইপ অংশগ্রহণ করছে তার সংখ্যা বোঝায়। পরীক্ষার জন্য নিচের ৩টি প্রকারভেদ মুখস্থ রাখা জরুরি:"
          />
        </div>

        {/* 3 Degrees Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          {/* Unary */}
          <div className="p-5 rounded-2xl bg-[#121526] border border-amber-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold uppercase text-[11px]">5.1 Unary (Recursive)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                Degree = 1
              </span>
            </div>
            <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              <DualText
                en="A relationship between entities of the SAME entity type. One entity type participates twice."
                bn="একই এনটিটি টাইপের অন্তর্গত বিভিন্ন সত্তার মধ্যকার সম্পর্ক। এখানে একটি এনটিটি টাইপ নিজেই নিজের সাথে যুক্ত হয়।"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#090b14] border border-slate-800 text-[11px] text-amber-300 font-mono">
              Employee <em>supervises</em> Employee
              <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">
                (একজন ম্যানেজারও কর্মচারী, তার অধীনস্থ ব্যক্তিও কর্মচারী)
              </span>
            </div>
          </div>

          {/* Binary */}
          <div className="p-5 rounded-2xl bg-[#121526] border border-cyan-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-cyan-400 font-bold uppercase text-[11px]">5.2 Binary Relationship</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                Degree = 2
              </span>
            </div>
            <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              <DualText
                en="A relationship between TWO distinct entity types. This is the most common relationship in DBMS."
                bn="দুটি ভিন্ন এনটিটি টাইপের মধ্যকার দ্বিপাক্ষিক সম্পর্ক। এটি ডেটাবেসে সবচেয়ে বেশি ব্যবহৃত রিলেশনশিপ।"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#090b14] border border-slate-800 text-[11px] text-cyan-300 font-mono">
              Student <em>enrolls in</em> Course
              <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">
                (অংশগ্রহণকারী: ১. Student, ২. Course)
              </span>
            </div>
          </div>

          {/* Ternary */}
          <div className="p-5 rounded-2xl bg-[#121526] border border-purple-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-purple-400 font-bold uppercase text-[11px]">5.3 Ternary Relationship</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                Degree = 3
              </span>
            </div>
            <div className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              <DualText
                en="A relationship among THREE distinct entity types simultaneously."
                bn="একই সাথে তিনটি ভিন্ন এনটিটি টাইপের মধ্যকার ত্রিপাক্ষিক সমন্বিত সম্পর্ক।"
              />
            </div>
            <div className="p-3 rounded-xl bg-[#090b14] border border-slate-800 text-[11px] text-purple-300 font-mono">
              Supplier <em>supplies</em> Product to Project
              <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">
                (অংশগ্রহণকারী: ১. Supplier, ২. Product, ৩. Project)
              </span>
            </div>
          </div>
        </div>

        {/* Degree of Relationship Exam Revision Table */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
            <span>{language === 'bn' ? 'ডিগ্রি পরীক্ষার রিভিশন টেবিল' : 'Degree of Relationship: Exam Quick Reference'}</span>
            <span className="text-[10px] text-zinc-400">University Exam Must-Know</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                  <th className="py-2.5 px-4">{language === 'bn' ? 'ডিগ্রির নাম' : 'Degree Name'}</th>
                  <th className="py-2.5 px-4 text-center">{language === 'bn' ? 'অংশগ্রহণকারী এনটিটি সংখ্যা' : 'Number of Entities'}</th>
                  <th className="py-2.5 px-4">{language === 'bn' ? 'বাস্তব উদাহরণ' : 'Real-World Example'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px] text-zinc-300">
                {degreeExamples.map((deg, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}>
                    <td className="py-2.5 px-4 font-bold text-white">
                      {language === 'bn' ? deg.degreeBn : deg.degreeEn}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold">
                        {deg.numTypes}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-zinc-300">
                      {language === 'bn' ? deg.exampleEn : deg.exampleEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
