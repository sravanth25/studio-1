
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/data";
import { getPosts } from "@/lib/server/data";
import { ArrowRight, FileCheck } from "lucide-react";
import { CategoryIcon } from "@/components/icons/category-icon";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/types";
import { FAQSection } from "@/components/ui/faqsection";

function Hero() {
  return (
    <div className="w-full py-12 lg:py-12">
      <div className="container mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div>
              <Badge variant="outline">Secure your property rights</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-6xl max-w-lg tracking-tighter font-bold text-primary leading-tight">
                Secure Your Digital Property Rights in India.
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-md mx-auto md:mx-0">
                JaaGa provides expert insights and comprehensive services for
                property audits, legal verification, and digital ownership.
                Navigate the complexities of Indian real estate with confidence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-4" variant="outline" asChild>
                <Link
                  href="https://www.jaaga.ai/telangana"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Property Audit Report <FileCheck className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" className="gap-4" asChild>
                <Link href="/blogs">
                  Read Insights <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dxsj2kcwu/image/upload/v1757412661/realtor-making-deal-with-customer-office_1_1_f3wp59.jpg"
                alt="Property document"
                fill
                className="object-cover"
                data-ai-hint="document analysis"
              />
            </div>
            <div className="relative row-span-2 rounded-md overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dxsj2kcwu/image/upload/v1757412451/amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers_1_mj05sc.jpg"
                alt="Modern architecture"
                fill
                className="object-cover"
                data-ai-hint="modern architecture"
              />
            </div>
            <div className="relative aspect-square rounded-md overflow-hidden">
              <Image
                src="https://res.cloudinary.com/dxsj2kcwu/image/upload/v1757412732/closeup-shot-businessman-signing-some-official-papers_1_ngomux.jpg"
                alt="Digital land survey"
                fill
                className="object-cover"
                data-ai-hint="signing papers"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const posts = getPosts();
  const featuredPosts = [...posts].sort((a, b) => b.id - a.id).slice(0, 3);

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "question": "What are property documents?",
        "answer": "Property documents are official records that prove ownership, land details, boundaries, and transaction history of a property."
      },
      {
        "question": "Which documents are required to verify property ownership?",
        "answer": "Key documents include the Sale Deed, Encumbrance Certificate (EC), Khata or Patta, and relevant land records depending on the state."
      },
      {
        "question": "What is an Encumbrance Certificate (EC)?",
        "answer": "An Encumbrance Certificate shows all registered transactions related to a property and helps verify whether it has any legal or financial liabilities."
      },
      {
        "question": "What is a Sale Deed?",
        "answer": "A Sale Deed is a legally registered document that confirms the transfer of property ownership from seller to buyer."
      },
      {
        "question": "What is Khata or Patta?",
        "answer": "Khata and Patta are property records maintained by local authorities that contain ownership and property tax details."
      },
      {
        "question": "What are Adangal, ROR, and 1B documents?",
        "answer": "These are government land records that show ownership, survey numbers, land extent, land type, and usage, mainly for agricultural land."
      },
      {
        "question": "What is an FMB Sketch?",
        "answer": "An FMB Sketch is a government land map showing exact property boundaries and measurements based on survey records."
      },
      {
        "question": "What is Bhu-Aadhaar (ULPIN)?",
        "answer": "Bhu-Aadhaar or ULPIN is a unique digital identification number assigned to each land parcel, linking land records digitally."
      },
      {
        "question": "Are online property documents legally valid?",
        "answer": "Online documents are valid for verification purposes, but certified copies are recommended for legal or official use."
      },
      {
        "question": "Why is property document verification important?",
        "answer": "Verification helps prevent fraud, ownership disputes, encroachments, and legal issues during property transactions."
      }
    ]
  };

  const faqsLeft = homeFaqSchema.mainEntity.slice(0, 5);
  const faqsRight = homeFaqSchema.mainEntity.slice(5);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": homeFaqSchema.mainEntity.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        }) }}
      />
      
      <section className="bg-background">
        <Hero />
      </section>

      <section id="categories" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Areas of Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From initial checks to final documentation, we cover every aspect
              of property management in the digital age.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const externalLinks: Record<string, string> = {
                "property-audit": "https://www.jaaga.ai/states",
                "property-documents": "https://www.jaaga.ai/states",
                "legal-verification":
                  "https://www.jaaga.ai/services/property-services/title-verification-report",
                "loan-services": "https://www.jaaga.ai/loan-lap",
                "land-survey": "https://www.jaaga.ai/digital-land-survey",
                "electricity-bill-updates":
                  "https://www.jaaga.ai/services/property-services/electricity-name-change",
                "property-tax": "https://www.jaaga.ai/states",
                "mortgage-report-cersai":
                  "https://www.jaaga.ai/services/property-services/mortgage-report",
                "mutation-creation":
                  "https://www.jaaga.ai/services/property-services/mutation-creation",
              };

              const isExternalLink = Object.keys(externalLinks).includes(
                category.slug,
              );
              const href = isExternalLink
                ? externalLinks[category.slug]
                : `/category/${category.slug}`;

              return (
                <Link
                  key={category.slug}
                  href={href}
                  className="group"
                  target={isExternalLink ? "_blank" : undefined}
                  rel={isExternalLink ? "noopener noreferrer" : undefined}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary">
                    <CardHeader className="flex-row items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-md">
                        <CategoryIcon
                          categorySlug={category.slug}
                          className="w-6 h-6"
                        />
                      </div>
                      <CardTitle className="font-headline text-xl">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="featured-posts" className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center md:text-left md:flex justify-between items-center mb-12">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Featured Insights
              </h2>
              <p className="text-lg text-muted-foreground">
                Stay updated with the latest trends and advice from our experts.
              </p>
            </div>
            <Button
              asChild
              variant="link"
              className="text-primary mt-4 md:mt-0"
            >
              <Link href="/blogs">
                View All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post as Post} />
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="bg-background">
        <FAQSection 
          title="Frequently Asked Questions"
          subtitle="Property & Document Help"
          description="Everything you need to know about property documents, verification, and digital ownership in India."
          faqsLeft={faqsLeft}
          faqsRight={faqsRight}
        />
      </section>

      <section id="cta" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Ready to Secure Your Property?
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Don't leave your property to chance. Our digital solutions provide
              the clarity and security you need.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-bold bg-background text-primary hover:bg-background/90"
            >
              <Link
                href="https://www.jaaga.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Our Website
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
