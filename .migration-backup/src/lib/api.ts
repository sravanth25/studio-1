import { Post } from './types';

const API_BASE_URL = 'https://blog.jaaga.ai/api/blogs';

export async function fetchBlogs(): Promise<Post[]> {
  try {
    const response = await fetch(API_BASE_URL, {
      cache: 'no-store', // Ensure we get fresh data
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string): Promise<Post | null> {
  try {
    // Check if the API supports filtering by slug, or fetch all and find
    // Since I don't know if there is a /api/blogs/[slug] endpoint, 
    // I'll fetch all and filter for now, or try to append slug if that's a common pattern.
    // The user said "Slug-based routing (e.g., /blog/:slug)".
    const blogs = await fetchBlogs();
    return blogs.find((blog) => blog.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
}

export async function createBlog(data: {
  title: string;
  content: string;
  slug: string;
  meta_description: string;
  status: string;
}) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create blog: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}
