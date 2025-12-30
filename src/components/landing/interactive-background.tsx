'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMousePosition({
          x: x / rect.width,
          y: y / rect.height,
        });
      }
    };

    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const interactionStyle = {
    '--mouse-x': mousePosition.x,
    '--mouse-y': mousePosition.y,
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 z-0 overflow-hidden bg-background isolate'
      )}
      style={interactionStyle}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-sky-950/20 to-teal-950/20 opacity-50" />
      
      {/* Energy Core */}
      <div className="energy-core"></div>
      <div className="energy-core-rays"></div>

      {/* Lasers */}
      <div className="lasers">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="laser-beam" style={{ '--i': i } as React.CSSProperties}></div>
        ))}
      </div>
      
      {/* Scan Lines */}
      <div className="scan-lines"></div>

      <style jsx>{`
        .isolate {
          isolation: isolate;
        }
        .energy-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 400px;
          height: 400px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 60%);
          border-radius: 50%;
          animation: pulse-core 6s infinite ease-in-out, rotate-core 30s linear infinite;
          filter: blur(40px);
          opacity: calc(0.5 + var(--mouse-y) * 0.5);
          transition: opacity 0.3s ease;
        }
        
        .energy-core-rays {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 800px;
          transform: translate(-50%, -50%);
          background: 
            repeating-conic-gradient(
              from calc(var(--mouse-x) * 15deg),
              rgba(0, 255, 255, 0.15) 0deg 5deg, 
              transparent 5deg 15deg
            );
          border-radius: 50%;
          animation: rotate-rays 40s linear infinite reverse;
          opacity: calc(0.3 + var(--mouse-x) * 0.4);
          transition: opacity 0.3s ease;
        }

        .lasers {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .laser-beam {
          position: absolute;
          width: 300%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.8), transparent);
          filter: blur(2px) drop-shadow(0 0 10px rgba(0, 220, 255, 1));
          opacity: 0;
          animation: move-laser 10s linear infinite;
          animation-delay: calc(var(--i) * -1.25s);
          transform-origin: 0 0;
        }
        
        .laser-beam:nth-child(odd) {
          animation-name: move-laser-2;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 180, 0.8), transparent);
          filter: blur(2px) drop-shadow(0 0 10px rgba(0, 255, 180, 1));
        }

        .scan-lines {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 255, 255, 0.15),
            rgba(0, 255, 255, 0) 3px,
            transparent 100px
          );
          background-size: 100% 100px;
          animation: scan 8s linear infinite;
          opacity: 0.5;
        }
        
        @keyframes pulse-core {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: calc(0.5 + var(--mouse-y) * 0.5); }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: calc(0.8 + var(--mouse-y) * 0.2); }
        }

        @keyframes rotate-core {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes rotate-rays {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes move-laser {
          0% {
            transform: translateX(-50%) rotate(-45deg);
            opacity: 0;
          }
          25% { opacity: calc(0.8 + var(--mouse-x) * 0.2); }
          50% {
            transform: translateX(100%) rotate(-45deg);
            opacity: 0;
          }
          100% {
            transform: translateX(100%) rotate(-45deg);
            opacity: 0;
          }
        }
        
        @keyframes move-laser-2 {
          0% {
            transform: translateY(-50%) rotate(35deg);
            opacity: 0;
          }
          25% { opacity: calc(0.8 + var(--mouse-y) * 0.2); }
          50% {
            transform: translateY(100%) rotate(35deg);
            opacity: 0;
          }
          100% {
            transform: translateY(100%) rotate(35deg);
            opacity: 0;
          }
        }
        
        @keyframes scan {
          from { background-position: 0 0; }
          to { background-position: 0 -100px; }
        }
        
        @media (max-width: 768px) {
          .lasers {
            display: none;
          }
          .energy-core {
            width: 250px;
            height: 250px;
          }
          .scan-lines {
            opacity: 0.3;
            animation-duration: 12s;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;
