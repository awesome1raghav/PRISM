import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Droplets, Leaf, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: <Wind className="h-8 w-8 text-primary" />,
    title: 'Air Monitoring',
    description: 'Track air quality with real-time data on pollutants like PM2.5, NO2, and Ozone.',
  },
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: 'Water Monitoring',
    description: 'Monitor water bodies for contaminants, pH levels, and turbidity to ensure public safety.',
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Land Monitoring',
    description: 'Assess soil health and detect land pollution through satellite imagery and sensor data.',
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    title: 'Predictive Alerts',
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
            <Card key={feature.title} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors duration-300 hover:shadow-lg hover:shadow-primary/10">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
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
