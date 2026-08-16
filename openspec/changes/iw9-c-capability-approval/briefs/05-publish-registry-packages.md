# Brief: Registry — publish @utdk/* and @aprovan/registry-server

**Depends-on: 2, 3, 4 (all merged)** | Repo: registry | Wave 2

## Mission

When you are done, every regenerated/annotated `@utdk/*` package and a
minor-bumped `@aprovan/registry-server` (resource-grants exports) are
published to npm on the `^0.2.x` line **strictly above current `0.2.10`**
(never republish into deprecated `0.2.4–0.2.6`). Publish before any aprovan
pin (IW-9 cross-repo rule 2). No aprovan-side work in this stream.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — Cross-repo rules 1–2
2. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — Rollout publish sequence
3. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 5 + preamble pin rules
4. Confirm streams 2, 3, 4 are merged and green

Work in `/Users/jacob/Documents/Code/AprovanLabs/registry`.

## Tasks

- [ ] 5.1 Publish every regenerated/annotated `@utdk/*` provider package
      (streams 2 and 4) to npm — additive metadata field only, no
      breaking change.
- [ ] 5.2 Minor-bump and publish `@aprovan/registry-server` (stream 3's
      resource-grants storage/matcher/dispatch export — additive), on the
      `^0.2.x` line, strictly above current `0.2.10` (never re-publish
      into the deprecated-broken `0.2.4-0.2.6` range). Publish before pin
      (IW-9 cross-repo rule 2) — no aprovan-side task in this stream may
      start until this publishes.

## Acceptance criteria

Published packages on npm carry `effect` metadata / `ResourceGrantRow` +
`matchesResourcePattern` exports. `npm view` shows versions stream 6 will pin.

## Verify

```bash
npm view @aprovan/registry-server version && npm view @utdk/github version
```

Confirm registry-server version > 0.2.10 and not in 0.2.4–0.2.6.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `registry/packages/utdk/**/package.json`, `registry/packages/registry-server/package.json`, `registry/packages/registry-server/CHANGELOG.md`
- Do not start any aprovan pin or code in this stream.
- Additive publishes only.

## Report back

Check off tasks; PR or `briefs/05-report.md` listing **exact published
versions** stream 6 must pin (blocker if omitted).
