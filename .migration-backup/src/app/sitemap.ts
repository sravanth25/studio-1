import { getPosts } from '@/lib/server/data';
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrl = 'https://blog.jaaga.ai';
  const posts = getPosts();
  
  const postUrls = posts.map(post => ({
    url: `${blogUrl}/blogs/${post.slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  const staticUrls = [
    {
      url: blogUrl,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${blogUrl}/blogs`,
      lastModified: new Date(),
      priority: 0.95,
    },
    {
      url: `${blogUrl}/contact-us`,
      lastModified: new Date(),
      priority: 0.85,
    },
  ];

  const allUrls = [...staticUrls, ...postUrls];

  // Ensure unique URLs
  const uniqueUrls = allUrls.filter((item, index, self) => 
    index === self.findIndex((t) => t.url === item.url)
  );

  return uniqueUrls;
}
