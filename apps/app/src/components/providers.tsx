'use client';

import type { AbstractIntlMessages } from 'next-intl';
import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';

import type { Locales } from '@zx/i18n';
import { timeZone } from '@zx/i18n';
import { ComponentsProvider } from '@zx/ui/components/ui-provider';

interface ProvidersProp {
  locale: Locales;
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  activeThemeValue?: string;
}

export function Providers({ children, locale, messages, activeThemeValue }: ProvidersProp) {
  return (
    <ComponentsProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      activeThemeValue={activeThemeValue}
    >
      <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
        {children}
      </NextIntlClientProvider>
    </ComponentsProvider>
  );
}
