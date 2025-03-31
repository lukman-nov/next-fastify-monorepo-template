import * as acceptLanguageParser from 'accept-language-parser';
import { createTranslator } from 'use-intl';

import type { Locales } from '../../types';
import { defaultLocale, locales } from '../config';
import { getAppMessages } from '../get-messages';

export function resolveLocale({ headers }: { headers?: Headers }): Locales {
  let userLocaleHeader = defaultLocale;

  userLocaleHeader = headers?.get('accept-language') ?? defaultLocale;
  const parsedLocales = acceptLanguageParser.parse(userLocaleHeader);

  const matchedLocale =
    parsedLocales.map((lang) => lang.code).find((code): code is Locales => locales.includes(code as Locales)) ??
    userLocaleHeader;

  return matchedLocale as Locales;
}

export const nodeTranslations = async (locale: Locales) => {
  const messages = await getAppMessages({ ns: 'api', locale });
  return createTranslator({
    locale,
    messages,
  });
};
