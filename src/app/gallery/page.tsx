'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X, Maximize2 } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/audio/mockTracks';
import { GalleryItem } from '@/types';
import { PageTransition } from '@/components/layout/PageTransition';

const CATEGORIES = ['All', 'Live', 'Studio', 'BTS', 'Editorial'] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'All'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-surface pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
              <Camera className="w-3.5 h-3.5" />
              EDITORIAL MEDIA ARCHIVE
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              VISUAL CHRONICLES
            </h1>
            <p className="text-muted text-sm max-w-md">
              Behind-the-scenes studio moments, live arena performances, and editorial artwork.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-accent text-background font-bold shadow-md shadow-accent/20'
                    : 'bg-surface border border-surface/80 text-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-surface bg-secondary cursor-pointer"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
                    {item.category}
                  </span>
                  <Maximize2 className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-base font-bold text-foreground mt-2">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-muted line-clamp-2 mt-1 font-sans">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
            <div className="relative max-w-4xl w-full bg-secondary rounded-3xl border border-surface overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-background/80 text-muted hover:text-foreground backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-surface/50 border-t border-surface space-y-2">
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  {selectedItem.category} • {selectedItem.createdAt}
                </span>
                <h2 className="text-xl font-bold text-foreground">
                  {selectedItem.title}
                </h2>
                {selectedItem.caption && (
                  <p className="text-sm text-muted">
                    {selectedItem.caption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
