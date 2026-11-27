'use client';

import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Database,
  FileText,
  Folder,
  FolderOpen,
  Search,
  X,
} from 'lucide-react';
import { TopicId } from '@/components/Sidebar';

interface DatabaseBasicsTopicProps {
  onNavigate?: (id: TopicId, sectionId?: string) => void;
}

interface DirectorySubTopic {
  title: string;
  sectionId?: string;
}

interface DirectoryTopicNode {
  title: string;
  sectionId: string;
  children?: (string | DirectorySubTopic)[];
}

interface DirectoryLesson {
  id: string;
  topicId: TopicId;
  title: string;
  accent: string;
  badgeBg: string;
  topics: DirectoryTopicNode[];
}

const DIRECTORY_LESSONS: DirectoryLesson[] = [
  {
    id: 'L1',
    topicId: 'backend-lesson1',
    title: 'Lesson 1: Understanding Data, Information, Database, and DBMS',
    accent: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    topics: [
      { title: 'What is Data?', sectionId: 'l1-data' },
      { title: 'What is Information?', sectionId: 'l1-info' },
      { title: 'What is a Database?', sectionId: 'l1-database' },
      { title: 'What is a DBMS?', sectionId: 'l1-dbms' },
      { title: "Database vs DBMS: What's the Difference?", sectionId: 'l1-diff' },
      { title: 'Why do we need databases? (Why not plain files?)', sectionId: 'l1-need' },
    ],
  },
  {
    id: 'L2',
    topicId: 'backend-lesson2',
    title: 'Lesson 2: Types of Databases and Database Models',
    accent: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    topics: [
      { title: 'Why do we have different types of databases?', sectionId: 'l2-why-types' },
      { title: 'What is a Database Model? (The Architectural Blueprint)', sectionId: 'l2-model-concept' },
      {
        title: 'The 6 Important Database Models',
        sectionId: 'l2-six-models',
        children: [
          'Flat File Database Model',
          'Hierarchical Database Model',
          'Network Database Model',
          'Relational Database Model (Tables, Foreign Keys & Junction Architecture)',
          'Object-Oriented Database Model (UML Class & Inheritance Hierarchy)',
          'NoSQL Database Models (Polyglot Persistence & Distributed Scale)',
        ],
      },
      { title: 'Comparing All 6 Database Models', sectionId: 'l2-comparison' },
    ],
  },
  {
    id: 'L3',
    topicId: 'backend-lesson3',
    title: 'Lesson 3: Introduction to Relational Databases',
    accent: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    topics: [
      { title: 'What is a Relational Database & a Relation?', sectionId: 'l3-relation' },
      { title: 'Tuples (Rows) & Attributes (Columns)', sectionId: 'l3-tuples-attrs' },
      { title: 'What is a Domain? (Permissible Value Boundaries)', sectionId: 'l3-domain' },
      { title: 'Relational Schema vs Relational Instance', sectionId: 'l3-schema-instance' },
      { title: 'Degree vs Cardinality (Crucial Exam Concept)', sectionId: 'l3-degree-card' },
      { title: 'What is NULL in a Database?', sectionId: 'l3-null' },
      { title: '7 Fundamental Properties of a Relational Table', sectionId: 'l3-properties' },
    ],
  },
  {
    id: 'L4',
    topicId: 'backend-lesson4',
    title: "Lesson 4: Keys in DBMS – Complete Beginner's Guide",
    accent: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    topics: [
      { title: 'Why do we need keys? (The Problem of Ambiguity)', sectionId: 'l4-why-keys' },
      {
        title: 'The Types of Keys in DBMS',
        sectionId: 'l4-key-types',
        children: [
          'Super Key -> Candidate Key -> Primary Key -> Alternate Key -> Foreign Key & Referential Integrity -> Composite Key -> Unique Key -> Natural Key and Surrogate Key',
        ],
      },
    ],
  },
  {
    id: 'L5',
    topicId: 'backend-lesson5',
    title: 'Lesson 5: Entity Relationship (ER) Model',
    accent: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    topics: [
      { title: 'What is an ER Model? (Entity Relationship Model)', sectionId: 'l5-er-model' },
      { title: 'Core Components in ER Diagrams', sectionId: 'l5-core-concepts' },
      { title: 'Key Concepts in ER Diagrams', sectionId: 'l5-core-concepts' },
      { title: 'What is an Entity? & Entity Types (Strong vs Weak)', sectionId: 'l5-entity' },
      {
        title: 'What are Attributes? & Attribute Types',
        sectionId: 'l5-attributes',
        children: ['Simple -> Composite -> Key (Primary) -> Multivalued -> Derived'],
      },
      {
        title: 'Relationships & Degree of Relationship',
        sectionId: 'l5-relationships',
        children: ['Unary | Binary | Ternary | Nary'],
      },
      {
        title: 'Structural Constraints: Cardinality Ratio & Participation Constraints',
        sectionId: 'l5-cardinality',
        children: ['One to One | One to Many | Many to One | Many to Many'],
      },
    ],
  },
  {
    id: 'L6',
    topicId: 'backend-lesson6',
    title: 'Lesson 6: Introduction to SQL Structured Query Language',
    accent: 'text-sky-400',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    topics: [
      { title: 'What is SQL? (Structured Query Language)', sectionId: 'l6-what-is-sql' },
      {
        title: 'How Does SQL Work? The Internal Query Processing Pipeline (University Scenario)',
        sectionId: 'l6-how-sql-works',
      },
      {
        title: 'The 5 Command Families in SQL (DDL, DQL, DML, DCL, TCL)',
        sectionId: 'l6-command-families',
        children: [
          'DDL -> CREATE | ALTER | TRUNCATE | DROP | RENAME',
          { title: 'DQL -> SELECT', sectionId: 'l6-select-basics' },
          'DML -> INSERT | UPDATE | DELETE',
          'DCL -> GRANT | REVOKE',
          'TCL -> COMMIT | ROLLBACK | SAVEPOINT',
        ],
      },
      {
        title: 'Creating Databases, Tables & SQL Data Types',
        sectionId: 'l6-create-db-tables',
        children: ['STRING | NUMERIC | DATE & TIME | BOOLEAN & SPECIAL'],
      },
      { title: 'SQL Constraints & Integrity Rules', sectionId: 'l6-constraints' },
      { title: 'Querying Data: SELECT, WHERE, ORDER BY & LIMIT', sectionId: 'l6-select-basics' },
      { title: 'UPDATE and DELETE: Syntax & Production Safety', sectionId: 'l6-update-delete' },
      { title: 'Aggregates, GROUP BY & HAVING: The University Journey', sectionId: 'l6-aggregates' },
      {
        title: 'SQL Joins: Why, When & Visual Flow',
        sectionId: 'l6-joins',
        children: ['INNER | LEFT | RIGHT | FULL'],
      },
      { title: 'ALTER, DROP, and TRUNCATE Comparison', sectionId: 'l6-alter-drop-truncate' },
    ],
  },
];

export default function DatabaseBasicsTopic({ onNavigate }: DatabaseBasicsTopicProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(DIRECTORY_LESSONS.map((l) => [l.id, true]))
  );

  const toggleLesson = (id: string) => {
    setExpandedLessons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    setExpandedLessons(Object.fromEntries(DIRECTORY_LESSONS.map((l) => [l.id, true])));
  };

  const collapseAll = () => {
    setExpandedLessons(Object.fromEntries(DIRECTORY_LESSONS.map((l) => [l.id, false])));
  };

  const filteredLessons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DIRECTORY_LESSONS;

    return DIRECTORY_LESSONS.map((lesson) => {
      const lessonMatches = lesson.title.toLowerCase().includes(q);
      if (lessonMatches) return lesson;

      const matchingTopics = lesson.topics.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.children?.some((c) => {
            const label = typeof c === 'string' ? c : c.title;
            return label.toLowerCase().includes(q);
          })
      );
      if (matchingTopics.length === 0) return null;
      return { ...lesson, topics: matchingTopics };
    }).filter((item): item is DirectoryLesson => item !== null);
  }, [searchQuery]);

  const totalTopics = DIRECTORY_LESSONS.reduce((acc, l) => acc + l.topics.length, 0);

  return (
    <div className="w-full space-y-6 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      {/* Directory Header */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-5 md:p-7 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
                  Database &amp; DBMS Directory
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {DIRECTORY_LESSONS.length} Lessons • {totalTopics} Core Topics
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white mt-1 tracking-tight font-mono">
                DATABASE &amp; DBMS
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Click any topic or subtopic below to jump directly to that exact section.
              </p>
            </div>
          </div>

          {/* Quick Jump Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {DIRECTORY_LESSONS.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onNavigate?.(lesson.topicId)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition-colors cursor-pointer hover:brightness-125 ${lesson.badgeBg}`}
                title={lesson.title}
              >
                {lesson.id}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Tree Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter lessons, models, keys, SQL commands..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#0a0d18] border border-slate-800 text-xs font-mono text-slate-200 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-[#14182d] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-zinc-300 cursor-pointer transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-[#14182d] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-zinc-300 cursor-pointer transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </section>

      {/* Clickable Hierarchy Tree */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-3">
        {filteredLessons.length === 0 ? (
          <div className="py-10 text-center text-xs font-mono text-zinc-400">
            No matching lessons or topics found for &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          filteredLessons.map((lesson) => {
            const isOpen = searchQuery.trim() ? true : !!expandedLessons[lesson.id];
            return (
              <div
                key={lesson.id}
                className="rounded-xl bg-[#0b0e1a] border border-slate-800/90 overflow-hidden"
              >
                {/* Lesson Folder Row */}
                <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[#121629] border-b border-slate-800/70">
                  <button
                    onClick={() => toggleLesson(lesson.id)}
                    className="flex items-center gap-2.5 text-left flex-1 min-w-0 cursor-pointer group"
                  >
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                    {isOpen ? (
                      <FolderOpen className={`w-4 h-4 shrink-0 ${lesson.accent}`} />
                    ) : (
                      <Folder className={`w-4 h-4 shrink-0 ${lesson.accent}`} />
                    )}
                    <span className="text-xs md:text-sm font-bold font-mono text-white group-hover:text-cyan-300 transition-colors truncate">
                      {lesson.title}
                    </span>
                  </button>

                  <button
                    onClick={() => onNavigate?.(lesson.topicId)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border flex items-center gap-1 shrink-0 cursor-pointer transition-colors hover:brightness-125 ${lesson.badgeBg}`}
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Nested Topics */}
                {isOpen && (
                  <div className="px-4 py-2.5 space-y-1">
                    {lesson.topics.map((topic, idx) => (
                      <div key={idx} className="pl-3 border-l border-slate-800/90">
                        <button
                          onClick={() => onNavigate?.(lesson.topicId, topic.sectionId)}
                          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs font-mono text-zinc-300 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer group"
                        >
                          <FileText className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 shrink-0" />
                          <span className="flex-1">{topic.title}</span>
                          <ArrowRight className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-cyan-400 transition-opacity shrink-0" />
                        </button>

                        {topic.children && topic.children.length > 0 && (
                          <div className="ml-5 pl-3 border-l border-slate-800/70 space-y-0.5 py-0.5">
                            {topic.children.map((sub, sIdx) => {
                              const label = typeof sub === 'string' ? sub : sub.title;
                              const targetSection =
                                typeof sub === 'string' ? topic.sectionId : sub.sectionId ?? topic.sectionId;
                              return (
                                <button
                                  key={sIdx}
                                  onClick={() => onNavigate?.(lesson.topicId, targetSection)}
                                  className="w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-left text-[11px] font-mono text-zinc-400 hover:text-cyan-300 hover:bg-slate-800/40 transition-colors cursor-pointer"
                                >
                                  <span className="text-slate-600">└─</span>
                                  <span>{label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
