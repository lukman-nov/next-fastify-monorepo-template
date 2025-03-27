import type { FastifyCorsOptions } from '@fastify/cors';
import cors from '@fastify/cors';

import { ALLOWED_HEADERS, ALLOWED_METHODS, ALLOWED_ORIGINS, IS_DEV } from '@/config';
import { HttpError } from '@/exceptions/http-error';

export const autoConfig: FastifyCorsOptions = {
  origin: (origin, callback) => {
    if (IS_DEV) return callback(null, true);
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new HttpError('CORS policy violation!'), false);
  },
  methods: ALLOWED_METHODS,
  allowedHeaders: ALLOWED_HEADERS,
  credentials: true,
};

export default cors;
