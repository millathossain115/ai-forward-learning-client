'use client';

import React, { useState } from 'react';
import { ShieldAlert, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson14Part4SqlInjection() {
  const { language } = useLanguage();
  const [sqliPayload, setSqliPayload] = useState<'normal' | 'attack'>('attack');
  const [defenseEnabled, setDefenseEnabled] = useState<boolean>(false);

  const inputVal = sqliPayload === 'normal' ? '101' : "101 OR 1=1";

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • SQL Injection ও Prepared Statement' : 'Part 4 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="SQL Injection (SQLi) & Prepared Statements Lab"
              bn="৪. SQL Injection (SQLi) ও Prepared Statements ল্যাব"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSqliPayload('normal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              sqliPayload === 'normal' ? 'bg-cyan-600 text-white' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            Normal Input: 101
          </button>
          <button
            onClick={() => setSqliPayload('attack')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer ${
              sqliPayload === 'attack' ? 'bg-rose-600 text-white' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            Attack Payload: 101 OR 1=1
          </button>
        </div>

        <button
          onClick={() => setDefenseEnabled(!defenseEnabled)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer border ${
            defenseEnabled
              ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
              : 'bg-rose-600/20 text-rose-300 border-rose-500/40'
          }`}
        >
          {defenseEnabled ? '✓ Prepared Statement: ON' : '✗ Prepared Statement: OFF (Vulnerable)'}
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Executed Query:</span>
        </div>
        <pre className={`p-3 bg-black/60 rounded overflow-x-auto ${defenseEnabled ? 'text-emerald-400' : sqliPayload === 'attack' ? 'text-rose-400' : 'text-cyan-300'}`}>
          {defenseEnabled
            ? `SELECT Name, GPA FROM Students WHERE Student_ID = ?;\n-- Bound param [0] = "${inputVal}" (treated strictly as literal data)`
            : `SELECT Name, GPA FROM Students WHERE Student_ID = ${inputVal};`}
        </pre>
        <div className={`p-3 rounded-lg border ${
          defenseEnabled || sqliPayload === 'normal'
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
        }`}>
          {defenseEnabled
            ? 'Result: SQL Injection neutralized! Query searches literally for Student_ID = "101 OR 1=1" and returns 0/safe rows.'
            : sqliPayload === 'attack'
            ? 'BREACH! 1=1 evaluates TRUE for every row — ALL student records leaked!'
            : 'Result: Returns only Student 101 (Rahim).'}
        </div>
      </div>
    </section>
  );
}
