import { getRequestConfig } from 'next-intl/server';

import type { AppMessages } from '@zx/i18n/types';
import { getAppMessages } from '@zx/i18n';
import { getUserLocale } from '@/services/i18n-cookies';

export default getRequestConfig(async () => {
  const userLocale = await getUserLocale();

  const messages = await getAppMessages({ ns: 'app', locale: userLocale });

  return {
    locale: userLocale,
    messages,
  };
});

declare module 'next-intl' {
  interface AppConfig {
    Messages: AppMessages;
  }
}
