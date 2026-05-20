'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useToast} from '@/hooks/use-toast';
import {generateSeoAction} from '@/app/actions/generate-seo-action';
import {Bot, Copy, Loader2} from 'lucide-react';

const formSchema = z.object({
  blogPostContent: z.string().min(100, 'Content must be at least 100 characters.'),
  keywords: z.string().min(3, 'Please provide at least one keyword.'),
});

type SeoOptimizerProps = {
  content: string;
  keywords: string;
};

export function SeoOptimizer({content, keywords}: SeoOptimizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{titleTag: string; metaDescription: string} | null>(null);
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blogPostContent: content,
      keywords: keywords,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await generateSeoAction(values);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: 'SEO Metadata Generated',
        description: 'New title and description are ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'An unexpected error occurred.',
      });
    }
  }
  
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${fieldName} has been copied.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="mr-2 h-4 w-4" />
          Generate SEO with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI SEO Optimizer</DialogTitle>
          <DialogDescription>
            Generate an SEO-optimized title tag and meta description for this blog post.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="keywords"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., property audit, legal verification" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blogPostContent"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your blog content here..."
                        className="h-64 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="mr-2 h-4 w-4" />
                )}
                Generate
              </Button>
            </form>
          </Form>

          <div className="space-y-4 rounded-md bg-muted p-4">
            <h3 className="font-semibold">Generated Metadata</h3>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Generating...</p>
              </div>
            )}
            {result && (
              <div className="space-y-4">
                <div>
                  <FormLabel>Generated Title Tag</FormLabel>
                   <div className="relative">
                    <Textarea value={result.titleTag} readOnly className="pr-10"/>
                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-8 w-8" onClick={() => copyToClipboard(result.titleTag, 'Title Tag')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{result.titleTag.length} characters</p>
                </div>
                <div>
                  <FormLabel>Generated Meta Description</FormLabel>
                  <div className="relative">
                    <Textarea value={result.metaDescription} readOnly className="pr-10 h-32"/>
                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-8 w-8" onClick={() => copyToClipboard(result.metaDescription, 'Meta Description')}>
                        <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{result.metaDescription.length} characters</p>
                </div>
              </div>
            )}
            {!isLoading && !result && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-3 bg-background rounded-full mb-4">
                        <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Generated metadata will appear here.</p>
                </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
