import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { content } = useLanguage();

  const getIcon = (platform: string) => {
    switch(platform) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      default: return <Mail size={20} />;
    }
  };

  return (
    <footer id="contact" className="py-12 border-t border-white/5 mt-12">
      <div className="flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold font-sans">{content.labels.contact}</h2>
        <p className="text-zinc-500 max-w-md text-center">
            {content.summary.substring(0, 50)}...
        </p>
        
        <div className="flex gap-8 mt-4">
          {content.social.map((social) => (
            <a 
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-neon hover:scale-110 transition-all duration-300"
            >
              {getIcon(social.platform)}
            </a>
          ))}
        </div>

        <div className="mt-8 text-[10px] font-mono text-zinc-700">
          {content.labels.footer}
        </div>
      </div>
    </footer>
  );
};