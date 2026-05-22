import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  slug: z.string().optional(),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters."),
  content: z.string().min(100, "Content must be at least 100 characters."),
  category: z.string({ required_error: "Please select a category." }),
  tags: z.string().min(3, "Please provide at least one tag."),
  featuredImage: z.string().url("Please provide a valid URL for the featured image."),
  metaTitle: z.string().min(5, "Meta title must be at least 5 characters."),
  metaDescription: z.string().min(20, "Meta description must be at least 20 characters."),
  keywords: z.string().min(3, "Please provide at least one keyword."),
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function publishPostAction(values: unknown) {
  try {
    const v = formSchema.parse(values);
    const slug = v.slug?.trim() || generateSlug(v.title);

    const payload = {
      slug,
      title: v.title,
      excerpt: v.excerpt,
      content: v.content,
      category: v.category,
      tags: v.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      featuredImage: v.featuredImage,
      metaTitle: v.metaTitle,
      metaDescription: v.metaDescription,
      keywords: v.keywords,
    };

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create post: ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input: " + error.errors.map((e) => e.message).join(", "),
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred.",
    };
  }
}
