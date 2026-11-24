/**
 * Helper to generate asset paths for scroll-driven frame sequences.
 * Placeholder stub for Step 1.
 */
export type Device = 'desktop' | 'mobile';

export function getFramePath(index: number, device: Device = 'desktop'): string {
  const paddedIndex = String(index).padStart(4, '0');
  return `/frames/${device}/frame_${paddedIndex}.webp`;
}
