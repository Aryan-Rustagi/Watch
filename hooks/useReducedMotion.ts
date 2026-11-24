'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Hook to respect user preference for reduced motion.
 */
export function useReducedMotion(): boolean {
  return Boolean(useFramerReducedMotion());
}
