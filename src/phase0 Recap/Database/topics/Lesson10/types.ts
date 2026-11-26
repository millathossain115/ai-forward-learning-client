export interface Lesson10InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson10Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON10_INTERVIEW_QA: Lesson10InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Why do databases use B+ Trees instead of standard B-Trees or Hash Indexes for general indexing?',
    qBn: 'প্রশ্ন ১: সাধারণ ইনডেক্সিংয়ের জন্য ডেটাবেস B-Tree বা Hash-এর বদলে B+ Tree ব্যবহার করে কেন?',
    aEn: 'B+ Trees store data pointers only in leaf nodes, giving internal nodes a much higher branching factor (shorter height = fewer disk I/Os). All leaves are doubly-linked, making range queries (BETWEEN, >, ORDER BY) sequential and fast—something Hash Indexes cannot do.',
    aBn: 'B+ Tree-তে ডেটা পয়েন্টার শুধু লিফ নোডে থাকে, ফলে ইন্টারনাল নোডে অনেক বেশি key ধরে ও উচ্চতা কম হয়। এছাড়া লিফ নোডগুলো লিংকড লিস্টে যুক্ত থাকায় রেঞ্জ কুয়েরি (BETWEEN, >) অত্যন্ত দ্রুত কাজ করে, যা Hash Index পারে না।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Differentiate between Clustered, Non-Clustered, and Covering Indexes.',
    qBn: 'প্রশ্ন ২: Clustered, Non-Clustered এবং Covering Index-এর মধ্যে পার্থক্য কী?',
    aEn: 'Clustered Index dictates physical row order on disk (max 1 per table; PK in InnoDB). Non-Clustered Index is a separate structure storing sorted keys + row pointers (multiple allowed; requires bookmark lookup). A Covering Index includes all columns needed by a query, eliminating the extra table lookup.',
    aBn: 'Clustered Index ডিস্কে সারির প্রকৃত ক্রম নির্ধারণ করে (টেবিলে সর্বোচ্চ ১টি)। Non-Clustered Index হলো আলাদা স্ট্রাকচার যা মূল সারির পয়েন্টার রাখে (একাধিক হতে পারে)। আর Covering Index-এ কুয়েরির সব কলাম থাকায় মূল টেবিলে আর যেতে হয় না।',
  },
  {
    id: 'q3',
    qEn: 'Q3: Explain the Leftmost Prefix Rule for Composite Indexes.',
    qBn: 'প্রশ্ন ৩: Composite Index-এ Leftmost Prefix Rule ব্যাখ্যা করুন।',
    aEn: 'An index on (A, B, C) is sorted first by A, then B, then C. It accelerates queries filtering on (A), (A, B), or (A, B, C), but CANNOT efficiently serve queries filtering only on (B) or (C) because the leftmost column A is skipped.',
    aBn: '(A, B, C) কলামের কম্পোজিট ইনডেক্স প্রথমে A, তারপর B ও C অনুযায়ী সাজানো থাকে। তাই এটি (A), (A, B) বা (A, B, C) ফিল্টারে কাজ করে, কিন্তু বামের A বাদ দিয়ে শুধু (B) বা (C)-তে কাজ করে না।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Why does wrapping an indexed column in a function (e.g., WHERE YEAR(date) = 2025) hurt performance?',
    qBn: 'প্রশ্ন ৪: ইনডেক্সড কলামের ওপর ফাংশন (যেমন WHERE YEAR(date) = 2025) ব্যবহার করলে পারফরম্যান্স খারাপ হয় কেন?',
    aEn: 'Functions make the predicate non-SARGable: the engine cannot look up raw values in the B+ Tree and falls back to a Full Table Scan. Rewrite as a range predicate: WHERE date >= "2025-01-01" AND date < "2026-01-01".',
    aBn: 'কলামে ফাংশন ব্যবহার করলে B+ Tree ইনডেক্স ব্যবহার করা যায় না, ফলে ফুল টেবিল স্ক্যান করতে হয়। এর বদলে রেঞ্জ শর্ত (date >= "2025-01-01" AND date < "2026-01-01") ব্যবহার করা উচিত।',
  },
  {
    id: 'q5',
    qEn: 'Q5: What do type = ALL vs type = ref in SQL EXPLAIN tell you?',
    qBn: 'প্রশ্ন ৫: SQL EXPLAIN-এ type = ALL এবং type = ref কী নির্দেশ করে?',
    aEn: 'type = ALL indicates a Full Table Scan reading every row on disk (O(N)). type = ref or range indicates an Index Scan reading only matching B+ Tree entries (O(log N)).',
    aBn: 'type = ALL মানে ফুল টেবিল স্ক্যান (সব সারি পড়া হচ্ছে)। আর type = ref বা range মানে ইনডেক্স ব্যবহার করে দ্রুত নির্দিষ্ট সারিগুলো খুঁজে বের করা হচ্ছে।',
  },
  {
    id: 'q6',
    qEn: 'Q6: Why is over-indexing dangerous in write-heavy OLTP systems?',
    qBn: 'প্রশ্ন ৬: Write-heavy সিস্টেমে অতিরিক্ত ইনডেক্স তৈরি করা ক্ষতিকর কেন?',
    aEn: 'Every INSERT, UPDATE, or DELETE on a table must update and rebalance every secondary index on that table, increasing disk I/O, lock contention, and storage consumption.',
    aBn: 'টেবিলে প্রতিটি INSERT, UPDATE বা DELETE-এর সময় সবগুলো ইনডেক্সও আপডেট ও রিব্যালেন্স করতে হয়, যা রাইট স্পিড কমিয়ে দেয় এবং স্টোরেজ বাড়ায়।',
  },
];

export const LESSON10_EXERCISES: Lesson10Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Choose the Right Index',
    titleBn: 'অনুশীলনী ১: সঠিক ইনডেক্স নির্বাচন',
    problemEn: 'Queries frequently run: WHERE Dept = "CSE" AND GPA >= 3.5. Should you index (GPA, Dept) or (Dept, GPA)?',
    problemBn: 'প্রায়ই WHERE Dept = "CSE" AND GPA >= 3.5 কুয়েরি চলে। (GPA, Dept) নাকি (Dept, GPA) কোন ইনডেক্সটি ভালো?',
    sol: 'Index (Dept, GPA): Equality condition (Dept = "CSE") goes first, followed by range condition (GPA >= 3.5) for optimal B+ Tree scan.',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Fix Non-SARGable Query',
    titleBn: 'অনুশীলনী ২: Non-SARGable কুয়েরি ঠিক করুন',
    problemEn: 'Rewrite WHERE LOWER(Email) = "rahim@uni.edu" or WHERE Salary * 1.1 > 55000 so the B+ Tree index can be used.',
    problemBn: 'WHERE Salary * 1.1 > 55000 কুয়েরিটি এমনভাবে লিখুন যেন Salary কলামের ইনডেক্স কাজ করে।',
    sol: 'Move math off the indexed column:\nWHERE Salary > 55000 / 1.1;  -- Index on Salary is now used!',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Hash vs B+ Tree',
    titleBn: 'অনুশীলনী ৩: Hash বনাম B+ Tree',
    problemEn: 'Can a Hash Index speed up SELECT * FROM Students WHERE Age BETWEEN 18 AND 22? Why or why not?',
    problemBn: 'Hash Index কি SELECT * FROM Students WHERE Age BETWEEN 18 AND 22 কুয়েরিকে দ্রুত করতে পারবে? কেন?',
    sol: 'No! Hash indexes only support exact equality (=) lookups. Range queries (BETWEEN, <, >) require an ordered B+ Tree index.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Read EXPLAIN Output',
    titleBn: 'অনুশীলনী ৪: EXPLAIN আউটপুট বিশ্লেষণ',
    problemEn: 'EXPLAIN shows type: ALL, key: NULL, rows: 1,000,000 for WHERE Email = "a@uni.edu". How do you fix it?',
    problemBn: 'WHERE Email = "a@uni.edu" কুয়েরিতে EXPLAIN দেখাচ্ছে type: ALL, key: NULL, rows: 1,000,000। কীভাবে সমাধান করবেন?',
    sol: 'Create an index on Email:\nCREATE UNIQUE INDEX idx_student_email ON STUDENT(Email);\nEXPLAIN will switch to const/ref with rows = 1.',
  },
];
