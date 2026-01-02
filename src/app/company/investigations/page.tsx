
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Check, Gavel, Calendar, Building, FileText, Upload, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const investigation = {
    active: true,
    status: 'Evidence Requested',
    severity: 'High',
    category: 'Air Emissions',
    caseId: 'GOV-INV-2391',
    initiatedDate: '02 Jan 2026',
    forwardedBy: 'State Pollution Control Board',
    facility: 'Whitefield Manufacturing Unit',
    reason: 'Emission levels for PM2.5 consistently exceeded permitted thresholds over a 48-hour period, as detected by the PRISM sensor network and corroborated by satellite data.',
    timeline: [
        { name: 'Report Accepted', status: 'completed' },
        { name: 'Forwarded by Govt', status: 'completed' },
        { name: 'Evidence Requested', status: 'active' },
        { name: 'Inspection Scheduled', status: 'pending' },
        { name: 'Case Closed', status: 'pending' },
    ],
    requiredActions: [
        {
            title: 'Upload Sensor Data Logs',
            description: 'Provide raw sensor data for sensors AQ-01, AQ-03, and MET-01 for the period of 01 Jan 2026 to 02 Jan 2026.',
            deadline: '05 Jan 2026',
        },
        {
            title: 'Submit Filter Maintenance Records',
            description: 'Provide all maintenance and replacement logs for the primary smokestack filter for the last 6 months.',
            deadline: '05 Jan 2026',
        }
    ],
    outcome: null,
    department: 'State Pollution Control Board',
};

const statusStyles: Record<string, string> = {
    'No Investigation': "bg-green-500/20 text-green-400 border-green-500/30",
    'Evidence Requested': "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    'Inspection Scheduled': "bg-orange-500/20 text-orange-400 border-orange-500/30",
    'Closed': "bg-gray-700/20 text-gray-500 border-gray-700/30",
};

const severityStyles: Record<string, string> = {
    'Low': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'High': 'bg-red-500/20 text-red-400 border-red-500/30',
};


export default function InvestigationPage() {
    
    if (!investigation.active) {
        return (
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <Header />
              <main className="flex-grow container py-12 flex items-center justify-center">
                <Card className="max-w-md text-center bg-card/40 border-border/30">
                    <CardHeader>
                        <ShieldCheck className="h-12 w-12 text-green-400 mx-auto" />
                        <CardTitle className="mt-4">No Active Investigations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">You are currently compliant with all regulatory authorities.</p>
                        <Button variant="outline" className="mt-6">View Historical Cases</Button>
                    </CardContent>
                </Card>
              </main>
            </div>
        )
    }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Regulatory Investigation Status</h1>
            <p className="text-muted-foreground">Case ID: <span className="font-mono">{investigation.caseId}</span></p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Reason for Investigation</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{investigation.reason}</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Case Progress</CardTitle></CardHeader>
                    <CardContent>
                        <ol className="relative flex items-center w-full">
                            {investigation.timeline.map((step, index) => (
                                <li key={step.name} className={cn(
                                    "flex w-full items-center",
                                    index < investigation.timeline.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-border after:border-2 after:inline-block" : "",
                                    step.status === 'completed' ? "after:border-primary" : "after:border-dashed",
                                )}>
                                    <div className="flex flex-col items-center">
                                        <span className={cn(
                                            "flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors",
                                            step.status === 'completed' ? "bg-primary text-primary-foreground" : 
                                            step.status === 'active' ? "bg-yellow-500/20 ring-2 ring-yellow-500 text-yellow-400" : "bg-muted text-muted-foreground"
                                        )}>
                                            {step.status === 'completed' ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                        </span>
                                        <p className="text-xs text-center mt-2 w-20">{step.name}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>

                 <Card className="bg-yellow-500/10 border-yellow-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-400"><AlertTriangle /> Required Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {investigation.requiredActions.map((action, index) => (
                            <Card key={index} className="bg-background/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">{action.title}</CardTitle>
                                    <CardDescription>Deadline: {action.deadline}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col sm:flex-row gap-4 justify-between">
                                    <p className="text-sm text-muted-foreground flex-grow">{action.description}</p>
                                    <Button variant="outline" className="flex-shrink-0">
                                        <Upload className="mr-2 h-4 w-4" /> Upload Document
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

            </div>

             {/* Right Column */}
            <div className="space-y-6">
                <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Status Summary</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-sm">
                            <p className="font-semibold text-muted-foreground">Current Status</p>
                            <Badge variant="outline" className={cn(statusStyles[investigation.status])}>{investigation.status}</Badge>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-muted-foreground">Severity Level</p>
                            <Badge variant="outline" className={cn(severityStyles[investigation.severity])}>{investigation.severity}</Badge>
                        </div>
                        <div className="text-sm">
                            <p className="font-semibold text-muted-foreground">Category</p>
                            <p>{investigation.category}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Case Identification</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div>
                            <p className="font-semibold text-muted-foreground flex items-center gap-2"><Gavel /> Forwarded By</p>
                            <p>{investigation.forwardedBy}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-muted-foreground flex items-center gap-2"><Building /> Investigating Department</p>
                            <p>{investigation.department}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-muted-foreground flex items-center gap-2"><Calendar /> Initiated Date</p>
                            <p>{investigation.initiatedDate}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-muted-foreground flex items-center gap-2"><FileText /> Facility Under Investigation</p>
                            <p>{investigation.facility}</p>
                        </div>
                    </CardContent>
                </Card>

                {investigation.outcome && (
                    <Card className="bg-card/40 border-border/30">
                        <CardHeader><CardTitle>Outcome</CardTitle></CardHeader>
                        <CardContent>
                            ...
                        </CardContent>
                    </Card>
                )}
            </div>

        </div>
      </main>
    </div>
  );
}
