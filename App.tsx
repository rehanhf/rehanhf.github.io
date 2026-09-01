import React, { useEffect, useState } from 'react';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { HeroProfile3D } from './components/HeroProfile3D';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Summary } from './components/Summary';
import { Footer } from './components/Footer';
import { MouseFollower } from './components/MouseFollower';
import { PortfolioCMS } from './components/PortfolioCMS';
import { useLanguage } from './context/LanguageContext';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const { content } = useLanguage();
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handleSecretTrigger = (event: KeyboardEvent) => {
      const isAdminShortcut = event.shiftKey && event.altKey && event.key.toLowerCase() === 'c';
      if (isAdminShortcut) {
        setIsCmsOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleSecretTrigger);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleSecretTrigger);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-neon/30 selection:text-white cursor-none" style={{ cursor: 'none' }}>
      <MouseFollower />
      <Background />
      <Navbar scrolled={isScrolled} />

      <main className="max-w-screen-xl px-6 mx-auto pt-32 md:pt-40">
        <section id="about" className="min-h-[70vh] flex flex-col md:flex-row items-center gap-12 md:gap-0 mb-20" style={{ scrollMarginTop: '80px' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 space-y-8 z-10"
          >
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-wider text-neon bg-neon/10 rounded-sm">
                {content.labels.available}
              </div>

              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] font-sans mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500">
                DATA<br/>NOIR.
              </h1>

              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-md border-l-2 border-neon pl-6">
                {content.hero.subtitle}
              </p>
            </div>
          </motion.div>

          <div className="flex-1 w-full flex justify-center md:justify-end z-10">
            <HeroProfile3D />
          </div>
        </section>

        <Summary />

        <section id="expertise" className="py-20 border-t border-white/5" style={{ scrollMarginTop: '80px' }}>
          <div className="mb-10">
            <span className="text-neon font-mono text-xs font-bold tracking-widest uppercase">
              {content.labels.capabilities}
            </span>
            <h2 className="text-3xl font-bold text-white font-sans mt-2">{content.labels.technical}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="mb-4 text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">
                {content.labels.coreStack}
              </p>
              <TechStack items={content.skills} />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-mono font-bold text-neon uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"/>
                {content.labels.current}
              </p>
              <TechStack items={content.currentlyLearning} />
            </div>
          </div>
        </section>

        <Projects />
        <Experience />
        <Education />
        <Footer />
      </main>

      <PortfolioCMS open={isCmsOpen} onClose={() => setIsCmsOpen(false)} />
    </div>
  );
};

export default App;
