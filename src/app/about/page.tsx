'use client';

import React from 'react';
import Image from 'next/image';
import { User, Sliders } from 'lucide-react';
import { PageTransition } from '@/components/layout/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left border-b border-surface pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            ARTIST MANIFESTO & PROFILE
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-foreground">
            GUAF1Y
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-xl">
            Electronic producer, sound designer, and audio-visual artist based in nocturnal space.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative h-96 sm:h-[450px] rounded-3xl overflow-hidden border border-surface shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
              alt="GUAF1Y Artist Silhouette"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              SOUND & NOCTURNAL VISION
            </h2>
            <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed">
              <p>
                GUAF1Y pushes the boundaries of modern dark electronic music by fusing analog synthesizer warmth with sleek futuristic soundscapes. 
              </p>
              <p>
                Beginning in 2022 as an underground synthesizer experiment, GUAF1Y gained international recognition through cinematic sound engineering and high-intensity live visual performances.
              </p>
              <p>
                The 2026 Mini EP <strong className="text-accent">JERSEY_MU..</strong> represents a milestone evolution — focusing on raw nocturnal emotion, sub-bass resonances, and atmospheric storytelling.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-surface">
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent">GENRE FOCUS</span>
                <p className="font-semibold text-foreground text-sm">Dark Synth & Electro</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent">ORIGIN</span>
                <p className="font-semibold text-foreground text-sm">Analog Sound Lab</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-accent">DISCOGRAPHY</span>
                <p className="font-semibold text-foreground text-sm">1 EP, 4 Singles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Equipment Gear Section */}
        <section className="space-y-6 bg-secondary/50 p-8 sm:p-12 rounded-3xl border border-surface">
          <div className="flex items-center gap-3 border-b border-surface pb-4">
            <Sliders className="w-6 h-6 text-accent" />
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                STUDIO SETUP & INSTRUMENTS
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground">
                ANALOG HARDWARE & SYNTH STACK
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-background border border-surface space-y-1">
              <span className="text-xs font-mono text-accent">SYNTHESIZERS</span>
              <p className="text-sm font-semibold text-foreground">Moog Subsequent 37 & Prophet-6</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-surface space-y-1">
              <span className="text-xs font-mono text-accent">DRUM MACHINES</span>
              <p className="text-sm font-semibold text-foreground">Elektron Rytm MKII</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-surface space-y-1">
              <span className="text-xs font-mono text-accent">OUTBOARD GEAR</span>
              <p className="text-sm font-semibold text-foreground">SSL Bus Compressor & Neve Preamp</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-surface space-y-1">
              <span className="text-xs font-mono text-accent">DAW & TAPE</span>
              <p className="text-sm font-semibold text-foreground">Ableton Live 12 & Reel-to-Reel Tape</p>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
