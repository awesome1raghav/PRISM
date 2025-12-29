import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import MetricsStrip from '@/components/landing/metrics-strip';
import KeyFeatures from '@/components/landing/key-features';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MetricsStrip />
        <KeyFeatures />
      </main>
      <Footer />
    </div>
  );
}
