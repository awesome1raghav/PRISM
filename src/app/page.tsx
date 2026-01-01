'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import KeyFeatures from '@/components/landing/key-features';
import MetricsStrip from '@/components/landing/metrics-strip';
import InteractiveBackground from '@/components/landing/interactive-background';
import SplashScreen from '@/components/landing/splash-screen';
import { cn } from '@/lib/utils';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Duration of the splash screen animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {loading && <SplashScreen />}
      <div className={cn("transition-opacity duration-1000", loading ? 'opacity-0' : 'opacity-100')}>
        <InteractiveBackground />
        <Header />
        <main className="flex-grow z-10">
          <Hero />
          <MetricsStrip />
          <KeyFeatures />
        </main>
      </div>
    </div>
  );
}
