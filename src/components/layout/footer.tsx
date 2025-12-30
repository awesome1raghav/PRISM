import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';
import { MoveRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-white/50 backdrop-blur-sm z-10">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="text-primary" isAnimated={false} />
              <span className="text-lg font-bold">PRISM</span>
            </Link>
            <p className="text-slate-500">
              Clear insights for a cleaner planet.
            </p>
          </div>
          <div className="lg:col-span-2 flex flex-col items-start sm:items-end gap-6">
             <div className="flex flex-col items-start sm:items-end gap-2">
                <h3 className="font-semibold text-lg text-slate-800">Ready to make a difference?</h3>
                <p className="text-slate-500">Join our mission for environmental transparency and action.</p>
             </div>
             <div className="flex gap-4">
                <Button asChild variant="outline" className="bg-white/80 border-2 border-blue-500 text-blue-600 font-semibold hover:bg-blue-50 hover:text-blue-700">
                    <Link href="/report">Report an Issue</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg group">
                    <Link href="/dashboard">
                        View Live Dashboard <MoveRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} PRISM Initiative. A community-driven project.</p>
        </div>
      </div>
    </footer>
  );
}
