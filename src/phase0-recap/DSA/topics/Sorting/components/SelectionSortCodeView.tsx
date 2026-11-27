import React from 'react';

export default function SelectionSortCodeView() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>TypeScript ইমপ্লিমেন্টেশন ও মিনিমাম ইনভ্যারিয়েন্ট</span>
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          প্রতিটি আউটার লুপ পাসে <code className="text-amber-400">minIdx</code> ট্র্যাক করা হয়। পুরো আন-সর্টেড অংশ স্ক্যান শেষ হওয়া মাত্র ১টি সিঙ্গেল সোয়াপের মাধ্যমে ক্ষুদ্রতম মানটি সঠিক জায়গায় বসে যায়।
        </p>
        <pre className="p-4 rounded-2xl bg-[#07060d] border border-[#221a38] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i; // শুরুতে বর্তমান পাসের প্রথম উপাদানকেই সর্বনিম্ন ধরা হয়

    // আন-সর্টেড অংশ স্ক্যান করে আসল সর্বনিম্ন উপাদানের ইনডেক্স খুঁজে বের করা
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j; // নতুন সর্বনিম্ন পেলে ট্র্যাকার আপডেট
      }
    }

    // পাসের শেষে মাত্র ১টি সোয়াপ (যদি ইতিমধ্যে সঠিক স্থানে না থাকে)
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }

  return arr;
}`}
        </pre>
      </div>
    </div>
  );
}
