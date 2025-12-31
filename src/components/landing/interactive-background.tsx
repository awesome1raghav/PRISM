
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rippleTimeout: NodeJS.Timeout | null = null;
    
    const updateGlow = (x: number, y: number) => {
        const surface = container.querySelector('.water-surface') as HTMLDivElement;
        if (surface) {
            surface.style.setProperty('--x', `${x}px`);
            surface.style.setProperty('--y', `${y}px`);
        }
    };
    
    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      container.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateGlow(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      updateGlow(touch.clientX, touch.clientY);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        createRipple(touch.clientX, touch.clientY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
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
          touch-action: none;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            rgba(0, 200, 255, 0.25),
            rgba(0, 100, 255, 0.1),
            rgba(0, 0, 0, 0) 40%
          );
           transition: background 0.08s linear;
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
          width: 140px; 
          height: 140px;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(0, 200, 255, 0.5),
            transparent 65%
          );
          animation: ripple-animation 0.6s ease-out forwards;
          z-index: -1;
        }

        @keyframes ripple-animation {
          from {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default InteractiveBackground;
