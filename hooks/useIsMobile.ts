'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to detect responsive breakpoint.
 *
 * Initializes as `false` (desktop) on the server and first client render
 * to avoid hydration mismatch. The true value is resolved after mount
 * via matchMedia. Components using this hook should handle the brief
 * flash via CSS (e.g., hiding mobile-only elements with Tailwind's `md:`).
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const updateMatches = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
    setIsMobile(e.matches);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    // Immediately sync with actual viewport
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => updateMatches(e);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint, updateMatches]);

  return isMobile;
}
