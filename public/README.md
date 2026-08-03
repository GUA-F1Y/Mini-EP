# Official Artist Portal — Public Assets

This folder contains all static files served directly by Next.js.

## Folder Structure
```
public/
├── audio/           ← Drop your .mp3 song files here
│   └── README.md
├── images/          ← Drop your cover art & photos here
│   └── README.md
└── README.md        ← This file
```

## Quick Start — Adding Your Songs

1. **Copy your `.mp3` files** into `public/audio/`:
   ```
   public/audio/track-1.mp3
   public/audio/track-2.mp3
   public/audio/track-3.mp3
   ```

2. **Copy your cover images** into `public/images/`:
   ```
   public/images/cover.jpg
   public/images/track-1-cover.jpg
   ```

3. **Update the track data** in `src/lib/audio/mockTracks.ts`:
   ```ts
   {
     title: 'Your Song Name',
     audioUrl: '/audio/track-1.mp3',
     coverUrl: '/images/track-1-cover.jpg',
     duration: 213,   // seconds
     lyrics: `Your lyrics here...`,
   }
   ```

4. **Save and refresh** — the player updates automatically!

## File Size Limits (Vercel Free Tier)
- Total deployment size: **100MB**
- For audio files larger than this, use **Supabase Storage** (free 1GB).

## How Files Are Served
A file at `public/audio/track-1.mp3` is accessible at:
- Local dev:  `http://localhost:3000/audio/track-1.mp3`
- Production: `https://your-domain.vercel.app/audio/track-1.mp3`
