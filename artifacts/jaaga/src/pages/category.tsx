import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { categories } from "@/lib/data";
import { fetchBlogs } from "@/lib/api";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Breadcrumb } from "@/components/common/breadcrumb";
import type { Post } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const category = categories.find(c => c.slug === slug);

  useEffect(() => {
    fetchBlogs().then(data => {
      setPosts(data.filter(p => p.category === slug));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blogs" },
    { label: category.name, href: `/category/${category.slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mt-4">
          Category: {category.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          {category.description}
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-bold">No Posts Found</h2>
          <p className="text-muted-foreground mt-2">
            There are no posts in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
