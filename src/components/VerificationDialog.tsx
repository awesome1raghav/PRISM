
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Landmark, Building, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Role = 'government' | 'company' | 'citizen' | null;

interface VerificationDialogProps {
  role: Role;
  onClose: () => void;
}

const VerificationDialog = ({ role, onClose }: VerificationDialogProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Reset state when dialog role changes or closes
    if (!role) {
      setTimeout(() => {
        setStep(1);
        setOtp('');
        setIsVerifying(false);
      }, 300); // Wait for dialog close animation
    } else {
        setStep(1);
    }
  }, [role]);

  const handleSendOtp = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 1500); // Simulate API call
  };

  const handleVerify = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (role === 'government' || role === 'company') {
        setStep(4);
      } else {
        setStep(3); 
      }
    }, 1500);
  };
  
  const handleRedirect = () => {
    if (role === 'citizen') {
        router.push('/citizen');
    } else {
        router.push(`/activate?role=${role}`);
    }
    onClose();
  };

  const getDialogContent = () => {
    if (!role) return null;

    if (step === 3) {
      return (
        <div className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verification Successful</h2>
            <p className="text-muted-foreground mb-6">You now have access to the citizen dashboard.</p>
            <Button onClick={handleRedirect} className="w-full">Proceed to Dashboard</Button>
        </div>
      )
    }

    if (step === 4) {
      if (role === 'government') {
        return (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <Landmark className="h-6 w-6 text-primary" /> Government Responsibility Overview
              </DialogTitle>
              <DialogDescription>
                You are responsible for monitoring, verifying, and acting on environmental risks in your assigned jurisdiction.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4 text-center">
                <Card className="bg-muted/40">
                    <CardHeader><CardTitle>Bengaluru Urban</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Assigned Jurisdiction</p></CardContent>
                </Card>
                <Card className="bg-muted/40">
                    <CardHeader><CardTitle className="text-red-500">18</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Active Pollution Issues</p></CardContent>
                </Card>
                <Card className="bg-muted/40">
                    <CardHeader><CardTitle className="text-yellow-500">42h</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Avg. Response Time</p></CardContent>
                </Card>
                 <Card className="bg-muted/40">
                    <CardHeader><CardTitle>112</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Unresolved Reports</p></CardContent>
                </Card>
            </div>
            <DialogFooter>
                <Button onClick={handleRedirect} className="w-full">Confirm Responsibility & Enter</Button>
            </DialogFooter>
          </>
        )
      }
      if (role === 'company') {
        return (
           <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <Building className="h-6 w-6 text-primary" /> Company Impact Overview
              </DialogTitle>
              <DialogDescription>
               Your operations are monitored for environmental compliance and transparency.
              </DialogDescription>
            </DialogHeader>
             <div className="grid grid-cols-2 gap-4 py-4 text-center">
                <Card className="bg-muted/40">
                    <CardHeader><CardTitle>Whitefield Industrial</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Area of Impact</p></CardContent>
                </Card>
                <Card className="bg-muted/40">
                    <CardHeader><CardTitle className="text-yellow-500">Moderate</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Compliance Risk</p></CardContent>
                </Card>
                <Card className="bg-muted/40">
                    <CardHeader><CardTitle className="text-red-500">3</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Active Notices</p></CardContent>
                </Card>
                 <Card className="bg-muted/40">
                    <CardHeader><CardTitle>1</CardTitle></CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">AI Recommendations</p></CardContent>
                </Card>
            </div>
            <DialogFooter>
                <Button onClick={handleRedirect} className="w-full">Acknowledge & Enter</Button>
            </DialogFooter>
          </>
        )
      }
    }


    const configs = {
      citizen: {
        title: 'Citizen Verification',
        icon: <User className="h-6 w-6 text-primary" />,
        inputId: 'aadhaar',
        inputLabel: 'Aadhaar Number',
        inputPlaceholder: 'XXXX XXXX XXXX',
        privacyNote: 'Your Aadhaar is used only for verification and is not stored or shared.',
      },
      government: {
        title: 'Government Access Verification',
        icon: <Landmark className="h-6 w-6 text-primary" />,
        inputId: 'govId',
        inputLabel: 'Government / Department ID',
        inputPlaceholder: 'Enter your official ID',
        privacyNote: 'Access is monitored and audited for security purposes.',
      },
      company: {
        title: 'Company Verification',
        icon: <Building className="h-6 w-6 text-primary" />,
        inputId: 'gstin',
        inputLabel: 'GSTIN',
        inputPlaceholder: 'Enter your company GSTIN',
        privacyNote: 'Company access is monitored for compliance and transparency.',
      },
    };

    const config = configs[role];

    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            {config.icon} {config.title}
          </DialogTitle>
          <DialogDescription>
            Please confirm your identity to proceed securely.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="space-y-2">
                <Label htmlFor={config.inputId}>{config.inputLabel}</Label>
                <Input id={config.inputId} placeholder={config.inputPlaceholder} />
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" disabled={isVerifying} className="w-full">
                  {isVerifying ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </DialogFooter>
            </form>
          )}
          {step === 2 && (
             <form onSubmit={handleVerify}>
                <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input 
                        id="otp" 
                        placeholder="Enter the 6-digit code" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        autoFocus
                    />
                    <p className="text-xs text-muted-foreground">An OTP has been sent to your registered mobile number.</p>
                </div>
                 <DialogFooter className="mt-6">
                    <Button type="submit" disabled={!otp || isVerifying} className="w-full">
                        {isVerifying ? 'Verifying...' : 'Verify & Proceed'}
                    </Button>
                 </DialogFooter>
            </form>
          )}
           <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border border-border">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">{config.privacyNote}</p>
            </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={!!role} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {getDialogContent()}
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
