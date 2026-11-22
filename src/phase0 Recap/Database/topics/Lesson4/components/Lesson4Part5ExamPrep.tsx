'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface InterviewQuestion {
  id: number;
  category: 'core' | 'architecture' | 'integrity' | 'system_design';
  categoryLabelEn: string;
  categoryLabelBn: string;
  level: 'Mid-Level' | 'Senior' | 'Lead / System Design';
  qEn: string;
  qBn: string;
  takeawayEn: string;
  takeawayBn: string;
  aEn: string;
  aBn: string;
  codeSnippet?: string;
}

export default function Lesson4Part5ExamPrep() {
  const { language } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'architecture' | 'integrity' | 'system_design'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  });

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<number, boolean> = {};
    interviewQuestions.forEach((q) => {
      allExpanded[q.id] = true;
    });
    setExpandedQuestions(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedQuestions({});
  };

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      category: 'core',
      categoryLabelEn: 'Core Concepts & SQL Standards',
      categoryLabelBn: 'মৌলিক ধারণা ও এসকিউএল স্ট্যান্ডার্ড',
      level: 'Mid-Level',
      qEn: 'Q1. What is the fundamental difference between Primary Key, Candidate Key, and Unique Key? Can a table have multiple Candidate Keys?',
      qBn: 'প্রশ্ন ১: Primary Key, Candidate Key এবং Unique Key-এর মূল পার্থক্য কী? একটি টেবিলে কি একাধিক Candidate Key থাকতে পারে?',
      takeawayEn: 'Interview Golden Takeaway: Candidate Keys are the eligible nominees; Primary Key is the elected leader (strictly 1, NOT NULL); Unique Keys are constraints protecting secondary business attributes (multiple allowed, permits NULLs).',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: Candidate Key হলো যোগ্য প্রার্থী; Primary Key হলো নির্বাচিত প্রধান (মাত্র ১টি, কখনোই NULL নয়); Unique Key হলো অন্যান্য কলামের ডুপ্লিকেট রোধক কনস্ট্রেইন্ট (একাধিক হতে পারে, NULL গ্রহণযোগ্য)।',
      aEn: '1. Candidate Key: Any minimal Super Key that uniquely identifies tuples without redundancy. A table can (and often does) have multiple Candidate Keys (e.g., Student_ID, National_ID, Email).\n\n2. Primary Key: The single Candidate Key officially chosen by the database architect as the main table identifier. A table can have STRICTLY ONE Primary Key, and it categorically rejects NULL values.\n\n3. Unique Key: An integrity constraint placed on any column (or set of columns) to prevent duplicate entries. A table can have MULTIPLE Unique Key constraints, and according to SQL ANSI standards, Unique constraints accept multiple NULL values (because NULL != NULL in relational calculus).',
      aBn: '১. Candidate Key: কোনো টেবিলে অপ্রয়োজনীয় কলাম ছাড়া প্রতিটি সারিকে অনন্যভাবে শনাক্ত করতে সক্ষম ন্যূনতম সুপার কী। একটি টেবিলে একাধিক ক্যান্ডিডেট কী থাকতে পারে (যেমন: Student_ID, NID, Email)।\n\n২. Primary Key: টেবিলে বিদ্যমান ক্যান্ডিডেট কী-গুলোর মধ্য থেকে ডেটাবেস ডিজাইনার কর্তৃক নির্বাচিত প্রধান একক আইডি। একটি টেবিলে কেবল ১টি প্রাইমারি কী থাকে এবং এটি কখনোই NULL মান গ্রহণ করে না।\n\n৩. Unique Key: নির্দিষ্ট কোনো কলামে তথ্যের পুনরাবৃত্তি ঠেকাতে ব্যবহৃত কনস্ট্রেইন্ট। টেবিলে যত খুশি ইউনিক কী কনস্ট্রেইন্ট থাকতে পারে এবং SQL স্ট্যান্ডার্ড অনুযায়ী এতে একাধিক NULL মান গ্রহণযোগ্য (কারণ রিলেশনাল অ্যালজেব্রায় NULL != NULL)।',
      codeSnippet: `-- Candidate Keys: Student_ID, National_ID, Email
CREATE TABLE STUDENT (
  Student_ID  VARCHAR(10) PRIMARY KEY,        -- 👑 Elected PK (strictly 1 per table, NOT NULL)
  National_ID VARCHAR(20) UNIQUE NOT NULL,    -- 🔑 Alternate / Unique Key 1
  Email       VARCHAR(100) UNIQUE             -- 🔑 Unique Key 2 (NULL allowed if student has no email yet)
);`,
    },
    {
      id: 2,
      category: 'architecture',
      categoryLabelEn: 'Storage & B-Tree Indexing',
      categoryLabelBn: 'স্টোরেজ ও বি-ট্রি ইনডেক্সিং',
      level: 'Senior',
      qEn: 'Q2. Why is using a Natural Key (e.g. 17-digit National ID) or a Random UUID (v4) as a Clustered Primary Key considered an Anti-Pattern at scale?',
      qBn: 'প্রশ্ন ২: বৃহৎ সিস্টেমে ক্লাস্টার্ড প্রাইমারি কী হিসেবে ন্যাচারাল কী (যেমন ১৭-ডিজিটের NID) বা র‍্যান্ডম UUID (v4) ব্যবহার করা কেন ক্ষতিকর (Anti-Pattern)?',
      takeawayEn: 'Interview Golden Takeaway: Clustered PKs dictate physical disk ordering. Random UUIDs cause devastating B-Tree Page Splits and fragmented I/O. Long string Natural Keys bloat every secondary index and risk massive CASCADE lock contention when legal IDs are corrected.',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: ক্লাস্টার্ড প্রাইমারি কী ডিস্কে ডেটা সংরক্ষণের ক্রম নির্ধারণ করে। র‍্যান্ডম UUID ব্যবহারে ঘনঘন B-Tree Page Split ঘটে ও ডিস্ক I/O ধীর হয়ে যায়। দীর্ঘ স্ট্রিং ন্যাচারাল কী প্রতি চাইল্ড ইনডেক্সকে স্ফীত করে এবং সরকারি ভুল সংশোধনে বিশাল ক্যাসকেড লক তৈরি করে।',
      aEn: '1. B-Tree Page Splits & Fragmentation: A Clustered Index stores physical table rows in the order of the Primary Key. Inserting random UUIDs (UUID v4) forces random page insertions into the middle of B+ Tree leaf nodes, triggering expensive Page Splits, disk fragmentation, and destroying write throughput.\n\n2. Secondary Index Bloat: In storage engines like MySQL InnoDB, EVERY secondary index stores the Primary Key value as its row pointer. If your Primary Key is a 36-character UUID string or a 17-digit NID instead of a 4-byte INT or 8-byte BIGINT, every secondary index consumes 4x-8x more RAM cache!\n\n3. Immutability Hazard: If a citizen legally corrects a typographical error in their National ID, an ON UPDATE CASCADE locks the parent table and updates millions of foreign keys across child tables. Surrogate keys never change, insulating internal relations from external real-world edits.',
      aBn: '১. বি-ট্রি পেজ স্প্লিট ও ডিস্ক ফ্র্যাগমেন্টেশন: ক্লাস্টার্ড ইনডেক্স প্রাইমারি কী-এর ক্রমানুসারে ফিজিক্যাল ডিস্কে সারিগুলো সাজিয়ে রাখে। র‍্যান্ডম UUID v4 ইনসার্ট করলে B+ Tree-এর মাঝের পাতায় জোরপূর্বক ডেটা ঢোকাতে গিয়ে ঘনঘন পেজ স্প্লিট (Page Split) ঘটে, যা ডিস্কের কার্যক্ষমতা মারাত্মক কমিয়ে দেয়।\n\n২. সেকেন্ডারি ইনডেক্স মেমরি অপচয়: MySQL InnoDB-এর মতো ইঞ্জিনে প্রতিটি সেকেন্ডারি ইনডেক্স তার পয়েন্টার হিসেবে মূল প্রাইমারি কি-কে সেভ করে রাখে। প্রাইমারি কি যদি ৪-বাইট ইন্টিজারের বদলে ৩৬-অক্ষরের UUID বা ১৭-অক্ষরের NID হয়, তবে সকল সেকেন্ডারি ইনডেক্স ৪ থেকে ৮ গুণ বেশি র‍্যাম দখল করে ফেলে।\n\n৩. ক্যাসকেড লক ও স্থায়িত্ব: সরকারি ভুলের কারণে কোনো ইউজারের NID নম্বর সংশোধন করতে হলে চাইল্ড টেবিলের কোটি কোটি রো-তে লক ফেলে ক্যাসকেড আপডেট চালাতে হয়। সারোগেট কী সম্পূর্ণ অপরিবর্তনশীল হওয়ায় বাস্তব জগতের পরিবর্তনে সিস্টেমের ভেতরে কোনো সমস্যা হয় না।',
    },
    {
      id: 3,
      category: 'integrity',
      categoryLabelEn: 'Concurrency, Locking & Integrity',
      categoryLabelBn: 'কনকারেন্সি, লকিং ও ফরেন কি',
      level: 'Lead / System Design',
      qEn: 'Q3. What happens under the hood during Foreign Key ON DELETE CASCADE in high-concurrency production systems? Why do companies like Uber, Stripe, and Shopify often disable DB-level cascades?',
      qBn: 'প্রশ্ন ৩: হাই-কনকারেন্সি প্রোডাকশন সিস্টেমে Foreign Key ON DELETE CASCADE চলাকালীন ইঞ্জিনের ভেতরে কী ঘটে? উবার, স্ট্রাইপ বা শপিফাইয়ের মতো প্রতিষ্ঠানগুলো কেন ডেটাবেস-লেভেল ক্যাসকেড বন্ধ রাখে?',
      takeawayEn: 'Interview Golden Takeaway: Cascading operations acquire recursive row-exclusive and table locks down the relationship tree. This causes deadlocks, transaction timeouts, and thread pool exhaustion under heavy traffic. High-scale architectures favor Soft Deletes or asynchronous event-driven worker cleanup.',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: ক্যাসকেড অপারেশনের সময় ডেটাবেস ইঞ্জিন রিলেশন ট্রির সকল চাইল্ড সারিতে এক্সক্লুসিভ লক বসায়। অতিরিক্ত ট্রাফিকের সময় এটি ডেডলক (Deadlock), টাইমআউট এবং সার্ভার ক্র্যাশ ঘটায়। তাই স্কেলড আর্কিটেকচারে সফট ডিলিট (Soft Delete) বা ব্যাকগ্রাউন্ড ওয়ার্কার কিউ ব্যবহার করা হয়।',
      aEn: '1. Lock Escalation & Deadlocks: When a parent record is deleted with ON DELETE CASCADE, the database engine must recursively locate and lock all dependent records in child tables, grandchild tables, and join tables. Under high concurrent write traffic, other incoming transactions trying to query or update those child rows will block or deadlock.\n\n2. Long-Running Transaction Pitfall: Deleting a high-traffic parent (e.g. an Organization with 500,000 users, orders, and audit logs) inside a single ACID transaction creates huge WAL/redo log pressure and locks the database tables for seconds or minutes.\n\n3. Modern Architecture Solution: High-scale companies use Soft Deletes (setting "deleted_at = NOW()") or publish an asynchronous Domain Event (e.g., Kafka / RabbitMQ "UserDeletedEvent") to let background worker queues purge child records safely in micro-batches with minimal locking.',
      aBn: '১. লক এসকেলেশন ও ডেডলক: ON DELETE CASCADE চলাকালে ডেটাবেস ইঞ্জিন মূল রেকর্ডের সাথে সম্পর্কিত সকল চাইল্ড ও গ্র্যান্ড-চাইল্ড টেবিলে রিকার্সিভ লক বসায়। একই সময়ে অন্যান্য ইউজার চাইল্ড টেবিলে ইনসার্ট/আপডেট করতে চাইলে ডেডলক সৃষ্টি হয় এবং রিকোয়েস্ট ফেইল করে।\n\n২. দীর্ঘমেয়াদী ট্রানজ্যাকশন: একটি বড় প্যারেন্ট রেকর্ড (যেমন: কোনো কোম্পানি বা প্রজেক্ট যার অধীনে ৫ লক্ষ অর্ডার বা লগ রয়েছে) ডিলিট করতে গেলে পুরো ডেটাবেস ইঞ্জিন ফ্রিজ হয়ে যেতে পারে এবং রিডো লগ উপচে পড়ে।\n\n৩. আধুনিক সিস্টেম ডিজাইন সমাধান: বড় বড় প্রতিষ্ঠান হার্ড ডিলিটের পরিবর্তে সফট ডিলিট (deleted_at = NOW()) ব্যবহার করে, অথবা কাফকা/র‍্যাবিট-এমকিউ দিয়ে ইভেন্ট ড্রাইভেন পদ্ধতিতে ব্যাকগ্রাউন্ড ওয়ার্কারের মাধ্যমে ছোট ছোট ব্যাচে চাইল্ড ডেটা ক্লিনআপ করে।',
      codeSnippet: `-- High-Scale Soft Delete Pattern (Industry Standard)
ALTER TABLE USERS ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE USERS ADD COLUMN deleted_at TIMESTAMP NULL;

-- Soft deletion keeps foreign keys intact without costly table locks:
UPDATE USERS SET is_deleted = TRUE, deleted_at = CURRENT_TIMESTAMP WHERE id = 101;`,
    },
    {
      id: 4,
      category: 'core',
      categoryLabelEn: 'Core Concepts & SQL Standards',
      categoryLabelBn: 'মৌলিক ধারণা ও এসকিউএল স্ট্যান্ডার্ড',
      level: 'Mid-Level',
      qEn: 'Q4. Can a Foreign Key reference a column that is NOT a Primary Key? Is it valid in SQL standards?',
      qBn: 'প্রশ্ন ৪: কোনো Foreign Key কি এমন কোনো কলামকে রেফারেন্স করতে পারে যা Primary Key নয়? এসকিউএল স্ট্যান্ডার্ডে এটি কি বৈধ?',
      takeawayEn: 'Interview Golden Takeaway: YES! A Foreign Key can reference ANY column (or set of columns) that has a UNIQUE constraint or is a Candidate Key in the parent table. It does NOT have to be the Primary Key.',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: হ্যাঁ! প্যারেন্ট টেবিলের যে কলামে UNIQUE কনস্ট্রেইন্ট বা ক্যান্ডিডেট কী শর্ত রয়েছে, ফরেন কী তাকেই রেফারেন্স করতে পারে। এটি প্রাইমারি কি হওয়াই বাধ্যতামূলক নয়।',
      aEn: 'Yes! According to the ANSI SQL standard (SQL-92 onwards), a Foreign Key constraint requires the referenced parent column(s) to guarantee uniqueness—meaning it must be defined as either a PRIMARY KEY or a UNIQUE constraint.\n\nWhile referencing the Primary Key is standard convention (e.g., REFERENCES CUSTOMER(id)), referencing an Alternate Key (e.g., REFERENCES CUSTOMER(email) or REFERENCES CUSTOMER(nid)) is 100% syntactically and semantically legal in PostgreSQL, MySQL, Oracle, and SQL Server.',
      aBn: 'হ্যাঁ, সম্পূর্ণ বৈধ! ANSI SQL স্ট্যান্ডার্ড অনুযায়ী ফরেন কী যার দিকে নির্দেশ করবে, প্যারেন্ট টেবিলে সেই কলামের মান অবশ্যই ইউনিক হতে হবে—অর্থাৎ কলামটিতে হয় PRIMARY KEY থাকতে হবে অথবা UNIQUE কনস্ট্রেইন্ট থাকতে হবে।\n\nসাধারণত প্রাইমারি কি-কে রেফারেন্স করাই বিশ্বজুড়ে প্রচলিত প্র্যাকটিস হলেও, অল্টারনেট কি (যেমন: REFERENCES CUSTOMER(email) অথবা REFERENCES CUSTOMER(nid))-কে ফরেন কি হিসেবে পয়েন্ট করা সম্পূর্ণ কার্যকর ও বৈধ।',
      codeSnippet: `-- Parent Table with Candidate / Unique Key
CREATE TABLE CUSTOMER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tax_id VARCHAR(30) UNIQUE NOT NULL  -- Candidate / Unique Key
);

-- Child Table referencing the UNIQUE column instead of PK:
CREATE TABLE TAX_FILING (
  filing_id INT PRIMARY KEY,
  customer_tax_id VARCHAR(30),
  CONSTRAINT fk_tax FOREIGN KEY (customer_tax_id) REFERENCES CUSTOMER(tax_id) -- 100% Valid!
);`,
    },
    {
      id: 5,
      category: 'system_design',
      categoryLabelEn: 'Data Modeling & System Design',
      categoryLabelBn: 'ডেটা মডেলিং ও সিস্টেম ডিজাইন',
      level: 'Senior',
      qEn: 'Q5. In a Many-to-Many junction table (e.g. ENROLLMENT), should you use a Composite Primary Key or a Surrogate Key with a Composite Unique Constraint?',
      qBn: 'প্রশ্ন ৫: Many-to-Many জাংশন টেবিলে (যেমন ENROLLMENT) কম্পোজিট প্রাইমারি কী ব্যবহার করা উচিত, নাকি সারোগেট আইডির সাথে কম্পোজিট ইউনিক কনস্ট্রেইন্ট ব্যবহার করা শ্রেয়?',
      takeawayEn: 'Interview Golden Takeaway: Pure Relational Modeling prefers Composite PKs for junction tables to save storage and prevent surrogate clutter. However, ORMs (Hibernate, Prisma, Django) and tables with their own child entities prefer a Surrogate PK with a Composite UNIQUE index.',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: বিশুদ্ধ রিলেশনাল থিওরিতে অতিরিক্ত কলাম এড়াতে কম্পোজিট প্রাইমারি কী সেরা। তবে আধুনিক ORM (Prisma, Django, Hibernate) ব্যবহার করলে কিংবা ঐ জাংশন টেবিলের নিচে আরও চাইল্ড টেবিল থাকলে একটি Surrogate PK এবং Composite UNIQUE কনস্ট্রেইন্ট ব্যবহার করাই বাস্তবসম্মত।',
      aEn: '1. Composite Primary Key Approach: PRIMARY KEY (student_id, course_id). Advantage: 100% relational purity, zero overhead of generating a useless surrogate ID, and prevents a student from enrolling in the same course twice naturally. Best for simple junction tables with no child relations.\n\n2. Surrogate Key + Composite Unique Index: id BIGINT AUTO_INCREMENT PRIMARY KEY, CONSTRAINT uq_enrollment UNIQUE (student_id, course_id). Advantage: Works seamlessly with modern ORMs that require a single-column primary key for dirty checking and entity identity. Also, if this enrollment record needs child rows (e.g. ATTENDANCE or ASSIGNMENT_SUBMISSIONS referencing an enrollment_id), a 4-byte/8-byte surrogate integer is far cleaner than a compound foreign key!',
      aBn: '১. Composite Primary Key পদ্ধতি: PRIMARY KEY (student_id, course_id)। সুবিধা: অপ্রয়োজনীয় সারোগেট কলাম তৈরি না করে সরাসরি মেমরি বাঁচায় এবং একই ছাত্রকে এক কোর্সে দুবার নিবন্ধন করা রোধ করে। যেসব জাংশন টেবিলের নিচে আর কোনো চাইল্ড টেবিল থাকে না তাদের জন্য এটি সেরা।\n\n২. Surrogate Key + Composite Unique Index পদ্ধতি: id BIGINT AUTO_INCREMENT PRIMARY KEY এবং UNIQUE (student_id, course_id)। সুবিধা: আধুনিক ফ্রেমওয়ার্ক ও ORM-এ এন্টিটি ট্র্যাকিং সহজ হয়। এছাড়াও যদি এই এনরোলমেন্টের অধীনে আরও সাব-রেকর্ড থাকে (যেমন: এসাইনমেন্ট জমা বা এটেন্ডেন্স), তবে চাইল্ড টেবিলে একটি একক enrollment_id পাঠানো যৌগিক ফরেন কি পাঠানোর চেয়ে অনেক বেশি কার্যকর!',
      codeSnippet: `-- Option A: Pure Relational Composite PK
CREATE TABLE ENROLLMENT (
  student_id VARCHAR(10) REFERENCES STUDENT(id),
  course_id  VARCHAR(10) REFERENCES COURSE(id),
  PRIMARY KEY (student_id, course_id)
);

-- Option B: Production ORM Friendly Pattern (Surrogate PK + Composite Unique)
CREATE TABLE ENROLLMENT (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(10) REFERENCES STUDENT(id),
  course_id  VARCHAR(10) REFERENCES COURSE(id),
  CONSTRAINT uq_student_course UNIQUE (student_id, course_id)
);`,
    },
    {
      id: 6,
      category: 'core',
      categoryLabelEn: 'Core Concepts & SQL Standards',
      categoryLabelBn: 'মৌলিক ধারণা ও এসকিউএল স্ট্যান্ডার্ড',
      level: 'Mid-Level',
      qEn: 'Q6. Why does SQL allow multiple NULL values in a UNIQUE constraint? What is the logic behind "NULL != NULL"?',
      qBn: 'প্রশ্ন ৬: এসকিউএল-এ UNIQUE কনস্ট্রেইন্ট থাকা সত্ত্বেও কেন একাধিক NULL মান জমা রাখা যায়? "NULL != NULL"-এর পেছনের যুক্তি কী?',
      takeawayEn: 'Interview Golden Takeaway: In SQL three-valued logic (3VL), NULL represents unknown information, not a zero or empty string. Since one unknown cannot be asserted as identical to another unknown, multiple NULLs do not violate the uniqueness rule.',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: এসকিউএল থ্রি-ভ্যালুড লজিকে NULL মানে কোনো মান জানা নেই বা অনুপস্থিত (এটি ০ বা খালি স্ট্রিং নয়)। যেহেতু একটি অজানা মান আরেকটি অজানা মানের সমান হতে পারে না, তাই একাধিক সারিতে NULL থাকা ইউনিক শর্ত ভঙ্গ করে না।',
      aEn: 'In relational database theory and ANSI SQL, NULL does not represent a specific value—it represents missing, unavailable, or inapplicable information. Therefore, evaluating (NULL = NULL) yields UNKNOWN, never TRUE!\n\nBecause the database cannot confirm that two NULL entries represent the exact same entity, SQL standard engines (PostgreSQL, MySQL, SQLite, Oracle) permit multiple rows to have NULL in a column with a UNIQUE constraint.\n\n*Note on MS SQL Server:* Historically, SQL Server allowed only ONE NULL in a standard UNIQUE constraint unless a filtered index (WHERE column IS NOT NULL) was defined.',
      aBn: 'রিলেশনাল ডেটাবেস তত্ত্বে NULL কোনো নির্দিষ্ট মান নয়—এটি অজ্ঞাত, অনুপস্থিত বা প্রযোজ্য নয় এমন তথ্য নির্দেশ করে। ফলে এসকিউএল ইঞ্জিনে যখন (NULL = NULL) পরীক্ষা করা হয়, তার ফলাফল কখনোই TRUE হয় না, বরং UNKNOWN হয়!\n\nযেহেতু ডেটাবেস ইঞ্জিন নিশ্চিত হতে পারে না যে দুটি সারির অজানা মান আসলে একই কিনা, তাই PostgreSQL, MySQL, SQLite এবং Oracle-এর মতো আধুনিক ইঞ্জিনে ইউনিক কলামে যত খুশি NULL রাখা যায়।\n\n*বিশেষ দ্রষ্টব্য:* Microsoft SQL Server-এ অতীতে ডিফল্ট ইউনিক কনস্ট্রেইন্টে মাত্র একটি NULL এলাউ করত, যার জন্য পরবর্তীতে ফিল্টার্ড ইনডেক্স ব্যবহারের প্রয়োজন হতো।',
    },
    {
      id: 7,
      category: 'integrity',
      categoryLabelEn: 'Concurrency, Locking & Integrity',
      categoryLabelBn: 'কনকারেন্সি, লকিং ও ফরেন কি',
      level: 'Mid-Level',
      qEn: 'Q7. What is an "Orphan Record" in relational databases, and what are the three main options for ON DELETE referential integrity actions?',
      qBn: 'প্রশ্ন ৭: রিলেশনাল ডেটাবেসে "Orphan Record" (অনাথ রেকর্ড) কী, এবং ON DELETE রেফারেন্সিয়াল অ্যাকশনের প্রধান ৩টি অপশন কী কী?',
      takeawayEn: 'Interview Golden Takeaway: An orphan record is a child row pointing to a parent that no longer exists. Foreign keys prevent orphans via 3 strategies: RESTRICT (rejects parent delete), CASCADE (deletes children too), and SET NULL (detaches children).',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: অনাথ রেকর্ড হলো এমন চাইল্ড রো যার মূল প্যারেন্ট রেকর্ড ডেটাবেসে আর নেই। ফরেন কী ৩টি উপায়ে অনাথ রেকর্ড হওয়া ঠেকায়: RESTRICT (প্যারেন্ট মুছতে বাধা দেয়), CASCADE (চাইল্ডও স্বয়ংক্রিয়ভাবে মুছে ফেলে), এবং SET NULL (চাইল্ডকে প্যারেন্টমুক্ত করে রাখে)।',
      aEn: '1. Orphan Record: A row in a child table whose Foreign Key attribute points to a parent Primary Key value that was deleted or never existed (e.g. an ORDER for a CUSTOMER that doesn\'t exist, or an ENROLLMENT for a deleted COURSE). Orphan rows corrupt data integrity and analytics.\n\n2. The Three ON DELETE Actions:\n   • RESTRICT (or NO ACTION): The DBMS refuses to delete the parent row if ANY child records currently reference it (Throws a Foreign Key Constraint Violation error).\n   • CASCADE: When the parent row is deleted, the engine automatically deletes all corresponding child rows in the same transaction.\n   • SET NULL: When the parent row is deleted, the engine updates the child row\'s foreign key column to NULL (requires the child foreign key column to be nullable).',
      aBn: '১. Orphan Record (অনাথ রেকর্ড): কোনো চাইল্ড টেবিলের এমন রেকর্ড যার ফরেন কি এমন এক প্যারেন্ট কি-কে নির্দেশ করছে যার কোনো অস্তিত্ব নেই (যেমন: ডেটাবেসে গ্রাহকের নাম নেই কিন্তু তার নামে অর্ডার রয়ে গেছে)। এটি ডেটাবেসের ইন্টিগ্রিটি নষ্ট করে।\n\n২. ON DELETE-এর প্রধান ৩টি অ্যাকশন:\n   • RESTRICT / NO ACTION: চাইল্ড টেবিলে কোনো রেকর্ড বিদ্যমান থাকলে প্যারেন্ট রেকর্ড ডিলিট করা সম্পূর্ণ নিষিদ্ধ করে এবং ইঞ্জিন এরর থ্রো করে।\n   • CASCADE: প্যারেন্ট রেকর্ড ডিলিট করার সাথে সাথে তার অধীনস্থ সকল চাইল্ড রেকর্ডও ডেটাবেস থেকে স্বয়ংক্রিয়ভাবে ডিলিট হয়ে যায়।\n   • SET NULL: প্যারেন্ট রেকর্ড ডিলিট হয়ে গেলে চাইল্ড রেকর্ডের ফরেন কি কলামটিতে স্বয়ংক্রিয়ভাবে NULL বসে যায় (এজন্য কলামটিতে NULL অনুমোদন থাকতে হয়)।',
    },
    {
      id: 8,
      category: 'architecture',
      categoryLabelEn: 'Storage & B-Tree Indexing',
      categoryLabelBn: 'স্টোরেজ ও বি-ট্রি ইনডেক্সিং',
      level: 'Lead / System Design',
      qEn: 'Q8. How does a database storage engine (like InnoDB) physically store Primary Keys vs Secondary Unique Keys? What is an Index Bookmark Lookup?',
      qBn: 'প্রশ্ন ৮: ইনোডিবি (InnoDB)-এর মতো স্টোরেজ ইঞ্জিন কীভাবে ফিজিক্যালি Primary Key এবং Secondary Unique Key সংরক্ষণ করে? Index Bookmark Lookup বলতে কী বোঝায়?',
      takeawayEn: 'Interview Golden Takeaway: In a Clustered Index (Primary Key), leaf nodes store the ENTIRE row data. In a Secondary Index, leaf nodes store only the indexed column + the Primary Key. Querying by a secondary key requires a "double-hop" (bookmark lookup) to fetch the full row, unless using a Covering Index.',
      takeawayBn: 'ইন্টারভিউ গোল্ডেন রুল: ক্লাস্টার্ড ইনডেক্সে (প্রাইমারি কি) বি-ট্রি এর লিফ নোড পুরো সারির ডেটা বহন করে। সেকেন্ডারি ইনডেক্সের লিফ নোডে কেবল ঐ কলামের মান এবং প্রাইমারি কি সংরক্ষিত থাকে। সেকেন্ডারি কি দিয়ে সম্পূর্ণ রো আনতে গেলে "ডাবল-হপ" বা বুকমার্ক লুকআপের প্রয়োজন হয়, যদি না কভারিং ইনডেক্স ব্যবহৃত হয়।',
      aEn: '1. Clustered Index (Primary Key): The table IS the index. The leaf pages of the Primary Key B+ Tree contain all user columns (id, name, email, created_at, etc.). Therefore, looking up a record by its Primary Key requires traversing the tree ONCE directly to the data page (O(log N)).\n\n2. Secondary Index (Unique / Non-Clustered): Leaf pages of a secondary index do NOT store row data—they store the secondary key value PLUS the Primary Key of that row. When you execute "SELECT * FROM USERS WHERE email = \'test@dev.com\'", the engine:\n   Step A: Traverses the secondary index on email to find the Primary Key (e.g., id = 42).\n   Step B: Traverses the Clustered Index using id = 42 to fetch the full row.\n   This two-step traverse is known as a Bookmark Lookup (or Double Hop).\n\n3. Interview Optimization Tip: To eliminate the bookmark lookup overhead on frequent queries, create a "Covering Index" containing both the filter and the selected columns (e.g. INDEX (email, name)).',
      aBn: '১. ক্লাস্টার্ড ইনডেক্স (Primary Key): টেবিল নিজেই ইনডেক্স হিসেবে কাজ করে। প্রাইমারি কী বি-ট্রি-এর শেষ পাতাগুলোতে (Leaf Nodes) সারির সকল কলামের প্রকৃত ডেটা জমা থাকে। ফলে প্রাইমারি কি দিয়ে ডেটা খুঁজলে মাত্র ১ বার বি-ট্রি ব্রাউজ করেই সরাসরি পুরো ডেটা রো পাওয়া যায়।\n\n২. সেকেন্ডারি ইনডেক্স (Unique / Non-Clustered): সেকেন্ডারি ইনডেক্সের পাতায় সম্পূর্ণ রো থাকে না—থাকে কেবল ঐ ইউনিক কলামটির মান এবং সংশ্লিষ্ট সারির প্রাইমারি কি আইডি। ফলে "SELECT * FROM USERS WHERE email = \'test@dev.com\'" চালালে ইঞ্জিন:\n   ধাপ ১: ইমেইল ইনডেক্সে গিয়ে সংশ্লিষ্ট Primary Key (id = 42) খুঁজে বের করে।\n   ধাপ ২: এরপর id = 42 নিয়ে ক্লাস্টার্ড ইনডেক্সে দ্বিতীয়বার ব্রাউজ করে সম্পূর্ণ রো উদ্ধার করে।\n   এই জোড়া অপারেশনকে বলা হয় "Bookmark Lookup" বা ইনডেক্স ডাবল-হপ।\n\n৩. ইন্টারভিউ পারফরম্যান্স টিপস: ঘনঘন চালানো কোয়েরিতে বুকমার্ক লুকআপ ওভারহেড শূন্যে নামিয়ে আনতে "Covering Index" তৈরি করা হয় (যেমন: INDEX (email, name)), যাতে প্রথম ইনডেক্সেই কাঙ্ক্ষিত সব কলাম পেয়ে যায়।',
    },
  ];

  const filteredQuestions = interviewQuestions.filter((q) => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                {language === 'bn' ? 'পর্ব ৬ / ৮ • ইন্টারভিউ স্পেশাল' : 'Part 6 of 8 • Interview Ready'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold hidden sm:inline">
                FAANG & Software Engineering
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Technical Interview Preparation: High-Yield DBMS Keys Questions"
                bn="টেকনিক্যাল ইন্টারভিউ প্রস্তুতি: ডিবিএমএস কী-এর গুরুত্বপূর্ণ প্রশ্নোত্তর"
              />
            </h2>
          </div>
        </div>

        {/* Global Expand/Collapse Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExpandAll}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-zinc-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'সব খুলুন' : 'Expand All'}
          </button>
          <button
            onClick={handleCollapseAll}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-zinc-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {language === 'bn' ? 'সব বন্ধ করুন' : 'Collapse All'}
          </button>
        </div>
      </div>

      {/* Subtitle / Intro Description */}
      <div className="text-xs text-zinc-400 font-sans leading-relaxed">
        <DualText
          en="This curated compilation contains the exact questions asked in Backend Engineering, Systems Architecture, and Database Specialist interviews at top technology companies. Master the storage trade-offs, concurrency locking behaviors, and ANSI SQL standards behind relational keys."
          bn="শীর্ষস্থানীয় প্রযুক্তি প্রতিষ্ঠানের ব্যাকএন্ড ইঞ্জিনিয়ারিং, সিস্টেম ডিজাইন এবং ডেটাবেস ইন্টারভিউতে সচরাচর জিজ্ঞেস করা গুরুত্বপূর্ণ প্রশ্নাবলি এখানে সুবিন্যস্ত করা হয়েছে। রিলেশনাল কী-এর পেছনের বি-ট্রি স্টোরেজ, কনকারেন্সি লক ও বাস্তব সফটওয়্যার আর্কিটেকচার রপ্ত করুন।"
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[
          { id: 'all', labelEn: 'All Questions (8)', labelBn: 'সকল প্রশ্ন (৮)' },
          { id: 'core', labelEn: 'Core Concepts & SQL (3)', labelBn: 'মৌলিক ও এসকিউএল (৩)' },
          { id: 'architecture', labelEn: 'Storage & B-Tree Indexing (2)', labelBn: 'স্টোরেজ ও বি-ট্রি (২)' },
          { id: 'integrity', labelEn: 'Locking & Foreign Keys (2)', labelBn: 'লকিং ও ফরেন কি (২)' },
          { id: 'system_design', labelEn: 'System Design & Modeling (1)', labelBn: 'সিস্টেম ডিজাইন (১)' },
        ].map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-md shadow-amber-950/40'
                  : 'bg-[#121526] text-zinc-400 border border-slate-800 hover:border-slate-700 hover:text-zinc-200'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Question Accordion List */}
      <div className="space-y-3">
        {filteredQuestions.map((item) => {
          const isExpanded = !!expandedQuestions[item.id];

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'border-amber-500/40 bg-[#121528] shadow-lg shadow-black/40'
                  : 'border-slate-800/80 bg-[#0e1122] hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        item.level === 'Lead / System Design'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : item.level === 'Senior'
                          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.level}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {language === 'bn' ? item.categoryLabelBn : item.categoryLabelEn}
                    </span>
                  </div>

                  <h3 className="text-xs md:text-sm font-bold text-white font-sans leading-snug">
                    {language === 'bn' ? item.qBn : item.qEn}
                  </h3>
                </div>

                <div className="p-1 rounded-md bg-slate-800/60 text-zinc-400 shrink-0 mt-1">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/60 bg-black/30 animate-in fade-in duration-150">
                  {/* Golden Takeaway Callout */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs font-sans flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {language === 'bn' ? item.takeawayBn : item.takeawayEn}
                    </p>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-line space-y-2 p-1">
                    {language === 'bn' ? item.aBn : item.aEn}
                  </div>

                  {/* Optional SQL / Code Snippet */}
                  {item.codeSnippet && (
                    <div className="p-3.5 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-[11px] overflow-x-auto text-zinc-300 leading-relaxed">
                      <div className="text-[10px] text-zinc-500 border-b border-slate-800/80 pb-1 mb-2 font-sans flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        SQL Implementation / Architectural Syntax:
                      </div>
                      <pre>{item.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
