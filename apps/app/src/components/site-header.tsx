'use client';

import { usePathname } from 'next/navigation';

import { Button } from '@zx/ui/components/button';
import { Separator } from '@zx/ui/components/separator';
import { SidebarTrigger } from '@zx/ui/components/sidebar';
import { ThemeSelector } from '@zx/ui/components/theme-selector';
import { ThemeToggle } from '@zx/ui/components/theme-toggle';

import { LocaleToggle } from './locale-toggle';

export function SiteHeader() {
  const pathname = usePathname();
  const path = pathname.split('/').filter((path) => path)[0];
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium capitalize">{path}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
          <ThemeSelector />
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
