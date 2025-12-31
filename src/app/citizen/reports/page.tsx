
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle, Hourglass, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Report, ReportStatus, reports } from '../types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const statusStyles: Record<ReportStatus, string> = {
    Submitted: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    Verified: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    'Action Taken': "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Closed: "bg-green-500/20 text-green-400 border-green-500/30",
};

const statusIcons: Record<ReportStatus, JSX.Element> = {
    Submitted: <Hourglass className="h-3 w-3" />,
    Verified: <Clock className="h-3 w-3" />,
    'Action Taken': <Clock className="h-3 w-3" />,
    Closed: <CheckCircle className="h-3 w-3" />,
};

const ReportCard = ({ report }: { report: Report }) => (
    <Card className="bg-card/40 border-border/30">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-lg font-semibold">{report.category} Pollution</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground flex items-center gap-2 pt-1">
                        <MapPin className="h-3 w-3" /> {report.location || 'Unknown Location'}
                    </CardDescription>
                </div>
                 <Badge variant="outline" className={cn(statusStyles[report.status], 'whitespace-nowrap')}>
                    {statusIcons[report.status]}
                    <span className="ml-1.5">{report.status}</span>
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
             <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Report ID</p>
                <p className="font-mono text-xs">{report.id}</p>
            </div>
             <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Date Submitted</p>
                <p className="text-sm">{report.date}</p>
            </div>
            <Button asChild className="w-full">
                <Link href={`/citizen/track/${report.id}`}>
                    Track Report <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </CardContent>
    </Card>
);

export default function ReportsPage() {
    const pendingReports = reports.filter(r => r.status !== 'Closed');
    const resolvedReports = reports.filter(r => r.status === 'Closed');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
                My Reported Issues
            </h1>
            <Button asChild>
                <Link href="/report">
                    Report a New Issue
                </Link>
            </Button>
        </div>

        <div className="space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-6">Pending Action</h2>
                {pendingReports.length > 0 ? (
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pendingReports.map(report => <ReportCard key={report.id} report={report} />)}
                    </div>
                ) : (
                    <p className="text-muted-foreground">You have no pending reports.</p>
                )}
            </section>

            <Separator />

            <section>
                <h2 className="text-2xl font-bold mb-6">Resolved Reports</h2>
                 {resolvedReports.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resolvedReports.map(report => <ReportCard key={report.id} report={report} />)}
                    </div>
                ) : (
                    <p className="text-muted-foreground">You have no resolved reports yet.</p>
                )}
            </section>
        </div>
        
      </main>
    </div>
  );
}
