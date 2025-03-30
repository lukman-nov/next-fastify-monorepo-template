import baseConfig from '@zx/eslint-config/base';
import reactConfig from '@zx/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
  ...reactConfig,
];
