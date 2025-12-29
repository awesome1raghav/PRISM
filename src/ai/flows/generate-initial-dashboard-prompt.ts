'use server';

/**
 * @fileOverview Generates an initial dashboard query from a simple text prompt.
 *
 * - generateInitialDashboardPrompt - A function that generates the initial dashboard query.
 * - GenerateInitialDashboardPromptInput - The input type for the generateInitialDashboardPrompt function.
 * - GenerateInitialDashboardPromptOutput - The return type for the generateInitialDashboardPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialDashboardPromptInputSchema = z.object({
  prompt: z.string().describe('A simple text prompt to generate the initial dashboard query.'),
});

export type GenerateInitialDashboardPromptInput = z.infer<
  typeof GenerateInitialDashboardPromptInputSchema
>;

const GenerateInitialDashboardPromptOutputSchema = z.object({
  query: z.string().describe('The generated initial dashboard query.'),
});

export type GenerateInitialDashboardPromptOutput = z.infer<
  typeof GenerateInitialDashboardPromptOutputSchema
>;

export async function generateInitialDashboardPrompt(
  input: GenerateInitialDashboardPromptInput
): Promise<GenerateInitialDashboardPromptOutput> {
  return generateInitialDashboardPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialDashboardPrompt',
  input: {schema: GenerateInitialDashboardPromptInputSchema},
  output: {schema: GenerateInitialDashboardPromptOutputSchema},
  prompt: `You are an expert dashboard configurator. Generate an initial dashboard query based on the following user prompt: {{{prompt}}}. The query should be specific and actionable, enabling the dashboard to display relevant information about pollution levels and potential environmental hazards. Return the query.`,
});

const generateInitialDashboardPromptFlow = ai.defineFlow(
  {
    name: 'generateInitialDashboardPromptFlow',
    inputSchema: GenerateInitialDashboardPromptInputSchema,
    outputSchema: GenerateInitialDashboardPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
