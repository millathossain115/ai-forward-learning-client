'use client';

import React, { useState } from 'react';
import { Check, Copy, KeyRound, ShieldAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

const GRANT_SQL = `-- 1. Create role & grant least-privilege access
CREATE ROLE teacher_role;
GRANT SELECT, UPDATE ON EXAM_MARKS TO teacher_role;

-- 2. Assign role to user
GRANT teacher_role TO 'dr_hasan'@'localhost';

-- 3. Grant with delegation right, then cascade revoke
GRANT SELECT ON Students TO ali WITH GRANT OPTION;
REVOKE SELECT ON Students FROM ali CASCADE;`;

export default function Lesson14Part3GrantPolp() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(GRANT_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • GRANT, REVOKE ও Least Privilege' : 'Part 3 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="SQL Authorization (GRANT/REVOKE) & Least Privilege (PoLP)"
              bn="৩. SQL অথোরাইজেশন (GRANT/REVOKE) ও Least Privilege"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300">RBAC SQL Commands</span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
            {GRANT_SQL}
          </pre>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
          <span className="font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" /> Principle of Least Privilege (PoLP)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans leading-relaxed"
            en="Every service and user receives strictly the minimum privileges needed for its job—never run web apps as root/superuser."
            bn="প্রতিটি ইউজার বা সার্ভিসকে কেবল কাজের জন্য ন্যূনতম অনুমতি দিন—ওয়েব অ্যাপ কখনো root অ্যাকাউন্ট দিয়ে চালাবেন না।"
          />
          <ul className="space-y-1 list-disc pl-4 text-zinc-300 font-sans text-[11px]">
            <li>Reporting service → <code className="text-cyan-300 font-mono">SELECT</code> on read-only views only.</li>
            <li>Payment worker → <code className="text-cyan-300 font-mono">INSERT, UPDATE</code> on <code className="text-cyan-300 font-mono">PAYMENTS</code> only.</li>
            <li>Zero <code className="text-rose-400 font-mono">DROP / ALTER</code> rights for runtime app accounts.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
