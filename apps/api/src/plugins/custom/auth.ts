import type { FastifyInstance } from 'fastify';
import type { HttpHeader } from 'fastify/types/utils';
import fp from 'fastify-plugin';
import { toNodeHandler } from 'better-auth/node';

import { auth } from '@zx/auth/server';

declare module 'fastify' {
  interface FastifyInstance {
    auth: typeof auth;
  }
}

export function mapHeaders(headers: Record<HttpHeader, number | string | string[] | undefined>) {
  const entries = Object.entries(headers);
  const map = new Map();
  for (const [headerKey, headerValue] of entries) {
    if (headerValue != null) {
      map.set(headerKey, headerValue);
    }
  }
  return map;
}

async function betterAuthPlugin(app: FastifyInstance) {
  app.decorate('authServer', auth);
  await app.register((fastify) => {
    const authHandler = toNodeHandler(auth);

    fastify.addContentTypeParser('application/json', (_request, _payload, done) => {
      done(null, null);
    });

    fastify.all('/v1/auth/*', async (request, reply) => {
      reply.raw.setHeaders(mapHeaders(reply.getHeaders()));
      await authHandler(request.raw, reply.raw);
    });
  });
}

export default fp(betterAuthPlugin, {
  name: 'auth',
});
