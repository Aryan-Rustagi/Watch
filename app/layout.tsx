import type { Metadata } from 'next';
import { inter, serif, mono } from './fonts';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Chronos — Precision, redefined.',
  description: 'A luxury mechanical watch. Engineered in silence. Limited to 250 pieces.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Chronos — Precision, redefined.',
    description: 'A luxury mechanical watch. Engineered in silence.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Chronos Watches',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chronos — Precision, redefined.',
    description: 'A luxury mechanical watch. Engineered in silence.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, serif.variable, mono.variable, 'bg-ink text-bone font-sans antialiased')}>
        {/* Skip to content link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-ink focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
