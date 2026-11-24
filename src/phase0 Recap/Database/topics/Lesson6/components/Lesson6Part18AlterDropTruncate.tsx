'use client';

import React from 'react';
import { Table, Trash2, Type } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part18AlterDropTruncate() {
  const { language } = useLanguage();


  return (
    <>
{/* ========================================================
          PART 18: ALTER, DROP, AND TRUNCATE DEEP DIVE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৮ • অল্টার, ড্রপ ও ট্রাঙ্কেট তুলনা' : 'Part 18 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="ALTER, DROP, and TRUNCATE Comparison"
                bn="ALTER, DROP এবং TRUNCATE এর গভীর তাত্ত্বিক তুলনা"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="This is one of the most heavily tested theoretical distinctions in university DBMS exams:"
          bn="বিশ্ববিদ্যালয়ের DBMS পরীক্ষায় সবচেয়ে বেশি আসা গুরুত্বপূর্ণ তাত্ত্বিক পার্থক্যের সারসংক্ষেপ:"
        />

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3"><DualText en="Command" bn="কমান্ড" /></th>
                <th className="py-2.5 px-3"><DualText en="Type" bn="ধরণ" /></th>
                <th className="py-2.5 px-3"><DualText en="WHERE Clause?" bn="WHERE ক্লজ?" /></th>
                <th className="py-2.5 px-3"><DualText en="Rollback Possible?" bn="রোলব্যাক সম্ভব?" /></th>
                <th className="py-2.5 px-3"><DualText en="Table Structure" bn="টেবিলের কাঠামো" /></th>
                <th className="py-2.5 px-3"><DualText en="Auto-Increment ID" bn="অটো-ইনক্রিমেন্ট আইডি" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">DELETE</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DML</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{language === 'bn' ? 'হ্যাঁ (বাছাইকৃত সারি)' : 'Yes (Selective)'}</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{language === 'bn' ? 'হ্যাঁ (ট্রানজ্যাকশনে)' : 'Yes (in transaction)'}</td>
                <td className="py-2.5 px-3 text-zinc-300">{language === 'bn' ? 'অক্ষুণ্ণ থাকে' : 'Preserved'}</td>
                <td className="py-2.5 px-3 text-zinc-400">{language === 'bn' ? 'রিসেট হয় না' : 'Not reset'}</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">TRUNCATE</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DDL</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না (সব সারি একবারে)' : 'No (All rows)'}</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না (বেশিরভাগ DB-তে)' : 'No (in most DBs)'}</td>
                <td className="py-2.5 px-3 text-zinc-300">{language === 'bn' ? 'অক্ষুণ্ণ থাকে (খালি টেবিল)' : 'Preserved (Empty table)'}</td>
                <td className="py-2.5 px-3 text-amber-300 font-bold">{language === 'bn' ? '১-এ রিসেট হয়ে যায়' : 'Reset back to 1'}</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-rose-400">DROP</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DDL</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না' : 'No'}</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না' : 'No'}</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'স্থায়ীভাবে ধ্বংস হয়' : 'Destroyed Permanently'}</td>
                <td className="py-2.5 px-3 text-zinc-500">{language === 'bn' ? 'টেবিলের সাথে মুছে যায়' : 'Deleted with table'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
