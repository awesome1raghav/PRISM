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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', isAnimated && 'animate-slow-spin', className)}
    >
      <path
        d="M12 2 L2 8 L12 14 L22 8 L12 2 Z"
        stroke="currentColor"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M2 8 L2 16 L12 22 L12 14 Z"
        stroke="currentColor"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M22 8 L22 16 L12 22 L12 14 Z"
        stroke="currentColor"
        fill="currentColor"
        fillOpacity="0.1"
      />

      <path d="M16 11 L20 9" strokeWidth="1.5" className="text-primary" />
      <path d="M18 13 L22 11" strokeWidth="1" className="text-accent" />
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .animate-slow-spin {
          animation: spin 15s linear infinite;
        }
      `}</style>
    </svg>
  );
}
