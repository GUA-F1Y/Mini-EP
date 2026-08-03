import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GUAF1Y — JERSEY_MU.. (Official Mini EP Portal)',
    short_name: 'GUAF1Y',
    description: 'Official Artist Portal for JERSEY_MU.. Mini EP by GUAF1Y. Experience cinematic Jersey Club tracks, audio visualizer, lyrics, and fan wall.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#090909',
    theme_color: '#090909',
    scope: '/',
    icons: [
      {
        src: '/icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
