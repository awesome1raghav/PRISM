
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, MapPin, AlertTriangle, CheckCircle, MoreHorizontal, Zap, Recycle, FileDown, Clock, X, Check, Calendar, User,ChevronDown, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const facilitiesData = [
  {
    name: 'Whitefield Manufacturing Unit',
    location: 'Bengaluru, KA',
    airQuality: { value: 88, status: 'Moderate', icon: <AlertTriangle className="text-yellow-500 h-4 w-4" /> },
    waterQuality: { value: 75, status: 'Warning', icon: <AlertTriangle className="text-yellow-500 h-4 w-4" /> },
    alerts: 2,
    activeAlerts: [
      { id: 1, title: 'PM2.5 exceeded threshold', time: '18:30', status: 'Acknowledged' },
      { id: 2, title: 'Sensor calibration overdue', sensorId: 'AQ-03', status: 'Pending' },
    ],
    maintenanceLog: [
      { id: 1, task: 'Filter replaced', date: 'Dec 28, 2025', status: 'Completed' },
      { id: 2, task: 'Sensor calibration', date: 'Dec 20, 2025', status: 'Completed' },
      { id: 3, task: 'Scrubber inspection', date: 'Dec 15, 2025', status: 'Completed' },
      { id: 4, task: 'Sensor calibration', date: 'Jan 04, 2026', status: 'Scheduled' },
    ]
  },
  {
    name: 'Peenya Industrial Plant',
    location: 'Bengaluru, KA',
    airQuality: { value: 45, status: 'Good', icon: <CheckCircle className="text-green-500 h-4 w-4" /> },
    waterQuality: { value: 82, status: 'Good', icon: <CheckCircle className="text-green-500 h-4 w-4" /> },
    alerts: 0,
    activeAlerts: [],
    maintenanceLog: []
  },
  {
    name: 'Hosur Assembly Line',
    location: 'Hosur, TN',
    airQuality: { value: 115, status: 'Poor', icon: <AlertTriangle className="text-red-500 h-4 w-4" /> },
    waterQuality: { value: 91, status: 'Good', icon: <CheckCircle className="text-green-500 h-4 w-4" /> },
    alerts: 1,
    activeAlerts: [{ id: 3, title: 'SO2 emission spike detected', time: '08:15', status: 'Pending' }],
    maintenanceLog: []
  },
];

type Facility = typeof facilitiesData[0];

const AssignTaskSheet = ({ open, onOpenChange, taskTitle }: { open: boolean, onOpenChange: (open: boolean) => void, taskTitle: string }) => {
    const { toast } = useToast();
    
    const handleAssign = () => {
        toast({ title: "Task Assigned!", description: `"${taskTitle}" has been assigned.` });
        onOpenChange(false);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Assign Task</SheetTitle>
                    <SheetDescription>Delegate this action to the responsible team.</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <Label>Task Type</Label>
                        <Input value={taskTitle} readOnly />
                    </div>
                     <div>
                        <Label>Assign To</Label>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    Maintenance Team <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuRadioGroup value="maintenance">
                                    <DropdownMenuRadioItem value="maintenance">Maintenance Team</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="operations">Operations Team</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="ehs">EHS Officer</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Label>Priority</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    High <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuRadioGroup value="high">
                                    <DropdownMenuRadioItem value="high">High</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="low">Low</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        <Label>Due Date</Label>
                        <Input type="date" defaultValue="2026-01-04" />
                    </div>
                </div>
                <div className="mt-6">
                    <Button onClick={handleAssign} className="w-full">Assign</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}


const FacilityDetailSheet = ({ facility, open, onOpenChange }: { facility: Facility | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [isAssignTaskOpen, setAssignTaskOpen] = useState(false);
    const [assignTaskTitle, setAssignTaskTitle] = useState('');

    const openAssignTask = (title: string) => {
        setAssignTaskTitle(title);
        setAssignTaskOpen(true);
    }

    if (!facility) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[540px] sm:max-w-none">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-3"><Building /> {facility.name}</SheetTitle>
                    <SheetDescription className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {facility.location}</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><AlertTriangle className="text-red-500" /> Active Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                           {facility.activeAlerts.length > 0 ? (
                            <ul className="space-y-4">
                                {facility.activeAlerts.map(alert => (
                                <li key={alert.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{alert.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {alert.time ? `Time: ${alert.time}` : `Sensor ID: ${alert.sensorId}`}
                                        </p>
                                    </div>
                                    <Badge variant={alert.status === 'Pending' ? 'destructive' : 'secondary'}>{alert.status}</Badge>
                                </li>
                                ))}
                            </ul>
                           ): <p className="text-muted-foreground text-center">No active alerts.</p>}
                            <div className="flex gap-2 mt-6">
                                <Button variant="outline" size="sm">Acknowledge</Button>
                                <Button variant="outline" size="sm" onClick={() => openAssignTask('Sensor Calibration')}>Assign Task</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><Clock /> Maintenance Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-3">
                                {facility.maintenanceLog.filter(l => l.status === 'Completed').map(log => (
                                    <li key={log.id} className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span>{log.task}</span>
                                        <span className="text-muted-foreground ml-auto">{log.date}</span>
                                    </li>
                                ))}
                             </ul>
                             <Separator className="my-4"/>
                             <p className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" /> Scheduled:</p>
                             <ul className="space-y-3">
                                {facility.maintenanceLog.filter(l => l.status === 'Scheduled').map(log => (
                                    <li key={log.id} className="flex items-center gap-2 text-sm">
                                        <Zap className="h-4 w-4 text-yellow-500" />
                                        <span>{log.task}</span>
                                        <span className="text-muted-foreground ml-auto">{log.date}</span>
                                    </li>
                                ))}
                                {facility.maintenanceLog.filter(l => l.status === 'Scheduled').length === 0 && <p className="text-muted-foreground text-sm">No scheduled maintenance.</p>}
                             </ul>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><FileDown /> Facility Reports</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                           <Button variant="outline">Download Daily Report</Button>
                           <Button variant="outline">Download Monthly Summary</Button>
                           <Button variant="outline">Export Sensor Data (CSV)</Button>
                        </CardContent>
                    </Card>
                </div>
                 <AssignTaskSheet open={isAssignTaskOpen} onOpenChange={setAssignTaskOpen} taskTitle={assignTaskTitle} />
            </SheetContent>
        </Sheet>
    );
};


export default function FacilitiesPage() {
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
                My Facilities
            </h1>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Facility
            </Button>
        </div>

        <Card className="bg-card/40 border-border/30">
            <CardHeader>
                <CardTitle>Live Facility Status</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Facility Name</TableHead>
                            <TableHead>Air Quality (AQI)</TableHead>
                            <TableHead>Water Quality (WQI)</TableHead>
                            <TableHead>Active Alerts</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {facilitiesData.map(facility => (
                            <TableRow key={facility.name} className="cursor-pointer" onClick={() => setSelectedFacility(facility)}>
                                <TableCell>
                                    <div className="font-medium">{facility.name}</div>
                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {facility.location}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {facility.airQuality.icon}
                                        <span>{facility.airQuality.value} ({facility.airQuality.status})</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                     <div className="flex items-center gap-2">
                                        {facility.waterQuality.icon}
                                        <span>{facility.waterQuality.value} ({facility.waterQuality.status})</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={facility.alerts > 0 ? 'destructive' : 'secondary'}>{facility.alerts}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={(e) => { e.stopPropagation(); setSelectedFacility(facility); }}>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <FacilityDetailSheet facility={selectedFacility} open={!!selectedFacility} onOpenChange={() => setSelectedFacility(null)} />
      </main>
    </div>
  );
}
