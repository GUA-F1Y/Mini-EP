'use client';

import { useEffect } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';
import { updateMediaSession, updateMediaSessionPosition } from '@/lib/utils/mediaSession';

/**
 * Hook that syncs Media Session API with the current audio store state.
 * Enables lock screen controls, notification controls, and Bluetooth headset buttons.
 */
export function useMediaSession() {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
  } = useAudioStore();

  const currentTrack = tracks[currentTrackIndex];

  // Update metadata + action handlers whenever the track changes
  useEffect(() => {
    if (!currentTrack) return;

    updateMediaSession(currentTrack, {
      onPlay: () => {
        const state = useAudioStore.getState();
        if (!state.isPlaying) state.togglePlay();
      },
      onPause: () => {
        const state = useAudioStore.getState();
        if (state.isPlaying) state.togglePlay();
      },
      onNext: () => useAudioStore.getState().nextTrack(),
      onPrevious: () => useAudioStore.getState().prevTrack(),
      onSeek: (details) => {
        if (details.seekTime !== undefined) {
          useAudioStore.getState().seek(details.seekTime);
        }
      },
    });
  }, [currentTrack]);

  // Update playback state
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
  }, [isPlaying]);

  // Update position state on time change
  useEffect(() => {
    updateMediaSessionPosition(duration, currentTime, playbackRate);
  }, [currentTime, duration, playbackRate]);
}
