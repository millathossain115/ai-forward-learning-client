'use client';

import React, { useState } from 'react';
import {
  GitMerge,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function CascadeTab() {
  const { language } = useLanguage();
  const [cascadeMode, setCascadeMode] = useState<'RESTRICT' | 'CASCADE' | 'SET_NULL'>('CASCADE');

  return (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-1.5">
                  <GitMerge className="w-3.5 h-3.5 text-cyan-400" />
                  <DualText
                    en="Referential Actions: What Happens When a Parent Row is Deleted?"
                    bn="রেফারেন্সিয়াল অ্যাকশন: প্যারেন্ট রো মুছে ফেললে চাইল্ড টেবিলের কী হয়?"
                  />
                </h3>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 mt-0.5"
                  en="Foreign keys don't just validate insertions—they govern what happens to related child rows when a parent department is deleted."
                  bn="ফরেন কি শুধু ডেটা ইনসার্ট আটকে দেয় না—প্যারেন্ট ডিপার্টমেন্ট ডিলিট করলে যুক্ত শিক্ষার্থীদের রো কী হবে তা নিয়ন্ত্রণ করে।"
                />
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center rounded-lg bg-black/40 p-0.5 border border-slate-800 text-[10.5px] font-mono">
                {(['RESTRICT', 'CASCADE', 'SET_NULL'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setCascadeMode(mode)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      cascadeMode === mode ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mode === 'RESTRICT' && 'ON DELETE RESTRICT'}
                    {mode === 'CASCADE' && 'ON DELETE CASCADE'}
                    {mode === 'SET_NULL' && 'ON DELETE SET NULL'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Scenario Card */}
            <div className="p-3.5 rounded-xl bg-[#090d22] border border-indigo-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono font-bold text-indigo-300">
                  Scenario: Admin executes <code className="text-rose-400 bg-black/50 px-1.5 py-0.5 rounded">DELETE FROM departments WHERE id = 1; (CSE)</code>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                  Active Mode: ON DELETE {cascadeMode}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                {/* Engine Behavior Explanation */}
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase block">Engine Verdict:</span>
                  {cascadeMode === 'RESTRICT' && (
                    <div className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-rose-950/40 border border-rose-500/30 font-mono text-[10px] text-rose-300">
                        ERROR 1451 (23000): Cannot delete parent row: a foreign key constraint fails
                      </div>
                      <DualText
                        as="p"
                        en="Engine REFUSES deletion! Because students 101 (Rahim) and 103 (Tanvir) still reference Department 1, deleting it would leave orphan records. Default behavior in MySQL."
                        bn="ইঞ্জিন ডিলিট করতে সম্পূর্ণ অস্বীকৃতি জানায়! যেহেতু শিক্ষার্থী ১০১ (রহিম) ও ১০৩ (তানভীর) এখনও ডিপার্টমেন্ট ১-এ রয়েছে, তাই ডিলিট করলে তারা অভিভাবকহীন হয়ে পড়বে। এটি MySQL-এর ডিফল্ট নিয়ম।"
                      />
                    </div>
                  )}

                  {cascadeMode === 'CASCADE' && (
                    <div className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-amber-950/40 border border-amber-500/30 font-mono text-[10px] text-amber-300">
                        Query OK, 1 row affected -- Cascaded: 2 dependent rows in students automatically deleted!
                      </div>
                      <DualText
                        as="p"
                        en="Engine WIPES parent AND children! Department 1 is deleted, and the engine automatically cascades down to delete Rahim (101) and Tanvir (103) from students as well. Powerful but dangerous!"
                        bn="ইঞ্জিন প্যারেন্ট ও চাইল্ড উভয়ই মুছে ফেলে! ডিপার্টমেন্ট ১ ডিলিট হওয়ার সাথে সাথে চাইল্ড টেবিলের রহিম (১০১) ও তানভীর (১০৩)-এর ডেটাও স্বয়ংক্রিয়ভাবে মুছে যায়। শক্তিশালী হলেও অত্যন্ত সতর্কতার সাথে ব্যবহার্য!"
                      />
                    </div>
                  )}

                  {cascadeMode === 'SET_NULL' && (
                    <div className="space-y-1.5 text-zinc-300 text-[11px] leading-relaxed">
                      <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/30 font-mono text-[10px] text-emerald-300">
                        Query OK, 1 row affected -- Cascaded: 2 rows in students updated (dept_id = NULL)
                      </div>
                      <DualText
                        as="p"
                        en="Department 1 is deleted, but students stay enrolled in the university! Rahim (101) and Tanvir (103) have their dept_id set to NULL (Unassigned major). Requires dept_id to allow NULL."
                        bn="ডিপার্টমেন্ট ১ মুছে গেলেও শিক্ষার্থীরা বহাল থাকে! রহিম (১০১) ও তানভীর (১০৩)-এর dept_id স্বয়ংক্রিয়ভাবে NULL হয়ে যায় (অনির্দিষ্ট বিভাগ)। এর জন্য dept_id কলামে NULL অনুমোদন থাকতে হয়।"
                      />
                    </div>
                  )}
                </div>

                {/* DDL Syntax Snippet */}
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase block">DDL Declaration:</span>
                  <pre className="text-[10px] font-mono text-emerald-300 bg-black/70 p-2.5 rounded overflow-x-auto leading-tight">
{`CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) 
        REFERENCES departments(id)
        ON DELETE ${cascadeMode}
        ON UPDATE CASCADE
);`}
                  </pre>
                  <DualText
                    as="p"
                    className="text-[10px] text-zinc-400 font-sans"
                    en="ON UPDATE CASCADE also keeps IDs synchronized if the parent Department ID changes."
                    bn="ON UPDATE CASCADE রাখলে প্যারেন্টের আইডি পরিবর্তন করলেও চাইল্ডের আইডি স্বয়ংক্রিয়ভাবে আপডেট হয়ে যায়।"
                  />
                </div>
              </div>
            </div>
          </div>
  );
}
