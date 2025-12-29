'use client';

import { cn } from '@/lib/utils';

export default function Logo({
  className,
  isAnimated = false,
}: {
  className?: string;
  isAnimated?: boolean;
}) {
  return (
    <div
      className={cn(
        'h-6 w-6',
        isAnimated && 'animate-cube-spin',
        'transform-style-3d',
        className
      )}
    >
      <div className="relative h-full w-full transform-style-3d">
        <div className="absolute h-full w-full border border-primary/50 bg-primary/10 transform-translate-z-3"></div>
        <div className="absolute h-full w-full border border-primary/50 bg-primary/10 transform-rotate-y-90 transform-translate-z-3"></div>
        <div className="absolute h-full w-full border border-primary/50 bg-primary/10 transform-rotate-y-180 transform-translate-z-3"></div>
        <div className="absolute h-full w-full border border-primary/50 bg-primary/10 transform-rotate-y-270 transform-translate-z-3"></div>
        <div className="absolute h-full w-full border border-primary/50 bg-primary/10 transform-rotate-x-90 transform-translate-z-3"></div>
        <div className="absolute h-full w-full border border-primary/50 bg-primary/10 transform-rotate-x-270 transform-translate-z-3"></div>
      </div>
      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .animate-cube-spin {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
        .transform-translate-z-3 {
            transform: translateZ(12px);
        }
        .transform-rotate-y-90 {
            transform: rotateY(90deg) translateZ(12px);
        }
        .transform-rotate-y-180 {
            transform: rotateY(180deg) translateZ(12px);
        }
        .transform-rotate-y-270 {
            transform: rotateY(-90deg) translateZ(12px);
        }
        .transform-rotate-x-90 {
            transform: rotateX(90deg) translateZ(12px);
        }
        .transform-rotate-x-270 {
            transform: rotateX(-90deg) translateZ(12px);
        }
      `}</style>
    </div>
  );
}
