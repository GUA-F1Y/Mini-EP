'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Disc, ArrowRight, Check, Instagram, Youtube, Twitter, Music } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-secondary border-t border-surface/80 pt-16 pb-28 text-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface border border-accent/40 flex items-center justify-center">
              <Disc className="w-5 h-5 text-accent animate-spin-slow" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              GUAF1Y
            </span>
          </div>
          <p className="text-xs text-muted max-w-sm leading-relaxed">
            Official Artist Portal for JERSEY_MU.. Mini EP. An immersive dark electronic soundscape crafted for nocturnal listeners.
          </p>
          <p className="text-[11px] font-mono text-accent">
            © 2026 GUAF1Y. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3 space-y-3 font-mono text-xs">
          <h4 className="text-foreground font-semibold uppercase tracking-wider text-[11px] mb-2">
            PORTAL SECTIONS
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/music" className="hover:text-accent transition-colors">
                • Tracklist & Visualizer
              </Link>
            </li>
            <li>
              <Link href="/lyrics" className="hover:text-accent transition-colors">
                • Lyrics & Sync Notes
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-accent transition-colors">
                • Editorial Media Gallery
              </Link>
            </li>
            <li>
              <Link href="/fan-wall" className="hover:text-accent transition-colors">
                • Live Fan Message Wall
              </Link>
            </li>
            <li>
              <Link href="/credits" className="hover:text-accent transition-colors">
                • Production Credits
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-foreground font-semibold uppercase tracking-wider text-xs font-mono">
            JOIN NOCTURNE INNER CIRCLE
          </h4>
          <p className="text-xs text-muted">
            Get exclusive tour dates, unreleased stems, and vinyl drop announcements.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 bg-background border border-surface rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-background rounded-lg text-xs font-bold font-mono hover:bg-accent-hover transition-colors flex items-center gap-1.5"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {subscribed && (
            <p className="text-[11px] font-mono text-green-400">
              ✓ Welcome to the Inner Circle. Stay tuned.
            </p>
          )}

          <div className="flex items-center gap-4 pt-2">
            <a href="https://spotify.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-surface/50 text-muted hover:text-accent transition-colors">
              <Music className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-surface/50 text-muted hover:text-accent transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-surface/50 text-muted hover:text-accent transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-surface/50 text-muted hover:text-accent transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
