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
          {/* Gradients derived from the described palette */}
          <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'hsl(180, 35%, 55%)', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'hsl(180, 45%, 40%)', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="grad-green" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: 'hsl(90, 35%, 60%)', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'hsl(90, 40%, 45%)', stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="grad-amber" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{stopColor: 'hsl(30, 70%, 65%)', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'hsl(30, 60%, 50%)', stopOpacity:1}} />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>
        
        {/* Main hexagonal prism shape */}
        <g transform="translate(50, 50)">
          <path d="M0 -40 L34.64 -20 L34.64 20 L0 40 L-34.64 20 L-34.64 -20 Z" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="2" />
          
          {/* Top facet with teal gradient */}
          <path d="M0 -40 L-34.64 -20 L0 -20 Z" fill="url(#grad-teal)" opacity="0.8" />
          <path d="M0 -40 L34.64 -20 L0 -20 Z" fill="url(#grad-teal)" opacity="0.6" />
          
          {/* Left facet with green gradient */}
          <path d="M-34.64 -20 L-34.64 20 L0 40 L0 -20 Z" fill="url(#grad-green)" opacity="0.8"/>
          
          {/* Right facet with amber gradient */}
          <path d="M34.64 -20 L34.64 20 L0 40 L0 -20 Z" fill="url(#grad-amber)" opacity="0.8"/>
          
          {/* Inner data network icon */}
           <circle cx="0" cy="0" r="4" fill="white" opacity="0.9" filter="url(#glow)" />
           <path d="M0 0 L-15 8 M0 0 L17 9 M0 0 L10 -15 M-15 8 L-8 -12 M17 9 L-8 -12 M10 -15 L -15 8" stroke="white" strokeWidth="1" fill="none" opacity="0.6"/>
        </g>
      </svg>
    </div>
  );
}
