'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Prism() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-0 z-0 flex items-center justify-center opacity-20 perspective-[1000px] pointer-events-none'
      )}
    >
      <div
        className={cn(
          'w-64 h-64 transform-style-3d transition-transform duration-1000',
          isMounted ? 'animate-prism-spin' : ''
        )}
      >
        <div className="absolute w-full h-full transform-style-3d">
          {/* Base */}
          <div
            className="absolute top-0 left-0 w-full h-full border-b-[100px] border-b-primary/30 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent opacity-80"
            style={{
              transform: 'rotateX(-90deg) translateZ(50px)',
            }}
          ></div>

          {/* Side 1 */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 to-accent/20 opacity-50"
            style={{
              transform: 'rotateY(0deg) translateZ(58px)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              height: '180px',
              width: '120px',
              left: '50%',
              marginLeft: '-60px',
            }}
          ></div>

          {/* Side 2 */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 to-accent/20 opacity-50"
            style={{
              transform: 'rotateY(120deg) translateZ(58px)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              height: '180px',
              width: '120px',
              left: '50%',
              marginLeft: '-60px',
            }}
          ></div>

          {/* Side 3 */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 to-accent/20 opacity-50"
            style={{
              transform: 'rotateY(240deg) translateZ(58px)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              height: '180px',
              width: '120px',
              left: '50%',
              marginLeft: '-60px',
            }}
          ></div>
        </div>
      </div>
      <style jsx>{`
        .perspective-\[1000px\] {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        @keyframes prism-spin {
          from {
            transform: rotateX(-15deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-15deg) rotateY(360deg);
          }
        }
        .animate-prism-spin {
          animation: prism-spin 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
