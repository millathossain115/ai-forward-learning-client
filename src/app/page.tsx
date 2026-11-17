'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar, { TopicId } from '@/components/Sidebar';
import { TOPIC_METADATA } from '@/config/topicMetadata';
import TopicSkeleton from '@/components/TopicSkeleton';
import WelcomeModal from '@/components/WelcomeModal';
import {
  Server,
  Command,
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

const FoundationsTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Foundations/FoundationsTopic'), { loading: () => <TopicSkeleton /> });
const ArrayTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Array/ArrayTopic'), { loading: () => <TopicSkeleton /> });
const LinkedListTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/LinkedList/LinkedListTopic'), { loading: () => <TopicSkeleton /> });
const StackTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Stack/StackTopic'), { loading: () => <TopicSkeleton /> });
const QueueTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Queue/QueueTopic'), { loading: () => <TopicSkeleton /> });
const HeapTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Heap/HeapTopic'), { loading: () => <TopicSkeleton /> });
const HashTableTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/HashTable/HashTableTopic'), { loading: () => <TopicSkeleton /> });
const TreeTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Tree/TreeTopic'), { loading: () => <TopicSkeleton /> });
const BalancedTreeTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/BalancedTree/BalancedTreeTopic'), { loading: () => <TopicSkeleton /> });
const TrieTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Trie/TrieTopic'), { loading: () => <TopicSkeleton /> });
const SearchingTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Searching/SearchingTopic'), { loading: () => <TopicSkeleton /> });
const SortingOverviewTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Sorting/SortingOverviewTopic'), { loading: () => <TopicSkeleton /> });
const BubbleSortTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Sorting/BubbleSortTopic'), { loading: () => <TopicSkeleton /> });
const SelectionSortTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Sorting/SelectionSortTopic'), { loading: () => <TopicSkeleton /> });
const InsertionSortTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Sorting/InsertionSortTopic'), { loading: () => <TopicSkeleton /> });
const MergeSortTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Sorting/MergeSortTopic'), { loading: () => <TopicSkeleton /> });
const QuickSortTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Sorting/QuickSortTopic'), { loading: () => <TopicSkeleton /> });
const RecursionTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Recursion/RecursionTopic'), { loading: () => <TopicSkeleton /> });
const ParadigmsTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Paradigms/ParadigmsTopic'), { loading: () => <TopicSkeleton /> });
const GraphTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Graph/GraphTopic'), { loading: () => <TopicSkeleton /> });
const DagTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Graph/DagTopic'), { loading: () => <TopicSkeleton /> });
const DfsTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Graph/DfsTopic'), { loading: () => <TopicSkeleton /> });
const BfsTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Graph/BfsTopic'), { loading: () => <TopicSkeleton /> });
const DijkstraTopic = dynamic(() => import('@/phase0 Recap/DSA/topics/Graph/DijkstraTopic'), { loading: () => <TopicSkeleton /> });
const DatabaseBasicsTopic = dynamic(() => import('@/components/DatabaseBasicsTopic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson1Topic = dynamic(() => import('@/components/DatabaseLesson1Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson2Topic = dynamic(() => import('@/components/DatabaseLesson2Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson3Topic = dynamic(() => import('@/components/DatabaseLesson3Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson4Topic = dynamic(() => import('@/components/DatabaseLesson4Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson5Topic = dynamic(() => import('@/components/DatabaseLesson5Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson6Topic = dynamic(() => import('@/components/DatabaseLesson6Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson7Topic = dynamic(() => import('@/components/DatabaseLesson7Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson8Topic = dynamic(() => import('@/components/DatabaseLesson8Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson9Topic = dynamic(() => import('@/components/DatabaseLesson9Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson10Topic = dynamic(() => import('@/components/DatabaseLesson10Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseRoadmapTopic = dynamic(() => import('@/components/DatabaseRoadmapTopic'), { loading: () => <TopicSkeleton /> });
const DatabasePlayground = dynamic(() => import('@/components/DatabasePlayground'), { loading: () => <TopicSkeleton /> });
const PgVectorTopic = dynamic(() => import('@/components/PgVectorTopic'), { loading: () => <TopicSkeleton /> });

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('foundations');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // Check localStorage for welcome modal on first landing
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('fl_welcome_dismissed');
      if (!dismissed) {
        setShowWelcome(true);
      }
    } catch {
      setShowWelcome(true);
    }
  }, []);

  // Sync topic from URL query param on load & browser back/forward buttons
  useEffect(() => {
    const syncTopicFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const topic = params.get('topic') as TopicId | null;
      if (topic && topic in TOPIC_METADATA) {
        setActiveTopic(topic);
      }
    };

    syncTopicFromUrl();
    window.addEventListener('popstate', syncTopicFromUrl);
    return () => window.removeEventListener('popstate', syncTopicFromUrl);
  }, []);

  const handleSelectTopic = (id: TopicId) => {
    setActiveTopic(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('topic', id);
      window.history.pushState({ topic: id }, '', url.toString());
    }
  };

  const handleNavigateTopic = (id: string) => {
    handleSelectTopic(id as TopicId);
  };

  const meta = TOPIC_METADATA[activeTopic] || {
    category: 'Phase 0 • Recap',
    title: 'Topic',
    description: 'Module content.',
  };

  // Dynamically update browser tab title to match sidebar active topic
  useEffect(() => {
    if (meta.title) {
      document.title = `${meta.title} | FORWARD LEARNING`;
    }
  }, [meta.title]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090a0f] text-zinc-100 antialiased font-sans">
      {/* 1. Left Collapsible Sidebar */}
      <Sidebar
        activeTopic={activeTopic}
        onSelectTopic={handleSelectTopic}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0b0c13]">
        {/* Minimalist Top App Bar */}
        <header className="h-14 border-b border-[#1b1d2b] px-6 flex items-center justify-between bg-[#0b0c13]/80 backdrop-blur z-20 shrink-0">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-2.5 font-mono">
            <span className="text-xs md:text-sm text-zinc-400">{meta.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-sm md:text-base text-zinc-100 font-semibold">{meta.title}</span>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-4 text-xs md:text-sm font-mono">
            {/* Pure Client-Side Mode Badge */}
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
              <span className="text-xs font-medium text-emerald-400">Client Engine Active</span>
            </div>

            <div className="h-4 w-[1px] bg-[#1e202e]" />

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#131520] border border-[#1e2130] text-xs text-zinc-400">
              <Command className="w-3.5 h-3.5" />
              <span>K</span>
            </div>

            {/* Welcome Guide Trigger */}
            <button
              onClick={() => setShowWelcome(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#131520] hover:bg-[#1a1c2c] border border-[#1e2130] text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
              title="Platform Overview & Welcome Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Guide</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Workspace */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Active Topic Router */}
            {activeTopic === 'foundations' && <FoundationsTopic />}
            {activeTopic === 'array' && <ArrayTopic />}
            {activeTopic === 'linkedlist' && <LinkedListTopic />}
            {activeTopic === 'stack' && <StackTopic />}
            {activeTopic === 'queue' && <QueueTopic />}
            {activeTopic === 'heap' && <HeapTopic />}
            {activeTopic === 'hashtable' && <HashTableTopic />}
            {activeTopic === 'tree' && <TreeTopic />}
            {activeTopic === 'balanced-tree' && <BalancedTreeTopic />}
            {activeTopic === 'trie' && <TrieTopic />}
            {activeTopic === 'searching' && <SearchingTopic />}
            {activeTopic === 'sorting' && <SortingOverviewTopic onNavigate={handleNavigateTopic} />}
            {activeTopic === 'sorting-bubble' && <BubbleSortTopic onNavigate={handleNavigateTopic} />}
            {activeTopic === 'sorting-selection' && <SelectionSortTopic onNavigate={handleNavigateTopic} />}
            {activeTopic === 'sorting-insertion' && <InsertionSortTopic onNavigate={handleNavigateTopic} />}
            {activeTopic === 'sorting-merge' && <MergeSortTopic onNavigate={handleNavigateTopic} />}
            {activeTopic === 'sorting-quick' && <QuickSortTopic onNavigate={handleNavigateTopic} />}
            {activeTopic === 'recursion' && <RecursionTopic />}
            {activeTopic === 'paradigms' && <ParadigmsTopic />}

            {activeTopic === 'graphs' && <GraphTopic />}
            {activeTopic === 'graph-dag' && <DagTopic />}
            {activeTopic === 'graph-dfs' && <DfsTopic />}
            {activeTopic === 'graph-bfs' && <BfsTopic />}
            {activeTopic === 'graph-dijkstra' && <DijkstraTopic />}

            {activeTopic === 'backend-basics' && (
              <DatabaseBasicsTopic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson1' && (
              <DatabaseLesson1Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson2' && (
              <DatabaseLesson2Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson3' && (
              <DatabaseLesson3Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson4' && (
              <DatabaseLesson4Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson5' && (
              <DatabaseLesson5Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson6' && (
              <DatabaseLesson6Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson7' && (
              <DatabaseLesson7Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson8' && (
              <DatabaseLesson8Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson9' && (
              <DatabaseLesson9Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-lesson10' && (
              <DatabaseLesson10Topic onNavigate={handleNavigateTopic} />
            )}

            {activeTopic === 'backend-roadmap' && (
              <DatabaseRoadmapTopic onNavigate={handleNavigateTopic} />
            )}

            {(activeTopic === 'backend-sql' || activeTopic === 'backend-indexing') && (
              <div className="space-y-6">
                <div className="border-b border-[#1e2130] pb-4">
                  <h2 className="text-xl font-bold text-zinc-100">{meta.title}</h2>
                  <p className="text-xs text-zinc-400 mt-1">{meta.description}</p>
                </div>
                <DatabasePlayground />
              </div>
            )}

            {activeTopic === 'backend-pgvector' && <PgVectorTopic />}

            {/* Upcoming Chapters (Phase 1 AI Core) */}
            {[
              'ai-llm',
              'ai-rag',
              'ai-mcp',
              'ai-agents',
              'ai-eval',
            ].includes(activeTopic) && (
              <div className="p-8 rounded-xl border border-[#1b1e2e] bg-[#0f111a] flex flex-col items-center text-center max-w-xl mx-auto my-12">
                <div className="w-10 h-10 rounded-lg bg-[#161826] border border-[#23273d] flex items-center justify-center text-amber-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1b1f33] text-amber-400 border border-amber-500/20 mb-2">
                  Phase 1 Milestone
                </span>
                <h3 className="text-base font-bold text-zinc-100">{meta.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {meta.description}
                </p>
                <div className="mt-6 pt-4 border-t border-[#1e2236] w-full text-center">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Module specification defined. Reserved for Python FastAPI AI integration.
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Welcome Modal */}
      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
    </div>
  );
}
