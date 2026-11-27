import React from 'react';

export default function BubbleSortCodeView() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-[#0e0c18] border border-[#2b2144] p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>TypeScript / JavaScript অপ্টিমাইজড ইমপ্লিমেন্টেশন</span>
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          স্বাভাবিক বাবল সর্টে কোনো উপাদান সর্টেড থাকলেও পুরো লুপ সম্পন্ন করে $O(N^2)$ সময় নেয়। কিন্তু <code className="text-fuchsia-400">swapped</code> ফ্ল্যাগ ব্যবহারের মাধ্যমে অ্যারেটি আগেই সর্টেড থাকলে মাত্র ১টি পাসেই $O(N)$ সময়ে অ্যালগরিদম শেষ হতে পারে।
        </p>
        <pre className="p-4 rounded-2xl bg-[#07060d] border border-[#221a38] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function bubbleSortOptimized(arr: number[]): number[] {
  const n = arr.length;
  let swapped: boolean;

  for (let i = 0; i < n - 1; i++) {
    swapped = false; // প্রতিটি পাসের শুরুতে ফ্ল্যাগ রিসেট

    // শেষ i-সংখ্যক উপাদান ইতিমধ্যে তার চূড়ান্ত সঠিক জায়গায় বসে গেছে
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // পাশাপাশি দুটি উপাদান অদলবদল (Swap)
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // যদি পুরো পাসে কোনো সোয়াপ না ঘটে, অ্যারে ইতিমধ্যে সর্টেড (Best Case O(N))
    if (!swapped) break;
  }

  return arr;
}`}
        </pre>
      </div>
    </div>
  );
}
