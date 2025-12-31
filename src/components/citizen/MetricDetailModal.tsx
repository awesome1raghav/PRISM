
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wind, Droplets, Waves } from 'lucide-react';
import { type ReportCategory } from '@/app/citizen/types';

interface MetricDetailModalProps {
  metric: ReportCategory | null;
  onClose: () => void;
}

const metricDetails = {
    Air: {
        icon: <Wind className="h-8 w-8 text-sky-400" />,
        title: 'Air Quality Index (AQI)',
        healthEffects: [
            { level: 'Good (0-50)', effect: 'Air quality is considered satisfactory, and air pollution poses little or no risk.' },
            { level: 'Moderate (51-100)', effect: 'Some pollutants may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.' },
            { level: 'Poor (101-150)', effect: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.' },
            { level: 'Unhealthy (151+)', effect: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.' },
        ],
        calculationInfo: "The Air Quality Index (AQI) is calculated based on real-time measurements of several key pollutants including Particulate Matter (PM2.5 and PM10), Ozone (O₃), Nitrogen Dioxide (NO₂), and Sulfur Dioxide (SO₂). Each pollutant is measured and scaled to create a single, easy-to-understand number.",
    },
    Water: {
        icon: <Droplets className="h-8 w-8 text-blue-400" />,
        title: 'Water Quality Index (WQI)',
        healthEffects: [
            { level: 'Good (80-100)', effect: 'Water quality is considered excellent and safe for all uses, including drinking.' },
            { level: 'Safe (60-79)', effect: 'Water is generally safe for consumption and recreation, but may have minor taste or odor issues.' },
            { level: 'Warning (40-59)', effect: 'Water may not be safe for drinking without treatment (e.g., boiling). Recreational contact should be limited.' },
            { level: 'Poor (0-39)', effect: 'Water is polluted and not safe for drinking or recreation. Avoid contact.' },
        ],
        calculationInfo: "The Water Quality Index (WQI) is a composite score derived from several key parameters including pH, turbidity (clarity), dissolved oxygen (DO), temperature, and the presence of coliform bacteria. A higher score indicates better water quality.",
    },
    Noise: {
        icon: <Waves className="h-8 w-8 text-orange-400" />,
        title: 'Noise Pollution Levels (dB)',
        healthEffects: [
            { level: 'Low (< 60 dB)', effect: 'Normal background noise levels. No significant health impact.' },
            { level: 'Moderate (60-80 dB)', effect: 'Can be annoying and may interfere with conversation. Long-term exposure can lead to stress.' },
            { level: 'High (81-100 dB)', effect: 'Prolonged exposure can cause hearing damage. May increase risk of cardiovascular issues.' },
            { level: 'Very High (101+ dB)', effect: 'Serious risk of permanent hearing loss. Immediate precautions are necessary.' },
        ],
        calculationInfo: "Noise pollution is measured in decibels (dB). Our system records the average noise level over time from various sound sensors placed in your area. The reported value is an equivalent continuous sound level (Leq) that represents the total sound energy.",
    },
    Waste: {
        icon: <Waves className="h-8 w-8 text-orange-400" />,
        title: 'Waste Details',
        healthEffects: [],
        calculationInfo: "",
    }
}


export default function MetricDetailModal({ metric, onClose }: MetricDetailModalProps) {
  if (!metric) return null;

  const details = metricDetails[metric];

  return (
    <Dialog open={!!metric} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4 text-2xl">
            <div className="bg-primary/10 p-3 rounded-lg">
                {details.icon}
            </div>
            {details.title}
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-6">
            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle>Health Effects</CardTitle>
                    <CardDescription>
                        Understanding the impact of current levels on your health.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {details.healthEffects.map((item, index) => (
                            <div key={index} className="p-4 bg-muted/50 rounded-lg">
                            <h3 className="font-semibold">{item.level}</h3>
                            <p className="text-sm text-muted-foreground">{item.effect}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/30">
                <CardHeader>
                    <CardTitle>How it's Calculated</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{details.calculationInfo}</p>
                </CardContent>
            </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
