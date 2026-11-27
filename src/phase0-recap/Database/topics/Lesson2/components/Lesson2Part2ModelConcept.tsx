'use client';

import React from 'react';
import { Workflow, Compass, Box } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson2Part2ModelConcept() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ২ / ৫' : 'Part 2 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="What is a Database Model? (The Architectural Blueprint)"
              bn="ডেটাবেস মডেল কী? (ব্লুপ্রিন্ট বা স্থাপত্য নকশা)"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {/* Definition Box */}
        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-purple-300 leading-relaxed">
          <strong className="text-purple-200 block text-sm font-mono mb-1">
            <DualText en="Formal Definition:" bn="প্রাতিষ্ঠানিক সংজ্ঞা:" />
          </strong>
          <DualText
            en='"A database model describes how data is structured, organized, stored, and related within a database system."'
            bn='"একটি ডেটাবেস মডেল নির্ধারণ করে যে কীভাবে ডেটা সংগঠিত হবে, কীভাবে সংরক্ষিত থাকবে এবং একটি তথ্যের সাথে অন্য তথ্যের সম্পর্ক কীভাবে স্থাপিত হবে।"'
          />
        </div>

        {/* Architectural Blueprint Analogy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#15171e] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                {language === 'bn' ? 'বাস্তব জীবনের তুলনা' : 'Real-World Analogy'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">
              {language === 'bn'
                ? 'ভবন নির্মাণের ব্লুপ্রিন্ট (Architectural Blueprint)'
                : 'Architectural Blueprint of a Building'}
            </h3>
            <div className="text-xs text-zinc-300 leading-relaxed font-sans">
              <DualText
                en="Before constructing a high-rise building, an architect drafts a blueprint detailing where pillars stand, how rooms connect, and how plumbing routes flow. You never start pouring concrete blindly!"
                bn="একটি বহুতল ভবন নির্মাণের আগে একজন স্থপতি একটি নীল নকশা বা ব্লুপ্রিন্ট তৈরি করেন। নকশায় স্থির থাকে কোথায় পিলার থাকবে, কতগুলো কক্ষ হবে এবং কীভাবে পানির পাইপলাইন সাজানো হবে। নকশা ছাড়া কাজ শুরু করলে ভবন ভেঙে পড়বে।"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#15171e] border border-indigo-900/40 space-y-2 ring-1 ring-indigo-500/30">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                {language === 'bn' ? 'সফটওয়্যার ইঞ্জিনিয়ারিং তুলনা' : 'Software Engineering Analogy'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">
              {language === 'bn' ? 'ডেটাবেস মডেল (Database Model)' : 'Database Model'}
            </h3>
            <div className="text-xs text-zinc-300 leading-relaxed font-sans">
              <DualText
                en="Before storing data, software engineers choose a model to decide if data lives in 2D tables, hierarchical tree nodes, document objects, or network graphs. This structural blueprint governs how the database behaves."
                bn="ডেটাবেসে ডেটা ইনসার্ট করার আগে ইঞ্জিনিয়াররা মডেলের মাধ্যমে ঠিক করেন ডেটা কি টেবিলে থাকবে, গাছের মতো শাখাপ্রশাখায় থাকবে, অবজেক্ট আকারে থাকবে, নাকি গ্রাফের মতো নোডে থাকবে। এই কাঠামোগত সিদ্ধান্তই হলো ডেটাবেস মডেল।"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
