import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Education: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="education" className="py-24">
      <div className="flex items-end gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white font-sans">{content.labels.academics}</h2>
        <div className="h-[1px] bg-white/10 flex-grow mb-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Education Column */}
        <div>
           <h3 className="text-xl font-bold text-white mb-8 border-l-2 border-neon pl-4">
            {content.labels.education}
           </h3>
           <div className="space-y-10">
              {content.education.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <h4 className="text-lg font-bold text-white uppercase group-hover:text-neon transition-colors duration-300">
                    {edu.school}
                  </h4>
                  <p className="text-neon font-mono text-sm mt-1">{edu.degree}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs font-mono text-zinc-500">
                    <span>{edu.period}</span>
                    {edu.gpa && <span>// GPA {edu.gpa}</span>}
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Certifications Column */}
        <div>
           <h3 className="text-xl font-bold text-white mb-8 border-l-2 border-zinc-700 pl-4">
            {content.labels.certifications}
           </h3>
           <div className="space-y-6">
              {content.certifications.map((cert, index) => (
                <motion.div 
                  key={cert.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0"
                >
                   <div className="flex items-start before:content-['>'] before:text-neon before:mr-2 before:font-mono">
                      <h4 className="text-sm font-medium text-zinc-300 leading-tight">
                        {cert.name}
                      </h4>
                   </div>
                   <p className="text-xs font-mono text-zinc-500 pl-5">
                     {cert.issuer}
                   </p>
                </motion.div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};