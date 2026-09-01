import React, { createContext, useContext, useState, ReactNode } from 'react';
import { portfolioData } from '../data/portfolio';
import { PortfolioContent } from '../types';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: PortfolioContent;
  contentMap: Record<Language, PortfolioContent>;
  setContent: (next: PortfolioContent) => void;
  resetContent: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function loadContent(language: Language): PortfolioContent {
  try {
    const saved = localStorage.getItem(`portfolio-cms-${language}`);
    if (saved) return JSON.parse(saved) as PortfolioContent;
  } catch {
    // corrupted JSON — fall through to static default
  }
  return portfolioData[language];
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [contentMap, setContentMap] = useState<Record<Language, PortfolioContent>>(() => ({
    en: loadContent('en'),
    id: loadContent('id'),
  }));

  const content = contentMap[language];

  const setContent = (next: PortfolioContent) => {
    setContentMap((prev) => ({ ...prev, [language]: next }));
  };

  const resetContent = () => {
    setContentMap((prev) => ({ ...prev, [language]: portfolioData[language] }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content, contentMap, setContent, resetContent }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
