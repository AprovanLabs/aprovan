# Report: Vendor lift — buzz MessageTimeline + virtua + Playwright

**Stream:** 6 · **Branch:** `feat/iw9-chat-vendor-buzz` · **Status:** done

## What shipped

- `client/web/src/vendor/buzz-timeline/` — Apache-2.0 vendored scroll hooks +
  presentational `MessageTimeline` (hook wiring + patched virtua; host
  `renderMessage` for Chat chrome).
- Upstream SHA: `4b3570671eb2786594267758af18784ac6e82972`
- `virtua@0.49.3` pinned; buzz `patches/virtua@0.49.3.patch` registered via
  root `pnpm.patchedDependencies`.
- `@playwright/test@1.62.1` + `"e2e": "playwright test"` in
  `client/web/package.json` so **stream 9 never touches package.json**.
- `client/web/NOTICE` attributes block/buzz; vendor `LICENSE` + `README.md`.

## Verify

```text
pnpm install --frozen-lockfile=false
pnpm --filter @aprovan/patchwork-web typecheck   # pass
test -f client/web/NOTICE && grep -q "block/buzz" client/web/NOTICE   # pass
```

## Unblocks

- **Stream 9** (Playwright harness) — `@playwright/test` + `e2e` script are
  present; stream 9 authors config + fixtures only.
- **Stream 7** (timeline adapter) — import from
  `@/vendor/buzz-timeline` (`MessageTimeline`, hooks). Use `renderMessage`
  for Chat row chrome; do not fork the hook cluster.

## Deviations

1. Upstream `MessageTimeline.tsx` is Nostr-coupled (row UI, huddle, shared
   chrome). Per D24 it is not copied as a runnable module; the verbatim
   source is at `upstream/MessageTimeline.tsx.source`, and the shipped
   component is a presentational shell documented in the vendor README
   (dated 2026-08-12).
2. Two one-line nullish coalesces on hook files for React 19 /
   `strictNullChecks` (documented in README).
3. `timelineSnapshot.ts` trimmed to `classifyTimelineMessageDelta` only
   (what `useAnchoredScroll` needs).
