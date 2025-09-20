'use server';

/**
 * @fileOverview Automatically categorizes waste materials based on their description using Genkit.
 *
 * - categorizeWasteMaterials - A function that categorizes waste materials.
 * - CategorizeWasteMaterialsInput - The input type for the categorizeWasteMaterials function.
 * - CategorizeWasteMaterialsOutput - The return type for the categorizeWasteMaterials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WasteMaterialSchema = z.enum([
  'Plastic',
  'Paper',
  'Glass',
  'Metal',
  'Wood',
  'Textiles',
  'Organic Waste',
  'Electronics',
  'Construction Debris',
  'Chemicals',
  'Other',
]);

const CategorizeWasteMaterialsInputSchema = z.object({
  description: z
    .string()
    .describe('A detailed description of the waste materials being listed.'),
});
export type CategorizeWasteMaterialsInput = z.infer<
  typeof CategorizeWasteMaterialsInputSchema
>;

const CategorizeWasteMaterialsOutputSchema = z.object({
  categories: z
    .array(WasteMaterialSchema)
    .describe(
      'An array of waste material categories that best describe the waste material.'
    ),
});
export type CategorizeWasteMaterialsOutput = z.infer<
  typeof CategorizeWasteMaterialsOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'categorizeWastePrompt',
  input: {schema: CategorizeWasteMaterialsInputSchema},
  output: {schema: CategorizeWasteMaterialsOutputSchema},
  prompt: `You are an expert in waste management and material categorization. Given the following description of waste materials, identify and categorize the materials into appropriate waste categories. You MUST ONLY use the waste categories listed below.

Waste Categories:
- Plastic
- Paper
- Glass
- Metal
- Wood
- Textiles
- Organic Waste
- Electronics
- Construction Debris
- Chemicals
- Other

Description: {{{description}}}

If the description contains items that do not match any of the above waste categories, then do not return them.`,
});

const categorizeFlow = ai.defineFlow(
  {
    name: 'categorizeWasteFlow',
    inputSchema: CategorizeWasteMaterialsInputSchema,
    outputSchema: CategorizeWasteMaterialsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);

export async function categorizeWasteMaterials(
  input: CategorizeWasteMaterialsInput
): Promise<CategorizeWasteMaterialsOutput> {
  return await categorizeFlow(input);
}