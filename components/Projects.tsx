import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="projects" className="py-24" style={{ scrollMarginTop: '80px' }}>
      <div className="flex items-end gap-4 mb-12">
        <h2 className="text-3xl font-bold text-white font-sans">{content.labels.works}</h2>
        <div className="h-[1px] bg-white/10 flex-grow mb-2" />
      </div>

      <div className="flex flex-col gap-6">
        {content.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-neon/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

              {/* Left: Content */}
              <div className="md:col-span-8">
                 <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-neon transition-colors duration-300">
                      {project.title}
                    </h3>
                    <a href={project.link} className="text-zinc-600 group-hover:text-neon transition-colors cursor-none" style={{ cursor: 'none' }} target="_blank" rel="noreferrer noopener">
                        <ExternalLink size={16} />
                    </a>
                 </div>
                <p className="text-zinc-400 leading-relaxed mb-6 font-light">
                  {project.description}
                </p>
              </div>

              {/* Right: Tags */}
              <div className="md:col-span-4 flex flex-wrap justify-end gap-2 content-start">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-neon/80 bg-neon/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Corner Accent on Hover */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-neon/0 group-hover:border-neon/100 group-hover:w-4 group-hover:h-4 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[1px] border-l-[1px] border-neon/0 group-hover:border-neon/100 group-hover:w-4 group-hover:h-4 transition-all duration-300" />

          </motion.div>
        ))}
      </div>
    </section>
  );
};
