'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Compass,
  Image as ImageIcon,
  Maximize2,
  Network,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { SQL_PIPELINE_STORY_STEPS } from '../types';
import SqlPipelineArchifyDiagram from './SqlPipelineArchifyDiagram';

type PipelineViewMode = 'archify' | 'diagram';

export default function Lesson6Part2HowSqlWorks() {
  const { language } = useLanguage();
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<PipelineViewMode>('diagram');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPipelineModalOpen(false);
      }
    };
    if (isPipelineModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPipelineModalOpen]);

  return (
    <>
      <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3">
          <div className="p-2 rounded-lg bg-[#101116] text-amber-400 border border-white/[0.08]">
            <Zap className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <span className="text-xs font-mono text-[#9ca0b0]">
              {language === 'bn' ? 'পার্ট ২ • ইঞ্জিন পাইপলাইন ও বাস্তব দৃশ্যপট' : 'Part 2 of 13 • Engine Pipeline'}
            </span>
            <h2 className="text-lg md:text-xl font-semibold text-[#f4f4f7] mt-0.5">
              <DualText
                en="How Does SQL Work? The Internal Query Processing Pipeline (University Scenario)"
                bn="২. এসকিউএল কীভাবে কাজ করে? ইন্টারনাল কুয়েরি প্রসেসিং পাইপলাইন (ইউনিভার্সিটি স্টোরি)"
              />
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <DualText
            as="p"
            className="text-xs text-[#9ca0b0] leading-relaxed font-sans"
            en={<>Unlike imperative languages (C, Python) where you write step-by-step memory loops, SQL is a <strong className="text-emerald-300">declarative language</strong>: you tell the database <strong>WHAT data you need</strong>, not HOW to retrieve it. While different RDBMS engines may divide or group internal stages differently, the core query processing follows a universal pipeline. To understand this in practice, follow <strong className="text-cyan-300">Rahim</strong> (a CSE student) as he checks his GPA via <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-[#090a0d]">SELECT name, gpa FROM students WHERE dept_id = 1;</code> across the engine&apos;s internal lifecycle stages.</>}
            bn={<>সি বা পাইথনের মতো নির্দেশনামূলক ভাষার বদলে SQL হলো একটি <strong className="text-emerald-300">ঘোষণামূলক (Declarative) ভাষা</strong>: আপনি ডেটাবেসকে বলেন <strong>আপনার কী ডেটা প্রয়োজন</strong>, কীভাবে তা বের করতে হবে তা বলে দিতে হয় না। বিভিন্ন RDBMS ইঞ্জিন ইন্টারনাল স্টেজগুলোকে ভিন্ন ভিন্ন ধাপে ভাগ করলেও কুয়েরি এক্সিকিউশনের মূল পাইপলাইন একই নিয়ম মেনে চলে। এটি সহজে বোঝার জন্য <strong className="text-cyan-300">রহিম</strong> নামের এক শিক্ষার্থীর বাস্তব গল্পটি দেখুন—সে যখন পোর্টালে রেজাল্ট দেখতে <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-[#090a0d]">SELECT name, gpa FROM students WHERE dept_id = 1;</code> কোয়েরি ট্রিগার করে, তখন ব্যাকগ্রাউন্ডে ইঞ্জিন কীভাবে তা প্রসেস করে।</>}
          />

          {/* Interactive Blueprint Canvas with View Filter + Fullscreen */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#101116] p-4 md:p-5 overflow-hidden space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-[#f4f4f7]">
                  <DualText
                    en="SQL Query Processing Lifecycle (Rahim's GPA Query Flow)"
                    bn="এসকিউএল কোয়েরি প্রসেসিং লাইফসাইকেল (রহিমের রেজাল্ট কোয়েরি জার্নি)"
                  />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* View Filter Switcher: Archify vs Static Diagram */}
                <div
                  className="inline-flex items-center p-0.5 rounded-lg bg-[#090a0d] border border-white/[0.08]"
                  role="group"
                  aria-label="Pipeline view mode"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('archify')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'archify'
                        ? 'bg-[#f4f4f7] text-[#090a0d]'
                        : 'text-[#9ca0b0] hover:text-[#f4f4f7]'
                    }`}
                  >
                    <Network className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{language === 'bn' ? 'আর্কিফাই' : 'Archify'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('diagram')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'diagram'
                        ? 'bg-[#f4f4f7] text-[#090a0d]'
                        : 'text-[#9ca0b0] hover:text-[#f4f4f7]'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{language === 'bn' ? 'ডায়াগ্রাম' : 'Diagram'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPipelineModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#15171e] hover:bg-[#1c1f29] text-[#f4f4f7] border border-white/[0.12] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                  <span>{language === 'bn' ? 'ফুল-স্ক্রিন' : 'Full Screen'}</span>
                </button>
              </div>
            </div>

            {viewMode === 'archify' ? (
              <SqlPipelineArchifyDiagram
                activeStep={activePipelineStep}
                onSelectStep={setActivePipelineStep}
              />
            ) : (
              <div
                onClick={() => setIsPipelineModalOpen(true)}
                className="relative rounded-xl overflow-hidden border border-white/[0.08] hover:border-white/[0.16] bg-[#090a0d] cursor-pointer transition-colors max-h-[380px] flex items-center justify-center"
              >
                <img
                  src="/images/sql-engine-pipeline-7steps.png"
                  alt="SQL Internal Engine Query Processing Pipeline"
                  className="w-full h-auto max-h-[380px] object-contain"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#9ca0b0] pt-1 gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {language === 'bn'
                  ? 'ইউনিভার্সিটি জার্নি: পোর্টাল রিকোয়েস্ট ➔ পার্সার ➔ ক্যাটালগ ➔ অপ্টিমাইজার ➔ এক্সিকিউটর ➔ বাফার পুল ➔ রেজাল্ট'
                  : 'Portal Request ➔ Parser ➔ Catalog ➔ Optimizer ➔ Executor ➔ Buffer Pool ➔ Result'}
              </span>
              <span className="text-[#686c7d]">
                {viewMode === 'archify'
                  ? (language === 'bn' ? 'ইন্টারঅ্যাক্টিভ ৭-ধাপ আর্কিটেকচার' : 'Interactive 7-Stage Architecture')
                  : '2240 × 1140 px'}
              </span>
            </div>
          </div>

          {/* Interactive Step-by-Step Story Explorer */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-medium text-[#9ca0b0] flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
              <DualText
                en="Explore Each Step of Rahim's Query Journey & Internal Engine Logic:"
                bn="রহিমের কোয়েরি জার্নির প্রতিটি ধাপ ও ইঞ্জিনের অভ্যন্তরীণ কার্যপ্রণালী দেখুন:"
              />
            </h3>

            {/* Step Selection Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {SQL_PIPELINE_STORY_STEPS.map(item => (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActivePipelineStep(item.step)}
                  className={`p-2.5 rounded-xl text-left border transition-colors cursor-pointer flex flex-col gap-1 ${
                    activePipelineStep === item.step
                      ? 'bg-[#1c1f29] border-amber-400/70 text-[#f4f4f7]'
                      : 'bg-[#101116] border-white/[0.08] text-[#9ca0b0] hover:text-[#f4f4f7] hover:border-white/[0.14]'
                  }`}
                >
                  <span className="text-[11px] font-mono tabular-nums text-[#686c7d]">
                    {language === 'bn' ? `ধাপ ০${item.step}` : `Step 0${item.step}`}
                  </span>
                  <span className="text-xs font-medium truncate">
                    {language === 'bn' ? item.labelBn : item.labelEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Step Details Card */}
            {(() => {
              const current = SQL_PIPELINE_STORY_STEPS.find(s => s.step === activePipelineStep) || SQL_PIPELINE_STORY_STEPS[0];
              return (
                <div className="p-4 md:p-5 rounded-2xl bg-[#101116] border border-white/[0.08] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                    <div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#15171e] text-emerald-300 border border-white/[0.08]">
                        {language === 'bn' ? current.tagBn : current.tagEn}
                      </span>
                      <h4 className="text-base font-semibold text-[#f4f4f7] mt-1.5">
                        <DualText en={current.titleEn} bn={current.titleBn} />
                      </h4>
                    </div>
                    <span className="text-xs font-mono tabular-nums text-amber-400 bg-[#15171e] px-3 py-1 rounded-lg border border-white/[0.08] self-start sm:self-auto">
                      {language === 'bn' ? `ধাপ ০${current.step} / ০৭` : `Stage 0${current.step} / 07`}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-3 bg-[#15171e] p-3.5 rounded-xl border border-white/[0.08]">
                      <div>
                        <div className="text-xs font-medium text-emerald-400 font-mono mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <DualText en="Relatable Scenario (Rahim's Journey):" bn="বাস্তব দৃশ্যপট (রহিমের অভিজ্ঞতা):" />
                        </div>
                        <DualText as="p" className="text-[#f4f4f7]/90 leading-relaxed" en={current.storyEn} bn={current.storyBn} />
                      </div>
                      <div className="pt-2.5 border-t border-white/[0.08]">
                        <div className="text-xs font-medium text-cyan-400 font-mono mb-1 flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <DualText en="Internal Engine Mechanism:" bn="ইঞ্জিনের অভ্যন্তরীণ মেকানিজম:" />
                        </div>
                        <DualText as="p" className="text-[#9ca0b0] leading-relaxed" en={current.engineEn} bn={current.engineBn} />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3.5 bg-[#090a0d] rounded-xl border border-white/[0.08] font-mono text-xs">
                        <span className="text-cyan-400 font-medium block mb-1">
                          <DualText en={current.payloadTitleEn} bn={current.payloadTitleBn} />
                        </span>
                        <code className="text-emerald-300 break-all">{current.payloadCode}</code>
                      </div>
                      <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-500/25 font-mono text-xs text-rose-300">
                        <span className="font-medium flex items-center gap-1.5 text-rose-400 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <DualText en={current.errorTitleEn} bn={current.errorTitleBn} />
                        </span>
                        <span className="text-xs break-all">{current.errorCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Fullscreen High-Resolution Inspection Modal */}
        {isPipelineModalOpen && (
          <div
            onClick={() => setIsPipelineModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col p-4 md:p-6"
          >
            {/* Modal Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap items-center justify-between gap-3 bg-[#15171e] border border-white/[0.12] px-5 py-3 rounded-2xl mb-3"
            >
              <div className="flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-[#f4f4f7]">
                    <DualText
                      en="SQL Internal Engine Query Processing Pipeline: Rahim's Flow"
                      bn="এসকিউএল ইন্টারনাল ইঞ্জিন কোয়েরি প্রসেসিং পাইপলাইন: রহিমের জার্নি"
                    />
                  </h3>
                  <p className="text-xs font-mono text-[#9ca0b0]">
                    {language === 'bn'
                      ? 'স্টুডেন্ট পোর্টাল থেকে পার্সার, অপ্টিমাইজার ও বাফার পুল হয়ে রহিমের স্ক্রিনে রেজাল্ট ফেরত আসার পূর্ণাঙ্গ কার্যপ্রণালী'
                      : 'End-to-End Query Lifecycle: Portal ➔ Parser ➔ Catalog ➔ CBO ➔ Executor ➔ Buffer Pool ➔ Result'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="inline-flex items-center p-0.5 rounded-lg bg-[#090a0d] border border-white/[0.08]"
                  role="group"
                  aria-label="Fullscreen pipeline view mode"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('archify')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'archify'
                        ? 'bg-[#f4f4f7] text-[#090a0d]'
                        : 'text-[#9ca0b0] hover:text-[#f4f4f7]'
                    }`}
                  >
                    <Network className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{language === 'bn' ? 'আর্কিফাই' : 'Archify'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('diagram')}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'diagram'
                        ? 'bg-[#f4f4f7] text-[#090a0d]'
                        : 'text-[#9ca0b0] hover:text-[#f4f4f7]'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{language === 'bn' ? 'ডায়াগ্রাম' : 'Diagram'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPipelineModalOpen(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#1c1f29] hover:bg-[#232734] text-[#f4f4f7] border border-white/[0.12] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{language === 'bn' ? 'বন্ধ করুন (ESC)' : 'Close (ESC)'}</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex-1 overflow-auto rounded-2xl border border-white/[0.08] bg-[#101116] p-4 flex items-center justify-center"
            >
              {viewMode === 'archify' ? (
                <div className="w-full max-w-6xl">
                  <SqlPipelineArchifyDiagram
                    activeStep={activePipelineStep}
                    onSelectStep={setActivePipelineStep}
                    fullscreen
                  />
                </div>
              ) : (
                <img
                  src="/images/sql-engine-pipeline-7steps.png"
                  alt="SQL Internal Engine Query Processing Pipeline Full Resolution"
                  className="max-w-none w-full min-w-[1200px] h-auto object-contain rounded-xl"
                />
              )}
            </div>

            {/* Modal Footer Note */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-xs font-mono text-[#9ca0b0] px-3 pt-2"
            >
              <span>
                {viewMode === 'archify'
                  ? (language === 'bn' ? 'যেকোনো ধাপে ক্লিক করুন বা Simulate Flow চাপুন' : 'Click any stage or press Simulate Flow to trace the query lifecycle')
                  : (language === 'bn' ? 'টিপস: স্ক্রল বা ড্র্যাগ করে প্রতিটি ধাপ বড় করে দেখুন' : 'Tip: Scroll horizontally or vertically to inspect every step in detail')}
              </span>
              <span className="text-[#686c7d]">
                {language === 'bn' ? 'বাইরে ক্লিক করে বা ESC চেপে বন্ধ করুন' : 'Click outside or press ESC to close'}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
