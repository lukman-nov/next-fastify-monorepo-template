import type { Messages } from 'use-intl';
import { deepmerge } from 'deepmerge-ts';

import type { Locales, Namespaces } from './types.ts';

interface GetAppMessages {
  ns: Namespaces;
  locale: Locales;
}

export async function getAppMessages({ ns, locale }: GetAppMessages): Promise<Messages> {
  const messages = (await import(`../locales/${ns}/${locale}.json`, { assert: { type: 'json' } })).default;
  const globalsMessages = (await import(`../locales/globals/${locale}.json`, { assert: { type: 'json' } })).default;

  return deepmerge(messages, globalsMessages) as Messages;
}
