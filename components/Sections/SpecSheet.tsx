'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import GlassCard from '@/components/ui/GlassCard';

interface SpecItem {
  value: number;
  unit: string;
  description: string;
}

const SPECS: SpecItem[] = [
  { value: 72, unit: 'hours', description: 'Power reserve' },
  { value: 100, unit: 'meters', description: 'Water resistance' },
  { value: 38, unit: 'mm', description: 'Case diameter' },
  { value: 8, unit: 'beats/sec', description: 'Frequency' },
  { value: 42, unit: 'jewels', description: 'Movement' },
  { value: 5, unit: 'years', description: 'Warranty' },
];

function AnimatedCounter({ target, active }: { target: number; active: boolean }) {
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (active) {
      const controls = animate(motionVal, target, {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setDisplay(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [active, target, motionVal]);

  return <span className="tabular-nums">{display}</span>;
}

export default function SpecSheet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <section ref={containerRef} className="relative min-h-[80vh] w-full bg-ash py-32 px-6 md:px-16 flex items-center">
      <div className="mx-auto max-w-5xl w-full">
        {/* Centered Heading */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <SectionLabel>SPECIFICATIONS</SectionLabel>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl text-bone tracking-tight">
            Every number, earned.
          </h2>
        </div>

        {/* 6-Item Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {SPECS.map((spec, index) => (
            <motion.div
              key={spec.description}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <GlassCard className="p-8 flex flex-col justify-between h-48 border-transparent hover:border-white/5 transition-colors duration-500">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold font-light tracking-tight">
                    <AnimatedCounter target={spec.value} active={isInView} />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-bone/60">
                    {spec.unit}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <span className="font-sans text-sm md:text-base text-bone/80 font-normal">
                    {spec.description}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
