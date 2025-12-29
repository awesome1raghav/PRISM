import { Card, CardContent } from '@/components/ui/card';
import { DatabaseZap, BrainCircuit, TrendingUp, Siren } from 'lucide-react';

const steps = [
  {
    icon: <DatabaseZap className="h-10 w-10 text-primary" />,
    title: 'Data Collection',
    description: 'P.R.I.S.M aggregates data from a vast network of IoT sensors and public feeds, capturing environmental metrics in real-time.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'AI Analysis',
    description: 'Our advanced AI models process the incoming data, identifying patterns, anomalies, and correlations invisible to the human eye.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Predictive Forecasting',
    description: 'Leveraging machine learning, the system predicts pollution events and trends, allowing for proactive intervention.',
  },
  {
    icon: <Siren className="h-10 w-10 text-primary" />,
    title: 'Alert Escalation',
    description: 'Critical alerts are automatically generated and escalated to the responsible authorities for swift and effective action.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-background/80 backdrop-blur-sm">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">How P.R.I.S.M Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our four-stage process transforms raw data into actionable intelligence for environmental protection.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card/50 border-border/50 text-center p-6">
              <CardContent className="flex flex-col items-center gap-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
