import { Button } from '@/components/ui/button';
import Link from 'next/link';
import InteractiveBackground from './interactive-background';

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center pt-32 pb-40 overflow-hidden">
       <InteractiveBackground />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl text-foreground">
            PRISM
          </h1>
          <p className="mt-4 text-xl font-semibold text-muted-foreground sm:text-2xl max-w-3xl mx-auto">
            Pollution Reporting & Intelligent Surveillance Mechanism
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Link href="/dashboard">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-foreground border-border hover:bg-accent hover:text-accent-foreground">
              <Link href="/report">Report an Issue</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
