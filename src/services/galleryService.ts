import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { GalleryItem } from '@/types';
import { MOCK_GALLERY } from '@/lib/audio/mockTracks';

const VALID_CATEGORIES: ReadonlyArray<GalleryItem['category']> = ['Live', 'Studio', 'BTS', 'Editorial'];
const VALID_ASPECT_RATIOS: ReadonlyArray<NonNullable<GalleryItem['aspectRatio']>> = ['square', 'portrait', 'landscape'];

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

      return data.map((item) => {
        const category = (VALID_CATEGORIES as readonly string[]).includes(item.category)
          ? (item.category as GalleryItem['category'])
          : 'Studio';

        const aspectRatio = item.aspect_ratio && (VALID_ASPECT_RATIOS as readonly string[]).includes(item.aspect_ratio)
          ? (item.aspect_ratio as NonNullable<GalleryItem['aspectRatio']>)
          : 'landscape';

        return {
          id: item.id,
          title: item.title,
          imageUrl: item.image_url,
          category,
          aspectRatio,
          caption: item.caption || undefined,
          createdAt: item.created_at,
        };
      });
    } catch {
      return MOCK_GALLERY;
    }
  },
};

