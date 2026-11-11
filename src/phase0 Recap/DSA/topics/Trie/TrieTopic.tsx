'use client';

import React, { useState, useEffect } from 'react';
import RealLifeScenario from '@/components/RealLifeScenario';
import {
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
  Terminal,
  SpellCheck,
  Keyboard,
  ArrowRight,
  Database,
  CornerDownRight,
  ShieldAlert,
  Sliders,
  Check
} from 'lucide-react';

const DICTIONARY = [
  'app',
  'apple',
  'apply',
  'application',
  'apt',
  'api',
  'cat',
  'car',
  'card',
  'cart',
  'code',
  'data',
  'database'
];

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
      {/* 1. Clean, Modern Header Definition Card */}
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

        {/* ================= CARD 1: AUTOCOMPLETE ENGINE ================= */}
        <div className="bg-[#0c0d15] border border-[#1e2233] p-5 rounded-2xl flex flex-col justify-between gap-5 hover:border-fuchsia-500/40 transition-colors">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100">১. অটোকমপ্লিট ইঞ্জিন</h3>
                  <span className="text-[10px] font-mono text-zinc-400">Search Engine Typeahead</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-950/60 text-fuchsia-400 border border-fuchsia-800">
                O(Prefix)
              </span>
            </div>

            {/* Interactive Input */}
            <div className="flex items-center gap-2 bg-[#121422] px-3 py-1.5 rounded-xl border border-[#20253b]">
              <span className="text-xs font-mono text-zinc-400">Prefix:</span>
              <input
                type="text"
                value={autoQuery}
                onChange={(e) => setAutoQuery(e.target.value)}
                placeholder="Type: ca, app, co..."
                className="w-full bg-transparent text-fuchsia-300 text-xs font-mono focus:outline-none"
              />
            </div>

            {/* Embedded Live Vector Animation: Trie Branch Blossom */}
            <div className="bg-[#07080e] rounded-xl border border-[#1b1e2e] p-3 flex flex-col items-center justify-center relative min-h-[145px]">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
                Live Sub-tree Traversal
              </div>

              <svg viewBox="0 0 310 100" className="w-full select-none" style={{ height: '100px' }}>
                {autoQuery.trim().length >= 2 ? (
                  <g>
                    {/* Connecting Edges */}
                    <line x1="28" y1="50" x2="80" y2="50" stroke="#a855f7" strokeWidth="2" />
                    <line x1="80" y1="50" x2="135" y2="50" stroke="#d946ef" strokeWidth="2.5" />
                    <line x1="135" y1="50" x2="190" y2="25" stroke="#ec4899" strokeWidth="1.8" />
                    <line x1="135" y1="50" x2="190" y2="75" stroke="#ec4899" strokeWidth="1.8" />
                    <line x1="190" y1="25" x2="230" y2="25" stroke="#ec4899" strokeWidth="1.2" strokeDasharray="3,2" />
                    <line x1="190" y1="75" x2="230" y2="75" stroke="#ec4899" strokeWidth="1.2" strokeDasharray="3,2" />

                    {/* Node 0: Root */}
                    <circle cx="28" cy="50" r="13" fill="#1b122e" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="28" y="53.5" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontFamily="monospace" fontWeight="bold">ROOT</text>

                    {/* Node 1: First Prefix Char (e.g. 'c') */}
                    <circle cx="80" cy="50" r="14" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
                    <text x="80" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {autoQuery[0]}
                    </text>

                    {/* Node 2: Second Prefix Char (e.g. 'a') - The Missing Node Explicitly Added */}
                    <circle cx="135" cy="50" r="15" fill="#581c87" stroke="#d946ef" strokeWidth="2.5" className="animate-pulse" />
                    <text x="135" y="54.5" textAnchor="middle" fill="#fdf4ff" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      {autoQuery[1]}
                    </text>

                    {/* Downstream Branch 1 (e.g. 'r' for 'car' or 'card') */}
                    <circle cx="190" cy="25" r="12" fill="#181329" stroke="#ec4899" strokeWidth="1.5" />
                    <text x="190" y="28.5" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {autoMatches[0] ? autoMatches[0][2] || 'r' : 'r'}
                    </text>
                    <text x="240" y="28.5" textAnchor="start" fill="#f472b6" fontSize="9" fontFamily="monospace">
                      ➔ {autoMatches[0] || 'car'}
                    </text>

                    {/* Downstream Branch 2 (e.g. 't' for 'cat') */}
                    <circle cx="190" cy="75" r="12" fill="#181329" stroke="#ec4899" strokeWidth="1.5" />
                    <text x="190" y="78.5" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {autoMatches[1] ? autoMatches[1][2] || 't' : 't'}
                    </text>
                    <text x="240" y="78.5" textAnchor="start" fill="#f472b6" fontSize="9" fontFamily="monospace">
                      ➔ {autoMatches[1] || 'cat'}
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Connecting Edges */}
                    <line x1="30" y1="50" x2="100" y2="50" stroke="#a855f7" strokeWidth="2" />
                    <line x1="100" y1="50" x2="175" y2="25" stroke="#d946ef" strokeWidth="2" />
                    <line x1="100" y1="50" x2="175" y2="75" stroke="#d946ef" strokeWidth="2" />

                    {/* Node 0: Root */}
                    <circle cx="30" cy="50" r="14" fill="#1b122e" stroke="#a855f7" strokeWidth="2" />
                    <text x="30" y="53.5" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontFamily="monospace" fontWeight="bold">ROOT</text>

                    {/* Node 1: Prefix Char */}
                    <circle cx="100" cy="50" r="15" fill="#581c87" stroke="#d946ef" strokeWidth="2.5" className="animate-pulse" />
                    <text x="100" y="54.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      {autoQuery[0] || '*'}
                    </text>

                    {/* Branch 1 */}
                    <circle cx="175" cy="25" r="13" fill="#181329" stroke="#ec4899" strokeWidth="1.5" />
                    <text x="175" y="29" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {autoMatches[0] ? autoMatches[0][1] || 'a' : 'a'}
                    </text>
                    <text x="215" y="28.5" textAnchor="start" fill="#f472b6" fontSize="9" fontFamily="monospace">
                      ➔ {autoMatches[0] || 'cat'}
                    </text>

                    {/* Branch 2 */}
                    <circle cx="175" cy="75" r="13" fill="#181329" stroke="#ec4899" strokeWidth="1.5" />
                    <text x="175" y="79" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {autoMatches[1] ? autoMatches[1][1] || 'o' : 'o'}
                    </text>
                    <text x="215" y="78.5" textAnchor="start" fill="#f472b6" fontSize="9" fontFamily="monospace">
                      ➔ {autoMatches[1] || 'code'}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Live Dropdown Preview */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                ইন্টেলিসেন্স ড্রপডাউন ({autoMatches.length} matches):
              </span>
              <div className="flex flex-col gap-1 max-h-[85px] overflow-y-auto pr-1">
                {autoMatches.length === 0 ? (
                  <span className="text-xs font-mono text-rose-400 py-1">কোনো সাজেশন মেলেনি</span>
                ) : (
                  autoMatches.slice(0, 3).map((w, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#141624] border border-[#20253b] text-xs font-mono text-zinc-300 flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-fuchsia-400">{autoQuery}</strong>
                        <span>{w.slice(autoQuery.length)}</span>
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">Press Tab ⇥</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 bg-[#07080e] p-2.5 rounded-xl border border-[#161826] leading-relaxed">
            💡 <strong>কাজের ধরণ:</strong> প্রিফিক্স নোডে নেমে নিচের সব সাব-ট্রি সরাসরি ড্রপডাউনে রিটার্ন করে; পুরো ডিকশনারি স্ক্যান করার কোনো দরকার পড়ে না।
          </div>
        </div>

        {/* ================= CARD 2: SPELL CHECKER & TYPO RESOLVER ================= */}
        <div className="bg-[#0c0d15] border border-[#1e2233] p-5 rounded-2xl flex flex-col justify-between gap-5 hover:border-violet-500/40 transition-colors">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <SpellCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100">২. স্পেল চেকার ও টাইপো</h3>
                  <span className="text-[10px] font-mono text-zinc-400">Typo Detection &amp; Auto-Fix</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/60 text-violet-400 border border-violet-800">
                Validation
              </span>
            </div>

            {/* Interactive Input */}
            <div className="flex items-center gap-2 bg-[#121422] px-3 py-1.5 rounded-xl border border-[#20253b]">
              <span className="text-xs font-mono text-zinc-400">Word:</span>
              <input
                type="text"
                value={spellWord}
                onChange={(e) => setSpellWord(e.target.value)}
                placeholder="Test typo: aple, caat, dot..."
                className="w-full bg-transparent text-violet-300 text-xs font-mono focus:outline-none"
              />
            </div>

            {/* Embedded Live Vector Animation: Broken Trie Path vs Levenshtein Bridge */}
            <div className="bg-[#07080e] rounded-xl border border-[#1b1e2e] p-3 flex flex-col items-center justify-center relative min-h-[145px]">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
                Trie Traversal Path
              </div>

              <svg viewBox="0 0 280 100" className="w-full select-none" style={{ height: '100px' }}>
                {isExactMatch ? (
                  // Valid path SVG
                  <g>
                    <line x1="30" y1="50" x2="110" y2="50" stroke="#10b981" strokeWidth="2.5" />
                    <line x1="110" y1="50" x2="190" y2="50" stroke="#10b981" strokeWidth="2.5" />
                    <circle cx="30" cy="50" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="30" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {normalizedSpell[0] || 'a'}
                    </text>
                    <circle cx="110" cy="50" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="110" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {normalizedSpell[1] || 'p'}
                    </text>
                    <circle cx="190" cy="50" r="15" fill="#047857" stroke="#34d399" strokeWidth="2" />
                    <text x="190" y="54" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      END ✓
                    </text>
                    <text x="140" y="85" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
                      Valid Path • isEndOfWord = true
                    </text>
                  </g>
                ) : (
                  // Broken path typo SVG
                  <g>
                    <line x1="30" y1="50" x2="100" y2="50" stroke="#10b981" strokeWidth="2" />
                    <line x1="100" y1="50" x2="170" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,2" />
                    <circle cx="30" cy="50" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="30" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {normalizedSpell[0] || 'a'}
                    </text>
                    <circle cx="100" cy="50" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="100" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {normalizedSpell[1] || 'p'}
                    </text>
                    {/* Broken Node */}
                    <circle cx="170" cy="50" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" className="animate-ping" style={{ animationDuration: '2s' }} />
                    <circle cx="170" cy="50" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                    <text x="170" y="54" textAnchor="middle" fill="#fecdd3" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      ✕
                    </text>
                    {/* Error label */}
                    <text x="170" y="80" textAnchor="middle" fill="#fb7185" fontSize="9" fontFamily="monospace">
                      NULL Pointer (Path Broken)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Validation & Auto-fix output */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono">
                {isExactMatch ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> সঠিক ডিকশনারি শব্দ
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-rose-400 font-bold bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-800">
                    <XCircle className="w-3.5 h-3.5" /> টাইপো সনাক্ত! (ট্রি-তে পথ নেই)
                  </span>
                )}
              </div>

              {!isExactMatch && typoSuggestions.length > 0 && (
                <div className="flex items-center gap-1.5 pt-1 text-xs font-mono text-zinc-400">
                  <span className="text-[11px]">সাজেস্টেড ফিক্স:</span>
                  {typoSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSpellWord(s)}
                      className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 hover:bg-violet-900 cursor-pointer text-[10px]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 bg-[#07080e] p-2.5 rounded-xl border border-[#161826] leading-relaxed">
            💡 <strong>কাজের ধরণ:</strong> ট্রাই-এর যেকোনো নোডে যদি পরবর্তী অক্ষরের কোনো চাইল্ড পয়েন্টার না থাকে, সাথে সাথে লাল দাগ দিয়ে টাইপো ধরা পড়ে।
          </div>
        </div>

        {/* ================= CARD 3: DETERMINISTIC O(L) WORD SEARCH ================= */}
        <div className="bg-[#0c0d15] border border-[#1e2233] p-5 rounded-2xl flex flex-col justify-between gap-5 hover:border-emerald-500/40 transition-colors">
          <div className="space-y-3.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100">৩. O(Length) ওয়ার্ড সার্চ</h3>
                  <span className="text-[10px] font-mono text-zinc-400">Constant Hops per Char</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                Zero Scan
              </span>
            </div>

            {/* Interactive Input */}
            <div className="flex items-center gap-2 bg-[#121422] px-3 py-1.5 rounded-xl border border-[#20253b]">
              <span className="text-xs font-mono text-zinc-400">Target:</span>
              <input
                type="text"
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                placeholder="Type word: apple, cat..."
                className="w-full bg-transparent text-emerald-300 text-xs font-mono focus:outline-none"
              />
            </div>

            {/* Embedded Live Vector Animation: Continuous Character Laser Scanner */}
            <div className="bg-[#07080e] rounded-xl border border-[#1b1e2e] p-3 flex flex-col items-center justify-center relative min-h-[145px]">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
                Character Hop Laser Pulse
              </div>

              <div className="flex items-center gap-2 py-4">
                {searchTarget.trim().split('').map((char, idx) => {
                  const isCurrent = scanStep === idx;
                  const isPassed = scanStep > idx;

                  return (
                    <div key={idx} className="flex items-center">
                      <div
                        className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs transition-all ${
                          isCurrent
                            ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 scale-110 shadow-lg shadow-emerald-500/20'
                            : isPassed
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-[#121422] text-zinc-500 border border-[#20253b]'
                        }`}
                      >
                        <span>{char}</span>
                        <span className="text-[8px] opacity-70">h{idx + 1}</span>
                      </div>
                      {idx < searchTarget.trim().length - 1 && (
                        <ArrowRight
                          className={`w-3.5 h-3.5 mx-0.5 transition-colors ${
                            isPassed ? 'text-emerald-400' : 'text-zinc-600'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] font-mono text-zinc-400">
                {scanStep >= searchTarget.trim().length ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Word Resolved in {searchTarget.trim().length} Hops!
                  </span>
                ) : (
                  <span>
                    Scanning character {scanStep + 1} of {searchTarget.trim().length}...
                  </span>
                )}
              </div>
            </div>

            {/* Performance Metric Comparison */}
            <div className="bg-[#090a10] p-3 rounded-xl border border-[#1a1c28] space-y-1.5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Trie সার্চে ধাপ:</span>
                <span className="text-emerald-400 font-bold">মাত্র {searchTarget.trim().length} টি নোড হপ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">ডাটাবেজ/লিনিয়ার স্ক্যান:</span>
                <span className="text-rose-400 font-bold">১০,০০,০০০+ তুলনা</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 bg-[#07080e] p-2.5 rounded-xl border border-[#161826] leading-relaxed">
            💡 <strong>কাজের ধরণ:</strong> ডিকশনারি যতই বিশাল হোক না কেন, সার্চিং সময় কেবল শব্দের অক্ষরের সংখ্যার ($L$) সমান—ডিকশনারির সাইজ $N$-এর ওপর নির্ভরশীল নয়।
          </div>
        </div>

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
    </div>
  );
}
