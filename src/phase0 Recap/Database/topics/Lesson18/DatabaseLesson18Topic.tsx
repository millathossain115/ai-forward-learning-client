'use client';

import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  BookOpen,
  Layers,
  Table,
  KeyRound,
  Workflow,
  Terminal,
  FileCode2,
  ShieldCheck,
  Search,
  Network,
  Boxes,
  Server,
  Sparkles,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  HelpCircle,
  Zap,
  Scale,
  ChevronDown,
  ChevronUp,
  Play,
  Copy,
  Split,
  Shuffle,
  Monitor,
  Cpu,
  Laptop,
  Building2,
  Users,
  BarChart3,
  Database,
  AlertTriangle,
  TrendingUp,
  Activity,
  FileText,
  Filter,
  Compass,
  Radio,
  Lock,
  Eye,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { TopicId } from '@/config/navigation';

interface DatabaseLesson18TopicProps {
  onNavigate?: (id: TopicId) => void;
}

// 10 Mock Exam MCQs matching Part 15 Section A exactly
interface MCQQuestion {
  id: number;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

const MOCK_MCQ_DATA: MCQQuestion[] = [
  {
    id: 1,
    question: 'Which key uniquely identifies each record in a table?',
    options: [
      { key: 'A', text: 'Foreign Key' },
      { key: 'B', text: 'Primary Key' },
      { key: 'C', text: 'Alternate Key' },
      { key: 'D', text: 'Composite Key' }
    ],
    correct: 'B',
    explanation: 'A Primary Key is a minimal superkey chosen by the database designer to uniquely identify each tuple/record in a relational table without allowing NULL values.'
  },
  {
    id: 2,
    question: 'Which normal form eliminates partial dependency?',
    options: [
      { key: 'A', text: '1NF' },
      { key: 'B', text: '2NF' },
      { key: 'C', text: '3NF' },
      { key: 'D', text: 'BCNF' }
    ],
    correct: 'B',
    explanation: 'Second Normal Form (2NF) mandates that the table is already in 1NF and that every non-prime attribute is fully functionally dependent on the entire candidate key (no partial dependencies).'
  },
  {
    id: 3,
    question: 'Which SQL command removes a table completely?',
    options: [
      { key: 'A', text: 'DELETE' },
      { key: 'B', text: 'UPDATE' },
      { key: 'C', text: 'DROP' },
      { key: 'D', text: 'SELECT' }
    ],
    correct: 'C',
    explanation: 'DROP TABLE is a DDL command that removes both the table definition and all its data permanently from the database catalog.'
  },
  {
    id: 4,
    question: 'Which ACID property guarantees all-or-nothing execution?',
    options: [
      { key: 'A', text: 'Consistency' },
      { key: 'B', text: 'Isolation' },
      { key: 'C', text: 'Durability' },
      { key: 'D', text: 'Atomicity' }
    ],
    correct: 'D',
    explanation: 'Atomicity guarantees that all operations within a transaction execute completely to completion (COMMIT) or, if any operation fails, the database rolls back to its pre-transaction state as if nothing happened.'
  },
  {
    id: 5,
    question: 'Which SQL clause filters grouped records?',
    options: [
      { key: 'A', text: 'WHERE' },
      { key: 'B', text: 'ORDER BY' },
      { key: 'C', text: 'HAVING' },
      { key: 'D', text: 'DISTINCT' }
    ],
    correct: 'C',
    explanation: 'HAVING filters aggregate groups produced by GROUP BY, whereas WHERE filters individual rows before grouping.'
  },
  {
    id: 6,
    question: 'Which join returns all records from the left table?',
    options: [
      { key: 'A', text: 'INNER JOIN' },
      { key: 'B', text: 'LEFT JOIN' },
      { key: 'C', text: 'CROSS JOIN' },
      { key: 'D', text: 'SELF JOIN' }
    ],
    correct: 'B',
    explanation: 'A LEFT (OUTER) JOIN returns all tuples from the left table, padding columns with NULL values whenever there is no corresponding matching record in the right table.'
  },
  {
    id: 7,
    question: 'Which technology is primarily used for analytical processing?',
    options: [
      { key: 'A', text: 'OLTP' },
      { key: 'B', text: 'OLAP' },
      { key: 'C', text: 'DDL' },
      { key: 'D', text: 'DCL' }
    ],
    correct: 'B',
    explanation: 'OLAP (Online Analytical Processing) is designed for complex read-intensive queries, historical aggregation, and multi-dimensional business intelligence.'
  },
  {
    id: 8,
    question: 'Which database model stores information in interconnected nodes and edges?',
    options: [
      { key: 'A', text: 'Hierarchical' },
      { key: 'B', text: 'Relational' },
      { key: 'C', text: 'Graph' },
      { key: 'D', text: 'Key-value' }
    ],
    correct: 'C',
    explanation: 'Graph databases (e.g. Neo4j) store entities as nodes and relationships as edges with direct pointer traversal, making them ideal for social networks and knowledge graphs.'
  },
  {
    id: 9,
    question: 'Who is responsible for database backup and maintenance?',
    options: [
      { key: 'A', text: 'End User' },
      { key: 'B', text: 'DBA' },
      { key: 'C', text: 'Web Designer' },
      { key: 'D', text: 'Network Client' }
    ],
    correct: 'B',
    explanation: 'A Database Administrator (DBA) manages physical database installation, user security, performance tuning, and backup/recovery strategies.'
  },
  {
    id: 10,
    question: 'Which technique discovers products frequently bought together?',
    options: [
      { key: 'A', text: 'Classification' },
      { key: 'B', text: 'Association Rule Mining' },
      { key: 'C', text: 'Normalization' },
      { key: 'D', text: 'Indexing' }
    ],
    correct: 'B',
    explanation: 'Association Rule Mining (such as the Apriori algorithm) analyzes transaction histories to discover co-occurrence relationships (e.g. Market Basket Analysis: Bread & Butter -> Milk).'
  }
];

// 18 Lessons Roadmap Data
const LESSON_ROADMAP = [
  { num: 1, title: 'Introduction to Databases', category: 'Foundations', focus: 'Data, Information, Database vs File Systems, DBMS architecture' },
  { num: 2, title: 'Types of Databases & Models', category: 'Foundations', focus: 'Hierarchical, Network, Relational, Object-Oriented, NoSQL' },
  { num: 3, title: 'Relational Database Model', category: 'Design', focus: 'Codd rules, Tuples, Attributes, Relational Schema, Constraints' },
  { num: 4, title: 'Keys in DBMS', category: 'Design', focus: 'Primary, Candidate, Super, Alternate, Foreign, Composite Keys' },
  { num: 5, title: 'ER Model & Diagrams', category: 'Design', focus: 'Entities, Attributes, Relationships, Cardinality (1:1, 1:N, M:N)' },
  { num: 6, title: 'Introduction to SQL', category: 'SQL', focus: 'DDL, DML, DQL, SELECT, WHERE, ORDER BY, Operators' },
  { num: 7, title: 'Advanced SQL Queries', category: 'SQL', focus: 'Joins, Subqueries, Group By, Having, Aggregate functions' },
  { num: 8, title: 'Database Normalization', category: 'Design', focus: 'Anomalies, Functional Dependencies, 1NF, 2NF, 3NF, BCNF' },
  { num: 9, title: 'Transactions & Concurrency', category: 'Core DBMS', focus: 'ACID properties, Schedules, 2PL, Deadlocks, Serializability' },
  { num: 10, title: 'Indexing & Query Optimization', category: 'Performance', focus: 'B-Trees, B+ Trees, Clustered/Non-clustered, Query Cost' },
  { num: 11, title: 'Security, Backup & Recovery', category: 'Security & Ops', focus: 'RBAC, GRANT/REVOKE, WAL, Full/Diff/Log Backups, PITR' },
  { num: 12, title: 'Distributed Databases & DDBMS', category: 'Distributed', focus: 'Fragmentation, Replication, 2PC, Brewer CAP Theorem' },
  { num: 13, title: 'NoSQL & Modern Databases', category: 'Modern', focus: 'Key-Value, Document, Column-Family, Graph, Sharding' },
  { num: 14, title: 'Database Security & Authorization', category: 'Security & Ops', focus: 'CIA Triad, SQL Injection prevention, Auditing, Encryption' },
  { num: 15, title: 'Database Administration (DBA)', category: 'Security & Ops', focus: 'DBA roles, NOC telemetry, High Availability, Disaster Recovery' },
  { num: 16, title: 'Distributed DBMS Architectures', category: 'Distributed', focus: 'Peer-to-Peer, 3-Tier Web, Homogeneous vs Heterogeneous' },
  { num: 17, title: 'Data Warehousing & Data Mining', category: 'Analytics', focus: 'Inmon 4 characteristics, ETL, OLTP vs OLAP, KDD Process' },
  { num: 18, title: 'Complete DBMS Revision & Mock Exam', category: 'Revision', focus: 'Syllabus synthesis, 14 comparisons, 60-mark mock exam' }
];

// Top 14 Quick Comparison Matrix Data
const COMPARISON_DATA = [
  {
    id: 1,
    topic1: 'Database',
    topic2: 'DBMS',
    point: 'Data Collection vs. Management Software',
    desc1: 'A structured collection of logically related data stored on physical disk.',
    desc2: 'Software program (e.g. MySQL, PostgreSQL, Oracle) enabling users to store, query, update, and manage data.',
    keyDiff: 'Database is the storage container; DBMS is the management engine.'
  },
  {
    id: 2,
    topic1: 'Primary Key',
    topic2: 'Foreign Key',
    point: 'Unique Identification vs. Table Referencing',
    desc1: 'Minimal superkey chosen to uniquely identify each record. Strictly unique, non-null.',
    desc2: 'Attribute in one table that references the primary key of another table, enforcing referential integrity.',
    keyDiff: 'Primary Key guarantees row uniqueness; Foreign Key links separate tables together.'
  },
  {
    id: 3,
    topic1: 'DDL (Data Definition Language)',
    topic2: 'DML (Data Manipulation Language)',
    point: 'Schema Structure vs. Record Content',
    desc1: 'Defines, alters, and drops database schema objects (CREATE, ALTER, DROP, TRUNCATE).',
    desc2: 'Operates on the actual row data inside tables (INSERT, UPDATE, DELETE).',
    keyDiff: 'DDL modifies table blueprint/catalog; DML modifies tuple instances.'
  },
  {
    id: 4,
    topic1: 'DELETE',
    topic2: 'DROP',
    point: 'Row Removal vs. Table Object Destruction',
    desc1: 'DML statement that deletes specified or all rows. Table structure, indexes, and triggers remain intact.',
    desc2: 'DDL statement that permanently removes the entire table structure and data from the database catalog.',
    keyDiff: 'DELETE leaves an empty table; DROP destroys the table blueprint completely.'
  },
  {
    id: 5,
    topic1: 'DELETE',
    topic2: 'TRUNCATE',
    point: 'Logged Row-by-Row vs. Deallocate Pages',
    desc1: 'DML command. Removes rows individually, writes undo/redo WAL logs per row, allows WHERE filters, can be rolled back.',
    desc2: 'DDL command. Deallocates entire storage data pages, resets identity seeds, faster, cannot filter rows.',
    keyDiff: 'DELETE is selective and fully logged; TRUNCATE wipes the entire table in bulk.'
  },
  {
    id: 6,
    topic1: 'WHERE Clause',
    topic2: 'HAVING Clause',
    point: 'Individual Row Filter vs. Aggregate Group Filter',
    desc1: 'Filters individual rows BEFORE grouping or aggregation takes place.',
    desc2: 'Filters aggregated groups AFTER the GROUP BY clause has evaluated.',
    keyDiff: 'WHERE cannot accept aggregate functions; HAVING is built specifically for aggregates.'
  },
  {
    id: 7,
    topic1: 'CHAR(n)',
    topic2: 'VARCHAR(n)',
    point: 'Fixed Length vs. Variable Length String',
    desc1: 'Fixed length of n characters. Always consumes n bytes on disk, padding unused spaces with blanks.',
    desc2: 'Variable length up to n characters. Only consumes the actual length of characters plus length prefix bytes.',
    keyDiff: 'CHAR is faster for fixed strings (e.g. Postal Codes, MD5); VARCHAR saves storage for dynamic text.'
  },
  {
    id: 8,
    topic1: 'INNER JOIN',
    topic2: 'LEFT JOIN',
    point: 'Intersection Only vs. Left Preservation',
    desc1: 'Returns only records that have matching keys in BOTH left and right tables.',
    desc2: 'Returns ALL records from the left table, plus matched records from the right table (NULL for unmatched).',
    keyDiff: 'INNER JOIN drops non-matching left rows; LEFT JOIN preserves all left rows.'
  },
  {
    id: 9,
    topic1: '1NF (First Normal Form)',
    topic2: '2NF (Second Normal Form)',
    point: 'Atomicity vs. Elimination of Partial Dependency',
    desc1: 'Ensures each column contains single atomic values with no repeating groups or nested arrays.',
    desc2: 'Meets 1NF and ensures every non-prime attribute depends on the FULL candidate key, not a partial subset.',
    keyDiff: '1NF fixes multi-valued cells; 2NF eliminates partial dependencies on composite primary keys.'
  },
  {
    id: 10,
    topic1: '2NF (Second Normal Form)',
    topic2: '3NF (Third Normal Form)',
    point: 'Full Key Dependency vs. Elimination of Transitive Dependency',
    desc1: 'Eliminates non-prime attributes depending on only a piece of a composite primary key.',
    desc2: 'Meets 2NF and ensures no non-prime attribute depends on another non-prime attribute (X -> Y -> Z).',
    keyDiff: '2NF stops partial key dependencies; 3NF stops non-key to non-key transitive dependencies.'
  },
  {
    id: 11,
    topic1: 'OLTP (Online Transaction Processing)',
    topic2: 'OLAP (Online Analytical Processing)',
    point: 'Operational Transactions vs. Historical Analytics',
    desc1: 'Powers real-time day-to-day operations (ATM, e-commerce checkout). High-concurrency, short read/write queries.',
    desc2: 'Powers business intelligence, reporting, and forecasting. Complex analytical queries over large historical datasets.',
    keyDiff: 'OLTP optimizes writes & current state; OLAP optimizes complex read aggregations.'
  },
  {
    id: 12,
    topic1: 'SQL (Relational)',
    topic2: 'NoSQL (Non-Relational)',
    point: 'Predefined Relational Schema vs. Flexible Multi-Model',
    desc1: 'Rigid tabular schema, ACID guarantees, relational algebra, standard SQL dialect (e.g. MySQL, PostgreSQL).',
    desc2: 'Flexible schema, BASE consistency, horizontal sharding, document/key-value/graph models (e.g. MongoDB, Redis).',
    keyDiff: 'SQL prioritizes ACID and schema integrity; NoSQL prioritizes scale and flexible models.'
  },
  {
    id: 13,
    topic1: 'Classification',
    topic2: 'Clustering',
    point: 'Supervised Labeling vs. Unsupervised Grouping',
    desc1: 'Supervised learning. Classifies data into predefined labeled classes using trained historical models.',
    desc2: 'Unsupervised learning. Discovers natural groupings and clusters in unlabelled data based on similarity.',
    keyDiff: 'Classification uses predefined class labels; Clustering discovers previously unknown clusters.'
  },
  {
    id: 14,
    topic1: 'Database Backup',
    topic2: 'Database Recovery',
    point: 'Copy Creation vs. State Restoration',
    desc1: 'The process of capturing and archiving copies of database files, logs, and catalogs to external storage.',
    desc2: 'The process of restoring the database to a consistent operational state following hardware or software failure.',
    keyDiff: 'Backup is the preventative insurance; Recovery is the disaster restoration.'
  }
];

// Top 20 University Broad Questions
const TOP_20_BROAD_QUESTIONS = [
  // Section A: Database Fundamentals
  {
    id: 'bq1',
    sec: 'Section A: Fundamentals',
    q: 'Q1: Define Database and DBMS. Explain the advantages of DBMS over File Processing Systems.',
    a: `1. Definition:\n• Database: An organized, integrated collection of logically related data stored electronically on physical storage.\n• DBMS (Database Management System): Software suite (e.g. PostgreSQL, Oracle) enabling users to define, construct, query, update, and administer databases.\n\n2. Key Advantages of DBMS over File Processing Systems:\n• Redundancy Reduction: Normalization eliminates duplicate data across department files.\n• Data Consistency: Single source of truth prevents conflicting versions of records.\n• Concurrent Access & Isolation: ACID transactions and 2PL prevent race conditions and lost updates.\n• Data Integrity: Declarative constraints (PRIMARY KEY, FOREIGN KEY, CHECK, NOT NULL) guarantee validity.\n• Data Security & Authorization: Granular RBAC permissions with SQL GRANT and REVOKE.\n• Crash Recovery: Write-Ahead Logging (WAL) ensures committed transactions survive sudden power loss.`
  },
  {
    id: 'bq2',
    sec: 'Section A: Fundamentals',
    q: 'Q2: Explain different database models (Hierarchical, Network, Relational, NoSQL) with suitable architectural diagrams.',
    a: `1. Hierarchical Model (Tree Structure):\n• Organizes data in an inverted tree where each child has exactly ONE parent (1:N).\n• Example: IBM IMS. Fast 1:N traversals, but poor M:N support and rigid navigation.\n\n2. Network Model (Graph Structure):\n• Developed by CODASYL. Allows a record to have MULTIPLE parent records (M:N).\n• High flexibility, but pointer spaghetti and high programmer complexity.\n\n3. Relational Model (Codd's Relational Tables):\n• Organizes data into mathematical relations (tables) composed of tuples (rows) and attributes (columns).\n• Declarative SQL queries, independent of physical storage pointers.\n\n4. NoSQL Model (Modern Multi-Model):\n• Document (MongoDB BSON), Key-Value (Redis), Column-Family (Cassandra), Graph (Neo4j).\n• Designed for massive scale, schema flexibility, and distributed sharding.`
  },
  {
    id: 'bq3',
    sec: 'Section A: Fundamentals',
    q: 'Q3: Explain the ANSI/SPARC Three-Schema Architecture of DBMS and its role in Data Independence.',
    a: `The Three-Schema Architecture divides the database system into three abstraction layers:\n\n1. External Level (View Schema):\n• Individual user/application views (e.g., student view, accounts view). Hides irrelevant data.\n\n2. Conceptual Level (Logical Schema):\n• Complete global logical structure of the database: all entities, attributes, relationships, constraints. Independent of physical disks.\n\n3. Internal Level (Physical Schema):\n• Physical storage layout, file organizations, B-Tree indexes, page formats, compression, encryption.\n\nData Independence:\n• Logical Data Independence: The ability to modify the conceptual schema (e.g. adding columns/tables) without breaking existing external views or applications.\n• Physical Data Independence: The ability to modify the physical schema (e.g. adding B-Tree indexes, moving to SSDs) without altering the logical schema.`
  },
  {
    id: 'bq4',
    sec: 'Section A: Fundamentals',
    q: 'Q4: What is Data Independence? Explain Physical vs. Logical Data Independence with practical examples.',
    a: `Data Independence is the separation of data definitions from the application programs that access them.\n\n1. Logical Data Independence:\n• Definition: The capacity to change the conceptual schema without having to rewrite external programs or user views.\n• Example: Adding a new attribute 'MiddleName' or splitting a table into two normalized tables; an external view can still project 'FullName' using a view definition without breaking front-end code.\n\n2. Physical Data Independence:\n• Definition: The capacity to change the internal/physical storage structures without changing the conceptual schema.\n• Example: Adding a B-Tree index on 'Students(CGPA)' or switching storage from HDD to NVMe SSD; SQL queries (SELECT * FROM Students WHERE CGPA > 3.5) execute identically, only faster.`
  },
  {
    id: 'bq5',
    sec: 'Section A: Fundamentals',
    q: 'Q5: Explain the different types of Database Keys (Super, Candidate, Primary, Alternate, Foreign, Composite) with examples.',
    a: `Given Table Students(Student_ID, Email, National_ID, Name, Department):\n\n1. Super Key: Any set of attributes that uniquely identifies a row. (e.g. {Student_ID}, {Student_ID, Name}, {Email, Name}).\n2. Candidate Key: A minimal Super Key with no extraneous attributes. (e.g. {Student_ID}, {Email}, {National_ID}).\n3. Primary Key: The chosen candidate key by the DBA to uniquely identify tuples. Cannot be NULL. (e.g. Student_ID).\n4. Alternate Key: Candidate keys that were not chosen as the primary key. (e.g. Email, National_ID).\n5. Foreign Key: An attribute referencing the primary key of another table, maintaining referential integrity. (e.g. Dept_ID referencing Departments(Dept_ID)).\n6. Composite Key: A key made up of two or more attributes combined to guarantee uniqueness. (e.g. {StudentID, CourseCode} in Enrollments).`
  },
  // Section B: Database Design and SQL
  {
    id: 'bq6',
    sec: 'Section B: Design & SQL',
    q: 'Q6: Explain the Entity-Relationship (ER) Model. Discuss Entities, Attributes, and Relationships with notations.',
    a: `The ER Model represents the conceptual design of a database before physical creation:\n\n1. Entity: A distinct real-world object (represented as a Rectangle). e.g., Student, Course.\n• Strong Entity: Has a primary key.\n• Weak Entity: Depends on a strong entity for existence; has a partial key/discriminator (represented as a Double Rectangle).\n\n2. Attribute: A property describing an entity (represented as an Oval/Ellipse).\n• Key Attribute: Underlined (Primary Key).\n• Composite Attribute: Divided into smaller sub-parts (e.g. Name -> First, Last).\n• Multi-valued Attribute: Double Oval (e.g. PhoneNumbers).\n• Derived Attribute: Dashed Oval (e.g. Age computed from DateOfBirth).\n\n3. Relationship: Association between entities (represented as a Diamond). e.g., Student ENROLLS_IN Course.`
  },
  {
    id: 'bq7',
    sec: 'Section B: Design & SQL',
    q: 'Q7: Explain the different types of Cardinality Ratios (1:1, 1:N, M:N) in an ER Diagram with examples.',
    a: `Cardinality constraints specify the maximum number of relationship instances an entity can participate in:\n\n1. One-to-One (1:1):\n• One record in Entity A relates to at most one record in Entity B, and vice-versa.\n• Example: Citizen (1) <--- HOLDS ---> (1) Passport.\n\n2. One-to-Many (1:N):\n• One record in Entity A can relate to multiple records in Entity B, but each record in B relates to only one in A.\n• Example: Department (1) <--- EMPLOYS ---> (N) Instructors.\n\n3. Many-to-Many (M:N):\n• Multiple records in Entity A can relate to multiple records in Entity B.\n• Example: Students (M) <--- ENROLL_IN ---> (N) Courses.\n• Implementation Rule: M:N relationships must be decomposed into two 1:N relationships via an intermediate Junction Table (Enrollments) with a composite primary key.`
  },
  {
    id: 'bq8',
    sec: 'Section B: Design & SQL',
    q: 'Q8: Explain Database Normalization. Detail 1NF, 2NF, 3NF, and BCNF with functional dependencies and examples.',
    a: `Normalization systematically organizes relations to eliminate insertion, update, and deletion anomalies while minimizing redundancy.\n\n1. 1NF (Atomic Values):\n• Each cell must contain exactly one atomic scalar value. No repeating groups or comma-separated lists.\n\n2. 2NF (No Partial Dependency):\n• Relation must be in 1NF.\n• Every non-prime attribute must depend on the WHOLE candidate key, not a partial subset.\n• Rule: If key is (StudentID, CourseID), Grade depends on both (Valid), but CourseName depends only on CourseID (Partial Dependency -> violates 2NF).\n\n3. 3NF (No Transitive Dependency):\n• Relation must be in 2NF.\n• For every non-trivial functional dependency X -> A, either X is a Superkey OR A is a Prime attribute.\n• Rule: StudentID -> DeptID -> DeptBuilding violates 3NF because DeptBuilding depends transitively on DeptID.\n\n4. BCNF (Boyce-Codd Normal Form):\n• Stricter version of 3NF.\n• For EVERY non-trivial dependency X -> Y, X MUST be a Superkey.`
  },
  {
    id: 'bq9',
    sec: 'Section B: Design & SQL',
    q: 'Q9: Explain Functional Dependency and its inference rules (Armstrong\'s Axioms).',
    a: `A Functional Dependency X -> Y expresses a constraint between two attribute sets: if two tuples agree on X, they MUST agree on Y.\n\nArmstrong's Axioms (Sound and Complete inference rules):\n1. Reflexivity: If Y is a subset of X, then X -> Y. (e.g. {StudentID, Name} -> StudentID).\n2. Augmentation: If X -> Y, then XZ -> YZ for any attribute set Z.\n3. Transitivity: If X -> Y and Y -> Z, then X -> Z.\n\nSecondary Derived Rules:\n• Union Rule: If X -> Y and X -> Z, then X -> YZ.\n• Decomposition Rule: If X -> YZ, then X -> Y and X -> Z.\n• Pseudo-transitivity: If X -> Y and WY -> Z, then WX -> Z.`
  },
  {
    id: 'bq10',
    sec: 'Section B: Design & SQL',
    q: 'Q10: Classify SQL commands into DDL, DML, DQL, DCL, and TCL. Provide syntax and examples for each.',
    a: `1. DDL (Data Definition Language):\n• Commands: CREATE, ALTER, DROP, TRUNCATE.\n• Example: CREATE TABLE Students (ID INT PRIMARY KEY, Name VARCHAR(50));\n\n2. DML (Data Manipulation Language):\n• Commands: INSERT, UPDATE, DELETE.\n• Example: UPDATE Students SET CGPA = 3.90 WHERE ID = 101;\n\n3. DQL (Data Query Language):\n• Command: SELECT.\n• Example: SELECT Department, AVG(CGPA) FROM Students GROUP BY Department HAVING AVG(CGPA) > 3.5;\n\n4. DCL (Data Control Language):\n• Commands: GRANT, REVOKE.\n• Example: GRANT SELECT, INSERT ON Students TO user_alice;\n\n5. TCL (Transaction Control Language):\n• Commands: COMMIT, ROLLBACK, SAVEPOINT.\n• Example: COMMIT;`
  },
  // Section C: Advanced DBMS
  {
    id: 'bq11',
    sec: 'Section C: Advanced DBMS',
    q: 'Q11: Explain ACID Properties of a Database Transaction with real-world banking examples.',
    a: `A transaction is a logical unit of database work (e.g. transferring ৳1,000 from Account A to Account B):\n\n1. Atomicity (All or Nothing):\n• Either both steps (Debit A and Credit B) complete successfully, or if a crash happens midway, the database rolls back completely to the initial state.\n\n2. Consistency (Preserves Invariants):\n• The total sum of money in A and B before the transfer ($A + $B) must equal the total sum after the transfer. Schema constraints and checks remain satisfied.\n\n3. Isolation (Independent Execution):\n• Concurrent transactions cannot see partial uncommitted states of each other. Implemented via locking protocols or MVCC.\n\n4. Durability (Survives Crashes):\n• Once a transaction receives a COMMIT confirmation, its changes are permanently written to non-volatile storage/WAL and will survive subsequent power loss.`
  },
  {
    id: 'bq12',
    sec: 'Section C: Advanced DBMS',
    q: 'Q12: Explain Concurrency Control in DBMS. Describe the four major concurrency anomalies and Two-Phase Locking (2PL).',
    a: `Concurrency Control coordinates simultaneous transactions to prevent data inconsistency.\n\n1. Concurrency Anomalies:\n• Lost Update: Two transactions overwrite each other\'s updates without seeing intermediate values.\n• Dirty Read: Transaction reads uncommitted data that is subsequently rolled back.\n• Non-Repeatable Read: Transaction reads a row twice but gets different values because another transaction modified it.\n• Phantom Read: Transaction runs a range query twice, but new rows inserted by another transaction appear.\n\n2. Two-Phase Locking (2PL) Protocol:\n• Growing Phase: Transaction acquires locks; cannot release any lock.\n• Shrinking Phase: Transaction releases locks; cannot acquire any new locks.\n• Guarantee: 2PL guarantees Conflict Serializability, preventing inconsistent interleaved schedules.`
  },
  {
    id: 'bq13',
    sec: 'Section C: Advanced DBMS',
    q: 'Q13: Explain Database Indexing. Compare B-Trees, B+ Trees, and explain how the Query Optimizer uses them.',
    a: `An index is an auxiliary data structure that accelerates data retrieval without full table scans.\n\n1. B-Tree vs. B+ Tree:\n• B-Tree: Keys and record data pointers are stored in both internal nodes and leaf nodes.\n• B+ Tree: Internal nodes store ONLY routing keys. All actual data pointers reside exclusively in leaf nodes. Leaf nodes are linked via a bidirectional linked list.\n• Why DBMS Uses B+ Trees: Faster sequential range scans (following leaf pointers) and higher fan-out (internal nodes hold more keys per page).\n\n2. Query Optimizer:\n• Uses cost-based models (CPU + I/O costs) and table statistics.\n• Decides whether an Index Seek (O(log N)) is cheaper than a Sequential Scan (O(N)) based on predicate selectivity.`
  },
  {
    id: 'bq14',
    sec: 'Section C: Advanced DBMS',
    q: 'Q14: Compare Relational (SQL) and NoSQL databases. Explain the 4 NoSQL archetypes with use cases.',
    a: `Comparison Matrix:\n• Data Model: Relational uses tables/tuples; NoSQL uses documents, key-values, columns, or graphs.\n• Schema: SQL has strict predefined schema; NoSQL is schema-flexible/dynamic.\n• Scaling: SQL scales vertically (CPU/RAM); NoSQL scales horizontally across commodity clusters.\n• Transactions: SQL emphasizes strict ACID; NoSQL emphasizes BASE (Basically Available, Soft-state, Eventual consistency).\n\n4 NoSQL Archetypes:\n1. Key-Value (Redis): High-speed caching, session management.\n2. Document (MongoDB): Hierarchical JSON/BSON, content management, mobile apps.\n3. Column-Family (Apache Cassandra): High-throughput timeseries, IoT telemetry.\n4. Graph (Neo4j): Social graphs, recommendation engines, fraud rings.`
  },
  {
    id: 'bq15',
    sec: 'Section C: Advanced DBMS',
    q: 'Q15: Explain Database Security. Detail Authentication, Authorization, RBAC, CIA Triad, and SQL Injection prevention.',
    a: `1. CIA Triad:\n• Confidentiality: Restricting access to authorized users only.\n• Integrity: Preventing unauthorized data modifications.\n• Availability: Ensuring system uptime and fast recovery during disasters.\n\n2. Authentication vs Authorization:\n• Authentication: Proves WHO the user is (passwords, MFA, Kerberos).\n• Authorization: Determines WHAT an authenticated user can do (GRANT/REVOKE privileges).\n\n3. Role-Based Access Control (RBAC):\n• Privileges are granted to Roles (e.g. 'accountant', 'student'), and users are assigned to roles, avoiding ad-hoc permissions.\n\n4. SQL Injection (SQLi) Prevention:\n• SQLi occurs when untrusted input concatenates into SQL commands.\n• Prevention: Always use Parameterized Prepared Statements, stored procedures, input whitelisting, and principle of least privilege.`
  },
  // Section D: Modern Database Systems
  {
    id: 'bq16',
    sec: 'Section D: Modern Systems',
    q: 'Q16: Explain the roles, responsibilities, and types of Database Administrators (DBA).',
    a: `1. Role of a DBA:\nA specialized IT professional responsible for the operational management, security, availability, and performance of enterprise database systems.\n\n2. Core Responsibilities:\n• Installation & Configuration: Provisioning database instances and storage.\n• User Security: Creating accounts, roles, and auditing access.\n• Backup & Recovery: Establishing RPO/RTO strategies and testing PITR restore drills.\n• Performance Tuning: Monitoring query execution times, slow query logs, and index optimization.\n• High Availability & Disaster Recovery: Managing primary-replica clusters, failover, and replication.\n\n3. Types of DBAs:\n• Production DBA: Focuses on 24/7 uptime, backup/recovery, and NOC incident response.\n• Development DBA: Collaborates with engineers on schema design, query optimization, and migrations.\n• System DBA: Manages database binaries, operating system patches, and hardware clustering.`
  },
  {
    id: 'bq17',
    sec: 'Section D: Modern Systems',
    q: 'Q17: What is a Distributed Database? Explain Data Fragmentation, Replication, Allocation, and Two-Phase Commit (2PC).',
    a: `A Distributed Database is a collection of logically related data stored across multiple interconnected physical servers.\n\n1. Data Fragmentation:\n• Horizontal: Slices rows using selection (WHERE City = 'Dhaka').\n• Vertical: Slices columns using projection (keeping Primary Key in all fragments).\n• Hybrid: Combines horizontal and vertical partitioning.\n\n2. Data Replication:\n• Storing identical copies across multiple sites (Full, Partial, or No Replication). Enhances read performance and fault tolerance.\n\n3. Data Allocation:\n• Strategy determining which physical nodes store which fragments.\n\n4. Two-Phase Commit (2PC):\n• Phase 1 (Prepare): Coordinator queries all nodes if they are ready to commit. Nodes vote YES or NO.\n• Phase 2 (Commit/Abort): If all vote YES, coordinator commands GLOBAL COMMIT; if any node votes NO, coordinator commands GLOBAL ABORT.`
  },
  {
    id: 'bq18',
    sec: 'Section D: Modern Systems',
    q: 'Q18: Explain Data Warehousing and the ETL Pipeline. Discuss the 4 Inmon characteristics.',
    a: `1. Definition:\nA Data Warehouse is a centralized relational repository optimized for business intelligence, OLAP, and decision support.\n\n2. Bill Inmon\'s 4 Defining Characteristics:\n• Subject-Oriented: Organized around major enterprise subjects (Sales, Customers) rather than daily processes.\n• Integrated: Harmonizes disparate data formats, codings, and schemas into a single global standard.\n• Time-Variant: Maintains decades of historical snapshots with explicit time timestamps.\n• Non-Volatile: Read-only for analytical reporting; data is appended and never updated in place.\n\n3. ETL Pipeline:\n• Extract: Collect raw transactions from ERP, CRM, and flat logs.\n• Transform: Cleanse missing values, standardize datatypes, enrich dimensions.\n• Load: Batch write transformed star/snowflake dimensional schemas into data marts or enterprise data warehouses.`
  },
  {
    id: 'bq19',
    sec: 'Section D: Modern Systems',
    q: 'Q19: Define Data Mining. Explain 5 major Data Mining techniques and the 8-step KDD Process.',
    a: `1. Definition:\nData Mining is the computational process of discovering non-trivial, previously unknown, and actionable patterns from large datasets.\n\n2. 5 Major Techniques:\n• Classification: Assigns records to predefined categories (e.g. Loan Risk: High/Low).\n• Clustering: Groups items by natural mathematical similarity without pre-existing labels (Customer Segmentation).\n• Association Rule Mining: Identifies co-occurrence rules (Market Basket: Bread -> Butter with Support & Confidence).\n• Prediction: Forecasts continuous numerical targets using historical trends (Regression).\n• Anomaly Detection: Detects outliers and rare fraudulent transactions.\n\n3. 8-Step KDD Process:\n1. Domain Understanding -> 2. Data Selection -> 3. Data Cleaning -> 4. Data Transformation -> 5. Data Mining -> 6. Pattern Evaluation -> 7. Knowledge Presentation -> 8. Decision Action.`
  },
  {
    id: 'bq20',
    sec: 'Section D: Modern Systems',
    q: 'Q20: Differentiate between OLTP and OLAP across 10 technical parameters.',
    a: `OLTP vs. OLAP Comparison:\n1. Purpose: Operational business workflows vs. Analytical decision making.\n2. Queries: Simple, short read/write transactions vs. Complex aggregated analytical queries.\n3. Data Scope: Current real-time data vs. Decades of historical snapshots.\n4. Design: Highly normalized (3NF/BCNF) vs. Denormalized Star/Snowflake schemas.\n5. Operations: Heavy INSERT, UPDATE, DELETE vs. Heavy SELECT aggregations (COUNT, SUM, AVG).\n6. Concurrency: Thousands of concurrent users vs. Dozens of analysts/data scientists.\n7. Response Time: Sub-second (milliseconds) vs. Seconds to minutes.\n8. Latency: Immediate real-time vs. Periodic batch ETL refresh.\n9. Database Size: Gigabytes to low Terabytes vs. Terabytes to Petabytes.\n10. Example: ATM cash withdrawal vs. Annual nationwide profitability analysis.`
  }
];

// 5 SQL Practical Exercises
const SQL_PRACTICAL_EXERCISES = [
  {
    id: 1,
    title: 'Exercise 1: Display All Employees',
    instruction: 'Write an SQL query to retrieve all records and columns from the Employees table.',
    solution: 'SELECT * FROM Employees;',
    explanation: 'The asterisk (*) wildcard selects all columns, and omitting the WHERE clause retrieves all rows from the Employees relation.',
    resultRows: [
      { id: 1, name: 'Rahim', dept: 'IT', salary: 50000 },
      { id: 2, name: 'Karim', dept: 'HR', salary: 40000 },
      { id: 3, name: 'Nila', dept: 'IT', salary: 60000 },
      { id: 4, name: 'Sara', dept: 'Finance', salary: 45000 },
      { id: 5, name: 'Rafi', dept: 'HR', salary: 55000 }
    ]
  },
  {
    id: 2,
    title: 'Exercise 2: High Salary Filter',
    instruction: 'Write an SQL query to find employees whose salary is strictly greater than 45000.',
    solution: 'SELECT * FROM Employees WHERE Salary > 45000;',
    explanation: 'The WHERE clause applies a predicate filter on each tuple, keeping only employees with a Salary exceeding 45,000.',
    resultRows: [
      { id: 1, name: 'Rahim', dept: 'IT', salary: 50000 },
      { id: 3, name: 'Nila', dept: 'IT', salary: 60000 },
      { id: 5, name: 'Rafi', dept: 'HR', salary: 55000 }
    ]
  },
  {
    id: 3,
    title: 'Exercise 3: Descending Salary Order',
    instruction: 'Write an SQL query to display all employees sorted in descending order of their salary.',
    solution: 'SELECT * FROM Employees ORDER BY Salary DESC;',
    explanation: 'ORDER BY sorts the returned result set; the DESC keyword specifies descending order from highest to lowest salary.',
    resultRows: [
      { id: 3, name: 'Nila', dept: 'IT', salary: 60000 },
      { id: 5, name: 'Rafi', dept: 'HR', salary: 55000 },
      { id: 1, name: 'Rahim', dept: 'IT', salary: 50000 },
      { id: 4, name: 'Sara', dept: 'Finance', salary: 45000 },
      { id: 2, name: 'Karim', dept: 'HR', salary: 40000 }
    ]
  },
  {
    id: 4,
    title: 'Exercise 4: Calculate Average Salary',
    instruction: 'Write an SQL query to calculate the average salary of all employees in the organization.',
    solution: 'SELECT AVG(Salary) AS Average_Salary FROM Employees;',
    explanation: 'AVG() is an aggregate function that sums all salary values and divides by the total row count (250,000 / 5 = 50,000).',
    resultRows: [
      { id: 1, name: 'Average_Salary', dept: 'Organization Wide', salary: 50000 }
    ]
  },
  {
    id: 5,
    title: 'Exercise 5: Employee Count by Department',
    instruction: 'Write an SQL query to count the total number of employees in each department.',
    solution: 'SELECT Department, COUNT(*) AS Total_Employees FROM Employees GROUP BY Department;',
    explanation: 'GROUP BY aggregates rows sharing identical department values, and COUNT(*) counts the occurrences per group.',
    resultRows: [
      { id: 1, name: 'Finance Department', dept: 'Finance', salary: 1 },
      { id: 2, name: 'HR Department', dept: 'HR', salary: 2 },
      { id: 3, name: 'IT Department', dept: 'IT', salary: 2 }
    ]
  }
];

export default function DatabaseLesson18Topic({ onNavigate }: DatabaseLesson18TopicProps) {
  // Navigation & Category Filters
  const [syllabusFilter, setSyllabusFilter] = useState<string>('all');
  const [activeModelTab, setActiveModelTab] = useState<'hierarchical' | 'network' | 'relational' | 'nosql'>('relational');
  const [activeKeyTab, setActiveKeyTab] = useState<'pk' | 'fk' | 'ck' | 'sk' | 'ak' | 'comp'>('pk');
  const [erCardinality, setErCardinality] = useState<'1:1' | '1:N' | 'M:N'>('1:N');
  const [normStage, setNormStage] = useState<'1NF' | '2NF' | '3NF' | 'BCNF'>('1NF');
  const [sqlCategory, setSqlCategory] = useState<'DDL' | 'DML' | 'DQL' | 'DCL' | 'TCL'>('DQL');
  const [activeSqlDemo, setActiveSqlDemo] = useState<string>('select_all');
  const [sqlJoinType, setSqlJoinType] = useState<'inner' | 'left' | 'right' | 'full'>('inner');
  const [acidProp, setAcidProp] = useState<'A' | 'C' | 'I' | 'D'>('A');
  const [concurrencyBug, setConcurrencyBug] = useState<'lost' | 'dirty' | 'repeat' | 'phantom'>('lost');
  const [noSqlArchetype, setNoSqlArchetype] = useState<'kv' | 'doc' | 'col' | 'graph'>('doc');
  const [ciaComponent, setCiaComponent] = useState<'C' | 'I' | 'A'>('C');
  const [activeComparisonIdx, setActiveComparisonIdx] = useState<number>(0);
  const [activeDiagramIdx, setActiveDiagramIdx] = useState<number>(0);

  // University Mock Exam State (60 Marks Total: 10 MCQ + 20 Short + 30 Broad)
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(false);
  const [shortQAnswers, setShortQAnswers] = useState<Record<string, string>>({});
  const [shortQRevealed, setShortQRevealed] = useState<Record<string, boolean>>({});
  const [broadQOpen, setBroadQOpen] = useState<Record<string, boolean>>({});

  // SQL Exercises State
  const [sqlInputs, setSqlInputs] = useState<Record<number, string>>({});
  const [sqlRevealed, setSqlRevealed] = useState<Record<number, boolean>>({});

  // Final 15-Item Revision Checklist
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});

  const toggleChecklist = (idx: number) => {
    setChecklist(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const checklistProgress = useMemo(() => {
    const checkedCount = Object.values(checklist).filter(Boolean).length;
    return Math.round((checkedCount / 15) * 100);
  }, [checklist]);

  const mcqScore = useMemo(() => {
    let score = 0;
    MOCK_MCQ_DATA.forEach(q => {
      if (mcqAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  }, [mcqAnswers]);

  const filteredRoadmap = useMemo(() => {
    if (syllabusFilter === 'all') return LESSON_ROADMAP;
    return LESSON_ROADMAP.filter(item => item.category.toLowerCase() === syllabusFilter.toLowerCase());
  }, [syllabusFilter]);

  return (
    <div className="space-y-12 pb-24 text-zinc-100 font-sans max-w-7xl mx-auto px-4 sm:px-6">
      {/* ========================================================
          HERO & MILESTONE HEADER (LESSON 18 OF 18)
         ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c0f1d] via-[#11162b] to-[#18112b] border border-amber-500/30 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              Final Lesson • 18 of 18 • Complete DBMS Course
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              University Examination Preparation
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              Complete Syllabus Synthesis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Lesson 18: Complete DBMS Revision &amp; University Mock Examination
          </h1>

          <p className="text-zinc-300 text-sm md:text-base max-w-4xl leading-relaxed font-sans">
            Congratulations on reaching the summit of your Database Management Systems journey! This final lesson synthesizes the entire 18-lesson curriculum: Foundations, ER Modeling, Relational Algebra, SQL, Normalization (1NF–BCNF), Transactions &amp; Concurrency (ACID, 2PL), Indexing &amp; Query Optimization, NoSQL, Security (CIA, RBAC), Database Administration, Distributed DDBMS, and Data Warehousing/Mining. Practice with interactive diagrams, compare the top 14 frequently confused topics, tackle 5 SQL exercises, and sit for a full 60-mark University Mock Examination!
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-xl font-bold font-mono text-amber-400">18 / 18</div>
              <div className="text-[11px] text-zinc-400 font-mono">Lessons Completed</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-xl font-bold font-mono text-cyan-400">60 Marks</div>
              <div className="text-[11px] text-zinc-400 font-mono">Mock Exam Paper</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-xl font-bold font-mono text-emerald-400">14 Key Pairs</div>
              <div className="text-[11px] text-zinc-400 font-mono">Comparison Matrix</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-xl font-bold font-mono text-purple-400">20 Broad Qs</div>
              <div className="text-[11px] text-zinc-400 font-mono">University Question Bank</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PART 1: COMPLETE DBMS SYLLABUS REVISION & CORE DEFINITIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                Part 1 of 17 • Syllabus Synthesis
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Complete 18-Lesson Roadmap &amp; Core Definitions</h2>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {['all', 'foundations', 'design', 'sql', 'performance', 'distributed', 'analytics'].map(cat => (
              <button
                key={cat}
                onClick={() => setSyllabusFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                  syllabusFilter === cat ? 'bg-amber-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Core Definitions Callout Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-cyan-500/30 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold text-sm">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>What is a Database?</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              A <strong>Database</strong> is an organized collection of logically related data that can be efficiently stored, accessed, searched, managed, and updated electronically.
            </p>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] font-mono text-zinc-400">
              <strong>Analogy:</strong> A secure physical vault storing historical records, files, and ledgers.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-mono font-bold text-sm">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>What is a DBMS?</span>
            </div>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              A <strong>DBMS (Database Management System)</strong> is specialized software that acts as an interface between users, applications, and the physical database (e.g. MySQL, PostgreSQL, Oracle).
            </p>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] font-mono text-amber-300 font-bold">
              Golden Exam Rule: &quot;A database stores data; a DBMS manages that data.&quot;
            </div>
          </div>
        </div>

        {/* 18-Lesson Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900/90 text-zinc-300 border-b border-slate-800">
              <tr>
                <th className="p-3 w-16">#</th>
                <th className="p-3">Topic Title</th>
                <th className="p-3">Domain Category</th>
                <th className="p-3">Core Technical Mastery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
              {filteredRoadmap.map(item => (
                <tr key={item.num} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-amber-400">L{item.num}</td>
                  <td className="p-3 font-bold text-white font-sans">{item.title}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 border border-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400 font-sans text-[11px]">{item.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          PART 2: DATABASE MODELS & TERMINOLOGY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                Part 2 of 17 • Architectural Models
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Database Models, Core Terminology &amp; Key Theory</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'hierarchical', label: '1. Hierarchical' },
              { id: 'network', label: '2. Network' },
              { id: 'relational', label: '3. Relational' },
              { id: 'nosql', label: '4. NoSQL' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setActiveModelTab(m.id as typeof activeModelTab)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeModelTab === m.id ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Model Visualizer */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          {activeModelTab === 'hierarchical' && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-purple-300 font-mono">1. Hierarchical Database Model (Inverted Tree Structure)</span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Data is structured like an organizational tree where each record has a single parent (1:N relationship). Modeled by IBM IMS in 1968.
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-center font-mono text-xs space-y-2">
                <div className="p-2 rounded bg-purple-950/40 border border-purple-500/50 inline-block font-bold text-white">Root: University</div>
                <div className="text-zinc-500">&darr; 1:N Branching</div>
                <div className="flex justify-center gap-6">
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">Dept: CSE</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">Dept: BBA</div>
                </div>
                <div className="text-zinc-500">&darr; 1:N Branching</div>
                <div className="flex justify-center gap-4 text-[10px]">
                  <span className="p-1.5 rounded bg-black/50 border border-slate-800">Student: Rahim</span>
                  <span className="p-1.5 rounded bg-black/50 border border-slate-800">Student: Karim</span>
                  <span className="p-1.5 rounded bg-black/50 border border-slate-800">Student: Nila</span>
                </div>
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                <strong>Limitation:</strong> Cannot naturally represent M:N relationships (e.g. students taking multiple courses) without duplicating records.
              </div>
            </div>
          )}

          {activeModelTab === 'network' && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-cyan-300 font-mono">2. Network Database Model (Interconnected Graph Structure)</span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Developed by the CODASYL consortium. Records are interconnected by circular pointer sets, allowing a child record to have multiple parent records (M:N).
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-center font-mono text-xs space-y-2">
                <div className="flex justify-center gap-8">
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/50 font-bold text-white">Course: CSE101</div>
                  <div className="p-2 rounded bg-cyan-950/40 border border-cyan-500/50 font-bold text-white">Course: MAT201</div>
                </div>
                <div className="text-zinc-500">&harr; Bidirectional Pointer Links &harr;</div>
                <div className="flex justify-center gap-4">
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">Student: Rahim</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">Student: Nila</div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                <strong>Limitation:</strong> Complex physical pointer maintenance (&quot;pointer spaghetti&quot;); queries required explicit procedural traversal code.
              </div>
            </div>
          )}

          {activeModelTab === 'relational' && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-emerald-300 font-mono">3. Relational Database Model (Codd&apos;s Tables of Rows &amp; Columns)</span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Introduced by Edgar F. Codd (1970). Data is organized in mathematical relations (tables) consisting of tuples (rows) and attributes (columns). Access is declarative via SQL.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-900 text-zinc-300 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5 text-cyan-400">Student_ID (PK)</th>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Department</th>
                      <th className="p-2.5 text-emerald-400">CGPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                    <tr><td className="p-2 font-bold text-cyan-300">101</td><td className="p-2">Rahim</td><td className="p-2">CSE</td><td className="p-2 text-emerald-300">3.80</td></tr>
                    <tr><td className="p-2 font-bold text-cyan-300">102</td><td className="p-2">Karim</td><td className="p-2">BBA</td><td className="p-2 text-emerald-300">3.40</td></tr>
                    <tr><td className="p-2 font-bold text-cyan-300">103</td><td className="p-2">Nila</td><td className="p-2">EEE</td><td className="p-2 text-emerald-300">3.90</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-zinc-400 font-sans">
                <strong>Key Advantage:</strong> Complete physical data independence, declarative SQL queries, and rigorous relational mathematical backing.
              </div>
            </div>
          )}

          {activeModelTab === 'nosql' && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-amber-300 font-mono">4. NoSQL Model (Non-Relational Multi-Model)</span>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Modern databases supporting flexible schema models beyond rigid tables: Document (JSON), Key-Value, Wide-Column, and Graph.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-amber-400 font-bold">Document</div>
                  <div className="text-[10px] text-zinc-400">MongoDB (JSON)</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-cyan-400 font-bold">Key-Value</div>
                  <div className="text-[10px] text-zinc-400">Redis (Fast In-Memory)</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-purple-400 font-bold">Column-Family</div>
                  <div className="text-[10px] text-zinc-400">Cassandra (Time-Series)</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="text-emerald-400 font-bold">Graph</div>
                  <div className="text-[10px] text-zinc-400">Neo4j (Nodes &amp; Edges)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Database Keys Laboratory */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Exam Key Mastery
              </span>
              <h3 className="text-sm font-bold text-white">Database Keys Laboratory: Student Relation Example</h3>
            </div>

            <div className="flex flex-wrap gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
              {[
                { id: 'pk', label: 'Primary Key' },
                { id: 'ck', label: 'Candidate Key' },
                { id: 'sk', label: 'Super Key' },
                { id: 'ak', label: 'Alternate Key' },
                { id: 'fk', label: 'Foreign Key' },
                { id: 'comp', label: 'Composite Key' }
              ].map(k => (
                <button
                  key={k.id}
                  onClick={() => setActiveKeyTab(k.id as typeof activeKeyTab)}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${
                    activeKeyTab === k.id ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono">
            {activeKeyTab === 'pk' && (
              <div className="space-y-1 text-cyan-300">
                <strong>Primary Key:</strong> The chosen minimal unique identifier (e.g. <code>Student_ID</code>). Strictly UNIQUE and cannot be NULL.
              </div>
            )}
            {activeKeyTab === 'ck' && (
              <div className="space-y-1 text-purple-300">
                <strong>Candidate Key:</strong> Any minimal superkey that could qualify as primary key. For students: <code>&#123;Student_ID&#125;</code> and <code>&#123;Email&#125;</code> are both Candidate Keys.
              </div>
            )}
            {activeKeyTab === 'sk' && (
              <div className="space-y-1 text-emerald-300">
                <strong>Super Key:</strong> Any attribute combination that uniquely identifies a row: <code>&#123;Student_ID&#125;</code>, <code>&#123;Student_ID, Name&#125;</code>, <code>&#123;Email, Dept&#125;</code>.
              </div>
            )}
            {activeKeyTab === 'ak' && (
              <div className="space-y-1 text-amber-300">
                <strong>Alternate Key:</strong> Candidate keys that were NOT chosen as primary key. When <code>Student_ID</code> is Primary, <code>Email</code> becomes the Alternate Key.
              </div>
            )}
            {activeKeyTab === 'fk' && (
              <div className="space-y-1 text-rose-300">
                <strong>Foreign Key:</strong> An attribute that points to the primary key of another table (e.g. <code>Dept_ID</code> references <code>Departments(Dept_ID)</code>) enforcing referential integrity.
              </div>
            )}
            {activeKeyTab === 'comp' && (
              <div className="space-y-1 text-blue-300">
                <strong>Composite Key:</strong> A key composed of two or more attributes combined to ensure uniqueness (e.g. <code>&#123;StudentID, CourseCode&#125;</code> in Enrollments).
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 3: ER MODEL & DATABASE RELATIONSHIPS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 3 of 17 • Conceptual Design
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Entity-Relationship (ER) Model &amp; Cardinality Ratios</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: '1:1', label: '1:1 (Person-Passport)' },
              { id: '1:N', label: '1:N (Dept-Students)' },
              { id: 'M:N', label: 'M:N (Students-Courses)' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setErCardinality(c.id as typeof erCardinality)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  erCardinality === c.id ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Elements Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block">1. Entity (Rectangle)</span>
            <p className="text-zinc-400 font-sans text-[11px]">Real-world object distinguishable from other objects (e.g. Student, Department).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">2. Attribute (Oval)</span>
            <p className="text-zinc-400 font-sans text-[11px]">Descriptive property of an entity (e.g. Student_ID, Name, DateOfBirth).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold block">3. Relationship (Diamond)</span>
            <p className="text-zinc-400 font-sans text-[11px]">Logical association connecting entities (e.g. Student ENROLLS_IN Course).</p>
          </div>
        </div>

        {/* Dynamic Cardinality Diagram Visualizer */}
        <div className="p-6 rounded-2xl bg-[#14182d] border border-slate-800 text-center space-y-4">
          <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Cardinality Visualizer: {erCardinality}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/50 min-w-40 text-center">
              <div className="text-xs font-bold text-white font-mono">
                {erCardinality === '1:1' ? 'Person' : erCardinality === '1:N' ? 'Department' : 'Student'}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Entity 1</div>
            </div>

            <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/50 text-xs font-mono font-bold text-purple-300">
              &lang;&lang; {erCardinality === '1:1' ? 'HOLDS' : erCardinality === '1:N' ? 'OFFERS' : 'ENROLLS_IN'} ({erCardinality}) &rang;&rang;
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/50 min-w-40 text-center">
              <div className="text-xs font-bold text-white font-mono">
                {erCardinality === '1:1' ? 'Passport' : erCardinality === '1:N' ? 'Students' : 'Courses'}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">Entity 2</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-xs text-zinc-300 font-sans max-w-xl mx-auto">
            {erCardinality === '1:1' && 'One person owns at most one passport; one passport belongs to exactly one person.'}
            {erCardinality === '1:N' && 'One academic department enrolls many students; each student belongs to only one department.'}
            {erCardinality === 'M:N' && 'A student enrolls in many courses; each course has many students. Implemented via an Enrollments junction table.'}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 4: DATABASE NORMALIZATION HIERARCHY
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Split className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                Part 4 of 17 • Relational Design
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Database Normalization: 1NF &rarr; 2NF &rarr; 3NF &rarr; BCNF</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {['1NF', '2NF', '3NF', 'BCNF'].map(nf => (
              <button
                key={nf}
                onClick={() => setNormStage(nf as typeof normStage)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  normStage === nf ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {nf}
              </button>
            ))}
          </div>
        </div>

        {/* Stepper Card */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-sm font-bold text-white font-mono">
              Current Normal Form: <strong className="text-emerald-400">{normStage}</strong>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              Lossless Join &amp; Dependency Preservation
            </span>
          </div>

          {normStage === '1NF' && (
            <div className="space-y-2 text-xs font-sans">
              <div className="font-bold text-emerald-300 font-mono">1NF: First Normal Form (Atomicity)</div>
              <p className="text-zinc-300 leading-relaxed">
                Every column in each table must contain <strong>atomic (indivisible) values</strong>. No multivalued attributes, nested tables, or comma-separated arrays.
              </p>
              <div className="p-3 rounded bg-black/40 border border-slate-800 font-mono text-[11px] text-zinc-300">
                Violation: <code>PhoneNumbers: &quot;0171..., 0182...&quot;</code> &rarr; Fix: Split into individual rows or a separate child table.
              </div>
            </div>
          )}

          {normStage === '2NF' && (
            <div className="space-y-2 text-xs font-sans">
              <div className="font-bold text-cyan-300 font-mono">2NF: Second Normal Form (No Partial Dependency)</div>
              <p className="text-zinc-300 leading-relaxed">
                Must be in 1NF. Every non-prime attribute must depend on the <strong>complete candidate key</strong>, not a partial subset of a composite primary key.
              </p>
              <div className="p-3 rounded bg-black/40 border border-slate-800 font-mono text-[11px] text-zinc-300">
                Violation: In <code>Enrollments(StudentID, CourseID, CourseName)</code>, <code>CourseName</code> depends only on <code>CourseID</code> &rarr; Split Course into its own relation.
              </div>
            </div>
          )}

          {normStage === '3NF' && (
            <div className="space-y-2 text-xs font-sans">
              <div className="font-bold text-purple-300 font-mono">3NF: Third Normal Form (No Transitive Dependency)</div>
              <p className="text-zinc-300 leading-relaxed">
                Must be in 2NF. No non-prime attribute should transitively depend on another non-prime attribute (X &rarr; Y and Y &rarr; Z).
              </p>
              <div className="p-3 rounded bg-black/40 border border-slate-800 font-mono text-[11px] text-zinc-300">
                Formal Rule: For every non-trivial X &rarr; A, either <strong>X is a Superkey</strong> OR <strong>A is a Prime attribute</strong>.
              </div>
            </div>
          )}

          {normStage === 'BCNF' && (
            <div className="space-y-2 text-xs font-sans">
              <div className="font-bold text-amber-300 font-mono">BCNF: Boyce-Codd Normal Form (Strict Superkey Rule)</div>
              <p className="text-zinc-300 leading-relaxed">
                A stricter enhancement of 3NF. For <strong>EVERY</strong> non-trivial functional dependency <code>X &rarr; Y</code>, <code>X</code> must be a <strong>Superkey</strong> without exception.
              </p>
              <div className="p-3 rounded bg-black/40 border border-slate-800 font-mono text-[11px] text-zinc-300">
                Eliminates edge-case anomalies when a relation has multiple overlapping candidate keys.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 5: SQL COMPLETE PRACTICAL REVISION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
                Part 5 of 17 • Query Language
              </span>
              <h2 className="text-xl font-bold text-white mt-1">SQL Comprehensive Revision &amp; JOIN Playground</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {['DDL', 'DML', 'DQL', 'DCL', 'TCL'].map(cat => (
              <button
                key={cat}
                onClick={() => setSqlCategory(cat as typeof sqlCategory)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  sqlCategory === cat ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Explanation Banner */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 text-xs font-mono space-y-2">
          <div className="text-blue-300 font-bold">
            {sqlCategory === 'DDL' && 'DDL (Data Definition Language): Defines and modifies the database schema structure.'}
            {sqlCategory === 'DML' && 'DML (Data Manipulation Language): Modifies and manipulates row tuple data.'}
            {sqlCategory === 'DQL' && 'DQL (Data Query Language): Retrieves and filters data from relations.'}
            {sqlCategory === 'DCL' && 'DCL (Data Control Language): Controls user permissions and role authorization.'}
            {sqlCategory === 'TCL' && 'TCL (Transaction Control Language): Manages transactional ACID boundaries.'}
          </div>
          <div className="text-zinc-400 text-[11px]">
            Commands: {sqlCategory === 'DDL' ? 'CREATE, ALTER, DROP, TRUNCATE' : sqlCategory === 'DML' ? 'INSERT, UPDATE, DELETE' : sqlCategory === 'DQL' ? 'SELECT (FROM, WHERE, GROUP BY, HAVING, ORDER BY)' : sqlCategory === 'DCL' ? 'GRANT, REVOKE' : 'COMMIT, ROLLBACK, SAVEPOINT'}
          </div>
        </div>

        {/* SQL JOIN Visualizer */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-white font-bold uppercase">SQL JOIN Types Visualizer</span>
            <div className="flex gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
              {['inner', 'left', 'right', 'full'].map(j => (
                <button
                  key={j}
                  onClick={() => setSqlJoinType(j as typeof sqlJoinType)}
                  className={`px-2.5 py-1 rounded transition-all uppercase font-bold cursor-pointer ${
                    sqlJoinType === j ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {j}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800 space-y-2">
              <div className="text-cyan-300 font-bold uppercase">{sqlJoinType} JOIN Query</div>
              <code className="text-[11px] block text-zinc-300 leading-relaxed">
                {sqlJoinType === 'inner' && 'SELECT S.Name, D.Department FROM Students S INNER JOIN Departments D ON S.Dept_ID = D.Dept_ID;'}
                {sqlJoinType === 'left' && 'SELECT S.Name, D.Department FROM Students S LEFT JOIN Departments D ON S.Dept_ID = D.Dept_ID;'}
                {sqlJoinType === 'right' && 'SELECT S.Name, D.Department FROM Students S RIGHT JOIN Departments D ON S.Dept_ID = D.Dept_ID;'}
                {sqlJoinType === 'full' && 'SELECT S.Name, D.Department FROM Students S FULL OUTER JOIN Departments D ON S.Dept_ID = D.Dept_ID;'}
              </code>
            </div>

            <div className="p-3.5 rounded-lg bg-black/40 border border-slate-800 space-y-2">
              <div className="text-emerald-300 font-bold">Relational Logic</div>
              <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                {sqlJoinType === 'inner' && 'Returns only matching rows present in BOTH tables. Unmatched rows are eliminated.'}
                {sqlJoinType === 'left' && 'Returns ALL rows from Students. If a student has no department match, D.Department yields NULL.'}
                {sqlJoinType === 'right' && 'Returns ALL rows from Departments. Departments without enrolled students yield NULL for Student fields.'}
                {sqlJoinType === 'full' && 'Returns all rows from both tables. (Note: MySQL emulates FULL JOIN using LEFT JOIN UNION RIGHT JOIN).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 6: TRANSACTIONS & CONCURRENCY CONTROL
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold">
                Part 6 of 17 • Transaction Engine
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Transactions, ACID Properties &amp; Concurrency Control</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {['A', 'C', 'I', 'D'].map(letter => (
              <button
                key={letter}
                onClick={() => setAcidProp(letter as typeof acidProp)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  acidProp === letter ? 'bg-rose-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* ACID Cards */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
          {acidProp === 'A' && (
            <div className="space-y-1 text-xs">
              <span className="font-mono font-bold text-rose-300 text-sm">Atomicity (&quot;All or Nothing&quot;)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                A transaction is indivisible. Either all operations execute to completion (COMMIT), or the entire transaction is rolled back (ROLLBACK) upon any failure. Managed by the Recovery Manager using WAL (Write-Ahead Logging).
              </p>
            </div>
          )}
          {acidProp === 'C' && (
            <div className="space-y-1 text-xs">
              <span className="font-mono font-bold text-amber-300 text-sm">Consistency (Preserves Invariants)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Execution of a transaction in isolation preserves database integrity constraints (e.g. Total Account Balance A + B remains invariant before and after transfer).
              </p>
            </div>
          )}
          {acidProp === 'I' && (
            <div className="space-y-1 text-xs">
              <span className="font-mono font-bold text-cyan-300 text-sm">Isolation (Independent Concurrency)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Concurrent transactions execute as if each were the only transaction in the system. Intermediate uncommitted changes are invisible to others. Managed by Concurrency Control (2PL, MVCC).
              </p>
            </div>
          )}
          {acidProp === 'D' && (
            <div className="space-y-1 text-xs">
              <span className="font-mono font-bold text-emerald-300 text-sm">Durability (Crash Resilience)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Once committed, updates survive system crashes, power loss, or reboot. Guaranteed via non-volatile storage flushing and checkpoint logs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 7: INDEXING & QUERY OPTIMIZATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
              Part 7 of 17 • Query Speedup
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Indexing &amp; Query Optimization</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <div className="font-bold text-amber-300">Textbook Index Analogy</div>
            <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">
              Without an index, finding a student named &quot;Rahim&quot; requires reading every single disk block (Sequential Scan: O(N)). With a B-Tree index on <code>Students(Name)</code>, the engine navigates tree pointers in logarithmic time (Index Seek: O(log N)).
            </p>
            <div className="p-2.5 rounded bg-black/40 border border-slate-800 text-[10px] text-cyan-200">
              <code>CREATE INDEX idx_student_name ON Students(Name);</code>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <div className="font-bold text-rose-300">Index Trade-offs for Exams</div>
            <ul className="text-zinc-300 font-sans text-[11px] space-y-1 list-disc pl-4">
              <li><strong>Pros:</strong> Drastically accelerates <code>SELECT ... WHERE</code>, <code>ORDER BY</code>, and <code>JOIN</code> operations.</li>
              <li><strong>Cons:</strong> Consumes extra disk storage; slows down <code>INSERT</code>, <code>UPDATE</code>, and <code>DELETE</code> due to index tree rebalancing overhead.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 8: NOSQL & MODERN DATABASE SYSTEMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
                Part 8 of 17 • Modern Systems
              </span>
              <h2 className="text-xl font-bold text-white mt-1">NoSQL &amp; Modern Database Architectures</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'doc', label: 'Document (Mongo)' },
              { id: 'kv', label: 'Key-Value (Redis)' },
              { id: 'col', label: 'Column (Cassandra)' },
              { id: 'graph', label: 'Graph (Neo4j)' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setNoSqlArchetype(item.id as typeof noSqlArchetype)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  noSqlArchetype === item.id ? 'bg-cyan-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Archetype View */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
          {noSqlArchetype === 'doc' && (
            <div className="space-y-2 text-xs">
              <span className="font-mono font-bold text-amber-300 text-sm">Document Databases (e.g. MongoDB, CouchDB)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Stores semi-structured data as flexible JSON/BSON documents. Ideal for rapid development, CMS platforms, and microservices where schemas evolve dynamically.
              </p>
              <div className="p-3 rounded bg-black/40 border border-slate-800 font-mono text-[11px] text-cyan-200">
                <code>&#123; &quot;student_id&quot;: 101, &quot;name&quot;: &quot;Rahim&quot;, &quot;skills&quot;: [&quot;SQL&quot;, &quot;Python&quot;] &#125;</code>
              </div>
            </div>
          )}
          {noSqlArchetype === 'kv' && (
            <div className="space-y-2 text-xs">
              <span className="font-mono font-bold text-cyan-300 text-sm">Key-Value Databases (e.g. Redis, DynamoDB)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Stores data as arbitrary byte values indexed by a unique string key. Provides sub-millisecond in-memory lookups for session caching, user carts, and rate limiting.
              </p>
            </div>
          )}
          {noSqlArchetype === 'col' && (
            <div className="space-y-2 text-xs">
              <span className="font-mono font-bold text-purple-300 text-sm">Column-Family Databases (e.g. Apache Cassandra, HBase)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Organizes data in sparse, multidimensional sorted maps. Optimized for massive horizontal write throughput, IoT sensor logs, and timeseries analytics.
              </p>
            </div>
          )}
          {noSqlArchetype === 'graph' && (
            <div className="space-y-2 text-xs">
              <span className="font-mono font-bold text-emerald-300 text-sm">Graph Databases (e.g. Neo4j, Amazon Neptune)</span>
              <p className="text-zinc-300 font-sans leading-relaxed">
                Stores entities as nodes and relationships as directed edges with direct memory pointer traversal. Ideal for social networks, fraud detection rings, and knowledge graphs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PART 9: DATABASE SECURITY & AUTHORIZATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
                Part 9 of 17 • Security &amp; Protection
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Database Security, CIA Triad &amp; SQL Injection Defense</h2>
            </div>
          </div>

          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            {[
              { id: 'C', label: 'Confidentiality' },
              { id: 'I', label: 'Integrity' },
              { id: 'A', label: 'Availability' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setCiaComponent(item.id as typeof ciaComponent)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                  ciaComponent === item.id ? 'bg-purple-600 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* CIA Triad & SQL Defense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <div className="text-purple-300 font-bold">CIA Security Pillar: {ciaComponent === 'C' ? 'Confidentiality' : ciaComponent === 'I' ? 'Integrity' : 'Availability'}</div>
            <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">
              {ciaComponent === 'C' && 'Guarantees that sensitive data (grades, passwords, financial ledgers) is accessed ONLY by authenticated and authorized personnel via RBAC and AES encryption.'}
              {ciaComponent === 'I' && 'Protects data from unauthorized modification, deletion, or tampering. Enforced via triggers, constraints, foreign keys, and cryptographic hashes.'}
              {ciaComponent === 'A' && 'Ensures the database remains accessible to legitimate users during hardware failures, network disruptions, or cyberattacks via replication and clustering.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
            <div className="text-rose-300 font-bold">SQL Injection (SQLi) &amp; Defense</div>
            <p className="text-zinc-300 font-sans leading-relaxed text-[11px]">
              Vulnerability where hostile input alters SQL query structure. <strong>Defense:</strong> Never concatenate raw user input! Always employ parameterized prepared statements:
            </p>
            <div className="p-2 rounded bg-black/40 border border-slate-800 text-[10px] text-emerald-300">
              <code>SELECT * FROM Users WHERE email = ? AND pwd_hash = ?;</code>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 10: DATABASE ADMINISTRATION (DBA)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
              Part 10 of 17 • Database Administration
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Database Administration (DBA) Responsibilities &amp; Operations</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <div className="font-bold text-white">Storage &amp; Capacity</div>
            <div className="text-[10px] text-zinc-400">Disk allocation &amp; tablespaces</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div className="font-bold text-white">User Security</div>
            <div className="text-[10px] text-zinc-400">RBAC, GRANT/REVOKE, audits</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <Activity className="w-5 h-5 text-amber-400" />
            <div className="font-bold text-white">Performance Tuning</div>
            <div className="text-[10px] text-zinc-400">Buffer pool, index optimization</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <RotateCcw className="w-5 h-5 text-rose-400" />
            <div className="font-bold text-white">Backup &amp; Disaster Recovery</div>
            <div className="text-[10px] text-zinc-400">RPO/RTO &amp; PITR recovery</div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 11 & 12: DDBMS & DATA WAREHOUSING / MINING
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 11 &amp; 12 of 17 • Advanced Systems
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Distributed Databases (DDBMS) &amp; Data Warehousing / Mining</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* DDBMS Card */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="text-cyan-300 font-bold flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>Distributed Databases (DDBMS) Key Pillars</span>
            </div>
            <ul className="text-zinc-300 font-sans text-[11px] space-y-1.5 list-disc pl-4">
              <li><strong>4 Transparencies:</strong> Location, Fragmentation, Replication, and Naming Transparency.</li>
              <li><strong>Fragmentation:</strong> Horizontal (Rows by WHERE), Vertical (Columns with PK), Hybrid (Mixed).</li>
              <li><strong>Replication:</strong> Full, Partial, or No Replication (Primary &rarr; Replicas).</li>
              <li><strong>2-Phase Commit (2PC):</strong> Prepare Phase (Voting) &rarr; Commit/Abort Phase.</li>
              <li><strong>CAP Theorem:</strong> Pick Consistency (CP) or Availability (AP) during network partitions.</li>
            </ul>
          </div>

          {/* Data Warehousing Card */}
          <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-3">
            <div className="text-purple-300 font-bold flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Data Warehousing &amp; Data Mining Pillars</span>
            </div>
            <ul className="text-zinc-300 font-sans text-[11px] space-y-1.5 list-disc pl-4">
              <li><strong>4 Inmon Traits:</strong> Subject-Oriented, Integrated, Time-Variant, Non-Volatile.</li>
              <li><strong>ETL Pipeline:</strong> Extract from operational silos &rarr; Transform &rarr; Load into DW.</li>
              <li><strong>5 Data Mining Techniques:</strong> Classification, Clustering, Association Rules, Prediction, Anomaly Detection.</li>
              <li><strong>OLTP vs. OLAP:</strong> OLTP handles daily transactional writes; OLAP handles complex multi-dimensional analytics.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 13: MOST IMPORTANT DBMS COMPARISON QUESTIONS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                Part 13 of 17 • Essential Exam Differences
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Top 14 Most Frequent University Comparison Questions</h2>
            </div>
          </div>

          <div className="text-xs font-mono text-zinc-400">
            Card {activeComparisonIdx + 1} of 14
          </div>
        </div>

        {/* Quick Comparison Selector Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {COMPARISON_DATA.map((comp, idx) => (
            <button
              key={comp.id}
              onClick={() => setActiveComparisonIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeComparisonIdx === idx
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-zinc-400 border border-slate-800'
              }`}
            >
              #{idx + 1}: {comp.topic1} vs {comp.topic2}
            </button>
          ))}
        </div>

        {/* Active Comparison Card */}
        {(() => {
          const comp = COMPARISON_DATA[activeComparisonIdx];
          return (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a0d18] to-[#12162a] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-amber-300 font-mono">
                  Comparison #{comp.id}: {comp.topic1} vs. {comp.topic2}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  {comp.point}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-cyan-400 text-sm">{comp.topic1}</div>
                  <p className="text-zinc-300 font-sans text-[11px] leading-relaxed">{comp.desc1}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-bold text-purple-400 text-sm">{comp.topic2}</div>
                  <p className="text-zinc-300 font-sans text-[11px] leading-relaxed">{comp.desc2}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/40 text-xs text-emerald-300 font-sans">
                <strong>Crucial Exam Takeaway:</strong> {comp.keyDiff}
              </div>
            </div>
          );
        })()}
      </section>

      {/* ========================================================
          PART 14: TOP 20 UNIVERSITY BROAD QUESTIONS & 6 DIAGRAMS
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold">
              Part 14 of 17 • University Question Bank
            </span>
            <h2 className="text-xl font-bold text-white mt-1">Top 20 Broad Questions &amp; 6 Must-Draw Diagram Blueprints</h2>
          </div>
        </div>

        {/* 6 Must-Draw Diagrams Selector */}
        <div className="p-5 rounded-xl bg-[#14182d] border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <span className="text-xs font-mono font-bold text-white uppercase">6 Essential University Examination Diagrams</span>
            <div className="flex flex-wrap gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
              {[
                '1. Three-Schema',
                '2. ER Diagram',
                '3. Normalization',
                '4. ACID States',
                '5. B-Tree Index',
                '6. DDBMS Architecture'
              ].map((diag, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDiagramIdx(idx)}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${
                    activeDiagramIdx === idx ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {diag}
                </button>
              ))}
            </div>
          </div>

          {/* Diagram Canvas */}
          <div className="p-6 rounded-2xl bg-black/40 border border-slate-800 text-center font-mono text-xs space-y-3">
            {activeDiagramIdx === 0 && (
              <div className="space-y-3">
                <div className="font-bold text-purple-300">ANSI/SPARC Three-Schema Architecture Diagram</div>
                <div className="flex justify-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/40">External View 1</div>
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/40">External View 2</div>
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/40">External View n</div>
                </div>
                <div className="text-zinc-500">&uarr; Logical Data Independence &darr;</div>
                <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/50 max-w-md mx-auto font-bold text-white">
                  Conceptual Schema (Global Entities, Relations &amp; Constraints)
                </div>
                <div className="text-zinc-500">&uarr; Physical Data Independence &darr;</div>
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50 max-w-md mx-auto font-bold text-emerald-300">
                  Internal Schema (Physical File Records, B-Tree Indexes, Block Offsets)
                </div>
              </div>
            )}

            {activeDiagramIdx === 1 && (
              <div className="space-y-3">
                <div className="font-bold text-cyan-300">University Management ER Diagram Blueprint</div>
                <div className="flex items-center justify-center gap-6">
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/50">
                    <div className="font-bold text-white">[Student]</div>
                    <div className="text-[10px] text-zinc-400">PK: Student_ID</div>
                  </div>
                  <div className="p-2.5 rounded bg-purple-950/40 border border-purple-500/50 text-purple-300">
                    &lang; ENROLLS_IN (M:N) &rang;
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/50">
                    <div className="font-bold text-white">[Course]</div>
                    <div className="text-[10px] text-zinc-400">PK: Course_ID</div>
                  </div>
                </div>
                <div className="text-[11px] text-zinc-400 font-sans">
                  Exam Tip: Show composite attribute Name (First, Last), multi-valued PhoneNumbers (double oval), and derived Age (dashed oval).
                </div>
              </div>
            )}

            {activeDiagramIdx === 2 && (
              <div className="space-y-3">
                <div className="font-bold text-emerald-300">Database Normalization Progression Flow</div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <span className="p-2 rounded bg-slate-900 border border-slate-800">Unnormalized</span>
                  <span>&rarr;</span>
                  <span className="p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-bold">1NF (Atomic)</span>
                  <span>&rarr;</span>
                  <span className="p-2 rounded bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 font-bold">2NF (No Partial)</span>
                  <span>&rarr;</span>
                  <span className="p-2 rounded bg-purple-950/30 border border-purple-500/30 text-purple-300 font-bold">3NF (No Transitive)</span>
                  <span>&rarr;</span>
                  <span className="p-2 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 font-bold">BCNF (Superkey)</span>
                </div>
              </div>
            )}

            {activeDiagramIdx === 3 && (
              <div className="space-y-3">
                <div className="font-bold text-rose-300">ACID Transaction State Machine Diagram</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="p-2 rounded bg-blue-950/40 border border-blue-500/40">Active</span>
                  <span>&rarr;</span>
                  <span className="p-2 rounded bg-amber-950/40 border border-amber-500/40">Partially Committed</span>
                  <span>&rarr;</span>
                  <span className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 font-bold text-emerald-400">Committed (WAL Flushed)</span>
                </div>
                <div className="text-zinc-500">&darr; On Failure (Error/Abort) &darr;</div>
                <div className="p-2 rounded bg-rose-950/40 border border-rose-500/40 max-w-xs mx-auto text-rose-300 font-bold">
                  Failed &rarr; Aborted (ROLLBACK)
                </div>
              </div>
            )}

            {activeDiagramIdx === 4 && (
              <div className="space-y-3">
                <div className="font-bold text-amber-300">B+ Tree Hierarchical Index Structure</div>
                <div className="p-2.5 rounded bg-amber-950/40 border border-amber-500/50 max-w-xs mx-auto">
                  Root Node: [Key: 50 | Pointer &larr; &rarr;]
                </div>
                <div className="flex justify-center gap-6">
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">Internal: [20, 35]</div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-700">Internal: [65, 80]</div>
                </div>
                <div className="flex justify-center gap-2 text-[10px]">
                  <span className="p-1 rounded bg-black/60 border border-emerald-500/40 text-emerald-300">Leaf: [10, 20] &harr;</span>
                  <span className="p-1 rounded bg-black/60 border border-emerald-500/40 text-emerald-300">Leaf: [35, 45] &harr;</span>
                  <span className="p-1 rounded bg-black/60 border border-emerald-500/40 text-emerald-300">Leaf: [65, 75] &harr;</span>
                  <span className="p-1 rounded bg-black/60 border border-emerald-500/40 text-emerald-300">Leaf: [80, 95]</span>
                </div>
              </div>
            )}

            {activeDiagramIdx === 5 && (
              <div className="space-y-3">
                <div className="font-bold text-cyan-300">Distributed DBMS Peer-to-Peer &amp; Primary-Replica Topology</div>
                <div className="flex justify-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50">
                    <Database className="w-5 h-5 mx-auto text-emerald-400" />
                    <div>Primary (Dhaka)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/50">
                    <Database className="w-5 h-5 mx-auto text-cyan-400" />
                    <div>Replica 1 (Ctg)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/50">
                    <Database className="w-5 h-5 mx-auto text-cyan-400" />
                    <div>Replica 2 (Sylhet)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 20 Broad Questions Accordion */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Curated 20 High-Priority University Examination Questions
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOP_20_BROAD_QUESTIONS.map(q => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold font-mono text-cyan-300">{q.q}</div>
                  <button
                    onClick={() => setBroadQOpen(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="p-1 rounded bg-slate-800 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    {broadQOpen[q.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-zinc-400 border border-slate-700">
                  {q.sec}
                </span>

                {broadQOpen[q.id] && (
                  <div className="pt-2 border-t border-slate-800 text-[11px] font-sans text-zinc-300 whitespace-pre-line leading-relaxed">
                    {q.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 15: FULL UNIVERSITY MOCK EXAMINATION (60 MARKS)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Official Examination Simulation • 60 Marks Total • 90 Minutes
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">Full University Mock Examination</h2>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right font-mono text-xs">
            <div className="text-amber-400 font-bold">Total Marks: 60</div>
            <div className="text-[10px] text-zinc-400">Sec A: 10 | Sec B: 20 | Sec C: 30</div>
          </div>
        </div>

        {/* Section A: 10 MCQs (10 Marks) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <span>Section A: Multiple Choice Questions (10 Marks • 1 Mark Each)</span>
            </h3>
            <span className="text-xs font-mono text-cyan-300 font-bold">
              Answered: {Object.keys(mcqAnswers).length} / 10
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_MCQ_DATA.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
              >
                <div className="text-xs font-bold text-white font-mono">
                  {idx + 1}. {q.question}
                </div>

                <div className="space-y-1.5">
                  {q.options.map(opt => {
                    const isSelected = mcqAnswers[q.id] === opt.key;
                    const isCorrect = q.correct === opt.key;
                    let btnStyle = 'bg-black/30 border-slate-800 text-zinc-300 hover:border-slate-700';

                    if (mcqSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyan-950/50 border-cyan-500 text-cyan-200 font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => !mcqSubmitted && setMcqAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {mcqSubmitted && (
                  <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] font-sans text-zinc-400">
                    <strong className="text-emerald-400 font-mono">Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!mcqSubmitted ? (
              <button
                onClick={() => setMcqSubmitted(true)}
                disabled={Object.keys(mcqAnswers).length < 10}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-600/20 disabled:opacity-50 cursor-pointer"
              >
                Submit Section A (Grade 10 MCQs)
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <div className="text-sm font-mono font-bold text-emerald-400">
                  Section A Score: {mcqScore} / 10 Marks ({mcqScore >= 8 ? 'Outstanding!' : 'Review Missed Questions'})
                </div>
                <button
                  onClick={() => {
                    setMcqAnswers({});
                    setMcqSubmitted(false);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 text-zinc-300 font-mono text-xs hover:bg-slate-700 cursor-pointer"
                >
                  Retake MCQs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section B: 5 Short Questions (20 Marks) */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Section B: Short Answer Questions (20 Marks • 4 Marks Each • Answer All)</span>
            </h3>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 'sq1',
                q: 'Q1: What is DBMS? Mention four major advantages over file systems.',
                model: 'A Database Management System (DBMS) is software that manages creation, querying, updating, and administration of databases. Four advantages: (1) Minimal data redundancy via normalization, (2) Enforced data integrity constraints, (3) Safe concurrent multi-user transactions via ACID and 2PL, and (4) Robust crash recovery using Write-Ahead Logs (WAL).'
              },
              {
                id: 'sq2',
                q: 'Q2: Explain Primary Key and Foreign Key with an example.',
                model: 'A Primary Key is a minimal superkey chosen to uniquely identify each row in a table (e.g. StudentID in Students table; cannot be NULL). A Foreign Key is an attribute in another table (e.g. DeptID in Students referencing Departments table) that references the primary key of a parent table to enforce referential integrity.'
              },
              {
                id: 'sq3',
                q: 'Q3: What is normalization? Why is it important?',
                model: 'Normalization is the systematic process of organizing tables and functional dependencies to eliminate insertion, update, and deletion anomalies while minimizing unnecessary data redundancy. It ensures lossless decomposition and maintains high data consistency across enterprise relations.'
              },
              {
                id: 'sq4',
                q: 'Q4: Explain the four ACID properties of a transaction.',
                model: 'ACID properties: Atomicity guarantees all operations complete or all rollback (all-or-nothing). Consistency preserves database invariants and constraints. Isolation ensures concurrent transactions execute without viewing intermediate uncommitted states. Durability guarantees committed data survives server crashes.'
              },
              {
                id: 'sq5',
                q: 'Q5: Differentiate between OLTP and OLAP.',
                model: 'OLTP (Online Transaction Processing) manages daily operational transactions (e.g. ATM withdrawal, e-commerce checkout) with high-concurrency, normalized schemas, and sub-second writes. OLAP (Online Analytical Processing) manages historical decision-making with complex multi-dimensional aggregation queries over denormalized data warehouses.'
              }
            ].map(sq => (
              <div key={sq.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-300 font-mono">{sq.q}</div>
                  <button
                    onClick={() => setShortQRevealed(prev => ({ ...prev, [sq.id]: !prev[sq.id] }))}
                    className="px-2.5 py-1 rounded bg-slate-800 text-zinc-300 hover:text-white text-[11px] font-mono cursor-pointer"
                  >
                    {shortQRevealed[sq.id] ? 'Hide Model Answer' : 'Reveal Model Answer'}
                  </button>
                </div>

                <textarea
                  placeholder="Draft your 3-5 sentence exam response here..."
                  value={shortQAnswers[sq.id] || ''}
                  onChange={e => setShortQAnswers(prev => ({ ...prev, [sq.id]: e.target.value }))}
                  className="w-full h-16 p-2 rounded bg-black/40 border border-slate-800 text-xs font-mono text-zinc-300 resize-none focus:outline-none focus:border-amber-500"
                />

                {shortQRevealed[sq.id] && (
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 text-[11px] font-sans text-emerald-200">
                    <strong className="font-mono text-emerald-400 block mb-1">University Model Answer (Full 4 Marks):</strong>
                    {sq.model}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section C: 5 Broad Questions (30 Marks) */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span>Section C: Broad Examination Questions (30 Marks • Choose Any 3 of 5 • 10 Marks Each)</span>
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'bq_c1',
                title: 'Question 1: Explain the ER Model and Draw an ER Diagram for a University System.',
                outline: '10 Marks Structure: (1) Define Entity, Attribute, Relationship (2 Marks), (2) Explain Weak entities, Composite attributes, Multi-valued attributes (2 Marks), (3) Draw full University ER Diagram linking Student, Department, Course, Instructor, and Enrollment with Cardinalities (4 Marks), (4) Conversion steps to relational tables (2 Marks).'
              },
              {
                id: 'bq_c2',
                title: 'Question 2: Explain 1NF, 2NF, 3NF, and BCNF with Appropriate Relational Examples.',
                outline: '10 Marks Structure: (1) Define Normalization and anomalies (2 Marks), (2) 1NF definition and multi-value table fix (2 Marks), (3) 2NF partial dependency definition and decomposition (2 Marks), (4) 3NF transitive dependency and formal condition (2 Marks), (5) BCNF superkey condition and edge case example (2 Marks).'
              },
              {
                id: 'bq_c3',
                title: 'Question 3: Explain SQL Command Categories and Discuss All Types of JOIN Operations.',
                outline: '10 Marks Structure: (1) Classify DDL, DML, DQL, DCL, TCL with code syntax (4 Marks), (2) Detail INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN with Venn schematics and result tables (4 Marks), (3) Discuss MySQL emulation of FULL JOIN using UNION (2 Marks).'
              },
              {
                id: 'bq_c4',
                title: 'Question 4: What is a Distributed Database? Explain Architecture, Advantages & Disadvantages.',
                outline: '10 Marks Structure: (1) Define DDBMS with multi-branch bank example (2 Marks), (2) Contrast Centralized vs Distributed and Homogeneous vs Heterogeneous (2 Marks), (3) Explain 4 Transparencies and Fragmentation types (2 Marks), (4) Describe Two-Phase Commit protocol (2PC) Prepare & Commit phases (2 Marks), (5) Advantages vs Disadvantages (2 Marks).'
              },
              {
                id: 'bq_c5',
                title: 'Question 5: Define Data Mining. Explain Classification, Clustering, Association, Prediction & Anomaly Detection.',
                outline: '10 Marks Structure: (1) Define Data Mining and the 8-step KDD pipeline (3 Marks), (2) Contrast Supervised Classification vs Unsupervised Clustering (2 Marks), (3) Explain Association Rule Mining with Support and Confidence formulas (2 Marks), (4) Detail Numerical Prediction and Anomaly Detection fraud use-cases (2 Marks), (5) Differentiate OLTP vs OLAP (1 Mark).'
              }
            ].map(bq => (
              <div key={bq.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-300 font-mono">{bq.title}</div>
                <div className="p-3 rounded-lg bg-black/40 border border-slate-800 text-[11px] font-sans text-zinc-300">
                  <strong className="text-amber-400 font-mono block mb-1">Recommended University Answer Blueprint:</strong>
                  {bq.outline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          PART 16: SQL PRACTICAL EXAMINATION
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
              Part 16 of 17 • Practical Exam Lab
            </span>
            <h2 className="text-xl font-bold text-white mt-1">SQL Practical Examination: Employees Relation</h2>
          </div>
        </div>

        {/* Master Employees Table */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-zinc-400">Target Table: <strong>Employees</strong> (5 Records)</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-zinc-300 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Employee_ID (PK)</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Department</th>
                  <th className="p-2.5">Salary (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
                <tr><td className="p-2 text-cyan-300 font-bold">1</td><td className="p-2">Rahim</td><td className="p-2">IT</td><td className="p-2">50,000</td></tr>
                <tr><td className="p-2 text-cyan-300 font-bold">2</td><td className="p-2">Karim</td><td className="p-2">HR</td><td className="p-2">40,000</td></tr>
                <tr><td className="p-2 text-cyan-300 font-bold">3</td><td className="p-2">Nila</td><td className="p-2">IT</td><td className="p-2">60,000</td></tr>
                <tr><td className="p-2 text-cyan-300 font-bold">4</td><td className="p-2">Sara</td><td className="p-2">Finance</td><td className="p-2">45,000</td></tr>
                <tr><td className="p-2 text-cyan-300 font-bold">5</td><td className="p-2">Rafi</td><td className="p-2">HR</td><td className="p-2">55,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5 Practical Exercises */}
        <div className="space-y-4">
          {SQL_PRACTICAL_EXERCISES.map(ex => (
            <div key={ex.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-mono">{ex.title}</span>
                <button
                  onClick={() => setSqlRevealed(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                  className="px-3 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  {sqlRevealed[ex.id] ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>

              <p className="text-xs text-zinc-300 font-sans">{ex.instruction}</p>

              <input
                type="text"
                placeholder="Write your SQL query (e.g. SELECT ...)..."
                value={sqlInputs[ex.id] || ''}
                onChange={e => setSqlInputs(prev => ({ ...prev, [ex.id]: e.target.value }))}
                className="w-full p-2.5 rounded-lg bg-black/50 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />

              {sqlRevealed[ex.id] && (
                <div className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/40 space-y-2 text-xs font-mono">
                  <div className="text-cyan-400 font-bold">Model SQL Query:</div>
                  <code className="text-emerald-300 block">{ex.solution}</code>
                  <p className="text-[11px] text-zinc-400 font-sans">{ex.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PART 17: UNIVERSITY PREP STRATEGY & REVISION CHECKLIST
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              Part 17 of 17 • Final Preparation Strategy
            </span>
            <h2 className="text-xl font-bold text-white mt-1">7-Day Revision Calendar &amp; 15-Item Readiness Checklist</h2>
          </div>
        </div>

        {/* 7-Day Plan */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-zinc-300 border-b border-slate-800">
              <tr>
                <th className="p-2.5">Day</th>
                <th className="p-2.5">Focus Revision Topics</th>
                <th className="p-2.5">Exam Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-black/20 text-zinc-300">
              <tr><td className="p-2 font-bold text-amber-400">Day 1</td><td>Database fundamentals, models, three-schema architecture</td><td><span className="text-cyan-400 font-bold">High</span></td></tr>
              <tr><td className="p-2 font-bold text-amber-400">Day 2</td><td>ER Model, keys, cardinality relationships (1:1, 1:N, M:N)</td><td><span className="text-rose-400 font-bold">Very High</span></td></tr>
              <tr><td className="p-2 font-bold text-amber-400">Day 3</td><td>SQL basics, aggregations, GROUP BY, HAVING, JOINs</td><td><span className="text-rose-400 font-bold">Very High</span></td></tr>
              <tr><td className="p-2 font-bold text-amber-400">Day 4</td><td>Database Normalization (1NF, 2NF, 3NF, BCNF) &amp; dependencies</td><td><span className="text-rose-400 font-bold">Very High</span></td></tr>
              <tr><td className="p-2 font-bold text-amber-400">Day 5</td><td>Transactions, ACID properties, concurrency control, B+ Trees</td><td><span className="text-rose-400 font-bold">Very High</span></td></tr>
              <tr><td className="p-2 font-bold text-amber-400">Day 6</td><td>NoSQL, Database security (CIA/RBAC), DBA operations, DDBMS</td><td><span className="text-cyan-400 font-bold">High</span></td></tr>
              <tr><td className="p-2 font-bold text-amber-400">Day 7</td><td>Data warehousing, ETL, Data mining, Full 60-mark mock exam</td><td><span className="text-cyan-400 font-bold">High</span></td></tr>
            </tbody>
          </table>
        </div>

        {/* 15-Item Checklist */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              15-Item Final Readiness Checklist
            </span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {checklistProgress}% Readiness Completed
              </span>
              <button
                onClick={() => setChecklist({})}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-400 cursor-pointer"
              >
                Reset Checklist
              </button>
            </div>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-cyan-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${checklistProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {[
              'I can explain what a database and DBMS are.',
              'I understand database models and three-schema architecture.',
              'I can identify primary, foreign, candidate and composite keys.',
              'I can draw ER diagrams and identify relationships.',
              'I understand 1NF, 2NF, 3NF and BCNF.',
              'I can write basic and advanced SQL queries.',
              'I understand SQL JOIN, GROUP BY and HAVING.',
              'I can explain ACID properties and transaction management.',
              'I understand concurrency problems and their solutions.',
              'I can explain indexing and query optimization.',
              'I understand SQL and NoSQL differences.',
              'I can explain database security and authorization.',
              'I understand the responsibilities of a DBA.',
              'I can explain distributed database architecture.',
              'I understand data warehousing, ETL and data mining.'
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleChecklist(idx)}
                className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer flex items-start gap-2.5 ${
                  checklist[idx]
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-[#14182d] border-slate-800 text-zinc-300 hover:border-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border flex-shrink-0 transition-colors ${
                  checklist[idx] ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-900'
                }`}>
                  {checklist[idx] && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Course Completion Banner & Next Steps */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-cyan-950/40 border border-amber-500/50 space-y-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="text-xl font-bold text-white">
              Course Milestone: You Have Completed All 18 DBMS Lessons!
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            You now possess end-to-end mastery across theoretical database design, relational algebra, SQL programming, concurrency engineering, distributed systems, and business intelligence. Ready to bridge your DBMS mastery into deep systems architecture, query planning, and AI vector embeddings?
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate?.('backend-lesson17')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-zinc-200 font-bold text-xs flex items-center gap-2 transition-all border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Review Lesson 17: Data Warehousing</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
