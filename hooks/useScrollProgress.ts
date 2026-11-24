'use client';

import { useScroll, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * Hook to track scroll progress within a targeted element container.
 *
 * Generic over T so that callers can pass a narrower ref type (e.g.
 * RefObject<HTMLDivElement>) without a TypeScript assignability error.
 */
export function useScrollProgress<T extends HTMLElement>(
  target: RefObject<T>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ['start start', 'end end'],
  });

  return scrollYProgress;
}
