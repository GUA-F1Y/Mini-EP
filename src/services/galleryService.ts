import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { GalleryItem } from '@/types';
import { MOCK_GALLERY } from '@/lib/audio/mockTracks';

export const galleryService = {
  async getGalleryItems(): Promise<GalleryItem[]> {
    if (!isSupabaseConfigured) {
      return MOCK_GALLERY;
    }

    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return MOCK_GALLERY;
      }

      return data.map((item) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url,
        category: (item.category as GalleryItem['category']) || 'Studio',
        aspectRatio: (item.aspect_ratio as GalleryItem['aspectRatio']) || 'landscape',
        caption: item.caption || undefined,
        createdAt: item.created_at,
      }));
    } catch {
      return MOCK_GALLERY;
    }
  },
};
