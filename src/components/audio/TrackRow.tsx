'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, Heart, FileText, Music2, Download, CheckCircle, Share2, Loader2 } from 'lucide-react';
import { Track } from '@/types';
import { useAudioStore } from '@/stores/useAudioStore';
import { useToastStore } from '@/stores/useToastStore';
import { formatTime } from '@/lib/utils';
import { shareContent } from '@/lib/utils/share';

interface TrackRowProps {
  track: Track;
  index: number;
}

export const TrackRow: React.FC<TrackRowProps> = ({ track, index }) => {
  const {
    currentTrackIndex,
    isPlaying,
    playTrack,
    togglePlay,
    toggleLyrics,
    setCurrentTrackIndex,
    offlineTrackIds,
    toggleOfflineTrack,
  } = useAudioStore();

  const { addToast } = useToastStore();

  const [likes, setLikes] = useState(track.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const isCurrentTrack = currentTrackIndex === index;
  const isOffline = offlineTrackIds.includes(track.id);

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(index);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      addToast({ message: `Liked "${track.title}"`, type: 'success', duration: 2000 });
    }
  };

  const handleLyricsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex(index);
    toggleLyrics();
  };

  const handleDownload = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading) return;

    if (isOffline) {
      await toggleOfflineTrack(track);
      addToast({ message: `Removed "${track.title}" from offline`, type: 'info' });
      return;
    }

    setIsDownloading(true);
    addToast({ message: `Saving "${track.title}" for offline…`, type: 'info' });

    const success = await toggleOfflineTrack(track);
    setIsDownloading(false);

    if (success) {
      addToast({ message: `"${track.title}" saved for offline`, type: 'success' });
    } else {
      addToast({ message: `Could not save "${track.title}"`, type: 'error' });
    }
  }, [isDownloading, isOffline, track, toggleOfflineTrack, addToast]);

  const handleShare = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await shareContent({
      title: `${track.title} — ${track.artist}`,
      text: `Listen to ${track.title} by ${track.artist} on the GUAF1Y official portal`,
      url: window.location.origin + '/music',
    });
    if (result === 'copied') {
      addToast({ message: 'Link copied to clipboard', type: 'success', duration: 2000 });
    }
  }, [track, addToast]);

  return (
    <div
      onClick={handlePlayClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePlayClick(); } }}
      aria-label={`${isCurrentTrack && isPlaying ? 'Pause' : 'Play'} ${track.title}`}
      className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
        isCurrentTrack
          ? 'bg-accent/10 border-accent/60 shadow-lg shadow-accent/5'
          : 'bg-secondary/40 border-surface/60 hover:bg-secondary hover:border-surface'
      }`}
    >
      {/* Left: Track Number / Visualizer + Cover + Info */}
      <div className="flex items-center gap-3 sm:gap-4 truncate min-w-0">
        {/* Track Number / Playing Indicator */}
        <div className="w-8 flex items-center justify-center shrink-0">
          {isCurrentTrack && isPlaying ? (
            <div className="flex items-end gap-0.5 h-4" aria-label="Playing">
              <span className="w-1 bg-accent h-full animate-bounce" />
              <span className="w-1 bg-accent h-2/3 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1 bg-accent h-4/5 animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : (
            <span className="text-sm font-mono text-muted group-hover:hidden">
              {String(track.trackNumber).padStart(2, '0')}
            </span>
          )}
          <button
            className={`hidden group-hover:flex items-center justify-center text-accent ${
              isCurrentTrack && isPlaying ? '!flex' : ''
            }`}
            tabIndex={-1}
            aria-hidden="true"
          >
            {isCurrentTrack && isPlaying
              ? <Pause className="w-4 h-4 text-accent" />
              : <Play className="w-4 h-4 text-accent fill-current" />
            }
          </button>
        </div>

        {/* Thumbnail */}
        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-surface">
          <Image
            src={track.coverUrl}
            alt={track.title}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col truncate min-w-0">
          <div className="flex items-center gap-2 truncate">
            <span className={`text-sm font-semibold truncate ${isCurrentTrack ? 'text-accent font-bold' : 'text-foreground'}`}>
              {track.title}
            </span>
            {track.isBonusTrack && (
              <span className="px-2 py-0.5 rounded-md bg-accent/20 border border-accent/40 text-accent text-[9px] font-mono font-bold uppercase tracking-wider shrink-0">
                BONUS
              </span>
            )}
            {isOffline && (
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" title="Available offline" aria-label="Available offline" />
            )}
          </div>
          <span className="text-xs text-muted truncate">
            {track.genre || 'Electronic'} • {track.artist}
          </span>
        </div>
      </div>

      {/* Right: Metadata & Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-xs font-mono text-muted">
        {/* Plays count */}
        <span className="hidden lg:inline-flex items-center gap-1">
          <Music2 className="w-3.5 h-3.5 text-accent/70" />
          {track.playsCount.toLocaleString()}
        </span>

        {/* Share */}
        <button
          onClick={handleShare}
          className="p-1.5 rounded-md hover:bg-surface text-muted hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={`Share ${track.title}`}
          title="Share track"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Lyrics */}
        {track.lyrics && (
          <button
            onClick={handleLyricsClick}
            className="p-1.5 rounded-md hover:bg-surface text-muted hover:text-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`View lyrics for ${track.title}`}
            title="Read Lyrics"
          >
            <FileText className="w-4 h-4" />
          </button>
        )}

        {/* Offline Download */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`p-1.5 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
            isOffline
              ? 'text-accent hover:text-accent/70'
              : 'text-muted hover:text-foreground hover:bg-surface'
          }`}
          aria-label={isOffline ? `Remove "${track.title}" from offline` : `Save "${track.title}" for offline`}
          title={isOffline ? 'Remove from offline' : 'Save for offline'}
        >
          {isDownloading
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : isOffline
              ? <CheckCircle className="w-4 h-4" />
              : <Download className="w-4 h-4" />
          }
        </button>

        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors min-h-[44px] ${
            hasLiked ? 'text-red-400 bg-red-500/10' : 'hover:bg-surface text-muted hover:text-foreground'
          }`}
          aria-label={hasLiked ? 'Unlike track' : 'Like track'}
          aria-pressed={hasLiked}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
          <span className="text-[11px]">{likes}</span>
        </button>

        {/* Duration */}
        <span className="w-12 text-right">{formatTime(track.duration)}</span>
      </div>
    </div>
  );
};
