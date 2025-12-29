import { Wifi, AlertTriangle, Building } from 'lucide-react';

const metrics = [
  {
    icon: <Wifi className="h-5 w-5 text-muted-foreground" />,
    value: '42',
    label: 'Active Sensors',
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-muted-foreground" />,
    value: '128',
    label: 'Alerts Predicted',
  },
  {
    icon: <Building className="h-5 w-5 text-muted-foreground" />,
    value: '9',
    label: 'Cities Covered',
  },
];

export default function MetricsStrip() {
  return (
    <section className="border-y border-border/40 bg-card/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-3 divide-x divide-border/40 text-center">
          {metrics.map((metric, index) => (
            <div key={index} className="py-6 px-4 flex items-center justify-center gap-4">
              {metric.icon}
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
