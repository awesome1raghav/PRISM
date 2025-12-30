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
  CalendarClock,
  ArrowRight,
  TrendingDown,
  HeartPulse,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const features = [
  {
    id: 'air',
    category: 'Air Quality',
    icon: <Wind className="h-6 w-6 text-sky-400" />,
    status: 'Good',
    statusColor: 'text-status-green',
    metric: 'AQI 32',
    trend: 'stable',
    trendIcon: <ArrowRight className="h-4 w-4" />,
    action: 'View Area Details',
    details: {
      title: 'Live Air Quality Report',
      sections: [
        {
          title: 'Pollutant Levels',
          items: [
            { icon: <Sigma className="h-4 w-4" />, text: 'PM2.5: 12 μg/m³ (Low)' },
            { icon: <Sigma className="h-4 w-4" />, text: 'O₃: 45 ppb (Good)' },
            { icon: <Sigma className="h-4 w-4" />, text: 'NO₂: 8 ppb (Good)' },
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
    advice: {
        title: 'Health Advisory: Air Quality',
        sections: [
            {
                title: 'General Population',
                description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.'
            },
            {
                title: 'Sensitive Groups',
                description: 'No specific precautions needed. Enjoy your outdoor activities!'
            }
        ]
    }
  },
  {
    id: 'water',
    category: 'Water Safety',
    icon: <Droplets className="h-6 w-6 text-blue-400" />,
    status: 'Warning',
    statusColor: 'text-status-yellow',
    metric: 'High Turbidity',
    trend: 'improving',
    trendIcon: <TrendingDown className="h-4 w-4" />,
    action: 'See Health Advice',
    details: {
      title: 'Water Safety Report',
      sections: [
        {
          title: 'Key Risk Factors',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'Turbidity: 8.2 NTU (Elevated)' },
            { icon: <CheckCircle className="h-4 w-4" />, text: 'pH Level: 7.1 (Normal)' },
            { icon: <XCircle className="h-4 w-4" />, text: 'E. Coli: Detected' },
          ],
        },
         {
          title: 'Trust Indicators',
          items: [
            { icon: <Rss className="h-4 w-4" />, text: 'Source: River Probe Sensor' },
            { icon: <ShieldCheck className="h-4 w-4" />, text: 'Confidence: High' },
            { icon: <Clock className="h-4 w-4" />, text: 'Verified: 15 mins ago' },
          ],
        },
      ],
    },
    advice: {
        title: 'Health Advisory: Water Safety',
        sections: [
            {
                title: 'Recommended Action',
                description: 'Due to detected E. Coli, it is strongly recommended to boil all tap water for at least one minute before drinking, cooking, or brushing teeth.'
            },
            {
                title: 'High-Risk Groups',
                description: 'Infants, young children, the elderly, and individuals with compromised immune systems should use bottled water as an extra precaution.'
            }
        ]
    }
  },
  {
    id: 'noise',
    category: 'Noise Pollution',
    icon: <Waves className="h-6 w-6 text-orange-400" />,
    status: 'Moderate',
    statusColor: 'text-status-yellow',
    metric: '68 dB Avg.',
    trend: 'worsening',
    trendIcon: <TrendingUp className="h-4 w-4" />,
    action: 'View Impact Details',
    details: {
      title: 'Noise Pollution Analysis',
      sections: [
        {
          title: 'Impact Assessment',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'Average: 68 dB (Day)' },
            { icon: <AlertTriangle className="h-4 w-4" />, text: 'Peak: 85 dB (Construction)' },
            { icon: <MinusCircle className="h-4 w-4" />, text: 'Health Risk: Sleep disturbance' },
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
     advice: {
        title: 'Health Advisory: Noise Levels',
        sections: [
            {
                title: 'Guidance for Residents',
                description: 'Current noise levels may disrupt sleep. Consider using earplugs or white noise machines at night. Limit exposure to peak noise periods if sensitive.'
            },
            {
                title: 'Legal Awareness',
                description: 'Noise levels exceed residential limits after 10 PM. You can report persistent disturbances to local authorities through our platform.'
            }
        ]
    }
  },
  {
    id: 'alerts',
    category: 'Predictive Alert',
    icon: <BrainCircuit className="h-6 w-6 text-purple-400" />,
    status: 'High Risk',
    statusColor: 'text-status-red',
    metric: 'Air Quality Drop',
    trend: 'worsening',
    trendIcon: <TrendingUp className="h-4 w-4" />,
    action: 'View Forecast',
    details: {
      title: 'Predictive Alert Details',
      sections: [
        {
          title: 'Forecast',
          items: [
            { icon: <TrendingUp className="h-4 w-4" />, text: 'Event: Industrial Effluent Drift' },
            { icon: <CalendarClock className="h-4 w-4" />, text: 'Time Window: Next 6 Hours' },
            { icon: <XCircle className="h-4 w-4" />, text: 'Severity: High' },
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
    advice: {
        title: 'Health Advisory: Predicted Air Quality Drop',
        sections: [
            {
                title: 'Precautionary Measures',
                description: 'Prepare to close windows and use air purifiers. It is advisable to reschedule strenuous outdoor activities planned for the next 6 hours.'
            },
            {
                title: 'Sensitive Groups',
                description: 'Individuals with respiratory conditions (like asthma), children, and the elderly should stay indoors during the predicted event window.'
            }
        ]
    }
  },
];

const trendStyles = {
  improving: 'text-green-400',
  worsening: 'text-red-400',
  stable: 'text-muted-foreground',
};


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
                       <div className={cn("flex items-center gap-1.5 text-xs font-semibold", trendStyles[feature.trend as keyof typeof trendStyles])}>
                        {feature.trendIcon}
                        <span>{feature.trend.charAt(0).toUpperCase() + feature.trend.slice(1)}</span>
                      </div>
                    </div>
                     <CardTitle className="pt-4 text-xl font-bold">{feature.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-lg">
                          <Badge className={cn("flex items-center gap-1.5", 
                            feature.status === 'Good' && "bg-status-green/90 text-white shadow-lg shadow-status-green/40",
                            feature.status === 'Moderate' && "bg-status-yellow/90 text-black shadow-lg shadow-status-yellow/40",
                            feature.status === 'Warning' && "bg-status-red/90 text-white shadow-lg shadow-status-red/40",
                            feature.status === 'High Risk' && "bg-status-red-dark/90 text-white shadow-lg shadow-status-red-dark/40"
                          )}>
                             {feature.status === 'High Risk' && <AlertTriangle className="h-3 w-3" />}
                            {feature.status}
                          </Badge>
                          <span className="text-muted-foreground text-sm font-medium">{feature.metric}</span>
                      </div>
                    </div>
                     <div className="mt-4 text-primary font-semibold text-sm group-hover:underline flex items-center gap-1">
                      {feature.action}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                   <Dialog>
                        <DialogTrigger asChild>
                           <Button>
                               <HeartPulse className="mr-2 h-4 w-4" /> View Health Advice
                           </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md glassmorphism-card">
                             <DialogHeader>
                                <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                                    <HeartPulse className="h-6 w-6 text-primary" /> {feature.advice.title}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 py-4">
                                {feature.advice.sections.map((section, index) => (
                                     <div key={index} className="space-y-1.5">
                                        <h4 className="font-semibold text-muted-foreground">
                                        {section.title}
                                        </h4>
                                        <p className="text-sm text-foreground/90">{section.description}</p>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
