import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wind, Droplets, Leaf, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: 'Air Monitoring',
    details: 'PM2.5 · NO₂ · O₃',
    badge: 'Live',
    description: 'Track air quality with real-time data on key pollutants for immediate insights.',
  },
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: 'Water Monitoring',
    details: 'pH · Turbidity · Contaminants',
    badge: '24x7',
    description: 'Continuously monitor water bodies for contaminants to ensure public safety.',
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Land Monitoring',
    details: 'Soil Health · Contamination',
    badge: '24x7',
    description: 'Assess soil health and detect land pollution using sensor and satellite data.',
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    title: 'Predictive Alerts',
    details: 'Event Forecasting',
    badge: 'Predictive',
    description: 'Receive AI-powered alerts on potential pollution events before they become critical.',
  },
];

export default function KeyFeatures() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A New Standard in Environmental Intelligence
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our platform provides a comprehensive, real-time view of your environment.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden group">
              <CardHeader>
                 <div className="flex items-start justify-between">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        {feature.icon}
                    </div>
                    <Badge variant={feature.badge === 'Predictive' ? 'default' : 'secondary'} className="absolute top-4 right-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {feature.badge}
                    </Badge>
                </div>
                <div className="pt-2">
                    <CardTitle>{feature.title}</CardTitle>
                    <p className="text-xs text-muted-foreground pt-1">{feature.details}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
