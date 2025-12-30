import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import KeyFeatures from '@/components/landing/key-features';
import MetricsStrip from '@/components/landing/metrics-strip';
import Footer from '@/components/layout/footer';
import InteractiveBackground from '@/components/landing/interactive-background';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <InteractiveBackground />
      <Header />
      <main className="flex-grow z-10">
        <Hero />
        <MetricsStrip />
        <KeyFeatures />
      </main>
      <Footer />
    </div>
  );
}
