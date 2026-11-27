import React from 'react';

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

export const ER_SYMBOLS_DATA: ERSymbolItem[] = [
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

export const ER_CONVERSION_STEPS = [
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

export const ER_MAPPING_DECISION_MATRIX = [
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
