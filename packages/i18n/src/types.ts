import type apiMessages from '../locales/api/en.json';
import type appMessages from '../locales/app/en.json';
import type globalsMessages from '../locales/globals/en.json';
import type { locales, namespaces } from './config';

export type Locales = (typeof locales)[number];
export type Namespaces = (typeof namespaces)[number];

export type GlobalsMessages = typeof globalsMessages;
export type ApiMessages = typeof apiMessages & GlobalsMessages;
export type AppMessages = typeof appMessages & GlobalsMessages;

export type MessagesType<T extends Namespaces> = T extends 'api' ? ApiMessages : AppMessages;

declare module 'use-intl' {
  interface AppConfig {
    Locale: Locales;
  }
}
