export interface Lesson8InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson8Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON8_INTERVIEW_QA: Lesson8InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: What is Database Normalization and what two properties must decomposition guarantee?',
    qBn: 'প্রশ্ন ১: ডেটাবেস নরমালাইজেশন কী এবং ডিকম্পোজিশনে কোন দুটি বৈশিষ্ট্য থাকা আবশ্যক?',
    aEn: 'Normalization decomposes large tables into smaller relations to eliminate redundancy and anomalies. Every decomposition must preserve: (1) Lossless-Join Property (joining back produces no spurious rows) and (2) Dependency Preservation (all original FDs remain enforceable without cross-table joins where possible).',
    aBn: 'নরমালাইজেশন বড় টেবিলকে ছোট ছোট রিলেশনে ভাগ করে ডেটা ডুপ্লিকেসি ও অ্যানোমালি দূর করে। প্রতিটি ডিকম্পোজিশনে দুটি বিষয় নিশ্চিত করতে হয়: (১) Lossless-Join (জয়েন করলে কোনো ভুয়া সারি তৈরি হবে না) এবং (২) Dependency Preservation (মূল Functional Dependency-গুলো বজায় থাকবে)।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Explain Insertion, Update, and Deletion Anomalies with concrete examples.',
    qBn: 'প্রশ্ন ২: উদাহরণসহ Insertion, Update এবং Deletion অ্যানোমালি ব্যাখ্যা করুন।',
    aEn: 'Insertion Anomaly: Cannot add a new course until a student enrolls (PK cannot be NULL). Update Anomaly: Changing one instructor name across 50 redundant rows risks partial updates and contradictory data. Deletion Anomaly: Dropping the last student enrolled in a course accidentally deletes the course record itself.',
    aBn: 'Insertion Anomaly: কোনো শিক্ষার্থী ভর্তি না হলে নতুন কোর্স যোগ করা যায় না। Update Anomaly: ৫০টি সারিতে থাকা কোর্সের নাম আপডেট করতে গিয়ে কিছু সারি বাদ পড়লে অসঙ্গতি তৈরি হয়। Deletion Anomaly: কোনো কোর্সের একমাত্র শিক্ষার্থীর রেকর্ড ডিলিট করলে কোর্সের তথ্যও মুছে যায়।',
  },
  {
    id: 'q3',
    qEn: 'Q3: Differentiate between Partial Dependency (2NF) and Transitive Dependency (3NF).',
    qBn: 'প্রশ্ন ৩: Partial Dependency (2NF) এবং Transitive Dependency (3NF)-এর মধ্যে পার্থক্য কী?',
    aEn: 'Partial Dependency: A non-prime attribute depends on only part of a composite candidate key, e.g., (Student_ID, Course_ID) -> Student_Name where Student_ID -> Student_Name. Transitive Dependency: A non-prime attribute depends on another non-prime attribute via an intermediary, e.g., Student_ID -> Dept_ID -> Dept_Name.',
    aBn: 'Partial Dependency: একটি নন-প্রাইম অ্যাট্রিবিউট কম্পোজিট কি-এর কেবল একটি অংশের ওপর নির্ভরশীল (যেমন Student_ID -> Student_Name), যা 2NF ভঙ্গ করে। Transitive Dependency: একটি নন-প্রাইম অ্যাট্রিবিউট আরেকটি নন-প্রাইম অ্যাট্রিবিউটের ওপর নির্ভরশীল (Student_ID -> Dept_ID -> Dept_Name), যা 3NF ভঙ্গ করে।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Why is a 1NF table with a single-column primary key automatically in 2NF?',
    qBn: 'প্রশ্ন ৪: একক-কলাম প্রাইমারি কি থাকলে কোনো 1NF টেবিল স্বয়ংক্রিয়ভাবে 2NF হয় কেন?',
    aEn: 'Partial dependency can only occur when a candidate key has two or more attributes (composite key). With a single-attribute key, no proper subset of the key exists, so partial dependency is mathematically impossible.',
    aBn: 'Partial dependency কেবল তখনই ঘটে যখন ক্যান্ডিডেট কি একাধিক অ্যাট্রিবিউট নিয়ে গঠিত (কম্পোজিট কি) হয়। একক অ্যাট্রিবিউটের ক্ষেত্রে কি-এর কোনো ক্ষুদ্রতর অংশ থাকে না, তাই এটি স্বয়ংক্রিয়ভাবে 2NF-এ থাকে।',
  },
  {
    id: 'q5',
    qEn: 'Q5: How is BCNF stricter than 3NF, and when does a 3NF table fail BCNF?',
    qBn: 'প্রশ্ন ৫: BCNF কীভাবে 3NF থেকে কঠোর এবং কখন একটি 3NF টেবিল BCNF ভঙ্গ করে?',
    aEn: 'In 3NF, for X -> Y, either X is a superkey OR Y is a prime attribute. BCNF removes the second exception: for every non-trivial FD (X -> Y), X MUST be a superkey. A 3NF table fails BCNF when a non-superkey determinant determines a prime attribute (part of a candidate key).',
    aBn: '3NF-এ X -> Y হলে X সুপারকি হতে হবে অথবা Y প্রাইম অ্যাট্রিবিউট হতে হবে। BCNF দ্বিতীয় শর্তটি বাদ দেয়: প্রতিটি নন-ট্রিভিয়াল FD-তে X অবশ্যই সুপারকি হতে হবে। যখন কোনো নন-সুপারকি একটি প্রাইম অ্যাট্রিবিউটকে নির্ধারণ করে, তখন টেবিলটি 3NF হলেও BCNF ভঙ্গ করে।',
  },
  {
    id: 'q6',
    qEn: 'Q6: When should you intentionally denormalize a database in production?',
    qBn: 'প্রশ্ন ৬: প্রোডাকশনে কখন ইচ্ছাকৃতভাবে ডেটাবেস ডিনরমালাইজ (Denormalize) করা হয়?',
    aEn: 'In read-heavy analytical workloads (OLAP / Data Warehouses / Dashboards) where joining 6+ normalized tables per query creates high latency. Controlled denormalization trades extra storage and write-sync complexity (via triggers or ETL) for fast single-table reads.',
    aBn: 'রিড-হেভি অ্যানালিটিক্যাল সিস্টেমে (OLAP / ড্যাশবোর্ড) যেখানে প্রতি কুয়েরিতে অনেক টেবিল জয়েন করতে গেলে গতি কমে যায়। দ্রুত রিড পারফরম্যান্সের জন্য নিয়ন্ত্রিতভাবে ডিনরমালাইজেশন করা হয়।',
  },
];

export const LESSON8_EXERCISES: Lesson8Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Identify the Anomaly',
    titleBn: 'অনুশীলনী ১: অ্যানোমালি চিহ্নিত করুন',
    problemEn: 'In Student_Course(Student_ID, Student_Name, Course_ID, Course_Name), if Course_Name changes and only some rows are updated, which anomaly occurs?',
    problemBn: 'Student_Course টেবিলে Course_Name পরিবর্তন করার সময় কিছু সারি আপডেট হয়ে কিছু বাদ পড়লে কোন অ্যানোমালি ঘটে?',
    sol: 'Update Anomaly: Redundant copies of Course_Name exist; partial updates create contradictory values for the same Course_ID.',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Convert to 1NF',
    titleBn: 'অনুশীলনী ২: 1NF-এ রূপান্তর করুন',
    problemEn: 'Orders(Customer_ID, Customer_Name, Products) has "Laptop, Mouse" in a single cell. Convert to 1NF.',
    problemBn: 'Orders(Customer_ID, Customer_Name, Products) টেবিলের এক সেলে "Laptop, Mouse" আছে। এটিকে 1NF-এ রূপান্তর করুন।',
    sol: "Expand multivalued cells into atomic rows:\n(1, 'Rahim', 'Laptop')\n(1, 'Rahim', 'Mouse')\nOr split into Customers(Customer_ID, Customer_Name) and Order_Items(Customer_ID, Product_Name).",
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Convert to 2NF',
    titleBn: 'অনুশীলনী ৩: 2NF-এ রূপান্তর করুন',
    problemEn: 'Student_Course(Student_ID, Course_ID, Student_Name, Course_Name, Grade) with PK (Student_ID, Course_ID). Decompose into 2NF.',
    problemBn: 'কম্পোজিট কি (Student_ID, Course_ID) সহ Student_Course টেবিলকে 2NF-এ ডিকম্পোজ করুন।',
    sol: "Remove Partial FDs (Student_ID -> Student_Name, Course_ID -> Course_Name):\n1. Students(Student_ID [PK], Student_Name)\n2. Courses(Course_ID [PK], Course_Name)\n3. Enrollments(Student_ID [FK], Course_ID [FK], Grade)",
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Convert to 3NF',
    titleBn: 'অনুশীলনী ৪: 3NF-এ রূপান্তর করুন',
    problemEn: 'Employees(Employee_ID, Name, Dept_ID, Dept_Name) where Employee_ID -> Dept_ID -> Dept_Name. Decompose into 3NF.',
    problemBn: 'Employees(Employee_ID, Name, Dept_ID, Dept_Name) যেখানে Employee_ID -> Dept_ID -> Dept_Name, এটিকে 3NF-এ রূপান্তর করুন।',
    sol: "Remove Transitive FD (Dept_ID -> Dept_Name):\n1. Employees(Employee_ID [PK], Name, Dept_ID [FK])\n2. Departments(Dept_ID [PK], Dept_Name)",
  },
];
