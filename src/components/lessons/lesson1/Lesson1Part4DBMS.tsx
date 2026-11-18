'use client';

import React from 'react';
import { Server, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Lesson1Part4DBMS() {
  const { language } = useLanguage();

  const dbmsList = [
    {
      name: 'MySQL',
      typeEn: 'Relational DBMS (RDBMS)',
      typeBn: 'রিলেশনাল ডিবিএমএস (RDBMS)',
      descEn: 'World’s most popular open-source SQL database for web apps (WordPress, YouTube).',
      descBn: 'ওয়েব অ্যাপ্লিকেশনে বিশ্বের সর্বাধিক ব্যবহৃত ওপেন সোর্স রিলেশনাল এসকিউএল ডেটাবেস।',
    },
    {
      name: 'PostgreSQL',
      typeEn: 'Object-Relational DBMS',
      typeBn: 'অবজেক্ট-রিলেশনাল ডিবিএমএস',
      descEn: 'Advanced enterprise database supporting JSONB, strict ACID, and modern AI pgvector.',
      descBn: 'অত্যন্ত শক্তিশালী এন্টারপ্রাইজ ডেটাবেস—JSONB এবং আধুনিক AI ভেক্টর (pgvector) সাপোর্ট করে।',
    },
    {
      name: 'Oracle Database',
      typeEn: 'Enterprise RDBMS',
      typeBn: 'এন্টারপ্রাইজ RDBMS',
      descEn: 'Industry standard high-performance database for global banks and financial institutes.',
      descBn: 'বিশ্বের বড় বড় ব্যাংক, এয়ারলাইনস এবং বহুজাতিক প্রতিষ্ঠানে ব্যবহৃত হাই-পারফরম্যান্স ডেটাবেস।',
    },
    {
      name: 'MongoDB',
      typeEn: 'Document Store (NoSQL)',
      typeBn: 'ডকুমেন্ট স্টোর (NoSQL)',
      descEn: 'Leading NoSQL database storing flexible JSON/BSON documents instead of strict rows.',
      descBn: 'জনপ্রিয় NoSQL ডেটাবেস—নির্দিষ্ট টেবিল কলামের বদলে ফ্লেক্সিবল JSON/BSON ডকুমেন্টে ডেটা রাখে।',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Server className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            Part 4 of 8
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            {language === 'en' && 'What is a DBMS?'}
            {language === 'bn' && 'ডিবিএমএস কী? (What is a DBMS?)'}
            {language === 'dual' && 'What is a DBMS? (ডিবিএমএস কী?)'}
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans space-y-1.5">
          {(language === 'en' || language === 'dual') && (
            <p>
              Now comes the critical distinction.
              <br />
              <strong>DBMS</strong> stands for <strong>Database Management System</strong>.
              <br />
              A database by itself is just a collection of organized data files sitting on disk. You need a dedicated, powerful software engine to create, manage, query, modify, and protect that data. That software engine is the <strong>DBMS</strong>!
            </p>
          )}
          {(language === 'bn' || language === 'dual') && (
            <p className={language === 'dual' ? 'text-xs text-indigo-300/90 border-l-2 border-indigo-500/40 pl-3 py-0.5' : ''}>
              এবার আসা যাক সবচেয়ে গুরুত্বপূর্ণ পার্থক্যে।
              <br />
              <strong>DBMS</strong>-এর পূর্ণ রূপ হলো <strong>Database Management System</strong>।
              <br />
              ডেটাবেস হলো কেবল স্টোরেজে সংরক্ষিত ফাইলের স্তূপ। সেই ডেটাকে তৈরি করা, এক্সেস করা, কুয়েরি চালানো, এডিট করা ও নিরাপত্তা দেওয়ার জন্য একটি শক্তিশালী ডেডিকেটেড সফটওয়্যার প্রয়োজন—আর সেই সফটওয়্যারকেই <strong>DBMS</strong> বলে!
            </p>
          )}
        </div>

        {/* Library Analogy Visual */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12172d] to-[#0c0e1a] border border-indigo-900/40 space-y-4">
          <h3 className="text-xs font-mono font-bold text-indigo-300 uppercase flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            {language === 'bn' ? 'চিরায়ত লাইব্রেরি অ্যানালজি (বাস্তব উদাহরণ):' : 'The Classic Library Analogy:'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-[#0e1122] border border-amber-900/40 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                {language === 'bn' ? '১. আলমারির বইসমূহ' : '1. The Books'}
              </span>
              <h4 className="text-sm font-bold text-white">Database</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {language === 'bn'
                  ? 'লাইব্রেরির তাকে সাজিয়ে রাখা সব বই ও জার্নালের ফিজিক্যাল সংগ্রহ।'
                  : 'The actual physical books and journals stored neatly across the library shelves.'}
              </p>
              {language === 'dual' && (
                <p className="text-[11px] text-zinc-500 font-sans">
                  লাইব্রেরির তাকে সাজিয়ে রাখা সব বই ও জার্নালের সংগ্রহ।
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#0e1122] border border-emerald-900/40 space-y-1.5 ring-1 ring-emerald-500/30">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                {language === 'bn' ? '২. লাইব্রেরিয়ান ও ক্যাটালগ সিস্টেম' : '2. The Librarian & Software'}
              </span>
              <h4 className="text-sm font-bold text-white">DBMS</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {language === 'bn'
                  ? 'লাইব্রেরিয়ান যিনি বই ইস্যু করেন, ২ সেকেন্ডে বই খুঁজে দেন এবং নিরাপত্তা নিশ্চিত করেন।'
                  : 'The person and system who registers books, finds any book in 2 seconds, and stops theft.'}
              </p>
              {language === 'dual' && (
                <p className="text-[11px] text-emerald-300/80 font-sans">
                  লাইব্রেরিয়ান ও সফটওয়্যার যিনি বই দ্রুত খুঁজে দেন এবং নিরাপত্তা বজায় রাখেন।
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#0e1122] border border-cyan-900/40 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                {language === 'bn' ? '৩. পাঠক ও ছাত্রছাত্রী' : '3. The Readers'}
              </span>
              <h4 className="text-sm font-bold text-white">Users &amp; Applications</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {language === 'bn'
                  ? 'শিক্ষার্থী ও পাঠকরা যারা বই পড়তে বা তথ্য নিতে অনুরোধ পাঠায়।'
                  : 'Students and teachers requesting books, borrowing them, or searching catalogs.'}
              </p>
              {language === 'dual' && (
                <p className="text-[11px] text-zinc-500 font-sans">
                  শিক্ষার্থী বা ক্লায়েন্ট অ্যাপ যারা ডেটা চেয়ে রিকোয়েস্ট পাঠায়।
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Popular DBMS Systems Grid */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
            {language === 'bn' ? 'সফটওয়্যার শিল্পে বহুল ব্যবহৃত DBMS ইঞ্জিনসমূহ:' : 'Popular DBMS Software in the Industry:'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dbmsList.map((d, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#121526] border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-white font-mono">{d.name}</span>
                <span className="text-[10px] font-mono text-indigo-400 block">
                  {language === 'bn' ? d.typeBn : d.typeEn}
                </span>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {language === 'bn' ? d.descBn : d.descEn}
                </p>
                {language === 'dual' && (
                  <p className="text-[10px] text-indigo-300/80 leading-snug pt-0.5">
                    {d.descBn}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
