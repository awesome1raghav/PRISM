import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[calc(100vh-3.5rem)] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground">
        <div className="container max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            Real-Time Intelligence for a Cleaner Planet
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/80 md:text-xl">
            P.R.I.S.M uses AI, IoT sensors, and predictive analytics to monitor pollution across air, water, and land in real time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#">View Live Dashboard</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#">Report Pollution</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
