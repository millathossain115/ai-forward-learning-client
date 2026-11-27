import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function RotationGuide() {
  return (
    <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold border border-sky-500/20">
          <RefreshCw className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-zinc-100">
            টেস্ট রোটেশন (Test Rotations) কী এবং ৪টি রোটেশন কীভাবে কাজ করে?
          </h3>
          <span className="text-xs font-mono text-zinc-400">
            রোটেশন গাইডলাইন • ইচ্ছাকৃত আনব্যালেন্সড অবস্থা থেকে অটো-ব্যালেন্সিং পর্যবেক্ষণ
          </span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
        বাস্তব সফটওয়্যারে ডেটা ইনসার্ট করার সাথে সাথে ব্যাকগ্রাউন্ড অ্যালগরিদম চোখের পলকে ট্রি রোটেশন চালিয়ে দেয়। কিন্তু একজন শিক্ষার্থী যাতে নিজের চোখে দেখতে পারেন যে ঠিক কী কারণে ট্রি আনব্যালেন্সড হয় এবং কোন রোটেশনে কীভাবে তা আবার ব্যালেন্সড হয়—সেজন্যই সিমুলেটরে <b>Test Rotations (LL, RR, LR, RL)</b> বাটনগুলো দেওয়া হয়েছে।
      </p>

      {/* 4 Rotation Detailed Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* 1. LL Rotation */}
        <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-sky-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              ১. LL (Left-Left) ➔ Right Rotation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
              Single Rotate
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            <b>কখন ঘটে:</b> যখন বাম সাব-ট্রির বাম দিকে অতিরিক্ত নোড যুক্ত হয়ে ট্রি বাঁকা হয়ে বাঁয়ে হেভি হয়ে পড়ে (যেমন: ৩০ ➔ ২০ ➔ ১০)।
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
            <strong className="text-sky-300">সমাধান:</strong> রুট নোডকে ডান দিকে (ঘড়ির কাঁটার দিকে) ঘোরানো হয় (Right Rotate)। মাঝের নোডটি (২০) নতুন রুট হয়ে যায়।
          </p>
        </div>

        {/* 2. RR Rotation */}
        <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-indigo-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              ২. RR (Right-Right) ➔ Left Rotation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
              Single Rotate
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            <b>কখন ঘটে:</b> যখন ডান সাব-ট্রির ডান দিকে অতিরিক্ত নোড ঢুকে সোজা লিংকড লিস্টের মতো ডানে হেলে পড়ে (যেমন: ১০ ➔ ২০ ➔ ৩০)।
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
            <strong className="text-indigo-300">সমাধান:</strong> রুট নোডকে বাম দিকে (ঘড়ির কাঁটার বিপরীতে) ঘোরানো হয় (Left Rotate)। মাঝের নোডটি (২০) নতুন রুট হয়।
          </p>
        </div>

        {/* 3. LR Rotation */}
        <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ৩. LR (Left-Right) ➔ Double Rotation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Double Rotate
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            <b>কখন ঘটে:</b> বাম শাখার ডান দিকে নোড যোগ হয়ে একটি আঁকাবাঁকা (Zig-Zag) আকার নেয় (যেমন: ৩০ ➔ ১০ ➔ ২০)।
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
            <strong className="text-emerald-300">সমাধান:</strong> প্রথমে বামের চাইল্ডে Left Rotate করে সোজা করা হয়, এরপর মূল রুটে Right Rotate করা হয়।
          </p>
        </div>

        {/* 4. RL Rotation */}
        <div className="bg-[#141624]/70 border border-[#202538] rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-amber-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              ৪. RL (Right-Left) ➔ Double Rotation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Double Rotate
            </span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            <b>কখন ঘটে:</b> ডান শাখার বাম দিকে নোড যোগ হয়ে উল্টো জিগ-জ্যাগ আকার নেয় (যেমন: ১০ ➔ ৩০ ➔ ২০)।
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono bg-[#090a10] p-2.5 rounded-lg border border-[#1a1c29]">
            <strong className="text-amber-300">সমাধান:</strong> প্রথমে ডানের চাইল্ডে Right Rotate করে সোজা করা হয়, এরপর মূল রুটে Left Rotate করা হয়।
          </p>
        </div>
      </div>
    </div>
  );
}
