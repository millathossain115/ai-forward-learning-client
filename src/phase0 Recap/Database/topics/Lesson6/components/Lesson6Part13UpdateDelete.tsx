'use client';

import React, { useState } from 'react';
import { AlertTriangle, Check, Copy, ShieldCheck, CheckCircle2, XCircle, Search, RefreshCw, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson6Part13UpdateDelete() {
  const { language } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const safeUpdateSql = `UPDATE Students \nSET Email = 'rahim_new@gmail.com' \nWHERE Student_ID = 101;`;
  const safeDeleteSql = `DELETE FROM Students \nWHERE Student_ID = 105;`;

  return (
    <>
      {/* ========================================================
          PART 13 & 14: UPDATE & DELETE WITH CRITICAL WARNINGS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                {language === 'bn' ? 'পার্ট ১৩ ও ১৪ • আপডেট ও ডিলিট সতর্কতা' : 'Part 13 & 14 of 20 • DML Safety'}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
                <DualText
                  as="span"
                  en="UPDATE and DELETE: Syntax & Production Safety"
                  bn="UPDATE এবং DELETE: সিনট্যাক্স ও প্রোডাকশন সেফটি"
                />
              </h2>
            </div>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-mono text-zinc-400 items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Never run without WHERE
          </span>
        </div>

        {/* 2-Column Comparison Grid: UPDATE vs DELETE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* UPDATE Box */}
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  UPDATE
                </span>
                <DualText
                  as="span"
                  className="text-xs text-zinc-400"
                  en="Modifies existing values"
                  bn="বিদ্যমান মান পরিবর্তন করে"
                />
              </div>
              <button
                onClick={() => handleCopy(safeUpdateSql, 'update')}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition"
                title="Copy Safe SQL"
              >
                {copiedId === 'update' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Safe Code */}
            <div className="rounded-lg bg-black/60 border border-emerald-500/30 p-2.5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <DualText as="span" en="Safe (Targeted with WHERE)" bn="নিরাপদ (WHERE সহ নির্দিষ্ট)" />
                </span>
                <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  Query OK, 1 row affected
                </span>
              </div>
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{safeUpdateSql}
              </pre>
            </div>

            {/* Danger Code */}
            <div className="rounded-lg bg-rose-950/20 border border-rose-500/30 p-2.5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-semibold text-rose-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <DualText as="span" en="Disaster (WHERE Omitted)" bn="বিপর্যয় (WHERE ক্লজ ছাড়া)" />
                </span>
                <span className="text-[10px] font-mono text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded">
                  ⚠️ Overwrites EVERY row!
                </span>
              </div>
              <pre className="text-xs font-mono text-rose-300/90 overflow-x-auto leading-relaxed line-through decoration-rose-500/60">
{`UPDATE Students SET Email = 'rahim_new@gmail.com';`}
              </pre>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400"
                en="Without WHERE, every student in the database will get this same email."
                bn="WHERE না দিলে পুরো ডেটাবেসের প্রতি একক শিক্ষার্থীর ইমেইল একই হয়ে যাবে।"
              />
            </div>
          </div>

          {/* DELETE Box */}
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/30">
                  DELETE
                </span>
                <DualText
                  as="span"
                  className="text-xs text-zinc-400"
                  en="Removes matching rows"
                  bn="নির্দিষ্ট সারি মুছে ফেলে"
                />
              </div>
              <button
                onClick={() => handleCopy(safeDeleteSql, 'delete')}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white transition"
                title="Copy Safe SQL"
              >
                {copiedId === 'delete' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Safe Code */}
            <div className="rounded-lg bg-black/60 border border-emerald-500/30 p-2.5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <DualText as="span" en="Safe (Targeted with WHERE)" bn="নিরাপদ (WHERE সহ নির্দিষ্ট)" />
                </span>
                <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  Query OK, 1 row deleted
                </span>
              </div>
              <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{safeDeleteSql}
              </pre>
            </div>

            {/* Danger Code */}
            <div className="rounded-lg bg-rose-950/20 border border-rose-500/30 p-2.5 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-semibold text-rose-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <DualText as="span" en="Disaster (WHERE Omitted)" bn="বিপর্যয় (WHERE ক্লজ ছাড়া)" />
                </span>
                <span className="text-[10px] font-mono text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded">
                  💥 Wipes entire table!
                </span>
              </div>
              <pre className="text-xs font-mono text-rose-300/90 overflow-x-auto leading-relaxed line-through decoration-rose-500/60">
{`DELETE FROM Students;`}
              </pre>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400"
                en="All rows are permanently erased. (Table schema and columns remain)."
                bn="টেবিলের সমস্ত সারি স্থায়ীভাবে মুছে যাবে। (টেবিলের গঠন অক্ষুণ্ণ থাকবে)।"
              />
            </div>
          </div>
        </div>

        {/* 3 Golden Rules for Production Engineers */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <DualText
              as="span"
              en="3 Production Safety Habits Every Developer Must Follow"
              bn="প্রোডাকশন ডেটাবেসে কাজ করার ৩টি সুবর্ণ সেফটি নিয়ম"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Rule 1 */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-200">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. SELECT First</span>
              </div>
              <code className="block text-[10px] font-mono text-cyan-300/90 bg-slate-950 px-1.5 py-0.5 rounded truncate">
                SELECT * FROM Students WHERE id=101;
              </code>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 leading-tight"
                en="Verify the exact matching rows before applying UPDATE or DELETE."
                bn="পরিবর্তন বা মুছে ফেলার আগে নিশ্চিত হতে একই WHERE দিয়ে SELECT চালিয়ে দেখুন।"
              />
            </div>

            {/* Rule 2 */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-200">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>2. Transaction Safety</span>
              </div>
              <code className="block text-[10px] font-mono text-amber-300/90 bg-slate-950 px-1.5 py-0.5 rounded truncate">
                START TRANSACTION; ... ROLLBACK;
              </code>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 leading-tight"
                en="Run DML inside a transaction. Verify rows affected, then COMMIT or ROLLBACK."
                bn="ট্রানজ্যাকশনের মধ্যে রান করুন। ঠিক থাকলে COMMIT করুন, নয়তো ROLLBACK করুন।"
              />
            </div>

            {/* Rule 3 */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-200">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>3. Safe Updates Mode</span>
              </div>
              <code className="block text-[10px] font-mono text-emerald-300/90 bg-slate-950 px-1.5 py-0.5 rounded truncate">
                SET SQL_SAFE_UPDATES = 1;
              </code>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 leading-tight"
                en="Blocks any UPDATE or DELETE query that lacks a WHERE clause using a key."
                bn="কী কলাম ছাড়া অনির্দিষ্ট বা unbounded UPDATE ও DELETE এক্সিকিউট হওয়া ব্লক করে দেয়।"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
