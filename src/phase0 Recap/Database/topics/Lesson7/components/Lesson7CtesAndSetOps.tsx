'use client';

import React, { useState } from 'react';
import { Code2, Split, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson7CtesAndSetOps() {
  const { language } = useLanguage();
  const [activeSetOp, setActiveSetOp] = useState<'UNION' | 'UNION_ALL' | 'INTERSECT' | 'EXCEPT'>('UNION');
  const [activeFunctionCat, setActiveFunctionCat] = useState<'string' | 'numeric' | 'date' | 'null'>('string');

  return (
    <>
      {/* PART 8: COMMON TABLE EXPRESSIONS (CTEs) */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৮ • CTE (WITH ক্লজ)' : 'Part 8 • CTEs (WITH Clause)'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="Common Table Expressions (CTEs) — The WITH Clause"
                bn="Common Table Expressions (CTEs) — WITH ক্লজের ব্যবহার"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="A CTE creates a temporary, named result set defined before the main query using the WITH keyword. It makes complex nested queries far easier to read, debug, and maintain."
          bn="CTE মূল কুয়েরির আগে WITH কিওয়ার্ড ব্যবহার করে একটি অস্থায়ী নামযুক্ত রেজাল্ট সেট তৈরি করে। এটি জটিল নেস্টেড কুয়েরিকে পড়া, ডিবাগ ও মেইনটেইন করা অনেক সহজ করে।"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              <DualText as="span" en="Example 1: Average GPA CTE" bn="উদাহরণ ১: গড় GPA CTE" />
            </span>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`WITH AverageGPA AS (
    SELECT AVG(GPA) AS Avg_GPA 
    FROM Students
)
SELECT Name, GPA 
FROM Students, AverageGPA
WHERE GPA > Avg_GPA;`}
            </pre>
            <DualText
              as="p"
              className="text-[11px] text-zinc-400"
              en="The CTE computes Avg_GPA once, and the outer SELECT joins with it cleanly."
              bn="CTE একবার Avg_GPA হিসাব করে এবং বাইরের SELECT পরিচ্ছন্নভাবে সেটির সাথে তুলনা করে।"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">
              <DualText as="span" en="Example 2: Chaining & Filtering CTE" bn="উদাহরণ ২: ফিল্টারিং CTE" />
            </span>
            <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`WITH CSE_Students AS (
    SELECT Student_ID, Name, GPA 
    FROM Students 
    WHERE Department = 'CSE'
)
SELECT Name, GPA 
FROM CSE_Students 
WHERE GPA >= 3.80;`}
            </pre>
            <DualText
              as="p"
              className="text-[11px] text-zinc-400"
              en="Breaks complex multi-stage pipelines into isolated, testable modules."
              bn="জটিল বহু-ধাপের কুয়েরিকে ছোট ও পরীক্ষাযোগ্য অংশে ভাগ করতে সাহায্য করে।"
            />
          </div>
        </div>
      </section>

      {/* PART 9: SQL SET OPERATIONS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Split className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৯ • সেট অপারেশন' : 'Part 9 • Set Operations'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="SQL Set Operations: UNION, UNION ALL, INTERSECT & EXCEPT"
                bn="SQL সেট অপারেশন: UNION, UNION ALL, INTERSECT ও EXCEPT"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Set operations combine the results of two or more independent SELECT statements (with matching column count & compatible types) into one result set:"
          bn="একই কলাম সংখ্যা ও সামঞ্জস্যপূর্ণ ডেটা টাইপযুক্ত দুটি বা ততোধিক SELECT কুয়েরির ফলাফল একত্রিত করতে সেট অপারেশন ব্যবহৃত হয়:"
        />

        <div className="flex flex-wrap gap-2">
          {(['UNION', 'UNION_ALL', 'INTERSECT', 'EXCEPT'] as const).map(op => (
            <button
              key={op}
              onClick={() => setActiveSetOp(op)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                activeSetOp === op
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {op.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400">Query 1: CSE Students</span>
              <div className="text-xs text-zinc-300 font-mono">[101: Rahim, 103: Sumaiya, 105: Tanvir]</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl space-y-1">
              <span className="text-xs font-mono font-bold text-amber-400">Query 2: BBA Students + Rahim</span>
              <div className="text-xs text-zinc-300 font-mono">[102: Karim, 106: Ayesha, 101: Rahim]</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/60 border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                <DualText as="span" en="Output Result Set:" bn="আউটপুট রেজাল্ট:" />
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {activeSetOp === 'UNION' && (language === 'bn' ? 'ডুপ্লিকেট বাদ (শুধু ইউনিক সারি)' : 'Duplicates Removed (Unique Rows Only)')}
                {activeSetOp === 'UNION_ALL' && (language === 'bn' ? 'ডুপ্লিকেটসহ সব (সবচেয়ে দ্রুত)' : 'Duplicates Preserved (Fastest)')}
                {activeSetOp === 'INTERSECT' && (language === 'bn' ? 'উভয় সেটে থাকা কমন সারি' : 'Shared Rows Common to Both Sets')}
                {activeSetOp === 'EXCEPT' && (language === 'bn' ? 'প্রথম সেট থেকে দ্বিতীয় সেট বাদ' : 'Left Query Minus Right Query')}
              </span>
            </div>

            <div className="font-mono text-xs text-zinc-200">
              {activeSetOp === 'UNION' && (
                <div className="space-y-1">
                  <div>101 - Rahim (Appears once)</div>
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <div>102 - Karim</div>
                  <div>106 - Ayesha</div>
                </div>
              )}
              {activeSetOp === 'UNION_ALL' && (
                <div className="space-y-1 text-amber-300">
                  <div>101 - Rahim</div>
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <div>102 - Karim</div>
                  <div>106 - Ayesha</div>
                  <div className="text-rose-400 font-bold">101 - Rahim (Duplicate row retained!)</div>
                </div>
              )}
              {activeSetOp === 'INTERSECT' && (
                <div className="text-emerald-300 font-bold">
                  <div>101 - Rahim (Present in both queries)</div>
                  <DualText
                    as="p"
                    className="text-[10px] text-zinc-400 font-sans font-normal mt-1"
                    en="* Note: INTERSECT is native in PostgreSQL/Oracle; older MySQL simulates via INNER JOIN or EXISTS."
                    bn="* নোট: PostgreSQL/Oracle-এ INTERSECT সরাসরি কাজ করে; পুরনো MySQL-এ INNER JOIN বা EXISTS দিয়ে করতে হয়।"
                  />
                </div>
              )}
              {activeSetOp === 'EXCEPT' && (
                <div className="text-cyan-300">
                  <div>103 - Sumaiya</div>
                  <div>105 - Tanvir</div>
                  <DualText
                    as="p"
                    className="text-[10px] text-zinc-400 font-sans font-normal mt-1"
                    en="* Note: EXCEPT removes Rahim because he exists in Query 2."
                    bn="* নোট: Query 2-তে থাকায় Rahim বাদ পড়েছে।"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PART 10: SQL BUILT-IN FUNCTIONS */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১০ • বিল্ট-ইন ফাংশন' : 'Part 10 • Built-in Functions'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="SQL Functions: String, Numeric, Date & NULL Helpers"
                bn="SQL ফাংশন: String, Numeric, Date ও NULL হেল্পার"
              />
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['string', 'numeric', 'date', 'null'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFunctionCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize cursor-pointer transition-all ${
                activeFunctionCat === cat
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat} Functions
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeFunctionCat === 'string' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">UPPER(str) / LOWER(str)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Case conversion" bn="বড়/ছোট হাতের অক্ষরে রূপান্তর" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">UPPER(&apos;rahim&apos;) =&gt; &apos;RAHIM&apos;</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">CONCAT(s1, s2, ...)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="String concatenation" bn="একাধিক স্ট্রিং জোড়া লাগানো" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">CONCAT(Name, &apos; - &apos;, Dept)</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">SUBSTRING(str, pos, len)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Extract sub-part" bn="স্ট্রিং থেকে নির্দিষ্ট অংশ কাটা" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">SUBSTRING(&apos;Database&apos;, 1, 4) =&gt; &apos;Data&apos;</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'numeric' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">ROUND(val, decimals)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Standard rounding" bn="দশমিক সংখ্যা রাউন্ড করা" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">ROUND(3.567, 2) =&gt; 3.57</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">CEIL(val) / FLOOR(val)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Ceiling and Floor bounds" bn="উপরের বা নিচের পূর্ণসংখ্যা" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">CEIL(3.1) =&gt; 4 | FLOOR(3.9) =&gt; 3</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">MOD(N, M)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Remainder of division" bn="ভাগশেষ নির্ণয়" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">MOD(10, 3) =&gt; 1</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'date' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">CURRENT_DATE()</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Today's system date" bn="আজকের সিস্টেম তারিখ" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">Returns &apos;2026-11-17&apos;</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">YEAR(date) / MONTH(date)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Extract temporal parts" bn="বছর বা মাস আলাদা করা" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">YEAR(&apos;2024-01-15&apos;) =&gt; 2024</code>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold">DATEDIFF(d1, d2)</span>
                <DualText as="p" className="text-[11px] text-zinc-400 font-sans mt-1" en="Days between two dates" bn="দুটি তারিখের দিনের পার্থক্য" />
                <code className="text-[10px] text-emerald-300 block bg-black/40 p-1 rounded mt-1">DATEDIFF(CURRENT_DATE(), Admission_Date)</code>
              </div>
            </div>
          )}

          {activeFunctionCat === 'null' && (
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-cyan-400 font-mono font-bold">COALESCE(val1, val2, ... fallback)</span>
              <DualText
                as="p"
                className="text-zinc-300 font-sans"
                en="Returns the first non-NULL value in the list. Essential for replacing missing values (like Nabila's NULL Email) with safe defaults:"
                bn="তালিকার প্রথম non-NULL মানটি ফেরত দেয়। অনুপস্থিত মানের (যেমন Nabila-র NULL Email) বদলে ডিফল্ট টেক্সট দেখাতে অপরিহার্য:"
              />
              <pre className="p-2.5 bg-black/50 rounded font-mono text-emerald-400">
{`SELECT Name, COALESCE(Email, 'No Email Provided') AS Contact_Status
FROM Students;`}
              </pre>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
