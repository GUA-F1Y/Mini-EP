'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Play, Volume2 } from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';

export const IntroScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const { togglePlay, isPlaying } = useAudioStore();

  useEffect(() => {
    setMounted(true);
    const visited = sessionStorage.getItem('has_entered_portal');
    if (visited === 'true') {
      setHasEntered(true);
    }
  }, []);

  const handleEnter = (autoPlay: boolean = true) => {
    sessionStorage.setItem('has_entered_portal', 'true');
    setHasEntered(true);
    if (autoPlay && !isPlaying) {
      togglePlay();
    }
  };

  // Don't render overlay until client hydration is complete
  if (!mounted || hasEntered) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl p-6 text-center overflow-hidden"
      >
        {/* Glowing background aura */}
        <div className="absolute w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

        {/* Core Content Container */}
        <div className="relative z-10 max-w-lg space-y-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-accent/30 text-accent text-xs font-mono tracking-widest uppercase mb-2 shadow-lg">
            <Disc className="w-4 h-4 animate-spin-slow" />
            OFFICIAL ARTIST PORTAL
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-foreground">
            JERSEY_MU..
          </h1>

          <p className="text-muted text-sm sm:text-base font-sans max-w-md mx-auto leading-relaxed">
            A 5-track immersive digital soundscape by <span className="text-foreground font-semibold">GUAF1Y</span>. Best experienced with headphones.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => handleEnter(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-sm tracking-wider flex items-center justify-center gap-2 hover:bg-accent-hover shadow-xl shadow-accent/20 transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              ENTER & PLAY MINI EP
            </button>

            <button
              onClick={() => handleEnter(false)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-surface border border-surface/80 text-muted font-mono text-xs hover:text-foreground transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              ENTER SILENTLY
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
