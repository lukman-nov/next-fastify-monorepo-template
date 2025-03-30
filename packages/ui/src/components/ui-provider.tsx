'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { Toaster } from '@zx/ui/components/sonner';
import { TooltipProvider } from '@zx/ui/components/tooltip';

import { ActiveThemeProvider } from './active-theme';

interface ComponentsProviderProps {
  activeThemeValue?: string;
}

export function ComponentsProvider({
  activeThemeValue,
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & ComponentsProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <TooltipProvider>
          {children}
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              closeButton: true,
              style: {
                fontWeight: 'lighter',
              },
              classNames: {
                toast: 'text-[15px] pr-16',
                closeButton: 'bg-white',
                error: 'bg-red-50 text-red-700 border border-red-400',
                warning: 'bg-orange-50 text-orange-700 border border-orange-400',
                success: 'bg-indigo-500 text-white border border-indigo-800',
                info: 'bg-blue-50 text-blue-700 border border-blue-400',
              },
            }}
          />
        </TooltipProvider>
      </ActiveThemeProvider>
    </NextThemesProvider>
  );
}
