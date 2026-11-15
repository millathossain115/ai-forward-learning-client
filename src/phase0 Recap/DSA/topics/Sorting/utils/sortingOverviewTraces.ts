import { BubbleStep, SelectionStep, InsertionStep, MergeStep, QuickStep } from '../types';

export const BUBBLE_TRACE: BubbleStep[] = [
  { arr: [45, 12, 85, 32, 21], pair: [0, 1], swapped: false, sorted: [], desc: 'শুরু: ইনডেক্স ০ (৪৫) ও ১ (১২) তুলনা হচ্ছে। ৪৫ > ১২, তাই অদলবদল (Swap) প্রয়োজন।' },
  { arr: [12, 45, 85, 32, 21], pair: [0, 1], swapped: true, sorted: [], desc: 'অদলবদল সম্পন্ন: ১২ আগে এল এবং ৪৫ ডানে সরে গেল।' },
  { arr: [12, 45, 85, 32, 21], pair: [1, 2], swapped: false, sorted: [], desc: 'তুলনা: ইনডেক্স ১ (৪৫) ও ২ (৮৫)। ৪৫ < ৮৫, কোনো সোয়াপ দরকার নেই।' },
  { arr: [12, 45, 85, 32, 21], pair: [2, 3], swapped: false, sorted: [], desc: 'তুলনা: ইনডেক্স ২ (৮৫) ও ৩ (৩২)। ৮৫ > ৩২, অদলবদল করা হচ্ছে।' },
  { arr: [12, 45, 32, 85, 21], pair: [2, 3], swapped: true, sorted: [], desc: 'অদলবদল সম্পন্ন: ৮৫ ডানে এক ধাপ এগুলো।' },
  { arr: [12, 45, 32, 85, 21], pair: [3, 4], swapped: false, sorted: [], desc: 'তুলনা: ইনডেক্স ৩ (৮৫) ও ৪ (২১)। ৮৫ > ২১, অদলবদল করা হচ্ছে।' },
  { arr: [12, 45, 32, 21, 85], pair: [3, 4], swapped: true, sorted: [4], desc: 'পাস ১ শেষ: সর্বোচ্চ মান ৮৫ বুদবুদের মতো সবার শেষে (ইনডেক্স ৪) স্থায়ীভাবে বসে গেল!' },
  { arr: [12, 45, 32, 21, 85], pair: [1, 2], swapped: false, sorted: [4], desc: 'পাস ২: ৪৫ ও ৩২ তুলনা। ৪৫ > ৩২, অদলবদল হবে।' },
  { arr: [12, 32, 45, 21, 85], pair: [1, 2], swapped: true, sorted: [4], desc: 'অদলবদল সম্পন্ন।' },
  { arr: [12, 32, 45, 21, 85], pair: [2, 3], swapped: false, sorted: [4], desc: 'তুলনা: ৪৫ ও ২১। ৪৫ > ২১, অদলবদল হবে।' },
  { arr: [12, 32, 21, 45, 85], pair: [2, 3], swapped: true, sorted: [3, 4], desc: 'পাস ২ শেষ: দ্বিতীয় সর্বোচ্চ মান ৪৫ তার সঠিক স্থানে স্থির হলো।' },
  { arr: [12, 21, 32, 45, 85], pair: [], swapped: false, sorted: [0, 1, 2, 3, 4], desc: '🎉 বাবল সর্ট সম্পন্ন: সম্পূর্ণ অ্যারে আরোহী ক্রমানুসারে সাজানো হয়েছে!' }
];

export const SELECTION_TRACE: SelectionStep[] = [
  { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 0, minIdx: 0, desc: 'পাস ১ শুরু: সর্বনিম্ন মান খোঁজার জন্য ইনডেক্স ০ (৬৪)-কে প্রাথমিক সর্বনিম্ন ধরা হলো।' },
  { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 1, minIdx: 1, desc: 'স্ক্যান: ২৫ < ৬৪, তাই বর্তমান সর্বনিম্ন মান ২৫ (ইনডেক্স ১)।' },
  { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 2, minIdx: 2, desc: 'স্ক্যান: ১২ < ২৫, নতুন সর্বনিম্ন মান ১২ (ইনডেক্স ২)।' },
  { arr: [64, 25, 12, 22, 11], sortedUntil: -1, scanIdx: 4, minIdx: 4, desc: 'স্ক্যান: ১১ < ১২, চূড়ান্ত সর্বনিম্ন মান ১১ (ইনডেক্স ৪)।' },
  { arr: [11, 25, 12, 22, 64], sortedUntil: 0, scanIdx: -1, minIdx: 0, desc: 'সোয়াপ: সর্বনিম্ন মান ১১-কে শুরুতে (ইনডেক্স ০) আনা হলো। ইনডেক্স ০ এখন সাজানো জোন।' },
  { arr: [11, 25, 12, 22, 64], sortedUntil: 0, scanIdx: 2, minIdx: 2, desc: 'পাস ২ শুরু: অগোছালো অংশের সর্বনিম্ন মান ১২ (ইনডেক্স ২) শনাক্ত হলো।' },
  { arr: [11, 12, 25, 22, 64], sortedUntil: 1, scanIdx: -1, minIdx: 1, desc: 'সোয়াপ: ১২-কে ইনডেক্স ১-এ আনা হলো। সাজানো জোন সম্প্রসারিত হলো।' },
  { arr: [11, 12, 22, 25, 64], sortedUntil: 2, scanIdx: -1, minIdx: 2, desc: 'পাস ৩: পরবর্তী সর্বনিম্ন ২২-কে ইনডেক্স ২-এ স্থান দেওয়া হলো।' },
  { arr: [11, 12, 22, 25, 64], sortedUntil: 4, scanIdx: -1, minIdx: 4, desc: '🎉 সিলেকশন সর্ট সম্পন্ন: সর্বনিম্ন মানগুলো ক্রমান্বয়ে সাজানো হয়েছে!' }
];

export const INSERTION_TRACE: InsertionStep[] = [
  { arr: [31, 41, 59, 26, 41], sortedCount: 1, handKey: null, shiftIdx: -1, desc: 'শুরু: প্রথম কার্ড ৩১ নিজের অবস্থানে সাজানো আছে। ইনডেক্স ১ থেকে কাজ শুরু হবে।' },
  { arr: [31, 41, 59, 26, 41], sortedCount: 2, handKey: 41, shiftIdx: -1, desc: 'হাতে নেওয়া কার্ড Key = ৪১। ৩১ < ৪১, তাই ৪১ তার নিজের অবস্থানেই থাকবে।' },
  { arr: [31, 41, 59, 26, 41], sortedCount: 3, handKey: 59, shiftIdx: -1, desc: 'হাতে নেওয়া কার্ড Key = ৫৯। পূর্বের সব কার্ড ছোট, তাই ৫৯ ওখানেই স্থির থাকবে।' },
  { arr: [31, 41, 59, null, 41], sortedCount: 3, handKey: 26, shiftIdx: 2, desc: 'হাতে নেওয়া কার্ড Key = ২৬। পূর্বের কার্ড ৫৯ > ২৬, তাই ৫৯-কে এক ঘর ডানে সরানো হলো।' },
  { arr: [31, null, 41, 59, 41], sortedCount: 3, handKey: 26, shiftIdx: 1, desc: '৪১ > ২৬, তাই ৪১-কেও এক ঘর ডানে সরানো হলো।' },
  { arr: [null, 31, 41, 59, 41], sortedCount: 3, handKey: 26, shiftIdx: 0, desc: '৩১ > ২৬, ৩১-কেও এক ঘর ডানে শিফট করা হলো। শুরুর স্লটটি এখন খালি!' },
  { arr: [26, 31, 41, 59, 41], sortedCount: 4, handKey: null, shiftIdx: -1, desc: 'পকেট ইনসার্ট: খালি স্লটে ২৬ বসিয়ে দেওয়া হলো!' },
  { arr: [26, 31, 41, 41, 59], sortedCount: 5, handKey: null, shiftIdx: -1, desc: '🎉 ইনসার্শন সর্ট সম্পন্ন: তাসের মতো প্রতিটি মান নিজের সঠিক পকেটে বসেছে!' }
];

export const MERGE_TRACE: MergeStep[] = [
  {
    level: 0,
    state: 'initial',
    layers: {
      root: [38, 27, 43, 3],
      leftSplit: null,
      rightSplit: null,
      singletons: null,
      mergedHalves: null,
      final: null
    },
    desc: 'ধাপ ১ (মূল অ্যারে): [৩৮, ২৭, ৪৩, ৩] কে দুটি সমান ভাগে বিভক্ত করার পরিকল্পনা।'
  },
  {
    level: 1,
    state: 'split_1',
    layers: {
      root: [38, 27, 43, 3],
      leftSplit: [38, 27],
      rightSplit: [43, 3],
      singletons: null,
      mergedHalves: null,
      final: null
    },
    desc: 'ধাপ ২ (Divide): বাম খণ্ড [৩৮, ২৭] এবং ডান খণ্ড [৪৩, ৩] এ বিভক্ত করা হলো।'
  },
  {
    level: 2,
    state: 'split_2',
    layers: {
      root: [38, 27, 43, 3],
      leftSplit: [38, 27],
      rightSplit: [43, 3],
      singletons: [[38], [27], [43], [3]],
      mergedHalves: null,
      final: null
    },
    desc: 'ধাপ ৩ (Base Case): প্রতিটি উপাদান একক সংখ্যায় নেমে এসেছে: [৩৮], [২৭], [৪৩], [৩]। প্রতিটি একক উপাদান সর্টেড।'
  },
  {
    level: 3,
    state: 'merge_small',
    layers: {
      root: [38, 27, 43, 3],
      leftSplit: [27, 38],
      rightSplit: [3, 43],
      singletons: [[38], [27], [43], [3]],
      mergedHalves: [[27, 38], [3, 43]],
      final: null
    },
    desc: 'ধাপ ৪ (Conquer - প্রথম মার্জ): [৩৮] ও [২৭] মার্জ হয়ে হলো [২৭, ৩৮]; আর [৪৩] ও [৩] মার্জ হয়ে হলো [৩, ৪৩]।'
  },
  {
    level: 4,
    state: 'merge_final',
    layers: {
      root: [3, 27, 38, 43],
      leftSplit: [27, 38],
      rightSplit: [3, 43],
      singletons: null,
      mergedHalves: [[27, 38], [3, 43]],
      final: [3, 27, 38, 43]
    },
    desc: 'ধাপ ৫ (চূড়ান্ত মার্জ): দুই খণ্ড [২৭, ৩৮] এবং [৩, ৪৩] এর মধ্যে জিপার মার্জ চালিয়ে চূড়ান্ত সর্টেড অ্যারে [৩, ২৭, ৩৮, ৪৩] তৈরি হলো!'
  }
];

export const QUICK_TRACE: QuickStep[] = [
  {
    arr: [38, 82, 10, 43, 27],
    pivotIdx: 4,
    pivotVal: 27,
    leftZone: [],
    rightZone: [],
    desc: 'ধাপ ১ (পিভট নির্বাচন): শেষ উপাদান ২৭-কে পিভট নির্ধারণ করা হলো। লক্ষ্য: ২৭-এর চেয়ে ছোটগুলো বামে, বড়গুলো ডানে যাবে।'
  },
  {
    arr: [38, 82, 10, 43, 27],
    pivotIdx: 4,
    pivotVal: 27,
    comparingIdx: 0,
    leftZone: [],
    rightZone: [38],
    desc: 'উপাদান ৩৮ > ২৭, তাই ৩৮ বড়দের জোন (Right Zone)-এ যাবে।'
  },
  {
    arr: [38, 82, 10, 43, 27],
    pivotIdx: 4,
    pivotVal: 27,
    comparingIdx: 1,
    leftZone: [],
    rightZone: [38, 82],
    desc: 'উপাদান ৮২ > ২৭, ৮২-ও বড়দের জোন (Right Zone)-এ যাবে।'
  },
  {
    arr: [10, 82, 38, 43, 27],
    pivotIdx: 4,
    pivotVal: 27,
    comparingIdx: 2,
    leftZone: [10],
    rightZone: [38, 82],
    desc: 'উপাদান ১০ < ২৭, তাই ১০-কে ছোটদের জোন (Left Zone)-এ সোয়াপ করে সামনে আনা হলো!'
  },
  {
    arr: [10, 82, 38, 43, 27],
    pivotIdx: 4,
    pivotVal: 27,
    comparingIdx: 3,
    leftZone: [10],
    rightZone: [38, 82, 43],
    desc: 'উপাদান ৪৩ > ২৭, এটিও বড়দের জোন (Right Zone)-এ থাকবে।'
  },
  {
    arr: [10, 27, 38, 43, 82],
    pivotIdx: 1,
    pivotVal: 27,
    leftZone: [10],
    rightZone: [38, 43, 82],
    placed: true,
    desc: 'ধাপ ২ (পিভট স্থাপন): পিভট ২৭-কে দুই জোনের ঠিক মাঝখানে (ইনডেক্স ১) স্থায়ী করা হলো! বামে শুধুই ছোট [১০], ডানে শুধুই বড় [৩৮, ৪৩, ৮২]।'
  },
  {
    arr: [10, 27, 38, 43, 82],
    pivotIdx: -1,
    pivotVal: -1,
    leftZone: [10],
    rightZone: [38, 43, 82],
    placed: true,
    desc: 'ধাপ ৩: উভয় পাশে রিকার্সিভ পার্টিশন চালিয়ে সম্পূর্ণ অ্যারে সর্টেড: [১০, ২৭, ৩৮, ৪৩, ৮২]!'
  }
];
