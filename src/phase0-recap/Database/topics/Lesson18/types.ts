export interface Lesson18InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson18SqlTask {
  num: number;
  en: string;
  bn: string;
  sql: string;
}

export const LESSON18_INTERVIEW_QA: Lesson18InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Walk through the end-to-end lifecycle of a SQL query from client to disk.',
    qBn: 'প্রশ্ন ১: ক্লায়েন্ট থেকে ডিস্ক পর্যন্ত একটি SQL কুয়েরির সম্পূর্ণ জীবনচক্র ব্যাখ্যা করুন।',
    aEn: '1. Client sends SQL over TLS. 2. Parser & Lexer check syntax/permissions (RBAC). 3. Cost-based Query Optimizer picks B+ Tree Index Scan vs Full Scan using table stats. 4. Execution Engine runs operators (FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT). 5. Storage Manager reads/writes 16KB buffer pool pages & flushes WAL on COMMIT.',
    aBn: '১. TLS-এ কুয়েরি আসে -> ২. পার্সার ও RBAC যাচাই -> ৩. অপটিমাইজার B+ Tree ইনডেক্স বা স্ক্যান প্ল্যান বেছে নেয় -> ৪. লজিক্যাল অর্ডারে (FROM -> WHERE -> SELECT -> ORDER BY) এক্সিকিউশন -> ৫. Buffer Pool ও WAL ফ্লাশ।',
  },
  {
    id: 'q2',
    qEn: 'Q2: How do Keys, ER Modeling, and Normalization work together in schema design?',
    qBn: 'প্রশ্ন ২: স্কিমা ডিজাইনে Keys, ER Modeling এবং Normalization কীভাবে একসাথে কাজ করে?',
    aEn: 'ER Modeling captures business entities, attributes, and cardinalities (1:1, 1:N, M:N). Translating ER to relational tables assigns Primary/Foreign Keys (and junction tables for M:N). Normalization (1NF -> 2NF -> 3NF -> BCNF) then verifies zero partial/transitive FDs so Insertion, Update, and Deletion anomalies are eliminated.',
    aBn: 'ER মডেল ব্যবসায়িক সম্পর্ক নির্ধারণ করে, Keys (PK/FK) টেবিলগুলোকে যুক্ত করে এবং Normalization (1NF-BCNF) ডুপ্লিকেসি ও অ্যানোমালি দূর করে।',
  },
  {
    id: 'q3',
    qEn: 'Q3: When do you choose RDBMS vs NoSQL vs Data Warehouse (OLAP)?',
    qBn: 'প্রশ্ন ৩: কখন RDBMS, কখন NoSQL এবং কখন Data Warehouse (OLAP) ব্যবহার করবেন?',
    aEn: 'RDBMS (Postgres/MySQL): Strict ACID transactions, financial ledgers, complex joins. NoSQL (MongoDB/Redis/Cassandra): High-velocity writes, flexible JSON, sub-ms caching, horizontal sharding. OLAP (BigQuery/Snowflake): Multi-year historical analytics via Star Schema & ETL.',
    aBn: 'RDBMS: ACID ও জটিল জয়েন (ব্যাংকিং)। NoSQL: ফ্লেক্সিবল JSON, ক্যাশিং ও হরাইজন্টাল স্কেলিং। OLAP: কয়েক বছরের ঐতিহাসিক বিআই অ্যানালিটিক্স।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Explain how Isolation Levels, 2PL, and MVCC prevent concurrency anomalies.',
    qBn: 'প্রশ্ন ৪: Isolation Levels, 2PL এবং MVCC কীভাবে কনকারেন্সি অ্যানোমালি প্রতিরোধ করে?',
    aEn: 'Read Committed prevents Dirty Reads; Repeatable Read prevents Unrepeatable Reads; Serializable prevents Phantom Reads. Strict 2PL holds X-locks until COMMIT; MVCC gives each reader a consistent snapshot without blocking writers.',
    aBn: 'Read Committed Dirty Read ঠেকায়, Repeatable Read Unrepeatable Read ঠেকায় এবং Serializable Phantom Read ঠেকায়। 2PL ও MVCC লকিং ও স্ন্যাপশট দিয়ে এটি নিশ্চিত করে।',
  },
  {
    id: 'q5',
    qEn: 'Q5: How do CAP Theorem, 2PC, and 3-2-1 Backups protect distributed systems?',
    qBn: 'প্রশ্ন ৫: ডিস্ট্রিবিউটেড সিস্টেমে CAP, 2PC এবং 3-2-1 ব্যাকআপের ভূমিকা কী?',
    aEn: 'Under network partitions, CAP forces choosing CP (consistency) or AP (availability). 2PC coordinates atomic commits across shards via Prepare/Commit phases. 3-2-1 Backups + WAL PITR guarantee recovery from human errors (DROP TABLE) or regional disasters within RPO/RTO.',
    aBn: 'নেটওয়ার্ক পার্টিশনে CAP অনুযায়ী CP বা AP বেছে নিতে হয়। 2PC সব শার্ডে অ্যাটমিক কমিট নিশ্চিত করে। আর 3-2-1 ব্যাকআপ ও PITR যেকোনো বিপর্যয়ে ডেটা ফিরিয়ে আনে।',
  },
];

export const LESSON18_SQL_TASKS: Lesson18SqlTask[] = [
  {
    num: 1,
    en: 'Task 1: Create Employees table with PK, NOT NULL Salary, and Dept_ID.',
    bn: 'টাস্ক ১: PK, NOT NULL বেতন ও Dept_ID সহ Employees টেবিল তৈরি করুন।',
    sql: `CREATE TABLE Employees (\n  Emp_ID INT PRIMARY KEY,\n  Name VARCHAR(100) NOT NULL,\n  Dept VARCHAR(50),\n  Salary DECIMAL(10,2) NOT NULL CHECK (Salary > 0)\n);`,
  },
  {
    num: 2,
    en: 'Task 2: Find departments whose average salary exceeds 50,000.',
    bn: 'টাস্ক ২: যেসব ডিপার্টমেন্টের গড় বেতন ৫০,০০০-এর বেশি তা বের করুন।',
    sql: `SELECT Dept, AVG(Salary) AS Avg_Sal\nFROM Employees\nGROUP BY Dept\nHAVING AVG(Salary) > 50000;`,
  },
  {
    num: 3,
    en: 'Task 3: Rank employees within each department by highest salary using Window Function.',
    bn: 'টাস্ক ৩: উইন্ডো ফাংশন দিয়ে প্রতি ডিপার্টমেন্টে বেতন অনুযায়ী র‍্যাংক করুন।',
    sql: `SELECT Name, Dept, Salary,\n  DENSE_RANK() OVER (PARTITION BY Dept ORDER BY Salary DESC) AS Dept_Rank\nFROM Employees;`,
  },
  {
    num: 4,
    en: 'Task 4: Safely update Emp_ID = 101 salary inside an atomic transaction.',
    bn: 'টাস্ক ৪: ট্রানজ্যাকশনের ভেতরে নিরাপদে Emp_ID = 101-এর বেতন আপডেট করুন।',
    sql: `START TRANSACTION;\nUPDATE Employees SET Salary = Salary * 1.10 WHERE Emp_ID = 101;\nCOMMIT;`,
  },
];
