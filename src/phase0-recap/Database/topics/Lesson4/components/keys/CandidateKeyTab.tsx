'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  CheckCircle2,
  XCircle,
  Table as TableIcon,
  Sparkles,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENT_SAMPLE_ROWS, CANDIDATE_KEY_COMBOS } from './keyData';

export default function CandidateKeyTab() {
  const { language } = useLanguage();
  const [selectedCandidateKeyCombo, setSelectedCandidateKeyCombo] = useState<number>(0);

  return (
        <div className="p-6 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <DualText en="2. Candidate Key (ক্যান্ডিডেট কী)" bn="২. ক্যান্ডিডেট কী (Candidate Key)" />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'ন্যূনতম (Minimal) সুপার কী — যেখান থেকে কোনো কলাম বাদ দিলে ইউনিকনেস হারিয়ে যায়'
                  : 'Minimal Super Key with zero redundant attributes (Irreducible Unique Identifier)'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold shrink-0">
              {language === 'bn' ? 'ন্যূনতম সুপার কী (Zero Redundancy)' : 'Minimal Super Key'}
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/40 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: A Candidate Key is a minimal Super Key that uniquely identifies each tuple in a relation without any redundant attributes. Crucial Rule: If you drop ANY attribute from a Candidate Key, it loses the ability to uniquely identify every row!"
              bn="সংজ্ঞা: ক্যান্ডিডেট কী হলো এমন একটি ন্যূনতম (Minimal) সুপার কী, যেখান থেকে কোনো অ্যাট্রিবিউট বা কলাম বাদ দিলে সেটি আর প্রতিটি রো-কে ইউনিকভাবে শনাক্ত করতে পারে না। এতে কোনো অতিরিক্ত (Redundant) কলাম থাকতে পারে না!"
            />
          </div>

          {/* Interactive Candidate Key Combination Selector */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-cyan-400" />
                {language === 'bn'
                  ? 'প্রার্থী কম্বিনেশন সিলেক্ট করে ক্যান্ডিডেট কী-এর শর্ত পরীক্ষা করুন:'
                  : 'Select an Attribute Set to test the Candidate Key Minimality Test:'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'ন্যূনতমতা (Minimality) পরীক্ষা' : 'Minimality & Uniqueness Test'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {CANDIDATE_KEY_COMBOS.map((combo) => {
                const isSelected = selectedCandidateKeyCombo === combo.id;
                return (
                  <button
                    key={combo.id}
                    onClick={() => setSelectedCandidateKeyCombo(combo.id)}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? combo.isCandidateKey
                          ? 'bg-cyan-950/60 border-cyan-400 text-white   ring-1 ring-cyan-400/50'
                          : combo.isSuperKey
                          ? 'bg-amber-950/50 border-amber-400 text-white   ring-1 ring-amber-400/50'
                          : 'bg-rose-950/50 border-rose-400 text-white   ring-1 ring-rose-400/50'
                        : 'bg-[#101116] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">
                        {language === 'bn' ? combo.labelBn : combo.labelEn}
                      </span>
                      {combo.isCandidateKey ? (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      ) : combo.isSuperKey ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono ${
                        combo.isCandidateKey
                          ? 'text-cyan-300 font-bold'
                          : combo.isSuperKey
                          ? 'text-amber-300'
                          : 'text-rose-400'
                      }`}
                    >
                      {language === 'bn' ? combo.badgeBn : combo.badgeEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic STUDENT Table with Active Candidate Key Columns Highlighted */}
          {(() => {
            const activeCombo = CANDIDATE_KEY_COMBOS[selectedCandidateKeyCombo] || CANDIDATE_KEY_COMBOS[0];
            const allComboValues = STUDENT_SAMPLE_ROWS.map((s) =>
              activeCombo.columns.map((c) => s[c as keyof typeof s]).join(', ')
            );

            return (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      STUDENT Relation
                    </span>
                    <span className="text-zinc-400 font-sans">
                      {language === 'bn'
                        ? 'Student_ID, National_ID ও Email — তিনটি সম্ভাব্য ক্যান্ডিডেট কী'
                        : 'Student_ID, National_ID & Email — 3 Potential Candidate Keys'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {language === 'bn'
                      ? 'টেবিলের ৩টি কলাম এককভাবে ইউনিক (Candidate Keys)'
                      : '3 attributes individually unique across records'}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
                        <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-white/[0.08]">
                          {language === 'bn' ? 'রো #' : 'Row #'}
                        </th>

                        {/* Column: Student_ID */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('id')
                              ? 'bg-cyan-950/70 text-cyan-200 border-b-2 border-cyan-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Student_ID</span>
                            {activeCombo.columns.includes('id') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: National_ID */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('nid')
                              ? 'bg-cyan-950/70 text-cyan-200 border-b-2 border-cyan-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>National_ID</span>
                            {activeCombo.columns.includes('nid') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Name */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('name')
                              ? 'bg-amber-950/70 text-amber-200 border-b-2 border-amber-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Name</span>
                            {activeCombo.columns.includes('name') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-normal">
                                [Redundant]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Email */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('email')
                              ? 'bg-cyan-950/70 text-cyan-200 border-b-2 border-cyan-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Email</span>
                            {activeCombo.columns.includes('email') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Department */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('dept')
                              ? 'bg-amber-950/70 text-amber-200 border-b-2 border-amber-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Department</span>
                            {activeCombo.columns.includes('dept') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Combined Key Value Column */}
                        <th className="py-2.5 px-3 text-right bg-[#15171e] text-cyan-300 border-l border-white/[0.08]">
                          {language === 'bn'
                            ? 'সিলেক্টেড মান ও ফলাফল'
                            : 'Selected Values & Minimality'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                      {STUDENT_SAMPLE_ROWS.map((student, idx) => {
                        const rowVal = activeCombo.columns
                          .map((c) => student[c as keyof typeof student])
                          .join(', ');
                        const isDuplicate =
                          allComboValues.filter((v) => v === rowVal).length > 1;

                        return (
                          <tr
                            key={student.id}
                            className={`transition-colors ${
                              isDuplicate
                                ? 'bg-rose-950/20'
                                : idx % 2 === 0
                                ? 'bg-[#0f1224]/30'
                                : 'bg-[#101116]'
                            }`}
                          >
                            <td className="py-2 px-3 text-center text-zinc-500 border-r border-white/[0.08]">
                              {idx + 1}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('id')
                                  ? 'bg-cyan-950/30 text-cyan-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.id}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('nid')
                                  ? 'bg-cyan-950/30 text-cyan-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.nid}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('name')
                                  ? student.name === 'Rahim' && !activeCombo.isSuperKey
                                    ? 'bg-rose-950/40 text-rose-300 font-bold'
                                    : 'bg-amber-950/30 text-amber-200 font-bold'
                                  : student.name === 'Rahim'
                                  ? 'text-amber-300/80'
                                  : 'text-zinc-300'
                              }`}
                            >
                              {student.name}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('email')
                                  ? 'bg-cyan-950/30 text-cyan-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.email}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('dept')
                                  ? 'bg-amber-950/30 text-amber-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.dept}
                            </td>

                            <td className="py-2 px-3 text-right border-l border-white/[0.08] font-mono">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-zinc-200 font-bold">
                                  ({rowVal})
                                </span>
                                {activeCombo.isCandidateKey ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    {language === 'bn' ? 'ন্যূনতম ও ইউনিক' : 'Minimal & Unique'}
                                  </span>
                                ) : activeCombo.isSuperKey ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    {language === 'bn' ? 'অপ্রয়োজনীয় কলাম' : 'Redundant Column'}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                                    <X className="w-3 h-3" />
                                    {language === 'bn' ? 'ডুপ্লিকেট!' : 'Duplicate!'}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Candidate Key 2-Step Strict Evaluation Matrix */}
                <div
                  className={`p-4 rounded-xl border transition-colors ${
                    activeCombo.isCandidateKey
                      ? 'bg-[#15171e] border-cyan-500/40 text-cyan-200'
                      : activeCombo.isSuperKey
                      ? 'bg-[#15171e] border-amber-500/40 text-amber-200'
                      : 'bg-[#15171e] border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-white/[0.08] mb-3">
                    <div className="flex items-center gap-2">
                      {activeCombo.isCandidateKey ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                      ) : activeCombo.isSuperKey ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <span className="font-mono font-bold text-sm text-white">
                        {language === 'bn' ? activeCombo.labelBn : activeCombo.labelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          activeCombo.isCandidateKey
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                            : activeCombo.isSuperKey
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {activeCombo.isCandidateKey
                          ? language === 'bn'
                            ? '✓ বৈধ ক্যান্ডিডেট কী'
                            : '✓ Valid Candidate Key'
                          : activeCombo.isSuperKey
                          ? language === 'bn'
                            ? '⚠️ সুপার কী (কিন্তু ক্যান্ডিডেট নয়)'
                            : '⚠️ Super Key (Not Minimal)'
                          : language === 'bn'
                          ? '❌ সুপার কী-ই নয়'
                          : '❌ Invalid Key'}
                      </span>
                    </div>
                  </div>

                  {/* 2-Step Evaluation Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08]">
                      <span className="text-[10px] text-zinc-400 uppercase block mb-1">
                        {language === 'bn' ? 'শর্ত ১: ইউনিকনেস (সুপার কী টেস্ট):' : 'Test 1: Uniqueness (Super Key Test):'}
                      </span>
                      {activeCombo.isSuperKey ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'উত্তীর্ণ (সকল রো ইউনিক)' : 'Passed (All rows unique)'}
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'অনুত্তীর্ণ (ডুপ্লিকেট বিদ্যমান)' : 'Failed (Duplicates exist)'}
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.08]">
                      <span className="text-[10px] text-zinc-400 uppercase block mb-1">
                        {language === 'bn' ? 'শর্ত ২: ন্যূনতমতা (Minimality Test):' : 'Test 2: Minimality (Irreducibility):'}
                      </span>
                      {activeCombo.isMinimal ? (
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'উত্তীর্ণ (কোনো কলাম বাদ দেওয়া যাবে না)' : 'Passed (Irreducible set)'}
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'অনুত্তীর্ণ (অপ্রয়োজনীয় কলাম রয়েছে)' : 'Failed (Redundant attributes)'}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {language === 'bn'
                      ? activeCombo.analysisBn
                      : activeCombo.analysisEn}
                  </p>
                </div>

                {/* Candidate Key vs Primary Key Takeaway */}
                <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] text-xs font-sans flex items-start sm:items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <div className="leading-snug text-zinc-300 text-[11px]">
                    <DualText
                      en="Designer Election Rule: In this STUDENT relation, there are 3 valid Candidate Keys: {Student_ID}, {National_ID}, and {Email}. The database designer chooses ONE of them to become the Primary Key (usually Student_ID because it is short, immutable, and integer-indexed)."
                      bn="ডিজাইনারের নির্বাচন নিয়ম: এই STUDENT টেবিলে মোট ৩টি বৈধ ক্যান্ডিডেট কী রয়েছে: {Student_ID}, {National_ID}, এবং {Email}। ডেটাবেস ডিজাইনার এদের মধ্য থেকে যেকোনো একটিকে Primary Key হিসেবে নির্বাচন করবেন (সাধারণত Student_ID-কে বাছা হয় কারণ এটি সংক্ষিপ্ত ও পরিবর্তনহীন)।"
                    />
                  </div>
                </div>

                {/* Core Golden Rule Banner */}
                <div className="p-3.5 rounded-xl bg-[#101116] border border-amber-500/30 text-xs font-mono text-center text-amber-300 font-bold">
                  <DualText
                    en="“Every Candidate Key is a Super Key, but every Super Key is NOT a Candidate Key!”"
                    bn="“প্রতিটি ক্যান্ডিডেট কী-ই একটি সুপার কী, কিন্তু প্রতিটি সুপার কী ক্যান্ডিডেট কী নয়!”"
                  />
                </div>
              </div>
            );
          })()}
        </div>
  );
}
