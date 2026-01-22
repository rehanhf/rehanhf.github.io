import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Summary: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="introduction" className="py-12 md:py-20">
      <div className="mb-4">
        <span className="text-neon font-mono text-xs font-bold tracking-widest uppercase">
          {content.labels.intro}
        </span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white leading-tight mb-6">
          RAIHAN H.
        </h2>
        <div className="w-20 h-1 bg-neon mb-8" />
        
        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
          {content.summary}
        </p>
      </motion.div>
    </section>
  );
};