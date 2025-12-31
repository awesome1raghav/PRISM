
'use client';

import { useContext } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocationContext } from '@/context/LocationContext';
import { cn } from '@/lib/utils';
import { reports, Report } from '@/app/citizen/types';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '../ui/button';

interface MetricDetailPageProps {
  metric: 'air' | 'water' | 'noise';
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

const categoryMap = {
    air: 'Air',
    water: 'Water',
    noise: 'Noise'
}

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
  const metricData = data[metric];

  const relevantReports = reports.filter(
    (report) => report.category === categoryMap[metric] && report.status !== 'Closed'
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
                        <CardTitle>Health Effects</CardTitle>
                        <CardDescription>
                            Understanding the impact of current {metric} quality levels on your health.
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
                 <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Pending Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {relevantReports.length > 0 ? (
                           <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    There are <span className="font-bold text-foreground">{relevantReports.length}</span> active {metric} pollution reports in this area.
                                </p>
                                {relevantReports.map(report => (
                                    <Link href={`/citizen/track/${report.id}`} key={report.id}>
                                        <div className="p-3 bg-muted/50 rounded-md hover:bg-muted/80 transition-colors flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                 <FileText className="h-4 w-4" />
                                                <span className="text-sm font-medium">{report.id}</span>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </Link>
                                ))}
                                <Button asChild variant="outline" className="w-full mt-2">
                                     <Link href="/citizen/reports">View All Reports</Link>
                                </Button>
                           </div>
                       ) : (
                           <p className="text-muted-foreground text-center py-4">
                               No active {metric} pollution reports in your area.
                            </p>
                       )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
