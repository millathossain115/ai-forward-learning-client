'use client';

import React, { useState } from 'react';
import {
  Link2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  Check,
  RotateCcw,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function ForeignKeyTab() {
  const { language } = useLanguage();
  // Foreign Key Playground State & Live Linked Tables
  const [selectedDeptId, setSelectedDeptId] = useState<string>('D01');
  const [fkAlert, setFkAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  const fkDepartments = [
    { id: 'D01', name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. Kabir', room: 'Lab 401' },
    { id: 'D02', name: 'Business Administration', code: 'BBA', head: 'Prof. Anis', room: 'Tower 202' },
    { id: 'D03', name: 'Electrical & Electronic Engineering', code: 'EEE', head: 'Dr. Tariq', room: 'Eng 105' },
  ];

  const fkStudents = [
    { id: '101', name: 'Rahim', deptId: 'D01' },
    { id: '102', name: 'Karim', deptId: 'D02' },
    { id: '103', name: 'Nila', deptId: 'D01' },
    { id: '104', name: 'Sami', deptId: 'D03' },
  ];

  const handleFkTest = (deptId: string) => {
    setSelectedDeptId(deptId);
    if (deptId === 'D99') {
      setFkAlert({
        type: 'error',
        msgEn: '❌ Referential Integrity Violation! Dept_ID "D99" does not exist in parent table "DEPARTMENT". Database engine strictly rejects orphan child records!',
        msgBn: '❌ রেফারেন্সিয়াল ইন্টিগ্রিটি লঙ্ঘন! মূল টেবিল "DEPARTMENT"-এ "D99" নামের কোনো বিভাগ নেই। ডেটাবেস ইঞ্জিন এই অনাথ রেকর্ড গ্রহণ করতে সম্পূর্ণ অস্বীকৃতি জানিয়েছে!',
      });
    } else if (deptId === 'NULL') {
      setFkAlert({
        type: 'success',
        msgEn: '✓ Foreign Key NULL Accepted: Student enrolled with undeclared department. In relational DBMS, foreign keys CAN be NULL unless explicitly defined as NOT NULL.',
        msgBn: '✓ ফরেন কি NULL গৃহীত: শিক্ষার্থী এখনো বিভাগ পছন্দ করেনি। রিলেশনাল ডেটাবেসে ফরেন কি কলাম NULL হতে পারে (যদি না NOT NULL শর্ত দেওয়া থাকে)।',
      });
    } else {
      const match = fkDepartments.find((d) => d.id === deptId);
      setFkAlert({
        type: 'success',
        msgEn: `✓ Referential Integrity Verified: Foreign Key "${deptId}" successfully resolves to parent department "${match?.name}"!`,
        msgBn: `✓ রেফারেন্সিয়াল ইন্টিগ্রিটি সঠিক: ফরেন কি "${deptId}" প্যারেন্ট টেবিলের বিভাগ "${match?.name}"-এর সাথে সফলভাবে লিংক হয়েছে!`,
      });
    }
  };

  const handleResetFk = () => {
    setSelectedDeptId('D01');
    setFkAlert(null);
  };

  return (
        <div className="p-6 rounded-2xl bg-[#15171e] border border-emerald-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Link2 className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="5. Foreign Key & Referential Integrity"
                    bn="৫. ফরেন কী (Foreign Key) ও রেফারেন্সিয়াল ইন্টিগ্রিটি"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="The bridge connecting two tables, strictly preventing orphan rows and enforcing relational consistency."
                  bn="দুটি টেবিলের মধ্যে সংযোগকারী সেতু, যা অনাথ (orphan) রেকর্ড সৃষ্টি হওয়া কঠোরভাবে রোধ করে।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Referential Anchor
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#101116] border border-white/[0.08] text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="Formal Definition & Relational Anchor Concept:"
                bn="সংজ্ঞা ও রেফারেন্সিয়াল ইন্টিগ্রিটির মূলনীতি:"
              />
            </div>
            <DualText
              en="A Foreign Key (FK) is an attribute (or collection of attributes) in one relation (Child Table) that refers to the Primary Key (or Unique Key) of another relation (Parent Table). The database engine enforces Referential Integrity: any value present in the child's foreign key MUST strictly exist in the parent's primary key (or be NULL). It is physically impossible to create an 'orphan' record!"
              bn="ফরেন কী (FK) হলো এমন একটি কলাম (বা একাধিক কলাম) যা কোনো অধীন টেবিল (Child Table) থেকে মূল টেবিলের (Parent Table) প্রাইমারি কি-কে নির্দেশ করে। ডেটাবেস ইঞ্জিন এখানে রেফারেন্সিয়াল ইন্টিগ্রিটি বলবৎ রাখে: চাইল্ড টেবিলের ফরেন কি কলামের মান অবশ্যই প্যারেন্ট টেবিলের প্রাইমারি কীতে বিদ্যমান থাকতে হবে (অথবা NULL হতে পারে)। কোনো অবস্থাতেই 'অনাথ' (orphan) রেকর্ড তৈরি করা সম্ভব নয়!"
            />
          </div>

          {/* Interactive Referential Integrity Simulator */}
          <div className="p-4 rounded-xl bg-[#101116] border border-emerald-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <DualText
                  en="Interactive Referential Integrity Simulator (Test Foreign Key Scenarios):"
                  bn="ইন্টারেক্টিভ রেফারেন্সিয়াল ইন্টিগ্রিটি সিমুলেটর (ফরেন কি সিনারিও পরীক্ষা করুন):"
                />
              </span>
              <button
                onClick={handleResetFk}
                className="self-start sm:self-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                {language === 'bn' ? 'রিসেট' : 'Reset'}
              </button>
            </div>

            {/* Test Action Scenario Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নিচের বোতামগুলো ক্লিক করে শিক্ষার্থীর ডিপার্টমেন্ট নির্বাচন করুন ও ডেটাবেসের প্রতিক্রিয়া দেখুন:'
                  : 'Click the scenario buttons below to assign a department and observe DBMS constraint checks:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFkTest('D01')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedDeptId === 'D01'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold  '
                      : 'bg-[#15171e] border-white/[0.08] text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Dept_ID: D01 (CSE)
                </button>

                <button
                  onClick={() => handleFkTest('D02')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedDeptId === 'D02'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold  '
                      : 'bg-[#15171e] border-white/[0.08] text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Dept_ID: D02 (BBA)
                </button>

                <button
                  onClick={() => handleFkTest('D03')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedDeptId === 'D03'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold  '
                      : 'bg-[#15171e] border-white/[0.08] text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Dept_ID: D03 (EEE)
                </button>

                <button
                  onClick={() => handleFkTest('D99')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedDeptId === 'D99'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold   '
                      : 'bg-[#15171e] border-white/[0.08] text-rose-400/80 hover:border-rose-500/50 hover:text-rose-300'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Dept_ID: D99 {language === 'bn' ? '(অবৈধ বিভাগ)' : '(Invalid Dept)'}
                </button>

                <button
                  onClick={() => handleFkTest('NULL')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
                    selectedDeptId === 'NULL'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold  '
                      : 'bg-[#15171e] border-white/[0.08] text-amber-400/80 hover:border-amber-500/50 hover:text-amber-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Dept_ID: NULL {language === 'bn' ? '(বিভাগহীন ভর্তি)' : '(Undeclared Major)'}
                </button>
              </div>
            </div>

            {/* Dynamic Status / Alert Banner */}
            {fkAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                  fkAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-sans'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-sans'
                }`}
              >
                {fkAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {fkAlert.type === 'error'
                      ? language === 'bn'
                        ? 'রেফারেন্সিয়াল ইন্টিগ্রিটি লঙ্ঘন (DBMS ত্রুটি)'
                        : 'Referential Integrity Constraint Violation (DBMS Error)'
                      : language === 'bn'
                      ? 'বৈধ রেফারেন্সিয়াল লিঙ্ক (সফল)'
                      : 'Valid Referential Link Established'}
                  </div>
                  <div className="text-[11px] opacity-90 leading-relaxed">
                    {language === 'bn' ? fkAlert.msgBn : fkAlert.msgEn}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visual Side-by-Side Dual Table Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
            {/* Parent Table: DEPARTMENT */}
            <div className="p-4 rounded-xl bg-[#101116] border border-amber-500/30 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                    PARENT
                  </span>
                  <span className="text-amber-300 font-bold">DEPARTMENT</span>
                </div>
                <span className="text-[10px] text-zinc-400 bg-[#15171e] px-2 py-0.5 rounded border border-white/[0.08]">
                  Primary Key: <span className="text-amber-300 font-bold">Dept_ID</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-400 bg-[#15171e]">
                      <th className="py-2 px-2.5 text-amber-400 font-bold">
                        Dept_ID <span className="text-[9px] text-amber-500">[PK]</span>
                      </th>
                      <th className="py-2 px-2.5">Name</th>
                      <th className="py-2 px-2.5">Head</th>
                      <th className="py-2 px-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                    {fkDepartments.map((dept) => {
                      const isTargetParent = selectedDeptId === dept.id;
                      return (
                        <tr
                          key={dept.id}
                          className={`transition-colors ${
                            isTargetParent
                              ? 'bg-amber-500/15 text-white font-semibold'
                              : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <td className="py-2 px-2.5 font-bold text-amber-300">
                            {dept.id}
                          </td>
                          <td className="py-2 px-2.5">{dept.name}</td>
                          <td className="py-2 px-2.5 text-zinc-400">{dept.head}</td>
                          <td className="py-2 px-2.5 text-right">
                            {isTargetParent ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 text-[10px] border border-amber-500/50 font-bold">
                                👑 Target PK
                              </span>
                            ) : (
                              <span className="text-zinc-600 text-[10px]">Ready</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-zinc-400 font-sans border-t border-white/[0.08] pt-2 flex items-center justify-between">
                <span>{language === 'bn' ? 'মূল টেবিল কখনো চাইল্ড টেবিলের ওপর নির্ভর করে না।' : 'The Parent table exists independently of child records.'}</span>
                <span className="text-amber-400 font-mono">3 Departments</span>
              </div>
            </div>

            {/* Child Table: STUDENT */}
            <div className="p-4 rounded-xl bg-[#101116] border border-emerald-500/30 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    CHILD
                  </span>
                  <span className="text-emerald-300 font-bold">STUDENT</span>
                </div>
                <span className="text-[10px] text-zinc-400 bg-[#15171e] px-2 py-0.5 rounded border border-white/[0.08]">
                  Foreign Key: <span className="text-emerald-300 font-bold">Dept_ID → Dept</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-white/[0.08] text-zinc-400 bg-[#15171e]">
                      <th className="py-2 px-2.5 text-amber-400 font-bold">
                        ID <span className="text-[9px] text-amber-500">[PK]</span>
                      </th>
                      <th className="py-2 px-2.5">Name</th>
                      <th className="py-2 px-2.5 text-emerald-400 font-bold">
                        Dept_ID <span className="text-[9px] text-emerald-500">[FK]</span>
                      </th>
                      <th className="py-2 px-2.5 text-right">Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] text-zinc-300">
                    {fkStudents.map((student) => {
                      const isLinkedToSelected = selectedDeptId === student.deptId;
                      return (
                        <tr
                          key={student.id}
                          className={`transition-colors ${
                            isLinkedToSelected
                              ? 'bg-emerald-500/15 text-white font-semibold'
                              : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <td className="py-2 px-2.5 font-bold text-amber-300">{student.id}</td>
                          <td className="py-2 px-2.5">{student.name}</td>
                          <td className="py-2 px-2.5 font-mono">
                            <span
                              className={`px-1.5 py-0.5 rounded font-bold ${
                                isLinkedToSelected
                                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/60'
                                  : 'bg-slate-800 text-emerald-400'
                              }`}
                            >
                              {student.deptId}
                            </span>
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono text-[10px]">
                            {isLinkedToSelected ? (
                              <span className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                                <Check className="w-3 h-3" />
                                {language === 'bn' ? 'সংযুক্ত' : 'Linked'}
                              </span>
                            ) : (
                              <span className="text-zinc-500">Valid FK</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Temporary Simulation Row if D99 or NULL was selected */}
                    {selectedDeptId === 'D99' && (
                      <tr className="bg-rose-950/40 text-rose-200 font-semibold border-t-2 border-rose-500">
                        <td className="py-2 px-2.5 text-rose-300 font-bold">105</td>
                        <td className="py-2 px-2.5 text-rose-200">Reza (New)</td>
                        <td className="py-2 px-2.5 font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 border border-rose-500 font-bold">
                            D99 ❌
                          </span>
                        </td>
                        <td className="py-2 px-2.5 text-right text-rose-400 font-bold">
                          ORPHAN REJECT!
                        </td>
                      </tr>
                    )}

                    {selectedDeptId === 'NULL' && (
                      <tr className="bg-amber-950/30 text-amber-200 font-semibold border-t-2 border-amber-500">
                        <td className="py-2 px-2.5 text-amber-300 font-bold">105</td>
                        <td className="py-2 px-2.5 text-amber-200">Reza (New)</td>
                        <td className="py-2 px-2.5 font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-500 font-bold">
                            NULL
                          </span>
                        </td>
                        <td className="py-2 px-2.5 text-right text-amber-400 font-bold">
                          ✓ NULL Permitted
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-zinc-400 font-sans border-t border-white/[0.08] pt-2 flex items-center justify-between">
                <span>{language === 'bn' ? 'চাইল্ড টেবিল ডিপার্টমেন্ট ছাড়া অস্তিত্বহীন হতে পারে না।' : 'Foreign key values must point to existing parent rows.'}</span>
                <span className="text-emerald-400 font-mono">
                  {selectedDeptId === 'D99' ? '4 Records (1 Rejected)' : selectedDeptId === 'NULL' ? '5 Records' : '4 Records'}
                </span>
              </div>
            </div>
          </div>

          {/* Live SQL DDL Definition Preview */}
          <div className="p-4 rounded-xl bg-[#101116] border border-white/[0.08] font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-white/[0.08] pb-2">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {language === 'bn'
                  ? 'লাইভ SQL টেবিল স্কিমা (Foreign Key & Constraint রেফারেন্স):'
                  : 'Live Generated SQL Schema (Parent & Child Tables with FK):'}
              </span>
              <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
              <span className="text-zinc-500">-- 1. Create Parent Table First</span><br />
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-amber-300 font-bold">DEPARTMENT</span> (<br />
              {'  '}Dept_ID   <span className="text-cyan-400">VARCHAR(10)</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
              {'  '}Dept_Name <span className="text-cyan-400">VARCHAR(50)</span> <span className="text-rose-400 font-bold">NOT NULL</span>,<br />
              {'  '}Head      <span className="text-cyan-400">VARCHAR(50)</span><br />
              );<br /><br />
              <span className="text-zinc-500">-- 2. Create Child Table referencing Parent PK</span><br />
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-emerald-300 font-bold">STUDENT</span> (<br />
              {'  '}Student_ID <span className="text-cyan-400">VARCHAR(10)</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
              {'  '}Name       <span className="text-cyan-400">VARCHAR(50)</span> <span className="text-rose-400 font-bold">NOT NULL</span>,<br />
              {'  '}Dept_ID    <span className="text-cyan-400">VARCHAR(10)</span>, <span className="text-zinc-500">-- NULL allowed by default</span><br />
              {'  '}<span className="text-purple-400 font-bold">CONSTRAINT</span> fk_student_dept<br />
              {'    '}<span className="text-emerald-400 font-bold">FOREIGN KEY</span> (Dept_ID)<br />
              {'    '}<span className="text-emerald-400 font-bold">REFERENCES</span> DEPARTMENT(Dept_ID)<br />
              {'    '}<span className="text-blue-400">ON UPDATE CASCADE</span><br />
              {'    '}<span className="text-amber-400">ON DELETE RESTRICT</span> <span className="text-zinc-500">-- Prevents deleting dept if students exist</span><br />
              );
            </pre>
          </div>

          {/* Foreign Key Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
              <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {language === 'bn' ? '১. অনাথ রেকর্ড প্রতিরোধ' : '1. Orphan Prevention'}
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'চাইল্ড টেবিলে এমন কোনো Dept_ID ইনসার্ট করা যাবে না যা প্যারেন্ট টেবিলে অনুপস্থিত (যেমন D99)।'
                  : 'You can never insert a child record pointing to a non-existent parent ID (e.g. D99).'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
              <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {language === 'bn' ? '২. ডুপ্লিকেট মান বৈধ' : '2. Duplicates Permitted'}
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'প্রাইমারি কি অনন্য হলেও ফরেন কীতে একাধিক সারি একই মান রাখতে পারে (একাধিক শিক্ষার্থী একই বিভাগের)।'
                  : 'Unlike Primary Keys, foreign key columns can repeat (multiple students belong to department D01).'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#15171e] border border-white/[0.08] space-y-1">
              <span className="text-cyan-400 font-bold block flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                {language === 'bn' ? '৩. ডিলিট রুলস (ON DELETE)' : '3. Deletion Rules'}
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'RESTRICT: বিভাগ মুছতে বাধা দেবে। CASCADE: বিভাগ মুছলে ঐ বিভাগের সব ছাত্রও স্বয়ংক্রিয়ভাবে মুছে যাবে।'
                  : 'RESTRICT prevents deleting parent if children exist. CASCADE automatically deletes child records.'}
              </p>
            </div>
          </div>
        </div>
  );
}
