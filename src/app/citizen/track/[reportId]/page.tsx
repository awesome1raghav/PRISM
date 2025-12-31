
'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, MapPin, Wind, Droplets, Waves, Trash2, Clock, CheckCircle, ShieldQuestion, Image, Video, Hourglass, ArrowRight, Check, UserCheck } from 'lucide-react';
import { Report, ReportStatus, reports } from '../../types';
import { cn } from '@/lib/utils';
import ImagePlaceholder from 'next/image';


const statusTimeline: ReportStatus[] = ['Submitted', 'Verified', 'Action Taken', 'Closed'];

const categoryIcons = {
    Air: <Wind className="h-5 w-5" />,
    Water: <Droplets className="h-5 w-5" />,
    Noise: <Waves className="h-5 w-5" />,
    Waste: <Trash2 className="h-5 w-5" />,
};

const statusStyles: Record<ReportStatus, string> = {
    Submitted: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    Verified: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    'Action Taken': "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Closed: "bg-green-500/20 text-green-400 border-green-500/30",
};


export default function ReportTrackingPage() {
    const params = useParams();
    const reportId = params.reportId as string;
    // In a real app, you'd fetch this data based on reportId
    const report = reports.find(r => r.id === reportId) || reports[0]; 
    const currentStatusIndex = statusTimeline.indexOf(report.status);


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow container py-12">
        <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Report Status</h1>
            <p className="text-muted-foreground">Tracking ID: <span className="font-mono text-sm">{report.id}</span></p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                 {report.status !== 'Closed' ? (
                    <Card className="bg-card/40 border-border/30">
                        <CardHeader>
                            <CardTitle>Pending Action</CardTitle>
                             <div className="flex items-center gap-2 pt-2">
                                <span className="text-sm text-muted-foreground">Status:</span>
                                <Badge variant="outline" className={cn(statusStyles[report.status])}>
                                    {report.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <ol className="flex items-center w-full">
                                    {statusTimeline.map((status, index) => (
                                        <li key={status} className={cn(
                                            "flex w-full items-center",
                                            index < statusTimeline.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : "",
                                            index <= currentStatusIndex ? "after:border-primary" : "after:border-muted",
                                        )}>
                                            <span className={cn(
                                                "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0",
                                                index <= currentStatusIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                            )}>
                                                {index < currentStatusIndex ? <Check className="w-5 h-5" /> : <span className="text-lg">{index + 1}</span>}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    {statusTimeline.map(status => <span key={status}>{status}</span>)}
                                </div>
                            </div>
                            
                            <Separator className="my-6" />

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Authority Notes</h3>
                                {report.authorityNotes ? (
                                    <p className="text-muted-foreground italic">"{report.authorityNotes}"</p>
                                ) : (
                                    <p className="text-muted-foreground">Your report is under review. You will be notified once action is taken.</p>
                                )}
                            </div>

                        </CardContent>
                    </Card>
                 ) : (
                    <Card className="bg-card/40 border-green-500/30 border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-400"><CheckCircle /> Report Resolved</CardTitle>
                            <CardDescription>This issue has been closed by the authorities.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold">Final Action Taken</h4>
                                    <p className="text-muted-foreground">{report.resolution?.action || 'Details not available.'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Responsible Party</h4>
                                    <p className="text-muted-foreground">{report.resolution?.responsibleParty || 'Unknown'}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold">Date of Resolution</h4>
                                    <p className="text-muted-foreground">{report.resolution?.date || 'Not available'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Legal Reference ID</h4>
                                    <p className="font-mono text-xs text-muted-foreground">{report.resolution?.referenceId || 'N/A'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                 )}


                 <Card className="bg-card/40 border-border/30">
                    <CardHeader><CardTitle>Evidence Gallery</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {(report.media || []).map((media, index) => (
                                <div key={index} className="relative aspect-square">
                                    <ImagePlaceholder 
                                        src={media.url} 
                                        alt={media.type} 
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                    <div className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white">
                                        {media.type === 'photo' ? <Image className="h-4 w-4"/> : <Video className="h-4 w-4"/>}
                                    </div>
                                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-white text-xs rounded-b-md">
                                        {media.source}
                                    </div>
                                </div>
                           ))}
                        </div>
                         {(report.media || []).length === 0 && (
                            <p className="text-muted-foreground text-center py-4">No media submitted for this report.</p>
                         )}
                    </CardContent>
                 </Card>
            </div>
            
            <div className="space-y-6">
                 <Card className="bg-card/40 border-border/30">
                    <CardHeader>
                        <CardTitle className="text-xl">Report Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold">{report.location}</p>
                                <p className="text-muted-foreground">Location</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-primary">{categoryIcons[report.category]}</div>
                            <div>
                                <p className="font-semibold">{report.category} Pollution</p>
                                <p className="text-muted-foreground">Category</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold">{report.date}</p>
                                <p className="text-muted-foreground">Time Submitted</p>
                            </div>
                        </div>
                         {report.assignee && (
                            <div className="flex items-center gap-3">
                                <UserCheck className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">{report.assignee}</p>
                                    <p className="text-muted-foreground">Assigned Officer</p>
                                </div>
                            </div>
                        )}
                        {report.responseTime && (
                            <div className="flex items-center gap-3">
                                <Hourglass className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">{report.responseTime}</p>
                                    <p className="text-muted-foreground">Authority Response Time</p>
                                </div>
                            </div>
                        )}
                         {report.parameters && (
                            <div className="flex items-center gap-3">
                                <ShieldQuestion className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">{report.parameters}</p>
                                    <p className="text-muted-foreground">Key Parameter</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

        </div>
      </main>
    </div>
  );
}
