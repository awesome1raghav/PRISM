
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Info,
  User,
  CheckCircle,
  FileText,
  Camera,
  Bot,
  Building,
  Save,
  PlusCircle,
  ClipboardList,
  Eye,
  Briefcase,
  Share2,
  Bell,
} from 'lucide-react';
import Image from 'next/image';
import { type Incident, type IncidentStatus } from '@/app/gov/types';
import { useToast } from '@/hooks/use-toast';

interface ComplaintDetailDialogProps {
  incident: Incident | null;
  onClose: () => void;
  onUpdate: (incident: Incident) => void;
}

const InfoSection = ({ title, icon, children, className }: { title: string, icon: React.ReactNode, children: React.ReactNode, className?: string }) => (
    <Card className={className}>
        <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-muted-foreground">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
);

export default function ComplaintDetailDialog({ incident, onClose, onUpdate }: ComplaintDetailDialogProps) {
    const [editableIncident, setEditableIncident] = useState<Incident | null>(null);
    const { toast } = useToast();
    
    const [officers, setOfficers] = useState(['Unassigned', 'R. Sharma', 'S. Patel', 'A. Gupta', 'Field Team B']);
    const [departments, setDepartments] = useState(['Pollution Control Board', 'Solid Waste Management', 'Local Police']);
    
    const [isEditingOfficer, setIsEditingOfficer] = useState(false);
    const [newOfficer, setNewOfficer] = useState('');

    const [isEditingDepartment, setIsEditingDepartment] = useState(false);
    const [newDepartment, setNewDepartment] = useState('');
    const [assignedDepartment, setAssignedDepartment] = useState('Pollution Control Board');


    useEffect(() => {
        if (incident) {
            setEditableIncident({ ...incident });
            setAssignedDepartment('Pollution Control Board');
        } else {
            setEditableIncident(null);
        }
    }, [incident]);
    
    const handleAddNewOfficer = () => {
        if (newOfficer && !officers.includes(newOfficer)) {
            const newOfficers = [...officers, newOfficer];
            setOfficers(newOfficers);
            handleFieldChange('assignee', newOfficer);
        }
        setNewOfficer('');
        setIsEditingOfficer(false);
    }
    
    const handleAddNewDepartment = () => {
        if (newDepartment && !departments.includes(newDepartment)) {
            const newDepartments = [...departments, newDepartment];
            setDepartments(newDepartments);
            setAssignedDepartment(newDepartment);
        }
        setNewDepartment('');
        setIsEditingDepartment(false);
    };

    const handleNotifyCompany = () => {
        toast({
            title: "Notification Sent",
            description: `A sanitized report for case ${incident?.id} has been sent to the responsible company.`,
        });
    };

    const handlePublishAdvisory = () => {
        toast({
            title: "Advisory Published",
            description: `A public health advisory for residents near ${incident?.location} has been issued.`,
        });
    };


    const handleUpdate = () => {
        if (!editableIncident) return;
        
        if (editableIncident.status === 'Closed' && (!editableIncident.resolution || !editableIncident.resolution.actionTaken || !editableIncident.resolution.outcome)) {
            toast({
                variant: 'destructive',
                title: 'Resolution Required',
                description: 'Please fill out the Action Taken and Outcome before closing a complaint.',
            });
            return;
        }

        onUpdate(editableIncident);
        toast({
            title: 'Complaint Updated',
            description: `Complaint ID ${editableIncident.id} has been saved.`,
        });
    };

    if (!incident || !editableIncident) {
        return null;
    }

    const handleFieldChange = (field: keyof Incident, value: any) => {
        setEditableIncident(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleResolutionChange = (field: 'actionTaken' | 'outcome', value: string) => {
        setEditableIncident(prev => {
            if (!prev) return null;
            const newResolution = { ...prev.resolution, [field]: value, followUpRequired: prev.resolution?.followUpRequired || false };
            return { ...prev, resolution: newResolution as any };
        });
    }

    return (
        <Dialog open={!!incident} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Complaint Case File</DialogTitle>
                    <DialogDescription>Managing case ID: {incident.id} for {incident.location}</DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow overflow-hidden">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 h-full overflow-y-auto pr-4 border-r border-border/30 space-y-6 sticky top-0">
                         <Card className="bg-card/40">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-semibold flex items-center gap-2 text-muted-foreground">
                                    <ClipboardList />
                                    Assignment & Task
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="status">Complaint Status</Label>
                                    <Select value={editableIncident.status} onValueChange={(value) => handleFieldChange('status', value as IncidentStatus)}>
                                        <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="New">New</SelectItem>
                                            <SelectItem value="Under investigation">Under investigation</SelectItem>
                                            <SelectItem value="Action taken">Action taken</SelectItem>
                                            <SelectItem value="Closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="assignee">Assigned Officer</Label>
                                    {isEditingOfficer ? (
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                value={newOfficer}
                                                onChange={(e) => setNewOfficer(e.target.value)}
                                                placeholder="New officer name"
                                            />
                                            <Button size="sm" onClick={handleAddNewOfficer}>Save</Button>
                                        </div>
                                    ) : (
                                        <Select value={editableIncident.assignee} onValueChange={(value) => {
                                            if (value === 'add_new') {
                                                setIsEditingOfficer(true);
                                            } else {
                                                handleFieldChange('assignee', value)
                                            }
                                        }}>
                                            <SelectTrigger id="assignee"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {officers.map(officer => <SelectItem key={officer} value={officer}>{officer}</SelectItem>)}
                                                <Separator />
                                                <SelectItem value="add_new">
                                                    <div className="flex items-center gap-2">
                                                        <PlusCircle className="h-4 w-4" />
                                                        Add New Officer...
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                                 <div>
                                    <Label htmlFor="department">Assigned Department</Label>
                                     {isEditingDepartment ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={newDepartment}
                                                onChange={(e) => setNewDepartment(e.target.value)}
                                                placeholder="New department name"
                                            />
                                            <Button size="sm" onClick={handleAddNewDepartment}>Save</Button>
                                        </div>
                                    ) : (
                                        <Select value={assignedDepartment} onValueChange={(value) => {
                                            if (value === 'add_new') {
                                                setIsEditingDepartment(true);
                                            } else {
                                                setAssignedDepartment(value);
                                            }
                                        }}>
                                            <SelectTrigger id="department"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
                                                <Separator />
                                                <SelectItem value="add_new">
                                                    <div className="flex items-center gap-2">
                                                        <PlusCircle className="h-4 w-4" />
                                                        Add New Department...
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                         <InfoSection title="Actions & Notifications" icon={<Bell />} className="bg-card/40">
                             <div className="space-y-2">
                                {incident.aiInsights?.probableSource === 'Industry' && (
                                    <Button variant="outline" className="w-full" onClick={handleNotifyCompany}>
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Notify Company
                                    </Button>
                                )}
                                <Button variant="outline" className="w-full" onClick={handlePublishAdvisory}>
                                    <Bell className="mr-2 h-4 w-4" />
                                    Publish Public Advisory
                                </Button>
                            </div>
                        </InfoSection>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 h-full overflow-y-auto pr-2 space-y-6">
                        <InfoSection title="Evidence" icon={<Camera />} className="bg-card/40 border border-border/40 shadow-sm">
                            <div className="space-y-4">
                                {incident.evidence.description && <p className="text-sm italic">"{incident.evidence.description}"</p>}
                                {incident.evidence.photos.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {incident.evidence.photos.map((photo, index) => (
                                            <div key={index} className="relative aspect-video">
                                                <Image src={photo} alt={`Evidence ${index + 1}`} layout="fill" className="rounded-md object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Badge variant={incident.evidence.sensorLinked ? 'default' : 'secondary'}>
                                    {incident.evidence.sensorLinked ? 'Auto-linked to Sensor Anomaly' : 'No Sensor Anomaly Linked'}
                                </Badge>
                            </div>
                        </InfoSection>

                        <InfoSection title="AI Analysis & Cause of Pollution" icon={<Bot />} className="bg-card/40 border-border/30">
                           {incident.aiInsights ? (
                                <div className="space-y-3 text-sm">
                                    <div><strong>Linked AI Violation:</strong> {incident.aiInsights.violationId}</div>
                                    <div className="font-semibold text-base"><strong>Identified Cause:</strong> <span className="text-primary">{incident.aiInsights.probableSource}</span></div>
                                    <div className="flex items-center gap-2">
                                        <strong>Confidence Score:</strong>
                                        <Badge variant="outline" className="font-semibold">{incident.aiInsights.confidence}%</Badge>
                                    </div>
                                </div>
                           ) : <p className="text-sm text-muted-foreground">No AI insights linked to this complaint.</p>}
                        </InfoSection>

                        <InfoSection title="Resolution Summary" icon={<CheckCircle />} className="bg-card/40 border-border/30">
                             <div className="space-y-4">
                                <div>
                                    <Label htmlFor="action-taken">Action Taken</Label>
                                    <Textarea id="action-taken" placeholder="e.g., Inspection conducted, notice issued..." value={editableIncident.resolution?.actionTaken || ''} onChange={(e) => handleResolutionChange('actionTaken', e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="outcome">Final Outcome</Label>
                                    <Textarea id="outcome" placeholder="e.g., Area cleared, compliance confirmed." value={editableIncident.resolution?.outcome || ''} onChange={(e) => handleResolutionChange('outcome', e.target.value)} />
                                </div>
                             </div>
                        </InfoSection>
                        
                         <InfoSection title="Internal Notes" icon={<Eye />} className="bg-muted/40 border-border/30">
                             <Textarea placeholder="Add notes visible only to officials..." value={editableIncident.internalNotes || ''} onChange={(e) => handleFieldChange('internalNotes', e.target.value)} />
                        </InfoSection>
                    </div>
                </div>

                <DialogFooter className="pt-4 border-t mt-auto flex-shrink-0">
                    <Button onClick={handleUpdate}>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

    