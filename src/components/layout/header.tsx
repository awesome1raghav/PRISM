'use client';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/report', label: 'Report' },
  { href: '/citizen', label: 'Citizen' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="text-primary" isAnimated={true} />
          <span className="font-bold sm:inline-block">PRISM</span>
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          {pathname !== '/report' && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/report">Report Pollution</Link>
            </Button>
          )}
          {pathname !== '/dashboard' && (
            <Button asChild size="sm">
              <Link href="/dashboard">View Live Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
