'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilePlus, FileText, CheckCircle, Clock, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const reports = [
  {
    name: 'Q2 2024 Emissions Report',
    date: 'July 15, 2024',
    status: 'Submitted',
    id: 'REP-2024-Q2-001',
  },
  {
    name: 'Annual Sustainability Report 2023',
    date: 'April 5, 2024',
    status: 'Submitted',
    id: 'REP-2023-AN-005',
  },
  {
    name: 'Q1 2024 Water Usage Report',
    date: 'April 2, 2024',
    status: 'Submitted',
    id: 'REP-2024-Q1-012',
  },
    {
    name: 'Q3 2024 Emissions Report',
    date: 'Pending',
    status: 'Draft',
    id: 'REP-2024-Q3-DRAFT',
  },
];

const statusStyles = {
    Submitted: "bg-green-500/20 text-green-400 border-green-500/30",
    Draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
};

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
                Compliance Reports
            </h1>
            <Button>
                <FilePlus className="mr-2 h-4 w-4" /> Generate New Report
            </Button>
        </div>

        <Card className="bg-card/40 border-border/30">
            <CardHeader>
                <CardTitle>Report History</CardTitle>
                <CardDescription>Manage and view your generated compliance reports.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Report Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Report ID</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map(report => (
                            <TableRow key={report.id}>
                                <TableCell>
                                    <div className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" /> {report.name}
                                    </div>
                                </TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={statusStyles[report.status as keyof typeof statusStyles]}>
                                        {report.status === 'Submitted' && <CheckCircle className="h-3 w-3 mr-1" />}
                                        {report.status === 'Draft' && <Clock className="h-3 w-3 mr-1" />}
                                        {report.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">{report.id}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
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
