export interface Lesson12InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson12Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON12_INTERVIEW_QA: Lesson12InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Explain Brewer’s CAP Theorem and why a distributed system cannot guarantee all 3 simultaneously.',
    qBn: 'প্রশ্ন ১: Brewer-এর CAP থিওরেম কী এবং কেন একটি সিস্টেম একসাথে ৩টি নিশ্চিত করতে পারে না?',
    aEn: 'CAP states a distributed store can simultaneously guarantee at most two of: Consistency (all nodes see same latest data), Availability (every request gets a non-error response), and Partition Tolerance (system operates despite network splits). Because network partitions (P) are unavoidable in real networks, you must choose CP (reject writes during split, e.g., banking) or AP (serve possibly stale reads, e.g., social feeds).',
    aBn: 'CAP অনুযায়ী নেটওয়ার্ক পার্টিশন (P) ঘটলে সিস্টেমকে Consistency (CP) অথবা Availability (AP)-এর মধ্যে যেকোনো একটি বেছে নিতে হয়। ব্যাংকের জন্য CP এবং সোশ্যাল ফিডের জন্য AP উপযুক্ত।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Differentiate between Horizontal, Vertical, and Hybrid Fragmentation.',
    qBn: 'প্রশ্ন ২: Horizontal, Vertical এবং Hybrid ফ্র্যাগমেন্টেশনের মধ্যে পার্থক্য কী?',
    aEn: 'Horizontal splits a table by ROWS (e.g., Dhaka students on Node 1, Chittagong on Node 2 — reconstructed via UNION). Vertical splits by COLUMNS keeping the PK in every fragment (reconstructed via JOIN). Hybrid combines both.',
    aBn: 'Horizontal টেবিলকে সারি (Row) অনুযায়ী ভাগ করে (UNION দিয়ে জোড়া হয়)। Vertical কলাম (Column) অনুযায়ী ভাগ করে (JOIN দিয়ে জোড়া হয়)। Hybrid দুটিই একসাথে ব্যবহার করে।',
  },
  {
    id: 'q3',
    qEn: 'Q3: How does Two-Phase Commit (2PC) work and what is its main blocking risk?',
    qBn: 'প্রশ্ন ৩: Two-Phase Commit (2PC) কীভাবে কাজ করে এবং এর প্রধান ঝুঁকি কী?',
    aEn: 'Phase 1 (Prepare/Vote): Coordinator asks all participants if they can commit; each locks resources and replies YES/NO. Phase 2 (Commit/Abort): If all reply YES, Coordinator sends COMMIT; otherwise ABORT. Main flaw: if the Coordinator crashes after participants vote YES, participants remain blocked holding locks until recovery.',
    aBn: 'ধাপ ১ (Prepare): কোঅর্ডিনেটর সবার ভোট নেয়। ধাপ ২ (Commit/Abort): সবাই YES বললে COMMIT হয়, নইলে ABORT। ঝুঁকি: ভোটের পর কোঅর্ডিনেটর ক্র্যাশ করলে নোডগুলো লক ধরে আটকে থাকে।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Compare Synchronous vs Asynchronous Replication.',
    qBn: 'প্রশ্ন ৪: Synchronous বনাম Asynchronous রেপ্লিকেশনের তুলনা করুন।',
    aEn: 'Synchronous waits for replicas to confirm the write before returning success to the client (zero data loss, higher write latency). Asynchronous returns success immediately after primary write and ships logs later (low latency, slight replication lag / data loss risk on primary crash).',
    aBn: 'Synchronous-এ রেপ্লিকায় লেখা নিশ্চিত না হওয়া পর্যন্ত ক্লায়েন্ট অপেক্ষা করে (জিরো ডেটা লস, ধীর)। Asynchronous-এ প্রাইমারিতে লিখেই রেসপন্স দেয় (দ্রুত, তবে সামান্য ল্যাগ থাকে)।',
  },
  {
    id: 'q5',
    qEn: 'Q5: What are the 4 layers of Distribution Transparency?',
    qBn: 'প্রশ্ন ৫: Distribution Transparency-এর ৪টি স্তর কী কী?',
    aEn: 'Location Transparency (users need not know where data sits), Fragmentation Transparency (users query logical table, unaware of shards), Replication Transparency (users unaware of multiple copies), and Concurrency/Failure Transparency.',
    aBn: 'Location (ডেটা কোথায় আছে জানতে হয় না), Fragmentation (শার্ডিং সম্পর্কে জানতে হয় না), Replication (কপি সম্পর্কে জানতে হয় না) এবং Failure Transparency।',
  },
  {
    id: 'q6',
    qEn: 'Q6: Compare Strong Consistency vs Eventual Consistency.',
    qBn: 'প্রশ্ন ৬: Strong Consistency বনাম Eventual Consistency তুলনা করুন।',
    aEn: 'Strong Consistency guarantees every read returns the most recent committed write (linearizable, required for financial ledgers). Eventual Consistency guarantees that if writes stop, all replicas converge to the same value eventually (used in DNS, shopping carts, likes).',
    aBn: 'Strong Consistency সর্বদা সর্বশেষ কমিটেড মান ফেরত দেয় (ব্যাংকিং)। Eventual Consistency সময়ের সাথে সব রেপ্লিকা সিঙ্ক করে (সোশ্যাল মিডিয়া লাইক/কাউন্টার)।',
  },
];

export const LESSON12_EXERCISES: Lesson12Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Choose Fragmentation Strategy',
    titleBn: 'অনুশীলনী ১: ফ্র্যাগমেন্টেশন কৌশল নির্বাচন',
    problemEn: 'A national bank wants Dhaka branch rows on the Dhaka server and Sylhet rows on the Sylhet server. Which fragmentation is this and how do you reconstruct the full table?',
    problemBn: 'একটি ব্যাংক ঢাকার সারি ঢাকা সার্ভারে এবং সিলেটের সারি সিলেট সার্ভারে রাখতে চায়। এটি কোন ফ্র্যাগমেন্টেশন এবং কীভাবে পুরো টেবিল পাওয়া যাবে?',
    sol: 'Horizontal Fragmentation (row-based by Region).\nReconstruct full table using: SELECT * FROM Accounts_Dhaka UNION ALL SELECT * FROM Accounts_Sylhet;',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: CP vs AP Decision',
    titleBn: 'অনুশীলনী ২: CP বনাম AP সিদ্ধান্ত',
    problemEn: 'During a network partition between two datacenters, should an ATM withdrawal system choose CP or AP? Why?',
    problemBn: 'নেটওয়ার্ক পার্টিশনের সময় একটি ATM টাকা তোলার সিস্টেম CP নাকি AP বেছে নেবে? কেন?',
    sol: 'Choose CP (Consistency + Partition Tolerance). Serving stale balances in AP could allow double-spending / overdrawing.',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: 2PC Failure Outcome',
    titleBn: 'অনুশীলনী ৩: 2PC-তে ভোট ব্যর্থ হলে কী হবে?',
    problemEn: 'In Two-Phase Commit across 3 shards, Shard 1 & Shard 2 vote YES, but Shard 3 votes NO (disk full). What must the Coordinator do?',
    problemBn: '2PC-তে ৩টি শার্ডের মধ্যে ১ ও ২ YES ভোট দিলেও ৩ নম্বর শার্ড NO ভোট দিয়েছে। কোঅর্ডিনেটর কী করবে?',
    sol: 'Coordinator MUST send GLOBAL ABORT to all 3 shards. Shards 1 & 2 release locks and roll back prepared changes.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Sync vs Async Trade-off',
    titleBn: 'অনুশীলনী ৪: Sync বনাম Async নির্বাচন',
    problemEn: 'A video streaming view-counter handles 200k writes/sec globally. Should it use Synchronous or Asynchronous replication?',
    problemBn: 'একটি ভিডিও ভিউ কাউন্টারে প্রতি সেকেন্ডে ২ লক্ষ রাইট হয়। এখানে Sync নাকি Async রেপ্লিকেশন ব্যবহার করবেন?',
    sol: 'Asynchronous Replication (Eventual Consistency). Avoids global network round-trip latency on every view increment.',
  },
];
