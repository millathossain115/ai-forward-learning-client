'use client';

import React, { useState } from 'react';
import { Table as TableIcon, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part1Relation() {
  const { language } = useLanguage();

  const [inspectedElement, setInspectedElement] = useState<{
    type: 'relation' | 'tuple' | 'attribute' | 'domain' | null;
    name?: string;
    index?: number;
    detailEn?: string;
    detailBn?: string;
  }>({ type: null });

  const baseStudents = [
    { id: '101', name: 'Rahim', age: 22, dept: 'CSE', cgpa: 3.80 },
    { id: '102', name: 'Karim', age: 23, dept: 'BBA', cgpa: 3.65 },
    { id: '103', name: 'Nila', age: 21, dept: 'EEE', cgpa: 3.90 },
    { id: '104', name: 'Sami', age: 22, dept: 'CSE', cgpa: 3.50 },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <TableIcon className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ১ ও ২ / ১৩' : 'Part 1 & 2 of 13'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="What is a Relational Database & a Relation?"
              bn="রিলেশনাল ডেটাবেস এবং রিলেশন (Relation) কী?"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Imagine you manage a university. You have thousands of students, hundreds of courses, and dozens of faculty members. Instead of keeping everything in one messy file, you organize information into separate two-dimensional tables called Relations."
            bn="মনে করুন আপনি একটি বিশ্ববিদ্যালয়ের তথ্য পরিচালনা করছেন। সেখানে হাজার হাজার শিক্ষার্থী, শত শত কোর্স ও শিক্ষক রয়েছে। সব তথ্য একটি বিশৃঙ্খল ফাইলে না রেখে আপনি পৃথক দ্বিমাত্রিক টেবিলে সাজান—ডেটাবেসের ভাষায় এই টেবিলগুলোকেই Relation বলা হয়।"
          />
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 space-y-1 font-sans leading-relaxed">
          <strong className="text-amber-200 block text-sm font-mono">
            {language === 'bn' ? 'বিধিবদ্ধ সংজ্ঞা (Formal Definition):' : 'Formal Definition:'}
          </strong>
          <DualText
            en="“A relational database is a database that organizes data into relations (tables), where each relation consists of rows and columns, and relationships between tables can be established using keys.”"
            bn="“রিলেশনাল ডেটাবেস হলো এমন একটি ডেটাবেস যা ডেটাকে রিলেশন (টেবিল)-এ সাজায়, যেখানে প্রতিটি রিলেশন সারি ও কলাম নিয়ে গঠিত এবং কী (Key)-এর সাহায্যে বিভিন্ন টেবিলের মধ্যে সম্পর্ক তৈরি করা যায়।”"
          />
          <div className="text-[11px] text-zinc-400 font-mono pt-1">
            <DualText
              en="The word “relational” originates from mathematical set theory (relations between sets proposed by E.F. Codd in 1970)."
              bn="“Relational” শব্দটি এসেছে গণিতের সেট থিওরি থেকে (১৯৭০ সালে গণিতবিদ ই. এফ. কড সেটের মধ্যকার সম্পর্ক বা Relation প্রস্তাব করেন)।"
            />
          </div>
        </div>

        {/* Interactive Inspection Callout */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
              <TableIcon className="w-4 h-4 text-indigo-400" />
              {language === 'bn' ? 'সরাসরি রিলেশন: STUDENT টেবিলে ক্লিক করে পরীক্ষা করুন' : 'Live Relation: STUDENT RELATION'}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              {language === 'bn'
                ? 'হেডার বা সারিতে ক্লিক করে ফর্মাল টার্ম দেখুন'
                : 'Click any cell, header, or row to inspect its formal DBMS term'}
            </span>
          </div>

          {/* Students Table with Interactive Clicks */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                  {[
                    { col: 'Student_ID', bn: 'শিক্ষার্থী আইডি', detailEn: '"Student_ID" is an ATTRIBUTE (Column). It is a unique identifier.', detailBn: '"Student_ID" হলো একটি অ্যাট্রিবিউট (কলাম), যা প্রতিটি শিক্ষার্থীকে অনন্যভাবে চিহ্নিত করে।' },
                    { col: 'Name', bn: 'নাম', detailEn: '"Name" is an ATTRIBUTE (Column). Represents student text name.', detailBn: '"Name" হলো অ্যাট্রিবিউট (কলাম), যা শিক্ষার্থীর নাম সংরক্ষণ করে।' },
                    { col: 'Age', bn: 'বয়স', detailEn: '"Age" is an ATTRIBUTE (Column). Integer age value.', detailBn: '"Age" হলো অ্যাট্রিবিউট (কলাম), যা পূর্ণসংখ্যা বয়স ধারণ করে।' },
                    { col: 'Department', bn: 'বিভাগ', detailEn: '"Department" is an ATTRIBUTE (Column). Academic dept.', detailBn: '"Department" হলো অ্যাট্রিবিউট (কলাম), যা শিক্ষার্থীর বিভাগ নির্দেশ করে।' },
                    { col: 'CGPA', bn: 'সিজিপিএ', detailEn: '"CGPA" is an ATTRIBUTE (Column). Decimal grade range.', detailBn: '"CGPA" হলো অ্যাট্রিবিউট (কলাম), যা শিক্ষার্থীর অর্জিত সিজিপিএ প্রদর্শন করে।' },
                  ].map((item) => (
                    <th
                      key={item.col}
                      onClick={() =>
                        setInspectedElement({
                          type: 'attribute',
                          name: item.col,
                          detailEn: item.detailEn,
                          detailBn: item.detailBn,
                        })
                      }
                      className="py-2.5 px-4 cursor-pointer hover:bg-slate-700/50 transition-colors font-bold text-indigo-300 hover:text-white"
                    >
                      {item.col}
                      <span className="block text-[9px] font-normal text-zinc-500">
                        [{language === 'bn' ? 'অ্যাট্রিবিউট' : 'Attribute'}]
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                {baseStudents.map((st, idx) => (
                  <tr
                    key={st.id}
                    onClick={() =>
                      setInspectedElement({
                        type: 'tuple',
                        index: idx + 1,
                        name: `Tuple #${idx + 1} (${st.name})`,
                        detailEn: `Row #${idx + 1} is a TUPLE. It contains the complete set of attribute values for a single student record (${st.id}, ${st.name}, ${st.age}, ${st.dept}, ${st.cgpa}).`,
                        detailBn: `সারি #${idx + 1} হলো একটি টাপল (TUPLE)। এতে একজন শিক্ষার্থীর পূর্ণাঙ্গ রেকর্ড (${st.id}, ${st.name}, ${st.age}, ${st.dept}, ${st.cgpa}) সংরক্ষিত রয়েছে।`,
                      })
                    }
                    className="cursor-pointer hover:bg-indigo-600/10 transition-colors"
                  >
                    <td className="py-2.5 px-4 text-amber-400 font-bold">{st.id}</td>
                    <td className="py-2.5 px-4 font-sans font-medium text-white">{st.name}</td>
                    <td className="py-2.5 px-4 text-cyan-300">{st.age}</td>
                    <td className="py-2.5 px-4 text-purple-300">{st.dept}</td>
                    <td className="py-2.5 px-4 text-emerald-400 font-bold">{st.cgpa.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Inspection Feedback Box */}
          {inspectedElement.type ? (
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/50 text-xs font-mono text-indigo-200">
              💡 <strong>Selected: {inspectedElement.name}</strong> &mdash;{' '}
              {language === 'bn' ? inspectedElement.detailBn : inspectedElement.detailEn}
            </div>
          ) : (
            <div className="text-[11px] text-zinc-500 font-mono text-center">
              {language === 'bn'
                ? '👆 কলাম হেডারে ক্লিক করে অ্যাট্রিবিউট এবং সারিতে ক্লিক করে টাপলের বিবরণ দেখুন।'
                : '👆 Click any column header to see Attribute details, or click any row to see Tuple details.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
