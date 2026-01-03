
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
  Filter,
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
import { initialIncidents } from '@/app/gov/data';

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
      <Button variant="outline" className="text-sm bg-card/80">
        {label}: <span className="font-semibold ml-1">{value === 'all' ? 'All' : value}</span> <ChevronDown className="ml-2 h-4 w-4" />
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


export default function IncidentManagement({ incidents, setIncidents }: { incidents: Incident[], setIncidents: React.Dispatch<React.SetStateAction<Incident[]>> }) {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Incidents
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
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
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Complaint & Incident Queue</CardTitle>
          <CardDescription>
            View, assign, and track citizen-submitted reports and system-detected incidents. Found {filteredIncidents.length} incidents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id} onClick={() => setSelectedIncident(incident)} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="font-medium flex items-center gap-2">
                        {categoryIcons[incident.category]}
                        <div>
                            <div>{incident.id}</div>
                            <div className="text-xs text-muted-foreground">{incident.location}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{incident.sourceName || incident.source}</Badge>
                  </TableCell>
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
              setIncidents(prev => prev.map(i => i.id === updatedIncident.id ? updatedIncident : i));
              setSelectedIncident(updatedIncident);
          }}
      />
    </div>
  );
}
