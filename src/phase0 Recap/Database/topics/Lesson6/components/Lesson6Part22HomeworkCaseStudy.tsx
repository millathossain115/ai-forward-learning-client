'use client';

import React, { useState } from 'react';
import { Building2, Eye, Table } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';


export default function Lesson6Part22HomeworkCaseStudy() {
  const { language } = useLanguage();
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const toggleSolution = (taskNum: number) => {
    setRevealedSolutions(prev => ({ ...prev, [taskNum]: !prev[taskNum] }));
  };

  return (
    <>
{/* ========================================================
          PART 12: HOMEWORK & CASE STUDY (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ১২ • প্র্যাকটিক্যাল কেস স্টাডি' : 'Part 12 of 13'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Practical Case Study: CompanyDB (Departments & Employees)"
                bn="বাস্তবধর্মী কেস স্টাডি: CompanyDB (Departments ও Employees স্কিমা)"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Practice writing DDL, DML, filtering, sorting, JOIN, and GROUP BY queries for a relational enterprise database. Click Reveal Mentor Query on any task to verify your SQL:"
          bn="একটি রিলেশনাল এন্টারপ্রাইজ ডেটাবেসের জন্য DDL, DML, ফিল্টারিং, সর্টিং, JOIN এবং GROUP BY কুয়েরি অনুশীলন করুন। আপনার SQL যাচাই করতে যেকোনো টাস্কে মেনটর কুয়েরি দেখুন বাটনে ক্লিক করুন:"
        />

        {/* Two-Table Schema Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase">
              <DualText en="Parent Table: Departments" bn="প্যারেন্ট টেবিল: Departments" />
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-1">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Department_ID</span>
                <span className="text-zinc-400">INT (PK)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Department_Name</span>
                <span className="text-zinc-400">VARCHAR(50)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Budget</span>
                <span className="text-zinc-400">DECIMAL(12,2)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">
              <DualText en="Child Table: Employees (FK → Departments)" bn="চাইল্ড টেবিল: Employees (FK → Departments)" />
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px] pt-1">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Employee_ID</span>
                <span className="text-zinc-400">INT (PK)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Name</span>
                <span className="text-zinc-400">VARCHAR(100)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Age</span>
                <span className="text-zinc-400">INT</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-cyan-400 font-bold block">Salary</span>
                <span className="text-zinc-400">DECIMAL(10,2)</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-amber-300 font-bold block">Department_ID</span>
                <span className="text-zinc-400">INT (FK)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 10 Interactive Tasks in Compact 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {[
            {
              num: 1,
              en: 'Task 1: Create CompanyDB and create the parent Departments table.',
              bn: 'টাস্ক ১: CompanyDB তৈরি করুন এবং প্যারেন্ট Departments টেবিল তৈরি করুন।',
              sol: "CREATE DATABASE CompanyDB;\nUSE CompanyDB;\n\nCREATE TABLE Departments (\n    Department_ID INT PRIMARY KEY,\n    Department_Name VARCHAR(50) NOT NULL UNIQUE,\n    Budget DECIMAL(12,2)\n);"
            },
            {
              num: 2,
              en: 'Task 2: Create Employees with a FOREIGN KEY to Departments.',
              bn: 'টাস্ক ২: Departments-এ FOREIGN KEY সহ Employees টেবিল তৈরি করুন।',
              sol: "CREATE TABLE Employees (\n    Employee_ID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT CHECK (Age >= 18),\n    Salary DECIMAL(10,2) NOT NULL,\n    Department_ID INT,\n    FOREIGN KEY (Department_ID) REFERENCES Departments(Department_ID)\n);"
            },
            {
              num: 3,
              en: 'Task 3: Insert 3 departments (IT, HR, Finance) and 5 employees.',
              bn: 'টাস্ক ৩: ৩টি ডিপার্টমেন্ট (IT, HR, Finance) এবং ৫ জন কর্মচারী ইনসার্ট করুন।',
              sol: "INSERT INTO Departments VALUES\n(1, 'IT', 500000.00), (2, 'HR', 250000.00), (3, 'Finance', 350000.00);\n\nINSERT INTO Employees VALUES\n(101, 'Ahmed', 28, 45000.00, 1),\n(102, 'Sara', 32, 55000.00, 2),\n(103, 'Tariq', 25, 32000.00, 1),\n(104, 'Mona', 29, 48000.00, 3),\n(105, 'Zubair', 35, 60000.00, 1);"
            },
            {
              num: 4,
              en: 'Task 4: Display only Name and Salary of all employees.',
              bn: 'টাস্ক ৪: সকল কর্মচারীর শুধুমাত্র Name এবং Salary প্রদর্শন করুন।',
              sol: "SELECT Name, Salary FROM Employees;"
            },
            {
              num: 5,
              en: 'Task 5: Find employees earning more than 35,000.',
              bn: 'টাস্ক ৫: যাদের বেতন ৩৫,০০০ এর বেশি তাদের তালিকা ফিল্টার করুন।',
              sol: "SELECT * FROM Employees WHERE Salary > 35000;"
            },
            {
              num: 6,
              en: 'Task 6: Sort employees by Salary from highest to lowest.',
              bn: 'টাস্ক ৬: বেতন অনুযায়ী বড় থেকে ছোট ক্রমে কর্মচারীদের সাজান।',
              sol: "SELECT Name, Salary FROM Employees ORDER BY Salary DESC;"
            },
            {
              num: 7,
              en: 'Task 7: Join Employees with Departments to show Name and Department_Name.',
              bn: 'টাস্ক ৭: JOIN ব্যবহার করে কর্মচারীর Name ও Department_Name প্রদর্শন করুন।',
              sol: "SELECT e.Name, e.Salary, d.Department_Name\nFROM Employees e\nINNER JOIN Departments d ON e.Department_ID = d.Department_ID;"
            },
            {
              num: 8,
              en: 'Task 8: Update Ahmed (Employee_ID = 101) salary to 50,000.',
              bn: 'টাস্ক ৮: আহমেদ (Employee_ID = 101) এর বেতন আপডেট করে ৫০,০০০ করুন।',
              sol: "UPDATE Employees SET Salary = 50000.00 WHERE Employee_ID = 101;"
            },
            {
              num: 9,
              en: 'Task 9: Delete Tariq (Employee_ID = 103) safely.',
              bn: 'টাস্ক ৯: তারিক (Employee_ID = 103) এর রেকর্ডটি নিরাপদে ডিলিট করুন।',
              sol: "DELETE FROM Employees WHERE Employee_ID = 103;"
            },
            {
              num: 10,
              en: 'Bonus: Average salary and headcount per Department using JOIN + GROUP BY.',
              bn: 'বোনাস: JOIN + GROUP BY দিয়ে প্রতিটি ডিপার্টমেন্টের গড় বেতন ও জনবল বের করুন।',
              sol: "SELECT d.Department_Name, COUNT(e.Employee_ID) AS Headcount, AVG(e.Salary) AS Avg_Salary\nFROM Departments d\nLEFT JOIN Employees e ON d.Department_ID = e.Department_ID\nGROUP BY d.Department_Name;"
            }
          ].map(taskItem => (
            <div key={taskItem.num} className="p-3.5 rounded-xl bg-[#14182d] border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans leading-snug">
                  <DualText en={taskItem.en} bn={taskItem.bn} />
                </span>
                <button
                  onClick={() => toggleSolution(taskItem.num)}
                  className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {revealedSolutions[taskItem.num]
                      ? (language === 'bn' ? 'লুকান' : 'Hide')
                      : (language === 'bn' ? 'সমাধান' : 'Solution')}
                  </span>
                </button>
              </div>
              {revealedSolutions[taskItem.num] && (
                <div className="pt-1">
                  <pre className="p-2.5 bg-black/60 rounded-lg text-[11px] font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
                    {taskItem.sol}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
