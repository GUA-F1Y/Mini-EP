'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disc, Menu, X, Volume2, ShieldCheck } from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';

const NAV_LINKS = [
  { href: '/', label: 'HOME' },
  { href: '/music', label: 'MUSIC' },
  { href: '/lyrics', label: 'LYRICS' },
  { href: '/gallery', label: 'GALLERY' },
  { href: '/fan-wall', label: 'FAN WALL' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
  { href: '/credits', label: 'CREDITS' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isPlaying, togglePlay, tracks, currentTrackIndex } = useAudioStore();
  const currentTrack = tracks[currentTrackIndex];

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll when menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all border-b ${
      mobileMenuOpen
        ? 'bg-background border-surface'
        : 'bg-background/80 backdrop-blur-xl border-surface/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group min-w-0" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface border border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors shadow-lg shadow-accent/5 shrink-0">
            <Disc className="w-4 h-4 sm:w-5 sm:h-5 text-accent animate-spin-slow" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-base sm:text-lg font-black tracking-widest text-foreground group-hover:text-accent transition-colors truncate">
              GUAF1Y
            </span>
            <span className="text-[9px] font-mono tracking-widest text-accent uppercase hidden sm:block">
              MINI EP • 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-mono tracking-widest">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  isActive ? 'text-accent font-bold' : 'text-muted hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Now playing pill — desktop */}
          <button
            onClick={togglePlay}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/70 border border-surface hover:border-accent/40 text-xs font-mono transition-all"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-accent animate-pulse' : 'text-muted'}`} />
            <span className="text-[11px] text-foreground truncate max-w-[90px]">
              {isPlaying ? currentTrack?.title : 'PAUSED'}
            </span>
          </button>

          {/* Admin link */}
          <Link
            href="/admin"
            className="hidden sm:flex p-2 text-muted hover:text-accent transition-colors rounded-lg hover:bg-surface"
            title="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 text-muted hover:text-foreground rounded-xl bg-surface/60 border border-surface min-h-[44px] min-w-[44px]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Full-Screen Nav Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background flex flex-col overflow-hidden border-t border-surface/50">
          <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3.5 px-4 rounded-xl font-mono text-sm tracking-widest transition-colors ${
                    isActive
                      ? 'bg-accent/20 border border-accent/40 text-accent font-bold shadow-lg shadow-accent/5'
                      : 'bg-surface/40 border border-surface/60 text-muted hover:text-foreground hover:bg-surface'
                  }`}
                >
                  {link.label}
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom row inside mobile menu */}
          <div className="px-5 pb-8 pt-4 border-t border-surface/80 bg-secondary/80 flex items-center justify-between shrink-0">
            <button
              onClick={() => { togglePlay(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-surface text-xs font-mono"
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-accent animate-pulse' : 'text-muted'}`} />
              <span className="truncate max-w-[140px]">
                {isPlaying ? currentTrack?.title ?? 'NOW PLAYING' : 'PAUSED'}
              </span>
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted hover:text-accent rounded-lg bg-surface/60"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ADMIN</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
