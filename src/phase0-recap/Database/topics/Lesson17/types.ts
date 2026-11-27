export interface Lesson17InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson17Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON17_INTERVIEW_QA: Lesson17InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: What are Bill Inmon’s 4 defining characteristics of a Data Warehouse?',
    qBn: 'প্রশ্ন ১: বিল ইনমনের মতে ডেটা ওয়্যারহাউসের ৪টি মূল বৈশিষ্ট্য কী কী?',
    aEn: 'Subject-Oriented (organized around business subjects like Sales/Students, not daily ops), Integrated (unified formats/units across disparate sources), Time-Variant (stores 5–10 years of historical snapshots), and Non-Volatile (append-only historical records; no random overwrites/deletes).',
    aBn: 'Subject-Oriented (বিষয়ভিত্তিক), Integrated (সমন্বিত ফরম্যাট), Time-Variant (দীর্ঘমেয়াদী ঐতিহাসিক ডেটা) এবং Non-Volatile (ডেটা একবার লোড হলে সাধারণত পরিবর্তন বা ডিলিট করা হয় না)।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Differentiate between OLTP and OLAP systems.',
    qBn: 'প্রশ্ন ২: OLTP এবং OLAP সিস্টেমের মধ্যে পার্থক্য কী?',
    aEn: 'OLTP (Online Transaction Processing) handles fast, short, concurrent CRUD operations on current normalized 3NF data (e.g., bank ATM, checkout). OLAP (Online Analytical Processing) runs complex read-heavy aggregations over years of historical denormalized Star/Snowflake data (e.g., Snowflake, BigQuery).',
    aBn: 'OLTP দৈনন্দিন দ্রুত CRUD ট্রানজ্যাকশন চালায় (3NF)। OLAP কয়েক বছরের ঐতিহাসিক ডেটার ওপর বড় অ্যানালিটিক্যাল এগ্রিগেশন চালায় (Star/Snowflake স্কিমা)।',
  },
  {
    id: 'q3',
    qEn: 'Q3: Compare ETL vs ELT and Star Schema vs Snowflake Schema.',
    qBn: 'প্রশ্ন ৩: ETL বনাম ELT এবং Star Schema বনাম Snowflake Schema তুলনা করুন।',
    aEn: 'ETL transforms data on a staging server BEFORE loading into the warehouse; ELT loads raw data directly into a cloud warehouse (Snowflake/BigQuery) and transforms in-place via SQL. Star Schema has a central Fact table joined directly to denormalized Dimension tables (fastest queries); Snowflake normalizes dimensions into sub-tables (saves space, more joins).',
    aBn: 'ETL লোড করার আগে ডেটা ট্রান্সফর্ম করে; ELT আগে লোড করে পরে ক্লাউডে ট্রান্সফর্ম করে। Star স্কিমায় ডাইমেনশন ডিনরমালাইজড (দ্রুত কুয়েরি); Snowflake-এ ডাইমেনশন নরমালাইজড।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Differentiate between Classification and Clustering in Data Mining.',
    qBn: 'প্রশ্ন ৪: ডেটা মাইনিংয়ে Classification এবং Clustering-এর মধ্যে পার্থক্য কী?',
    aEn: 'Classification is Supervised Learning using labeled training data to predict discrete categories (e.g., Spam vs Not Spam, Loan Default Yes/No). Clustering is Unsupervised Learning grouping unlabeled records by similarity (e.g., Customer Segmentation via K-Means).',
    aBn: 'Classification হলো Supervised Learning যেখানে লেবেলযুক্ত ডেটা দিয়ে ক্যাটাগরি প্রেডিক্ট করা হয়। Clustering হলো Unsupervised Learning যেখানে লেবেল ছাড়াই সাদৃশ্য অনুযায়ী গ্রুপ করা হয়।',
  },
  {
    id: 'q5',
    qEn: 'Q5: How do Data Warehousing and Data Mining complement each other?',
    qBn: 'প্রশ্ন ৫: Data Warehousing এবং Data Mining কীভাবে একে অপরের পরিপূরক?',
    aEn: 'Data Warehousing collects, cleans, and stores integrated historical data (the infrastructure). Data Mining applies statistical/ML algorithms on top of that clean warehouse data to discover hidden patterns, associations, and predictions (the intelligence).',
    aBn: 'Data Warehousing পরিষ্কার ও সমন্বিত ঐতিহাসিক ডেটা সংরক্ষণ করে (ভিত্তি), আর Data Mining সেই ডেটার ওপর অ্যালগরিদম চালিয়ে লুকানো প্যাটার্ন ও পূর্বাভাস বের করে।',
  },
];

export const LESSON17_EXERCISES: Lesson17Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: OLTP vs OLAP Choice',
    titleBn: 'অনুশীলনী ১: OLTP বনাম OLAP নির্বাচন',
    problemEn: 'Classify: (a) Processing 1,000 card swipes/sec at checkout, (b) Computing 5-year regional revenue trends.',
    problemBn: 'চিহ্নিত করুন: (ক) প্রতি সেকেন্ডে ১,০০০ কার্ড পেমেন্ট প্রসেস করা, (খ) ৫ বছরের আঞ্চলিক আয়ের ট্রেন্ড বিশ্লেষণ।',
    sol: '(a) OLTP (high-concurrency short ACID writes).\n(b) OLAP (historical multi-year analytical aggregation).',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Design a Star Schema',
    titleBn: 'অনুশীলনী ২: Star Schema ডিজাইন',
    problemEn: 'Design Fact and Dimension tables for University Course Enrollment Analytics.',
    problemBn: 'বিশ্ববিদ্যালয়ের কোর্স এনরোলমেন্ট অ্যানালিটিক্সের জন্য Fact ও Dimension টেবিল ডিজাইন করুন।',
    sol: 'Fact_Enrollments(Enrollment_Key, Student_Key, Course_Key, Time_Key, Tuition_Paid, Grade_Points)\nDimensions: Dim_Student, Dim_Course, Dim_Time, Dim_Department.',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Pick Data Mining Technique',
    titleBn: 'অনুশীলনী ৩: ডেটা মাইনিং টেকনিক নির্বাচন',
    problemEn: 'Match: (a) "Customers who bought Bread also bought Butter", (b) Grouping shoppers without labels, (c) Flagging unusual 3 AM card charges.',
    problemBn: 'মিলান: (ক) রুটি কিনলে মাখন কেনা, (খ) লেবেল ছাড়া ক্রেতা গ্রুপিং, (গ) সন্দেহজনক লেনদেন শনাক্ত।',
    sol: '(a) Association Rule Mining (Apriori)\n(b) Clustering (K-Means)\n(c) Anomaly / Outlier Detection',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: ETL Stage Mapping',
    titleBn: 'অনুশীলনী ৪: ETL ধাপ চিহ্নিতকরণ',
    problemEn: 'Converting date formats (`DD/MM/YY` and `MM-DD-YYYY`) from 3 branch DBs into ISO `YYYY-MM-DD` happens in which ETL stage?',
    problemBn: '৩টি ব্রাঞ্চের ভিন্ন ডেট ফরম্যাটকে `YYYY-MM-DD`-তে রূপান্তর করা ETL-এর কোন ধাপে হয়?',
    sol: 'Transform stage (standardization, deduplication, and cleansing before Load).',
  },
];
