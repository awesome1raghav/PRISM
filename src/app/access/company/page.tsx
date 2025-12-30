'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CompanyLoginPage() {
  const [gstin, setGstin] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the GSTIN and use an auth method
    console.log('Verifying GSTIN:', gstin);
    // On success, redirect to a company-specific dashboard
    router.push('/dashboard'); 
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container py-12 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card/40 border-border/30">
          <CardHeader className="text-center">
             <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Company Login</CardTitle>
            <CardDescription>
              Access for compliance and data reporting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gstin">Company GSTIN</Label>
                <Input
                  id="gstin"
                  type="text"
                  placeholder="Enter your 15-character GSTIN"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  required
                />
              </div>
              {/* This is a placeholder for a real OTP or other auth step */}
              <Button type="submit" className="w-full">
                Verify and Login
              </Button>
            </form>
             <div className="mt-6 flex items-start gap-3 text-xs text-muted-foreground p-3 bg-secondary/30 rounded-md">
                <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                    <span className="font-semibold text-foreground">Compliance Notice:</span> Company data is monitored for environmental compliance and transparency purposes.
                </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
