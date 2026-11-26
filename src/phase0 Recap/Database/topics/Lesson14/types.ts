export interface Lesson14InterviewItem {
  id: string;
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export interface Lesson14Exercise {
  id: string;
  titleEn: string;
  titleBn: string;
  problemEn: string;
  problemBn: string;
  sol: string;
}

export const LESSON14_INTERVIEW_QA: Lesson14InterviewItem[] = [
  {
    id: 'q1',
    qEn: 'Q1: Compare DAC, MAC, and RBAC access control models.',
    qBn: 'প্রশ্ন ১: DAC, MAC এবং RBAC অ্যাক্সেস কন্ট্রোল মডেলের মধ্যে তুলনা করুন।',
    aEn: 'DAC (Discretionary): Resource owner grants/revokes permissions (flexible, e.g., SQL GRANT). MAC (Mandatory): System-enforced security clearance labels (Top Secret/Confidential; used in military/gov). RBAC (Role-Based): Permissions attach to Roles (Teacher, Accountant), and users inherit roles (enterprise standard).',
    aBn: 'DAC: ডেটার মালিক অনুমতি দেয়/নেয়। MAC: কেন্দ্রীয় সিকিউরিটি লেবেল দিয়ে নিয়ন্ত্রিত (সামরিক/সরকারি)। RBAC: ব্যবহারকারীর বদলে Role-এ পারমিশন দেওয়া হয় (এন্টারপ্রাইজ স্ট্যান্ডার্ড)।',
  },
  {
    id: 'q2',
    qEn: 'Q2: Explain the Principle of Least Privilege (PoLP) and why DBAs avoid root in app configs.',
    qBn: 'প্রশ্ন ২: Principle of Least Privilege (PoLP) কী এবং অ্যাপ্লিকেশনে root অ্যাকাউন্ট ব্যবহার করা হয় না কেন?',
    aEn: 'PoLP grants an account only the minimum permissions required for its job. If a web app connects as `root`/`postgres` and suffers SQL Injection, the attacker can `DROP DATABASE` or read all OS files. A least-privilege app user limited to `SELECT, INSERT, UPDATE` on app tables limits blast radius.',
    aBn: 'PoLP মানে প্রতিটি অ্যাকাউন্টকে কেবল কাজের জন্য ন্যূনতম প্রয়োজনীয় অনুমতি দেওয়া। অ্যাপে root ব্যবহার করলে SQL Injection-এর মাধ্যমে হ্যাকার পুরো সার্ভার দখল করতে পারে।',
  },
  {
    id: 'q3',
    qEn: 'Q3: What is Encryption at Rest vs Encryption in Transit?',
    qBn: 'প্রশ্ন ৩: Encryption at Rest এবং Encryption in Transit-এর মধ্যে পার্থক্য কী?',
    aEn: 'Encryption at Rest (AES-256 / TDE) encrypts data files, backups, and WAL logs stored on disk so stolen drives are unreadable. Encryption in Transit (TLS 1.3 / SSL) encrypts network packets between client/app and DB server to block Man-in-the-Middle (MitM) eavesdropping.',
    aBn: 'Encryption at Rest (AES-256) ডিস্কে থাকা ডেটা ও ব্যাকআপ এনক্রিপ্ট করে রাখে। Encryption in Transit (TLS) ক্লায়েন্ট ও সার্ভারের মাঝে নেটওয়ার্কে চলমান ডেটা এনক্রিপ্ট করে।',
  },
  {
    id: 'q4',
    qEn: 'Q4: What is WITH GRANT OPTION and what happens on REVOKE CASCADE?',
    qBn: 'প্রশ্ন ৪: WITH GRANT OPTION কী এবং REVOKE CASCADE করলে কী ঘটে?',
    aEn: '`GRANT SELECT ON Students TO ali WITH GRANT OPTION;` allows Ali to forward that SELECT privilege to others. `REVOKE SELECT ON Students FROM ali CASCADE;` revokes Ali’s privilege AND automatically revokes downstream privileges Ali granted to others.',
    aBn: 'WITH GRANT OPTION দিলে ব্যবহারকারী অন্যকেও সেই পারমিশন দিতে পারে। REVOKE CASCADE করলে মূল ব্যবহারকারীর পাশাপাশি তার দেওয়া সব পরবর্তী পারমিশনও বাতিল হয়।',
  },
  {
    id: 'q5',
    qEn: 'Q5: Why is Database Auditing critical even when RBAC and Encryption are enabled?',
    qBn: 'প্রশ্ন ৫: RBAC ও Encryption থাকার পরও Database Auditing জরুরি কেন?',
    aEn: 'RBAC controls who CAN access data, while Auditing records who ACTUALLY accessed/modified what, when, and from which IP. It detects insider misuse, supports forensic incident response, and satisfies compliance (GDPR, HIPAA, PCI-DSS).',
    aBn: 'RBAC নিয়ন্ত্রণ করে কে ডেটা দেখতে পারবে, আর Auditing রেকর্ড রাখে কে কখন কোন আইপি থেকে কী পরিবর্তন করেছে—যা ইনসাইডার থ্রেট শনাক্ত ও কমপ্লায়েন্সের জন্য জরুরি।',
  },
];

export const LESSON14_EXERCISES: Lesson14Exercise[] = [
  {
    id: 'ex1',
    titleEn: 'Exercise 1: RBAC Role & Least Privilege',
    titleBn: 'অনুশীলনী ১: RBAC ও Least Privilege',
    problemEn: 'Create a role `exam_viewer` that can ONLY read `Student_ID` and `GPA` from `Students` (hiding `Phone` and `Address`).',
    problemBn: '`exam_viewer` রোল তৈরি করুন যে শুধু Students টেবিলের `Student_ID` ও `GPA` দেখতে পারবে (`Phone` বা `Address` নয়)।',
    sol: 'CREATE VIEW Public_Grades AS SELECT Student_ID, GPA FROM Students;\nCREATE ROLE exam_viewer;\nGRANT SELECT ON Public_Grades TO exam_viewer;',
  },
  {
    id: 'ex2',
    titleEn: 'Exercise 2: Revoke Cascading Privileges',
    titleBn: 'অনুশীলনী ২: ক্যাসকেডিং পারমিশন বাতিল',
    problemEn: 'User `alice` received `UPDATE ON Grades WITH GRANT OPTION` and granted it to `bob`. How do you revoke both cleanly?',
    problemBn: '`alice` `WITH GRANT OPTION` পেয়ে `bob`-কে পারমিশন দিয়েছে। দুজনেরই পারমিশন কীভাবে বাতিল করবেন?',
    sol: 'REVOKE UPDATE ON Grades FROM alice CASCADE;',
  },
  {
    id: 'ex3',
    titleEn: 'Exercise 3: Spot & Patch SQLi',
    titleBn: 'অনুশীলনী ৩: SQLi শনাক্ত ও সমাধান',
    problemEn: 'Fix `db.query("DELETE FROM Orders WHERE id = " + req.params.id)` so an attacker passing `1 OR 1=1` cannot wipe all orders.',
    problemBn: '`db.query("DELETE FROM Orders WHERE id = " + req.params.id)` কোডটিকে SQLi থেকে সুরক্ষিত করুন।',
    sol: 'Use parameterized query + integer validation:\ndb.query("DELETE FROM Orders WHERE id = $1", [Number(req.params.id)]);',
  },
  {
    id: 'ex4',
    titleEn: 'Exercise 4: Defense-in-Depth Stack',
    titleBn: 'অনুশীলনী ৪: Defense-in-Depth স্তর',
    problemEn: 'Name 3 distinct security layers protecting a banking database from network sniffing, stolen SSDs, and compromised app credentials.',
    problemBn: 'নেটওয়ার্ক স্নিফিং, চুরি হওয়া SSD ও অ্যাপ ক্রেডেনশিয়াল লিক থেকে বাঁচতে ৩টি আলাদা সিকিউরিটি স্তর উল্লেখ করুন।',
    sol: '1. Network Sniffing -> TLS 1.3 (In Transit)\n2. Stolen SSD -> AES-256 TDE (At Rest)\n3. App Compromise -> RBAC + PoLP + Parameterized Queries + Audit Logs',
  },
];
