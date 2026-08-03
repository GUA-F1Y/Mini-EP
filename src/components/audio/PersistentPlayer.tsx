'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Shuffle, Repeat, Repeat1,
  FileText, ChevronDown, ChevronUp,
  Download, CheckCircle, Gauge,
  WifiOff,
} from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';
import { useHowlerPlayer } from '@/hooks/useHowlerPlayer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useMediaSession } from '@/hooks/useMediaSession';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { useToastStore } from '@/stores/useToastStore';
import { formatTime } from '@/lib/utils';
import { LyricsDrawer } from './LyricsDrawer';
import { Track } from '@/types';

const RATE_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];

export const PersistentPlayer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [showRatePicker, setShowRatePicker] = useState(false);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());

  React.useEffect(() => { setMounted(true); }, []);

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
    repeatMode,
    playbackRate,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    setPlaybackRate,
    toggleLyrics,
    isLyricsOpen,
    offlineTrackIds,
    toggleOfflineTrack,
  } = useAudioStore();

  const { performSeek } = useHowlerPlayer();
  useKeyboardShortcuts();
  useMediaSession();
  useServiceWorker();

  const { addToast } = useToastStore();

  const currentTrack = tracks[currentTrackIndex];

  const handleDownload = useCallback(async (track: Track) => {
    if (downloadingIds.has(track.id)) return;
    const isCached = offlineTrackIds.includes(track.id);

    if (isCached) {
      await toggleOfflineTrack(track);
      addToast({ message: `Removed "${track.title}" from offline`, type: 'info' });
      return;
    }

    setDownloadingIds((prev) => new Set(prev).add(track.id));
    addToast({ message: `Caching "${track.title}" for offline…`, type: 'info' });

    const success = await toggleOfflineTrack(track);
    setDownloadingIds((prev) => {
      const next = new Set(prev);
      next.delete(track.id);
      return next;
    });

    if (success) {
      addToast({ message: `"${track.title}" is now available offline`, type: 'success' });
    } else {
      addToast({ message: `Failed to cache "${track.title}"`, type: 'error' });
    }
  }, [downloadingIds, offlineTrackIds, toggleOfflineTrack, addToast]);

  if (!mounted || !currentTrack) return null;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    performSeek(parseFloat(e.target.value));
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isCurrentOffline = offlineTrackIds.includes(currentTrack.id);
  const isCurrentDownloading = downloadingIds.has(currentTrack.id);

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;
  const repeatActive = repeatMode !== 'none';

  return (
    <>
      <LyricsDrawer />

      {/* ─── MOBILE FULL-SCREEN PLAYER SHEET ─── */}
      {isMobileExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full Screen Player"
          className="fixed inset-0 z-50 md:hidden flex flex-col bg-background/98 backdrop-blur-3xl"
        >
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-surface/80" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-2">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">Now Playing</span>
            <button
              onClick={() => setIsMobileExpanded(false)}
              className="p-2 rounded-full bg-surface/60 text-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close full player"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Album Art */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
            <div className="relative w-64 h-64 rounded-3xl overflow-hidden border border-surface shadow-2xl shadow-accent/10">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill
                sizes="(max-width: 768px) 256px, 300px"
                className={`object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent" />
              )}
              {isCurrentOffline && (
                <div className="absolute top-2 right-2 bg-accent/90 text-background rounded-full p-1">
                  <WifiOff className="w-3 h-3" />
                </div>
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
              <div className="relative w-full h-2 bg-surface rounded-full">
                <div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
                <input
                  type="range" min={0} max={duration || 100}
                  value={currentTime} onChange={handleSeekChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Seek position"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-between px-2">
              <button onClick={toggleShuffle} aria-label={isShuffle ? 'Shuffle on' : 'Shuffle off'}
                className={`p-3 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${isShuffle ? 'text-accent bg-accent/10' : 'text-muted'}`}>
                <Shuffle className="w-5 h-5" />
              </button>

              <button onClick={prevTrack} aria-label="Previous track"
                className="p-3 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center">
                <SkipBack className="w-7 h-7" />
              </button>

              <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-16 h-16 rounded-full bg-accent text-background flex items-center justify-center shadow-2xl shadow-accent/30 hover:bg-accent-hover active:scale-95 transition-all">
                {isPlaying
                  ? <Pause className="w-7 h-7 fill-current" />
                  : <Play className="w-7 h-7 fill-current translate-x-0.5" />
                }
              </button>

              <button onClick={nextTrack} aria-label="Next track"
                className="p-3 text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center">
                <SkipForward className="w-7 h-7" />
              </button>

              <button onClick={cycleRepeatMode} aria-label={`Repeat mode: ${repeatMode}`}
                className={`p-3 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${repeatActive ? 'text-accent bg-accent/10' : 'text-muted'}`}>
                <RepeatIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Volume + Extras Row */}
            <div className="flex items-center gap-4">
              <button onClick={toggleMute} className="text-muted shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Toggle mute">
                {isMuted || volume === 0
                  ? <VolumeX className="w-5 h-5 text-accent" />
                  : <Volume2 className="w-5 h-5" />
                }
              </button>

              <input type="range" min={0} max={1} step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-surface rounded-full appearance-none cursor-pointer accent-accent"
                aria-label="Volume"
              />

              {/* Offline Download */}
              <button
                onClick={() => handleDownload(currentTrack)}
                disabled={isCurrentDownloading}
                aria-label={isCurrentOffline ? 'Remove from offline' : 'Save for offline'}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 font-mono shrink-0 min-h-[44px] min-w-[44px] justify-center transition-colors ${
                  isCurrentOffline
                    ? 'bg-accent/15 border-accent text-accent'
                    : 'bg-surface border-surface text-muted'
                } ${isCurrentDownloading ? 'animate-pulse' : ''}`}
              >
                {isCurrentOffline
                  ? <CheckCircle className="w-4 h-4" />
                  : <Download className="w-4 h-4" />
                }
              </button>

              {/* Lyrics Button */}
              <button
                onClick={() => { toggleLyrics(); setIsMobileExpanded(false); }}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 font-mono shrink-0 min-h-[44px] justify-center transition-colors ${
                  isLyricsOpen ? 'bg-accent/15 border-accent text-accent' : 'bg-surface border-surface text-muted'
                }`}
              >
                <FileText className="w-4 h-4" />
                LYRICS
              </button>
            </div>

            {/* Playback Speed Row */}
            <div className="flex items-center justify-center gap-2">
              <Gauge className="w-4 h-4 text-muted" />
              <div className="flex gap-1">
                {RATE_OPTIONS.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                      playbackRate === rate
                        ? 'bg-accent text-background font-bold'
                        : 'bg-surface text-muted hover:text-foreground'
                    }`}
                    aria-label={`Set playback speed to ${rate}x`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── PERSISTENT MINI PLAYER BAR ─── */}
      <aside
        aria-label="Audio Player Controls"
        className="fixed bottom-0 left-0 right-0 z-40 bg-secondary/95 backdrop-blur-xl border-t border-surface/90 shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Seek Progress Line */}
        <div className="relative w-full h-1 bg-surface cursor-pointer group">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-100 group-hover:bg-accent/80"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range" min={0} max={duration || 100}
            value={currentTime} onChange={handleSeekChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Seek"
          />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-3">

          {/* LEFT: Track info — tap to expand on mobile */}
          <button
            className="flex items-center gap-3 flex-1 min-w-0 md:max-w-[320px] text-left"
            onClick={() => setIsMobileExpanded(true)}
            aria-label="Expand player"
          >
            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-surface">
              <Image
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                fill sizes="44px"
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

          {/* CENTER: Core controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button onClick={prevTrack} aria-label="Previous"
              className="hidden sm:flex p-2 text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] items-center justify-center">
              <SkipBack className="w-5 h-5" />
            </button>

            <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-10 h-10 rounded-full bg-accent text-background flex items-center justify-center hover:bg-accent-hover active:scale-95 transition-all shadow-lg shadow-accent/20">
              {isPlaying
                ? <Pause className="w-4 h-4 fill-current" />
                : <Play className="w-4 h-4 fill-current translate-x-0.5" />
              }
            </button>

            <button onClick={nextTrack} aria-label="Next"
              className="p-2 text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* RIGHT: Desktop extras */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[11px] font-mono text-muted whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <button onClick={toggleShuffle} aria-label="Shuffle"
                className={`p-2 rounded-full transition-colors ${isShuffle ? 'text-accent bg-accent/10' : 'text-muted hover:text-foreground'}`}>
                <Shuffle className="w-4 h-4" />
              </button>

              <button onClick={cycleRepeatMode} aria-label={`Repeat: ${repeatMode}`}
                className={`p-2 rounded-full transition-colors ${repeatActive ? 'text-accent bg-accent/10' : 'text-muted hover:text-foreground'}`}>
                <RepeatIcon className="w-4 h-4" />
              </button>

              {/* Playback Speed Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowRatePicker((v) => !v)}
                  aria-label="Playback speed"
                  className="p-2 rounded-lg text-[11px] font-mono text-muted hover:text-foreground bg-surface/50 border border-surface transition-colors min-w-[44px] text-center"
                >
                  {playbackRate}x
                </button>
                {showRatePicker && (
                  <div className="absolute bottom-full right-0 mb-2 bg-secondary border border-surface rounded-xl p-1.5 flex flex-col gap-0.5 shadow-2xl min-w-[72px] z-50">
                    {RATE_OPTIONS.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => { setPlaybackRate(rate); setShowRatePicker(false); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono text-left transition-colors ${
                          playbackRate === rate ? 'bg-accent text-background font-bold' : 'text-muted hover:text-foreground hover:bg-surface/50'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
              className="md:hidden p-2 text-muted min-h-[44px] min-w-[44px] flex items-center justify-center"
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
