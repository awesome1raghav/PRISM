'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type Role = 'gov' | 'co' | 'citizen';

function getRoleFromPath(path: string): Role {
  if (path.startsWith('/gov')) {
    return 'gov';
  }
  if (path.startsWith('/company')) {
    return 'co';
  }
  return 'citizen';
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);

  useEffect(() => {
    document.body.classList.remove('theme-gov', 'theme-co', 'theme-citizen');
    document.body.classList.add(`theme-${role}`);
  }, [role]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
