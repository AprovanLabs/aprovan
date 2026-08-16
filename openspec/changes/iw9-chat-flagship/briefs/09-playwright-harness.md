# Brief: Playwright harness bootstrap

**Depends-on: -** | Repo: aprovan | Wave 0 (parallel with 1, 3, 6)

## Mission

When you are done, Chat has a Playwright harness: config with local
workspace + vite webServer, two-user browser-context fixture, raw
WebSocket frame capture helper, and `@chat` tag convention. Proves
`playwright test --list` runs (specs land in streams 10–12).

**Package.json:** `@playwright/test` and the `e2e` script are owned by
stream 6. If missing when you start, **stop and report** — do not edit
`package.json` (Touches-disjoint with stream 6).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `openspec/changes/iw9-chat-flagship/tech-plan.md` — T6 Playwright bootstrap
3. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 9 (+ parallel note)
4. `briefs/00-waves.md` — Wave 0 Touches split with stream 6
5. AGENTS.md local gateway/web notes if needed for webServer config

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 9.1 Confirm `@playwright/test` is already a `client/web` devDependency
      (added by stream 6). Author `playwright.config.ts` with `webServer`
      starting a local-locus `@aprovan/workspace` instance plus
      `vite preview`/`vite dev` (tech-plan T6). Confirm the `e2e` script
      exists in `client/web/package.json` (stream 6); if missing, stop and
      report — do not edit package.json in this stream.
- [ ] 9.2 Two-user browser-context fixture (`e2e/fixtures/two-users.ts`):
      spins up two authenticated `BrowserContext`s against one server
      instance, tears down workspace/instance state after each test (fresh
      workspace per test — tech-plan Risks, flake mitigation).
- [ ] 9.3 Raw WebSocket frame capture helper (`e2e/fixtures/ws-capture.ts`)
      using Playwright's `page.on("websocket")`, exposing "assert zero
      frames matching predicate over the test window" — the primitive
      stream 12's invariant-7 test needs.
- [ ] 9.4 Tag convention: every Chat E2E spec carries `@chat` in its title
      (tech-plan Architecture); confirm `playwright test --grep @chat` lists
      only Chat specs (empty until streams 10-12 land specs — this task
      just proves the harness runs).

## Acceptance criteria

Harness installs Chromium and `playwright test --list` succeeds; fixtures
exist for two-users and ws-capture; `@chat` grep convention documented.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm --filter @aprovan/patchwork-web exec playwright install --with-deps chromium && pnpm --filter @aprovan/patchwork-web exec playwright test --list
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/playwright.config.ts`, `aprovan/client/web/e2e/fixtures/**`, `aprovan/client/web/e2e/README.md`
- **Do not edit `package.json`.** If `@playwright/test` is missing, stop and report for stream 6.
- Do not author flow specs here (streams 10–12).

## Report back

Check off tasks; PR or `briefs/09-report.md`; document webServer env knobs
for E2E streams.
