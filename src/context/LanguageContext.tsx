'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export type LanguageMode = 'en' | 'bn' | 'dual';

interface LanguageContextType {
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'dual',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageMode>('dual');

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem('fl_db_lang_mode') as LanguageMode | null;
        if (saved && (saved === 'en' || saved === 'bn' || saved === 'dual')) {
          setLanguageState(saved);
        }
      } catch {
        // ignore
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setLanguage = useCallback((lang: LanguageMode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('fl_db_lang_mode', lang);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
