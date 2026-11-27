import React from 'react';
import { Keyboard } from 'lucide-react';

interface AutocompleteCardProps {
  autoQuery: string;
  setAutoQuery: (q: string) => void;
  autoMatches: string[];
}

export default function AutocompleteCard({
  autoQuery,
  setAutoQuery,
  autoMatches,
}: AutocompleteCardProps) {
  return (
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

        {/* Embedded Live Vector Animation */}
        <div className="bg-[#07080e] rounded-xl border border-[#1b1e2e] p-3 flex flex-col items-center justify-center relative min-h-[145px]">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
            Live Sub-tree Traversal
          </div>

          <svg viewBox="0 0 310 100" className="w-full select-none" style={{ height: '100px' }}>
            {autoQuery.trim().length >= 2 ? (
              <g>
                <line x1="28" y1="50" x2="80" y2="50" stroke="#a855f7" strokeWidth="2" />
                <line x1="80" y1="50" x2="135" y2="50" stroke="#d946ef" strokeWidth="2.5" />
                <line x1="135" y1="50" x2="190" y2="25" stroke="#ec4899" strokeWidth="1.8" />
                <line x1="135" y1="50" x2="190" y2="75" stroke="#ec4899" strokeWidth="1.8" />
                <line x1="190" y1="25" x2="230" y2="25" stroke="#ec4899" strokeWidth="1.2" strokeDasharray="3,2" />
                <line x1="190" y1="75" x2="230" y2="75" stroke="#ec4899" strokeWidth="1.2" strokeDasharray="3,2" />

                <circle cx="28" cy="50" r="13" fill="#1b122e" stroke="#a855f7" strokeWidth="1.5" />
                <text x="28" y="53.5" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontFamily="monospace" fontWeight="bold">ROOT</text>

                <circle cx="80" cy="50" r="14" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
                <text x="80" y="54" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  {autoQuery[0]}
                </text>

                <circle cx="135" cy="50" r="15" fill="#581c87" stroke="#d946ef" strokeWidth="2.5" className="" />
                <text x="135" y="54.5" textAnchor="middle" fill="#fdf4ff" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  {autoQuery[1]}
                </text>

                <circle cx="190" cy="25" r="12" fill="#181329" stroke="#ec4899" strokeWidth="1.5" />
                <text x="190" y="28.5" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  {autoMatches[0] ? autoMatches[0][2] || 'r' : 'r'}
                </text>
                <text x="240" y="28.5" textAnchor="start" fill="#f472b6" fontSize="9" fontFamily="monospace">
                  ➔ {autoMatches[0] || 'car'}
                </text>

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
                <line x1="30" y1="50" x2="100" y2="50" stroke="#a855f7" strokeWidth="2" />
                <line x1="100" y1="50" x2="175" y2="25" stroke="#d946ef" strokeWidth="2" />
                <line x1="100" y1="50" x2="175" y2="75" stroke="#d946ef" strokeWidth="2" />

                <circle cx="30" cy="50" r="14" fill="#1b122e" stroke="#a855f7" strokeWidth="2" />
                <text x="30" y="53.5" textAnchor="middle" fill="#e9d5ff" fontSize="8" fontFamily="monospace" fontWeight="bold">ROOT</text>

                <circle cx="100" cy="50" r="15" fill="#581c87" stroke="#d946ef" strokeWidth="2.5" className="" />
                <text x="100" y="54.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  {autoQuery[0] || '*'}
                </text>

                <circle cx="175" cy="25" r="13" fill="#181329" stroke="#ec4899" strokeWidth="1.5" />
                <text x="175" y="29" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  {autoMatches[0] ? autoMatches[0][1] || 'a' : 'a'}
                </text>
                <text x="215" y="28.5" textAnchor="start" fill="#f472b6" fontSize="9" fontFamily="monospace">
                  ➔ {autoMatches[0] || 'cat'}
                </text>

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
          <span className="text-[10px] font-mono text-zinc-400 block">
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
  );
}
