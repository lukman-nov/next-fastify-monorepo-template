import baseConfig from '@zx/eslint-config/base';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['dist/**', 'generated/**'],
  },
  ...baseConfig,
];
