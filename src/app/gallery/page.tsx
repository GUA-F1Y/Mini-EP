'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight, Share2, ZoomIn } from 'lucide-react';
import { MOCK_GALLERY } from '@/lib/audio/mockTracks';
import { GalleryItem } from '@/types';
import { PageTransition } from '@/components/layout/PageTransition';
import { useSwipe } from '@/hooks/useSwipe';
import { useToastStore } from '@/stores/useToastStore';
import { shareContent } from '@/lib/utils/share';

const CATEGORIES = ['All', 'Live', 'Studio', 'BTS', 'Editorial'] as const;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { addToast } = useToastStore();

  const filteredItems = activeCategory === 'All'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((item) => item.category === activeCategory);

  const openItem = useCallback((item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    setSelectedItem(item);
    setSelectedIndex(idx);
  }, [filteredItems]);

  const closeItem = useCallback(() => setSelectedItem(null), []);

  const goNext = useCallback(() => {
    const nextIdx = (selectedIndex + 1) % filteredItems.length;
    setSelectedIndex(nextIdx);
    setSelectedItem(filteredItems[nextIdx]);
  }, [selectedIndex, filteredItems]);

  const goPrev = useCallback(() => {
    const prevIdx = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(prevIdx);
    setSelectedItem(filteredItems[prevIdx]);
  }, [selectedIndex, filteredItems]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedItem) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeItem();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedItem, closeItem, goNext, goPrev]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
    onSwipeDown: closeItem,
  });

  const handleShare = useCallback(async () => {
    if (!selectedItem) return;
    const result = await shareContent({
      title: selectedItem.title,
      text: selectedItem.caption ?? selectedItem.title,
      url: window.location.href,
    });
    if (result === 'copied') {
      addToast({ message: 'Link copied to clipboard', type: 'success', duration: 2000 });
    }
  }, [selectedItem, addToast]);

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
                aria-pressed={activeCategory === cat}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all min-h-[44px] ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => openItem(item)}
              aria-label={`View ${item.title}`}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-surface bg-secondary cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest px-2 py-0.5 rounded bg-accent/15 border border-accent/30">
                    {item.category}
                  </span>
                  <ZoomIn className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-muted line-clamp-2 mt-1 font-sans">
                    {item.caption}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl"
            onClick={(e) => { if (e.target === e.currentTarget) closeItem(); }}
            {...swipeHandlers}
          >
            <div className="relative max-w-4xl w-full bg-secondary rounded-3xl border border-surface overflow-hidden shadow-2xl">
              
              {/* Top controls */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
                <span className="text-xs font-mono text-muted bg-background/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Share image"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeItem}
                    className="p-2.5 rounded-full bg-background/80 backdrop-blur-sm text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full h-[55vh] sm:h-[65vh]">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Prev / Next arrows */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm text-muted hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Caption */}
              <div className="p-5 bg-surface/50 border-t border-surface space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs font-mono text-muted">{selectedItem.createdAt}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground">{selectedItem.title}</h2>
                {selectedItem.caption && (
                  <p className="text-sm text-muted">{selectedItem.caption}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
