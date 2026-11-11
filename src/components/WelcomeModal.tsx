'use client';

import React, { useState, useEffect } from 'react';
import FlowLogicLogo from '@/components/FlowLogicLogo';
import {
  X,
  Compass,
  Database,
  Bot,
  ArrowRight,
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
        className="relative w-full max-w-lg bg-[#0c0e18] border border-[#232942] rounded-3xl p-6 md:p-7 shadow-2xl shadow-amber-500/10 flex flex-col gap-4 text-zinc-100 overflow-hidden"
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

        {/* Short & Punchy Intro */}
        <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          স্বাগতম! এটি একটি পূর্ণাঙ্গ <b>Forward Engineering Roadmap</b> প্ল্যাটফর্ম—কম্পিউটার সায়েন্সের কোর ভিত্তি (DSA) থেকে শুরু করে ডেটাবেজ ইঞ্জিন ও আধুনিক AI সিস্টেমের ইন্টারঅ্যাক্টিভ লার্নিং হাব।
        </p>

        {/* 3 Phases Clean Badges */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121524]/70 border border-[#1a1f33]">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-zinc-100 font-mono text-xs block">Phase 0 • DSA &amp; Foundations</span>
              <p className="text-zinc-400 text-[11px] truncate">মেমরি লেআউট, অ্যালগরিদম ও লাইভ ভিজ্যুয়ালাইজার</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121524]/70 border border-[#1a1f33]">
            <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-zinc-100 font-mono text-xs block">Phase 1 • Database Systems</span>
              <p className="text-zinc-400 text-[11px] truncate">SQL কুয়েরি অপটিমাইজার ও pgvector হাই-ডাইমেনশনাল সার্চ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121524]/70 border border-[#1a1f33]">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-semibold text-zinc-100 font-mono text-xs block">Phase 2 • Forward AI Core</span>
              <p className="text-zinc-400 text-[11px] truncate">LLM স্ট্রিমিং, RAG ও মাল্টি-এজেন্ট সিস্টেমস</p>
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
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-mono text-xs md:text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>এক্সপ্লোর শুরু করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
