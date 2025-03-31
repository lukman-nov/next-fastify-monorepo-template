import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { fromNodeHeaders } from 'better-auth/node';

import { auth } from '@zx/auth/server';
import { HttpError } from '@/exceptions/http-error';

declare module 'fastify' {
  interface FastifyRequest {
    getCurrentUserId(): Promise<string>;
  }
}

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });

      if (!session || !session.user) {
        throw new HttpError(request.t('auth.errors.ACCOUNT_NOT_FOUND'));
      }

      return session.user.id;
    };
  });
});
