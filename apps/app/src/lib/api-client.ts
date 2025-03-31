import ky from 'ky';

import { getSessionToken } from '@/services/auth-cookiets';
import { getUserLocale } from '@/services/i18n-cookies';

import { env } from './env';

export const API = ky.create({
  prefixUrl: `${env.NEXT_PUBLIC_API_URL}/v1`,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async (request) => {
        if (typeof window === 'undefined') {
          if (request.headers.get('origin') === null) {
            request.headers.set('origin', env.NEXT_PUBLIC_APP_URL);
          }
        }

        const token = await getSessionToken();
        const tokenSplitter = token?.split('.')[0];
        if (tokenSplitter) {
          request.headers.set('Authorization', `Bearer ${tokenSplitter}`);
        }

        const locale = await getUserLocale();
        request.headers.set('Accept-Language', locale);
      },
    ],
  },
});
