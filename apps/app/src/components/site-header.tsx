import { Button } from '@pos/ui/components/button';
import { Separator } from '@pos/ui/components/separator';
import { SidebarTrigger } from '@pos/ui/components/sidebar';
import { ThemeSelector } from '@pos/ui/components/theme-selector';
import { ThemeToggle } from '@pos/ui/components/theme-toggle';

import { LocaleToggle } from './locale-toggle';

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">Documents</h1>
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
