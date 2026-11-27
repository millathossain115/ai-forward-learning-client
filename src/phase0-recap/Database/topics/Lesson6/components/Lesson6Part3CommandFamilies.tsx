'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';
import DdlTab from './command-families/DdlTab';
import DqlTab from './command-families/DqlTab';
import DmlTab from './command-families/DmlTab';
import DclTab from './command-families/DclTab';
import TclTab from './command-families/TclTab';

export default function Lesson6Part3CommandFamilies() {
  const { language } = useLanguage();
  const [activeCommandTab, setActiveCommandTab] = useState<'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL'>('DDL');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৩ • ৫টি কমান্ড ফ্যামিলি' : 'Part 3 of 13'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="The 5 Command Families in SQL (DDL, DQL, DML, DCL, TCL)"
                bn="৩. এসকিউএলের ৫টি প্রধান কমান্ড ফ্যামিলি (DDL, DQL, DML, DCL, TCL)"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="SQL statements are categorized into 5 functional families: defining table structure (DDL), querying records (DQL), modifying data (DML), managing security permissions (DCL), and controlling transactions (TCL). Explore the unified Student_info examples below with minimal vertical overhead."
          bn="কাজের ধরনের ওপর ভিত্তি করে SQL কমান্ডগুলোকে ৫টি প্রধান শ্রেণীতে ভাগ করা হয়: টেবিল কাঠামো তৈরি (DDL), ডেটা খোঁজা (DQL), ডেটা পরিবর্তন (DML), পারমিশন নিয়ন্ত্রণ (DCL) এবং ট্রানজ্যাকশন সেভ/রোলব্যাক (TCL)। নিচে Student_info টেবিলের বাস্তব উদাহরণের মাধ্যমে প্রতিটি কমান্ডের কার্যপদ্ধতি দেখুন।"
        />

        {/* Compact Quick Reference Summary Matrix (GeeksforGeeks Inspired) */}
        <div className="overflow-x-auto rounded-lg border border-slate-800/90 bg-[#0a0d1e]">
          <table className="w-full text-left text-[11px] font-sans">
            <thead>
              <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-300 font-mono text-[10px]">
                <th className="py-1.5 px-2.5 font-bold text-purple-300">Category</th>
                <th className="py-1.5 px-2.5 font-bold text-slate-300">Full Form</th>
                <th className="py-1.5 px-2.5 font-bold text-slate-300">Primary Purpose</th>
                <th className="py-1.5 px-2.5 font-bold text-cyan-300">Key Commands</th>
                <th className="py-1.5 px-2.5 font-bold text-amber-300">Transaction Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-zinc-300 text-[10.5px]">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-purple-400">DDL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Definition Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Defines & modifies database structure / schema" bn="ডেটাবেসের টেবিল ও স্কিমার কাঠামো তৈরি/পরিবর্তন করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">CREATE, ALTER, DROP, TRUNCATE, RENAME</td>
                <td className="py-1.5 px-2.5 font-mono text-amber-400">Auto-Committed (No Rollback)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">DQL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Query Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Retrieves records matching filter criteria" bn="নির্দিষ্ট শর্তে ডেটা খুঁজে বের করে প্রদর্শন করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">SELECT</td>
                <td className="py-1.5 px-2.5 font-mono text-emerald-400">Read-Only (Data Safe)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400">DML</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Manipulation Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Inserts, updates, or deletes stored rows" bn="টেবিলের ভেতরের ডেটা যোগ, পরিবর্তন বা মুছে ফেলে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">INSERT, UPDATE, DELETE</td>
                <td className="py-1.5 px-2.5 font-mono text-emerald-400">Transaction-Safe (Rollback OK)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-rose-400">DCL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Control Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Controls user privileges & security access" bn="ইউজারের পারমিশন ও নিরাপত্তা অধিকার নিয়ন্ত্রণ করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">GRANT, REVOKE</td>
                <td className="py-1.5 px-2.5 font-mono text-zinc-400">Admin Privileges</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-400">TCL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Transaction Control Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Manages ACID transactions and rollbacks" bn="ট্রানজ্যাকশনের সেভ, রোলব্যাক ও ACID স্থায়িত্ব রক্ষা করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">COMMIT, ROLLBACK, SAVEPOINT</td>
                <td className="py-1.5 px-2.5 font-mono text-indigo-300">Controls DML Transactions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compact Category Tabs (GeeksforGeeks Order) */}
        <div className="flex flex-wrap gap-1.5">
          {(['DDL', 'DQL', 'DML', 'DCL', 'TCL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveCommandTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCommandTab === tab
                  ? 'bg-purple-600 text-white   border border-purple-400/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{tab}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-purple-200">
                {tab === 'DDL' && (language === 'bn' ? 'স্ট্রাকচার' : 'Definition')}
                {tab === 'DQL' && (language === 'bn' ? 'কোয়েরি' : 'Query')}
                {tab === 'DML' && (language === 'bn' ? 'ম্যানিপুলেশন' : 'Manipulation')}
                {tab === 'DCL' && (language === 'bn' ? 'কন্ট্রোল' : 'Control')}
                {tab === 'TCL' && (language === 'bn' ? 'ট্রানজ্যাকশন' : 'Transaction')}
              </span>
            </button>
          ))}
        </div>

        {/* Compact Tab Detail Display */}
        <div className="p-4 md:p-5 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
        {activeCommandTab === 'DDL' && <DdlTab />}
        {activeCommandTab === 'DQL' && <DqlTab />}
        {activeCommandTab === 'DML' && <DmlTab />}
        {activeCommandTab === 'DCL' && <DclTab />}
        {activeCommandTab === 'TCL' && <TclTab />}
      </div>
    </section>
  );
}
