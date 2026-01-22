import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="experience" className="py-24">
       <div className="flex items-end gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white font-sans">{content.labels.experience}</h2>
        <div className="h-[1px] bg-white/10 flex-grow mb-2" />
      </div>

      <div className="relative border-l border-white/10 ml-3 space-y-12">
        {content.experience.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-noir border border-neon" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <span className="font-mono text-xs text-neon mt-1 sm:mt-0">{exp.period}</span>
            </div>
            
            <h4 className="text-sm font-mono text-zinc-500 mb-4">@ {exp.company}</h4>
            
            <ul className="space-y-2">
                {exp.achievements.map((item, i) => (
                    <li key={i} className="text-zinc-400 text-sm pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-neon/50 before:font-mono">
                        {item}
                    </li>
                ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};