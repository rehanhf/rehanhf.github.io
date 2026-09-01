import React, { createContext, useContext, useState, ReactNode } from 'react';
import { portfolioData } from '../data/portfolio';
import { PortfolioContent } from '../types';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  content: PortfolioContent;
  setContent: (next: PortfolioContent) => void;
  resetContent: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [contentMap, setContentMap] = useState<Record<Language, PortfolioContent>>({
    en: portfolioData.en,
    id: portfolioData.id,
  });

  const content = contentMap[language];

  const setContent = (next: PortfolioContent) => {
    setContentMap((prev) => ({ ...prev, [language]: next }));
  };

  const resetContent = () => {
    setContentMap((prev) => ({ ...prev, [language]: portfolioData[language] }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content, setContent, resetContent }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};