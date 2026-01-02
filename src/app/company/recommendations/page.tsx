
'use client';

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

const recommendation = {
    facility: 'Whitefield Manufacturing Unit',
    lastEvaluated: '2 min ago',
    detectedIssue: {
        title: 'PM2.5 exceeded safe limits 3 times in last 24h',
        peakWindow: '6:00 – 8:00 PM',
    },
    analysis: 'Production load highest during this period. Filter efficiency degradation detected.',
    recommendedActions: [
        { text: 'Schedule filter maintenance', status: 'pending' },
        { text: 'Temporarily reduce output by 10%', status: 'pending' },
    ],
    expectedOutcome: '↓ PM2.5 by ~12–15% within 24 hours',
    otherSuggestions: [
        'Advance sensor calibration',
        'Enable secondary scrubber during peak',
    ],
    recentActions: [
        { text: 'Filter maintenance', status: 'Completed' },
        { text: 'Output reduction', status: 'Ignored' },
        { text: 'Sensor recalibration', status: 'Completed' },
    ]
};

const AssignTaskSheet = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const { toast } = useToast();
    
    const handleAssign = () => {
        toast({ title: "Task Assigned!", description: "Maintenance task has been assigned to the Maintenance Team." });
        onOpenChange(false);
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Assign Task</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
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
                    <Button onClick={handleAssign} className="w-full">Assign</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default function RecommendationsPage() {
    const { toast } = useToast();
    const [isAssignTaskOpen, setAssignTaskOpen] = useState(false);

    const handleReviewed = () => {
        toast({
            title: "Recommendation Reviewed",
            description: "You have acknowledged the AI's recommendation."
        });
    }

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
                <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Issue Detected</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <p className="text-lg font-semibold">{recommendation.detectedIssue.title}</p>
                        <p className="text-sm text-muted-foreground">Peak window: {recommendation.detectedIssue.peakWindow}</p>
                    </CardContent>
                </Card>

                 <div className="text-center">
                    <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
                </div>


                <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Why This Happens (AI Analysis)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{recommendation.analysis}</p>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
                </div>

                <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recommendation.recommendedActions.map((action, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span className="font-medium">{action.text}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 
                <div className="text-center">
                    <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
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
                 <Card className="bg-card/40 border-border/30 sticky top-28">
                    <CardHeader>
                        <CardTitle>Take Action</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Button onClick={() => setAssignTaskOpen(true)}>Assign Task</Button>
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

                 <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle>Recent AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recommendation.recentActions.map((action, index) => (
                             <div key={index} className="flex items-center justify-between text-sm">
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
        <AssignTaskSheet open={isAssignTaskOpen} onOpenChange={setAssignTaskOpen} />
      </main>
    </div>
  );
}

    