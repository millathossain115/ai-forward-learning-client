'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ScenarioItem {
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  analogy: string;
  analogyEn?: string;
  whyItFits: string;
  whyItFitsEn?: string;
  badge: string;
  accentColor: string;
  visualTag: string;
  diagram?: React.ReactNode;
}

interface RealLifeScenarioProps {
  topicName: string;
  topicNameEn?: string;
  scenarios: ScenarioItem[];
}

export default function RealLifeScenario({
  topicName,
  topicNameEn,
  scenarios,
}: RealLifeScenarioProps) {
  const { language } = useLanguage();
  const displayTopic = language === 'en' ? (topicNameEn || topicName) : topicName;

  return (
    <section className="bg-[#15171e] border border-white/[0.08] p-6 rounded-2xl flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1c1f29] text-amber-400 flex items-center justify-center border border-white/[0.08] shrink-0">
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-semibold text-[#f4f4f7]">
              {language === 'en'
                ? 'Everyday Real-Life Analogies'
                : language === 'bn'
                  ? 'বাস্তব জীবনের দৃশ্যপট'
                  : 'বাস্তব জীবনের দৃশ্যপট • Everyday Real-Life Analogies'}
            </h3>
            <span className="text-xs md:text-sm text-[#9ca0b0] font-sans block mt-0.5">
              {language === 'en'
                ? `Connecting ${displayTopic} with everyday experience`
                : `দৈনন্দিন জীবনের অভিজ্ঞতার সাথে ${displayTopic}-এর সংযোগ`}
            </span>
          </div>
        </div>
        <span className="text-xs font-mono text-[#686c7d]">
          Visual mental model
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((sc, idx) => {
          const title = language === 'en' && sc.titleEn ? sc.titleEn : sc.title;
          const subtitle = language === 'en' && sc.subtitleEn ? sc.subtitleEn : sc.subtitle;
          const analogy = language === 'en' && sc.analogyEn ? sc.analogyEn : sc.analogy;
          const whyItFits = language === 'en' && sc.whyItFitsEn ? sc.whyItFitsEn : sc.whyItFits;

          return (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.08] bg-[#101116] p-5 flex flex-col justify-between gap-4 hover:border-white/[0.14] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#15171e] text-amber-400 border border-white/[0.08] font-medium">
                    {sc.badge}
                  </span>
                  <span className="text-xs font-mono text-[#9ca0b0]">
                    {sc.visualTag}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-[#f4f4f7] group-hover:text-amber-300 transition-colors">
                  {title}
                </h4>
                <span className="text-xs text-[#686c7d] font-mono block mt-0.5 mb-3">{subtitle}</span>

                <p className="text-sm text-[#f4f4f7]/90 leading-relaxed font-sans bg-[#090a0d] p-3.5 rounded-lg border border-white/[0.06]">
                  {analogy}
                </p>
              </div>

              {sc.diagram && (
                <div className="bg-[#15171e] p-3 rounded-lg border border-white/[0.06] flex items-center justify-center text-xs md:text-sm">
                  {sc.diagram}
                </div>
              )}

              <div className="pt-3 border-t border-white/[0.08] text-xs md:text-sm text-[#9ca0b0]">
                <span className="text-amber-400 font-medium font-mono mr-1.5">
                  {language === 'en' ? 'Why it fits:' : 'কেন এটি মিলে:'}
                </span>
                <span className="leading-relaxed font-sans">{whyItFits}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
