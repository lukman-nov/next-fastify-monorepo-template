/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | TailwindConfig | SortImportsConfig  } */
const config = {
  printWidth: 120,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  trailingComma: 'es5',
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-prisma', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn', 'cva'],
  importOrder: [
    '<TYPES>',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '^(fastify(.*)$)|^(fastify$)',
    '^(@fastify(.*)$)|^(@fastify$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '<TYPES>^@zx',
    '^@/(.*)$',
    '^@zx/(.*)$',
    '',
    '<TYPES>^[.|..|~|#]',
    '^~/',
    '^[../]',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: '*.json.hbs',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.js.hbs',
      options: {
        parser: 'babel',
      },
    },
  ],
};

export default config;
