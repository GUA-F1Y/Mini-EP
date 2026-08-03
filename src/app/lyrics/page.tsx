'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FileText, Play, Pause, Copy, Check, Music, Disc } from 'lucide-react';
import { MOCK_TRACKS } from '@/lib/audio/mockTracks';
import { useAudioStore } from '@/stores/useAudioStore';
import { PageTransition } from '@/components/layout/PageTransition';

export default function LyricsPage() {
  const {
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    playTrack,
    togglePlay,
  } = useAudioStore();

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const activeTrack = MOCK_TRACKS[currentTrackIndex];

  const handleCopy = (lyrics: string, index: number) => {
    navigator.clipboard.writeText(lyrics);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left border-b border-surface pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            EDITORIAL LYRICS & PRODUCTION NOTES
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            POETRY IN THE DARK
          </h1>
          <p className="text-muted text-sm max-w-xl">
            Explore synchronized lyrics and track insights from GUAF1Y for all tracks in JERSEY_MU.. Mini EP.
          </p>
        </div>

        {/* Track Selection Pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {MOCK_TRACKS.map((t, idx) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTrackIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-accent text-background font-bold shadow-lg shadow-accent/20'
                    : 'bg-secondary border border-surface text-muted hover:text-foreground hover:border-accent/40'
                }`}
              >
                <span>#{t.trackNumber}</span>
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Track Lyrics & Insights Card */}
        {activeTrack && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Track Info Card */}
            <div className="lg:col-span-4 space-y-6 bg-secondary/60 p-6 rounded-3xl border border-surface">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-surface">
                <Image
                  src={activeTrack.coverUrl}
                  alt={activeTrack.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  TRACK #{activeTrack.trackNumber} OF 5
                </span>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {activeTrack.title}
                </h2>
                <p className="text-xs text-muted">
                  {activeTrack.artist} • {activeTrack.album} ({activeTrack.genre})
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => playTrack(currentTrackIndex)}
                  className="flex-1 py-3 rounded-xl bg-accent text-background text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" /> PAUSE AUDIO
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> PLAY TRACK
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCopy(activeTrack.lyrics || '', currentTrackIndex)}
                  className="p-3 rounded-xl bg-surface border border-surface text-muted hover:text-foreground transition-colors"
                  title="Copy Lyrics"
                >
                  {copiedIndex === currentTrackIndex ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {activeTrack.producers && (
                <div className="pt-4 border-t border-surface text-xs text-muted space-y-1">
                  <p className="font-mono text-accent uppercase text-[10px]">PRODUCTION & ARRANGEMENT</p>
                  <p className="text-foreground">{activeTrack.producers.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Right Lyrics Text Area */}
            <div className="lg:col-span-8 bg-secondary/40 p-8 sm:p-12 rounded-3xl border border-surface space-y-6">
              <div className="flex items-center justify-between border-b border-surface pb-4">
                <span className="text-xs font-mono text-muted uppercase tracking-widest flex items-center gap-2">
                  <Disc className="w-4 h-4 text-accent animate-spin-slow" />
                  LYRICS TEXT CONTENT
                </span>
                <span className="text-xs font-mono text-accent">
                  {activeTrack.title}
                </span>
              </div>

              <pre className="font-sans text-base sm:text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap font-normal">
                {activeTrack.lyrics || 'Instrumental composition. No vocal lyrics.'}
              </pre>
            </div>

          </div>
        )}

      </div>
    </PageTransition>
  );
}
