'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RealLifeScenario from '@/components/RealLifeScenario';
import { Search } from 'lucide-react';
import { DICTIONARY } from './types';
import AutocompleteCard from './components/AutocompleteCard';
import SpellCheckerCard from './components/SpellCheckerCard';
import WordSearchCard from './components/WordSearchCard';

const TrieApplications = dynamic(() => import('./components/TrieApplications'), {
  loading: () => (
    <div className="h-40 flex items-center justify-center text-xs font-mono text-zinc-500 animate-pulse">
      Loading trie applications...
    </div>
  )
});

export default function TrieTopic() {
  // 1. Autocomplete Card State
  const [autoQuery, setAutoQuery] = useState('ca');

  // 2. Spell Checker Card State
  const [spellWord, setSpellWord] = useState('aple');

  // 3. Word Search Card State
  const [searchTarget, setSearchTarget] = useState('apple');
  const [scanStep, setScanStep] = useState(0);

  // Auto-stepping for Card 3 Search Scanner (Continuous loop)
  useEffect(() => {
    const cleanWord = searchTarget.trim();
    if (!cleanWord) return;
    const interval = setInterval(() => {
      setScanStep((prev) => (prev + 1) % (cleanWord.length + 1));
    }, 700);
    return () => clearInterval(interval);
  }, [searchTarget]);

  // Autocomplete matching
  const autoMatches = DICTIONARY.filter((w) =>
    w.toLowerCase().startsWith(autoQuery.toLowerCase().trim())
  );

  // Spell Check evaluation
  const normalizedSpell = spellWord.toLowerCase().trim();
  const isExactMatch = DICTIONARY.includes(normalizedSpell);

  // Simple Typo suggestion (Levenshtein distance 1 or prefix match)
  const typoSuggestions = !isExactMatch && normalizedSpell.length > 0
    ? DICTIONARY.filter((w) => {
        if (w.startsWith(normalizedSpell.slice(0, 2))) return true;
        return Math.abs(w.length - normalizedSpell.length) <= 1;
      }).slice(0, 3)
    : [];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Definition Card */}
      <div className="bg-[#0f111a] border border-[#1e2233] p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-fuchsia-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">ট্রাই বা প্রিফিক্স ট্রি (Trie: Prefix Tree)</h2>
            <span className="text-xs font-mono text-fuchsia-400 font-medium">
              অটোকমপ্লিট, স্পেল চেকার ও দ্রুত প্রিফিক্স সার্চের অ্যালগরিদমিক কোর • O(Length) পারফরম্যান্স
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed max-w-4xl">
          <b>Trie (প্রিফিক্স ট্রি)</b> হলো একটি বিশেষায়িত গাছ-সদৃশ ডেটা স্ট্রাকচার, যা শব্দগুলোকে তাদের বর্ণের উপসর্গ (Prefix) অনুযায়ী সাজিয়ে রাখে। প্রতিটি নোড একটি একক অক্ষর বহন করে এবং সমগোত্রীয় শব্দগুলো মেমরিতে একই পাথ ভাগাভাগি করে। নিচে তিনটি প্রধান ব্যবহারের জন্য ডেডিকেটেড লাইভ ভেক্টর অ্যানিমেশন ও মেকানিজম সরাসরি তুলে ধরা হলো:
        </p>
      </div>

      {/* 2. Three Dedicated Feature Cards with Embedded Live Vector Animations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AutocompleteCard
          autoQuery={autoQuery}
          setAutoQuery={setAutoQuery}
          autoMatches={autoMatches}
        />

        <SpellCheckerCard
          spellWord={spellWord}
          setSpellWord={setSpellWord}
          normalizedSpell={normalizedSpell}
          isExactMatch={isExactMatch}
          typoSuggestions={typoSuggestions}
        />

        <WordSearchCard
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
          scanStep={scanStep}
        />
      </div>

      {/* 3. Everyday Real-Life Analogies */}
      <RealLifeScenario
        topicName="ট্রাই (Trie - Prefix Tree)"
        scenarios={[
          {
            title: "১. স্মার্টফোনের অটো-কমপ্লিট কিবোর্ড (Typeahead)",
            subtitle: "অক্ষর টাইপ করতেই সম্ভাব্য শব্দের সাজেশন ভেসে ওঠা",
            badge: "Prefix Sharing",
            visualTag: "O(Length) Lookup",
            accentColor: "violet",
            analogy:
              "মোবাইলে যখন আপনি 'car' টাইপ করেন, কিবোর্ড ডিকশনারির লক্ষ লক্ষ শব্দ না খুঁজে c -> a -> r শাখায় নেমে যায় এবং সাথে সাথে 'care', 'card', 'carpet' সাজেস্ট করে।",
            whyItFits:
              "একই উপসর্গ (prefix) থাকা শব্দগুলো একই পথ ভাগাভাগি করে। নতুন শব্দের জন্য মেমরি পুনরাবৃত্তি হয় না।",
            diagram: (
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-300 py-1">
                <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800">root</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800">c</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800">a</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold border border-purple-400">r [car]</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">d [card]</span>
              </div>
            ),
          },
          {
            title: "২. পুরোনো আমলের লাইব্রেরির লেটার ড্রয়ার ক্যাটালগ",
            subtitle: "A থেকে Z অক্ষরের লেবেল ধরে ধাপে ধাপে ড্রয়ার খোলা",
            badge: "Alphabet Tree",
            visualTag: "Branching By Char",
            accentColor: "sky",
            analogy:
              "লাইব্রেরিতে বই খুঁজতে সরাসরি ড্রয়ারের গায়ে লেখা A -> AC -> ACT এভাবে নির্দিষ্ট ড্রয়ারের গভীরতায় হাত দেওয়া হতো। সব বই খুঁজতে হতো না।",
            whyItFits:
              "বইয়ের মোট সংখ্যা ১ হাজার বা ১০ লাখ যাই হোক না কেন, ড্রয়ারের লেটার ধরে এগোলে শব্দের দৈর্ঘ্যের সমান মাত্র কয়েকটি ধাপেই বইটি বের করা যায় — এটাই Trie-এর O(L) টাইম!",
            diagram: (
              <div className="flex items-center gap-2 text-[10px] font-mono text-sky-300 py-1">
                <span className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-800">ড্রয়ার B</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-950/80 border border-sky-800">সেকশন BO</span>
                <span>➔</span>
                <span className="px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-bold border border-sky-400">বই: BOOK</span>
              </div>
            ),
          },
        ]}
      />

      {/* 4. Real World Engineering Usages */}
      <TrieApplications />
    </div>
  );
}
