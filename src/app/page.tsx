'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Disc,
  ArrowRight,
  Heart,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { MINI_EP_INFO, MOCK_TRACKS, MOCK_FAN_MESSAGES, MOCK_GALLERY } from '@/lib/audio/mockTracks';
import { useAudioStore } from '@/stores/useAudioStore';
import { TrackRow } from '@/components/audio/TrackRow';
import { AudioVisualizer } from '@/components/audio/AudioVisualizer';
import { PageTransition } from '@/components/layout/PageTransition';

export default function HomePage() {
  const { playTrack, isPlaying } = useAudioStore();

  return (
    <PageTransition>
      <div className="space-y-24 pb-20">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 overflow-hidden">
          {/* Ambient Glowing Background Elements */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/80 border border-accent/30 text-accent text-xs font-mono tracking-widest uppercase shadow-lg shadow-accent/5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                OUT NOW WORLDWIDE • 3 TRACKS + BONUS TRACK
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground leading-none break-words max-w-full"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-accent to-accent-light">
                  JERSEY_MU..
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
              >
                {MINI_EP_INFO.description}
              </motion.p>

              {/* Action CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={() => playTrack(0)}
                  className="px-8 py-4 rounded-xl bg-accent text-background font-bold font-mono text-sm tracking-wider flex items-center gap-3 hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" />
                  LISTEN TO MINI EP
                </button>

                <Link
                  href="/music"
                  className="px-6 py-4 rounded-xl bg-surface border border-surface/80 text-foreground font-mono text-xs hover:border-accent/40 transition-all flex items-center gap-2 group"
                >
                  VIEW TRACKLIST & LYRICS
                  <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Stream platform shortcuts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-mono pt-4"
              >
                <span className="text-muted">AVAILABLE ON:</span>

                {/* YouTube — Active */}
                <a
                  href={MINI_EP_INFO.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/15 border border-red-600/40 text-red-400 hover:bg-red-600/25 hover:border-red-400 transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  YOUTUBE
                </a>

                {/* Spotify — Coming Soon */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface/60 text-muted/50 cursor-not-allowed select-none">
                  SPOTIFY
                  <span className="text-[9px] font-bold tracking-widest text-accent/60 bg-accent/10 px-1.5 py-0.5 rounded-full">
                    SOON
                  </span>
                </span>

                {/* Apple Music — Coming Soon */}
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface/60 text-muted/50 cursor-not-allowed select-none">
                  APPLE MUSIC
                  <span className="text-[9px] font-bold tracking-widest text-accent/60 bg-accent/10 px-1.5 py-0.5 rounded-full">
                    SOON
                  </span>
                </span>
              </motion.div>
            </div>

            {/* Right Vinyl Artwork Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex justify-center lg:justify-end pr-4 sm:pr-8 lg:pr-12"
            >
              <div className="relative group w-64 sm:w-80 lg:w-96 aspect-square">
                {/* Spinning Vinyl Record Disc */}
                <div
                  className={`absolute top-0 right-[-15%] w-full h-full rounded-full bg-secondary border-4 border-surface shadow-2xl flex items-center justify-center transition-transform duration-700 ${
                    isPlaying ? 'animate-spin-slow' : 'group-hover:translate-x-6'
                  }`}
                >
                  <div className="w-1/3 h-1/3 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                    <Disc className="w-6 h-6 text-accent" />
                  </div>
                </div>

                {/* Cover Art Sleeve */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-surface/80 group-hover:border-accent/40 transition-colors">
                  <Image
                    src={MINI_EP_INFO.coverUrl}
                    alt={MINI_EP_INFO.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">
                      {MINI_EP_INFO.artist}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {MINI_EP_INFO.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* AUDIO VISUALIZER PREVIEW */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <AudioVisualizer height={140} />
        </section>

        {/* TRACKLIST SHOWCASE SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface pb-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                OFFICIAL TRACKLIST
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                MINI EP COMPOSITION
              </h2>
            </div>
            <Link
              href="/music"
              className="text-xs font-mono text-muted hover:text-accent flex items-center gap-1 transition-colors"
            >
              EXPLORE FULL AUDIO & SYNCHRONIZED LYRICS <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_TRACKS.map((track, index) => (
              <TrackRow key={track.id} track={track} index={index} />
            ))}
          </div>
        </section>

        {/* ARTIST MANIFESTO / ABOUT BRIEF */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-secondary/60 border border-surface/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                THE CONCEPT & ARTISTRY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-foreground">
                BORN FROM NOCTURNAL SILENCE
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                JERSEY_MU.. was composed between 2:00 AM and 5:00 AM over three months of solitary studio sessions. Utilizing vintage analog synthesizers, deep sub-bass frequencies, and atmospheric vocal textures, this Mini EP captures the beauty of urban solitude.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline font-semibold"
                >
                  READ ARTIST BIOGRAPHY & DISCOGRAPHY →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-surface">
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop"
                alt="GUAF1Y Studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAN WALL HIGHLIGHT PREVIEW */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface pb-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                COMMUNITY VOICE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                FAN MESSAGES & REACTIONS
              </h2>
            </div>
            <Link
              href="/fan-wall"
              className="px-4 py-2 rounded-lg bg-accent text-background text-xs font-mono font-bold hover:bg-accent-hover transition-colors"
            >
              POST YOUR MESSAGE ON FAN WALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_FAN_MESSAGES.slice(0, 4).map((msg) => (
              <div
                key={msg.id}
                className="p-6 rounded-2xl bg-secondary/40 border border-surface/80 space-y-3 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground text-sm">
                    {msg.name}
                  </span>
                  <span className="text-[11px] font-mono text-muted">
                    {msg.location}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed italic">
                  &quot;{msg.message}&quot;
                </p>
                <div className="flex items-center gap-1.5 text-xs text-accent pt-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{msg.likesCount} fans resonated</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDITORIAL GALLERY PREVIEW */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface pb-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                VISUAL DOCUMENTATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                MEDIA GALLERY
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-mono text-muted hover:text-accent flex items-center gap-1"
            >
              VIEW ALL HIGH-RES PHOTOS <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_GALLERY.map((item) => (
              <Link
                key={item.id}
                href="/gallery"
                className="group relative h-64 rounded-2xl overflow-hidden border border-surface"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-accent uppercase">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-foreground">
                    {item.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
