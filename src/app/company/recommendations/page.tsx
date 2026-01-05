
'use client';

import React, 'use client';
import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Lightbulb, Check, Zap, Recycle, ChevronDown, ArrowDown, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';


const initialRecommendation = {
    facility: 'Whitefield Manufacturing Unit',
    lastEvaluated: '2 min ago',
    detectedIssue: {
        title: 'PM2.5 exceeded safe limits 3 times in last 24h',
        peakWindow: '6:00 – 8:00 PM',
    },
    analysis: 'Production load highest during this period. Filter efficiency degradation detected.',
    recommendedActions: [
        { id: 'action-1', text: 'Schedule filter maintenance', status: 'pending' },
        { id: 'action-2', text: 'Temporarily reduce output by 10%', status: 'pending' },
    ],
    expectedOutcome: '↓ PM2.5 by ~12–15% within 24 hours',
    otherSuggestions: [
        'Advance sensor calibration',
        'Enable secondary scrubber during peak',
    ],
    recentActions: [
        { id: 'action-3', text: 'Filter maintenance', status: 'Completed' },
        { id: 'action-4', text: 'Output reduction', status: 'Ignored' },
        { id: 'action-5', text: 'Sensor recalibration', status: 'Completed' },
    ]
};

type Action = { id: string; text: string; status: 'pending' | 'Completed' | 'Ignored' };

const AssignTaskSheet = ({
    open,
    onOpenChange,
    actions,
    onAssign
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actions: Action[];
    onAssign: (selectedActionIds: string[]) => void;
}) => {
    const { toast } = useToast();
    const [selectedActions, setSelectedActions] = useState<string[]>([]);

    const handleSelectAction = (actionId: string) => {
        setSelectedActions(prev =>
            prev.includes(actionId) ? prev.filter(id => id !== actionId) : [...prev, actionId]
        );
    };
    
    const handleAssign = () => {
        if (selectedActions.length === 0) {
            toast({
                variant: 'destructive',
                title: "No actions selected",
                description: "Please select at least one action to assign.",
            });
            return;
        }

        toast({ title: "Tasks Assigned!", description: `${selectedActions.length} action(s) have been assigned to the Maintenance Team.` });
        onAssign(selectedActions);
        setSelectedActions([]);
        onOpenChange(false);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Assign Recommended Actions</SheetTitle>
                    <SheetDescription>Select the actions you want to delegate to a team.</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-3">
                        <Label>Recommended Actions</Label>
                        <div className="space-y-2 p-3 rounded-md border bg-muted/50">
                            {actions.map(action => (
                                <div key={action.id} className="flex items-center gap-3">
                                    <Checkbox
                                        id={action.id}
                                        checked={selectedActions.includes(action.id)}
                                        onCheckedChange={() => handleSelectAction(action.id)}
                                    />
                                    <label htmlFor={action.id} className="text-sm font-medium cursor-pointer">
                                        {action.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
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
                </div>
                <div className="mt-6">
                    <Button onClick={handleAssign} className="w-full">Assign Selected Actions</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default function RecommendationsPage() {
    const { toast } = useToast();
    const [recommendation, setRecommendation] = useState(initialRecommendation);
    const [isAssignTaskOpen, setAssignTaskOpen] = useState(false);
    const [taskAssigned, setTaskAssigned] = useState(false);

    const handleReviewed = () => {
        toast({
            title: "Recommendation Reviewed",
            description: "You have acknowledged the AI's recommendation."
        });
    }

    const handleAssignTasks = (selectedActionIds: string[]) => {
        const assignedActions: Action[] = [];
        const remainingActions: Action[] = [];

        recommendation.recommendedActions.forEach(action => {
            if (selectedActionIds.includes(action.id)) {
                assignedActions.push({ ...action, status: 'Completed' }); // Or 'In Progress'
            } else {
                remainingActions.push(action);
            }
        });

        setRecommendation(prev => ({
            ...prev,
            recommendedActions: remainingActions,
            recentActions: [...assignedActions, ...prev.recentActions],
        }));
        if(recommendation.recommendedActions.length === selectedActionIds.length) {
          setTaskAssigned(true);
        }
    };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="flex items-center justify-between mb-8">
             <h1 className="text-4xl font-bold tracking-tight">
                AI-Powered Recommendations
            </h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-sm">
                        Facility: <span className="font-semibold ml-1">{recommendation.facility}</span> <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="whitefield">
                        <DropdownMenuRadioItem value="whitefield">Whitefield Manufacturing Unit</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="peenya">Peenya Industrial Plant</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center text-sm text-muted-foreground">
                Last Evaluated: {recommendation.lastEvaluated}
            </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-6">
                <Card className="glassmorphism-card">
                    <CardHeader>
                        <CardTitle>Issue Detected</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p className="text-lg font-semibold">{recommendation.detectedIssue.title}</p>
                        <p className="text-sm text-muted-foreground">Peak window: {recommendation.detectedIssue.peakWindow}</p>
                    </CardContent>
                </Card>

                 <div className="text-center">
                    <ArrowDown className="h-6 w-6 text-foreground mx-auto" />
                </div>


                <Card className="glassmorphism-card">
                    <CardHeader>
                        <CardTitle>Why This Happens (AI Analysis)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{recommendation.analysis}</p>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <ArrowDown className="h-6 w-6 text-foreground mx-auto" />
                </div>

                <Card className="glassmorphism-card">
                    <CardHeader>
                        <CardTitle>Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recommendation.recommendedActions.length > 0 ? (
                            recommendation.recommendedActions.map((action, index) => (
                            <div key={action.id} className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span className="font-medium">{action.text}</span>
                            </div>
                        ))
                        ) : (
                            <p className="text-muted-foreground text-center">All actions have been assigned.</p>
                        )}
                    </CardContent>
                </Card>
                 
                <div className="text-center">
                    <ArrowDown className="h-6 w-6 text-foreground mx-auto" />
                </div>

                <Card className="bg-primary/10 border-primary/30">
                    <CardHeader>
                        <CardTitle>Expected Outcome</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg font-bold text-primary">{recommendation.expectedOutcome}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
                 <Card className="glassmorphism-card">
                    <CardHeader>
                        <CardTitle>Take Action</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                             <Button onClick={() => setAssignTaskOpen(true)} disabled={taskAssigned}>
                                {taskAssigned ? 'All Tasks Assigned' : 'Assign Task'}
                            </Button>
                            <Button variant="outline" onClick={handleReviewed}>Mark Reviewed</Button>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h4 className="font-semibold text-muted-foreground">Other Suggestions ({recommendation.otherSuggestions.length})</h4>
                            {recommendation.otherSuggestions.map((suggestion, index) => (
                                <div key={index} className="text-sm flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                    <span>{suggestion}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground pt-4">Based on: 14-day emission trends, production data, and past maintenance outcomes.</p>
                    </CardContent>
                </Card>

                 <Card className="glassmorphism-card">
                    <CardHeader>
                        <CardTitle>Recent AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recommendation.recentActions.map((action, index) => (
                             <div key={action.id} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                     {action.status === 'Completed' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                                    {action.text}
                                </span>
                                <Badge variant={action.status === 'Completed' ? 'default' : 'destructive'} className={action.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>{action.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
        <AssignTaskSheet
            open={isAssignTaskOpen}
            onOpenChange={setAssignTaskOpen}
            actions={recommendation.recommendedActions}
            onAssign={handleAssignTasks}
        />
      </main>
    </div>
  );
}

    