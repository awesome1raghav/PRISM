
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
import {
  MoreHorizontal,
  ChevronDown,
  Wind,
  Droplets,
  Waves,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Incident, type IncidentPriority, type IncidentStatus, type IncidentCategory, type IncidentSource } from '@/app/gov/types';
import { cn } from '@/lib/utils';
import ComplaintDetailDialog from './ComplaintDetailDialog';

const incidents: Incident[] = [
  { id: 'INC-001', category: 'Water', location: 'Bellandur Lake', submitted: '2h ago', priority: 'High', status: 'New', assignee: 'Unassigned', source: 'Citizen', evidence: { photos: ['https://picsum.photos/seed/inc1/400/300'], description: 'Water is dark green and smells foul. Large amount of foam visible.', sensorLinked: true }, aiInsights: { violationId: 'V-005', probableSource: 'Industrial', confidence: 92 }, resolution: null, internalNotes: 'Priority based on potential ecological impact and previous incidents in this area.' },
  { id: 'INC-002', category: 'Air', location: 'Whitefield', submitted: '5h ago', priority: 'Medium', status: 'Under investigation', assignee: 'R. Sharma', source: 'Sensor', evidence: { photos: [], description: '', sensorLinked: true }, aiInsights: { violationId: 'V-001', probableSource: 'Industrial', confidence: 88 }, resolution: null, internalNotes: '' },
  { id: 'INC-003', category: 'Waste', location: 'Koramangala 6th Block', submitted: '1 day ago', priority: 'Low', status: 'Action taken', assignee: 'S. Patel', source: 'Both', evidence: { photos: ['https://picsum.photos/seed/inc3/400/300'], description: 'Construction debris dumped on the sidewalk overnight.', sensorLinked: false }, aiInsights: { violationId: 'V-003', probableSource: 'Unknown', confidence: 95 }, resolution: { actionTaken: 'Debris cleared by municipal team. Notice served to nearby construction site.', outcome: 'Area cleared.', followUpRequired: false }, internalNotes: 'Repeat offender in this area. Increased patrolling recommended.' },
  { id: 'INC-004', category: 'Noise', location: 'Indiranagar 100ft Road', submitted: '2 days ago', priority: 'Low', status: 'Closed', assignee: 'A. Gupta', source: 'Citizen', evidence: { photos: [], description: 'Loud music from a bar well past 11 PM.', sensorLinked: true }, aiInsights: { violationId: 'V-004', probableSource: 'Event', confidence: 75 }, resolution: { actionTaken: 'Patrol unit dispatched. Warning issued to establishment.', outcome: 'Music was stopped. Compliance confirmed.', followUpRequired: false }, internalNotes: 'Establishment has been warned before.' },
  { id: 'INC-005', category: 'Water', location: 'Varthur Lake', submitted: '3 days ago', priority: 'High', status: 'Under investigation', assignee: 'Field Team B', source: 'Sensor', evidence: { photos: [], description: '', sensorLinked: true }, aiInsights: { violationId: 'V-003', probableSource: 'Sewage', confidence: 85 }, resolution: null, internalNotes: 'Ecologically sensitive area. Needs urgent analysis.' },
];

const priorityStyles: Record<IncidentPriority, string> = {
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusStyles: Record<IncidentStatus, string> = {
  New: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Under investigation': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Action taken': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Closed: 'bg-gray-700/20 text-gray-500 border-gray-700/30',
};

const categoryIcons: Record<IncidentCategory, React.ReactNode> = {
    'Air': <Wind className="h-4 w-4" />,
    'Water': <Droplets className="h-4 w-4" />,
    'Noise': <Waves className="h-4 w-4" />,
    'Waste': <Trash2 className="h-4 w-4" />,
}

const FilterDropdown = ({ label, options, value, onValueChange }: { label: string, options: string[], value: string, onValueChange: (value: string) => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        {label}: {value === 'all' ? 'All' : value} <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
        <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
        {options.map(option => <DropdownMenuRadioItem key={option} value={option}>{option}</DropdownMenuRadioItem>)}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);


export default function IncidentManagement() {
    const [filters, setFilters] = useState({
        status: 'all',
        priority: 'all',
        type: 'all',
        source: 'all',
    });

    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const handleFilterChange = (filterName: keyof typeof filters) => (value: string) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const filteredIncidents = incidents.filter(incident => {
        return (filters.status === 'all' || incident.status === filters.status) &&
               (filters.priority === 'all' || incident.priority === filters.priority) &&
               (filters.type === 'all' || incident.category === filters.type) &&
               (filters.source === 'all' || incident.source === filters.source);
    });

  return (
    <>
    <Card className="bg-card/40 border-border/30">
      <CardHeader>
        <CardTitle>Complaint & Incident Management</CardTitle>
        <CardDescription>
          View, assign, and track citizen-submitted reports and system-detected incidents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
            <FilterDropdown 
                label="Status" 
                options={['New', 'Under investigation', 'Action taken', 'Closed']} 
                value={filters.status} 
                onValueChange={handleFilterChange('status')}
            />
            <FilterDropdown 
                label="Priority" 
                options={['High', 'Medium', 'Low']}
                value={filters.priority} 
                onValueChange={handleFilterChange('priority')}
            />
            <FilterDropdown 
                label="Type" 
                options={['Air', 'Water', 'Noise', 'Waste']} 
                value={filters.type} 
                onValueChange={handleFilterChange('type')}
            />
            <FilterDropdown 
                label="Source" 
                options={['Citizen', 'Sensor', 'Both']} 
                value={filters.source} 
                onValueChange={handleFilterChange('source')}
            />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.map((incident) => (
              <TableRow key={incident.id} onClick={() => setSelectedIncident(incident)} className="cursor-pointer">
                <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {categoryIcons[incident.category]}
                        {incident.category}
                    </div>
                </TableCell>
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
                 <TableCell>{incident.source}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setSelectedIncident(incident); }}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
     <ComplaintDetailDialog
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onUpdate={(updatedIncident) => {
            // In a real app, this would be a Firestore update.
            // Here, we just log it and update the local state for demonstration.
            console.log('Updating incident:', updatedIncident);
            const index = incidents.findIndex(i => i.id === updatedIncident.id);
            if (index !== -1) {
                incidents[index] = updatedIncident;
            }
            setSelectedIncident(updatedIncident);
        }}
    />
    </>
  );
}
