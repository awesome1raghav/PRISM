import { FastForward, HeartHandshake, BookCheck } from 'lucide-react';

const impacts = [
  {
    icon: <FastForward className="h-10 w-10 text-primary" />,
    title: 'Faster Response Times',
    description: 'Reduce incident response from days to minutes, mitigating environmental damage more effectively.',
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'Improved Public Safety',
    description: 'Protect communities by providing early warnings about hazardous conditions and pollution spikes.',
  },
  {
    icon: <BookCheck className="h-10 w-10 text-primary" />,
    title: 'Environmental Accountability',
    description: 'Create a transparent record of environmental performance, driving policy change and corporate responsibility.',
  },
];

export default function Impact() {
  return (
    <section id="impact" className="py-16 sm:py-24 bg-background/80 backdrop-blur-sm">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Driving Real-World Impact</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            P.R.I.S.M is more than data; it's a catalyst for positive change.
          </p>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {impacts.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {item.icon}
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
