'use client';

import React, { useState } from 'react';
import { Database, Filter, GraduationCap, Table } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part19ProjectWalkthrough() {
  const { language } = useLanguage();
  const [activeProjectStep, setActiveProjectStep] = useState<number>(1);

  return (
    <>
{/* ========================================================
          PART 19: COMPLETE SQL PRACTICE PROJECT WALKTHROUGH
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১৯ • রিয়েল-লাইফ প্রজেক্ট' : 'Part 19 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Complete SQL Practice Project: University System"
                bn="পূর্ণাঙ্গ এসকিউএল অনুশীলন প্রকল্প: বিশ্ববিদ্যালয় সিস্টেম"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Walk through the complete lifecycle of a relational database step-by-step:"
          bn="একটি রিলেশনাল ডেটাবেসের সম্পূর্ণ লাইফসাইকেল ধাপে ধাপে অনুশীলন করুন:"
        />

        {/* Step Buttons */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(step => (
            <button
              key={step}
              onClick={() => setActiveProjectStep(step)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                activeProjectStep === step
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-[#14182d] text-zinc-400 hover:text-white border border-slate-800'
              }`}
            >
              {language === 'bn' ? `ধাপ ${step}` : `Step ${step}`}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-5 rounded-2xl bg-[#14182d] border border-slate-700/60 space-y-3">
          {activeProjectStep === 1 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 1: Create Database" bn="ধাপ ১: ডেটাবেস তৈরি" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE DATABASE UniversityDB;
USE UniversityDB;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Creates the container and sets it as the active working schema."
                bn="ডেটাবেস কন্টেইনার তৈরি করে এবং এটিকে সক্রিয় র্কিং স্কিমা হিসেবে সেট করে।"
              />
            </div>
          )}

          {activeProjectStep === 2 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 2: Create Departments Table (Parent)" bn="ধাপ ২: Departments টেবিল তৈরি (প্যারেন্ট টেবিল)" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE TABLE Departments (
    Department_ID INT PRIMARY KEY,
    Department_Name VARCHAR(50) NOT NULL
);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Always create parent tables first so child tables can reference their Primary Keys."
                bn="সর্বদা প্যারেন্ট টেবিল আগে তৈরি করবেন যেন চাইল্ড টেবিলগুলো এর Primary Key রেফারেন্স করতে পারে।"
              />
            </div>
          )}

          {activeProjectStep === 3 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 3: Insert Departments" bn="ধাপ ৩: ডিপার্টমেন্ট ডেটা ইনসার্ট" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`INSERT INTO Departments VALUES 
(1, 'CSE'),
(2, 'BBA'),
(3, 'EEE');`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Batch-inserts 3 department records into the Departments table."
                bn="Departments টেবিলে একবারে ৩টি ডিপার্টমেন্ট রেকর্ড ইনসার্ট করে।"
              />
            </div>
          )}

          {activeProjectStep === 4 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 4: Create Students Table with Foreign Key" bn="ধাপ ৪: Foreign Key সহ Students টেবিল তৈরি" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Age INT CHECK (Age >= 16),
    Email VARCHAR(100) UNIQUE,
    Department_ID INT,
    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)
);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Enforces PK, NOT NULL, CHECK, UNIQUE, and FOREIGN KEY integrity."
                bn="PK, NOT NULL, CHECK, UNIQUE এবং FOREIGN KEY এর ইন্টিগ্রিটি নিশ্চিত করে।"
              />
            </div>
          )}

          {activeProjectStep === 5 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 5: Insert Student Records" bn="ধাপ ৫: শিক্ষার্থী রেকর্ড ইনসার্ট" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`INSERT INTO Students VALUES 
(101, 'Rahim', 22, 'rahim@gmail.com', 1),
(102, 'Karim', 23, 'karim@gmail.com', 2),
(103, 'Sumaiya', 21, 'sumaiya@gmail.com', 1),
(104, 'Nabila', 22, 'nabila@gmail.com', 3);`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Populates students referencing existing department foreign keys (1, 2, 3)."
                bn="বিদ্যমান ডিপার্টমেন্ট ফরেন কি (১, ২, ৩) রেফারেন্স করে শিক্ষার্থীদের ডেটা সংরক্ষণ করে।"
              />
            </div>
          )}

          {activeProjectStep === 6 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 6: Display All Students" bn="ধাপ ৬: সব শিক্ষার্থীর তালিকা প্রদর্শন" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Returns all 4 student records with their raw Department_IDs."
                bn="সকল ৪ জন শিক্ষার্থীর রেকর্ড তাদের ডিপার্টমেন্ট আইডি সহ রিটার্ন করে।"
              />
            </div>
          )}

          {activeProjectStep === 7 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 7: Filter CSE Students" bn="ধাপ ৭: শুধু CSE শিক্ষার্থীদের ফিল্টার করা" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT * FROM Students WHERE Department_ID = 1;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Returns Rahim (101) and Sumaiya (103)."
                bn="রহিম (১০১) এবং সুমাইয়া (১০৩) এর তথ্য রিটার্ন করে।"
              />
            </div>
          )}

          {activeProjectStep === 8 && (
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-300">
                <DualText en="Step 8: Join Students with Department Names" bn="ধাপ ৮: ডিপার্টমেন্টের নাম সহ জয়েন করা" />
              </span>
              <pre className="p-3 bg-black/60 rounded text-xs font-mono text-emerald-400 overflow-x-auto">
{`SELECT Students.Name, Departments.Department_Name 
FROM Students 
INNER JOIN Departments 
ON Students.Department_ID = Departments.Department_ID;`}
              </pre>
              <DualText
                as="p"
                className="text-xs text-zinc-400"
                en="Generates clean human-readable output replacing department IDs with actual names (CSE, BBA, EEE)."
                bn="ডিপার্টমেন্ট আইডির পরিবর্তে পাঠযোগ্য প্রকৃত নাম (CSE, BBA, EEE) প্রতিস্থাপন করে সুন্দর আউটপুট দেয়।"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
