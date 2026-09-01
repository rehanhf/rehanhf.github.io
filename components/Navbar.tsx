import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  scrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled = false }) => {
  const { language, setLanguage, content } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'py-2 bg-[#0d0d0f]/70 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)]' : 'py-4 bg-noir/50 border-b border-white/5'
      }`}
    >
      <div className="flex items-center gap-8 font-mono text-xs text-zinc-400">
        {Object.entries(content.labels.nav).map(([key, label]) => (
          <a 
            key={key} 
            href={`#${key}`}
            className="uppercase tracking-widest text-zinc-400 transition-colors duration-300 hover:text-neon cursor-none"
            style={{ cursor: 'none' }}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 font-mono text-xs">
         <button 
           type="button"
           onClick={() => setLanguage('en')}
           className={`${language === 'en' ? 'text-neon font-bold' : 'text-zinc-600 hover:text-white'} transition-colors cursor-none`}
           style={{ cursor: 'none' }}
         >
           EN
         </button>
         <span className="text-zinc-700">/</span>
         <button 
           type="button"
           onClick={() => setLanguage('id')}
           className={`${language === 'id' ? 'text-neon font-bold' : 'text-zinc-600 hover:text-white'} transition-colors cursor-none`}
           style={{ cursor: 'none' }}
         >
           ID
         </button>
      </div>
    </motion.nav>
  );
};