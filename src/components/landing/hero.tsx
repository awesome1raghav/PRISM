
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import InteractiveBackground from './interactive-background';

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center pt-32 pb-48 overflow-hidden">
      <InteractiveBackground />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-6xl font-semibold tracking-tighter sm:text-7xl md:text-8xl text-foreground drop-shadow-lg [text-shadow:0_0_25px_hsl(var(--primary)/0.8),0_0_10px_hsl(var(--primary)/0.5)]">
            PRISM
          </h1>
          <p className="mt-6 text-lg text-muted-foreground/80 sm:text-xl max-w-3xl mx-auto text-balance [text-shadow:0_0_10px_hsl(var(--background)/0.9)]">
            Pollution Real-Time Intelligent Surveillance Model
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/30">
              <Link href="/access">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-foreground border-border/60 hover:bg-white/5 hover:border-border hover:text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20">
              <Link href="/report">Report an Issue</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
