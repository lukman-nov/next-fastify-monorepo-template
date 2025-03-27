import type { FastifyInstance } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

import { HttpError } from '@/exceptions/http-error';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = async (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return await reply.status(error.statusCode ?? 400).send({
      message: 'Request Validation Error',
      cause: error.cause ?? error.message,
      error: error.validation,
    });
  }

  if (error instanceof HttpError) {
    return await reply.status(400).send({
      message: error.message,
    });
  }

  reply.log.error(error);

  return await reply.status(500).send({ message: 'The server is experiencing problems. Please try again later.' });
};
