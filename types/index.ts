/**
 * Shared TypeScript types for Chronos Watch.
 */

export type DeviceType = 'desktop' | 'mobile';

export interface WatchSpec {
  value: number;
  unit: string;
  description: string;
}

export interface MaterialItem {
  num: string;
  name: string;
  description: string;
  gradient: string;
  accent: string;
}

export interface SectionMeta {
  id: string;
  title: string;
  subtitle?: string;
}
