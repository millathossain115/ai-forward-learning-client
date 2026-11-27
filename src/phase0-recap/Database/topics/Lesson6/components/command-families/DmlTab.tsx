'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function DmlTab() {
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
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs">DML</span>
                    <DualText en="Data Manipulation Language: Record Operations" bn="ডেটা ম্যানিপুলেশন ল্যাঙ্গুয়েজ: রেকর্ড ইনসার্ট, আপডেট ও ডিলিট" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Commands that operate directly on the tuples/rows stored inside existing tables."
                    bn="টেবিলের ভেতরে থাকা ডেটা বা রেকর্ডের ওপর সরাসরি কাজ করে (যোগ, সংশোধন ও মোছা)।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'ট্রানজ্যাকশন-সেফ (রোলব্যাক সম্ভব)' : 'Transaction-Safe (Can Rollback)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* INSERT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">INSERT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Row Insertion</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Adds new student records into the table."
                      bn="টেবিলে এক বা একাধিক নতুন রো বা রেকর্ড যুক্ত করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`INSERT INTO Student_info 
(Roll_No, Name, Branch, CGPA) 
VALUES (101, 'Rahim', 'CSE', 3.85);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("INSERT INTO Student_info (Roll_No, Name, Branch, CGPA) VALUES (101, 'Rahim', 'CSE', 3.85);", "dml-insert")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-insert" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* UPDATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">UPDATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Value Modification</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Modifies column values matching WHERE condition."
                      bn="WHERE শর্ত অনুযায়ী নির্দিষ্ট শিক্ষার্থীর ডেটা আপডেট করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`UPDATE Student_info 
SET CGPA = 3.92 
WHERE Roll_No = 101;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("UPDATE Student_info SET CGPA = 3.92 WHERE Roll_No = 101;", "dml-update")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-update" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* DELETE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">DELETE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Row Removal</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Removes specific rows matching condition (can rollback)."
                      bn="শর্ত অনুযায়ী নির্দিষ্ট রো মুছে ফেলে (রোলব্যাক সম্ভব)।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`DELETE FROM Student_info 
WHERE Roll_No = 101;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DELETE FROM Student_info WHERE Roll_No = 101;", "dml-delete")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-delete" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
  );
}
