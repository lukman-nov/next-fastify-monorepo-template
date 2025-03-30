import '@zx/ui/globals.css';

import type { Viewport } from 'next';
import { cookies } from 'next/headers';
import { getLocale, getMessages } from 'next-intl/server';

import { cn } from '@zx/ui/lib/utils';
import { Providers } from '@/components/providers';
import { fontVariables } from '@/lib/fonts';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();
  const locale = await getLocale();

  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('@zx.active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            try {
              if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
              }
            } catch (_) {}
          `,
          }}
        />
      </head>

      <body
        className={cn(
          'bg-background overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <Providers messages={messages} locale={locale} activeThemeValue={activeThemeValue}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
