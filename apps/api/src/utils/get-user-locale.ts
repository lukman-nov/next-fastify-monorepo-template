import type { FastifyRequest } from 'fastify';
import * as acceptLanguageParser from 'accept-language-parser';

import type { Locales } from '@pos/i18n';
import { defaultLocale, locales } from '@pos/i18n';

export async function getUserLocale({ fastifyRequest }: { fastifyRequest: FastifyRequest }): Promise<Locales> {
  let userLocaleHeader: Locales = defaultLocale;

  userLocaleHeader = (fastifyRequest.headers['accept-language'] as Locales) ?? defaultLocale;
  const parsedLocales = acceptLanguageParser.parse(userLocaleHeader);

  const matchedLocale: Locales =
    parsedLocales.map((lang) => lang.code).find((code): code is Locales => locales.includes(code as Locales)) ??
    userLocaleHeader;

  return matchedLocale as Locales;
}
