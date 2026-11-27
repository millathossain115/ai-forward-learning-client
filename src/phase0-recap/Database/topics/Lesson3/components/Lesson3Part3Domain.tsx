'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson3Part3Domain() {
  const { language } = useLanguage();

  const [domainAttribute, setDomainAttribute] = useState<'Age' | 'CGPA' | 'Email' | 'Name'>('CGPA');
  const [testValue, setTestValue] = useState('3.80');

  const validateDomain = () => {
    const val = testValue.trim();
    if (domainAttribute === 'Age') {
      const num = Number(val);
      if (!val || isNaN(num) || !Number.isInteger(num)) {
        return {
          valid: false,
          msgEn: 'Age must be an integer number (e.g. 18 to 100).',
          msgBn: 'বয়স অবশ্যই একটি পূর্ণসংখ্যা হতে হবে (যেমন: ১৮ থেকে ১০০)।',
        };
      }
      if (num < 16 || num > 100) {
        return {
          valid: false,
          msgEn: 'Age out of reasonable student domain range (16–100).',
          msgBn: 'বয়স অনুমোদিত শিক্ষার্থী ডোমেইন সীমার বাইরে (১৬–১০০)।',
        };
      }
      return {
        valid: true,
        msgEn: `✓ Valid Age domain value: ${num} years old.`,
        msgBn: `✓ অনুমোদিত বয়স ডোমেইন মান: ${num} বছর।`,
      };
    }
    if (domainAttribute === 'CGPA') {
      const num = Number(val);
      if (!val || isNaN(num)) {
        return {
          valid: false,
          msgEn: 'CGPA must be a valid decimal number.',
          msgBn: 'সিজিপিএ একটি সঠিক দশমিক সংখ্যা হতে হবে।',
        };
      }
      if (num < 0.0 || num > 4.0) {
        return {
          valid: false,
          msgEn: 'CGPA domain violation: Must be between 0.00 and 4.00.',
          msgBn: 'সিজিপিএ ডোমেইন লঙ্ঘন: মান অবশ্যই ০.০০ থেকে ৪.০০ এর মধ্যে হতে হবে।',
        };
      }
      return {
        valid: true,
        msgEn: `✓ Valid CGPA domain value: ${num.toFixed(2)} out of 4.00.`,
        msgBn: `✓ অনুমোদিত সিজিপিএ ডোমেইন মান: ৪.০০ এর মধ্যে ${num.toFixed(2)}।`,
      };
    }
    if (domainAttribute === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return {
          valid: false,
          msgEn: 'Invalid Email format: Must contain "@" and valid domain.',
          msgBn: 'ভুল ইমেইল ফরম্যাট: অবশ্যই "@" ও বৈধ ডোমেইন থাকতে হবে।',
        };
      }
      return {
        valid: true,
        msgEn: `✓ Valid Email domain format: "${val}".`,
        msgBn: `✓ অনুমোদিত ইমেইল ডোমেইন ফরম্যাট: "${val}"।`,
      };
    }
    if (domainAttribute === 'Name') {
      if (val.length < 2) {
        return {
          valid: false,
          msgEn: 'Name must be at least 2 characters long.',
          msgBn: 'নামে কমপক্ষে ২টি অক্ষর থাকতে হবে।',
        };
      }
      if (/\d/.test(val)) {
        return {
          valid: false,
          msgEn: 'Name domain violation: Person names cannot contain digits.',
          msgBn: 'নামের ডোমেইন লঙ্ঘন: ব্যক্তির নামে কোনো সংখ্যা বা ডিজিট থাকা যাবে না।',
        };
      }
      return {
        valid: true,
        msgEn: `✓ Valid Name domain text: "${val}".`,
        msgBn: `✓ অনুমোদিত নামের টেক্সট: "${val}"।`,
      };
    }
    return {
      valid: true,
      msgEn: 'Valid value.',
      msgBn: 'সঠিক মান।',
    };
  };

  const domainValidationResult = validateDomain();

  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ৩ / ৯' : 'Part 3 of 9'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="What is a Domain? (Permissible Value Boundaries)"
              bn="ডোমেইন (Domain) কী? (অনুমোদিত মানের সীমানা)"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Would it make sense to store “Rahim” or “Database” in the Age column? Obviously not! A Domain is the set of permissible, valid values that an attribute is allowed to hold."
            bn="বয়স (Age) কলামে যদি কেউ “Rahim” বা “Database” লিখে রাখে, তবে কি কোনো অর্থ হবে? কখনোই না! ডেটাবেসে কোনো অ্যাট্রিবিউট যেসকল অনুমোদিত ও অর্থপূর্ণ মান গ্রহণ করতে পারে, তাদের সম্পূর্ণ সেটকে Domain বলে।"
          />
        </div>

        {/* Interactive Domain Validator Simulator */}
        <div className="p-5 rounded-2xl bg-[#15171e] border border-emerald-950 space-y-4">
          <h3 className="text-xs font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <DualText
              en="Interactive Domain Validator: Test Permissible Values"
              bn="ইন্টারেক্টিভ ডোমেইন ভ্যালিডেটর: অনুমোদিত মান যাচাই করুন"
            />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                {language === 'bn' ? 'অ্যাট্রিবিউট নির্বাচন করুন:' : 'Select Attribute:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(['CGPA', 'Age', 'Email', 'Name'] as const).map((attr) => (
                  <button
                    key={attr}
                    onClick={() => {
                      setDomainAttribute(attr);
                      if (attr === 'CGPA') setTestValue('3.80');
                      if (attr === 'Age') setTestValue('22');
                      if (attr === 'Email') setTestValue('student@univ.edu');
                      if (attr === 'Name') setTestValue('Rahim');
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors border ${
                      domainAttribute === attr
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-[#101116] border-white/[0.08] text-zinc-400'
                    }`}
                  >
                    {attr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 block mb-1">
                {language === 'bn'
                  ? `${domainAttribute}-এর জন্য পরীক্ষামূলক মান লিখুন:`
                  : `Enter Test Value for ${domainAttribute}:`}
              </label>
              <input
                type="text"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                placeholder="e.g. 3.80, Hello, -5"
                className="w-full bg-[#101116] border border-white/[0.12] rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Validation Outcome Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
              domainValidationResult.valid
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
            }`}
          >
            {domainValidationResult.valid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>
              {language === 'bn' ? domainValidationResult.msgBn : domainValidationResult.msgEn}
            </span>
          </div>

          {/* Domain Table Guide */}
          <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#101116] text-xs font-mono">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#14182a] border-b border-white/[0.08] text-zinc-300">
                  <th className="py-2 px-3 text-indigo-400">
                    {language === 'bn' ? 'অ্যাট্রিবিউট' : 'Attribute'}
                  </th>
                  <th className="py-2 px-3 text-emerald-400">
                    {language === 'bn' ? 'অনুমোদিত ডোমেইন' : 'Permissible Domain'}
                  </th>
                  <th className="py-2 px-3 text-rose-400">
                    {language === 'bn' ? 'ডোমেইন লঙ্ঘন (অগ্রহণযোগ্য মান)' : 'Domain Violations'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08] text-zinc-300 text-[11px]">
                <tr>
                  <td className="py-2 px-3 font-bold text-white">Age</td>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'অঋণাত্মক পূর্ণসংখ্যা [১৬–১০০]' : 'Non-negative integers [16–100]'}
                  </td>
                  <td className="py-2 px-3 text-rose-300">&quot;Rahim&quot;, -5, 3.14</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">CGPA</td>
                  <td className="py-2 px-3">
                    {language === 'bn' ? '০.০০ থেকে ৪.০০ এর মধ্যে দশমিক সংখ্যা' : 'Decimals between 0.00 and 4.00'}
                  </td>
                  <td className="py-2 px-3 text-rose-300">4.50, -1.00, &quot;Pass&quot;</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-white">Email</td>
                  <td className="py-2 px-3">
                    {language === 'bn' ? 'সঠিক ইমেইল ফরম্যাট (user@domain.com)' : 'Standard email format (user@domain.com)'}
                  </td>
                  <td className="py-2 px-3 text-rose-300">&quot;017123&quot;, plain text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
