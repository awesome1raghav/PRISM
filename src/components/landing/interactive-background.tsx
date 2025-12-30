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
      <div className="aura" />
      <div className="background-gradient" />
      <div className="background-vignette" />

      <style jsx>{`
        .isolate {
          isolation: isolate;
        }

        .aura {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            circle at 20% 30%,
            hsla(175, 50%, 30%, 0.45),
            transparent 40%
          ),
          radial-gradient(
            circle at 80% 70%,
            hsla(195, 50%, 40%, 0.35),
            transparent 45%
          );
          opacity: 0;
          animation: fadeInAura 4s forwards, moveAura 25s infinite alternate ease-in-out;
          will-change: transform, opacity;
        }

        .background-gradient {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse 80% 50% at 50% 120%,
            hsl(180, 25%, 15%), /* Desaturated Teal */
            hsl(220, 20%, 10%), /* Deep Navy/Charcoal */
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

        @keyframes fadeInAura {
          to {
            opacity: 1;
          }
        }
        
        @keyframes moveAura {
          0% {
            transform: scale(1.4) translate(-10%, -15%) rotate(-5deg);
          }
          100% {
            transform: scale(1.6) translate(10%, 15%) rotate(15deg);
          }
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
