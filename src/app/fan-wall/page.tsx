'use client';

import React, { useState } from 'react';
import { MessageSquare, Heart, Plus, Send, X, Shield, Sparkles } from 'lucide-react';
import { useFanWallStore } from '@/stores/useFanWallStore';
import { PageTransition } from '@/components/layout/PageTransition';
import { formatDate } from '@/lib/utils';

export default function FanWallPage() {
  const {
    messages,
    likedMsgIds,
    filterSort,
    addMessage,
    toggleLikeMessage,
    setFilterSort,
  } = useFanWallStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('Please write a message before posting.');
      return;
    }

    if (message.length < 5) {
      setErrorMsg('Message must be at least 5 characters long.');
      return;
    }

    addMessage(name, location, message);
    setName('');
    setLocation('');
    setMessage('');
    setErrorMsg('');
    setIsModalOpen(false);
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
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterSort === 'newest' ? 'bg-accent text-background font-bold' : 'text-muted'
                }`}
              >
                NEWEST
              </button>
              <button
                onClick={() => setFilterSort('most_liked')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filterSort === 'most_liked' ? 'bg-accent text-background font-bold' : 'text-muted'
                }`}
              >
                MOST RESONATED
              </button>
            </div>

            {/* Post button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-accent text-background font-mono text-xs font-bold hover:bg-accent-hover transition-colors flex items-center gap-2 shadow-lg shadow-accent/20"
            >
              <Plus className="w-4 h-4" />
              LEAVE A MESSAGE
            </button>
          </div>
        </div>

        {/* Message Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMessages.map((msg) => {
            const isLiked = likedMsgIds.includes(msg.id);
            return (
              <div
                key={msg.id}
                className="p-6 rounded-2xl bg-secondary/50 border border-surface/80 flex flex-col justify-between space-y-4 hover:border-accent/30 transition-all shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {msg.name}
                      </h4>
                      <p className="text-[11px] font-mono text-accent">
                        {msg.location || 'Worldwide'}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-muted">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-muted/90 leading-relaxed font-sans italic">
                    "{msg.message}"
                  </p>
                </div>

                <div className="pt-3 border-t border-surface/60 flex items-center justify-between">
                  <button
                    onClick={() => toggleLikeMessage(msg.id)}
                    className={`flex items-center gap-1.5 text-xs font-mono transition-colors ${
                      isLiked ? 'text-red-400 font-bold' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{msg.likesCount} RESONATIONS</span>
                  </button>

                  <span className="text-[10px] font-mono text-muted/60 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-accent" /> VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Post Message Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <div className="relative max-w-lg w-full bg-secondary p-8 rounded-3xl border border-surface shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-surface">
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  POST FAN MESSAGE
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-muted hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-mono">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1">
                    Your Name / Alias
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nocturnal Listener"
                    maxLength={40}
                    className="w-full bg-background border border-surface rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Berlin, Germany"
                    maxLength={40}
                    className="w-full bg-background border border-surface rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted uppercase mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts on Neon Pulse or the Mini EP soundscape..."
                    maxLength={300}
                    required
                    className="w-full bg-background border border-surface rounded-xl p-4 text-xs text-foreground focus:outline-none focus:border-accent resize-none"
                  />
                  <div className="text-[10px] font-mono text-muted text-right mt-1">
                    {message.length} / 300 CHARACTERS
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    SUBMIT TO COMMUNITY WALL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
