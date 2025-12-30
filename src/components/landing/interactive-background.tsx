'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Prism } from './prism';

const InteractiveBackground: React.FC = () => {
  return (
    <div
      className={cn(
        'absolute inset-0 -z-10 overflow-hidden bg-white'
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-teal-50 to-green-100 opacity-60" />
      <Prism />
      <div
        className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white to-sky-200 opacity-50"
        style={{ animation: 'bubble-float 25s infinite linear' }}
      ></div>
      <div
        className="absolute bottom-0 right-[-20%] top-[20%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-white to-green-200 opacity-40"
        style={{ animation: 'bubble-float 30s infinite linear reverse' }}
      ></div>
      <div
        className="absolute bottom-[20%] left-[10%] top-auto h-[300px] w-[300px] rounded-full bg-gradient-to-br from-white to-teal-100 opacity-30"
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
      `}</style>
    </div>
  );
};

export default InteractiveBackground;
