
'use client';

import { useContext } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocationContext } from '@/context/LocationContext';
import { cn } from '@/lib/utils';
import { reports, Report, ReportCategory } from '@/app/citizen/types';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '../ui/button';

interface MetricDetailPageProps {
  metric: ReportCategory;
  title: string;
  unit: string;
  icon: JSX.Element;
  healthEffects: { level: string; effect: string }[];
  calculationInfo: string;
}

const statusColors: Record<string, string> = {
  Good: 'bg-green-500/20 text-green-400 border-green-500/30',
  Moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Poor: 'bg-red-500/20 text-red-400 border-red-500/30',
  Safe: 'bg-green-500/20 text-green-400 border-green-500/30',
  Warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-red-500/20 text-red-400 border-red-500/30',
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function MetricDetailPage({
  metric,
  title,
  unit,
  icon,
  healthEffects,
  calculationInfo,
}: MetricDetailPageProps) {
  const { location, locationData } = useContext(LocationContext);
  const data = locationData[location] || locationData['Koramangala, Bengaluru'];
  
  const metricKey = metric.toLowerCase() as 'air' | 'water' | 'noise';
  const metricData = data[metricKey];

  const relevantReports = reports.filter(
    (report) => report.category === metric && report.status !== 'Closed'
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">{data.name}</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                 <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Pending Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {relevantReports.length > 0 ? (
                           <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    There are <span className="font-bold text-foreground">{relevantReports.length}</span> active {metricKey} pollution reports in this area.
                                </p>
                                <Button asChild variant="outline" className="w-full">
                                     <Link href="/citizen/reports">View All Reports <ArrowRight className="h-4 w-4 ml-2" /></Link>
                                </Button>
                           </div>
                       ) : (
                           <p className="text-muted-foreground text-center py-4">
                               No active {metricKey} pollution reports in your area.
                            </p>
                       )}
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Health Effects</CardTitle>
                        <CardDescription>
                            Understanding the impact of current {metricKey} quality levels on your health.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {healthEffects.map((item, index) => (
                             <div key={index} className="p-4 bg-muted/50 rounded-lg">
                                <h3 className="font-semibold">{item.level}</h3>
                                <p className="text-sm text-muted-foreground">{item.effect}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>How it's Calculated</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{calculationInfo}</p>
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                <Card className="bg-card/40 border-border/30 text-center">
                    <CardHeader>
                        <CardTitle>Live Reading</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-6xl font-bold">{metricData.value}<span className="text-2xl text-muted-foreground ml-2">{unit}</span></p>
                        <Badge variant="outline" className={cn("mt-4 text-lg", statusColors[metricData.status])}>
                            {metricData.status}
                        </Badge>
                    </CardContent>
                </Card>
                 
            </div>
        </div>
      </main>
    </div>
  );
}
