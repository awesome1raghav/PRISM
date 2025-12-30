import { Wifi, AlertTriangle, Building, Users } from 'lucide-react';

const metrics = [
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    value: '1,200+',
    label: 'Citizen Reports',
  },
  {
    icon: <Wifi className="h-6 w-6 text-teal-500" />,
    value: '42',
    label: 'Live Sensors',
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    value: '128',
    label: 'Alerts Predicted',
  },
  {
    icon: <Building className="h-6 w-6 text-slate-500" />,
    value: '9',
    label: 'Cities Covered',
  },
];

export default function MetricsStrip() {
  return (
    <section className="border-y bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x text-center">
          {metrics.map((metric, index) => (
            <div key={index} className="py-6 px-4 flex items-center justify-center gap-4">
              <div className="p-3 bg-slate-100 rounded-full">{metric.icon}</div>
              <div className="text-left">
                <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                <p className="text-sm text-slate-500 font-medium">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
