import type { Metadata, Viewport } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PersistentPlayer } from '@/components/audio/PersistentPlayer';
import { IntroScreen } from '@/components/layout/IntroScreen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://guaf1y.vercel.app'),
  title: {
    default: 'GUAF1Y — JERSEY_MU.. (Official Mini EP Portal)',
    template: '%s | GUAF1Y Official',
  },
  description:
    'Official Artist Portal for JERSEY_MU.. Mini EP by GUAF1Y. Experience cinematic Jersey Club tracks, live audio visualizer, lyrics, gallery, and interactive fan wall.',
  keywords: [
    'GUAF1Y',
    'Mini EP',
    'JERSEY_MU..',
    'Electronic Music',
    'Synthwave',
    'Jersey Club',
    'Dark Pop',
    'Artist Portal',
  ],
  authors: [{ name: 'GUAF1Y' }],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/icon.svg',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GUAF1Y — JERSEY_MU.. (Official Mini EP)',
    description: 'Immersive digital experience for the new 3-track Jersey Club Mini EP by GUAF1Y.',
    url: 'https://guaf1y.vercel.app',
    siteName: 'GUAF1Y Official',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'GUAF1Y JERSEY_MU.. Mini EP Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUAF1Y — JERSEY_MU..',
    description: 'Listen to the Official Mini EP & explore the digital portal.',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#090909',
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicAlbum',
  name: 'JERSEY_MU..',
  byArtist: {
    '@type': 'MusicGroup',
    name: 'GUAF1Y',
  },
  genre: 'Jersey Club / Electronic',
  numTracks: 3,
  description: 'Official Mini EP by GUAF1Y featuring cinematic Jersey Club electronic soundscapes.',
  url: 'https://guaf1y.vercel.app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${syne.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-background bg-noise antialiased">
        <IntroScreen />
        <Navbar />
        <main className="flex-1 w-full pb-24 sm:pb-28">{children}</main>
        <Footer />
        <PersistentPlayer />
      </body>
    </html>
  );
}
