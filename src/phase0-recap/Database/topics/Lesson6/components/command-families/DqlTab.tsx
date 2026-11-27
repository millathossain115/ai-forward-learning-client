'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function DqlTab() {
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
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs">DQL</span>
                    <DualText en="Data Query Language: Data Retrieval & Analytics" bn="ডেটা কোয়েরি ল্যাঙ্গুয়েজ: ডেটা অনুসন্ধান ও অ্যানালিটিক্স" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Used exclusively to fetch, filter, and project data records without mutating database state."
                    bn="ডেটাবেসের কোনো তথ্য পরিবর্তন না করে কেবল ডেটা খুঁজে বের ও প্রদর্শন করতে ব্যবহৃত হয়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'রিড-অনলি (ডেটা নিরাপদ)' : 'Read-Only (Data Safe)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">SELECT</span>
                    <span className="text-[11px] text-zinc-400 font-mono">The Universal Query Operator</span>
                  </div>
                  <DualText
                    as="p"
                    className="text-xs text-zinc-300 leading-relaxed"
                    en="Retrieves matching records using projection, filtering (WHERE), sorting (ORDER BY), and limits without altering rows."
                    bn="প্রজেকশন, শর্তযুক্ত ফিল্টার (WHERE) ও সর্টিং (ORDER BY) ব্যবহার করে রেকর্ড প্রদর্শন করে; কোনো ডেটা পরিবর্তন হয় না।"
                  />
                </div>
                <div className="relative group">
                  <pre className="text-[10.5px] text-cyan-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`SELECT Roll_No, Name, Branch, CGPA 
FROM Student_info 
WHERE Branch = 'CSE' AND CGPA >= 3.50
ORDER BY CGPA DESC;`}
                  </pre>
                  <button
                    onClick={() => handleCopy("SELECT Roll_No, Name, Branch, CGPA \nFROM Student_info \nWHERE Branch = 'CSE' AND CGPA >= 3.50\nORDER BY CGPA DESC;", "dql-select")}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy SQL"
                  >
                    {copiedSnippet === "dql-select" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
  );
}
