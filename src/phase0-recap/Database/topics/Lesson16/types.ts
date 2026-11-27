export interface Lesson16InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson16Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON16_INTERVIEW_QA: Lesson16InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Compare Peer-to-Peer, Client-Server, and Three-Tier DDBMS architectures.',
    qBn: 'প্রশ্ন ১: Peer-to-Peer, Client-Server এবং Three-Tier DDBMS আর্কিটেকচারের তুলনা করুন।',
    aEn: 'Peer-to-Peer gives every node symmetric routing/storage capability (no single point of failure, e.g., Cassandra). Client-Server separates clients from coordinator/data servers. Three-Tier adds an application/middleware layer between clients and distributed DB nodes for scalability and security.',
    aBn: 'Peer-to-Peer-এ প্রতিটি নোডের সমান ক্ষমতা থাকে। Client-Server-এ ক্লায়েন্ট ও ডেটা সার্ভার আলাদা থাকে। আর Three-Tier-এ মাঝে একটি অ্যাপ্লিকেশন/মিডলওয়্যার স্তর থাকে।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Differentiate between Homogeneous and Heterogeneous DDBMS.',
    qBn: 'প্রশ্ন ২: Homogeneous এবং Heterogeneous DDBMS-এর মধ্যে পার্থক্য কী?',
    aEn: 'Homogeneous runs the exact same DBMS engine across all sites (easy schema/query coordination). Heterogeneous connects different DBMS engines (e.g., PostgreSQL + Oracle + MongoDB) using translation gateways/wrappers.',
    aBn: 'Homogeneous-এ সব সাইটে একই DBMS চলে। Heterogeneous-এ ভিন্ন ভিন্ন DBMS ইঞ্জিন (যেমন Postgres + Oracle + MongoDB) গেটওয়ের মাধ্যমে যুক্ত থাকে।',
  },
  {
    id: 'q3',
    qEn: 'Q3: Explain the 3 correctness rules of Data Fragmentation (Completeness, Reconstruction, Disjointness).',
    qBn: 'প্রশ্ন ৩: ডেটা ফ্র্যাগমেন্টেশনের ৩টি শুদ্ধতার নিয়ম (Completeness, Reconstruction, Disjointness) কী কী?',
    aEn: 'Completeness: Every data item in R must appear in at least one fragment. Reconstruction: R must be losslessly recoverable via UNION (horizontal) or JOIN (vertical). Disjointness: For horizontal fragments, rows must not overlap across fragments.',
    aBn: 'Completeness: সব ডেটা অন্তত একটি ফ্র্যাগমেন্টে থাকতে হবে। Reconstruction: UNION বা JOIN-এ মূল টেবিল ফিরে পাওয়া যাবে। Disjointness: সারিগুলো ওভারল্যাপ করবে না।',
  },
  {
    id: 'q4',
    qEn: 'Q4: How does Two-Phase Commit (2PC) ensure atomic distributed commits, and what is its limitation?',
    qBn: 'প্রশ্ন ৪: Two-Phase Commit (2PC) কীভাবে ডিস্ট্রিবিউটেড অ্যাটমিসিটি নিশ্চিত করে এবং এর সীমাবদ্ধতা কী?',
    aEn: 'Phase 1 (Prepare) asks all shards to lock & vote YES/NO; Phase 2 (Commit/Abort) executes only if all vote YES. Limitation: 2PC is blocking—if the Coordinator crashes after YES votes, shards stay locked until Coordinator recovers.',
    aBn: 'Phase 1-এ সব শার্ড ভোট দেয়; সবাই YES দিলে Phase 2-তে COMMIT হয়। সীমাবদ্ধতা: ভোটের পর কোঅর্ডিনেটর ক্র্যাশ করলে শার্ডগুলো লক হয়ে আটকে থাকে।',
  },
  {
    id: 'q5',
    qEn: 'Q5: Why must real distributed databases choose CP or AP under Brewer’s CAP Theorem?',
    qBn: 'প্রশ্ন ৫: Brewer-এর CAP থিওরেম অনুযায়ী কেন CP অথবা AP বেছে নিতে হয়?',
    aEn: 'Network Partitions (P) inevitably occur in distributed networks. When a partition splits nodes, the system must either pause/reject writes to stay consistent (CP) or serve local reads/writes to stay available (AP).',
    aBn: 'বাস্তব নেটওয়ার্কে পার্টিশন (P) এড়ানো অসম্ভব। তাই পার্টিশনের সময় হয় ডেটার সঠিকতা (CP) নয়তো সিস্টেমের প্রাপ্যতা (AP) বেছে নিতে হয়।',
  },
];

export const LESSON16_EXERCISES: Lesson16Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Fragmentation Reconstruction',
    titleBn: 'অনুশীলনী ১: ফ্র্যাগমেন্টেশন পুনর্গঠন',
    problemEn: 'Table Orders(Order_ID, Customer, Region, Total) is vertically split into F1(Order_ID, Customer) and F2(Order_ID, Region, Total). How do you reconstruct Orders?',
    problemBn: 'Orders টেবিলকে F1(Order_ID, Customer) ও F2(Order_ID, Region, Total)-এ Vertical ভাগ করা হয়েছে। কীভাবে পুনর্গঠন করবেন?',
    sol: 'SELECT F1.Order_ID, F1.Customer, F2.Region, F2.Total\nFROM F1 INNER JOIN F2 ON F1.Order_ID = F2.Order_ID;',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Transparency Identification',
    titleBn: 'অনুশীলনী ২: ট্রান্সপারেন্সি শনাক্তকরণ',
    problemEn: 'A developer runs `SELECT * FROM Students WHERE Dept = "CSE"` without knowing Students is sharded across Tokyo and Frankfurt. Which transparency is this?',
    problemBn: 'টোকিও ও ফ্রাঙ্কফুর্টে শার্ড করা টেবিল জেনেও ডেভেলপার সাধারণভাবে `SELECT` চালাতে পারছেন—এটি কোন ট্রান্সপারেন্সি?',
    sol: 'Location Transparency & Fragmentation Transparency (user queries logical table unaware of shard placement).',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: 2PC Decision',
    titleBn: 'অনুশীলনী ৩: 2PC সিদ্ধান্ত',
    problemEn: 'In a distributed flight + hotel booking, Flight-DB votes YES and Hotel-DB times out (NO). What happens in Phase 2?',
    problemBn: 'ফ্লাইট ও হোটেল বুকিংয়ে Flight-DB YES ভোট দিলেও Hotel-DB টাইমআউট হয়েছে। Phase 2-তে কী হবে?',
    sol: 'Coordinator issues GLOBAL ABORT. Flight-DB rolls back the seat reservation and releases its lock.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Cloud DDBMS Choice',
    titleBn: 'অনুশীলনী ৪: ক্লাউড DDBMS নির্বাচন',
    problemEn: 'A global fintech app needs multi-region SQL with strong ACID consistency. Compare Google Cloud Spanner vs Amazon DynamoDB.',
    problemBn: 'একটি গ্লোবাল ফিনটেক অ্যাপের মাল্টি-রিজিয়ন ACID SQL দরকার। Cloud Spanner বনাম DynamoDB তুলনা করুন।',
    sol: 'Google Cloud Spanner (CP / NewSQL): Global strong consistency + SQL.\nDynamoDB (AP/tunable NoSQL): Ultra-low-latency key-value/document scale.',
  },
];
