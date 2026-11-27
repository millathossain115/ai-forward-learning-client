'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part2Info() {
  const { language } = useLanguage();
  const [mark1, setMark1] = useState(80);
  const [mark2, setMark2] = useState(90);
  const [mark3, setMark3] = useState(70);

  const calculatedTotal = mark1 + mark2 + mark3;
  const calculatedAvg = (calculatedTotal / 3).toFixed(1);
  const calculatedGrade =
    Number(calculatedAvg) >= 80 ? 'A+ (Distinction)' : Number(calculatedAvg) >= 70 ? 'A (Excellent)' : 'B (Good)';

  const comparisonRows = [
    {
      aspectEn: 'Meaning',
      aspectBn: 'অর্থ',
      dataEn: 'Raw facts and figures without context',
      dataBn: 'নির্দিষ্ট প্রসঙ্গ ছাড়া বিচ্ছিন্ন কাঁচা উপাত্ত',
      infoEn: 'Processed data that conveys clear meaning',
      infoBn: 'প্রক্রিয়াজাত উপাত্ত যা সুনির্দিষ্ট অর্থ প্রকাশ করে',
    },
    {
      aspectEn: 'Form',
      aspectBn: 'রূপ বা কাঠামো',
      dataEn: 'Unorganized, isolated values',
      dataBn: 'অসংগঠিত, এলোমেলো ও পৃথক মান',
      infoEn: 'Organized, structured, and contextualized',
      infoBn: 'সুসংগঠিত, অর্থপূর্ণ ও সুনির্দিষ্ট কাঠামোগত রূপ',
    },
    {
      aspectEn: 'Dependability',
      aspectBn: 'নির্ভরশীলতা',
      dataEn: 'Does not depend on information',
      dataBn: 'ইনফরমেশনের ওপর নির্ভর করে না',
      infoEn: 'Completely depends on underlying raw data',
      infoBn: 'সম্পূর্ণরূপে মূল কাঁচা ডেটার ওপর নির্ভরশীল',
    },
    {
      aspectEn: 'Example',
      aspectBn: 'উদাহরণ',
      dataEn: '80, 90, 70',
      dataBn: '৮০, ৯০, ৭০ (বিচ্ছিন্ন তিনটি সংখ্যা)',
      infoEn: 'Average score is 80% (Grade A)',
      infoBn: 'গড় নম্বর ৮০% (গ্রেড: A — পাস)',
    },
  ];

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            Part 2 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'What is Information?'}
            {language === 'bn' && 'ইনফরমেশন বা তথ্য কী? (What is Information?)'}
            {language === 'dual' && 'What is Information? (ইনফরমেশন বা তথ্য কী?)'}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
          {(language === 'en' || language === 'dual') && (
            <p>
              Now let&apos;s see what happens when data is processed.
              <br />
              <strong>Information</strong> is data that has been <em>processed, organized, structured, or presented</em> in a given context to make it useful, actionable, and meaningful.
            </p>
          )}
          {(language === 'bn' || language === 'dual') && (
            <p className={language === 'dual' ? 'text-xs text-indigo-300/90 border-l-2 border-indigo-500/40 pl-3 py-0.5' : ''}>
              এবার দেখা যাক কাঁচা ডেটাকে যখন প্রক্রিয়া করা হয় তখন কী ঘটে।
              <br />
              <strong>ইনফরমেশন বা তথ্য</strong> হলো সেই ডেটা, যা <em>প্রক্রিয়াজাত (Processed), সুসংগঠিত এবং অর্থপূর্ণ প্রসঙ্গে উপস্থাপন</em> করা হয়েছে, যাতে তা কোনো বাস্তব সিদ্ধান্ত গ্রহণে কাজে আসে।
            </p>
          )}
        </div>

        {/* Interactive Processing Pipeline */}
        <div className="p-5 rounded-2xl bg-[#15171e] border border-cyan-950 space-y-5">
          <h3 className="text-xs font-bold text-cyan-300 uppercase font-mono flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cyan-400" />
            {language === 'bn'
              ? 'ইন্টারঅ্যাক্টিভ পাইপলাইন: কাঁচা নম্বর থেকে তথ্যে রূপান্তর'
              : 'Interactive Pipeline: Turning Raw Marks into Actionable Information'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                {language === 'bn' ? 'বিষয় ১ (গণিত):' : 'Subject 1 (Math):'}
              </span>
              <input
                type="number"
                min="0"
                max="100"
                value={mark1}
                onChange={(e) => setMark1(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                className="w-full bg-[#101116] border border-white/[0.12] rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                {language === 'bn' ? 'বিষয় ২ (বিজ্ঞান):' : 'Subject 2 (Science):'}
              </span>
              <input
                type="number"
                min="0"
                max="100"
                value={mark2}
                onChange={(e) => setMark2(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                className="w-full bg-[#101116] border border-white/[0.12] rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">
                {language === 'bn' ? 'বিষয় ৩ (ইংরেজি):' : 'Subject 3 (English):'}
              </span>
              <input
                type="number"
                min="0"
                max="100"
                value={mark3}
                onChange={(e) => setMark3(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                className="w-full bg-[#101116] border border-white/[0.12] rounded-lg px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            <div className="p-4 rounded-xl bg-[#101116] border border-amber-900/40 text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                {language === 'bn' ? 'ধাপ ১: কাঁচা ডেটা' : 'Step 1: Raw Data'}
              </span>
              <p className="text-sm font-mono font-bold text-white">{mark1}, {mark2}, {mark3}</p>
              <span className="text-[10px] text-zinc-500">
                {language === 'bn' ? 'আলাদা আলাদা ৩টি পরীক্ষার নম্বর' : 'Unprocessed individual scores'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#101116] border border-indigo-900/40 text-center space-y-1">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                {language === 'bn' ? 'ধাপ ২: প্রসেসিং বা প্রক্রিয়াকরণ' : 'Step 2: Processing'}
              </span>
              <p className="text-xs font-mono text-indigo-300">Sum = {calculatedTotal}</p>
              <p className="text-xs font-mono text-indigo-300">Average = {calculatedTotal} ÷ 3</p>
              <span className="text-[10px] text-zinc-500">
                {language === 'bn' ? 'গাণিতিক গণনা ও সূত্র প্রয়োগ' : 'Mathematical computation'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 text-center space-y-1 ring-1 ring-cyan-500/30">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                {language === 'bn' ? 'ধাপ ৩: ইনফরমেশন বা তথ্য' : 'Step 3: Information'}
              </span>
              <p className="text-sm font-mono font-bold text-cyan-300">Avg: {calculatedAvg}% • {calculatedGrade}</p>
              <span className="text-[10px] text-cyan-400 font-semibold">
                {language === 'bn' ? 'চূড়ান্ত অর্থবহ ও কার্যকর ফলাফল!' : 'Actionable & meaningful result!'}
              </span>
            </div>
          </div>
        </div>

        {/* Data vs Information Comparison Table */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono font-bold text-zinc-300">
            {language === 'bn' ? 'ডেটা বনাম ইনফরমেশন: সরাসরি তুলনা' : 'Data vs Information: Direct Comparison'}
          </h4>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
                  <th className="py-2.5 px-4 font-bold text-amber-400 w-1/4">
                    {language === 'bn' ? 'তুলনার বিষয়' : 'Aspect'}
                  </th>
                  <th className="py-2.5 px-4 font-bold text-amber-300 w-1/3">
                    {language === 'bn' ? 'ডেটা (Data)' : 'Data (ডেটা)'}
                  </th>
                  <th className="py-2.5 px-4 font-bold text-cyan-400">
                    {language === 'bn' ? 'তথ্য (Information)' : 'Information (তথ্য)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                {comparisonRows.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2.5 px-4 font-bold text-white">
                      {language === 'bn' ? r.aspectBn : r.aspectEn}
                      {language === 'dual' && (
                        <span className="block text-[11px] font-normal text-zinc-400 font-sans">{r.aspectBn}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      {language === 'bn' ? r.dataBn : r.dataEn}
                      {language === 'dual' && (
                        <span className="block text-[11px] text-amber-300/80 font-sans mt-0.5">{r.dataBn}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-cyan-300 font-medium">
                      {language === 'bn' ? r.infoBn : r.infoEn}
                      {language === 'dual' && (
                        <span className="block text-[11px] text-cyan-200/80 font-sans mt-0.5">{r.infoBn}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
