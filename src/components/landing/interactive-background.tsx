'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden bg-[#0a0f18] isolate'
      )}
    >
      <div className="background-gradient" />
      <div className="background-noise" />
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
            circle at 50% 50%,
            #003049,
            #021b2b,
            #0a0f18 70%
          );
          animation: drift 25s infinite alternate ease-in-out;
        }
        
        .background-noise {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noise)"/></svg>');
          background-repeat: repeat;
          opacity: 0.02;
          pointer-events: none;
        }

        .background-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 60%, black 100%);
          opacity: 0.5;
          pointer-events: none;
        }

        @keyframes drift {
          0% {
            transform: scale(1.2) translate(-2%, -2%);
          }
          100% {
            transform: scale(1.2) translate(2%, 2%);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;
