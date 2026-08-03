'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';
import { useHowlerPlayer } from '@/hooks/useHowlerPlayer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { formatTime } from '@/lib/utils';
import { LyricsDrawer } from './LyricsDrawer';

export const PersistentPlayer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile sheet is open
  React.useEffect(() => {
    if (isMobileExpanded) {
      document.body.classList.add('player-expanded');
    } else {
      document.body.classList.remove('player-expanded');
    }
    return () => document.body.classList.remove('player-expanded');
  }, [isMobileExpanded]);

  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    isShuffle,
    isRepeat,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    toggleLyrics,
    isLyricsOpen,
  } = useAudioStore();

  const { performSeek } = useHowlerPlayer();
  useKeyboardShortcuts();

  const currentTrack = tracks[currentTrackIndex];

  if (!mounted || !currentTrack) return null;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    performSeek(parseFloat(e.target.value));
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <LyricsDrawer />

      {/* ─────────────────── MOBILE FULL-SCREEN PLAYER SHEET ─────────────────── */}
      {isMobileExpanded && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-background/98 backdrop-blur-3xl">

          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-surface/80" />
          </div>

          {/* Close button */}
          <div className="flex items-center justify-end px-5 pt-2">
            <button
              onClick={() => setIsMobileExpanded(false)}
              className="p-2 rounded-full bg-surface/60 text-muted"
              aria-label="Close full player"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Album Art — Large */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
            <div className="relative w-64 h-64 rounded-3xl overflow-hidden border border-surface shadow-2xl shadow-accent/10">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                sizes="(max-width: 768px) 256px, 300px"
                className={`object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
              />
              {/* Glowing accent overlay when playing */}
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
              )}
            </div>

            {/* Track Info */}
            <div className="text-center w-full">
              <h2 className="font-display text-2xl font-black text-foreground truncate px-4">
                {currentTrack.title}
              </h2>
              <p className="text-sm text-muted mt-1">
                {currentTrack.artist}{' '}
                <span className="text-accent/80">• {currentTrack.album}</span>
              </p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="px-6 pb-10 space-y-6">
            {/* Seek Bar */}
            <div className="space-y-1.5">
              <div className="relative w-full h-1.5 bg-surface rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Seek"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Playback Controls */}
            <div className="flex items-center justify-between px-2">
              {/* Shuffle */}
              <button
                onClick={toggleShuffle}
                aria-label="Shuffle"
                className={`p-3 rounded-full transition-colors ${isShuffle ? 'text-accent bg-accent/10' : 'text-muted'}`}
              >
                <Shuffle className="w-5 h-5" />
              </button>

              {/* Prev */}
              <button
                onClick={prevTrack}
                aria-label="Previous track"
                className="p-3 text-foreground"
              >
                <SkipBack className="w-7 h-7" />
              </button>

              {/* Play / Pause — Large */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-2xl shadow-accent/30 hover:bg-accent-hover active:scale-95 transition-all"
              >
                {isPlaying
                  ? <Pause className="w-7 h-7 fill-current" />
                  : <Play className="w-7 h-7 fill-current translate-x-0.5" />
                }
              </button>

              {/* Next */}
              <button
                onClick={nextTrack}
                aria-label="Next track"
                className="p-3 text-foreground"
              >
                <SkipForward className="w-7 h-7" />
              </button>

              {/* Repeat */}
              <button
                onClick={toggleRepeat}
                aria-label="Repeat"
                className={`p-3 rounded-full transition-colors ${isRepeat ? 'text-accent bg-accent/10' : 'text-muted'}`}
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            {/* Volume + Lyrics Row */}
            <div className="flex items-center gap-4">
              {/* Mute toggle */}
              <button onClick={toggleMute} className="text-muted shrink-0" aria-label="Toggle Mute">
                {isMuted || volume === 0
                  ? <VolumeX className="w-5 h-5 text-accent" />
                  : <Volume2 className="w-5 h-5" />
                }
              </button>

              {/* Volume slider */}
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-surface rounded-full appearance-none cursor-pointer accent-accent"
                aria-label="Volume"
              />

              {/* Lyrics Button */}
              <button
                onClick={() => { toggleLyrics(); setIsMobileExpanded(false); }}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 font-mono shrink-0 ${
                  isLyricsOpen
                    ? 'bg-accent/15 border-accent text-accent'
                    : 'bg-surface border-surface text-muted'
                }`}
              >
                <FileText className="w-4 h-4" />
                LYRICS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────── PERSISTENT MINI PLAYER BAR (all screens) ─────────────────── */}
      <aside
        aria-label="Audio Player Controls"
        className="fixed bottom-0 left-0 right-0 z-40 bg-secondary/95 backdrop-blur-xl border-t border-surface/90 shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Seek Progress Line */}
        <div className="relative w-full h-1 bg-surface cursor-pointer">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Seek"
          />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-3">

          {/* ── LEFT: Track thumbnail + title (tap to expand on mobile) ── */}
          <button
            className="flex items-center gap-3 flex-1 min-w-0 md:max-w-[320px] text-left"
            onClick={() => setIsMobileExpanded(true)}
            aria-label="Expand player"
          >
            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-surface">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                sizes="44px"
                className={`object-cover transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-sm font-semibold truncate ${isPlaying ? 'text-foreground' : 'text-muted'}`}>
                {currentTrack.title}
              </span>
              <span className="text-[11px] text-muted truncate">
                {currentTrack.artist} <span className="text-accent/80">• {currentTrack.album}</span>
              </span>
            </div>
          </button>

          {/* ── CENTER: Core controls (desktop) / Compact controls (mobile) ── */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">

            {/* Prev — hidden on smallest screens */}
            <button
              onClick={prevTrack}
              aria-label="Previous"
              className="hidden sm:flex p-2 text-muted hover:text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center hover:bg-accent-hover active:scale-95 transition-all shadow-lg shadow-accent/20"
            >
              {isPlaying
                ? <Pause className="w-4 h-4 fill-current" />
                : <Play className="w-4 h-4 fill-current translate-x-0.5" />
              }
            </button>

            {/* Next */}
            <button
              onClick={nextTrack}
              aria-label="Next"
              className="p-2 text-muted hover:text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* ── RIGHT: Shuffle, Repeat, Volume, Lyrics (desktop only) | Expand (mobile) ── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Desktop extras */}
            <div className="hidden md:flex items-center gap-2">
              {/* Time display */}
              <span className="text-[11px] font-mono text-muted whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <button onClick={toggleShuffle} aria-label="Shuffle"
                className={`p-2 rounded-full transition-colors ${isShuffle ? 'text-accent bg-accent/10' : 'text-muted hover:text-foreground'}`}>
                <Shuffle className="w-4 h-4" />
              </button>

              <button onClick={toggleRepeat} aria-label="Repeat"
                className={`p-2 rounded-full transition-colors ${isRepeat ? 'text-accent bg-accent/10' : 'text-muted hover:text-foreground'}`}>
                <Repeat className="w-4 h-4" />
              </button>

              <button onClick={toggleLyrics} aria-label="Toggle Lyrics"
                className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 font-mono ${
                  isLyricsOpen ? 'bg-accent/15 border-accent text-accent' : 'bg-surface/50 border-surface text-muted hover:text-foreground'
                }`}>
                <FileText className="w-4 h-4" />
                <span className="hidden lg:inline">LYRICS</span>
              </button>

              <button onClick={toggleMute} aria-label="Mute" className="text-muted hover:text-foreground transition-colors p-1">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-accent" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range" min={0} max={1} step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
                aria-label="Volume"
              />
            </div>

            {/* Mobile: expand chevron */}
            <button
              onClick={() => setIsMobileExpanded(true)}
              className="md:hidden p-2 text-muted"
              aria-label="Open full player"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>

        </div>
      </aside>
    </>
  );
};
