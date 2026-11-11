'use client';

import React from 'react';
import ArrayVisualizer from './ArrayVisualizer';
import { ARRAY_THEORY } from './arrayData';
import RealLifeScenario from '@/components/RealLifeScenario';
import { Binary, Cpu, Sparkles, Zap, Table, CheckCircle2 } from 'lucide-react';

export default function ArrayTopic() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. Header & Architectural Overview */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#181a26] text-amber-400 flex items-center justify-center border border-[#262a3f]">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">{ARRAY_THEORY.title}</h2>
            <span className="text-xs text-zinc-400 font-mono font-medium">Topic 1 • Linear Structures</span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          {ARRAY_THEORY.definition}
        </p>

        {/* Memory Pointer Arithmetic Box */}
        <div className="p-4 rounded-xl bg-[#090a10] border border-[#1a1c29] font-mono text-sm text-amber-300 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-400">Hardware Address Equation:</span>
            <span className="font-semibold text-zinc-100">{ARRAY_THEORY.memoryFormula}</span>
          </div>
          <span className="text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/60 font-mono font-medium">
            Zero CPU Search Overhead
          </span>
        </div>
      </div>

      {/* 2. Interactive Simulation Playground */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
            <Zap className="w-4 h-4 text-amber-400" />
            Memory Operations Simulator
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            Access O(1) • Linear Scan O(N) • Shifting O(N)
          </span>
        </div>
        <ArrayVisualizer />
      </div>

      {/* Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="অ্যারে (Array)"
        scenarios={[
          {
            title: "১. সিনেমা হল বা স্টেডিয়ামের আসন নম্বর (Numbered Arena Seats)",
            subtitle: "টিকিট নম্বর জানা থাকলে সরাসরি গিয়ে বসে পড়া যায়",
            badge: "O(1) Direct Access",
            visualTag: "Index Lookup",
            accentColor: "amber",
            analogy:
              "সিনেমা হলে প্রতিটি চেয়ার সারিবদ্ধভাবে লাগানো এবং ১, ২, ৩... করে নম্বর দেওয়া। আপনার টিকিটে যদি 'সিট নম্বর ৫' লেখা থাকে, আপনাকে ১ থেকে ৪ পর্যন্ত কাউকে জিজ্ঞেস করতে হয় না, আপনি এক লাফে সরাসরি ৫ নম্বর চেয়ারে গিয়ে বসতে পারেন ($O(1)$ Access)। কিন্তু যদি মাঝখানে ৩ নম্বর চেয়ারে নতুন একজন বন্ধুকে বসাতে চান, তবে ৩ থেকে শেষের সবাইকে এক সিট করে ডানে সরে যেতে হবে (Shifting $O(N)$)!",
            whyItFits:
              "র‌্যামে অ্যারে উপাদানগুলো একদম পাশাপাশি থাকে। ইনডেক্স সূত্র: Base + i * 4 bytes দিয়ে প্রসেসর সরাসরি মেমরি অ্যাড্রেসে পৌঁছায়।",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">[সিট ০]</span>
                <span className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-400">[সিট ১]</span>
                <span className="px-2 py-1 rounded bg-amber-500 text-slate-950 font-bold border border-amber-400">[সিট ২ ➔ আপনি সোজা এখানে]</span>
              </div>
            ),
          },
          {
            title: "২. ৭ দিনের পিলবক্স বা ওষুধের বাক্স (Daily Medicine Pillbox)",
            subtitle: "বার বা দিন অনুসারে ফিক্সড স্লট",
            badge: "Fixed Offset",
            visualTag: "Contiguous Slots",
            accentColor: "sky",
            analogy:
              "বৃদ্ধ বাবা-মায়ের জন্য কেনা পিলবক্সে ৭টি খোপ পাশাপাশি জোড়া লাগানো থাকে (শনিবার, রবিবার, সোমবার...)। বুধবারের ওষুধ খেতে চাইলে বাকি দিনের খোপ না ঘেঁটে সরাসরি ৪ নম্বর খোপটি খোলা যায়।",
            whyItFits:
              "প্রতিটি স্লটের আকার সমান এবং তারা একে অপরের সাথে শারীরিক মেমরিতে জোড়া লাগানো থাকে।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono py-1">
                {['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ'].map((day, idx) => (
                  <div key={idx} className="px-2 py-1 rounded bg-[#161828] border border-[#25283d] text-zinc-300">
                    {day}
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />

      {/* 3. Time & Space Complexity Benchmark Table */}
      <div className="bg-[#0f111a] border border-[#1e2233] rounded-2xl p-6 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Table className="w-4 h-4 text-zinc-400" />
          Time &amp; Space Complexity
        </h3>

        <div className="overflow-x-auto rounded-xl border border-[#1a1c29] bg-[#090a10]">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-[#12141f] text-zinc-300 border-b border-[#1c1f2e]">
              <tr>
                <th className="p-3.5 font-medium">Operation</th>
                <th className="p-3.5 font-medium">Best</th>
                <th className="p-3.5 font-medium">Worst</th>
                <th className="p-3.5 font-medium">Average</th>
                <th className="p-3.5 font-medium font-sans">Memory &amp; Structural Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171926] text-zinc-200">
              {ARRAY_THEORY.complexities.map((c, idx) => (
                <tr key={idx} className="hover:bg-[#11131c]">
                  <td className="p-3.5 font-medium text-zinc-100">{c.operation}</td>
                  <td className="p-3.5 text-emerald-400">{c.bestCase}</td>
                  <td className="p-3.5 text-rose-400">{c.worstCase}</td>
                  <td className="p-3.5 text-amber-300">{c.averageCase}</td>
                  <td className="p-3.5 text-zinc-300 text-xs md:text-sm font-sans">{c.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Real-World Systems & AI Engineering Applications */}
      <div className="flex flex-col gap-3.5">
        <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          Production &amp; AI Engineering Usages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARRAY_THEORY.realWorldApplications.map((app, idx) => (
            <div
              key={idx}
              className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl flex flex-col justify-between hover:border-[#2b3047] transition-colors"
            >
              <div>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[#151824] text-zinc-300 border border-[#222538] font-medium">
                  {app.domain}
                </span>
                <h4 className="font-bold text-sm md:text-base text-zinc-100 mt-2.5">{app.title}</h4>
                <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
