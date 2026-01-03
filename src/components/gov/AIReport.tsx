
'use client';

import { useState } from 'react';
import { type Violation } from '@/app/gov/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Edit, Shield, Activity, Users, Target, ListOrdered, Building, Clock, AlertTriangle, MessageSquare, Info, Check, Save, Share2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const impactStyles = {
    LOW: "bg-green-500/20 text-green-400 border-green-500/30",
    MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    HIGH: "bg-red-500/20 text-red-400 border-red-500/30",
};

const priorityStyles = {
    Immediate: "text-red-400",
    'Short-term': "text-yellow-400",
    Monitoring: "text-blue-400",
}

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card className="glassmorphism-card">
        <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-muted-foreground">
                {icon}
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

export default function AIReport({ violation, onApprove }: { violation: Violation, onApprove: () => void }) {
    const [isEditing, setIsEditing] = useState(false);
    // In a real app, you'd use state to manage form data
    // For this prototype, we'll just toggle the view.
    const handleSaveChanges = () => setIsEditing(false);

    return (
        <div className="space-y-6">
            <Card className="glassmorphism-card">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-xl">{violation.type}</CardTitle>
                            <CardDescription>Violation ID: {violation.id}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)}>
                            {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                            {isEditing ? 'Save Changes' : 'Make Changes'}
                        </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">{violation.location}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                             <Badge variant="outline" className={violation.confidence === 'High' ? 'border-red-500/50' : 'border-yellow-500/50'}>Confidence: {violation.confidence}</Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <InfoCard icon={<Activity className="h-5 w-5" />} title="AI Situation Summary">
                <p className="text-sm text-foreground/90">{violation.summary}</p>
            </InfoCard>

            <div className="grid md:grid-cols-2 gap-6">
                 <InfoCard icon={<Share2 className="h-5 w-5" />} title="Probable Source">
                    <p className="text-lg font-bold">{violation.source}</p>
                </InfoCard>
                <InfoCard icon={<Shield className="h-5 w-5" />} title="Risk & Impact Assessment">
                     <div className="flex items-center justify-between text-sm">
                        <div>
                            <p className="font-semibold text-muted-foreground">Overall Risk</p>
                            <Badge variant="outline" className={impactStyles[violation.impact?.riskLevel || 'LOW']}>{violation.impact?.riskLevel}</Badge>
                        </div>
                         <div>
                            <p className="font-semibold text-muted-foreground">Est. Population</p>
                            <p>{violation.impact?.populationImpacted}</p>
                        </div>
                    </div>
                </InfoCard>
            </div>
            
             <InfoCard icon={<ListOrdered className="h-5 w-5" />} title="AI-Recommended Actions">
                <div className="space-y-4">
                    {violation.recommendations?.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3">
                             <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${priorityStyles[rec.priority]}`} />
                            {isEditing ? (
                                <Textarea defaultValue={`[${rec.priority}] ${rec.action}`} className="text-sm" />
                            ) : (
                                <p className="text-sm">
                                    <span className={`font-semibold ${priorityStyles[rec.priority]}`}>[{rec.priority}]</span> {rec.action}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </InfoCard>

             <div className="grid md:grid-cols-2 gap-6">
                <InfoCard icon={<Building className="h-5 w-5" />} title="Responsible Departments">
                    {isEditing ? (
                        <Input defaultValue={violation.responsibleDepartments?.join(', ')} />
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {violation.responsibleDepartments?.map(dep => <Badge key={dep} variant="secondary">{dep}</Badge>)}
                        </div>
                    )}
                </InfoCard>
                <InfoCard icon={<Clock className="h-5 w-5" />} title="Deadline & Escalation">
                    <div className="space-y-2 text-sm">
                        <p><span className="font-semibold text-muted-foreground">Deadline: </span>{violation.escalationLogic?.deadline}</p>
                        <p><span className="font-semibold text-muted-foreground">Rule: </span>{violation.escalationLogic?.rule}</p>
                    </div>
                </InfoCard>
            </div>
            
            <InfoCard icon={<Info className="h-5 w-5" />} title="Why This Recommendation? (AI Explanation)">
                <p className="text-sm text-foreground/90 font-mono text-xs">{violation.explanation}</p>
            </InfoCard>

             <Card className="glassmorphism-card border-primary/30">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">Review the AI-generated report, make necessary changes, and forward to the responsible departments for action.</p>
                    <Button size="lg" className="w-full sm:w-auto flex-shrink-0" onClick={onApprove}>
                        <Check className="mr-2 h-4 w-4" />
                        Approve & Forward
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}
