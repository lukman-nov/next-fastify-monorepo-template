import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from '@/services/i18n-cookies';
import { getAppMessages } from '@pos/i18n';

export default getRequestConfig(async () => {
  const userLocale = await getUserLocale();

  const messages = await getAppMessages({ ns: 'app', locale: userLocale });

  return {
    locale: userLocale,
    messages,
  };
});
