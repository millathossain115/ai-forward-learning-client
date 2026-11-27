'use client';

import React from 'react';

export default function MergeSortCodeView() {
  return (
    <div className="rounded-2xl bg-[#080d14] border border-[#182838] p-5 space-y-3">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <span>TypeScript রিকার্সিভ মার্জ সর্ট ইমপ্লিমেন্টেশন</span>
      </h3>
      <pre className="p-3.5 rounded-xl bg-[#04070c] border border-[#142130] text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{`function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // ১ উপাদান মানেই সর্টেড

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}`}
      </pre>
    </div>
  );
}
