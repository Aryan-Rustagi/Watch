'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useIsMobile } from '@/hooks/useIsMobile';
import { HeroCanvas } from '@/components/Hero/HeroCanvas';
import { Overlay } from '@/components/Hero/Overlay';
import Engineering from '@/components/Sections/Engineering';
import Materials from '@/components/Sections/Materials';
import SpecSheet from '@/components/Sections/SpecSheet';
import PreOrder from '@/components/Sections/PreOrder';
import Footer from '@/components/Sections/Footer';

export default function Home() {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(heroRef);

  return (
    <main id="main-content" className="bg-ink text-bone">
      <section
        ref={heroRef}
        aria-label="Hero"
        className={isMobile ? 'relative h-[200vh]' : 'relative h-[300vh]'}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroCanvas progress={progress} />
          <Overlay progress={progress} />
        </div>
      </section>

      <Engineering />
      <Materials />
      <SpecSheet />
      <PreOrder />
      <Footer />
    </main>
  );
}
