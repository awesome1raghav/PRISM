
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
import { Bot, ChevronRight, Check } from 'lucide-react';
import { type Violation, type Confidence, type ViolationSource } from '@/app/gov/types';
import { cn } from '@/lib/utils';
import AIReport from './AIReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';


const confidenceStyles: Record<Confidence, string> = {
  Low: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ApprovalDialog = ({
    violation,
    open,
    onOpenChange,
    onConfirm
} : {
    violation: Violation | null,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    onConfirm: () => void
}) => {
    if (!violation) return null;
    
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Escalation for Case: {violation.id}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will create a new incident and notify the responsible departments. Please review the details before confirming.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 py-4">
                    <h4 className="font-semibold">Key Actions to be Triggered:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                        {violation.recommendations?.slice(0, 2).map((rec, i) => <li key={i}>{rec.action}</li>)}
                         {violation.recommendations && violation.recommendations.length > 2 && <li>And {violation.recommendations.length - 2} more...</li>}
                    </ul>
                    <h4 className="font-semibold">Responsible Departments:</h4>
                    <div className="flex flex-wrap gap-2">
                        {violation.responsibleDepartments?.map(dep => <Badge key={dep} variant="secondary">{dep}</Badge>)}
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Confirm & Escalate</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};


const ViolationList = ({
  violations,
  onSelect,
  selectedId,
}: {
  violations: Violation[];
  onSelect: (violation: Violation) => void;
  selectedId: string | null;
}) => (
    <div className="divide-y divide-border/30">
        {violations.length > 0 ? violations.map((violation) => (
        <div
            key={violation.id}
            onClick={() => onSelect(violation)}
            className={cn(
                "flex items-center justify-between p-3 cursor-pointer transition-colors",
                selectedId === violation.id ? 'bg-primary/10' : 'hover:bg-muted/50'
            )}
        >
            <div>
                <p className="font-semibold">{violation.type}</p>
                <div className="text-sm text-muted-foreground space-y-1 mt-1">
                  <p>{violation.location}</p>
                  <p className="text-xs">{violation.time}</p>
                  <Badge variant="outline" className="text-xs">Source: {violation.sourceName || violation.source}</Badge>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className={cn(confidenceStyles[violation.confidence])}>
                    {violation.confidence}
                </Badge>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
        </div>
        )) : (
            <p className="text-muted-foreground text-center p-4">No violations for this confidence level.</p>
        )}
    </div>
);


export default function ViolationDetection({ violations, onApproveViolation }: { violations: Violation[], onApproveViolation: (violation: Violation) => void }) {
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(violations.find(v => v.confidence === 'High') || violations[0] || null);
  const [isApprovalDialogOpen, setApprovalDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const highConfidence = violations.filter(v => v.confidence === 'High');
  const mediumConfidence = violations.filter(v => v.confidence === 'Medium');
  const lowConfidence = violations.filter(v => v.confidence === 'Low');

  const handleApproveClick = () => {
      if (selectedViolation) {
          setApprovalDialogOpen(true);
      }
  }

  const handleConfirmApproval = () => {
      if (!selectedViolation) return;

      onApproveViolation(selectedViolation);
      
      toast({
          title: "Violation Escalated",
          description: `Case ${selectedViolation.id} has been moved to the incident queue.`,
      });

      if (selectedViolation.source === 'Industry') {
          toast({
            title: "Notification Sent",
            description: `A sanitized report for case ${selectedViolation.id} has been sent to ${selectedViolation.sourceName}.`,
        });
      }

      // After approval, select the next violation in the list or null
      const currentList = violations.filter(v => v.confidence === selectedViolation.confidence);
      const currentIndex = currentList.findIndex(v => v.id === selectedViolation.id);
      
      let nextSelected: Violation | null = null;
      if (currentList.length > 1) {
          nextSelected = currentList[(currentIndex + 1) % currentList.length];
      } else {
         const otherViolations = violations.filter(v => v.id !== selectedViolation.id);
         if(otherViolations.length > 0) {
            nextSelected = otherViolations[0];
         }
      }
      setSelectedViolation(nextSelected);
  }

  return (
    <>
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot />
                        <span>AI-Detected Violations</span>
                    </CardTitle>
                    <CardDescription>
                        System-generated alerts pending review.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="high">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="high">High ({highConfidence.length})</TabsTrigger>
                            <TabsTrigger value="medium">Medium ({mediumConfidence.length})</TabsTrigger>
                            <TabsTrigger value="low">Low ({lowConfidence.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="high">
                            <ViolationList violations={highConfidence} onSelect={setSelectedViolation} selectedId={selectedViolation?.id || null} />
                        </TabsContent>
                        <TabsContent value="medium">
                             <ViolationList violations={mediumConfidence} onSelect={setSelectedViolation} selectedId={selectedViolation?.id || null} />
                        </TabsContent>
                        <TabsContent value="low">
                            <ViolationList violations={lowConfidence} onSelect={setSelectedViolation} selectedId={selectedViolation?.id || null} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            {selectedViolation ? (
                <AIReport violation={selectedViolation} onApprove={handleApproveClick} />
            ) : (
                <Card className="h-96 flex items-center justify-center">
                    <CardContent className="text-center">
                         <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-semibold">All violations reviewed.</p>
                        <p className="text-muted-foreground">Check the Complaint Management tab for escalated incidents.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    </div>
     <ApprovalDialog
        open={isApprovalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        violation={selectedViolation}
        onConfirm={handleConfirmApproval}
    />
    </>
  );
}
