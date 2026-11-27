'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Sidebar, { TopicId } from '@/components/Sidebar';
import { TOPIC_METADATA } from '@/config/topicMetadata';
import WelcomeModal from '@/components/WelcomeModal';
import LanguageToggle from '@/components/LanguageToggle';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const params = useParams<{ topic?: string }>();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const rawTopic = params?.topic;
  const activeTopic: TopicId =
    rawTopic && rawTopic in TOPIC_METADATA ? (rawTopic as TopicId) : 'foundations';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const dismissed = localStorage.getItem('fl_welcome_dismissed');
        if (!dismissed) {
          setShowWelcome(true);
        }
      } catch {
        setShowWelcome(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Scroll to hash target when navigating to a topic#section
  useEffect(() => {
    const hash = window.location.hash ? window.location.hash.slice(1) : null;
    if (!hash) {
      mainRef.current?.scrollTo({ top: 0 });
      return;
    }

    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    const target = mainRef.current ?? document.body;
    const observer = new MutationObserver(() => {
      if (tryScroll()) observer.disconnect();
    });
    observer.observe(target, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => observer.disconnect(), 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [activeTopic]);

  const handleSelectTopic = (id: TopicId, sectionId?: string) => {
    const hash = sectionId ? `#${sectionId}` : '';
    router.push(`/topics/${id}${hash}`);
  };

  const meta = TOPIC_METADATA[activeTopic] || {
    category: 'Phase 0 • Recap',
    title: 'Topic',
    description: 'Module content.',
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090a0f] text-zinc-100 antialiased font-sans">
      <Sidebar
        activeTopic={activeTopic}
        onSelectTopic={handleSelectTopic}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0b0c13]">
        <header className="h-14 border-b border-[#1b1d2b] px-6 flex items-center justify-between bg-[#0b0c13]/80 backdrop-blur z-20 shrink-0">
          <div className="flex items-center gap-2.5 font-mono">
            <span className="text-xs md:text-sm text-zinc-400">{meta.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-sm md:text-base text-zinc-100 font-semibold">{meta.title}</span>
          </div>

          <div className="flex items-center gap-3 text-xs md:text-sm font-mono">
            <LanguageToggle />
          </div>
        </header>

        <main ref={mainRef} className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="w-full space-y-8">{children}</div>
        </main>
      </div>

      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
    </div>
  );
}
