const AUDIO_CACHE_NAME = 'guaf1y-audio-cache';
const MAX_CACHE_BYTES = 500 * 1024 * 1024; // 500 MB limit

export const offlineCacheManager = {
  /**
   * Cache a track audio file by URL
   */
  async cacheTrackAudio(audioUrl: string): Promise<boolean> {
    if (typeof window === 'undefined' || !('caches' in window)) return false;

    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      const match = await cache.match(audioUrl);
      if (match) return true; // Already cached

      const response = await fetch(audioUrl);
      if (!response.ok) return false;

      await cache.put(audioUrl, response.clone());
      await this.enforceLRULimit();
      return true;
    } catch (e) {
      console.warn('[Offline Cache Error]:', e);
      return false;
    }
  },

  /**
   * Remove a cached track by URL
   */
  async removeTrackAudio(audioUrl: string): Promise<boolean> {
    if (typeof window === 'undefined' || !('caches' in window)) return false;

    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      return await cache.delete(audioUrl);
    } catch {
      return false;
    }
  },

  /**
   * Check if an audio URL is cached offline
   */
  async isTrackCached(audioUrl: string): Promise<boolean> {
    if (typeof window === 'undefined' || !('caches' in window)) return false;

    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      const match = await cache.match(audioUrl);
      return Boolean(match);
    } catch {
      return false;
    }
  },

  /**
   * Get total estimated bytes used by audio cache
   */
  async getCacheSize(): Promise<{ sizeInBytes: number; formattedSize: string }> {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return { sizeInBytes: 0, formattedSize: '0 MB' };
    }

    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      const requests = await cache.keys();
      let totalBytes = 0;

      for (const req of requests) {
        const res = await cache.match(req);
        if (res) {
          const blob = await res.blob();
          totalBytes += blob.size;
        }
      }

      const formatted = (totalBytes / (1024 * 1024)).toFixed(1) + ' MB';
      return { sizeInBytes: totalBytes, formattedSize: formatted };
    } catch {
      return { sizeInBytes: 0, formattedSize: '0 MB' };
    }
  },

  /**
   * Clear all cached audio files
   */
  async clearAllAudioCache(): Promise<boolean> {
    if (typeof window === 'undefined' || !('caches' in window)) return false;

    try {
      return await caches.delete(AUDIO_CACHE_NAME);
    } catch {
      return false;
    }
  },

  /**
   * Evict old entries if total cache size exceeds MAX_CACHE_BYTES (500 MB)
   */
  async enforceLRULimit(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;

    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      const keys = Array.from(await cache.keys());
      let { sizeInBytes } = await this.getCacheSize();

      while (sizeInBytes > MAX_CACHE_BYTES && keys.length > 0) {
        const oldestRequest = keys.shift();
        if (oldestRequest) {
          await cache.delete(oldestRequest);
          const current = await this.getCacheSize();
          sizeInBytes = current.sizeInBytes;
        }
      }
    } catch (e) {
      console.warn('[Cache LRU Eviction Warning]:', e);
    }
  },
};
