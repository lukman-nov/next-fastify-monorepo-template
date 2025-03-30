'use client';

import type { Locale } from 'next-intl';
import * as React from 'react';
import { LanguagesIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { setUserLocale } from '@/services/i18n-cookies';
import { locales } from '@zx/i18n';
import { buttonVariants } from '@zx/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@zx/ui/components/dropdown-menu';
import { cn } from '@zx/ui/lib/utils';

interface MenuTriggerProps {
  menuTriggerClassName?: string;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function LocaleToggle({
  menuTriggerClassName,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & MenuTriggerProps) {
  const t = useTranslations('ui.locale-switcher');
  const locale = useLocale();
  const [isPending, startTransition] = React.useTransition();

  const onSelectChange = async (value: string) => {
    const locale = value as Locale;
    startTransition(async () => {
      await setUserLocale(locale);
    });
  };

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        className={cn(menuTriggerClassName, buttonVariants({ variant: variant || 'ghost', size: size || 'sm' }))}
      >
        <LanguagesIcon className="h-4 w-4 scale-100 rotate-0 transition-all" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {locales.map((cur) => (
          <DropdownMenuCheckboxItem
            key={cur}
            checked={locale === cur}
            onCheckedChange={() => onSelectChange(cur)}
            disabled={isPending}
          >
            {t('locale', { locale: cur })}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
