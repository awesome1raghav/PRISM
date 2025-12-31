
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Factory, BarChart3, FileText, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const companyFeatures = [
    {
        href: '/company/facilities',
        icon: <Factory className="h-6 w-6 text-primary" />,
        title: 'My Facilities',
        description: 'View real-time environmental data from your registered industrial sites.'
    },
    {
        href: '/company/analytics',
        icon: <BarChart3 className="h-6 w-6 text-primary" />,
        title: 'Emissions Analytics',
        description: 'Analyze historical emissions data and track progress towards sustainability goals.'
    },
    {
        href: '/company/reports',
        icon: <FileText className="h-6 w-6 text-primary" />,
        title: 'Compliance Reports',
        description: 'Generate and submit automated compliance reports to regulatory bodies.'
    },
];

export default function CompanyConsolePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
                Compliance & Transparency Console
            </h1>
            <p className="text-muted-foreground">
                Monitor your environmental compliance and impact.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {companyFeatures.map((feature) => (
            <Link href={feature.href} key={feature.title} className="group">
                <Card className="bg-card/40 border-border/30 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {feature.icon}
                            <span>{feature.title}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            {feature.description}
                        </p>
                         <div className="text-primary font-semibold text-sm group-hover:underline flex items-center gap-1">
                            Go to {feature.title}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
           ))}
        </div>

        <div className="mt-8">
            <Link href="/company/recommendations" className="group">
                <Card className="bg-card/40 border-border/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Bot className="h-6 w-6 text-primary" />
                            <span>AI-Powered Recommendations</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Receive AI-driven suggestions for improving operational efficiency and reducing your environmental footprint.
                        </p>
                        <div className="text-primary font-semibold text-sm group-hover:underline flex items-center gap-1">
                            View Recommendations
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>

      </main>
    </div>
  );
}
