import { Button } from '@/components/ui/button';
import Link from 'next/link';
import InteractiveBackground from './interactive-background';

export default function Hero() {
  return (
    <section className="relative h-[650px] w-full flex items-center justify-center overflow-hidden">
      <InteractiveBackground />
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, hsl(var(--primary) / 0.1), transparent 40%), radial-gradient(circle at 85% 80%, hsl(var(--accent) / 0.1), transparent 40%)',
        }}
      />
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Environmental Intelligence, Refracted in Real Time.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
            Transforming environmental data into clarity and action.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/report">Report Pollution</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
