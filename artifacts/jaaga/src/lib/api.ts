import { Post } from './types';

const API_BASE_URL = '/api/posts';

export async function fetchBlogs(): Promise<Post[]> {
  try {
    const response = await fetch(API_BASE_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function fetchBlogBySlug(slug: string): Promise<Post | null> {
  try {
    const blogs = await fetchBlogs();
    return blogs.find((blog) => blog.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
}

export async function updateBlog(id: number, data: Partial<Post>): Promise<Post> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to update blog: ${response.statusText}`);
  }
  return response.json();
}

export async function deleteBlog(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete blog: ${response.statusText}`);
  }
}
