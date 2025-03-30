import baseConfig, { restrictEnvAccess } from '@zx/eslint-config/base';
import nextjsConfig from '@zx/eslint-config/nextjs';
import reactConfig from '@zx/eslint-config/react';

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
