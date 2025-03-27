import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

const env = createEnv({
  clientPrefix: 'NEXT_PUBLIC_',
  emptyStringAsUndefined: true,
  runtimeEnv: process.env,
  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  server: {
    API_PORT: z.coerce.number().default(4000),
    API_HOST: z.string().default('0.0.0.0'),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_APP_URL: z.string(),
  },
});

export default env;
