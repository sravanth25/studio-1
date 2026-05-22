import { Router } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";

const dataFilePath = path.join(process.cwd(), "../../data/posts.json");

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};

function getPosts(): Post[] {
  if (!fs.existsSync(dataFilePath)) return [];
  return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
}

function savePosts(posts: Post[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens.")
    .optional(),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters.").max(200),
  content: z.string().min(100, "Content must be at least 100 characters."),
  category: z.string(),
  tags: z.union([z.string(), z.array(z.string())]),
  featuredImage: z.string().url("Please provide a valid URL for the featured image."),
  metaTitle: z.string().min(5, "Meta title must be at least 5 characters."),
  metaDescription: z.string().min(20, "Meta description must be at least 20 characters."),
  keywords: z.string().min(3, "Please provide at least one keyword."),
});

function transformThirdPartyPayload(body: Record<string, unknown>): Post | null {
  if (
    body !== null &&
    typeof body.content === "object" &&
    body.content !== null &&
    typeof (body.content as Record<string, unknown>).body === "string" &&
    typeof body.title === "string"
  ) {
    const contentObj = body.content as Record<string, unknown>;
    const content = (contentObj.markdown as string) || (contentObj.body as string);
    const excerpt =
      content.substring(0, 180).replace(/<[^>]*>?/gm, "").replace(/#+/g, "").trim() + "...";
    const slug = typeof body.slug === "string" ? body.slug : generateSlug(body.title);

    return {
      id: Date.now(),
      title: body.title,
      slug,
      content,
      excerpt,
      category: "legal-verification",
      tags: ["webhook"],
      featuredImage: `https://picsum.photos/seed/${slug}/800/600`,
      metaTitle: body.title,
      metaDescription: excerpt,
      keywords: "webhook, automated post",
    };
  }
  return null;
}

const postsRouter = Router();

postsRouter.get("/posts", (_req, res) => {
  const posts = getPosts();
  res.json(posts);
});

postsRouter.post("/posts", (req, res) => {
  try {
    const body = req.body;
    let newPost: Post | null = null;
    let validationError;

    const standardValidation = postSchema.safeParse(body);
    if (standardValidation.success) {
      const { data } = standardValidation;
      const slug = data.slug || generateSlug(data.title);
      const tagsArray =
        typeof data.tags === "string"
          ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : data.tags;

      newPost = {
        id: Date.now(),
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: tagsArray,
        featuredImage: data.featuredImage,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
      };
    } else {
      validationError = standardValidation.error;
      newPost = transformThirdPartyPayload(body as Record<string, unknown>);
    }

    if (!newPost) {
      return res.status(400).json({
        error: "Invalid input payload",
        details: validationError?.flatten(),
      });
    }

    const posts = getPosts();
    posts.unshift(newPost);
    savePosts(posts);
    return res.status(201).json(newPost);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid JSON in request body." });
    }
    console.error("POST /posts error:", err);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
});

postsRouter.put("/posts/:id", (req, res) => {
  try {
    const posts = getPosts();
    const id = Number(req.params.id);
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Post not found" });
    posts[idx] = { ...posts[idx], ...req.body };
    savePosts(posts);
    return res.json(posts[idx]);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update post" });
  }
});

postsRouter.delete("/posts/:id", (req, res) => {
  try {
    const posts = getPosts();
    const id = Number(req.params.id);
    const filtered = posts.filter((p) => p.id !== id);
    savePosts(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default postsRouter;
