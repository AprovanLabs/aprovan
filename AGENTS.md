# AGENTS.md

## Cursor Cloud specific instructions

This repo is a `pnpm` + `turbo` monorepo (workspaces: `client/**`, `packages/**`,
`server/**`, `infra/*`). Standard scripts live in the root `package.json`
(`build`, `dev`, `lint`, `test`, `typecheck`); per-service commands are in each
package's `package.json`. Notes below are the non-obvious things that are easy to
trip over — dependency installation is already handled by the environment's
startup update script, so it is not repeated here.

### Toolchain
- Use `pnpm` via **corepack** — the repo pins `pnpm@9.15.9` in `packageManager`,
  but the base image's global `pnpm` is a different major. `corepack enable` (run
  at startup) makes `pnpm` inside the repo resolve to 9.15.9 automatically.
- Node 22 is installed; `engines` only requires `>=20`.

### Build before dev/test
- Turbo `dev` and `test` both `dependsOn: ["^build"]`, so run `pnpm build` (or a
  filtered build of the deps) before `pnpm dev`/tests, otherwise services fail to
  resolve workspace `dist/` output.
- `utdk` typecheck is memory-heavy: prefix with `NODE_OPTIONS=--max-old-space-size=4096`.

### Core product = workspace gateway + patchwork-web (local mode, no AWS/Docker)
- Gateway: `pnpm --filter @aprovan/workspace dev`. Defaults to `WORKSPACE_MODE=local`
  (SQLite at `~/.aprovan`, auth off), listens on `http://localhost:4000`. Liveness
  at `/health`; the REST API is mounted under `/api/gateway/*` (e.g.
  `GET /api/gateway/fs/<path>`, `PUT` to write). MCP is at `/api/mcp`.
- Web (Patchwork chat): serve it with
  `APROVAN_ENV=off GATEWAY_URL=http://localhost:4000/api/gateway pnpm --filter @aprovan/patchwork-web dev`
  → `http://localhost:5173/chat/`. Two non-obvious knobs:
  - `APROVAN_ENV=off` is **required** locally — otherwise `client/web/scripts/load-env.ts`
    tries to pull config from AWS SSM (`/aprovan/prd/env`) and the dev server/build
    aborts with "Could not load credentials from any providers".
  - `GATEWAY_URL` must include the **`/api/gateway`** base path. The Vite proxy
    forwards `/gateway/*` after stripping the `/gateway` prefix, so a bare
    `http://localhost:4000` (as the README shows) 404s; `.../api/gateway` is what
    actually reaches the gateway routes.
- Chat completions need an LLM provider **credential** connected through the
  gateway (e.g. an OpenAI/Anthropic key). Without one the UI blocks sending with
  "Chat requires an LLM provider credential" — expected; not needed to bring the
  stack up. Backend data-plane flows (fs read/write, sessions, profiles) work with
  no external keys.
- `dev:aws` (DynamoDB-local :8000 + MinIO :9000) is only for AWS-parity work and
  needs Docker, which is **not** installed by default. Core local dev never needs it.

### Pre-existing breakages (not environment issues — do not "fix" as setup)
- `pnpm lint` fails at load time: `config/eslint-config/base.mjs` imports
  `typescript-eslint`, which is not a declared dependency (only transitive) and
  `config/eslint-config` has no `package.json`, so ESLint reports
  `ERR_MODULE_NOT_FOUND`. No CI workflow runs `pnpm lint`, which is why this
  persists on `main`.
- `pnpm build` (root) fails on `@aprovan/devtools`: its `tsup.config.ts` lists
  `src/cli.ts` and `src/quality.ts` entries that were never committed. Nothing
  depends on `@aprovan/devtools`; build the real product with filters, e.g.
  `pnpm turbo run build --filter=@aprovan/workspace --filter=@aprovan/patchwork-web`.

### Other
- `cicadas` (root README) is a separate external Python CLI installed via `uv`;
  it is unrelated to the Node build and not required for the product.
