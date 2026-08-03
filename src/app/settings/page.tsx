'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings, Trash2, Download, Wifi, WifiOff, Moon,
  HardDrive, RefreshCw, CheckCircle2, Smartphone, Share, PlusSquare,
} from 'lucide-react';
import { useAudioStore } from '@/stores/useAudioStore';
import { useToastStore } from '@/stores/useToastStore';
import { offlineCacheManager } from '@/lib/audio/offlineCache';
import { PageTransition } from '@/components/layout/PageTransition';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function SettingsPage() {
  const { tracks, offlineTrackIds, refreshOfflineTracks, toggleOfflineTrack } = useAudioStore();
  const { addToast } = useToastStore();

  const [cacheSize, setCacheSize] = useState('0 MB');
  const [isClearing, setIsClearing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // PWA Installation State
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const onOnline = () => { setIsOnline(true); addToast({ message: 'Connection restored', type: 'success' }); };
    const onOffline = () => { setIsOnline(false); addToast({ message: 'You are offline', type: 'warning' }); };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    // Check reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    // Check if app is already running as installed PWA (standalone)
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator && (navigator as unknown as { standalone: boolean }).standalone === true);
    setIsStandalone(Boolean(isStandaloneMode));

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [addToast]);

  useEffect(() => {
    offlineCacheManager.getCacheSize().then(({ formattedSize }) => setCacheSize(formattedSize));
    refreshOfflineTracks();
  }, [refreshOfflineTracks]);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        addToast({
          message: 'To install on iOS: Tap Share in Safari, then "Add to Home Screen"',
          type: 'info',
          duration: 6000,
        });
      } else if (isStandalone) {
        addToast({ message: 'App is already installed!', type: 'success' });
      } else {
        addToast({
          message: 'Tap your browser menu (⋮) and select "Install app" or "Add to Home Screen"',
          type: 'info',
          duration: 5000,
        });
      }
      return;
    }

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        addToast({ message: 'Installing GUAF1Y App…', type: 'success' });
        setIsStandalone(true);
        setDeferredPrompt(null);
      } else {
        addToast({ message: 'Installation cancelled', type: 'info' });
      }
    } catch (err) {
      console.warn('[PWA Install Error]:', err);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleClearCache = async () => {
    setIsClearing(true);
    await offlineCacheManager.clearAllAudioCache();
    await refreshOfflineTracks();
    const { formattedSize } = await offlineCacheManager.getCacheSize();
    setCacheSize(formattedSize);
    setIsClearing(false);
    addToast({ message: 'All offline audio cleared', type: 'success' });
  };

  const handleRemoveTrack = async (trackId: string) => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return;
    await toggleOfflineTrack(track);
    const { formattedSize } = await offlineCacheManager.getCacheSize();
    setCacheSize(formattedSize);
    addToast({ message: `Removed "${track.title}" from offline`, type: 'info' });
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Header */}
        <div className="space-y-2 border-b border-surface pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface text-accent text-xs font-mono">
            <Settings className="w-3.5 h-3.5" />
            APP SETTINGS
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            SETTINGS
          </h1>
          <p className="text-muted text-sm">
            Manage offline storage, cache, app installation, and preferences.
          </p>
        </div>

        {/* ─── DOWNLOAD / INSTALL PWA SECTION ─── */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest">
            Mobile & Desktop Application
          </h2>

          <div className="p-6 rounded-2xl bg-secondary/50 border border-surface space-y-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-surface border border-accent/30 flex items-center justify-center text-accent shrink-0 shadow-lg shadow-accent/5">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-base">GUAF1Y Web App</h3>
                    {isStandalone && (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-mono font-bold uppercase">
                        INSTALLED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    Install for offline listening, fullscreen portal view, and home screen launch.
                  </p>
                </div>
              </div>
            </div>

            {isStandalone ? (
              <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/30 flex items-center gap-2.5 text-xs text-accent font-mono">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>App is installed on this device. You can launch it directly from your Home Screen.</span>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleInstallApp}
                  disabled={isInstalling}
                  className="w-full py-4 rounded-xl bg-accent text-background font-bold font-mono text-xs hover:bg-accent-hover transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-accent/20 active:scale-[0.99] min-h-[44px]"
                  aria-label="Download and install GUAF1Y App offline"
                >
                  <Download className="w-4.5 h-4.5" />
                  {deferredPrompt
                    ? 'INSTALL GUAF1Y APP (OFFLINE)'
                    : 'DOWNLOAD & INSTALL APP'}
                </button>

                {/* iOS Instructions hint if on Apple Safari */}
                {isIOS && (
                  <div className="p-3.5 rounded-xl bg-surface/80 border border-surface text-xs text-muted space-y-1.5 font-mono">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Share className="w-4 h-4 text-accent" />
                      iOS Safari Installation Instructions:
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-muted/90 pl-1">
                      <li>Tap the <span className="text-foreground font-semibold">Share</span> button at the bottom of Safari</li>
                      <li>Scroll down and tap <span className="text-foreground font-semibold">Add to Home Screen</span> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-accent" />)</li>
                      <li>Launch <span className="text-foreground font-semibold">GUAF1Y</span> directly from your home screen!</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Connection Status */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Connection</h2>
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            isOnline ? 'bg-secondary/50 border-surface' : 'bg-red-500/10 border-red-500/30'
          }`}>
            {isOnline
              ? <Wifi className="w-5 h-5 text-green-400 shrink-0" />
              : <WifiOff className="w-5 h-5 text-red-400 shrink-0" />
            }
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isOnline ? 'Online' : 'Offline Mode'}
              </p>
              <p className="text-xs text-muted">
                {isOnline
                  ? 'Streaming is available. Downloads will be cached for offline playback.'
                  : 'Only downloaded tracks are available for playback.'}
              </p>
            </div>
          </div>
        </section>

        {/* Offline Storage */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Offline Storage</h2>

          <div className="p-5 rounded-2xl bg-secondary/50 border border-surface space-y-4">
            {/* Storage Used */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Storage Used</p>
                  <p className="text-xs text-muted">Cached audio for offline playback (max 500 MB)</p>
                </div>
              </div>
              <span className="text-sm font-mono font-bold text-accent">{cacheSize}</span>
            </div>

            {/* Clear cache button */}
            <button
              onClick={handleClearCache}
              disabled={isClearing}
              className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              aria-label="Clear all offline audio cache"
            >
              {isClearing
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> CLEARING…</>
                : <><Trash2 className="w-4 h-4" /> CLEAR ALL OFFLINE AUDIO</>
              }
            </button>
          </div>
        </section>

        {/* Downloaded Tracks */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest">
            Downloaded Tracks ({offlineTrackIds.length})
          </h2>

          {offlineTrackIds.length === 0 ? (
            <div className="p-6 rounded-2xl bg-secondary/50 border border-surface text-center space-y-2">
              <Download className="w-10 h-10 text-muted/40 mx-auto" />
              <p className="text-sm text-muted">No tracks downloaded for offline use yet.</p>
              <p className="text-xs text-muted/60">
                Use the download icon on any track to save it for offline listening.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tracks
                .filter((t) => offlineTrackIds.includes(t.id))
                .map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-surface"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{track.title}</p>
                        <p className="text-xs text-muted">{track.artist}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveTrack(track.id)}
                      className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={`Remove ${track.title} from offline`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              }
            </div>
          )}
        </section>

        {/* Preferences */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest">Preferences</h2>

          <div className="p-5 rounded-2xl bg-secondary/50 border border-surface space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted">Always on — part of the GUAF1Y brand identity</p>
                </div>
              </div>
              <div className="w-10 h-5 rounded-full bg-accent relative shrink-0">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-background" />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-surface/50 pt-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Reduced Motion</p>
                <p className="text-xs text-muted">System preference: {reducedMotion ? 'Enabled' : 'Disabled'}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-mono font-bold ${reducedMotion ? 'bg-accent/20 text-accent' : 'bg-surface text-muted'}`}>
                {reducedMotion ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>
        </section>

        {/* PWA Info */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono text-accent uppercase tracking-widest">App Info</h2>
          <div className="p-5 rounded-2xl bg-secondary/50 border border-surface space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Version</span>
              <span className="font-mono text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Artist</span>
              <span className="font-mono text-foreground">GUAF1Y</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Release</span>
              <span className="font-mono text-foreground">JERSEY_MU..</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">PWA Status</span>
              <span className="font-mono text-accent">{isStandalone ? 'INSTALLED (STANDALONE)' : 'ENABLED'}</span>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
