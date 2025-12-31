
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import InteractiveBackground from '@/components/landing/interactive-background';

const activationConfig = {
  government: {
    title: 'Oversight System Activated',
    subtext: 'PRISM is now tracking environmental risks and citizen reports within your jurisdiction.',
    indicators: [
      { id: 'monitoring', text: 'Monitoring', status: 'Active' },
      { id: 'reports', text: 'Citizen Reports', status: 'Live' },
      { id: 'escalation', text: 'Escalation System', status: 'Enabled' },
    ],
    buttonText: 'Enter Government Console',
    redirectPath: '/gov',
  },
  company: {
    title: 'Compliance System Activated',
    subtext: 'PRISM is now monitoring environmental impact associated with your operations.',
    indicators: [
      { id: 'compliance', text: 'Compliance Monitoring', status: 'Active' },
      { id: 'reporting', text: 'Reporting Channel', status: 'Open' },
      { id: 'logging', text: 'Transparency Logging', status: 'Enabled' },
    ],
    buttonText: 'Enter Company Console',
    redirectPath: '/company',
  },
};

function ActivationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as 'government' | 'company' | null;

  if (!role || !activationConfig[role]) {
    // Handle invalid role or redirect
    return (
      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-bold">Invalid Activation Role</h1>
        <Button onClick={() => router.push('/access')} className="mt-4">
          Return to Role Selection
        </Button>
      </div>
    );
  }

  const config = activationConfig[role];

  return (
    <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-bold tracking-tight text-foreground drop-shadow-lg [text-shadow:0_0_15px_hsl(var(--primary)/0.6)]">
        {config.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground text-balance">
        {config.subtext}
      </p>

      <div className="mt-12 mb-12 w-full max-w-md space-y-4">
        {config.indicators.map((indicator, index) => (
          <div
            key={indicator.id}
            className="flex items-center justify-between p-4 rounded-lg bg-card/60 border border-border/30 animate-pulse-slow"
            style={{ animationDelay: `${index * 200}ms`, animationDuration: '2s' }}
          >
            <span className="font-medium text-muted-foreground">{indicator.text}</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">{indicator.status}</span>
            </div>
          </div>
        ))}
      </div>

      <Button
        size="lg"
        onClick={() => router.push(config.redirectPath)}
        className="shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:-translate-y-0.5"
      >
        {config.buttonText}
      </Button>
    </div>
  );
}


export default function ActivationPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background relative overflow-hidden">
            <InteractiveBackground />
             <Suspense fallback={<div>Loading...</div>}>
                <ActivationContent />
            </Suspense>
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }

                @keyframes pulse-slow {
                    0%, 100% { 
                        border-color: hsl(var(--border)/0.3);
                        box-shadow: none;
                    }
                    50% { 
                        border-color: hsl(var(--primary)/0.3);
                        box-shadow: 0 0 15px hsl(var(--primary)/0.1);
                    }
                }
                .animate-pulse-slow {
                    animation-name: pulse-slow;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
