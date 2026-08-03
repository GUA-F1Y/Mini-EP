'use client';

import React from 'react';
import { Award, Disc, Sparkles } from 'lucide-react';
import { MOCK_CREDITS, MINI_EP_INFO } from '@/lib/audio/mockTracks';
import { PageTransition } from '@/components/layout/PageTransition';

export default function CreditsPage() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 text-center border-b border-surface pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            PRODUCTION CREDITS & CONTRIBUTORS
          </div>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground break-words">
            CREDITS & ACKNOWLEDGMENTS
          </h1>
          <p className="text-muted text-sm max-w-lg mx-auto">
            Honoring everyone who contributed to the composition, mixing, mastering, visual design, and portal execution of {MINI_EP_INFO.title}
          </p>
        </div>

        {/* Credits List */}
        <div className="bg-secondary/60 rounded-3xl border border-surface divide-y divide-surface/80">
          {MOCK_CREDITS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface/30 transition-colors"
            >
              <span className="text-xs font-mono text-accent uppercase tracking-wider">
                {item.role}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Special Thanks Card */}
        <div className="p-8 rounded-3xl bg-surface/30 border border-surface text-center space-y-3">
          <h3 className="font-display text-lg font-bold text-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            SPECIAL THANKS
          </h3>
          <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
            Dedicated to our nocturnal listeners, synthesis enthusiasts, and fans around the world who continue to fuel this digital soundscape journey.
          </p>
        </div>

      </div>
    </PageTransition>
  );
}
