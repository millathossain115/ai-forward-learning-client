'use client';

import React from 'react';
import ERSymbolsReference from './er/ERSymbolsReference';
import ERToRelationalMapper from './er/ERToRelationalMapper';

export default function Lesson5Part6SymbolsAndUniversityER() {
  return (
    <section className="bg-[#15171e] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6">
      <ERSymbolsReference />
      <ERToRelationalMapper />
    </section>
  );
}
