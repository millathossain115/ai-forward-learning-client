export interface Lesson11InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson11Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON11_INTERVIEW_QA: Lesson11InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Explain the CIA Triad in database security with real examples.',
    qBn: 'প্রশ্ন ১: বাস্তব উদাহরণসহ ডেটাবেস সিকিউরিটির CIA Triad ব্যাখ্যা করুন।',
    aEn: 'Confidentiality (only authorized users read data — e.g., students cannot view peers’ grades), Integrity (prevent unauthorized modification — e.g., only instructors update EXAM_MARKS), and Availability (system stays responsive — e.g., 50k concurrent logins on result day).',
    aBn: 'Confidentiality (শুধু অনুমোদিত ব্যবহারকারী ডেটা দেখবে), Integrity (অননুমোদিত পরিবর্তন রোধ করা) এবং Availability (সর্বদা সিস্টেম সচল থাকা — যেমন রেজাল্টের দিন ৫০ হাজার লগইনেও সার্ভার সচল রাখা)।',
  },
  {
    id: 'q2',
    qEn: 'Q2: How do Authentication, Authorization, and RBAC differ?',
    qBn: 'প্রশ্ন ২: Authentication, Authorization এবং RBAC-এর মধ্যে পার্থক্য কী?',
    aEn: 'Authentication verifies identity ("Who are you?"). Authorization checks permissions ("What can you do?"). RBAC (Role-Based Access Control) assigns privileges (GRANT/REVOKE) to roles like Teacher or Accountant rather than individual users, simplifying least-privilege management.',
    aBn: 'Authentication পরিচয় যাচাই করে ("আপনি কে?"), Authorization অনুমতি যাচাই করে ("আপনি কী করতে পারবেন?"), আর RBAC ব্যবহারকারীর বদলে Role-এ (যেমন Teacher, Accountant) পারমিশন দেয়।',
  },
  {
    id: 'q3',
    qEn: 'Q3: How does SQL Injection work and how do you prevent it?',
    qBn: 'প্রশ্ন ৩: SQL Injection কীভাবে কাজ করে এবং কীভাবে তা প্রতিরোধ করবেন?',
    aEn: 'SQLi happens when untrusted input is concatenated directly into SQL strings (e.g., `OR 1=1`), altering query logic. Prevention: (1) Parameterized Queries / Prepared Statements, (2) Least-privilege DB accounts, (3) Strict input validation, and (4) Disabling verbose DB error messages.',
    aBn: 'ইউজার ইনপুট সরাসরি SQL স্ট্রিংয়ে যোগ করলে (`OR 1=1`) কুয়েরির লজিক বদলে যায়। প্রতিরোধ: (১) Parameterized Query / Prepared Statement, (২) Least-privilege অ্যাকাউন্ট, (৩) ইনপুট ভ্যালিডেশন ও (৪) বিস্তারিত এরর মেসেজ বন্ধ রাখা।',
  },
  {
    id: 'q4',
    qEn: 'Q4: Compare Full, Incremental, and Differential Backups.',
    qBn: 'প্রশ্ন ৪: Full, Incremental এবং Differential ব্যাকআপের মধ্যে তুলনা করুন।',
    aEn: 'Full copies the entire DB (slow backup, fastest restore). Incremental copies only changes since the last backup of ANY type (fastest backup, slowest restore — needs Full + every Incremental). Differential copies changes since the last Full backup (moderate backup, faster restore — needs Full + latest Differential).',
    aBn: 'Full পুরো ডেটাবেস কপি করে (রিকভারি দ্রুততম)। Incremental শেষ যেকোনো ব্যাকআপের পরের পরিবর্তন নেয় (ব্যাকআপ দ্রুততম, রিস্টোর ধীর)। Differential শেষ Full ব্যাকআপের পরের পরিবর্তন নেয় (মাঝারি গতি)।',
  },
  {
    id: 'q5',
    qEn: 'Q5: Differentiate between RPO and RTO with a concrete outage example.',
    qBn: 'প্রশ্ন ৫: উদাহরণসহ RPO এবং RTO-এর মধ্যে পার্থক্য বলুন।',
    aEn: 'RPO (Recovery Point Objective) = maximum acceptable data loss in time (e.g., RPO = 30 min means if crash hits at 2:00 PM, we must recover data up to at least 1:30 PM). RTO (Recovery Time Objective) = maximum acceptable downtime (e.g., RTO = 3 hours means DB must be back online by 5:00 PM).',
    aBn: 'RPO (Recovery Point Objective) হলো সর্বোচ্চ কতটুকু সময়ের ডেটা লস মেনে নেওয়া যায় (যেমন ২টায় ক্র্যাশ হলে অন্তত ১:৩০ পর্যন্ত ডেটা ফিরিয়ে আনা)। RTO (Recovery Time Objective) হলো সর্বোচ্চ কতক্ষণ ডাউনটাইম অনুমোদিত।',
  },
  {
    id: 'q6',
    qEn: 'Q6: Why is Replication NOT a substitute for Backups?',
    qBn: 'প্রশ্ন ৬: Replication কেন Backup-এর বিকল্প নয়?',
    aEn: 'Replication provides High Availability by copying writes in real time—which means accidental `DROP TABLE` or ransomware also replicates immediately to all replicas! Only isolated Point-in-Time Backups (3-2-1 rule) can restore deleted/corrupted data.',
    aBn: 'Replication হাই-অ্যাভেইলেবিলিটি দেয়, কিন্তু ভুলবশত `DROP TABLE` চালালে তা রিয়েল-টাইমে সব রেপ্লিকাতেও ডিলিট হয়ে যায়! তাই হারানো ডেটা ফেরাতে আলাদা ব্যাকআপ (3-2-1 নিয়ম) অপরিহার্য।',
  },
];

export const LESSON11_EXERCISES: Lesson11Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: Apply CIA Triad',
    titleBn: 'অনুশীলনী ১: CIA Triad প্রয়োগ',
    problemEn: 'A university stores student names, grades, and tuition payments. Give one concrete control each for Confidentiality, Integrity, and Availability.',
    problemBn: 'একটি বিশ্ববিদ্যালয়ের ডেটাবেসে নাম, রেজাল্ট ও পেমেন্ট আছে। Confidentiality, Integrity ও Availability নিশ্চিতের ১টি করে উদাহরণ দিন।',
    sol: 'Confidentiality: Views/RBAC so students see only their own GPA.\nIntegrity: Only instructors can UPDATE EXAM_MARKS.\nAvailability: Read replicas + load balancing on result publication day.',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Fix SQL Injection',
    titleBn: 'অনুশীলনী ২: SQL Injection সমাধান',
    problemEn: "Convert vulnerable `SELECT * FROM Users WHERE email = '${input}'` into a safe parameterized query.",
    problemBn: "দুর্বল `SELECT * FROM Users WHERE email = '${input}'` কুয়েরিটিকে নিরাপদ Parameterized Query-তে রূপান্তর করুন।",
    sol: 'Prepared Statement:\nSELECT * FROM Users WHERE email = ?;\ndb.execute(sql, [userInput]); // Input treated strictly as data, never SQL code.',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: RPO & RTO Targets',
    titleBn: 'অনুশীলনী ৩: RPO ও RTO বিশ্লেষণ',
    problemEn: 'A system crashes at 2:00 PM with targets RPO = 15 min, RTO = 2 hours. What are the exact deadlines?',
    problemBn: 'দুপুর ২:০০টায় সার্ভার ক্র্যাশ করেছে; লক্ষ্যমাত্রা RPO = ১৫ মিনিট, RTO = ২ ঘণ্টা। ডেডলাইন কী কী?',
    sol: 'RPO = 15 min -> Recover all transactions up to at least 1:45 PM.\nRTO = 2 hours -> Restore service completely by 4:00 PM.',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Least-Privilege GRANT',
    titleBn: 'অনুশীলনী ৪: Least-Privilege GRANT',
    problemEn: 'Grant an accountant role permission to read and update PAYMENTS without touching EXAM_MARKS.',
    problemBn: 'Accountant রোলকে শুধু PAYMENTS টেবিলে SELECT ও UPDATE অনুমতি দিন (EXAM_MARKS নয়)।',
    sol: 'GRANT SELECT, UPDATE ON PAYMENTS TO accountant_role;\nREVOKE ALL ON EXAM_MARKS FROM accountant_role;',
  },
];
