
import BlogListClient from "@/components/blog/blog-list-client";
import { fetchBlogs } from "@/lib/api";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const pageTitle = 'Property Documents Guide: Download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch | JaaGa';
const pageDescription = 'Learn how to download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch, and more. Your guide to property records in Tamil Nadu, Telangana, and across India.';
// ... (omitting pageKeywords for brevity, I'll keep them as they are useful for SEO)
const pageKeywords = [
    'real estate blog India',
    'property law India',
    'digital ownership',
    'land records Telangana',
    'patta chitta Tamil Nadu',
    'Encumbrance Certificate AP',
    'property verification',
    'JaaGa insights',
    'property documents online',
    'legal heir certificate',
    'sale deed',
    'Telangana EC',
    'Encumbrance Certificate Telangana',
    'Certified EC Telangana',
    'ROR 1B Telangana',
    'Pahani Telangana',
    'Dharani land record',
    'Telangana sale deed copy',
    'Telangana mutation',
    'PTIN search Telangana',
    'GHMC property tax receipt',
    'Telangana market value certificate',
    'Telangana survey number check',
    'Telangana land ownership check',
    'AP EC online',
    'Encumbrance Certificate AP',
    '1B record AP',
    'Adangal AP',
    'AP sale deed copy',
    'MeeBhoomi document download',
    'AP mutation online',
    'AP land records search',
    'AP property tax receipt',
    'AP survey number check',
    'AP property title check',
    'Patta Chitta online',
    'Tamil Nadu EC',
    'TSLR extract Tamil Nadu',
    'Tamil Nadu sale deed copy',
    'Patta transfer TN',
    'FMB sketch Tamil Nadu',
    'Tamil Nadu property tax receipt',
    'Tamil Nadu survey number search',
    'TN land ownership verification',
    '7/12 extract online',
    'Satbara Utara',
    '8A extract Maharashtra',
    'Maharashtra EC download',
    'Property Card Maharashtra',
    'Maharashtra sale deed copy',
    'mutation 7/12 online',
    'Mahabhulekh land record',
    'Maharashtra property tax receipt',
    'survey number Maharashtra',
    'RTC Karnataka online',
    'Pahani Karnataka',
    'Mutation extract Karnataka',
    'EC Karnataka download',
    'Survey Tippani Karnataka',
    'eKhata Karnataka',
    'BBMP property tax receipt',
    'Karnataka land record online',
    'Karnataka sale deed copy',
    'download property documents online',
    'certified encumbrance certificate',
    'mutation name transfer online',
    'land record search app',
    'sale deed copy download',
    'property tax receipt online',
    'survey number check',
    'property title verification',
    'legal property documents online',
    'igrs telangana',
    'telangana registration',
    'telangana ec search',
    'dharani telangana',
    'lrs telangana',
    'village map with survey numbers in telangana',
    'telangana land registration',
    'prohibited properties telangana',
    'ec download telangana',
    'igrs telangana ec',
    'telangana land details',
    'sro telangana',
    'encumbrance certificate online telangana',
    'ccla telangana',
    'telangana market value'
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: pageKeywords,
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: 'https://ik.imagekit.io/sravanth/blog%20thumbnails%20(5).png',
        width: 1200,
        height: 630,
        alt: 'JaaGa Insights - Blog on Indian Real Estate',
      },
    ],
  },
};

export default async function BlogListPage() {
  const posts = await fetchBlogs();
  const sortedPosts = [...posts].sort((a, b) => (b.id || 0) - (a.id || 0));
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          JaaGa Insights: Property Documents & Guides
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Your source for expert analysis on how to download Encumbrance Certificate (EC), Adangal ROR, FMB Sketch, and other essential land records in India.
        </p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No blog posts found at the moment. Please check back later.</p>
        </div>
      ) : (
        <BlogListClient posts={sortedPosts} />
      )}
    </div>
  );
}

