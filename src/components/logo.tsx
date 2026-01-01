import { cn } from '@/lib/utils';

export default function Logo({
  className,
}: {
  className?: string;
  isAnimated?: boolean;
}) {
  return (
    <div className={cn('h-8 w-8 relative flex items-center justify-center', className)}>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#4A90E2', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: '#2C5E9E', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="grad-green" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#50E3C2', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: '#2F8571', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="grad-orange" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{stopColor: '#F5A623', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: '#D0891D', stopOpacity:1}} />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>
        
        {/* Hexagonal shape with facets */}
        <g transform="translate(50, 50)">
          <path d="M0 -40 L34.64 -20 L34.64 20 L0 40 L-34.64 20 L-34.64 -20 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
          
          {/* Top facet */}
          <path d="M0 -40 L-34.64 -20 L0 -20 Z" fill="#4A90E2" opacity="0.8" />
          <path d="M0 -40 L34.64 -20 L0 -20 Z" fill="#5A98DE" opacity="0.8" />
          
          {/* Left facet */}
          <path d="M-34.64 -20 L-34.64 20 L0 20 L0 -20 Z" fill="#50E3C2" opacity="0.8"/>
          
          {/* Right facet */}
          <path d="M34.64 -20 L34.64 20 L0 20 L0 -20 Z" fill="#F5A623" opacity="0.8"/>
          
          {/* Bottom facet */}
           <path d="M0 40 L-34.64 20 L0 20 Z" fill="#4BC0A8" opacity="0.8" />
          <path d="M0 40 L34.64 20 L0 20 Z" fill="#D99420" opacity="0.8" />

          {/* Inner data network icon */}
           <circle cx="0" cy="0" r="3" fill="white" opacity="0.9" />
           <path d="M0 0 L-10 5 M0 0 L12 6 M0 0 L8 -10 M-10 5 L-5 -8 M12 6 L-5 -8 M8 -10 L -10 5" stroke="white" strokeWidth="0.7" fill="none" opacity="0.7"/>

        </g>
      </svg>
    </div>
  );
}
