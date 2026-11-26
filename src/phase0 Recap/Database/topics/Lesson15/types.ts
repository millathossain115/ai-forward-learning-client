export interface Lesson15InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson15Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON15_INTERVIEW_QA: Lesson15InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Differentiate between Production DBA, Development DBA, and Application DBA.',
    qBn: 'প্রশ্ন ১: Production DBA, Development DBA এবং Application DBA-এর মধ্যে পার্থক্য কী?',
    aEn: 'Production DBA owns live 24/7 uptime, HA failover, backups, patching, and capacity planning. Development DBA designs schemas, stored procedures, and indexes during build cycles. Application DBA optimizes ORM/SQL queries and data access patterns for specific applications.',
    aBn: 'Production DBA লাইভ সার্ভারের ২৪/৭ আপটাইম, ব্যাকআপ ও ফেইলওভার সামলান। Development DBA স্কিমা ও ইনডেক্স ডিজাইন করেন, আর Application DBA অ্যাপ্লিকেশনের SQL কুয়েরি অপটিমাইজ করেন।',
  },
  {
    id: 'q2',
    qEn: 'Q2: What key metrics do DBAs monitor in a production NOC dashboard?',
    qBn: 'প্রশ্ন ২: প্রোডাকশন NOC ড্যাশবোর্ডে DBA-রা কোন কোন মেট্রিক পর্যবেক্ষণ করেন?',
    aEn: '1. CPU & RAM Buffer Pool Hit Ratio (should stay > 99%). 2. Disk IOPS & Queue Depth. 3. Active vs Max Connections (pool exhaustion). 4. Lock Waits / Deadlock rate. 5. Replication Lag (seconds behind primary) & Slow Query Count.',
    aBn: '১. CPU ও Buffer Pool Hit Ratio (>৯৯%), ২. Disk IOPS, ৩. অ্যাক্টিভ কনেকশন সংখ্যা, ৪. লক ওয়েট ও ডেডলক এবং ৫. রেপ্লিকেশন ল্যাগ ও স্লো কুয়েরি।',
  },
  {
    id: 'q3',
    qEn: 'Q3: How do you handle connection pool exhaustion during a sudden traffic spike?',
    qBn: 'প্রশ্ন ৩: হঠাৎ ট্রাফিক বাড়লে Connection Pool Exhaustion কীভাবে সামলাবেন?',
    aEn: 'Place a connection pooler (e.g., PgBouncer / ProxySQL) in transaction-pooling mode, route read-only traffic to Read Replicas, set statement timeouts to kill runaway queries, and scale connection limits safely within RAM bounds.',
    aBn: 'PgBouncer/ProxySQL-এর মতো কনেকশন পুলার ব্যবহার করুন, রিড কুয়েরি Read Replica-তে পাঠান এবং ধীরগতির কুয়েরির জন্য statement_timeout সেট করুন।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Compare High Availability (HA) vs Disaster Recovery (DR).',
    qBn: 'প্রশ্ন ৪: High Availability (HA) এবং Disaster Recovery (DR)-এর মধ্যে পার্থক্য কী?',
    aEn: 'HA keeps the database running during local hardware/node failures using automatic failover (Active-Standby / Multi-AZ) with seconds of downtime. DR recovers from catastrophic regional outages (fire, flood, ransomware) using cross-region backups and PITR.',
    aBn: 'HA লোকাল সার্ভার নষ্ট হলে অটোমেটিক ফেইলওভারের মাধ্যমে কয়েক সেকেন্ডেই সিস্টেম সচল রাখে। DR বড় কোনো প্রাকৃতিক বা আঞ্চলিক বিপর্যয়ে ভিন্ন রিজিয়নের ব্যাকআপ থেকে ডেটা ফেরত আনে।',
  },
  {
    id: 'q5',
    qEn: 'Q5: Why must a DBA regularly run restore drills instead of trusting backup success logs?',
    qBn: 'প্রশ্ন ৫: ব্যাকআপ সফল হওয়ার লগ দেখার পরও নিয়মিত রিস্টোর ড্রিল করা জরুরি কেন?',
    aEn: 'An untested backup is not a backup—files can be silently corrupted, missing WAL segments, or encrypted with lost keys. Periodic restore drills validate integrity and measure real-world RTO.',
    aBn: 'পরীক্ষা না করা ব্যাকআপ অনেক সময় করাপ্টেড বা অসম্পূর্ণ হতে পারে। নিয়মিত রিস্টোর ড্রিল ব্যাকআপের কার্যকারিতা ও প্রকৃত RTO নিশ্চিত করে।',
  },
];

export const LESSON15_EXERCISES: Lesson15Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Diagnose Buffer Pool Thrashing',
    titleBn: 'অনুশীলনী ১: Buffer Pool Thrashing শনাক্তকরণ',
    problemEn: 'NOC alerts show Buffer Pool Hit Ratio dropped from 99.5% to 72% and Disk IOPS spiked 10x. What is happening and how do you fix it?',
    problemBn: 'Buffer Pool Hit Ratio ৯৯.৫% থেকে ৭২%-এ নেমে গেছে এবং Disk IOPS ১০ গুণ বেড়েছে। কারণ ও সমাধান কী?',
    sol: 'Working set no longer fits in RAM (or full table scans are evicting hot pages).\nFix: Add missing indexes to stop full scans, and increase shared_buffers / innodb_buffer_pool_size.',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Zero-Downtime Failover Plan',
    titleBn: 'অনুশীলনী ২: জিরো-ডাউনটাইম ফেইলওভার',
    problemEn: 'Your primary DB node loses power. How does an Active-Passive Multi-AZ HA setup recover automatically?',
    problemBn: 'প্রাইমারি DB নোড বন্ধ হয়ে গেছে। Active-Passive Multi-AZ HA কীভাবে স্বয়ংক্রিয়ভাবে রিকভার করে?',
    sol: 'Health-check monitor detects missed heartbeats -> promotes Synchronous Standby to new Primary -> updates DNS/VIP endpoint within seconds.',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Kill Runaway Blocking Query',
    titleBn: 'অনুশীলনী ৩: ব্লকিং কুয়েরি সমাধান',
    problemEn: 'An unindexed analytics query has been holding a table lock for 12 minutes, blocking all web writes. What should the DBA do?',
    problemBn: 'একটি ইনডেক্সবিহীন কুয়েরি ১২ মিনিট ধরে টেবিল লক করে রেখেছে। DBA হিসেবে কী করবেন?',
    sol: '1. Inspect active locks (pg_stat_activity / SHOW PROCESSLIST).\n2. Terminate the blocking PID safely.\n3. Enforce statement_timeout and route analytics to a Read Replica.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Capacity Planning',
    titleBn: 'অনুশীলনী ৪: ক্যাপাসিটি প্ল্যানিং',
    problemEn: 'A table grows by 40 GB/month plus 25 GB/month in indexes. How much storage is needed for 12 months with a 30% safety buffer?',
    problemBn: 'প্রতি মাসে ডেটা ৪০ GB ও ইনডেক্স ২৫ GB বাড়ে। ৩০% সেফটি বাফারসহ ১২ মাসের জন্য কত স্টোরেজ লাগবে?',
    sol: 'Monthly growth = 65 GB.\n12 months = 780 GB.\nWith 30% buffer = 780 * 1.30 = 1,014 GB (~1 TB).',
  },
];
