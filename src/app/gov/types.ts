

export type Confidence = 'Low' | 'Medium' | 'High';
export type ViolationSource = 'Industry' | 'Traffic' | 'Event' | 'Unknown';

export interface Violation {
  id: string;
  type: string;
  location: string;
  time: string;
  confidence: Confidence;
  source: ViolationSource;
  summary?: string;
  impact?: {
    vulnerableGroups: string[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    populationImpacted: string;
    sensitiveZones: string[];
  };
  recommendations?: {
      action: string;
      priority: 'Immediate' | 'Short-term' | 'Monitoring';
  }[];
  responsibleDepartments?: string[];
  escalationLogic?: {
      deadline: string;
      rule: string;
  };
  explanation?: string;
}

export type IncidentPriority = 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'New' | 'Under investigation' | 'Action taken' | 'Closed';
export type IncidentCategory = 'Air' | 'Water' | 'Noise' | 'Waste';
export type IncidentSource = 'Citizen' | 'Sensor' | 'Both';

export interface Incident {
  id: string;
  category: IncidentCategory;
  location: string;
  submitted: string;
  priority: IncidentPriority;
  status: IncidentStatus;
  assignee: string;
  source: IncidentSource;
  evidence: {
    photos: string[];
    description: string;
    sensorLinked: boolean;
  };
  aiInsights: {
    violationId: string | null;
    probableSource: string;
    confidence: number;
  } | null;
  resolution: {
    actionTaken: string;
    outcome: string;
    followUpRequired: boolean;
  } | null;
  internalNotes: string;
}
