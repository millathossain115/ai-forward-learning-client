import React from 'react';
import { Binary, Workflow, Network, Search } from 'lucide-react';

export interface ComplexityMetric {
  name: string;
  category: string;
  access: { val: string; cost: number; desc: string };
  search: { val: string; cost: number; desc: string };
  insert: { val: string; cost: number; desc: string };
  delete: { val: string; cost: number; desc: string };
  space: { val: string; cost: number; desc: string };
  cacheLocality: 'উচ্চ (High)' | 'কম (Low)' | 'মাঝারি (Medium)';
}

export const COMPLEXITY_DATA: ComplexityMetric[] = [
  {
    name: 'Array',
    category: 'লিনিয়ার ও একটানা মেমরি',
    access: { val: 'O(1)', cost: 1, desc: 'সরাসরি ইনডেক্স ধরে মুহূর্তেই ডেটা রিড করা যায়' },
    search: { val: 'O(N)', cost: 3, desc: 'সর্ট করা না থাকলে পুরো অ্যারে ঘুরে খুঁজতে হয়' },
    insert: { val: 'O(N)', cost: 3, desc: 'মাঝখানে ইনসার্ট করলে পরের সব উপাদানকে এক ঘর শিফট করতে হয়' },
    delete: { val: 'O(N)', cost: 3, desc: 'ডিলিটের পর মেমরির খালি জায়গা পূরণ করতে শিফটিং লাগে' },
    space: { val: 'O(N)', cost: 1, desc: 'অতিরিক্ত কোনো পয়েন্টার ওভারহেড নেই, নিখুঁত মেমরি ব্যবহার' },
    cacheLocality: 'উচ্চ (High)',
  },
  {
    name: 'Linked List',
    category: 'পয়েন্টার চেইন',
    access: { val: 'O(N)', cost: 3, desc: 'হেড থেকে পয়েন্টার ধরে নোড বাই নোড এগিয়ে যেতে হয়' },
    search: { val: 'O(N)', cost: 3, desc: 'নির্দিষ্ট মান খুঁজতে পুরো লিস্ট ট্রাভার্স করতে হয়' },
    insert: { val: 'O(1)', cost: 1, desc: 'পয়েন্টার জানা থাকলে কোনো শিফটিং ছাড়া সাথে সাথে যুক্ত করা যায়' },
    delete: { val: 'O(1)', cost: 1, desc: 'শুধু পয়েন্টারের লিংক পরিবর্তন করলেই নোড মুছে যায়' },
    space: { val: 'O(N) + Overheads', cost: 3, desc: 'প্রতিটি নোডে মূল ডেটার পাশাপাশি নেক্সট পয়েন্টারের অতিরিক্ত মেমরি লাগে' },
    cacheLocality: 'কম (Low)',
  },
  {
    name: 'Hash Table',
    category: 'কী-ভ্যালু বাকেট',
    access: { val: 'N/A', cost: 0, desc: 'ইনডেক্স দিয়ে সরাসরি এক্সেস প্রযোজ্য নয়, শুধু কী (Key)' },
    search: { val: 'O(1)', cost: 1, desc: 'হ্যাশ ফাংশন দিয়ে সরাসরি সঠিক বাকেটে পৌঁছে ডেটা বের করা হয়' },
    insert: { val: 'O(1)', cost: 1, desc: 'কী হ্যাশ করে সাথে সাথে বাকেটে নতুন মান রাখা যায়' },
    delete: { val: 'O(1)', cost: 1, desc: 'কী দিয়ে বাকেট চিহ্নিত করে তাৎক্ষণিক ডিলিট' },
    space: { val: 'O(N) + Padding', cost: 3, desc: 'কলিশন এড়াতে বেশ কিছু খালি বাকেট ব্যাকআপ রাখতে হয়' },
    cacheLocality: 'মাঝারি (Medium)',
  },
  {
    name: 'Balanced BST (AVL / RB)',
    category: 'স্বয়ংক্রিয় ব্যালেন্সড ট্রি',
    access: { val: 'N/A', cost: 0, desc: 'ট্রি ডিরেক্ট ইনডেক্সিং সাপোর্ট করে না' },
    search: { val: 'O(log N)', cost: 2, desc: 'প্রতি ধাপে সার্চের পরিধি অর্ধেক হয়ে যায়, ফলে খুব দ্রুত খোঁজা যায়' },
    insert: { val: 'O(log N)', cost: 2, desc: 'ইনসার্ট করার পর প্রয়োজনে স্বয়ংক্রিয় রোটেশন দিয়ে ব্যালেন্স রাখে' },
    delete: { val: 'O(log N)', cost: 2, desc: 'ডিলিটের পর ট্রি ব্যালেন্সড অবস্থায় ফিরিয়ে আনা হয়' },
    space: { val: 'O(N)', cost: 2, desc: 'প্রতিটি নোডে Left, Right পয়েন্টার ও হাইট ডেটা সংরক্ষণ করতে হয়' },
    cacheLocality: 'কম (Low)',
  },
  {
    name: 'Trie',
    category: 'প্রিফিক্স ট্রি',
    access: { val: 'N/A', cost: 0, desc: 'অক্ষরের পাথ ধরে ট্রাভার্স করতে হয়' },
    search: { val: 'O(L)', cost: 1, desc: 'L = শব্দের দৈর্ঘ্য; ডেটাবেজে কোটি কোটি শব্দ থাকলেও সার্চ স্পিড কমে না' },
    insert: { val: 'O(L)', cost: 1, desc: 'অক্ষর ধরে নতুন শাখা তৈরি বা রিইউজ করা হয়' },
    delete: { val: 'O(L)', cost: 1, desc: 'শব্দের শেষ ফ্ল্যাগ রিমুভ বা অব্যবহৃত শাখা মুছে ফেলা হয়' },
    space: { val: 'O(Σ * L * N)', cost: 4, desc: 'শব্দের সংখ্যা ও অক্ষরের ভ্যারিয়েশন বাড়লে মেমরির বিস্তার বাড়ে' },
    cacheLocality: 'কম (Low)',
  },
  {
    name: 'Binary Heap (PQ)',
    category: 'প্রায়োরিটি ট্রি',
    access: { val: 'O(1) peek', cost: 1, desc: 'সবচেয়ে গুরুত্বপূর্ণ (সর্বোচ্চ বা সর্বনিম্ন) মান সব সময় শীর্ষে থাকে' },
    search: { val: 'O(N)', cost: 3, desc: 'হিপ শুধুমাত্র প্রায়োরিটি মেইনটেইন করে, সাধারণ সার্চের জন্য নয়' },
    insert: { val: 'O(log N)', cost: 2, desc: 'শেষে যোগ করে Sift-Up করে সঠিক অবস্থানে বসানো হয়' },
    delete: { val: 'O(log N)', cost: 2, desc: 'শীর্ষ নোড ডিলিট করে শেষ নোড এনে Sift-Down করা হয়' },
    space: { val: 'O(N)', cost: 1, desc: 'সম্পূর্ণ ট্রি একটি সাধারণ অ্যারেই মেমরি অপটিমাইজডভাবে রাখা যায়' },
    cacheLocality: 'উচ্চ (High)',
  },
];

export interface DomainCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  primaryDS: string;
  secondaryDS: string;
  bestFor: string;
  tradeoff: string;
  visualType: 'grid' | 'pipeline' | 'tree' | 'trie_graph';
}

export const DOMAINS: DomainCard[] = [
  {
    id: 'direct-access',
    title: 'তাৎক্ষণিক এক্সেস ও মেমরি স্পিড',
    subtitle: 'ইনডেক্স ধরে দ্রুত রিড ও কী-ভ্যালু সার্চ',
    icon: Binary,
    primaryDS: 'Array (অ্যারে)',
    secondaryDS: 'Hash Table (হ্যাশ টেবিল)',
    bestFor: 'নির্দিষ্ট ইনডেক্স ধরে সাথে সাথে মান পড়তে এবং আইডি বা নাম দিয়ে চোখের পলকে ডেটা খুঁজে পেতে।',
    tradeoff: 'অ্যারের সাইজ ফিক্সড এবং এলিমেন্ট শিফট করা ব্যয়বহুল; হ্যাশ টেবিলে অতিরিক্ত খালি বাকেট মেমরি লাগে।',
    visualType: 'grid',
  },
  {
    id: 'ordered-stream',
    title: 'ধারাবাহিক প্রসেসিং ও বাফার',
    subtitle: 'কাজের ক্রম ও সারিবদ্ধ শিডিউলিং',
    icon: Workflow,
    primaryDS: 'Stack (LIFO)',
    secondaryDS: 'Queue (FIFO)',
    bestFor: 'আন্ডু/রিডু হিস্ট্রি, ফাংশন কল ফ্রেম (Stack) এবং ওয়েব সার্ভারের রিকোয়েস্ট কিউ বা প্রিন্টার লাইন (Queue)।',
    tradeoff: 'মাঝখানের উপাদান সরাসরি পড়া যায় না; কেবল প্রান্ত দিয়ে ডেটা প্রবেশ ও বের করা যায়।',
    visualType: 'pipeline',
  },
  {
    id: 'hierarchical',
    title: 'ক্রমবিন্যাস ও সাজানো ডেটা',
    subtitle: 'হায়ারার্কি, রেঞ্জ সার্চ ও অগ্রাধিকার',
    icon: Network,
    primaryDS: 'Balanced BST (AVL / RB)',
    secondaryDS: 'Binary Heap (Priority Queue)',
    bestFor: 'ডেটা সব সময় সর্টেড রাখা, রেঞ্জ অনুযায়ী মান খোঁজা ($O(\\log N)$) এবং জরুরি কাজকে সবার আগে প্রসেস করা।',
    tradeoff: 'পয়েন্টার ঘুরে ঘুরে খোঁজার কারণে CPU ক্যাশ মিস বেশি হতে পারে।',
    visualType: 'tree',
  },
  {
    id: 'prefix-network',
    title: 'প্রিফিক্স সার্চ ও নেটওয়ার্ক গ্রাফ',
    subtitle: 'অটোকমপ্লিট ও পারস্পরিক সম্পর্ক',
    icon: Search,
    primaryDS: 'Trie (প্রিফিক্স ট্রি)',
    secondaryDS: 'Graph (গ্রাফ)',
    bestFor: 'সার্চ বক্সে শব্দের সাজেশন ও বানান সংশোধন (Trie); সোশ্যাল নেটওয়ার্কে ফ্রেন্ড রিকমেন্ডেশন ও গুগল ম্যাপ রুট (Graph)।',
    tradeoff: 'ট্রাইয়ে প্রচুর ক্যারেক্টার পয়েন্টার থাকায় মেমরি বেশি লাগে; গ্রাফে সাইকেল ম্যানেজমেন্ট কিছুটা জটিল।',
    visualType: 'trie_graph',
  },
];
