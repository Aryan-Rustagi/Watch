'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SectionLabel from '@/components/ui/SectionLabel';

interface MaterialItem {
  num: string;
  name: string;
  description: string;
  accent: string;
}

const MATERIALS: MaterialItem[] = [
  {
    num: '01',
    name: 'Brushed Titanium',
    description: 'Grade 5 titanium, sandblasted and hand-finished over 14 hours.',
    accent: '#94a3b8',
  },
  {
    num: '02',
    name: 'Sapphire Crystal',
    description: 'Double-domed, anti-reflective coated on both surfaces.',
    accent: '#60a5fa',
  },
  {
    num: '03',
    name: 'Alligator Strap',
    description: 'Vegetable-tanned, hand-stitched in Switzerland.',
    accent: '#d97706',
  },
  {
    num: '04',
    name: 'Rhodium Dial',
    description: 'Sunburst finish, galvanically grown in a 22-step bath.',
    accent: '#c9a961',
  },
];

export default function Materials() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.material-item');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        }
      });

      // Initial state
      gsap.set(items, { opacity: 0, y: 100 });

      items.forEach((item: any, i) => {
        tl.to(item, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
          .to(item, { opacity: 1, duration: 1.5 }) // Hold
          .to(item, { opacity: 0, y: -100, duration: 1, ease: 'power2.in' }); // Exit
      });

      triggerRef.current = tl.scrollTrigger;
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative bg-ink text-bone w-full">
      <div className="h-screen w-full flex flex-col justify-center px-6 md:px-16 overflow-hidden">
        
        {/* Fixed Header */}
        <div className="absolute top-[15%] md:top-[20%] left-6 md:left-16 max-w-xl z-10">
          <SectionLabel>MATERIALS</SectionLabel>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl">
            Forged in timeless elements.
          </h2>
        </div>

        {/* Animated Items Container */}
        <div className="relative h-full w-full flex items-center mt-32 md:mt-16 max-w-5xl mx-auto">
          {MATERIALS.map((item) => (
            <div
              key={item.num}
              className="material-item absolute left-0 right-0 w-full opacity-0 will-change-transform"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                <div className="flex items-start gap-4 flex-shrink-0">
                  <span className="font-serif text-7xl md:text-[140px] text-gold/80 font-light leading-none">
                    {item.num}
                  </span>
                  <span
                    className="h-3 w-3 md:h-4 md:w-4 rounded-full mt-3 md:mt-8 shadow-[0_0_12px]"
                    style={{
                      backgroundColor: item.accent,
                      boxShadow: `0 0 16px ${item.accent}`,
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-bone mb-4 md:mb-6">
                    {item.name}
                  </h3>
                  <p className="text-lg md:text-2xl text-bone/70 font-light max-w-2xl leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
