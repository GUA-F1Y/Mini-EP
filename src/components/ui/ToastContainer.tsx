'use client';

import React from 'react';
import { useToastStore } from '@/stores/useToastStore';
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
              isSuccess
                ? 'bg-secondary/95 border-green-500/40 text-foreground'
                : isWarning
                ? 'bg-secondary/95 border-yellow-500/40 text-foreground'
                : isError
                ? 'bg-secondary/95 border-red-500/40 text-foreground'
                : 'bg-secondary/95 border-accent/40 text-foreground'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />}
              {isWarning && <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />}
              {isError && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
              {!isSuccess && !isWarning && !isError && (
                <Info className="w-4 h-4 text-accent shrink-0" />
              )}
              <span className="text-xs font-mono text-foreground truncate">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-muted hover:text-foreground transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
