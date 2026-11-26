'use client';

import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson8Part4NormalForms() {
  const { language } = useLanguage();
  const [activeNormalFormStep, setActiveNormalFormStep] = useState<'1NF' | '2NF' | '3NF' | 'BCNF'>('1NF');

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৪ • নরমাল ফর্মস (1NF - BCNF)' : 'Part 4 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Step-by-Step Normal Forms: 1NF, 2NF, 3NF & BCNF"
              bn="৪. ধাপে ধাপে নরমাল ফর্ম: 1NF, 2NF, 3NF ও BCNF"
            />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { id: '1NF' as const, labelEn: '1NF: Atomic Values', labelBn: '1NF: একক মান', ruleEn: 'No repeating groups', ruleBn: 'একাধিক মান নয়' },
          { id: '2NF' as const, labelEn: '2NF: No Partial FDs', labelBn: '2NF: Partial FD মুক্ত', ruleEn: 'Full key dependency', ruleBn: 'পূর্ণ কি নির্ভরতা' },
          { id: '3NF' as const, labelEn: '3NF: No Transitive FDs', labelBn: '3NF: Transitive FD মুক্ত', ruleEn: 'No non-key → non-key', ruleBn: 'নন-কি থেকে নন-কি নয়' },
          { id: 'BCNF' as const, labelEn: 'BCNF: Superkey Determinants', labelBn: 'BCNF: সুপারকি নিয়ম', ruleEn: 'Every determinant is superkey', ruleBn: 'প্রতিটি ডিটারমিন্যান্ট সুপারকি' },
        ].map((nf) => (
          <button
            key={nf.id}
            onClick={() => setActiveNormalFormStep(nf.id)}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
              activeNormalFormStep === nf.id
                ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
            }`}
          >
            <div className="text-xs font-mono font-bold text-cyan-300">{nf.id}</div>
            <div className="text-xs font-bold text-white mt-0.5 font-sans">{language === 'bn' ? nf.labelBn : nf.labelEn}</div>
            <div className="text-[10px] text-zinc-400 mt-0.5 font-sans">{language === 'bn' ? nf.ruleBn : nf.ruleEn}</div>
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
        {activeNormalFormStep === '1NF' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">First Normal Form (1NF)</h3>
                <DualText
                  as="p"
                  className="text-xs text-zinc-400"
                  en="Rule: Every cell must hold a single atomic (indivisible) value."
                  bn="নিয়ম: প্রতিটি সেলে মাত্র একটি অবিভাজ্য (atomic) মান থাকতে হবে।"
                />
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Atomic Integrity
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400">✗ Violates 1NF (Multi-valued cells):</span>
                <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-zinc-300">
                  <div>101 | Rahim | 01711111111, 01822222222</div>
                  <div>102 | Karim | 01933333333</div>
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/40 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400">✓ 1NF Achieved (Atomic values):</span>
                <div className="p-2 bg-black/40 rounded text-[11px] font-mono text-zinc-300">
                  <div>101 | Rahim | 01711111111</div>
                  <div>101 | Rahim | 01822222222</div>
                  <div>102 | Karim | 01933333333</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeNormalFormStep === '2NF' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Second Normal Form (2NF)</h3>
                <DualText
                  as="p"
                  className="text-xs text-zinc-400"
                  en="Rule: In 1NF + NO partial dependencies on composite candidate keys."
                  bn="নিয়ম: 1NF হতে হবে + কম্পোজিট কি-এর অংশের ওপর কোনো Partial Dependency থাকা যাবে না।"
                />
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                No Partial FDs
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-amber-400 font-mono font-bold">Composite Key = (Student_ID, Course_ID)</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-zinc-300 font-mono">
                <li>Student_Name depends ONLY on Student_ID (Partial FD ✗)</li>
                <li>Course_Name depends ONLY on Course_ID (Partial FD ✗)</li>
                <li>Grade depends on BOTH (Full FD ✓)</li>
              </ul>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-sans">
              <strong>Decomposition:</strong>
              <p className="text-[11px] text-zinc-300 font-mono">
                Students(Student_ID, Student_Name) • Courses(Course_ID, Course_Name) • Enrollments(Student_ID, Course_ID, Grade)
              </p>
            </div>
          </div>
        )}

        {activeNormalFormStep === '3NF' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Third Normal Form (3NF)</h3>
                <DualText
                  as="p"
                  className="text-xs text-zinc-400"
                  en="Rule: In 2NF + NO transitive dependencies between non-prime attributes."
                  bn="নিয়ম: 2NF হতে হবে + নন-প্রাইম অ্যাট্রিবিউটের মধ্যে কোনো Transitive Dependency থাকা যাবে না।"
                />
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                No Transitive FDs
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-purple-400 font-mono font-bold">Problem: Student_ID → Department_ID → Department_Name</span>
              <DualText
                as="p"
                className="text-[11px] text-zinc-400 font-sans"
                en="Department_Name transitively depends on Student_ID via Department_ID."
                bn="Department_Name পরোক্ষভাবে Department_ID-এর মাধ্যমে Student_ID-এর ওপর নির্ভরশীল।"
              />
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-sans">
              <strong>Decomposition:</strong>
              <p className="text-[11px] text-zinc-300 font-mono">
                Students(Student_ID [PK], Name, Department_ID [FK]) • Departments(Department_ID [PK], Department_Name)
              </p>
            </div>
          </div>
        )}

        {activeNormalFormStep === 'BCNF' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Boyce-Codd Normal Form (BCNF)</h3>
                <DualText
                  as="p"
                  className="text-xs text-zinc-400"
                  en="Rule: For every non-trivial FD (X → Y), X MUST be a Superkey."
                  bn="নিয়ম: প্রতিটি নন-ট্রিভিয়াল FD (X → Y)-এর জন্য X অবশ্যই একটি Superkey হতে হবে।"
                />
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Strictest Form
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-emerald-400 font-mono font-bold">Scenario: Student_Instructor(Student, Course, Instructor)</span>
              <div className="p-2 bg-black/40 rounded font-mono text-[11px] text-rose-400">
                Instructor → Course (Instructor is NOT a superkey!)
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 font-sans">
              <strong>BCNF Decomposition:</strong>
              <p className="text-[11px] text-zinc-300 font-mono">
                Instructor_Course(Instructor [PK], Course) • Student_Instructor(Student, Instructor [FK])
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
