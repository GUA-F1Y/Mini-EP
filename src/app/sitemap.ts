import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guaf1y.vercel.app';

  const routes = [
    '',
    '/music',
    '/lyrics',
    '/gallery',
    '/fan-wall',
    '/about',
    '/contact',
    '/credits',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '/fan-wall' ? 'always' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
