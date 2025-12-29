import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-6 w-6', className)}
    >
      <path d="M12 2 L2 8 L12 14 L22 8 L12 2 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
      <path d="M2 8 L2 16 L12 22 L12 14 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
      <path d="M22 8 L22 16 L12 22 L12 14 Z" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
      
      <path d="M16 11 L20 9" strokeWidth="1.5" className="text-primary" />
      <path d="M18 13 L22 11" strokeWidth="1" className="text-accent" />
    </svg>
  );
}
