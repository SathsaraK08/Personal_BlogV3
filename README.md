# CMS Blog Platform Monorepo

This monorepo contains a Next.js frontend and NestJS backend for an enterprise-grade CMS blog platform.

## Structure

- `apps/frontend` – public blog and admin dashboard (Next.js 14 + TailwindCSS)
- `apps/backend` – API server (NestJS + Prisma + PostgreSQL)
- `packages/*` – shared TypeScript packages (types, dtos, utils, config, logging, errors)

## Development

```bash
npm install
npm run dev
```

## Docker

To run the entire stack with PostgreSQL:

```bash
docker compose up --build
```

## Prisma

Generate client and run migrations:

```bash
npm run --workspace=apps/backend prisma:generate
npm run --workspace=apps/backend prisma:migrate
```
