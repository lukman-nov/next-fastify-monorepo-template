'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@zx/ui/components/button';
import { cn } from '@zx/ui/lib/utils';

const Items = [
  {
    title: 'Profile',
    href: '/settings',
  },
  {
    title: 'Account',
    href: '/settings/account',
  },
];

export default function SidebarSettings({ className, ...props }: React.ComponentProps<'nav'>) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex space-x-2 lg:flex-col lg:space-y-1 lg:space-x-0', className)} {...props}>
      {Items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'underline-offset-4 hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
