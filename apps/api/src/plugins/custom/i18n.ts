import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { Messages } from 'use-intl';
import fp from 'fastify-plugin';
import { createTranslator } from 'use-intl';

import type { Locales } from '@pos/i18n';
import { getUserLocale } from '@/utils/get-user-locale';
import { defaultLocale, getAppMessages, locales } from '@pos/i18n';

declare module 'fastify' {
  export interface FastifyRequest {
    t: ReturnType<typeof createTranslator>;
  }
}

export const useIntl = (app: FastifyInstance) => {
  app.decorate('t', useIntl);
  app.addHook('preHandler', async (request: FastifyRequest) => {
    try {
      let messages: Messages;

      const matchedLocale: Locales = await getUserLocale({ fastifyRequest: request });

      if (!locales.includes(matchedLocale)) {
        messages = await getAppMessages({ ns: 'api', locale: defaultLocale });
      } else {
        messages = await getAppMessages({ ns: 'api', locale: matchedLocale });
      }

      request.t = createTranslator({
        locale: matchedLocale,
        messages,
      });
    } catch (error) {
      app.log.error(error);
      throw new Error('Unable to load language');
    }
  });
};

export default fp(useIntl, { name: 'use-intl' });
