'use server';

/**
 * @fileOverview Automatically categorizes waste materials based on their description.
 *
 * - categorizeWasteMaterials - A function that categorizes waste materials.
 * - CategorizeWasteMaterialsInput - The input type for the categorizeWasteMaterials function.
 * - CategorizeWasteMaterialsOutput - The return type for the categorizeWasteMaterials function.
 */

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
    .describe('An array of waste material categories that best describe the waste material.'),
});
export type CategorizeWasteMaterialsOutput = z.infer<
  typeof CategorizeWasteMaterialsOutputSchema
>;

export async function categorizeWasteMaterials(
  input: CategorizeWasteMaterialsInput
): Promise<CategorizeWasteMaterialsOutput> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not set in the environment.');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert in waste management and material categorization. Given the following description of waste materials, identify and categorize the materials into appropriate waste categories.  You MUST ONLY use the waste categories listed below.

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

Description: ${input.description}

Please provide a JSON object with a single key "categories" which is an array of strings that best describe the waste material.  If the description contains items that do not match any of the above waste categories, then do not return them.
`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    response_mime_type: "application/json",
                }
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Gemini API request failed:', response.status, errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        const textContent = data.candidates[0].content.parts[0].text;
        const parsedOutput = JSON.parse(textContent);

        // Validate the output with Zod
        const validationResult = CategorizeWasteMaterialsOutputSchema.safeParse(parsedOutput);

        if (!validationResult.success) {
            console.error("Zod validation failed:", validationResult.error);
            throw new Error("Received invalid data structure from AI.");
        }
        
        return validationResult.data;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to categorize waste materials.');
    }
}
