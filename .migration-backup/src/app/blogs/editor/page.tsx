
'use client';

import { BlogEditor } from '@/components/blog/blog-editor';
import { ExistingPosts } from '@/components/blog/existing-posts';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function BlogEditorPage() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="mx-auto max-w-4xl space-y-12">
        <div>
          <div className="text-center mb-12 flex justify-between items-center">
            <div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
                Blog Post Editor
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
                Create and publish a new article for your blog.
              </p>
            </div>
            <Button onClick={logout} variant="outline">Logout</Button>
          </div>
          <BlogEditor />
        </div>

        <Separator />

        <div>
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">
              Existing Posts
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Manage your published articles.
            </p>
          </div>
          <ExistingPosts />
        </div>
      </div>
    </div>
  );
}
