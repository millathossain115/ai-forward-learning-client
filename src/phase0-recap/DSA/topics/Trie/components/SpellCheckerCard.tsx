import React from 'react';
import { SpellCheck, CheckCircle2, XCircle } from 'lucide-react';

interface SpellCheckerCardProps {
  spellWord: string;
  setSpellWord: (w: string) => void;
  normalizedSpell: string;
  isExactMatch: boolean;
  typoSuggestions: string[];
}

export default function SpellCheckerCard({
  spellWord,
  setSpellWord,
  normalizedSpell,
  isExactMatch,
  typoSuggestions,
}: SpellCheckerCardProps) {
  return (
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

        {/* Embedded Live Vector Animation */}
        <div className="bg-[#07080e] rounded-xl border border-[#1b1e2e] p-3 flex flex-col items-center justify-center relative min-h-[145px]">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
            Trie Traversal Path
          </div>

          <svg viewBox="0 0 280 100" className="w-full select-none" style={{ height: '100px' }}>
            {isExactMatch ? (
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
                <circle
                  cx="170"
                  cy="50"
                  r="15"
                  fill="#4c0519"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  className="animate-ping"
                  style={{ animationDuration: '2s' }}
                />
                <circle cx="170" cy="50" r="15" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="170" y="54" textAnchor="middle" fill="#fecdd3" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  ✕
                </text>
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
  );
}
