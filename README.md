# Fastify Next.Js Monorepo Template

This template uses Next.js framework for frontend and Fastify framework for backend. This template also uses the Better Auth authentication framework.

For UI, this template uses components from shadcn/ui and tailwindcss v4.

Not to forget, this template also has translators from Next-Intl for both the backend and frontend, and there are also custom errors for Zod.

To support authentication, this template uses Prisma and Postgress.

## Using this example

### Run the following command:

```bash
npx create-turbo@latest --example https://github.com/lukman-nov/next-fastify-monorepo-template
```

### Copy and fill in all env:

```bash
cd <your repo name>
cp .env.example .env
```

> generate auth secrets fast [BETTER_AUTH_SECRET](https://www.better-auth.com/docs/concepts/cli#secret)

### Create database and generate

```bash
pnpm db:migrate:dev

pnpm db:generate
```

### Build

```bash
pnpm build
```

### Develop

```bash
pnpm dev
```

## What's inside?

### Apps:

- `api`: [Fastify](https://fastify.dev/) v5 (backend)
- `app`: [Next.js](https://nextjs.org/) v15 (frontend)

### Packages:

- `@zx/auth`: authentication to access the `app` that uses the [Better Auth](https://www.better-auth.com/) framework.
- `@zx/db`: database to support server with [Prisma](https://www.prisma.io/) framework.

- `@zx/email`: email delivery that uses the [Resend](https://resend.com/) framework to support authentication and more.
- `@zx/i18n`: Translator for frontend and backend that uses the [Next-Intl](https://next-intl.dev/) framework
- `@zx/shared`: some functions that can be used for frontend and backend
- `@zx/ui`: component library that can be used for frontend, using [shadcn/ui](https://ui.shadcn.com/) and [tailwindcss](https://tailwindcss.com/) v4

### Toolings:

- `@zx/eslint`: `eslint` configurations
- `@zx/prettier`: `prettier` configurations
- `@zx/typescript`: `tsconfig.json` used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting
- [Zod](https://zod.dev/) for validation
- [@t3-oss](https://create.t3.gg/) for env typesave
