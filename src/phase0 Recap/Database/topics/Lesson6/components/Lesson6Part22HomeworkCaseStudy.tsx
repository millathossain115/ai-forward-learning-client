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
          PART 22: HOMEWORK & CASE STUDY (NO QUIZ)
         ======================================================== */}
      <section className="bg-[#0f1220] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              {language === 'bn' ? 'পার্ট ২১ • প্র্যাকটিক্যাল কেস স্টাডি' : 'Part 21 of 21'}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              <DualText
                en="Practical Case Study: CompanyDB & Employees Schema"
                bn="বাস্তবধর্মী কেস স্টাডি: CompanyDB ও Employees স্কিমা"
              />
            </h2>
          </div>
        </div>

        <DualText
          as="p"
          className="text-xs text-zinc-300 leading-relaxed font-sans"
          en="Practice writing queries for a real-world enterprise database scenario. Click Reveal Mentor Solution on each task to verify your SQL syntax and logic:"
          bn="একটি বাস্তব এন্টারপ্রাইজ ডেটাবেস পরিস্থিতির জন্য কুয়েরি লেখার অনুশীলন করুন। আপনার সিনট্যাক্স ও লজিক যাচাই করতে প্রতিটি টাস্কে মেনটর কুয়েরি দেখুন বাটনে ক্লিক করুন:"
        />

        {/* Schema Blueprint */}
        <div className="p-4 rounded-xl bg-[#14182d] border border-slate-700/60 space-y-2">
          <span className="text-xs font-mono font-bold text-amber-300 uppercase">
            <DualText en="Target Schema: Employees Table" bn="টার্গেট স্কিমা: Employees টেবিল" />
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
              <span className="text-cyan-400 font-bold block">Department</span>
              <span className="text-zinc-400">VARCHAR(50)</span>
            </div>
          </div>
        </div>

        {/* 11 Interactive Tasks with Reveal Buttons */}
        <div className="space-y-3">
          {[
            {
              num: 1,
              en: 'Task 1: Create a database named CompanyDB and switch to it.',
              bn: 'টাস্ক ১: CompanyDB নামে একটি ডেটাবেস তৈরি করুন এবং এতে সুইচ (USE) করুন।',
              sol: "CREATE DATABASE CompanyDB;\nUSE CompanyDB;"
            },
            {
              num: 2,
              en: 'Task 2: Create the Employees table with appropriate constraints.',
              bn: 'টাস্ক ২: প্রয়োজনীয় কনস্ট্রেইন্ট সহ Employees টেবিল তৈরি করুন।',
              sol: "CREATE TABLE Employees (\n    Employee_ID INT PRIMARY KEY,\n    Name VARCHAR(100) NOT NULL,\n    Age INT,\n    Salary DECIMAL(10,2) NOT NULL,\n    Department VARCHAR(50)\n);"
            },
            {
              num: 3,
              en: 'Task 3: Insert five employee records across different departments.',
              bn: 'টাস্ক ৩: বিভিন্ন ডিপার্টমেন্টে ৫ জন কর্মচারীর রেকর্ড ইনসার্ট করুন।',
              sol: "INSERT INTO Employees VALUES\n(1, 'Ahmed', 28, 45000.00, 'IT'),\n(2, 'Sara', 32, 55000.00, 'HR'),\n(3, 'Tariq', 25, 32000.00, 'IT'),\n(4, 'Mona', 29, 48000.00, 'Finance'),\n(5, 'Zubair', 35, 60000.00, 'IT');"
            },
            {
              num: 4,
              en: 'Task 4: Display all records from the Employees table.',
              bn: 'টাস্ক ৪: Employees টেবিলের সকল রেকর্ড প্রদর্শন (SELECT) করুন।',
              sol: "SELECT * FROM Employees;"
            },
            {
              num: 5,
              en: 'Task 5: Display only the Name and Salary of all employees.',
              bn: 'টাস্ক ৫: সকল কর্মচারীর শুধুমাত্র নাম (Name) এবং বেতন (Salary) প্রদর্শন করুন।',
              sol: "SELECT Name, Salary FROM Employees;"
            },
            {
              num: 6,
              en: 'Task 6: Find all employees whose salary is greater than 35,000.',
              bn: 'টাস্ক ৬: যাদের বেতন ৩৫,০০০ এর বেশি তাদের তালিকা ফিল্টার করুন।',
              sol: "SELECT * FROM Employees WHERE Salary > 35000;"
            },
            {
              num: 7,
              en: 'Task 7: Find all employees working in the IT department.',
              bn: 'টাস্ক ৭: শুধুমাত্র IT ডিপার্টমেন্টে কর্মরত কর্মচারীদের খুঁজুন।',
              sol: "SELECT * FROM Employees WHERE Department = 'IT';"
            },
            {
              num: 8,
              en: 'Task 8: Sort all employees by salary in descending order (highest first).',
              bn: 'টাস্ক ৮: কর্মচারীদের বেতন অনুযায়ী বড় থেকে ছোট (হায়াস্ট স্যালারি আগে) ক্রমে সাজান।',
              sol: "SELECT * FROM Employees ORDER BY Salary DESC;"
            },
            {
              num: 9,
              en: 'Task 9: Update the salary of Ahmed (Employee_ID = 1) to 50,000.',
              bn: 'টাস্ক ৯: আহমেদ (Employee_ID = 1) এর বেতন আপডেট করে ৫০,০০০ নির্ধারণ করুন।',
              sol: "UPDATE Employees SET Salary = 50000.00 WHERE Employee_ID = 1;"
            },
            {
              num: 10,
              en: 'Task 10: Delete the record of Tariq using his Employee_ID (3).',
              bn: 'টাস্ক ১০: তারিক (Employee_ID = 3) এর রেকর্ডটি টেবিল থেকে ডিলিট করুন।',
              sol: "DELETE FROM Employees WHERE Employee_ID = 3;"
            },
            {
              num: 11,
              en: 'Bonus Challenge: Find the average salary of employees in each department using GROUP BY.',
              bn: 'বোনাস চ্যালেঞ্জ: GROUP BY ব্যবহার করে প্রতিটি ডিপার্টমেন্টের গড় বেতন নির্ণয় করুন।',
              sol: "SELECT Department, COUNT(*) AS Headcount, AVG(Salary) AS Average_Salary\nFROM Employees\nGROUP BY Department;"
            }
          ].map(taskItem => (
            <div key={taskItem.num} className="p-4 rounded-xl bg-[#14182d] border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white font-sans">
                  <DualText en={taskItem.en} bn={taskItem.bn} />
                </span>
                <button
                  onClick={() => toggleSolution(taskItem.num)}
                  className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {revealedSolutions[taskItem.num]
                      ? (language === 'bn' ? 'সমাধান লুকান' : 'Hide Solution')
                      : (language === 'bn' ? 'মেনটর কুয়েরি দেখুন' : 'Reveal Mentor Query')}
                  </span>
                </button>
              </div>
              {revealedSolutions[taskItem.num] && (
                <div className="pt-2">
                  <pre className="p-3 bg-black/60 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto border border-emerald-900/30">
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
