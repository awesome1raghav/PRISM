import React from 'react';
import { Card } from '@/components/ui/card';
import { Activity, LineChart, Megaphone, ShieldCheck, Wind, Droplets, Leaf, Bot, AlertTriangle, Users } from 'lucide-react';

const features = [
  {
    icon: <Activity className="h-8 w-8 text-accent" />,
    title: 'Real-Time Monitoring',
    description: 'Get a live view of environmental conditions with data updated every second from across the grid.',
  },
  {
    icon: <LineChart className="h-8 w-8 text-accent" />,
    title: 'Predictive Forecasting',
    description: 'Our AI predicts pollution hotspots and trends up to 48 hours in advance, enabling preventative measures.',
  },
  {
    icon: <Megaphone className="h-8 w-8 text-accent" />,
    title: 'Citizen Reporting',
    description: 'Empower communities to report pollution incidents directly through a simple and accessible interface.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: 'Transparent Governance',
    description: 'Track every incident, response, and outcome on a public ledger for full accountability.',
  },
];

const iconCategories = [
    { icon: <Wind />, name: 'Air' },
    { icon: <Droplets />, name: 'Water' },
    { icon: <Leaf />, name: 'Soil' },
    { icon: <Bot />, name: 'AI' },
    { icon: <AlertTriangle />, name: 'Alerts' },
    { icon: <Users />, name: 'Community' },
];

export default function KeyFeatures() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">An Ecosystem of Intelligence</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            P.R.I.S.M integrates multiple data streams and powerful features into a single, cohesive platform.
          </p>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-foreground/80">
            {iconCategories.map(category => (
                <div key={category.name} className="flex flex-col items-center gap-2">
                    {React.cloneElement(category.icon, { className: 'h-10 w-10' })}
                    <span className="font-semibold text-sm">{category.name}</span>
                </div>
            ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-card/50 border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary/20 shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-1 text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
