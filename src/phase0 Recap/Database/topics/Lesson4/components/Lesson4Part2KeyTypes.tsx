'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Lock,
  Link2,
  CheckCircle2,
  XCircle,
  Table as TableIcon,
  Sparkles,
  Layers,
  AlertTriangle,
  Check,
  X,
  RotateCcw,
  UserPlus,
  ArrowRight,
  Database,
  Hash,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

export default function Lesson4Part2KeyTypes() {
  const { language } = useLanguage();

  const [activeKeyType, setActiveKeyType] = useState<
    'super' | 'candidate' | 'primary' | 'alternate' | 'foreign' | 'composite' | 'unique' | 'surrogate'
  >('super');

  // Super Key Interactive Tester State
  const [selectedSuperKeyCombo, setSelectedSuperKeyCombo] = useState<number>(0);

  // Candidate Key Interactive Tester State
  const [selectedCandidateKeyCombo, setSelectedCandidateKeyCombo] = useState<number>(0);

  // Alternate Key Interactive Election State
  const [selectedPkForAk, setSelectedPkForAk] = useState<'id' | 'nid' | 'email'>('id');

  // Sample Student Table Data specifically designed to demonstrate Super Keys & Candidate Keys
  const studentSampleRows = [
    { id: '101', nid: 'NID-9901', name: 'Rahim', email: 'rahim@edu.bd', dept: 'CSE' },
    { id: '102', nid: 'NID-9902', name: 'Karim', email: 'karim@edu.bd', dept: 'BBA' },
    { id: '103', nid: 'NID-9903', name: 'Nila', email: 'nila@edu.bd', dept: 'EEE' },
    { id: '104', nid: 'NID-9904', name: 'Rahim', email: 'rahim2@edu.bd', dept: 'CSE' },
  ];

  const superKeyCombos = [
    {
      id: 0,
      columns: ['id'],
      labelEn: '{ Student_ID }',
      labelBn: '{ Student_ID }',
      isSuperKey: true,
      isMinimal: true,
      badgeEn: 'Minimal Super Key (Candidate Key)',
      badgeBn: 'ন্যূনতম সুপার কী (ক্যান্ডিডেট কী)',
      analysisEn: 'Valid Super Key! Every single Student_ID (101, 102, 103, 104) is 100% unique across all rows. Because no attribute can be removed without losing uniqueness, it is also a Candidate Key.',
      analysisBn: 'বৈধ সুপার কী! প্রতিটি Student_ID (১০১, ১০২, ১০৩, ১০৪) সম্পূর্ণ অনন্য। এর কোনো অংশ বাদ দেওয়ার সুযোগ নেই, তাই এটি একইসাথে একটি ক্যান্ডিডেট কী।',
    },
    {
      id: 1,
      columns: ['email'],
      labelEn: '{ Email }',
      labelBn: '{ Email }',
      isSuperKey: true,
      isMinimal: true,
      badgeEn: 'Minimal Super Key (Candidate Key)',
      badgeBn: 'ন্যূনতম সুপার কী (ক্যান্ডিডেট কী)',
      analysisEn: 'Valid Super Key! Every student has a unique email. No two rows share the same email address, making it a minimal super key.',
      analysisBn: 'বৈধ সুপার কী! প্রতিটি শিক্ষার্থীর ইমেইল অ্যাড্রেস ভিন্ন ভিন্ন। কোনো রো-তেই ডুপ্লিকেট নেই, তাই এটিও একটি ন্যূনতম সুপার কী।',
    },
    {
      id: 2,
      columns: ['id', 'name'],
      labelEn: '{ Student_ID, Name }',
      labelBn: '{ Student_ID, Name }',
      isSuperKey: true,
      isMinimal: false,
      badgeEn: 'Super Key (with Redundant Column)',
      badgeBn: 'অতিরিক্ত কলামযুক্ত সুপার কী (Redundant Attribute)',
      analysisEn: 'Valid Super Key! Notice that "Rahim" appears twice in the table, BUT the pairs (101, Rahim) and (104, Rahim) are distinct. Even though "Name" is unnecessary/redundant, this combination still uniquely identifies each row.',
      analysisBn: 'বৈধ সুপার কী! লক্ষ্য করুন, টেবিলে "Rahim" দুবার আছে, কিন্তু (১০১, রহিম) এবং (১০৪, রহিম) জোড়া দুটি সম্পূর্ণ অনন্য! Name কলামটি অপ্রয়োজনীয় হলেও কম্বিনেশনটি একটি বৈধ সুপার কী।',
    },
    {
      id: 3,
      columns: ['email', 'dept'],
      labelEn: '{ Email, Department }',
      labelBn: '{ Email, Department }',
      isSuperKey: true,
      isMinimal: false,
      badgeEn: 'Super Key (with Redundant Column)',
      badgeBn: 'অতিরিক্ত কলামযুক্ত সুপার কী',
      analysisEn: 'Valid Super Key! Because Email is unique, combining it with Department still guarantees full uniqueness for every row, even though Department repeats.',
      analysisBn: 'বৈধ সুপার কী! Email সম্পূর্ণ ইউনিক হওয়ায় Department কলাম যুক্ত করলেও পুরো জোড়াটি শতভাগ ইউনিক থাকে। এটিও একটি সুপার কী।',
    },
    {
      id: 4,
      columns: ['id', 'name', 'dept'],
      labelEn: '{ Student_ID, Name, Department }',
      labelBn: '{ Student_ID, Name, Department }',
      isSuperKey: true,
      isMinimal: false,
      badgeEn: 'Composite Super Key',
      badgeBn: 'বৃহৎ সুপার কী (৩টি কলাম)',
      analysisEn: 'Valid Super Key! Contains 3 attributes. Uniqueness is guaranteed by Student_ID. Mathematically, any superset of a candidate key is a Super Key!',
      analysisBn: 'বৈধ সুপার কী! এতে ৩টি কলাম রয়েছে। Student_ID থাকায় অনন্যতা নিশ্চিত। গাণিতিকভাবে ক্যান্ডিডেট কী-এর সাথে যেকোনো কলাম জুড়লে তা সুপার কী হয়।',
    },
    {
      id: 5,
      columns: ['name'],
      labelEn: '{ Name } ❌ Not a Key',
      labelBn: '{ Name } ❌ সুপার কী নয়',
      isSuperKey: false,
      isMinimal: false,
      badgeEn: 'NOT a Super Key (Duplicate Values!)',
      badgeBn: 'সুপার কী নয় (ডুপ্লিকেট মান আছে!)',
      analysisEn: 'Invalid! "Rahim" appears in row 1 AND row 4. A database cannot distinguish between these two students using Name alone, so it CANNOT be a Super Key.',
      analysisBn: 'অবৈধ! "Rahim" নামটি রো ১ এবং রো ৪ উভয় স্থানেই আছে। শুধু নাম দিয়ে ডেটাবেস এদের আলাদা করতে পারে না, তাই এটি সুপার কী হতে পারে না।',
    },
    {
      id: 6,
      columns: ['dept'],
      labelEn: '{ Department } ❌ Not a Key',
      labelBn: '{ Department } ❌ সুপার কী নয়',
      isSuperKey: false,
      isMinimal: false,
      badgeEn: 'NOT a Super Key (Duplicate Values!)',
      badgeBn: 'সুপার কী নয় (ডুপ্লিকেট মান আছে!)',
      analysisEn: 'Invalid! Multiple students belong to "CSE". Department alone cannot distinguish between individual students.',
      analysisBn: 'অবৈধ! একাধিক শিক্ষার্থীর ডিপার্টমেন্ট "CSE"। শুধু Department দিয়ে শিক্ষার্থীদের আলাদা করা সম্ভব নয়।',
    },
  ];

  const candidateKeyCombos = [
    {
      id: 0,
      columns: ['id'],
      labelEn: '{ Student_ID }',
      labelBn: '{ Student_ID }',
      isCandidateKey: true,
      isSuperKey: true,
      isMinimal: true,
      badgeEn: 'Valid Candidate Key (CK 1)',
      badgeBn: 'বৈধ ক্যান্ডিডেট কী (CK ১)',
      reductionEn: '100% Minimal. Cannot remove any attribute without losing uniqueness.',
      reductionBn: '১০০% ন্যূনতম। কোনো কলাম বাদ দেওয়ার সুযোগ নেই।',
      analysisEn: 'Valid Candidate Key! It uniquely identifies every student (101, 102, 103, 104) and contains zero redundant columns. A prime candidate for becoming the Primary Key.',
      analysisBn: 'বৈধ ক্যান্ডিডেট কী! এটি প্রতিটি শিক্ষার্থীকে অনন্যভাবে শনাক্ত করে এবং এতে কোনো অপ্রয়োজনীয় কলাম নেই। এটি প্রাইমারি কি হওয়ার প্রধান দাবিদার।',
    },
    {
      id: 1,
      columns: ['nid'],
      labelEn: '{ National_ID }',
      labelBn: '{ National_ID (জাতীয় পরিচয়পত্র) }',
      isCandidateKey: true,
      isSuperKey: true,
      isMinimal: true,
      badgeEn: 'Valid Candidate Key (CK 2)',
      badgeBn: 'বৈধ ক্যান্ডিডেট কী (CK ২)',
      reductionEn: '100% Minimal. Real-world legal identifier, perfectly unique for each student.',
      reductionBn: '১০০% ন্যূনতম। বাস্তব জগতের অনন্য আইডি, কোনো অতিরিক্ত কলাম নেই।',
      analysisEn: 'Valid Candidate Key! Every student has a unique government National ID. It is irreducible and satisfies all candidate key requirements.',
      analysisBn: 'বৈধ ক্যান্ডিডেট কী! প্রত্যেক শিক্ষার্থীর এনআইডি অনন্য। এটি অবিভাজ্য এবং ক্যান্ডিডেট কী-এর সকল শর্ত পূরণ করে।',
    },
    {
      id: 2,
      columns: ['email'],
      labelEn: '{ Email }',
      labelBn: '{ Email }',
      isCandidateKey: true,
      isSuperKey: true,
      isMinimal: true,
      badgeEn: 'Valid Candidate Key (CK 3)',
      badgeBn: 'বৈধ ক্যান্ডিডেট কী (CK ৩)',
      reductionEn: '100% Minimal. No two students can share an email address.',
      reductionBn: '১০০% ন্যূনতম। কোনো শিক্ষার্থীর ইমেইল ডুপ্লিকেট হতে পারে না।',
      analysisEn: 'Valid Candidate Key! Emails are unique across all rows with no redundant attributes attached.',
      analysisBn: 'বৈধ ক্যান্ডিডেট কী! সকল রো-তে ইমেইল সম্পূর্ণ অনন্য এবং কোনো অতিরিক্ত কলাম যুক্ত নেই।',
    },
    {
      id: 3,
      columns: ['id', 'name'],
      labelEn: '{ Student_ID, Name }',
      labelBn: '{ Student_ID, Name }',
      isCandidateKey: false,
      isSuperKey: true,
      isMinimal: false,
      badgeEn: 'Super Key, but NOT Candidate Key',
      badgeBn: 'সুপার কী, কিন্তু ক্যান্ডিডেট কী নয়!',
      reductionEn: 'Fails Minimality Test: Dropping "Name" leaves { Student_ID }, which is ALREADY unique!',
      reductionBn: 'ন্যূনতমতার পরীক্ষায় অনুত্তীর্ণ: "Name" বাদ দিলেও { Student_ID } একাই ইউনিক থাকে!',
      analysisEn: 'Rejected as Candidate Key! While unique (a Super Key), the "Name" attribute is redundant. A Candidate Key strictly prohibits extra attributes that can be pruned away without losing uniqueness.',
      analysisBn: 'ক্যান্ডিডেট কী হিসেবে বাতিল! এটি ইউনিক (সুপার কী), কিন্তু "Name" কলামটি অপ্রয়োজনীয়। ক্যান্ডিডেট কীতে অতিরিক্ত কোনো কলাম থাকা নিষিদ্ধ।',
    },
    {
      id: 4,
      columns: ['id', 'nid'],
      labelEn: '{ Student_ID, National_ID }',
      labelBn: '{ Student_ID, National_ID }',
      isCandidateKey: false,
      isSuperKey: true,
      isMinimal: false,
      badgeEn: 'Two Keys Bundled (Redundant)',
      badgeBn: 'দুটি কী-এর অপ্রয়োজনীয় সংমিশ্রণ',
      reductionEn: 'Fails Minimality Test: Contains TWO independent candidate keys together!',
      reductionBn: 'ন্যূনতমতার পরীক্ষায় অনুত্তীর্ণ: দুটি পৃথক ক্যান্ডিডেট কী একসাথে জুড়ে দেওয়া হয়েছে!',
      analysisEn: 'Rejected as Candidate Key! Both Student_ID and National_ID are individual candidate keys. Combining them creates an oversized Super Key with redundant uniqueness guarantees.',
      analysisBn: 'ক্যান্ডিডেট কী হিসেবে বাতিল! Student_ID এবং National_ID উভয়েই স্বতন্ত্র ক্যান্ডিডেট কী। এদের জোড়া লাগালে তা অপ্রয়োজনীয় বড় সুপার কী হয়, ক্যান্ডিডেট কী নয়।',
    },
    {
      id: 5,
      columns: ['name'],
      labelEn: '{ Name } ❌ Not Unique',
      labelBn: '{ Name } ❌ ইউনিক নয়',
      isCandidateKey: false,
      isSuperKey: false,
      isMinimal: false,
      badgeEn: 'Not Even a Super Key!',
      badgeBn: 'সুপার কী-ই নয়!',
      reductionEn: 'Fails Uniqueness: "Rahim" repeats in row 1 and 4.',
      reductionBn: 'ইউনিকনেস পরীক্ষায় অনুত্তীর্ণ: "Rahim" নামটি রো ১ ও ৪ এ ডুপ্লিকেট।',
      analysisEn: 'Invalid! To be a Candidate Key, an attribute set MUST first be a Super Key. Because duplicate names exist, it fails at the fundamental uniqueness level.',
      analysisBn: 'অবৈধ! ক্যান্ডিডেট কী হতে হলে প্রথমে তাকে অবশ্যই সুপার কী (ইউনিক) হতে হবে। নাম ডুপ্লিকেট থাকায় এটি শুরুতেই বাতিল।',
    },
  ];

  // Primary Key Playground State & Live Interactive Table
  const initialPkStudents = [
    { id: '101', name: 'Rahim', email: 'rahim@edu.bd', dept: 'CSE' },
    { id: '102', name: 'Karim', email: 'karim@edu.bd', dept: 'BBA' },
    { id: '103', name: 'Nila', email: 'nila@edu.bd', dept: 'EEE' },
    { id: '104', name: 'Afsana', email: 'afsana@edu.bd', dept: 'SWE' },
  ];
  const [pkStudents, setPkStudents] = useState(initialPkStudents);
  const [collidingId, setCollidingId] = useState<string | null>(null);
  const [lastInsertedId, setLastInsertedId] = useState<string | null>(null);
  const [testPkId, setTestPkId] = useState('101');
  const [testPkName, setTestPkName] = useState('Sabbir');
  const [pkAlert, setPkAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  const executePkTest = (idToTest: string, nameToTest: string) => {
    const trimmedId = idToTest.trim();
    const trimmedName = nameToTest.trim();
    setTestPkId(trimmedId);
    setTestPkName(trimmedName);

    if (!trimmedId) {
      setCollidingId(null);
      setLastInsertedId(null);
      setPkAlert({
        type: 'error',
        msgEn: '❌ Error: NOT NULL Constraint Violation! In a relational database, a Primary Key cannot be NULL or empty. Database engine rejected the insert!',
        msgBn: '❌ ত্রুটি: NOT NULL শর্ত লঙ্ঘন! রিলেশনাল ডেটাবেসে প্রাইমারি কি কখনো NULL বা খালি হতে পারে না। ডেটাবেস ইঞ্জিন ইনসার্ট বাতিল করেছে!',
      });
      return;
    }

    const existingMatch = pkStudents.find((s) => s.id === trimmedId);
    if (existingMatch) {
      setCollidingId(trimmedId);
      setLastInsertedId(null);
      setPkAlert({
        type: 'error',
        msgEn: `❌ Error: Primary Key Violation! Student_ID "${trimmedId}" already exists in the table (assigned to ${existingMatch.name}). Primary Keys must be strictly UNIQUE!`,
        msgBn: `❌ ত্রুটি: প্রাইমারি কি ডুপ্লিকেট লঙ্ঘন! Student_ID "${trimmedId}" ইতিমধ্যে টেবিলে বিদ্যমান (${existingMatch.name}-এর জন্য বরাদ্দ)। প্রাইমারি কি অবশ্যই ১০০% ইউনিক হতে হবে!`,
      });
      return;
    }

    // Valid unique insert
    setCollidingId(null);
    setLastInsertedId(trimmedId);
    const newStudent = {
      id: trimmedId,
      name: trimmedName || `Student ${trimmedId}`,
      email: `${(trimmedName || 'student').toLowerCase().replace(/\s+/g, '')}@edu.bd`,
      dept: 'CSE',
    };
    setPkStudents((prev) => [...prev, newStudent]);
    setPkAlert({
      type: 'success',
      msgEn: `✓ Success: Primary Key "${trimmedId}" passed both UNIQUE and NOT NULL constraints! Student "${newStudent.name}" was appended to the live STUDENT table below.`,
      msgBn: `✓ সফল: প্রাইমারি কি "${trimmedId}" ইউনিকনেস এবং NOT NULL উভয় শর্তই পূরণ করেছে! শিক্ষার্থী "${newStudent.name}" নিচের টেবিলে সফলভাবে যুক্ত হয়েছে।`,
    });
  };

  const handleTestInsert = (e: React.FormEvent) => {
    e.preventDefault();
    executePkTest(testPkId, testPkName);
  };

  const handleResetPkTable = () => {
    setPkStudents(initialPkStudents);
    setCollidingId(null);
    setLastInsertedId(null);
    setPkAlert(null);
    setTestPkId('101');
    setTestPkName('Sabbir');
  };

  // Foreign Key Playground State & Live Linked Tables
  const [selectedDeptId, setSelectedDeptId] = useState<string>('D01');
  const [fkAlert, setFkAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  const fkDepartments = [
    { id: 'D01', name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. Kabir', room: 'Lab 401' },
    { id: 'D02', name: 'Business Administration', code: 'BBA', head: 'Prof. Anis', room: 'Tower 202' },
    { id: 'D03', name: 'Electrical & Electronic Engineering', code: 'EEE', head: 'Dr. Tariq', room: 'Eng 105' },
  ];
  const departments = fkDepartments;

  const initialFkStudents = [
    { id: '101', name: 'Rahim', deptId: 'D01' },
    { id: '102', name: 'Karim', deptId: 'D02' },
    { id: '103', name: 'Nila', deptId: 'D01' },
    { id: '104', name: 'Sami', deptId: 'D03' },
  ];
  const [fkStudents, setFkStudents] = useState(initialFkStudents);
  const existingStudents = fkStudents.map((s) => ({ ...s, email: `${s.name.toLowerCase()}@edu.bd` }));

  const handleFkTest = (deptId: string) => {
    setSelectedDeptId(deptId);
    if (deptId === 'D99') {
      setFkAlert({
        type: 'error',
        msgEn: '❌ Referential Integrity Violation! Dept_ID "D99" does not exist in parent table "DEPARTMENT". Database engine strictly rejects orphan child records!',
        msgBn: '❌ রেফারেন্সিয়াল ইন্টিগ্রিটি লঙ্ঘন! মূল টেবিল "DEPARTMENT"-এ "D99" নামের কোনো বিভাগ নেই। ডেটাবেস ইঞ্জিন এই অনাথ রেকর্ড গ্রহণ করতে সম্পূর্ণ অস্বীকৃতি জানিয়েছে!',
      });
    } else if (deptId === 'NULL') {
      setFkAlert({
        type: 'success',
        msgEn: '✓ Foreign Key NULL Accepted: Student enrolled with undeclared department. In relational DBMS, foreign keys CAN be NULL unless explicitly defined as NOT NULL.',
        msgBn: '✓ ফরেন কি NULL গৃহীত: শিক্ষার্থী এখনো বিভাগ পছন্দ করেনি। রিলেশনাল ডেটাবেসে ফরেন কি কলাম NULL হতে পারে (যদি না NOT NULL শর্ত দেওয়া থাকে)।',
      });
    } else {
      const match = fkDepartments.find((d) => d.id === deptId);
      setFkAlert({
        type: 'success',
        msgEn: `✓ Referential Integrity Verified: Foreign Key "${deptId}" successfully resolves to parent department "${match?.name}"!`,
        msgBn: `✓ রেফারেন্সিয়াল ইন্টিগ্রিটি সঠিক: ফরেন কি "${deptId}" প্যারেন্ট টেবিলের বিভাগ "${match?.name}"-এর সাথে সফলভাবে লিংক হয়েছে!`,
      });
    }
  };

  const handleResetFk = () => {
    setSelectedDeptId('D01');
    setFkAlert(null);
  };

  // Composite Key State & Interactive Tester
  const [compositeTestMode, setCompositeTestMode] = useState<'both' | 'student_only' | 'course_only'>('both');
  const [compositeAlert, setCompositeAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);

  const initialEnrollments = [
    { studentId: '101', studentName: 'Rahim', courseId: 'CSE101', courseName: 'Structured Programming', semester: 'Spring 2026', grade: 'A' },
    { studentId: '101', studentName: 'Rahim', courseId: 'CSE201', courseName: 'Database Systems', semester: 'Spring 2026', grade: 'A-' },
    { studentId: '102', studentName: 'Karim', courseId: 'CSE101', courseName: 'Structured Programming', semester: 'Spring 2026', grade: 'B+' },
    { studentId: '102', studentName: 'Karim', courseId: 'MAT101', courseName: 'Linear Algebra', semester: 'Summer 2026', grade: 'A' },
    { studentId: '103', studentName: 'Nila', courseId: 'CSE101', courseName: 'Structured Programming', semester: 'Spring 2026', grade: 'A+' },
  ];
  const [enrollments, setEnrollments] = useState(initialEnrollments);

  const handleTestCompositeCollision = (studentId: string, courseId: string) => {
    const exists = enrollments.some((e) => e.studentId === studentId && e.courseId === courseId);
    if (exists) {
      setCompositeAlert({
        type: 'error',
        msgEn: `❌ Composite Primary Key Violation! Student "${studentId}" is ALREADY enrolled in Course "${courseId}"! The composite pair (${studentId}, ${courseId}) cannot be duplicated.`,
        msgBn: `❌ কম্পোজিট প্রাইমারি কি লঙ্ঘন! শিক্ষার্থী "${studentId}" ইতিমধ্যে কোর্স "${courseId}"-এ নিবন্ধিত! এই যৌথ জোড়া (${studentId}, ${courseId}) কখনোই ডুপ্লিকেট হতে পারে না।`,
      });
    } else {
      const newEnrollment = {
        studentId,
        studentName: 'Afsana',
        courseId,
        courseName: 'Algorithms',
        semester: 'Fall 2026',
        grade: 'Enrolled',
      };
      setEnrollments((prev) => [...prev, newEnrollment]);
      setCompositeAlert({
        type: 'success',
        msgEn: `✓ Success! The composite pair (${studentId}, ${courseId}) is unique and was successfully inserted into ENROLLMENT!`,
        msgBn: `✓ সফল! যৌথ জোড়া (${studentId}, ${courseId}) সম্পূর্ণ ইউনিক এবং এটি সফলভাবে ENROLLMENT টেবিলে যুক্ত হয়েছে!`,
      });
    }
  };

  const handleResetEnrollments = () => {
    setEnrollments(initialEnrollments);
    setCompositeAlert(null);
  };

  // Unique Key Playground State & Live Accounts Table
  const initialUniqueAccounts = [
    { id: 1, username: 'rahim99', phone: '01711-001122', recoveryEmail: 'rahim.alt@gmail.com' },
    { id: 2, username: 'karim_dev', phone: '01811-334455', recoveryEmail: null },
    { id: 3, username: 'nila_bd', phone: null, recoveryEmail: null },
  ];
  const [uniqueAccounts, setUniqueAccounts] = useState(initialUniqueAccounts);
  const [uniqueAlert, setUniqueAlert] = useState<{
    type: 'error' | 'success';
    msgEn: string;
    msgBn: string;
  } | null>(null);
  const [uniqueCollidingField, setUniqueCollidingField] = useState<string | null>(null);

  const handleTestUniqueScenario = (scenario: 'dup_username' | 'dup_phone' | 'insert_null' | 'valid_new') => {
    if (scenario === 'dup_username') {
      setUniqueCollidingField('username');
      setUniqueAlert({
        type: 'error',
        msgEn: '❌ UNIQUE Constraint Violation! Username "rahim99" is already taken by User #1. UNIQUE columns reject duplicate non-null entries.',
        msgBn: '❌ UNIQUE কনস্ট্রেইন্ট লঙ্ঘন! "rahim99" ইউজারনেমটি ইতিমধ্যে ১ নম্বর ব্যবহারকারীর দখলে রয়েছে। ইউনিক কলামে ডুপ্লিকেট গ্রহণ করা হয় না।',
      });
    } else if (scenario === 'dup_phone') {
      setUniqueCollidingField('phone');
      setUniqueAlert({
        type: 'error',
        msgEn: '❌ UNIQUE Constraint Violation! Phone "01711-001122" is already linked to an existing account. Duplicate phone registrations are prohibited.',
        msgBn: '❌ UNIQUE কনস্ট্রেইন্ট লঙ্ঘন! ফোন নম্বর "01711-001122" ইতিমধ্যে অন্য একটি অ্যাকাউন্টে নিবন্ধিত রয়েছে। একই ফোন দুবার ব্যবহার করা যাবে না।',
      });
    } else if (scenario === 'insert_null') {
      setUniqueCollidingField(null);
      const newAcc = {
        id: uniqueAccounts.length + 1,
        username: `guest_user_${uniqueAccounts.length + 1}`,
        phone: null,
        recoveryEmail: null,
      };
      setUniqueAccounts((prev) => [...prev, newAcc]);
      setUniqueAlert({
        type: 'success',
        msgEn: '✓ Success: New account inserted with NULL phone and NULL email! In SQL standards, UNIQUE constraints permit multiple NULL values because NULL represents an unknown value (NULL != NULL).',
        msgBn: '✓ সফল: ফোন ও ইমেইল ফাঁকা (NULL) রেখেই নতুন অ্যাকাউন্ট তৈরি হয়েছে! কারণ SQL স্ট্যান্ডার্ডে ইউনিক কলামে একাধিক NULL মান গ্রহণযোগ্য (কারণ একটি অজানা মান আরেকটি অজানা মানের সমান নয়)।',
      });
    } else if (scenario === 'valid_new') {
      setUniqueCollidingField(null);
      const newAcc = {
        id: uniqueAccounts.length + 1,
        username: 'tanvir_pro',
        phone: '01911-778899',
        recoveryEmail: 'tanvir@gmail.com',
      };
      setUniqueAccounts((prev) => [...prev, newAcc]);
      setUniqueAlert({
        type: 'success',
        msgEn: '✓ Success: User "tanvir_pro" passed all UNIQUE checks! Both Username and Phone are distinct.',
        msgBn: '✓ সফল: ব্যবহারকারী "tanvir_pro" সকল ইউনিক শর্ত পূরণ করেছে! ইউজারনেম ও ফোন নম্বর উভয়ই সম্পূর্ণ স্বতন্ত্র।',
      });
    }
  };

  const handleResetUniqueAccounts = () => {
    setUniqueAccounts(initialUniqueAccounts);
    setUniqueAlert(null);
    setUniqueCollidingField(null);
  };

  // Natural vs Surrogate Key State
  const [activeKeyArch, setActiveKeyArch] = useState<'surrogate' | 'natural'>('surrogate');

  const keyTabs = [
    { id: 'super', labelEn: '1. Super Key', labelBn: '১. সুপার কী', tagEn: 'All Unique Combos', tagBn: 'সকল অনন্য কম্বিনেশন' },
    { id: 'candidate', labelEn: '2. Candidate Key', labelBn: '২. ক্যান্ডিডেট কী', tagEn: 'Minimal Super Key', tagBn: 'ন্যূনতম সুপার কী' },
    { id: 'primary', labelEn: '3. Primary Key', labelBn: '৩. প্রাইমারি কী', tagEn: 'Main Unique ID', tagBn: 'প্রধান অনন্য আইডি' },
    { id: 'alternate', labelEn: '4. Alternate Key', labelBn: '৪. অল্টারনেট কী', tagEn: 'Remaining Candidates', tagBn: 'বিকল্প ক্যান্ডিডেটসমূহ' },
    { id: 'foreign', labelEn: '5. Foreign Key', labelBn: '৫. ফরেন কী', tagEn: 'Connects Tables', tagBn: 'টেবিলের সংযোগ' },
    { id: 'composite', labelEn: '6. Composite Key', labelBn: '৬. কম্পোজিট কী', tagEn: 'Multiple Columns', tagBn: 'একাধিক কলামের কি' },
    { id: 'unique', labelEn: '7. Unique Key', labelBn: '৭. ইউনিক কী', tagEn: 'No Duplicates', tagBn: 'ডুপ্লিকেটহীন' },
    { id: 'surrogate', labelEn: '8. Natural and Surrogate', labelBn: '৮. ন্যাচারাল অ্যান্ড সারোগেট', tagEn: 'Real & Artificial', tagBn: 'বাস্তব ও কৃত্রিম' },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold">
            {language === 'bn' ? 'পর্ব ২ / ৮' : 'Part 2 of 8'}
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            <DualText
              en="The Types of Keys in DBMS"
              bn="ডিবিএমএস-এ বিভিন্ন ধরনের কী (Types of Keys in DBMS)"
            />
          </h2>
        </div>
      </div>

      {/* 8 Key Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {keyTabs.map((tab) => {
          const isActive = activeKeyType === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveKeyType(tab.id as typeof activeKeyType)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                isActive
                  ? 'bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/40 shadow-md'
                  : 'bg-[#101322] border-slate-800 text-zinc-400 hover:border-slate-700'
              }`}
            >
              <span className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                {language === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {language === 'bn' ? tab.tagBn : tab.tagEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------
          TAB 1: SUPER KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'super' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <DualText en="1. Super Key (সুপার কী)" bn="১. সুপার কী (Super Key)" />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'কোনো টেবিলের সারিগুলোকে এককভাবে শনাক্ত করার যেকোনো বৈধ কম্বিনেশন'
                  : 'Any attribute set that uniquely identifies each tuple in a relation'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold shrink-0">
              {language === 'bn' ? 'যেকোনো অনন্য কম্বিনেশন' : 'Any Unique Combination'}
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: A Super Key is a set of one or more attributes that uniquely identifies each tuple in a relation. Crucial Rule: A Super Key CAN contain redundant (unnecessary) attributes, as long as uniqueness is preserved!"
              bn="সংজ্ঞা: কোনো টেবিলের এক বা একাধিক অ্যাট্রিবিউটের এমন যেকোনো সেট যা প্রতিটি সারিকে (Tuple) অদ্বিতীয়ভাবে শনাক্ত করতে পারে, তাকে সুপার কী বলে। মূল নিয়ম: সুপার কীতে অপ্রয়োজনীয় বা অতিরিক্ত কলামও যুক্ত থাকতে পারে—যতক্ষণ পর্যন্ত তা ইউনিক থাকে!"
            />
          </div>

          {/* Interactive Key Combination Selector */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-indigo-400" />
                {language === 'bn'
                  ? 'অ্যাট্রিবিউট কম্বিনেশন সিলেক্ট করে টেবিলে তার প্রভাব দেখুন:'
                  : 'Select an Attribute Combination to test on the STUDENT Table:'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'ক্লিক করে পরীক্ষা করুন' : 'Click to inspect uniqueness'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {superKeyCombos.map((combo) => {
                const isSelected = selectedSuperKeyCombo === combo.id;
                return (
                  <button
                    key={combo.id}
                    onClick={() => setSelectedSuperKeyCombo(combo.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? combo.isSuperKey
                          ? 'bg-indigo-950/60 border-indigo-400 text-white shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-400/50'
                          : 'bg-rose-950/50 border-rose-400 text-white shadow-lg shadow-rose-950/50 ring-1 ring-rose-400/50'
                        : 'bg-[#0c0e18] border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">
                        {language === 'bn' ? combo.labelBn : combo.labelEn}
                      </span>
                      {combo.isSuperKey ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono ${
                        combo.isSuperKey
                          ? combo.isMinimal
                            ? 'text-cyan-400'
                            : 'text-indigo-300'
                          : 'text-rose-400'
                      }`}
                    >
                      {language === 'bn' ? combo.badgeBn : combo.badgeEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic STUDENT Table with Active Combination Columns Highlighted */}
          {(() => {
            const activeCombo = superKeyCombos[selectedSuperKeyCombo] || superKeyCombos[0];
            const allComboValues = studentSampleRows.map((s) =>
              activeCombo.columns.map((c) => s[c as keyof typeof s]).join(', ')
            );

            return (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      STUDENT Relation
                    </span>
                    <span className="text-zinc-400 font-sans">
                      {language === 'bn'
                        ? '৪টি নমুনা শিক্ষার্থী রেকর্ড'
                        : '4 Sample Student Records'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {language === 'bn'
                      ? 'সতর্কতা: "Rahim" নামটি টেবিলে ২ বার রয়েছে (রো ১ ও ৪)'
                      : 'Note: Name "Rahim" repeats in Row 1 & Row 4'}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                        <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-slate-800/60">
                          {language === 'bn' ? 'রো #' : 'Row #'}
                        </th>

                        {/* Column: Student_ID */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('id')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Student_ID</span>
                            {activeCombo.columns.includes('id') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Name */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('name')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Name</span>
                            {activeCombo.columns.includes('name') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Email */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('email')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Email</span>
                            {activeCombo.columns.includes('email') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Department */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('dept')
                              ? 'bg-indigo-950/70 text-indigo-200 border-b-2 border-indigo-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Department</span>
                            {activeCombo.columns.includes('dept') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Combined Key Value Column */}
                        <th className="py-2.5 px-3 text-right bg-slate-900/80 text-amber-300 border-l border-slate-800">
                          {language === 'bn'
                            ? 'সিলেক্টেড কী মান ও ফলাফল'
                            : 'Combined Key Value (Uniqueness)'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                      {studentSampleRows.map((student, idx) => {
                        const rowVal = activeCombo.columns
                          .map((c) => student[c as keyof typeof student])
                          .join(', ');
                        const isDuplicate =
                          allComboValues.filter((v) => v === rowVal).length > 1;

                        return (
                          <tr
                            key={student.id}
                            className={`transition-colors ${
                              isDuplicate
                                ? 'bg-rose-950/20'
                                : idx % 2 === 0
                                ? 'bg-[#0f1224]/30'
                                : 'bg-[#0c0e18]'
                            }`}
                          >
                            <td className="py-2 px-3 text-center text-zinc-500 border-r border-slate-800/60">
                              {idx + 1}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('id')
                                  ? 'bg-indigo-950/30 text-indigo-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.id}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('name')
                                  ? student.name === 'Rahim' && !activeCombo.columns.includes('id')
                                    ? 'bg-rose-950/40 text-rose-300 font-bold'
                                    : 'bg-indigo-950/30 text-indigo-200 font-bold'
                                  : student.name === 'Rahim'
                                  ? 'text-amber-300/80'
                                  : 'text-zinc-300'
                              }`}
                            >
                              {student.name}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('email')
                                  ? 'bg-indigo-950/30 text-indigo-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.email}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('dept')
                                  ? 'bg-indigo-950/30 text-indigo-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.dept}
                            </td>

                            <td className="py-2 px-3 text-right border-l border-slate-800 font-mono">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-zinc-200 font-bold">
                                  ({rowVal})
                                </span>
                                {isDuplicate ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                                    <X className="w-3 h-3" />
                                    {language === 'bn' ? 'ডুপ্লিকেট!' : 'Duplicate!'}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    {language === 'bn' ? 'ইউনিক' : 'Unique'}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Analysis Box for Selected Combination */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    activeCombo.isSuperKey
                      ? 'bg-gradient-to-r from-indigo-950/40 via-slate-900 to-[#101428] border-indigo-500/30 text-indigo-200'
                      : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-[#1c1218] border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80 mb-2">
                    <div className="flex items-center gap-2">
                      {activeCombo.isSuperKey ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <span className="font-mono font-bold text-sm text-white">
                        {language === 'bn' ? activeCombo.labelBn : activeCombo.labelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          activeCombo.isSuperKey
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {activeCombo.isSuperKey
                          ? language === 'bn'
                            ? '✓ একটি বৈধ সুপার কী'
                            : '✓ Valid Super Key'
                          : language === 'bn'
                          ? '❌ সুপার কী নয় (Invalid)'
                          : '❌ Not a Super Key'}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        ({language === 'bn' ? activeCombo.badgeBn : activeCombo.badgeEn})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {language === 'bn'
                      ? activeCombo.analysisBn
                      : activeCombo.analysisEn}
                  </p>
                </div>

                {/* Master Golden Rule Pill Callout */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 text-xs font-sans flex items-start sm:items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Layers className="w-4 h-4" />
                  </span>
                  <div className="leading-snug text-zinc-300 text-[11px]">
                    <DualText
                      en="Key Relationship Rule: Super Key = Candidate Key + (Optional redundant attributes). Every Candidate Key is by definition a Super Key, but a Super Key that contains redundant columns is NOT a Candidate Key!"
                      bn="মূল সম্পর্ক ও নিয়ম: সুপার কী = ক্যান্ডিডেট কী + (যেকোনো ঐচ্ছিক বা অপ্রয়োজনীয় কলাম)। প্রতিটি ক্যান্ডিডেট কী-ই জন্মগতভাবে একটি সুপার কী; তবে যেসব সুপার কীতে অপ্রয়োজনীয় কলাম থাকে সেগুলো ক্যান্ডিডেট কী হতে পারে না!"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 2: CANDIDATE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'candidate' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-slate-800 space-y-6 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <DualText en="2. Candidate Key (ক্যান্ডিডেট কী)" bn="২. ক্যান্ডিডেট কী (Candidate Key)" />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'ন্যূনতম (Minimal) সুপার কী — যেখান থেকে কোনো কলাম বাদ দিলে ইউনিকনেস হারিয়ে যায়'
                  : 'Minimal Super Key with zero redundant attributes (Irreducible Unique Identifier)'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold shrink-0">
              {language === 'bn' ? 'ন্যূনতম সুপার কী (Zero Redundancy)' : 'Minimal Super Key'}
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/40 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: A Candidate Key is a minimal Super Key that uniquely identifies each tuple in a relation without any redundant attributes. Crucial Rule: If you drop ANY attribute from a Candidate Key, it loses the ability to uniquely identify every row!"
              bn="সংজ্ঞা: ক্যান্ডিডেট কী হলো এমন একটি ন্যূনতম (Minimal) সুপার কী, যেখান থেকে কোনো অ্যাট্রিবিউট বা কলাম বাদ দিলে সেটি আর প্রতিটি রো-কে ইউনিকভাবে শনাক্ত করতে পারে না। এতে কোনো অতিরিক্ত (Redundant) কলাম থাকতে পারে না!"
            />
          </div>

          {/* Interactive Candidate Key Combination Selector */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wide flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-cyan-400" />
                {language === 'bn'
                  ? 'প্রার্থী কম্বিনেশন সিলেক্ট করে ক্যান্ডিডেট কী-এর শর্ত পরীক্ষা করুন:'
                  : 'Select an Attribute Set to test the Candidate Key Minimality Test:'}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'ন্যূনতমতা (Minimality) পরীক্ষা' : 'Minimality & Uniqueness Test'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {candidateKeyCombos.map((combo) => {
                const isSelected = selectedCandidateKeyCombo === combo.id;
                return (
                  <button
                    key={combo.id}
                    onClick={() => setSelectedCandidateKeyCombo(combo.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? combo.isCandidateKey
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                          : combo.isSuperKey
                          ? 'bg-amber-950/50 border-amber-400 text-white shadow-lg shadow-amber-950/50 ring-1 ring-amber-400/50'
                          : 'bg-rose-950/50 border-rose-400 text-white shadow-lg shadow-rose-950/50 ring-1 ring-rose-400/50'
                        : 'bg-[#0c0e18] border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white">
                        {language === 'bn' ? combo.labelBn : combo.labelEn}
                      </span>
                      {combo.isCandidateKey ? (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      ) : combo.isSuperKey ? (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono ${
                        combo.isCandidateKey
                          ? 'text-cyan-300 font-bold'
                          : combo.isSuperKey
                          ? 'text-amber-300'
                          : 'text-rose-400'
                      }`}
                    >
                      {language === 'bn' ? combo.badgeBn : combo.badgeEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic STUDENT Table with Active Candidate Key Columns Highlighted */}
          {(() => {
            const activeCombo = candidateKeyCombos[selectedCandidateKeyCombo] || candidateKeyCombos[0];
            const allComboValues = studentSampleRows.map((s) =>
              activeCombo.columns.map((c) => s[c as keyof typeof s]).join(', ')
            );

            return (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      STUDENT Relation
                    </span>
                    <span className="text-zinc-400 font-sans">
                      {language === 'bn'
                        ? 'Student_ID, National_ID ও Email — তিনটি সম্ভাব্য ক্যান্ডিডেট কী'
                        : 'Student_ID, National_ID & Email — 3 Potential Candidate Keys'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {language === 'bn'
                      ? 'টেবিলের ৩টি কলাম এককভাবে ইউনিক (Candidate Keys)'
                      : '3 attributes individually unique across records'}
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                        <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-slate-800/60">
                          {language === 'bn' ? 'রো #' : 'Row #'}
                        </th>

                        {/* Column: Student_ID */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('id')
                              ? 'bg-cyan-950/70 text-cyan-200 border-b-2 border-cyan-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Student_ID</span>
                            {activeCombo.columns.includes('id') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: National_ID */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('nid')
                              ? 'bg-cyan-950/70 text-cyan-200 border-b-2 border-cyan-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>National_ID</span>
                            {activeCombo.columns.includes('nid') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Name */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('name')
                              ? 'bg-amber-950/70 text-amber-200 border-b-2 border-amber-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Name</span>
                            {activeCombo.columns.includes('name') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-normal">
                                [Redundant]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Email */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('email')
                              ? 'bg-cyan-950/70 text-cyan-200 border-b-2 border-cyan-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Email</span>
                            {activeCombo.columns.includes('email') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Column: Department */}
                        <th
                          className={`py-2.5 px-3 transition-colors ${
                            activeCombo.columns.includes('dept')
                              ? 'bg-amber-950/70 text-amber-200 border-b-2 border-amber-400 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>Department</span>
                            {activeCombo.columns.includes('dept') && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-normal">
                                [In Key]
                              </span>
                            )}
                          </div>
                        </th>

                        {/* Combined Key Value Column */}
                        <th className="py-2.5 px-3 text-right bg-slate-900/80 text-cyan-300 border-l border-slate-800">
                          {language === 'bn'
                            ? 'সিলেক্টেড মান ও ফলাফল'
                            : 'Selected Values & Minimality'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                      {studentSampleRows.map((student, idx) => {
                        const rowVal = activeCombo.columns
                          .map((c) => student[c as keyof typeof student])
                          .join(', ');
                        const isDuplicate =
                          allComboValues.filter((v) => v === rowVal).length > 1;

                        return (
                          <tr
                            key={student.id}
                            className={`transition-colors ${
                              isDuplicate
                                ? 'bg-rose-950/20'
                                : idx % 2 === 0
                                ? 'bg-[#0f1224]/30'
                                : 'bg-[#0c0e18]'
                            }`}
                          >
                            <td className="py-2 px-3 text-center text-zinc-500 border-r border-slate-800/60">
                              {idx + 1}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('id')
                                  ? 'bg-cyan-950/30 text-cyan-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.id}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('nid')
                                  ? 'bg-cyan-950/30 text-cyan-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.nid}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('name')
                                  ? student.name === 'Rahim' && !activeCombo.isSuperKey
                                    ? 'bg-rose-950/40 text-rose-300 font-bold'
                                    : 'bg-amber-950/30 text-amber-200 font-bold'
                                  : student.name === 'Rahim'
                                  ? 'text-amber-300/80'
                                  : 'text-zinc-300'
                              }`}
                            >
                              {student.name}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('email')
                                  ? 'bg-cyan-950/30 text-cyan-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.email}
                            </td>

                            <td
                              className={`py-2 px-3 ${
                                activeCombo.columns.includes('dept')
                                  ? 'bg-amber-950/30 text-amber-200 font-bold'
                                  : 'text-zinc-400'
                              }`}
                            >
                              {student.dept}
                            </td>

                            <td className="py-2 px-3 text-right border-l border-slate-800 font-mono">
                              <div className="flex items-center justify-end gap-2">
                                <span className="text-zinc-200 font-bold">
                                  ({rowVal})
                                </span>
                                {activeCombo.isCandidateKey ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    {language === 'bn' ? 'ন্যূনতম ও ইউনিক' : 'Minimal & Unique'}
                                  </span>
                                ) : activeCombo.isSuperKey ? (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    {language === 'bn' ? 'অপ্রয়োজনীয় কলাম' : 'Redundant Column'}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                                    <X className="w-3 h-3" />
                                    {language === 'bn' ? 'ডুপ্লিকেট!' : 'Duplicate!'}
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Candidate Key 2-Step Strict Evaluation Matrix */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    activeCombo.isCandidateKey
                      ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900 to-[#101c24] border-cyan-500/40 text-cyan-200'
                      : activeCombo.isSuperKey
                      ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#1c1810] border-amber-500/40 text-amber-200'
                      : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-[#1c1218] border-rose-500/30 text-rose-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80 mb-3">
                    <div className="flex items-center gap-2">
                      {activeCombo.isCandidateKey ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                      ) : activeCombo.isSuperKey ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <span className="font-mono font-bold text-sm text-white">
                        {language === 'bn' ? activeCombo.labelBn : activeCombo.labelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                          activeCombo.isCandidateKey
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                            : activeCombo.isSuperKey
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                            : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {activeCombo.isCandidateKey
                          ? language === 'bn'
                            ? '✓ বৈধ ক্যান্ডিডেট কী'
                            : '✓ Valid Candidate Key'
                          : activeCombo.isSuperKey
                          ? language === 'bn'
                            ? '⚠️ সুপার কী (কিন্তু ক্যান্ডিডেট নয়)'
                            : '⚠️ Super Key (Not Minimal)'
                          : language === 'bn'
                          ? '❌ সুপার কী-ই নয়'
                          : '❌ Invalid Key'}
                      </span>
                    </div>
                  </div>

                  {/* 2-Step Evaluation Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                      <span className="text-[10px] text-zinc-400 uppercase block mb-1">
                        {language === 'bn' ? 'শর্ত ১: ইউনিকনেস (সুপার কী টেস্ট):' : 'Test 1: Uniqueness (Super Key Test):'}
                      </span>
                      {activeCombo.isSuperKey ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'উত্তীর্ণ (সকল রো ইউনিক)' : 'Passed (All rows unique)'}
                        </span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <X className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'অনুত্তীর্ণ (ডুপ্লিকেট বিদ্যমান)' : 'Failed (Duplicates exist)'}
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800">
                      <span className="text-[10px] text-zinc-400 uppercase block mb-1">
                        {language === 'bn' ? 'শর্ত ২: ন্যূনতমতা (Minimality Test):' : 'Test 2: Minimality (Irreducibility):'}
                      </span>
                      {activeCombo.isMinimal ? (
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'উত্তীর্ণ (কোনো কলাম বাদ দেওয়া যাবে না)' : 'Passed (Irreducible set)'}
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {language === 'bn' ? 'অনুত্তীর্ণ (অপ্রয়োজনীয় কলাম রয়েছে)' : 'Failed (Redundant attributes)'}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {language === 'bn'
                      ? activeCombo.analysisBn
                      : activeCombo.analysisEn}
                  </p>
                </div>

                {/* Candidate Key vs Primary Key Takeaway */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/20 via-slate-900 to-indigo-950/20 border border-slate-800 text-xs font-sans flex items-start sm:items-center gap-3">
                  <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <div className="leading-snug text-zinc-300 text-[11px]">
                    <DualText
                      en="Designer Election Rule: In this STUDENT relation, there are 3 valid Candidate Keys: {Student_ID}, {National_ID}, and {Email}. The database designer chooses ONE of them to become the Primary Key (usually Student_ID because it is short, immutable, and integer-indexed)."
                      bn="ডিজাইনারের নির্বাচন নিয়ম: এই STUDENT টেবিলে মোট ৩টি বৈধ ক্যান্ডিডেট কী রয়েছে: {Student_ID}, {National_ID}, এবং {Email}। ডেটাবেস ডিজাইনার এদের মধ্য থেকে যেকোনো একটিকে Primary Key হিসেবে নির্বাচন করবেন (সাধারণত Student_ID-কে বাছা হয় কারণ এটি সংক্ষিপ্ত ও পরিবর্তনহীন)।"
                    />
                  </div>
                </div>

                {/* Core Golden Rule Banner */}
                <div className="p-3.5 rounded-xl bg-[#0c0e18] border border-amber-500/30 text-xs font-mono text-center text-amber-300 font-bold shadow-lg shadow-amber-950/20">
                  <DualText
                    en="“Every Candidate Key is a Super Key, but every Super Key is NOT a Candidate Key!”"
                    bn="“প্রতিটি ক্যান্ডিডেট কী-ই একটি সুপার কী, কিন্তু প্রতিটি সুপার কী ক্যান্ডিডেট কী নয়!”"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 3: PRIMARY KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'primary' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-amber-500/40 space-y-6 animate-in fade-in duration-200 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <DualText en="3. Primary Key (প্রাইমারি কী)" bn="৩. প্রাইমারি কী (Primary Key)" />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'টেবিলের প্রধান শনাক্তকারী — যা শতভাগ ইউনিক এবং কখনোই NULL হতে পারে না'
                  : 'The principal unique identifier of a relation — strictly UNIQUE and NOT NULL'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold shrink-0">
              Unique &amp; NOT NULL
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: A Primary Key is the designated Candidate Key selected by the database designer to uniquely identify every tuple in a table. Once declared, the database engine strictly enforces two iron-clad constraints: No Duplicate Values and No NULL Values!"
              bn="সংজ্ঞা: কোনো টেবিলের সম্ভাব্য ক্যান্ডিডেট কী-সমূহের মধ্য থেকে ডেটাবেস ডিজাইনার যেটিকে প্রধান শনাক্তকারী হিসেবে আনুষ্ঠানিকভাবে বেছে নেন, তাকে Primary Key বলে। প্রাইমারি কি ঘোষণা করলে ডেটাবেস ইঞ্জিন স্বয়ংক্রিয়ভাবে দুটি কঠোর শর্ত বজায় রাখে: কোনো ডুপ্লিকেট মান গ্রহণ করা হবে না এবং মান কখনোই NULL বা ফাঁকা হতে পারবে না!"
            />
          </div>

          {/* 4 Strict Rules of Primary Key */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono text-center">
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-amber-500/30">
              <strong className="text-amber-400 block font-bold">1. 100% Unique</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'কোনো ডুপ্লিকেট নেই' : 'No duplicates allowed'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-rose-500/30">
              <strong className="text-rose-400 block font-bold">2. NOT NULL</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'ফাঁকা থাকা অসম্ভব' : 'Cannot be empty or NULL'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-cyan-500/30">
              <strong className="text-cyan-400 block font-bold">3. Only One PK</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'টেবিল প্রতি মাত্র ১টি' : 'Single key per relation'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-emerald-500/30">
              <strong className="text-emerald-400 block font-bold">4. Fast Index</strong>
              <span className="text-[10px] text-zinc-400">
                {language === 'bn' ? 'স্বয়ংক্রিয় B-Tree ইনডেক্স' : 'Clustered Index O(log N)'}
              </span>
            </div>
          </div>

          {/* Interactive Simulation & Test Control Center */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <DualText
                    en="LIVE PRIMARY KEY CONSTRAINT TESTER & ENGINE SIMULATOR:"
                    bn="লাইভ প্রাইমারি কি সিমুলেটর ও কনস্ট্রেইন্ট পরীক্ষক:"
                  />
                </span>
                <span className="text-[11px] text-zinc-400 font-sans block mt-0.5">
                  {language === 'bn'
                    ? 'নিচের বোতামগুলো বা ইনপুট ফিল্ড ব্যবহার করে ডুপ্লিকেট ও নাল ভ্যালু টেস্ট করুন এবং টেবিলে তার ফলাফল দেখুন:'
                    : 'Use the quick scenarios or manual input to test duplicate and null violations live against the table:'}
                </span>
              </div>

              {pkStudents.length > initialPkStudents.length && (
                <button
                  onClick={handleResetPkTable}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-zinc-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'bn' ? 'টেবিল রিসেট করুন' : 'Reset Table'}</span>
                </button>
              )}
            </div>

            {/* Quick 1-Click Test Scenarios */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block">
                {language === 'bn' ? 'দ্রুত টেস্ট সিনারিও (এক ক্লিকে পরীক্ষা করুন):' : 'One-Click Quick Test Scenarios:'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => executePkTest('101', 'Sabbir')}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/50 text-rose-300 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  <span>{language === 'bn' ? '🔴 টেস্ট ১: ডুপ্লিকেট ID (101 ইনসার্ট করুন)' : '🔴 Test 1: Duplicate ID (101)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => executePkTest('', 'Fahim')}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/50 text-amber-300 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{language === 'bn' ? '🟡 টেস্ট ২: ফাঁকা / NULL ID ইনসার্ট' : '🟡 Test 2: NULL / Empty ID'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => executePkTest('105', 'Tanvir')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/50 text-emerald-300 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{language === 'bn' ? '🟢 টেস্ট ৩: নতুন ইউনিক ID (105 ইনসার্ট করুন)' : '🟢 Test 3: Valid New ID (105)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetPkTable}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-zinc-400 hover:text-white cursor-pointer transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>
            </div>

            {/* Manual Custom Insert Form */}
            <form onSubmit={handleTestInsert} className="flex flex-col sm:flex-row gap-2 pt-1">
              <div className="relative sm:w-1/3">
                <input
                  type="text"
                  value={testPkId}
                  onChange={(e) => setTestPkId(e.target.value)}
                  placeholder="Student_ID (Primary Key)"
                  className="bg-[#121526] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono w-full"
                />
                <span className="absolute right-2.5 top-2.5 text-[9px] font-mono text-amber-400 font-bold">
                  [PK]
                </span>
              </div>
              <input
                type="text"
                value={testPkName}
                onChange={(e) => setTestPkName(e.target.value)}
                placeholder="Student Name (e.g. Tanvir)"
                className="bg-[#121526] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-sans sm:w-1/3"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-md shadow-amber-600/20 shrink-0 flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === 'bn' ? 'ইনসার্ট টেস্ট চালান' : 'Execute Test Insert'}</span>
              </button>
            </form>

            {/* Visual Constraint Feedback Notification */}
            {pkAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-sans flex items-start gap-3 transition-all ${
                  pkAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                }`}
              >
                {pkAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-mono font-bold block mb-0.5">
                    {pkAlert.type === 'error'
                      ? language === 'bn'
                        ? 'ডেটাবেস ইঞ্জিন কনস্ট্রেইন্ট ভায়োলেশন:'
                        : 'Database Engine Constraint Rejection:'
                      : language === 'bn'
                      ? 'ডেটাবেস ইঞ্জিন ভ্যালিডেশন সফল:'
                      : 'Database Engine Insertion Accepted:'}
                  </span>
                  <span>{language === 'bn' ? pkAlert.msgBn : pkAlert.msgEn}</span>
                </div>
              </div>
            )}
          </div>

          {/* THE LIVE STUDENT RELATION TABLE */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-300 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5" />
                  STUDENT Relation (Live In-Memory State)
                </span>
                <span className="text-zinc-400 font-sans">
                  {language === 'bn'
                    ? `মোট সংরক্ষিত সারি: ${pkStudents.length}টি`
                    : `Total Records in Table: ${pkStudents.length}`}
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {language === 'bn'
                  ? 'Student_ID কলামটি হলো Primary Key [PK]'
                  : 'Student_ID column is designated as Primary Key [PK]'}
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-slate-800/60">
                      {language === 'bn' ? 'রো #' : 'Row #'}
                    </th>

                    {/* Column 1: Student_ID (Primary Key) */}
                    <th className="py-2.5 px-4 bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-extrabold w-44">
                      <div className="flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                        <span>Student_ID</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 font-bold">
                          [PK]
                        </span>
                      </div>
                    </th>

                    {/* Column 2: Name */}
                    <th className="py-2.5 px-4 text-zinc-300">Name</th>

                    {/* Column 3: Email */}
                    <th className="py-2.5 px-4 text-zinc-300">Email</th>

                    {/* Column 4: Department */}
                    <th className="py-2.5 px-4 text-zinc-300">Department</th>

                    {/* Verification Status */}
                    <th className="py-2.5 px-3 text-right bg-slate-900/80 text-amber-300 border-l border-slate-800 w-52">
                      {language === 'bn' ? 'প্রাইমারি কি স্ট্যাটাস' : 'PK Integrity Status'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {pkStudents.map((student, idx) => {
                    const isColliding = student.id === collidingId;
                    const isNew = student.id === lastInsertedId;

                    return (
                      <tr
                        key={student.id}
                        className={`transition-all duration-300 ${
                          isColliding
                            ? 'bg-rose-950/50 border-2 border-rose-500 text-white font-bold animate-pulse'
                            : isNew
                            ? 'bg-emerald-950/40 border-2 border-emerald-500 text-white font-bold'
                            : idx % 2 === 0
                            ? 'bg-[#0f1224]/30'
                            : 'bg-[#0c0e18]'
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center text-zinc-500 border-r border-slate-800/60 font-mono">
                          {idx + 1}
                        </td>

                        <td
                          className={`py-2.5 px-4 font-bold font-mono ${
                            isColliding
                              ? 'text-rose-300 bg-rose-950/60'
                              : isNew
                              ? 'text-emerald-300 bg-emerald-950/50'
                              : 'text-amber-300 bg-amber-950/20'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{student.id}</span>
                            {isColliding && (
                              <span className="text-[9px] px-1 rounded bg-rose-500 text-white font-bold">
                                COLLISION!
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-2.5 px-4">{student.name}</td>
                        <td className="py-2.5 px-4 text-zinc-400">{student.email}</td>
                        <td className="py-2.5 px-4 text-zinc-400">{student.dept}</td>

                        <td className="py-2.5 px-3 text-right border-l border-slate-800 font-mono">
                          {isColliding ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/30 text-rose-300 border border-rose-500/50 inline-flex items-center gap-1">
                              <X className="w-3 h-3" />
                              {language === 'bn' ? 'ডুপ্লিকেট সংঘর্ষ!' : 'Duplicate Collision!'}
                            </span>
                          ) : isNew ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 inline-flex items-center gap-1 animate-bounce">
                              <Check className="w-3 h-3" />
                              {language === 'bn' ? 'নতুন সারি যুক্ত হয়েছে' : 'New Row Inserted'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 text-zinc-400 border border-slate-800 inline-flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-400" />
                              {language === 'bn' ? 'অনন্য ও বৈধ' : 'Unique & Valid'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Educational Takeaway Callout */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/20 via-slate-900 to-indigo-950/20 border border-slate-800 text-xs font-sans flex items-start sm:items-center gap-3">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Layers className="w-4 h-4" />
              </span>
              <div className="leading-snug text-zinc-300 text-[11px]">
                <DualText
                  en="DBMS Storage Insight: Because Student_ID is the Primary Key, the database engine creates a clustered B-Tree index on it. Looking up any student by ID runs in O(log N) time, and the engine automatically prevents duplicates before writing to disk."
                  bn="ডিবিএমএস স্টোরেজ মূল ধারণা: Student_ID প্রাইমারি কি হওয়ায় ডেটাবেস ইঞ্জিন এর ওপর স্বয়ংক্রিয়ভাবে একটি Clustered B-Tree Index তৈরি করে। ফলে যেকোনো শিক্ষার্থীর তথ্য খোঁজা O(log N) সময়ে সম্পন্ন হয় এবং হার্ডডিস্কে লেখার আগেই ইঞ্জিন ডুপ্লিকেট রোধ করে।"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 4: ALTERNATE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'alternate' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-purple-500/40 space-y-6 animate-in fade-in duration-200 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-purple-400" />
                <DualText
                  en="4. Alternate Key (অল্টারনেট বা বিকল্প কী)"
                  bn="৪. অল্টারনেট বা বিকল্প কী (Alternate Key / Secondary Key)"
                />
              </h3>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 block">
                {language === 'bn'
                  ? 'প্রাইমারি কি বাদে অবশিষ্ট যেকোনো ক্যান্ডিডেট কী — যা শতভাগ ইউনিক এবং বিকল্প আইডি'
                  : 'Any candidate key NOT selected as the Primary Key (Candidate Keys - Primary Key)'}
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold shrink-0">
              {language === 'bn' ? 'অবশিষ্ট ক্যান্ডিডেট কী' : 'Unselected Candidate Keys'}
            </span>
          </div>

          {/* Definition Banner */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs font-sans text-zinc-300 leading-relaxed">
            <DualText
              en="Definition: An Alternate Key (also known as a Secondary Key) is any Candidate Key that was NOT chosen as the Primary Key by the database designer. Although it is not the Primary Key, it remains 100% unique and is usually enforced in SQL using a UNIQUE NOT NULL constraint."
              bn="সংজ্ঞা: কোনো টেবিলের যেসব ক্যান্ডিডেট কী-কে ডেটাবেস ডিজাইনার প্রাইমারি কী হিসেবে নির্বাচন করেননি, তাদের প্রতিটিকে Alternate Key বা বিকল্প কী বলা হয়। এটি প্রাইমারি কি না হলেও সম্পূর্ণ ইউনিক এবং ডেটাবেস টেবিলে এটিকে UNIQUE NOT NULL কনস্ট্রেইন্ট দিয়ে সুরক্ষিত রাখা হয়।"
            />
          </div>

          {/* Mathematical Relationship Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono text-center">
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-slate-800">
              <span className="text-[10px] text-zinc-400 block uppercase">
                {language === 'bn' ? 'উপলব্ধ ক্যান্ডিডেট কী' : 'Available Candidate Keys'}
              </span>
              <strong className="text-cyan-300 text-sm block mt-0.5 font-bold">
                CK = &#123;ID, NID, Email&#125;
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-amber-500/30">
              <span className="text-[10px] text-zinc-400 block uppercase">
                {language === 'bn' ? 'নির্বাচিত প্রাইমারি কি' : 'Elected Primary Key'}
              </span>
              <strong className="text-amber-400 text-sm block mt-0.5 font-bold">
                PK = 1 Attribute
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#0c0e18] border border-purple-500/30">
              <span className="text-[10px] text-zinc-400 block uppercase">
                {language === 'bn' ? 'অল্টারনেট কী-এর সূত্র' : 'Alternate Keys Formula'}
              </span>
              <strong className="text-purple-300 text-sm block mt-0.5 font-bold">
                AK = CK - PK
              </strong>
            </div>
          </div>

          {/* Primary Key Election Controller */}
          <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-3">
              <span className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <DualText
                  en="INTERACTIVE PRIMARY KEY ELECTION (CLICK TO SWITCH PRIMARY KEY):"
                  bn="ইন্টারেক্টিভ প্রাইমারি কি নির্বাচন প্যানেল (ক্লিক করে প্রাইমারি কি পরিবর্তন করুন):"
                />
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {language === 'bn' ? 'যেকোনো একটিকে PK বানাতে ক্লিক করুন' : 'Click to elect PK'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'id',
                  labelEn: 'Student_ID',
                  labelBn: 'Student_ID (শিক্ষার্থী আইডি)',
                  descEn: 'Compact numeric identifier (Standard choice)',
                  descBn: 'সংক্ষিপ্ত নিউমেরিক আইডি (ডিফল্ট পছন্দ)',
                },
                {
                  id: 'nid',
                  labelEn: 'National_ID',
                  labelBn: 'National_ID (জাতীয় পরিচয়পত্র)',
                  descEn: 'Government legal identifier',
                  descBn: 'সরকারি আইনগত পরিচিতি নম্বর',
                },
                {
                  id: 'email',
                  labelEn: 'Email Address',
                  labelBn: 'Email (প্রাতিষ্ঠানিক ইমেইল)',
                  descEn: 'Institutional contact identifier',
                  descBn: 'অনন্য প্রাতিষ্ঠানিক যোগাযোগ ইমেইল',
                },
              ].map((opt) => {
                const isSelectedAsPk = selectedPkForAk === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedPkForAk(opt.id as typeof selectedPkForAk)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelectedAsPk
                        ? 'bg-amber-950/40 border-amber-400 text-white shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50'
                        : 'bg-[#101326] border-purple-900/40 text-zinc-400 hover:text-white hover:border-purple-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                        <KeyRound
                          className={`w-3.5 h-3.5 ${
                            isSelectedAsPk ? 'text-amber-400' : 'text-purple-400'
                          }`}
                        />
                        {language === 'bn' ? opt.labelBn : opt.labelEn}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isSelectedAsPk
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        {isSelectedAsPk
                          ? language === 'bn'
                            ? '👑 PRIMARY KEY'
                            : '👑 PRIMARY KEY'
                          : language === 'bn'
                          ? '🔑 ALTERNATE KEY'
                          : '🔑 ALTERNATE KEY'}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-sans">
                      {language === 'bn' ? opt.descBn : opt.descEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* THE LIVE STUDENT RELATION TABLE WITH DYNAMIC ROLES */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-purple-300 px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 flex items-center gap-1.5">
                  <TableIcon className="w-3.5 h-3.5" />
                  STUDENT Relation — Live Key Roles Breakdown
                </span>
                <span className="text-zinc-400 font-sans">
                  {language === 'bn'
                    ? '১টি প্রাইমারি কি ও ২টি অল্টারনেট কি'
                    : '1 Primary Key + 2 Alternate Keys'}
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Primary Key
                </span>
                <span className="flex items-center gap-1 text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Alternate Key
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0c0e18]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#14182a] border-b border-slate-800 text-zinc-300">
                    <th className="py-2.5 px-3 text-zinc-500 text-center w-16 border-r border-slate-800/60">
                      {language === 'bn' ? 'রো #' : 'Row #'}
                    </th>

                    {/* Column 1: Student_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        selectedPkForAk === 'id'
                          ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold'
                          : 'bg-purple-950/30 text-purple-300 border-b-2 border-purple-400/80 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Student_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            selectedPkForAk === 'id'
                              ? 'bg-amber-500/30 text-amber-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}
                        >
                          {selectedPkForAk === 'id' ? '[PK]' : '[AK 1]'}
                        </span>
                      </div>
                    </th>

                    {/* Column 2: National_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        selectedPkForAk === 'nid'
                          ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold'
                          : 'bg-purple-950/30 text-purple-300 border-b-2 border-purple-400/80 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>National_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            selectedPkForAk === 'nid'
                              ? 'bg-amber-500/30 text-amber-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}
                        >
                          {selectedPkForAk === 'nid'
                            ? '[PK]'
                            : selectedPkForAk === 'id'
                            ? '[AK 1]'
                            : '[AK 2]'}
                        </span>
                      </div>
                    </th>

                    {/* Column 3: Email */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        selectedPkForAk === 'email'
                          ? 'bg-amber-950/40 text-amber-300 border-b-2 border-amber-400 font-bold'
                          : 'bg-purple-950/30 text-purple-300 border-b-2 border-purple-400/80 font-bold'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Email</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            selectedPkForAk === 'email'
                              ? 'bg-amber-500/30 text-amber-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}
                        >
                          {selectedPkForAk === 'email' ? '[PK]' : '[AK 2]'}
                        </span>
                      </div>
                    </th>

                    {/* Column 4: Name */}
                    <th className="py-2.5 px-3 text-zinc-400">
                      <span>Name</span>
                      <span className="block text-[9px] text-zinc-500 font-normal">
                        [Non-Key]
                      </span>
                    </th>

                    {/* Column 5: Department */}
                    <th className="py-2.5 px-3 text-zinc-400">
                      <span>Department</span>
                      <span className="block text-[9px] text-zinc-500 font-normal">
                        [Non-Key]
                      </span>
                    </th>

                    {/* Verification Status */}
                    <th className="py-2.5 px-3 text-right bg-slate-900/80 text-purple-300 border-l border-slate-800">
                      {language === 'bn' ? 'কী ভূমিকা বিশ্লেষণ' : 'Key Hierarchy Mapping'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  {studentSampleRows.map((student, idx) => {
                    const pkVal =
                      selectedPkForAk === 'id'
                        ? student.id
                        : selectedPkForAk === 'nid'
                        ? student.nid
                        : student.email;

                    return (
                      <tr
                        key={student.id}
                        className={idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}
                      >
                        <td className="py-2 px-3 text-center text-zinc-500 border-r border-slate-800/60">
                          {idx + 1}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            selectedPkForAk === 'id'
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-purple-950/20 text-purple-300'
                          }`}
                        >
                          {student.id}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            selectedPkForAk === 'nid'
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-purple-950/20 text-purple-300'
                          }`}
                        >
                          {student.nid}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            selectedPkForAk === 'email'
                              ? 'bg-amber-950/20 text-amber-300'
                              : 'bg-purple-950/20 text-purple-300'
                          }`}
                        >
                          {student.email}
                        </td>

                        <td className="py-2 px-3 text-zinc-300">{student.name}</td>
                        <td className="py-2 px-3 text-zinc-400">{student.dept}</td>

                        <td className="py-2 px-3 text-right border-l border-slate-800 font-mono text-[11px]">
                          <span className="text-amber-300 font-bold">
                            PK: {pkVal}
                          </span>
                          <span className="text-zinc-500 mx-1.5">|</span>
                          <span className="text-purple-300">
                            {language === 'bn' ? 'বাকি ২টি AK' : '2 Alt Keys'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Live SQL DDL Code Preview */}
            <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
                <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {language === 'bn'
                    ? 'লাইভ SQL টেবিল স্কিমা (নির্বাচন অনুযায়ী পরিবর্তিত হচ্ছে):'
                    : 'Live Generated SQL Schema (Updates with your election):'}
                </span>
                <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
              </div>

              <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
                <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">STUDENT</span> (<br />
                {'  '}Student_ID  <span className="text-cyan-400">VARCHAR(10)</span>{selectedPkForAk === 'id' ? <span className="text-amber-400 font-bold"> PRIMARY KEY</span> : <span className="text-purple-400 font-bold"> UNIQUE NOT NULL</span>}, <span className="text-zinc-500">{selectedPkForAk === 'id' ? '-- 👑 Elected Primary Key' : '-- 🔑 Alternate Key 1'}</span><br />
                {'  '}National_ID <span className="text-cyan-400">VARCHAR(20)</span>{selectedPkForAk === 'nid' ? <span className="text-amber-400 font-bold"> PRIMARY KEY</span> : <span className="text-purple-400 font-bold"> UNIQUE NOT NULL</span>}, <span className="text-zinc-500">{selectedPkForAk === 'nid' ? '-- 👑 Elected Primary Key' : selectedPkForAk === 'id' ? '-- 🔑 Alternate Key 1' : '-- 🔑 Alternate Key 2'}</span><br />
                {'  '}Email       <span className="text-cyan-400">VARCHAR(50)</span>{selectedPkForAk === 'email' ? <span className="text-amber-400 font-bold"> PRIMARY KEY</span> : <span className="text-purple-400 font-bold"> UNIQUE NOT NULL</span>}, <span className="text-zinc-500">{selectedPkForAk === 'email' ? '-- 👑 Elected Primary Key' : '-- 🔑 Alternate Key 2'}</span><br />
                {'  '}Name        <span className="text-cyan-400">VARCHAR(50)</span>,<br />
                {'  '}Department  <span className="text-cyan-400">VARCHAR(20)</span><br />
                );
              </pre>
            </div>

            {/* Real World Portal Login Application Insight */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/20 via-slate-900 to-indigo-950/20 border border-slate-800 text-xs font-sans flex items-start sm:items-center gap-3">
              <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <Layers className="w-4 h-4" />
              </span>
              <div className="leading-snug text-zinc-300 text-[11px]">
                <DualText
                  en="Real-World Software Architecture: Why do we need Alternate Keys? In modern web applications (like student or banking portals), users may log in using their Student ID (Primary Key) OR their Email address OR National ID. Because the database enforces a UNIQUE index on Alternate Keys, looking up a user by Email or NID is just as instantaneous and collision-free as querying by Primary Key!"
                  bn="বাস্তব সফটওয়্যার আর্কিটেকচার: অল্টারনেট কি কেন প্রয়োজন? আধুনিক ওয়েব অ্যাপ্লিকেশনে (যেমন: বিশ্ববিদ্যালয় পোর্টাল বা ব্যাংকিং অ্যাপে) শিক্ষার্থীরা তাদের Student ID (প্রাইমারি কি) দিয়েও লগইন করতে পারে, অথবা তাদের প্রাতিষ্ঠানিক Email কিংবা National ID দিয়েও লগইন করতে পারে। অল্টারনেট কি-তে UNIQUE ইনডেক্স থাকায় ইমেইল বা এনআইডি দিয়ে লগইন করাও প্রাইমারি কি-এর মতোই বিদ্যুৎগতির এবং ডুপ্লিকেটমুক্ত হয়!"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 5: FOREIGN KEY & REFERENTIAL INTEGRITY
         ---------------------------------------------------- */}
      {activeKeyType === 'foreign' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-emerald-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Link2 className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="5. Foreign Key & Referential Integrity"
                    bn="৫. ফরেন কী (Foreign Key) ও রেফারেন্সিয়াল ইন্টিগ্রিটি"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="The bridge connecting two tables, strictly preventing orphan rows and enforcing relational consistency."
                  bn="দুটি টেবিলের মধ্যে সংযোগকারী সেতু, যা অনাথ (orphan) রেকর্ড সৃষ্টি হওয়া কঠোরভাবে রোধ করে।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Referential Anchor
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800/80 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="Formal Definition & Relational Anchor Concept:"
                bn="সংজ্ঞা ও রেফারেন্সিয়াল ইন্টিগ্রিটির মূলনীতি:"
              />
            </div>
            <DualText
              en="A Foreign Key (FK) is an attribute (or collection of attributes) in one relation (Child Table) that refers to the Primary Key (or Unique Key) of another relation (Parent Table). The database engine enforces Referential Integrity: any value present in the child's foreign key MUST strictly exist in the parent's primary key (or be NULL). It is physically impossible to create an 'orphan' record!"
              bn="ফরেন কী (FK) হলো এমন একটি কলাম (বা একাধিক কলাম) যা কোনো অধীন টেবিল (Child Table) থেকে মূল টেবিলের (Parent Table) প্রাইমারি কি-কে নির্দেশ করে। ডেটাবেস ইঞ্জিন এখানে রেফারেন্সিয়াল ইন্টিগ্রিটি বলবৎ রাখে: চাইল্ড টেবিলের ফরেন কি কলামের মান অবশ্যই প্যারেন্ট টেবিলের প্রাইমারি কীতে বিদ্যমান থাকতে হবে (অথবা NULL হতে পারে)। কোনো অবস্থাতেই 'অনাথ' (orphan) রেকর্ড তৈরি করা সম্ভব নয়!"
            />
          </div>

          {/* Interactive Referential Integrity Simulator */}
          <div className="p-4 rounded-xl bg-[#0a0d1a] border border-emerald-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <DualText
                  en="Interactive Referential Integrity Simulator (Test Foreign Key Scenarios):"
                  bn="ইন্টারেক্টিভ রেফারেন্সিয়াল ইন্টিগ্রিটি সিমুলেটর (ফরেন কি সিনারিও পরীক্ষা করুন):"
                />
              </span>
              <button
                onClick={handleResetFk}
                className="self-start sm:self-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                {language === 'bn' ? 'রিসেট' : 'Reset'}
              </button>
            </div>

            {/* Test Action Scenario Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নিচের বোতামগুলো ক্লিক করে শিক্ষার্থীর ডিপার্টমেন্ট নির্বাচন করুন ও ডেটাবেসের প্রতিক্রিয়া দেখুন:'
                  : 'Click the scenario buttons below to assign a department and observe DBMS constraint checks:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFkTest('D01')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedDeptId === 'D01'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Dept_ID: D01 (CSE)
                </button>

                <button
                  onClick={() => handleFkTest('D02')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedDeptId === 'D02'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Dept_ID: D02 (BBA)
                </button>

                <button
                  onClick={() => handleFkTest('D03')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedDeptId === 'D03'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-emerald-500/40 hover:text-zinc-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Dept_ID: D03 (EEE)
                </button>

                <button
                  onClick={() => handleFkTest('D99')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedDeptId === 'D99'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-lg shadow-rose-950/50 animate-pulse'
                      : 'bg-[#121526] border-slate-800 text-rose-400/80 hover:border-rose-500/50 hover:text-rose-300'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Dept_ID: D99 {language === 'bn' ? '(অবৈধ বিভাগ)' : '(Invalid Dept)'}
                </button>

                <button
                  onClick={() => handleFkTest('NULL')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedDeptId === 'NULL'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold shadow-lg shadow-amber-950/50'
                      : 'bg-[#121526] border-slate-800 text-amber-400/80 hover:border-amber-500/50 hover:text-amber-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Dept_ID: NULL {language === 'bn' ? '(বিভাগহীন ভর্তি)' : '(Undeclared Major)'}
                </button>
              </div>
            </div>

            {/* Dynamic Status / Alert Banner */}
            {fkAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  fkAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-sans'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-sans'
                }`}
              >
                {fkAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {fkAlert.type === 'error'
                      ? language === 'bn'
                        ? 'রেফারেন্সিয়াল ইন্টিগ্রিটি লঙ্ঘন (DBMS ত্রুটি)'
                        : 'Referential Integrity Constraint Violation (DBMS Error)'
                      : language === 'bn'
                      ? 'বৈধ রেফারেন্সিয়াল লিঙ্ক (সফল)'
                      : 'Valid Referential Link Established'}
                  </div>
                  <div className="text-[11px] opacity-90 leading-relaxed">
                    {language === 'bn' ? fkAlert.msgBn : fkAlert.msgEn}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visual Side-by-Side Dual Table Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
            {/* Parent Table: DEPARTMENT */}
            <div className="p-4 rounded-xl bg-[#090b14] border border-amber-500/30 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                    PARENT
                  </span>
                  <span className="text-amber-300 font-bold">DEPARTMENT</span>
                </div>
                <span className="text-[10px] text-zinc-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Primary Key: <span className="text-amber-300 font-bold">Dept_ID</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-zinc-400 bg-slate-900/60">
                      <th className="py-2 px-2.5 text-amber-400 font-bold">
                        Dept_ID <span className="text-[9px] text-amber-500">[PK]</span>
                      </th>
                      <th className="py-2 px-2.5">Name</th>
                      <th className="py-2 px-2.5">Head</th>
                      <th className="py-2 px-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-zinc-300">
                    {fkDepartments.map((dept) => {
                      const isTargetParent = selectedDeptId === dept.id;
                      return (
                        <tr
                          key={dept.id}
                          className={`transition-colors ${
                            isTargetParent
                              ? 'bg-amber-500/15 text-white font-semibold'
                              : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <td className="py-2 px-2.5 font-bold text-amber-300">
                            {dept.id}
                          </td>
                          <td className="py-2 px-2.5">{dept.name}</td>
                          <td className="py-2 px-2.5 text-zinc-400">{dept.head}</td>
                          <td className="py-2 px-2.5 text-right">
                            {isTargetParent ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 text-[10px] border border-amber-500/50 font-bold">
                                👑 Target PK
                              </span>
                            ) : (
                              <span className="text-zinc-600 text-[10px]">Ready</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-zinc-400 font-sans border-t border-slate-800/80 pt-2 flex items-center justify-between">
                <span>{language === 'bn' ? 'মূল টেবিল কখনো চাইল্ড টেবিলের ওপর নির্ভর করে না।' : 'The Parent table exists independently of child records.'}</span>
                <span className="text-amber-400 font-mono">3 Departments</span>
              </div>
            </div>

            {/* Child Table: STUDENT */}
            <div className="p-4 rounded-xl bg-[#090b14] border border-emerald-500/30 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    CHILD
                  </span>
                  <span className="text-emerald-300 font-bold">STUDENT</span>
                </div>
                <span className="text-[10px] text-zinc-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Foreign Key: <span className="text-emerald-300 font-bold">Dept_ID → Dept</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-800 text-zinc-400 bg-slate-900/60">
                      <th className="py-2 px-2.5 text-amber-400 font-bold">
                        ID <span className="text-[9px] text-amber-500">[PK]</span>
                      </th>
                      <th className="py-2 px-2.5">Name</th>
                      <th className="py-2 px-2.5 text-emerald-400 font-bold">
                        Dept_ID <span className="text-[9px] text-emerald-500">[FK]</span>
                      </th>
                      <th className="py-2 px-2.5 text-right">Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-zinc-300">
                    {fkStudents.map((student) => {
                      const isLinkedToSelected = selectedDeptId === student.deptId;
                      return (
                        <tr
                          key={student.id}
                          className={`transition-colors ${
                            isLinkedToSelected
                              ? 'bg-emerald-500/15 text-white font-semibold'
                              : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <td className="py-2 px-2.5 font-bold text-amber-300">{student.id}</td>
                          <td className="py-2 px-2.5">{student.name}</td>
                          <td className="py-2 px-2.5 font-mono">
                            <span
                              className={`px-1.5 py-0.5 rounded font-bold ${
                                isLinkedToSelected
                                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/60'
                                  : 'bg-slate-800 text-emerald-400'
                              }`}
                            >
                              {student.deptId}
                            </span>
                          </td>
                          <td className="py-2 px-2.5 text-right font-mono text-[10px]">
                            {isLinkedToSelected ? (
                              <span className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                                <Check className="w-3 h-3" />
                                {language === 'bn' ? 'সংযুক্ত' : 'Linked'}
                              </span>
                            ) : (
                              <span className="text-zinc-500">Valid FK</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}

                    {/* Temporary Simulation Row if D99 or NULL was selected */}
                    {selectedDeptId === 'D99' && (
                      <tr className="bg-rose-950/40 text-rose-200 font-semibold animate-pulse border-t-2 border-rose-500">
                        <td className="py-2 px-2.5 text-rose-300 font-bold">105</td>
                        <td className="py-2 px-2.5 text-rose-200">Reza (New)</td>
                        <td className="py-2 px-2.5 font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/30 text-rose-300 border border-rose-500 font-bold">
                            D99 ❌
                          </span>
                        </td>
                        <td className="py-2 px-2.5 text-right text-rose-400 font-bold">
                          ORPHAN REJECT!
                        </td>
                      </tr>
                    )}

                    {selectedDeptId === 'NULL' && (
                      <tr className="bg-amber-950/30 text-amber-200 font-semibold border-t-2 border-amber-500">
                        <td className="py-2 px-2.5 text-amber-300 font-bold">105</td>
                        <td className="py-2 px-2.5 text-amber-200">Reza (New)</td>
                        <td className="py-2 px-2.5 font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-500 font-bold">
                            NULL
                          </span>
                        </td>
                        <td className="py-2 px-2.5 text-right text-amber-400 font-bold">
                          ✓ NULL Permitted
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-[10px] text-zinc-400 font-sans border-t border-slate-800/80 pt-2 flex items-center justify-between">
                <span>{language === 'bn' ? 'চাইল্ড টেবিল ডিপার্টমেন্ট ছাড়া অস্তিত্বহীন হতে পারে না।' : 'Foreign key values must point to existing parent rows.'}</span>
                <span className="text-emerald-400 font-mono">
                  {selectedDeptId === 'D99' ? '4 Records (1 Rejected)' : selectedDeptId === 'NULL' ? '5 Records' : '4 Records'}
                </span>
              </div>
            </div>
          </div>

          {/* Live SQL DDL Definition Preview */}
          <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {language === 'bn'
                  ? 'লাইভ SQL টেবিল স্কিমা (Foreign Key & Constraint রেফারেন্স):'
                  : 'Live Generated SQL Schema (Parent & Child Tables with FK):'}
              </span>
              <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
              <span className="text-zinc-500">-- 1. Create Parent Table First</span><br />
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-amber-300 font-bold">DEPARTMENT</span> (<br />
              {'  '}Dept_ID   <span className="text-cyan-400">VARCHAR(10)</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
              {'  '}Dept_Name <span className="text-cyan-400">VARCHAR(50)</span> <span className="text-rose-400 font-bold">NOT NULL</span>,<br />
              {'  '}Head      <span className="text-cyan-400">VARCHAR(50)</span><br />
              );<br /><br />
              <span className="text-zinc-500">-- 2. Create Child Table referencing Parent PK</span><br />
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-emerald-300 font-bold">STUDENT</span> (<br />
              {'  '}Student_ID <span className="text-cyan-400">VARCHAR(10)</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
              {'  '}Name       <span className="text-cyan-400">VARCHAR(50)</span> <span className="text-rose-400 font-bold">NOT NULL</span>,<br />
              {'  '}Dept_ID    <span className="text-cyan-400">VARCHAR(10)</span>, <span className="text-zinc-500">-- NULL allowed by default</span><br />
              {'  '}<span className="text-purple-400 font-bold">CONSTRAINT</span> fk_student_dept<br />
              {'    '}<span className="text-emerald-400 font-bold">FOREIGN KEY</span> (Dept_ID)<br />
              {'    '}<span className="text-emerald-400 font-bold">REFERENCES</span> DEPARTMENT(Dept_ID)<br />
              {'    '}<span className="text-blue-400">ON UPDATE CASCADE</span><br />
              {'    '}<span className="text-amber-400">ON DELETE RESTRICT</span> <span className="text-zinc-500">-- Prevents deleting dept if students exist</span><br />
              );
            </pre>
          </div>

          {/* Foreign Key Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                {language === 'bn' ? '১. অনাথ রেকর্ড প্রতিরোধ' : '1. Orphan Prevention'}
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'চাইল্ড টেবিলে এমন কোনো Dept_ID ইনসার্ট করা যাবে না যা প্যারেন্ট টেবিলে অনুপস্থিত (যেমন D99)।'
                  : 'You can never insert a child record pointing to a non-existent parent ID (e.g. D99).'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                {language === 'bn' ? '২. ডুপ্লিকেট মান বৈধ' : '2. Duplicates Permitted'}
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'প্রাইমারি কি অনন্য হলেও ফরেন কীতে একাধিক সারি একই মান রাখতে পারে (একাধিক শিক্ষার্থী একই বিভাগের)।'
                  : 'Unlike Primary Keys, foreign key columns can repeat (multiple students belong to department D01).'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                {language === 'bn' ? '৩. ডিলিট রুলস (ON DELETE)' : '3. Deletion Rules'}
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'RESTRICT: বিভাগ মুছতে বাধা দেবে। CASCADE: বিভাগ মুছলে ঐ বিভাগের সব ছাত্রও স্বয়ংক্রিয়ভাবে মুছে যাবে।'
                  : 'RESTRICT prevents deleting parent if children exist. CASCADE automatically deletes child records.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 6: COMPOSITE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'composite' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-pink-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  <Hash className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="6. Composite Key (যৌথ বা কম্পোজিট কী)"
                    bn="৬. কম্পোজিট বা যৌথ কী (Composite Key)"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="When a single attribute cannot identify rows uniquely, multiple columns unite to form the primary identifier."
                  bn="যখন কোনো একক কলাম প্রতিটি রেকর্ডকে আলাদা করতে ব্যর্থ হয়, তখন একাধিক কলাম একত্র হয়ে অনন্য কী গঠন করে।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-pink-400" />
              ≥ 2 Attributes Combined
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800/80 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-pink-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="The Junction Table Problem (Many-to-Many Relationships):"
                bn="জাংশন টেবিলের সমস্যা (Many-to-Many সম্পর্ক):"
              />
            </div>
            <DualText
              en="A Composite Key is a Primary Key or Candidate Key composed of two or more attributes. In relational design, many-to-many relationships (e.g. Students enrolling in multiple Courses, and Courses containing multiple Students) are modeled using a Junction Table (like ENROLLMENT). In this table, Student_ID repeats because a student takes several courses. Course_ID repeats because a course has many students. But the combined pair { Student_ID, Course_ID } is strictly unique!"
              bn="কম্পোজিট কী হলো দুই বা ততোধিক অ্যাট্রিবিউট বা কলামের সমন্বয়ে গঠিত প্রাইমারি কী। রিলেশনাল ডেটাবেসে Many-to-Many সম্পর্ক (যেমন: একজন শিক্ষার্থী একাধিক কোর্স নেয়, আবার একটি কোর্সে বহু শিক্ষার্থী থাকে) সমাধান করতে একটি Junction Table (যেমন: ENROLLMENT) ব্যবহার করা হয়। এখানে Student_ID কলামে ডুপ্লিকেট থাকে কারণ এক ছাত্র একাধিক কোর্স নেয়; আবার Course_ID কলামেও ডুপ্লিকেট থাকে কারণ এক কোর্সে বহু ছাত্র পড়ে। কিন্তু এদের যৌথ জোড়া { Student_ID, Course_ID } সর্বদা ১০০% অনন্য বা ইউনিক হয়!"
            />
          </div>

          {/* Interactive Column Mode Switcher & Collision Simulator */}
          <div className="p-4 rounded-xl bg-[#0a0d1a] border border-pink-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <DualText
                  en="Attribute Uniqueness Tester (Compare Single vs Composite):"
                  bn="অ্যাট্রিবিউট ইউনিকনেস পরীক্ষক (একক বনাম যৌথ তুলনা করুন):"
                />
              </span>
              <button
                onClick={handleResetEnrollments}
                className="self-start sm:self-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                {language === 'bn' ? 'টেবিল রিসেট' : 'Reset Enrollments'}
              </button>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নিচের মোড পরিবর্তন করে দেখুন কেন একক কলাম ব্যর্থ হয় কিন্তু যৌথ কম্বিনেশন সফল হয়:'
                  : 'Switch modes to see why individual columns fail uniqueness while the composite pair succeeds:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCompositeTestMode('student_only')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    compositeTestMode === 'student_only'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-lg shadow-rose-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-pink-500/40 hover:text-zinc-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Test Student_ID Alone {language === 'bn' ? '(ব্যর্থ)' : '(Fails)'}
                </button>

                <button
                  onClick={() => setCompositeTestMode('course_only')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    compositeTestMode === 'course_only'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-lg shadow-rose-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-pink-500/40 hover:text-zinc-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  Test Course_ID Alone {language === 'bn' ? '(ব্যর্থ)' : '(Fails)'}
                </button>

                <button
                  onClick={() => setCompositeTestMode('both')}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all flex items-center gap-1.5 ${
                    compositeTestMode === 'both'
                      ? 'bg-pink-500/20 border-pink-400 text-pink-200 font-bold shadow-lg shadow-pink-950/50'
                      : 'bg-[#121526] border-slate-800 text-zinc-400 hover:border-pink-500/40 hover:text-zinc-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Test {`{ Student_ID + Course_ID }`} Composite {language === 'bn' ? '(সফল!)' : '(100% Unique!)'}
                </button>
              </div>
            </div>

            {/* Live Interactive Collision Tester Buttons */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নতুন এনরোলমেন্ট ইনসার্ট করার চেষ্টা করুন (ডুপ্লিকেট কোলাইশন টেস্ট):'
                  : 'Attempt inserting enrollment records to test duplicate collision handling:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTestCompositeCollision('101', 'CSE101')}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'bn'
                    ? '🔴 ডুপ্লিকেট ইনসার্ট: Rahim (101) → CSE101'
                    : '🔴 Try Duplicate: Rahim (101) → CSE101'}
                </button>

                <button
                  onClick={() => handleTestCompositeCollision('103', 'CSE201')}
                  className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'bn'
                    ? '🟢 বৈধ ইনসার্ট: Nila (103) → CSE201'
                    : '🟢 Valid Insert: Nila (103) → CSE201'}
                </button>

                <button
                  onClick={() => handleTestCompositeCollision('102', 'CSE201')}
                  className="px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'bn'
                    ? '🟢 বৈধ ইনসার্ট: Karim (102) → CSE201'
                    : '🟢 Valid Insert: Karim (102) → CSE201'}
                </button>
              </div>
            </div>

            {/* Dynamic Alert Banner */}
            {compositeAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  compositeAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-sans'
                    : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-sans'
                }`}
              >
                {compositeAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {compositeAlert.type === 'error'
                      ? language === 'bn'
                        ? 'কম্পোজিট প্রাইমারি কি লঙ্ঘন (ডুপ্লিকেট বাতিল)'
                        : 'Composite Primary Key Violation (Duplicate Pair Rejected)'
                      : language === 'bn'
                      ? 'অনন্য কম্পোজিট জোড়া সফলভাবে গৃহীত হয়েছে'
                      : 'Distinct Composite Key Accepted & Row Appended'}
                  </div>
                  <div className="text-[11px] opacity-90 leading-relaxed">
                    {language === 'bn' ? compositeAlert.msgBn : compositeAlert.msgEn}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live ENROLLMENT Junction Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-zinc-200 font-bold">
                <TableIcon className="w-4 h-4 text-pink-400" />
                {language === 'bn'
                  ? 'লাইভ ENROLLMENT টেবিল (Junction Table):'
                  : 'Live ENROLLMENT Table (Junction Table):'}
              </span>
              <span className="text-[11px] text-zinc-500">
                {enrollments.length} {language === 'bn' ? 'টি এনরোলমেন্ট রেকর্ড' : 'Enrollment Records'}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#090b14]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                    <th className="py-2.5 px-3 text-center w-12 text-zinc-500">#</th>

                    {/* Column: Student_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        compositeTestMode === 'student_only'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : compositeTestMode === 'both'
                          ? 'bg-pink-950/30 text-pink-300 border-b-2 border-pink-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Student_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            compositeTestMode === 'both'
                              ? 'bg-pink-500/30 text-pink-200'
                              : 'bg-slate-800 text-zinc-400'
                          }`}
                        >
                          {compositeTestMode === 'both' ? '[Part 1 of PK]' : '[FK]'}
                        </span>
                      </div>
                    </th>

                    <th className="py-2.5 px-3 text-zinc-400">Student Name</th>

                    {/* Column: Course_ID */}
                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        compositeTestMode === 'course_only'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : compositeTestMode === 'both'
                          ? 'bg-pink-950/30 text-pink-300 border-b-2 border-pink-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Course_ID</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            compositeTestMode === 'both'
                              ? 'bg-pink-500/30 text-pink-200'
                              : 'bg-slate-800 text-zinc-400'
                          }`}
                        >
                          {compositeTestMode === 'both' ? '[Part 2 of PK]' : '[FK]'}
                        </span>
                      </div>
                    </th>

                    <th className="py-2.5 px-3 text-zinc-400">Course Name</th>
                    <th className="py-2.5 px-3 text-zinc-400">Semester</th>
                    <th className="py-2.5 px-3 text-zinc-400">Grade</th>

                    {/* Mode Evaluation Result */}
                    <th className="py-2.5 px-3 text-right bg-slate-900/80 text-pink-300 border-l border-slate-800">
                      {language === 'bn' ? 'ইউনিকনেস নিরীক্ষা' : 'Uniqueness Audit'}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                  {enrollments.map((enr, idx) => {
                    const isDupStudent =
                      compositeTestMode === 'student_only' &&
                      enrollments.filter((e) => e.studentId === enr.studentId).length > 1;

                    const isDupCourse =
                      compositeTestMode === 'course_only' &&
                      enrollments.filter((e) => e.courseId === enr.courseId).length > 1;

                    return (
                      <tr
                        key={`${enr.studentId}-${enr.courseId}-${idx}`}
                        className={`transition-colors ${
                          idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'
                        } ${
                          isDupStudent || isDupCourse
                            ? 'bg-rose-950/20'
                            : compositeTestMode === 'both'
                            ? 'hover:bg-pink-950/10'
                            : ''
                        }`}
                      >
                        <td className="py-2 px-3 text-center text-zinc-500 border-r border-slate-800/60">
                          {idx + 1}
                        </td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            compositeTestMode === 'student_only'
                              ? 'bg-rose-950/30 text-rose-300'
                              : compositeTestMode === 'both'
                              ? 'bg-pink-950/20 text-pink-300'
                              : 'text-zinc-300'
                          }`}
                        >
                          {enr.studentId}
                        </td>

                        <td className="py-2 px-3 text-zinc-300">{enr.studentName}</td>

                        <td
                          className={`py-2 px-3 font-bold ${
                            compositeTestMode === 'course_only'
                              ? 'bg-rose-950/30 text-rose-300'
                              : compositeTestMode === 'both'
                              ? 'bg-pink-950/20 text-pink-300'
                              : 'text-zinc-300'
                          }`}
                        >
                          {enr.courseId}
                        </td>

                        <td className="py-2 px-3 text-zinc-300">{enr.courseName}</td>
                        <td className="py-2 px-3 text-zinc-400">{enr.semester}</td>
                        <td className="py-2 px-3 text-zinc-300 font-bold">{enr.grade}</td>

                        {/* Audit Result Column */}
                        <td className="py-2 px-3 text-right border-l border-slate-800 font-mono text-[11px]">
                          {compositeTestMode === 'student_only' && (
                            <span className="text-rose-400 font-bold flex items-center justify-end gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              {language === 'bn' ? `Student ${enr.studentId} ডুপ্লিকেট!` : `ID ${enr.studentId} Repeats!`}
                            </span>
                          )}

                          {compositeTestMode === 'course_only' && (
                            <span className="text-rose-400 font-bold flex items-center justify-end gap-1">
                              <XCircle className="w-3.5 h-3.5" />
                              {language === 'bn' ? `${enr.courseId} ডুপ্লিকেট!` : `${enr.courseId} Repeats!`}
                            </span>
                          )}

                          {compositeTestMode === 'both' && (
                            <span className="text-emerald-400 font-bold flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              ({enr.studentId}, {enr.courseId}){' '}
                              <span className="text-[9px] bg-emerald-500/20 px-1 rounded text-emerald-200">
                                100% Unique
                              </span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Generated SQL DDL Schema */}
          <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                {language === 'bn'
                  ? 'লাইভ SQL টেবিল স্কিমা (Composite Primary Key সিনট্যাক্স):'
                  : 'Live Generated SQL Schema (Composite Primary Key Syntax):'}
              </span>
              <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-pink-300 font-bold">ENROLLMENT</span> (<br />
              {'  '}Student_ID <span className="text-cyan-400">VARCHAR(10)</span>,<br />
              {'  '}Course_ID  <span className="text-cyan-400">VARCHAR(10)</span>,<br />
              {'  '}Semester   <span className="text-cyan-400">VARCHAR(20)</span>,<br />
              {'  '}Grade      <span className="text-cyan-400">VARCHAR(5)</span>,<br />
              {'  '}<span className="text-zinc-500">-- Composite Primary Key defined over TWO columns:</span><br />
              {'  '}<span className="text-pink-400 font-bold">PRIMARY KEY</span> (<span className="text-white font-bold">Student_ID</span>, <span className="text-white font-bold">Course_ID</span>),<br />
              {'  '}<span className="text-zinc-500">-- Both columns also act as Foreign Keys to their respective tables:</span><br />
              {'  '}<span className="text-emerald-400 font-bold">FOREIGN KEY</span> (Student_ID) <span className="text-emerald-400 font-bold">REFERENCES</span> STUDENT(Student_ID),<br />
              {'  '}<span className="text-emerald-400 font-bold">FOREIGN KEY</span> (Course_ID)  <span className="text-emerald-400 font-bold">REFERENCES</span> COURSE(Course_ID)<br />
              );
            </pre>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 7: UNIQUE KEY CONSTRAINT
         ---------------------------------------------------- */}
      {activeKeyType === 'unique' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-cyan-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="7. Unique Key Constraint (ইউনিক কী কনস্ট্রেইন্ট)"
                    bn="৭. ইউনিক কী কনস্ট্রেইন্ট (Unique Key Constraint)"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="Guarantees no duplicate values exist across rows, while permitting multiple NULL values."
                  bn="কলামে ডুপ্লিকেট মান জমা হওয়া নিষিদ্ধ করে, তবে একাধিক NULL মান ধারণ করার অনুমতি দেয়।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              Integrity Constraint
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800/80 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="The Fundamental Difference Between Primary Key and Unique Key:"
                bn="প্রাইমারি কী এবং ইউনিক কী-এর মৌলিক পার্থক্য:"
              />
            </div>
            <DualText
              en="While a Primary Key is the entity's designated master identifier (strictly 1 per table and NEVER allows NULL), a UNIQUE constraint enforces distinctness on secondary business attributes (like Username, Phone Number, or Tax ID). A table can contain MULTIPLE UNIQUE constraints. Crucially, according to SQL ANSI standards, UNIQUE constraints permit NULL values—because in relational calculus, NULL represents an 'unknown' value, and one unknown cannot be asserted as equal to another unknown (NULL != NULL)!"
              bn="প্রাইমারি কি হলো কোনো টেবিলের প্রধান সত্ত্বা সনাক্তকারী (টেবিলে মাত্র ১টি থাকে এবং এতে কখনোই NULL হতে পারে না)। অপরদিকে, UNIQUE কনস্ট্রেইন্ট অন্যান্য গুরুত্বপূর্ণ বিজনেস তথ্যের (যেমন: ইউজারনেম, ফোন নম্বর বা ট্যাক্স আইডি) অনন্যতা নিশ্চিত করে। একটি টেবিলে একাধিক UNIQUE কনস্ট্রেইন্ট থাকতে পারে। সবচেয়ে বড় পার্থক্য হলো, SQL স্ট্যান্ডার্ড অনুযায়ী UNIQUE কলামে একাধিক NULL মান বসতে পারে—কারণ রিলেশনাল অ্যালজেব্রায় NULL মানে 'অজানা তথ্য', এবং একটি অজানা মান আরেকটি অজানা মানের সমান হতে পারে না (NULL != NULL)!"
            />
          </div>

          {/* Interactive Constraint Violation Playground */}
          <div className="p-4 rounded-xl bg-[#0a0d1a] border border-cyan-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <DualText
                  en="Interactive UNIQUE Constraint Violation Tester (Live USER_ACCOUNT):"
                  bn="ইন্টারেক্টিভ UNIQUE কনস্ট্রেইন্ট পরীক্ষক (লাইভ USER_ACCOUNT টেবিল):"
                />
              </span>
              <button
                onClick={handleResetUniqueAccounts}
                className="self-start sm:self-auto text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                {language === 'bn' ? 'টেবিল রিসেট' : 'Reset Accounts'}
              </button>
            </div>

            {/* Test Action Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-sans block">
                {language === 'bn'
                  ? 'নিচের বোতামগুলো ক্লিক করে ডুপ্লিকেট সংঘর্ষ এবং NULL মানের আচরণ পরীক্ষা করুন:'
                  : 'Click the buttons below to test collision rejection and NULL tolerance in action:'}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTestUniqueScenario('dup_username')}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'bn'
                    ? '🔴 ডুপ্লিকেট ইউজারনেম: "rahim99"'
                    : '🔴 Try Duplicate Username: "rahim99"'}
                </button>

                <button
                  onClick={() => handleTestUniqueScenario('dup_phone')}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  {language === 'bn'
                    ? '🔴 ডুপ্লিকেট ফোন: "01711-001122"'
                    : '🔴 Try Duplicate Phone: "01711-001122"'}
                </button>

                <button
                  onClick={() => handleTestUniqueScenario('insert_null')}
                  className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-950/20 text-amber-300 hover:bg-amber-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'bn'
                    ? '🟡 NULL ফোন ও ইমেইল ইনসার্ট (NULL অনুমতি প্রমাণ)'
                    : '🟡 Insert with NULL Phone & Email (Proves NULL Allowed!)'}
                </button>

                <button
                  onClick={() => handleTestUniqueScenario('valid_new')}
                  className="px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/30 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5 text-cyan-400" />
                  {language === 'bn'
                    ? '🟢 সম্পূর্ণ স্বতন্ত্র নতুন ইউজার: "tanvir_pro"'
                    : '🟢 Insert Distinct User: "tanvir_pro"'}
                </button>
              </div>
            </div>

            {/* Dynamic Alert Banner */}
            {uniqueAlert && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                  uniqueAlert.type === 'error'
                    ? 'bg-rose-950/40 border-rose-500 text-rose-200 font-sans'
                    : 'bg-cyan-950/40 border-cyan-500 text-cyan-200 font-sans'
                }`}
              >
                {uniqueAlert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {uniqueAlert.type === 'error'
                      ? language === 'bn'
                        ? 'UNIQUE কনস্ট্রেইন্ট লঙ্ঘন (ইনসার্ট বাতিল)'
                        : 'UNIQUE Constraint Violation (DBMS Rejection)'
                      : language === 'bn'
                      ? 'শর্ত যাচাই সফল (রেকর্ড যুক্ত হয়েছে)'
                      : 'Constraint Verification Passed (Record Appended)'}
                  </div>
                  <div className="text-[11px] opacity-90 leading-relaxed">
                    {language === 'bn' ? uniqueAlert.msgBn : uniqueAlert.msgEn}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live USER_ACCOUNT Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-2 text-zinc-200 font-bold">
                <TableIcon className="w-4 h-4 text-cyan-400" />
                {language === 'bn'
                  ? 'লাইভ USER_ACCOUNT টেবিল (একাধিক UNIQUE কলামসহ):'
                  : 'Live USER_ACCOUNT Table (Demonstrating Multiple UNIQUE Columns):'}
              </span>
              <span className="text-[11px] text-zinc-500">
                {uniqueAccounts.length} {language === 'bn' ? 'টি অ্যাকাউন্ট' : 'Accounts'}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#090b14]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px]">
                    <th className="py-2.5 px-3 text-amber-400 font-bold w-16">
                      User_ID <span className="text-[9px] text-amber-500 block font-normal">[PK]</span>
                    </th>

                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        uniqueCollidingField === 'username'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      Username{' '}
                      <span className="text-[9px] text-cyan-400/80 block font-normal">
                        [UNIQUE NOT NULL]
                      </span>
                    </th>

                    <th
                      className={`py-2.5 px-3 transition-colors ${
                        uniqueCollidingField === 'phone'
                          ? 'bg-rose-950/40 text-rose-300 border-b-2 border-rose-400'
                          : 'text-cyan-300'
                      }`}
                    >
                      Phone Number{' '}
                      <span className="text-[9px] text-cyan-400/80 block font-normal">
                        [UNIQUE (NULL Allowed)]
                      </span>
                    </th>

                    <th className="py-2.5 px-3 text-cyan-300">
                      Recovery Email{' '}
                      <span className="text-[9px] text-cyan-400/80 block font-normal">
                        [UNIQUE (NULL Allowed)]
                      </span>
                    </th>

                    <th className="py-2.5 px-3 text-right bg-slate-900/80 text-zinc-300 border-l border-slate-800">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 text-zinc-300 text-[11px]">
                  {uniqueAccounts.map((acc, idx) => (
                    <tr
                      key={acc.id}
                      className={idx % 2 === 0 ? 'bg-[#0f1224]/30' : 'bg-[#0c0e18]'}
                    >
                      <td className="py-2 px-3 font-bold text-amber-300">{acc.id}</td>

                      <td
                        className={`py-2 px-3 font-bold ${
                          uniqueCollidingField === 'username' && acc.username === 'rahim99'
                            ? 'bg-rose-950/30 text-rose-300 ring-1 ring-rose-500/50'
                            : 'text-zinc-200'
                        }`}
                      >
                        {acc.username}
                      </td>

                      <td
                        className={`py-2 px-3 ${
                          uniqueCollidingField === 'phone' && acc.phone === '01711-001122'
                            ? 'bg-rose-950/30 text-rose-300 ring-1 ring-rose-500/50'
                            : acc.phone === null
                            ? 'text-zinc-500 italic'
                            : 'text-zinc-300'
                        }`}
                      >
                        {acc.phone || (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px]">
                            NULL (No Phone)
                          </span>
                        )}
                      </td>

                      <td
                        className={`py-2 px-3 ${
                          acc.recoveryEmail === null ? 'text-zinc-500 italic' : 'text-zinc-300'
                        }`}
                      >
                        {acc.recoveryEmail || (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px]">
                            NULL (No Email)
                          </span>
                        )}
                      </td>

                      <td className="py-2 px-3 text-right border-l border-slate-800 font-mono text-[10px] text-emerald-400">
                        ✓ Enforced
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Primary Key vs Unique Key Comparison Matrix */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase flex items-center gap-1.5 font-sans">
              <Layers className="w-4 h-4 text-cyan-400" />
              <DualText
                en="Master Comparison Matrix: Primary Key vs Unique Key"
                bn="মাস্টার তুলনা ম্যাট্রিক্স: প্রাইমারি কী বনাম ইউনিক কী"
              />
            </span>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#090b14] text-xs font-mono">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="bg-[#121629] border-b border-slate-800 text-zinc-300">
                    <th className="py-2.5 px-3 text-zinc-400 w-1/4">Feature / মানদণ্ড</th>
                    <th className="py-2.5 px-3 text-amber-400 font-bold w-3/8">
                      Primary Key (প্রধান কী)
                    </th>
                    <th className="py-2.5 px-3 text-cyan-400 font-bold w-3/8">
                      Unique Key (ইউনিক কনস্ট্রেইন্ট)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-zinc-300">
                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">Purpose</td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'পুরো টেবিলের সারির মূল পরিচয় হিসেবে কাজ করে।'
                        : 'Uniquely identifies each entity/row in the relation.'}
                    </td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'নির্দিষ্ট কলামে মান ডুপ্লিকেট হওয়া রোধ করে।'
                        : 'Prevents duplicate values in specific candidate columns.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">NULL Values</td>
                    <td className="py-2 px-3 text-rose-300 font-bold">
                      {language === 'bn'
                        ? 'কখনোই NULL গ্রহণযোগ্য নয় (NOT NULL বাধ্যতামূলক)।'
                        : 'Strictly prohibited. CANNOT accept NULL.'}
                    </td>
                    <td className="py-2 px-3 text-emerald-300 font-bold">
                      {language === 'bn'
                        ? 'NULL গ্রহণযোগ্য (একাধিক সারিতে NULL থাকতে পারে)।'
                        : 'Permitted. Multiple NULL rows allowed in SQL.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">Quantity</td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'একটি টেবিলে শুধুমাত্র ১টি প্রাইমারি কী হতে পারে।'
                        : 'Strictly ONE Primary Key per table.'}
                    </td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'একটি টেবিলে একাধিক (যত খুশি) ইউনিক কী থাকতে পারে।'
                        : 'MULTIPLE Unique constraints allowed per table.'}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-bold text-zinc-400">Underlying Index</td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'স্বয়ংক্রিয়ভাবে Clustered Index তৈরি করে।'
                        : 'Automatically creates a Clustered Index (default).'}
                    </td>
                    <td className="py-2 px-3">
                      {language === 'bn'
                        ? 'স্বয়ংক্রিয়ভাবে Non-Clustered Unique Index তৈরি করে।'
                        : 'Automatically creates a Non-Clustered Unique Index.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Generated SQL DDL Schema */}
          <div className="p-4 rounded-xl bg-[#090b14] border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
              <span className="text-zinc-300 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {language === 'bn'
                  ? 'লাইভ SQL টেবিল স্কিমা (Unique Key Constraints):'
                  : 'Live Generated SQL Schema (Unique Key Constraints):'}
              </span>
              <span className="text-[10px] text-zinc-500">PostgreSQL / MySQL DDL</span>
            </div>

            <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
              <span className="text-purple-400">CREATE TABLE</span> <span className="text-cyan-300 font-bold">USER_ACCOUNT</span> (<br />
              {'  '}User_ID        <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
              {'  '}Username       <span className="text-cyan-400">VARCHAR(30)</span> <span className="text-rose-400 font-bold">NOT NULL</span> <span className="text-cyan-400 font-bold">UNIQUE</span>,<br />
              {'  '}Phone          <span className="text-cyan-400">VARCHAR(20)</span> <span className="text-cyan-400 font-bold">UNIQUE</span>,          <span className="text-zinc-500">-- NULL allowed</span><br />
              {'  '}Recovery_Email <span className="text-cyan-400">VARCHAR(100)</span> <span className="text-cyan-400 font-bold">UNIQUE</span>          <span className="text-zinc-500">-- NULL allowed</span><br />
              );
            </pre>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          TAB 8: NATURAL & SURROGATE KEY
         ---------------------------------------------------- */}
      {activeKeyType === 'surrogate' && (
        <div className="p-6 rounded-2xl bg-[#13172c] border border-indigo-500/40 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Database className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-white">
                  <DualText
                    en="8. Natural Key and Surrogate Key (ন্যাচারাল ও সারোগেট কী)"
                    bn="৮. ন্যাচারাল কী এবং সারোগেট কী (Natural & Surrogate Keys)"
                  />
                </h3>
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                <DualText
                  en="The real-world business identifier vs the artificial, high-performance database sequence."
                  bn="বাস্তব জগতের বিজনেস আইডি বনাম ডেটাবেস ইঞ্জিনের উচ্চ ক্ষমতাসম্পন্ন কৃত্রিম সিকোয়েন্স।"
                />
              </div>
            </div>
            <span className="self-start sm:self-auto text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              Architectural Design Pattern
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800/80 text-xs text-zinc-300 leading-relaxed font-sans space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <DualText
                en="The Architectural Dilemma: Real-World Meaning vs Database Performance"
                bn="আর্কিটেকচারাল সিদ্ধান্ত: বাস্তব অর্থ বনাম ডেটাবেস পারফরম্যান্স"
              />
            </div>
            <DualText
              en="A Natural Key is an attribute that exists in the real world outside the database (e.g. National ID, Passport Number, Vehicle License Plate, Book ISBN). While intuitive, using natural keys as Primary Keys causes severe scalability issues: they are long strings (17+ characters), waste index RAM, and if a citizen legally corrects a misprinted NID, the database must acquire table locks and execute expensive CASCADE UPDATE operations across millions of child records! Therefore, modern software engineering uses a Surrogate Key (a synthetic, sequential Integer or UUID) as the Primary Key for joins, while enforcing a UNIQUE constraint on the Natural Key as an Alternate Key."
              bn="ন্যাচারাল কী (Natural Key) হলো বাস্তব জগতে বিদ্যমান কোনো পরিচিতি নম্বর (যেমন: জাতীয় পরিচয়পত্র NID, পাসপোর্ট নম্বর, বইয়ের ISBN বা গাড়ির লাইসেন্স প্লেট)। আপাতদৃষ্টিতে এদেরকে সরাসরি প্রাইমারি কি হিসেবে ব্যবহার করা সহজ মনে হলেও, এটি বড় সিস্টেমে মারাত্মক পারফরম্যান্স ঘাটতি ঘটায়: কারণ এগুলো দীর্ঘ স্ট্রিং (১৭+ অক্ষর), ইনডেক্স মেমরি অপচয় করে এবং সরকারিভাবে কোনো নাগরিকের NID সংশোধন হলে লক্ষ লক্ষ চাইল্ড টেবিলে লক পড়ে ক্যাসকেড আপডেট চালাতে হয়! তাই আধুনিক সফটওয়্যার আর্কিটেকচারে সর্বদা একটি সারোগেট কী (কৃত্রিম ইন্টিজার বা UUID) দিয়ে প্রাইমারি কি ও জয়েন পরিচালনা করা হয়, এবং ন্যাচারাল আইডিকে অল্টারনেট কী (UNIQUE) হিসেবে সুরক্ষিত রাখা হয়।"
            />
          </div>

          {/* Interactive Architectural Model Switcher */}
          <div className="p-4 rounded-xl bg-[#0a0d1a] border border-indigo-500/30 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white uppercase flex items-center gap-2 font-sans">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <DualText
                  en="Select Architectural Design Pattern to Benchmark:"
                  bn="তুলনা করার জন্য আর্কিটেকচারাল প্যাটার্ন নির্বাচন করুন:"
                />
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                {activeKeyArch === 'surrogate'
                  ? language === 'bn'
                    ? 'আধুনিক শিল্পমান সক্রিয়'
                    : 'Modern Industry Standard Active'
                  : language === 'bn'
                  ? 'ঐতিহ্যবাহী ন্যাচারাল প্যাটার্ন সক্রিয়'
                  : 'Traditional Natural Pattern Active'}
              </span>
            </div>

            {/* Architecture Selector Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setActiveKeyArch('surrogate')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  activeKeyArch === 'surrogate'
                    ? 'bg-emerald-500/15 border-emerald-400 shadow-lg shadow-emerald-950/40'
                    : 'bg-[#121526] border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ⚡ {language === 'bn' ? 'প্যাটার্ন ১: সারোগেট কী আর্কিটেকচার' : 'Pattern 1: Surrogate Key Architecture'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {language === 'bn'
                    ? 'PK: id INT AUTO_INCREMENT (৪ বাইট), NID হলো অল্টারনেট কী (UNIQUE)। জয়েন বিদ্যুৎগতির!'
                    : 'PK: id INT AUTO_INCREMENT (4 Bytes), NID is Unique Alternate Key. Lightning-fast joins!'}
                </p>
              </button>

              <button
                onClick={() => setActiveKeyArch('natural')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  activeKeyArch === 'natural'
                    ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-950/40'
                    : 'bg-[#121526] border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    📜 {language === 'bn' ? 'প্যাটার্ন ২: ন্যাচারাল কী আর্কিটেকচার' : 'Pattern 2: Natural Key Architecture'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    TRADITIONAL
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {language === 'bn'
                    ? 'PK: nid VARCHAR(17) (১৭+ বাইট)। চাইল্ড টেবিলের ফরেন কি এবং ইনডেক্স মেমরি স্ফীত হয়।'
                    : 'PK: nid VARCHAR(17) (17+ Bytes). Bloats child foreign key indexes and slows down string joins.'}
                </p>
              </button>
            </div>
          </div>

          {/* Dynamic Architecture Deep-Dive Display */}
          {activeKeyArch === 'surrogate' ? (
            <div className="space-y-4">
              {/* Architecture Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    🚀 {language === 'bn' ? 'জয়েন স্পিড: O(log N) ইন্টিজার' : 'Join Speed: O(log N) Int'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'সিপিইউ রেজিস্টারে ৩২-বিট ইন্টিজার সরাসরি হার্ডওয়্যার সাইকেলে তুলনা হয়। স্ট্রিং স্ক্যান করতে হয় না।'
                      : 'CPU compares 4-byte integers in a single hardware cycle. Zero string character iterations.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    💾 {language === 'bn' ? 'ইনডেক্স আকার: মাত্র ৪ বাইট' : 'Index Size: Only 4 Bytes'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'B-Tree ইনডেক্স নোডগুলো ক্ষুদ্রাতিক্ষুদ্র হওয়ায় পুরো ইনডেক্স র‍্যামের L2/L3 ক্যাশে ফিট থাকে।'
                      : 'Ultra-compact B-Tree nodes maximize cache locality, fitting entire indexes into RAM cache.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    🛡️ {language === 'bn' ? 'জিরো ক্যাসকেড ঝুঁকি' : 'Zero Cascade Burden'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'গ্রাহকের NID-তে ভুল সংশোধন হলেও মাত্র ১টি রো আপডেট হয়। কোনো চাইল্ড অর্ডারে হাত দিতে হয় না।'
                      : 'If a user fixes a typo in their legal NID, only 1 row updates. Millions of child orders remain untouched!'}
                  </p>
                </div>
              </div>

              {/* Surrogate SQL Schema */}
              <div className="p-4 rounded-xl bg-[#090b14] border border-emerald-500/30 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {language === 'bn'
                      ? 'সারোগেট প্যাটার্নের স্কিমা (বাস্তবসম্মত প্রোডাকশন আর্কিটেকচার):'
                      : 'Production Surrogate Architecture Schema (High Scale):'}
                  </span>
                  <span className="text-[10px] text-emerald-400">Industry Standard</span>
                </div>

                <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
                  <span className="text-zinc-500">-- Parent: High performance 4-byte surrogate PK + Natural Unique constraint</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">CUSTOMER</span> (<br />
                  {'  '}id   <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-emerald-400 font-bold">PRIMARY KEY</span>,  <span className="text-zinc-500">-- 👑 Surrogate PK (4 Bytes, Immutable)</span><br />
                  {'  '}nid  <span className="text-cyan-400">VARCHAR(17)</span> <span className="text-purple-400 font-bold">UNIQUE NOT NULL</span>,    <span className="text-zinc-500">-- 🔑 Natural Alternate Key (Business Lookup)</span><br />
                  {'  '}name <span className="text-cyan-400">VARCHAR(100)</span><br />
                  );<br /><br />
                  <span className="text-zinc-500">-- Child: Millions of rows store a lightweight 4-byte integer FK</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">ORDERS</span> (<br />
                  {'  '}order_id    <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-emerald-400 font-bold">PRIMARY KEY</span>,<br />
                  {'  '}customer_id <span className="text-cyan-400">INT</span> <span className="text-emerald-400 font-bold">REFERENCES CUSTOMER(id)</span>, <span className="text-zinc-500">-- ⚡ 4-byte FK! Blazing fast joins!</span><br />
                  {'  '}total_amount <span className="text-cyan-400">DECIMAL(10,2)</span><br />
                  );
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Natural Architecture Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    ⚠️ {language === 'bn' ? 'জয়েন ওভারহেড: স্ট্রিং তুলনা' : 'Join Overhead: String Comparisons'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'প্রতিটি জয়েন অপারেশনে ১৭-অক্ষরের স্ট্রিং বাইট-বাই-বাইট মেলাতে গিয়ে অতিরিক্ত CPU সময় লাগে।'
                      : 'Joining tables requires character-by-character string matching on 17+ bytes per row.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    📦 {language === 'bn' ? 'ইনডেক্স ব্লোটিং: ১৭+ বাইট' : 'Index Bloat: 17+ Bytes'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'চাইল্ড টেবিল এবং প্রতিটি ইনডেক্সে দীর্ঘ NID স্ট্রিং বারবার জমা হয়ে ডিস্ক ও র‍্যামের জায়গা দখল করে।'
                      : 'The full 17+ character NID string repeats in every child table and every secondary B-Tree node.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    💥 {language === 'bn' ? 'ক্যাসকেডিং লকিং ঝুঁকি' : 'Cascade Lock Contention'}
                  </span>
                  <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                    {language === 'bn'
                      ? 'কোনো নাগরিকের NID সংশোধন হলে ON UPDATE CASCADE দিয়ে সংশ্লিষ্ট ১০ লক্ষ অর্ডারে টেবিল লক পড়ে!'
                      : 'Correcting a mistyped NID triggers ON UPDATE CASCADE, locking child tables to rewrite millions of rows!'}
                  </p>
                </div>
              </div>

              {/* Natural SQL Schema */}
              <div className="p-4 rounded-xl bg-[#090b14] border border-amber-500/30 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-400 border-b border-slate-800/80 pb-2">
                  <span className="text-amber-300 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    {language === 'bn'
                      ? 'ঐতিহ্যবাহী ন্যাচারাল কী স্কিমা (চাইল্ড টেবিলে ১৭ বাইটের বোঝা):'
                      : 'Traditional Natural Key Schema (17+ Byte String Overhead in Child Tables):'}
                  </span>
                  <span className="text-[10px] text-amber-400">Traditional / Fragile</span>
                </div>

                <pre className="text-zinc-300 leading-relaxed overflow-x-auto text-[11px]">
                  <span className="text-zinc-500">-- Parent: Using real-world 17-digit NID directly as Primary Key</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">CUSTOMER</span> (<br />
                  {'  '}nid  <span className="text-cyan-400">VARCHAR(17)</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>, <span className="text-zinc-500">-- 📜 Natural PK (17+ Bytes, Mutable by Govt)</span><br />
                  {'  '}name <span className="text-cyan-400">VARCHAR(100)</span><br />
                  );<br /><br />
                  <span className="text-zinc-500">-- Child: Every single order stores the heavy 17-byte string!</span><br />
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-white font-bold">ORDERS</span> (<br />
                  {'  '}order_id     <span className="text-cyan-400">INT AUTO_INCREMENT</span> <span className="text-amber-400 font-bold">PRIMARY KEY</span>,<br />
                  {'  '}customer_nid <span className="text-cyan-400">VARCHAR(17)</span> <span className="text-amber-400 font-bold">REFERENCES CUSTOMER(nid)</span> <span className="text-rose-400">ON UPDATE CASCADE</span>,<br />
                  {'  '}total_amount <span className="text-cyan-400">DECIMAL(10,2)</span><br />
                  );
                </pre>
              </div>
            </div>
          )}

          {/* Golden Rule Summary Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/40 text-xs font-sans flex items-start sm:items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </span>
            <div className="space-y-1">
              <span className="text-indigo-200 font-bold block">
                {language === 'bn'
                  ? 'ইন্ডাস্ট্রি গোল্ডেন রুল (Database Architect Recommendation):'
                  : 'Industry Golden Rule (Database Architect Recommendation):'}
              </span>
              <div className="text-zinc-300 text-[11px] leading-relaxed">
                <DualText
                  en="“Always use an internal, surrogate integer (or UUID) as your Primary Key for physical table relationships and joins. Always enforce a UNIQUE constraint on your natural business identifier (NID, Email, SKU) as an Alternate Key for fast, collision-free business lookups!”"
                  bn="“টেবিলগুলোর মাঝে শারীরিক সম্পর্ক ও দ্রুতগতির জয়েনের জন্য সর্বদা একটি অভ্যন্তরীণ সারোগেট ইন্টিজার (বা UUID)-কে প্রাইমারি কি হিসেবে রাখুন। আর বাস্তব জগতের পরিচিতিকে (NID, Email, SKU) অল্টারনেট কী হিসেবে UNIQUE কনস্ট্রেইন্ট দিয়ে সুরক্ষিত রাখুন!”"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
