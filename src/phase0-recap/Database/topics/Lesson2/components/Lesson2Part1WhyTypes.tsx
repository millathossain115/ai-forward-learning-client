'use client';

import React, { useState } from 'react';
import { Building2, GraduationCap, Share2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson2Part1WhyTypes() {
  const { language } = useLanguage();
  const [selectedOrg, setSelectedOrg] = useState<'university' | 'bank' | 'social'>('university');

  const orgs = [
    {
      id: 'university' as const,
      enTitle: '1. University',
      bnTitle: '১. বিশ্ববিদ্যালয় (University)',
      icon: GraduationCap,
      color: 'text-amber-400',
      borderActive: 'border-amber-500 bg-amber-500/10 text-amber-300',
      enSummary: 'Structured records: Students, Courses, Teachers, CGPA, Attendance.',
      bnSummary: 'সুসংগঠিত রেকর্ড: ছাত্রছাত্রী, কোর্স, শিক্ষক, সিজিপিএ, হাজিরা।',
    },
    {
      id: 'bank' as const,
      enTitle: '2. Commercial Bank',
      bnTitle: '২. বাণিজ্যিক ব্যাংক (Bank)',
      icon: Building2,
      color: 'text-emerald-400',
      borderActive: 'border-emerald-500 bg-emerald-500/10 text-emerald-300',
      enSummary: 'Strict ACID: Customer accounts, transactions, transfers, loans, audit logs.',
      bnSummary: 'কঠোর এসিড নীতি: গ্রাহক একাউন্ট, লেনদেন, ফান্ড ট্রান্সফার, ঋণ ও অডিট লগ।',
    },
    {
      id: 'social' as const,
      enTitle: '3. Social Media',
      bnTitle: '৩. সোশ্যাল মিডিয়া (FB / IG)',
      icon: Share2,
      color: 'text-cyan-400',
      borderActive: 'border-cyan-500 bg-cyan-500/10 text-cyan-300',
      enSummary: 'Unstructured & Graph: Posts, videos, stories, comments, likes, friend networks.',
      bnSummary: 'গ্রাফ ও পরিবর্তনশীল: পোস্ট, ভিডিও, কমেন্ট, লাইক ও বন্ধুদের আন্তঃসংযোগ নেটওয়ার্ক।',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ১ / ৫' : 'Part 1 of 5'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="Why do we have different types of databases?"
              bn="কেন বিভিন্ন ধরণের ডেটাবেসের প্রয়োজন হয়?"
            />
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Imagine three completely different organizations. Do all three need the exact same database structure?"
            bn="একটু ভেবে দেখুন—তিনটি ভিন্ন প্রতিষ্ঠানের ডেটা কি একই ধরণের? সবার কি একই মডেলের ডেটাবেস প্রয়োজন?"
          />
        </div>

        {/* 3 Organization Interactive Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {orgs.map((org) => {
            const Icon = org.icon;
            const isSelected = selectedOrg === org.id;

            return (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org.id)}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer space-y-2 ${
                  isSelected
                    ? org.borderActive
                    : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${org.color}`} />
                    {language === 'bn' ? org.bnTitle : org.enTitle}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
                </div>
                <p className="text-[11px] leading-snug">
                  {language === 'bn' ? org.bnSummary : org.enSummary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Insight based on selected Org */}
        <div className="p-5 rounded-2xl bg-[#14182e] border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>
              {language === 'bn' ? 'প্রয়োজনীয়তা ও বিশ্লেষণ: ' : 'Requirements Analysis for '}
            </span>
            <span className="text-indigo-300">
              {selectedOrg === 'university'
                ? (language === 'bn' ? 'বিশ্ববিদ্যালয় ম্যানেজমেন্ট (University)' : 'University Management')
                : selectedOrg === 'bank'
                ? (language === 'bn' ? 'ব্যাংকিং ও অর্থনৈতিক লেনদেন (Banking)' : 'Banking & Finance System')
                : (language === 'bn' ? 'সোশ্যাল মিডিয়া প্ল্যাটফর্ম (Social Network)' : 'Social Media Platform')}
            </span>
          </h4>

          {selectedOrg === 'university' && (
            <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <DualText
                en="A university deals primarily with structured tabular entities. Students enroll in courses, courses belong to departments, and teachers give letter grades. A Relational Database (SQL) is ideal because referential integrity (foreign keys) ensures an enrollment record cannot exist without a valid student."
                bn="বিশ্ববিদ্যালয়ের কার্যক্রম প্রধানত সুসংগঠিত টেবুলার ডেটার ওপর নির্ভরশীল। ছাত্রছাত্রী কোর্সে ভর্তি হয়, কোর্স কোনো ডিপার্টমেন্টের অধীনে থাকে, আর শিক্ষক গ্রেড প্রদান করেন। এখানে রিলেশনাল ডেটাবেস (SQL) সেরা, কারণ ফরেন কি (Foreign Key) নিশ্চিত করে যে কোনো বৈধ ছাত্র ছাড়া এনরোলমেন্ট তৈরি হতে পারবে না।"
              />
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-black/40 border border-amber-900/40 text-amber-300">
                  {language === 'bn' ? 'ফিক্সড স্কিমা (Fixed Schemas)' : 'Fixed Schemas'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-amber-900/40 text-amber-300">
                  {language === 'bn' ? 'ফরেন কি সম্পর্ক (Foreign Keys)' : 'Foreign Keys'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-amber-900/40 text-amber-300">
                  {language === 'bn' ? 'টেবুলার রিপোর্ট (Tabular Reports)' : 'Tabular Reports'}
                </span>
              </div>
            </div>
          )}

          {selectedOrg === 'bank' && (
            <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <DualText
                en="A bank requires absolute zero data loss and strict consistency (ACID). If $500 is debited from Rahim's account, it must instantly credit Karim's account or fail completely. Traditional relational systems (like PostgreSQL or Oracle) with Write-Ahead Logging (WAL) and Row-Level Locking guarantee that financial transactions are bulletproof."
                bn="ব্যাংকের ক্ষেত্রে শূন্য ডেটা লস এবং শতভাগ নির্ভুলতা (ACID নীতি) অপরিহার্য। রহিমের অ্যাকাউন্ট থেকে ৫০০ টাকা ডেবিট হলে তা করিমের অ্যাকাউন্টে সাথে সাথে জমা হতে হবে, অথবা লেনদেন বাতিল হয়ে পূর্বাবস্থায় ফিরতে হবে। PostgreSQL বা Oracle-এর মতো রিলেশনাল ইঞ্জিন ট্রানজ্যাকশনকে ত্রুটিমুক্ত রাখে।"
              />
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-black/40 border border-emerald-900/40 text-emerald-300">
                  {language === 'bn' ? 'এসিড নিশ্চয়তা (ACID Compliance)' : 'ACID Compliance'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-emerald-900/40 text-emerald-300">
                  {language === 'bn' ? 'অডিট ট্রেইল (Audit Trails)' : 'Audit Trails'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-emerald-900/40 text-emerald-300">
                  {language === 'bn' ? 'সর্বোচ্চ নির্ভরযোগ্যতা (High Reliability)' : 'High Reliability'}
                </span>
              </div>
            </div>
          )}

          {selectedOrg === 'social' && (
            <div className="text-xs text-zinc-300 space-y-2 leading-relaxed">
              <DualText
                en="A social media platform processes billions of likes, polymorphic posts (images, text, video streams), and friend recommendation paths across millions of users worldwide. A single relational table would crawl under this load! That is why social networks use Graph Databases (like Neo4j for friend connections), Document Databases (for flexible posts), and Key-Value Caches (like Redis for rapid feeds)."
                bn="সোশ্যাল মিডিয়া প্ল্যাটফর্মে কোটি কোটি ব্যবহারকারীর লাইক, ছবি, ভিডিও স্ট্রিম এবং ফ্রেন্ড রিকমেন্ডেশন নেটওয়ার্ক প্রসেস করতে হয়। রিলেশনাল টেবিল এখানে স্লো হয়ে পড়বে। তাই সোশ্যাল প্ল্যাটফর্ম ব্যবহার করে গ্রাফ ডেটাবেস (Neo4j - বন্ধুত্বের সম্পর্ক), ডকুমেন্ট ডেটাবেস (নমনীয় পোস্ট) এবং ইন-মেমোরি কি-ভ্যালু ক্যাশ (Redis - দ্রুতগতির ফিড)।"
              />
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded bg-black/40 border border-cyan-900/40 text-cyan-300">
                  {language === 'bn' ? 'গ্রাফ নেটওয়ার্ক (Graph Networks)' : 'Graph Networks'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-cyan-900/40 text-cyan-300">
                  {language === 'bn' ? 'পলিমরফিক JSON (Polymorphic JSON)' : 'Polymorphic JSON'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/40 border border-cyan-900/40 text-cyan-300">
                  {language === 'bn' ? 'মাইক্রোসেকেন্ড ক্যাশিং (In-Memory Feeds)' : 'Microsecond In-Memory Feeds'}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-xs text-indigo-300 leading-relaxed font-sans">
          <DualText
            en="Key Conclusion: Different applications have vastly different data requirements. There is no 'one-size-fits-all' database. That is why distinct Database Models were invented."
            bn="মূল উপলব্ধি: ভিন্ন ভিন্ন সফটওয়্যার অ্যাপ্লিকেশনের ডেটার ধরণ ও গতিবেগ সম্পূর্ণ ভিন্ন। সব কাজের জন্য একটিমাত্র ডেটাবেস যথেষ্ট নয়—আর এই কারণেই বিভিন্ন ডেটাবেস মডেল উদ্ভাবিত হয়েছে।"
          />
        </div>
      </div>
    </section>
  );
}
