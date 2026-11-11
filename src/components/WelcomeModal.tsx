'use client';

import React, { useState, useEffect } from 'react';
import FlowLogicLogo from '@/components/FlowLogicLogo';
import {
  X,
  Compass,
  Database,
  Bot,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, dontShowAgain]);

  if (!isOpen) return null;

  const handleDismiss = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('fl_welcome_dismissed', 'true');
      } catch (err) {
        console.error('Failed to set localStorage', err);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#0c0e18] border border-[#232942] rounded-3xl p-6 md:p-7 shadow-2xl shadow-amber-500/10 flex flex-col gap-5 text-zinc-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-20 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-20 w-56 h-56 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#141726] border border-[#20263d] text-zinc-400 hover:text-zinc-100 hover:bg-[#1c2136] transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <FlowLogicLogo size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                FORWARD <span className="text-amber-400">LEARNING</span>
              </h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/60 text-amber-300">
                v1.0
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Forward Engineering Learning Roadmap
            </p>
          </div>
        </div>

        {/* Core Mission & Platform Purpose */}
        <div className="bg-[#101322]/80 border border-[#1e233b] rounded-2xl p-4 space-y-2">
          <p className="text-xs md:text-sm text-zinc-200 leading-relaxed font-sans">
            স্বাগতম <b>FORWARD LEARNING</b>-এ! এটি একটি পূর্ণাঙ্গ <b>Forward Engineering Learning Roadmap</b> প্ল্যাটফর্ম। 
            আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিংয়ের মূল ভিত্তি থেকে শুরু করে বাস্তব সিস্টেমস ও ভবিষ্যৎ AI আর্কিটেকচার ইন্টারঅ্যাক্টিভভাবে আয়ত্ত করার জন্য এটি তৈরি করা হয়েছে।
          </p>
        </div>

        {/* Roadmap Stages Summary */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider font-semibold">
            এই প্ল্যাটফর্মে যা যা কভার করা হচ্ছে:
          </span>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#121524]/60 border border-[#1a1f33]">
              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-zinc-100 font-mono text-xs">১. DSA &amp; Foundations</span>
                <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                  মেমরি আর্কিটেকচার, ডেটা স্ট্রাকচার (Array, Tree, Graph, Trie) এবং অপটিমাল অ্যালগরিদমের ভিজ্যুয়াল সিমুলেশন।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#121524]/60 border border-[#1a1f33]">
              <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 mt-0.5 shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-zinc-100 font-mono text-xs">২. Systems &amp; Database Internals</span>
                <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                  SQL কুয়েরি এক্সিকিউশন প্ল্যান (EXPLAIN ANALYZE), B-Tree ইনডেক্সিং এবং pgvector হাই-ডাইমেনশনাল ভেক্টর সার্চ।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#121524]/60 border border-[#1a1f33]">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-zinc-100 font-mono text-xs">৩. Forward AI Engineering</span>
                <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                  LLM স্ট্রিমিং, RAG পাইপলাইন, মডেল কনটেক্সট প্রোটোকল (MCP) এবং অটোনোমাস মাল্টি-এজেন্ট সিস্টেমস।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Checkbox & CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#1b1f33]">
          <label className="flex items-center gap-2 text-xs font-mono text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded bg-[#121422] border-[#252b42] text-amber-500 focus:ring-amber-500/20 cursor-pointer"
            />
            <span>আর সরাসরি দেখাবেন না (Don&apos;t show again)</span>
          </label>

          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-mono text-xs md:text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>এক্সপ্লোর শুরু করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
