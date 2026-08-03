# 🎵 Audio Files Directory

Place your MP3 audio files here.

## File Naming Convention
- `track-1.mp3`  → Song 1 audio file
- `track-2.mp3`  → Song 2 audio file
- `track-3.mp3`  → Song 3 audio file

## How to Use
After placing your `.mp3` files here, update `src/lib/audio/mockTracks.ts`:

```ts
audioUrl: '/audio/track-1.mp3',
```

## Supported Formats
- `.mp3`  ✅ (recommended)
- `.wav`  ✅
- `.ogg`  ✅
- `.aac`  ✅

## Notes
- All files in `/public/` are served as-is from the root URL.
- A file at `/public/audio/track-1.mp3` is accessible at `http://localhost:3000/audio/track-1.mp3`
- Vercel automatically serves all files in `/public/` on deployment.
- Keep individual files under 50MB for best Vercel compatibility.
- For larger files, use Supabase Storage (see root README).
