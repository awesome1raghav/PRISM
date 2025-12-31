
'use client';

import { useContext, Suspense } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocationContext } from '@/context/LocationContext';
import { cn } from '@/lib/utils';
import { reports, Report, ReportCategory } from '@/app/citizen/types';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';

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
    Poor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Severe: 'bg-red-500/20 text-red-400 border-red-500/30',
    Unhealthy: 'bg-red-500/20 text-red-400 border-red-500/30',
    Safe: 'bg-green-500/20 text-green-400 border-green-500/30',
    Warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
    Low: 'bg-green-500/20 text-green-400 border-green-500/30',
    'Very High': 'bg-red-500/20 text-red-400 border-red-500/30',
};


const getStatus = (metric: 'aqi' | 'wqi' | 'noise', value: number) => {
    if (metric === 'aqi') {
      if (value <= 50) return 'Good';
      if (value <= 100) return 'Moderate';
      if (value <= 150) return 'Poor';
      return 'Unhealthy';
    }
    if (metric === 'wqi') {
       if (value >= 80) return 'Good';
       if (value >= 60) return 'Safe';
       if (value >= 40) return 'Warning';
       return 'Poor';
    }
    // noise
    if (value <= 60) return 'Low';
    if (value <= 80) return 'Moderate';
    if (value <= 100) return 'High';
    return 'Very High';
  }

function MetricDetailContent({
  metric,
  title,
  unit,
  icon,
  healthEffects,
  calculationInfo,
}: MetricDetailPageProps) {
  const { locationData } = useContext(LocationContext);
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || 'Bengaluru';
  const cityData = locationData[location];
  
  const metricKey = metric.toLowerCase() as 'aqi' | 'wqi' | 'noise';

  if (!cityData || cityData.wards.length === 0) {
      return (
           <div className="flex min-h-screen flex-col bg-background text-foreground">
                <Header />
                <main className="flex-grow container py-12 flex items-center justify-center">
                    <p>Loading data for {location}...</p>
                </main>
           </div>
      )
  }

  const avgValue = Math.round(cityData.wards.reduce((sum, ward) => sum + ward.live_data[metricKey], 0) / cityData.wards.length);
  const status = getStatus(metricKey, avgValue);

  const metricData = {
      value: avgValue,
      status: status
  }

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
                <p className="text-muted-foreground">{cityData.name}</p>
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
                        <CardTitle>Live City-Wide Average</CardTitle>
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


export default function MetricDetailPage(props: MetricDetailPageProps) {
  return (
    <Suspense fallback={<div>Loading details...</div>}>
      <MetricDetailContent {...props} />
    </Suspense>
  )
}
