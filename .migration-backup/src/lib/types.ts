

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Service = {
  categorySlug: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export type Post = {
  id: number;
  slug: string;
  title:string;
  excerpt: string;
  content: string; 
  category: Category['slug'];
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};
