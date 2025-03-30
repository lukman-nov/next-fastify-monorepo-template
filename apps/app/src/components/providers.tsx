'use client';

import type { AbstractIntlMessages } from 'next-intl';
import * as React from 'react';
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export function Providers({ children, locale, messages, activeThemeValue }: ProvidersProp) {
  const dehydratedState = dehydrate(queryClient);
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      <ComponentsProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        activeThemeValue={activeThemeValue}
      >
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <ReactQueryDevtools position="left" initialIsOpen={false} />
            {children}
          </HydrationBoundary>
        </QueryClientProvider>
      </ComponentsProvider>
    </NextIntlClientProvider>
  );
}
