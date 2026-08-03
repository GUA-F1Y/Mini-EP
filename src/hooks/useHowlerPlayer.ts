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
    currentTime,
    seek,
    nextTrack,
    setCurrentTime,
    setDuration,
    setIsPlaying,
  } = useAudioStore();

  const soundRef = useRef<Howl | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // Initialize and handle track change
  useEffect(() => {
    if (!currentTrack) return;

    // Clean up previous howl
    if (soundRef.current) {
      soundRef.current.unload();
      soundRef.current = null;
    }

    const sound = new Howl({
      src: [currentTrack.audioUrl],
      html5: true, // enables streaming for long audio files
      volume: isMuted ? 0 : volume,
      onplay: () => {
        setIsPlaying(true);
        if (soundRef.current) {
          setDuration(soundRef.current.duration() || currentTrack.duration);
        }
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => {
        nextTrack();
      },
      onload: () => {
        if (soundRef.current) {
          setDuration(soundRef.current.duration());
        }
      },
      onloaderror: (_id, error) => {
        console.warn('Audio load error fallback:', error);
      },
    });

    soundRef.current = sound;

    if (isPlaying) {
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
