
'use server';
import { getPosts } from '@/lib/server/data';

import {z} from 'zod';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
});

export async function editPostAction(values: unknown) {
  const posts = getPosts();

  try {
    const validatedValues = formSchema.parse(values);
    
    const postIndex = posts.findIndex(p => p.id === validatedValues.id);

    if (postIndex === -1) {
        return {success: false, error: 'Post not found.'};
    }

    const originalPost = posts[postIndex];

    // Update only title and content
    posts[postIndex] = {
        ...originalPost,
        title: validatedValues.title,
        content: validatedValues.content,
    };

    return {success: true, data: posts[postIndex]};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {success: false, error: 'Invalid input: ' + error.errors.map(e => e.message).join(', ')};
    }
    console.error(error);
    return {success: false, error: 'An unexpected error occurred.'};
  }
}
