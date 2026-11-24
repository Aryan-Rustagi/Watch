'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export const useLenis = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis smooth scroll
    const lenisInstance = new Lenis({
      // 0.9s is a good middle ground for smooth but responsive scroll.
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // 1.2 wheel gives a slight boost without feeling out of control.
      wheelMultiplier: 1.2,
      // 1.8 for touch.
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

    // Sync Lenis scroll events to GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frame loop into GSAP ticker
    // GSAP ticker provides `time` in seconds, Lenis expects milliseconds.
    const handleTicker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(handleTicker);
    // Disable lag smoothing to prevent jitter with ScrollTrigger
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger measures the layout correctly
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(handleTicker);
      lenisInstance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
