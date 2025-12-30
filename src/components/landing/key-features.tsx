'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Wind,
  Droplets,
  AlertTriangle,
  Clock,
  AreaChart,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Users,
  Waves,
  Shield,
  Rss,
  CheckCircle,
  XCircle,
  MinusCircle,
  Signal,
  Sigma,
  CalendarClock
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';


const features = [
  {
    id: 'air',
    category: 'Air Quality',
    icon: <Wind className="h-6 w-6 text-sky-400" />,
    status: 'Good',
    statusColor: 'text-status-green',
    statusIcon: <CheckCircle className="h-5 w-5" />,
    metric: 'AQI 32',
    recommendation: 'Ideal for outdoor activities.',
    details: {
      title: 'Live Air Quality Report',
      sections: [
        {
          title: 'Pollutant Levels',
          items: [
            { icon: <Sigma className="h-4 w-4" />, text: 'PM2.5: 12 μg/m³' },
            { icon: <Sigma className="h-4 w-4" />, text: 'O₃: 45 ppb' },
          ],
        },
        {
          title: 'Trust Indicators',
          items: [
            { icon: <Rss className="h-4 w-4" />, text: 'Source: IoT Sensor Network' },
            { icon: <ShieldCheck className="h-4 w-4" />, text: 'Confidence: High' },
            { icon: <Clock className="h-4 w-4" />, text: 'Verified: 2 mins ago' },
          ],
        },
      ],
    },
  },
  {
    id: 'water',
    category: 'Water Safety',
    icon: <Droplets className="h-6 w-6 text-blue-400" />,
    status: 'Warning',
    statusColor: 'text-status-yellow',
    statusIcon: <AlertTriangle className="h-5 w-5" />,
    metric: 'High Turbidity',
    recommendation: 'Boil tap water before use.',
    details: {
      title: 'Water Safety Advisory',
      sections: [
        {
          title: 'Key Risk Factors',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'Turbidity: 8.2 NTU (Elevated)' },
            { icon: <AreaChart className="h-4 w-4" />, text: 'pH Level: 7.1 (Normal)' },
          ],
        },
         {
          title: 'Trust Indicators',
          items: [
            { icon: <Rss className="h-4 w-4" />, text: 'Source: River Probe' },
            { icon: <ShieldCheck className="h-4 w-4" />, text: 'Confidence: High' },
            { icon: <Clock className="h-4 w-4" />, text: 'Verified: 15 mins ago' },
          ],
        },
      ],
    },
  },
  {
    id: 'noise',
    category: 'Noise Pollution',
    icon: <Waves className="h-6 w-6 text-orange-400" />,
    status: 'Moderate',
    statusColor: 'text-status-yellow',
    statusIcon: <MinusCircle className="h-5 w-5" />,
    metric: '68 dB Avg.',
    recommendation: 'Exceeds residential night limits.',
    details: {
      title: 'Noise Pollution Analysis',
      sections: [
        {
          title: 'Impact Assessment',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'Potential for sleep disturbance.' },
            { icon: <AreaChart className="h-4 w-4" />, text: 'Source: Traffic & Construction' },
          ],
        },
        {
          title: 'Trust Indicators',
          items: [
            { icon: <Users className="h-4 w-4" />, text: 'Source: Citizen Reports & Sensors' },
            { icon: <Shield className="h-4 w-4" />, text: 'Confidence: Medium' },
            { icon: <Clock className="h-4 w-4" />, text: 'Verified: 45 mins ago' },
          ],
        },
      ],
    },
  },
  {
    id: 'alerts',
    category: 'Predictive Alert',
    icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
    status: 'High Risk',
    statusColor: 'text-status-red',
    statusIcon: <XCircle className="h-5 w-5" />,
    metric: 'Air Quality Drop',
    recommendation: 'High PM2.5 levels expected.',
    details: {
      title: 'Predictive Alert Details',
      sections: [
        {
          title: 'Forecast',
          items: [
            { icon: <TrendingUp className="h-4 w-4" />, text: 'Event: Industrial Effluent Drift' },
            { icon: <CalendarClock className="h-4 w-4" />, text: 'Time Window: Next 6 Hours' },
          ],
        },
        {
          title: 'System Inputs',
          items: [
            { icon: <Signal className="h-4 w-4" />, text: 'Source: AI Trend Analysis' },
            { icon: <Shield className="h-4 w-4" />, text: 'Confidence: Medium' },
            { icon: <Clock className="h-4 w-4" />, text: 'Generated: 5 mins ago' },
          ],
        },
      ],
    },
  },
];


export default function KeyFeatures() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-transparent">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            A New Standard in Environmental Intelligence
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Our platform provides a comprehensive, real-time view of your environment, making complex data simple and actionable.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Dialog key={feature.id}>
              <DialogTrigger asChild>
                <Card className="glassmorphism-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group hover:shadow-primary/20 hover:border-primary/30 flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex items-center justify-between">
                       <div className="bg-background/80 p-3 rounded-lg shadow-inner w-fit">
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.metric}
                      </Badge>
                    </div>
                     <CardTitle className="pt-4 text-xl font-bold">{feature.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                       <div className={cn("flex items-center gap-2 font-semibold text-lg", feature.statusColor)}>
                        {feature.statusIcon}
                        <span>{feature.status}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2">
                        {feature.recommendation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md glassmorphism-card">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                    {feature.icon} {feature.details.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 py-4">
                  {feature.details.sections.map((section, index) => (
                    <React.Fragment key={index}>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-muted-foreground">
                          {section.title}
                        </h4>
                        <div className="flex flex-col gap-2">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div className="text-primary">{item.icon}</div>
                              <span className="text-foreground font-medium">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {index < feature.details.sections.length - 1 && <Separator className="bg-border/60"/>}
                    </React.Fragment>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
