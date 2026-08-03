import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Track } from '@/types';
import { MOCK_TRACKS } from '@/lib/audio/mockTracks';

export const tracksService = {
  async getTracks(): Promise<Track[]> {
    if (!isSupabaseConfigured) {
      return MOCK_TRACKS;
    }

    try {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('track_number', { ascending: true });

      if (error || !data || data.length === 0) {
        return MOCK_TRACKS;
      }

      return data.map((item) => ({
        id: item.id,
        trackNumber: item.track_number,
        title: item.title,
        artist: item.artist,
        album: item.album,
        duration: item.duration,
        audioUrl: item.audio_url,
        coverUrl: item.cover_url,
        lyrics: item.lyrics || undefined,
        genre: item.genre || undefined,
        playsCount: item.plays_count,
        likesCount: item.likes_count,
        releaseDate: item.release_date,
      }));
    } catch {
      return MOCK_TRACKS;
    }
  },

  async likeTrack(trackId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase.rpc('increment_track_likes', {
        track_id: trackId,
      });

      return !error;
    } catch {
      return false;
    }
  },
};
