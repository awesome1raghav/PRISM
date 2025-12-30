'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Factory, BarChart3, FileText, Bot } from 'lucide-react';

export default function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
                Corporate Responsibility Dashboard
            </h1>
            <p className="text-muted-foreground">
                Monitor your environmental compliance and impact.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Factory className="h-6 w-6 text-primary" />
                        <span>My Facilities</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        View real-time environmental data from your registered industrial sites.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        <span>Emissions Analytics</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground">
                        Analyze historical emissions data and track progress towards sustainability goals.
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <span>Compliance Reports</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Generate and submit automated compliance reports to regulatory bodies.
                    </p>
                </CardContent>
            </Card>

             <Card className="bg-card/40 border-border/30 lg:col-span-3">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-primary" />
                        <span>AI-Powered Recommendations</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Receive AI-driven suggestions for improving operational efficiency and reducing your environmental footprint.
                    </p>
                </CardContent>
            </Card>

        </div>
      </main>
    </div>
  );
}
