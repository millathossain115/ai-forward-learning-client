export type AlgoKey = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

export interface AlgoMeta {
  id: AlgoKey;
  name: string;
  category: 'ছোট ডেটা (Small Data O(N²))' | 'বড় ডেটা (Divide & Conquer O(N log N))';
  badge: string;
  badgeType: 'amber' | 'sky';
  timeComplexity: string;
  spaceComplexity: string;
  analogy: string;
  mechanic: string;
}

export const ALGOS: AlgoMeta[] = [
  {
    id: 'bubble',
    name: '১. বাবল সর্ট (Bubble Sort)',
    category: 'ছোট ডেটা (Small Data O(N²))',
    badge: 'বড় মান বুদবুদের মতো ডানে ভাসানো',
    badgeType: 'amber',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    analogy: 'পানির নিচের ভারী বুদবুদ যেমন ভাসতে ভাসতে উপরে ওঠে, তেমনি বড় সংখ্যাগুলো ধাপে ধাপে ডানে সরে যায়।',
    mechanic: 'পাশাপাশি দুটি স্লট তুলনা করা হয়; বামের মান বড় হলে তাদের অদলবদল (Swap) ঘটে।'
  },
  {
    id: 'selection',
    name: '২. সিলেকশন সর্ট (Selection Sort)',
    category: 'ছোট ডেটা (Small Data O(N²))',
    badge: 'সর্বনিম্ন মান খুঁজে সামনে আনা',
    badgeType: 'amber',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    analogy: 'এলোমেলো ফলের স্তূপ থেকে প্রতিবার সবচেয়ে ছোট ফলটি বেছে নিয়ে সারির শুরুতে রাখা।',
    mechanic: 'অ্যারের সাজানো অংশ (বাম) ও অগোছালো অংশ (ডান) থাকে। অগোছালো অংশের সর্বনিম্ন মানটি বেছে এনে বামে বসানো হয়।'
  },
  {
    id: 'insertion',
    name: '৩. ইনসার্শন সর্ট (Insertion Sort)',
    category: 'ছোট ডেটা (Small Data O(N²))',
    badge: 'তাসের মতো সঠিক স্লটে ইনসার্ট',
    badgeType: 'amber',
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1)',
    analogy: 'হাতের তাসের খেলায় নতুন কার্ড এলে আগের সাজানো কার্ডগুলোর মাঝে সঠিক জায়গায় ঢুকিয়ে দেওয়া।',
    mechanic: 'একটি করে উপাদান হাতে তুলে (Key) নেওয়া হয় এবং আগের সাজানো উপাদানগুলোকে ডানে সরিয়ে সঠিক পকেটে বসানো হয়।'
  },
  {
    id: 'merge',
    name: '৪. মার্জ সর্ট (Merge Sort)',
    category: 'বড় ডেটা (Divide & Conquer O(N log N))',
    badge: 'বিভক্ত ট্রি ও জিপার মার্জিং',
    badgeType: 'sky',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    analogy: 'একটি বড় বইয়ের পৃষ্ঠাগুলোকে দুই ভাগে ভাগ করে সাজানো এবং পরে দুই স্তূপ থেকে ছোট ছোট করে একত্র করা।',
    mechanic: 'অ্যারেকে অর্ধেক করে ভেঙে একক উপাদানে নামিয়ে আনা হয়, তারপর দুটি করে সাজানো খণ্ড একত্রে মার্জ করা হয়।'
  },
  {
    id: 'quick',
    name: '৫. কুইক সর্ট (Quick Sort)',
    category: 'বড় ডেটা (Divide & Conquer O(N log N))',
    badge: 'পিভট পার্টিশন (ছোট বামে, বড় ডানে)',
    badgeType: 'sky',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(log N)',
    analogy: 'শ্রেণীকক্ষে একজন ছাত্রকে কেন্দ্রবিন্দু (Pivot) ধরে তার চেয়ে খাটোদের বামে ও লম্বা-দের ডানে ভাগ করা।',
    mechanic: 'পিভট নির্বাচন করে বাকিদের দুটি জোনে (ছোট জোন ও বড় জোন) ভাগ করা হয় এবং মাঝে পিভটটি স্থায়ী করা হয়।'
  }
];

export interface BubbleStep {
  arr: number[];
  pair: number[];
  swapped: boolean;
  sorted: number[];
  desc: string;
}

export interface SelectionStep {
  arr: number[];
  sortedUntil: number;
  scanIdx: number;
  minIdx: number;
  desc: string;
}

export interface InsertionStep {
  arr: (number | null)[];
  sortedCount: number;
  handKey: number | null;
  shiftIdx: number;
  desc: string;
}

export interface MergeStepLayers {
  root: number[];
  leftSplit: number[] | null;
  rightSplit: number[] | null;
  singletons: number[][] | null;
  mergedHalves: number[][] | null;
  final: number[] | null;
}

export interface MergeStep {
  level: number;
  state: string;
  layers: MergeStepLayers;
  desc: string;
}

export interface QuickStep {
  arr: number[];
  pivotIdx: number;
  pivotVal: number;
  comparingIdx?: number;
  leftZone: number[];
  rightZone: number[];
  placed?: boolean;
  desc: string;
}
