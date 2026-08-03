'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Music, Share2, Sparkles, Check } from 'lucide-react';
import { MINI_EP_INFO, MOCK_TRACKS } from '@/lib/audio/mockTracks';
import { useAudioStore } from '@/stores/useAudioStore';
import { TrackRow } from '@/components/audio/TrackRow';
import { AudioVisualizer } from '@/components/audio/AudioVisualizer';
import { PageTransition } from '@/components/layout/PageTransition';

export default function MusicPage() {
  const { playTrack } = useAudioStore();
  const [copiedShare, setCopiedShare] = React.useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        
        {/* Header Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-secondary/80 border border-surface/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Cover Art */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 sm:w-72 aspect-square rounded-2xl overflow-hidden border border-accent/30 shadow-2xl">
              <Image
                src={MINI_EP_INFO.coverUrl}
                alt={MINI_EP_INFO.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Metadata */}
          <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-accent/30 text-accent text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              OFFICIAL MINI EP DISCOGRAPHY
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black text-foreground">
              {MINI_EP_INFO.title}
            </h1>

            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
              {MINI_EP_INFO.description}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-muted pt-2">
              <span>ARTIST: <strong className="text-foreground">{MINI_EP_INFO.artist}</strong></span>
              <span>•</span>
              <span>RELEASE: <strong className="text-foreground">{MINI_EP_INFO.releaseYear}</strong></span>
              <span>•</span>
              <span>GENRE: <strong className="text-accent">{MINI_EP_INFO.genre}</strong></span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => playTrack(0)}
                className="px-6 py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-xs tracking-wider flex items-center gap-2 hover:bg-accent-hover transition-all shadow-xl shadow-accent/20"
              >
                <Play className="w-4 h-4 fill-current" />
                PLAY ALL TRACKS
              </button>

              <button
                onClick={handleShare}
                className="px-5 py-3.5 rounded-xl bg-surface border border-surface/80 text-foreground font-mono text-xs hover:border-accent/40 transition-all flex items-center gap-2"
              >
                {copiedShare ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                {copiedShare ? 'LINK COPIED' : 'SHARE MINI EP'}
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Audio Spectrum */}
        <section className="space-y-3">
          <AudioVisualizer height={160} />
        </section>

        {/* Tracklist Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-surface pb-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
              <Music className="w-6 h-6 text-accent" />
              MINI EP TRACKLIST
            </h2>
            <span className="text-xs font-mono text-muted">3 ITEMS • TOTAL 9:11</span>
          </div>

          <div className="space-y-3">
            {MOCK_TRACKS.map((track, idx) => (
              <TrackRow key={track.id} track={track} index={idx} />
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
