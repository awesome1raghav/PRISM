import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Prism } from './prism';

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center pt-32 pb-40 overflow-hidden">
      <Prism />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl text-slate-100">
            PRISM
          </h1>
          <p className="mt-4 text-xl font-semibold text-slate-400 sm:text-2xl max-w-3xl mx-auto">
            Pollution Reporting & Intelligent Surveillance Mechanism
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg">
              <Link href="/dashboard">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 border-2 border-blue-500 text-blue-300 font-semibold hover:bg-blue-900/40 hover:text-blue-200">
              <Link href="/report">Report an Issue</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
