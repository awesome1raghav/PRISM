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
    <div className={cn('h-6 w-6 relative', className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Prism Core */}
        <path
          d="M12 2L4 6.5V15.5L12 20L20 15.5V6.5L12 2Z"
          className="stroke-primary/50"
          strokeWidth="1.5"
          fill="hsl(var(--primary) / 0.1)"
        />
        <path
          d="M4 6.5L12 11L20 6.5"
          className="stroke-primary/40"
          strokeWidth="1"
        />
        <path d="M12 11V20" className="stroke-primary/40" strokeWidth="1" />
        
        {isAnimated && (
          <>
            {/* Animated Signal Lines */}
            <g className="signal-group">
              <path
                className="signal-path"
                d="M1 9L12 13L23 9"
                stroke="hsl(var(--accent))"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                className="signal-path signal-delay-1"
                d="M1 12L12 16L23 12"
                stroke="hsl(var(--primary))"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
               <path
                className="signal-path signal-delay-2"
                d="M1 15L12 19L23 15"
                stroke="hsl(var(--accent))"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>
          </>
        )}
      </svg>
      {isAnimated && (
        <style jsx>{`
          .signal-path {
            stroke-dasharray: 10 20;
            stroke-dashoffset: 30;
            animation: flow 4s linear infinite;
            opacity: 0;
          }

          @keyframes flow {
            0% {
              stroke-dashoffset: 30;
              opacity: 0;
            }
            25% {
                opacity: 0.8;
            }
            75% {
              stroke-dashoffset: -30;
              opacity: 0.8;
            }
            100% {
              stroke-dashoffset: -30;
              opacity: 0;
            }
          }
          
          .signal-delay-1 {
            animation-delay: 1.3s;
          }
          .signal-delay-2 {
            animation-delay: 2.6s;
          }
        `}</style>
      )}
    </div>
  );
}
