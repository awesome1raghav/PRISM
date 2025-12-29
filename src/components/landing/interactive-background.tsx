'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // This check ensures the code only runs on the client-side.
    const checkIsMobile = () => window.innerWidth < 768;
    setIsMobile(checkIsMobile());
    
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(() => {
        const x = e.clientX;
        const y = e.clientY;
        container.style.setProperty('--cursor-x', `${x}px`);
        container.style.setProperty('--cursor-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);

  if (isMobile === undefined) {
    return null; // Don't render on the server
  }

  if (isMobile) {
    return (
        <div className="absolute inset-0 -z-10 bg-background mobile-fallback" />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'interactive-glow-background absolute inset-0 -z-10 bg-background overflow-hidden'
      )}
    >
      <div className="glow-field" />
      {/* This creates the animated signal lines */}
      <div className="lines">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="line" />
        ))}
      </div>
       <style jsx>{`
        .interactive-glow-background {
          --cursor-x: 50vw;
          --cursor-y: 50vh;
        }
        .glow-field {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--cursor-x) var(--cursor-y),
            hsla(180, 100%, 50%, 0.08),
            transparent 40%
          );
          transition: background 0.2s ease-out;
        }

        .lines {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
        }

        .line {
            position: absolute;
            width: 1.5px;
            background: linear-gradient(
                to bottom,
                transparent 0%,
                hsl(var(--primary) / 0.2) 50%,
                transparent 100%
            );
            animation: move-line 20s linear infinite;
        }

        .line:nth-child(1) { top: -50%; left: 10%; height: 200%; animation-duration: 15s; }
        .line:nth-child(2) { top: -50%; left: 20%; height: 200%; animation-duration: 25s; }
        .line:nth-child(3) { top: -50%; left: 30%; height: 200%; animation-duration: 18s; }
        .line:nth-child(4) { top: -50%; left: 40%; height: 200%; animation-duration: 30s; }
        .line:nth-child(5) { top: -50%; left: 50%; height: 200%; animation-duration: 12s; }
        .line:nth-child(6) { top: -50%; left: 60%; height: 200%; animation-duration: 22s; }
        .line:nth-child(7) { top: -50%; left: 70%; height: 200%; animation-duration: 17s; }
        .line:nth-child(8) { top: -50%; left: 80%; height: 200%; animation-duration: 28s; }
        .line:nth-child(9) { top: -50%; left: 90%; height: 200%; animation-duration: 14s; }
        .line:nth-child(10) { top: -50%; left: 5%; height: 200%; animation-duration: 26s; }
        .line:nth-child(11) { top: 0%; left: 0%; height: 100%; width: 100%; background: linear-gradient(to right, transparent 0%, hsl(var(--accent)/0.1) 50%, transparent 100%); animation: move-line-h 20s linear infinite; animation-delay: -10s; }
        .line:nth-child(12) { top: 10%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 25s linear infinite; }
        .line:nth-child(13) { top: 20%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 18s linear infinite; }
        .line:nth-child(14) { top: 30%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 30s linear infinite; }
        .line:nth-child(15) { top: 40%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 12s linear infinite; }
        .line:nth-child(16) { top: 50%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 22s linear infinite; }
        .line:nth-child(17) { top: 60%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 17s linear infinite; }
        .line:nth-child(18) { top: 70%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 28s linear infinite; }
        .line:nth-child(19) { top: 80%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 14s linear infinite; }
        .line:nth-child(20) { top: 90%; left: 0%; height: 1.5px; width: 200%; animation: move-line-h 26s linear infinite; }

        @keyframes move-line {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100%); }
        }
         @keyframes move-line-h {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;
