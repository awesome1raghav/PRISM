import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import KeyFeatures from '@/components/landing/key-features';
import MetricsStrip from '@/components/landing/metrics-strip';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <Header />
      <main className="flex-grow z-10">
        <Hero />
        <MetricsStrip />
        <KeyFeatures />
      </main>
    </div>
  );
}
