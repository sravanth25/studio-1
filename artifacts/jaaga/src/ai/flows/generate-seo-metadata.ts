// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview A flow to generate SEO-optimized meta descriptions and title tags for blog posts using GenAI.
 *
 * - generateSeoMetadata - A function that generates SEO metadata for a blog post.
 * - GenerateSeoMetadataInput - The input type for the generateSeoMetadata function.
 * - GenerateSeoMetadataOutput - The return type for the generateSeoMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMetadataInputSchema = z.object({
  blogPostContent: z
    .string()
    .describe('The content of the blog post to generate metadata for.'),
  keywords: z
    .string()
    .describe('A comma-separated list of keywords related to the blog post.'),
});
export type GenerateSeoMetadataInput = z.infer<typeof GenerateSeoMetadataInputSchema>;

const GenerateSeoMetadataOutputSchema = z.object({
  metaDescription: z
    .string()
    .describe('The SEO-optimized meta description for the blog post.'),
  titleTag: z.string().describe('The SEO-optimized title tag for the blog post.'),
});
export type GenerateSeoMetadataOutput = z.infer<typeof GenerateSeoMetadataOutputSchema>;

export async function generateSeoMetadata(
  input: GenerateSeoMetadataInput
): Promise<GenerateSeoMetadataOutput> {
  return generateSeoMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMetadataPrompt',
  input: {schema: GenerateSeoMetadataInputSchema},
  output: {schema: GenerateSeoMetadataOutputSchema},
  prompt: `You are an SEO expert tasked with generating meta descriptions and title tags for blog posts.

  Given the content of the blog post and a list of keywords, generate an SEO-optimized meta description and title tag.

  Blog Post Content: {{{blogPostContent}}}
  Keywords: {{{keywords}}}

  Ensure the meta description is concise and engaging, and includes relevant keywords.
  Ensure the title tag is compelling and accurately reflects the content of the blog post, while also including relevant keywords.
  The title tag should be no more than 60 characters.
  The meta description should be no more than 160 characters.
  `,
});

const generateSeoMetadataFlow = ai.defineFlow(
  {
    name: 'generateSeoMetadataFlow',
    inputSchema: GenerateSeoMetadataInputSchema,
    outputSchema: GenerateSeoMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
