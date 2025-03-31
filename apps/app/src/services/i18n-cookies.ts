'use server';

import { cookies } from 'next/headers';

import type { Locales } from '@zx/i18n/types';
import { defaultLocale, i18nCookieName } from '@zx/i18n';

export async function getUserLocale(): Promise<Locales> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(i18nCookieName)?.value ?? defaultLocale;
  return locale as Locales;
}

export async function setUserLocale(locale: Locales) {
  const cookieStore = await cookies();
  cookieStore.set(i18nCookieName, locale, {
    maxAge: 30 * 24 * 60 * 60, // 1 month
  });
}
