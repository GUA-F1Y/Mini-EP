'use client';

import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '@/stores/useAudioStore';

interface AudioVisualizerProps {
  height?: number;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  height = 120,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isPlaying, visualizerMode, setVisualizerMode } = useAudioStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    // Simulated frequency data array for smooth responsive audio visualization
    const numBars = 48;
    const barHeights = new Array(numBars).fill(10);

    const render = () => {
      // Resize canvas to parent width dynamically
      if (canvas.width !== canvas.parentElement?.clientWidth) {
        canvas.width = canvas.parentElement?.clientWidth || 600;
        canvas.height = height;
      }

      const width = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, width, h);

      // Gold Accent Gradient
      const goldGradient = ctx.createLinearGradient(0, 0, width, 0);
      goldGradient.addColorStop(0, '#D4AF37');
      goldGradient.addColorStop(0.5, '#F5D77F');
      goldGradient.addColorStop(1, '#D4AF37');

      if (isPlaying) {
        phase += 0.08;
      }

      // 1. FREQUENCY BARS MODE
      if (visualizerMode === 'bars') {
        const barWidth = (width / numBars) * 0.65;
        const gap = (width / numBars) * 0.35;

        for (let i = 0; i < numBars; i++) {
          const targetH = isPlaying
            ? Math.sin(phase + i * 0.2) * 35 + Math.cos(phase * 1.5 + i * 0.4) * 20 + 35
            : 6;

          // Smooth interpolation
          barHeights[i] += (targetH - barHeights[i]) * 0.15;

          const x = i * (barWidth + gap) + gap / 2;
          const y = h - barHeights[i];

          ctx.fillStyle = goldGradient;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(x, y, barWidth, barHeights[i], [4, 4, 0, 0]);
          } else {
            ctx.rect(x, y, barWidth, barHeights[i]);
          }
          ctx.fill();

          // Subtle glowing shadow
          if (isPlaying) {
            ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
            ctx.shadowBlur = 8;
          }
        }
      } 
      // 2. OSCILLOSCOPE WAVE MODE
      else if (visualizerMode === 'wave') {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = goldGradient;
        if (isPlaying) {
          ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
          ctx.shadowBlur = 12;
        }

        const sliceWidth = width / 100;
        let x = 0;

        for (let i = 0; i <= 100; i++) {
          const amp = isPlaying ? (Math.sin(phase + i * 0.1) * 25 + Math.cos(phase * 2 + i * 0.25) * 15) : 0;
          const y = h / 2 + amp;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.stroke();
      } 
      // 3. CIRCULAR PULSE WAVE
      else if (visualizerMode === 'circle') {
        const centerX = width / 2;
        const centerY = h / 2;
        const baseRadius = Math.min(centerX, centerY) * 0.6;

        ctx.beginPath();
        ctx.strokeStyle = goldGradient;
        ctx.lineWidth = 2.5;

        for (let i = 0; i <= 360; i += 4) {
          const rad = (i * Math.PI) / 180;
          const offset = isPlaying
            ? Math.sin(phase + i * 0.05) * 12 + Math.cos(phase * 1.8 + i * 0.1) * 8
            : 0;
          const r = baseRadius + offset;

          const x = centerX + Math.cos(rad) * r;
          const y = centerY + Math.sin(rad) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.shadowBlur = 0; // reset
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, visualizerMode, height]);

  return (
    <div className={`relative flex flex-col gap-2 w-full ${className}`}>
      {/* Mode Selector Header */}
      <div className="flex items-center justify-between text-xs text-muted font-mono tracking-wider px-1">
        <span className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-accent animate-pulse' : 'bg-muted/40'}`} />
          REALTIME AUDIO SPECTRUM
        </span>
        <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-lg border border-surface">
          {(['bars', 'wave', 'circle'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setVisualizerMode(mode)}
              className={`px-2.5 py-1 rounded text-[10px] uppercase font-semibold transition-all ${
                visualizerMode === mode
                  ? 'bg-accent text-background shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas container */}
      <div className="w-full bg-secondary/60 backdrop-blur-md rounded-xl p-3 border border-surface/80 flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} height={height} className="w-full block" />
      </div>
    </div>
  );
};
