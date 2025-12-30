import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Prism } from './prism';

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center pt-24 pb-32 overflow-hidden">
      <Prism />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-600">
              Clarity for a
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400">
              Cleaner Planet.
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl max-w-3xl mx-auto">
            PRISM transforms environmental data into clear, actionable insights, empowering communities and authorities to build a sustainable future.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg">
              <Link href="/dashboard">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/80 border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 hover:text-blue-700">
              <Link href="/report">Report an Issue</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
