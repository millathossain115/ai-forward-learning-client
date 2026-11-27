'use client';

import React from 'react';

export default function QuickSortCodeView() {
  return (
    <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-5 shadow-xl space-y-3">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <span>TypeScript লোমুটো পার্টিশন (Lomuto Partition) কোড</span>
      </h3>
      <pre className="p-3.5 rounded-xl bg-[#04070c] border border-[#142130] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function quickSort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);  // বাম পাশ সর্ট
    quickSort(arr, pivotIdx + 1, high); // ডান পাশ সর্ট
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // শেষ উপাদান পিভট
  let i = low - 1; // ছোট উপাদানের সীমানা

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`}
      </pre>
    </div>
  );
}
