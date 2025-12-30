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
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const features = [
  {
    id: 'air',
    icon: <Wind className="h-8 w-8 text-sky-500" />,
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
    icon: <Droplets className="h-8 w-8 text-blue-500" />,
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
            { icon: <ShieldCheck className="h-4 w-4 text-green-500" />, text: 'Safe' },
            {
              icon: <ShieldCheck className="h-4 w-4 text-yellow-500" />,
              text: 'Moderate',
            },
            { icon: <ShieldCheck className="h-4 w-4 text-red-500" />, text: 'Critical' },
          ],
        },
      ],
    },
  },
  {
    id: 'land',
    icon: <Leaf className="h-8 w-8 text-green-500" />,
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
    icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
    title: 'Predictive Alerts',
    details: 'Event Forecasting',
    badge: 'AI-Powered',
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
  return (
    <section id="features" className="py-16 sm:py-24 bg-transparent">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-800">
            A New Standard in Environmental Intelligence
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Our platform provides a comprehensive, real-time view of your environment, making complex data simple and actionable.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Dialog key={feature.id}>
              <DialogTrigger asChild>
                <Card className="glassmorphism-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="bg-white/80 p-3 rounded-lg shadow-inner">
                        {feature.icon}
                      </div>
                      <Badge
                        variant={
                          feature.badge === 'AI-Powered'
                            ? 'default'
                            : 'secondary'
                        }
                        className="bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <div className="pt-4">
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                      <p className="text-xs text-slate-500 pt-1 font-medium tracking-wider">
                        {feature.details}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] glassmorphism-card">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                    {feature.icon} {feature.expanded.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 py-4">
                  {feature.expanded.sections.map((section, index) => (
                    <React.Fragment key={index}>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-slate-500">
                          {section.title}
                        </h4>
                        <div className="flex flex-col gap-2">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div className="text-primary">{item.icon}</div>
                              <span className="text-slate-700 font-medium">{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {index < feature.expanded.sections.length - 1 && <Separator className="bg-slate-200/60"/>}
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
