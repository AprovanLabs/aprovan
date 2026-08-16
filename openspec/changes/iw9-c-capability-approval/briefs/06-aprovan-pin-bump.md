# Brief: aprovan — dependency pin bump

**Depends-on: 5 (published)** | Repo: aprovan | Wave 3

## Mission

When you are done, `@aprovan/workspace` pins the published
`@aprovan/registry-server` (stream 5.2) and regenerated `@utdk/*` packages,
plus adds `@utdk/remote` for install-card static analysis (stream 10). Own
commit, **no behavior change**. Typecheck must see `Effect`,
`ResourceGrantRow`, `matchesResourcePattern` before any C aprovan code lands.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — cross-repo pin-after-publish
2. `openspec/changes/iw9-c-capability-approval/tech-plan.md` — Rollout
3. `openspec/changes/iw9-c-capability-approval/tasks.md` — stream 6
4. `briefs/05-report.md` (or PR) for exact published versions
5. `server/workspace/package.json`

Work in `/Users/jacob/Documents/Code/AprovanLabs/aprovan`.

## Tasks

- [ ] 6.1 Bump `@aprovan/registry-server` to the version published in 5.2
      (must stay `^0.2.7`-or-later) in its own commit, no behavior
      change; add `@utdk/remote` (already published at `0.1.4`, used
      today by `packages/editor`/`packages/compiler`) as a new
      `server/workspace` dependency — it supplies `scanToolsAccess` for
      the install-card static analysis in stream 10.
- [ ] 6.2 Bump the regenerated `@utdk/*` provider packages actually used
      by `server/workspace` (github, anthropic, etc. — whichever the
      workspace already pins) to their stream-4/5 versions.
- [ ] 6.3 `pnpm install`; confirm the workspace typechecks against the new
      exports (`Effect`, `ResourceGrantRow`, `matchesResourcePattern`)
      before any aprovan C code lands. Until this pin lands, `evaluateDispatch`
      does not exist yet — no behavior changes in this commit.

## Acceptance criteria

Pin lands; typecheck resolves new exports; no runtime behavior change yet.

## Verify

```bash
cd /Users/jacob/Documents/Code/AprovanLabs/aprovan && grep -n "@aprovan/registry-server" server/workspace/package.json && pnpm --filter @aprovan/workspace check-types
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `aprovan/server/workspace/package.json`, `aprovan/pnpm-lock.yaml`
- No `evaluateDispatch`, no effect wiring — pin only.
- Never sibling-import registry sources.

## Report back

Check off tasks; PR or `briefs/06-report.md` with pinned versions; unblock
stream 7.
