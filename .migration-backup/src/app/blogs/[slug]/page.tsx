
import React from 'react';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import type {Metadata} from 'next';
import {categories, services} from '@/lib/data';
import {getPosts} from '@/lib/server/data';
import {Badge} from '@/components/ui/badge';
import Link from 'next/link';
import {PostSidebar} from '@/components/blog/post-sidebar';
import {Breadcrumb} from '@/components/common/breadcrumb';
import {Separator} from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/blog/blog-post-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Script from 'next/script';

export const dynamic = 'force-dynamic';

type Props = {
  params: {slug: string};
};

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const posts = getPosts();
  const awaitedParams = await params;
  const post = posts.find(p => p.slug === awaitedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const images = post.featuredImage
    ? [
        {
          url: post.featuredImage,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ]
    : [];

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url: `https://blog.jaaga.ai/blogs/${post.slug}`,
      images: images,
    },
  };
}

export default async function BlogPostPage({params}: Props) {
  const posts = getPosts();
  const awaitedParams = await params;
  const post = posts.find(p => p.slug === awaitedParams.slug);

  if (!post) {
    notFound();
  }

  const category = categories.find(c => c.slug === post.category);
  const breadcrumbItems = [
    {label: 'Home', href: '/'},
    {label: 'Blogs', href: '/blogs'},
    {label: post.title, href: `/blogs/${post.slug}`},
  ];

  const relatedPosts = posts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.featuredImage,
    "author": {
      "@type": "Organization",
      "name": "JaaGa Team",
      "url": "https://www.jaaga.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "JaaGa",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ik.imagekit.io/jaaga/Untitled%20design%20(2).jpg"
      }
    },
    "datePublished": new Date(post.id).toISOString(),
    "url": `https://blog.jaaga.ai/blogs/${post.slug}`
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://blog.jaaga.ai${item.href}`
    }))
  };

  // FAQ Schema Logic
  let faqSchema: any = null;
  let extraSchemas: any[] = [];

  if (post.slug === 'rera-has-become-a-shield-for-defaulting-builders-not-homebuyers-supreme-court-flags-institutional-failure') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the primary concern raised by the Supreme Court regarding RERA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Supreme Court has expressed concern that the Real Estate (Regulation and Development) Act, 2016 (RERA), instead of protecting homebuyers, is inadvertently providing a shield for defaulting builders. This suggests that builders are finding ways to use the RERA framework and associated legal processes to delay accountability and avoid fulfilling their obligations to buyers."
          }
        },
        {
          "@type": "Question",
          "name": "Why was RERA introduced in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RERA was introduced to regulate the real estate sector, which was largely unregulated and prone to malpractices like project delays, diversion of funds, and lack of transparency. Its main objectives were to enhance transparency, protect the interests of homebuyers, ensure timely delivery of projects, and establish a speedy dispute resolution mechanism."
          }
        },
        {
          "@type": "Question",
          "name": "What are some ways builders might be exploiting RERA, according to the Supreme Court's observation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Builders might be exploiting RERA by engaging in prolonged litigation, filing multiple appeals, seeking unnecessary adjournments, and using legal technicalities to stall proceedings. This delays justice for homebuyers and allows builders more time to manage their financial situation, potentially at the buyers' expense."
          }
        },
        {
          "@type": "Question",
          "name": "What is the significance of the \"70% rule\" under RERA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The \"70% rule\" mandates that developers must deposit at least 70% of the amounts collected from homebuyers into a separate bank account. This money can only be withdrawn for the purpose of construction and land acquisition for that specific project. This rule was implemented to prevent the diversion of funds to other projects or purposes, ensuring that buyer's money is used for its intended purpose."
          }
        },
        {
          "@type": "Question",
          "name": "What steps can homebuyers take if their builder defaults despite RERA being in place?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Homebuyers can file a complaint with their respective state's RERA authority. If they are not satisfied with the authority's decision, they can appeal to the Real Estate Appellate Tribunal. Seeking legal advice from a real estate lawyer is also highly recommended to navigate the complex legal processes."
          }
        },
        {
          "@type": "Question",
          "name": "How can the implementation of RERA be improved to better protect homebuyers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Improvements could include strengthening the enforcement powers and capacity of RERA authorities, ensuring faster adjudication of cases, implementing stricter financial oversight of builders, reducing procedural delays in legal processes, and enhancing transparency regarding project status and fund utilization. Continuous judicial review and intervention, as demonstrated by the Supreme Court, are also crucial."
          }
        }
      ]
    };
    extraSchemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "Urgent: RERA's Double-Edged Sword - 3 SC Flags Builder Failure",
      "description": "RERA's double-edged sword: The Supreme Court flags 3 critical institutional failures, empowering defaulting builders over homebuyers. Learn how RERA fails!",
      "step": []
    });
  } else if (post.slug === 'what-is-sale-deed-and-what-is-sale-agreement') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Sale Deed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Sale Deed is a legally binding document that confirms the transfer of property ownership from the seller to the buyer. It serves as proof of sale and ownership."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Sale Deed legally valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Sale Deed displayed here is for informational purposes only. For legal or official use, a registered and certified Sale Deed must be obtained from the Sub-Registrar Office."
          }
        },
        {
          "@type": "Question",
          "name": "How is this Sale Deed generated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Sale Deed information is retrieved from official government registration records based on the property details provided."
          }
        },
        {
          "@type": "Question",
          "name": "What details are included in a Sale Deed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Sale Deed includes buyer and seller names, property description, sale value, registration number, date of registration, and Sub-Registrar Office details."
          }
        },
        {
          "@type": "Question",
          "name": "How can I get a certified copy of a Sale Deed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After viewing the Sale Deed details online, you can apply for a certified copy through authorized services, which handle documentation and delivery."
          }
        },
        {
          "@type": "Question",
          "name": "Is a Sale Deed mandatory for property ownership?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, a registered Sale Deed is mandatory to legally establish property ownership. Ownership transfer is not legally complete without registration."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a Sale Agreement and a Sale Deed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Sale Agreement outlines the intention to sell a property, while a Sale Deed confirms the actual transfer of ownership after registration."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Sale Deed reliable for older property records?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For older property records, it is recommended to obtain a certified Sale Deed, as earlier registrations may not be fully digitized."
          }
        }
      ]
    };
  } else if (post.slug === 'adangal-ror-1b-land-records-guide') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Adangal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Adangal is a village-level land record that contains details about land usage, crop information, land classification, and the name of the landholder, primarily for agricultural land."
          }
        },
        {
          "@type": "Question",
          "name": "What is ROR (Record of Rights)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Record of Rights (ROR) is an official document that records land ownership details such as owner name, survey number, land type, and extent of land."
          }
        },
        {
          "@type": "Question",
          "name": "What is 1B land record?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 1B land record is a computerized ownership document that provides updated information about landowners, survey numbers, land extent, and ownership status."
          }
        },
        {
          "@type": "Question",
          "name": "Are Adangal, ROR, and 1B legally valid documents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These are official government land records and are valid for reference and verification. For legal transactions, certified copies issued by the revenue department are recommended."
          }
        },
        {
          "@type": "Question",
          "name": "How are Adangal, ROR, and 1B records generated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These records are generated and maintained by government revenue departments based on land surveys, registrations, and periodic updates."
          }
        },
        {
          "@type": "Question",
          "name": "What details are included in Adangal, ROR, and 1B?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "These records include landowner name, survey numbers, land extent, land classification, type of land, and crop details in the case of Adangal."
          }
        },
        {
          "@type": "Question",
          "name": "Why are Adangal, ROR, and 1B important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "They are essential for establishing land ownership, applying for loans, resolving disputes, land conversion, and property registration."
          }
        },
        {
          "@type": "Question",
          "name": "Can these records be used for older land ownership verification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, these records help verify historical ownership. For very old records, certified copies are recommended as some data may not be fully digitized."
          }
        }
      ]
    };
  } else if (post.slug === 'fmb-sketch-in-tamil-nadu-how-to-view-download-check-fmb-map-online-complete-guide-2026') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an FMB Sketch in Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An FMB (Field Measurement Book) Sketch is an official land record map in Tamil Nadu that shows the exact boundaries, measurements, and subdivisions of a land parcel based on government survey records."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the FMB Sketch important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The FMB Sketch is important for verifying land boundaries, preventing encroachments, resolving land disputes, and during property registration or legal verification."
          }
        },
        {
          "@type": "Question",
          "name": "Is the FMB Sketch legally valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the FMB Sketch is an official government land record. For legal or court-related use, obtaining a certified copy from the revenue department is recommended."
          }
        },
        {
          "@type": "Question",
          "name": "How can I view or download an FMB Sketch online in Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can view and download the FMB Sketch online by selecting the district, taluk, village, survey number, and subdivision number on the Tamil Nadu land records portal."
          }
        },
        {
          "@type": "Question",
          "name": "What details are included in an FMB Sketch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An FMB Sketch includes survey and subdivision numbers, land boundaries, measurements, neighboring land details, and the field layout."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get FMB Sketches for older land records?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, FMB Sketches are available for older land records. If they are not fully digitized, applying for a certified copy is recommended."
          }
        },
        {
          "@type": "Question",
          "name": "Is the online FMB Sketch sufficient for property purchase?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Online FMB Sketches are suitable for verification purposes. For property purchase or registration, a certified FMB Sketch is advisable."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between FMB Sketch and Patta?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Patta shows land ownership details, while the FMB Sketch shows land measurements and boundaries. Both documents are used together for land verification."
          }
        }
      ]
    };
  } else if (post.slug === 'bhu-aadhaar-ulpin-guide') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Bhu-Aadhaar (ULPIN)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bhu-Aadhaar, also known as ULPIN (Unique Land Parcel Identification Number), is a 14-digit unique identification number assigned to each land parcel in India, functioning as a digital Aadhaar for land."
          }
        },
        {
          "@type": "Question",
          "name": "Why was Bhu-Aadhaar (ULPIN) introduced?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ULPIN was introduced to standardize land records, reduce disputes, prevent fraud, and enable digital property transactions across India."
          }
        },
        {
          "@type": "Question",
          "name": "How does Bhu-Aadhaar (ULPIN) work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ULPIN is generated using geo-referenced land survey data and satellite mapping, linking each land parcel to a unique digital ID."
          }
        },
        {
          "@type": "Question",
          "name": "Is Bhu-Aadhaar mandatory in 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bhu-Aadhaar is being implemented in phases across states. While not mandatory everywhere yet, it is increasingly required for land registration and government services."
          }
        },
        {
          "@type": "Question",
          "name": "What details are linked to a ULPIN?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ULPIN links owner details, survey numbers, land boundaries, geo-coordinates, land area, classification, and registration records."
          }
        },
        {
          "@type": "Question",
          "name": "How is Bhu-Aadhaar different from Patta or EC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Patta and EC are document-based records, whereas Bhu-Aadhaar is a unique digital identifier that connects all land records to a single land parcel."
          }
        },
        {
          "@type": "Question",
          "name": "Can ULPIN reduce Land disputes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, ULPIN helps reduce land disputes by clearly defining land boundaries using geo-mapped data and improving record transparency."
          }
        },
        {
          "@type": "Question",
          "name": "Is Bhu-Aadhaar legally valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bhu-Aadhaar is an officially recognized land identification system. For legal use, certified land records linked to ULPIN are recommended."
          }
        }
      ]
    };
  } else if (post.slug === 'how-to-download-encumbrance-certificate-ec-in-telangana') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an Encumbrance Certificate (EC)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An Encumbrance Certificate (EC) is an official document that lists all registered transactions related to a property, including sales, mortgages, and gifts. It helps verify whether a property has a clear title or any legal or financial encumbrances."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Encumbrance Certificate legally valid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The EC shown here is for informational purposes only. For legal or official use, you should obtain a certified Encumbrance Certificate through Landeed."
          }
        },
        {
          "@type": "Question",
          "name": "How is this EC generated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This EC is generated by retrieving information from official government sources based on the property details entered by the user."
          }
        },
        {
          "@type": "Question",
          "name": "What details are included in the Encumbrance Certificate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The EC includes owner name(s), sale or mortgage transaction details, registration numbers, property description, and Sub-Registrar Office (SRO) information."
          }
        },
        {
          "@type": "Question",
          "name": "How can I get a certified Encumbrance Certificate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After viewing your EC online, you can order a certified copy through Landeed. The documentation process and delivery are handled end-to-end."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between this EC and Dharani EC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dharani EC mainly applies to agricultural land records from 2018 onwards. Prior to 2018, this traditional EC was used for both agricultural and non-agricultural properties."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between this EC and Bhu Bharati EC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bhu Bharati EC, introduced in 2025, focuses on agricultural land records. This EC generally applies to non-agricultural properties, especially in urban areas, while older records may still include agricultural transactions."
          }
        },
        {
          "@type": "Question",
          "name": "Is this EC reliable for older property records?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For properties with records dating before 1980, it is recommended to apply for a certified EC, as older entries may not be fully digitized."
          }
        }
      ]
    };
  } else if (post.slug === 'telangana-government-core-urban-act-cure-ghmc-replacement') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Core Urban Act (CURE)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Core Urban Act (CURE) is a proposed new law being drafted by the Telangana government to replace the existing Greater Hyderabad Municipal Corporation (GHMC) Act. This broader legislation will govern the three municipal corporations within the Core Urban Region Economy — GHMC, Cyberabad Municipal Corporation, and Malkajgiri Municipal Corporation."
          }
        },
        {
          "@type": "Question",
          "name": "Why is the GHMC Act being replaced?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The GHMC Act currently applies only to the Greater Hyderabad Municipal Corporation. After GHMC’s recent reorganisation and the creation of two additional corporations, the state wants a unified legal framework that covers all municipal functions and development activities within the core urban area."
          }
        },
        {
          "@type": "Question",
          "name": "Which areas will the Core Urban Act apply to?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Core Urban Act will apply to the Core Urban Region inside Hyderabad’s Outer Ring Road (ORR) — including the jurisdictions of GHMC, Cyberabad Municipal Corporation, and Malkajgiri Municipal Corporation."
          }
        },
        {
          "@type": "Question",
          "name": "What changes can residents expect under the Core Urban Act?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The new Act is expected to standardise development permissions, fee structures, civic services, sanitation rules, and infrastructure maintenance across the entire core urban region rather than managing them differently under separate laws."
          }
        },
        {
          "@type": "Question",
          "name": "Will the Core Urban Act affect sanitation and waste management?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — one of the key priorities highlighted by the Chief Minister includes defining sanitation guidelines, identifying designated waste disposal sites, and taking action against indiscriminate dumping."
          }
        },
        {
          "@type": "Question",
          "name": "How will the new law impact infrastructure projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under the Core Urban Act, approvals for infrastructure and development works will follow a unified legal framework. This aims to improve decision-making, maintenance accountability for roads, traffic systems, and public projects under the government’s 99-day development programme."
          }
        },
        {
          "@type": "Question",
          "name": "Will the Act change how municipal corporations collect fees or issue permissions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The Chief Minister has directed that all government permissions, fee structures, and development work should align with the new Core Urban Act once it is implemented."
          }
        },
        {
          "@type": "Question",
          "name": "Does the Core Urban Act include food safety and public health measures?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Part of the civic priorities under the proposed law includes strengthening food safety inspections, installing CCTV cameras in hotel kitchens connected to command centres, and rating food safety compliance as part of public health initiatives."
          }
        },
        {
          "@type": "Question",
          "name": "How does this affect road management and infrastructure agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The CM has directed that all roads under various departments within the core urban area be brought under a single jurisdiction — the Municipal Administration and Urban Development department — to eliminate overlap and speed up maintenance work."
          }
        },
        {
          "@type": "Question",
          "name": "When will the Core Urban Act come into effect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Act is currently being drafted at the direction of the Chief Minister and will take effect once it is finalised and passed by the state government. An official timeline has not yet been publicly released."
          }
        }
      ]
    };
  } else if (post.slug === 'download-telangana-ec-ror-pahani-jaaga-app') {
    faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is EC in Telangana land records?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EC stands for Encumbrance Certificate, which shows whether a property has any legal or financial liabilities."
          }
        },
        {
          "@type": "Question",
          "name": "Is EC mandatory for property registration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. EC is required to verify that the property has no legal disputes or loans before registration."
          }
        },
        {
          "@type": "Question",
          "name": "What is ROR 1B in Telangana?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ROR 1B is the Record of Rights document that contains ownership details of land in Telangana."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between RoR and Pahani?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RoR shows ownership details, while Pahani shows agricultural land usage and crop details."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download Telangana land records online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Telangana land records such as EC, RoR, and Pahani can be downloaded online through official portals or apps like Jaaga."
          }
        },
        {
          "@type": "Question",
          "name": "Is Pahani required for agricultural loans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Banks often require Pahani to verify land ownership and cultivation details when providing agricultural loans."
          }
        }
      ]
    };
  }

  const faqEntities = faqSchema?.mainEntity || [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {extraSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <article className="lg:col-span-2 bg-background p-4 sm:p-8 rounded-xl shadow-md">
          <header className="space-y-4 mb-8">
            <Breadcrumb items={breadcrumbItems} />
            <div className="flex justify-between items-center">
              <div>
                {category && (
                  <Link href={`/category/${category.slug}`}>
                    <Badge variant="default">{category.name}</Badge>
                  </Link>
                )}
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                  {post.title}
                </h1>
              </div>
            </div>
          </header>

          <div
              className="prose prose-lg max-w-none text-foreground prose-h2:font-headline prose-h2:font-bold prose-h3:font-headline prose-h3:font-bold prose-a:text-primary hover:prose-a:underline prose-headings:font-headline prose-headings:font-bold prose-p:text-foreground prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          
          {faqEntities.length > 0 && (
            <section className="mt-12 space-y-6">
              <h2 className="font-headline text-2xl font-bold">FAQs</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqEntities.map((faq: any, index: number) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-4 bg-card shadow-sm border-b-0 transition-all hover:border-primary/20"
                  >
                    <AccordionTrigger className="hover:no-underline text-left font-semibold py-4">
                      {faq.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                      {faq.acceptedAnswer.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          <div className="mt-8">
             <Button asChild>
                <Link href="https://www.jaaga.ai/" target="_blank" rel="noopener noreferrer">
                  Visit Our Website
                </Link>
              </Button>
          </div>

          {/* Adstera Ad Section */}
          <div className="my-8 flex justify-center w-full">
            <div id="container-9ad02d1769b89f0b2108560d87d5e33f"></div>
            <Script 
              src="https://pl28784533.effectivegatecpm.com/9ad02d1769b89f0b2108560d87d5e33f/invoke.js"
              strategy="afterInteractive"
              data-cfasync="false"
            />
          </div>

          <Separator className="my-12" />

          {relatedPosts.length > 0 && (
            <section className="space-y-8">
              <h2 className="font-headline text-2xl font-bold">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(rp => (
                  <BlogPostCard key={rp.id} post={rp} />
                ))}
              </div>
            </section>
          )}

          <Separator className="my-8" />

          <div className="space-y-2">
            <h3 className="font-headline font-bold text-lg">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <PostSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
