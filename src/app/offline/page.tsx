import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-surface border border-accent/30 flex items-center justify-center shadow-xl shadow-accent/10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono text-accent uppercase tracking-widest">
          NO CONNECTION • OFFLINE MODE
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-foreground">
          YOU&apos;RE OFFLINE
        </h1>
        <p className="text-muted text-sm max-w-md mx-auto">
          No internet connection detected. Only tracks you&apos;ve saved for offline are available. Check your connection and try again.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-6 py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-colors inline-flex items-center justify-center gap-2"
        >
          RETRY CONNECTION
        </Link>
        <Link
          href="/music"
          className="px-6 py-3.5 rounded-xl bg-surface border border-surface/80 text-foreground font-mono text-xs hover:border-accent/40 transition-colors inline-flex items-center justify-center gap-2"
        >
          OFFLINE TRACKS
        </Link>
      </div>
    </div>
  );
}
