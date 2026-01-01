
'use client';
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
import { MoreHorizontal } from 'lucide-react';
import { type Incident, type IncidentPriority, type IncidentStatus } from '@/app/gov/types';
import { cn } from '@/lib/utils';

const incidents: Incident[] = [
  { id: 'INC-001', category: 'Water', location: 'Bellandur Lake', submitted: '2h ago', priority: 'High-risk', status: 'New', assignee: 'Unassigned' },
  { id: 'INC-002', category: 'Air', location: 'Whitefield', submitted: '5h ago', priority: 'Normal', status: 'Under investigation', assignee: 'R. Sharma' },
  { id: 'INC-003', category: 'Waste', location: 'Koramangala 6th Block', submitted: '1 day ago', priority: 'Normal', status: 'Action taken', assignee: 'S. Patel' },
  { id: 'INC-004', category: 'Noise', location: 'Indiranagar 100ft Road', submitted: '2 days ago', priority: 'Normal', status: 'Closed', assignee: 'A. Gupta' },
  { id: 'INC-005', category: 'Water', location: 'Varthur Lake', submitted: '3 days ago', priority: 'Public health emergency', status: 'Under investigation', assignee: 'Field Team B' },
];

const priorityStyles: Record<IncidentPriority, string> = {
  'Normal': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'High-risk': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Public health emergency': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusStyles: Record<IncidentStatus, string> = {
  'New': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  'Under investigation': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Action taken': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Closed': 'bg-gray-700/20 text-gray-500 border-gray-700/30',
}

export default function IncidentManagement() {
  return (
    <Card className="bg-card/40 border-border/30">
      <CardHeader>
        <CardTitle>Complaint & Incident Management</CardTitle>
        <CardDescription>
          View, assign, and track citizen-submitted reports and system-detected incidents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Incident ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                <TableCell>{incident.category}</TableCell>
                <TableCell>{incident.location}</TableCell>
                <TableCell>{incident.submitted}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(priorityStyles[incident.priority])}>
                    {incident.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                   <Badge variant="outline" className={cn(statusStyles[incident.status])}>
                    {incident.status}
                  </Badge>
                </TableCell>
                <TableCell>{incident.assignee}</TableCell>
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
  );
}
