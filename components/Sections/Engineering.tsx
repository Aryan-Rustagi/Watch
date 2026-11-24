'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import GlassCard from '@/components/ui/GlassCard';

export default function Engineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const easing = [0.22, 1, 0.36, 1];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.12,
        ease: easing,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-ink py-32 px-6 md:px-16 flex items-center overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* LEFT COLUMN: Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div>
            <SectionLabel>ENGINEERING</SectionLabel>
          </div>

          <motion.h2
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={itemVariants}
            className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl text-bone leading-[1.12] tracking-tight"
          >
            A movement that breathes in silence.
          </motion.h2>

          <motion.p
            custom={1}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={itemVariants}
            className="mt-8 text-base md:text-lg text-bone/75 font-light leading-relaxed max-w-xl"
          >
            Every component is finished by hand. The mainspring is coiled to a tolerance of two microns.
            The escapement beats eight times a second — quiet enough to hear the room around you.
          </motion.p>

          <motion.p
            custom={2}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={itemVariants}
            className="mt-6 text-base md:text-lg text-bone/75 font-light leading-relaxed max-w-xl"
          >
            The result is a watch that disappears on the wrist and reappears when you need it. Nothing
            louder than it must be.
          </motion.p>
        </div>

        {/* RIGHT COLUMN: Stylized Movement Schematic Spec Panel */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            custom={3}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={itemVariants}
            className="w-full max-w-lg"
          >
            <GlassCard className="relative p-8 md:p-10 transform rotate-1 md:rotate-2 hover:rotate-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.04]">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-gold">
                  SCHEMATIC // CALIBRE C-840
                </span>
                <span className="font-mono text-xs text-bone/40">TOLERANCE ±2µm</span>
              </div>

              {/* Movement Blueprint Graphic */}
              <div className="relative my-8 h-64 sm:h-72 w-full flex items-center justify-center">
                {/* SVG Gear & Concentric Movement Geometry */}
                <svg
                  className="w-full h-full max-w-[280px] max-h-[280px] animate-[spin_60s_linear_infinite]"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="94" stroke="#c9a961" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="82" stroke="#f5f1ea" strokeOpacity="0.15" strokeWidth="1" />
                  <circle cx="100" cy="100" r="66" stroke="#c9a961" strokeOpacity="0.4" strokeWidth="1.5" />
                  <circle cx="100" cy="100" r="48" stroke="#f5f1ea" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
                  <circle cx="100" cy="100" r="30" stroke="#c9a961" strokeOpacity="0.6" strokeWidth="2" />
                  <circle cx="100" cy="100" r="10" fill="#c9a961" fillOpacity="0.4" stroke="#c9a961" strokeWidth="1" />

                  {/* Spokes & Escapement lines */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <line
                      key={deg}
                      x1="100"
                      y1="100"
                      x2={100 + 82 * Math.cos((deg * Math.PI) / 180)}
                      y2={100 + 82 * Math.sin((deg * Math.PI) / 180)}
                      stroke="#f5f1ea"
                      strokeOpacity="0.12"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Gear teeth notches */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <circle
                      key={deg}
                      cx={100 + 66 * Math.cos((deg * Math.PI) / 180)}
                      cy={100 + 66 * Math.sin((deg * Math.PI) / 180)}
                      r="3"
                      fill="#c9a961"
                      fillOpacity="0.7"
                    />
                  ))}
                </svg>

                {/* Center Core Monogram */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-sm tracking-widest text-gold">Ω</span>
                </div>
              </div>

              {/* Technical Annotations */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 font-mono text-xs text-bone/60">
                <div>
                  <span className="block text-bone/40 text-[10px] uppercase">Frequency</span>
                  <span className="text-bone/90">28,800 VPH (4Hz)</span>
                </div>
                <div className="text-right">
                  <span className="block text-bone/40 text-[10px] uppercase">Jeweled Pivot</span>
                  <span className="text-gold">42 Synthetic Rubies</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
