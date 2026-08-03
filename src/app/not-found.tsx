'use client';

import Link from 'next/link';
import { Disc, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-surface border border-accent/40 flex items-center justify-center shadow-xl shadow-accent/5">
        <Disc className="w-8 h-8 text-accent animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-accent uppercase tracking-widest">
          ERROR 404 • FREQUENCY LOST
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-foreground">
          SIGNAL NOT FOUND
        </h1>
        <p className="text-muted text-sm max-w-md mx-auto">
          The sound frequency or page you are looking for has faded into the nocturnal mist.
        </p>
      </div>

      <Link
        href="/"
        className="px-6 py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        RETURN TO PORTAL HOME
      </Link>
    </div>
  );
}
