
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilePlus, FileText, CheckCircle, Clock, MoreHorizontal, ChevronDown, Download, Upload, BarChart, Calendar, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Separator } from '@/components/ui/separator';

const complianceData = {
    summary: {
        status: 'Compliant',
        daysCompliant: '342 / 365',
        violations: '2 (Minor)',
        lastAudit: '12 Nov 2025'
    },
    timeline: [
      { date: '05 Jan 2026', category: 'Air', status: 'Compliant', reference: 'Auto Log' },
      { date: '18 Dec 2025', category: 'Air', status: 'Warning', reference: 'TH-EX-114' },
      { date: '02 Dec 2025', category: 'Water', status: 'Compliant', reference: 'Auto Log' },
    ],
    documents: [
      { name: 'Monthly Emission Report (PDF)', type: 'pdf' },
      { name: 'Sensor Calibration Certificate', type: 'cert' },
      { name: 'Maintenance Log', type: 'log' },
    ]
}

type TimelineEntry = typeof complianceData.timeline[0];


const RecordDetailSheet = ({ record, open, onOpenChange }: { record: TimelineEntry | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    if (!record) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[480px] sm:max-w-none">
                <SheetHeader>
                    <SheetTitle>Compliance Record – {record.category} Emissions</SheetTitle>
                    <SheetDescription>Record details for {record.reference}</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-semibold">{record.date}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={record.status === 'Warning' ? 'destructive' : 'default'}>{record.status}</Badge>
                    </div>
                    {record.status === 'Warning' && (
                        <>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-semibold">27 minutes</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Pollutant:</span>
                                <span className="font-semibold">PM2.5</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Action Taken:</span>
                                <span className="font-semibold">Filter maintenance</span>
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Resolved On:</span>
                                <span className="font-semibold">Same day</span>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};


export default function ReportsPage() {
  const [selectedRecord, setSelectedRecord] = useState<TimelineEntry | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
                Compliance Records
            </h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                        Facility: <span className="font-semibold ml-1">Whitefield Manufacturing Unit</span> <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="whitefield">
                        <DropdownMenuRadioItem value="whitefield">Whitefield Manufacturing Unit</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="peenya">Peenya Industrial Plant</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                        Record Type: <span className="font-semibold ml-1">Emission</span> <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="emission">
                        <DropdownMenuRadioItem value="emission">Emission</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="water">Water</DropdownMenuRadioItem>
                         <DropdownMenuRadioItem value="waste">Waste</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                       Time Range: <span className="font-semibold ml-1">Last 12 Months</span> <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                 <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="12m">
                        <DropdownMenuRadioItem value="24h">Last 24 Hours</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="7d">Last 7 Days</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="30d">Last 30 Days</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="12m">Last 12 Months</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        
        <Card className="mb-8">
            <CardHeader><CardTitle>Compliance Summary</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                 <Card className="bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                         <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                         <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">Compliant</div>
                    </CardContent>
                </Card>
                 <Card className="bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                         <CardTitle className="text-sm font-medium">Days Compliant</CardTitle>
                         <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{complianceData.summary.daysCompliant}</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                         <CardTitle className="text-sm font-medium">Violations</CardTitle>
                         <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{complianceData.summary.violations}</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                         <CardTitle className="text-sm font-medium">Last Audit</CardTitle>
                         <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{complianceData.summary.lastAudit}</div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>


        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Compliance Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reference</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {complianceData.timeline.map((entry) => (
                                    <TableRow key={entry.reference} onClick={() => setSelectedRecord(entry)} className="cursor-pointer">
                                        <TableCell>{entry.date}</TableCell>
                                        <TableCell>{entry.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={entry.status === 'Warning' ? 'destructive' : 'default'}>{entry.status}</Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">{entry.reference}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Supporting Documents</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                       {complianceData.documents.map(doc => (
                            <div key={doc.name} className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/30">
                               <span>{doc.name}</span>
                               <Download className="h-4 w-4 text-muted-foreground" />
                           </div>
                       ))}
                        <Separator className="my-2" />
                        <div className="flex flex-col gap-2">
                            <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Document</Button>
                            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download All</Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Regulatory Reports</CardTitle></CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Button><FilePlus className="mr-2 h-4 w-4" /> Generate Monthly Report</Button>
                        <Button><FilePlus className="mr-2 h-4 w-4" /> Generate Annual Summary</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
        <RecordDetailSheet record={selectedRecord} open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)} />
      </main>
    </div>
  );
}

