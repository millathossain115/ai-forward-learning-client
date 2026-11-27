'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Hash, Database, Users, Calculator, Layers, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type StepNumber = 1 | 2 | 3 | 4;

const Step1RecordsTab = dynamic(() => import('./aggregates/Step1RecordsTab'));
const Step2AggregatesTab = dynamic(() => import('./aggregates/Step2AggregatesTab'));
const Step3GroupByTab = dynamic(() => import('./aggregates/Step3GroupByTab'));
const Step4HavingTab = dynamic(() => import('./aggregates/Step4HavingTab'));

export default function Lesson6Part15AggregatesGroupBy() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold">
                {language === 'bn' ? 'পার্ট ৮ • ধাপে ধাপে এগ্রিগেশন গাইড' : 'Part 8 of 13 • Step-by-Step Aggregation Guide'}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
                <DualText
                  as="span"
                  en="Aggregates, GROUP BY & HAVING: The University Journey"
                  bn="অ্যাগ্রিগেট, GROUP BY এবং HAVING: ইউনিভার্সিটির বাস্তব উদাহরণে সম্পূর্ণ ফ্লো"
                />
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            Step {currentStep} of 4
          </span>
        </div>

        {/* 4-Step Interactive Progression Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            {
              step: 1 as StepNumber,
              num: '১',
              titleEn: '1. Raw Records',
              titleBn: '১. র ডেটাবেস সারি',
              descEn: '6 individual students',
              descBn: '৬ জন শিক্ষার্থীর সারি',
              icon: Database
            },
            {
              step: 2 as StepNumber,
              num: '২',
              titleEn: '2. Aggregates',
              titleBn: '২. অ্যাগ্রিগেট ফাংশন',
              descEn: 'Multiple rows ➔ 1 summary',
              descBn: 'সব সারি মিলে ১টি মান',
              icon: Calculator
            },
            {
              step: 3 as StepNumber,
              num: '৩',
              titleEn: '3. GROUP BY',
              titleBn: '৩. GROUP BY বাকেট',
              descEn: 'Bucket by Department',
              descBn: 'ডিপার্টমেন্ট অনুযায়ী গ্রুপিং',
              icon: Layers
            },
            {
              step: 4 as StepNumber,
              num: '৪',
              titleEn: '4. HAVING Clause',
              titleBn: '৪. HAVING দিয়ে ফিল্টার',
              descEn: 'Filter group summaries',
              descBn: 'গ্রুপ সামারি ফিল্টার করা',
              icon: Filter
            },
          ].map(item => {
            const Icon = item.icon;
            const isActive = currentStep === item.step;
            return (
              <button
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`p-2.5 rounded-xl text-left transition border cursor-pointer ${
                  isActive
                    ? 'bg-purple-600/20 border-purple-500  ring-1 ring-purple-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-purple-500 text-white' : 'bg-slate-800 text-zinc-400'
                  }`}>
                    {language === 'bn' ? item.num : `Step ${item.step}`}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-zinc-500'}`} />
                </div>
                <div className={`text-xs font-bold mt-1.5 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </div>
                <div className="text-[10px] text-zinc-400 truncate">
                  {language === 'bn' ? item.descBn : item.descEn}
                </div>
              </button>
            );
          })}
        </div>
      {currentStep === 1 && <Step1RecordsTab onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <Step2AggregatesTab onNext={() => setCurrentStep(3)} />}
      {currentStep === 3 && <Step3GroupByTab onNext={() => setCurrentStep(4)} />}
      {currentStep === 4 && <Step4HavingTab onRestart={() => setCurrentStep(1)} />}
    </section>
  );
}
