import React from 'react';

export default function InsertionSortCodeView() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-[#0c101c] border border-[#253254] p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>TypeScript ইমপ্লিমেন্টেশন ও শিফট লুপ</span>
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          ইনসার্শন সর্টের মূল সৌন্দর্য হলো এটি সোয়াপ (Swap) করার বদলে উপাদানগুলোকে সরাসরি এক ঘর করে ডানে শিফট করে, যা মেমোরি অ্যাসাইনমেন্টের সংখ্যা অর্ধেক কমিয়ে দেয়।
        </p>
        <pre className="p-4 rounded-2xl bg-[#070914] border border-[#1d2742] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i]; // কার্ডটি তুলে নেওয়া হলো
    let j = i - 1;

    // কি-কার্ডের চেয়ে বড় উপাদানগুলোকে ডানে ১ ঘর শিফট করা
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // ফাঁকা হওয়া সঠিক পকেটে কি-কার্ডটি স্থাপন
    arr[j + 1] = key;
  }

  return arr;
}`}
        </pre>
      </div>
    </div>
  );
}
