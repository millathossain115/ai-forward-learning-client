'use client';

import React, { useState } from 'react';
import { Check, Copy, Filter, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type ClauseTab = 'select' | 'where' | 'orderby' | 'limit';

const CLAUSE_DATA: Record<
  ClauseTab,
  {
    label: string;
    titleEn: string;
    titleBn: string;
    descEn: string;
    descBn: string;
    sql: string;
    noteEn: string;
    noteBn: string;
  }
> = {
  select: {
    label: 'SELECT & DISTINCT',
    titleEn: 'Column Projection & Deduplication',
    titleBn: 'কলাম নির্বাচন ও ডুপ্লিকেট বাদ দেওয়া',
    descEn:
      'Pick exact columns instead of SELECT * in production to save network I/O. Use DISTINCT to return unique values.',
    descBn:
      'প্রোডাকশনে SELECT * এর বদলে নির্দিষ্ট কলাম সিলেক্ট করুন। ডুপ্লিকেট মান বাদ দিয়ে ইউনিক মান পেতে DISTINCT ব্যবহার করুন।',
    sql: `SELECT Name, GPA FROM Students;
SELECT DISTINCT Department_ID FROM Students;`,
    noteEn: 'Avoid SELECT * on wide tables; it breaks covering indexes and fetches unused data.',
    noteBn: 'বড় টেবিলে SELECT * এড়িয়ে চলুন; এটি অপ্রয়োজনীয় ডেটা লোড করে ও পারফরম্যান্স কমায়।',
  },
  where: {
    label: 'WHERE & Operators',
    titleEn: 'Row-Level Filtering',
    titleBn: 'শর্তসাপেক্ষে সারি (Row) ফিল্টারিং',
    descEn:
      'Filter rows before grouping or sorting using comparison (=, >, <>, !=), logical (AND, OR, NOT), IN, BETWEEN, and LIKE.',
    descBn:
      'গ্রুপিং বা সর্টিংয়ের আগে সারি ফিল্টার করতে তুলনামূলক (=, >, !=), লজিক্যাল (AND, OR), IN, BETWEEN এবং LIKE অপারেটর ব্যবহার করুন।',
    sql: `SELECT Name, GPA FROM Students
WHERE Department_ID = 1 AND GPA >= 3.50;

SELECT Name FROM Students
WHERE Name LIKE 'R%' OR Age BETWEEN 20 AND 22;`,
    noteEn: 'Always check NULL using IS NULL / IS NOT NULL — never "= NULL".',
    noteBn: 'NULL চেক করতে সর্বদা IS NULL / IS NOT NULL ব্যবহার করুন — কখনো "= NULL" নয়।',
  },
  orderby: {
    label: 'ORDER BY',
    titleEn: 'Sorting Result Sets (ASC / DESC)',
    titleBn: 'আউটপুট সাজানো (ASC / DESC)',
    descEn:
      'Sort rows by one or multiple columns. Default is ascending (ASC). Use DESC for highest-first rankings.',
    descBn:
      'এক বা একাধিক কলাম অনুযায়ী ফলাফল সাজান। ডিফল্ট হলো ছোট থেকে বড় (ASC); বড় থেকে ছোট করতে DESC ব্যবহার করুন।',
    sql: `SELECT Name, GPA FROM Students
ORDER BY GPA DESC, Name ASC;`,
    noteEn: 'Sorts by GPA descending first, then breaks ties alphabetically by Name.',
    noteBn: 'প্রথমে GPA অনুযায়ী বড় থেকে ছোট সাজাবে, সমান হলে Name অনুযায়ী বর্ণানুক্রমে সাজাবে।',
  },
  limit: {
    label: 'LIMIT & OFFSET',
    titleEn: 'Pagination & Top-N Queries',
    titleBn: 'পেজিনেশন ও টপ-N ডেটা সংগ্রহ',
    descEn:
      'Restrict how many rows return. Combine with ORDER BY for leaderboards and API pagination.',
    descBn:
      'সর্বোচ্চ কতটি সারি রিটার্ন হবে তা সীমিত করে। ORDER BY এর সাথে মিলিয়ে টপ-N ও পেজিনেশন তৈরি করা হয়।',
    sql: `SELECT Name, GPA FROM Students
ORDER BY GPA DESC
LIMIT 3 OFFSET 0;`,
    noteEn: 'Page 2 with size 3 uses LIMIT 3 OFFSET 3 (or FETCH FIRST 3 ROWS ONLY in ANSI SQL).',
    noteBn: 'পেজ ২-এর জন্য LIMIT 3 OFFSET 3 ব্যবহার করুন (ANSI SQL-এ FETCH FIRST ব্যবহৃত হয়)।',
  },
};

export default function Lesson6SelectBasics() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ClauseTab>('select');
  const [copied, setCopied] = useState(false);

  const current = CLAUSE_DATA[activeTab];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৬ • কোর DQL কুয়েরি' : 'Part 6 of 13 • Core DQL'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="Querying Data: SELECT, WHERE, ORDER BY & LIMIT"
                bn="৬. ডেটা কুয়েরি: SELECT, WHERE, ORDER BY এবং LIMIT"
              />
            </h2>
          </div>
        </div>

        {/* Logical Execution Order Pill */}
        <div className="text-[11px] font-mono bg-[#0a0d1e] px-3 py-1.5 rounded-lg border border-slate-800 text-zinc-400 self-start sm:self-auto">
          <span className="text-sky-400 font-bold">Eval:</span> FROM → WHERE → SELECT → ORDER BY → LIMIT
        </div>
      </div>

      {/* Clause Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-[#0a0d1e] p-1 rounded-xl border border-slate-800">
        {(Object.keys(CLAUSE_DATA) as ClauseTab[]).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
              activeTab === tabKey
                ? 'bg-sky-600 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {CLAUSE_DATA[tabKey].label}
          </button>
        ))}
      </div>

      {/* Active Clause Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-mono font-bold">
              <Filter className="w-3.5 h-3.5" />
              <DualText en={current.titleEn} bn={current.titleBn} />
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 leading-relaxed font-sans"
              en={current.descEn}
              bn={current.descBn}
            />
          </div>
          <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-500/20 text-[11px] text-sky-200 font-sans">
            <strong className="font-mono text-sky-400 mr-1">Tip:</strong>
            <DualText as="span" en={current.noteEn} bn={current.noteBn} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-slate-800 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400">
              SQL Example
            </span>
            <button
              onClick={() => handleCopy(current.sql)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি' : 'Copy')}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-[#080b14] border border-slate-800/80 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
            {current.sql}
          </pre>
        </div>
      </div>
    </section>
  );
}
