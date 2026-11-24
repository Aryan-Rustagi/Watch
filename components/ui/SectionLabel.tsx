'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'text-xs uppercase tracking-[0.3em] text-gold/80 font-medium',
        className
      )}
    >
      {children}
    </span>
  );
}
