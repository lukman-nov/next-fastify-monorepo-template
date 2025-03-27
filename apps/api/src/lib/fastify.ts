import path from 'path';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastifyAutoload from '@fastify/autoload';

import { errorHandler } from '@/utils/error-handler';

export const options = {
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all',
    },
  },
};

const __dirname = process.cwd();

export default async function serverApp(app: FastifyInstance, opts: FastifyPluginOptions) {
  delete opts.skipOverride;

  app.setSerializerCompiler(serializerCompiler);
  app.setValidatorCompiler(validatorCompiler);

  await app.register(fastifyAutoload, {
    dir: path.resolve(__dirname + '../../', 'plugins/custom'),
    options: { ...opts },
  });

  await app.register(fastifyAutoload, {
    dir: path.resolve(__dirname + '../../', 'plugins/external'),
    options: { ...opts },
  });

  app.setErrorHandler(errorHandler);

  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 3,
        timeWindow: 500,
      }),
    },
    (request, reply) => {
      request.log.warn(
        {
          request: {
            method: request.method,
            url: request.url,
            query: request.query,
            params: request.params,
          },
        },
        'Resource not found'
      );

      reply.code(404);

      return { message: 'Not Found' };
    }
  );

  app.register(fastifyAutoload, {
    dir: path.resolve(__dirname + '../../', 'routes'),
    autoHooks: true,
    cascadeHooks: true,
    options: { ...opts },
  });
}
