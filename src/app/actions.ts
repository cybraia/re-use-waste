"use server";

import { categorizeWasteMaterials } from "@/ai/flows/categorize-waste-materials";
import { z } from "zod";
import { WasteCategory } from "@/lib/definitions";

const schema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
});

export async function getCategoriesForDescription(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid description.',
      errors: validatedFields.error.flatten().fieldErrors,
      categories: [],
    };
  }

  try {
    const result = await categorizeWasteMaterials({ description: validatedFields.data.description });
    
    // Filter out any categories that might not be in our defined list
    const validCategories = result.categories.filter(category => 
      [
        'Plastic', 'Paper', 'Glass', 'Metal', 'Wood', 'Textiles', 
        'Organic Waste', 'Electronics', 'Construction Debris', 
        'Chemicals', 'Other'
      ].includes(category)
    );
    
    return {
      message: 'Success',
      categories: validCategories as WasteCategory[],
      errors: {},
    };
  } catch (error) {
    console.error("AI categorization failed:", error);
    return {
      message: 'Failed to generate categories from AI.',
      categories: [],
      errors: {},
    };
  }
}
