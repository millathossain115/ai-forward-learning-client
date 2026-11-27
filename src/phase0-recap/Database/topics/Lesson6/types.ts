export interface StudentRecord {
  id: number;
  name: string;
  age: number;
  email: string;
  deptId: number;
  deptName: string;
  gpa: number;
}

export const INITIAL_STUDENTS: StudentRecord[] = [
  { id: 101, name: 'Rahim', age: 22, email: 'rahim@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.80 },
  { id: 102, name: 'Karim', age: 23, email: 'karim@gmail.com', deptId: 2, deptName: 'BBA', gpa: 3.45 },
  { id: 103, name: 'Sumaiya', age: 21, email: 'sumaiya@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.92 },
  { id: 104, name: 'Nabila', age: 22, email: 'nabila@gmail.com', deptId: 3, deptName: 'EEE', gpa: 3.60 },
  { id: 105, name: 'Tanvir', age: 24, email: 'tanvir@gmail.com', deptId: 2, deptName: 'BBA', gpa: 3.20 },
  { id: 106, name: 'Farhana', age: 20, email: 'farhana@gmail.com', deptId: 1, deptName: 'CSE', gpa: 3.85 },
];

export interface DepartmentRecord {
  id: number;
  name: string;
  head: string;
  room: string;
}

export const DEPARTMENTS: DepartmentRecord[] = [
  { id: 1, name: 'CSE', head: 'Dr. Hasan', room: 'Lab 402' },
  { id: 2, name: 'BBA', head: 'Prof. Kabir', room: 'Tower 301' },
  { id: 3, name: 'EEE', head: 'Dr. Nazmul', room: 'Circuits 105' },
  { id: 4, name: 'Civil', head: 'Prof. Alam', room: 'Design 204' } // Empty dept for Right Join demo
];

export interface PipelineStepData {
  step: number;
  labelEn: string;
  labelBn: string;
  titleEn: string;
  titleBn: string;
  tagEn: string;
  tagBn: string;
  storyEn: string;
  storyBn: string;
  engineEn: string;
  engineBn: string;
  payloadTitleEn: string;
  payloadTitleBn: string;
  payloadCode: string;
  errorTitleEn: string;
  errorTitleBn: string;
  errorCode: string;
}

export const SQL_PIPELINE_STORY_STEPS: PipelineStepData[] = [
  {
    step: 1,
    labelEn: '1. Client / Portal',
    labelBn: '১. ক্লায়েন্ট / পোর্টাল',
    titleEn: 'Step 1: Client Request (Rahim at Student Portal)',
    titleBn: 'ধাপ ১: ক্লায়েন্ট রিকোয়েস্ট (স্টুডেন্ট পোর্টালে রহিম)',
    tagEn: 'RAW SQL TRANSMISSION',
    tagBn: 'কোয়েরি প্রেরণ ও সকেট সংযোগ',
    storyEn: 'Rahim logs into his university portal on his laptop, opens the results page, and clicks "View My Result".',
    storyBn: 'রহিম ল্যাপটপে বিশ্ববিদ্যালয়ের রেজাল্ট পোর্টালে লগইন করে "View My Result" বাটনে ক্লিক করে।',
    engineEn: 'The backend web app borrows a connection from the pool and transmits the raw SQL text over a TCP network socket to the database server.',
    engineBn: 'ওয়েব ব্যাকএন্ড কানেকশন পুল থেকে সকেট সংযোগ নিয়ে র\' (Raw) SQL টেক্সট কুয়েরিটি TCP সকেটের মাধ্যমে ডেটাবেস সার্ভারে পাঠায়।',
    payloadTitleEn: 'Transmitted Query Payload:',
    payloadTitleBn: 'প্রেরিত কুয়েরি পে-লোড:',
    payloadCode: 'SELECT name, gpa FROM students WHERE dept_id = 1;',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: "ERROR 2003 (HY000): Can't connect to MySQL server on 'univ-db' (Connection refused / Port blocked)"
  },
  {
    step: 2,
    labelEn: '2. Parser & Lexer',
    labelBn: '২. পার্সার ও লেক্সার',
    titleEn: 'Step 2: Parser & Lexer (Syntax Analysis & AST)',
    titleBn: 'ধাপ ২: পার্সার ও লেক্সার (সিনট্যাক্স ও ব্যাকরণ যাচাই)',
    tagEn: 'TOKENIZATION & AST GENERATION',
    tagBn: 'টোকেন বিশ্লেষণ ও সিনট্যাক্স ট্রি',
    storyEn: 'The engine examines the query: Did Rahim make a typing mistake? Are "SELECT", "FROM", and "WHERE" spelled correctly?',
    storyBn: 'ইঞ্জিন কুয়েরিটি পরীক্ষা করে: রহিমের কুয়েরিতে কোনো বানান ভুল আছে কি না? "SELECT", "FROM" ও "WHERE" ব্যাকরণসম্মত কি না?',
    engineEn: 'The Lexer splits the character stream into discrete tokens, and the Parser verifies syntax against SQL grammar rules to build an Abstract Syntax Tree (AST).',
    engineBn: 'লেক্সার টেক্সটকে ক্ষুদ্র টোকেনে ভাগ করে এবং পার্সার SQL ব্যাকরণ যাচাই করে একটি অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) গঠন করে।',
    payloadTitleEn: 'Generated Abstract Syntax Tree (AST):',
    payloadTitleBn: 'জেনারেটেড AST স্ট্রাকচার:',
    payloadCode: 'SelectStmt [Columns: (name, gpa), From: (students), Where: (dept_id = 1)]',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: "ERROR 1064 (42000): You have an error in your SQL syntax near 'SELEC name, gpa FROM...'"
  },
  {
    step: 3,
    labelEn: '3. Semantic & Catalog',
    labelBn: '৩. সিম্যান্টিক ও ক্যাটালগ',
    titleEn: 'Step 3: Semantic Analyzer & Catalog Resolver',
    titleBn: 'ধাপ ৩: সিম্যান্টিক ও ক্যাটালগ যাচাই (অবজেক্ট অস্তিত্ব ও পারমিশন)',
    tagEn: 'SCHEMA BINDING & PRIVILEGES',
    tagBn: 'মেটাডেটা বাইন্ডিং ও পারমিশন',
    storyEn: 'Engine verifies against university records: Does the "students" table exist? Does column "gpa" exist? Does Rahim have permission to read grades?',
    storyBn: 'ইঞ্জিন ইউনিভার্সিটির মেটাডেটা ক্যাটালগে খোঁজে: "students" টেবিল ও "gpa" কলাম কি আসলেই আছে? আর রহিমের কি গ্রেড দেখার রিড-পারমিশন আছে?',
    engineEn: 'Binds tokens to concrete catalog objects (table ID, column attributes, data types) and validates that the authenticated database user has SELECT privileges.',
    engineBn: 'সিস্টেম ক্যাটালগ থেকে টেবিল আইডি ও কলাম টাইপ বাইন্ডিং সম্পন্ন করে এবং ইউজারের রোল ও SELECT পারমিশন যাচাই করে বৈধতা নিশ্চিত করে।',
    payloadTitleEn: 'Resolved Metadata Binding:',
    payloadTitleBn: 'রিজলভড মেটাডেটা বাইন্ডিং:',
    payloadCode: 'BoundQuery: Table_ID#10 (students) ➔ Col#1 (name: VARCHAR), Col#5 (gpa: DECIMAL) [Access: OK]',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: "ERROR 1146 (42S02): Table 'univ_db.students' doesn't exist / Column 'gpaa' unknown"
  },
  {
    step: 4,
    labelEn: '4. Query Optimizer',
    labelBn: '৪. কুয়েরি অপ্টিমাইজার',
    titleEn: 'Step 4: Query Optimizer (Cost-Based Optimizer - CBO)',
    titleBn: 'ধাপ ৪: কুয়েরি অপ্টিমাইজার (কস্ট হিসাব ও দ্রুততম পাথ)',
    tagEn: 'PHYSICAL PLAN GENERATION',
    tagBn: 'ফিজিক্যাল এক্সিকিউশন প্ল্যান',
    storyEn: 'Engine weighs options: Should it scan all 10,000 university students one-by-one (Full Scan), or use the department index? It chooses the fast Index Scan!',
    storyBn: 'ইঞ্জিন কৌশল নির্ধারণ করে: বিশ্ববিদ্যালয়ের ১০,০০০ শিক্ষার্থীর সবাইকে কি একটি একটি করে স্ক্যান করবে, নাকি ডিপার্টমেন্ট ইনডেক্স ব্যবহার করবে? দ্রুততম Index Scan বেছে নেয়!',
    engineEn: 'The CBO calculates disk I/O and CPU costs using data distribution histograms, selecting the optimal physical access path (Index Range Scan on dept_id).',
    engineBn: 'কস্ট-বেসড অপটিমাইজার ডেটা ডিস্ট্রিবিউশন হিস্টোগ্রাম বিশ্লেষণ করে সর্বনিম্ন CPU ও ডিস্ক খরচের পাথ (dept_id এর ওপর B-Tree Index Scan) নির্বাচন করে।',
    payloadTitleEn: 'Selected Physical Plan (EXPLAIN):',
    payloadTitleBn: 'নির্বাচিত ফিজিক্যাল প্ল্যান:',
    payloadCode: 'INDEX_RANGE_SCAN(idx_dept_id, value=1) [Est. Cost: 2.15 vs Full Table Scan: 168.4]',
    errorTitleEn: 'Potential issue at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য পারফরম্যান্স সমস্যা:',
    errorCode: 'Suboptimal Plan: Outdated table statistics cause optimizer to choose slow Full Table Scan'
  },
  {
    step: 5,
    labelEn: '5. Execution Engine',
    labelBn: '৫. এক্সিকিউশন ইঞ্জিন',
    titleEn: 'Step 5: Query Execution Engine (Volcano Iterators)',
    titleBn: 'ধাপ ৫: কুয়েরি এক্সিকিউশন ইঞ্জিন (অপারেটর পাইপলাইন চালনা)',
    tagEn: 'OPERATOR ITERATOR MODEL',
    tagBn: 'মেমোরি অপারেটর ও ফিল্টারিং',
    storyEn: 'Engine springs into action, running operators step-by-step in memory and filtering only students belonging to Rahim\'s department (dept_id = 1).',
    storyBn: 'ইঞ্জিন সক্রিয় হয়ে মেমোরিতে প্ল্যানের ধাপগুলো চালায় এবং শুধুমাত্র রহিমের ডিপার্টমেন্টের (dept_id = 1) রেকর্ডগুলো ফিল্টার করে প্রস্তুত করে।',
    engineEn: 'Executes the plan using the Volcano Iterator Model (open() -> next() -> close()), driving row retrieval through projections and condition filters.',
    engineBn: 'নির্বাচিত প্ল্যান ধরে মেমোরিতে অপারেটর পাইপলাইন চালায় (Volcano Iterator: open ➔ next ➔ close), কলাম প্রজেকশন সমন্বয় ও ফিল্টার যাচাই করে।',
    payloadTitleEn: 'Operator Execution Pipeline:',
    payloadTitleBn: 'অপারেটর এক্সিকিউশন চেইন:',
    payloadCode: 'Projection(name, gpa) ➔ Filter(dept_id = 1) ➔ IndexRangeIterator(idx_dept_id)',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: 'ERROR 3024 (HY000): Query execution was interrupted, max_statement_time exceeded'
  },
  {
    step: 6,
    labelEn: '6. Storage & Buffer',
    labelBn: '৬. স্টোরেজ ও বাফার',
    titleEn: 'Step 6: Storage Engine & Buffer Pool (RAM Cache Hit)',
    titleBn: 'ধাপ ৬: স্টোরেজ ইঞ্জিন ও বাফার পুল (র‍্যাম ক্যাশ ও দ্রুত রিড)',
    tagEn: 'BUFFER POOL CACHING & ROW FETCH',
    tagBn: 'বাফার পুল ও মেমোরি ক্যাশিং',
    storyEn: 'Engine checks server RAM: Is the student data page already cached in the Buffer Pool? Yes, Cache Hit! Rahim\'s record is read from RAM in microseconds.',
    storyBn: 'ইঞ্জিন সার্ভারের র‍্যাম বাফার পুলে চেক করে: শিক্ষার্থীদের ডেটা পেজ কি র‍্যামে ক্যাশড আছে? ক্যাশ হিট! স্লো হার্ডডিস্কে না গিয়েই মুহূর্তে র‍্যাম থেকে ডেটা চলে আসল।',
    engineEn: 'The storage engine (e.g. InnoDB) checks the 16KB buffer pool. Cache hit avoids disk I/O, acquires a shared read lock (S-Lock), and ensures MVCC isolation.',
    engineBn: 'স্টোরেজ ইঞ্জিন (InnoDB) ১৬ কিলোবাইট বাফার পুল ক্যাশ পরীক্ষা করে। ক্যাশ হিটের কারণে হার্ডডিস্ক ছাড়াই র‍্যাম থেকে মাইক্রোসেকেন্ডে ডেটা রিটার্ন হয়।',
    payloadTitleEn: 'Memory & Storage Status:',
    payloadTitleBn: 'মেমরি ও স্টোরেজ স্ট্যাটাস:',
    payloadCode: 'Buffer Pool Cache Hit: 100% | NVMe Reads: 0 pages | Lock: Shared (S) | Read Time: 0.0004s',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: 'ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction'
  },
  {
    step: 7,
    labelEn: '7. Result Return',
    labelBn: '৭. রেজাল্ট ফেরত',
    titleEn: 'Step 7: Result Formatter & Client Screen Delivery',
    titleBn: 'ধাপ ৭: রেজাল্ট ফরম্যাট ও রহিমের স্ক্রিনে চূড়ান্ত প্রদর্শন',
    tagEn: 'NETWORK PACKET & SCREEN RENDER',
    tagBn: 'প্যাকেট ট্রান্সমিশন ও আউটপুট',
    storyEn: 'Engine streams the formatted result back across the network socket—and in less than 2 milliseconds, Rahim sees on screen: "Rahim | GPA: 3.85"!',
    storyBn: 'ইঞ্জিন মেমোরির রেকর্ডকে নেটওয়ার্ক প্যাকেটে সাজিয়ে সকেটে পাঠিয়ে দেয়—মুহূর্তেই (১.৪ মিলি-সেকেন্ডে) রহিমের স্ক্রিনে ভেসে উঠল: "Rahim | GPA: 3.85"!',
    engineEn: 'Serializes rows into standard database network protocol packets, streams tabular data back through the TCP socket to the client, and closes the cursor.',
    engineBn: 'মেমোরির ডেটাকে ক্লায়েন্ট প্রটোকল প্যাকেটে সিরিয়ালাইজ করে নেটওয়ার্ক সকেট দিয়ে ব্রাউজারে পাঠায়, কার্সার রিলিজ করে এবং সেশন রিসেট করে।',
    payloadTitleEn: 'Final Client Result Set:',
    payloadTitleBn: 'চূড়ান্ত ক্লায়েন্ট আউটপুট:',
    payloadCode: '1 row in set (0.0014 sec) ➔ [{ name: "Rahim", gpa: 3.85 }] • Ready for next query',
    errorTitleEn: 'Failure at this stage:',
    errorTitleBn: 'এই ধাপে সম্ভাব্য এরর:',
    errorCode: 'ERROR 2013 (HY000): Lost connection to MySQL server during query response streaming'
  }
];


export const selectiveInterviewQuestions = [
    {
      id: 'sq1',
      tagEn: 'System Architecture',
      tagBn: 'সিস্টেম আর্কিটেকচার',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'What is SQL and why is it essential in modern software engineering?',
      qBn: 'এসকিউএল (SQL) কী এবং আধুনিক সফটওয়্যার ইঞ্জিনিয়ারিংয়ে এটি কেন অপরিহার্য?',
      summaryEn: 'SQL (Structured Query Language) is the standardized declarative language used to define, manipulate, and query relational databases (RDBMS).',
      summaryBn: 'এসকিউএল হলো স্ট্যান্ডার্ড ডিক্লেয়ারিটিভ কুয়েরি ল্যাঙ্গুয়েজ, যা রিলেশনাল ডেটাবেসে ডেটা সংরক্ষণ, ফিল্টারিং, পরিবর্তন ও ইন্টিগ্রিটি নিয়ন্ত্রণে ব্যবহৃত হয়।',
      bulletsEn: [
        'Declarative Nature: Engineers specify WHAT data is needed, while the database query optimizer plans HOW to fetch it optimally.',
        'Universal Standard: Standardized by ANSI/ISO, powering MySQL, PostgreSQL, Oracle, SQLite, and Microsoft SQL Server.',
        'ACID Guarantee: Enables transactional guarantees (Atomicity, Consistency, Isolation, Durability) for enterprise systems.'
      ],
      bulletsBn: [
        'ডিক্লেয়ারিটিভ প্রকৃতি: ডেভেলপার কেবল বলে কী ডেটা প্রয়োজন, আর ডেটাবেসের অপটিমাইজার নিজে নির্ধারণ করে কীভাবে সবচেয়ে দ্রুত তা বের করা যায়।',
        'সার্বজনীন মানদণ্ড: ANSI/ISO স্ট্যান্ডার্ড মেনে তৈরি, যা MySQL, PostgreSQL, Oracle, SQLite ইত্যাদিতে ব্যবহৃত হয়।',
        'ACID নিশ্চয়তা: এন্টারপ্রাইজ সিস্টেমে লেনদেনের নির্ভরযোগ্যতা (Atomicity, Consistency, Isolation, Durability) নিশ্চিত করে।'
      ]
    },
    {
      id: 'sq2',
      tagEn: 'RDBMS vs SQL',
      tagBn: 'আরডিবিএমএস বনাম এসকিউএল',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'What is the fundamental difference between SQL and MySQL?',
      qBn: 'SQL এবং MySQL-এর মধ্যে মৌলিক পার্থক্য কী?',
      summaryEn: 'SQL is an abstract query language specification; MySQL is a concrete software RDBMS engine implementing that specification.',
      summaryBn: 'SQL হলো কুয়েরি ভাষার একটি আদর্শ স্পেসিফিকেশন; আর MySQL হলো একটি নির্দিষ্ট সফটওয়্যার অ্যাপ্লিকেশন (RDBMS ইঞ্জিন) যা ওই স্পেসিফিকেশন প্রয়োগ করে।',
      bulletsEn: [
        'SQL is the language; MySQL is the software product developed by Oracle.',
        'Analogy: SQL is like the English language specification; MySQL, PostgreSQL, and SQLite are distinct speakers of that language.',
        'MySQL adds custom extensions (e.g., specific storage engines like InnoDB, replication tools, and administration utilities).'
      ],
      bulletsBn: [
        'SQL হলো ভাষা; আর MySQL হলো ওরাকল দ্বারা ডেভেলপকৃত একটি সফটওয়্যার প্রডাক্ট।',
        'বাস্তব রূপক: SQL হলো ইংরেজি ভাষা; আর MySQL, PostgreSQL ও SQLite হলো সেই ভাষায় কথা বলা ভিন্ন ভিন্ন সফটওয়্যার।',
        'MySQL-এ নিজস্ব কিছু ইঞ্জিন (যেমন: InnoDB), রেপ্লিকেশন এবং অ্যাডমিনিস্ট্রেশন টুলস থাকে।'
      ]
    },
    {
      id: 'sq3',
      tagEn: 'Command Classification',
      tagBn: 'কমান্ডের শ্রেণীবিন্যাস',
      difficultyEn: 'Core Concept',
      difficultyBn: 'মৌলিক কনসেপ্ট',
      qEn: 'Define DDL, DML, DQL, DCL, and TCL with practical examples.',
      qBn: 'বাস্তব উদাহরণসহ DDL, DML, DQL, DCL এবং TCL-এর সুনির্দিষ্ট পার্থক্য ব্যাখ্যা করো।',
      summaryEn: 'SQL commands are grouped into 5 functional families based on whether they alter schema, modify data, query records, manage permissions, or handle transactions.',
      summaryBn: 'কাজের ধরন অনুযায়ী SQL কমান্ডকে ৫টি প্রধান ফ্যামিলিতে ভাগ করা হয়: স্কিমা তৈরি, ডেটা পরিবর্তন, কুয়েরি, পারমিশন নিয়ন্ত্রণ এবং ট্রানজ্যাকশন নিয়ন্ত্রণ।',
      bulletsEn: [
        'DDL (Data Definition Language): Alters schema structure (CREATE, ALTER, DROP, TRUNCATE). Auto-committed in most engines.',
        'DML (Data Manipulation Language): Modifies stored records (INSERT, UPDATE, DELETE). Can be rolled back.',
        'DQL (Data Query Language): Retrieves records without mutating data (SELECT).',
        'DCL (Data Control Language): Manages security & privileges (GRANT, REVOKE).',
        'TCL (Transaction Control Language): Controls transactional safety (COMMIT, ROLLBACK, SAVEPOINT).'
      ],
      bulletsBn: [
        'DDL: ডেটাবেসের টেবিল ও স্কিমা স্ট্রাকচার তৈরি বা পরিবর্তন করে (CREATE, ALTER, DROP, TRUNCATE)।',
        'DML: টেবিলের ভেতরের রেকর্ড পরিবর্তন করে (INSERT, UPDATE, DELETE)। এটি রোলব্যাক করা যায়।',
        'DQL: কোনো ডেটা পরিবর্তন না করে কেবল ডেটা খুঁজে বের করে প্রদর্শন করে (SELECT)।',
        'DCL: ডেটাবেসে বিভিন্ন ইউজারের অ্যাক্সেস ও পারমিশন নিয়ন্ত্রণ করে (GRANT, REVOKE)।',
        'TCL: ট্রানজ্যাকশন নিরাপদে সেভ বা বাতিল করতে ব্যবহৃত হয় (COMMIT, ROLLBACK, SAVEPOINT)।'
      ]
    },
    {
      id: 'sq4',
      tagEn: 'Storage & Safeguards',
      tagBn: 'স্টোরেজ ও ডিলিট সেফটি',
      difficultyEn: 'Senior Level',
      difficultyBn: 'সিনিয়র লেভেল',
      qEn: 'What is the architectural difference between DELETE, TRUNCATE, and DROP?',
      qBn: 'DELETE, TRUNCATE এবং DROP-এর মধ্যে স্থাপত্যগত ও পারফরম্যান্সগত পার্থক্য কী?',
      summaryEn: 'DELETE removes specific rows matching WHERE and can be rolled back; TRUNCATE deallocates data pages instantly and resets identity counters; DROP completely removes schema and data from disk.',
      summaryBn: 'DELETE শর্ত মেনে এক বা একাধিক রো মুছে ফেলে এবং রোলব্যাক করা যায়; TRUNCATE অতিদ্রুত পুরো টেবিলের পেজ ডিয়ালোকেট করে এবং অটো-ইনক্রিমেন্ট রিসেট করে; আর DROP টেবিল কাঠামো সহ পুরো অবজেক্ট ডিস্ক থেকে মুছে ফেলে।',
      bulletsEn: [
        'DELETE is DML (row-by-row, triggers fire, logs each row removal, supports WHERE).',
        'TRUNCATE is DDL (deallocates storage pages, does not fire row triggers, cannot use WHERE, resets AUTO_INCREMENT).',
        'DROP is DDL (completely destroys table schema, indexes, constraints, and data).'
      ],
      bulletsBn: [
        'DELETE হলো DML: এটি প্রতিটি রো আলাদা করে ডিলিট করে, ট্রিগার চালু হয়, লগ রাখে এবং WHERE সাপোর্ট করে।',
        'TRUNCATE হলো DDL: এটি মেমোরি পেজ খালি করে নিমিষে সব মুছে ফেলে, কোনো রো ট্রিগার চলে না এবং আইডি ১ থেকে রিসেট হয়।',
        'DROP হলো DDL: এটি ডেটাসহ টেবিলের স্কিমা, ইনডেক্স ও কনস্ট্রেইন্ট সবকিছু চিরতরে মুছে ফেলে।'
      ]
    },
    {
      id: 'sq5',
      tagEn: 'Filtering & Aggregation',
      tagBn: 'ফিল্টারিং ও গ্রুপিং',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'What is the critical difference between WHERE and HAVING clauses in SQL?',
      qBn: 'SQL-এ WHERE ক্লজ এবং HAVING ক্লজের মধ্যে সুনির্দিষ্ট পার্থক্য কী?',
      summaryEn: 'WHERE filters individual tuples before grouping occurs and cannot accept aggregate functions; HAVING filters grouped summary rows after GROUP BY.',
      summaryBn: 'WHERE ক্লজ গ্রুপিংয়ের আগেই প্রতিটি একক সারির ওপর ফিল্টার চালায় এবং এতে এগ্রিগেট ফাংশন ব্যবহার করা যায় না; আর HAVING ক্লজ GROUP BY করার পর প্রাপ্ত গ্রুপ সামারিকে ফিল্টার করে।',
      bulletsEn: [
        'Execution Order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.',
        'WHERE cannot evaluate aggregates (e.g. WHERE COUNT(*) > 2 is a syntax error).',
        'HAVING is specifically designed to filter on aggregates (e.g. HAVING AVG(GPA) >= 3.5).'
      ],
      bulletsBn: [
        'এক্সিকিউশন অর্ডার: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY।',
        'WHERE-এ এগ্রিগেট ফাংশন চালানো যায় না (যেমন: WHERE COUNT(*) > ২ লিখলে সিনট্যাক্স এরর দেয়)।',
        'HAVING মূলত এগ্রিগেট ফলাফলের ওপর শর্ত আরোপ করতে ব্যবহৃত হয় (যেমন: HAVING AVG(GPA) >= ৩.৫)।'
      ]
    },
    {
      id: 'sq6',
      tagEn: 'Referential Integrity',
      tagBn: 'রেফারেন্সিয়াল ইন্টিগ্রিটি',
      difficultyEn: 'Core Architecture',
      difficultyBn: 'মূল আর্কিটেকচার',
      qEn: 'What is a Foreign Key and how does it prevent orphan records?',
      qBn: 'Foreign Key কী এবং এটি কীভাবে ডেটাবেসে এতিম (orphan) রেকর্ড তৈরি হওয়া রোধ করে?',
      summaryEn: 'A Foreign Key links a child table column to the Primary Key of a parent table, enforcing referential integrity by rejecting invalid references.',
      summaryBn: 'Foreign Key হলো চাইল্ড টেবিলের একটি কলাম যা প্যারেন্ট টেবিলের Primary Key-কে নির্দেশ করে এবং অবৈধ প্যারেন্ট রেফারেন্স বা ডেটার অসামঞ্জস্য রোধ করে।',
      bulletsEn: [
        'Guarantees that a child row cannot reference a non-existent parent ID.',
        'Supports CASCADE rules (ON DELETE CASCADE, ON UPDATE CASCADE, ON DELETE SET NULL).',
        'Prevents deleting a parent record while active child records depend on it.'
      ],
      bulletsBn: [
        'নিশ্চিত করে যে প্যারেন্ট টেবিলে অস্তিত্ব নেই এমন কোনো আইডি চাইল্ড টেবিলে ইনসার্ট করা যাবে না।',
        'CASCADE রুল সমর্থন করে (যেমন: প্যারেন্ট মুছলে চাইল্ড স্বয়ংক্রিয়ভাবে মুছে যাওয়া বা NULL হওয়া)।',
        'কোনো প্যারেন্ট রেকর্ড ডিলিট করা আটকে দেয় যদি তার ওপর কোনো চাইল্ড রেকর্ড নির্ভরশীল থাকে।'
      ]
    },
    {
      id: 'sq7',
      tagEn: 'Analytics & Aggregation',
      tagBn: 'এগ্রিগেট ফাংশন ও হিসাব',
      difficultyEn: 'Common',
      difficultyBn: 'সাধারণ',
      qEn: 'What are SQL aggregate functions and how do they handle NULL values?',
      qBn: 'SQL এগ্রিগেট ফাংশন কী কী এবং এগুলো NULL মানের ক্ষেত্রে কীভাবে আচরণ করে?',
      summaryEn: 'Aggregate functions compute a single scalar value from a column across multiple rows. Most functions (SUM, AVG, MIN, MAX, COUNT(col)) completely ignore NULLs.',
      summaryBn: 'এগ্রিগেট ফাংশন একাধিক সারির একটি নির্দিষ্ট কলামের ওপর হিসাব করে একক মান প্রদান করে। COUNT(*) ছাড়া বাকি সব ফাংশন (SUM, AVG, MIN, MAX) স্বয়ংক্রিয়ভাবে NULL মান বাদ দেয়।',
      bulletsEn: [
        'Standard 5: COUNT(), SUM(), AVG(), MAX(), MIN().',
        'COUNT(*) counts every row (including NULLs); COUNT(column_name) counts only non-NULL rows.',
        'AVG(col) calculates sum / count of NON-NULL items only, which can affect mathematical averages.'
      ],
      bulletsBn: [
        'স্ট্যান্ডার্ড ৫টি ফাংশন: COUNT(), SUM(), AVG(), MAX(), MIN()।',
        'COUNT(*) টেবিলের সব সারি (NULL সহ) গণনা করে; কিন্তু COUNT(col) কেবল non-NULL মানগুলো গুনে।',
        'AVG(col) কেবল non-NULL মানের যোগফল ও সংখ্যা দিয়ে গড় বের করে, যা হিসাবে প্রভাব ফেলতে পারে।'
      ]
    },
    {
      id: 'sq8',
      tagEn: 'Relational Joins',
      tagBn: 'রিলেশনাল জয়েন',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'Explain INNER JOIN vs LEFT JOIN with set theory and practical examples.',
      qBn: 'সেট থিওরি ও বাস্তব উদাহরণের মাধ্যমে INNER JOIN এবং LEFT JOIN-এর পার্থক্য বুঝিয়ে দাও।',
      summaryEn: 'INNER JOIN returns strictly rows where keys match in BOTH tables. LEFT JOIN returns ALL rows from the left table, filling non-matching right table columns with NULL.',
      summaryBn: 'INNER JOIN কেবল উভয় টেবিলে মিল থাকা কমন রেকর্ডগুলো রিটার্ন করে। LEFT JOIN বাম টেবিলের শতভাগ রেকর্ড রিটার্ন করে এবং ডান টেবিলে মিল না থাকলে সেখানে NULL বসায়।',
      bulletsEn: [
        'INNER JOIN = Set Intersection (A ∩ B).',
        'LEFT JOIN = Entire Table A + (A ∩ B). Ideal for finding items with 0 child entries (e.g. students with no courses via WHERE right.id IS NULL).',
        'Performance: INNER JOIN is typically faster because DBMS optimizers can reorder table joins freely.'
      ],
      bulletsBn: [
        'INNER JOIN = সেট ইন্টারসেকশন (A ∩ B)।',
        'LEFT JOIN = পুরো টেবিল A + ম্যাচিং B। কোনো চাইল্ড রেকর্ড নেই এমন তথ্য বের করতে এটি আদর্শ (যেমন: কোনো কোর্সে ভর্তি না হওয়া ছাত্র)।',
        'পারফরম্যান্স: INNER JOIN সাধারণত দ্রুত কাজ করে কারণ ডেটাবেস অপটিমাইজার যেকোনো দিক থেকে জয়েন করতে পারে।'
      ]
    },
    {
      id: 'sq9',
      tagEn: 'Result Optimization',
      tagBn: 'রেজাল্ট সেট অপটিমাইজেশন',
      difficultyEn: 'Standard',
      difficultyBn: 'সাধারণ',
      qEn: 'What does the DISTINCT keyword do and what is its performance consideration?',
      qBn: 'SQL-এ DISTINCT কিওয়ার্ডের কাজ কী এবং এর পারফরম্যান্স বিবেচনা কী?',
      summaryEn: 'SELECT DISTINCT eliminates duplicate rows from the returned result set. It requires an in-memory sort or hash deduplication step, which increases CPU/memory overhead.',
      summaryBn: 'SELECT DISTINCT ফলাফল থেকে হুবহু একই রকম একাধিক সারি বাদ দিয়ে অনন্য মান প্রদর্শন করে। এটি মেমোরিতে অতিরিক্ত সর্টিং বা হ্যাশ অপারেশন চালায় বিধায় বড় টেবিলে সতর্কতা প্রয়োজন।',
      bulletsEn: [
        'Evaluates across all selected columns in the tuple projection.',
        'Performance Cost: Forces sorting or temporary hash tables in RAM/disk.',
        'Best Practice: Do not use DISTINCT as a band-aid for flawed JOIN queries that accidentally duplicate rows.'
      ],
      bulletsBn: [
        'সিলেক্ট করা সবগুলো কলামের সমন্বিত মানের ওপর ভিত্তি করে ডুপ্লিকেট বাদ দেয়।',
        'পারফরম্যান্স খরচ: মেমোরিতে টেম্পোরারি টেবিল বা সর্ট করতে হয়।',
        'বেস্ট প্র্যাকটিস: ভুল জয়েনের কারণে ডুপ্লিকেট তৈরি হলে DISTINCT দিয়ে ধামাচাপা না দিয়ে জয়েন লজিক ঠিক করা উচিত।'
      ]
    },
    {
      id: 'sq10',
      tagEn: 'Pattern Matching & Indexing',
      tagBn: 'প্যাটার্ন ম্যাচিং ও ইনডেক্সিং',
      difficultyEn: 'High Frequency',
      difficultyBn: 'খুব সাধারণ প্রশ্ন',
      qEn: 'Explain the LIKE operator, wildcards (% and _), and index performance pitfalls.',
      qBn: 'LIKE অপারেটর, এর ওয়াইল্ডকার্ড (% এবং _) এবং ইনডেক্স ব্যবহারের পারফরম্যান্স প্রভাব ব্যাখ্যা করো।',
      summaryEn: 'LIKE performs pattern matching on text. "%" represents zero or more characters; "_" represents exactly one character. Leading wildcards prevent B-Tree index lookups.',
      summaryBn: 'LIKE টেক্সটের মধ্যে নির্দিষ্ট প্যাটার্ন খুঁজতে ব্যবহৃত হয়। "%" শূন্য বা একাধিক ক্যারেক্টার এবং "_" ঠিক একটি ক্যারেক্টার নির্দেশ করে। শুরুতে ওয়াইল্ডকার্ড থাকলে ইনডেক্স কাজ করে না।',
      bulletsEn: [
        '"R%" (Starts with R): Can use standard B-Tree index range scans.',
        '"%R" (Ends with R) or "%R%" (Contains R): Cannot use standard B-Tree indexes; forces a full table scan.',
        'Escape characters: Used when searching for literal "%" or "_" characters.'
      ],
      bulletsBn: [
        '"R%" (R দিয়ে শুরু): সাধারণ B-Tree ইনডেক্স ব্যবহার করতে পারে এবং অত্যন্ত দ্রুত ফলাফল দেয়।',
        '"%R" বা "%R%" (মাঝখানে বা শেষে): ইনডেক্স ব্যবহার করতে পারে না; ফলে পুরো টেবিলে ফুল স্ক্যান চালাতে হয়।',
        'এসকেপ ক্যারেক্টার: সরাসরি "%" বা "_" খুঁজতে চাইলে এসকেপ ক্যারেক্টার ব্যবহার করতে হয়।'
      ]
    }
  ];
