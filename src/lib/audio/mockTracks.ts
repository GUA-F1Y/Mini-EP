import { Track, FanMessage, GalleryItem, CreditItem, AnalyticsSummary } from '@/types';

// ┌─────────────────────────────────────────────────────────────────────┐
// │  CUSTOMIZE: Update your EP metadata here                           │
// └─────────────────────────────────────────────────────────────────────┘
export const MINI_EP_INFO = {
  title: 'JERSEY_MU..',
  artist: 'GUAF1Y',
  releaseYear: '2026',
  genre: 'Cinematic Electronic / Modern Dark Pop',
  // Replace with your own cover image:
  //  - Local:    '/images/cover.jpg'  (put file in /public/images/)
  //  - Supabase: 'https://xxx.supabase.co/storage/v1/object/public/images/cover.jpg'
  coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  description: 'An immersive 3-track digital soundscape exploring nocturnal synth textures, hypnotic basslines, and raw emotional resonance.',
  // Replace with your real streaming links:
  spotifyUrl: 'https://spotify.com',
  appleMusicUrl: 'https://apple.com',
  // Replace with your real YouTube channel or playlist URL:
  youtubeUrl: 'https://www.youtube.com/@GuaF1y01',
};

// ╔══════════════════════════════════════════════════════════════════════╗
// ║                  HOW TO ADD YOUR OWN SONGS                        ║
// ╠══════════════════════════════════════════════════════════════════════╣
// ║                                                                    ║
// ║  OPTION A — LOCAL FILES (Easiest, works for Vercel deploy):        ║
// ║    1. Create folder: /public/audio/                                ║
// ║    2. Copy your .mp3 files there, e.g. /public/audio/song1.mp3    ║
// ║    3. Set audioUrl to: '/audio/song1.mp3'                         ║
// ║                                                                    ║
// ║  OPTION B — Supabase Storage (for large files):                   ║
// ║    1. Go to Supabase → Storage → Create bucket "audio"             ║
// ║    2. Set bucket to Public                                         ║
// ║    3. Upload your .mp3 files                                       ║
// ║    4. Copy the public URL and paste into audioUrl below           ║
// ║                                                                    ║
// ║  OPTION C — Any direct .mp3 URL (CDN, S3, Cloudinary, etc.)       ║
// ║                                                                    ║
// ║  FIELDS TO UPDATE PER TRACK:                                       ║
// ║    title     → Your song name                                     ║
// ║    duration  → Length in seconds (3:45 = 225, 2:14 = 134)        ║
// ║    audioUrl  → Path or URL to your .mp3 file                     ║
// ║    coverUrl  → Path or URL to your track artwork image            ║
// ║    lyrics    → Your full song lyrics                              ║
// ║    producers → Your producer name(s)                              ║
// ║    genre     → Your genre label                                   ║
// ╚══════════════════════════════════════════════════════════════════════╝

export const MOCK_TRACKS: Track[] = [
  {
    // ── TRACK 1 ──────────────────────────────────────────────────────────
    id: 'track-1',
    title: 'Kamu Pt. I',
    artist: 'GUAF1Y',
    album: 'JERSEY_MU..',
    trackNumber: 1,
    duration: 120,
    audioUrl: '/audio/Kamu_PtI.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
    playsCount: 10,
    likesCount: 5,
    releaseDate: '2026-08-01',
    producers: ['EUREKA BEATS', 'GUAF1Y'],
    genre: 'Jersey Club',
    lyrics: `[Pre-Chorus]
ini semua bermula
di awal kita berjumpa
di taman, kita berdua
saling bertatap mata
senyum mu buat aku jadi terpesona
bolehkah aku tau, nama kamu siapa
yeah

[Chorus]
ku ingin dekat mu selamanya
dekat dengan mu aku rasa bahagia
biar aku jadi yang pertama
cintai mu tanpa  pura - pura

[Verse]
semua rasa yang hilang telah kembali
kau buat diri ini jadi berwarna lagi
ku mohon jangan tinggalkan ku sendiri
karna dirimu buat aku slalu berarti

ku harap kau mengerti yang ku inginkan
semua untuk mu akan kuberikan
kita buat perlahan pakai perasaan
biar semua tidak berakhir berantakan`,
  },

  {
    // ── TRACK 2 ──────────────────────────────────────────────────────────
    id: 'track-2',
    title: 'Kamu Pt. II',
    artist: 'GUAF1Y',
    album: 'JERSEY_MU..',
    trackNumber: 2,
    duration: 134,
    audioUrl: '/audio/Kamu_PtII.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    playsCount: 10,
    likesCount: 5,
    releaseDate: '2026-08-01',
    producers: ['EUREKA BEATS', 'GUAF1Y'],
    genre: 'Jersey Club',
    lyrics: `[Instrumental Opening]

[Pre-Chorus]
masih terbayang jelas semua itu
saat pertama kau sapa diriku
tak bisa hilang, kini aku dejavu
tiap kali ku angkat telfon mu

[Chorus]
kalau tak dekat kamu
buat ku jadi rindu
suara mu yang candu
ku teringat selalu
ku mau bertemu kamu

[Verse]
biarkan dunia tau semuanya
kalau aku jadi miliknya
tak ada lagi yang bisa gantikan dia
cuma dia yang punya pesona

tak mau berpisah
tak mau ku ulang lagi
kesalahan yang 
tak perlu ku ulangi

[Pre-Chorus]
masih terbayang jelas semua itu
saat pertama kau sapa diriku
tak bisa hilang, kini aku dejavu
tiap kali ku angkat telfon mu

[Chorus]
kalau tak dekat kamu
buat ku jadi rindu
suara mu yang candu
ku teringat selalu
ku mau bertemu kamu`,
  },

  {
    // ── TRACK 3 ──────────────────────────────────────────────────────────
    id: 'track-3',
    title: 'Jadi Rockstar',
    artist: 'GUAF1Y',
    album: 'JERSEY_MU..',
    trackNumber: 3,
    duration: 142,
    audioUrl: '/audio/Jadi_Rockstar.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
    playsCount: 10,
    likesCount: 5,
    releaseDate: '2026-08-01',
    producers: ['EUREKA BEATS', 'GUAF1Y'],
    genre: 'Jersey Club',
    lyrics: `[Pre-Hook]
kini ku jadi rockstar
banyak aash aku bakar
ku tak mau tepar
keep life like rockstar

[Hook]
hidup aku cuma buat lagu
kalo atas panggung 
semua lampu 
sorot ke diriku

[Bridge]
jangan ganggu aku 
gausah buang waktu
ku ga mau tau
yeah
ku gamau tau
yeah, yeah
jangan ganggu aku
ku ga butuh kamu
jangan deketin aku

[Verse]
jangan telfon telfon
kalo cuma ngomong gajelas
jangan cari aku
kalo cuma mau pass
yang aku butuh cuma cash

orang baru banyak cari aku
gamau lagi ku balik ke kamu
kamu itu udah jadi masa lalu

[Pre-Hook]
kini ku jadi rockstar
banyak aash aku bakar
ku tak mau tepar
keep life like rockstar

[Hook]
hidup aku cuma buat lagu
kalo atas panggung 
semua lampu 
sorot ke diriku

jangan telfon telfon
kalo cuma ngomong gajelas
jangan cari aku
kalo cuma mau pass

    ppppass...`,
  },

  {
    // ── BONUS TRACK ──────────────────────────────────────────────────────
    id: 'track-4',
    title: 'Let It Through (Bonus)',
    artist: 'GUAF1Y',
    album: 'JERSEY_MU..',
    trackNumber: 4,
    duration: 168,
    isBonusTrack: true,
    audioUrl: '/audio/let_it_through.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop',
    playsCount: 10,
    likesCount: 5,
    releaseDate: '2026-08-01',
    producers: ['EUREKA BEATS', 'GUAF1Y'],
    genre: 'Jersey Club',
    lyrics: `[Bonus Track - Exclusive Edition]

[Verse]
hati ku berdegup
saat kau dekat dengan aku
tak tau ini cinta
atau semua palsu

ku berharap bisa mendapatkan diri mu
mendapatkan hati mu

[Pre-Chorus]
kau yang s'lama ini aku tunggu
tak mau buang waktu 
mau deketin kamu
peluk erat dirimu
cubit -cubit pipimu
karna kamu tuh lucu
buat ku senyum mulu

[Chorus]
ka mu
ka ka ka kamu
cantik selalu
buat ku malu
ka mu
ka ka ka kamu
ku jadi mau
milikin kamu

[Bridge]
terngiang suara mu dikepala
kalau malam aku jadi gila
gara gara mikirin dia
hati ini terpana
liatin semua fotonya
oh aku kenapa?

[Chorus]
ka mu
ka ka ka kamu
cantik selalu
buat ku malu
ka mu
ka ka ka kamu
ku jadi mau
milikin kamu`,
  },
];

export const MOCK_FAN_MESSAGES: FanMessage[] = [
  {
    id: 'msg-1',
    name: 'Elena Rostova',
    location: 'Berlin, Germany',
    message: 'Neon Pulse has been on repeat all night! The sub-bass line on track 2 hits so deep. Pure masterpiece 🔥',
    likesCount: 42,
    createdAt: '2026-08-02T14:30:00Z',
    isApproved: true,
  },
  {
    id: 'msg-2',
    name: 'Marcus Vance',
    location: 'Tokyo, Japan',
    message: 'The sound design on Shadow Symphony is unmatched. Loving the atmospheric vibes!',
    likesCount: 29,
    createdAt: '2026-08-02T11:15:00Z',
    isApproved: true,
  },
  {
    id: 'msg-3',
    name: 'Sophia L.',
    location: 'London, UK',
    message: 'Waiting for physical vinyl release! Is there a tour planned for this Mini EP?',
    likesCount: 18,
    createdAt: '2026-08-01T22:00:00Z',
    isApproved: true,
  },
  {
    id: 'msg-4',
    name: 'David Kim',
    location: 'Seoul, S. Korea',
    message: 'Shadow Symphony is the anthem of 2026. The production quality on this portal is crazy good.',
    likesCount: 35,
    createdAt: '2026-08-01T18:40:00Z',
    isApproved: true,
  },
];

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Nocturnal Studio Sessions',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    category: 'Studio',
    aspectRatio: 'landscape',
    caption: 'Crafting synths at 3:00 AM inside analog sound lab.',
    createdAt: '2026-07-28',
  },
  {
    id: 'gal-2',
    title: 'Live at Soundwave Dome',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    category: 'Live',
    aspectRatio: 'portrait',
    caption: 'Unveiling Neon Pulse live for 15,000 fans.',
    createdAt: '2026-07-20',
  },
  {
    id: 'gal-3',
    title: 'Editorial Silhouette',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    category: 'Editorial',
    aspectRatio: 'square',
    caption: 'Official promo shoot for ECHOES IN THE DARK Mini EP.',
    createdAt: '2026-07-15',
  },
  {
    id: 'gal-4',
    title: 'Behind The Scenes - Mixing Room',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    category: 'BTS',
    aspectRatio: 'landscape',
    caption: 'Final analog tape mastering of Shadow Symphony.',
    createdAt: '2026-07-10',
  },
];

export const MOCK_CREDITS: CreditItem[] = [
  { role: 'Executive Producer / Artist', name: 'GUAF1Y' },
  { role: 'Beat Producer & Composer', name: 'EUREKA BEATS' },
  { role: 'Sound Design & Production', name: 'EUREKA BEATS & GUAF1Y' },
  { role: 'Mixing & Mastering', name: 'EUREKA BEATS & GUAF1Y' },
  { role: 'Vocal Performance & Lyrics', name: 'GUAF1Y' },
];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  totalPlays: 124130,
  totalLikes: 9280,
  fanMessagesCount: 1420,
  contactInquiriesCount: 68,
  topTrack: 'Neon Pulse',
  monthlyListeners: '245.8K',
};
