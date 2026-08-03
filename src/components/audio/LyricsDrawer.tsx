'use client';

import React from 'react';
import Image from 'next/image';
import { X, Copy, Check, Disc, Play, Pause } from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';

export const LyricsDrawer: React.FC = () => {
  const {
    tracks,
    currentTrackIndex,
    isLyricsOpen,
    setLyricsOpen,
    playTrack,
    isPlaying,
    togglePlay,
  } = useAudioStore();

  const [copied, setCopied] = React.useState(false);
  const currentTrack = tracks[currentTrackIndex];

  if (!isLyricsOpen || !currentTrack) return null;

  const handleCopy = () => {
    if (currentTrack.lyrics) {
      navigator.clipboard.writeText(currentTrack.lyrics);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-md transition-opacity">
      {/* Overlay Backdrop click to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => setLyricsOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-lg h-full bg-secondary border-l border-surface p-6 pb-28 md:pb-6 overflow-y-auto flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-surface">
            <div className="flex items-center gap-2 text-xs font-mono text-accent tracking-widest uppercase">
              <Disc className="w-4 h-4 animate-spin-slow" />
              SYNCHRONIZED LYRICS & NOTES
            </div>
            <button
              onClick={() => setLyricsOpen(false)}
              className="p-2 rounded-lg bg-surface/50 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Track Banner */}
          <div className="flex items-center gap-4 my-6 p-4 rounded-xl bg-surface/40 border border-surface/80">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 truncate">
              <h3 className="text-lg font-bold text-foreground truncate">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-muted">
                Track #{currentTrack.trackNumber} • {currentTrack.artist}
              </p>

              {/* Quick Play/Pause inside Drawer */}
              <button
                onClick={togglePlay}
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> PAUSE TRACK
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> LISTEN NOW
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 text-muted hover:text-accent transition-colors"
              title="Copy Lyrics to Clipboard"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Lyrics Content */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted">
              Lyrics & Production Notes
            </h4>
            <pre className="font-sans text-sm md:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap bg-background/50 p-6 rounded-xl border border-surface/50 max-h-[50vh] overflow-y-auto">
              {currentTrack.lyrics || 'No lyrics available for this track.'}
            </pre>
          </div>
        </div>

        {/* Footer Track Switcher inside Drawer */}
        <div className="pt-6 border-t border-surface mt-6">
          <p className="text-xs text-muted font-mono mb-2">OTHER TRACKS IN MINI EP</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => playTrack(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs shrink-0 transition-all ${
                  idx === currentTrackIndex
                    ? 'bg-accent text-background font-semibold'
                    : 'bg-surface/60 text-muted hover:text-foreground'
                }`}
              >
                #{t.trackNumber} {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
