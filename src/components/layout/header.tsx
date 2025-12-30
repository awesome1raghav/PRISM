'use client';
import { useState, useEffect } from 'react';
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
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/20'
      )}
    >
      <div className="container flex h-24 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo className="text-primary" />
          <span className="font-bold sm:inline-block text-foreground">PRISM</span>
        </Link>
        <nav className="flex-1">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
                {pathname === link.href && (
                  <div className="absolute top-full mt-2 left-0 w-full h-0.5 bg-primary/50 rounded-full" />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <Button asChild className="group">
            <Link href="/access">
              Access PRISM <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
