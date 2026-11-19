'use client';

import React, { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part1Data() {
  const { language } = useLanguage();
  const [inspectedRawToken, setInspectedRawToken] = useState<string | null>(null);

  const tokens = [
    {
      val: '101',
      meaningEn: 'Without column headers or labels, 101 is just an isolated number. It has no definite meaning on its own (ID? Room? Price?).',
      meaningBn: 'কোনো হেডার বা কনটেক্সট ছাড়া ১০১ কেবল একটি সংখ্যা। এটি রোল নম্বর, রুম নম্বর, নাকি চালানের কোড—বোঝার উপায় নেই।',
    },
    {
      val: 'Rahim',
      meaningEn: 'A text string. Without context, we do not know if Rahim is an employee, a student, a customer, or a patient.',
      meaningBn: 'একটি নাম বা টেক্সট স্ট্রিং। সে কি ছাত্র, শিক্ষক, গ্রাহক নাকি রোগী—তা কোনোভাবেই নিশ্চিত হওয়া যায় না।',
    },
    {
      val: '22',
      meaningEn: 'Could be age in years, attendance days, or marks scored. Data alone lacks interpretation.',
      meaningBn: 'এটি কি বয়স ২২ বছর? ২২ দিন উপস্থিতি? নাকি ২২ নম্বর পাওয়া? একাকী উপাত্তে কোনো স্পষ্ট অর্থ থাকে না।',
    },
    {
      val: 'CSE',
      meaningEn: 'Three letters. Does it mean Computer Science & Engineering department, a course code, or an airport code?',
      meaningBn: 'তিনটি অক্ষর। এটি কি কম্পিউটার সায়েন্স বিভাগ, কোর্সের কোড, নাকি অন্য কোনো সংক্ষিপ্ত রূপ?',
    },
    {
      val: '3.80',
      meaningEn: 'A decimal value. It only becomes useful information when labeled as CGPA out of 4.00.',
      meaningBn: 'একটি ভগ্নাংশ সংখ্যা। যখন বলা হবে এটি ৪.০০-এর মধ্যে প্রাপ্ত CGPA, তখনই এটি তথ্যে রূপান্তরিত হবে।',
    },
  ];

  const tableData = [
    {
      situationEn: 'School / University',
      situationBn: 'স্কুল / বিশ্ববিদ্যালয়',
      dataEn: 'Student names, Roll numbers, Raw exam marks',
      dataBn: 'শিক্ষার্থীর নাম, রোল নম্বর, পরীক্ষার কাঁচা প্রাপ্ত নম্বর',
    },
    {
      situationEn: 'Bank',
      situationBn: 'ব্যাংক',
      dataEn: 'Account numbers, Raw transaction amounts ($50, -$20)',
      dataBn: 'হিসাব নম্বর, লেনদেনের পরিমাণ (যেমন: ৫০০ টাকা জমা, ২০০ টাকা উত্তোলন)',
    },
    {
      situationEn: 'Hospital',
      situationBn: 'হাসপাতাল',
      dataEn: 'Patient IDs, Blood pressure digits (120, 80), Body temperatures',
      dataBn: 'রোগীর আইডি, রক্তচাপের রিডিং (১২০, ৮০), শরীরের তাপমাত্রা',
    },
    {
      situationEn: 'E-Commerce / Shopping',
      situationBn: 'ই-কমার্স / অনলাইন শপিং',
      dataEn: 'Product SKUs, Item quantities, Currency digits',
      dataBn: 'প্রোডাক্ট কোড বা SKU, পণ্যের সংখ্যা, মূল্যের অঙ্ক',
    },
    {
      situationEn: 'Weather Station',
      situationBn: 'আবহাওয়া কেন্দ্র',
      dataEn: 'Sensor readings: 31°C, 88% humidity, 1013 hPa pressure',
      dataBn: 'সেন্সর রিডিং: ৩১° সে., ৮৮% আর্দ্রতা, ১০১৩ মিলিবার চাপ',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
            Part 1 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'What is Data?'}
            {language === 'bn' && 'ডেটা কী? (What is Data?)'}
            {language === 'dual' && 'What is Data? (ডেটা কী?)'}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
          {(language === 'en' || language === 'dual') && (
            <p>
              First, let&apos;s understand the word <strong>Data</strong>.
              <br />
              <strong>Data</strong> means <em>raw facts, figures, symbols, or observations</em> that have not yet been processed or organized to provide meaningful context.
            </p>
          )}
          {(language === 'bn' || language === 'dual') && (
            <p className={language === 'dual' ? 'text-xs text-indigo-300/90 border-l-2 border-indigo-500/40 pl-3 py-0.5' : ''}>
              প্রথমে <strong>ডেটা (Data)</strong> শব্দটি বোঝা যাক।
              <br />
              <strong>ডেটা</strong> হলো কোনো প্রক্রিয়াকরণ ছাড়া <em>অপরিশোধিত ও বিচ্ছিন্ন কিছু উপাত্ত, সংখ্যা, প্রতীক বা পর্যবেক্ষণ</em>, যার কোনো স্পষ্ট অর্থ বা কার্যকারিতা থাকে না।
            </p>
          )}
        </div>

        {/* Interactive Raw Data Example Box */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-950 space-y-4">
          <h3 className="text-xs font-bold text-indigo-300 uppercase font-mono flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            {language === 'bn'
              ? 'নিচের ৫টি বিচ্ছিন্ন ডেটা টোকেন লক্ষ্য করুন:'
              : 'Imagine I give you these 5 isolated raw values:'}
          </h3>

          <div className="flex flex-wrap gap-2.5">
            {tokens.map((token) => (
              <button
                key={token.val}
                onClick={() => setInspectedRawToken(token.val)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  inspectedRawToken === token.val
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                    : 'bg-[#101324] border-slate-700 text-zinc-300 hover:border-slate-500'
                }`}
              >
                &ldquo;{token.val}&rdquo;
              </button>
            ))}
          </div>

          {inspectedRawToken ? (
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-300 font-mono space-y-1">
              <span className="font-bold text-amber-200">
                💡 {language === 'bn' ? 'বিশ্লেষণ' : 'Inspecting'} &ldquo;{inspectedRawToken}&rdquo;:
              </span>
              <p className="text-zinc-300">
                {language === 'bn'
                  ? tokens.find((t) => t.val === inspectedRawToken)?.meaningBn
                  : tokens.find((t) => t.val === inspectedRawToken)?.meaningEn}
              </p>
              {language === 'dual' && (
                <p className="text-[11px] text-amber-300/80 pt-0.5">
                  {tokens.find((t) => t.val === inspectedRawToken)?.meaningBn}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[11px] text-zinc-500 font-mono">
              {language === 'bn'
                ? '👆 যেকোনো উপাত্তের ওপর ক্লিক করে দেখুন কেন কনটেক্সট ছাড়া ডেটা অর্থহীন।'
                : '👆 Click any raw data token above to see why raw facts lack complete meaning without context.'}
            </p>
          )}

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-zinc-300 leading-relaxed">
            {language === 'bn' ? (
              <p>
                এই পাঁচটি মান কোনো ব্যাখ্যা ছাড়া দিলে আপনি হয়তো কিছুই নিশ্চিত হতে পারবেন না। কারণ এগুলো কেবলই <strong>কাঁচা ডেটা (Raw Data)</strong>।
              </p>
            ) : (
              <p>
                If I simply give you these five values without explaining what they represent, you cannot fully interpret them. That is because they are just <strong>raw data</strong>.
              </p>
            )}
            {language === 'dual' && (
              <p className="text-xs text-indigo-300/80 mt-1">
                (এই পাঁচটি মান কোনো ব্যাখ্যা ছাড়া দিলে নিশ্চিত হওয়া সম্ভব নয়—কারণ এগুলো কেবলই কাঁচা উপাত্ত বা Raw Data।)
              </p>
            )}
          </div>
        </div>

        {/* Everyday Examples of Data Table */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
            {language === 'bn'
              ? 'বাস্তব জীবনে অপরিশোধিত ডেটার আরও কিছু উদাহরণ:'
              : 'More examples of raw data in daily life:'}
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                  <th className="py-2.5 px-4 font-bold text-indigo-400 w-1/3">
                    {language === 'bn' ? 'ক্ষেত্র / ক্ষেত্রসমূহ' : 'Situation / Domain'}
                  </th>
                  <th className="py-2.5 px-4 font-bold text-amber-400">
                    {language === 'bn' ? 'অপরিশোধিত ডেটা উপাদান' : 'Raw Data Elements'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                {tableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 px-4 font-bold text-white">
                      {language === 'bn' ? row.situationBn : row.situationEn}
                      {language === 'dual' && (
                        <span className="block text-[11px] font-normal text-zinc-400 font-sans">
                          {row.situationBn}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      {language === 'bn' ? row.dataBn : row.dataEn}
                      {language === 'dual' && (
                        <span className="block text-[11px] text-amber-300/80 font-sans mt-0.5">
                          {row.dataBn}
                        </span>
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
