import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import { categories} from '@/lib/data';
import {BlogPostCard} from '@/components/blog/blog-post-card';
import {Breadcrumb} from '@/components/common/breadcrumb';
import { getPosts } from '@/lib/server/data';

type Props = {
  params: {slug: string};
};

export async function generateStaticParams() {
  return categories.map(category => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const category = categories.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Articles`,
    description: `Browse all articles in the ${category.name} category on Jaaga Insights. ${category.description}`,
    alternates: {
      canonical: `/category/${params.slug}`,
    },
  };
}

export default function CategoryPage({params}: Props) {
  const category = categories.find(c => c.slug === params.slug);

  if (!category) {
    notFound();
  }
  const posts = getPosts();

  const categoryPosts = posts.filter(p => p.category === category.slug);

  const breadcrumbItems = [
    {label: 'Home', href: '/'},
    {label: 'Blog', href: '/blog'},
    {label: category.name, href: `/category/${category.slug}`},
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

      {categoryPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryPosts.map(post => (
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
