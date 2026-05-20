
'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/hooks/use-toast';
import {categories} from '@/lib/data';
import {useState, useMemo} from 'react';
import {Loader2, FileUp} from 'lucide-react';
import {Card, CardContent} from '@/components/ui/card';
import {publishPostAction} from '@/app/actions/publish-post-action';
import dynamic from 'next/dynamic';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  slug: z
    .string()
    .optional(),
  excerpt: z
    .string()
    .min(20, 'Excerpt must be at least 20 characters.')
    .max(200, 'Excerpt cannot be more than 200 characters.'),
  content: z.string().min(100, 'Content must be at least 100 characters.'),
  category: z.string({required_error: 'Please select a category.'}),
  tags: z.string().min(3, 'Please provide at least one tag.'),
  featuredImage: z.string().url('Please provide a valid URL for the featured image.'),
  metaTitle: z.string().min(5, 'Meta title must be at least 5 characters.'),
  metaDescription: z.string().min(20, 'Meta description must be at least 20 characters.'),
  keywords: z.string().min(3, 'Please provide at least one keyword.'),
});

export function BlogEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: undefined,
      tags: '',
      featuredImage: '',
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    form.setValue('slug', slug);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setIsLoading(true);
    const response = await publishPostAction(values);
    // setIsLoading(false);

    if (response.success) {
      toast({
        title: 'Blog Post Published!',
        description: 'Your new blog post has been successfully created.',
      });
      // form.reset();
      // This is a temporary hack to force a re-render of the ExistingPosts component.
      // In a real app, state management (like Context or Zustand) would handle this.
      window.dispatchEvent(new Event('post-published'));
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Something went wrong. Please try again.',
      });
    }
  }

  return (
    <Card>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Post Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a compelling title"
                          {...field}
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="this-will-be-auto-generated" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the part of the URL that identifies your post. It will be auto-generated if left blank.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="category"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.slug} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Featured Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.png" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A short summary of the post (max 200 characters)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This appears on the blog listing page.</FormDescription>
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
                  <FormDescription>Full content of the blog post.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <h3 className="text-lg font-semibold">SEO Metadata</h3>
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO-friendly title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A concise summary for search engines"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-8">
                <h3 className="text-lg font-semibold invisible hidden md:block">.</h3>
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated SEO keywords.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="tag1, tag2, tag3" {...field} />
                      </FormControl>
                      <FormDescription>Comma-separated tags for grouping posts.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileUp className="mr-2 h-4 w-4" />
                )}
                Publish Post
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
