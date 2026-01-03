
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MonitoringDashboard from '@/components/gov/MonitoringDashboard';
import ViolationDetection from '@/components/gov/ViolationDetection';
import IncidentManagement from '@/components/gov/IncidentManagement';
import { LayoutGrid, ListChecks, ShieldAlert } from 'lucide-react';
import { type Violation, type Incident } from './types';
import { initialViolations, initialIncidents } from './data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


export default function GovernmentPage() {
  const [violations, setViolations] = useState<Violation[]>(initialViolations);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);

  const handleApproveViolation = (violationToApprove: Violation) => {
    // Create a new incident from the violation
    const newIncident: Incident = {
        id: `INC-${String(incidents.length + 10).padStart(3, '0')}`,
        category: violationToApprove.type.includes('Air') ? 'Air' : violationToApprove.type.includes('Water') ? 'Water' : violationToApprove.type.includes('Noise') ? 'Noise' : 'Waste',
        location: violationToApprove.location,
        submitted: 'Just now',
        priority: violationToApprove.impact?.riskLevel === 'HIGH' ? 'High' : violationToApprove.impact?.riskLevel === 'MEDIUM' ? 'Medium' : 'Low',
        status: 'New',
        assignee: 'Unassigned',
        source: violationToApprove.source === 'Industry' ? 'Both' : 'Sensor',
        evidence: {
            photos: [],
            description: violationToApprove.summary || 'AI-detected event.',
            sensorLinked: true,
        },
        aiInsights: {
            violationId: violationToApprove.id,
            probableSource: violationToApprove.source,
            confidence: violationToApprove.confidence === 'High' ? 95 : violationToApprove.confidence === 'Medium' ? 75 : 50,
        },
        resolution: null,
        internalNotes: `Incident created from AI Violation ${violationToApprove.id}. AI Explanation: ${violationToApprove.explanation}`,
    };

    // Add to incidents list
    setIncidents(prev => [newIncident, ...prev]);

    // Remove from violations list
    setViolations(prev => prev.filter(v => v.id !== violationToApprove.id));
  };


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <Card className="glassmorphism-card w-full">
            <CardHeader>
                <CardTitle className="text-3xl">Government Command Center</CardTitle>
                <CardDescription>Unified environmental monitoring, detection, and response system.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="monitoring" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/80 p-1 h-auto rounded-lg">
                    <TabsTrigger value="monitoring">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Unified Monitoring
                    </TabsTrigger>
                    <TabsTrigger value="violations">
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    AI-Detected Violations
                    </TabsTrigger>
                    <TabsTrigger value="incidents">
                    <ListChecks className="mr-2 h-4 w-4" />
                    Complaint Management
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="monitoring">
                    <MonitoringDashboard />
                </TabsContent>
                
                <TabsContent value="violations">
                    <ViolationDetection violations={violations} onApproveViolation={handleApproveViolation} />
                </TabsContent>
                
                <TabsContent value="incidents">
                    <IncidentManagement incidents={incidents} setIncidents={setIncidents} />
                </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
