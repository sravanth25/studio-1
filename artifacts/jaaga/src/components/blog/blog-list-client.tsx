


'use client';

import { useState, useMemo } from "react";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Post } from "@/lib/types";

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;
    const searchTerm = searchQuery.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
    );
  }, [searchQuery, posts]);

  return (
    <>
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for articles..."
            className="w-full pl-10 h-12 text-base"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
