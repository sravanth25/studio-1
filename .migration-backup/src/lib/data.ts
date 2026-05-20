
import type { Category, Service } from "./types";

export const categories: Category[] = [
  {
    slug: "property-audit",
    name: "Property Audit",
    description:
      "In-depth analysis and reporting on property titles and documentation.",
  },
  {
    slug: "property-documents",
    name: "Property Documents",
    description:
      "Modern solutions for managing and securing your property documents digitally.",
  },
  {
    slug: "legal-verification",
    name: "Legal Verification",
    description:
      "Comprehensive legal checks to ensure your property is free from any disputes.",
  },
  {
    slug: "loan-services",
    name: "Loan Services",
    description:
      "Guidance and support for securing loans against your property.",
  },
  {
    slug: "land-survey",
    name: "Land Survey",
    description:
      "Accurate digital land surveying to define and protect your boundaries.",
  },
  {
    slug: "electricity-bill-updates",
    name: "Electricity Bill Updates",
    description:
      "Assistance with name changes and updates on utility documents.",
  },
  {
    slug: "property-tax",
    name: "Property Tax",
    description: "Guidance and support for property tax payments and receipts.",
  },
  {
    slug: "mortgage-report-cersai",
    name: "Mortgage Report (CERSAI)",
    description:
      "Check for any existing loans or mortgages on a property through a CERSAI report.",
  },
  {
    slug: "mutation-creation",
    name: "Mutation Creation",
    description:
      "Official process to update land revenue records with the new owner's name after a property transfer.",
  },
];

export const services: Service[] = [
  {
    categorySlug: "property-tax",
    title: "Get Your Property Tax Receipt",
    description:
      "Official Telangana document verifying property tax payment history.",
    image:
      "https://res.cloudinary.com/dnuayl071/image/upload/v1757505811/M00f8cba13c64a55f2bd628a404dfa0851744179908183_ts5xyb.webp",
    link: "https://www.jaaga.ai/documents",
  },
  {
    categorySlug: "property-audit",
    title: "Property Audit Report",
    description:
      "A comprehensive report to verify property titles and check for legal issues.",
    image:
      "https://res.cloudinary.com/dnuayl071/image/upload/v1758023191/Sample_Audit_Report_5.pdf_2_kze5k9.png",
    link: "https://www.jaaga.ai/documents",
  },
  {
    categorySlug: "legal-verification",
    title: "Legal Verification Service",
    description:
      "Ensure your property is legally sound with our expert verification.",
    image: "https://picsum.photos/seed/service2/400/300",
    link: "https://www.jaaga.ai/documents",
  },
  {
    categorySlug: "land-survey",
    title: "Digital Land Survey",
    description: "Accurate and efficient land surveys using modern technology.",
    image: "https://picsum.photos/seed/service3/400/300",
    link: "https://www.jaaga.ai/documents",
    // link : "https://www.jaaga.ai/loan-lap"
  },
  {
    categorySlug: "electricity-bill-updates",
    title: "Electricity Bill Name Update",
    description:
      "Get assistance with changing names or details on your electricity bills.",
    image:
      "https://res.cloudinary.com/dnuayl071/image/upload/v1758021842/electricity_bill_x5zrtl.png",
    link: "https://www.jaaga.ai/services/property-services/electricity-name-change",
  },
  {
    categorySlug: "loan-services",
    title: "Home Loan Assistance",
    description:
      "Navigate the home loan application process with our expert guidance.",
    image: "https://picsum.photos/seed/service5/400/300",
    link: "https://www.jaaga.ai/documents",
  },
  {
    categorySlug: "property-documents",
    title: "FMB Sketch",
    description: "Get your FMB Sketch Instantly",
    image:
      "https://ik.imagekit.io/jaaga/ap_fmb%20(1).png?updatedAt=1762507684715",
    link: "https://www.jaaga.ai/documents",
  },
];
