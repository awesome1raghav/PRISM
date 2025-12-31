
export type ReportStatus = 'Submitted' | 'Verified' | 'Action Taken' | 'Closed';
export type ReportCategory = 'Air' | 'Water' | 'Noise' | 'Waste';

export interface Report {
  id: string;
  category: ReportCategory;
  date: string;
  status: ReportStatus;
  location?: string;
  parameters?: string;
  responseTime?: string;
  authorityNotes?: string;
  assignee?: string;
  media?: {
    type: 'photo' | 'video';
    url: string;
    source: 'Citizen' | 'Authority';
  }[];
  resolution?: {
    action: string;
    responsibleParty: string;
    date: string;
    referenceId: string;
  }
}

// Mock data
export const reports: Report[] = [
  {
    id: 'PR-183491',
    category: 'Water',
    date: '2 days ago',
    status: 'Verified',
    location: 'Bellandur Lake Bridge',
    parameters: 'High Turbidity (12 NTU)',
    responseTime: '4 hours',
    authorityNotes: 'Inspection scheduled for tomorrow morning. Initial samples collected show high levels of industrial effluent.',
    assignee: 'R. Sharma',
    media: [
        { type: 'photo', url: 'https://picsum.photos/seed/report1/400/400', source: 'Citizen' },
        { type: 'video', url: 'https://picsum.photos/seed/report2/400/400', source: 'Citizen' },
        { type: 'photo', url: 'https://picsum.photos/seed/report3/400/400', source: 'Authority' },
    ]
  },
  {
    id: 'PR-183488',
    category: 'Air',
    date: '5 days ago',
    status: 'Action Taken',
    location: 'Whitefield Industrial Area',
    parameters: 'PM2.5: 158 µg/m³',
    responseTime: '12 hours',
    authorityNotes: 'Notice issued to adjacent factory for violating emission norms. Awaiting compliance report.',
    assignee: 'S. Patel',
    media: [
        { type: 'photo', url: 'https://picsum.photos/seed/report4/400/400', source: 'Citizen' },
    ]
  },
  {
    id: 'PR-183482',
    category: 'Noise',
    date: '1 week ago',
    status: 'Closed',
    location: 'Indiranagar 100ft Road',
    parameters: 'Noise Level: 92 dB',
    responseTime: '2 days',
    authorityNotes: 'Event organizers were penalized for violating noise regulations after 10 PM. Issue resolved.',
    assignee: 'A. Gupta',
    media: [],
    resolution: {
        action: 'Penalty issued to event organizer',
        responsibleParty: 'Local Event Company',
        date: '6 days ago',
        referenceId: 'VNC-2024-08-112',
    }
  },
  {
    id: 'PR-183495',
    date: '1 hour ago',
    category: 'Waste',
    status: 'Submitted',
    location: 'Koramangala 4th Block',
    parameters: 'Illegal dumping of construction debris',
    assignee: 'Unassigned',
  },
];
