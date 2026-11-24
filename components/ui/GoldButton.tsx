'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GoldButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function GoldButton({
  children,
  href,
  onClick,
  className,
}: GoldButtonProps) {
  const content = (
    <>
      {/* Background radial glow */}
      <motion.span
        initial={{ opacity: 0.4 }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,rgba(201,169,97,0)_70%)] filter blur-md"
      />
      <span className="relative z-10 flex items-center justify-center font-medium tracking-wide">
        {children}
      </span>
    </>
  );

  const baseClasses = cn(
    'relative inline-flex items-center justify-center overflow-hidden rounded-full',
    'bg-gold text-ink font-medium px-8 py-4 tracking-wide shadow-lg shadow-gold/20 hover:shadow-gold/40',
    'transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={baseClasses}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={baseClasses}
    >
      {content}
    </motion.button>
  );
}
