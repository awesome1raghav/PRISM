'use client';

import { cn } from '@/lib/utils';

export function Prism() {
  return (
    <div className={cn("absolute inset-0 z-10 flex items-center justify-center opacity-50 perspective-[1000px] pointer-events-none")}>
    </div>
  );
}
