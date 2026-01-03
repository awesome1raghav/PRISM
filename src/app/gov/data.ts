
import { type Incident, type Violation } from './types';

export const initialViolations: Violation[] = [
  { 
    id: 'V-001',
    type: 'Emission Limit Breach', 
    location: 'Peenya Industrial Area', 
    time: '2h ago', 
    confidence: 'High', 
    source: 'Industry',
    summary: 'AQI in Peenya Industrial Area is currently Poor (158), triggered by a sudden spike in PM2.5 levels detected 2 hours ago. This correlates with 3 citizen complaints about thick smoke in the area. Wind patterns are currently blowing southwest, towards residential zones.',
    impact: {
      vulnerableGroups: ['children', 'elderly', 'asthmatics'],
      riskLevel: 'HIGH',
      populationImpacted: 'est. 15,000 residents',
      sensitiveZones: ['Peenya Public School (2km)', 'ESI Hospital (3km)']
    },
    recommendations: [
      { action: 'Issue public health warning for Peenya and surrounding areas via SMS and social media.', priority: 'Immediate' },
      { action: 'Dispatch mobile air quality monitoring unit to verify sensor readings and identify the precise source.', priority: 'Short-term' },
      { action: 'Initiate on-site inspection of factories with a history of emission violations in the area.', priority: 'Short-term' },
      { action: 'Increase sensor polling frequency in the affected area to once every 2 minutes for the next 6 hours.', priority: 'Monitoring' }
    ],
    responsibleDepartments: ['Pollution Control Board', 'Municipal Health Department', 'Disaster Management Cell'],
    escalationLogic: {
      deadline: 'Response required within 1 hour',
      rule: 'If no action is taken, escalate to State Environmental Secretary and trigger automated public health alert.'
    },
    explanation: 'High confidence is based on a 98% correlation with historical emission signatures from Factory ID #F7891 during nighttime production cycles. Weather models predict low wind dispersion for the next 4 hours, increasing ground-level pollutant concentration. A similar incident in 2023 led to a 40% increase in respiratory complaints.'
  },
  { 
    id: 'V-002', 
    type: 'Sudden Pollution Spike', 
    location: 'Marathahalli', 
    time: '5h ago', 
    confidence: 'Medium', 
    source: 'Traffic',
    summary: 'A localized but significant spike in Carbon Monoxide (CO) was detected near the Marathahalli bridge during evening rush hour. The levels exceeded the safe threshold for over 45 minutes.',
    impact: {
      vulnerableGroups: ['commuters', 'street vendors'],
      riskLevel: 'MEDIUM',
      populationImpacted: 'est. 5,000 people in transit',
      sensitiveZones: ['Local Market (500m)']
    },
    recommendations: [
      { action: 'Review traffic camera footage to identify any large, idling commercial vehicles or unusual traffic blockages.', priority: 'Short-term' },
      { action: 'Cross-reference with public transport data to see if a bus breakdown occurred.', priority: 'Monitoring' },
      { action: 'If this pattern reoccurs, recommend deploying traffic police to improve flow during peak hours.', priority: 'Monitoring' }
    ],
    responsibleDepartments: ['Traffic Police', 'Regional Transport Office'],
    escalationLogic: {
      deadline: 'Analysis to be completed within 24 hours',
      rule: 'If spike repeats for 3 consecutive days, escalate to Traffic Management Committee.'
    },
    explanation: 'Medium confidence due to transient nature. The event signature matches heavy vehicular congestion. It does not match industrial emission patterns. Two citizen reports mentioned a "terrible smell" in the same timeframe.'
  },
  { 
    id: 'V-003', 
    type: 'Illegal Dumping', 
    location: 'Near Varthur Lake', 
    time: '1 day ago', 
    confidence: 'High', 
    source: 'Unknown',
    summary: 'Satellite imagery analysis from 24 hours ago shows new, unauthorized solid waste deposits near the Varthur Lake buffer zone. The deposit area is approximately 50 sq meters.',
    impact: {
      vulnerableGroups: ['local residents', 'aquatic life'],
      riskLevel: 'HIGH',
      populationImpacted: 'N/A',
      sensitiveZones: ['Varthur Lake (Ecologically Sensitive Area)']
    },
    recommendations: [
      { action: 'Dispatch a solid waste management team for immediate inspection and cleanup.', priority: 'Immediate' },
      { action: 'Install a temporary surveillance camera in the area to deter future dumping and identify culprits.', priority: 'Short-term' },
      { action: 'Analyze vehicle movement data on nearby roads during the suspected dumping time (night hours).', priority: 'Short-term' }
    ],
    responsibleDepartments: ['Solid Waste Management', 'Lake Development Authority', 'Local Police'],
    escalationLogic: {
      deadline: 'Cleanup to be initiated within 12 hours.',
      rule: 'If cleanup is not confirmed within 24 hours, escalate to the Municipal Commissioner.'
    },
    explanation: 'High confidence based on 99.7% change detection from high-resolution satellite imagery compared to the previous day. The location is a known hotspot for illegal dumping.'
  },
  { 
    id: 'V-004', 
    type: 'Noise Limit Breach', 
    location: 'Koramangala', 
    time: '3h ago', 
    confidence: 'Low', 
    source: 'Event',
    summary: 'Multiple noise sensors in Koramangala 4th Block registered levels between 75-80 dB for a 30-minute period, exceeding residential nighttime limits. The pattern is consistent with a public event or gathering.',
    impact: {
      vulnerableGroups: ['local residents'],
      riskLevel: 'LOW',
      populationImpacted: 'est. 2,000 residents',
      sensitiveZones: ['Residential apartments']
    },
    recommendations: [
      { action: 'Cross-check with local police for any event permits issued in the area.', priority: 'Monitoring' },
      { action: 'If no permit exists and complaints are received, dispatch a patrol unit to investigate.', priority: 'Short-term' }
    ],
    responsibleDepartments: ['Local Police'],
    escalationLogic: {
      deadline: 'Initial check to be completed within 2 hours.',
      rule: 'No automatic escalation unless citizen complaints are filed.'
    },
    explanation: 'Low confidence as the source is unconfirmed and could be a temporary, authorized event. The system has flagged it based on sensor data alone. No visual confirmation is available.'
  },
  { 
    id: 'V-005', 
    type: 'Chemical Effluent Release', 
    location: 'Bellandur Canal', 
    time: '8h ago', 
    confidence: 'High', 
    source: 'Industry',
    summary: 'Water quality probes in the Bellandur canal detected a sharp drop in pH (to 5.5) and a rise in turbidity, indicative of an acidic industrial effluent release. The plume is moving downstream.',
    impact: {
      vulnerableGroups: ['aquatic ecosystem', 'downstream farmers'],
      riskLevel: 'HIGH',
      populationImpacted: 'N/A',
      sensitiveZones: ['Bellandur Lake', 'Downstream irrigation inlets']
    },
    recommendations: [
      { action: 'Immediately issue a warning to downstream users and agricultural cooperatives to cease water intake.', priority: 'Immediate' },
      { action: 'Deploy a water sampling team to collect physical samples for lab analysis to identify the specific chemical.', priority: 'Immediate' },
      { action: 'Inspect all industrial outlets upstream from the detection point.', priority: 'Short-term' }
    ],
    responsibleDepartments: ['Pollution Control Board', 'Lake Development Authority', 'Agriculture Department'],
    escalationLogic: {
      deadline: 'Public warning to be issued within 30 minutes.',
      rule: 'If the source is not identified within 6 hours, escalate to the State Environmental Protection Agency.'
    },
    explanation: 'High confidence based on simultaneous anomalous readings from three separate water probes. The chemical signature strongly correlates with textile processing waste, a common industry in the upstream area.'
  },
];


export const initialIncidents: Incident[] = [
    { id: 'INC-001', category: 'Water', location: 'Bellandur Lake', submitted: '2h ago', priority: 'High', status: 'New', assignee: 'Unassigned', source: 'Citizen', evidence: { photos: ['https://picsum.photos/seed/inc1/400/300'], description: 'Water is dark green and smells foul. Large amount of foam visible.', sensorLinked: true }, aiInsights: { violationId: 'V-005', probableSource: 'Industrial', confidence: 92 }, resolution: null, internalNotes: 'Priority based on potential ecological impact and previous incidents in this area.' },
    { id: 'INC-003', category: 'Waste', location: 'Koramangala 6th Block', submitted: '1 day ago', priority: 'Low', status: 'Action taken', assignee: 'S. Patel', source: 'Both', evidence: { photos: ['https://picsum.photos/seed/inc3/400/300'], description: 'Construction debris dumped on the sidewalk overnight.', sensorLinked: false }, aiInsights: { violationId: 'V-003', probableSource: 'Unknown', confidence: 95 }, resolution: { actionTaken: 'Debris cleared by municipal team. Notice served to nearby construction site.', outcome: 'Area cleared.', followUpRequired: false }, internalNotes: 'Repeat offender in this area. Increased patrolling recommended.' },
    { id: 'INC-004', category: 'Noise', location: 'Indiranagar 100ft Road', submitted: '2 days ago', priority: 'Low', status: 'Closed', assignee: 'A. Gupta', source: 'Citizen', evidence: { photos: [], description: 'Loud music from a bar well past 11 PM.', sensorLinked: true }, aiInsights: { violationId: 'V-004', probableSource: 'Event', confidence: 75 }, resolution: { actionTaken: 'Patrol unit dispatched. Warning issued to establishment.', outcome: 'Music was stopped. Compliance confirmed.', followUpRequired: false }, internalNotes: 'Establishment has been warned before.' },
    { id: 'INC-005', category: 'Water', location: 'Varthur Lake', submitted: '3 days ago', priority: 'High', status: 'Under investigation', assignee: 'Field Team B', source: 'Sensor', evidence: { photos: [], description: '', sensorLinked: true }, aiInsights: { violationId: 'V-003', probableSource: 'Sewage', confidence: 85 }, resolution: null, internalNotes: 'Ecologically sensitive area. Needs urgent analysis.' },
  ];

