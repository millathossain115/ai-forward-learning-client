'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Maximize2,
  X,
  BookOpen,
  Database,
  Table as TableIcon,
  Layers,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Building2,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Compass,
  FileCode2,
  Workflow,
  Share2,
  Terminal,
  Code2,
  Play,
  RotateCcw,
  Copy,
  Check,
  Search,
  Filter,
  Server,
  AlertTriangle,
  XCircle,
  PlusCircle,
  Hash,
  Calendar,
  DollarSign,
  Type,
  Sliders,
  Eye,
  Zap,
  GitMerge,
  Trash2,
  Edit3,
  Plus,
  KeyRound,
  ListOrdered,
  Briefcase
} from 'lucide-react';
import { TopicId } from '@/config/navigation';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface DatabaseLesson6TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// Sample Student Data for Interactive Visualizers
interface StudentRecord {
  id: number;
  name: string;
  age: number;
  email: string;
  deptId: number;
  deptName: string;
  gpa: number;
}

const INITIAL_STUDENTS: StudentRecord[] = [
  { id: 101, name: 'Rahim', age: 22, email: 'rahim@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.80 },
  { id: 102, name: 'Karim', age: 23, email: 'karim@gmail.com', deptId: 2, deptName: 'BBA', gpa: 3.45 },
  { id: 103, name: 'Sumaiya', age: 21, email: 'sumaiya@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.92 },
  { id: 104, name: 'Nabila', age: 22, email: 'nabila@gmail.com', deptId: 3, deptName: 'EEE', gpa: 3.60 },
  { id: 105, name: 'Tanvir', age: 24, email: 'tanvir@gmail.com', deptId: 2, deptName: 'BBA', gpa: 3.20 },
  { id: 106, name: 'Farhana', age: 20, email: 'farhana@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.85 },
];

const DEPARTMENTS = [
  { id: 1, name: 'CSE', head: 'Dr. Hasan', room: 'Lab 402' },
  { id: 2, name: 'BBA', head: 'Prof. Kabir', room: 'Tower 301' },
  { id: 3, name: 'EEE', head: 'Dr. Nazmul', room: 'Circuits 105' },
  { id: 4, name: 'Civil', head: 'Prof. Alam', room: 'Design 204' } // Empty dept for Right Join demo
];

// Unified University Story Pipeline Data
interface PipelineStepData {
  step: number;
  labelEn: string;
  labelBn: string;
  titleEn: string;
  titleBn: string;
  tagEn: string;
  tagBn: string;
  storyEn: string;
  storyBn: string;
  engineEn: string;
  engineBn: string;
  payloadTitleEn: string;
  payloadTitleBn: string;
  payloadCode: string;
  errorTitleEn: string;
  errorTitleBn: string;
  errorCode: string;
}

const SQL_PIPELINE_STORY_STEPS: PipelineStepData[] = [
  {
    step: 1,
    labelEn: '1. Client / Portal',
    labelBn: '১. ক্লায়েন্ট / পোর্টাল',
    titleEn: 'Step 1: Client Request (Rahim at Student Portal)',
    titleBn: 'ধাপ ১: ক্লায়েন্ট রিকোয়েস্ট (স্টুডেন্ট পোর্টালে রহিম)',
    tagEn: 'RAW SQL TRANSMISSION',
    tagBn: 'কোয়েরি প্রেরণ ও সকেট সংযোগ',
    storyEn: 'Rahim logs into his university portal on his laptop, opens the results page, and clicks "View My Result".',
    storyBn: 'রহিম ল্যাপটপে বিশ্ববিদ্যালয়ের রেজাল্ট পোর্টালে লগইন করে "View My Result" বাটনে ক্লিক করে।',
    engineEn: 'The backend web app borrows a connection from the pool and transmits the raw SQL text over a TCP network socket to the database server.',
    engineBn: 'ওয়েব ব্যাকএন্ড কানেকশন পুল থেকে সকেট সংযোগ নিয়ে র\' (Raw) SQL টেক্সট কুয়েরিটি TCP সকেটের মাধ্যমে ডেটাবেস সার্ভারে পাঠায়।',
    payloadTitleEn: 'Transmitted Query Payload:',
    payloadTitleBn: 'প্রেরিত কুয়েরি পে-লোড:',
    payloadCode: 'SELECT name, gpa FROM students WHERE dept_id = 1;',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: "ERROR 2003 (HY000): Can't connect to MySQL server on 'univ-db' (Connection refused / Port blocked)"
  },
  {
    step: 2,
    labelEn: '2. Parser & Lexer',
    labelBn: '২. পার্সার ও লেক্সার',
    titleEn: 'Step 2: Parser & Lexer (Syntax Analysis & AST)',
    titleBn: 'ধাপ ২: পার্সার ও লেক্সার (সিনট্যাক্স ও ব্যাকরণ যাচাই)',
    tagEn: 'TOKENIZATION & AST GENERATION',
    tagBn: 'টোকেন বিশ্লেষণ ও সিনট্যাক্স ট্রি',
    storyEn: 'The engine examines the query: Did Rahim make a typing mistake? Are "SELECT", "FROM", and "WHERE" spelled correctly?',
    storyBn: 'ইঞ্জিন কুয়েরিটি পরীক্ষা করে: রহিমের কুয়েরিতে কোনো বানান ভুল আছে কি না? "SELECT", "FROM" ও "WHERE" ব্যাকরণসম্মত কি না?',
    engineEn: 'The Lexer splits the character stream into discrete tokens, and the Parser verifies syntax against SQL grammar rules to build an Abstract Syntax Tree (AST).',
    engineBn: 'লেক্সার টেক্সটকে ক্ষুদ্র টোকেনে ভাগ করে এবং পার্সার SQL ব্যাকরণ যাচাই করে একটি অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) গঠন করে।',
    payloadTitleEn: 'Generated Abstract Syntax Tree (AST):',
    payloadTitleBn: 'জেনারেটেড AST স্ট্রাকচার:',
    payloadCode: 'SelectStmt [Columns: (name, gpa), From: (students), Where: (dept_id = 1)]',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: "ERROR 1064 (42000): You have an error in your SQL syntax near 'SELEC name, gpa FROM...'"
  },
  {
    step: 3,
    labelEn: '3. Semantic & Catalog',
    labelBn: '৩. সিম্যান্টিক ও ক্যাটালগ',
    titleEn: 'Step 3: Semantic Analyzer & Catalog Resolver',
    titleBn: 'ধাপ ৩: সিম্যান্টিক ও ক্যাটালগ যাচাই (অবজেক্ট অস্তিত্ব ও পারমিশন)',
    tagEn: 'SCHEMA BINDING & PRIVILEGES',
    tagBn: 'মেটাডেটা বাইন্ডিং ও পারমিশন',
    storyEn: 'Engine verifies against university records: Does the "students" table exist? Does column "gpa" exist? Does Rahim have permission to read grades?',
    storyBn: 'ইঞ্জিন ইউনিভার্সিটির মেটাডেটা ক্যাটালগে খোঁজে: "students" টেবিল ও "gpa" কলাম কি আসলেই আছে? আর রহিমের কি গ্রেড দেখার রিড-পারমিশন আছে?',
    engineEn: 'Binds tokens to concrete catalog objects (table ID, column attributes, data types) and validates that the authenticated database user has SELECT privileges.',
    engineBn: 'সিস্টেম ক্যাটালগ থেকে টেবিল আইডি ও কলাম টাইপ বাইন্ডিং সম্পন্ন করে এবং ইউজারের রোল ও SELECT পারমিশন যাচাই করে বৈধতা নিশ্চিত করে।',
    payloadTitleEn: 'Resolved Metadata Binding:',
    payloadTitleBn: 'রিজলভড মেটাডেটা বাইন্ডিং:',
    payloadCode: 'BoundQuery: Table_ID#10 (students) ➔ Col#1 (name: VARCHAR), Col#5 (gpa: DECIMAL) [Access: OK]',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: "ERROR 1146 (42S02): Table 'univ_db.students' doesn't exist / Column 'gpaa' unknown"
  },
  {
    step: 4,
    labelEn: '4. Query Optimizer',
    labelBn: '৪. কুয়েরি অপ্টিমাইজার',
    titleEn: 'Step 4: Query Optimizer (Cost-Based Optimizer - CBO)',
    titleBn: 'ধাপ ৪: কুয়েরি অপ্টিমাইজার (কস্ট হিসাব ও দ্রুততম পাথ)',
    tagEn: 'PHYSICAL PLAN GENERATION',
    tagBn: 'ফিজিক্যাল এক্সিকিউশন প্ল্যান',
    storyEn: 'Engine weighs options: Should it scan all 10,000 university students one-by-one (Full Scan), or use the department index? It chooses the fast Index Scan!',
    storyBn: 'ইঞ্জিন কৌশল নির্ধারণ করে: বিশ্ববিদ্যালয়ের ১০,০০০ শিক্ষার্থীর সবাইকে কি একটি একটি করে স্ক্যান করবে, নাকি ডিপার্টমেন্ট ইনডেক্স ব্যবহার করবে? দ্রুততম Index Scan বেছে নেয়!',
    engineEn: 'The CBO calculates disk I/O and CPU costs using data distribution histograms, selecting the optimal physical access path (Index Range Scan on dept_id).',
    engineBn: 'কস্ট-বেসড অপটিমাইজার ডেটা ডিস্ট্রিবিউশন হিস্টোগ্রাম বিশ্লেষণ করে সর্বনিম্ন CPU ও ডিস্ক খরচের পাথ (dept_id এর ওপর B-Tree Index Scan) নির্বাচন করে।',
    payloadTitleEn: 'Selected Physical Plan (EXPLAIN):',
    payloadTitleBn: 'নির্বাচিত ফিজিক্যাল প্ল্যান:',
    payloadCode: 'INDEX_RANGE_SCAN(idx_dept_id, value=1) [Est. Cost: 2.15 vs Full Table Scan: 168.4]',
    errorTitleEn: 'Potential issue at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য পারফরম্যান্স সমস্যা:',
    errorCode: 'Suboptimal Plan: Outdated table statistics cause optimizer to choose slow Full Table Scan'
  },
  {
    step: 5,
    labelEn: '5. Execution Engine',
    labelBn: '৫. এক্সিকিউশন ইঞ্জিন',
    titleEn: 'Step 5: Query Execution Engine (Volcano Iterators)',
    titleBn: 'ধাপ ৫: কুয়েরি এক্সিকিউশন ইঞ্জিন (অপারেটর পাইপলাইন চালনা)',
    tagEn: 'OPERATOR ITERATOR MODEL',
    tagBn: 'মেমোরি অপারেটর ও ফিল্টারিং',
    storyEn: 'Engine springs into action, running operators step-by-step in memory and filtering only students belonging to Rahim\'s department (dept_id = 1).',
    storyBn: 'ইঞ্জিন সক্রিয় হয়ে মেমোরিতে প্ল্যানের ধাপগুলো চালায় এবং শুধুমাত্র রহিমের ডিপার্টমেন্টের (dept_id = 1) রেকর্ডগুলো ফিল্টার করে প্রস্তুত করে।',
    engineEn: 'Executes the plan using the Volcano Iterator Model (open() -> next() -> close()), driving row retrieval through projections and condition filters.',
    engineBn: 'নির্বাচিত প্ল্যান ধরে মেমোরিতে অপারেটর পাইপলাইন চালায় (Volcano Iterator: open ➔ next ➔ close), কলাম প্রজেকশন সমন্বয় ও ফিল্টার যাচাই করে।',
    payloadTitleEn: 'Operator Execution Pipeline:',
    payloadTitleBn: 'অপারেটর এক্সিকিউশন চেইন:',
    payloadCode: 'Projection(name, gpa) ➔ Filter(dept_id = 1) ➔ IndexRangeIterator(idx_dept_id)',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: 'ERROR 3024 (HY000): Query execution was interrupted, max_statement_time exceeded'
  },
  {
    step: 6,
    labelEn: '6. Storage & Buffer',
    labelBn: '৬. স্টোরেজ ও বাফার',
    titleEn: 'Step 6: Storage Engine & Buffer Pool (RAM Cache Hit)',
    titleBn: 'ধাপ ৬: স্টোরেজ ইঞ্জিন ও বাফার পুল (র‍্যাম ক্যাশ ও দ্রুত রিড)',
    tagEn: 'BUFFER POOL CACHING & ROW FETCH',
    tagBn: 'বাফার পুল ও মেমোরি ক্যাশিং',
    storyEn: 'Engine checks server RAM: Is the student data page already cached in the Buffer Pool? Yes, Cache Hit! Rahim\'s record is read from RAM in microseconds.',
    storyBn: 'ইঞ্জিন সার্ভারের র‍্যাম বাফার পুলে চেক করে: শিক্ষার্থীদের ডেটা পেজ কি র‍্যামে ক্যাশড আছে? ক্যাশ হিট! স্লো হার্ডডিস্কে না গিয়েই মুহূর্তে র‍্যাম থেকে ডেটা চলে আসল।',
    engineEn: 'The storage engine (e.g. InnoDB) checks the 16KB buffer pool. Cache hit avoids disk I/O, acquires a shared read lock (S-Lock), and ensures MVCC isolation.',
    engineBn: 'স্টোরেজ ইঞ্জিন (InnoDB) ১৬ কিলোবাইট বাফার পুল ক্যাশ পরীক্ষা করে। ক্যাশ হিটের কারণে হার্ডডিস্ক ছাড়াই র‍্যাম থেকে মাইক্রোসেকেন্ডে ডেটা রিটার্ন হয়।',
    payloadTitleEn: 'Memory & Storage Status:',
    payloadTitleBn: 'মেমরি ও স্টোরেজ স্ট্যাটাস:',
    payloadCode: 'Buffer Pool Cache Hit: 100% | NVMe Reads: 0 pages | Lock: Shared (S) | Read Time: 0.0004s',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: 'ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction'
  },
  {
    step: 7,
    labelEn: '7. Result Return',
    labelBn: '৭. রেজাল্ট ফেরত',
    titleEn: 'Step 7: Result Formatter & Client Screen Delivery',
    titleBn: 'ধাপ ৭: রেজাল্ট ফরম্যাট ও রহিমের স্ক্রিনে চূড়ান্ত প্রদর্শন',
    tagEn: 'NETWORK PACKET & SCREEN RENDER',
    tagBn: 'প্যাকেট ট্রান্সমিশন ও আউটপুট',
    storyEn: 'Engine streams the formatted result back across the network socket—and in less than 2 milliseconds, Rahim sees on screen: "Rahim | GPA: 3.85"!',
    storyBn: 'ইঞ্জিন মেমোরির রেকর্ডকে নেটওয়ার্ক প্যাকেটে সাজিয়ে সকেটে পাঠিয়ে দেয়—মুহূর্তেই (১.৪ মিলি-সেকেন্ডে) রহিমের স্ক্রিনে ভেসে উঠল: "Rahim | GPA: 3.85"!',
    engineEn: 'Serializes rows into standard database network protocol packets, streams tabular data back through the TCP socket to the client, and closes the cursor.',
    engineBn: 'মেমোরির ডেটাকে ক্লায়েন্ট প্রটোকল প্যাকেটে সিরিয়ালাইজ করে নেটওয়ার্ক সকেট দিয়ে ব্রাউজারে পাঠায়, কার্সার রিলিজ করে এবং সেশন রিসেট করে।',
    payloadTitleEn: 'Final Client Result Set:',
    payloadTitleBn: 'চূড়ান্ত ক্লায়েন্ট আউটপুট:',
    payloadCode: '1 row in set (0.0014 sec) ➔ [{ name: "Rahim", gpa: 3.85 }] • Ready for next query',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: 'ERROR 2013 (HY000): Lost connection to MySQL server during query response streaming'
  }
];

export default function DatabaseLesson6Topic({ onNavigate }: DatabaseLesson6TopicProps) {
  const { language } = useLanguage();

  // Command Family Tabs (DDL, DML, DQL, DCL, TCL)
  const [activeCommandTab, setActiveCommandTab] = useState<'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL'>('DDL');

  // Interactive Live Query Playground
  const [activeQueryPreset, setActiveQueryPreset] = useState<string>('all');
  const [customWhereFilter, setCustomWhereFilter] = useState<'ALL' | 'CSE' | 'BBA' | 'AGE_OVER_21' | 'HIGH_GPA'>('ALL');
  const [sortOrder, setSortOrder] = useState<'NONE' | 'AGE_ASC' | 'AGE_DESC' | 'GPA_DESC'>('NONE');

  // Constraint Sandbox State
  const [constraintDemo, setConstraintDemo] = useState<'PK' | 'NOT_NULL' | 'UNIQUE' | 'CHECK' | 'FK' | 'DEFAULT'>('PK');
  const [constraintTestStatus, setConstraintTestStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  // Joins Explorer State
  const [activeJoinType, setActiveJoinType] = useState<'INNER' | 'LEFT' | 'RIGHT' | 'FULL'>('INNER');

  // Aggregate Calculator Active Tab
  const [activeAggregate, setActiveAggregate] = useState<'COUNT' | 'AVG' | 'MAX' | 'MIN' | 'SUM'>('COUNT');

  // Complete Project Step
  const [activeProjectStep, setActiveProjectStep] = useState<number>(1);

  // Homework Task Solution Revealer
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  // Selective Interview Questions Accordion State (All collapsed by default)
  const [openExamQuestions, setOpenExamQuestions] = useState<Record<string, boolean>>({});

  // Copy Feedback state
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

  // Close pipeline modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPipelineModalOpen(false);
      }
    };
    if (isPipelineModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPipelineModalOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toggleSolution = (taskNum: number) => {
    setRevealedSolutions(prev => ({ ...prev, [taskNum]: !prev[taskNum] }));
  };

  const toggleExamQ = (id: string) => {
    setOpenExamQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllExamQ = () => {
    const all: Record<string, boolean> = {};
    for (let i = 1; i <= 10; i++) all[`sq${i}`] = true;
    setOpenExamQuestions(all);
  };

  const collapseAllExamQ = () => {
    const all: Record<string, boolean> = {};
    for (let i = 1; i <= 10; i++) all[`sq${i}`] = false;
    setOpenExamQuestions(all);
  };

  // Filtered dataset for live query visualizer
  const displayStudents = useMemo(() => {
    let result = [...INITIAL_STUDENTS];

    if (customWhereFilter === 'CSE') {
      result = result.filter(s => s.deptName === 'CSE');
    } else if (customWhereFilter === 'BBA') {
      result = result.filter(s => s.deptName === 'BBA');
    } else if (customWhereFilter === 'AGE_OVER_21') {
      result = result.filter(s => s.age > 21);
    } else if (customWhereFilter === 'HIGH_GPA') {
      result = result.filter(s => s.gpa >= 3.80);
    }

    if (sortOrder === 'AGE_ASC') {
      result.sort((a, b) => a.age - b.age);
    } else if (sortOrder === 'AGE_DESC') {
      result.sort((a, b) => b.age - a.age);
    } else if (sortOrder === 'GPA_DESC') {
      result.sort((a, b) => b.gpa - a.gpa);
    }

    return result;
  }, [customWhereFilter, sortOrder]);

  // Aggregate stats computed live
  const aggregateResult = useMemo(() => {
    const ages = INITIAL_STUDENTS.map(s => s.age);
    const gpas = INITIAL_STUDENTS.map(s => s.gpa);
    switch (activeAggregate) {
      case 'COUNT':
        return { label: 'COUNT(Student_ID)', value: INITIAL_STUDENTS.length, unit: 'students enrolled' };
      case 'AVG':
        return { label: 'AVG(GPA)', value: (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2), unit: 'average GPA' };
      case 'MAX':
        return { label: 'MAX(GPA)', value: Math.max(...gpas).toFixed(2), unit: 'highest GPA (Sumaiya)' };
      case 'MIN':
        return { label: 'MIN(Age)', value: Math.min(...ages), unit: 'youngest student age (Farhana, 20)' };
      case 'SUM':
        return { label: 'SUM(Age)', value: ages.reduce((a, b) => a + b, 0), unit: 'total years combined' };
    }
  }, [activeAggregate]);

  const selectiveInterviewQuestions = [
    {
      id: 'sq1',
      tagEn: 'System Architecture',
      tagBn: 'সিস্টেম আর্কিটেকচার',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'What is SQL and why is it essential in modern software engineering?',
      qBn: 'এসকিউএল (SQL) কী এবং আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিংয়ে এটি কেন অপরিহার্য?',
      summaryEn: 'SQL (Structured Query Language) is the standardized declarative language used to define, manipulate, and query relational databases (RDBMS).',
      summaryBn: 'এসকিউএল হলো স্ট্যান্ডার্ড ডিক্লেয়ারিটিভ কুয়েরি ল্যাঙ্গুয়েজ, যা রিলেশনাল ডেটাবেসে ডেটা সংরক্ষণ, ফিল্টারিং, পরিবর্তন ও ইন্টিগ্রিটি নিয়ন্ত্রণে ব্যবহৃত হয়।',
      bulletsEn: [
        'Declarative Nature: Engineers specify WHAT data is needed, while the database query optimizer plans HOW to fetch it optimally.',
        'Universal Standard: Standardized by ANSI/ISO, powering MySQL, PostgreSQL, Oracle, SQLite, and Microsoft SQL Server.',
        'ACID Guarantee: Enables transactional guarantees (Atomicity, Consistency, Isolation, Durability) for enterprise systems.'
      ],
      bulletsBn: [
        'ডিক্লেয়ারিটিভ প্রকৃতি: ডেভেলপার কেবল বলে কী ডেটা প্রয়োজন, আর ডেটাবেসের অপটিমাইজার নিজে নির্ধারণ করে কীভাবে সবচেয়ে দ্রুত তা বের করা যায়।',
        'সার্বজনীন মানদণ্ড: ANSI/ISO স্ট্যান্ডার্ড মেনে তৈরি, যা MySQL, PostgreSQL, Oracle, SQLite ইত্যাদিতে ব্যবহৃত হয়।',
        'ACID নিশ্চয়তা: এন্টারপ্রাইজ সিস্টেমে লেনদেনের নির্ভরযোগ্যতা (Atomicity, Consistency, Isolation, Durability) নিশ্চিত করে।'
      ]
    },
    {
      id: 'sq2',
      tagEn: 'RDBMS vs SQL',
      tagBn: 'আরডিবিএমএস বনাম এসকিউএল',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'What is the fundamental difference between SQL and MySQL?',
      qBn: 'SQL এবং MySQL-এর মধ্যে মৌলিক পার্থক্য কী?',
      summaryEn: 'SQL is an abstract query language specification; MySQL is a concrete software RDBMS engine implementing that specification.',
      summaryBn: 'SQL হলো কুয়েরি ভাষার একটি আদর্শ স্পেসিফিকেশন; আর MySQL হলো একটি নির্দিষ্ট সফটওয়্যার অ্যাপ্লিকেশন (RDBMS ইঞ্জিন) যা ওই স্পেসিফিকেশন প্রয়োগ করে।',
      bulletsEn: [
        'SQL is the language; MySQL is the software product developed by Oracle.',
        'Analogy: SQL is like the English language specification; MySQL, PostgreSQL, and SQLite are distinct speakers of that language.',
        'MySQL adds custom extensions (e.g., specific storage engines like InnoDB, replication tools, and administration utilities).'
      ],
      bulletsBn: [
        'SQL হলো ভাষা; আর MySQL হলো ওরাকল দ্বারা ডেভেলপকৃত একটি সফটওয়্যার প্রডাক্ট।',
        'বাস্তব রূপক: SQL হলো ইংরেজি ভাষা; আর MySQL, PostgreSQL ও SQLite হলো সেই ভাষায় কথা বলা ভিন্ন ভিন্ন সফটওয়্যার।',
        'MySQL-এ নিজস্ব কিছু ইঞ্জিন (যেমন: InnoDB), রেপ্লিকেশন এবং অ্যাডমিনিস্ট্রেশন টুলস থাকে।'
      ]
    },
    {
      id: 'sq3',
      tagEn: 'Command Classification',
      tagBn: 'কমান্ডের শ্রেণীবিন্যাস',
      difficultyEn: 'Core Concept',
      difficultyBn: 'মৌলিক কনসেপ্ট',
      qEn: 'Define DDL, DML, DQL, DCL, and TCL with practical examples.',
      qBn: 'বাস্তব উদাহরণসহ DDL, DML, DQL, DCL এবং TCL-এর সুনির্দিষ্ট পার্থক্য ব্যাখ্যা করো।',
      summaryEn: 'SQL commands are grouped into 5 functional families based on whether they alter schema, modify data, query records, manage permissions, or handle transactions.',
      summaryBn: 'কাজের ধরন অনুযায়ী SQL কমান্ডকে ৫টি প্রধান ফ্যামিলিতে ভাগ করা হয়: স্কিমা তৈরি, ডেটা পরিবর্তন, কুয়েরি, পারমিশন নিয়ন্ত্রণ এবং ট্রানজ্যাকশন নিয়ন্ত্রণ।',
      bulletsEn: [
        'DDL (Data Definition Language): Alters schema structure (CREATE, ALTER, DROP, TRUNCATE). Auto-committed in most engines.',
        'DML (Data Manipulation Language): Modifies stored records (INSERT, UPDATE, DELETE). Can be rolled back.',
        'DQL (Data Query Language): Retrieves records without mutating data (SELECT).',
        'DCL (Data Control Language): Manages security & privileges (GRANT, REVOKE).',
        'TCL (Transaction Control Language): Controls transactional safety (COMMIT, ROLLBACK, SAVEPOINT).'
      ],
      bulletsBn: [
        'DDL: ডেটাবেসের টেবিল ও স্কিমা স্ট্রাকচার তৈরি বা পরিবর্তন করে (CREATE, ALTER, DROP, TRUNCATE)।',
        'DML: টেবিলের ভেতরের রেকর্ড পরিবর্তন করে (INSERT, UPDATE, DELETE)। এটি রোলব্যাক করা যায়।',
        'DQL: কোনো ডেটা পরিবর্তন না করে কেবল ডেটা খুঁজে বের করে প্রদর্শন করে (SELECT)।',
        'DCL: ডেটাবেসে বিভিন্ন ইউজারের অ্যাক্সেস ও পারমিশন নিয়ন্ত্রণ করে (GRANT, REVOKE)।',
        'TCL: ট্রানজ্যাকশন নিরাপদে সেভ বা বাতিল করতে ব্যবহৃত হয় (COMMIT, ROLLBACK, SAVEPOINT)।'
      ]
    },
    {
      id: 'sq4',
      tagEn: 'Storage & Safeguards',
      tagBn: 'স্টোরেজ ও ডিলিট সেফটি',
      difficultyEn: 'Senior Level',
      difficultyBn: 'সিনিয়র লেভেল',
      qEn: 'What is the architectural difference between DELETE, TRUNCATE, and DROP?',
      qBn: 'DELETE, TRUNCATE এবং DROP-এর মধ্যে স্থাপত্যগত ও পারফরম্যান্সগত পার্থক্য কী?',
      summaryEn: 'DELETE removes specific rows matching WHERE and can be rolled back; TRUNCATE deallocates data pages instantly and resets identity counters; DROP completely removes schema and data from disk.',
      summaryBn: 'DELETE শর্ত মেনে এক বা একাধিক রো মুছে ফেলে এবং রোলব্যাক করা যায়; TRUNCATE অতিদ্রুত পুরো টেবিলের পেজ ডিয়ালোকেট করে এবং অটো-ইনক্রিমেন্ট রিসেট করে; আর DROP টেবিল কাঠামো সহ পুরো অবজেক্ট ডিস্ক থেকে মুছে ফেলে।',
      bulletsEn: [
        'DELETE is DML (row-by-row, triggers fire, logs each row removal, supports WHERE).',
        'TRUNCATE is DDL (deallocates storage pages, does not fire row triggers, cannot use WHERE, resets AUTO_INCREMENT).',
        'DROP is DDL (completely destroys table schema, indexes, constraints, and data).'
      ],
      bulletsBn: [
        'DELETE হলো DML: এটি প্রতিটি রো আলাদা করে ডিলিট করে, ট্রিগার চালু হয়, লগ রাখে এবং WHERE সাপোর্ট করে।',
        'TRUNCATE হলো DDL: এটি মেমোরি পেজ খালি করে নিমিষে সব মুছে ফেলে, কোনো রো ট্রিগার চলে না এবং আইডি ১ থেকে রিসেট হয়।',
        'DROP হলো DDL: এটি ডেটাসহ টেবিলের স্কিমা, ইনডেক্স ও কনস্ট্রেইন্ট সবকিছু চিরতরে মুছে ফেলে।'
      ]
    },
    {
      id: 'sq5',
      tagEn: 'Filtering & Aggregation',
      tagBn: 'ফিল্টারিং ও গ্রুপিং',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'What is the critical difference between WHERE and HAVING clauses in SQL?',
      qBn: 'SQL-এ WHERE ক্লজ এবং HAVING ক্লজের মধ্যে সুনির্দিষ্ট পার্থক্য কী?',
      summaryEn: 'WHERE filters individual tuples before grouping occurs and cannot accept aggregate functions; HAVING filters grouped summary rows after GROUP BY.',
      summaryBn: 'WHERE ক্লজ গ্রুপিংয়ের আগেই প্রতিটি একক সারির ওপর ফিল্টার চালায় এবং এতে এগ্রিগেট ফাংশন ব্যবহার করা যায় না; আর HAVING ক্লজ GROUP BY করার পর প্রাপ্ত গ্রুপ সামারিকে ফিল্টার করে।',
      bulletsEn: [
        'Execution Order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
        'WHERE cannot evaluate aggregates (e.g. WHERE COUNT(*) > 2 is a syntax error).',
        'HAVING is specifically designed to filter on aggregates (e.g. HAVING AVG(GPA) >= 3.5).'
      ],
      bulletsBn: [
        'এক্সিকিউশন অর্ডার: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY।',
        'WHERE-এ এগ্রিগেট ফাংশন চালানো যায় না (যেমন: WHERE COUNT(*) > ২ লিখলে সিনট্যাক্স এরর দেয়)।',
        'HAVING মূলত এগ্রিগেট ফলাফলের ওপর শর্ত আরোপ করতে ব্যবহৃত হয় (যেমন: HAVING AVG(GPA) >= ৩.৫)।'
      ]
    },
    {
      id: 'sq6',
      tagEn: 'Referential Integrity',
      tagBn: 'রেফারেন্সিয়াল ইন্টিগ্রিটি',
      difficultyEn: 'Core Architecture',
      difficultyBn: 'মূল আর্কিটেকচার',
      qEn: 'What is a Foreign Key and how does it prevent orphan records?',
      qBn: 'Foreign Key কী এবং এটি কীভাবে ডেটাবেসে এতিম (orphan) রেকর্ড তৈরি হওয়া রোধ করে?',
      summaryEn: 'A Foreign Key links a child table column to the Primary Key of a parent table, enforcing referential integrity by rejecting invalid references.',
      summaryBn: 'Foreign Key হলো চাইল্ড টেবিলের একটি কলাম যা প্যারেন্ট টেবিলের Primary Key-কে নির্দেশ করে এবং অবৈধ প্যারেন্ট রেফারেন্স বা ডেটার অসামঞ্জস্য রোধ করে।',
      bulletsEn: [
        'Guarantees that a child row cannot reference a non-existent parent ID.',
        'Supports CASCADE rules (ON DELETE CASCADE, ON UPDATE CASCADE, ON DELETE SET NULL).',
        'Prevents deleting a parent record while active child records depend on it.'
      ],
      bulletsBn: [
        'নিশ্চিত করে যে প্যারেন্ট টেবিলে অস্তিত্ব নেই এমন কোনো আইডি চাইল্ড টেবিলে ইনসার্ট করা যাবে না।',
        'CASCADE রুল সমর্থন করে (যেমন: প্যারেন্ট মুছলে চাইল্ড স্বয়ংক্রিয়ভাবে মুছে যাওয়া বা NULL হওয়া)।',
        'কোনো প্যারেন্ট রেকর্ড ডিলিট করা আটকে দেয় যদি তার ওপর কোনো চাইল্ড রেকর্ড নির্ভরশীল থাকে।'
      ]
    },
    {
      id: 'sq7',
      tagEn: 'Analytics & Aggregation',
      tagBn: 'এগ্রিগেট ফাংশন ও হিসাব',
      difficultyEn: 'Common',
      difficultyBn: 'সাধারণ',
      qEn: 'What are SQL aggregate functions and how do they handle NULL values?',
      qBn: 'SQL এগ্রিগেট ফাংশন কী কী এবং এগুলো NULL মানের ক্ষেত্রে কীভাবে আচরণ করে?',
      summaryEn: 'Aggregate functions compute a single scalar value from a column across multiple rows. Most functions (SUM, AVG, MIN, MAX, COUNT(col)) completely ignore NULLs.',
      summaryBn: 'এগ্রিগেট ফাংশন একাধিক সারির একটি নির্দিষ্ট কলামের ওপর হিসাব করে একক মান প্রদান করে। COUNT(*) ছাড়া বাকি সব ফাংশন (SUM, AVG, MIN, MAX) স্বয়ংক্রিয়ভাবে NULL মান বাদ দেয়।',
      bulletsEn: [
        'Standard 5: COUNT(), SUM(), AVG(), MAX(), MIN().',
        'COUNT(*) counts every row (including NULLs); COUNT(column_name) counts only non-NULL rows.',
        'AVG(col) calculates sum / count of NON-NULL items only, which can affect mathematical averages.'
      ],
      bulletsBn: [
        'স্ট্যান্ডার্ড ৫টি ফাংশন: COUNT(), SUM(), AVG(), MAX(), MIN()।',
        'COUNT(*) টেবিলের সব সারি (NULL সহ) গণনা করে; কিন্তু COUNT(col) কেবল non-NULL মানগুলো গুনে।',
        'AVG(col) কেবল non-NULL মানের যোগফল ও সংখ্যা দিয়ে গড় বের করে, যা হিসাবে প্রভাব ফেলতে পারে।'
      ]
    },
    {
      id: 'sq8',
      tagEn: 'Relational Joins',
      tagBn: 'রিলেশনাল জয়েন',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'Explain INNER JOIN vs LEFT JOIN with set theory and practical examples.',
      qBn: 'সেট থিওরি ও বাস্তব উদাহরণের মাধ্যমে INNER JOIN এবং LEFT JOIN-এর পার্থক্য বুঝিয়ে দাও।',
      summaryEn: 'INNER JOIN returns strictly rows where keys match in BOTH tables. LEFT JOIN returns ALL rows from the left table, filling non-matching right table columns with NULL.',
      summaryBn: 'INNER JOIN কেবল উভয় টেবিলে মিল থাকা কমন রেকর্ডগুলো রিটার্ন করে। LEFT JOIN বাম টেবিলের শতভাগ রেকর্ড রিটার্ন করে এবং ডান টেবিলে মিল না থাকলে সেখানে NULL বসায়।',
      bulletsEn: [
        'INNER JOIN = Set Intersection (A ∩ B).',
        'LEFT JOIN = Entire Table A + (A ∩ B). Ideal for finding items with 0 child entries (e.g. students with no courses via WHERE right.id IS NULL).',
        'Performance: INNER JOIN is typically faster because DBMS optimizers can reorder table joins freely.'
      ],
      bulletsBn: [
        'INNER JOIN = সেট ইন্টারসেকশন (A ∩ B)।',
        'LEFT JOIN = পুরো টেবিল A + ম্যাচিং B। কোনো চাইল্ড রেকর্ড নেই এমন তথ্য বের করতে এটি আদর্শ (যেমন: কোনো কোর্সে ভর্তি না হওয়া ছাত্র)।',
        'পারফরম্যান্স: INNER JOIN সাধারণত দ্রুত কাজ করে কারণ ডেটাবেস অপটিমাইজার যেকোনো দিক থেকে জয়েন করতে পারে।'
      ]
    },
    {
      id: 'sq9',
      tagEn: 'Result Optimization',
      tagBn: 'রেজাল্ট সেট অপটিমাইজেশন',
      difficultyEn: 'Standard',
      difficultyBn: 'সাধারণ',
      qEn: 'What does the DISTINCT keyword do and what is its performance consideration?',
      qBn: 'SQL-এ DISTINCT কিওয়ার্ডের কাজ কী এবং এর পারফরম্যান্স বিবেচনা কী?',
      summaryEn: 'SELECT DISTINCT eliminates duplicate rows from the returned result set. It requires an in-memory sort or hash deduplication step, which increases CPU/memory overhead.',
      summaryBn: 'SELECT DISTINCT ফলাফল থেকে হুবহু একই রকম একাধিক সারি বাদ দিয়ে অনন্য মান প্রদর্শন করে। এটি মেমোরিতে অতিরিক্ত সর্টিং বা হ্যাশ অপারেশন চালায় বিধায় বড় টেবিলে সতর্কতা প্রয়োজন।',
      bulletsEn: [
        'Evaluates across all selected columns in the tuple projection.',
        'Performance Cost: Forces sorting or temporary hash tables in RAM/disk.',
        'Best Practice: Do not use DISTINCT as a band-aid for flawed JOIN queries that accidentally duplicate rows.'
      ],
      bulletsBn: [
        'সিলেক্ট করা সবগুলো কলামের সমন্বিত মানের ওপর ভিত্তি করে ডুপ্লিকেট বাদ দেয়।',
        'পারফরম্যান্স খরচ: মেমোরিতে টেম্পোরারি টেবিল বা সর্ট করতে হয়।',
        'বেস্ট প্র্যাকটিস: ভুল জয়েনের কারণে ডুপ্লিকেট তৈরি হলে DISTINCT দিয়ে ধামাচাপা না দিয়ে জয়েন লজিক ঠিক করা উচিত।'
      ]
    },
    {
      id: 'sq10',
      tagEn: 'Pattern Matching & Indexing',
      tagBn: 'প্যাটার্ন ম্যাচিং ও ইনডেক্সিং',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'Explain the LIKE operator, wildcards (% and _), and index performance pitfalls.',
      qBn: 'LIKE অপারেটর, এর ওয়াইল্ডকার্ড (% এবং _) এবং ইনডেক্স ব্যবহারের পারফরম্যান্স প্রভাব ব্যাখ্যা করো।',
      summaryEn: 'LIKE performs pattern matching on text. "%" represents zero or more characters; "_" represents exactly one character. Leading wildcards prevent B-Tree index lookups.',
      summaryBn: 'LIKE টেক্সটের মধ্যে নির্দিষ্ট প্যাটার্ন খুঁজতে ব্যবহৃত হয়। "%" শূন্য বা একাধিক ক্যারেক্টার এবং "_" ঠিক একটি ক্যারেক্টার নির্দেশ করে। শুরুতে ওয়াইল্ডকার্ড থাকলে ইনডেক্স কাজ করে না।',
      bulletsEn: [
        '"R%" (Starts with R): Can use standard B-Tree index range scans.',
        '"%R" (Ends with R) or "%R%" (Contains R): Cannot use standard B-Tree indexes; forces a full table scan.',
        'Escape characters: Used when searching for literal "%" or "_" characters.'
      ],
      bulletsBn: [
        '"R%" (R দিয়ে শুরু): সাধারণ B-Tree ইনডেক্স ব্যবহার করতে পারে এবং অত্যন্ত দ্রুত ফলাফল দেয়।',
        '"%R" বা "%R%" (মাঝখানে বা শেষে): ইনডেক্স ব্যবহার করতে পারে না; ফলে পুরো টেবিলে ফুল স্ক্যান চালাতে হয়।',
        'এসকেপ ক্যারেক্টার: সরাসরি "%" বা "_" খুঁজতে চাইলে এসকেপ ক্যারেক্টার ব্যবহার করতে হয়।'
      ]
    }
  ];

  return (
    <div className="w-full space-y-12 pb-24 text-slate-200 animate-in fade-in duration-300 font-sans">
      {/* ========================================================
          HERO & HEADER BANNER
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1024] via-[#101535] to-[#080b18] border border-indigo-900/40 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top row: Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {language === 'bn' ? 'ফেজ ১ • ডেটা কোর' : 'Phase 1 • Data Core'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {language === 'bn' ? 'লেসন ৬ • প্র্যাকটিক্যাল এসকিউএল' : 'Lesson 6 • Practical SQL'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {language === 'bn' ? 'জিরো টু কুয়েরি প্রো' : 'Zero to Query Hero'}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            <DualText
              en={
                <>
                  Lesson 6: Introduction to SQL <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    Structured Query Language
                  </span>
                </>
              }
              bn={
                <>
                  লেসন ৬: এসকিউএল (SQL) পরিচিতি <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    স্ট্রাকচার্ড কুয়েরি ল্যাঙ্গুয়েজ ও হ্যান্ডস-অন প্র্যাকটিস
                  </span>
                </>
              }
            />
          </h1>

          <div className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
            <DualText
              en="Now we transition from database theory to real-world command execution. Learn how to create databases, construct tables with constraints, query and filter records, perform joins, compute aggregates, and write high-scoring exam & interview answers."
              bn="ডেটাবেস থিওরি থেকে সরাসরি বাস্তব কমান্ড এক্সিকিউশনে পদার্পণ করুন। শিখুন কীভাবে ডেটাবেস ও কনস্ট্রেইন্টযুক্ত টেবিল তৈরি করতে হয়, রেকর্ড ফিল্টার ও সর্ট করতে হয়, টেবিল জয়েন ও এগ্রিগেট কুয়েরি চালাতে হয় এবং ইন্টারভিউ ও পরীক্ষায় সেরা উত্তর প্রস্তুত করতে হয়।"
            />
          </div>


        </div>
      </div>

      {/* ========================================================
          PART 1: WHAT IS SQL?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১ • এসকিউএল পরিচিতি' : 'Part 1 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="What is SQL? (Structured Query Language)"
                bn="১. এসকিউএল (SQL) কী এবং এটি কেন ব্যবহৃত হয়?"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
              <h3 className="text-sm font-bold text-cyan-300 font-mono flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <DualText en="Standard Definition" bn="মানসম্মত সংজ্ঞা (Standard Definition)" />
              </h3>
              <DualText
                as="p"
                className="text-xs text-zinc-300 leading-relaxed font-sans"
                en={<><strong className="text-white">SQL</strong> stands for <span className="text-cyan-400 font-semibold">Structured Query Language</span>. It is the standardized, declarative computer language used to communicate with and manipulate <strong className="text-indigo-300">Relational Database Management Systems (RDBMS)</strong>.</>}
                bn={<><strong className="text-white">SQL</strong>-এর পূর্ণরূপ হলো <span className="text-cyan-400 font-semibold">Structured Query Language</span>। এটি রিলেশনাল ডেটাবেস ম্যানেজমেন্ট সিস্টেম (<strong className="text-indigo-300">RDBMS</strong>)-এর সাথে যোগাযোগ, ডেটা কোয়েরি ও ডেটাবেস পরিচালনার জন্য ব্যবহৃত আন্তর্জাতিক আদর্শ ও ঘোষণামূলক (declarative) ভাষা।</>}
              />
              <DualText
                as="p"
                className="text-xs text-zinc-400 leading-relaxed font-sans"
                en="It allows software engineers and analysts to create databases, define schemas, insert data, query records with filtering, modify rows, and secure user permissions."
                bn="এর মাধ্যমে সফটওয়্যার ইঞ্জিনিয়ার ও ডেটা অ্যানালিস্টরা ডেটাবেস তৈরি, টেবিল স্কিমা নির্ধারণ, ডেটা ইনসার্ট, জটিল ফিল্টারিং কোয়েরি, রেকর্ড আপডেট এবং নিরাপত্তা অনুমতি নিয়ন্ত্রণ করতে পারেন।"
              />
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-2">
              <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase">
                <DualText en="Real-World Analogy" bn="বাস্তব জীবনের রূপক (Analogy)" />
              </h3>
              <DualText
                as="p"
                className="text-xs text-zinc-300 leading-relaxed font-sans"
                en={<>Think of <strong>English</strong> as a human language. People in the UK, USA, Australia, and Canada speak English with small local dialect variations. Similarly:</>}
                bn={<><strong>ইংরেজি</strong> ভাষার কথা ভাবুন। যুক্তরাজ্য, যুক্তরাষ্ট্র বা কানাডার মানুষ নিজস্ব কিছু আঞ্চলিক উচ্চারণ বা ডায়ালেক্টসহ ইংরেজি বলে। একইভাবে:</>}
              />
              <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc marker:text-indigo-400">
                <li>
                  <DualText
                    en={<><strong>SQL</strong> is the standard language specification.</>}
                    bn={<><strong>SQL</strong> হলো মূল আদর্শ ভাষার স্পেসিফিকেশন।</>}
                  />
                </li>
                <li>
                  <DualText
                    en={<><strong>MySQL, PostgreSQL, Oracle, SQLite, and MS SQL Server</strong> are different database engines that &quot;speak&quot; SQL.</>}
                    bn={<><strong>MySQL, PostgreSQL, Oracle, SQLite, MS SQL Server</strong> হলো বিভিন্ন ডেটাবেস ইঞ্জিন যারা এই SQL ভাষায় কথা বলে।</>}
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* RDBMS Comparison Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
              <DualText en="Popular RDBMS Engines That Speak SQL" bn="জনপ্রিয় RDBMS ইঞ্জিনসমূহ" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* MySQL */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/mysql.svg" alt="MySQL Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cyan-300 font-mono block">MySQL</span>
                    <span className="text-[10px] font-mono text-zinc-500">Web & Cloud Standard</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="The world's most popular open-source web database. Powers WordPress, Facebook, YouTube."
                  bn="বিশ্বের সবচেয়ে জনপ্রিয় ওপেন-সোর্স ডেটাবেস। WordPress, Facebook, YouTube ইত্যাদিতে ব্যবহৃত হয়।"
                />
              </div>

              {/* PostgreSQL */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-indigo-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/postgresql.svg" alt="PostgreSQL Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-300 font-mono block">PostgreSQL</span>
                    <span className="text-[10px] font-mono text-zinc-500">Object-Relational DBMS</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="Advanced enterprise-grade object-relational DBMS with rich extensions (JSON, pgvector)."
                  bn="অত্যন্ত শক্তিশালী এন্টারপ্রাইজ গ্রেড অবজেক্ট-রিলেশনাল DBMS যাতে আধুনিক এক্সটেনশন (JSON, pgvector) রয়েছে।"
                />
              </div>

              {/* Oracle Database */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-rose-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/oracle.svg" alt="Oracle Database Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-300 font-mono block">Oracle Database</span>
                    <span className="text-[10px] font-mono text-zinc-500">Enterprise High-Scale</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="Mission-critical high-throughput database used by global banks, telecom, and airlines."
                  bn="বিশ্বের ব্যাংক, টেলিকম ও বিমান সংস্থায় ব্যবহৃত উচ্চ ক্ষমতাসম্পন্ন মিশন-ক্রিটিক্যাল ডেটাবেস।"
                />
              </div>

              {/* SQLite */}
              <div className="p-3.5 rounded-xl bg-[#14182d] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2.5 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-emerald-500/30 p-1.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <img src="/images/logos/sqlite.svg" alt="SQLite Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-300 font-mono block">SQLite</span>
                    <span className="text-[10px] font-mono text-zinc-500">Embedded Serverless</span>
                  </div>
                </div>
                <DualText
                  as="p"
                  className="text-[11px] text-zinc-400 leading-relaxed"
                  en="Serverless, single-file database embedded inside every smartphone, browser, and macOS/Windows app."
                  bn="সার্ভারহীন, একক ফাইলের ডেটাবেস যা প্রতিটি স্মার্টফোন, ব্রাউজার ও অ্যাপে এম্বেড করা থাকে।"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-zinc-400 font-mono">
              <span className="text-emerald-400 font-bold">
                <DualText en="SQL Syntax Sample:" bn="এসকিউএল সিনট্যাক্স নমুনা:" />
              </span>
              <div className="mt-1 text-slate-300 bg-black/40 p-2 rounded">
                SELECT * FROM Students WHERE Department = &apos;CSE&apos;;
              </div>
              <DualText
                as="p"
                className="mt-1 text-zinc-500"
                en='Meaning: "Please retrieve all columns and all records from the Students table where the department is CSE."'
                bn='অর্থ: "Students টেবিল থেকে এমন সকল কলাম ও রেকর্ড তুলে আনো যাদের ডিপার্টমেন্ট হলো CSE।"'
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 2: HOW DOES SQL WORK?
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২ • ইঞ্জিন পাইপলাইন ও বাস্তব দৃশ্যপট' : 'Part 2 of 20'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="How Does SQL Work? The Internal Query Processing Pipeline (University Scenario)"
                bn="২. এসকিউএল কীভাবে কাজ করে? ইন্টারনাল কুয়েরি প্রসেসিং পাইপলাইন (ইউনিভার্সিটি স্টোরি)"
              />
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <DualText
            as="p"
            className="text-xs text-zinc-300 leading-relaxed font-sans"
            en={<>Unlike imperative languages (C, Python) where you write step-by-step memory loops, SQL is a <strong className="text-emerald-300">declarative language</strong>: you tell the database <strong>WHAT data you need</strong>, not HOW to retrieve it. While different RDBMS engines may divide or group internal stages differently, the core query processing follows a universal pipeline. To understand this in practice, follow <strong className="text-cyan-300">Rahim</strong> (a CSE student) as he checks his GPA via <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-black/40">SELECT name, gpa FROM students WHERE dept_id = 1;</code> across the engine&apos;s internal lifecycle stages.</>}
            bn={<>সি বা পাইথনের মতো নির্দেশনামূলক ভাষার বদলে SQL হলো একটি <strong className="text-emerald-300">ঘোষণামূলক (Declarative) ভাষা</strong>: আপনি ডেটাবেসকে বলেন <strong>আপনার কী ডেটা প্রয়োজন</strong>, কীভাবে তা বের করতে হবে তা বলে দিতে হয় না। বিভিন্ন RDBMS ইঞ্জিন ইন্টারনাল স্টেজগুলোকে ভিন্ন ভিন্ন ধাপে ভাগ করলেও কুয়েরি এক্সিকিউশনের মূল পাইপলাইন একই নিয়ম মেনে চলে। এটি সহজে বোঝার জন্য <strong className="text-cyan-300">রহিম</strong> নামের এক শিক্ষার্থীর বাস্তব গল্পটি দেখুন—সে যখন পোর্টালে রেজাল্ট দেখতে <code className="text-amber-300 font-mono px-1.5 py-0.5 rounded bg-black/40">SELECT name, gpa FROM students WHERE dept_id = 1;</code> কোয়েরি ট্রিগার করে, তখন ব্যাকগ্রাউন্ডে ইঞ্জিন কীভাবে তা প্রসেস করে।</>}
          />

          {/* Interactive Visual Blueprint Canvas */}
          <div className="relative group rounded-2xl border border-indigo-500/30 bg-[#090d20] p-4 md:p-5 overflow-hidden shadow-2xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  <DualText
                    en="SQL Query Processing Lifecycle (Rahim's GPA Query Flow)"
                    bn="এসকিউএল কোয়েরি প্রসেসিং লাইফসাইকেল (রহিমের রেজাল্ট কোয়েরি জার্নি)"
                  />
                </span>
              </div>
              <button
                onClick={() => setIsPipelineModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:text-white"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ফুল-স্ক্রিন মোডে দেখুন' : 'Click to Expand (Full Screen)'}</span>
              </button>
            </div>

            {/* Clickable Image Container (Clean click to open modal) */}
            <div 
              onClick={() => setIsPipelineModalOpen(true)}
              className="relative rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 bg-[#060814] cursor-pointer transition-colors max-h-[380px] flex items-center justify-center"
            >
              <img
                src="/images/sql-engine-pipeline-7steps.png"
                alt="SQL Internal Engine Query Processing Pipeline"
                className="w-full h-auto max-h-[380px] object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {language === 'bn' ? 'ইউনিভার্সিটি জার্নি: পোর্টাল রিকোয়েস্ট ➔ পার্সার ➔ ক্যাটালগ ➔ অপ্টিমাইজার ➔ এক্সিকিউটর ➔ বাফার পুল ➔ রেজাল্ট' : 'Student Journey: Portal Request ➔ Parser ➔ Catalog ➔ Optimizer ➔ Executor ➔ Buffer Pool ➔ Result'}
              </span>
              <span className="text-cyan-400 font-semibold">
                {language === 'bn' ? 'ক্লিন আর্কিটেকচার ডায়াগ্রাম (2240 × 1140 px)' : 'Clean Architecture Diagram (2240 × 1140 px)'}
              </span>
            </div>
          </div>

          {/* Interactive Step-by-Step Story Explorer */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <DualText
                en="Explore Each Step of Rahim's Query Journey & Internal Engine Logic:"
                bn="রহিমের কোয়েরি জার্নির প্রতিটি ধাপ ও ইঞ্জিনের অভ্যন্তরীণ কার্যপ্রণালী দেখুন:"
              />
            </h3>

            {/* Step Selection Buttons (Compact responsive grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {SQL_PIPELINE_STORY_STEPS.map(item => (
                <button
                  key={item.step}
                  onClick={() => setActivePipelineStep(item.step)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-1 ${
                    activePipelineStep === item.step
                      ? 'bg-slate-800 border-emerald-400/80 text-white shadow-lg shadow-emerald-950/40'
                      : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-500">
                    {language === 'bn' ? `ধাপ ০${item.step}` : `STEP 0${item.step}`}
                  </span>
                  <span className="text-xs font-mono font-bold truncate">
                    {language === 'bn' ? item.labelBn : item.labelEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Step Details Card (Compact 2-Column Responsive Layout) */}
            {(() => {
              const current = SQL_PIPELINE_STORY_STEPS.find(s => s.step === activePipelineStep) || SQL_PIPELINE_STORY_STEPS[0];
              return (
                <div className="p-4 md:p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
                  {/* Step Title Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {language === 'bn' ? current.tagBn : current.tagEn}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1">
                        <DualText en={current.titleEn} bn={current.titleBn} />
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/30">
                      {language === 'bn' ? `ধাপ ০${current.step} / ০৭` : `STAGE 0${current.step} / 07`}
                    </span>
                  </div>

                  {/* 2-Column Story vs Technical Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-sans">
                    {/* Left Column: Human Story & Engine Role */}
                    <div className="space-y-3 bg-[#0d1022] p-3.5 rounded-xl border border-slate-800/80">
                      <div>
                        <div className="text-[11px] font-bold text-emerald-400 uppercase font-mono mb-1 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <DualText en="Relatable Scenario (Rahim's Journey):" bn="বাস্তব দৃশ্যপট (রহিমের অভিজ্ঞতা):" />
                        </div>
                        <DualText as="p" className="text-zinc-200 leading-relaxed" en={current.storyEn} bn={current.storyBn} />
                      </div>
                      <div className="pt-2 border-t border-slate-800/60">
                        <div className="text-[11px] font-bold text-cyan-400 uppercase font-mono mb-1 flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5" />
                          <DualText en="Internal Engine Mechanism:" bn="ইঞ্জিনের অভ্যন্তরীণ মেকানিজম:" />
                        </div>
                        <DualText as="p" className="text-zinc-300 leading-relaxed" en={current.engineEn} bn={current.engineBn} />
                      </div>
                    </div>

                    {/* Right Column: Code Payload & Potential Failure Scenario */}
                    <div className="space-y-2.5">
                      <div className="p-3 bg-black/50 rounded-xl border border-slate-800 font-mono text-xs">
                        <span className="text-cyan-400 font-bold block mb-1">
                          <DualText en={current.payloadTitleEn} bn={current.payloadTitleBn} />
                        </span>
                        <code className="text-emerald-300 break-all">{current.payloadCode}</code>
                      </div>
                      <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-500/20 font-mono text-xs text-rose-300">
                        <span className="font-bold flex items-center gap-1.5 text-rose-400 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <DualText en={current.errorTitleEn} bn={current.errorTitleBn} />
                        </span>
                        <span className="text-[11px] break-all">{current.errorCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Fullscreen High-Resolution Inspection Modal */}
        {isPipelineModalOpen && (
          <div 
            onClick={() => setIsPipelineModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 md:p-6 animate-in fade-in duration-200"
          >
            {/* Modal Top Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between bg-[#0e142e] border border-slate-700/80 px-5 py-3 rounded-2xl mb-3 shadow-2xl"
            >
              <div className="flex items-center gap-2.5">
                <Workflow className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white">
                    <DualText
                      en="SQL Internal Engine Query Processing Pipeline: Rahim's Flow"
                      bn="এসকিউএল ইন্টারনাল ইঞ্জিন কোয়েরি প্রসেসিং পাইপলাইন: রহিমের জার্নি"
                    />
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">
                    {language === 'bn' ? 'স্টুডেন্ট পোর্টাল থেকে পার্সার, অপ্টিমাইজার ও বাফার পুল হয়ে রহিমের স্ক্রিনে রেজাল্ট ফেরত আসার পূর্ণাঙ্গ কার্যপ্রণালী' : 'End-to-End Query Lifecycle: From Student Portal to Parser, CBO, Buffer Pool & Screen Display'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPipelineModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'bn' ? 'বন্ধ করুন (ESC)' : 'Close (ESC)'}</span>
              </button>
            </div>

            {/* Modal Image Display with Pan & Zoom Ability */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex-1 overflow-auto rounded-2xl border border-slate-800 bg-[#060814] p-3 flex items-center justify-center"
            >
              <img
                src="/images/sql-engine-pipeline-7steps.png"
                alt="SQL Internal Engine Query Processing Pipeline Full Resolution"
                className="max-w-none w-full min-w-[1200px] h-auto object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Footer Note */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-3 pt-2"
            >
              <span>{language === 'bn' ? 'টিপস: স্ক্রল বা ড্র্যাগ করে প্রতিটি ধাপের ট্যাগলাইন, স্টোরি ও স্ট্যাটাস বড় করে দেখুন' : 'Tip: Scroll horizontally or vertically to inspect every step, story tagline, and status pill in detail.'}</span>
              <span className="text-cyan-400">{language === 'bn' ? 'বাইরে ক্লিক করে বা ESC চেপে বন্ধ করুন' : 'Click outside or press ESC to close'}</span>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          PART 3: THE 5 COMMAND FAMILIES (DDL, DQL, DML, DCL, TCL)
          Inspired by GeeksforGeeks Standard Reference
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৩ • ৫টি কমান্ড ফ্যামিলি' : 'Part 3 of 20'}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
              <DualText
                en="The 5 Command Families in SQL (DDL, DQL, DML, DCL, TCL)"
                bn="৩. এসকিউএলের ৫টি প্রধান কমান্ড ফ্যামিলি (DDL, DQL, DML, DCL, TCL)"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="SQL statements are categorized into 5 functional families: defining table structure (DDL), querying records (DQL), modifying data (DML), managing security permissions (DCL), and controlling transactions (TCL). Explore the unified Student_info examples below with minimal vertical overhead."
          bn="কাজের ধরনের ওপর ভিত্তি করে SQL কমান্ডগুলোকে ৫টি প্রধান শ্রেণীতে ভাগ করা হয়: টেবিল কাঠামো তৈরি (DDL), ডেটা খোঁজা (DQL), ডেটা পরিবর্তন (DML), পারমিশন নিয়ন্ত্রণ (DCL) এবং ট্রানজ্যাকশন সেভ/রোলব্যাক (TCL)। নিচে Student_info টেবিলের বাস্তব উদাহরণের মাধ্যমে প্রতিটি কমান্ডের কার্যপদ্ধতি দেখুন।"
        />

        {/* Compact Quick Reference Summary Matrix (GeeksforGeeks Inspired) */}
        <div className="overflow-x-auto rounded-lg border border-slate-800/90 bg-[#0a0d1e]">
          <table className="w-full text-left text-[11px] font-sans">
            <thead>
              <tr className="border-b border-slate-800 bg-[#14182d] text-zinc-300 font-mono text-[10px]">
                <th className="py-1.5 px-2.5 font-bold text-purple-300">Category</th>
                <th className="py-1.5 px-2.5 font-bold text-slate-300">Full Form</th>
                <th className="py-1.5 px-2.5 font-bold text-slate-300">Primary Purpose</th>
                <th className="py-1.5 px-2.5 font-bold text-cyan-300">Key Commands</th>
                <th className="py-1.5 px-2.5 font-bold text-amber-300">Transaction Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-zinc-300 text-[10.5px]">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-purple-400">DDL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Definition Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Defines & modifies database structure / schema" bn="ডেটাবেসের টেবিল ও স্কিমার কাঠামো তৈরি/পরিবর্তন করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">CREATE, ALTER, DROP, TRUNCATE, RENAME</td>
                <td className="py-1.5 px-2.5 font-mono text-amber-400">Auto-Committed (No Rollback)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-cyan-400">DQL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Query Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Retrieves records matching filter criteria" bn="নির্দিষ্ট শর্তে ডেটা খুঁজে বের করে প্রদর্শন করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">SELECT</td>
                <td className="py-1.5 px-2.5 font-mono text-emerald-400">Read-Only (Data Safe)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-400">DML</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Manipulation Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Inserts, updates, or deletes stored rows" bn="টেবিলের ভেতরের ডেটা যোগ, পরিবর্তন বা মুছে ফেলে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">INSERT, UPDATE, DELETE</td>
                <td className="py-1.5 px-2.5 font-mono text-emerald-400">Transaction-Safe (Rollback OK)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-rose-400">DCL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Data Control Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Controls user privileges & security access" bn="ইউজারের পারমিশন ও নিরাপত্তা অধিকার নিয়ন্ত্রণ করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">GRANT, REVOKE</td>
                <td className="py-1.5 px-2.5 font-mono text-zinc-400">Admin Privileges</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-400">TCL</td>
                <td className="py-1.5 px-2.5 text-zinc-400">Transaction Control Language</td>
                <td className="py-1.5 px-2.5">
                  <DualText en="Manages ACID transactions and rollbacks" bn="ট্রানজ্যাকশনের সেভ, রোলব্যাক ও ACID স্থায়িত্ব রক্ষা করে" />
                </td>
                <td className="py-1.5 px-2.5 font-mono text-cyan-300">COMMIT, ROLLBACK, SAVEPOINT</td>
                <td className="py-1.5 px-2.5 font-mono text-indigo-300">Controls DML Transactions</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compact Category Tabs (GeeksforGeeks Order) */}
        <div className="flex flex-wrap gap-1.5">
          {(['DDL', 'DQL', 'DML', 'DCL', 'TCL'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveCommandTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCommandTab === tab
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{tab}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-purple-200">
                {tab === 'DDL' && (language === 'bn' ? 'স্ট্রাকচার' : 'Definition')}
                {tab === 'DQL' && (language === 'bn' ? 'কোয়েরি' : 'Query')}
                {tab === 'DML' && (language === 'bn' ? 'ম্যানিপুলেশন' : 'Manipulation')}
                {tab === 'DCL' && (language === 'bn' ? 'কন্ট্রোল' : 'Control')}
                {tab === 'TCL' && (language === 'bn' ? 'ট্রানজ্যাকশন' : 'Transaction')}
              </span>
            </button>
          ))}
        </div>

        {/* Compact Tab Detail Display */}
        <div className="p-4 md:p-5 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {/* ==================== DDL TAB ==================== */}
          {activeCommandTab === 'DDL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-xs">DDL</span>
                    <DualText en="Data Definition Language: Schema & Table Structure" bn="ডেটা ডেফিনিশন ল্যাঙ্গুয়েজ: টেবিল ও স্কিমা স্ট্রাকচার" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Commands that define, modify, or drop the structure of database objects (tables, indexes, views)."
                    bn="যেসব কমান্ডের সাহায্যে ডেটাবেস অবজেক্টের (টেবিল, ইনডেক্স, ভিউ) কাঠামো তৈরি, সংশোধন বা মুছে ফেলা হয়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'অটো-কমিটেড (রোলব্যাক সম্ভব নয়)' : 'Auto-Committed (Cannot Rollback)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {/* CREATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">CREATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Table Creation</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Creates a new table, database, view, or index."
                      bn="নতুন টেবিল, ডেটাবেস, ভিউ বা ইনডেক্স তৈরি করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`CREATE TABLE Student_info (
    Roll_No INT PRIMARY KEY,
    Name VARCHAR(30),
    Branch VARCHAR(10)
);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("CREATE TABLE Student_info (\n    Roll_No INT PRIMARY KEY,\n    Name VARCHAR(30),\n    Branch VARCHAR(10)\n);", "ddl-create")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-create" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* ALTER */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">ALTER</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Schema Modification</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Adds or modifies columns in an existing table structure."
                      bn="বিদ্যমান টেবিলের কাঠামোতে নতুন কলাম যোগ করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Add new CGPA column
ALTER TABLE Student_info 
ADD CGPA DECIMAL(3, 2);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("ALTER TABLE Student_info ADD CGPA DECIMAL(3, 2);", "ddl-alter")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-alter" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* TRUNCATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">TRUNCATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Fast Data Purge</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Clears all rows instantly; keeps table structure intact."
                      bn="কাঠামো ঠিক রেখে নিমিষেই টেবিলের সমস্ত ডেটা মুছে ফেলে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Wipes all rows, resets pages
TRUNCATE TABLE Student_info;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("TRUNCATE TABLE Student_info;", "ddl-truncate")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-truncate" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* DROP */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">DROP</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Permanent Destruction</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Permanently deletes schema, indexes & data from disk."
                      bn="স্কিমা ও ডেটাসহ পুরো টেবিল চিরতরে মুছে ফেলে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Completely destroys table
DROP TABLE Student_info;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DROP TABLE Student_info;", "ddl-drop")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-drop" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* RENAME */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">RENAME</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Object Rename</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Renames existing table object in data catalog."
                      bn="বিদ্যমান টেবিল বা অবজেক্টের নাম নিরাপদে পরিবর্তন করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Renames table in catalog
ALTER TABLE Student_info 
RENAME TO Students;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("ALTER TABLE Student_info RENAME TO Students;", "ddl-rename")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "ddl-rename" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DQL TAB ==================== */}
          {activeCommandTab === 'DQL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs">DQL</span>
                    <DualText en="Data Query Language: Data Retrieval & Analytics" bn="ডেটা কোয়েরি ল্যাঙ্গুয়েজ: ডেটা অনুসন্ধান ও অ্যানালিটিক্স" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Used exclusively to fetch, filter, and project data records without mutating database state."
                    bn="ডেটাবেসের কোনো তথ্য পরিবর্তন না করে কেবল ডেটা খুঁজে বের ও প্রদর্শন করতে ব্যবহৃত হয়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'রিড-অনলি (ডেটা নিরাপদ)' : 'Read-Only (Data Safe)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30">SELECT</span>
                    <span className="text-[11px] text-zinc-400 font-mono">The Universal Query Operator</span>
                  </div>
                  <DualText
                    as="p"
                    className="text-xs text-zinc-300 leading-relaxed"
                    en="Retrieves matching records using projection, filtering (WHERE), sorting (ORDER BY), and limits without altering rows."
                    bn="প্রজেকশন, শর্তযুক্ত ফিল্টার (WHERE) ও সর্টিং (ORDER BY) ব্যবহার করে রেকর্ড প্রদর্শন করে; কোনো ডেটা পরিবর্তন হয় না।"
                  />
                </div>
                <div className="relative group">
                  <pre className="text-[10.5px] text-cyan-300 bg-black/60 p-2.5 rounded-lg font-mono overflow-x-auto leading-tight">
{`SELECT Roll_No, Name, Branch, CGPA 
FROM Student_info 
WHERE Branch = 'CSE' AND CGPA >= 3.50
ORDER BY CGPA DESC;`}
                  </pre>
                  <button
                    onClick={() => handleCopy("SELECT Roll_No, Name, Branch, CGPA \nFROM Student_info \nWHERE Branch = 'CSE' AND CGPA >= 3.50\nORDER BY CGPA DESC;", "dql-select")}
                    className="absolute top-1.5 right-1.5 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                    title="Copy SQL"
                  >
                    {copiedSnippet === "dql-select" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DML TAB ==================== */}
          {activeCommandTab === 'DML' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs">DML</span>
                    <DualText en="Data Manipulation Language: Record Operations" bn="ডেটা ম্যানিপুলেশন ল্যাঙ্গুয়েজ: রেকর্ড ইনসার্ট, আপডেট ও ডিলিট" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Commands that operate directly on the tuples/rows stored inside existing tables."
                    bn="টেবিলের ভেতরে থাকা ডেটা বা রেকর্ডের ওপর সরাসরি কাজ করে (যোগ, সংশোধন ও মোছা)।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'ট্রানজ্যাকশন-সেফ (রোলব্যাক সম্ভব)' : 'Transaction-Safe (Can Rollback)'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* INSERT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">INSERT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Row Insertion</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Adds new student records into the table."
                      bn="টেবিলে এক বা একাধিক নতুন রো বা রেকর্ড যুক্ত করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`INSERT INTO Student_info 
(Roll_No, Name, Branch, CGPA) 
VALUES (101, 'Rahim', 'CSE', 3.85);`}
                    </pre>
                    <button
                      onClick={() => handleCopy("INSERT INTO Student_info (Roll_No, Name, Branch, CGPA) VALUES (101, 'Rahim', 'CSE', 3.85);", "dml-insert")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-insert" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* UPDATE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">UPDATE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Value Modification</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Modifies column values matching WHERE condition."
                      bn="WHERE শর্ত অনুযায়ী নির্দিষ্ট শিক্ষার্থীর ডেটা আপডেট করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`UPDATE Student_info 
SET CGPA = 3.92 
WHERE Roll_No = 101;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("UPDATE Student_info SET CGPA = 3.92 WHERE Roll_No = 101;", "dml-update")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-update" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* DELETE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">DELETE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Row Removal</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Removes specific rows matching condition (can rollback)."
                      bn="শর্ত অনুযায়ী নির্দিষ্ট রো মুছে ফেলে (রোলব্যাক সম্ভব)।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-emerald-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`DELETE FROM Student_info 
WHERE Roll_No = 101;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DELETE FROM Student_info WHERE Roll_No = 101;", "dml-delete")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dml-delete" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DCL TAB ==================== */}
          {activeCommandTab === 'DCL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-xs">DCL</span>
                    <DualText en="Data Control Language: Access & Privileges" bn="ডেটা কন্ট্রোল ল্যাঙ্গুয়েজ: ব্যবহারকারীর অ্যাক্সেস ও পারমিশন" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Manages database security, user roles, authentication privileges, and access permissions."
                    bn="ডেটাবেসের নিরাপত্তা, ইউজারের অধিকার ও অ্যাক্সেস পারমিশন নিয়ন্ত্রণ করে।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'নিরাপত্তা ও অ্যাক্সেস কন্ট্রোল' : 'Security Access Control'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {/* GRANT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">GRANT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Assign Privileges</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Gives specific users read/write permissions on database objects."
                      bn="নির্দিষ্ট ব্যবহারকারীকে টেবিলে ডেটা পড়া বা লেখার অধিকার দেয়।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Grant query & insert access to faculty
GRANT SELECT, INSERT 
ON Student_info 
TO 'faculty_user';`}
                    </pre>
                    <button
                      onClick={() => handleCopy("GRANT SELECT, INSERT ON Student_info TO 'faculty_user';", "dcl-grant")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dcl-grant" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* REVOKE */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-rose-400 px-1.5 py-0.5 rounded bg-rose-950/50 border border-rose-500/30">REVOKE</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Withdraw Privileges</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Takes away previously granted user permissions."
                      bn="পূর্বে দেওয়া ব্যবহারকারীর পারমিশন প্রত্যাহার করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-rose-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`-- Revoke write access from faculty
REVOKE INSERT 
ON Student_info 
FROM 'faculty_user';`}
                    </pre>
                    <button
                      onClick={() => handleCopy("REVOKE INSERT ON Student_info FROM 'faculty_user';", "dcl-revoke")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "dcl-revoke" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TCL TAB ==================== */}
          {activeCommandTab === 'TCL' && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-slate-800 pb-2.5">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs">TCL</span>
                    <DualText en="Transaction Control Language: ACID & Rollback" bn="ট্রানজ্যাকশন কন্ট্রোল ল্যাঙ্গুয়েজ: ACID ও রোলব্যাক নিয়ন্ত্রণ" />
                  </h3>
                  <DualText
                    as="p"
                    className="text-[11px] text-zinc-400 mt-0.5"
                    en="Manages transactional integrity, guaranteeing that modifications are either fully committed or safely rolled back."
                    bn="ট্রানজ্যাকশনের স্থায়িত্ব রক্ষা করে, যাতে কোনো ত্রুটি হলে পূর্বের অবস্থায় ফিরে যাওয়া যায়।"
                  />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 whitespace-nowrap self-start sm:self-auto">
                  {language === 'bn' ? 'ACID গ্যারান্টি' : 'ACID Guarantee'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {/* COMMIT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">COMMIT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Save to Disk</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Permanently writes transaction changes to disk."
                      bn="ট্রানজ্যাকশনের সমস্ত পরিবর্তন স্থায়ীভাবে ডিস্কে সেভ করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`INSERT INTO Student_info 
VALUES (102, 'Karim', 'BBA', 3.45);
COMMIT; -- Saved permanently`}
                    </pre>
                    <button
                      onClick={() => handleCopy("INSERT INTO Student_info VALUES (102, 'Karim', 'BBA', 3.45);\nCOMMIT;", "tcl-commit")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-commit" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* ROLLBACK */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">ROLLBACK</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Undo Changes</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Reverts uncommitted modifications if an error occurs."
                      bn="ভুল কোনো অপারেশন হলে পরিবর্তন বাতিল করে আগের অবস্থায় নেয়।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`DELETE FROM Student_info 
WHERE Branch = 'BBA';
ROLLBACK; -- Rows restored!`}
                    </pre>
                    <button
                      onClick={() => handleCopy("DELETE FROM Student_info WHERE Branch = 'BBA';\nROLLBACK;", "tcl-rollback")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-rollback" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* SAVEPOINT */}
                <div className="p-2.5 md:p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/50 border border-indigo-500/30">SAVEPOINT</span>
                      <span className="text-[9px] text-zinc-500 font-mono">Partial Checkpoint</span>
                    </div>
                    <DualText
                      as="p"
                      className="text-[10.5px] text-zinc-300"
                      en="Sets a checkpoint for safe partial rollbacks."
                      bn="ট্রানজ্যাকশনের মাঝে আংশিক রোলব্যাকের চেকপয়েন্ট তৈরি করে।"
                    />
                  </div>
                  <div className="relative group">
                    <pre className="text-[10px] text-indigo-300 bg-black/60 p-2 rounded font-mono overflow-x-auto leading-tight">
{`SAVEPOINT sp_grade_entry;
-- Partial rollback to checkpoint
ROLLBACK TO sp_grade_entry;`}
                    </pre>
                    <button
                      onClick={() => handleCopy("SAVEPOINT sp_grade_entry;\nROLLBACK TO sp_grade_entry;", "tcl-savepoint")}
                      className="absolute top-1 right-1 p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Copy SQL"
                    >
                      {copiedSnippet === "tcl-savepoint" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 5 & 6: CREATE DATABASE, CREATE TABLE & DATA TYPES
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৫ ও ৬ • ডেটাবেস ও টেবিল তৈরি এবং ডেটা টাইপ' : 'Part 5 & 6 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Creating Databases, Tables & SQL Data Types"
                bn="ডেটাবেস ও টেবিল তৈরি এবং প্রয়োজনীয় ডেটা টাইপস"
              />
            </h2>
          </div>
        </div>

        {/* Database Creation Snippet */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-300">
              <DualText
                en="Step 1: Create & Activate the Database"
                bn="ধাপ ১: ডেটাবেস তৈরি ও সক্রিয় (USE) করা"
              />
            </span>
            <button
              onClick={() => handleCopy("CREATE DATABASE UniversityDB;\nUSE UniversityDB;", "db-create")}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSnippet === "db-create" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet === "db-create" ? (language === 'bn' ? "কপি হয়েছে" : "Copied") : (language === 'bn' ? "কপি" : "Copy")}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-black/50 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Create a new database container
CREATE DATABASE UniversityDB;

-- Tell MySQL/DBMS to use this database for all subsequent commands
USE UniversityDB;`}
          </pre>
        </div>

        {/* Common Data Types Guide */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
            <DualText
              en="Essential SQL Data Types"
              bn="গুরুত্বপূর্ণ ও বহুল ব্যবহৃত SQL ডেটা টাইপসমূহ"
            />
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-zinc-400 font-mono">
                  <th className="py-2.5 px-3"><DualText en="Data Type" bn="ডেটা টাইপ" /></th>
                  <th className="py-2.5 px-3"><DualText en="Purpose" bn="ব্যবহার ও উদ্দেশ্য" /></th>
                  <th className="py-2.5 px-3"><DualText en="Example" bn="উদাহরণ" /></th>
                  <th className="py-2.5 px-3"><DualText en="Storage / Notes" bn="স্টোরেজ ও নোট" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">INT / INTEGER</td>
                  <td className="py-2.5 px-3 text-zinc-300"><DualText en="Whole numbers (positive, negative, zero)" bn="পূর্ণসংখ্যা (ধনাত্মক, ঋণাত্মক বা শূন্য)" /></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">101, 22, -5</td>
                  <td className="py-2.5 px-3 text-zinc-400 font-mono"><DualText en="4 bytes (-2B to +2B)" bn="৪ বাইট (-২ বিলিয়ন থেকে +২ বিলিয়ন)" /></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">VARCHAR(n)</td>
                  <td className="py-2.5 px-3 text-zinc-300"><DualText en="Variable-length text string up to max length n" bn="পরিবর্তনশীল দৈর্ঘ্যের স্ট্রিং, সর্বোচ্চ সীমা n ক্যারেক্টার" /></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">&apos;Rahim&apos;, &apos;CSE&apos;</td>
                  <td className="py-2.5 px-3 text-zinc-400"><DualText en="Allocates only actual string length + 1 byte overhead" bn="শুধুমাত্র ব্যবহৃত অক্ষরের সাইজ + ১ বাইট ওভারহেড নেয়" /></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">DECIMAL(p, s)</td>
                  <td className="py-2.5 px-3 text-zinc-300"><DualText en="Exact precision decimal: p total digits, s decimal places" bn="নির্ভুল ভগ্নাংশ: মোট p ডিজিট এবং দশমিকের পরে s ঘর" /></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">DECIMAL(10,2) → 35000.50</td>
                  <td className="py-2.5 px-3 text-zinc-400"><DualText en="Required for money, salary, and accounting (avoids float drift)" bn="টাকা-পয়সা, বেতন ও ব্যাংকিং হিসাবের জন্য বাধ্যতামূলক (float rounding এরর হয় না)" /></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">DATE</td>
                  <td className="py-2.5 px-3 text-zinc-300"><DualText en="Calendar date in standard ISO format" bn="ক্যালেন্ডার তারিখ (স্ট্যান্ডার্ড ISO ফরম্যাট)" /></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">&apos;2004-10-15&apos;</td>
                  <td className="py-2.5 px-3 text-zinc-400 font-mono">YYYY-MM-DD</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">FLOAT / DOUBLE</td>
                  <td className="py-2.5 px-3 text-zinc-300"><DualText en="Approximate scientific floating-point numbers" bn="বিজ্ঞানের কাজে ব্যবহৃত আনুমানিক দশমিক সংখ্যা" /></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">3.14159, 98.4</td>
                  <td className="py-2.5 px-3 text-zinc-400"><DualText en="Fast math computations, scientific measurements" bn="দ্রুত ক্যালকুলেশন ও সায়েন্টিফিক পরিমাপের জন্য" /></td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">BOOLEAN</td>
                  <td className="py-2.5 px-3 text-zinc-300"><DualText en="True or False flag (stored as 1 or 0 in MySQL TINYINT)" bn="সত্য বা মিথ্যা ফ্ল্যাগ (MySQL-এ TINYINT 1 বা 0 হিসেবে সংরক্ষিত)" /></td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">TRUE / FALSE</td>
                  <td className="py-2.5 px-3 text-zinc-400 font-mono">1 bit / 1 byte</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 7: SQL CONSTRAINTS & INTERACTIVE ERROR SANDBOX
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৭ • কনস্ট্রেইন্টস ও স্যান্ডবক্স' : 'Part 7 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="SQL Constraints & Integrity Rules Sandbox"
                bn="এসকিউএল কনস্ট্রেইন্টস এবং ডেটা ইন্টিগ্রিটি স্যান্ডবক্স"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Constraints enforce data integrity at the database engine level. If an INSERT or UPDATE violates a constraint, the DBMS aborts the transaction immediately."
          bn="কনস্ট্রেইন্টস হলো ডেটাবেসের ইঞ্জিনে তৈরি করা কিছু নিয়ম যা ডেটার সঠিকতা (Data Integrity) নিশ্চিত করে। কোনো INSERT বা UPDATE যদি নিয়ম ভাঙ্গে, DBMS সেই লেনদেন সাথে সাথে বাতিল করে দেয়।"
        />

        {/* Constraint Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'PK', label: 'PRIMARY KEY', icon: KeyRound },
            { id: 'NOT_NULL', label: 'NOT NULL', icon: AlertTriangle },
            { id: 'UNIQUE', label: 'UNIQUE', icon: Sparkles },
            { id: 'DEFAULT', label: 'DEFAULT', icon: RotateCcw },
            { id: 'CHECK', label: 'CHECK', icon: CheckCircle2 },
            { id: 'FK', label: 'FOREIGN KEY', icon: GitMerge },
          ].map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setConstraintDemo(c.id as any);
                  setConstraintTestStatus('idle');
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col gap-1 ${
                  constraintDemo === c.id
                    ? 'bg-amber-500/20 border-amber-400/50 text-white shadow-lg'
                    : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold">7.{['PK','NOT_NULL','UNIQUE','DEFAULT','CHECK','FK'].indexOf(c.id)+1}</span>
                </div>
                <span className="text-xs font-mono font-bold truncate">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Constraint Demonstration Sandbox */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-amber-900/30 space-y-4">
          {constraintDemo === 'PK' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  <DualText en="7.1 PRIMARY KEY Constraint" bn="৭.১ PRIMARY KEY কনস্ট্রেইন্ট" />
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText en="Rule: Unique + NOT NULL" bn="নিয়ম: ইউনিক + কখনোই NULL নয়" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Uniquely identifies each record. No two rows can have the same primary key, and it can never be NULL."
                bn="প্রতিটি রেকর্ডকে অনন্যভাবে শনাক্ত করে। দুটি সারির প্রাইমারি কি কখনোই এক হতে পারে না এবং এটি খালি (NULL) থাকতে পারে না।"
              />
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Student_ID INT PRIMARY KEY
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ভ্যালিড টেস্ট: INSERT INTO Students VALUES (107, 'Tahsin');" : "Test Valid: INSERT INTO Students VALUES (107, 'Tahsin');"}
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ডুপ্লিকেট এরর টেস্ট: INSERT INTO Students VALUES (101, 'Duplicate');" : "Test Duplicate Error: INSERT INTO Students VALUES (101, 'Duplicate');"}
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'NOT_NULL' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  <DualText en="7.2 NOT NULL Constraint" bn="৭.২ NOT NULL কনস্ট্রেইন্ট" />
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText en="Rule: Must have a value" bn="নিয়ম: মান থাকা বাধ্যতামূলক" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Prevents a column from storing a NULL (empty/missing) value. Crucial for names, passwords, and titles."
                bn="কলামে কোনো খালি বা মিসিং (NULL) মান রাখা প্রতিরোধ করে। নাম, পাসওয়ার্ড বা টাইটেলের জন্য অত্যন্ত দরকারি।"
              />
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Name VARCHAR(100) NOT NULL
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ভ্যালিড টেস্ট: INSERT ... VALUES (108, 'Sadia');" : "Test Valid: INSERT ... VALUES (108, 'Sadia');"}
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "NULL এরর টেস্ট: INSERT ... VALUES (108, NULL);" : "Test NULL Error: INSERT ... VALUES (108, NULL);"}
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'UNIQUE' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  <DualText en="7.3 UNIQUE Constraint" bn="৭.৩ UNIQUE কনস্ট্রেইন্ট" />
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText en="Rule: All values distinct (allows 1 NULL)" bn="নিয়ম: সব মান আলাদা (সর্বোচ্চ ১টি NULL গ্রহণযোগ্য)" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Ensures all values in the column are different. Perfect for email addresses, phone numbers, and NID numbers."
                bn="কলামের প্রতিটি মান যেন একে অপরের চেয়ে আলাদা হয় তা নিশ্চিত করে। ইমেইল, ফোন নম্বর বা জাতীয় পরিচয়পত্রের জন্য আদর্শ।"
              />
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Email VARCHAR(100) UNIQUE
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ভ্যালিড টেস্ট: Email = 'unique_new@gmail.com'" : "Test Valid: Email = 'unique_new@gmail.com'"}
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ডুপ্লিকেট এরর টেস্ট: Email = 'rahim@gmail.com'" : "Test Duplicate Error: Email = 'rahim@gmail.com'"}
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'DEFAULT' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  <DualText en="7.4 DEFAULT Constraint" bn="৭.৪ DEFAULT কনস্ট্রেইন্ট" />
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText en="Rule: Fallback value when unspecified" bn="নিয়ম: মান না দিলে ডিফল্ট মান বসে যাবে" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Automatically populates a specified default value if no value is passed during INSERT."
                bn="ডেটা ইনসার্ট করার সময় মান না দিলে স্বয়ংক্রিয়ভাবে একটি পূর্বনির্ধারিত মান বসিয়ে দেয়।"
              />
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Country VARCHAR(50) DEFAULT &apos;Bangladesh&apos;
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "Country ছাড়া ইনসার্ট টেস্ট (স্বয়ংক্রিয়ভাবে 'Bangladesh' সেট হবে)" : "Test Insert without Country (Defaults to 'Bangladesh')"}
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'CHECK' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  <DualText en="7.5 CHECK Constraint" bn="৭.৫ CHECK কনস্ট্রেইন্ট" />
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText en="Rule: Boolean condition validation" bn="নিয়ম: যুক্তিসঙ্গত শর্ত সত্য হতে হবে" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Ensures that all values in a column satisfy a specific logical condition (e.g. Age must be at least 16)."
                bn="কলামের মানগুলো যেন একটি নির্দিষ্ট লজিক্যাল শর্ত পূরণ করে তা নিশ্চিত করে (যেমন: বয়স অবশ্যই ১৬ বা তার বেশি হতে হবে)।"
              />
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                Age INT CHECK (Age &gt;= 16)
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ভ্যালিড টেস্ট: Age = 22 (>= 16)" : "Test Valid: Age = 22 (>= 16)"}
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "শর্ত ভঙ্গের টেস্ট: Age = 14 (< 16)" : "Test Check Violation: Age = 14 (< 16)"}
                </button>
              </div>
            </div>
          )}

          {constraintDemo === 'FK' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                  <DualText en="7.6 FOREIGN KEY Constraint" bn="৭.৬ FOREIGN KEY কনস্ট্রেইন্ট" />
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  <DualText en="Rule: Referential Integrity Link" bn="নিয়ম: রেফারেন্সিয়াল ইন্টিগ্রিটি বা অভিভাবক সংযোগ" />
                </span>
              </div>
              <DualText
                as="p"
                className="text-xs text-zinc-300 font-sans"
                en="Links a column in the child table to the Primary Key of a parent table, guaranteeing that you cannot reference a non-existent parent ID."
                bn="চাইল্ড টেবিলের কলামকে প্যারেন্ট টেবিলের প্রাইমারি কি-এর সাথে যুক্ত করে। অস্তিত্বহীন প্যারেন্ট আইডির রেফারেন্স দেওয়া অসম্ভব করে তোলে।"
              />
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-emerald-400">
                FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setConstraintTestStatus('valid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "ভ্যালিড টেস্ট: Department_ID = 1 (CSE বিদ্যমান)" : "Test Valid: Department_ID = 1 (Exists: CSE)"}
                </button>
                <button
                  onClick={() => setConstraintTestStatus('invalid')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-mono cursor-pointer"
                >
                  {language === 'bn' ? "অনাথ কি (Orphan) এরর টেস্ট: Department_ID = 99 (বিদ্যমান নেই)" : "Test Orphan Key Error: Department_ID = 99 (Does not exist)"}
                </button>
              </div>
            </div>
          )}

          {/* Engine Output Box */}
          {constraintTestStatus !== 'idle' && (
            <div className={`p-3 rounded-xl border text-xs font-mono mt-3 ${
              constraintTestStatus === 'valid'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {constraintTestStatus === 'valid' ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    {language === 'bn' ? 'Query OK, 1 row affected (0.01 sec)। সব কনস্ট্রেইন্ট সফলভাবে যাচাই হয়েছে!' : 'Query OK, 1 row affected (0.01 sec). All constraints satisfied!'}
                  </span>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">ERROR 1062 (23000): {language === 'bn' ? 'কনস্ট্রেইন্ট লঙ্ঘন (Constraint Violation)!' : 'Constraint Violation!'}</span>
                    <DualText
                      as="p"
                      className="text-[11px] text-rose-400/80 mt-0.5"
                      en="The RDBMS engine rejected this transaction because it violates integrity rules. No data was corrupted."
                      bn="RDBMS ইঞ্জিন এই ট্রানজ্যাকশনটি বাতিল করেছে কারণ এটি ইন্টিগ্রিটি নিয়ম ভঙ্গ করেছে। ডেটাবেসের কোনো ক্ষতি হয়নি।"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 8 - 12: QUERY WORKBENCH (SELECT, WHERE, OPERATORS, ORDER BY)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ৮ থেকে ১২ • কুয়েরি ওয়ার্কবেঞ্চ' : 'Part 8 to 12 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Interactive SQL Query Workbench"
                bn="ইন্টারেক্টিভ এসকিউএল কুয়েরি ওয়ার্কবেঞ্চ"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Experiment with live queries on our university student database. Test out SELECT projections, WHERE filtering operators (AND, OR, LIKE, BETWEEN), and ORDER BY sorting."
          bn="আমাদের বিশ্ববিদ্যালয় স্টুডেন্ট ডেটাবেসে সরাসরি কুয়েরি চালিয়ে প্র্যাকটিস করুন। SELECT প্রজেকশন, WHERE ফিল্টারিং অপারেটর (AND, OR, LIKE, BETWEEN), এবং ORDER BY সর্টিং টেস্ট করে দেখুন।"
        />

        {/* Query Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#14182d] border border-slate-700/60">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <DualText en="Filter Condition (WHERE Clause)" bn="ফিল্টার শর্ত (WHERE ক্লজ)" />
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCustomWhereFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'ALL'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? '(WHERE ছাড়া) সব সারি' : '(No WHERE) All Rows'}
              </button>
              <button
                onClick={() => setCustomWhereFilter('CSE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'CSE'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE Dept = &apos;CSE&apos;
              </button>
              <button
                onClick={() => setCustomWhereFilter('BBA')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'BBA'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE Dept = &apos;BBA&apos;
              </button>
              <button
                onClick={() => setCustomWhereFilter('AGE_OVER_21')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'AGE_OVER_21'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE Age &gt; 21
              </button>
              <button
                onClick={() => setCustomWhereFilter('HIGH_GPA')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  customWhereFilter === 'HIGH_GPA'
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                WHERE GPA &gt;= 3.80
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <DualText en="Sorting Order (ORDER BY Clause)" bn="সাজানোর ক্রম (ORDER BY ক্লজ)" />
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSortOrder('NONE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'NONE'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {language === 'bn' ? 'ডিফল্ট (PK ক্রম)' : 'Default (PK Order)'}
              </button>
              <button
                onClick={() => setSortOrder('AGE_ASC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'AGE_ASC'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                ORDER BY Age ASC
              </button>
              <button
                onClick={() => setSortOrder('AGE_DESC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'AGE_DESC'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                ORDER BY Age DESC
              </button>
              <button
                onClick={() => setSortOrder('GPA_DESC')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  sortOrder === 'GPA_DESC'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                ORDER BY GPA DESC
              </button>
            </div>
          </div>
        </div>

        {/* Live SQL Preview Banner */}
        <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 flex items-center justify-between font-mono text-xs">
          <div className="text-zinc-300">
            <span className="text-cyan-400 font-bold">{language === 'bn' ? 'জেনারেটেড SQL: ' : 'Generated SQL: '}</span>
            <span className="text-emerald-300">SELECT</span> Student_ID, Name, Age, Department, GPA <span className="text-emerald-300">FROM</span> Students
            {customWhereFilter === 'CSE' && <span className="text-amber-300"> WHERE Department = &apos;CSE&apos;</span>}
            {customWhereFilter === 'BBA' && <span className="text-amber-300"> WHERE Department = &apos;BBA&apos;</span>}
            {customWhereFilter === 'AGE_OVER_21' && <span className="text-amber-300"> WHERE Age &gt; 21</span>}
            {customWhereFilter === 'HIGH_GPA' && <span className="text-amber-300"> WHERE GPA &gt;= 3.80</span>}
            {sortOrder === 'AGE_ASC' && <span className="text-purple-300"> ORDER BY Age ASC</span>}
            {sortOrder === 'AGE_DESC' && <span className="text-purple-300"> ORDER BY Age DESC</span>}
            {sortOrder === 'GPA_DESC' && <span className="text-purple-300"> ORDER BY GPA DESC</span>}
            ;
          </div>
          <span className="text-[10px] text-zinc-500">{displayStudents.length} {language === 'bn' ? 'টি সারি পাওয়া গেছে' : 'rows returned'}</span>
        </div>

        {/* Live Result Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Student_ID (PK)</th>
                <th className="py-2.5 px-3"><DualText en="Name" bn="নাম" /></th>
                <th className="py-2.5 px-3"><DualText en="Age" bn="বয়স" /></th>
                <th className="py-2.5 px-3"><DualText en="Email" bn="ইমেইল" /></th>
                <th className="py-2.5 px-3"><DualText en="Department" bn="বিভাগ" /></th>
                <th className="py-2.5 px-3"><DualText en="GPA" bn="জিপিএ" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {displayStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{student.id}</td>
                  <td className="py-2 px-3 text-white font-medium">{student.name}</td>
                  <td className="py-2 px-3 font-mono text-zinc-300">{student.age}</td>
                  <td className="py-2 px-3 font-mono text-zinc-400">{student.email}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      student.deptName === 'CSE'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : student.deptName === 'BBA'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {student.deptName}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-mono text-emerald-400 font-bold">{student.gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 13 & 14: UPDATE & DELETE WITH CRITICAL WARNINGS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৩ ও ১৪ • আপডেট ও ডিলিট সতর্কতা' : 'Part 13 & 14 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="UPDATE and DELETE: Syntax & Safety Best Practices"
                bn="UPDATE এবং DELETE: সিনট্যাক্স ও সুরক্ষার নিয়ম"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* UPDATE Box */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                <DualText en="UPDATE Command" bn="UPDATE কমান্ড" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
                {language === 'bn' ? 'ডেটা পরিবর্তন' : 'Modifies Data'}
              </span>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans"
              en="Used to alter existing column values in rows that match the given WHERE clause."
              bn="নির্দিষ্ট WHERE শর্ত পূরণকারী সারির বিদ্যমান কলামের মান পরিবর্তন করতে ব্যবহৃত হয়।"
            />
            <pre className="p-3 rounded-lg bg-black/50 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Correct: Modifies only Rahim's email
UPDATE Students 
SET Email = 'rahim_new@gmail.com' 
WHERE Student_ID = 101;`}
            </pre>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-300 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <DualText en="What happens if you forget WHERE?" bn="WHERE ক্লজ দিতে ভুলে গেলে কী ঘটবে?" />
              </strong>
              <DualText
                as="p"
                className="text-[11px] text-zinc-300"
                en="UPDATE Students SET Email = 'xyz@gmail.com'; will rewrite EVERY SINGLE STUDENT'S email in the entire database!"
                bn="UPDATE Students SET Email = 'xyz@gmail.com'; লিখলে পুরো ডেটাবেসের প্রতি একক শিক্ষার্থীর ইমেইল একই হয়ে যাবে!"
              />
            </div>
          </div>

          {/* DELETE Box */}
          <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                <DualText en="DELETE Command" bn="DELETE কমান্ড" />
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400">
                {language === 'bn' ? 'সারি মুছে ফেলা' : 'Removes Rows'}
              </span>
            </div>
            <DualText
              as="p"
              className="text-xs text-zinc-300 font-sans"
              en="Removes specified rows from a table while keeping the table structure intact."
              bn="টেবিলের স্ট্রাকচার অক্ষুণ্ণ রেখে নির্দিষ্ট সারিগুলোকে মুছে ফেলে।"
            />
            <pre className="p-3 rounded-lg bg-black/50 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Safe Practice: Check target row with SELECT first!
SELECT * FROM Students WHERE Student_ID = 105;

-- Then execute DELETE
DELETE FROM Students 
WHERE Student_ID = 105;`}
            </pre>
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-300 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <DualText en="Golden Rule for Production Engineers:" bn="প্রোডাকশন ইঞ্জিনিয়ারদের জন্য সুবর্ণ নিয়ম:" />
              </strong>
              <DualText
                as="p"
                className="text-[11px] text-zinc-300"
                en="Always wrap destructive DML in a transaction block (START TRANSACTION; ... ROLLBACK;) or test with SELECT COUNT(*) before hitting execute."
                bn="ঝুঁকিপূর্ণ DML কমান্ড চালানোর আগে সর্বদা ট্রানজ্যাকশন ব্লক (START TRANSACTION; ... ROLLBACK;) ব্যবহার করুন অথবা চালানোর আগে SELECT COUNT(*) দিয়ে নিশ্চিত হয়ে নিন।"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 15 & 16: AGGREGATE FUNCTIONS, GROUP BY & HAVING
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৫ ও ১৬ • এগ্রিগেট ফাংশন ও গ্রুপিং' : 'Part 15 & 16 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Aggregate Functions, GROUP BY & HAVING"
                bn="অ্যাগ্রিগেট ফাংশন, GROUP BY এবং HAVING ক্লজ"
              />
            </h2>
          </div>
        </div>

        {/* Live Aggregate Calculator Switcher */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase">
            <DualText
              en="Try 5 SQL Aggregate Functions Live"
              bn="৫টি গুরুত্বপূর্ণ SQL অ্যাগ্রিগেট ফাংশন লাইভ টেস্ট করুন"
            />
          </span>
          <div className="flex flex-wrap gap-2">
            {(['COUNT', 'AVG', 'MAX', 'MIN', 'SUM'] as const).map(fn => (
              <button
                key={fn}
                onClick={() => setActiveAggregate(fn)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  activeAggregate === fn
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-zinc-400 hover:text-white'
                }`}
              >
                {fn}()
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-purple-300 font-bold">{aggregateResult.label}</span>
              <div className="text-2xl font-extrabold text-white mt-0.5 font-mono">{aggregateResult.value}</div>
              <span className="text-[11px] text-zinc-400">
                {language === 'bn'
                  ? (activeAggregate === 'COUNT' ? 'জন শিক্ষার্থী ভর্তি' : activeAggregate === 'AVG' ? 'গড় জিপিএ' : activeAggregate === 'MAX' ? 'সর্বোচ্চ জিপিএ (সুমাইয়া)' : activeAggregate === 'MIN' ? 'সর্বনিম্ন বয়স (তাহসিন)' : 'মোট বয়সের সমষ্টি')
                  : aggregateResult.unit}
              </span>
            </div>
            <div className="font-mono text-xs text-zinc-400 bg-black/40 p-3 rounded-lg border border-slate-800">
              <span className="text-emerald-400">SELECT </span>
              {activeAggregate === 'COUNT' && 'COUNT(Student_ID) FROM Students;'}
              {activeAggregate === 'AVG' && 'AVG(GPA) FROM Students;'}
              {activeAggregate === 'MAX' && 'MAX(GPA) FROM Students;'}
              {activeAggregate === 'MIN' && 'MIN(Age) FROM Students;'}
              {activeAggregate === 'SUM' && 'SUM(Age) FROM Students;'}
            </div>
          </div>
        </div>

        {/* WHERE vs HAVING Comparison */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
            <DualText
              en="Crucial Exam Topic: WHERE vs HAVING"
              bn="পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ: WHERE বনাম HAVING"
            />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400">WHERE Clause</span>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-4 marker:text-cyan-400">
                <li>
                  {language === 'bn'
                    ? <span>গ্রুপিং করার পূর্বেই <strong>একক সারিগুলোকে</strong> ফিল্টার করে।</span>
                    : <span>Filters <strong>individual rows</strong> before any grouping occurs.</span>}
                </li>
                <li>
                  {language === 'bn'
                    ? <span>অ্যাগ্রিগেট ফাংশনের সাথে ব্যবহার করা <strong>যায় না</strong> (যেমন: <code className="text-rose-400">WHERE AVG(GPA) &gt; 3.0</code> অবৈধ সিনট্যাক্স!)।</span>
                    : <span><strong>Cannot</strong> be used with aggregate functions (e.g. <code className="text-rose-400">WHERE AVG(GPA) &gt; 3.0</code> is invalid syntax!).</span>}
                </li>
                <li>
                  {language === 'bn'
                    ? <span>টেবিল ঘোষণার (<code className="text-indigo-300">FROM</code>) সাথে সাথেই ব্যবহৃত হয়।</span>
                    : <span>Used directly after the <code className="text-indigo-300">FROM</code> table specification.</span>}
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400">HAVING Clause</span>
              <ul className="text-xs text-zinc-300 space-y-1.5 list-disc pl-4 marker:text-purple-400">
                <li>
                  {language === 'bn'
                    ? <span><code className="text-indigo-300">GROUP BY</code> চলার পরে <strong>গ্রুপভিত্তিক সামারি রেকর্ডকে</strong> ফিল্টার করে।</span>
                    : <span>Filters <strong>grouped summary records</strong> after <code className="text-indigo-300">GROUP BY</code> has run.</span>}
                </li>
                <li>
                  {language === 'bn'
                    ? <span>অ্যাগ্রিগেট ফাংশনের ফলাফলের উপর ফিল্টার করতে <strong>পারে</strong> (যেমন: <code className="text-emerald-400">HAVING COUNT(*) &gt; 1</code>)।</span>
                    : <span><strong>Can</strong> filter using aggregate results (e.g. <code className="text-emerald-400">HAVING COUNT(*) &gt; 1</code>).</span>}
                </li>
                <li>
                  {language === 'bn'
                    ? <span>সর্বদা <code className="text-indigo-300">GROUP BY</code> স্টেটমেন্টের পরে লেখা হয়।</span>
                    : <span>Always written after the <code className="text-indigo-300">GROUP BY</code> statement.</span>}
                </li>
              </ul>
            </div>
          </div>

          <pre className="p-3 rounded-lg bg-black/60 text-xs font-mono text-emerald-400 overflow-x-auto">
{`-- Group departments having more than 1 student enrolled:
SELECT Department, COUNT(*) AS Total_Students, AVG(GPA) AS Avg_GPA
FROM Students
WHERE Age >= 21             -- Filters rows first
GROUP BY Department         -- Groups remaining rows
HAVING COUNT(*) > 1;        -- Filters summary groups`}
          </pre>
        </div>
      </section>

      {/* ========================================================
          PART 17: SQL JOINS VISUALIZER & VENN DIAGRAMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitMerge className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৭ • এসকিউএল জয়েনস' : 'Part 17 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="SQL Joins Visualizer & Venn Diagrams"
                bn="এসকিউএল জয়েনস ভিজ্যুয়ালাইজার ও ভেন ডায়াগ্রাম"
              />
            </h2>
          </div>
        </div>

        {/* Join Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as const).map(join => (
            <button
              key={join}
              onClick={() => setActiveJoinType(join)}
              className={`p-3 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all flex items-center justify-between ${
                activeJoinType === join
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{join} JOIN</span>
              {join === 'FULL' && <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">PgSQL/Oracle</span>}
            </button>
          ))}
        </div>

        {/* Join Venn Visual Representation */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            {/* Visual Venn Diagram */}
            <div className="relative w-48 h-28 flex items-center justify-center">
              {/* Left Circle (Students) */}
              <div className={`absolute left-4 w-24 h-24 rounded-full border-2 transition-all flex items-center justify-start pl-3 text-[10px] font-mono font-bold ${
                activeJoinType === 'LEFT' || activeJoinType === 'FULL'
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                  : 'bg-slate-800/40 border-slate-700 text-zinc-500'
              }`}>
                Students
              </div>
              {/* Right Circle (Departments) */}
              <div className={`absolute right-4 w-24 h-24 rounded-full border-2 transition-all flex items-center justify-end pr-2 text-[10px] font-mono font-bold ${
                activeJoinType === 'RIGHT' || activeJoinType === 'FULL'
                  ? 'bg-purple-500/30 border-purple-400 text-purple-200'
                  : 'bg-slate-800/40 border-slate-700 text-zinc-500'
              }`}>
                Depts
              </div>
              {/* Overlap Intersection */}
              <div className={`absolute w-12 h-16 rounded-full transition-all flex items-center justify-center text-[9px] font-mono font-bold ${
                activeJoinType === 'INNER' || activeJoinType === 'LEFT' || activeJoinType === 'RIGHT' || activeJoinType === 'FULL'
                  ? 'bg-emerald-500/50 border border-emerald-400 text-white'
                  : 'bg-transparent'
              }`}>
                Match
              </div>
            </div>

            {/* Explanation text */}
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-white">
                {activeJoinType === 'INNER' && (language === 'bn' ? 'INNER JOIN (শুধুমাত্র নিখুঁত মিল থাকা সারি)' : 'INNER JOIN (Only Exact Matches)')}
                {activeJoinType === 'LEFT' && (language === 'bn' ? 'LEFT JOIN (বাম পাশের সব শিক্ষার্থী + মিল থাকা ডিপার্টমেন্ট)' : 'LEFT JOIN (All Left Students + Matching Depts)')}
                {activeJoinType === 'RIGHT' && (language === 'bn' ? 'RIGHT JOIN (ডান পাশের সব ডিপার্টমেন্ট + মিল থাকা শিক্ষার্থী)' : 'RIGHT JOIN (All Depts + Matching Students)')}
                {activeJoinType === 'FULL' && (language === 'bn' ? 'FULL OUTER JOIN (উভয় টেবিলের সব রেকর্ড)' : 'FULL OUTER JOIN (Everything from Both Sides)')}
              </h3>
              <p className="text-xs text-zinc-300">
                {activeJoinType === 'INNER' && (language === 'bn' ? 'উভয় Students ও Departments টেবিলে মিল পাওয়া গেলেই কেবল সেই সারিগুলো রিটার্ন করে।' : 'Returns rows only when there is a match in BOTH the Students and Departments tables.')}
                {activeJoinType === 'LEFT' && (language === 'bn' ? 'Students টেবিলের প্রতিটি রেকর্ড এবং Departments টেবিলের মিল থাকা রেকর্ড রিটার্ন করে। কোনো মিল না থাকলে ডান পাশে NULL বসে।' : 'Returns all records from Students, plus matched records from Departments. If no match, right side values are NULL.')}
                {activeJoinType === 'RIGHT' && (language === 'bn' ? 'Departments টেবিলের প্রতিটি রেকর্ড (এমনকি শিক্ষার্থীহীন Civil ডিপার্টমেন্টও) এবং মিল থাকা শিক্ষার্থী রিটার্ন করে।' : 'Returns all records from Departments (even the empty Civil Engineering dept), plus matched student rows.')}
                {activeJoinType === 'FULL' && (language === 'bn' ? 'LEFT এবং RIGHT জয়েনের সম্মিলিত ফলাফল তৈরি করে। PostgreSQL এবং Oracle-এ সরাসরি কাজ করে (MySQL-এ UNION দিয়ে তৈরি করতে হয়)।' : 'Combines the result of both LEFT and RIGHT joins. Supported natively in PostgreSQL and Oracle (in MySQL simulated via UNION).')}
              </p>
              <pre className="p-2.5 rounded bg-black/50 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`SELECT Students.Name, Departments.Department_Name 
FROM Students 
${activeJoinType} JOIN Departments 
ON Students.Department_ID = Departments.Department_ID;`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 18: ALTER, DROP, AND TRUNCATE DEEP DIVE
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৮ • অল্টার, ড্রপ ও ট্রাঙ্কেট তুলনা' : 'Part 18 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="ALTER, DROP, and TRUNCATE Comparison"
                bn="ALTER, DROP এবং TRUNCATE এর গভীর তাত্ত্বিক তুলনা"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="This is one of the most heavily tested theoretical distinctions in university DBMS exams:"
          bn="বিশ্ববিদ্যালয়ের DBMS পরীক্ষায় সবচেয়ে বেশি আসা গুরুত্বপূর্ণ তাত্ত্বিক পার্থক্যের সারসংক্ষেপ:"
        />

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#14182d] text-zinc-300 font-mono border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3"><DualText en="Command" bn="কমান্ড" /></th>
                <th className="py-2.5 px-3"><DualText en="Type" bn="ধরণ" /></th>
                <th className="py-2.5 px-3"><DualText en="WHERE Clause?" bn="WHERE ক্লজ?" /></th>
                <th className="py-2.5 px-3"><DualText en="Rollback Possible?" bn="রোলব্যাক সম্ভব?" /></th>
                <th className="py-2.5 px-3"><DualText en="Table Structure" bn="টেবিলের কাঠামো" /></th>
                <th className="py-2.5 px-3"><DualText en="Auto-Increment ID" bn="অটো-ইনক্রিমেন্ট আইডি" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">DELETE</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DML</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{language === 'bn' ? 'হ্যাঁ (বাছাইকৃত সারি)' : 'Yes (Selective)'}</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">{language === 'bn' ? 'হ্যাঁ (ট্রানজ্যাকশনে)' : 'Yes (in transaction)'}</td>
                <td className="py-2.5 px-3 text-zinc-300">{language === 'bn' ? 'অক্ষুণ্ণ থাকে' : 'Preserved'}</td>
                <td className="py-2.5 px-3 text-zinc-400">{language === 'bn' ? 'রিসেট হয় না' : 'Not reset'}</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-amber-400">TRUNCATE</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DDL</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না (সব সারি একবারে)' : 'No (All rows)'}</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না (বেশিরভাগ DB-তে)' : 'No (in most DBs)'}</td>
                <td className="py-2.5 px-3 text-zinc-300">{language === 'bn' ? 'অক্ষুণ্ণ থাকে (খালি টেবিল)' : 'Preserved (Empty table)'}</td>
                <td className="py-2.5 px-3 text-amber-300 font-bold">{language === 'bn' ? '১-এ রিসেট হয়ে যায়' : 'Reset back to 1'}</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3 font-mono font-bold text-rose-400">DROP</td>
                <td className="py-2.5 px-3 font-mono text-zinc-300">DDL</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না' : 'No'}</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'না' : 'No'}</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">{language === 'bn' ? 'স্থায়ীভাবে ধ্বংস হয়' : 'Destroyed Permanently'}</td>
                <td className="py-2.5 px-3 text-zinc-500">{language === 'bn' ? 'টেবিলের সাথে মুছে যায়' : 'Deleted with table'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 19: COMPLETE SQL PRACTICE PROJECT WALKTHROUGH
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৯ • রিয়েল-লাইফ প্রজেক্ট' : 'Part 19 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Complete SQL Practice Project: University System"
                bn="পূর্ণাঙ্গ এসকিউএল অনুশীলন প্রকল্প: বিশ্ববিদ্যালয় সিস্টেম"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Walk through the complete lifecycle of a relational database step-by-step:"
          bn="একটি রিলেশনাল ডেটাবেসের সম্পূর্ণ লাইফসাইকেল ধাপে ধাপে অনুশীলন করুন:"
        />

        {/* Step Buttons */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
            <button
              key={step}
              onClick={() => setActiveProjectStep(step)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                activeProjectStep === step
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {language === 'bn' ? `ধাপ ${step}` : `Step ${step}`}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeProjectStep === 1 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 1: Create Database" bn="ধাপ ১: ডেটাবেস তৈরি" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE DATABASE UniversityDB;
USE UniversityDB;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Creates the container and sets it as the active working schema."
                bn="ডেটাবেস কন্টেইনার তৈরি করে এবং এটিকে সক্রিয় র্কিং স্কিমা হিসেবে সেট করে।"
              />
            </div>
          )}

          {activeProjectStep === 2 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 2: Create Departments Table (Parent)" bn="ধাপ ২: Departments টেবিল তৈরি (প্যারেন্ট টেবিল)" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(50) NOT NULL
);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Always create parent tables first so child tables can reference their Primary Keys."
                bn="সর্বদা প্যারেন্ট টেবিল আগে তৈরি করবেন যেন চাইল্ড টেবিলগুলো এর Primary Key রেফারেন্স করতে পারে।"
              />
            </div>
          )}

          {activeProjectStep === 3 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 3: Insert Departments" bn="ধাপ ৩: ডিপার্টমেন্ট ডেটা ইনসার্ট" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`INSERT INTO Departments VALUES 
(1, 'CSE'),
(2, 'BBA'),
(3, 'EEE');`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Batch-inserts 3 department records into the Departments table."
                bn="Departments টেবিলে একবারে ৩টি ডিপার্টমেন্ট রেকর্ড ইনসার্ট করে।"
              />
            </div>
          )}

          {activeProjectStep === 4 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 4: Create Students Table with Foreign Key" bn="ধাপ ৪: Foreign Key সহ Students টেবিল তৈরি" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 16),
    Email VARCHAR(100) UNIQUE,
    Department_ID INT,
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Enforces PK, NOT NULL, CHECK, UNIQUE, and FOREIGN KEY integrity."
                bn="PK, NOT NULL, CHECK, UNIQUE এবং FOREIGN KEY এর ইন্টিগ্রিটি নিশ্চিত করে।"
              />
            </div>
          )}

          {activeProjectStep === 5 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 5: Insert Student Records" bn="ধাপ ৫: শিক্ষার্থী রেকর্ড ইনসার্ট" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`INSERT INTO Students VALUES 
(101, 'Rahim', 22, 'rahim@gmail.com', 1),
(102, 'Karim', 23, 'karim@gmail.com', 2),
(103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1),
(104, 'Nabila', 22, 'nabila@gmail.com', 3);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Populates students referencing existing department foreign keys (1, 2, 3)."
                bn="বিদ্যমান ডিপার্টমেন্ট ফরেন কি (১, ২, ৩) রেফারেন্স করে শিক্ষার্থীদের ডেটা সংরক্ষণ করে।"
              />
            </div>
          )}

          {activeProjectStep === 6 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 6: Display All Students" bn="ধাপ ৬: সব শিক্ষার্থীর তালিকা প্রদর্শন" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Returns all 4 student records with their raw Department_IDs."
                bn="সকল ৪ জন শিক্ষার্থীর রেকর্ড তাদের ডিপার্টমেন্ট আইডি সহ রিটার্ন করে।"
              />
            </div>
          )}

          {activeProjectStep === 7 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 7: Filter CSE Students" bn="ধাপ ৭: শুধু CSE শিক্ষার্থীদের ফিল্টার করা" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students WHERE Department_ID = 1;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Returns Rahim (101) and Sumaiya (103)."
                bn="রহিম (১০১) এবং সুমাইয়া (১০৩) এর তথ্য রিটার্ন করে।"
              />
            </div>
          )}

          {activeProjectStep === 8 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 8: Join Students with Department Names" bn="ধাপ ৮: ডিপার্টমেন্টের নাম সহ জয়েন করা" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Students.Name, Departments.Department_Name 
FROM Students 
INNER JOIN Departments 
ON Students.Department_ID = Departments.Department_ID;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Generates clean human-readable output replacing department IDs with actual names (CSE, BBA, EEE)."
                bn="ডিপার্টমেন্ট আইডির পরিবর্তে পাঠযোগ্য প্রকৃত নাম (CSE, BBA, EEE) প্রতিস্থাপন করে সুন্দর আউটপুট দেয়।"
              />
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 20: SELECTIVE TECHNICAL INTERVIEW QUESTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
                {language === 'bn' ? 'বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রস্তুতি' : 'Selective Technical Interview Questions'}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                <DualText
                  en="Selective Technical Interview Questions (SQL & Relational Queries)"
                  bn="বাছাইকৃত টেকনিক্যাল ইন্টারভিউ প্রশ্নোত্তর (SQL ও রিলেশনাল কুয়েরি)"
                />
              </h2>
            </div>
          </div>

          {/* Global Expand / Collapse Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={expandAllExamQ}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 transition-all cursor-pointer"
            >
              {language === 'bn' ? 'সব প্রসারিত করুন' : 'Expand All'}
            </button>
            <button
              onClick={collapseAllExamQ}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-zinc-300 text-xs font-mono border border-slate-700 transition-all cursor-pointer"
            >
              {language === 'bn' ? 'সব বন্ধ করুন' : 'Collapse All'}
            </button>
          </div>
        </div>

        <div className="text-xs text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Review high-frequency SQL technical interview questions with architectural summaries, core takeaways, and model answers:"
            bn="সফটওয়্যার ইঞ্জিনিয়ারিং ইন্টারভিউ ও পরীক্ষার জন্য সর্বাধিক জিজ্ঞাসিত ১০টি টেকনিক্যাল প্রশ্নের বিস্তারিত আর্কিটেকচারাল ব্যাখ্যা ও সমাধান:"
          />
        </div>

        {/* 10 Selective Interview Questions Accordion */}
        <div className="space-y-3">
          {selectiveInterviewQuestions.map((item, idx) => {
            const isOpen = !!openExamQuestions[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-[#0e1222] overflow-hidden transition-all shadow-md hover:border-slate-700"
              >
                <button
                  onClick={() => toggleExamQ(item.id)}
                  className="w-full p-4 text-left flex items-start sm:items-center justify-between gap-3 text-xs md:text-sm font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 w-fit shrink-0">
                      Q{idx + 1} • {language === 'bn' ? item.tagBn : item.tagEn}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 w-fit shrink-0">
                      {language === 'bn' ? item.difficultyBn : item.difficultyEn}
                    </span>
                    <span className="font-semibold text-zinc-100 font-sans truncate">
                      {language === 'bn' ? item.qBn : item.qEn}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-zinc-400 shrink-0 mt-0.5 sm:mt-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 md:p-5 bg-[#090c18] border-t border-slate-800/80 space-y-3 text-xs leading-relaxed font-sans animate-in fade-in duration-150">
                    {/* Summary Card */}
                    <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200">
                      <strong className="text-cyan-300 block font-mono text-[11px] uppercase tracking-wider mb-1">
                        {language === 'bn' ? 'মূল সিদ্ধান্ত ও সামারি:' : 'Architectural Summary:'}
                      </strong>
                      <p className="text-zinc-200 text-xs leading-relaxed">
                        {language === 'bn' ? item.summaryBn : item.summaryEn}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                        {language === 'bn' ? 'গুরুত্বপূর্ণ টেকনিক্যাল পয়েন্টসমূহ:' : 'Key Technical Points:'}
                      </span>
                      <ul className="space-y-1.5 pl-4 list-disc marker:text-cyan-400 text-zinc-300 text-xs">
                        {(language === 'bn' ? item.bulletsBn : item.bulletsEn).map((b, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick SQL Cheat Sheet */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'bn' ? 'ইন্টারভিউ ও পরীক্ষার জন্য কুইক সিনট্যাক্স চিটশিট' : 'Interview & Exam Syntax Quick Cheat Sheet'}</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 font-mono text-[11px] text-zinc-300">
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">CREATE TABLE</span>
              <code>CREATE TABLE t (id INT PK, name VARCHAR(50));</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">INSERT INTO</span>
              <code>INSERT INTO t VALUES (1, &apos;Data&apos;);</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">SELECT + WHERE</span>
              <code>SELECT * FROM t WHERE id = 1;</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">UPDATE + WHERE</span>
              <code>UPDATE t SET name=&apos;X&apos; WHERE id=1;</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-rose-400 font-bold block mb-1">DELETE + WHERE</span>
              <code>DELETE FROM t WHERE id=1;</code>
            </div>
            <div className="p-2.5 bg-black/40 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">INNER JOIN</span>
              <code>SELECT * FROM a JOIN b ON a.id = b.a_id;</code>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 22: HOMEWORK & CASE STUDY (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২১ • প্র্যাকটিক্যাল কেস স্টাডি' : 'Part 21 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Practical Case Study: CompanyDB & Employees Schema"
                bn="বাস্তবধর্মী কেস স্টাডি: CompanyDB ও Employees স্কিমা"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Practice writing queries for a real-world enterprise database scenario. Click Reveal Mentor Solution on each task to verify your SQL syntax and logic:"
          bn="একটি বাস্তব এন্টারপ্রাইজ ডেটাবেস পরিস্থিতির জন্য কুয়েরি লেখার অনুশীলন করুন। আপনার সিনট্যাক্স ও লজিক যাচাই করতে প্রতিটি টাস্কে মেনটর কুয়েরি দেখুন বাটনে ক্লিক করুন:"
        />

        {/* Schema Blueprint */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase">
            <DualText en="Target Schema: Employees Table" bn="টার্গেট স্কিমা: Employees টেবিল" />
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px] pt-1">
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Employee_ID</span>
              <span className="text-zinc-400">INT (PK)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Name</span>
              <span className="text-zinc-400">VARCHAR(100)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Age</span>
              <span className="text-zinc-400">INT</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Salary</span>
              <span className="text-zinc-400">DECIMAL(10,2)</span>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-800">
              <span className="text-cyan-400 font-bold block">Department</span>
              <span className="text-zinc-400">VARCHAR(50)</span>
            </div>
          </div>
        </div>

        {/* 11 Interactive Tasks with Reveal Buttons */}
        <div className="space-y-3">
          {[
            {
              num: 1,
              en: 'Task 1: Create a database named CompanyDB and switch to it.',
              bn: 'টাস্ক ১: CompanyDB নামে একটি ডেটাবেস তৈরি করুন এবং এতে সুইচ (USE) করুন।',
              sol: "CREATE DATABASE CompanyDB;\nUSE CompanyDB;"
            },
            {
              num: 2,
              en: 'Task 2: Create the Employees table with appropriate constraints.',
              bn: 'টাস্ক ২: প্রয়োজনীয় কনস্ট্রেইন্ট সহ Employees টেবিল তৈরি করুন।',
              sol: "CREATE TABLE Employees (\n    Employee_ID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT,\n    Salary DECIMAL(10,2) NOT NULL,\n    Department VARCHAR(50)\n);"
            },
            {
              num: 3,
              en: 'Task 3: Insert five employee records across different departments.',
              bn: 'টাস্ক ৩: বিভিন্ন ডিপার্টমেন্টে ৫ জন কর্মচারীর রেকর্ড ইনসার্ট করুন।',
              sol: "INSERT INTO Employees VALUES\n(1, 'Ahmed', 28, 45000.00, 'IT'),\n(2, 'Sara', 32, 55000.00, 'HR'),\n(3, 'Tariq', 25, 32000.00, 'IT'),\n(4, 'Mona', 29, 48000.00, 'Finance'),\n(5, 'Zubair', 35, 60000.00, 'IT');"
            },
            {
              num: 4,
              en: 'Task 4: Display all records from the Employees table.',
              bn: 'টাস্ক ৪: Employees টেবিলের সকল রেকর্ড প্রদর্শন (SELECT) করুন।',
              sol: "SELECT * FROM Employees;"
            },
            {
              num: 5,
              en: 'Task 5: Display only the Name and Salary of all employees.',
              bn: 'টাস্ক ৫: সকল কর্মচারীর শুধুমাত্র নাম (Name) এবং বেতন (Salary) প্রদর্শন করুন।',
              sol: "SELECT Name, Salary FROM Employees;"
            },
            {
              num: 6,
              en: 'Task 6: Find all employees whose salary is greater than 35,000.',
              bn: 'টাস্ক ৬: যাদের বেতন ৩৫,০০০ এর বেশি তাদের তালিকা ফিল্টার করুন।',
              sol: "SELECT * FROM Employees WHERE Salary > 35000;"
            },
            {
              num: 7,
              en: 'Task 7: Find all employees working in the IT department.',
              bn: 'টাস্ক ৭: শুধুমাত্র IT ডিপার্টমেন্টে কর্মরত কর্মচারীদের খুঁজুন।',
              sol: "SELECT * FROM Employees WHERE Department = 'IT';"
            },
            {
              num: 8,
              en: 'Task 8: Sort all employees by salary in descending order (highest first).',
              bn: 'টাস্ক ৮: কর্মচারীদের বেতন অনুযায়ী বড় থেকে ছোট (হায়াস্ট স্যালারি আগে) ক্রমে সাজান।',
              sol: "SELECT * FROM Employees ORDER BY Salary DESC;"
            },
            {
              num: 9,
              en: 'Task 9: Update the salary of Ahmed (Employee_ID = 1) to 50,000.',
              bn: 'টাস্ক ৯: আহমেদ (Employee_ID = 1) এর বেতন আপডেট করে ৫০,০০০ নির্ধারণ করুন।',
              sol: "UPDATE Employees SET Salary = 50000.00 WHERE Employee_ID = 1;"
            },
            {
              num: 10,
              en: 'Task 10: Delete the record of Tariq using his Employee_ID (3).',
              bn: 'টাস্ক ১০: তারিক (Employee_ID = 3) এর রেকর্ডটি টেবিল থেকে ডিলিট করুন।',
              sol: "DELETE FROM Employees WHERE Employee_ID = 3;"
            },
            {
              num: 11,
              en: 'Bonus Challenge: Find the average salary of employees in each department using GROUP BY.',
              bn: 'বোনাস চ্যালেঞ্জ: GROUP BY ব্যবহার করে প্রতিটি ডিপার্টমেন্টের গড় বেতন নির্ণয় করুন।',
              sol: "SELECT Department, COUNT(*) AS Headcount, AVG(Salary) AS Average_Salary\nFROM Employees\nGROUP BY Department;"
            }
          ].map(taskItem => (
            <div key={taskItem.num} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">
                  <DualText en={taskItem.en} bn={taskItem.bn} />
                </span>
                <button
                  onClick={() => toggleSolution(taskItem.num)}
                  className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {revealedSolutions[taskItem.num]
                      ? (language === 'bn' ? 'সমাধান লুকান' : 'Hide Solution')
                      : (language === 'bn' ? 'মেনটর কুয়েরি দেখুন' : 'Reveal Mentor Query')}
                  </span>
                </button>
              </div>
              {revealedSolutions[taskItem.num] && (
                <div className="pt-2">
                  <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                    {taskItem.sol}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          BOTTOM NAVIGATION & ROADMAP BRIDGE
         ======================================================== */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#14182e] via-[#101326] to-[#0d1020] border border-cyan-500/40 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {language === 'bn' ? 'লেসন ৬ সম্পন্ন হয়েছে' : 'Lesson 6 Completed'}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            {language === 'bn' ? '✓ এসকিউএল মৌলিক দক্ষতা অর্জিত' : '✓ SQL Core Mastered'}
          </span>
        </div>

        <h3 className="text-base md:text-xl font-bold text-white font-sans">
          <DualText
            en="What's Next: Lesson 7 • Advanced SQL Queries (Subqueries, CTEs, Window Functions)"
            bn="পরবর্তী ধাপ: লেসন ৭ • অ্যাডভান্সড এসকিউএল (সাবকুয়েরি, CTE ও উইন্ডো ফাংশন)"
          />
        </h3>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Now that you master SQL fundamentals, take your skills to an advanced level: Single & Multi-row subqueries, correlated inner-outer evaluations, Common Table Expressions (WITH), set operations, and analytical window functions."
            bn="মৌলিক এসকিউএল আয়ত্ত করার পর এবার আমরা অ্যাডভান্সড কুয়েরি দক্ষতা অর্জন করব: সিঙ্গেল ও মাল্টি-রো সাবকুয়েরি, কোরিলেটেড মূল্যায়ন, কমন টেবিল এক্সপ্রেশন (CTE - WITH ক্লজ), সেট অপারেশন এবং অ্যানালিটিক্যাল উইন্ডো ফাংশন।"
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigate?.('backend-lesson5')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'পূর্ববর্তী: লেসন ৫ (ER Model)' : 'Back to Lesson 5: ER Model'}</span>
          </button>
          <button
            onClick={() => onNavigate?.('backend-lesson7')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-600/30 cursor-pointer"
          >
            <span>{language === 'bn' ? 'লেসন ৭ শুরু করুন (Advanced SQL)' : 'Go to Lesson 7: Advanced SQL Queries'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
