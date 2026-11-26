export interface Student {
  id: number;
  name: string;
  email: string | null;
  dept: string;
  semester: string;
  gpa: number;
  admissionDate: string;
}

export const STUDENTS_DATA: Student[] = [
  { id: 101, name: 'Rahim', email: 'rahim@uni.edu', dept: 'CSE', semester: '6th', gpa: 3.80, admissionDate: '2024-01-15' },
  { id: 102, name: 'Karim', email: 'karim@uni.edu', dept: 'BBA', semester: '4th', gpa: 3.40, admissionDate: '2024-09-01' },
  { id: 103, name: 'Sumaiya', email: 'sumaiya@uni.edu', dept: 'CSE', semester: '8th', gpa: 3.90, admissionDate: '2023-01-10' },
  { id: 104, name: 'Nabila', email: null, dept: 'EEE', semester: '2nd', gpa: 3.20, admissionDate: '2025-05-12' },
  { id: 105, name: 'Tanvir', email: 'tanvir@uni.edu', dept: 'CSE', semester: '6th', gpa: 3.50, admissionDate: '2024-01-18' },
  { id: 106, name: 'Ayesha', email: 'ayesha@uni.edu', dept: 'BBA', semester: '4th', gpa: 3.70, admissionDate: '2024-09-05' },
];

export const COURSES_DATA = [
  { id: 'C01', code: 'CSE-301', name: 'DBMS', dept: 'CSE', credits: 3, instructor: 'Dr. Hasan' },
  { id: 'C02', code: 'CSE-305', name: 'Networking', dept: 'CSE', credits: 3, instructor: 'Prof. Kabir' },
  { id: 'C03', code: 'CSE-101', name: 'Programming', dept: 'CSE', credits: 4, instructor: 'Dr. Rahman' },
  { id: 'C04', code: 'MAT-102', name: 'Mathematics', dept: 'General', credits: 3, instructor: 'Prof. Alam' },
];

export const ENROLLMENTS_DATA = [
  { enrollmentId: 1, studentId: 101, courseId: 'C01', semester: 'Spring 2026', grade: 'A', enrolledAt: '2026-01-10' },
  { enrollmentId: 2, studentId: 101, courseId: 'C02', semester: 'Spring 2026', grade: 'A-', enrolledAt: '2026-01-11' },
  { enrollmentId: 3, studentId: 102, courseId: 'C01', semester: 'Spring 2026', grade: 'B', enrolledAt: '2026-01-12' },
  { enrollmentId: 4, studentId: 103, courseId: 'C01', semester: 'Fall 2025', grade: 'A+', enrolledAt: '2025-09-04' },
  { enrollmentId: 5, studentId: 103, courseId: 'C03', semester: 'Fall 2025', grade: 'A', enrolledAt: '2025-09-05' },
  { enrollmentId: 6, studentId: 104, courseId: 'C04', semester: 'Spring 2026', grade: 'B+', enrolledAt: '2026-01-14' },
  { enrollmentId: 7, studentId: 105, courseId: 'C02', semester: 'Spring 2026', grade: 'B', enrolledAt: '2026-01-15' },
  { enrollmentId: 8, studentId: 106, courseId: 'C01', semester: 'Spring 2026', grade: 'A-', enrolledAt: '2026-01-16' },
];

export const DEPT_AVERAGES: Record<string, number> = {
  CSE: (3.80 + 3.90 + 3.50) / 3,
  BBA: (3.40 + 3.70) / 2,
  EEE: 3.20,
};

export const INTERVIEW_QA = [
  {
    id: 'q1',
    qEn: 'Q1: What is a subquery and what are its main types?',
    qBn: 'প্রশ্ন ১: Subquery কী এবং এর প্রধান ধরনগুলো কী কী?',
    aEn: 'A subquery (nested/inner query) is a SQL query inside another query. Main types: Single-Row (1 scalar value), Multiple-Row (list of values with IN/ANY/ALL), Multiple-Column (tuple match), and Correlated Subquery (depends on outer row).',
    aBn: 'Subquery হলো একটি SQL কুয়েরির ভেতরে থাকা আরেকটি কুয়েরি। প্রধান ধরন: Single-Row (১টি মান), Multiple-Row (IN/ANY/ALL সহ একাধিক মান), Multiple-Column (একাধিক কলামের টাপল), এবং Correlated Subquery (বাইরের সারির ওপর নির্ভরশীল)।'
  },
  {
    id: 'q2',
    qEn: 'Q2: How does a Correlated Subquery differ from a normal Subquery?',
    qBn: 'প্রশ্ন ২: Correlated Subquery সাধারণ Subquery থেকে কীভাবে আলাদা?',
    aEn: 'A regular subquery runs once independently and passes its result to the outer query. A correlated subquery references a column from the outer query, so it re-executes once for every candidate row.',
    aBn: 'সাধারণ subquery স্বাধীনভাবে একবার চলে এবং ফলাফল outer query-তে পাঠায়। কিন্তু correlated subquery outer query-এর কলাম ব্যবহার করে, তাই outer query-এর প্রতিটি সারির জন্য এটি আলাদাভাবে চলে।'
  },
  {
    id: 'q3',
    qEn: 'Q3: Why is NOT EXISTS safer than NOT IN?',
    qBn: 'প্রশ্ন ৩: NOT IN-এর চেয়ে NOT EXISTS কেন বেশি নিরাপদ?',
    aEn: 'If a subquery returns even one NULL value, NOT IN evaluates to UNKNOWN for every row and returns 0 rows. NOT EXISTS checks only row existence (TRUE/FALSE) and is 100% NULL-safe.',
    aBn: 'Subquery-তে একটি মাত্র NULL মান থাকলে NOT IN পুরো ফলাফল UNKNOWN করে দেয় এবং ০টি সারি ফেরত দেয়। কিন্তু NOT EXISTS শুধু সারির অস্তিত্ব যাচাই করে, তাই এটি ১০০% NULL-নিরাপদ।'
  },
  {
    id: 'q4',
    qEn: 'Q4: What is a CTE (Common Table Expression) and why use it?',
    qBn: 'প্রশ্ন ৪: CTE (Common Table Expression) কী এবং কেন ব্যবহার করা হয়?',
    aEn: 'A CTE is a temporary named result set created with the WITH clause before the main query. It makes complex nested SQL modular, readable, reusable within the query, and supports recursion.',
    aBn: 'CTE হলো মূল কুয়েরির আগে WITH ক্লজ দিয়ে তৈরি একটি অস্থায়ী নামযুক্ত রেজাল্ট সেট। এটি জটিল নেস্টেড SQL-কে সহজবোধ্য, মডিউলার ও ডিবাগযোগ্য করে এবং রিকার্সিভ কুয়েরি সাপোর্ট করে।'
  },
  {
    id: 'q5',
    qEn: 'Q5: Differentiate between UNION and UNION ALL.',
    qBn: 'প্রশ্ন ৫: UNION এবং UNION ALL-এর মধ্যে পার্থক্য কী?',
    aEn: 'UNION merges two result sets and removes duplicate rows (requires sorting/hashing, slower). UNION ALL keeps all rows including duplicates (no deduplication overhead, faster).',
    aBn: 'UNION দুটি রেজাল্ট সেট যুক্ত করে ডুপ্লিকেট সারি বাদ দেয় (সর্টিং লাগে বলে তুলনামূলক ধীর)। UNION ALL ডুপ্লিকেটসহ সব সারি রাখে (অতিরিক্ত প্রসেসিং না থাকায় দ্রুততম)।'
  },
  {
    id: 'q6',
    qEn: 'Q6: Compare ROW_NUMBER(), RANK(), and DENSE_RANK().',
    qBn: 'প্রশ্ন ৬: ROW_NUMBER(), RANK() এবং DENSE_RANK()-এর পার্থক্য কী?',
    aEn: 'On tied values (e.g. two 3.90s followed by 3.70): ROW_NUMBER() gives 1, 2, 3; RANK() gives 1, 1, 3 (skips 2); DENSE_RANK() gives 1, 1, 2 (no gaps).',
    aBn: 'সমান মান থাকলে (যেমন দুটি 3.90 ও পরে 3.70): ROW_NUMBER() দেয় 1, 2, 3; RANK() দেয় 1, 1, 3 (মাঝে গ্যাপ থাকে); DENSE_RANK() দেয় 1, 1, 2 (কোনো গ্যাপ ছাড়াই)।'
  },
  {
    id: 'q7',
    qEn: 'Q7: What is the logical execution order of a SQL query?',
    qBn: 'প্রশ্ন ৭: একটি SQL কুয়েরির লজিক্যাল এক্সিকিউশন অর্ডার কী?',
    aEn: '1. FROM (and JOINs) -> 2. WHERE -> 3. GROUP BY -> 4. HAVING -> 5. SELECT -> 6. DISTINCT -> 7. ORDER BY -> 8. LIMIT/OFFSET. Because SELECT runs after WHERE, column aliases from SELECT cannot be used inside WHERE.',
    aBn: '১. FROM (ও JOIN) -> ২. WHERE -> ৩. GROUP BY -> ৪. HAVING -> ৫. SELECT -> ৬. DISTINCT -> ৭. ORDER BY -> ৮. LIMIT/OFFSET। SELECT পরে চলে বলে WHERE ক্লজে SELECT-এর Alias ব্যবহার করা যায় না।'
  }
];
