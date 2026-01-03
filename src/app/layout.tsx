import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { LocationProvider } from '@/context/LocationContext';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/context/ThemeContext';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans', weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'PRISM - Real-Time Pollution Intelligence',
  description:
    'PRISM uses AI, IoT sensors, and predictive analytics to monitor pollution across air, water, and land in real time for a cleaner planet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          manrope.variable
        )}
      >
        <FirebaseClientProvider>
          <LocationProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </LocationProvider>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
