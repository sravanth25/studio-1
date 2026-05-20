'use client';

import {useState, useEffect} from 'react';
import type {Post} from '@/lib/types';
import {Button} from '@/components/ui/button';
import {Trash2, Pencil, Loader2} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {EditPostDialog} from './edit-post-dialog';

export function ExistingPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const fetchPosts = () => {
    setIsLoading(true);
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data as Post[]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        // Handle error case
      });
  };

  useEffect(() => {
    fetchPosts();

    window.addEventListener('post-published', fetchPosts);
    window.addEventListener('post-edited', fetchPosts);

    return () => {
      window.removeEventListener('post-published', fetchPosts);
      window.removeEventListener('post-edited', fetchPosts);
    };
  }, []);

  const handleDelete = () => {
    if (postToDelete) {
      // Note: This only deletes from the client-side state for this demo.
      // A full implementation would require an API call to delete the post from the server.
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete.id));
      setPostToDelete(null);
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length > 0 ? (
              posts.map(post => (
                <div
                  key={post.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="font-medium">{post.title}</div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setPostToEdit(post)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit Post</span>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => setPostToDelete(post)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete Post</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post
                            "{postToDelete?.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setPostToDelete(null)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                <h3 className="text-xl font-bold tracking-tight">No posts found</h3>
                <p className="text-sm text-muted-foreground">
                  You haven't published any posts yet.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {postToEdit && (
        <EditPostDialog
          post={postToEdit}
          isOpen={!!postToEdit}
          onClose={() => setPostToEdit(null)}
        />
      )}
    </>
  );
}
