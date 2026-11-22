'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Workflow, 
  Table as TableIcon, 
  LayoutGrid, 
  Layers
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
              ? 'পার্ট ৬ • ইআর প্রতীক চিটশিট'
              : 'Part 6 • ER Diagram Symbols Cheat Sheet'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            <DualText
              en="6. ER Diagram Symbols: Complete University Exam Cheat Sheet"
              bn="৬. ইআর ডায়াগ্রামের প্রতীকসমূহ: পরীক্ষার পূর্ণাঙ্গ চিটশিট"
            />
          </h2>
        </div>
      </div>

      {/* Main Interactive High-Legibility Matrix */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300 font-mono">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {language === 'bn'
                ? '১২টি পিটার চেন জ্যামিতিক প্রতীক ও কনস্ট্রেইন্টস'
                : '12 Standard Peter Chen Geometric Symbols & Constraints'}
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
    </section>
  );
}
