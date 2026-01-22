import React from 'react';

interface TechStackProps {
  items: string[];
  className?: string;
}

export const TechStack: React.FC<TechStackProps> = ({ items, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((skill, index) => (
        <div 
          key={index}
          className="
            px-4 py-2 
            text-xs font-mono 
            bg-white/5 
            border border-white/5 
            rounded-full 
            text-zinc-400 
            hover:text-neon hover:border-neon/50 hover:bg-neon/5 
            transition-all duration-300
            cursor-default
          "
        >
          {skill}
        </div>
      ))}
    </div>
  );
};