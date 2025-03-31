'use server';

import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deepmerge } from 'deepmerge-ts';

import type { Locales, MessagesType, Namespaces } from '../../types';

interface GetAppMessages<T extends Namespaces> {
  ns: T;
  locale: Locales;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getAppMessages<T extends Namespaces>({
  ns,
  locale,
}: GetAppMessages<T>): Promise<MessagesType<T>> {
  const messagesPath = path.join(__dirname, '../../locales', ns, `${locale}.json`);
  const globalsPath = path.join(__dirname, '../../locales/globals', `${locale}.json`);

  if (!fs.existsSync(messagesPath) || !fs.existsSync(globalsPath)) {
    throw new Error('Message file not found.');
  }

  const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));
  const globalsMessages = JSON.parse(fs.readFileSync(globalsPath, 'utf-8'));

  return deepmerge(messages, globalsMessages) as MessagesType<T>;
}
