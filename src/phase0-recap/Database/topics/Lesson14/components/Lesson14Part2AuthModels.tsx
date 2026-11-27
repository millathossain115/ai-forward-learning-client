'use client';

import React, { useState } from 'react';
import { Fingerprint, Key, Lock, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson14Part2AuthModels() {
  const { language } = useLanguage();
  const [modelTab, setModelTab] = useState<'DAC' | 'MAC' | 'RBAC'>('RBAC');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Fingerprint className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • AuthN/AuthZ ও অ্যাক্সেস মডেল' : 'Part 2 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Authentication vs. Authorization & Access Control (DAC, MAC, RBAC)"
              bn="২. Authentication বনাম Authorization এবং DAC, MAC ও RBAC"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Authentication (Verify Identity)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Answers 'Who are you?' using hashed passwords (Argon2/bcrypt), MFA tokens, or mTLS certificates."
            bn="পাসওয়ার্ড, MFA বা সার্টিফিকেটের মাধ্যমে ব্যবহারকারীর পরিচয় যাচাই করে।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5" /> Authorization (Enforce Rights)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Answers 'What can you do?' by checking table/row privileges after login succeeds."
            bn="লগইনের পর ব্যবহারকারী কোন টেবিলে কী কাজ করতে পারবে তা নির্ধারণ করে।"
          />
        </div>
      </div>

      {/* DAC vs MAC vs RBAC */}
      <div className="flex flex-wrap gap-2">
        {(['DAC', 'MAC', 'RBAC'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setModelTab(m)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              modelTab === m ? 'bg-indigo-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 text-xs space-y-2">
        {modelTab === 'DAC' && (
          <>
            <span className="text-cyan-400 font-mono font-bold uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Discretionary Access Control (DAC)
            </span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Object owners decide who gets access via GRANT/REVOKE. Flexible, but harder to audit at large enterprise scale."
              bn="টেবিলের মালিক নিজেই ঠিক করে কাকে অনুমতি দেবে (GRANT/REVOKE)। ছোট সিস্টেমে সহজ, বড় প্রতিষ্ঠানে নিয়ন্ত্রণ কঠিন।"
            />
          </>
        )}
        {modelTab === 'MAC' && (
          <>
            <span className="text-amber-400 font-mono font-bold uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Mandatory Access Control (MAC)
            </span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Central security policy assigns clearance labels (Top Secret, Confidential). Users cannot override labels. Used in defense & intelligence."
              bn="কেন্দ্রীয় নিরাপত্তা নীতি ও ক্লিয়ারেন্স লেবেল (Top Secret) অনুযায়ী অ্যাক্সেস নিয়ন্ত্রিত হয়। প্রতিরক্ষা খাতে ব্যবহৃত হয়।"
            />
          </>
        )}
        {modelTab === 'RBAC' && (
          <>
            <span className="text-emerald-400 font-mono font-bold uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Role-Based Access Control (RBAC — Industry Standard)
            </span>
            <DualText
              as="p"
              className="text-zinc-300 font-sans"
              en="Privileges are granted to Roles (e.g., professor_role, bursar_role), and users are assigned roles—making onboarding and offboarding clean."
              bn="ব্যক্তিগত ইউজারের বদলে Role-এ পারমিশন দেওয়া হয় এবং ইউজারকে সেই Role-এ যুক্ত করা হয়।"
            />
          </>
        )}
      </div>
    </section>
  );
}
