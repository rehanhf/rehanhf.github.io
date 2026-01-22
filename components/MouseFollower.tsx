import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const MouseFollower: React.FC = () => {
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the ring (32px / 2 = 16)
      mouseY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
            setCursorVariant('hover');
        } else {
            setCursorVariant('default');
        }
    }

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      height: 32,
      width: 32,
      borderWidth: '1px',
      borderColor: '#00f2ea',
      backgroundColor: 'transparent',
      opacity: 0.5,
    },
    hover: {
      height: 64,
      width: 64,
      borderWidth: '2px',
      borderColor: '#00f2ea',
      backgroundColor: 'rgba(0, 242, 234, 0.1)',
      opacity: 1,
      x: -16, // Adjust for larger size offset
      y: -16,
    }
  };

  return (
    <>
        {/* Main large ring */}
        <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full mix-blend-screen hidden md:block"
        style={{
            x: cursorX,
            y: cursorY,
        }}
        variants={variants}
        animate={cursorVariant}
        />
        
        {/* Small center dot */}
        <div 
            className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
            ref={(ref) => {
                if(!ref) return;
                const updateDot = (e: MouseEvent) => {
                   ref.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
                }
                window.addEventListener('mousemove', updateDot);
            }}
        />
    </>
  );
};