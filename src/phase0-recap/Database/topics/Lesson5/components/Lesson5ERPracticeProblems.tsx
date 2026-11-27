'use client';

import React, { useState } from 'react';
import {
  PenTool,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Database,
  GitBranch,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface ERProblem {
  id: number;
  tagEn: string;
  tagBn: string;
  titleEn: string;
  titleBn: string;
  contextEn: string;
  contextBn: string;
  requirementsEn: string[];
  requirementsBn: string[];
  quizQuestionEn: string;
  quizQuestionBn: string;
  options: { id: string; labelEn: string; labelBn: string; isCorrect: boolean }[];
  feedbackCorrectEn: string;
  feedbackCorrectBn: string;
  feedbackWrongEn: string;
  feedbackWrongBn: string;
  erBlueprint: string;
  entitiesEn: string[];
  entitiesBn: string[];
  tablesSql: string;
}

const ER_PROBLEMS: ERProblem[] = [
  {
    id: 1,
    tagEn: 'Case 1 • University',
    tagBn: 'কেস ১ • বিশ্ববিদ্যালয়',
    titleEn: 'Case Study 1: University Course Registration System',
    titleBn: 'কেস স্টাডি ১: বিশ্ববিদ্যালয় কোর্স রেজিস্ট্রেশন সিস্টেম',
    contextEn: 'Design an ER diagram and relational schema for a University Academic Portal based on the following specification:',
    contextBn: 'নিচের শর্তাবলির ভিত্তিতে একটি বিশ্ববিদ্যালয় একাডেমিক পোর্টালের ER ডায়াগ্রাম ও রিলেশনাল স্কিমা ডিজাইন করুন:',
    requirementsEn: [
      'Each Department has a unique dept_id, dept_name, and building. A Department offers many Courses, while every Course belongs to strictly one Department.',
      'Each Course has course_code (unique), title, and credits.',
      'Each Student has student_id (unique), full_name, email, dob, a calculated age, and may register multiple phone_numbers.',
      'A Student can enroll in many Courses across semesters, and a Course can have many Students. Record semester, enroll_date, and grade for each enrollment.'
    ],
    requirementsBn: [
      'প্রতিটি Department-এর ইউনিক dept_id, dept_name ও building আছে। একটি Department অনেকগুলো Course অফার করে, কিন্তু প্রতিটি Course কেবল একটি Department-এর অধীনে থাকে।',
      'প্রতিটি Course-এর course_code (ইউনিক), title এবং credits থাকে।',
      'প্রতিটি Student-এর student_id (ইউনিক), full_name, email, dob, হিসাবকৃত age এবং একাধিক phone_numbers থাকতে পারে।',
      'একজন Student একাধিক সেমিস্টারে অনেক Course নিতে পারে এবং একটি Course-এ অনেক Student থাকতে পারে। প্রতিটি এনরোলমেন্টের semester, enroll_date ও grade সংরক্ষণ করতে হবে।'
    ],
    quizQuestionEn: 'Exam Check: How should phone_numbers, age, and Student-Course enrollment be modeled?',
    quizQuestionBn: 'পরীক্ষার যাচাই: phone_numbers, age এবং Student-Course এনরোলমেন্ট কীভাবে মডেল করবেন?',
    options: [
      { id: 'a', labelEn: 'phone_numbers = Multivalued ((phone)) -> separate table; age = Derived (dashed); Enrollment = M:N Junction table', labelBn: 'phone_numbers = Multivalued -> আলাদা টেবিল; age = Derived (ড্যাশড); Enrollment = M:N জাংশন টেবিল', isCorrect: true },
      { id: 'b', labelEn: 'Store phone_numbers & course_codes as comma-separated lists in STUDENT', labelBn: 'STUDENT টেবিলে কমা দিয়ে phone_numbers ও course_codes রাখা', isCorrect: false },
      { id: 'c', labelEn: 'Model Enrollment as 1:1 between STUDENT and DEPARTMENT', labelBn: 'STUDENT ও DEPARTMENT-এর মধ্যে ১:১ সম্পর্ক হিসেবে Enrollment দেখানো', isCorrect: false },
    ],
    feedbackCorrectEn: 'Exact exam answer! Multivalued attributes split to satisfy 1NF, derived age is computed from dob, and M:N with grade/semester becomes ENROLLMENT.',
    feedbackCorrectBn: 'নিখুঁত উত্তর! 1NF মানতে Multivalued কলাম আলাদা টেবিলে যাবে, age হিসাব হবে dob থেকে, আর M:N সম্পর্ক হবে ENROLLMENT টেবিল।',
    feedbackWrongEn: 'Comma-separated lists violate 1NF. Multivalued attributes need their own table, and M:N relationships need a Junction Table.',
    feedbackWrongBn: 'কমা-দিয়ে একাধিক মান রাখলে 1NF ভঙ্গ হয়। Multivalued-এর জন্য আলাদা টেবিল এবং M:N-এর জন্য জাংশন টেবিল দরকার।',
    erBlueprint: `[DEPARTMENT] ──(1)── <Offers> ──(N)── [COURSE]
                                          │ (N)
                                      <Enrolls {semester, enroll_date, grade}>
                                          │ (M)
[STUDENT ((phone_numbers)), dob, (age derived)]`,
    entitiesEn: [
      'DEPARTMENT: dept_id [PK], dept_name, building',
      'COURSE: course_code [PK], title, credits, dept_id [FK]',
      'STUDENT: student_id [PK], full_name, email, dob | ((phone_numbers)) Multivalued | (age) Derived',
      'ENROLLMENT (M:N Junction): (student_id, course_code, semester) [Composite PK], enroll_date, grade'
    ],
    entitiesBn: [
      'DEPARTMENT: dept_id [PK], dept_name, building',
      'COURSE: course_code [PK], title, credits, dept_id [FK]',
      'STUDENT: student_id [PK], full_name, email, dob | ((phone_numbers)) Multivalued | (age) Derived',
      'ENROLLMENT (M:N জাংশন): (student_id, course_code, semester) [Composite PK], enroll_date, grade'
    ],
    tablesSql: `DEPARTMENT(dept_id PK, dept_name, building)
COURSE(course_code PK, title, credits, dept_id FK)
STUDENT(student_id PK, full_name, email UNIQUE, dob)
STUDENT_PHONE(student_id FK, phone_no, PK(student_id, phone_no))
ENROLLMENT(student_id FK, course_code FK, semester, enroll_date, grade, PK(student_id, course_code, semester))`,
  },
  {
    id: 2,
    tagEn: 'Case 2 • Hospital',
    tagBn: 'কেস ২ • হাসপাতাল',
    titleEn: 'Case Study 2: Hospital Patient, Doctor & Ward Management',
    titleBn: 'কেস স্টাডি ২: হাসপাতাল রোগী, ডাক্তার ও ওয়ার্ড ব্যবস্থাপনা',
    contextEn: 'A city hospital wants to computerize patient admissions and doctor consultations under these rules:',
    contextBn: 'একটি শহরের হাসপাতাল নিচের নিয়মগুলো মেনে রোগী ভর্তি ও ডাক্তার কনসালটেশন সিস্টেম তৈরি করতে চায়:',
    requirementsEn: [
      'The hospital has multiple Wards (ward_id, ward_name, floor). Each Ward houses multiple admitted Patients, and an admitted Patient is assigned to at most one Ward.',
      'Doctors (doc_id, name, specialty) treat Patients (patient_id, name, blood_group).',
      'A Patient can consult multiple Doctors on different dates, and a Doctor treats many Patients. Each consultation records visit_date, diagnosis, and prescription.',
      'Every Doctor must belong to at least one Medical_Unit (Total Participation).'
    ],
    requirementsBn: [
      'হাসপাতালে একাধিক Ward (ward_id, ward_name, floor) আছে। প্রতিটি Ward-এ অনেক Patient ভর্তি থাকতে পারে, এবং একজন ভর্তি Patient সর্বোচ্চ একটি Ward-এ থাকে।',
      'Doctors (doc_id, name, specialty) রোগীদের (patient_id, name, blood_group) চিকিৎসা করেন।',
      'একজন Patient ভিন্ন ভিন্ন তারিখে একাধিক Doctor দেখাতে পারেন, এবং একজন Doctor অনেক Patient দেখেন। প্রতিটি ভিজিটের visit_date, diagnosis ও prescription রাখতে হবে।',
      'প্রতিটি Doctor-কে অবশ্যই অন্তত একটি Medical_Unit-এর অন্তর্ভুক্ত হতে হবে (Total Participation)।'
    ],
    quizQuestionEn: 'Exam Check: How do you model Patient-Doctor consultations and Ward admission?',
    quizQuestionBn: 'পরীক্ষার যাচাই: Patient-Doctor কনসালটেশন এবং Ward ভর্তি কীভাবে মডেল করবেন?',
    options: [
      { id: 'a', labelEn: 'Ward 1:N Patient (nullable ward_id FK); Doctor-Patient M:N via CONSULTATION associative entity', labelBn: 'Ward ১:N Patient (nullable ward_id FK); Doctor-Patient M:N হবে CONSULTATION টেবিল দিয়ে', isCorrect: true },
      { id: 'b', labelEn: 'Put doc_id directly as PK inside PATIENT table', labelBn: 'PATIENT টেবিলে সরাসরি doc_id-কে PK করা', isCorrect: false },
      { id: 'c', labelEn: 'Make WARD a Weak Entity of PATIENT', labelBn: 'WARD-কে PATIENT-এর Weak Entity করা', isCorrect: false },
    ],
    feedbackCorrectEn: 'Correct! Outpatients may not have a ward (nullable ward_id FK), and recurring consultations with date/diagnosis become CONSULTATION.',
    feedbackCorrectBn: 'সঠিক! আউটডোর রোগীর Ward নাও থাকতে পারে (nullable ward_id FK), আর একাধিক ভিজিটের জন্য CONSULTATION টেবিল দরকার।',
    feedbackWrongEn: 'Putting doc_id as PK in PATIENT prevents a patient from visiting multiple doctors, and Wards exist independently of Patients.',
    feedbackWrongBn: 'PATIENT-এ doc_id PK করলে একজন রোগী একাধিক ডাক্তার দেখাতে পারবে না, আর Ward স্বাধীন সত্তা।',
    erBlueprint: `[MEDICAL_UNIT] ──(1)── <Employs> ══(N)══ [DOCTOR] ──(1)── <Consults> ──(N)── [CONSULTATION {visit_date, diagnosis}] ──(N)── [PATIENT] ──(N)── <Admitted_In> ──(1)── [WARD]`,
    entitiesEn: [
      'MEDICAL_UNIT: unit_id [PK], unit_name',
      'DOCTOR: doc_id [PK], name, specialty, unit_id [FK NOT NULL — Total Participation]',
      'WARD: ward_id [PK], ward_name, floor',
      'PATIENT: patient_id [PK], name, blood_group, ward_id [Nullable FK]',
      'CONSULTATION (Associative): consult_id [PK], doc_id [FK], patient_id [FK], visit_date, diagnosis, prescription'
    ],
    entitiesBn: [
      'MEDICAL_UNIT: unit_id [PK], unit_name',
      'DOCTOR: doc_id [PK], name, specialty, unit_id [FK NOT NULL — Total Participation]',
      'WARD: ward_id [PK], ward_name, floor',
      'PATIENT: patient_id [PK], name, blood_group, ward_id [Nullable FK]',
      'CONSULTATION (Associative): consult_id [PK], doc_id [FK], patient_id [FK], visit_date, diagnosis, prescription'
    ],
    tablesSql: `MEDICAL_UNIT(unit_id PK, unit_name)
DOCTOR(doc_id PK, name, specialty, unit_id FK NOT NULL)
WARD(ward_id PK, ward_name, floor)
PATIENT(patient_id PK, name, blood_group, ward_id FK NULL)
CONSULTATION(consult_id PK, doc_id FK, patient_id FK, visit_date, diagnosis, prescription)`,
  },
  {
    id: 3,
    tagEn: 'Case 3 • Corporate HR',
    tagBn: 'কেস ৩ • কর্পোরেট HR',
    titleEn: 'Case Study 3: Company HR, Projects & Insurance Dependents',
    titleBn: 'কেস স্টাডি ৩: কোম্পানি HR, প্রজেক্ট ও ইন্স্যুরেন্স ডিপেন্ডেন্ট',
    contextEn: 'Model a corporate database capturing organizational management, project allocation, and employee family insurance:',
    contextBn: 'একটি কোম্পানির বিভাগীয় ব্যবস্থাপনা, প্রজেক্ট বণ্টন ও কর্মচারীদের পারিবারিক ইন্স্যুরেন্সের জন্য ডেটাবেস মডেল তৈরি করুন:',
    requirementsEn: [
      'Every Employee (emp_id, nid, name, salary) works in exactly one Department (dept_id, dept_name).',
      'Each Department is managed by exactly one Employee (1:1), and the system must record manager_start_date.',
      'An Employee can work on multiple Projects (proj_id, proj_name), and each Project has many Employees, tracking hours_per_week.',
      'Employees may register Dependents (dep_name, relationship, dob) for health insurance. Dependents cannot exist without an Employee, and two Employees can both have a child named "Ayan".'
    ],
    requirementsBn: [
      'প্রতিটি Employee (emp_id, nid, name, salary) ঠিক একটি Department-এ (dept_id, dept_name) কাজ করে।',
      'প্রতিটি Department কেবল একজন Employee দ্বারা পরিচালিত হয় (১:১) এবং manager_start_date সংরক্ষণ করতে হবে।',
      'একজন Employee একাধিক Project-এ কাজ করতে পারে এবং প্রতিটি Project-এ অনেক Employee থাকে (সাথে hours_per_week রাখতে হবে)।',
      'হেলথ ইন্স্যুরেন্সের জন্য Employee তার Dependent (dep_name, relationship, dob) যোগ করতে পারে। Employee ছাড়া Dependent থাকতে পারে না এবং দুজন কর্মচারীর সন্তানের নামই "Ayan" হতে পারে।'
    ],
    quizQuestionEn: 'Exam Check: How do you model DEPENDENT and the 1:1 Department Manager?',
    quizQuestionBn: 'পরীক্ষার যাচাই: DEPENDENT এবং ১:১ Department Manager কীভাবে মডেল করবেন?',
    options: [
      { id: 'a', labelEn: 'DEPENDENT = Weak Entity [[DEPENDENT]] with Partial Key (dep_name) + Total Participation; Manager = 1:1 with manager_emp_id FK + start_date in DEPARTMENT', labelBn: 'DEPENDENT = Weak Entity (Partial Key: dep_name + Total Participation); Manager = DEPARTMENT-এ manager_emp_id FK + start_date', isCorrect: true },
      { id: 'b', labelEn: 'DEPENDENT = Strong Entity with dep_name as Primary Key', labelBn: 'DEPENDENT = Strong Entity, শুধু dep_name হবে PK', isCorrect: false },
      { id: 'c', labelEn: 'Merge EMPLOYEE and DEPARTMENT into a single flat table', labelBn: 'EMPLOYEE ও DEPARTMENT একসাথে একটি টেবিলে রাখা', isCorrect: false },
    ],
    feedbackCorrectEn: 'Perfect! DEPENDENT has no global PK (emp_id + dep_name form Composite PK), and putting manager_emp_id (UNIQUE FK) + start_date in DEPARTMENT models 1:1 cleanly.',
    feedbackCorrectBn: 'চমৎকার! DEPENDENT-এ emp_id + dep_name মিলে Composite PK হবে, আর DEPARTMENT-এ manager_emp_id (UNIQUE FK) + start_date দিয়ে ১:১ সম্পর্ক নির্ভুলভাবে হয়।',
    feedbackWrongEn: 'Remember: dep_name "Ayan" can repeat across employees, so DEPENDENT is a Weak Entity. Merging tables causes severe update anomalies.',
    feedbackWrongBn: '"Ayan" নাম একাধিক কর্মচারীর সন্তানের হতে পারে, তাই DEPENDENT একটি Weak Entity। আর টেবিল একত্র করলে ডেটা অ্যানোমালি হয়।',
    erBlueprint: `[DEPARTMENT] ──(1)── <Manages {start_date}> ──(1)── [EMPLOYEE] ──(1)── ⟪Has⟫ ══(N)══ [[DEPENDENT (dep_name)]]
                                                        │ (M)
                                                <Works_On {hours}>
                                                        │ (N)
                                                    [PROJECT]`,
    entitiesEn: [
      'DEPARTMENT: dept_id [PK], dept_name, manager_emp_id [UNIQUE FK -> EMPLOYEE], manager_start_date',
      'EMPLOYEE: emp_id [PK], nid [UNIQUE], name, salary, dept_id [FK]',
      'PROJECT: proj_id [PK], proj_name',
      'WORKS_ON (M:N): (emp_id, proj_id) [Composite PK], hours_per_week',
      'DEPENDENT (Weak Entity): (emp_id [FK], dep_name [Partial Key]) [Composite PK], relationship, dob'
    ],
    entitiesBn: [
      'DEPARTMENT: dept_id [PK], dept_name, manager_emp_id [UNIQUE FK -> EMPLOYEE], manager_start_date',
      'EMPLOYEE: emp_id [PK], nid [UNIQUE], name, salary, dept_id [FK]',
      'PROJECT: proj_id [PK], proj_name',
      'WORKS_ON (M:N): (emp_id, proj_id) [Composite PK], hours_per_week',
      'DEPENDENT (Weak Entity): (emp_id [FK], dep_name [Partial Key]) [Composite PK], relationship, dob'
    ],
    tablesSql: `DEPARTMENT(dept_id PK, dept_name, manager_emp_id FK UNIQUE, manager_start_date)
EMPLOYEE(emp_id PK, nid UNIQUE, name, salary, dept_id FK)
PROJECT(proj_id PK, proj_name)
WORKS_ON(emp_id FK, proj_id FK, hours_per_week, PK(emp_id, proj_id))
DEPENDENT(emp_id FK, dep_name, relationship, dob, PK(emp_id, dep_name))`,
  },
  {
    id: 4,
    tagEn: 'Case 4 • E-Commerce',
    tagBn: 'কেস ৪ • ই-কমার্স',
    titleEn: 'Case Study 4: E-Commerce Marketplace & Order Fulfillment',
    titleBn: 'কেস স্টাডি ৪: ই-কমার্স মার্কেটপ্লেস ও অর্ডার ফুলফিলমেন্ট',
    contextEn: 'Design the conceptual ER model and relational tables for an online store following these business rules:',
    contextBn: 'নিচের ব্যবসায়িক নিয়মগুলো অনুসারে একটি অনলাইন শপের ER মডেল ও রিলেশনাল স্কিমা তৈরি করুন:',
    requirementsEn: [
      'A Customer (cust_id, name, email) can save multiple shipping addresses and place many Orders (order_id, order_date, total_amount [derived from items]).',
      'Each Product (prod_id, title, unit_price) belongs to exactly one Category (cat_id, cat_name).',
      'An Order must contain at least one Product (Total Participation), and each Product can appear in many Orders. Store quantity and unit_price_at_purchase for each ordered item.',
      'Every Order has strictly one Payment (pay_id, method, paid_at) (1:1 relationship).'
    ],
    requirementsBn: [
      'একজন Customer (cust_id, name, email) একাধিক shipping addresses সংরক্ষণ করতে এবং অনেকগুলো Order (order_id, order_date, total_amount [derived]) দিতে পারে।',
      'প্রতিটি Product (prod_id, title, unit_price) কেবল একটি Category-র (cat_id, cat_name) অন্তর্ভুক্ত।',
      'একটি Order-এ অবশ্যই অন্তত একটি Product থাকতে হবে (Total Participation) এবং একটি Product অনেক Order-এ থাকতে পারে। প্রতিটি আইটেমের quantity ও unit_price_at_purchase সংরক্ষণ করতে হবে।',
      'প্রতিটি Order-এর জন্য ঠিক একটি Payment (pay_id, method, paid_at) থাকবে (১:১ সম্পর্ক)।'
    ],
    quizQuestionEn: 'Exam Check: How should addresses, Order-Product items, and 1:1 Payment be mapped?',
    quizQuestionBn: 'পরীক্ষার যাচাই: addresses, Order-Product আইটেম এবং ১:১ Payment কীভাবে ম্যাপ করবেন?',
    options: [
      { id: 'a', labelEn: 'CUSTOMER_ADDRESS table; ORDER_ITEM junction table for M:N; PAYMENT holds order_id UNIQUE FK for 1:1', labelBn: 'CUSTOMER_ADDRESS টেবিল; M:N-এর জন্য ORDER_ITEM জাংশন টেবিল; ১:১-এর জন্য PAYMENT-এ order_id UNIQUE FK', isCorrect: true },
      { id: 'b', labelEn: 'Keep addresses and products as arrays inside ORDERS table', labelBn: 'ORDERS টেবিলের ভেতরেই addresses ও products অ্যারে হিসেবে রাখা', isCorrect: false },
      { id: 'c', labelEn: 'Use M:N between ORDER and PAYMENT', labelBn: 'ORDER ও PAYMENT-এর মধ্যে M:N সম্পর্ক ব্যবহার করা', isCorrect: false },
    ],
    feedbackCorrectEn: 'Spot on! Saving unit_price_at_purchase in ORDER_ITEM also preserves historical order totals even if Product price changes later.',
    feedbackCorrectBn: 'একদম সঠিক! ORDER_ITEM-এ unit_price_at_purchase রাখলে ভবিষ্যতে প্রোডাক্টের দাম বদলালেও পুরনো অর্ডারের হিসাব ঠিক থাকে।',
    feedbackWrongEn: 'Arrays break 1NF, and specification states each Order has strictly one Payment (1:1 -> UNIQUE FK).',
    feedbackWrongBn: 'অ্যারে রাখলে 1NF ভঙ্গ হয়, আর নিয়ম অনুযায়ী প্রতিটি Order-এর জন্য ১টি Payment (১:১ -> UNIQUE FK)।',
    erBlueprint: `[CUSTOMER ((addresses))] ──(1)── <Places> ──(N)── [ORDER] ──(1)── <Paid_By> ──(1)── [PAYMENT]
                                                   ║ (M Total)
                                           <Contains {qty, price}>
                                                   │ (N)
                                 [CATEGORY] ──(1)── [PRODUCT]`,
    entitiesEn: [
      'CUSTOMER: cust_id [PK], name, email | ((addresses)) Multivalued',
      'CATEGORY: cat_id [PK], cat_name',
      'PRODUCT: prod_id [PK], title, unit_price, cat_id [FK]',
      'ORDERS: order_id [PK], order_date, (total_amount Derived), cust_id [FK]',
      'ORDER_ITEM (M:N): (order_id, prod_id) [PK + FKs], quantity, unit_price_at_purchase',
      'PAYMENT (1:1): pay_id [PK], order_id [UNIQUE FK], method, paid_at'
    ],
    entitiesBn: [
      'CUSTOMER: cust_id [PK], name, email | ((addresses)) Multivalued',
      'CATEGORY: cat_id [PK], cat_name',
      'PRODUCT: prod_id [PK], title, unit_price, cat_id [FK]',
      'ORDERS: order_id [PK], order_date, (total_amount Derived), cust_id [FK]',
      'ORDER_ITEM (M:N): (order_id, prod_id) [PK + FKs], quantity, unit_price_at_purchase',
      'PAYMENT (1:1): pay_id [PK], order_id [UNIQUE FK], method, paid_at'
    ],
    tablesSql: `CUSTOMER(cust_id PK, name, email UNIQUE)
CUSTOMER_ADDRESS(addr_id PK, cust_id FK, address_line)
CATEGORY(cat_id PK, cat_name)
PRODUCT(prod_id PK, title, unit_price, cat_id FK)
ORDERS(order_id PK, order_date, cust_id FK)
ORDER_ITEM(order_id FK, prod_id FK, quantity, unit_price_at_purchase, PK(order_id, prod_id))
PAYMENT(pay_id PK, order_id FK UNIQUE NOT NULL, method, paid_at)`,
  },
];

export default function Lesson5ERPracticeProblems() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({});

  const problem = ER_PROBLEMS.find((p) => p.id === activeId) || ER_PROBLEMS[0];
  const pickedOptionId = selectedAnswers[problem.id];
  const pickedOption = problem.options.find((o) => o.id === pickedOptionId);
  const isSolutionOpen = !!showSolution[problem.id];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
              {language === 'bn' ? 'পার্ট ৭ • পরীক্ষার কেস স্টাডি অনুশীলন' : 'Part 7 • Exam-Style ER Case Studies'}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
              <DualText
                as="span"
                en="7. Practice Lab: Solve Real-World ER Diagram Case Studies"
                bn="৭. প্র্যাকটিস ল্যাব: পরীক্ষার মতো ER ডায়াগ্রাম কেস স্টাডি সমাধান"
              />
            </h2>
          </div>
        </div>
        <span className="text-xs font-mono text-zinc-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          4 Exam Cases
        </span>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {ER_PROBLEMS.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500/40'
                  : 'bg-[#14182d] border-slate-800 text-zinc-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                {language === 'bn' ? p.tagBn : p.tagEn}
              </span>
              <span className="text-xs font-bold block mt-0.5 truncate">
                {language === 'bn' ? p.titleBn : p.titleEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Exam Case Card */}
      <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-800 space-y-4">
        <div className="p-4 rounded-xl bg-[#0c0e18] border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
            <FileText className="w-4 h-4 shrink-0" />
            <span>{language === 'bn' ? problem.titleBn : problem.titleEn}</span>
          </div>
          <DualText
            as="p"
            className="text-xs text-zinc-300 font-sans"
            en={problem.contextEn}
            bn={problem.contextBn}
          />
          <ul className="space-y-1.5 text-xs text-zinc-200 font-sans list-disc pl-5 marker:text-cyan-400">
            {(language === 'bn' ? problem.requirementsBn : problem.requirementsEn).map((req, idx) => (
              <li key={idx} className="leading-relaxed">{req}</li>
            ))}
          </ul>
        </div>

        {/* Interactive Exam Check */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono font-bold text-amber-300 block">
            {language === 'bn' ? problem.quizQuestionBn : problem.quizQuestionEn}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {problem.options.map((opt) => {
              const isPicked = pickedOptionId === opt.id;
              let btnStyle = 'bg-[#0c0e18] border-slate-800 text-zinc-300 hover:border-slate-600';
              if (isPicked) {
                btnStyle = opt.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40'
                  : 'bg-rose-950/40 border-rose-500 text-rose-200 ring-1 ring-rose-500/40';
              }
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedAnswers((prev) => ({ ...prev, [problem.id]: opt.id }))}
                  className={`p-3 rounded-xl border text-left text-xs font-sans transition-all cursor-pointer flex items-start gap-2 ${btnStyle}`}
                >
                  <span className="font-mono font-bold uppercase text-zinc-400">{opt.id})</span>
                  <span>{language === 'bn' ? opt.labelBn : opt.labelEn}</span>
                </button>
              );
            })}
          </div>

          {pickedOption && (
            <div
              className={`p-3 rounded-xl border text-xs font-sans flex items-start gap-2 ${
                pickedOption.isCorrect
                  ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/25 border-rose-500/40 text-rose-300'
              }`}
            >
              {pickedOption.isCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span>
                {pickedOption.isCorrect
                  ? language === 'bn'
                    ? problem.feedbackCorrectBn
                    : problem.feedbackCorrectEn
                  : language === 'bn'
                  ? problem.feedbackWrongBn
                  : problem.feedbackWrongEn}
              </span>
            </div>
          )}
        </div>

        {/* Toggle Full ER Solution */}
        <div>
          <button
            onClick={() => setShowSolution((prev) => ({ ...prev, [problem.id]: !prev[problem.id] }))}
            className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all"
          >
            {isSolutionOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>
              {isSolutionOpen
                ? language === 'bn'
                  ? 'সম্পূর্ণ সমাধান লুকান'
                  : 'Hide Full ER Solution & Tables'
                : language === 'bn'
                ? 'সম্পূর্ণ ER সমাধান ও রিলেশনাল টেবিল দেখুন'
                : 'Reveal Full ER Solution & Relational Tables'}
            </span>
          </button>

          {isSolutionOpen && (
            <div className="mt-4 p-4 rounded-xl bg-[#0c0e18] border border-indigo-500/30 space-y-3.5">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5" />
                  {language === 'bn' ? 'ER ডায়াগ্রাম ব্লুপ্রিন্ট:' : 'ER Diagram Blueprint:'}
                </span>
                <pre className="p-3 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
                  {problem.erBlueprint}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase">
                    {language === 'bn' ? 'শনাক্তকৃত এনটিটি ও কী:' : 'Identified Entities & Keys:'}
                  </span>
                  <ul className="space-y-1 text-xs font-mono text-zinc-300">
                    {(language === 'bn' ? problem.entitiesBn : problem.entitiesEn).map((ent, idx) => (
                      <li key={idx} className="p-2 rounded bg-slate-900/70 border border-slate-800/80">
                        {ent}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'চূড়ান্ত রিলেশনাল স্কিমা:' : 'Mapped Relational Tables:'}
                  </span>
                  <pre className="p-3 rounded-lg bg-black/60 border border-emerald-500/20 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {problem.tablesSql}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
