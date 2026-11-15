'use client';

import React from 'react';

interface BalancedTreeModelCardProps {
  activeModel: 'avl' | 'redblack';
}

export default function BalancedTreeModelCard({ activeModel }: BalancedTreeModelCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        activeModel === 'avl'
          ? 'bg-sky-950/20 border-sky-800/50 text-sky-200'
          : 'bg-rose-950/20 border-rose-800/50 text-rose-200'
      }`}
    >
      {activeModel === 'avl' ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-sky-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              AVL Tree এর মূল ধারণা ও বৈশিষ্ট্য
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-900/60 border border-sky-700 text-sky-300">
              Strictly Balanced
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            প্রতিটি নোডের <b>Balance Factor (BF)</b> = বাম সাব-ট্রির উচ্চতা − ডান সাব-ট্রির উচ্চতা। একটি
            ভ্যালিড AVL ট্রিতে BF সবসময় <b>-১, ০ অথবা +১</b> হতে হবে। কোনো ইনসার্টে উচ্চতার পার্থক্য ১-এর বেশি
            হলে সাথে সাথে ৪ ধরনের রোটেশন (<b>LL, RR, LR, RL</b>) ব্যবহার করে ট্রিকে ব্যালেন্স করা হয়। এটি ঘন
            ঘন <b>Search</b> করার জন্য সেরা।
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-rose-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              Red-Black Tree এর মূল ধারণা ও বৈশিষ্ট্য
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-900/60 border border-rose-700 text-rose-300">
              Color Invariant Balanced
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            প্রতিটি নোডের রঙ <b>লাল (Red)</b> অথবা <b>কালো (Black)</b> হয়। এর মূল শর্ত: রুট সবসময় কালো,
            পাশাপাশি দুটি লাল নোড থাকতে পারবে না, এবং রুট থেকে সব নাল (NIL) পাতার পথে কালো নোডের সংখ্যা সমান
            হবে। রোটেশনের চেয়ে দ্রুত কালার পরিবর্তনের (Recoloring) ওপর নির্ভর করায় এটি ঘন ঘন{' '}
            <b>Insert ও Delete</b>-এর জন্য সেরা (যেমন Java <code>TreeMap</code> ও Linux Kernel)।
          </p>
        </div>
      )}
    </div>
  );
}
