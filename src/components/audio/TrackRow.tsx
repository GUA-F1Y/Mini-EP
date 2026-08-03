'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Heart, FileText, Music2 } from 'lucide-react';
import { Track } from '@/types';
import { useAudioStore } from '@/stores/useAudioStore';
import { formatTime } from '@/lib/utils';

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
  } = useAudioStore();

  const [likes, setLikes] = useState(track.likesCount);
  const [hasLiked, setHasLiked] = useState(false);

  const isCurrentTrack = currentTrackIndex === index;

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
    }
  };

  const handleLyricsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex(index);
    toggleLyrics();
  };

  return (
    <div
      onClick={handlePlayClick}
      className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
        isCurrentTrack
          ? 'bg-accent/10 border-accent/60 shadow-lg shadow-accent/5'
          : 'bg-secondary/40 border-surface/60 hover:bg-secondary hover:border-surface'
      }`}
    >
      {/* Left Number & Cover & Title */}
      <div className="flex items-center gap-3 sm:gap-4 truncate">
        {/* Track Number / Play Icon */}
        <div className="w-8 flex items-center justify-center shrink-0">
          {isCurrentTrack && isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
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
              isCurrentTrack && isPlaying ? 'flex' : ''
            }`}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-4 h-4 text-accent" />
            ) : (
              <Play className="w-4 h-4 text-accent fill-current" />
            )}
          </button>
        </div>

        {/* Thumbnail */}
        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-surface">
          <Image
            src={track.coverUrl}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col truncate">
          <div className="flex items-center gap-2 truncate">
            <span
              className={`text-sm font-semibold truncate ${
                isCurrentTrack ? 'text-accent font-bold' : 'text-foreground'
              }`}
            >
              {track.title}
            </span>
            {track.isBonusTrack && (
              <span className="px-2 py-0.5 rounded-md bg-accent/20 border border-accent/40 text-accent text-[9px] font-mono font-bold uppercase tracking-wider shrink-0">
                BONUS TRACK
              </span>
            )}
          </div>
          <span className="text-xs text-muted truncate">
            {track.genre || 'Electronic'} • {track.artist}
          </span>
        </div>
      </div>

      {/* Right Metadata & Controls */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0 text-xs font-mono text-muted">
        {/* Plays count */}
        <span className="hidden md:inline-flex items-center gap-1">
          <Music2 className="w-3.5 h-3.5 text-accent/70" />
          {track.playsCount.toLocaleString()} plays
        </span>

        {/* Lyrics trigger */}
        {track.lyrics && (
          <button
            onClick={handleLyricsClick}
            className="p-1.5 rounded-md hover:bg-surface text-muted hover:text-accent transition-colors"
            title="Read Lyrics"
          >
            <FileText className="w-4 h-4" />
          </button>
        )}

        {/* Like button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
            hasLiked ? 'text-red-400 bg-red-500/10' : 'hover:bg-surface text-muted hover:text-foreground'
          }`}
          title="Like track"
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
