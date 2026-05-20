'use server';

import {generateSeoMetadata} from '@/ai/flows/generate-seo-metadata';
import {z} from 'zod';

const inputSchema = z.object({
  blogPostContent: z
    .string({required_error: 'Blog content is required.'})
    .min(1, 'Blog content cannot be empty.'),
  keywords: z
    .string({required_error: 'Keywords are required.'})
    .min(1, 'Keywords cannot be empty.'),
});

export async function generateSeoAction(input: unknown) {
  try {
    const validatedInput = inputSchema.parse(input);
    const result = await generateSeoMetadata(validatedInput);
    return {success: true, data: result};
  } catch (error) {
    console.error('Error generating SEO metadata:', error);
    if (error instanceof z.ZodError) {
      return {success: false, error: 'Invalid input: ' + error.errors.map(e => e.message).join(', ')};
    }
    return {success: false, error: 'An unexpected error occurred while generating SEO metadata.'};
  }
}
