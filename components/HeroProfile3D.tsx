import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const HeroProfile3D: React.FC = () => {
  const { content } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  // Transform mouse values to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of the card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
            y: [0, -15, 0] // Floating Levitating Effect
        }}
        transition={{
            y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }}
        className="relative w-[300px] h-[400px]"
      >
        {/* The Deconstructed Cyber Frame (Back) */}
        <motion.div 
          className="absolute inset-0 border-2 border-neon"
          style={{ 
            transform: "translateZ(-40px) translateX(20px) translateY(20px)",
            borderColor: '#00f2ea',
            opacity: 0.6
          }}
        />
        
        {/* Decorative corner accents for the frame */}
        <motion.div 
          className="absolute -bottom-5 -right-5 w-4 h-4 bg-neon"
          style={{ transform: "translateZ(-40px)" }}
        />

        {/* The Image (Front) */}
        <motion.div
          className="absolute inset-0 bg-zinc-800 overflow-hidden shadow-2xl"
          style={{ 
            transform: "translateZ(20px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" 
          }}
        >
          <img 
            src={content.hero.imageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 filter grayscale hover:grayscale-0"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Floating Code Element */}
        <motion.div
          className="absolute -left-10 top-10 bg-noir/90 backdrop-blur border border-white/10 p-3 rounded shadow-xl"
          style={{ transform: "translateZ(60px)" }}
        >
          <code className="text-[10px] text-neon font-mono">
            &lt;DataScientist /&gt;
          </code>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};