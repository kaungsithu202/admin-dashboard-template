# AGENTS.md

This file guides coding agents operating in this repository.
Prefer existing local patterns over generic framework defaults.

## Project Overview
- Name: `aura-admin-dashboard`
- Stack: React 19, TypeScript, Vite 7
- Routing: TanStack Router (file-based routes)
- Data: Axios + TanStack Query
- Forms: TanStack Form + Zod
- UI: Tailwind CSS v4 + shadcn/ui-style primitives
- Package manager: `pnpm`

## Instruction Sources (Cursor / Copilot)
- `.cursorrules`: not present
- `.cursor/rules/`: not present
- `.github/copilot-instructions.md`: not present
- If any of these are added, treat them as high-priority repository instructions.

## Important Paths
- `src/routes/` - route modules (public + protected)
- `src/features/` - feature folders (`api`, `components`, `types`)
- `src/components/ui/` - UI primitives
- `src/components/common/` - app-level shared components
- `src/lib/` - utilities, auth, validation
- `src/constants/endpoints.tsx` - API endpoint constants
- `src/routeTree.gen.ts` - generated route tree (never edit manually)

## Setup
```bash
pnpm install
```

## Build / Run Commands
```bash
pnpm dev
pnpm build
pnpm preview
```
- `pnpm dev` runs Vite on `3000`.
- `pnpm build` outputs to `dist/`.

## Lint / Format / Check Commands
```bash
pnpm lint
pnpm format
pnpm check
```

Targeted runs:
```bash
pnpm lint src/path/to/file.tsx
pnpm check src/path/to/file.tsx
pnpm format --write src/path/to/file.tsx
pnpm check --write src/path/to/file.tsx
```

## Type Checking
No dedicated script exists; use:
```bash
pnpm exec tsc --noEmit
```

## Test Commands (Vitest)
```bash
# all tests
pnpm test

# single file
pnpm test src/features/example/example.test.tsx

# single test name
pnpm test -t "renders submit button"

# single file + single test name
pnpm test src/features/example/example.test.tsx -t "submits valid data"

# useful when no tests exist yet
pnpm test --passWithNoTests
```

## Current Baseline Reality
- There are currently no `*.test.*` or `*.spec.*` files.
- `pnpm test` fails by default when no tests are found.
- `pnpm lint`, `pnpm check`, and `pnpm exec tsc --noEmit` currently report pre-existing issues.
- Do not do broad cleanup unless explicitly requested.

## Generated / Special Files
- Do not edit `src/routeTree.gen.ts` by hand.
- `.vscode/settings.json` marks `routeTree.gen.ts` as readonly and excludes it from search.
- Biome excludes `src/routeTree.gen.ts` and `src/styles.css`.
- Biome includes `vite.config.js`, not `vite.config.ts`; do not assume TS config is checked.

## Import Guidelines
- Prefer alias imports (`@/...`) for internal modules.
- Keep import groups ordered:
  1) external packages
  2) internal alias imports (`@/...`)
  3) relative imports
- Use `import type` for type-only imports.
- Prefer Biome import organization over manual sorting.

## Formatting Guidelines
- Follow Biome defaults in `biome.json`.
- Use tabs for indentation.
- Use double quotes.
- Avoid repo-wide formatting churn.
- Format only files in your task scope unless asked otherwise.

## TypeScript Guidelines
- `strict` mode is enabled; preserve strict typing.
- Avoid `any` in new code.
- Use `unknown` with narrowing for uncertain shapes.
- Keep service return types explicit (`Promise<...>`).
- Reuse API envelope types from `src/types/index.ts`.
- For forms, prefer `z.infer<typeof schema>`.

## Naming Guidelines
- Components: PascalCase (`BrandForm`, `PerfumeDetail`).
- Hooks: `useXxx` (`useGetAllBrands`, `useEntityTableActions`).
- Service methods: verb + entity + `Service`.
- Query hooks: `useGet...`, `useCreate...`, `useEdit...`, `useDelete...`.
- Constants: UPPER_SNAKE_CASE (`END_POINTS`).
- Keep backend payload keys in expected casing (often `snake_case`).

## Routing and Feature Structure
- Define routes with `createFileRoute(...)`.
- Keep route concerns in route files (`beforeLoad`, search parsing, redirects).
- Keep query hooks in feature `api/queries.ts`.
- Keep HTTP calls in feature `api/service.ts`.
- Keep feature-specific models in feature `types/index.ts`.

## Data Fetching and Mutations
- Use stable query keys with parameter objects when needed.
- Use `keepPreviousData` for paginated transitions.
- Invalidate relevant query keys after successful mutations.
- Reuse `src/helpers/optimistic.ts` for optimistic delete patterns when appropriate.

## Forms and Validation
- Prefer `useAppForm` and shared form field components.
- Define local Zod schemas in form modules.
- Use `FormData` for file uploads.
- Respect shared file validation (`imageFileSchema`, 500KB max).
- Preserve slug auto-generation behavior with `slugify`.

## Error Handling and UX
- Do not silently swallow errors.
- Let service-layer errors bubble; handle UI feedback near the caller.
- Use `sonner` toasts for success/failure feedback.
- Prefer typed error handling over `catch (err: any)` in new/edited code.
- Keep auth behavior consistent with interceptor-driven 401 handling.

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
