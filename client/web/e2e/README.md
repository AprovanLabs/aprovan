# Chat Playwright E2E

Harness for Chat flagship flows (IW-9). Specs land in streams 10–12; this
directory owns config, fixtures, and conventions only.

## `@chat` tag convention

Every Chat E2E spec title must include `@chat` so the suite can be selected
without picking up future non-Chat Playwright tests:

```ts
import { test, expect } from "./fixtures/two-users";

test("@chat managed install exchanges messages", async ({ twoUsers }) => {
  // …
});
```

Filter:

```bash
pnpm --filter @aprovan/patchwork-web exec playwright test --grep @chat
```

Until streams 10–12 add product flows, the only `@chat` spec is
`harness-bootstrap.spec.ts` (fixture load probe — not a Chat PRD flow).

## Fixtures

| File | Role |
|------|------|
| `fixtures/two-users.ts` | Two authenticated `BrowserContext`s + per-test `testId`, scratch dir, and `registerCleanup` for fresh workspace/instance teardown |
| `fixtures/ws-capture.ts` | Raw `page.on("websocket")` frame capture + `assertZeroMatching` (invariant-7 primitive) |

Import the extended `test` from `fixtures/two-users` in Chat specs. Attach
`attachWsCapture(page)` **before** the page opens its realtime socket.

## webServer env knobs

`playwright.config.ts` starts local-locus `@aprovan/workspace` plus `vite`
dev. Defaults avoid clobbering a developer’s `:4000` / `:5173` / `~/.aprovan`:

| Knob | Default | Role |
|------|---------|------|
| `APROVAN_ENV` | `off` (forced) | Required — skips AWS SSM `/aprovan/prd/env` |
| `GATEWAY_URL` | `http://127.0.0.1:<E2E_GATEWAY_PORT>/api/gateway` | Must include `/api/gateway` (Vite proxy strips `/gateway`) |
| `WORKSPACE_MODE` | `local` | SQLite gateway |
| `E2E_WORKSPACE_DATA_DIR` | `$TMPDIR/aprovan-playwright-e2e` | Suite-isolated data dir (**not** `~/.aprovan`) |
| `E2E_GATEWAY_PORT` | `4010` | Gateway listen port |
| `E2E_WEB_PORT` | `5174` | Vite listen port |
| `E2E_USER_A_TOKEN` / `E2E_USER_B_TOKEN` | unset | Optional Cognito access tokens seeded into each context’s `localStorage` |
| `LLM_*` | — | Not required for harness `--list` / most Chat E2E; only if a flow sends completions |

Per-test isolation: register deletes via `twoUsers.registerCleanup` (installs,
invites, channels). Do not point the suite data dir at a shared developer DB.

`webServer` needs `@aprovan/workspace` built (`pnpm turbo run build
--filter=@aprovan/workspace`) so `tsx` can resolve workspace package
`dist/` imports. `--list` does not start servers and needs no build.

## Commands

```bash
# Install browser (once per machine / CI image)
pnpm --filter @aprovan/patchwork-web exec playwright install --with-deps chromium

# Prove harness discovers tests (empty until streams 10–12)
pnpm --filter @aprovan/patchwork-web exec playwright test --list
pnpm --filter @aprovan/patchwork-web exec playwright test --grep @chat --list

# Or via package script
pnpm --filter @aprovan/patchwork-web run e2e -- --list
```

Invariant-7 and other security-sensitive Chat specs must run with `--retries=0`
(tech-plan T6).
