import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';

export default function Logo({
  className,
}: {
  className?: string;
  isAnimated?: boolean;
}) {
  return (
    <div className={cn('h-8 w-8 relative flex items-center justify-center bg-primary rounded-full shadow-md', className)}>
      <Leaf className="h-5 w-5 text-primary-foreground" />
    </div>
  );
}
