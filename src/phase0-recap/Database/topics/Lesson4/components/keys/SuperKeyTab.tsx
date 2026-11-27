'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Table as TableIcon,
  Sparkles,
  Layers,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { STUDENT_SAMPLE_ROWS, SUPER_KEY_COMBOS } from './keyData';

export default function SuperKeyTab() {
  const { language } = useLanguage();
  const [selectedSuperKeyCombo, setSelectedSuperKeyCombo] = useState<number>(0);

  return (
        <div className="p-6 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <DualText en="1. Super Key (সুপার কী)" bn="১. সুপার কী (Super Key)" />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'কোনো টেবিলের সারিগুলোকে এককভাবে শনাক্ত করার যেকোনো বৈধ কম্বিনেশন'
                  : 'Any attribute set that uniquely identifies each tuple in a relation'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold shrink-0">
              {language === 'bn' ? 'যেকোনো অনন্য কম্বিনেশন' : 'Any Unique Combination'}
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: A Super Key is a set of one or more attributes that uniquely identifies each tuple in a relation. Crucial Rule: A Super Key CAN contain redundant (unnecessary) attributes, as long as uniqueness is preserved!"
              bn="সংজ্ঞা: কোনো টেবিলের এক বা একাধিক অ্যাট্রিবিউটের এমন যেকোনো সেট যা প্রতিটি সারিকে (Tuple) অদ্বিতীয়ভাবে শনাক্ত করতে পারে, তাকে সুপার কী বলে। মূল নিয়ম: সুপার কীতে অপ্রয়োজনীয় বা অতিরিক্ত কলামও যুক্ত থাকতে পারে—যতক্ষণ পর্যন্ত তা ইউনিক থাকে!"
            />
          </div>

          {/* Interactive Key Combination Selector */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-indigo-400" />
                {language === 'bn'
                  ? 'অ্যাট্রিবিউট কম্বিনেশন সিলেক্ট করে টেবিলে তার প্রভাব দেখুন:'
                  : 'Select an Attribute Combination to test on the STUDENT Table:'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'ক্লিক করে পরীক্ষা করুন' : 'Click to inspect uniqueness'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SUPER_KEY_COMBOS.map((combo) => {
                const isSelected = selectedSuperKeyCombo === combo.id;
                return (
                  <button
                    key={combo.id}
                    onClick={() => setSelectedSuperKeyCombo(combo.id)}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? combo.isSuperKey
                          ? 'bg-indigo-950/60 border-indigo-400 text-white   ring-1 ring-indigo-400/50'
                          : 'bg-rose-950/50 border-rose-400 text-white   ring-1 ring-rose-400/50'
                        : 'bg-[#101116] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">
                        {language === 'bn' ? combo.labelBn : combo.labelEn}
                      </span>
                      {combo.isSuperKey ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono ${
                        combo.isSuperKey
                          ? combo.isMinimal
                            ? 'text-cyan-400'
                            : 'text-indigo-300'
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

          {/* Dynamic STUDENT Table with Active Combination Columns Highlighted */}
          {(() => {
            const activeCombo = SUPER_KEY_COMBOS[selectedSuperKeyCombo] || SUPER_KEY_COMBOS[0];
            const allComboValues = STUDENT_SAMPLE_ROWS.map((s) =>
              activeCombo.columns.map((c) => s[c as keyof typeof s]).join(', ')
            );

            return (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      STUDENT Relation
                    </span>
                    <span className="text-zinc-400 font-sans">
                      {language === 'bn'
                        ? '৪টি নমুনা শিক্ষার্থী রেকর্ড'
                        : '4 Sample Student Records'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {language === 'bn'
                      ? 'সতর্কতা: "Rahim" নামটি টেবিলে ২ বার রয়েছে (রো ১ ও ৪)'
                      : 'Note: Name "Rahim" repeats in Row 1 & Row 4'}
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
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Student_ID</span>
                            {activeCombo.columns.includes('id') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Name */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('name')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Name</span>
                            {activeCombo.columns.includes('name') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Email */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('email')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Email</span>
                            {activeCombo.columns.includes('email') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Department */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('dept')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Department</span>
                            {activeCombo.columns.includes('dept') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Combined Key Value Column */}
                        <th className="py-2.5 px-3 text-right bg-[#15171e] text-amber-300 border-l border-white/[0.08]">
                          {language === 'bn'
                            ? 'সিলেক্টেড কী মান ও ফলাফল'
                            : 'Combined Key Value (Uniqueness)'}
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
                                  ? 'bg-indigo-950/30 text-indigo-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.id}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('name')
                                  ? student.name === 'Rahim' && !activeCombo.columns.includes('id')
                                    ? 'bg-rose-950/40 text-rose-300 font-bold'
                                    : 'bg-indigo-950/30 text-indigo-200 font-bold'
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
                                  ? 'bg-indigo-950/30 text-indigo-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.email}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('dept')
                                  ? 'bg-indigo-950/30 text-indigo-200 font-bold'
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
                                {isDuplicate ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                                    <X className="w-3 h-3" />
                                    {language === 'bn' ? 'ডুপ্লিকেট!' : 'Duplicate!'}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    {language === 'bn' ? 'ইউনিক' : 'Unique'}
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

                {/* Analysis Box for Selected Combination */}
                <div
                  className={`p-4 rounded-xl border transition-colors ${
                    activeCombo.isSuperKey
                      ? 'bg-[#15171e] border-indigo-500/30 text-indigo-200'
                      : 'bg-[#15171e] border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.08] mb-2">
                    <div className="flex items-center gap-2">
                      {activeCombo.isSuperKey ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <span className="font-mono font-bold text-sm text-white">
                        {language === 'bn' ? activeCombo.labelBn : activeCombo.labelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          activeCombo.isSuperKey
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {activeCombo.isSuperKey
                          ? language === 'bn'
                            ? '✓ একটি বৈধ সুপার কী'
                            : '✓ Valid Super Key'
                          : language === 'bn'
                          ? '❌ সুপার কী নয় (Invalid)'
                          : '❌ Not a Super Key'}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        ({language === 'bn' ? activeCombo.badgeBn : activeCombo.badgeEn})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {language === 'bn'
                      ? activeCombo.analysisBn
                      : activeCombo.analysisEn}
                  </p>
                </div>

                {/* Master Golden Rule Pill Callout */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-sans flex items-start sm:items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Layers className="w-4 h-4" />
                  </span>
                  <div className="leading-snug text-zinc-300 text-[11px]">
                    <DualText
                      en="Key Relationship Rule: Super Key = Candidate Key + (Optional redundant attributes). Every Candidate Key is by definition a Super Key, but a Super Key that contains redundant columns is NOT a Candidate Key!"
                      bn="মূল সম্পর্ক ও নিয়ম: সুপার কী = ক্যান্ডিডেট কী + (যেকোনো ঐচ্ছিক বা অপ্রয়োজনীয় কলাম)। প্রতিটি ক্যান্ডিডেট কী-ই জন্মগতভাবে একটি সুপার কী; তবে যেসব সুপার কীতে অপ্রয়োজনীয় কলাম থাকে সেগুলো ক্যান্ডিডেট কী হতে পারে না!"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
  );
}
