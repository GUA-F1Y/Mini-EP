# 🖼️ Images Directory

Place your cover art and photos here.

## Recommended Files
| Filename              | Purpose                          | Recommended Size |
|-----------------------|----------------------------------|------------------|
| `cover.jpg`           | Main EP cover art                | 1200×1200px      |
| `track-1-cover.jpg`   | Track 1 artwork                  | 600×600px        |
| `track-2-cover.jpg`   | Track 2 artwork                  | 600×600px        |
| `track-3-cover.jpg`   | Track 3 artwork                  | 600×600px        |
| `og-image.jpg`        | Social share / OpenGraph image   | 1200×630px       |
| `artist-photo.jpg`    | About page artist photo          | 800×1000px       |

## How to Use
After placing images here, update `src/lib/audio/mockTracks.ts`:

```ts
coverUrl: '/images/cover.jpg',
```

Or update the EP info:

```ts
export const MINI_EP_INFO = {
  coverUrl: '/images/cover.jpg',
  ...
};
```

## Supported Formats
- `.jpg` / `.jpeg`  ✅ (recommended for photos)
- `.png`            ✅ (recommended for art with transparency)
- `.webp`           ✅ (best performance)
- `.avif`           ✅

## Notes
- Images in `/public/` are automatically optimized by Next.js `<Image>` component.
- Keep original files at high resolution — Next.js will resize and compress automatically.
