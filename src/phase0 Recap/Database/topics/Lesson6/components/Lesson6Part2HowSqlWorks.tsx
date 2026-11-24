'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Compass, Maximize2, Sparkles, Workflow, X, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import { SQL_PIPELINE_STORY_STEPS } from '../types';

export default function Lesson6Part2HowSqlWorks() {
  const { language } = useLanguage();
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

  // Close pipeline modal on Escape key press
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
{/* ========================================================
          PART 2: HOW DOES SQL WORK?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২ • ইঞ্জিন পাইপলাইন ও বাস্তব দৃশ্যপট' : 'Part 2 of 20'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
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
            className="text-xs text-zinc-300 leading-relaxed font-sans"
            en={<>Unlike imperative languages (C, Python) where you write step-by-step memory loops, SQL is a <strong className="text-emerald-300">declarative language</strong>: you tell the database <strong>WHAT data you need</strong>, not HOW to retrieve it. While different RDBMS engines may divide or group internal stages differently, the core query processing follows a universal pipeline. To understand this in practice, follow <strong className="text-cyan-300">Rahim</strong> (a CSE student) as he checks his GPA via <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-black/40">SELECT name, gpa FROM students WHERE dept_id = 1;</code> across the engine&apos;s internal lifecycle stages.</>}
            bn={<>সি বা পাইথনের মতো নির্দেশনামূলক ভাষার বদলে SQL হলো একটি <strong className="text-emerald-300">ঘোষণামূলক (Declarative) ভাষা</strong>: আপনি ডেটাবেসকে বলেন <strong>আপনার কী ডেটা প্রয়োজন</strong>, কীভাবে তা বের করতে হবে তা বলে দিতে হয় না। বিভিন্ন RDBMS ইঞ্জিন ইন্টারনাল স্টেজগুলোকে ভিন্ন ভিন্ন ধাপে ভাগ করলেও কুয়েরি এক্সিকিউশনের মূল পাইপলাইন একই নিয়ম মেনে চলে। এটি সহজে বোঝার জন্য <strong className="text-cyan-300">রহিম</strong> নামের এক শিক্ষার্থীর বাস্তব গল্পটি দেখুন—সে যখন পোর্টালে রেজাল্ট দেখতে <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-black/40">SELECT name, gpa FROM students WHERE dept_id = 1;</code> কোয়েরি ট্রিগার করে, তখন ব্যাকগ্রাউন্ডে ইঞ্জিন কীভাবে তা প্রসেস করে।</>}
          />

          {/* Interactive Visual Blueprint Canvas */}
          <div className="relative group rounded-2xl border border-indigo-500/30 bg-[#090d20] p-4 md:p-5 overflow-hidden shadow-2xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  <DualText
                    en="SQL Query Processing Lifecycle (Rahim's GPA Query Flow)"
                    bn="এসকিউএল কোয়েরি প্রসেসিং লাইফসাইকেল (রহিমের রেজাল্ট কোয়েরি জার্নি)"
                  />
                </span>
              </div>
              <button
                onClick={() => setIsPipelineModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:text-white"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ফুল-স্ক্রিন মোডে দেখুন' : 'Click to Expand (Full Screen)'}</span>
              </button>
            </div>

            {/* Clickable Image Container (Clean click to open modal) */}
            <div 
              onClick={() => setIsPipelineModalOpen(true)}
              className="relative rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 bg-[#060814] cursor-pointer transition-colors max-h-[380px] flex items-center justify-center"
            >
              <img
                src="/images/sql-engine-pipeline-7steps.png"
                alt="SQL Internal Engine Query Processing Pipeline"
                className="w-full h-auto max-h-[380px] object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {language === 'bn' ? 'ইউনিভার্সিটি জার্নি: পোর্টাল রিকোয়েস্ট ➔ পার্সার ➔ ক্যাটালগ ➔ অপ্টিমাইজার ➔ এক্সিকিউটর ➔ বাফার পুল ➔ রেজাল্ট' : 'Student Journey: Portal Request ➔ Parser ➔ Catalog ➔ Optimizer ➔ Executor ➔ Buffer Pool ➔ Result'}
              </span>
              <span className="text-cyan-400 font-semibold">
                {language === 'bn' ? 'ক্লিন আর্কিটেকচার ডায়াগ্রাম (2240 × 1140 px)' : 'Clean Architecture Diagram (2240 × 1140 px)'}
              </span>
            </div>
          </div>

          {/* Interactive Step-by-Step Story Explorer */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <DualText
                en="Explore Each Step of Rahim's Query Journey & Internal Engine Logic:"
                bn="রহিমের কোয়েরি জার্নির প্রতিটি ধাপ ও ইঞ্জিনের অভ্যন্তরীণ কার্যপ্রণালী দেখুন:"
              />
            </h3>

            {/* Step Selection Buttons (Compact responsive grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {SQL_PIPELINE_STORY_STEPS.map(item => (
                <button
                  key={item.step}
                  onClick={() => setActivePipelineStep(item.step)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-1 ${
                    activePipelineStep === item.step
                      ? 'bg-slate-800 border-emerald-400/80 text-white shadow-lg shadow-emerald-950/40'
                      : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-500">
                    {language === 'bn' ? `ধাপ ০${item.step}` : `STEP 0${item.step}`}
                  </span>
                  <span className="text-xs font-mono font-bold truncate">
                    {language === 'bn' ? item.labelBn : item.labelEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Step Details Card (Compact 2-Column Responsive Layout) */}
            {(() => {
              const current = SQL_PIPELINE_STORY_STEPS.find(s => s.step === activePipelineStep) || SQL_PIPELINE_STORY_STEPS[0];
              return (
                <div className="p-4 md:p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
                  {/* Step Title Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {language === 'bn' ? current.tagBn : current.tagEn}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">
                        <DualText en={current.titleEn} bn={current.titleBn} />
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/30">
                      {language === 'bn' ? `ধাপ ০${current.step} / ০৭` : `STAGE 0${current.step} / 07`}
                    </span>
                  </div>

                  {/* 2-Column Story vs Technical Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-sans">
                    {/* Left Column: Human Story & Engine Role */}
                    <div className="space-y-3 bg-[#0d1022] p-3.5 rounded-xl border border-slate-800/80">
                      <div>
                        <div className="text-[11px] font-bold text-emerald-400 uppercase font-mono mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <DualText en="Relatable Scenario (Rahim's Journey):" bn="বাস্তব দৃশ্যপট (রহিমের অভিজ্ঞতা):" />
                        </div>
                        <DualText as="p" className="text-zinc-200 leading-relaxed" en={current.storyEn} bn={current.storyBn} />
                      </div>
                      <div className="pt-2 border-t border-slate-800/60">
                        <div className="text-[11px] font-bold text-cyan-400 uppercase font-mono mb-1 flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5" />
                          <DualText en="Internal Engine Mechanism:" bn="ইঞ্জিনের অভ্যন্তরীণ মেকানিজম:" />
                        </div>
                        <DualText as="p" className="text-zinc-300 leading-relaxed" en={current.engineEn} bn={current.engineBn} />
                      </div>
                    </div>

                    {/* Right Column: Code Payload & Potential Failure Scenario */}
                    <div className="space-y-2.5">
                      <div className="p-3 bg-black/50 rounded-xl border border-slate-800 font-mono text-xs">
                        <span className="text-cyan-400 font-bold block mb-1">
                          <DualText en={current.payloadTitleEn} bn={current.payloadTitleBn} />
                        </span>
                        <code className="text-emerald-300 break-all">{current.payloadCode}</code>
                      </div>
                      <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-500/20 font-mono text-xs text-rose-300">
                        <span className="font-bold flex items-center gap-1.5 text-rose-400 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <DualText en={current.errorTitleEn} bn={current.errorTitleBn} />
                        </span>
                        <span className="text-[11px] break-all">{current.errorCode}</span>
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 md:p-6 animate-in fade-in duration-200"
          >
            {/* Modal Top Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between bg-[#0e142e] border border-slate-700/80 px-5 py-3 rounded-2xl mb-3 shadow-2xl"
            >
              <div className="flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white">
                    <DualText
                      en="SQL Internal Engine Query Processing Pipeline: Rahim's Flow"
                      bn="এসকিউএল ইন্টারনাল ইঞ্জিন কোয়েরি প্রসেসিং পাইপলাইন: রহিমের জার্নি"
                    />
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">
                    {language === 'bn' ? 'স্টুডেন্ট পোর্টাল থেকে পার্সার, অপ্টিমাইজার ও বাফার পুল হয়ে রহিমের স্ক্রিনে রেজাল্ট ফেরত আসার পূর্ণাঙ্গ কার্যপ্রণালী' : 'End-to-End Query Lifecycle: From Student Portal to Parser, CBO, Buffer Pool & Screen Display'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPipelineModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'bn' ? 'বন্ধ করুন (ESC)' : 'Close (ESC)'}</span>
              </button>
            </div>

            {/* Modal Image Display with Pan & Zoom Ability */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-[#060814] p-3 flex items-center justify-center"
            >
              <img
                src="/images/sql-engine-pipeline-7steps.png"
                alt="SQL Internal Engine Query Processing Pipeline Full Resolution"
                className="max-w-none w-full min-w-[1200px] h-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Footer Note */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-3 pt-2"
            >
              <span>{language === 'bn' ? 'টিপস: স্ক্রল বা ড্র্যাগ করে প্রতিটি ধাপের ট্যাগলাইন, স্টোরি ও স্ট্যাটাস বড় করে দেখুন' : 'Tip: Scroll horizontally or vertically to inspect every step, story tagline, and status pill in detail.'}</span>
              <span className="text-cyan-400">{language === 'bn' ? 'বাইরে ক্লিক করে বা ESC চেপে বন্ধ করুন' : 'Click outside or press ESC to close'}</span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
