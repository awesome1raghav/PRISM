'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Prism } from './prism';
import { Lasers } from './lasers';

const InteractiveBackground: React.FC = () => {
  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden bg-background'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-sky-950/20 to-teal-950/20 opacity-50" />
      <Lasers />
      <Prism />
       <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-radial from-cyan-500/10 via-transparent to-transparent opacity-70"
        style={{ animation: 'pulse 8s infinite ease-in-out' }}
      ></div>
      <div
        className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-background via-blue-900/10 to-teal-900/10 opacity-40"
        style={{ animation: 'bubble-float 25s infinite linear' }}
      ></div>
      <div
        className="absolute bottom-0 right-[-20%] top-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-background via-green-900/10 to-sky-900/10 opacity-30"
        style={{ animation: 'bubble-float 30s infinite linear reverse' }}
      ></div>
      <div
        className="absolute bottom-[20%] left-[10%] top-auto h-[300px] w-[300px] rounded-full bg-gradient-to-br from-background via-teal-900/10 to-blue-900/10 opacity-20"
        style={{ animation: 'bubble-float 20s infinite linear' }}
      ></div>
      <style jsx>{`
        @keyframes bubble-float {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-40px) translateX(20px) scale(1.1);
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBackground;
