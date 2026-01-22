import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Background: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base Space Layer */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Mouse Spotlight - Made brighter */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
            background: 'radial-gradient(circle, rgba(0, 242, 234, 0.15) 0%, transparent 60%)',
            left: -400,
            top: -400,
            x: springX,
            y: springY,
        }}
      />

      {/* Stars/Noise Texture - Increased opacity */}
      <div className="absolute inset-0 opacity-50" 
           style={{ 
               backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")',
               mixBlendMode: 'overlay'
            }}>
      </div>
      
      {/* Explicit Star Field */}
      <div className="absolute inset-0 opacity-60" 
           style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '70px 70px' }}>
      </div>

      {/* Planet 1 - Large White/Grey Orb (Top Left) - Significantly increased visibility */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full blur-[80px]"
        style={{
            background: 'radial-gradient(circle, rgba(100,100,100,0.3) 0%, transparent 70%)',
            mixBlendMode: 'screen'
        }}
      />

      {/* Planet 2 - Cyan/Teal Nebula (Center/Right) - Significantly increased visibility */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[30%] right-[0%] md:-right-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[100px]"
        style={{
            background: 'radial-gradient(circle, rgba(0, 242, 234, 0.25) 0%, transparent 70%)',
            mixBlendMode: 'screen'
        }}
      />

      {/* Planet 3 - Dark Void (Bottom Left) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] bg-zinc-900"
      />
    </div>
  );
};