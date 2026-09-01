import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="experience" className="py-24" style={{ scrollMarginTop: '80px' }}>
      <div className="flex items-end gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white font-sans">{content.labels.experience}</h2>
        <div className="h-[1px] bg-white/10 flex-grow mb-2" />
      </div>

      <div className="relative border-l border-white/10 ml-3 space-y-12">
        {content.experience.map((exp, index) => {
          const logoIsImage = exp.companyLogo
            ? exp.companyLogo.startsWith('http') || exp.companyLogo.startsWith('/') || exp.companyLogo.startsWith('data:')
            : false;
          const abbreviation = exp.companyLogo && !logoIsImage
            ? exp.companyLogo
            : exp.company.slice(0, 2).toUpperCase();

          const companyContent = (
            <>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] overflow-hidden">
                {logoIsImage ? (
                  <img
                    src={exp.companyLogo}
                    alt={exp.company}
                    className="h-full w-full object-contain p-0.5"
                  />
                ) : (
                  <span className="text-[10px] font-bold text-white">{abbreviation}</span>
                )}
              </span>
              <span className="text-zinc-500">@ {exp.company}</span>
            </>
          );

          return (
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

              <h4 className="mb-4 text-sm font-mono text-zinc-500">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex cursor-none items-center gap-2 transition-colors duration-200 hover:text-neon"
                    style={{ cursor: 'none' }}
                  >
                    {companyContent}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2">{companyContent}</span>
                )}
              </h4>

              <ul className="space-y-2">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="text-zinc-400 text-sm pl-4 relative before:content-['>'] before:absolute before:left-0 before:text-neon/50 before:font-mono">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
