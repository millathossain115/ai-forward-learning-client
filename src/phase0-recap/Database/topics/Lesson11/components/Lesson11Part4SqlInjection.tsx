'use client';

import React, { useState } from 'react';
import { ShieldAlert, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson11Part4SqlInjection() {
  const { language } = useLanguage();
  const [sqliMode, setSqliMode] = useState<'vulnerable' | 'safe'>('vulnerable');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • SQL Injection ও প্রতিরোধ' : 'Part 3 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Database Threats & SQL Injection Defense Playground"
              bn="৩. ডেটাবেস থ্রেট ও SQL Injection প্রতিরোধ প্লেগ্রাউন্ড"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSqliMode('vulnerable')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
            sqliMode === 'vulnerable' ? 'bg-rose-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
          }`}
        >
          ✗ Vulnerable String Concatenation
        </button>
        <button
          onClick={() => setSqliMode('safe')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
            sqliMode === 'safe' ? 'bg-emerald-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
          }`}
        >
          ✓ Safe Parameterized Query
        </button>
      </div>

      {sqliMode === 'vulnerable' ? (
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-3 text-xs">
          <div className="font-mono text-rose-300 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Attacker Input: &apos; OR &apos;1&apos;=&apos;1
          </div>
          <pre className="p-3 bg-black/60 rounded font-mono text-rose-300 overflow-x-auto">
{`-- Built with unsafe string concatenation:
SELECT * FROM Users 
WHERE email = '' OR '1'='1' AND password = '...';
-- '1'='1' is ALWAYS TRUE -> Attacker logs in as Admin without password!`}
          </pre>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3 text-xs">
          <div className="font-mono text-emerald-300 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4" /> Parameterized Query (Prepared Statement)
          </div>
          <pre className="p-3 bg-black/60 rounded font-mono text-emerald-300 overflow-x-auto">
{`-- SQL structure compiled BEFORE binding user input:
SELECT * FROM Users WHERE email = ? AND password_hash = ?;
-- Input "' OR '1'='1" is treated strictly as a literal string, NEVER executable SQL!`}
          </pre>
        </div>
      )}
    </section>
  );
}
