'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

export function Prism() {
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const requestRef = useRef<number>();

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY, currentTarget } = event;
    const { innerWidth, innerHeight } = window;
    
    // Normalize cursor position from -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -((clientY / innerHeight) * 2 - 1);

    // Update rotation. Multiply for more sensitivity.
    setRotation({
      x: y * 45 - 15, // Tilt between -60 and 30 degrees
      y: x * 45,     // Rotate based on x position
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if(requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-0 z-0 flex items-center justify-center opacity-40 perspective-[1000px] pointer-events-none'
      )}
    >
      <div
        className={cn(
          'w-64 h-64 transform-style-3d',
          'animate-prism-spin'
        )}
        style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="absolute w-full h-full transform-style-3d">
          {/* Base */}
          <div
            className="absolute top-0 left-0 w-full h-full border-b-[100px] border-b-primary/40 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent opacity-80"
            style={{
              transform: 'rotateX(-90deg) translateZ(50px)',
            }}
          ></div>

          {/* Side 1 */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/30 to-accent/40 opacity-70"
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
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/30 to-accent/40 opacity-70"
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
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/30 to-accent/40 opacity-70"
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
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .animate-prism-spin {
          animation: prism-spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
