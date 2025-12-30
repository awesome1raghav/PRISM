
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Landmark, Building, ShieldCheck, MoveRight, FileLock2, Fingerprint } from 'lucide-react';
import Link from 'next/link';

const roles = [
  {
    name: 'Citizen',
    description: 'Monitor pollution in your area, receive health guidance, and report issues.',
    icon: <User className="h-10 w-10 text-primary" />,
    href: '/citizen',
    action: 'Enter as Citizen'
  },
  {
    name: 'Government',
    description: 'Verify data, monitor compliance, and take corrective action.',
    icon: <Landmark className="h-10 w-10 text-primary" />,
    href: '/dashboard',
    action: 'Enter as Government'
  },
  {
    name: 'Company',
    description: 'View compliance status, receive alerts, and respond to notices.',
    icon: <Building className="h-10 w-10 text-primary" />,
    href: '/company',
    action: 'Enter as Company'
  },
];

const securityFeatures = [
    {
        icon: <User className="h-5 w-5 text-muted-foreground" />,
        text: "Citizens' personal details are not publicly visible."
    },
    {
        icon: <FileLock2 className="h-5 w-5 text-muted-foreground" />,
        text: "Companies are verified via official business identifiers."
    },
    {
        icon: <Fingerprint className="h-5 w-5 text-muted-foreground" />,
        text: "Government access requires authorized credentials and is audited."
    }
]

export default function AccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight">
            Access PRISM
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose your role to access environmental intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-16">
          {roles.map((role) => (
             <Card key={role.name} className="bg-card/40 border-border/30 text-center flex flex-col hover:border-primary/40 hover:bg-card/60 transition-all duration-300 group">
                <CardHeader className="items-center">
                    {role.icon}
                    <CardTitle className="text-2xl pt-4">{role.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground flex-grow">
                        {role.description}
                    </p>
                    <Button asChild className="mt-8 w-full">
                        <Link href={role.href}>{role.action} <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                    </Button>
                </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="max-w-3xl w-full text-center p-6 bg-card/20 border border-border/20 rounded-lg">
             <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldCheck className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-semibold text-foreground">Access is role-based and data is protected.</h3>
            </div>
            <div className="space-y-3 text-left max-w-md mx-auto">
                {securityFeatures.map(feature => (
                    <div key={feature.text} className="flex items-start gap-3 text-sm text-muted-foreground">
                        {feature.icon}
                        <span>{feature.text}</span>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}
