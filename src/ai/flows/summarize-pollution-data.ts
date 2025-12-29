'use server';
/**
 * @fileOverview Summarizes pollution data for a specified region and time period.
 *
 * - summarizePollutionData - A function that summarizes pollution data.
 * - SummarizePollutionDataInput - The input type for the summarizePollutionData function.
 * - SummarizePollutionDataOutput - The return type for the summarizePollutionData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePollutionDataInputSchema = z.object({
  region: z.string().describe('The region for which to summarize pollution data.'),
  timePeriod: z.string().describe('The time period for which to summarize pollution data (e.g., last week, last month).'),
  pollutionType: z.string().describe('The types of pollution to summarize (e.g., air, water, soil).'),
});

export type SummarizePollutionDataInput = z.infer<typeof SummarizePollutionDataInputSchema>;

const SummarizePollutionDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the pollution data for the specified region and time period.'),
});

export type SummarizePollutionDataOutput = z.infer<typeof SummarizePollutionDataOutputSchema>;

export async function summarizePollutionData(input: SummarizePollutionDataInput): Promise<SummarizePollutionDataOutput> {
  return summarizePollutionDataFlow(input);
}

const summarizePollutionDataPrompt = ai.definePrompt({
  name: 'summarizePollutionDataPrompt',
  input: {schema: SummarizePollutionDataInputSchema},
  output: {schema: SummarizePollutionDataOutputSchema},
  prompt: `Summarize the pollution data for the following region, time period, and pollution type.\n\nRegion: {{{region}}}\nTime Period: {{{timePeriod}}}\nPollution Type: {{{pollutionType}}}\n\nSummary:`, 
});

const summarizePollutionDataFlow = ai.defineFlow(
  {
    name: 'summarizePollutionDataFlow',
    inputSchema: SummarizePollutionDataInputSchema,
    outputSchema: SummarizePollutionDataOutputSchema,
  },
  async input => {
    const {output} = await summarizePollutionDataPrompt(input);
    return output!;
  }
);
