'use client';

import React from 'react';
import DualText from '@/components/DualText';
import { useLanguage } from '@/context/LanguageContext';
import RamSimulationCanvas from './components/RamSimulationCanvas';
import ComplexityDashboard from './components/ComplexityDashboard';
import DomainArchitectureNavigator from './components/DomainArchitectureNavigator';
import EngineeringRoadmap from './components/EngineeringRoadmap';

export default function FoundationsTopic() {
  const { language } = useLanguage();

  return (
    <div className="space-y-12 text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#15171e] border border-white/[0.08] p-6 md:p-8">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-medium">
              Phase 0 • Foundations &amp; Roadmap
            </span>
            <span className="text-xs text-[#686c7d] font-mono">
              {language === 'bn' ? 'মূল মেকানিক্স' : 'Core Mechanics'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#f4f4f7]">
            <DualText
              en="Data Structures & Algorithms Foundations"
              bn="ডেটা স্ট্রাকচার ও অ্যালগরিদমের মূল ভিত্তি"
            />
          </h1>
          <div className="text-xs md:text-sm text-[#9ca0b0] max-w-3xl leading-relaxed">
            <DualText
              en="Modern software architecture is built on two pillars: how data is organized in memory (Data Structure) and the exact step-by-step logic used to process it (Algorithm)."
              bn="মেমরিতে ডেটা কীভাবে সাজিয়ে রাখা হয় (Data Structure) এবং সেই ডেটা ব্যবহার করে কীভাবে নিখুঁত ধাপে সমস্যা সমাধান করা হয় (Algorithm)—এদের যৌথ সমন্বয়েই আধুনিক সফটওয়্যার আর্কিটেকচার গড়ে ওঠে।"
            />
          </div>
        </div>
      </div>

      {/* 2. Interactive Simulation: Data Structure vs Algorithm */}
      <div id="dsa-ram" className="scroll-mt-4"><RamSimulationCanvas /></div>

      {/* 3. Efficiency Dashboard: Time & Memory Complexity */}
      <div id="dsa-complexity" className="scroll-mt-4"><ComplexityDashboard /></div>

      {/* 4. Practical Domain Architecture Navigator */}
      <div id="dsa-domains" className="scroll-mt-4"><DomainArchitectureNavigator /></div>

      {/* 5. Complete Forward Engineering Roadmap */}
      <div id="dsa-roadmap" className="scroll-mt-4"><EngineeringRoadmap /></div>
    </div>
  );
}
