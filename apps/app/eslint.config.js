import baseConfig, { restrictEnvAccess } from '@pos/eslint-config/base';
import nextjsConfig from '@pos/eslint-config/nextjs';
import reactConfig from '@pos/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
