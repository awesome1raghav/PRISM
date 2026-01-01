
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


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
  { 
    id: 'V-002', 
    type: 'Sudden Pollution Spike', 
    location: 'Marathahalli', 
    time: '5h ago', 
    confidence: 'Medium', 
    source: 'Traffic',
    summary: 'A localized but significant spike in Carbon Monoxide (CO) was detected near the Marathahalli bridge during evening rush hour. The levels exceeded the safe threshold for over 45 minutes.',
    impact: {
      vulnerableGroups: ['commuters', 'street vendors'],
      riskLevel: 'MEDIUM',
      populationImpacted: 'est. 5,000 people in transit',
      sensitiveZones: ['Local Market (500m)']
    },
    recommendations: [
      { action: 'Review traffic camera footage to identify any large, idling commercial vehicles or unusual traffic blockages.', priority: 'Short-term' },
      { action: 'Cross-reference with public transport data to see if a bus breakdown occurred.', priority: 'Monitoring' },
      { action: 'If this pattern reoccurs, recommend deploying traffic police to improve flow during peak hours.', priority: 'Monitoring' }
    ],
    responsibleDepartments: ['Traffic Police', 'Regional Transport Office'],
    escalationLogic: {
      deadline: 'Analysis to be completed within 24 hours',
      rule: 'If spike repeats for 3 consecutive days, escalate to Traffic Management Committee.'
    },
    explanation: 'Medium confidence due to transient nature. The event signature matches heavy vehicular congestion. It does not match industrial emission patterns. Two citizen reports mentioned a "terrible smell" in the same timeframe.'
  },
  { 
    id: 'V-003', 
    type: 'Illegal Dumping', 
    location: 'Near Varthur Lake', 
    time: '1 day ago', 
    confidence: 'High', 
    source: 'Unknown',
    summary: 'Satellite imagery analysis from 24 hours ago shows new, unauthorized solid waste deposits near the Varthur Lake buffer zone. The deposit area is approximately 50 sq meters.',
    impact: {
      vulnerableGroups: ['local residents', 'aquatic life'],
      riskLevel: 'HIGH',
      populationImpacted: 'N/A',
      sensitiveZones: ['Varthur Lake (Ecologically Sensitive Area)']
    },
    recommendations: [
      { action: 'Dispatch a solid waste management team for immediate inspection and cleanup.', priority: 'Immediate' },
      { action: 'Install a temporary surveillance camera in the area to deter future dumping and identify culprits.', priority: 'Short-term' },
      { action: 'Analyze vehicle movement data on nearby roads during the suspected dumping time (night hours).', priority: 'Short-term' }
    ],
    responsibleDepartments: ['Solid Waste Management', 'Lake Development Authority', 'Local Police'],
    escalationLogic: {
      deadline: 'Cleanup to be initiated within 12 hours.',
      rule: 'If cleanup is not confirmed within 24 hours, escalate to the Municipal Commissioner.'
    },
    explanation: 'High confidence based on 99.7% change detection from high-resolution satellite imagery compared to the previous day. The location is a known hotspot for illegal dumping.'
  },
  { 
    id: 'V-004', 
    type: 'Noise Limit Breach', 
    location: 'Koramangala', 
    time: '3h ago', 
    confidence: 'Low', 
    source: 'Event',
    summary: 'Multiple noise sensors in Koramangala 4th Block registered levels between 75-80 dB for a 30-minute period, exceeding residential nighttime limits. The pattern is consistent with a public event or gathering.',
    impact: {
      vulnerableGroups: ['local residents'],
      riskLevel: 'LOW',
      populationImpacted: 'est. 2,000 residents',
      sensitiveZones: ['Residential apartments']
    },
    recommendations: [
      { action: 'Cross-check with local police for any event permits issued in the area.', priority: 'Monitoring' },
      { action: 'If no permit exists and complaints are received, dispatch a patrol unit to investigate.', priority: 'Short-term' }
    ],
    responsibleDepartments: ['Local Police'],
    escalationLogic: {
      deadline: 'Initial check to be completed within 2 hours.',
      rule: 'No automatic escalation unless citizen complaints are filed.'
    },
    explanation: 'Low confidence as the source is unconfirmed and could be a temporary, authorized event. The system has flagged it based on sensor data alone. No visual confirmation is available.'
  },
  { 
    id: 'V-005', 
    type: 'Chemical Effluent Release', 
    location: 'Bellandur Canal', 
    time: '8h ago', 
    confidence: 'High', 
    source: 'Industry',
    summary: 'Water quality probes in the Bellandur canal detected a sharp drop in pH (to 5.5) and a rise in turbidity, indicative of an acidic industrial effluent release. The plume is moving downstream.',
    impact: {
      vulnerableGroups: ['aquatic ecosystem', 'downstream farmers'],
      riskLevel: 'HIGH',
      populationImpacted: 'N/A',
      sensitiveZones: ['Bellandur Lake', 'Downstream irrigation inlets']
    },
    recommendations: [
      { action: 'Immediately issue a warning to downstream users and agricultural cooperatives to cease water intake.', priority: 'Immediate' },
      { action: 'Deploy a water sampling team to collect physical samples for lab analysis to identify the specific chemical.', priority: 'Immediate' },
      { action: 'Inspect all industrial outlets upstream from the detection point.', priority: 'Short-term' }
    ],
    responsibleDepartments: ['Pollution Control Board', 'Lake Development Authority', 'Agriculture Department'],
    escalationLogic: {
      deadline: 'Public warning to be issued within 30 minutes.',
      rule: 'If the source is not identified within 6 hours, escalate to the State Environmental Protection Agency.'
    },
    explanation: 'High confidence based on simultaneous anomalous readings from three separate water probes. The chemical signature strongly correlates with textile processing waste, a common industry in the upstream area.'
  },
];


const confidenceStyles: Record<Confidence, string> = {
  Low: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ViolationList = ({
  violations,
  onSelect,
  selectedId,
}: {
  violations: Violation[];
  onSelect: (violation: Violation) => void;
  selectedId: string | null;
}) => (
    <div className="divide-y divide-border/30">
        {violations.length > 0 ? violations.map((violation) => (
        <div
            key={violation.id}
            onClick={() => onSelect(violation)}
            className={cn(
                "flex items-center justify-between p-3 cursor-pointer transition-colors",
                selectedId === violation.id ? 'bg-primary/10' : 'hover:bg-muted/50'
            )}
        >
            <div>
                <p className="font-semibold">{violation.type}</p>
                <div className="text-sm text-muted-foreground space-y-1 mt-1">
                  <p>{violation.location}</p>
                  <p className="text-xs">{violation.time}</p>
                  <Badge variant="outline" className="text-xs">Source: {violation.source}</Badge>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn(confidenceStyles[violation.confidence])}>
                    {violation.confidence}
                </Badge>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
        </div>
        )) : (
            <p className="text-muted-foreground text-center p-4">No violations for this confidence level.</p>
        )}
    </div>
);


export default function ViolationDetection() {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(violations.find(v => v.confidence === 'High') || violations[0] || null);
  
  const highConfidence = violations.filter(v => v.confidence === 'High');
  const mediumConfidence = violations.filter(v => v.confidence === 'Medium');
  const lowConfidence = violations.filter(v => v.confidence === 'Low');

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
                    <Tabs defaultValue="high">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="high">High ({highConfidence.length})</TabsTrigger>
                            <TabsTrigger value="medium">Medium ({mediumConfidence.length})</TabsTrigger>
                            <TabsTrigger value="low">Low ({lowConfidence.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="high">
                            <ViolationList violations={highConfidence} onSelect={setSelectedViolation} selectedId={selectedViolation?.id || null} />
                        </TabsContent>
                        <TabsContent value="medium">
                             <ViolationList violations={mediumConfidence} onSelect={setSelectedViolation} selectedId={selectedViolation?.id || null} />
                        </TabsContent>
                        <TabsContent value="low">
                            <ViolationList violations={lowConfidence} onSelect={setSelectedViolation} selectedId={selectedViolation?.id || null} />
                        </TabsContent>
                    </Tabs>
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
