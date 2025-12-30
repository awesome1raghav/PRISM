'use client';

import React, { useState, useEffect } from 'react';

type LaserStyle = {
  '--delay': string;
  '--duration': string;
  '--top-start': string;
  '--left-start': string;
  '--top-end': string;
  '--left-end': string;
  '--color': string;
  '--width': string;
  animationName: 'move-laser-diag' | 'move-laser-horiz' | 'move-laser-curve';
};

export function Lasers() {
  const [laserStyles, setLaserStyles] = useState<LaserStyle[]>([]);
  const laserCount = 20;
  const colors = ['#06b6d4', '#2dd4bf', '#3b82f6']; // cyan, teal, blue

  useEffect(() => {
    const generateStyles = () => {
      return Array.from({ length: laserCount }).map((_, i) => {
        const animationType = i % 3;
        let animationName: LaserStyle['animationName'];

        switch (animationType) {
          case 0:
            animationName = 'move-laser-diag';
            break;
          case 1:
            animationName = 'move-laser-horiz';
            break;
          default:
            animationName = 'move-laser-curve';
            break;
        }

        const style = {
          '--delay': `${Math.random() * 15}s`,
          '--duration': `${Math.random() * 8 + 7}s`,
          '--top-start': `${Math.random() * 100}%`,
          '--left-start': `${-10 + Math.random() * 20}%`,
          '--top-end': `${Math.random() * 100}%`,
          '--left-end': `${90 + Math.random() * 20}%`,
          '--color': colors[i % colors.length],
          '--width': `${Math.random() > 0.5 ? '2px' : '1px'}`,
        } as Omit<LaserStyle, 'animationName'>;

        return { ...style, animationName };
      });
    };
    setLaserStyles(generateStyles());
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {laserStyles.map((style, i) => {
          return (
            <div
              key={`laser-${i}`}
              className="laser"
              style={style as React.CSSProperties}
            ></div>
          );
        })}
      </div>
      <style jsx>{`
        .laser {
          position: absolute;
          width: var(--width);
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color),
            transparent
          );
          opacity: 0;
          animation: var(--duration) var(--delay) linear infinite;
          filter: blur(1.5px) brightness(1.2);
          transform-origin: center;
          transition: filter 0.3s ease-out, opacity 0.3s ease-out;
        }

        :global(.group:hover) .laser, :global(section:hover) .laser {
            filter: blur(0.5px) brightness(1.8);
            animation-play-state: paused;
        }

        @keyframes move-laser-horiz {
          0% {
            transform: translateX(var(--left-start)) translateY(var(--top-start)) scaleX(0.1);
            opacity: 0;
          }
          10% {
            transform: translateX(calc(var(--left-start) + 10%)) translateY(var(--top-start)) scaleX(1);
            opacity: 0.8;
          }
          90% {
            transform: translateX(calc(var(--left-end) - 10%)) translateY(var(--top-end)) scaleX(1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(var(--left-end)) translateY(var(--top-end)) scaleX(0.1);
            opacity: 0;
          }
        }
        
        @keyframes move-laser-diag {
          0% {
            transform: translate(var(--left-start), var(--top-start)) rotate(-30deg) scaleX(0.1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
            transform: translate(calc(var(--left-start) + 10vw), calc(var(--top-start) + 10vh)) rotate(-30deg) scaleX(1);
          }
          90% {
            opacity: 0.8;
            transform: translate(calc(var(--left-end) - 10vw), calc(var(--top-end) - 10vh)) rotate(-30deg) scaleX(1);
          }
          100% {
            transform: translate(var(--left-end), var(--top-end)) rotate(-30deg) scaleX(0.1);
            opacity: 0;
          }
        }
        
        @keyframes move-laser-curve {
          0% {
            transform: translate(var(--left-start), var(--top-start)) rotate(20deg) scaleX(0.2);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translate(50vw, 50vh) rotate(0deg) scaleX(1.2);
            opacity: 1;
             filter: blur(0px) brightness(2);
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translate(var(--left-end), var(--top-end)) rotate(-20deg) scaleX(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
