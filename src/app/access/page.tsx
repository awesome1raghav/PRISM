'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building, Landmark } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccessPage() {
    const router = useRouter();

  const roles = [
    {
      name: 'Citizen',
      description: 'Access public dashboards, health alerts, and report environmental issues.',
      icon: <User className="h-8 w-8 text-primary" />,
      cta: 'Enter as Citizen',
      href: '/access/citizen',
    },
    {
      name: 'Government',
      description: 'Official access for authorities to monitor compliance, track incidents, and manage responses.',
      icon: <Landmark className="h-8 w-8 text-primary" />,
      cta: 'Enter as Government',
      href: '/access/government',
    },
    {
      name: 'Company',
      description: 'Access for registered companies to manage compliance data and reporting.',
      icon: <Building className="h-8 w-8 text-primary" />,
      cta: 'Enter as Company',
      href: '/access/company',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow container py-12 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to PRISM</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your role to securely access the PRISM platform. Each role has a tailored dashboard and specific permissions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {roles.map((role) => (
            <Card
              key={role.name}
              className="bg-card/40 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden group hover:-translate-y-1 cursor-pointer flex flex-col"
              onClick={() => router.push(role.href)}
            >
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                    {role.icon}
                </div>
                <CardTitle className="pt-4 text-2xl">{role.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <CardDescription className="flex-grow">{role.description}</CardDescription>
                <Button className="mt-6 w-full" variant="outline">
                    {role.cta}
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
