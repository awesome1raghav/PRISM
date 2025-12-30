'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog';
import { Building, Landmark, User, MoveRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import React from 'react';

const roles = [
  {
    name: 'Citizen',
    description: 'Access local data, report issues, and view health advisories.',
    icon: <User className="h-8 w-8 text-primary" />,
    href: '/citizen',
  },
  {
    name: 'Government',
    description: 'Monitor city-wide trends, manage alerts, and analyze data.',
    icon: <Landmark className="h-8 w-8 text-primary" />,
    href: '/dashboard',
  },
  {
    name: 'Company',
    description: 'Track facility emissions and manage environmental compliance.',
    icon: <Building className="h-8 w-8 text-primary" />,
    href: '/company',
  },
];

export default function RoleSelectionDialog({ children }: {children: React.ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl glassmorphism-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Access PRISM As...</DialogTitle>
          <DialogDescription className="text-center">
            Select your role to view a tailored experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {roles.map((role) => (
             <DialogTrigger asChild key={role.name}>
                <Link href={role.href} className="block group">
                    <div className="p-6 border border-border/30 rounded-lg bg-card/40 hover:bg-card/80 hover:border-primary/40 transition-all h-full flex flex-col">
                        <div className="flex items-center gap-4">
                            {role.icon}
                            <h3 className="text-lg font-bold text-foreground">{role.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 flex-grow">{role.description}</p>
                        <div className="text-primary font-semibold text-sm mt-4 flex items-center gap-1">
                            Continue <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
             </DialogTrigger>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
