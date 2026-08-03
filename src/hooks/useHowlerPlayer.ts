'use client';

import { useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useAudioStore } from '@/stores/useAudioStore';

export function useHowlerPlayer() {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    isMuted,
    seek,
    nextTrack,
    setCurrentTime,
    setDuration,
    setIsPlaying,
  } = useAudioStore();

  const soundRef = useRef<Howl | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // Callback refs to maintain stable effect dependencies
  const cbRef = useRef({ nextTrack, setDuration, setIsPlaying, currentTrack, volume, isMuted, isPlaying });
  useEffect(() => {
    cbRef.current = { nextTrack, setDuration, setIsPlaying, currentTrack, volume, isMuted, isPlaying };
  });

  // Initialize and handle track change
  useEffect(() => {
    const activeTrack = cbRef.current.currentTrack;
    if (!activeTrack) return;

    // Clean up previous howl
    if (soundRef.current) {
      soundRef.current.unload();
      soundRef.current = null;
    }

    const sound = new Howl({
      src: [activeTrack.audioUrl],
      html5: true, // enables streaming for long audio files
      volume: cbRef.current.isMuted ? 0 : cbRef.current.volume,
      onplay: () => {
        cbRef.current.setIsPlaying(true);
        if (soundRef.current) {
          cbRef.current.setDuration(soundRef.current.duration() || activeTrack.duration);
        }
      },
      onpause: () => cbRef.current.setIsPlaying(false),
      onstop: () => cbRef.current.setIsPlaying(false),
      onend: () => {
        cbRef.current.nextTrack();
      },
      onload: () => {
        if (soundRef.current) {
          cbRef.current.setDuration(soundRef.current.duration());
        }
      },
      onloaderror: (_id, error) => {
        console.warn('Audio load error fallback:', error);
      },
    });

    soundRef.current = sound;

    if (cbRef.current.isPlaying) {
      sound.play();
    }

    return () => {
      sound.unload();
    };
  }, [currentTrackIndex, currentTrack?.audioUrl]);

  // Handle Play / Pause changes
  useEffect(() => {
    if (!soundRef.current) return;

    if (isPlaying) {
      if (!soundRef.current.playing()) {
        soundRef.current.play();
      }
    } else {
      if (soundRef.current.playing()) {
        soundRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle Volume & Mute changes
  useEffect(() => {
    if (!soundRef.current) return;
    soundRef.current.volume(isMuted ? 0 : volume);
    Howler.volume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  // Handle position tracking loop
  useEffect(() => {
    const updateTime = () => {
      if (soundRef.current && soundRef.current.playing()) {
        const pos = soundRef.current.seek() as number;
        if (typeof pos === 'number' && !isNaN(pos)) {
          setCurrentTime(pos);
        }
      }
      animFrameRef.current = requestAnimationFrame(updateTime);
    };

    animFrameRef.current = requestAnimationFrame(updateTime);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [setCurrentTime]);

  // Handle Seeking
  const performSeek = (newTime: number) => {
    if (soundRef.current) {
      soundRef.current.seek(newTime);
      seek(newTime);
    }
  };

  return {
    sound: soundRef.current,
    performSeek,
  };
}
