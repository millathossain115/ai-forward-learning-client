export interface Lesson13InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson13Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON13_INTERVIEW_QA: Lesson13InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: What does NoSQL ("Not Only SQL") mean, and when should you choose it over SQL?',
    qBn: 'প্রশ্ন ১: NoSQL ("Not Only SQL") কী এবং কখন SQL-এর বদলে এটি বেছে নেবেন?',
    aEn: 'NoSQL means non-relational data models optimized for horizontal scale, flexible schemas, and specific access patterns. Choose NoSQL for massive write throughput, unstructured/polymorphic JSON data, ultra-low-latency caching, or deep graph traversals. Stick with SQL for complex multi-table joins and strict ACID financial transactions.',
    aBn: 'NoSQL মানে হলো হরাইজন্টাল স্কেলিং ও ফ্লেক্সিবল স্কিমার জন্য তৈরি নন-রিলেশনাল ডেটাবেস। বিশাল রাইট লোড, ডায়নামিক JSON বা ক্যাশিংয়ের জন্য NoSQL উপযুক্ত; আর জটিল জয়েন ও কঠোর ACID-এর জন্য SQL সেরা।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Compare the 4 major NoSQL database types with one real-world example each.',
    qBn: 'প্রশ্ন ২: উদাহরণসহ NoSQL ডেটাবেসের ৪টি প্রধান ধরনের তুলনা করুন।',
    aEn: '1. Document (MongoDB): JSON/BSON documents, ideal for product catalogs & CMS. 2. Key-Value (Redis): O(1) in-memory lookups, ideal for sessions, rate-limiting & caching. 3. Column-Family (Cassandra): High-write partitioned columns, ideal for IoT & messaging logs. 4. Graph (Neo4j): Nodes + edges, ideal for social networks & fraud rings.',
    aBn: '১. Document (MongoDB): ক্যাটালগ ও কনটেন্ট। ২. Key-Value (Redis): ক্যাশিং ও সেশন। ৩. Column-Family (Cassandra): IoT ও টাইম-সিরিজ লগ। ৪. Graph (Neo4j): সোশ্যাল নেটওয়ার্ক ও ফ্রড ডিটেকশন।',
  },
  {
    id: 'q3',
    qEn: 'Q3: Differentiate between Embedding vs Referencing in MongoDB Document design.',
    qBn: 'প্রশ্ন ৩: MongoDB-তে Embedding এবং Referencing-এর মধ্যে পার্থক্য কী?',
    aEn: 'Embedding nests related sub-documents inside one document (fast single-read, atomic per-document update; best for 1:few bounded data like order items). Referencing stores ObjectIds pointing to another collection (avoids 16MB doc limit and duplication; best for 1:many unbounded or M:N data).',
    aBn: 'Embedding-এ সাব-ডকুমেন্ট একই ডকুমেন্টের ভেতরে থাকে (১ রিডে সব পাওয়া যায়)। Referencing-এ অন্য কালেকশনের ObjectId রাখা হয় (ডকুমেন্ট সাইজ সীমা এড়াতে ও M:N সম্পর্কের জন্য)।',
  },
  {
    id: 'q4',
    qEn: 'Q4: How does Database Sharding work, and what makes a good Shard Key?',
    qBn: 'প্রশ্ন ৪: ডেটাবেস শার্ডিং কীভাবে কাজ করে এবং একটি ভালো Shard Key-এর বৈশিষ্ট্য কী?',
    aEn: 'Sharding partitions data horizontally across independent server nodes using a Shard Key. A good shard key has high cardinality, even write distribution (no "hot shard" bottleneck), and aligns with common query filters so queries hit a single shard instead of scatter-gather across all shards.',
    aBn: 'শার্ডিং একটি Shard Key-এর মাধ্যমে ডেটাকে বিভিন্ন সার্ভারে ভাগ করে। ভালো Shard Key-তে উচ্চ কার্ডিনালিটি ও সুষম ডেটা বণ্টন থাকে যেন কোনো একটি সার্ভারে অতিরিক্ত চাপ না পড়ে।',
  },
  {
    id: 'q5',
    qEn: 'Q5: What is BASE vs ACID, and how does Polyglot Persistence work?',
    qBn: 'প্রশ্ন ৫: BASE বনাম ACID কী এবং Polyglot Persistence কীভাবে কাজ করে?',
    aEn: 'ACID prioritizes strong consistency (RDBMS). BASE (Basically Available, Soft state, Eventual consistency) prioritizes high availability and scale in distributed NoSQL. Polyglot Persistence means using multiple DB engines in one app—e.g., PostgreSQL for payments, Redis for cache, MongoDB for catalog, and Vector DB for AI search.',
    aBn: 'ACID কঠোর কনসিস্টেন্সি দেয়, আর BASE উচ্চ অ্যাভেইলেবিলিটি দেয়। Polyglot Persistence মানে একই প্রজেক্টে কাজের ধরন অনুযায়ী একাধিক ডেটাবেস (যেমন Postgres + Redis + MongoDB) ব্যবহার করা।',
  },
];

export const LESSON13_EXERCISES: Lesson13Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Choose the Right NoSQL Engine',
    titleBn: 'অনুশীলনী ১: সঠিক NoSQL ইঞ্জিন নির্বাচন',
    problemEn: 'Match each workload: (a) API Rate Limiter, (b) E-commerce Product Catalog with varying attributes, (c) Fraud Detection Network.',
    problemBn: 'প্রতিটির জন্য উপযুক্ত NoSQL বাছাই করুন: (ক) API রেট লিমিটার, (খ) পরিবর্তনশীল প্রোডাক্ট ক্যাটালগ, (গ) ফ্রড নেটওয়ার্ক।',
    sol: '(a) Key-Value (Redis — O(1) atomic INCR + TTL).\n(b) Document (MongoDB — flexible JSON attributes).\n(c) Graph (Neo4j — fast multi-hop relationship traversal).',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: MongoDB Query Filter',
    titleBn: 'অনুশীলনী ২: MongoDB কুয়েরি ফিল্টার',
    problemEn: 'Write a MongoDB query to find all CSE students with GPA >= 3.75, sorted by GPA descending.',
    problemBn: 'MongoDB-তে GPA >= 3.75 পাওয়া CSE শিক্ষার্থীদের GPA বড় থেকে ছোট ক্রমে দেখানোর কুয়েরি লিখুন।',
    sol: 'db.students.find({ dept: "CSE", gpa: { $gte: 3.75 } }).sort({ gpa: -1 });',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Spot the Bad Shard Key',
    titleBn: 'অনুশীলনী ৩: খারাপ Shard Key চিহ্নিত করুন',
    problemEn: 'Why is `created_at` (current timestamp) or `country` (90% users in BD) a poor shard key for a high-write table?',
    problemBn: 'উচ্চ-রাইট টেবিলের জন্য `created_at` বা `country` (৯০% ইউজার বাংলাদেশে) কেন খারাপ Shard Key?',
    sol: 'Both cause Hot Shards! Monotonic timestamps route 100% of new writes to the latest shard; skewed country routes 90% of load to one node.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Polyglot Architecture',
    titleBn: 'অনুশীলনী ৪: Polyglot আর্কিটেকচার',
    problemEn: 'Design a 3-database stack for an AI SaaS app handling billing, session tokens, and semantic document embeddings.',
    problemBn: 'বিলিং, সেশন টোকেন ও AI সেমান্টিক সার্চের জন্য ৩টি ডেটাবেসের Polyglot স্ট্যাক ডিজাইন করুন।',
    sol: '1. Billing -> PostgreSQL (ACID transactions)\n2. Session Tokens -> Redis (sub-ms TTL Key-Value)\n3. Semantic Search -> Vector DB / pgvector (ANN similarity search)',
  },
];
