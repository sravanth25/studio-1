
'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Logo} from './logo';
import React, {useState} from 'react';
import {categories} from '@/lib/data';

const servicesLinks = [
    { href: "https://www.jaaga.ai/properties/my-properties", name: "My Locker"},
    { href: "https://www.jaaga.ai/states", name: "Property Documents"},
    { href: "https://www.jaaga.ai/services", name: "Property Services"},
]

export function Footer() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetACall = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber) {
      const message = `Hi, I would like to get a call. My number is ${phoneNumber}.`;
      const whatsappUrl = `https://wa.me/918885133990?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Your trusted partner in navigating India's property landscape with clarity and
              confidence.
            </p>
            <div className="pt-4">
              <h4 className="font-headline font-semibold text-sm mb-3">Browse by Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map(cat => (
                  <Link 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`}
                    className="text-xs px-2 py-1 bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-primary">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
               <li>
                <Link href="https://www.jaaga.ai/" target='_blank' className="text-muted-foreground hover:text-primary">
                  Website
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {servicesLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target='_blank'
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-headline font-semibold mb-4">Contact Us</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Enter your phone number to get a call from us.
            </p>
            <form onSubmit={handleGetACall} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="flex-1"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(value);
                }}
              />
              <Button type="submit" variant="default" className="w-full sm:w-auto">
                Get a Call
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jaaga.ai. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
