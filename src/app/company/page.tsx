
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Factory, BarChart3, FileText, Bot, ArrowRight, Shield, ShieldAlert, ShieldCheck, Gavel } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const investigation = {
    active: true,
    caseId: 'GOV-INV-2391',
    severity: 'High',
    category: 'Air Emissions',
};


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
        title: 'Compliance Records',
        description: 'Generate and submit automated compliance reports to regulatory bodies.'
    },
     {
        href: '/company/recommendations',
        icon: <Bot className="h-6 w-6 text-primary" />,
        title: 'AI-Powered Recommendations',
        description: 'Receive AI-driven suggestions for improving operational efficiency.'
    },
];

const FeatureCard = ({ feature }: { feature: typeof companyFeatures[0]}) => (
     <Link href={feature.href} key={feature.title} className="group block">
        <Card className="bg-card border-border/60 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    {feature.icon}
                    <span>{feature.title}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                    {feature.description}
                </p>
            </CardContent>
            <CardFooter>
                 <div className="text-primary font-semibold text-sm group-hover:underline flex items-center gap-1">
                    Go to {feature.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </CardFooter>
        </Card>
    </Link>
)

export default function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="mb-12">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    Company Dashboard
                </h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Status: <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">Compliant</Badge></span>
                <span>Last Sync: 2 min ago</span>
                <span>User: Plant Manager</span>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/company/investigations" className="group block lg:col-span-1">
                <Card className={cn(
                    "bg-card border-border/60 border-l-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                    investigation.active 
                        ? 'border-l-red-500 hover:shadow-red-500/10'
                        : 'border-l-green-500 hover:shadow-green-500/10'
                )}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {investigation.active ? <Gavel className="h-6 w-6 text-red-400" /> : <ShieldCheck className="h-6 w-6 text-green-400" />}
                            <span>Regulatory Investigation Status</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {investigation.active ? (
                            <div className="space-y-2">
                                <div className="font-bold text-red-400 flex items-center gap-2"><ShieldAlert className="h-5 w-5" /> Investigation Initiated</div>
                                <div className="text-sm text-muted-foreground">Case ID: <span className="font-mono text-xs">{investigation.caseId}</span></div>
                                <div className="text-sm text-muted-foreground">Severity: <Badge variant="destructive">{investigation.severity}</Badge></div>
                                <div className="text-sm text-muted-foreground">Category: {investigation.category}</div>
                            </div>
                        ) : (
                             <div className="space-y-2">
                                <p className="font-semibold text-green-400">No Active Investigations</p>
                                <p className="text-sm text-muted-foreground">You are currently compliant with regulatory authorities.</p>
                            </div>
                        )}
                        </CardContent>
                        <CardFooter>
                            <div className="text-primary font-semibold text-sm group-hover:underline flex items-center gap-1 mt-4">
                                {investigation.active ? 'View Case' : 'View Status'}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardFooter>
                </Card>
            </Link>

           {companyFeatures.map((feature) => (
            <FeatureCard feature={feature} key={feature.title} />
           ))}
        </div>
      </main>
    </div>
  );
}
