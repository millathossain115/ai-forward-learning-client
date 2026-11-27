'use client';

import React, { useState } from 'react';
import {
  Workflow,
  Table as TableIcon,
  ArrowRight,
  Database,
  CheckCircle2,
  ChevronRight,
  Copy,
  Check,
  Layers3,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ER_CONVERSION_STEPS, ER_MAPPING_DECISION_MATRIX } from './erSymbolsData';

export default function ERToRelationalMapper() {
  const { language } = useLanguage();
  const [activeConversionStep, setActiveConversionStep] = useState<number>(0);
  const [showDecisionMatrix, setShowDecisionMatrix] = useState<boolean>(false);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopySql = (sql: string, index: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sql);
      setCopiedStep(index);
      setTimeout(() => setCopiedStep(null), 2000);
    }
  };

  return (
      <div className="space-y-6 pt-6 border-t border-slate-800">
        {/* Section 6.2 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                {language === 'bn' ? 'কনভারশন আর্কিটেকচার' : 'Relational Mapping Flow'}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {language === 'bn' ? '৪টি মূল রূপান্তর ধাপ' : '4 Canonical Rules'}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? '৬.২ কীভাবে ইআর ডায়াগ্রামকে ডেটাবেস টেবিলে রূপান্তর করবেন?'
                  : '6.2 How to Convert an ER Diagram into Database Tables'}
              </span>
            </h3>
          </div>

          {/* Toggle between Step Pipeline & Decision Matrix */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#090c18] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setShowDecisionMatrix(false)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                !showDecisionMatrix
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'স্টেপ-বাই-স্টেপ ফ্লো' : 'Pipeline Flow'}</span>
            </button>
            <button
              onClick={() => setShowDecisionMatrix(true)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer ${
                showDecisionMatrix
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'এক নজরে ম্যাট্রিক্স' : 'Decision Matrix'}</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: COMPACT STEP-BY-STEP VISUAL CONVERSION PIPELINE */}
        {!showDecisionMatrix && (
          <div className="space-y-3.5">
            {/* Horizontal Step Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ER_CONVERSION_STEPS.map((step, idx) => {
                const isActive = activeConversionStep === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveConversionStep(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#15171e] border-emerald-500/60 '
                        : 'bg-[#0a0d18] border-slate-800/80 hover:border-slate-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800/60 text-zinc-500'
                      }`}>
                        {step.stepNumber}
                      </span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className={`text-xs font-bold font-mono truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                      {language === 'bn' ? step.badgeBn : step.badgeEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Compact Showcase */}
            {(() => {
              const currentStep = ER_CONVERSION_STEPS[activeConversionStep];
              return (
                <div className="p-4 rounded-2xl bg-[#090c1a] border border-slate-800 space-y-3.5">
                  {/* Compact Header + Rule Banner */}
                  <div className="p-3 rounded-xl bg-[#15171e] border border-emerald-500/30 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-emerald-400 shrink-0" />
                        {language === 'bn' ? currentStep.titleBn : currentStep.titleEn}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold">
                        {language === 'bn' ? `ধাপ ${activeConversionStep + 1} / ৪` : `Step ${activeConversionStep + 1} / 4`}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 font-sans leading-snug">
                      <strong className="text-emerald-300 font-mono">
                        {language === 'bn' ? 'নিয়ম: ' : 'Rule: '}
                      </strong>
                      {language === 'bn' ? currentStep.ruleBn : currentStep.ruleEn}{' '}
                      <span className="text-zinc-400">
                        ({language === 'bn' ? currentStep.whyLogicBn : currentStep.whyLogicEn})
                      </span>
                    </p>
                  </div>

                  {/* 3-Stage Visual Flow: Chen ER SVG ➔ Mapping Arrow ➔ Table + SQL */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                    {/* Stage 1: Authentic Chen ER SVG Diagram */}
                    <div className="lg:col-span-5 p-3 rounded-xl bg-[#0c1020] border border-cyan-900/40 flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">
                          {language === 'bn' ? currentStep.erSourceTitleBn : currentStep.erSourceTitleEn}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${currentStep.erTagColor}`}>
                          {currentStep.erTag}
                        </span>
                      </div>

                      <div className="rounded-lg bg-[#060914] border border-slate-800 p-2 flex items-center justify-center min-h-[135px]">
                        {activeConversionStep === 0 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="160" y1="75" x2="65" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <line x1="160" y1="75" x2="160" y2="26" stroke="#475569" strokeWidth="1.5" />
                            <line x1="160" y1="75" x2="255" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <ellipse cx="65" cy="26" rx="44" ry="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="65" y="30" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace" textDecoration="underline">student_id</text>
                            <ellipse cx="160" cy="22" rx="34" ry="15" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="160" y="26" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">name</text>
                            <ellipse cx="255" cy="26" rx="36" ry="15" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="255" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">email</text>
                            <rect x="105" y="72" width="110" height="36" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="160" y="94" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold" fontFamily="monospace">STUDENT</text>
                          </svg>
                        )}
                        {activeConversionStep === 1 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="95" y1="65" x2="132" y2="65" stroke="#64748b" strokeWidth="2" />
                            <line x1="188" y1="65" x2="225" y2="65" stroke="#64748b" strokeWidth="2" />
                            <text x="110" y="55" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">1</text>
                            <text x="203" y="55" fill="#818cf8" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
                            <rect x="15" y="45" width="80" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="55" y="69" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">DEPT</text>
                            <polygon points="160,35 190,65 160,95 130,65" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                            <text x="160" y="68" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">Offers</text>
                            <rect x="225" y="45" width="80" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="265" y="69" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">COURSE</text>
                          </svg>
                        )}
                        {activeConversionStep === 2 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="90" y1="75" x2="128" y2="75" stroke="#64748b" strokeWidth="2" />
                            <line x1="192" y1="75" x2="230" y2="75" stroke="#64748b" strokeWidth="2" />
                            <line x1="160" y1="45" x2="160" y2="28" stroke="#475569" strokeWidth="1.5" />
                            <ellipse cx="160" cy="20" rx="34" ry="13" fill="#0f172a" stroke="#f472b6" strokeWidth="1.5" />
                            <text x="160" y="24" textAnchor="middle" fill="#f9a8d4" fontSize="9" fontFamily="monospace">grade</text>
                            <text x="105" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">M</text>
                            <text x="208" y="65" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
                            <rect x="12" y="55" width="78" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="51" y="79" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">STUDENT</text>
                            <polygon points="160,45 194,75 160,105 126,75" fill="#2e1065" stroke="#c084fc" strokeWidth="2" />
                            <text x="160" y="78" textAnchor="middle" fill="#e9d5ff" fontSize="9" fontWeight="bold" fontFamily="monospace">Enrolls</text>
                            <rect x="230" y="55" width="78" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="269" y="79" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">COURSE</text>
                          </svg>
                        )}
                        {activeConversionStep === 3 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="160" y1="75" x2="72" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <line x1="160" y1="75" x2="248" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <ellipse cx="72" cy="26" rx="46" ry="15" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                            <ellipse cx="72" cy="26" rx="41" ry="11" fill="none" stroke="#f59e0b" strokeWidth="1" />
                            <text x="72" y="30" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="monospace">phones (Multi)</text>
                            <ellipse cx="248" cy="26" rx="46" ry="15" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />
                            <text x="248" y="30" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace">age (Derived)</text>
                            <rect x="105" y="72" width="110" height="36" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="160" y="94" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold" fontFamily="monospace">STUDENT</text>
                          </svg>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-cyan-300 bg-[#060914] px-2.5 py-1.5 rounded border border-slate-800 truncate text-center">
                        {currentStep.erSymbolText}
                      </div>
                    </div>

                    {/* Stage 2: Mapping Bridge */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#070914] border border-slate-800/80 text-center gap-1.5">
                      <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <ArrowRight className="w-4 h-4 hidden lg:block" />
                        <ChevronRight className="w-4 h-4 lg:hidden rotate-90" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold leading-tight">
                        {language === 'bn' ? currentStep.flowArrowBn : currentStep.flowArrowEn}
                      </span>
                    </div>

                    {/* Stage 3: Output Table + Copyable SQL */}
                    <div className="lg:col-span-5 p-3 rounded-xl bg-[#0c1020] border border-emerald-900/40 flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{currentStep.tableName}</span>
                        </div>
                        <button
                          onClick={() => handleCopySql(currentStep.sqlCode, activeConversionStep)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer border border-slate-700/60"
                        >
                          {copiedStep === activeConversionStep ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">{language === 'bn' ? 'কপি!' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy SQL</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Compact Column Pills */}
                      <div className="flex flex-wrap gap-1.5 bg-[#060914] p-2 rounded-lg border border-slate-800/80 font-mono text-[10px]">
                        {currentStep.columns.map((col) => (
                          <span
                            key={col.name}
                            className={`px-2 py-0.5 rounded border ${
                              col.isPk
                                ? 'bg-amber-950/60 border-amber-500/40 text-amber-300 font-bold'
                                : col.isFk
                                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-zinc-300'
                            }`}
                          >
                            {col.name} {col.isPk ? '[PK]' : col.isFk ? '[FK]' : ''}
                          </span>
                        ))}
                      </div>

                      {/* Compact SQL */}
                      <pre className="p-2.5 rounded-lg bg-[#050711] border border-slate-800 text-[10.5px] font-mono text-emerald-300/90 leading-snug overflow-x-auto max-h-32">
                        <code>{currentStep.sqlCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 2: UNIVERSITY EXAM CHEAT SHEET MATRIX TABLE */}
        {showDecisionMatrix && (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14]">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px] font-mono">
                  <th className="py-2.5 px-3">{language === 'bn' ? 'ইআর উপাদান' : 'ER Component'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'টেবিল তৈরির নিয়ম' : 'Relational Rule'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'PK কৌশল' : 'PK Logic'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'FK কৌশল' : 'FK Logic'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'উদাহরণ' : 'SQL Example'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs font-sans">
                {ER_MAPPING_DECISION_MATRIX.map((item, idx) => (
                  <tr
                    key={item.erElementEn}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      idx % 2 === 0 ? 'bg-[#0a0d18]' : 'bg-[#070912]'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded border text-[10px] inline-block ${item.badgeColor}`}>
                        {language === 'bn' ? item.erElementBn : item.erElementEn}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-white">
                      {language === 'bn' ? item.relationalRuleBn : item.relationalRuleEn}
                    </td>
                    <td className="py-2.5 px-3 text-amber-300 font-mono text-[11px]">
                      {language === 'bn' ? item.pkMechanismBn : item.pkMechanismEn}
                    </td>
                    <td className="py-2.5 px-3 text-indigo-300 font-mono text-[11px]">
                      {language === 'bn' ? item.fkMechanismBn : item.fkMechanismEn}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px]">
                      <span className="text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 block w-fit">
                        {item.example}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* COMPACT SUMMARY STRIP */}
        <div className="p-3.5 rounded-xl bg-[#0a0d1a] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300">
            <span className="flex items-center gap-1.5">
              <Layers3 className="w-4 h-4 text-cyan-400" />
              {language === 'bn' ? 'সমন্বিত ফলাফল: ৩টি সংযুক্ত টেবিল' : 'Synchronized Result: 3 Linked Tables'}
            </span>
            <span className="text-[10px] text-zinc-400 font-normal">PK + FK Graph</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#060914] border border-slate-800/90">
              <span className="text-cyan-400 font-bold">1. DEPARTMENTS</span>
              <div className="text-zinc-300 mt-0.5"><span className="text-amber-300">dept_id [PK]</span>, dept_name</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#060914] border border-slate-800/90">
              <span className="text-indigo-300 font-bold">2. COURSES (1:N)</span>
              <div className="text-zinc-300 mt-0.5"><span className="text-amber-300">course_id [PK]</span>, <span className="text-indigo-400">dept_id [FK]</span></div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#060914] border border-purple-900/60">
              <span className="text-purple-300 font-bold">3. ENROLLMENTS (M:N)</span>
              <div className="text-zinc-300 mt-0.5"><span className="text-pink-400">PK(student_id, course_id)</span>, grade</div>
            </div>
          </div>
        </div>
      </div>
  );
}
