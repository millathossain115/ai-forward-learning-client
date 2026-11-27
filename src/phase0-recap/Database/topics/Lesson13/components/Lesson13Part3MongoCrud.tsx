'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type CrudOp = 'insert' | 'find' | 'update' | 'delete';

const CRUD_COMMANDS: Record<CrudOp, { label: string; cmd: string; out: string }> = {
  insert: {
    label: 'insertOne()',
    cmd: `db.students.insertOne({\n  student_id: 101,\n  name: "Rahim",\n  dept: "CSE",\n  gpa: 3.85\n});`,
    out: `{ acknowledged: true, insertedId: ObjectId("674a1f...") }`,
  },
  find: {
    label: 'find()',
    cmd: `db.students.find(\n  { dept: "CSE", gpa: { $gte: 3.5 } },\n  { name: 1, gpa: 1, _id: 0 }\n).sort({ gpa: -1 });`,
    out: `[ { "name": "Sumaiya", "gpa": 3.90 }, { "name": "Rahim", "gpa": 3.85 } ]`,
  },
  update: {
    label: 'updateOne()',
    cmd: `db.students.updateOne(\n  { student_id: 101 },\n  { $set: { gpa: 3.92 } }\n);`,
    out: `{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }`,
  },
  delete: {
    label: 'deleteOne()',
    cmd: `db.students.deleteOne({ student_id: 104 });`,
    out: `{ acknowledged: true, deletedCount: 1 }`,
  },
};

export default function Lesson13Part3MongoCrud() {
  const { language } = useLanguage();
  const [crudOp, setCrudOp] = useState<CrudOp>('find');
  const [copied, setCopied] = useState(false);

  const current = CRUD_COMMANDS[crudOp];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ৩ • MongoDB CRUD শেল' : 'Part 3 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="MongoDB Architecture & Interactive CRUD Shell"
              bn="৩. MongoDB আর্কিটেকচার ও ইন্টারঅ্যাক্টিভ CRUD শেল"
            />
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(CRUD_COMMANDS) as CrudOp[]).map((op) => (
          <button
            key={op}
            onClick={() => setCrudOp(op)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
              crudOp === op ? 'bg-emerald-600 text-white ' : 'bg-[#14182d] text-zinc-400 border border-slate-800'
            }`}
          >
            {CRUD_COMMANDS[op].label}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-300">mongosh &gt; {current.label}</span>
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto">
          {current.cmd}
        </pre>
        <div className="p-3 rounded-lg bg-[#0a0d1a] border border-emerald-500/20 text-xs font-mono text-cyan-300 overflow-x-auto">
          <span className="text-zinc-500 mr-2">Output:</span>
          {current.out}
        </div>
      </div>
    </section>
  );
}
