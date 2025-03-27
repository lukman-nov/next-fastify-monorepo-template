import baseConfig from '@pos/eslint-config/base';
import reactConfig from '@pos/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
];
