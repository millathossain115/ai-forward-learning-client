'use client';

import React, { useState } from 'react';
import {
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function SubqueryTypesSection() {
  const { language } = useLanguage();
  const [activeSubqueryType, setActiveSubqueryType] = useState<'single' | 'multiple_row' | 'multiple_col' | 'correlated'>('single');

  return (
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৩ • সাবকুয়েরির ধরন' : 'Part 3 • Subquery Types'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="4 Types of Subqueries: Single-Row, Multi-Row, Multi-Column & Correlated"
                bn="৪ ধরনের Subquery: Single-Row, Multi-Row, Multi-Column ও Correlated"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'single', label: '3.1 Single-Row', descEn: 'Returns 1 scalar value', descBn: 'মাত্র ১টি মান ফেরত দেয়' },
            { id: 'multiple_row', label: '3.2 Multiple-Row', descEn: '1 column, multiple rows', descBn: '১ কলাম, একাধিক সারি' },
            { id: 'multiple_col', label: '3.3 Multi-Column', descEn: 'Row-value tuple match', descBn: 'একাধিক কলামের টাপল তুলনা' },
            { id: 'correlated', label: '3.4 Correlated', descEn: 'Depends on outer row', descBn: 'বাইরের সারির ওপর নির্ভরশীল' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveSubqueryType(t.id as 'single' | 'multiple_row' | 'multiple_col' | 'correlated')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                activeSubqueryType === t.id
                  ? 'bg-purple-600/20 border-purple-400 text-white shadow-lg'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="text-xs font-mono font-bold">{t.label}</div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                {language === 'bn' ? t.descBn : t.descEn}
              </div>
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeSubqueryType === 'single' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Single-Row Subquery" bn="Single-Row Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Returns exactly one row (scalar value). Evaluated using standard comparison operators (=, >, <, >=, <=, <>)."
                bn="ঠিক একটি সারি (একক মান) ফেরত দেয়। সাধারণ তুলনামূলক অপারেটর (=, >, <, >=, <=, <>) দিয়ে ব্যবহার হয়।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Name, GPA 
FROM Students 
WHERE GPA > (SELECT AVG(GPA) FROM Students);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'multiple_row' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Multiple-Row Subquery" bn="Multiple-Row Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Returns a list of values. Must be paired with set operators (IN, NOT IN, ANY, ALL, EXISTS)."
                bn="একাধিক মানের তালিকা ফেরত দেয়। তাই IN, NOT IN, ANY, ALL বা EXISTS অপারেটর ব্যবহার করতে হয়।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Find all students enrolled in DBMS (Course C01):
SELECT Name FROM Students 
WHERE Student_ID IN (
    SELECT Student_ID FROM Enrollments WHERE Course_ID = 'C01'
);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'multiple_col' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Multiple-Column Subquery" bn="Multiple-Column Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Compares multiple column values simultaneously as a tuple. Supported by MySQL, PostgreSQL, and Oracle."
                bn="একসাথে একাধিক কলামের মান টাপল হিসেবে তুলনা করে। MySQL, PostgreSQL এবং Oracle-এ সাপোর্টেড।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Student_ID, Name, GPA FROM Students
WHERE (Student_ID, GPA) IN (
    SELECT Student_ID, GPA FROM Students WHERE Department = 'CSE'
);`}
              </pre>
            </div>
          )}

          {activeSubqueryType === 'correlated' && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                <DualText as="span" en="Correlated Subquery" bn="Correlated Subquery উদাহরণ" />
              </span>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="The inner query references a column from the outer query table, executing once for every single candidate row."
                bn="ভেতরের কুয়েরিটি বাইরের কুয়েরির কলাম রেফার করে এবং বাইরের প্রতিটি সারির জন্য আলাদাভাবে রান হয়।"
              />
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT S.Name, S.GPA FROM Students S
WHERE S.GPA > (
    SELECT AVG(S2.GPA) FROM Students S2 
    WHERE S2.Department = S.Department
);`}
              </pre>
            </div>
          )}
        </div>
      </section>
  );
}
