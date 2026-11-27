'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function DclTab() {
  const { language } = useLanguage();
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs">DCL</span>
                    <DualText en="Data Control Language: Access & Privileges" bn="ডেটা কন্ট্রোল ল্যাঙ্গুয়েজ: ব্যবহারকারীর অ্যাক্সেস ও পারমিশন" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Manages database security, user roles, authentication privileges, and access permissions."
                    bn="ডেটাবেসের নিরাপত্তা, ইউজারের অধিকার ও অ্যাক্সেস পারমিশন নিয়ন্ত্রণ করে।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'নিরাপত্তা ও অ্যাক্সেস কন্ট্রোল' : 'Security Access Control'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {/* GRANT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">GRANT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Assign Privileges</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Gives specific users read/write permissions on database objects."
                      bn="নির্দিষ্ট ব্যবহারকারীকে টেবিলে ডেটা পড়া বা লেখার অধিকার দেয়।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Grant query & insert access to faculty
GRANT SELECT, INSERT 
ON Student_info 
TO 'faculty_user';`}
                    </pre>
                    <button
                      onClick={() => handleCopy("GRANT SELECT, INSERT ON Student_info TO 'faculty_user';", "dcl-grant")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dcl-grant" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* REVOKE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">REVOKE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Withdraw Privileges</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Takes away previously granted user permissions."
                      bn="পূর্বে দেওয়া ব্যবহারকারীর পারমিশন প্রত্যাহার করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Revoke write access from faculty
REVOKE INSERT 
ON Student_info 
FROM 'faculty_user';`}
                    </pre>
                    <button
                      onClick={() => handleCopy("REVOKE INSERT ON Student_info FROM 'faculty_user';", "dcl-revoke")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dcl-revoke" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
}
