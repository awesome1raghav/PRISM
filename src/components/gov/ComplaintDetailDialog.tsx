
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
  BarChart,
  ClipboardList,
  Building,
  Save,
  ShieldAlert,
} from 'lucide-react';
import Image from 'next/image';
import { type Incident, type IncidentStatus } from '@/app/gov/types';
import { useToast } from '@/hooks/use-toast';

interface ComplaintDetailDialogProps {
  incident: Incident | null;
  onClose: () => void;
  onUpdate: (incident: Incident) => void;
}

const InfoSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <Card className="bg-muted/30">
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

    useEffect(() => {
        if (incident) {
            setEditableIncident({ ...incident });
        } else {
            setEditableIncident(null);
        }
    }, [incident]);

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
            <DialogContent className="max-w-4xl h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Complaint Details</DialogTitle>
                    <DialogDescription>Manage and resolve complaint ID: {incident.id}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
                    {/* Left Column - Details & Actions */}
                    <div className="md:col-span-1 space-y-6 overflow-y-auto pr-4">
                        <InfoSection title="Assignment & Status" icon={<User />}>
                             <div className="space-y-4">
                                <div>
                                    <Label htmlFor="status">Status</Label>
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
                                    <Label htmlFor="assignee">Assign Officer</Label>
                                    <Select value={editableIncident.assignee} onValueChange={(value) => handleFieldChange('assignee', value)}>
                                        <SelectTrigger id="assignee"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Unassigned">Unassigned</SelectItem>
                                            <SelectItem value="R. Sharma">R. Sharma</SelectItem>
                                            <SelectItem value="S. Patel">S. Patel</SelectItem>
                                            <SelectItem value="A. Gupta">A. Gupta</SelectItem>
                                            <SelectItem value="Field Team B">Field Team B</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div>
                                    <Label htmlFor="department">Assign Department</Label>
                                    <Select value="Pollution Control Board" onValueChange={() => {}}>
                                        <SelectTrigger id="department"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pollution Control Board">Pollution Control Board</SelectItem>
                                            <SelectItem value="Solid Waste Management">Solid Waste Management</SelectItem>
                                            <SelectItem value="Local Police">Local Police</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </InfoSection>

                        <InfoSection title="Resolution Summary" icon={<CheckCircle />}>
                             <div className="space-y-4">
                                <div>
                                    <Label htmlFor="action-taken">Action Taken</Label>
                                    <Textarea id="action-taken" placeholder="e.g., Inspection conducted, notice issued..." value={editableIncident.resolution?.actionTaken || ''} onChange={(e) => handleResolutionChange('actionTaken', e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="outcome">Outcome</Label>
                                    <Textarea id="outcome" placeholder="e.g., Area cleared, compliance confirmed." value={editableIncident.resolution?.outcome || ''} onChange={(e) => handleResolutionChange('outcome', e.target.value)} />
                                </div>
                             </div>
                        </InfoSection>

                         <InfoSection title="Internal Notes" icon={<FileText />}>
                             <Textarea placeholder="Add notes visible only to officials..." value={editableIncident.internalNotes || ''} onChange={(e) => handleFieldChange('internalNotes', e.target.value)} />
                        </InfoSection>
                    </div>

                     {/* Right Column - Evidence & Info */}
                    <div className="md:col-span-2 space-y-6 overflow-y-auto pr-4">
                        <InfoSection title="Evidence" icon={<Camera />}>
                            <div className="space-y-4">
                                {incident.evidence.description && <p className="text-sm italic">"{incident.evidence.description}"</p>}
                                {incident.evidence.photos.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {incident.evidence.photos.map((photo, index) => (
                                            <div key={index} className="relative aspect-video">
                                                <Image src={photo} alt={`Evidence ${index + 1}`} width={400} height={400} objectFit="cover" className="rounded-md" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Badge variant={incident.evidence.sensorLinked ? 'default' : 'secondary'}>
                                    {incident.evidence.sensorLinked ? 'Auto-linked to Sensor Anomaly' : 'No Sensor Anomaly Linked'}
                                </Badge>
                            </div>
                        </InfoSection>
                        
                         <InfoSection title="AI Insights" icon={<Bot />}>
                           {incident.aiInsights ? (
                                <div className="space-y-3 text-sm">
                                    <p><strong>Linked AI Violation:</strong> {incident.aiInsights.violationId}</p>
                                    <p><strong>Probable Source:</strong> {incident.aiInsights.probableSource}</p>
                                    <p><strong>Confidence Score:</strong> <span className="font-semibold">{incident.aiInsights.confidence}%</span></p>
                                </div>
                           ) : <p className="text-sm text-muted-foreground">No AI insights linked to this complaint.</p>}
                        </InfoSection>
                    </div>
                </div>
                <DialogFooter className="pt-4 border-t">
                    <Button onClick={handleUpdate}>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
