'use client';

import Header from '@/components/layout/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MonitoringDashboard from '@/components/gov/MonitoringDashboard';
import ViolationDetection from '@/components/gov/ViolationDetection';
import IncidentManagement from '@/components/gov/IncidentManagement';
import { GanttChart, ListChecks, ShieldAlert } from 'lucide-react';

export default function GovernmentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Government Command Center
          </h1>
          <p className="text-muted-foreground mt-2">
            Unified environmental monitoring, detection, and response system.
          </p>
        </div>

        <Tabs defaultValue="monitoring">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="monitoring">
              <GanttChart className="mr-2 h-4 w-4" />
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
            <ViolationDetection />
          </TabsContent>
          
          <TabsContent value="incidents">
            <IncidentManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
