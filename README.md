# Hono fullstack monorepo

TanStack Start and Nitro serve the frontend while mounting the independently buildable `@newsnow/server` Hono application in-process under `/api`. The same stack can run on Cloudflare Workers with D1. SQLite/Drizzle and shared definitions live in their own packages.

## Layout

- `apps/stack/frontend`: TanStack Start UI, Router, React Query, Jotai, shared API client, and the `/api/$` server route.
- `apps/stack/backend`: runtime-specific adapters for `@newsnow/server/nodejs` and `@newsnow/server/cloudflare`.
- `apps/server`: independently buildable and startable Hono server and worker runtime.
- `libs/definition`: backend/frontend contracts and environment definitions.
- `libs/db`: SQLite/Drizzle and D1 clients, schema, relations, and manual migration commands.

## Setup

```bash
pnpm install
pnpm --filter @newsnow/server cf:typegen
pnpm --filter @newsnow/stack cf:typegen
cp apps/stack/.dev.vars.example apps/stack/.dev.vars
cp envs/.env.example.server envs/.env.server
cp envs/.env.example.sqlite envs/.env.sqlite
cp envs/.env.example.sqlite-d1 envs/.env.sqlite-d1
pnpm prepare
pnpm --filter @newsnow/db dev:sqlite:push
pnpm -C apps/stack dev:node-chain
```

Database schema changes remain manual. Cloudflare D1 uses the same SQLite schema and migration directory with separate credentials and commands. Production Worker variables are configured in the Cloudflare dashboard; `.dev.vars` is only for local development.

Cloudflare runtime and binding types are generated from each runnable Worker's Wrangler config. Rerun the corresponding `cf:typegen` command after changing compatibility settings or bindings.

Before deploying, replace the placeholder D1 `database_id` and `database_name` in both Wrangler configs. Keep production variables in the Cloudflare dashboard rather than committing them.

Example tasks run in-process through `PassThroughWorkRunner` by default. The complete Piscina implementation remains available: enable `PiscinaWorkRunner` in the Node.js adapter and the adjacent worker pack entry in `apps/server/vite.config.ts` to use worker threads.

## Commands

- `pnpm -C apps/stack dev:node-chain`: build upstream dependencies, then watch the Node stack and its dependencies.
- `pnpm -C apps/stack dev:cloudflare-chain`: build upstream dependencies, then watch the Cloudflare stack and its dependencies.
- `pnpm build`: build all workspace packages, including Nitro's `.output`.
- `pnpm --filter @newsnow/db dev:sqlite:push`: push the local SQLite schema manually.
- `pnpm --filter @newsnow/db dev:sqlite:gen` / `pnpm --filter @newsnow/db dev:sqlite:migrate`: generate or apply SQLite migrations manually.
- `pnpm --filter @newsnow/db dev:d1:gen` / `pnpm --filter @newsnow/db dev:d1:migrate`: generate or apply D1 migrations manually.
- `pnpm --filter @newsnow/server cf:typegen` / `pnpm --filter @newsnow/stack cf:typegen`: generate Cloudflare runtime and binding types.
- `pnpm --filter @newsnow/server dev`: start Hono independently on Node.js.
- `pnpm --filter @newsnow/server dev:cloudflare`: start Hono independently on local workerd and D1.
- `pnpm --filter @newsnow/server test`: run the retained server tests.

The stack exposes health at `/api/health`, OpenAPI YAML at `/api/docs/openapi.yaml`, Swagger at `/api/swagger`, CRUD at `/api/examples`, and worker processing at `/api/examples/process`. The independently started Hono app uses `SERVER_BASE_PATH`.

The example vertical slice may be removed after replacing its definition, table, Hono routes, worker task, API hooks, and page together. Docker and CI are intentionally not included in this Fullstack template.
