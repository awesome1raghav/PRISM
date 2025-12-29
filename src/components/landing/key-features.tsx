
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Wind,
  Droplets,
  Leaf,
  AlertTriangle,
  Rss,
  Satellite,
  Clock,
  AreaChart,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const features = [
  {
    id: 'air',
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: 'Air Monitoring',
    details: 'PM2.5 · NO₂ · O₃',
    badge: 'Live',
    description:
      'Track air quality with real-time data on key pollutants for immediate insights.',
    expanded: {
      title: 'Air Monitoring Intelligence',
      sections: [
        {
          title: 'What PRISM Analyzes',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'PM2.5' },
            { icon: <AreaChart className="h-4 w-4" />, text: 'PM10' },
            { icon: <AreaChart className="h-4 w-4" />, text: 'NO₂' },
            { icon: <AreaChart className="h-4 w-4" />, text: 'O₃' },
          ],
        },
        {
          title: 'Data Sources',
          items: [
            { icon: <Rss className="h-4 w-4" />, text: 'IoT Sensors' },
            { icon: <Satellite className="h-4 w-4" />, text: 'Satellite Feeds' },
          ],
        },
        {
          title: 'Update Frequency',
          items: [
            {
              icon: <Clock className="h-4 w-4" />,
              text: 'Real-time (every few seconds)',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'water',
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: 'Water Monitoring',
    details: 'pH · Turbidity · Contaminants',
    badge: '24x7',
    description:
      'Continuously monitor water bodies for contaminants to ensure public safety.',
    expanded: {
      title: 'Water Monitoring Intelligence',
      sections: [
        {
          title: 'What PRISM Analyzes',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'pH Levels' },
            { icon: <AreaChart className="h-4 w-4" />, text: 'Turbidity' },
            {
              icon: <AreaChart className="h-4 w-4" />,
              text: 'Chemical Contaminants',
            },
          ],
        },
        {
          title: 'Risk Levels',
          items: [
            { icon: <ShieldCheck className="h-4 w-4 text-green-400" />, text: 'Safe' },
            {
              icon: <ShieldCheck className="h-4 w-4 text-yellow-400" />,
              text: 'Moderate',
            },
            { icon: <ShieldCheck className="h-4 w-4 text-red-400" />, text: 'Critical' },
          ],
        },
      ],
    },
  },
  {
    id: 'land',
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Land Monitoring',
    details: 'Soil Health · Contamination',
    badge: '24x7',
    description:
      'Assess soil health and detect land pollution using sensor and satellite data.',
    expanded: {
      title: 'Land Monitoring Intelligence',
      sections: [
        {
          title: 'What PRISM Analyzes',
          items: [
            { icon: <AreaChart className="h-4 w-4" />, text: 'Soil Health Index' },
            {
              icon: <AreaChart className="h-4 w-4" />,
              text: 'Contamination Levels',
            },
            { icon: <AreaChart className="h-4 w-4" />, text: 'Land-Use Change' },
          ],
        },
        {
          title: 'Data Sources',
          items: [
            { icon: <Satellite className="h-4 w-4" />, text: 'Geospatial Imaging' },
            { icon: <Rss className="h-4 w-4" />, text: 'On-Ground Sensors' },
          ],
        },
      ],
    },
  },
  {
    id: 'alerts',
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    title: 'Predictive Alerts',
    details: 'Event Forecasting',
    badge: 'Predictive',
    description:
      'Receive AI-powered alerts on potential pollution events before they become critical.',
    expanded: {
      title: 'Predictive Alert System',
      sections: [
        {
          title: 'Primary Inputs',
          items: [
            { icon: <TrendingUp className="h-4 w-4" />, text: 'Historical Trends' },
            { icon: <Users className="h-4 w-4" />, text: 'Community Signals' },
          ],
        },
        {
          title: 'System Outputs',
          items: [
            { icon: <BrainCircuit className="h-4 w-4" />, text: 'Early Warnings' },
            { icon: <BrainCircuit className="h-4 w-4" />, text: 'Risk Forecasts' },
          ],
        },
      ],
    },
  },
];

export default function KeyFeatures() {
  const [selectedFeature, setSelectedFeature] = useState<(typeof features)[0] | null>(null);

  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A New Standard in Environmental Intelligence
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our platform provides a comprehensive, real-time view of your
            environment.
          </p>
        </div>

        <Dialog>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <DialogTrigger
                asChild
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
              >
                <Card className="bg-card/40 border border-border/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden group hover:-translate-y-1 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        {feature.icon}
                      </div>
                      <Badge
                        variant={
                          feature.badge === 'Predictive'
                            ? 'default'
                            : 'secondary'
                        }
                        className="absolute top-4 right-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <div className="pt-2">
                      <CardTitle>{feature.title}</CardTitle>
                      <p className="text-xs text-muted-foreground pt-1">
                        {feature.details}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
            ))}
          </div>

          {selectedFeature && (
            <DialogContent className="sm:max-w-[425px] bg-card/60 border-border/30 backdrop-blur-xl">
               <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  {selectedFeature.icon} {selectedFeature.expanded.title}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                {selectedFeature.expanded.sections.map((section, index) => (
                  <div key={index} className="space-y-3">
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
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                    {index < selectedFeature.expanded.sections.length - 1 && <Separator className="mt-4 bg-border/40"/>}
                  </div>
                ))}
              </div>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
