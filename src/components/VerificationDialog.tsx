
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
import { User, Landmark, Building, ShieldAlert, KeyRound, CheckCircle, Info } from 'lucide-react';

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
    }
  }, [role]);

  const handleSendOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 1500); // Simulate API call
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3); // Success step
    }, 1500);
  };
  
  const handleRedirect = () => {
    const redirectPath = role === 'citizen' ? '/citizen' : role === 'company' ? '/company' : '/dashboard';
    router.push(redirectPath);
    onClose();
  };

  const getDialogContent = () => {
    if (!role) return null;

    if (step === 3) {
      return (
        <div className="text-center p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Verification Successful</h2>
            <p className="text-muted-foreground mb-6">You now have access to the {role} dashboard.</p>
            <Button onClick={handleRedirect} className="w-full">Proceed to Dashboard</Button>
        </div>
      )
    }

    const configs = {
      citizen: {
        title: 'Citizen Verification',
        icon: <User className="h-6 w-6 text-primary" />,
        inputId: 'aadhaar',
        inputLabel: 'Aadhaar Number',
        inputPlaceholder: 'XXXX XXXX XXXX',
        privacyNote: 'Your Aadhaar is used only for verification and is not stored or shared.',
        href: '/citizen'
      },
      government: {
        title: 'Government Access Verification',
        icon: <Landmark className="h-6 w-6 text-primary" />,
        inputId: 'govId',
        inputLabel: 'Government / Department ID',
        inputPlaceholder: 'Enter your official ID',
        privacyNote: 'Access is monitored and audited for security purposes.',
        href: '/dashboard'
      },
      company: {
        title: 'Company Verification',
        icon: <Building className="h-6 w-6 text-primary" />,
        inputId: 'gstin',
        inputLabel: 'GSTIN',
        inputPlaceholder: 'Enter your company GSTIN',
        privacyNote: 'Company access is monitored for compliance and transparency.',
        href: '/company'
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
            <div className="space-y-2">
              <Label htmlFor={config.inputId}>{config.inputLabel}</Label>
              <Input id={config.inputId} placeholder={config.inputPlaceholder} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input 
                    id="otp" 
                    placeholder="Enter the 6-digit code" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">An OTP has been sent to your registered mobile number.</p>
            </div>
          )}
           <div className="flex items-start gap-3 p-3 rounded-md bg-muted/50 border border-border">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">{config.privacyNote}</p>
            </div>
        </div>
        <DialogFooter>
          {step === 1 && (
             <Button onClick={handleSendOtp} disabled={isVerifying} className="w-full">
                {isVerifying ? 'Sending OTP...' : 'Send OTP'}
             </Button>
          )}
          {step === 2 && (
            <Button onClick={handleVerify} disabled={!otp || isVerifying} className="w-full">
                {isVerifying ? 'Verifying...' : 'Verify & Proceed'}
            </Button>
          )}
        </DialogFooter>
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
