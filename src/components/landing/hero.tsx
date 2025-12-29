import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[550px] w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-card -z-10" />
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 30%, hsl(var(--primary) / 0.3), transparent 30%), radial-gradient(circle at 75% 70%, hsl(var(--accent) / 0.3), transparent 30%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Environmental Intelligence, In Real Time.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            AI-driven monitoring across air, water, and land.
          </p>
          <div className="mt-8 mb-10 max-w-md mx-auto">
            <div className="gradient-line"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#">Report Pollution</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
