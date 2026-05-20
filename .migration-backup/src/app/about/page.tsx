import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <p className="font-semibold text-primary">Our Mission</p>
            <h1 className="font-headline mt-2 text-4xl font-bold tracking-tighter md:text-5xl">
              Building Trust in Indian Real Estate
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Jaaga.ai was founded to bring transparency, security, and simplicity to the Indian
              property market. We leverage technology to empower owners and buyers with the data and
              services they need to make confident decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-xl shadow-lg md:h-96">
            <Image
              src="https://picsum.photos/800/600"
              alt="Our team at a planning session"
              fill
              className="object-cover"
              data-ai-hint="team meeting"
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold">From Complex to Clear</h2>
            <p className="text-muted-foreground">
              The Indian real estate landscape is notoriously complex. Opaque processes, fragmented
              records, and a lack of standardized verification have long been challenges for
              investors and homeowners. We saw an opportunity to change this.
            </p>
            <p className="text-muted-foreground">
              By combining legal expertise with cutting-edge digital tools, we offer a suite of
              services—from meticulous property audits to precise digital land surveys—designed to
              cut through the complexity. Our goal is to provide a single, reliable platform for
              all your property verification and management needs.
            </p>
            <Button asChild size="lg">
              <Link href="/contact-us">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
