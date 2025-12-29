import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import KeyFeatures from '@/components/landing/key-features';
import Impact from '@/components/landing/impact';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <KeyFeatures />
        <Impact />
      </main>
      <Footer />
    </div>
  );
}
