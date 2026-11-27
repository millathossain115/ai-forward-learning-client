'use client';

import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  XCircle,
  Table as TableIcon,
  Sparkles,
  Layers,
  RotateCcw,
  UserPlus,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function UniqueKeyTab() {
  const { language } = useLanguage();
  // Unique Key Playground State & Live Accounts Table
  const initialUniqueAccounts = [
    { id: 1, username: 'rahim99', phone: '01711-001122', recoveryEmail: 'rahim.alt@gmail.com' },
    { id: 2, username: 'karim_dev', phone: '01811-334455', recoveryEmail: null },
    { id: 3, username: 'nila_bd', phone: null, recoveryEmail: null },
  ];
  const [uniqueAccounts, setUniqueAccounts] = useState(initialUniqueAccounts);
  const [uniqueAlert, setUniqueAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);
  const [uniqueCollidingField, setUniqueCollidingField] = useState<string | null>(null);

  const handleTestUniqueScenario = (scenario: 'dup_username' | 'dup_phone' | 'insert_null' | 'valid_new') => {
    if (scenario === 'dup_username') {
      setUniqueCollidingField('username');
      setUniqueAlert({
        type: 'error',
        msgEn: '❌ UNIQUE Constraint Violation! Username "rahim99" is already taken by User #1. UNIQUE columns reject duplicate non-null entries.',
        msgBn: '❌ UNIQUE কনস্ট্রেইন্ট লঙ্ঘন! "rahim99" ইউজারনেমটি ইতিমধ্যে ১ নম্বর ব্যবহারকারীর দখলে রয়েছে। ইউনিক কলামে ডুপ্লিকেট গ্রহণ করা হয় না।',
      });
    } else if (scenario === 'dup_phone') {
      setUniqueCollidingField('phone');
      setUniqueAlert({
        type: 'error',
        msgEn: '❌ UNIQUE Constraint Violation! Phone "01711-001122" is already linked to an existing account. Duplicate phone registrations are prohibited.',
        msgBn: '❌ UNIQUE কনস্ট্রেইন্ট লঙ্ঘন! ফোন নম্বর "01711-001122" ইতিমধ্যে অন্য একটি অ্যাকাউন্টে নিবন্ধিত রয়েছে। একই ফোন দুবার ব্যবহার করা যাবে না।',
      });
    } else if (scenario === 'insert_null') {
      setUniqueCollidingField(null);
      const newAcc = {
        id: uniqueAccounts.length + 1,
        username: `guest_user_${uniqueAccounts.length + 1}`,
        phone: null,
        recoveryEmail: null,
      };
      setUniqueAccounts((prev) => [...prev, newAcc]);
      setUniqueAlert({
        type: 'success',
        msgEn: '✓ Success: New account inserted with NULL phone and NULL email! In SQL standards, UNIQUE constraints permit multiple NULL values because NULL represents an unknown value (NULL != NULL).',
        msgBn: '✓ সফল: ফোন ও ইমেইল ফাঁকা (NULL) রেখেই নতুন অ্যাকাউন্ট তৈরি হয়েছে! কারণ SQL স্ট্যান্ডার্ডে ইউনিক কলামে একাধিক NULL মান গ্রহণযোগ্য (কারণ একটি অজানা মান আরেকটি অজানা মানের সমান নয়)।',
      });
    } else if (scenario === 'valid_new') {
      setUniqueCollidingField(null);
      const newAcc = {
        id: uniqueAccounts.length + 1,
        username: 'tanvir_pro',
        phone: '01911-778899',
        recoveryEmail: 'tanvir@gmail.com',
      };
      setUniqueAccounts((prev) => [...prev, newAcc]);
      setUniqueAlert({
        type: 'success',
        msgEn: '✓ Success: User "tanvir_pro" passed all UNIQUE checks! Both Username and Phone are distinct.',
        msgBn: '✓ সফল: ব্যবহারকারী "tanvir_pro" সকল ইউনিক শর্ত পূরণ করেছে! ইউজারনেম ও ফোন নম্বর উভয়ই সম্পূর্ণ স্বতন্ত্র।',
      });
    }
  };

  const handleResetUniqueAccounts = () => {
    setUniqueAccounts(initialUniqueAccounts);
    setUniqueAlert(null);
    setUniqueCollidingField(null);
  };

  return (
        <div className="p-6 rounded-2xl bg-[#15171e] border border-cyan-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="7. Unique Key Constraint (ইউনিক কী কনস্ট্রেইন্ট)"
                    bn="৭. ইউনিক কী কনস্ট্রেইন্ট (Unique Key Constraint)"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="Guarantees no duplicate values exist across rows, while permitting multiple NULL values."
                  bn="কলামে ডুপ্লিকেট মান জমা হওয়া নিষিদ্ধ করে, তবে একাধিক NULL মান ধারণ করার অনুমতি দেয়।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Integrity Constraint
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#101116] border border-white/[0.08] text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="The Fundamental Difference Between Primary Key and Unique Key:"
                bn="প্রাইমারি কী এবং ইউনিক কী-এর মৌলিক পার্থক্য:"
              />
            </div>
            <DualText
              en="While a Primary Key is the entity's designated master identifier (strictly 1 per table and NEVER allows NULL), a UNIQUE constraint enforces distinctness on secondary business attributes (like Username, Phone Number, or Tax ID). A table can contain MULTIPLE UNIQUE constraints. Crucially, according to SQL ANSI standards, UNIQUE constraints permit NULL values—because in relational calculus, NULL represents an 'unknown' value, and one unknown cannot be asserted as equal to another unknown (NULL != NULL)!"
              bn="প্রাইমারি কি হলো কোনো টেবিলের প্রধান সত্ত্বা সনাক্তকারী (টেবিলে মাত্র ১টি থাকে এবং এতে কখনোই NULL হতে পারে না)। অপরদিকে, UNIQUE কনস্ট্রেইন্ট অন্যান্য গুরুত্বপূর্ণ বিজনেস তথ্যের (যেমন: ইউজারনেম, ফোন নম্বর বা ট্যাক্স আইডি) অনন্যতা নিশ্চিত করে। একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে। সবচেয়ে বড় পার্থক্য হলো, SQL স্ট্যান্ডার্ড অনুযায়ী UNIQUE কলামে একাধিক NULL মান বসতে পারে—কারণ রিলেশনাল অ্যালজেব্রায় NULL মানে 'অজানা তথ্য', এবং একটি অজানা মান আরেকটি অজানা মানের সমান হতে পারে না (NULL != NULL)!"
            />
          </div>

          {/* Interactive Constraint Violation Playground */}
          <div className="p-4 rounded-xl bg-[#101116] border border-cyan-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <DualText
                  en="Interactive UNIQUE Constraint Violation Tester (Live USER_ACCOUNT):"
                  bn="ইন্টারেক্টিভ UNIQUE কনস্ট্রেইন্ট পরীক্ষক (লাইভ USER_ACCOUNT টেবিল):"
                />
              </span>
              <button
                onClick={handleResetUniqueAccounts}
                className="self-start sm:self-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                {language === 'bn' ? 'টেবিল রিসেট' : 'Reset Accounts'}
              </button>
            </div>

            {/* Test Action Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নিচের বোতামগুলো ক্লিক করে ডুপ্লিকেট সংঘর্ষ এবং NULL মানের আচরণ পরীক্ষা করুন:'
                  : 'Click the buttons below to test collision rejection and NULL tolerance in action:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTestUniqueScenario('dup_username')}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'bn'
                    ? '🔴 ডুপ্লিকেট ইউজারনেম: "rahim99"'
                    : '🔴 Try Duplicate Username: "rahim99"'}
                </button>

                <button
                  onClick={() => handleTestUniqueScenario('dup_phone')}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'bn'
                    ? '🔴 ডুপ্লিকেট ফোন: "01711-001122"'
                    : '🔴 Try Duplicate Phone: "01711-001122"'}
                </button>

                <button
                  onClick={() => handleTestUniqueScenario('insert_null')}
                  className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/20 text-amber-300 hover:bg-amber-900/30 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'bn'
                    ? '🟡 NULL ফোন ও ইমেইল ইনসার্ট (NULL অনুমতি প্রমাণ)'
                    : '🟡 Insert with NULL Phone & Email (Proves NULL Allowed!)'}
                </button>

                <button
                  onClick={() => handleTestUniqueScenario('valid_new')}
                  className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/30 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'bn'
                    ? '🟢 সম্পূর্ণ স্বতন্ত্র নতুন ইউজার: "tanvir_pro"'
                    : '🟢 Insert Distinct User: "tanvir_pro"'}
                </button>
              </div>
            </div>

            {/* Dynamic Alert Banner */}
            {uniqueAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                  uniqueAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-sans'
                    : 'bg-cyan-950/40 border-cyan-500 text-cyan-200 font-sans'
                }`}
              >
                {uniqueAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {uniqueAlert.type === 'error'
                      ? language === 'bn'
                        ? 'UNIQUE কনস্ট্রেইন্ট লঙ্ঘন (ইনসার্ট বাতিল)'
                        : 'UNIQUE Constraint Violation (DBMS Rejection)'
                      : language === 'bn'
                      ? 'শর্ত যাচাই সফল (রেকর্ড যুক্ত হয়েছে)'
                      : 'Constraint Verification Passed (Record Appended)'}
                  </div>
                  <div className="text-[11px] opacity-90 leading-relaxed">
                    {language === 'bn' ? uniqueAlert.msgBn : uniqueAlert.msgEn}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live USER_ACCOUNT Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-zinc-200 font-bold">
                <TableIcon className="w-4 h-4 text-cyan-400" />
                {language === 'bn'
                  ? 'লাইভ USER_ACCOUNT টেবিল (একাধিক UNIQUE কলামসহ):'
                  : 'Live USER_ACCOUNT Table (Demonstrating Multiple UNIQUE Columns):'}
              </span>
              <span className="text-[11px] text-zinc-500">
                {uniqueAccounts.length} {language === 'bn' ? 'টি অ্যাকাউন্ট' : 'Accounts'}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#15171e] text-zinc-300 border-b border-white/[0.08] text-[11px]">
                    <th className="py-2.5 px-3 text-amber-400 font-bold w-16">
                      User_ID <span className="text-[9px] text-amber-500 block font-normal">[PK]</span>
                    </th>

                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        uniqueCollidingField === 'username'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      Username{' '}
                      <span className="text-[9px] text-cyan-400/80 block font-normal">
                        [UNIQUE NOT NULL]
                      </span>
                    </th>

                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        uniqueCollidingField === 'phone'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      Phone Number{' '}
                      <span className="text-[9px] text-cyan-400/80 block font-normal">
                        [UNIQUE (NULL Allowed)]
                      </span>
                    </th>

                    <th className="py-2.5 px-3 text-cyan-300">
                      Recovery Email{' '}
                      <span className="text-[9px] text-cyan-400/80 block font-normal">
                        [UNIQUE (NULL Allowed)]
                      </span>
                    </th>

                    <th className="py-2.5 px-3 text-right bg-[#15171e] text-zinc-300 border-l border-white/[0.08]">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.08] text-zinc-300 text-[11px]">
                  {uniqueAccounts.map((acc, idx) => (
                    <tr
                      key={acc.id}
                      className={idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#101116]'}
                    >
                      <td className="py-2 px-3 font-bold text-amber-300">{acc.id}</td>

                      <td
                        className={`py-2 px-3 font-bold ${
                          uniqueCollidingField === 'username' && acc.username === 'rahim99'
                            ? 'bg-rose-950/30 text-rose-300 ring-1 ring-rose-500/50'
                            : 'text-zinc-200'
                        }`}
                      >
                        {acc.username}
                      </td>

                      <td
                        className={`py-2 px-3 ${
                          uniqueCollidingField === 'phone' && acc.phone === '01711-001122'
                            ? 'bg-rose-950/30 text-rose-300 ring-1 ring-rose-500/50'
                            : acc.phone === null
                            ? 'text-zinc-500 italic'
                            : 'text-zinc-300'
                        }`}
                      >
                        {acc.phone || (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px]">
                            NULL (No Phone)
                          </span>
                        )}
                      </td>

                      <td
                        className={`py-2 px-3 ${
                          acc.recoveryEmail === null ? 'text-zinc-500 italic' : 'text-zinc-300'
                        }`}
                      >
                        {acc.recoveryEmail || (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px]">
                            NULL (No Email)
                          </span>
                        )}
                      </td>

                      <td className="py-2 px-3 text-right border-l border-white/[0.08] font-mono text-[10px] text-emerald-400">
                        ✓ Enforced
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Primary Key vs Unique Key Comparison Matrix */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5 font-sans">
              <Layers className="w-4 h-4 text-cyan-400" />
              <DualText
                en="Master Comparison Matrix: Primary Key vs Unique Key"
                bn="মাস্টার তুলনা ম্যাট্রিক্স: প্রাইমারি কী বনাম ইউনিক কী"
              />
            </span>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116] text-xs font-mono">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="bg-[#15171e] border-b border-white/[0.08] text-zinc-300">
                    <th className="py-2.5 px-3 text-zinc-400 w-1/4">Feature / মানদণ্ড</th>
                    <th className="py-2.5 px-3 text-amber-400 font-bold w-3/8">
                      Primary Key (প্রধান কী)
                    </th>
                    <th className="py-2.5 px-3 text-cyan-400 font-bold w-3/8">
                      Unique Key (ইউনিক কনস্ট্রেইন্ট)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">Purpose</td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'পুরো টেবিলের সারির মূল পরিচয় হিসেবে কাজ করে।'
                        : 'Uniquely identifies each entity/row in the relation.'}
                    </td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'নির্দিষ্ট কলামে মান ডুপ্লিকেট হওয়া রোধ করে।'
                        : 'Prevents duplicate values in specific candidate columns.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">NULL Values</td>
                    <td className="py-2 px-3 text-rose-300 font-bold">
                      {language === 'bn'
                        ? 'কখনোই NULL গ্রহণযোগ্য নয় (NOT NULL বাধ্যতামূলক)।'
                        : 'Strictly prohibited. CANNOT accept NULL.'}
                    </td>
                    <td className="py-2 px-3 text-emerald-300 font-bold">
                      {language === 'bn'
                        ? 'NULL গ্রহণযোগ্য (একাধিক সারিতে NULL থাকতে পারে)।'
                        : 'Permitted. Multiple NULL rows allowed in SQL.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">Quantity</td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'একটি টেবিলে শুধুমাত্র ১টি প্রাইমারি কী হতে পারে।'
                        : 'Strictly ONE Primary Key per table.'}
                    </td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'একটি টেবিলে একাধিক (যত খুশি) ইউনিক কী থাকতে পারে।'
                        : 'MULTIPLE Unique constraints allowed per table.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">Underlying Index</td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'স্বয়ংক্রিয়ভাবে Clustered Index তৈরি করে।'
                        : 'Automatically creates a Clustered Index (default).'}
                    </td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'স্বয়ংক্রিয়ভাবে Non-Clustered Unique Index তৈরি করে।'
                        : 'Automatically creates a Non-Clustered Unique Index.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Generated SQL DDL Schema */}
          <div className="p-4 rounded-xl bg-[#101116] border border-white/[0.08] font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-white/[0.08] pb-2">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {language === 'bn'
                  ? 'লাইভ SQL টেবিল স্কিমা (Unique Key Constraints):'
                  : 'Live Generated SQL Schema (Unique Key Constraints):'}
              </span>
              <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-cyan-300 font-bold">USER_ACCOUNT</span> (<br />
              {'  '}User_ID        <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
              {'  '}Username       <span className="text-cyan-400">VARCHAR(30)</span> <span className="text-rose-400 font-bold">NOT NULL</span> <span className="text-cyan-400 font-bold">UNIQUE</span>,<br />
              {'  '}Phone          <span className="text-cyan-400">VARCHAR(20)</span> <span className="text-cyan-400 font-bold">UNIQUE</span>,          <span className="text-zinc-500">-- NULL allowed</span><br />
              {'  '}Recovery_Email <span className="text-cyan-400">VARCHAR(100)</span> <span className="text-cyan-400 font-bold">UNIQUE</span>          <span className="text-zinc-500">-- NULL allowed</span><br />
              );
            </pre>
          </div>
        </div>
  );
}
