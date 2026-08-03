# 🎵 GUAF1Y — JERSEY_MU.. (Official Artist Portal)

> **Official Digital Experience & Artist Portal for the *JERSEY_MU..* Mini EP by GUAF1Y.**  
> Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Howler.js, Zustand, and Supabase.

![EP Cover Artwork](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop)

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) + TypeScript
- **Styling**: Tailwind CSS (Dark Luxury Aesthetic `#090909`, Metallic Champagne Gold `#D4AF37`)
- **Audio Engine**: Howler.js (Cross-page seamless playback + Web Audio API visualizer)
- **State Management**: Zustand (Global player state & optimistic fan wall state)
- **Animations**: Framer Motion (Page transitions & micro-animations)
- **Database & Backend**: Supabase (PostgreSQL, Realtime Fan Wall, Contact Submissions)
- **Deployment**: Vercel Ready

---

## 💿 Official Tracklist

| # | Track Title | Artist | Producers | Audio File | Type |
|---|-------------|--------|-----------|------------|------|
| **01** | **Kamu Pt. I** | GUAF1Y | EUREKA BEATS & GUAF1Y | `/audio/Kamu_PtI.mp3` | Main EP |
| **02** | **Kamu Pt. II** | GUAF1Y | EUREKA BEATS & GUAF1Y | `/audio/Kamu_PtII.mp3` | Main EP |
| **03** | **Jadi Rockstar** | GUAF1Y | EUREKA BEATS & GUAF1Y | `/audio/Jadi_Rockstar.mp3` | Main EP |
| **04** | **Let It Through** | GUAF1Y | EUREKA BEATS & GUAF1Y | `/audio/let_it_through.mp3` | 🌟 **Bonus Track** |

---

## 🌟 Key Features

1. **Persistent Global Audio Player**:
   - Audio playback continues without interruption when navigating across pages.
   - Core controls: Play, Pause, Next, Prev, Seek bar, Volume slider, Mute toggle, Shuffle, Repeat.
   - Global Keyboard Shortcuts: `Space` / `K` (Play/Pause), `M` (Mute), `N` (Next), `P` (Previous), `Arrow Keys` (Seek/Volume).

2. **Mobile-First Full-Screen Sheet**:
   - Tapping the bottom mini player bar on mobile expands a full-screen sheet with large album artwork, seek slider, and touch-optimised controls.

3. **HTML5 Canvas Audio Visualizer**:
   - Dynamic real-time visualizer canvas supporting **Frequency Bars**, **Waveform**, and **Circular Pulsing** modes.

4. **Synchronized Lyrics Reader**:
   - Slide-over drawer with full track lyrics, line copying, quick play trigger, and track switcher.

5. **Live Fan Wall**:
   - Interactive message wall allowing fans to submit notes, location tags, and optimistic likes.

6. **Editorial Media Gallery**:
   - High-resolution photo gallery featuring BTS studio sessions, live shows, and lightbox modals.

7. **Admin Dashboard**:
   - Analytics metrics overview (Total Plays, Likes, Listeners, Fan Wall moderation).

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the repository:
```bash
git clone https://github.com/GUA-F1Y/Mini-EP.git
cd Mini-EP
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 How to Add or Change Songs

1. Drop your `.mp3` audio files into:
   ```
   public/audio/
   ```
2. Update track details in `src/lib/audio/mockTracks.ts`:
   ```ts
   {
     id: 'track-1',
     title: 'Your Song Title',
     artist: 'GUAF1Y',
     album: 'JERSEY_MU..',
     audioUrl: '/audio/your-song.mp3',
     duration: 180, // duration in seconds
     lyrics: `Your song lyrics here...`,
   }
   ```

---

## 🗄️ Supabase Configuration (Optional)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Execute the database schema inside [`src/lib/supabase/schema.sql`](src/lib/supabase/schema.sql) in your Supabase SQL Editor to set up `tracks`, `fan_messages`, `contact_submissions`, and `gallery` tables.

---

## 🌐 Deploy to Vercel

```bash
npx vercel
```
Or import the repository directly on [Vercel Dashboard](https://vercel.com).

---

## 📜 Credits & Production

- **Executive Producer / Artist**: GUAF1Y
- **Beat Producer & Composer**: EUREKA BEATS
- **Sound Design & Production**: EUREKA BEATS & GUAF1Y
- **Mixing & Mastering**: EUREKA BEATS & GUAF1Y
- **Vocal Performance & Lyrics**: GUAF1Y
- **Streaming**: [YouTube Channel (@GuaF1y01)](https://www.youtube.com/@GuaF1y01)

---

© 2026 **GUAF1Y**. All rights reserved.
