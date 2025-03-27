import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Messages } from 'use-intl';
import { deepmerge } from 'deepmerge-ts';

import type { Locales, Namespaces } from './types';

interface GetAppMessages {
  ns: Namespaces;
  locale: Locales;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAppMessages({ ns, locale }: GetAppMessages): Promise<Messages> {
  const messagesPath = path.resolve(__dirname, `../locales/${ns}/${locale}.json`);
  const globalsPath = path.resolve(__dirname, `../locales/globals/${locale}.json`);

  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
  const globalsMessages = JSON.parse(fs.readFileSync(globalsPath, 'utf-8'));

  return deepmerge(messages, globalsMessages) as Messages;
}
