'use client';

import React from 'react';
import { Rows3, Columns3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part2TuplesAttrs() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Rows3 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ২ / ৯' : 'Part 2 of 9'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Tuples (Rows) & Attributes (Columns)"
              bn="টাপল (Tuples / সারি) এবং অ্যাট্রিবিউট (Attributes / কলাম)"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tuples Card */}
        <div className="p-5 rounded-2xl bg-[#15171e] border border-cyan-900/40 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
            <Rows3 className="w-4 h-4 text-cyan-400" />
            <DualText
              en="1. Tuple = Row = Record"
              bn="১. টাপল = রো (Row) = রেকর্ড (Record)"
            />
          </span>
          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: A tuple is a single horizontal row or record in a relation that contains values for all the attributes of that entity."
              bn="সংজ্ঞা: একটি রিলেশন বা টেবিলের প্রতিটি অনুভূমিক সারিকে টাপল (Tuple) বলে। এটি একটি নির্দিষ্ট সত্তার সমস্ত বৈশিষ্ট্যের মান বহন করে।"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#101116] border border-white/[0.08] text-xs font-mono text-zinc-300 space-y-1">
            <span className="text-zinc-500 text-[10px] block">
              {language === 'bn' ? 'হাসপাতালের রোগীর টাপলের বাস্তব উদাহরণ:' : 'Hospital Patient Tuple Example:'}
            </span>
            <div className="text-cyan-300 font-bold">Tuple 1: [P01, Hasan, 30]</div>
            <div className="text-zinc-400">Tuple 2: [P02, Rina, 25]</div>
            <div className="text-zinc-400">Tuple 3: [P03, Kamal, 40]</div>
          </div>
          <div className="text-[11px] text-zinc-400 font-sans">
            <DualText
              en="Hasan's entire information set (ID, Name, Age) together constitutes a single Tuple."
              bn="হাসানের সম্পূর্ণ তথ্য (ID, Name, Age) মিলে তৈরি হলো একটি একক টাপল (Tuple)।"
            />
          </div>
        </div>

        {/* Attributes Card */}
        <div className="p-5 rounded-2xl bg-[#15171e] border border-purple-900/40 space-y-3">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
            <Columns3 className="w-4 h-4 text-purple-400" />
            <DualText
              en="2. Attribute = Column = Field"
              bn="২. অ্যাট্রিবিউট = কলাম = ফিল্ড (Field)"
            />
          </span>
          <div className="text-xs text-zinc-300 leading-relaxed font-sans">
            <DualText
              en="Definition: An attribute is a named property or characteristic of an entity, represented by a vertical column in a relation."
              bn="সংজ্ঞা: কোনো সত্তার (Entity) নির্দিষ্ট বৈশিষ্ট্য বা গুণাবলীকে অ্যাট্রিবিউট বলে, যা টেবিলে উলম্ব কলাম আকারে সংরক্ষিত থাকে।"
            />
          </div>
          <div className="p-3 rounded-xl bg-[#101116] border border-white/[0.08] text-xs font-mono text-zinc-300 space-y-1">
            <span className="text-zinc-500 text-[10px] block">
              {language === 'bn' ? 'গাড়ি (Car Entity)-র অ্যাট্রিবিউটের উদাহরণ:' : 'Car Entity Attributes:'}
            </span>
            <div className="flex flex-wrap gap-1.5 text-purple-300 font-bold">
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/[0.08]">Car_ID</span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/[0.08]">Brand</span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/[0.08]">Model</span>
              <span className="px-2 py-0.5 rounded bg-black/40 border border-white/[0.08]">Price</span>
            </div>
          </div>
          <div className="text-[11px] text-zinc-400 font-sans">
            <DualText
              en="A car's brand, model, or price—each characteristic is a distinct Attribute."
              bn="গাড়ির ব্র্যান্ড, মডেল কিংবা দাম—প্রতিটি বৈশিষ্ট্য আলাদা আলাদা অ্যাট্রিবিউট (Attribute)।"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
