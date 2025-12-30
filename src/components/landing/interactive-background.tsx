'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden bg-[#0a0f18] isolate noise-background'
      )}
    >
      <div className="background-gradient" />
      <div className="background-vignette" />

      <style jsx>{`
        .isolate {
          isolation: isolate;
        }

        .background-gradient {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse 80% 50% at 50% 120%,
            hsl(195, 100%, 9%),
            hsl(210, 30%, 15%),
            #0a0f18 70%
          );
          animation: drift 30s infinite alternate ease-in-out;
          will-change: transform;
        }

        .background-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 65%, black 100%);
          opacity: 0.7;
          pointer-events: none;
        }

        @keyframes drift {
          0% {
            transform: scale(1.3) translate(-3%, 3%);
          }
          100% {
            transform: scale(1.3) translate(3%, -3%);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;
