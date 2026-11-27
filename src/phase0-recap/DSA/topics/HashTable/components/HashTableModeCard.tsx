'use client';

import React from 'react';
import { TableMode } from '../types';
import { ArrowRight, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

interface HashTableModeCardProps {
  tableMode: TableMode;
}

export default function HashTableModeCard({ tableMode }: HashTableModeCardProps) {
  return (
    <div className="bg-[#090a10] border border-[#1d2238] p-3 rounded-xl flex items-start gap-3 transition-colors duration-300">
      {tableMode === 'chaining' && (
        <div className="flex items-start gap-2.5 text-xs text-zinc-300 w-full animate-in fade-in duration-300">
          <div className="w-6 h-6 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0 mt-0.5">
            <LinkIcon className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-pink-300 font-mono text-[11px]">
              Separate Chaining (লিংকড লিস্ট চেইনিং):
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              দুটি ভিন্ন কি (যেমন: <code className="text-pink-300">token</code> ও{' '}
              <code className="text-pink-300">admin</code>) একই বাকেট [0]-এ কলিশন ঘটালে সেখানে একটি{' '}
              <b>লিংকড লিস্ট চেইন</b> তৈরি হয়। সার্চের সময় হ্যাশ ফাংশন প্রথমে বাকেট [0]-এ যায়, তারপর
              চেইন ট্রাভার্স করে কাঙ্ক্ষিত নোডটি বের করে।
            </p>
          </div>
        </div>
      )}

      {tableMode === 'probing' && (
        <div className="flex items-start gap-2.5 text-xs text-zinc-300 w-full animate-in fade-in duration-300">
          <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-amber-300 font-mono text-[11px]">
              Linear Probing (ওপেন অ্যাড্রেসিং / পরবর্তী খালি ঘর):
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              এখানে কোনো লিংকড লিস্ট থাকে না। কাঙ্ক্ষিত বাকেটটি যদি অন্য ডেটা দিয়ে আগে থেকেই পূর্ণ থাকে,
              তবে পরবর্তী ক্রমান্বয়িক ইনডেক্স{' '}
              <code className="text-amber-300 font-mono">(Index + 1) % 7</code> স্ক্যান করে প্রথম যে
              খালি স্লটটি পাওয়া যায়, ডেটা সেখানেই বসে যায়।
            </p>
          </div>
        </div>
      )}

      {tableMode === 'set' && (
        <div className="flex items-start gap-2.5 text-xs text-zinc-300 w-full animate-in fade-in duration-300">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-emerald-300 font-mono text-[11px]">
              Hash Set (অনন্য কি কালেকশন):
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              হ্যাশ সেট কোনো Value রাখে না; এটি কেবল <b>ইউনিক বা অনন্য Key</b> জমা রাখে। নতুন কি দেওয়ার
              সাথে সাথে হ্যাশ ফাংশন দিয়ে <code className="text-emerald-300 font-mono">O(1)</code>{' '}
              সময়ে দেখা হয় এটি আগেই আছে কিনা—থাকলে ডুপ্লিকেট হিসেবে বাতিল করে দেয়।
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
