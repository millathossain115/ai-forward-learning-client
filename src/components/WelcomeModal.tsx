'use client';

import React, { useState, useEffect, useCallback } from 'react';
import FlowLogicLogo from '@/components/FlowLogicLogo';
import {
  X,
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

  const handleDismiss = useCallback(() => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('fl_welcome_dismissed', 'true');
      } catch (err) {
        console.error('Failed to set localStorage', err);
      }
    }
    onClose();
  }, [dontShowAgain, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg bg-[#15171e] border border-white/[0.12] rounded-2xl p-6 shadow-xl flex flex-col gap-5 text-[#f4f4f7]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#1c1f29] border border-white/[0.08] text-[#9ca0b0] hover:text-[#f4f4f7] hover:bg-[#232632] transition-colors cursor-pointer"
          title="Close (Esc)"
          aria-label="Close welcome dialog"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3 pr-8">
          <FlowLogicLogo size="md" />
          <div>
            <h2 className="text-lg font-semibold text-[#f4f4f7]">
              Forward <span className="text-amber-400">Learning</span>
            </h2>
            <p className="text-xs text-[#9ca0b0] font-mono mt-0.5">
              Systems, Database &amp; DSA Workbench
            </p>
          </div>
        </div>

        <p className="text-sm text-[#9ca0b0] leading-relaxed font-sans">
          স্বাগতম। এটি একটি পূর্ণাঙ্গ Forward Engineering প্ল্যাটফর্ম—কম্পিউটার সায়েন্সের কোর ভিত্তি (DSA) থেকে শুরু করে ডেটাবেজ ইঞ্জিন ও আধুনিক AI সিস্টেমের ইন্টারঅ্যাক্টিভ লার্নিং হাব।
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#101116] border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-[#1c1f29] border border-white/[0.08] text-[#9ca0b0] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-[#f4f4f7] font-mono text-xs block">Phase 0 • DSA &amp; Foundations</span>
              <p className="text-[#9ca0b0] text-xs truncate">মেমরি লেআউট, অ্যালগরিদম ও লাইভ ভিজ্যুয়ালাইজার</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#101116] border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-[#1c1f29] border border-white/[0.08] text-[#9ca0b0] flex items-center justify-center shrink-0">
              <Database className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-[#f4f4f7] font-mono text-xs block">Phase 1 • Database Systems</span>
              <p className="text-[#9ca0b0] text-xs truncate">SQL কুয়েরি অপটিমাইজার ও pgvector হাই-ডাইমেনশনাল সার্চ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#101116] border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-[#1c1f29] border border-white/[0.08] text-[#9ca0b0] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-[#f4f4f7] font-mono text-xs block">Phase 2 • Forward AI Core</span>
              <p className="text-[#9ca0b0] text-xs truncate">LLM স্ট্রিমিং, RAG ও মাল্টি-এজেন্ট সিস্টেমস</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
          <label className="flex items-center gap-2 text-xs font-mono text-[#9ca0b0] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded bg-[#101116] border-white/[0.14] text-amber-500 focus:ring-amber-500/20 cursor-pointer"
            />
            <span>আর দেখাবেন না (Don&apos;t show again)</span>
          </label>

          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#f4f4f7] hover:bg-white text-[#090a0d] font-medium font-mono text-xs transition-colors cursor-pointer"
          >
            <span>এক্সপ্লোর</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
