'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Activity,
  Music,
  MessageSquare,
  Mail,
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react';
import { MOCK_ANALYTICS, MOCK_TRACKS, MOCK_FAN_MESSAGES } from '@/lib/audio/mockTracks';
import { PageTransition } from '@/components/layout/PageTransition';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'tracks' | 'messages'>('analytics');
  const [fanMsgs, setFanMsgs] = useState(MOCK_FAN_MESSAGES);

  const handleDeleteMsg = (id: string) => {
    setFanMsgs(fanMsgs.filter((m) => m.id !== id));
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              PORTAL MANAGEMENT DASHBOARD
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground">
              ADMIN CONTROL CENTER
            </h1>
          </div>

          {/* Admin Tabs */}
          <div className="flex bg-secondary p-1 rounded-xl border border-surface text-xs font-mono">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'analytics' ? 'bg-accent text-background font-bold' : 'text-muted'
              }`}
            >
              <Activity className="w-4 h-4" />
              ANALYTICS
            </button>

            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'tracks' ? 'bg-accent text-background font-bold' : 'text-muted'
              }`}
            >
              <Music className="w-4 h-4" />
              TRACKS
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'messages' ? 'bg-accent text-background font-bold' : 'text-muted'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              FAN WALL ({fanMsgs.length})
            </button>
          </div>
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-secondary/60 border border-surface space-y-2">
                <span className="text-xs font-mono text-muted flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-accent" /> TOTAL STREAM PLAYS
                </span>
                <p className="font-display text-3xl font-bold text-foreground">
                  {MOCK_ANALYTICS.totalPlays.toLocaleString()}
                </p>
                <p className="text-[11px] font-mono text-green-400">+14.2% THIS WEEK</p>
              </div>

              <div className="p-6 rounded-2xl bg-secondary/60 border border-surface space-y-2">
                <span className="text-xs font-mono text-muted flex items-center gap-1">
                  <Users className="w-4 h-4 text-accent" /> MONTHLY LISTENERS
                </span>
                <p className="font-display text-3xl font-bold text-foreground">
                  {MOCK_ANALYTICS.monthlyListeners}
                </p>
                <p className="text-[11px] font-mono text-accent">TOP TRACK: {MOCK_ANALYTICS.topTrack}</p>
              </div>

              <div className="p-6 rounded-2xl bg-secondary/60 border border-surface space-y-2">
                <span className="text-xs font-mono text-muted flex items-center gap-1">
                  <MessageSquare className="w-4 h-4 text-accent" /> FAN WALL MESSAGES
                </span>
                <p className="font-display text-3xl font-bold text-foreground">
                  {MOCK_ANALYTICS.fanMessagesCount.toLocaleString()}
                </p>
                <p className="text-[11px] font-mono text-muted">MODERATED & ACTIVE</p>
              </div>

              <div className="p-6 rounded-2xl bg-secondary/60 border border-surface space-y-2">
                <span className="text-xs font-mono text-muted flex items-center gap-1">
                  <Mail className="w-4 h-4 text-accent" /> BOOKING INQUIRIES
                </span>
                <p className="font-display text-3xl font-bold text-foreground">
                  {MOCK_ANALYTICS.contactInquiriesCount}
                </p>
                <p className="text-[11px] font-mono text-green-400">3 PENDING REVIEW</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRACK MANAGER */}
        {activeTab === 'tracks' && (
          <div className="bg-secondary/60 rounded-3xl border border-surface overflow-hidden">
            <div className="p-6 border-b border-surface">
              <h3 className="font-display text-xl font-bold text-foreground">
                EP TRACK PERFORMANCE & MANAGEMENT
              </h3>
            </div>
            <div className="divide-y divide-surface">
              {MOCK_TRACKS.map((t) => (
                <div key={t.id} className="p-4 sm:p-6 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-foreground text-sm">
                      #{t.trackNumber} {t.title}
                    </h4>
                    <p className="text-xs text-muted">
                      Duration: {t.duration}s • Genre: {t.genre}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-xs font-mono">
                    <span>{t.playsCount.toLocaleString()} Plays</span>
                    <span className="text-accent">{t.likesCount} Likes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FAN MESSAGES MODERATION */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-foreground">
              FAN WALL MODERATION QUEUE
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {fanMsgs.map((msg) => (
                <div key={msg.id} className="p-4 rounded-xl bg-secondary border border-surface flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-xs">{msg.name}</span>
                      <span className="text-[10px] font-mono text-accent">({msg.location})</span>
                    </div>
                    <p className="text-xs text-muted mt-1 font-sans italic">&quot;{msg.message}&quot;</p>
                  </div>

                  <button
                    onClick={() => handleDeleteMsg(msg.id)}
                    className="p-2 text-muted hover:text-red-400 transition-colors rounded-lg bg-surface/50"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
