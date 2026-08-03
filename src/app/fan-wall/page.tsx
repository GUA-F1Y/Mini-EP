'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Plus, Send, X, Shield, Sparkles, Loader2 } from 'lucide-react';
import { useFanWallStore } from '@/stores/useFanWallStore';
import { useToastStore } from '@/stores/useToastStore';
import { PageTransition } from '@/components/layout/PageTransition';
import { formatDate } from '@/lib/utils';

// Simple rate-limit: max 1 message per 60 seconds per session
const RATE_LIMIT_MS = 60_000;

export default function FanWallPage() {
  const {
    messages,
    likedMsgIds,
    filterSort,
    addMessage,
    toggleLikeMessage,
    setFilterSort,
  } = useFanWallStore();

  const { addToast } = useToastStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [likingIds, setLikingIds] = useState<Set<string>>(new Set());

  // Close modal on Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsModalOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Rate limit check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      setErrorMsg(`Please wait ${remaining}s before posting again.`);
      return;
    }

    if (!message.trim()) {
      setErrorMsg('Please write a message before posting.');
      return;
    }

    if (message.trim().length < 5) {
      setErrorMsg('Message must be at least 5 characters long.');
      return;
    }

    // Basic spam/sanitization check
    const suspiciousPatterns = /http|https|www\.|<script/i;
    if (suspiciousPatterns.test(message)) {
      setErrorMsg('Links and scripts are not allowed in messages.');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    await addMessage(name, location, message);

    setName('');
    setLocation('');
    setMessage('');
    setErrorMsg('');
    setIsModalOpen(false);
    setIsSubmitting(false);
    addToast({ message: 'Your message has been posted!', type: 'success' });
  };

  const handleLike = async (id: string) => {
    if (likingIds.has(id)) return; // Prevent spam clicks
    setLikingIds((prev) => new Set(prev).add(id));
    await toggleLikeMessage(id);
    setTimeout(() => {
      setLikingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 500);
  };

  const sortedMessages = [...messages].sort((a, b) => {
    if (filterSort === 'most_liked') {
      return b.likesCount - a.likesCount;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
              <MessageSquare className="w-3.5 h-3.5" />
              LIVE FAN COMMUNITY WALL
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
              THE NOCTURNE ECHOES
            </h1>
            <p className="text-muted text-sm max-w-lg">
              Leave your thoughts on JERSEY_MU.. Mini EP. Connect with listeners worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Sort toggles */}
            <div className="flex bg-secondary p-1 rounded-xl border border-surface text-xs font-mono">
              <button
                onClick={() => setFilterSort('newest')}
                aria-pressed={filterSort === 'newest'}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[44px] ${
                  filterSort === 'newest' ? 'bg-accent text-background font-bold' : 'text-muted'
                }`}
              >
                NEWEST
              </button>
              <button
                onClick={() => setFilterSort('most_liked')}
                aria-pressed={filterSort === 'most_liked'}
                className={`px-3 py-1.5 rounded-lg transition-colors min-h-[44px] ${
                  filterSort === 'most_liked' ? 'bg-accent text-background font-bold' : 'text-muted'
                }`}
              >
                MOST RESONATED
              </button>
            </div>

            {/* Post button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-accent text-background font-mono text-xs font-bold hover:bg-accent-hover transition-colors flex items-center gap-2 shadow-lg shadow-accent/20 min-h-[44px]"
              aria-label="Leave a fan message"
            >
              <Plus className="w-4 h-4" />
              LEAVE A MESSAGE
            </button>
          </div>
        </div>

        {/* Message Grid */}
        {sortedMessages.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <MessageSquare className="w-12 h-12 text-muted/30 mx-auto" />
            <p className="text-muted text-sm">Be the first to leave a message!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedMessages.map((msg) => {
              const isLiked = likedMsgIds.includes(msg.id);
              const isLiking = likingIds.has(msg.id);
              return (
                <article
                  key={msg.id}
                  className="p-5 rounded-2xl bg-secondary/50 border border-surface/80 flex flex-col justify-between space-y-4 hover:border-accent/30 transition-all shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{msg.name}</h4>
                        <p className="text-[11px] font-mono text-accent">{msg.location || 'Worldwide'}</p>
                      </div>
                      <span className="text-[10px] font-mono text-muted shrink-0">{formatDate(msg.createdAt)}</span>
                    </div>

                    <p className="text-xs text-muted/90 leading-relaxed font-sans italic break-words">
                      &quot;{msg.message}&quot;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-surface/60 flex items-center justify-between">
                    <button
                      onClick={() => handleLike(msg.id)}
                      disabled={isLiking}
                      className={`flex items-center gap-1.5 text-xs font-mono transition-all min-h-[44px] px-2 rounded-lg ${
                        isLiked
                          ? 'text-red-400 font-bold'
                          : 'text-muted hover:text-foreground hover:bg-surface/50'
                      } ${isLiking ? 'scale-125' : 'scale-100'}`}
                      aria-label={isLiked ? 'Unlike message' : 'Like message'}
                      aria-pressed={isLiked}
                    >
                      <Heart className={`w-4 h-4 transition-all ${isLiked ? 'fill-current' : ''} ${isLiking ? 'scale-150' : ''}`} />
                      <span>{msg.likesCount} RESONATIONS</span>
                    </button>

                    <span className="text-[10px] font-mono text-muted/60 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-accent" /> VERIFIED
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Post Message Modal */}
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
            onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
          >
            <div className="relative max-w-lg w-full bg-secondary p-6 sm:p-8 rounded-3xl border border-surface shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-surface">
                <h3 id="modal-title" className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  POST FAN MESSAGE
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-muted hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-surface/50 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMsg && (
                <div role="alert" className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fan-name" className="block text-xs font-mono text-muted uppercase mb-1">
                    Your Name / Alias
                  </label>
                  <input
                    id="fan-name"
                    type="text"
                    autoComplete="nickname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nocturnal Listener"
                    maxLength={40}
                    className="w-full bg-background border border-surface rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="fan-location" className="block text-xs font-mono text-muted uppercase mb-1">
                    Location / City
                  </label>
                  <input
                    id="fan-location"
                    type="text"
                    autoComplete="off"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Berlin, Germany"
                    maxLength={40}
                    className="w-full bg-background border border-surface rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="fan-message" className="block text-xs font-mono text-muted uppercase mb-1">
                    Your Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="fan-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts on the Mini EP soundscape..."
                    maxLength={300}
                    required
                    className="w-full bg-background border border-surface rounded-xl p-4 text-xs text-foreground focus:outline-none focus:border-accent resize-none"
                  />
                  <div className={`text-[10px] font-mono text-right mt-1 ${message.length > 280 ? 'text-yellow-400' : 'text-muted'}`}>
                    {message.length} / 300
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {isSubmitting
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> POSTING…</>
                    : <><Send className="w-4 h-4" /> SUBMIT TO COMMUNITY WALL</>
                  }
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
