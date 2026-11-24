'use client';

import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

interface OverlayProps {
  progress: MotionValue<number>;
}

export function Overlay({ progress }: OverlayProps) {
  // Title fades out as you scroll down
  const heroOpacity = useTransform(progress, [0, 0.25], [1, 0]);
  const heroY = useTransform(progress, [0, 0.25], [0, -40]);

  // Stage 2 text appears in mid-scroll
  const midOpacity = useTransform(progress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const midY = useTransform(progress, [0.35, 0.5, 0.65], [40, 0, -40]);

  // Stage 3 text appears near end of hero
  const endOpacity = useTransform(progress, [0.75, 0.9, 1], [0, 1, 0.2]);
  const endY = useTransform(progress, [0.75, 0.9, 1], [40, 0, -20]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-16">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-xl tracking-[0.25em] text-bone">CHRONOS</span>
        <span className="font-mono text-xs tracking-widest text-gold/80">GENÈVE • N° 001/250</span>
      </div>

      {/* Hero stage 1 */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold/90">
          Haute Horlogerie
        </span>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl font-normal leading-[1.08] tracking-tight text-bone">
          Precision, redefined.
        </h1>
        <p className="mt-6 text-sm md:text-base font-light tracking-wide text-bone/70 max-w-xl mx-auto">
          A luxury mechanical watch. Engineered in silence.
        </p>
      </motion.div>

      {/* Hero stage 2: Dial & Movement details */}
      <motion.div
        style={{ opacity: midOpacity, y: midY }}
        className="absolute inset-x-8 bottom-32 md:inset-x-24 md:bottom-28 max-w-md"
      >
        <div className="border-l-2 border-gold/60 pl-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Calibre C-840
          </span>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl text-bone">
            The heart of stillness.
          </h2>
          <p className="mt-2 text-xs md:text-sm text-bone/60 leading-relaxed">
            Hand-beveled bridges with Côtes de Genève finishing, beating in synchronized equilibrium.
          </p>
        </div>
      </motion.div>

      {/* Hero stage 3: Case Architecture */}
      <motion.div
        style={{ opacity: endOpacity, y: endY }}
        className="absolute inset-x-8 bottom-32 md:right-24 md:left-auto md:bottom-28 max-w-md text-right"
      >
        <div className="border-r-2 border-gold/60 pr-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            Sculpted Titanium
          </span>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl text-bone">
            Crafted for endurance.
          </h2>
          <p className="mt-2 text-xs md:text-sm text-bone/60 leading-relaxed">
            Grade 5 titanium alloy polished to a mirror specular reflection, weightless yet resolute.
          </p>
        </div>
      </motion.div>

      {/* Bottom indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-bone/40">
        <span>38MM • 100M WATER RESISTANT</span>
        <span className="animate-pulse">SCROLL TO EXPLORE ↓</span>
      </div>
    </div>
  );
}
