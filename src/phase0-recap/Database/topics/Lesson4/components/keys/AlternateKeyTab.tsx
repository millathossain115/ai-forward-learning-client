'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Table as TableIcon,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENT_SAMPLE_ROWS } from './keyData';

export default function AlternateKeyTab() {
  const { language } = useLanguage();
  const [selectedPkForAk, setSelectedPkForAk] = useState<'id' | 'nid' | 'email'>('id');

  return (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-purple-500/40 space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-400" />
                <DualText
                  en="4. Alternate Key (অল্টারনেট বা বিকল্প কী)"
                  bn="৪. অল্টারনেট বা বিকল্প কী (Alternate Key / Secondary Key)"
                />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'প্রাইমারি কি বাদে অবশিষ্ট যেকোনো ক্যান্ডিডেট কী — যা শতভাগ ইউনিক এবং বিকল্প আইডি'
                  : 'Any candidate key NOT selected as the Primary Key (Candidate Keys - Primary Key)'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold shrink-0">
              {language === 'bn' ? 'অবশিষ্ট ক্যান্ডিডেট কী' : 'Unselected Candidate Keys'}
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: An Alternate Key (also known as a Secondary Key) is any Candidate Key that was NOT chosen as the Primary Key by the database designer. Although it is not the Primary Key, it remains 100% unique and is usually enforced in SQL using a UNIQUE NOT NULL constraint."
              bn="সংজ্ঞা: কোনো টেবিলের যেসব ক্যান্ডিডেট কী-কে ডেটাবেস ডিজাইনার প্রাইমারি কী হিসেবে নির্বাচন করেননি, তাদের প্রতিটিকে Alternate Key বা বিকল্প কী বলা হয়। এটি প্রাইমারি কি না হলেও সম্পূর্ণ ইউনিক এবং ডেটাবেস টেবিলে এটিকে UNIQUE NOT NULL কনস্ট্রেইন্ট দিয়ে সুরক্ষিত রাখা হয়।"
            />
          </div>

          {/* Mathematical Relationship Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-center">
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800">
              <span className="text-[10px] text-zinc-400 block uppercase">
                {language === 'bn' ? 'উপলব্ধ ক্যান্ডিডেট কী' : 'Available Candidate Keys'}
              </span>
              <strong className="text-cyan-300 text-sm block mt-0.5 font-bold">
                CK = &#123;ID, NID, Email&#125;
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-amber-500/30">
              <span className="text-[10px] text-zinc-400 block uppercase">
                {language === 'bn' ? 'নির্বাচিত প্রাইমারি কি' : 'Elected Primary Key'}
              </span>
              <strong className="text-amber-400 text-sm block mt-0.5 font-bold">
                PK = 1 Attribute
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-purple-500/30">
              <span className="text-[10px] text-zinc-400 block uppercase">
                {language === 'bn' ? 'অল্টারনেট কী-এর সূত্র' : 'Alternate Keys Formula'}
              </span>
              <strong className="text-purple-300 text-sm block mt-0.5 font-bold">
                AK = CK - PK
              </strong>
            </div>
          </div>

          {/* Primary Key Election Controller */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-3">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <DualText
                  en="INTERACTIVE PRIMARY KEY ELECTION (CLICK TO SWITCH PRIMARY KEY):"
                  bn="ইন্টারেক্টিভ প্রাইমারি কি নির্বাচন প্যানেল (ক্লিক করে প্রাইমারি কি পরিবর্তন করুন):"
                />
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'যেকোনো একটিকে PK বানাতে ক্লিক করুন' : 'Click to elect PK'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'id',
                  labelEn: 'Student_ID',
                  labelBn: 'Student_ID (শিক্ষার্থী আইডি)',
                  descEn: 'Compact numeric identifier (Standard choice)',
                  descBn: 'সংক্ষিপ্ত নিউমেরিক আইডি (ডিফল্ট পছন্দ)',
                },
                {
                  id: 'nid',
                  labelEn: 'National_ID',
                  labelBn: 'National_ID (জাতীয় পরিচয়পত্র)',
                  descEn: 'Government legal identifier',
                  descBn: 'সরকারি আইনগত পরিচিতি নম্বর',
                },
                {
                  id: 'email',
                  labelEn: 'Email Address',
                  labelBn: 'Email (প্রাতিষ্ঠানিক ইমেইল)',
                  descEn: 'Institutional contact identifier',
                  descBn: 'অনন্য প্রাতিষ্ঠানিক যোগাযোগ ইমেইল',
                },
              ].map((opt) => {
                const isSelectedAsPk = selectedPkForAk === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPkForAk(opt.id as typeof selectedPkForAk)}
                    className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelectedAsPk
                        ? 'bg-amber-950/40 border-amber-400 text-white   ring-1 ring-amber-400/50'
                        : 'bg-[#101326] border-purple-900/40 text-zinc-400 hover:text-white hover:border-purple-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                        <KeyRound
                          className={`w-3.5 h-3.5 ${
                            isSelectedAsPk ? 'text-amber-400' : 'text-purple-400'
                          }`}
                        />
                        {language === 'bn' ? opt.labelBn : opt.labelEn}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isSelectedAsPk
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        {isSelectedAsPk
                          ? language === 'bn'
                            ? '👑 PRIMARY KEY'
                            : '👑 PRIMARY KEY'
                          : language === 'bn'
                          ? '🔑 ALTERNATE KEY'
                          : '🔑 ALTERNATE KEY'}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-sans">
                      {language === 'bn' ? opt.descBn : opt.descEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* THE LIVE STUDENT RELATION TABLE WITH DYNAMIC ROLES */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-purple-300 px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5" />
                  STUDENT Relation — Live Key Roles Breakdown
                </span>
                <span className="text-zinc-400 font-sans">
                  {language === 'bn'
                    ? '১টি প্রাইমারি কি ও ২টি অল্টারনেট কি'
                    : '1 Primary Key + 2 Alternate Keys'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Primary Key
                </span>
                <span className="flex items-center gap-1 text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Alternate Key
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-slate-800/60">
                      {language === 'bn' ? 'রো #' : 'Row #'}
                    </th>

                    {/* Column 1: Student_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        selectedPkForAk === 'id'
                          ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold'
                          : 'bg-purple-950/30 text-purple-300 border-b-2 border-purple-400/80 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Student_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            selectedPkForAk === 'id'
                              ? 'bg-amber-500/30 text-amber-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}
                        >
                          {selectedPkForAk === 'id' ? '[PK]' : '[AK 1]'}
                        </span>
                      </div>
                    </th>

                    {/* Column 2: National_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        selectedPkForAk === 'nid'
                          ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold'
                          : 'bg-purple-950/30 text-purple-300 border-b-2 border-purple-400/80 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>National_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            selectedPkForAk === 'nid'
                              ? 'bg-amber-500/30 text-amber-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}
                        >
                          {selectedPkForAk === 'nid'
                            ? '[PK]'
                            : selectedPkForAk === 'id'
                            ? '[AK 1]'
                            : '[AK 2]'}
                        </span>
                      </div>
                    </th>

                    {/* Column 3: Email */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        selectedPkForAk === 'email'
                          ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold'
                          : 'bg-purple-950/30 text-purple-300 border-b-2 border-purple-400/80 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Email</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            selectedPkForAk === 'email'
                              ? 'bg-amber-500/30 text-amber-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}
                        >
                          {selectedPkForAk === 'email' ? '[PK]' : '[AK 2]'}
                        </span>
                      </div>
                    </th>

                    {/* Column 4: Name */}
                    <th className="py-2.5 px-3 text-zinc-400">
                      <span>Name</span>
                      <span className="block text-[9px] text-zinc-500 font-normal">
                        [Non-Key]
                      </span>
                    </th>

                    {/* Column 5: Department */}
                    <th className="py-2.5 px-3 text-zinc-400">
                      <span>Department</span>
                      <span className="block text-[9px] text-zinc-500 font-normal">
                        [Non-Key]
                      </span>
                    </th>

                    {/* Verification Status */}
                    <th className="py-2.5 px-3 text-right bg-slate-900/80 text-purple-300 border-l border-slate-800">
                      {language === 'bn' ? 'কী ভূমিকা বিশ্লেষণ' : 'Key Hierarchy Mapping'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {STUDENT_SAMPLE_ROWS.map((student, idx) => {
                    const pkVal =
                      selectedPkForAk === 'id'
                        ? student.id
                        : selectedPkForAk === 'nid'
                        ? student.nid
                        : student.email;

                    return (
                      <tr
                        key={student.id}
                        className={idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}
                      >
                        <td className="py-2 px-3 text-center text-zinc-500 border-r border-slate-800/60">
                          {idx + 1}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            selectedPkForAk === 'id'
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-purple-950/20 text-purple-300'
                          }`}
                        >
                          {student.id}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            selectedPkForAk === 'nid'
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-purple-950/20 text-purple-300'
                          }`}
                        >
                          {student.nid}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            selectedPkForAk === 'email'
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-purple-950/20 text-purple-300'
                          }`}
                        >
                          {student.email}
                        </td>

                        <td className="py-2 px-3 text-zinc-300">{student.name}</td>
                        <td className="py-2 px-3 text-zinc-400">{student.dept}</td>

                        <td className="py-2 px-3 text-right border-l border-slate-800 font-mono text-[11px]">
                          <span className="text-amber-300 font-bold">
                            PK: {pkVal}
                          </span>
                          <span className="text-zinc-500 mx-1.5">|</span>
                          <span className="text-purple-300">
                            {language === 'bn' ? 'বাকি ২টি AK' : '2 Alt Keys'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Live SQL DDL Code Preview */}
            <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
                <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {language === 'bn'
                    ? 'লাইভ SQL টেবিল স্কিমা (নির্বাচন অনুযায়ী পরিবর্তিত হচ্ছে):'
                    : 'Live Generated SQL Schema (Updates with your election):'}
                </span>
                <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
              </div>

              <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
                <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">STUDENT</span> (<br />
                {'  '}Student_ID  <span className="text-cyan-400">VARCHAR(10)</span>{selectedPkForAk === 'id' ? <span className="text-amber-400 font-bold"> PRIMARY KEY</span> : <span className="text-purple-400 font-bold"> UNIQUE NOT NULL</span>}, <span className="text-zinc-500">{selectedPkForAk === 'id' ? '-- 👑 Elected Primary Key' : '-- 🔑 Alternate Key 1'}</span><br />
                {'  '}National_ID <span className="text-cyan-400">VARCHAR(20)</span>{selectedPkForAk === 'nid' ? <span className="text-amber-400 font-bold"> PRIMARY KEY</span> : <span className="text-purple-400 font-bold"> UNIQUE NOT NULL</span>}, <span className="text-zinc-500">{selectedPkForAk === 'nid' ? '-- 👑 Elected Primary Key' : selectedPkForAk === 'id' ? '-- 🔑 Alternate Key 1' : '-- 🔑 Alternate Key 2'}</span><br />
                {'  '}Email       <span className="text-cyan-400">VARCHAR(50)</span>{selectedPkForAk === 'email' ? <span className="text-amber-400 font-bold"> PRIMARY KEY</span> : <span className="text-purple-400 font-bold"> UNIQUE NOT NULL</span>}, <span className="text-zinc-500">{selectedPkForAk === 'email' ? '-- 👑 Elected Primary Key' : '-- 🔑 Alternate Key 2'}</span><br />
                {'  '}Name        <span className="text-cyan-400">VARCHAR(50)</span>,<br />
                {'  '}Department  <span className="text-cyan-400">VARCHAR(20)</span><br />
                );
              </pre>
            </div>

            {/* Real World Portal Login Application Insight */}
            <div className="p-3.5 rounded-xl bg-[#15171e] border border-slate-800 text-xs font-sans flex items-start sm:items-center gap-3">
              <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <Layers className="w-4 h-4" />
              </span>
              <div className="leading-snug text-zinc-300 text-[11px]">
                <DualText
                  en="Real-World Software Architecture: Why do we need Alternate Keys? In modern web applications (like student or banking portals), users may log in using their Student ID (Primary Key) OR their Email address OR National ID. Because the database enforces a UNIQUE index on Alternate Keys, looking up a user by Email or NID is just as instantaneous and collision-free as querying by Primary Key!"
                  bn="বাস্তব সফটওয়্যার আর্কিটেকচার: অল্টারনেট কি কেন প্রয়োজন? আধুনিক ওয়েব অ্যাপ্লিকেশনে (যেমন: বিশ্ববিদ্যালয় পোর্টাল বা ব্যাংকিং অ্যাপে) শিক্ষার্থীরা তাদের Student ID (প্রাইমারি কি) দিয়েও লগইন করতে পারে, অথবা তাদের প্রাতিষ্ঠানিক Email কিংবা National ID দিয়েও লগইন করতে পারে। অল্টারনেট কি-তে UNIQUE ইনডেক্স থাকায় ইমেইল বা এনআইডি দিয়ে লগইন করাও প্রাইমারি কি-এর মতোই বিদ্যুৎগতির এবং ডুপ্লিকেটমুক্ত হয়!"
                />
              </div>
            </div>
          </div>
        </div>
  );
}
