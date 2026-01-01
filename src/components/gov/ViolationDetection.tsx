'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, ChevronRight } from 'lucide-react';
import { type Violation, type Confidence, type ViolationSource } from '@/app/gov/types';
import { cn } from '@/lib/utils';
import AIReport from './AIReport';


const violations: Violation[] = [
  { 
    id: 'V-001',
    type: 'Emission Limit Breach', 
    location: 'Peenya Industrial Area', 
    time: '2h ago', 
    confidence: 'High', 
    source: 'Industry',
    summary: 'AQI in Peenya Industrial Area is currently Poor (158), triggered by a sudden spike in PM2.5 levels detected 2 hours ago. This correlates with 3 citizen complaints about thick smoke in the area. Wind patterns are currently blowing southwest, towards residential zones.',
    impact: {
      vulnerableGroups: ['children', 'elderly', 'asthmatics'],
      riskLevel: 'HIGH',
      populationImpacted: 'est. 15,000 residents',
      sensitiveZones: ['Peenya Public School (2km)', 'ESI Hospital (3km)']
    },
    recommendations: [
      { action: 'Issue public health warning for Peenya and surrounding areas via SMS and social media.', priority: 'Immediate' },
      { action: 'Dispatch mobile air quality monitoring unit to verify sensor readings and identify the precise source.', priority: 'Short-term' },
      { action: 'Initiate on-site inspection of factories with a history of emission violations in the area.', priority: 'Short-term' },
      { action: 'Increase sensor polling frequency in the affected area to once every 2 minutes for the next 6 hours.', priority: 'Monitoring' }
    ],
    responsibleDepartments: ['Pollution Control Board', 'Municipal Health Department', 'Disaster Management Cell'],
    escalationLogic: {
      deadline: 'Response required within 1 hour',
      rule: 'If no action is taken, escalate to State Environmental Secretary and trigger automated public health alert.'
    },
    explanation: 'High confidence is based on a 98% correlation with historical emission signatures from Factory ID #F7891 during nighttime production cycles. Weather models predict low wind dispersion for the next 4 hours, increasing ground-level pollutant concentration. A similar incident in 2023 led to a 40% increase in respiratory complaints.'
  },
  { id: 'V-002', type: 'Sudden Pollution Spike', location: 'Marathahalli', time: '5h ago', confidence: 'Medium', source: 'Traffic' },
  { id: 'V-003', type: 'Illegal Dumping', location: 'Near Varthur Lake', time: '1 day ago', confidence: 'High', source: 'Unknown' },
  { id: 'V-004', type: 'Noise Limit Breach', location: 'Koramangala', time: '3h ago', confidence: 'Low', source: 'Event' },
  { id: 'V-005', type: 'Chemical Effluent Release', location: 'Bellandur Canal', time: '8h ago', confidence: 'High', source: 'Industry' },
];

const confidenceStyles: Record<Confidence, string> = {
  Low: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function ViolationDetection() {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(violations[0]);

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot />
                        <span>AI-Detected Violations</span>
                    </CardTitle>
                    <CardDescription>
                        System-generated alerts pending review.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border/30">
                        {violations.map((violation) => (
                        <div
                            key={violation.id}
                            onClick={() => setSelectedViolation(violation)}
                            className={cn(
                                "flex items-center justify-between p-3 cursor-pointer transition-colors",
                                selectedViolation?.id === violation.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                            )}
                        >
                            <div>
                                <p className="font-semibold">{violation.type}</p>
                                <p className="text-sm text-muted-foreground">{violation.location}</p>
                                <p className="text-xs text-muted-foreground">{violation.time}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className={cn(confidenceStyles[violation.confidence])}>
                                    {violation.confidence}
                                </Badge>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            {selectedViolation ? (
                <AIReport violation={selectedViolation} />
            ) : (
                <Card className="bg-card/40 border-border/30 h-full flex items-center justify-center">
                    <CardContent>
                        <p className="text-muted-foreground">Select a violation to view the AI-generated report.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}
