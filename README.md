# Fastify Next.Js Monorepo Template

A basic template that might be needed. Backend API using Fastify framework and Frontend APP using Nextjs 15.

This template also uses translators for API and APP from next-intl and is also equipped with a zod error map.

For UI, we use shadcn/ui and tailwindcss v4.

- Next.js
- Fastify
- CSS Tailwind v4
- shadcn/ui with new dashboard
- Prisma
- Postgresql
- Next-intl

## Instalation

```bash
pnpm install
cp .env.example .env
pnpm db:migrate:dev
pnpm db:generate
pnpm run dev
```
