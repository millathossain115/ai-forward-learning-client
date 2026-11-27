'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { TOPIC_METADATA } from '@/config/topicMetadata';
import { useLanguage } from '@/context/LanguageContext';
import TopicSkeleton from '@/components/TopicSkeleton';

const DsaDirectoryTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Directory/DsaDirectoryTopic'), { loading: () => <TopicSkeleton /> });
const FoundationsTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Foundations/FoundationsTopic'), { loading: () => <TopicSkeleton /> });
const ArrayTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Array/ArrayTopic'), { loading: () => <TopicSkeleton /> });
const LinkedListTopic = dynamic(() => import('@/phase0-recap/DSA/topics/LinkedList/LinkedListTopic'), { loading: () => <TopicSkeleton /> });
const StackTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Stack/StackTopic'), { loading: () => <TopicSkeleton /> });
const QueueTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Queue/QueueTopic'), { loading: () => <TopicSkeleton /> });
const HeapTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Heap/HeapTopic'), { loading: () => <TopicSkeleton /> });
const HashTableTopic = dynamic(() => import('@/phase0-recap/DSA/topics/HashTable/HashTableTopic'), { loading: () => <TopicSkeleton /> });
const TreeTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Tree/TreeTopic'), { loading: () => <TopicSkeleton /> });
const BalancedTreeTopic = dynamic(() => import('@/phase0-recap/DSA/topics/BalancedTree/BalancedTreeTopic'), { loading: () => <TopicSkeleton /> });
const TrieTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Trie/TrieTopic'), { loading: () => <TopicSkeleton /> });
const SearchingTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Searching/SearchingTopic'), { loading: () => <TopicSkeleton /> });
const SortingOverviewTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Sorting/SortingOverviewTopic'), { loading: () => <TopicSkeleton /> });
const BubbleSortTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Sorting/BubbleSortTopic'), { loading: () => <TopicSkeleton /> });
const SelectionSortTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Sorting/SelectionSortTopic'), { loading: () => <TopicSkeleton /> });
const InsertionSortTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Sorting/InsertionSortTopic'), { loading: () => <TopicSkeleton /> });
const MergeSortTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Sorting/MergeSortTopic'), { loading: () => <TopicSkeleton /> });
const QuickSortTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Sorting/QuickSortTopic'), { loading: () => <TopicSkeleton /> });
const RecursionTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Recursion/RecursionTopic'), { loading: () => <TopicSkeleton /> });
const ParadigmsTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Paradigms/ParadigmsTopic'), { loading: () => <TopicSkeleton /> });
const GraphTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Graph/GraphTopic'), { loading: () => <TopicSkeleton /> });
const DagTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Graph/DagTopic'), { loading: () => <TopicSkeleton /> });
const DfsTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Graph/DfsTopic'), { loading: () => <TopicSkeleton /> });
const BfsTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Graph/BfsTopic'), { loading: () => <TopicSkeleton /> });
const DijkstraTopic = dynamic(() => import('@/phase0-recap/DSA/topics/Graph/DijkstraTopic'), { loading: () => <TopicSkeleton /> });
const DatabaseBasicsTopic = dynamic(() => import('@/phase0-recap/Database/topics/Basics/DatabaseBasicsTopic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson1Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson1/DatabaseLesson1Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson2Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson2/DatabaseLesson2Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson3Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson3/DatabaseLesson3Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson4Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson4/DatabaseLesson4Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson5Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson5/DatabaseLesson5Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson6Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson6/DatabaseLesson6Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson7Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson7/DatabaseLesson7Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson8Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson8/DatabaseLesson8Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson9Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson9/DatabaseLesson9Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson10Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson10/DatabaseLesson10Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson11Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson11/DatabaseLesson11Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson12Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson12/DatabaseLesson12Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson13Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson13/DatabaseLesson13Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson14Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson14/DatabaseLesson14Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson15Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson15/DatabaseLesson15Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson16Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson16/DatabaseLesson16Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson17Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson17/DatabaseLesson17Topic'), { loading: () => <TopicSkeleton /> });
const DatabaseLesson18Topic = dynamic(() => import('@/phase0-recap/Database/topics/Lesson18/DatabaseLesson18Topic'), { loading: () => <TopicSkeleton /> });

const UPCOMING_AI_TOPICS = new Set<TopicId>([
  'ai-llm',
  'ai-rag',
  'ai-mcp',
  'ai-agents',
  'ai-eval',
]);

const DSA_TOPIC_IDS = new Set<TopicId>([
  'array', 'linkedlist', 'stack', 'queue', 'heap', 'hashtable',
  'tree', 'balanced-tree', 'trie', 'searching', 'sorting',
  'sorting-bubble', 'sorting-selection', 'sorting-insertion',
  'sorting-merge', 'sorting-quick', 'recursion', 'paradigms',
  'graphs', 'graph-dag', 'graph-dfs', 'graph-bfs', 'graph-dijkstra',
]);

export default function TopicRenderer({ topicId }: { topicId: TopicId }) {
  const router = useRouter();
  const { language } = useLanguage();

  const handleNavigateTopic = (id: string, sectionId?: string) => {
    const hash = sectionId ? `#${sectionId}` : '';
    router.push(`/topics/${id}${hash}`);
  };

  if (UPCOMING_AI_TOPICS.has(topicId)) {
    const meta = TOPIC_METADATA[topicId];
    return (
      <div className="p-8 rounded-xl border border-[#1b1e2e] bg-[#0f111a] flex flex-col items-center text-center max-w-xl mx-auto my-12">
        <div className="w-10 h-10 rounded-lg bg-[#161826] border border-[#23273d] flex items-center justify-center text-amber-400 mb-4">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1b1f33] text-amber-400 border border-amber-500/20 mb-2">
          Phase 1 Milestone
        </span>
        <h3 className="text-base font-bold text-zinc-100">{meta.title}</h3>
        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{meta.description}</p>
        <div className="mt-6 pt-4 border-t border-[#1e2236] w-full text-center">
          <span className="text-[11px] font-mono text-zinc-400">
            Module specification defined. Reserved for Python FastAPI AI integration.
          </span>
        </div>
      </div>
    );
  }

  const renderTopicBody = () => {
    switch (topicId) {
    case 'dsa-directory':
      return <DsaDirectoryTopic onNavigate={handleNavigateTopic} />;
    case 'foundations':
      return <FoundationsTopic />;
    case 'array':
      return <ArrayTopic />;
    case 'linkedlist':
      return <LinkedListTopic />;
    case 'stack':
      return <StackTopic />;
    case 'queue':
      return <QueueTopic />;
    case 'heap':
      return <HeapTopic />;
    case 'hashtable':
      return <HashTableTopic />;
    case 'tree':
      return <TreeTopic />;
    case 'balanced-tree':
      return <BalancedTreeTopic />;
    case 'trie':
      return <TrieTopic />;
    case 'searching':
      return <SearchingTopic />;
    case 'sorting':
      return <SortingOverviewTopic onNavigate={handleNavigateTopic} />;
    case 'sorting-bubble':
      return <BubbleSortTopic onNavigate={handleNavigateTopic} />;
    case 'sorting-selection':
      return <SelectionSortTopic onNavigate={handleNavigateTopic} />;
    case 'sorting-insertion':
      return <InsertionSortTopic onNavigate={handleNavigateTopic} />;
    case 'sorting-merge':
      return <MergeSortTopic onNavigate={handleNavigateTopic} />;
    case 'sorting-quick':
      return <QuickSortTopic onNavigate={handleNavigateTopic} />;
    case 'recursion':
      return <RecursionTopic />;
    case 'paradigms':
      return <ParadigmsTopic />;
    case 'graphs':
      return <GraphTopic />;
    case 'graph-dag':
      return <DagTopic />;
    case 'graph-dfs':
      return <DfsTopic />;
    case 'graph-bfs':
      return <BfsTopic />;
    case 'graph-dijkstra':
      return <DijkstraTopic />;
    case 'db-directory':
      return <DatabaseBasicsTopic onNavigate={handleNavigateTopic} />;
    case 'db-lesson1':
      return <DatabaseLesson1Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson2':
      return <DatabaseLesson2Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson3':
      return <DatabaseLesson3Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson4':
      return <DatabaseLesson4Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson5':
      return <DatabaseLesson5Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson6':
      return <DatabaseLesson6Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson7':
      return <DatabaseLesson7Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson8':
      return <DatabaseLesson8Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson9':
      return <DatabaseLesson9Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson10':
      return <DatabaseLesson10Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson11':
      return <DatabaseLesson11Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson12':
      return <DatabaseLesson12Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson13':
      return <DatabaseLesson13Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson14':
      return <DatabaseLesson14Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson15':
      return <DatabaseLesson15Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson16':
      return <DatabaseLesson16Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson17':
      return <DatabaseLesson17Topic onNavigate={handleNavigateTopic} />;
    case 'db-lesson18':
      return <DatabaseLesson18Topic onNavigate={handleNavigateTopic} />;
    default:
      return <FoundationsTopic />;
    }
  };

  const isDsaModule = DSA_TOPIC_IDS.has(topicId);
  const meta = TOPIC_METADATA[topicId];

  return (
    <>
      {isDsaModule && language === 'en' && meta && (
        <div className="p-4 rounded-xl bg-[#15171e] border border-white/[0.08] flex flex-col gap-1">
          <span className="text-xs font-mono text-amber-400">
            {meta.category} • English Overview
          </span>
          <h2 className="text-base font-semibold text-[#f4f4f7]">{meta.title}</h2>
          <p className="text-xs text-[#9ca0b0] leading-relaxed">{meta.description}</p>
        </div>
      )}
      {renderTopicBody()}
    </>
  );
}
