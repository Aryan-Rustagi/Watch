'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Glassmorphism card component.
 * Renders a `<div>` with frosted-glass styling.
 */
export default function GlassCard({
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] rounded-2xl transition-colors duration-500 hover:bg-white/[0.04]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
