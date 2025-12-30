'use client';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/citizen', label: 'For Citizens' },
  { href: '/report', label: 'Report Issue' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="text-primary" isAnimated={false} />
          <span className="font-bold sm:inline-block text-foreground">PRISM</span>
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href
                      ? 'text-primary font-semibold'
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
          <Button asChild className="bg-primary text-primary-foreground group shadow-lg hover:bg-primary/90">
            <Link href="/access">
              Access PRISM <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
