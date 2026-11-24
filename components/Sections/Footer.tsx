'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-20px' });

  return (
    <footer
      ref={footerRef}
      className="w-full bg-ink border-t border-white/[0.08] py-12 px-6 md:px-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-7xl flex flex-col gap-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Wordmark */}
          <span className="font-serif text-2xl tracking-[0.25em] text-bone font-normal">
            CHRONOS
          </span>

          {/* Monospace Links */}
          <div className="flex items-center gap-6 font-mono text-xs text-bone/60 tracking-wider">
            <a href="#instagram" className="hover:text-gold transition-colors">
              Instagram
            </a>
            <span>/</span>
            <a href="#journal" className="hover:text-gold transition-colors">
              Journal
            </a>
            <span>/</span>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Legal notice */}
        <div className="pt-4 border-t border-white/[0.04]">
          <p className="font-mono text-xs text-bone/40 tracking-wide">
            © {new Date().getFullYear()} Chronos Watches SA — Made in Switzerland.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
