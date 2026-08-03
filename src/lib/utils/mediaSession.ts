import { Track } from '@/types';

interface MediaSessionCallbacks {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (details: MediaSessionActionDetails) => void;
}

export function updateMediaSession(
  track: Track | undefined,
  callbacks: MediaSessionCallbacks
) {
  if (typeof window === 'undefined' || !('mediaSession' in navigator) || !track) return;

  // Set Metadata
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.artist,
    album: track.album,
    artwork: [
      { src: track.coverUrl, sizes: '96x96', type: 'image/jpeg' },
      { src: track.coverUrl, sizes: '128x128', type: 'image/jpeg' },
      { src: track.coverUrl, sizes: '192x192', type: 'image/jpeg' },
      { src: track.coverUrl, sizes: '512x512', type: 'image/jpeg' },
    ],
  });

  // Action Handlers
  try {
    navigator.mediaSession.setActionHandler('play', callbacks.onPlay);
    navigator.mediaSession.setActionHandler('pause', callbacks.onPause);
    navigator.mediaSession.setActionHandler('previoustrack', callbacks.onPrevious);
    navigator.mediaSession.setActionHandler('nexttrack', callbacks.onNext);
    navigator.mediaSession.setActionHandler('seekto', callbacks.onSeek);
  } catch (e) {
    console.warn('[MediaSession Handler Warning]:', e);
  }
}

export function updateMediaSessionPosition(duration: number, currentTime: number, playbackRate: number = 1.0) {
  if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

  if ('setPositionState' in navigator.mediaSession && duration > 0 && !isNaN(currentTime)) {
    try {
      navigator.mediaSession.setPositionState({
        duration: duration,
        playbackRate: playbackRate,
        position: Math.min(currentTime, duration),
      });
    } catch (e) {
      console.warn('[MediaSession Position Warning]:', e);
    }
  }
}
