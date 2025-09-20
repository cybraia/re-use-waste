"use server";

import { categorizeWasteMaterials } from "@/ai/flows/categorize-waste-materials";
import { z } from "zod";
import { WasteCategory, MaterialListing } from "@/lib/definitions";
import { listings } from "@/lib/data";
import { revalidatePath } from "next/cache";

const getCategoriesSchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
});

export async function getCategoriesForDescription(prevState: any, formData: FormData) {
  const validatedFields = getCategoriesSchema.safeParse({
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

const createListingSchema = z.object({
  type: z.enum(['offer', 'request']),
  name: z.string().min(3, { message: "Material name must be at least 3 characters long." }),
  quantity: z.coerce.number().min(0, { message: "Quantity must be a positive number." }),
  unit: z.enum(['kg', 'ton', 'items', 'm³']),
  location: z.string().min(3, { message: "Location is required." }),
  description: z.string(),
  categories: z.array(z.string()).optional().default([]),
});

export async function createListing(formData: FormData) {
  const categoryValues = formData.getAll('categories[]');
  const validatedFields = createListingSchema.safeParse({
    type: formData.get('type'),
    name: formData.get('name'),
    quantity: formData.get('quantity'),
    unit: formData.get('unit'),
    location: formData.get('location'),
    description: formData.get('description'),
    categories: categoryValues,
  });

  if (!validatedFields.success) {
    console.error('Validation failed:', validatedFields.error.flatten().fieldErrors);
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, categories, quantity, unit, ...rest } = validatedFields.data;

  const newListing: MaterialListing = {
    id: `l${Date.now()}`,
    companyId: 'user', // Hard-coded for the current user
    material: {
      name,
      description,
      categories: categories as WasteCategory[],
      image: 'https://picsum.photos/seed/new/600/400', // Placeholder for new listings
    },
    quantity: {
      value: quantity,
      unit: unit,
    },
    postedAt: new Date().toISOString(),
    ...rest,
  };

  // Prepend to the in-memory array
  listings.unshift(newListing);

  revalidatePath('/listings');
  revalidatePath('/listings/my-listings');
  revalidatePath('/dashboard');

  return {
    message: 'Listing created successfully!',
    errors: {},
  };
}
