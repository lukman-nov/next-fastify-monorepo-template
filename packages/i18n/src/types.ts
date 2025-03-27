import type { locales, namespaces } from 'config';

import type apiMessages from '../locales/api/en.json';
import type appMessages from '../locales/app/en.json';
import type globalsMessages from '../locales/globals/en.json';

export type Locales = (typeof locales)[number];
export type Namespaces = (typeof namespaces)[number];

export type GlobalsMessages = typeof globalsMessages;
export type ApiMessages = typeof apiMessages & GlobalsMessages;
export type AppMessages = typeof appMessages & GlobalsMessages;

type SourceMessages = GlobalsMessages & ApiMessages & AppMessages;

declare module 'use-intl' {
  interface AppConfig {
    Locale: Locales;
    Messages: SourceMessages;
  }
}
