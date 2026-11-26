'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Workflow, 
  Table as TableIcon, 
  LayoutGrid, 
  Layers,
  ArrowRight,
  Database,
  Key,
  Link,
  GitFork,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Code2,
  FileCode,
  Copy,
  Check,
  Split,
  Layers3
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import DualText from '@/components/DualText';

interface ERSymbolItem {
  id: string;
  category: 'entity_attr' | 'rel_constraint';
  figureEn: string;
  figureBn: string;
  notation: string;
  nameEn: string;
  nameBn: string;
  descEn: string;
  descBn: string;
  example: string;
  badgeColor: string;
  svg: React.ReactNode;
}

export default function Lesson5Part6SymbolsAndUniversityER() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'entity_attr' | 'rel_constraint'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeConversionStep, setActiveConversionStep] = useState<number>(0);
  const [showDecisionMatrix, setShowDecisionMatrix] = useState<boolean>(false);
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopySql = (sql: string, index: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sql);
      setCopiedStep(index);
      setTimeout(() => setCopiedStep(null), 2000);
    }
  };

  const symbolsData: ERSymbolItem[] = [
    // 1. Strong Entity
    {
      id: 'strong-entity',
      category: 'entity_attr',
      figureEn: 'Single Rectangle',
      figureBn: 'একক আয়তক্ষেত্র',
      notation: '[ RECTANGLE ]',
      nameEn: 'Strong Entity',
      nameBn: 'স্ট্রং এনটিটি (Strong Entity)',
      descEn: 'Independent real-world entity set with its own unique Primary Key.',
      descBn: 'স্বাধীন বাস্তব সত্তা যার নিজস্ব একক প্রাইমারি কি (PK) থাকে।',
      example: 'STUDENT, EMPLOYEE, COURSE',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <rect x="4" y="6" width="100" height="32" rx="0" fill="#0c1428" stroke="#06B6D4" strokeWidth="2.5" />
          <text x="54" y="26" textAnchor="middle" fill="#E0F2FE" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
            ENTITY
          </text>
        </svg>
      ),
    },

    // 2. Weak Entity
    {
      id: 'weak-entity',
      category: 'entity_attr',
      figureEn: 'Double Rectangle',
      figureBn: 'ডাবল আয়তক্ষেত্র',
      notation: '[[ DOUBLE BOX ]]',
      nameEn: 'Weak Entity',
      nameBn: 'উইক এনটিটি (Weak Entity)',
      descEn: 'Dependent entity without its own primary key; identified via Owner PK + Partial Key.',
      descBn: 'যার নিজস্ব কোনো প্রাইমারি কি নেই; ওনার সত্তা ও পার্শিয়াল কি দিয়ে শনাক্ত হয়।',
      example: 'DEPENDENT (Family Member)',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <rect x="3" y="4" width="102" height="36" rx="0" fill="#140f22" stroke="#F59E0B" strokeWidth="2" />
          <rect x="9" y="9" width="90" height="26" rx="0" fill="#140f22" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="54" y="26" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
            WEAK
          </text>
        </svg>
      ),
    },

    // 3. Simple Attribute
    {
      id: 'simple-attr',
      category: 'entity_attr',
      figureEn: 'Single Ellipse / Oval',
      figureBn: 'একক উপবৃত্ত (Ellipse)',
      notation: '( OVAL )',
      nameEn: 'Simple Attribute',
      nameBn: 'সাধারণ অ্যাট্রিবিউট (Attribute)',
      descEn: 'Basic atomic property or characteristic belonging to an entity.',
      descBn: 'এনটিটির সাধারণ বা অবিভাজ্য বৈশিষ্ট্য যা সরাসরি মান ধারণ করে।',
      example: 'Name, Salary, Credits, GPA',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <ellipse cx="54" cy="22" rx="49" ry="17" fill="#081829" stroke="#06B6D4" strokeWidth="2" />
          <text x="54" y="26" textAnchor="middle" fill="#E0F2FE" fontSize="12" fontWeight="600" fontFamily="sans-serif">
            Attribute
          </text>
        </svg>
      ),
    },

    // 4. Key Attribute
    {
      id: 'key-attr',
      category: 'entity_attr',
      figureEn: 'Underlined Oval',
      figureBn: 'আন্ডারলাইনযুক্ত উপবৃত্ত',
      notation: '<u>Attribute_PK</u>',
      nameEn: 'Key Attribute (Primary Key)',
      nameBn: 'প্রাইমারি কি অ্যাট্রিবিউট (PK)',
      descEn: 'Uniquely identifies each instance of an entity. Underlined in Peter Chen notation.',
      descBn: 'প্রতিটি এনটিটিকে অদ্বিতীয়ভাবে শনাক্তকারী মূল প্রাইমারি কি (আন্ডারলাইনযুক্ত)।',
      example: 'Student_ID, Emp_ID, ISBN',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <ellipse cx="54" cy="22" rx="49" ry="17" fill="#1c1606" stroke="#F59E0B" strokeWidth="2" />
          <text x="54" y="24" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="bold" fontFamily="monospace">
            Key_ID
          </text>
          <line x1="33" y1="28" x2="75" y2="28" stroke="#F59E0B" strokeWidth="2" />
        </svg>
      ),
    },

    // 5. Partial Key
    {
      id: 'partial-key',
      category: 'entity_attr',
      figureEn: 'Dashed Underlined Oval',
      figureBn: 'ড্যাশড আন্ডারলাইনযুক্ত উপবৃত্ত',
      notation: '- -Partial_Key- -',
      nameEn: 'Partial Key (Discriminator)',
      nameBn: 'পার্শিয়াল কি / ডিসক্রিমিনেটর',
      descEn: 'Discriminates weak entity instances within the same owner. Marked with dashed underline.',
      descBn: 'একই ওনার এনটিটির অধীনস্থ উইক এনটিটি সদস্যদের আলাদা করতে ব্যবহৃত হয়।',
      example: 'Dependent_Name, Item_No',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <ellipse cx="54" cy="22" rx="49" ry="17" fill="#1c1606" stroke="#F59E0B" strokeWidth="2" />
          <text x="54" y="24" textAnchor="middle" fill="#FEF08A" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
            Part_Key
          </text>
          <line x1="28" y1="28" x2="80" y2="28" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
        </svg>
      ),
    },

    // 6. Multivalued Attribute
    {
      id: 'multi-attr',
      category: 'entity_attr',
      figureEn: 'Double Oval / Ellipse',
      figureBn: 'ডাবল উপবৃত্ত (Double Oval)',
      notation: '(( DOUBLE OVAL ))',
      nameEn: 'Multivalued Attribute',
      nameBn: 'মাল্টিভ্যালুড অ্যাট্রিবিউট',
      descEn: 'Attribute that can hold multiple values simultaneously for a single entity instance.',
      descBn: 'একক সত্তার জন্য একসাথে একাধিক মান ধারণ করতে পারে এমন বৈশিষ্ট্য।',
      example: 'Phone_Number, Skills, Degrees',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <ellipse cx="54" cy="22" rx="50" ry="18" fill="#071915" stroke="#10B981" strokeWidth="1.8" />
          <ellipse cx="54" cy="22" rx="43" ry="13" fill="#071915" stroke="#10B981" strokeWidth="1.4" />
          <text x="54" y="26" textAnchor="middle" fill="#A7F3D0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            Phones
          </text>
        </svg>
      ),
    },

    // 7. Derived Attribute
    {
      id: 'derived-attr',
      category: 'entity_attr',
      figureEn: 'Dashed Oval / Ellipse',
      figureBn: 'ড্যাশড উপবৃত্ত (Dashed Oval)',
      notation: '- - DASHED - -',
      nameEn: 'Derived Attribute',
      nameBn: 'ডিরাইভড অ্যাট্রিবিউট',
      descEn: 'Dynamically calculated from another attribute (not stored statically in disk).',
      descBn: 'অন্য অ্যাট্রিবিউট থেকে গণনাকৃত মান (যেমন: DOB থেকে Age)।',
      example: 'Age (from DOB), Total_Amount',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <ellipse cx="54" cy="22" rx="49" ry="17" fill="#1b1506" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,4" />
          <text x="54" y="26" textAnchor="middle" fill="#FEF08A" fontSize="11.5" fontWeight="600" fontStyle="italic" fontFamily="sans-serif">
            Age
          </text>
        </svg>
      ),
    },

    // 8. Relationship
    {
      id: 'relationship',
      category: 'rel_constraint',
      figureEn: 'Single Diamond',
      figureBn: 'একক ডায়মন্ড (Diamond)',
      notation: '< DIAMOND >',
      nameEn: 'Relationship Set',
      nameBn: 'রিলেশনশিপ (Relationship)',
      descEn: 'Meaningful association connecting two or more distinct entity types.',
      descBn: 'দুই বা ততোধিক এনটিটি সেটের মধ্যকার বাস্তব সংযোগ বা সম্পর্ক।',
      example: 'Student <ENROLLS> Course',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <polygon points="54,3 102,22 54,41 6,22" fill="#160b29" stroke="#A855F7" strokeWidth="2" />
          <text x="54" y="26" textAnchor="middle" fill="#E9D5FF" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
            REL
          </text>
        </svg>
      ),
    },

    // 9. Identifying Relationship
    {
      id: 'identifying-rel',
      category: 'rel_constraint',
      figureEn: 'Double Diamond',
      figureBn: 'ডাবল ডায়মন্ড (Double Diamond)',
      notation: '<< DOUBLE DIAMOND >>',
      nameEn: 'Identifying Relationship',
      nameBn: 'আইডেন্টিফাইং রিলেশনশিপ',
      descEn: 'Connects a weak entity to its identifying owner entity.',
      descBn: 'উইক এনটিটিকে তার ওনার বা শক্তিশালী এনটিটির সাথে সম্পর্কযুক্ত করে।',
      example: 'Employee <<DEPENDS>> Dependent',
      badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <polygon points="54,3 103,22 54,41 5,22" fill="#220b1c" stroke="#EC4899" strokeWidth="1.8" />
          <polygon points="54,8 94,22 54,36 14,22" fill="#220b1c" stroke="#EC4899" strokeWidth="1.5" />
          <text x="54" y="25" textAnchor="middle" fill="#FBCFE8" fontSize="10" fontWeight="bold" fontFamily="monospace">
            ID-REL
          </text>
        </svg>
      ),
    },

    // 10. Partial Participation
    {
      id: 'partial-part',
      category: 'rel_constraint',
      figureEn: 'Single Solid Line',
      figureBn: 'একক সরলরেখা (────)',
      notation: '──── SINGLE LINE',
      nameEn: 'Partial Participation',
      nameBn: 'পার্শিয়াল পার্টিসিপেশন (ঐচ্ছিক)',
      descEn: 'Participation is optional (Min cardinality = 0). Maps to NULL-permitted FK in SQL.',
      descBn: 'অংশগ্রহণ ঐচ্ছিক (সর্বনিম্ন ০)। ডেটাবেস কলামে NULL মান গ্রহণযোগ্য।',
      example: 'Employee ──── <MANAGES> Dept',
      badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <line x1="8" y1="24" x2="100" y2="24" stroke="#818CF8" strokeWidth="3" />
          <text x="54" y="15" textAnchor="middle" fill="#C7D2FE" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            PARTIAL (Min=0)
          </text>
        </svg>
      ),
    },

    // 11. Total Participation
    {
      id: 'total-part',
      category: 'rel_constraint',
      figureEn: 'Double Solid Line',
      figureBn: 'ডাবল সমান্তরাল রেখা (════)',
      notation: '════ DOUBLE LINE',
      nameEn: 'Total Participation (Mandatory)',
      nameBn: 'টোটাল পার্টিসিপেশন (বাধ্যতামূলক)',
      descEn: 'Every entity instance MUST participate (Min cardinality >= 1). Maps to NOT NULL in SQL.',
      descBn: 'প্রতিটি সত্তার অংশগ্রহণ বাধ্যতামূলক (সর্বনিম্ন ১)। কলামে NOT NULL প্রযোজ্য।',
      example: 'Course ════ <OFFERED_BY> Dept',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <line x1="8" y1="20" x2="100" y2="20" stroke="#10B981" strokeWidth="2.5" />
          <line x1="8" y1="28" x2="100" y2="28" stroke="#10B981" strokeWidth="2.5" />
          <text x="54" y="14" textAnchor="middle" fill="#6EE7B7" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            TOTAL (Min≥1)
          </text>
        </svg>
      ),
    },

    // 12. Cardinality Ratios
    {
      id: 'cardinality-ratios',
      category: 'rel_constraint',
      figureEn: 'Ratio Notations',
      figureBn: 'অনুপাত চিহ্ন (১:১, ১:N, M:N)',
      notation: '1:1 • 1:N • M:N',
      nameEn: 'Cardinality Ratios',
      nameBn: 'কার্ডিনালিটি রেশিওসমূহ',
      descEn: 'Specifies the maximum number of entity instances related to another (1:1, 1:N, M:N).',
      descBn: 'সম্পর্কে সর্বোচ্চ (Maximum) কতগুলো সত্তা যুক্ত হতে পারে তার সংখ্যা নির্দেশ করে।',
      example: '1:1, 1:N, M:N Mapping Ratios',
      badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-950/60',
      svg: (
        <svg viewBox="0 0 108 44" className="w-full h-full max-h-11">
          <rect x="6" y="5" width="96" height="34" rx="8" fill="#081b2d" stroke="#38BDF8" strokeWidth="1.8" />
          <text x="54" y="21" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="bold" fontFamily="monospace">
            1:1 • 1:N
          </text>
          <text x="54" y="33" textAnchor="middle" fill="#F472B6" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            M:N RATIO
          </text>
        </svg>
      ),
    },
  ];

  const filteredSymbols = symbolsData.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const conversionSteps = [
    {
      id: 'step-1-strong',
      stepNumber: '01',
      badgeEn: 'Step 1 • Strong Entity Mapping',
      badgeBn: 'ধাপ ১ • স্ট্রং এনটিটি ম্যাপিং',
      titleEn: 'Strong Entity to Independent Relational Table',
      titleBn: 'স্ট্রং এনটিটি থেকে সরাসরি স্বতন্ত্র টেবিল তৈরি',
      ruleEn: 'Each strong entity maps directly to an independent database table. Its underlined Key Attribute becomes the table\'s Primary Key (PK). Simple attributes become individual columns.',
      ruleBn: 'প্রতিটি স্ট্রং এনটিটি সরাসরি একটি স্বাধীন রিলেশনাল টেবিলে রূপান্তরিত হয়। এর Key Attribute (আন্ডারলাইনযুক্ত) টেবিলের Primary Key (PK) হয় এবং সাধারণ অ্যাট্রিবিউটগুলো সাধারণ কলাম হয়।',
      erSourceTitleEn: 'Input ER Component:',
      erSourceTitleBn: 'ইনপুট ইআর উপাদান:',
      erSymbolText: '[ STUDENT (StudentID, Full_Name, Email, Date_of_Birth) ]',
      erTag: 'Strong Entity Set (Single Rectangle)',
      erTagColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
      flowArrowEn: 'Direct Entity-to-Table Mapping (No Foreign Key Needed)',
      flowArrowBn: 'সরাসরি এনটিটি ➔ টেবিল রূপান্তর (কোনো Foreign Key লাগে না)',
      tableName: 'students',
      tableCategoryEn: 'Independent Entity Table',
      tableCategoryBn: 'স্বাধীন এনটিটি টেবিল',
      primaryKeyText: 'student_id [PRIMARY KEY]',
      foreignKeyText: 'None (Self-contained)',
      columns: [
        { name: 'student_id', type: 'INT', isPk: true, isFk: false, note: 'PK from Underlined Key Attribute' },
        { name: 'full_name', type: 'VARCHAR(100)', isPk: false, isFk: false, note: 'Simple Attribute' },
        { name: 'email', type: 'VARCHAR(100)', isPk: false, isFk: false, note: 'UNIQUE constraint' },
        { name: 'date_of_birth', type: 'DATE', isPk: false, isFk: false, note: 'Simple Attribute' },
      ],
      sqlCode: `-- Step 1: Mapping Strong Entity to Independent Relational Table
CREATE TABLE students (
    student_id INT PRIMARY KEY,              -- Underlined Key Attribute becomes PK
    full_name VARCHAR(100) NOT NULL,         -- Simple Attribute
    email VARCHAR(100) UNIQUE NOT NULL,      -- Candidate Key / Simple Attribute
    date_of_birth DATE                       -- Simple Attribute
);`,
      whyLogicEn: 'Because a strong entity has its own independent Primary Key, it does not depend on any parent table. It can be created, populated, and queried independently.',
      whyLogicBn: 'যেহেতু স্ট্রং এনটিটির নিজস্ব একক প্রাইমারি কি (PK) আছে, এটি অন্য কোনো টেবিলের ওপর নির্ভরশীল নয়। এটি সরাসরি একটি স্বয়ংসম্পূর্ণ ও স্বাধীন রিলেশনে পরিণত হয়।',
    },
    {
      id: 'step-2-one-to-many',
      stepNumber: '02',
      badgeEn: 'Step 2 • 1:N Relationship Mapping',
      badgeBn: 'ধাপ ২ • ১:N রিলেশনশিপ ম্যাপিং',
      titleEn: '1:N (One-to-Many): Parent PK Posted as Foreign Key into Child Table',
      titleBn: '১:N রিলেশনশিপ: প্যারেন্টের PK চাইল্ড (Many) টেবিলে Foreign Key হিসেবে যোগ',
      ruleEn: 'Do NOT create a new table! Take the Primary Key from the "1" side (Parent Entity) and insert it as a Foreign Key (FK) into the "N" side (Child / Many Table).',
      ruleBn: 'কোনো নতুন টেবিল তৈরির প্রয়োজন নেই! "১" দিকের প্যারেন্ট টেবিলের Primary Key-কে "N" (Many) দিকের চাইল্ড টেবিলে Foreign Key (FK) হিসেবে যুক্ত করতে হয়।',
      erSourceTitleEn: 'Input ER Component:',
      erSourceTitleBn: 'ইনপুট ইআর উপাদান:',
      erSymbolText: '[ DEPARTMENT ] (1) ──── <OFFERS> ──── (N) [ COURSE ]',
      erTag: '1:N Cardinality Ratio (Department to Courses)',
      erTagColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/40',
      flowArrowEn: 'Parent PK (dept_id) propagates to Child table (courses) as FK',
      flowArrowBn: 'প্যারেন্ট PK (dept_id) চাইল্ড টেবিল (courses)-এ Foreign Key হয়ে যুক্ত হয়',
      tableName: 'courses',
      tableCategoryEn: 'Child Table with Foreign Key',
      tableCategoryBn: 'Foreign Key যুক্ত চাইল্ড টেবিল',
      primaryKeyText: 'course_id [PRIMARY KEY]',
      foreignKeyText: 'dept_id [FK ➔ departments.dept_id]',
      columns: [
        { name: 'course_id', type: 'INT', isPk: true, isFk: false, note: 'PK of Course' },
        { name: 'course_title', type: 'VARCHAR(100)', isPk: false, isFk: false, note: 'Simple Attribute' },
        { name: 'credits', type: 'INT', isPk: false, isFk: false, note: 'Default 3' },
        { name: 'dept_id', type: 'INT', isPk: false, isFk: true, note: 'FK from 1-side (departments.dept_id)' },
      ],
      sqlCode: `-- Step 2: 1:N Relationship Mapping (Parent PK posted into Child Table)
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_title VARCHAR(100) NOT NULL,
    credits INT DEFAULT 3,
    dept_id INT NOT NULL,                    -- Foreign Key migrated from '1' side
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);`,
      whyLogicEn: 'If you attempted to place course_id inside the DEPARTMENT table instead, a single department offering 10 courses would require storing 10 values in one cell (violating 1NF) or duplicating the department row 10 times. Putting dept_id in the child courses table guarantees that each course row holds exactly ONE department ID!',
      whyLogicBn: 'যদি আমরা উল্টোটা করতাম (Course_ID কে Department টেবিলে নিতাম), তবে ১টি ডিপার্টমেন্টে ১০টি কোর্স থাকায় একই সেলে ১০টি মান রাখতে হতো যা 1NF লঙ্ঘন করত। কিন্তু Courses টেবিলে dept_id রাখলে প্রতিটি কোর্সের রো-তে ঠিক ১টিই ডিপার্টমেন্ট আইডি থাকে—কোনো ডেটা ডুপ্লিকেশন হয় না!',
    },
    {
      id: 'step-3-many-to-many',
      stepNumber: '03',
      badgeEn: 'Step 3 • M:N Relationship Mapping',
      badgeBn: 'ধাপ ৩ • M:N রিলেশনশিপ ম্যাপিং',
      titleEn: 'M:N (Many-to-Many): Mandatory Creation of New Junction Table',
      titleBn: 'M:N রিলেশনশিপ: বাধ্যতামূলকভাবে নতুন জাংশন/সংযোগকারী টেবিল তৈরি',
      ruleEn: 'M:N relationships CANNOT be mapped into existing tables without violating relational integrity. You MUST create a brand-new Junction (Bridge / Associative) Table containing the Primary Keys of both participating entities as Foreign Keys.',
      ruleBn: 'M:N সম্পর্ককে সরাসরি বিদ্যমান টেবিলে রাখা অসম্ভব (এতে ডেটা অ্যানোমালি ও 1NF নিয়ম ভঙ্গ হয়)। তাই বাধ্যতামূলকভাবে একটি নতুন জাংশন বা ব্রিজ টেবিল (Junction Table) তৈরি করতে হয়!',
      erSourceTitleEn: 'Input ER Component:',
      erSourceTitleBn: 'ইনপুট ইআর উপাদান:',
      erSymbolText: '[ STUDENT ] (M) ════ <ENROLLS> ════ (N) [ COURSE ]',
      erTag: 'M:N Cardinality Ratio with Relationship Attributes',
      erTagColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
      flowArrowEn: 'Both PKs become FKs + Combined as Composite Primary Key',
      flowArrowBn: 'উভয় PK ফরেন কি হিসেবে এসে গঠিত হয় Composite Primary Key',
      tableName: 'enrollments (Junction Table)',
      tableCategoryEn: 'Junction / Associative Table',
      tableCategoryBn: 'জাংশন / অ্যাসোসিয়েটিভ টেবিল',
      primaryKeyText: '(student_id, course_id) [COMPOSITE PK]',
      foreignKeyText: 'student_id [FK ➔ students], course_id [FK ➔ courses]',
      columns: [
        { name: 'student_id', type: 'INT', isPk: true, isFk: true, note: 'FK ➔ students(student_id)' },
        { name: 'course_id', type: 'INT', isPk: true, isFk: true, note: 'FK ➔ courses(course_id)' },
        { name: 'enrollment_date', type: 'DATE', isPk: false, isFk: false, note: 'Relationship descriptive attribute' },
        { name: 'grade', type: 'VARCHAR(5)', isPk: false, isFk: false, note: 'Relationship descriptive attribute' },
      ],
      sqlCode: `-- Step 3: M:N Relationship transformed into a Junction Table
CREATE TABLE enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    grade VARCHAR(5),
    PRIMARY KEY (student_id, course_id),     -- Composite Primary Key
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
);`,
      whyLogicEn: 'A student can take 5 courses, and a course can have 50 students. Creating a separate junction table decomposes the complex M:N relationship into two clean 1:N relationships: Student(1) ➔ Enrollments(N) and Course(1) ➔ Enrollments(N). Any attributes of the relationship (like grade or enroll_date) are placed here.',
      whyLogicBn: 'একজন শিক্ষার্থী ৫টি কোর্সে ভর্তি হতে পারে, আবার ১টি কোর্সে ৫০ জন শিক্ষার্থী থাকতে পারে। নতুন জাংশন টেবিল তৈরির ফলে জটিল M:N সম্পর্কটি দুটি স্বাভাবিক ১:N সম্পর্কে বিভক্ত হয়ে যায়: Student(1) ➔ Enrollments(N) এবং Course(1) ➔ Enrollments(N)। সম্পর্কের নিজস্ব বৈশিষ্ট্যগুলো (যেমন: গ্রেড, এনরোল তারিখ) এই টেবিলে জমা হয়।',
    },
    {
      id: 'step-4-weak-and-multi',
      stepNumber: '04',
      badgeEn: 'Step 4 • Weak Entity & Multivalued Attributes',
      badgeBn: 'ধাপ ৪ • উইক এনটিটি ও মাল্টিভ্যালুড অ্যাট্রিবিউট',
      titleEn: 'Weak Entities & Multivalued Attributes: Dependent Child Tables',
      titleBn: 'উইক এনটিটি ও মাল্টিভ্যালুড: ওনার-নির্ভরশীল টেবিল ও কম্পোজিট কি',
      ruleEn: 'Weak entities become child tables inheriting the Owner\'s PK as FK; Composite PK = (Owner PK + Partial Key). Multivalued attributes also become separate tables containing parent PK (FK) + attribute value.',
      ruleBn: 'উইক এনটিটি একটি চাইল্ড টেবিলে পরিণত হয় যা ওনারের PK-কে FK হিসেবে গ্রহণ করে; Composite PK = (Owner PK + Partial Key)। মাল্টিভ্যালুড অ্যাট্রিবিউটের জন্যও আলাদা টেবিল তৈরি হয় যাতে 1NF বজায় থাকে।',
      erSourceTitleEn: 'Input ER Component:',
      erSourceTitleBn: 'ইনপুট ইআর উপাদান:',
      erSymbolText: '[[ DEPENDENT ]] (Owner: EMPLOYEE) & (( Phone_Numbers ))',
      erTag: 'Weak Entity (Double Box) & Multivalued (Double Oval)',
      erTagColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40',
      flowArrowEn: 'Owner PK + Partial Key = Composite PK (with ON DELETE CASCADE)',
      flowArrowBn: 'ওনার PK + পার্শিয়াল কি = Composite PK (সাথে ON DELETE CASCADE)',
      tableName: 'dependents & student_phones',
      tableCategoryEn: 'Dependent Composite Tables',
      tableCategoryBn: 'কম্পোজিট কি বিশিষ্ট নির্ভরশীল টেবিল',
      primaryKeyText: '(emp_id, dependent_name) & (student_id, phone_number)',
      foreignKeyText: 'emp_id [FK ➔ employees], student_id [FK ➔ students]',
      columns: [
        { name: 'emp_id', type: 'INT', isPk: true, isFk: true, note: 'Owner Entity Primary Key as FK' },
        { name: 'dependent_name', type: 'VARCHAR(50)', isPk: true, isFk: false, note: 'Partial Key (Dashed Underline)' },
        { name: 'relationship', type: 'VARCHAR(30)', isPk: false, isFk: false, note: 'e.g. Spouse, Child' },
        { name: 'birth_date', type: 'DATE', isPk: false, isFk: false, note: 'Attribute' },
      ],
      sqlCode: `-- Step 4A: Weak Entity Mapping (Owner PK + Partial Key = Composite PK)
CREATE TABLE dependents (
    emp_id INT NOT NULL,                     -- Owner entity PK
    dependent_name VARCHAR(50) NOT NULL,     -- Partial Key (Discriminator)
    relationship VARCHAR(30) NOT NULL,
    birth_date DATE,
    PRIMARY KEY (emp_id, dependent_name),    -- Composite Primary Key
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
        ON DELETE CASCADE                    -- If employee is deleted, dependents are deleted
);

-- Step 4B: Multivalued Attribute Mapping (New Child Table for 1NF)
CREATE TABLE student_phones (
    student_id INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    PRIMARY KEY (student_id, phone_number),  -- Composite PK
    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);`,
      whyLogicEn: 'Weak entities cannot exist without their owner entity, so ON DELETE CASCADE ensures automatic deletion when the parent employee record is removed. For multivalued attributes, creating a separate table prevents CSV-style multi-value strings in a single column, guaranteeing 1st Normal Form (1NF).',
      whyLogicBn: 'যেহেতু উইক এনটিটি ওনার ছাড়া টিকতে পারে না, তাই ON DELETE CASCADE নিশ্চিত করে যে এমপ্লয়ি মুছে গেলে তার পরিবারের তথ্যও স্বয়ংক্রিয়ভাবে মুছে যাবে। আর মাল্টিভ্যালুড অ্যাট্রিবিউটের জন্য আলাদা টেবিল রাখলে কলামে কমা দিয়ে একাধিক মান রাখার প্রয়োজন হয় না এবং 1NF শতভাগ নিশ্চিত হয়।',
    },
  ];

  const mappingDecisionMatrix = [
    {
      erElementEn: 'Strong Entity',
      erElementBn: 'স্ট্রং এনটিটি [ RECTANGLE ]',
      relationalRuleEn: 'Direct Independent Table',
      relationalRuleBn: 'সরাসরি একটি স্বতন্ত্র টেবিল',
      pkMechanismEn: 'Entity Key ➔ Primary Key (PK)',
      pkMechanismBn: 'এনটিটির কী ➔ Primary Key (PK)',
      fkMechanismEn: 'None (Standalone)',
      fkMechanismBn: 'কোনো ফরেন কি লাগে না',
      example: 'students (student_id [PK], ...)',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/50',
    },
    {
      erElementEn: '1:1 Relationship',
      erElementBn: '১:১ সম্পর্ক (1:1)',
      relationalRuleEn: 'Insert Foreign Key in ONE table',
      relationalRuleBn: 'যেকোনো এক পাশের টেবিলে FK যোগ + UNIQUE',
      pkMechanismEn: 'Existing Table PKs',
      pkMechanismBn: 'উভয় টেবিলের নিজস্ব PK থাকে',
      fkMechanismEn: 'Place FK on Total Participation side + UNIQUE',
      fkMechanismBn: 'টোটাল পার্টিসিপেশন প্রান্তে FK + UNIQUE কনস্ট্রেইন্ট',
      example: 'departments (head_emp_id [FK, UNIQUE])',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/50',
    },
    {
      erElementEn: '1:N Relationship',
      erElementBn: '১:N সম্পর্ক (1:N)',
      relationalRuleEn: 'Insert Foreign Key on "N" (Many) side',
      relationalRuleBn: '"N" বা Many পাশের চাইল্ড টেবিলে FK যোগ',
      pkMechanismEn: 'Existing Table PKs',
      pkMechanismBn: 'উভয় টেবিলের নিজস্ব PK অপরিবর্তিত থাকে',
      fkMechanismEn: 'Parent ("1" side) PK becomes FK in Child ("N" side)',
      fkMechanismBn: '"১" পাশের PK-টি "N" পাশের টেবিলে FK হিসেবে যোগ হয়',
      example: 'courses (dept_id [FK ➔ departments])',
      badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/50',
    },
    {
      erElementEn: 'M:N Relationship',
      erElementBn: 'M:N সম্পর্ক (M:N)',
      relationalRuleEn: 'CREATE NEW JUNCTION TABLE',
      relationalRuleBn: 'বাধ্যতামূলকভাবে নতুন জাংশন টেবিল তৈরি',
      pkMechanismEn: 'Composite PK = (FK1 + FK2)',
      pkMechanismBn: 'উভয় FK মিলে গঠিত Composite PK',
      fkMechanismEn: 'Both participating tables PKs become FKs',
      fkMechanismBn: 'উভয় মূল টেবিলের PK এই টেবিলে FK হয়',
      example: 'enrollments (student_id [FK], course_id [FK])',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/50',
    },
    {
      erElementEn: 'Weak Entity',
      erElementBn: 'উইক এনটিটি [[ DOUBLE BOX ]]',
      relationalRuleEn: 'Create Dependent Child Table',
      relationalRuleBn: 'ওনার-নির্ভরশীল চাইল্ড টেবিল তৈরি',
      pkMechanismEn: 'Composite PK = (Owner PK + Partial Key)',
      pkMechanismBn: 'Composite PK = (Owner PK + Partial Key)',
      fkMechanismEn: 'Owner PK becomes FK (ON DELETE CASCADE)',
      fkMechanismBn: 'ওনার PK এখানে Foreign Key (ON DELETE CASCADE)',
      example: 'dependents (emp_id [FK], dep_name [PK])',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/50',
    },
    {
      erElementEn: 'Multivalued Attribute',
      erElementBn: 'মাল্টিভ্যালুড অ্যাট্রিবিউট (( DOUBLE OVAL ))',
      relationalRuleEn: 'Create Separate Table (1NF enforcement)',
      relationalRuleBn: 'আলাদা টেবিল তৈরি (1NF বজায় রাখার জন্য)',
      pkMechanismEn: 'Composite PK = (Parent PK + Value)',
      pkMechanismBn: 'Composite PK = (Parent PK + Value)',
      fkMechanismEn: 'Parent PK becomes FK',
      fkMechanismBn: 'প্যারেন্ট টেবিলের PK এখানে Foreign Key',
      example: 'student_phones (student_id [FK], phone)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/50',
    },
  ];

  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Workflow className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase tracking-wider">
            {language === 'bn'
              ? 'পার্ট ৬ • ইআর প্রতীক ও রিলেশনাল রূপান্তর'
              : 'Part 6 • ER Symbols & Relational Table Conversion'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="6. ER Diagram Symbols Cheat Sheet & Relational Table Conversion"
              bn="৬. ইআর প্রতীক চিটশিট ও রিলেশনাল টেবিলে রূপান্তর পদ্ধতি"
            />
          </h2>
        </div>
      </div>

      {/* ========================================================
          6.1 ER DIAGRAM SYMBOLS CHEAT SHEET (UNTOUCHED)
          ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300 font-mono">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {language === 'bn'
                ? '৬.১ পিটার চেন জ্যামিতিক প্রতীকসমূহ (১২টি স্ট্যান্ডার্ড প্রতীক চিটশিট)'
                : '6.1 Peter Chen Notation Geometric Symbols (Cheat Sheet)'}
            </span>
          </div>

          {/* View Mode Toggle: Cards vs Table */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#090c18] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কার্ড ভিউ' : 'Cards View'}</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ম্যাট্রিক্স টেবিল' : 'Cheat Sheet Table'}</span>
            </button>
          </div>
        </div>

        <div className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
          <DualText
            en="Clear, high-contrast Peter Chen notation geometric figures for quick exam memorization. Every symbol is rendered with crisp vector accuracy and detailed relational properties:"
            bn="পরীক্ষার জন্য অত্যন্ত গুরুত্বপূর্ণ পিটার চেন নোটেশনের ১২টি জ্যামিতিক প্রতীক—উচ্চ রেজোলিউশন ও স্পষ্ট ভেক্টরে সাজানো, যাতে কোনো লেখা ছোট বা অস্পষ্ট না থাকে:"
          />
        </div>

        {/* Category Filters Ribbon */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 font-bold shadow-md shadow-cyan-950/50'
                : 'bg-[#0a0d18] text-zinc-400 border-slate-800 hover:text-zinc-200 hover:border-slate-700'
            }`}
          >
            {language === 'bn' ? 'সবগুলো প্রতীক (১২)' : 'All 12 Symbols'}
          </button>
          <button
            onClick={() => setActiveCategory('entity_attr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
              activeCategory === 'entity_attr'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 font-bold shadow-md shadow-amber-950/50'
                : 'bg-[#0a0d18] text-zinc-400 border-slate-800 hover:text-zinc-200 hover:border-slate-700'
            }`}
          >
            {language === 'bn' ? 'এনটিটি ও অ্যাট্রিবিউট (৭)' : 'Entities & Attributes (7)'}
          </button>
          <button
            onClick={() => setActiveCategory('rel_constraint')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
              activeCategory === 'rel_constraint'
                ? 'bg-purple-950/80 text-purple-300 border-purple-500/60 font-bold shadow-md shadow-purple-950/50'
                : 'bg-[#0a0d18] text-zinc-400 border-slate-800 hover:text-zinc-200 hover:border-slate-700'
            }`}
          >
            {language === 'bn' ? 'রিলেশনশিপ ও কনস্ট্রেইন্টস (৫)' : 'Relationships & Constraints (5)'}
          </button>
        </div>

        {/* VIEW MODE A: HIGH-LEGIBILITY RESPONSIVE CARDS */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 pt-1">
            {filteredSymbols.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#0a0d1a] border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg group"
              >
                <div className="w-full sm:w-32 h-16 rounded-xl bg-[#050813] border border-slate-800/80 group-hover:border-slate-700 transition-colors flex items-center justify-center p-1.5 shrink-0 shadow-inner">
                  {item.svg}
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <span className="font-mono text-xs font-bold text-white tracking-wide">
                      {language === 'bn' ? item.nameBn : item.nameEn}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${item.badgeColor} font-bold shrink-0`}>
                      {language === 'bn' ? item.figureBn : item.figureEn}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug font-sans">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] font-mono">
                    <span className="text-zinc-500 font-semibold">{language === 'bn' ? 'উদাহরণ:' : 'Ex:'}</span>
                    <span className="text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                      {item.example}
                    </span>
                    <span className="text-zinc-500 font-normal ml-auto">
                      {item.notation}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE B: STRUCTURED CHEAT SHEET TABLE */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14] shadow-xl">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px] font-mono">
                  <th className="py-3 px-4 w-36">{language === 'bn' ? 'জ্যামিতিক আকার (Figure)' : 'Geometric Figure'}</th>
                  <th className="py-3 px-4 w-36 text-center">{language === 'bn' ? 'প্রতীক চিত্র (Symbol)' : 'Drawn Symbol'}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'অর্থ ও তাৎপর্য (Represents)' : 'Concept & Purpose'}</th>
                  <th className="py-3 px-4 w-44">{language === 'bn' ? 'বাস্তব উদাহরণ (Real Example)' : 'Example & Notation'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs">
                {filteredSymbols.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      idx % 2 === 0 ? 'bg-[#0a0d18]' : 'bg-[#070912]'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white font-mono text-[11.5px]">
                        {language === 'bn' ? item.figureBn : item.figureEn}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                        {item.notation}
                      </div>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="w-28 h-12 mx-auto rounded-lg bg-[#050813] border border-slate-800 p-1 flex items-center justify-center">
                        {item.svg}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white mb-0.5">
                        {language === 'bn' ? item.nameBn : item.nameEn}
                      </div>
                      <div className="text-zinc-300 text-[11.5px] leading-relaxed">
                        {language === 'bn' ? item.descBn : item.descEn}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span className="text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50 block w-fit mb-1 font-semibold">
                        {item.example}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================
          6.2 HOW TO CONVERT AN ER DIAGRAM INTO DATABASE TABLES
          ======================================================== */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        {/* Section 6.2 Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
                {language === 'bn' ? 'কনভারশন আর্কিটেকচার' : 'Relational Mapping Flow'}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                {language === 'bn' ? '৪টি মূল রূপান্তর ধাপ' : '4 Canonical Rules'}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn'
                  ? '৬.২ কীভাবে ইআর ডায়াগ্রামকে ডেটাবেস টেবিলে রূপান্তর করবেন?'
                  : '6.2 How to Convert an ER Diagram into Database Tables'}
              </span>
            </h3>
          </div>

          {/* Toggle between Step Pipeline & Decision Matrix */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#090c18] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setShowDecisionMatrix(false)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                !showDecisionMatrix
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'স্টেপ-বাই-স্টেপ ফ্লো' : 'Pipeline Flow'}</span>
            </button>
            <button
              onClick={() => setShowDecisionMatrix(true)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                showDecisionMatrix
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'এক নজরে ম্যাট্রিক্স' : 'Decision Matrix'}</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: COMPACT STEP-BY-STEP VISUAL CONVERSION PIPELINE */}
        {!showDecisionMatrix && (
          <div className="space-y-3.5">
            {/* Horizontal Step Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {conversionSteps.map((step, idx) => {
                const isActive = activeConversionStep === idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveConversionStep(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-500/60 shadow-md'
                        : 'bg-[#0a0d18] border-slate-800/80 hover:border-slate-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800/60 text-zinc-500'
                      }`}>
                        {step.stepNumber}
                      </span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className={`text-xs font-bold font-mono truncate ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                      {language === 'bn' ? step.badgeBn : step.badgeEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Compact Showcase */}
            {(() => {
              const currentStep = conversionSteps[activeConversionStep];
              return (
                <div className="p-4 rounded-2xl bg-[#090c1a] border border-slate-800 space-y-3.5 shadow-xl">
                  {/* Compact Header + Rule Banner */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-slate-900 border border-emerald-500/30 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-emerald-400 shrink-0" />
                        {language === 'bn' ? currentStep.titleBn : currentStep.titleEn}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold">
                        {language === 'bn' ? `ধাপ ${activeConversionStep + 1} / ৪` : `Step ${activeConversionStep + 1} / 4`}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 font-sans leading-snug">
                      <strong className="text-emerald-300 font-mono">
                        {language === 'bn' ? 'নিয়ম: ' : 'Rule: '}
                      </strong>
                      {language === 'bn' ? currentStep.ruleBn : currentStep.ruleEn}{' '}
                      <span className="text-zinc-400">
                        ({language === 'bn' ? currentStep.whyLogicBn : currentStep.whyLogicEn})
                      </span>
                    </p>
                  </div>

                  {/* 3-Stage Visual Flow: Chen ER SVG ➔ Mapping Arrow ➔ Table + SQL */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
                    {/* Stage 1: Authentic Chen ER SVG Diagram */}
                    <div className="lg:col-span-5 p-3 rounded-xl bg-[#0c1020] border border-cyan-900/40 flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">
                          {language === 'bn' ? currentStep.erSourceTitleBn : currentStep.erSourceTitleEn}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${currentStep.erTagColor}`}>
                          {currentStep.erTag}
                        </span>
                      </div>

                      <div className="rounded-lg bg-[#060914] border border-slate-800 p-2 flex items-center justify-center min-h-[135px]">
                        {activeConversionStep === 0 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="160" y1="75" x2="65" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <line x1="160" y1="75" x2="160" y2="26" stroke="#475569" strokeWidth="1.5" />
                            <line x1="160" y1="75" x2="255" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <ellipse cx="65" cy="26" rx="44" ry="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="65" y="30" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace" textDecoration="underline">student_id</text>
                            <ellipse cx="160" cy="22" rx="34" ry="15" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="160" y="26" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">name</text>
                            <ellipse cx="255" cy="26" rx="36" ry="15" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="255" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace">email</text>
                            <rect x="105" y="72" width="110" height="36" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="160" y="94" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold" fontFamily="monospace">STUDENT</text>
                          </svg>
                        )}
                        {activeConversionStep === 1 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="95" y1="65" x2="132" y2="65" stroke="#64748b" strokeWidth="2" />
                            <line x1="188" y1="65" x2="225" y2="65" stroke="#64748b" strokeWidth="2" />
                            <text x="110" y="55" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">1</text>
                            <text x="203" y="55" fill="#818cf8" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
                            <rect x="15" y="45" width="80" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="55" y="69" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">DEPT</text>
                            <polygon points="160,35 190,65 160,95 130,65" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                            <text x="160" y="68" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold" fontFamily="monospace">Offers</text>
                            <rect x="225" y="45" width="80" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="265" y="69" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">COURSE</text>
                          </svg>
                        )}
                        {activeConversionStep === 2 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="90" y1="75" x2="128" y2="75" stroke="#64748b" strokeWidth="2" />
                            <line x1="192" y1="75" x2="230" y2="75" stroke="#64748b" strokeWidth="2" />
                            <line x1="160" y1="45" x2="160" y2="28" stroke="#475569" strokeWidth="1.5" />
                            <ellipse cx="160" cy="20" rx="34" ry="13" fill="#0f172a" stroke="#f472b6" strokeWidth="1.5" />
                            <text x="160" y="24" textAnchor="middle" fill="#f9a8d4" fontSize="9" fontFamily="monospace">grade</text>
                            <text x="105" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">M</text>
                            <text x="208" y="65" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
                            <rect x="12" y="55" width="78" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="51" y="79" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">STUDENT</text>
                            <polygon points="160,45 194,75 160,105 126,75" fill="#2e1065" stroke="#c084fc" strokeWidth="2" />
                            <text x="160" y="78" textAnchor="middle" fill="#e9d5ff" fontSize="9" fontWeight="bold" fontFamily="monospace">Enrolls</text>
                            <rect x="230" y="55" width="78" height="40" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="269" y="79" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="bold" fontFamily="monospace">COURSE</text>
                          </svg>
                        )}
                        {activeConversionStep === 3 && (
                          <svg viewBox="0 0 320 130" className="w-full h-32">
                            <line x1="160" y1="75" x2="72" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <line x1="160" y1="75" x2="248" y2="30" stroke="#475569" strokeWidth="1.5" />
                            <ellipse cx="72" cy="26" rx="46" ry="15" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                            <ellipse cx="72" cy="26" rx="41" ry="11" fill="none" stroke="#f59e0b" strokeWidth="1" />
                            <text x="72" y="30" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="monospace">phones (Multi)</text>
                            <ellipse cx="248" cy="26" rx="46" ry="15" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />
                            <text x="248" y="30" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontFamily="monospace">age (Derived)</text>
                            <rect x="105" y="72" width="110" height="36" fill="#0c192c" stroke="#22d3ee" strokeWidth="2" />
                            <text x="160" y="94" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold" fontFamily="monospace">STUDENT</text>
                          </svg>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-cyan-300 bg-[#060914] px-2.5 py-1.5 rounded border border-slate-800 truncate text-center">
                        {currentStep.erSymbolText}
                      </div>
                    </div>

                    {/* Stage 2: Mapping Bridge */}
                    <div className="lg:col-span-2 flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#070914] border border-slate-800/80 text-center gap-1.5">
                      <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <ArrowRight className="w-4 h-4 hidden lg:block" />
                        <ChevronRight className="w-4 h-4 lg:hidden rotate-90" />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold leading-tight">
                        {language === 'bn' ? currentStep.flowArrowBn : currentStep.flowArrowEn}
                      </span>
                    </div>

                    {/* Stage 3: Output Table + Copyable SQL */}
                    <div className="lg:col-span-5 p-3 rounded-xl bg-[#0c1020] border border-emerald-900/40 flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{currentStep.tableName}</span>
                        </div>
                        <button
                          onClick={() => handleCopySql(currentStep.sqlCode, activeConversionStep)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-zinc-300 hover:text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer border border-slate-700/60"
                        >
                          {copiedStep === activeConversionStep ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">{language === 'bn' ? 'কপি!' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy SQL</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Compact Column Pills */}
                      <div className="flex flex-wrap gap-1.5 bg-[#060914] p-2 rounded-lg border border-slate-800/80 font-mono text-[10px]">
                        {currentStep.columns.map((col) => (
                          <span
                            key={col.name}
                            className={`px-2 py-0.5 rounded border ${
                              col.isPk
                                ? 'bg-amber-950/60 border-amber-500/40 text-amber-300 font-bold'
                                : col.isFk
                                ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-zinc-300'
                            }`}
                          >
                            {col.name} {col.isPk ? '[PK]' : col.isFk ? '[FK]' : ''}
                          </span>
                        ))}
                      </div>

                      {/* Compact SQL */}
                      <pre className="p-2.5 rounded-lg bg-[#050711] border border-slate-800 text-[10.5px] font-mono text-emerald-300/90 leading-snug overflow-x-auto max-h-32">
                        <code>{currentStep.sqlCode}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 2: UNIVERSITY EXAM CHEAT SHEET MATRIX TABLE */}
        {showDecisionMatrix && (
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090b14] shadow-xl">
            <table className="w-full text-left font-sans text-xs">
              <thead>
                <tr className="bg-[#121629] text-zinc-300 border-b border-slate-800 text-[11px] font-mono">
                  <th className="py-2.5 px-3">{language === 'bn' ? 'ইআর উপাদান' : 'ER Component'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'টেবিল তৈরির নিয়ম' : 'Relational Rule'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'PK কৌশল' : 'PK Logic'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'FK কৌশল' : 'FK Logic'}</th>
                  <th className="py-2.5 px-3">{language === 'bn' ? 'উদাহরণ' : 'SQL Example'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs font-sans">
                {mappingDecisionMatrix.map((item, idx) => (
                  <tr
                    key={item.erElementEn}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      idx % 2 === 0 ? 'bg-[#0a0d18]' : 'bg-[#070912]'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded border text-[10px] inline-block ${item.badgeColor}`}>
                        {language === 'bn' ? item.erElementBn : item.erElementEn}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-white">
                      {language === 'bn' ? item.relationalRuleBn : item.relationalRuleEn}
                    </td>
                    <td className="py-2.5 px-3 text-amber-300 font-mono text-[11px]">
                      {language === 'bn' ? item.pkMechanismBn : item.pkMechanismEn}
                    </td>
                    <td className="py-2.5 px-3 text-indigo-300 font-mono text-[11px]">
                      {language === 'bn' ? item.fkMechanismBn : item.fkMechanismEn}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px]">
                      <span className="text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 block w-fit">
                        {item.example}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* COMPACT SUMMARY STRIP */}
        <div className="p-3.5 rounded-xl bg-[#0a0d1a] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300">
            <span className="flex items-center gap-1.5">
              <Layers3 className="w-4 h-4 text-cyan-400" />
              {language === 'bn' ? 'সমন্বিত ফলাফল: ৩টি সংযুক্ত টেবিল' : 'Synchronized Result: 3 Linked Tables'}
            </span>
            <span className="text-[10px] text-zinc-400 font-normal">PK + FK Graph</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 font-mono text-[11px]">
            <div className="p-2.5 rounded-lg bg-[#060914] border border-slate-800/90">
              <span className="text-cyan-400 font-bold">1. DEPARTMENTS</span>
              <div className="text-zinc-300 mt-0.5"><span className="text-amber-300">dept_id [PK]</span>, dept_name</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#060914] border border-slate-800/90">
              <span className="text-indigo-300 font-bold">2. COURSES (1:N)</span>
              <div className="text-zinc-300 mt-0.5"><span className="text-amber-300">course_id [PK]</span>, <span className="text-indigo-400">dept_id [FK]</span></div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#060914] border border-purple-900/60">
              <span className="text-purple-300 font-bold">3. ENROLLMENTS (M:N)</span>
              <div className="text-zinc-300 mt-0.5"><span className="text-pink-400">PK(student_id, course_id)</span>, grade</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
