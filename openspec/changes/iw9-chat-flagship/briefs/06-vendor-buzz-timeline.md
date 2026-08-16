# Brief: Vendor lift — buzz `MessageTimeline` + scroll-anchoring hooks + patched virtua

**Depends-on: -** | Repo: aprovan | Wave 0 (parallel with 1, 3, 9)

## Mission

When you are done, buzz's presentational `MessageTimeline` + scroll hooks
are vendored under Apache-2.0 with NOTICE/LICENSE/README (upstream SHA);
`virtua@0.49.3` is pinned with buzz's patch; and `@playwright/test` + `e2e`
script are added to `client/web/package.json` so stream 9 never touches
package.json (Touches-disjoint Wave 0).

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `openspec/changes/iw9-chat-flagship/prd.md` — Timeline quality goal
3. `openspec/changes/iw9-chat-flagship/tech-plan.md` — T2, D24, Risks (virtua patch)
4. `openspec/changes/iw9-chat-flagship/tasks.md` — stream 6 (+ parallel note vs stream 9)
5. Upstream: github.com/block/buzz `desktop/src/features/messages/`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [x] 6.1 Copy `MessageTimeline.tsx` (fully presentational, ~50 props) and
      the hook cluster `useAnchoredScroll`, `useLoadOlderOnScroll`,
      `useVirtualizedBottomSettle`, `useTimelineRetention` from
      github.com/block/buzz (`desktop/src/features/messages/`) into
      `client/web/src/vendor/buzz-timeline/`, Apache-2.0 headers retained
      verbatim, import paths adjusted only (D24, tech-plan T2).
- [x] 6.2 Add `virtua@0.49.3` as a pinned dependency of `client/web`; apply
      buzz's `patches/virtua@0.49.3.patch` via `pnpm patch` and register
      `patchedDependencies` in the root `package.json` (tech-plan T2 —
      required for stable upward-history-prepend; do not use unpatched
      virtua). Also add `@playwright/test` as a `client/web` devDependency
      and an `e2e` script in `client/web/package.json` (owned here so
      stream 9's Touches stay disjoint — stream 9 only authors config +
      fixtures).
- [x] 6.3 Add a `client/web/NOTICE` entry ("Portions derived from
      block/buzz, Apache-2.0") plus a `LICENSE` copy inside
      `vendor/buzz-timeline/`, and a `vendor/buzz-timeline/README.md`
      recording the upstream commit SHA the lift was taken from (tech-plan
      Risks — "patch breaks on virtua bump" mitigation: renovate/dependabot
      exclusion noted here too).
- [x] 6.4 Confirm no local edits beyond import-path fixes: any divergence
      from upstream gets a dated note in the vendor README, not a silent
      diff (tech-plan Architecture "Component responsibilities").

## Acceptance criteria

Vendored timeline typechecks; NOTICE present with block/buzz attribution;
patched virtua registered; `@playwright/test` available for stream 9.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && pnpm install --frozen-lockfile=false && pnpm --filter @aprovan/patchwork-web typecheck && test -f client/web/NOTICE && grep -q "block/buzz" client/web/NOTICE
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/client/web/src/vendor/buzz-timeline/**`, `aprovan/client/web/NOTICE`, `aprovan/patches/virtua@0.49.3.patch`, `aprovan/package.json`, `aprovan/client/web/package.json`, `aprovan/pnpm-lock.yaml`
- No silent forks of buzz code. Do not use unpatched virtua. Do not build messaging UI (stream 7).

## Report back

Check off tasks; PR or `briefs/06-report.md` with upstream SHA and note
that stream 9 can proceed.
