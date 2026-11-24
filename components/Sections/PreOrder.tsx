'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import GoldButton from '@/components/ui/GoldButton';

export default function PreOrder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] w-full bg-ink py-40 px-6 md:px-16 flex items-center justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-3xl w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-sm p-10 md:p-16 flex flex-col items-center text-center transition-colors duration-500 hover:bg-white/[0.04]"
        >
            <SectionLabel>AVAILABLE NOW</SectionLabel>

            <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl text-bone tracking-tight">
              Wear time. Quietly.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-bone/70 font-light max-w-md">
              Limited to 250 pieces. Delivered in 6–8 weeks.
            </p>

            <div className="mt-10">
              <GoldButton href="#reserve">
                Reserve your piece
              </GoldButton>
            </div>

            <span className="mt-4 text-xs font-mono text-bone/40 tracking-wider">
              No charge until dispatch.
            </span>
        </motion.div>
      </div>

      {/* Subtle Bottom Ambient Glow with 4s Ease-in-out Pulse */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[320px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.35)_0%,transparent_70%)] filter blur-3xl"
      />
    </section>
  );
}
