'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CitizenLoginPage() {
  const [step, setStep] = useState('aadhaar'); // 'aadhaar', 'otp'
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API to send OTP
    console.log('Sending OTP for Aadhaar:', aadhaar);
    setStep('otp');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the OTP
    console.log('Verifying OTP:', otp);
    // On success, redirect to dashboard
    router.push('/citizen');
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
            <CardTitle className="text-2xl">Citizen Login</CardTitle>
            <CardDescription>
              Secure access using your Aadhaar number.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'aadhaar' && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number</Label>
                  <Input
                    id="aadhaar"
                    type="text"
                    placeholder="Enter your 12-digit Aadhaar number"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    required
                    pattern="\d{12}"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter the 6-digit OTP sent to your mobile"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    pattern="\d{6}"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="link" size="sm" className="w-full" onClick={() => setStep('aadhaar')}>
                    Go Back
                </Button>
              </form>
            )}

            <div className="mt-6 flex items-start gap-3 text-xs text-muted-foreground p-3 bg-secondary/30 rounded-md">
                <Shield className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                    <span className="font-semibold text-foreground">Privacy Notice:</span> Your Aadhaar is used only for verification and is not stored or shared.
                </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
