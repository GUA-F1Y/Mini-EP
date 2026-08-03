import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { FanMessage } from '@/types';
import { MOCK_FAN_MESSAGES } from '@/lib/audio/mockTracks';

export const fanWallService = {
  async getMessages(): Promise<FanMessage[]> {
    if (!isSupabaseConfigured) {
      return MOCK_FAN_MESSAGES;
    }

    try {
      const { data, error } = await supabase
        .from('fan_messages')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Supabase fetch error, fallback to mock:', error);
        return MOCK_FAN_MESSAGES;
      }

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        location: item.location || 'Worldwide',
        message: item.message,
        likesCount: item.likes_count,
        createdAt: item.created_at,
        isApproved: item.is_approved,
      }));
    } catch {
      return MOCK_FAN_MESSAGES;
    }
  },

  async postMessage(name: string, location: string, message: string): Promise<FanMessage | null> {
    if (!isSupabaseConfigured) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('fan_messages')
        .insert({
          name: name.trim() || 'Anonymous Fan',
          location: location.trim() || 'Worldwide',
          message: message.trim(),
          likes_count: 1,
          is_approved: true,
        })
        .select()
        .single();

      if (error || !data) {
        console.error('Supabase error posting message:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        location: data.location || 'Worldwide',
        message: data.message,
        likesCount: data.likes_count,
        createdAt: data.created_at,
        isApproved: data.is_approved,
      };
    } catch (e) {
      console.error('Error posting fan message:', e);
      return null;
    }
  },

  async likeMessage(msgId: string): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { error } = await supabase.rpc('increment_fan_message_likes', {
        msg_id: msgId,
      });

      if (error) {
        console.error('Error incrementing likes on Supabase:', error);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
};
