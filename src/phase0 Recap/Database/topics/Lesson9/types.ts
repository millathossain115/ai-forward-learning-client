export interface Lesson9InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson9Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON9_INTERVIEW_QA: Lesson9InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Explain ACID properties and which DBMS subsystem enforces each.',
    qBn: 'প্রশ্ন ১: ACID প্রোপার্টিগুলো কী এবং DBMS-এর কোন সাবসিস্টেম কোনটি নিশ্চিত করে?',
    aEn: 'Atomicity (All-or-nothing, Recovery Manager via UNDO logs), Consistency (Valid state to valid state, Integrity Constraints + App logic), Isolation (Concurrent transactions do not interfere, Concurrency Manager via 2PL/MVCC), Durability (Committed data survives crashes, Recovery Manager via WAL flush).',
    aBn: 'Atomicity (সম্পূর্ণ বা কিছুই না — Recovery Manager UNDO লগ দিয়ে নিশ্চিত করে), Consistency (সঠিক অবস্থা বজায় রাখা — Constraints), Isolation (সমান্তরাল ট্রানজ্যাকশন আলাদা রাখা — 2PL/MVCC), Durability (ক্র্যাশের পরও ডেটা টিকে থাকা — WAL)।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Differentiate between Dirty Read, Unrepeatable Read, and Phantom Read.',
    qBn: 'প্রশ্ন ২: Dirty Read, Unrepeatable Read এবং Phantom Read-এর মধ্যে পার্থক্য কী?',
    aEn: 'Dirty Read: Reading uncommitted data from another transaction that later rolls back. Unrepeatable Read: Re-reading the same row returns a different value because another transaction committed an UPDATE in between. Phantom Read: Re-running a range query returns new/missing rows because another transaction committed an INSERT/DELETE.',
    aBn: 'Dirty Read: অন্যের আনকমিটেড ডেটা পড়া যা পরে রোলব্যাক হয়। Unrepeatable Read: একই সারি দুবার পড়লে মাঝখানে অন্যের UPDATE কমিটের কারণে ভিন্ন মান পাওয়া। Phantom Read: রেঞ্জ কুয়েরি দুবার চালালে নতুন সারি যোগ/বিয়োগ হওয়া।',
  },
  {
    id: 'q3',
    qEn: 'Q3: What is Conflict Serializability and how do you test for it?',
    qBn: 'প্রশ্ন ৩: Conflict Serializability কী এবং কীভাবে এটি পরীক্ষা করা হয়?',
    aEn: 'A schedule is conflict serializable if it can be transformed into a serial schedule by swapping non-conflicting operations. We build a Precedence (Wait-For) Graph with transactions as nodes and edges Ti -> Tj for conflicting Read/Write pairs on the same item. If the graph is acyclic (no cycle), it is conflict serializable.',
    aBn: 'নন-কনফ্লিক্টিং অপারেশন অদলবদল করে কোনো শিডিউলকে সিরিয়াল শিডিউলে রূপান্তর করা গেলে তাকে Conflict Serializable বলে। Precedence Graph-এ কোনো সাইকেল (Cycle) না থাকলে শিডিউলটি নিরাপদ।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Explain Two-Phase Locking (2PL) and Strict 2PL.',
    qBn: 'প্রশ্ন ৪: Two-Phase Locking (2PL) এবং Strict 2PL ব্যাখ্যা করুন।',
    aEn: '2PL has a Growing Phase (only acquire locks, no release) and Shrinking Phase (only release locks, no acquire), guaranteeing conflict serializability. Strict 2PL holds all Exclusive (X) locks until COMMIT/ABORT, preventing cascading rollbacks and dirty reads.',
    aBn: '2PL-এ দুটি ধাপ: Growing (শুধু লক নেওয়া) এবং Shrinking (শুধু লক ছাড়া)। Strict 2PL-এ COMMIT/ABORT না হওয়া পর্যন্ত এক্সক্লুসিভ (X) লক ধরে রাখা হয়, যা ক্যাসকেডিং রোলব্যাক প্রতিরোধ করে।',
  },
  {
    id: 'q5',
    qEn: 'Q5: What are the default isolation levels in PostgreSQL vs MySQL InnoDB?',
    qBn: 'প্রশ্ন ৫: PostgreSQL বনাম MySQL InnoDB-এর ডিফল্ট আইসোলেশন লেভেল কী কী?',
    aEn: 'PostgreSQL defaults to Read Committed (prevents Dirty Reads; allows Unrepeatable & Phantom Reads). MySQL InnoDB defaults to Repeatable Read (uses MVCC + Next-Key Gap Locks to prevent Dirty, Unrepeatable, and most Phantom Reads).',
    aBn: 'PostgreSQL-এর ডিফল্ট হলো Read Committed (Dirty Read ঠেকায়)। MySQL InnoDB-এর ডিফল্ট হলো Repeatable Read (MVCC ও Gap Lock ব্যবহার করে)।',
  },
  {
    id: 'q6',
    qEn: 'Q6: How does Write-Ahead Logging (WAL) decide between UNDO and REDO after a crash?',
    qBn: 'প্রশ্ন ৬: সিস্টেম ক্র্যাশের পর WAL কীভাবে UNDO এবং REDO সিদ্ধান্ত নেয়?',
    aEn: 'WAL flushes log records to disk before dirty data pages. During crash recovery: if <T, COMMIT> is in the log, REDO replays T to guarantee Durability. If <T, START> exists without <T, COMMIT>, UNDO restores old values to guarantee Atomicity.',
    aBn: 'WAL ডেটা ডিস্কে লেখার আগেই লগ ফ্লাশ করে। ক্র্যাশের পর <T, COMMIT> থাকলে REDO করা হয় (Durability), আর <T, COMMIT> না থাকলে UNDO করে আগের মান ফিরিয়ে আনা হয় (Atomicity)।',
  },
];

export const LESSON9_EXERCISES: Lesson9Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Bank Transfer & Atomicity',
    titleBn: 'অনুশীলনী ১: ব্যাংক ট্রান্সফার ও Atomicity',
    problemEn: 'T1 deducts ৳5,000 from Rahim, then power fails before crediting Karim. Which ACID property restores the ৳5,000, and how?',
    problemBn: 'রহিমের অ্যাকাউন্ট থেকে ৳৫,০০০ কাটার পর করিমের অ্যাকাউন্টে যোগ হওয়ার আগেই বিদ্যুৎ চলে গেল। কোন ACID প্রোপার্টি টাকা ফেরত আনে এবং কীভাবে?',
    sol: 'Atomicity (enforced by Recovery Manager using WAL UNDO records) reverses the uncommitted deduction on restart.',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Savepoint Rollback',
    titleBn: 'অনুশীলনী ২: Savepoint রোলব্যাক',
    problemEn: 'In a transaction: Update A -> SAVEPOINT s1 -> Update B (wrong) -> ROLLBACK TO s1 -> COMMIT. Which updates persist?',
    problemBn: 'একটি ট্রানজ্যাকশনে: Update A -> SAVEPOINT s1 -> Update B (ভুল) -> ROLLBACK TO s1 -> COMMIT। কোন আপডেটটি সেভ হবে?',
    sol: 'Only Update A persists! ROLLBACK TO s1 undoes Update B while preserving Update A, then COMMIT saves Update A permanently.',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Precedence Graph Cycle',
    titleBn: 'অনুশীলনী ৩: Precedence Graph সাইকেল',
    problemEn: 'In schedule S: T1 reads X, T2 writes X, T2 reads Y, T1 writes Y. Is S conflict serializable?',
    problemBn: 'শিডিউল S-এ: T1 X পড়ে, T2 X লেখে, T2 Y পড়ে, T1 Y লেখে। S কি Conflict Serializable?',
    sol: 'No! T1 -> T2 (on X) and T2 -> T1 (on Y) create a cycle (T1 <-> T2). Not conflict serializable.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Isolation Level Selection',
    titleBn: 'অনুশীলনী ৪: সঠিক আইসোলেশন লেভেল নির্বাচন',
    problemEn: 'A financial ledger must prevent Dirty Reads AND Unrepeatable Reads without full Serializable lock overhead. Which ANSI level fits best?',
    problemBn: 'একটি আর্থিক লেজারে Dirty Read ও Unrepeatable Read দুটিই বন্ধ করতে হবে, কিন্তু Serializable-এর অতিরিক্ত লকিং ছাড়া। কোন লেভেল উপযুক্ত?',
    sol: 'Repeatable Read: Prevents both Dirty Reads and Unrepeatable Reads while offering higher concurrency than Serializable.',
  },
];
