'use client';

import React from 'react';
import ERSymbolsReference from './er/ERSymbolsReference';
import ERToRelationalMapper from './er/ERToRelationalMapper';

export default function Lesson5Part6SymbolsAndUniversityER() {
  return (
    <section className="bg-[#0f1220] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <ERSymbolsReference />
      <ERToRelationalMapper />
    </section>
  );
}
