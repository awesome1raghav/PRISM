import { cn } from '@/lib/utils';

export default function Logo({
  className,
  isAnimated = false,
}: {
  className?: string;
  isAnimated?: boolean;
}) {
  const animationClasses = isAnimated ? {
    outerRing: 'opacity-0 stroke-dasharray-[1000] stroke-dashoffset-[1000] animate-[draw-ring_1.5s_ease-out_forwards_0.5s]',
    innerRing: 'opacity-0 animate-[fade-in_1s_ease-out_forwards_0.8s]',
    facet1: 'opacity-0 animate-[fade-in_0.7s_ease-out_forwards_1.5s]',
    facet2: 'opacity-0 animate-[fade-in_0.7s_ease-out_forwards_1.6s]',
    facet3: 'opacity-0 animate-[fade-in_0.7s_ease-out_forwards_1.7s]',
    facet4: 'opacity-0 animate-[fade-in_0.7s_ease-out_forwards_1.8s]',
    facet5: 'opacity-0 animate-[fade-in_0.7s_ease-out_forwards_1.9s]',
    facet6: 'opacity-0 animate-[fade-in_0.7s_ease-out_forwards_2.0s]',
    centerNetwork: 'opacity-0 animate-[fade-in_1s_ease-out_forwards_2.5s]'
  } : {};
  
  return (
    <div className={cn('h-full w-full relative flex items-center justify-center', className)}>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#E6C98A'}} />
            <stop offset="100%" style={{stopColor: '#B48B52'}} />
          </linearGradient>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#3A8DCD'}} />
            <stop offset="100%" style={{stopColor: '#255A8A'}} />
          </linearGradient>
          <linearGradient id="grad-green" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#4CAF50'}} />
            <stop offset="100%" style={{stopColor: '#388E3C'}} />
          </linearGradient>
          <linearGradient id="grad-red" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{stopColor: '#F47C5C'}} />
            <stop offset="100%" style={{stopColor: '#D34C2C'}} />
          </linearGradient>
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        </defs>

        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#grad-gold)" strokeWidth="4" className={animationClasses.outerRing} />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#2c3e50" strokeWidth="8" className={animationClasses.innerRing}/>
        
        <g transform="translate(50, 50) rotate(30)">
            <path d="M0 -32 L27.7 -16 L27.7 16 L0 32 L-27.7 16 L-27.7 -16 Z" fill="hsl(var(--background) / 0.8)" />
            
            <path d="M0 -32 L-27.7 -16 L0 -16 Z" fill="url(#grad-blue)" className={animationClasses.facet1} />
            <path d="M0 -32 L27.7 -16 L0 -16 Z" fill="#6CB9E1" className={animationClasses.facet2} />
            <path d="M-27.7 -16 L-27.7 16 L0 16 L0 -16 Z" fill="url(#grad-green)" className={animationClasses.facet3}/>
            <path d="M-27.7 16 L0 32 L0 16 Z" fill="#76C779" className={animationClasses.facet4} />
            <path d="M27.7 -16 L27.7 16 L0 16 L0 -16 Z" fill="url(#grad-red)" className={animationClasses.facet5} />
            <path d="M27.7 16 L0 32 L0 16 Z" fill="#F7A188" className={animationClasses.facet6} />
        </g>

        <g transform="translate(50, 50)" filter="url(#glow)" className={animationClasses.centerNetwork}>
            <circle cx="0" cy="0" r="2" fill="white" opacity="0.9" />
            <path d="M0 0 L-10 5 M0 0 L12 6 M0 0 L7 -10 M-10 5 L-5 -8 M12 6 L-5 -8 M7 -10 L -10 5" stroke="white" strokeWidth="0.7" fill="none" opacity="0.7"/>
             <path d="M-5 -8 L12 6 M-4 9 L 7 -10" stroke="#F47C5C" strokeWidth="0.5" fill="none" opacity="0.8"/>
             <path d="M-10 5 L 0 0 L 12 6" stroke="#4CAF50" strokeWidth="0.5" fill="none" opacity="0.8"/>
        </g>
      </svg>
    </div>
  );
}
