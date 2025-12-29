import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="text-primary" />
              <span className="text-lg font-bold">PRISM</span>
            </Link>
            <p className="text-muted-foreground">
              Real-time intelligence for a cleaner, healthier planet.
            </p>
          </div>
          <div className="lg:col-span-2 flex flex-col items-start sm:items-end gap-6">
             <div className="flex flex-col items-start sm:items-end gap-2">
                <h3 className="font-semibold text-lg">Ready to make a difference?</h3>
                <p className="text-muted-foreground">Join us in the mission for environmental transparency.</p>
             </div>
             <div className="flex gap-4">
                <Button variant="outline">Report Pollution</Button>
                <Button>View Live Dashboard</Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PRISM Initiative. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
