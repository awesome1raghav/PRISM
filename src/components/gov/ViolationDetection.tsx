
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
import { Bot, MoreHorizontal } from 'lucide-react';
import { type Violation, type Confidence, type ViolationSource } from '@/app/gov/types';
import { cn } from '@/lib/utils';


const violations: Violation[] = [
  { id: 'V-001', type: 'Emission Limit Breach', location: 'Peenya Industrial Area', time: '2h ago', confidence: 'High', source: 'Industry' },
  { id: 'V-002', type: 'Sudden Pollution Spike', location: 'Marathahalli', time: '5h ago', confidence: 'Medium', source: 'Traffic' },
  { id: 'V-003', type: 'Illegal Dumping', location: 'Near Varthur Lake', time: '1 day ago', confidence: 'High', source: 'Unknown' },
  { id: 'V-004', type: 'Noise Limit Breach', location: 'Koramangala', time: '3h ago', confidence: 'Low', source: 'Event' },
  { id: 'V-005', type: 'Chemical Effluent Release', location: 'Bellandur Canal', time: '8h ago', confidence: 'High', source: 'Industry' },
];

const confidenceStyles: Record<Confidence, string> = {
  Low: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
};

const sourceStyles: Record<ViolationSource, string> = {
    Industry: "bg-gray-500/20 text-gray-400",
    Traffic: "bg-blue-500/20 text-blue-400",
    Event: "bg-purple-500/20 text-purple-400",
    Unknown: "bg-gray-700/20 text-gray-500",
}

export default function ViolationDetection() {
  return (
    <Card className="bg-card/40 border-border/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot />
          <span>AI-Detected Violations</span>
        </CardTitle>
        <CardDescription>
          System-generated alerts based on real-time data analysis and predictive modeling.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Violation ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Time Detected</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Probable Source</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violations.map((violation) => (
              <TableRow key={violation.id}>
                <TableCell className="font-mono text-xs">{violation.id}</TableCell>
                <TableCell>{violation.type}</TableCell>
                <TableCell>{violation.location}</TableCell>
                <TableCell>{violation.time}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(confidenceStyles[violation.confidence])}>
                    {violation.confidence}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border-transparent", sourceStyles[violation.source])}>
                    {violation.source}
                  </Badge>
                </TableCell>
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
