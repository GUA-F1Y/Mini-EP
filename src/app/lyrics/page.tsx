'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FileText, Play, Pause, Copy, Check, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { MOCK_TRACKS } from '@/lib/audio/mockTracks';
import { useAudioStore } from '@/stores/useAudioStore';
import { useToastStore } from '@/stores/useToastStore';
import { PageTransition } from '@/components/layout/PageTransition';
import { shareContent } from '@/lib/utils/share';

export default function LyricsPage() {
  const {
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    playTrack,
    togglePlay,
  } = useAudioStore();

  const { addToast } = useToastStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('sm');

  const activeTrack = MOCK_TRACKS[currentTrackIndex];

  const handleCopy = (lyrics: string, index: number) => {
    navigator.clipboard.writeText(lyrics).then(() => {
      setCopiedIndex(index);
      addToast({ message: 'Lyrics copied to clipboard', type: 'success', duration: 2000 });
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleShare = async () => {
    if (!activeTrack) return;
    const result = await shareContent({
      title: `${activeTrack.title} Lyrics — GUAF1Y`,
      text: activeTrack.lyrics ?? '',
      url: window.location.href,
    });
    if (result === 'copied') {
      addToast({ message: 'Link copied to clipboard', type: 'success', duration: 2000 });
    }
  };

  const fontSizeClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'base' ? 'text-base' : 'text-lg';

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
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all shrink-0 flex items-center gap-2 min-h-[44px] ${
                  isSelected
                    ? 'bg-accent text-background font-bold shadow-lg shadow-accent/20'
                    : 'bg-secondary border border-surface text-muted hover:text-foreground hover:border-accent/40'
                }`}
                aria-pressed={isSelected}
                aria-label={`View lyrics for ${t.title}`}
              >
                <span>#{t.trackNumber}</span>
                <span>{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Track Lyrics Display */}
        {activeTrack && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-5">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-surface shadow-2xl shadow-accent/5">
                <Image
                  src={activeTrack.coverUrl}
                  alt={activeTrack.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 350px"
                  className={`object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-xs font-mono text-accent uppercase tracking-widest">
                      Track {String(activeTrack.trackNumber).padStart(2, '0')}
                    </p>
                    <h2 className="font-display text-2xl font-black text-foreground">
                      {activeTrack.title}
                    </h2>
                    <p className="text-sm text-muted">{activeTrack.artist}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (currentTrackIndex === MOCK_TRACKS.indexOf(activeTrack)) {
                    togglePlay();
                  } else {
                    playTrack(MOCK_TRACKS.indexOf(activeTrack));
                  }
                }}
                className="w-full py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                aria-label={isPlaying ? `Pause ${activeTrack.title}` : `Play ${activeTrack.title}`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                {isPlaying ? 'PAUSE TRACK' : 'PLAY TRACK'}
              </button>

              {/* Track Meta */}
              <div className="p-4 rounded-2xl bg-secondary/50 border border-surface space-y-3">
                {activeTrack.producers && (
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Produced by</span>
                    <p className="text-sm text-foreground font-semibold">{activeTrack.producers.join(', ')}</p>
                  </div>
                )}
                <div className="flex gap-6">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Genre</span>
                    <p className="text-sm text-foreground">{activeTrack.genre || 'Electronic'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest">Release</span>
                    <p className="text-sm text-foreground">{activeTrack.releaseDate}</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Lyrics Panel */}
            <div className="lg:col-span-8 space-y-5">
              {/* Controls bar */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-display text-xl font-bold text-foreground">Lyrics</h3>
                <div className="flex items-center gap-2">
                  {/* Font Size Controls */}
                  <div className="flex items-center gap-1 bg-secondary border border-surface rounded-xl p-1">
                    <button
                      onClick={() => setFontSize('sm')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${fontSize === 'sm' ? 'bg-accent text-background' : 'text-muted'}`}
                      aria-label="Small font"
                      aria-pressed={fontSize === 'sm'}
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setFontSize('base')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${fontSize === 'base' ? 'bg-accent text-background' : 'text-muted'}`}
                      aria-label="Medium font"
                      aria-pressed={fontSize === 'base'}
                    >
                      A
                    </button>
                    <button
                      onClick={() => setFontSize('lg')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${fontSize === 'lg' ? 'bg-accent text-background' : 'text-muted'}`}
                      aria-label="Large font"
                      aria-pressed={fontSize === 'lg'}
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="px-3 py-2 rounded-xl bg-secondary border border-surface text-muted hover:text-foreground text-xs font-mono flex items-center gap-2 transition-colors min-h-[44px]"
                    aria-label="Share lyrics"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    SHARE
                  </button>

                  {/* Copy */}
                  {activeTrack.lyrics && (
                    <button
                      onClick={() => handleCopy(activeTrack.lyrics!, MOCK_TRACKS.indexOf(activeTrack))}
                      className="px-3 py-2 rounded-xl bg-secondary border border-surface text-muted hover:text-foreground text-xs font-mono flex items-center gap-2 transition-colors min-h-[44px]"
                      aria-label="Copy lyrics"
                    >
                      {copiedIndex === MOCK_TRACKS.indexOf(activeTrack)
                        ? <><Check className="w-3.5 h-3.5 text-green-400" /> COPIED</>
                        : <><Copy className="w-3.5 h-3.5" /> COPY</>
                      }
                    </button>
                  )}
                </div>
              </div>

              {/* Lyrics content */}
              <div className="p-6 sm:p-8 rounded-2xl bg-secondary/50 border border-surface min-h-[400px]">
                {activeTrack.lyrics ? (
                  <pre className={`font-sans whitespace-pre-wrap text-foreground/90 leading-loose ${fontSizeClass}`}>
                    {activeTrack.lyrics}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center gap-3">
                    <FileText className="w-12 h-12 text-muted/30" />
                    <p className="text-muted text-sm">Lyrics are being prepared…</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
