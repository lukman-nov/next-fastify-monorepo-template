import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import Fastify from 'fastify';
import fp from 'fastify-plugin';
import closeWithGrace from 'close-with-grace';

import { IS_DEV } from './config';
import env from './lib/env';
import serverApp from './lib/fastify';
import getLoggerOptions from './utils/logger';

const app = Fastify({
  logger: getLoggerOptions(),
  ajv: {
    customOptions: {
      coerceTypes: 'array', // change type of data to match type keyword
      removeAdditional: 'all', // Remove additional body properties
    },
  },
}).withTypeProvider<ZodTypeProvider>();

async function startServer() {
  app.register(fp(serverApp));

  closeWithGrace({ delay: IS_DEV ? false : 500 }, async ({ err }) => {
    if (err != null) {
      app.log.error(err);
    }

    await app.close();
  });

  await app.ready();

  try {
    await app.listen({ port: env.API_PORT, host: env.API_HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
