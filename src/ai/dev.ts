import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-dashboard-prompt.ts';
import '@/ai/flows/summarize-pollution-data.ts';