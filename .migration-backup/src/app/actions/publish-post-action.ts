"use server";
import { createBlog } from "@/lib/api";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  slug: z
    .string()
    .min(5, "Slug must be at least 5 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens."
    )
    .optional(),
  content: z.string().min(100, "Content must be at least 100 characters."),
  metaDescription: z
    .string()
    .min(20, "Meta description must be at least 20 characters."),
});

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function publishPostAction(values: unknown) {
  try {
    const validatedValues = formSchema.parse(values);
    const slug = validatedValues.slug || generateSlug(validatedValues.title);

    const payload = {
      title: validatedValues.title,
      content: validatedValues.content,
      slug: slug,
      meta_description: validatedValues.metaDescription,
      status: "published"
    };

    const result = await createBlog(payload);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error:
          "Invalid input: " + error.errors.map((e) => e.message).join(", "),
      };
    }
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unexpected error occurred." 
    };
  }
}

