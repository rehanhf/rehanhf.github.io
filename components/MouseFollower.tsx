import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const MouseFollower: React.FC = () => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 320 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const size = isHoveringLink ? 64 : 32;
      mouseX.set(event.clientX - size / 2);
      mouseY.set(event.clientY - size / 2);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactiveElement = target?.closest('a, button');
      setIsHoveringLink(Boolean(interactiveElement));
    };

    const handleMouseLeave = () => setIsHoveringLink(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHoveringLink, mouseX, mouseY]);

  return (
    <>
      <motion.div
      className="fixed left-0 top-0 z-[9999] hidden rounded-full border border-neon/80 bg-neon/10 mix-blend-screen pointer-events-none md:block"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHoveringLink ? 64 : 32,
          height: isHoveringLink ? 64 : 32,
          opacity: 0.75,
        }}
        animate={{
          width: isHoveringLink ? 64 : 32,
          height: isHoveringLink ? 64 : 32,
          borderWidth: isHoveringLink ? 2 : 1,
          backgroundColor: isHoveringLink ? 'rgba(0, 242, 234, 0.12)' : 'rgba(0, 242, 234, 0.02)',
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
      />

      <motion.div
      className="fixed left-3 top-3 z-[9999] hidden h-2 w-2 rounded-full bg-white pointer-events-none mix-blend-difference md:block"
        style={{ x: useSpring(mouseX, { damping: 30, stiffness: 500 }), y: useSpring(mouseY, { damping: 30, stiffness: 500 }) }}
        animate={{ scale: isHoveringLink ? 1.4 : 1 }}
      />
    </>
  );
};
