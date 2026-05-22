import { z } from 'zod';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
});

export async function editPostAction(values: unknown) {
  try {
    const validatedValues = formSchema.parse(values);

    const response = await fetch(`/api/posts/${validatedValues.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: validatedValues.title,
        content: validatedValues.content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || `Failed to update post: ${response.statusText}` };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input: ' + error.errors.map(e => e.message).join(', ') };
    }
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred.' };
  }
}
