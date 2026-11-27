'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function TclTab() {
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
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs">TCL</span>
                    <DualText en="Transaction Control Language: ACID & Rollback" bn="ট্রানজ্যাকশন কন্ট্রোল ল্যাঙ্গুয়েজ: ACID ও রোলব্যাক নিয়ন্ত্রণ" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Manages transactional integrity, guaranteeing that modifications are either fully committed or safely rolled back."
                    bn="ট্রানজ্যাকশনের স্থায়িত্ব রক্ষা করে, যাতে কোনো ত্রুটি হলে পূর্বের অবস্থায় ফিরে যাওয়া যায়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'ACID গ্যারান্টি' : 'ACID Guarantee'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* COMMIT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">COMMIT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Save to Disk</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Permanently writes transaction changes to disk."
                      bn="ট্রানজ্যাকশনের সমস্ত পরিবর্তন স্থায়ীভাবে ডিস্কে সেভ করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`INSERT INTO Student_info 
VALUES (102, 'Karim', 'BBA', 3.45);
COMMIT; -- Saved permanently`}
                    </pre>
                    <button
                      onClick={() => handleCopy("INSERT INTO Student_info VALUES (102, 'Karim', 'BBA', 3.45);\nCOMMIT;", "tcl-commit")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-commit" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* ROLLBACK */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">ROLLBACK</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Undo Changes</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Reverts uncommitted modifications if an error occurs."
                      bn="ভুল কোনো অপারেশন হলে পরিবর্তন বাতিল করে আগের অবস্থায় নেয়।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`DELETE FROM Student_info 
WHERE Branch = 'BBA';
ROLLBACK; -- Rows restored!`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DELETE FROM Student_info WHERE Branch = 'BBA';\nROLLBACK;", "tcl-rollback")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-rollback" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* SAVEPOINT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">SAVEPOINT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Partial Checkpoint</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Sets a checkpoint for safe partial rollbacks."
                      bn="ট্রানজ্যাকশনের মাঝে আংশিক রোলব্যাকের চেকপয়েন্ট তৈরি করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`SAVEPOINT sp_grade_entry;
-- Partial rollback to checkpoint
ROLLBACK TO sp_grade_entry;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("SAVEPOINT sp_grade_entry;\nROLLBACK TO sp_grade_entry;", "tcl-savepoint")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-savepoint" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
}
