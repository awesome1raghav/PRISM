
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }

      const x = e.clientX;
      const y = e.clientY;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      container.appendChild(ripple);

      rippleTimeoutRef.current = setTimeout(() => {
        ripple.remove();
      }, 1000); // Increased duration
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rippleTimeoutRef.current) {
        clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'absolute inset-0 z-0 overflow-hidden bg-[#0b1220] isolate'
        )}
      >
        <div className="water-surface" />
        <div className="background-vignette" />
      </div>
       <style jsx global>{`
        .water-surface {
          width: 100%;
          height: 100%;
          filter: blur(2px);
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(0, 200, 255, 0.25),
            rgba(0, 100, 255, 0.1),
            rgba(0, 0, 0, 0) 40%
          );
           transition: background 0.1s linear;
        }

        .background-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 65%, black 100%);
          opacity: 0.7;
          pointer-events: none;
        }

        .ripple {
          position: fixed; /* Use fixed to position relative to viewport */
          width: 200px; /* Increased size */
          height: 200px; /* Increased size */
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(0, 200, 255, 0.4),
            transparent 60%
          );
          animation: ripple-animation 1s ease-out forwards; /* Slower animation */
          z-index: -1;
        }

        @keyframes ripple-animation {
          from {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(1.6); /* Larger end scale */
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default InteractiveBackground;
