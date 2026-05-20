import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import {cn} from '@/lib/utils';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({items, className}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm text-muted-foreground', className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <Link
              href={item.href}
              className={
                index === items.length - 1
                  ? 'font-medium text-foreground'
                  : 'hover:text-primary'
              }
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && <ChevronRight className="h-4 w-4" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
