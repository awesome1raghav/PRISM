
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle, Hourglass, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { Report, ReportStatus } from '../types';
import { cn } from '@/lib/utils';

const reports: Report[] = [
  {
    id: 'PR-183491',
    category: 'Water',
    date: '2 days ago',
    status: 'Verified',
  },
  {
    id: 'PR-183488',
    category: 'Air',
    date: '5 days ago',
    status: 'Action Taken',
  },
  {
    id: 'PR-183482',
    category: 'Noise',
    date: '1 week ago',
    status: 'Closed',
  },
    {
    id: 'PR-183495',
    date: '1 hour ago',
    category: 'Waste',
    status: 'Submitted',
  },
];

const statusStyles: Record<ReportStatus, string> = {
    Submitted: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    Verified: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    'Action Taken': "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Closed: "bg-green-500/20 text-green-400 border-green-500/30",
};

const statusIcons: Record<ReportStatus, JSX.Element> = {
    Submitted: <Hourglass className="h-3 w-3 mr-1" />,
    Verified: <Clock className="h-3 w-3 mr-1" />,
    'Action Taken': <Clock className="h-3 w-3 mr-1" />,
    Closed: <CheckCircle className="h-3 w-3 mr-1" />,
}

export default function ReportsPage() {
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

        <Card className="bg-card/40 border-border/30">
            <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>Track the status of environmental issues you have reported.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report ID</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map(report => (
                            <TableRow key={report.id}>
                                <TableCell>
                                    <div className="font-mono text-xs flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" /> {report.id}
                                    </div>
                                </TableCell>
                                <TableCell>{report.category}</TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn(statusStyles[report.status])}>
                                        {statusIcons[report.status]}
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="ghost" size="sm">
                                        <Link href={`/citizen/track/${report.id}`}>
                                            Track <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
