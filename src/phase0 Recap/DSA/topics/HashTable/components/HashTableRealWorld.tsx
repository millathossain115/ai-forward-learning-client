'use client';

import React from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import { Server, ShieldCheck, Zap } from 'lucide-react';

export default function HashTableRealWorld() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. ULTRA-RELATABLE DAY-TO-DAY REAL-LIFE SCENARIOS */}
      <RealLifeScenario
        topicName="হ্যাশ টেবিল ও ম্যাপ (Hash Table - O(1))"
        scenarios={[
          {
            title: '১. ফোনের কন্টাক্ট লিস্ট ও কলার আইডি (Phonebook & Caller ID)',
            subtitle: 'কল আসার সাথে সাথে চোখের পলকে নাম ভেসে ওঠা',
            badge: 'Instant O(1) Key Lookup',
            visualTag: 'Zero Searching Delay',
            accentColor: 'pink',
            analogy:
              "আপনার ফোনে হাজার হাজার নম্বর সেভ আছে। যখন বন্ধু 'সাকিব' কল দেয়, স্ক্রিনে সাথে সাথে 'সাকিব' ভেসে ওঠে। ফোন কখনোই পুরো কন্টাক্ট লিস্ট এক এক করে লাইন ধরে খোঁজে না; ফোন নম্বরটিকে 'Key' বানিয়ে হ্যাশ টেবিলের মাধ্যমে সরাসরি ১ মিলি-সেকেন্ডে নাম টেনে আনে!",
            whyItFits:
              'ফোন নম্বর (Key) ➔ হ্যাশ ফাংশন ➔ সরাসরি মেমরি অ্যাড্রেস থেকে ব্যক্তির নাম (Value) রিটার্ন করা হয়।',
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-1 rounded bg-[#1f1628] border border-pink-500/50 text-pink-300 font-bold">
                  ইনকামিং নম্বর &quot;01711...&quot;
                </span>
                <span>➔ Hash() ➔</span>
                <span className="px-2 py-1 rounded bg-pink-500 text-slate-950 font-bold">
                  স্ক্রিনে: &quot;সাকিব&quot; (O(1) Access)
                </span>
              </div>
            )
          },
          {
            title: '২. রোল নম্বর দিয়ে বোর্ড পরীক্ষার রেজাল্ট খোঁজা (Exam Roll Lookup)',
            subtitle: 'লাখ লাখ শিক্ষার্থীর রেজাল্টের মধ্যে নিজের রেজাল্ট এক সেকেন্ডে পাওয়া',
            badge: 'Direct Index Bucket',
            visualTag: 'Single Hit Query',
            accentColor: 'cyan',
            analogy:
              'এসএসসি বা এইচএসসি পরীক্ষায় ২০ লাখ পরীক্ষার্থী অংশ নেয়। শিক্ষা বোর্ডের ওয়েবসাইটে নিজের ৬ সংখ্যার রোল নম্বর দিয়ে সাবমিট করলেই মুহূর্তে আপনার রেজাল্ট শিট চলে আসে। সার্ভার কখনোই ২০ লাখ খাতা বা রোল একের পর এক সার্চ করে না; রোল নাম্বারটিই হ্যাশ টেবিলের চাবি হিসেবে কাজ করে।',
            whyItFits:
              'রোল নম্বর (Key) হ্যাশ ফাংশনে দিয়ে সরাসরি নির্দিষ্ট ডেটাবেস বাকেট থেকে রেজাল্ট কার্ড তুলে আনা হয়।',
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                  রোল &quot;458920&quot;
                </span>
                <span>➔ Map[Roll] ➔</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                  GPA 5.00 (Golden)
                </span>
              </div>
            )
          },
          {
            title: '৩. জিম বা সুইমিং পুলের লকার চাবি (Locker Key & Box)',
            subtitle: 'চাবির নম্বর দেখেই নির্দিষ্ট বাক্সে পৌঁছানো',
            badge: '1-to-1 Mapping',
            visualTag: 'Direct Bucket Access',
            accentColor: 'amber',
            analogy:
              "জিমে গেলে আপনাকে একটি টোকেন বা চাবি দেওয়া হয় যাতে লেখা থাকে '৪২'। আপনি কখনোই কারো লকার খুলে দেখেন না যে কোনটি আপনার—সরাসরি ৪২ নম্বর লকারে গিয়ে চাবি ঘুরিয়ে নিজের ব্যাগ বের করে ফেলেন।",
            whyItFits:
              'চাবির সংখ্যাটিই সরাসরি মেমরি বাকেটের ইনডেক্স। কোনো সার্চিং বা সময় নষ্ট ছাড়া সোজা নিজের স্লটে পৌঁছানোই হ্যাশ টেবিলের মূল সৌন্দর্য।',
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono py-1">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                  লকার কি #৪২
                </span>
                <span>➔ সোজা ৪২ নম্বর খোপ ➔</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-amber-300">
                  আপনার ব্যাগ ও জুতো
                </span>
              </div>
            )
          }
        ]}
      />

      {/* 2. Real World Software Usages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Server className="w-4 h-4 text-pink-400" />
          <h4 className="text-xs font-bold text-zinc-200">১. Redis ইন-মেমরি ক্যাশ</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            রেডিস মূলত একটি বিশাল ডিস্ট্রিবিউটেড হ্যাশ ম্যাপ। ইউজার সেশন, অথেনটিকেশন টোকেন ও পেজ ক্যাশ
            সাব-মিলি-সেকেন্ডে O(1) সময়ে ফেচ করা হয়।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-zinc-200">
            ২. ইমেইল ও ইউজারনেম ইউনিকনেস (Hash Set)
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            রেজিস্ট্রেশনের সময় ইমেইলটি আগে নেওয়া হয়েছে কিনা তা যাচাই করতে ডেটাবেস হ্যাশ সেট ব্যবহার করে
            O(1) সময়ে চেক করে।
          </p>
        </div>

        <div className="bg-[#0f111a] border border-[#1e2233] p-4 rounded-xl space-y-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-zinc-200">
            ৩. কম্পাইলার সিম্বল টেবিল (Symbol Table)
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            জাভাস্ক্রিপ্ট, পাইথন বা সি++ কম্পাইলার ভ্যারিয়েবল ও ফাংশনের নাম মেমরির হ্যাশ টেবিলে রেখে দ্রুত
            টাইপ ও স্কোপ চেক করে।
          </p>
        </div>
      </div>
    </div>
  );
}
