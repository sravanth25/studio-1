
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { Post } from '@/lib/types';
import { editPostAction } from '@/app/actions/edit-post-action';
import dynamic from 'next/dynamic';

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
});

type EditPostDialogProps = {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
};

export function EditPostDialog({ post, isOpen, onClose }: EditPostDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: post.id,
      title: post.title,
      content: post.content,
    },
  });

  useEffect(() => {
    form.reset({
        id: post.id,
        title: post.title,
        content: post.content,
    });
  }, [post, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const response = await editPostAction(values);
    setIsLoading(false);

    if (response.success) {
      toast({
        title: 'Blog Post Updated!',
        description: 'Your blog post has been successfully updated.',
      });
      window.dispatchEvent(new Event('post-edited'));
      onClose();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
          <DialogDescription>
            Make changes to your blog post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a compelling title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        className="min-h-[400px] bg-white text-gray-900"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
