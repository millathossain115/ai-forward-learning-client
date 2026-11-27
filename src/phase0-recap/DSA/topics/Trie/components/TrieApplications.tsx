import React from 'react';
import { Search, Terminal, Cpu } from 'lucide-react';

export default function TrieApplications() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
        <Search className="w-5 h-5 text-fuchsia-400" />
        <h4 className="text-sm font-bold text-zinc-100">1. Search Engine Suggest (Google)</h4>
        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
          গুগলে যখনই একটি বর্ণ টাইপ করা হয়, ব্যাকগ্রাউন্ডে ট্রাই স্ট্রাকচার কোটি কোটি কুয়েরির মধ্য থেকে মাইক্রোসেকেন্ডে টপ ১০টি সাজেশন ফিরিয়ে দেয়।
        </p>
      </div>

      <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
        <Terminal className="w-5 h-5 text-violet-400" />
        <h4 className="text-sm font-bold text-zinc-100">2. LLM Tokenizer Vocabularies</h4>
        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
          ChatGPT ও Gemini-এর BPE (Byte-Pair Encoding) টোকেনাইজার ট্রাই ব্যবহার করে প্রম্পটের দীর্ঘতম সাব-ওয়ার্ড টোকেন দ্রুত খুঁজে বের করে।
        </p>
      </div>

      <div className="bg-[#0f111a] border border-[#1e2233] p-5 rounded-xl space-y-2">
        <Cpu className="w-5 h-5 text-emerald-400" />
        <h4 className="text-sm font-bold text-zinc-100">3. Network Router IP Lookup</h4>
        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
          ইন্টারনেট রাউটারগুলো আগত আইপি প্যাকেটকে রাউটিং টেবিলের সাথে মেলাতে Radix Tree (কম্প্রেসড ট্রাই) ব্যবহার করে সেকেন্ডে কোটি কোটি প্যাকেট ফরোয়ার্ড করে।
        </p>
      </div>
    </div>
  );
}
