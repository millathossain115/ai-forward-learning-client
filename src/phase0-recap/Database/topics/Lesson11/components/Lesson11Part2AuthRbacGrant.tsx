'use client';

import React, { useState } from 'react';
import { CheckCircle2, KeyRound, Lock, Users, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

type RoleKey = 'admin' | 'teacher' | 'student' | 'accountant' | 'guest';
type TableKey = 'STUDENT' | 'EXAM_MARKS' | 'PAYMENTS';
type ActionKey = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';

const ROLE_PERMISSIONS: Record<RoleKey, Record<string, boolean>> = {
  admin: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': true, 'STUDENT:UPDATE': true, 'STUDENT:DELETE': true, 'EXAM_MARKS:SELECT': true, 'EXAM_MARKS:UPDATE': true, 'PAYMENTS:SELECT': true, 'PAYMENTS:UPDATE': true },
  teacher: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': true, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': true, 'EXAM_MARKS:UPDATE': true, 'PAYMENTS:SELECT': false, 'PAYMENTS:UPDATE': false },
  student: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': false, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': true, 'EXAM_MARKS:UPDATE': false, 'PAYMENTS:SELECT': false, 'PAYMENTS:UPDATE': false },
  accountant: { 'STUDENT:SELECT': true, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': false, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': false, 'EXAM_MARKS:UPDATE': false, 'PAYMENTS:SELECT': true, 'PAYMENTS:UPDATE': true },
  guest: { 'STUDENT:SELECT': false, 'STUDENT:INSERT': false, 'STUDENT:UPDATE': false, 'STUDENT:DELETE': false, 'EXAM_MARKS:SELECT': false, 'EXAM_MARKS:UPDATE': false, 'PAYMENTS:SELECT': false, 'PAYMENTS:UPDATE': false },
};

export default function Lesson11Part2AuthRbacGrant() {
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<RoleKey>('teacher');
  const [selectedTable, setSelectedTable] = useState<TableKey>('EXAM_MARKS');
  const [selectedAction, setSelectedAction] = useState<ActionKey>('UPDATE');

  const isAllowed = !!ROLE_PERMISSIONS[selectedRole][`${selectedTable}:${selectedAction}`];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পার্ট ২ • অথেনটিকেশন, RBAC ও GRANT/REVOKE' : 'Part 2 of 7'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              as="span"
              en="Authentication vs. Authorization, RBAC & GRANT/REVOKE Lab"
              bn="২. Authentication বনাম Authorization, RBAC ও GRANT/REVOKE ল্যাব"
            />
          </h2>
        </div>
      </div>

      {/* AuthN vs AuthZ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-cyan-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Authentication (&ldquo;Who are you?&rdquo;)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Verifies identity via passwords, MFA, SSH keys, or TLS client certificates before opening a session."
            bn="পাসওয়ার্ড, MFA বা সার্টিফিকেটের মাধ্যমে ব্যবহারকারীর পরিচয় যাচাই করে।"
          />
        </div>
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-1.5">
          <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Authorization (&ldquo;What can you do?&rdquo;)
          </span>
          <DualText
            as="p"
            className="text-zinc-300 font-sans"
            en="Checks privileges using RBAC roles (GRANT / REVOKE) following the Principle of Least Privilege."
            bn="ব্যবহারকারী কোন টেবিলে কী অপারেশন করতে পারবে তা RBAC ও GRANT/REVOKE দিয়ে নিয়ন্ত্রণ করে।"
          />
        </div>
      </div>

      {/* Interactive RBAC Permission Simulator */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-indigo-500/30 space-y-4">
        <span className="text-xs font-mono font-bold text-indigo-300 uppercase">
          <DualText as="span" en="Interactive RBAC Permission Simulator" bn="ইন্টারঅ্যাক্টিভ RBAC পারমিশন সিমুলেটর" />
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="space-y-1.5">
            <span className="text-zinc-400 block text-[11px]">1. Select Role</span>
            <div className="flex flex-wrap gap-1.5">
              {(['admin', 'teacher', 'student', 'accountant', 'guest'] as RoleKey[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-2.5 py-1 rounded cursor-pointer capitalize ${
                    selectedRole === r ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-900 text-zinc-400 border border-slate-800'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-zinc-400 block text-[11px]">2. Target Table</span>
            <div className="flex flex-wrap gap-1.5">
              {(['STUDENT', 'EXAM_MARKS', 'PAYMENTS'] as TableKey[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTable(t)}
                  className={`px-2.5 py-1 rounded cursor-pointer ${
                    selectedTable === t ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-900 text-zinc-400 border border-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-zinc-400 block text-[11px]">3. SQL Operation</span>
            <div className="flex flex-wrap gap-1.5">
              {(['SELECT', 'INSERT', 'UPDATE', 'DELETE'] as ActionKey[]).map((a) => (
                <button
                  key={a}
                  onClick={() => setSelectedAction(a)}
                  className={`px-2.5 py-1 rounded cursor-pointer ${
                    selectedAction === a ? 'bg-purple-600 text-white font-bold' : 'bg-slate-900 text-zinc-400 border border-slate-800'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 font-mono text-xs ${
          isAllowed ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            {isAllowed ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span>
              {isAllowed
                ? `ACCESS GRANTED: Role '${selectedRole}' can execute ${selectedAction} ON ${selectedTable}.`
                : `PERMISSION DENIED (ERROR 1142): Role '${selectedRole}' lacks ${selectedAction} privilege on ${selectedTable}.`}
            </span>
          </div>
          <code className="hidden md:block text-[11px] bg-black/40 px-2.5 py-1 rounded text-zinc-300">
            {isAllowed ? `GRANT ${selectedAction} ON ${selectedTable} TO ${selectedRole};` : `REVOKE ${selectedAction} ON ${selectedTable} FROM ${selectedRole};`}
          </code>
        </div>
      </div>
    </section>
  );
}
