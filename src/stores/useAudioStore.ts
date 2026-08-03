import { create } from 'zustand';
import { Track } from '@/types';
import { MOCK_TRACKS } from '@/lib/audio/mockTracks';

interface AudioState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isShuffle: boolean;
  isRepeat: boolean;
  visualizerMode: 'bars' | 'wave' | 'circle';
  isLyricsOpen: boolean;
  
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
  toggleRepeat: () => void;
  setVisualizerMode: (mode: 'bars' | 'wave' | 'circle') => void;
  setLyricsOpen: (open: boolean) => void;
  toggleLyrics: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
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
  isRepeat: false,
  visualizerMode: 'bars',
  isLyricsOpen: false,

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
    const { currentTrackIndex, tracks, isShuffle, isRepeat } = get();
    if (tracks.length === 0) return;
    
    if (isRepeat) {
      set({ currentTime: 0, isPlaying: true });
      return;
    }

    let nextIdx: number;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * tracks.length);
    } else {
      nextIdx = (currentTrackIndex + 1) % tracks.length;
    }

    set({ currentTrackIndex: nextIdx, currentTime: 0, isPlaying: true });
  },

  prevTrack: () => {
    const { currentTrackIndex, tracks, currentTime } = get();
    if (tracks.length === 0) return;

    // If played more than 3 seconds, restart current track
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

  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),

  setVisualizerMode: (visualizerMode) => set({ visualizerMode }),

  setLyricsOpen: (isLyricsOpen) => set({ isLyricsOpen }),
  
  toggleLyrics: () => set((state) => ({ isLyricsOpen: !state.isLyricsOpen })),

  setCurrentTime: (currentTime) => set({ currentTime }),

  setDuration: (duration) => set({ duration }),
}));
