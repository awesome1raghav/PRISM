import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="text-primary" />
          <span className="font-bold sm:inline-block">P.R.I.S.M</span>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="#">Report Pollution</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="#">View Live Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
