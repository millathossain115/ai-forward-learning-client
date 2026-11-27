'use client';

import React from 'react';
import RamSimulationCanvas from './components/RamSimulationCanvas';
import ComplexityDashboard from './components/ComplexityDashboard';
import DomainArchitectureNavigator from './components/DomainArchitectureNavigator';
import EngineeringRoadmap from './components/EngineeringRoadmap';

export default function FoundationsTopic() {
  return (
    <div className="space-y-12 text-zinc-100">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#15171e] border border-[#232942] p-6 md:p-8">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
              Phase 0 • Foundations &amp; Roadmap
            </span>
            <span className="text-xs text-zinc-500 font-mono">Core Mechanics</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
            ডেটা স্ট্রাকচার ও অ্যালগরিদমের মূল ভিত্তি
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 max-w-3xl leading-relaxed">
            মেমরিতে ডেটা কীভাবে সাজিয়ে রাখা হয় (Data Structure) এবং সেই ডেটা ব্যবহার করে কীভাবে নিখুঁত ধাপে সমস্যা সমাধান করা হয় (Algorithm)—এদের যৌথ সমন্বয়েই আধুনিক সফটওয়্যার আর্কিটেকচার গড়ে ওঠে।
          </p>
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
