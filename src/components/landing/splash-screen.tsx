'use client';

import Logo from '@/components/logo';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [showTagline, setShowTagline] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 1500); // Time before tagline appears
    
    const animationTimer = setTimeout(() => {
        setIsAnimating(false);
    }, 4000);

    return () => {
        clearTimeout(taglineTimer);
        clearTimeout(animationTimer);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-1000"
    >
      <div className="w-48 h-48 md:w-64 md:h-64 animate-[scale-up_1.5s_cubic-bezier(0.19,1,0.22,1)_forwards,fade-in_1s_ease-out_forwards]">
        <Logo isAnimated={isAnimating} />
      </div>
      <div className="mt-8 text-center">
        <h1
          className={`text-2xl md:text-4xl font-bold tracking-widest text-foreground transition-all duration-1000 ${showTagline ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}
          style={{ letterSpacing: '0.2em' }}
        >
          P.R.I.S.M
        </h1>
        <p className={`text-xs md:text-sm text-muted-foreground tracking-widest transition-all duration-1000 delay-300 ${showTagline ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
          ENVIRONMENTAL INTELLIGENCE
        </p>
      </div>
    </div>
  );
}
