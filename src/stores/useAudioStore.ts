import { create } from 'zustand';
import { Track } from '@/types';
import { MOCK_TRACKS } from '@/lib/audio/mockTracks';
import { offlineCacheManager } from '@/lib/audio/offlineCache';

export type RepeatMode = 'none' | 'all' | 'one';

interface AudioState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  playbackRate: number;
  visualizerMode: 'bars' | 'wave' | 'circle';
  isLyricsOpen: boolean;
  isSettingsOpen: boolean;
  offlineTrackIds: string[];
  
  // Actions
  setTracks: (tracks: Track[]) => void;
  setCurrentTrackIndex: (index: number) => void;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  setPlaybackRate: (rate: number) => void;
  setVisualizerMode: (mode: 'bars' | 'wave' | 'circle') => void;
  setLyricsOpen: (open: boolean) => void;
  toggleLyrics: () => void;
  setSettingsOpen: (open: boolean) => void;
  toggleSettings: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  toggleOfflineTrack: (track: Track) => Promise<boolean>;
  refreshOfflineTracks: () => Promise<void>;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  tracks: MOCK_TRACKS,
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.85,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  isShuffle: false,
  repeatMode: 'none',
  playbackRate: 1.0,
  visualizerMode: 'bars',
  isLyricsOpen: false,
  isSettingsOpen: false,
  offlineTrackIds: [],

  setTracks: (tracks) => set({ tracks }),
  
  setCurrentTrackIndex: (index) => set({ currentTrackIndex: index, currentTime: 0 }),
  
  playTrack: (index) => {
    const { tracks } = get();
    if (index >= 0 && index < tracks.length) {
      set({
        currentTrackIndex: index,
        isPlaying: true,
        currentTime: 0,
      });
    }
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setIsPlaying: (playing) => set({ isPlaying: playing }),

  nextTrack: () => {
    const { currentTrackIndex, tracks, isShuffle, repeatMode } = get();
    if (tracks.length === 0) return;
    
    if (repeatMode === 'one') {
      set({ currentTime: 0, isPlaying: true });
      return;
    }

    let nextIdx: number;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * tracks.length);
    } else {
      nextIdx = (currentTrackIndex + 1) % tracks.length;
      if (nextIdx === 0 && repeatMode === 'none') {
        set({ isPlaying: false, currentTime: 0 });
        return;
      }
    }

    set({ currentTrackIndex: nextIdx, currentTime: 0, isPlaying: true });
  },

  prevTrack: () => {
    const { currentTrackIndex, tracks, currentTime } = get();
    if (tracks.length === 0) return;

    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }

    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    set({ currentTrackIndex: prevIdx, currentTime: 0, isPlaying: true });
  },

  seek: (time) => set({ currentTime: time }),

  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  cycleRepeatMode: () => set((state) => {
    const modes: RepeatMode[] = ['none', 'all', 'one'];
    const currentIdx = modes.indexOf(state.repeatMode);
    const nextMode = modes[(currentIdx + 1) % modes.length];
    return { repeatMode: nextMode };
  }),

  setPlaybackRate: (rate) => set({ playbackRate: rate }),

  setVisualizerMode: (visualizerMode) => set({ visualizerMode }),

  setLyricsOpen: (isLyricsOpen) => set({ isLyricsOpen }),
  
  toggleLyrics: () => set((state) => ({ isLyricsOpen: !state.isLyricsOpen })),

  setSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),

  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setDuration: (duration) => set({ duration }),

  toggleOfflineTrack: async (track: Track) => {
    const { offlineTrackIds } = get();
    const isCached = offlineTrackIds.includes(track.id);

    if (isCached) {
      await offlineCacheManager.removeTrackAudio(track.audioUrl);
      set({ offlineTrackIds: offlineTrackIds.filter((id) => id !== track.id) });
      return false;
    } else {
      const success = await offlineCacheManager.cacheTrackAudio(track.audioUrl);
      if (success) {
        set({ offlineTrackIds: [...offlineTrackIds, track.id] });
      }
      return success;
    }
  },

  refreshOfflineTracks: async () => {
    const { tracks } = get();
    const cachedIds: string[] = [];
    for (const track of tracks) {
      const isCached = await offlineCacheManager.isTrackCached(track.audioUrl);
      if (isCached) cachedIds.push(track.id);
    }
    set({ offlineTrackIds: cachedIds });
  },
}));
