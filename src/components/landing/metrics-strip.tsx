import { Wifi, AlertTriangle, Building, Users } from 'lucide-react';

const metrics = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    value: '1,200+',
    label: 'Citizen Reports',
  },
  {
    icon: <Wifi className="h-6 w-6 text-primary" />,
    value: '42',
    label: 'Live Sensors',
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
    value: '128',
    label: 'Alerts Predicted',
  },
  {
    icon: <Building className="h-6 w-6 text-primary" />,
    value: '9',
    label: 'Cities Covered',
  },
];

export default function MetricsStrip() {
  return (
    <section className="border-b border-border/20 bg-background/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/20 text-center">
          {metrics.map((metric, index) => (
            <div key={index} className="py-8 px-4 flex items-center justify-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">{metric.icon}</div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
