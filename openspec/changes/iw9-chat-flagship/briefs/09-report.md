# Report: Playwright harness bootstrap

**Stream:** 9 · **Branch:** `feat/iw9-chat-playwright` · **Status:** done

## What shipped

- `client/web/playwright.config.ts` — `webServer` array: local-locus
  `@aprovan/workspace` (`tsx src/cli.ts start`) on `E2E_GATEWAY_PORT`
  (default 4010) + `vite` on `E2E_WEB_PORT` (default 5174); suite SQLite
  under `$TMPDIR/aprovan-playwright-e2e` (not `~/.aprovan`);
  `APROVAN_ENV=off` + `GATEWAY_URL=…/api/gateway`.
- `client/web/e2e/fixtures/two-users.ts` — two `BrowserContext`s, optional
  `E2E_USER_{A,B}_TOKEN` seeding, per-test `testId` / scratch dir /
  `registerCleanup` for fresh instance teardown.
- `client/web/e2e/fixtures/ws-capture.ts` — `page.on("websocket")` frame
  buffer + `assertZeroMatching` (invariant-7 primitive for stream 12).
- `client/web/e2e/README.md` — `@chat` title convention + env knobs.
- `client/web/e2e/harness-bootstrap.spec.ts` — fixture-load probe tagged
  `@chat` (not a product flow).

**Did not edit `package.json`.** Confirmed on base (`origin/main` after
#228): `@playwright/test@1.62.1` + `"e2e": "playwright test"`.

## Verify

```text
pnpm --filter @aprovan/patchwork-web exec playwright install --with-deps chromium
pnpm --filter @aprovan/patchwork-web exec playwright test --list
# → Total: 1 test in 1 file (harness-bootstrap @chat)  exit 0

pnpm --filter @aprovan/patchwork-web exec playwright test --grep @chat --list
# → same single @chat test  exit 0

# Extra (not in brief Verify): smoke run after workspace build
pnpm turbo run build --filter=@aprovan/workspace
pnpm --filter @aprovan/patchwork-web exec playwright test e2e/harness-bootstrap.spec.ts --retries=0
# → 1 passed
```

## Tasks

- [x] 9.1
- [x] 9.2
- [x] 9.3
- [x] 9.4

## Unblocks

- **Streams 10–12** — import `test` from `e2e/fixtures/two-users`, use
  `attachWsCapture` for invariant-7, put `@chat` in every title, run with
  `--retries=0` for security specs. Build `@aprovan/workspace` before
  running tests (webServer needs package `dist/`).

## Deviations

1. **`e2e/harness-bootstrap.spec.ts`** — Playwright 1.62 `test --list`
   exits 1 with zero tests (`passWithNoTests` in config does not apply to
   `--list`). Added a minimal `@chat` fixture probe so Verify exits 0.
   Not a Chat PRD flow (streams 10–12 still own those specs).
2. **9.4 “empty until 10–12”** — `--grep @chat` lists the harness probe
   only until product specs land; still Chat-only.
3. **Auth-none principals** — without `E2E_USER_*_TOKEN`, both contexts
   hit gateway `sub: "local"`. Browser state is still isolated; distinct
   users for streams 10–12 need tokens or invite-join session seeding.
