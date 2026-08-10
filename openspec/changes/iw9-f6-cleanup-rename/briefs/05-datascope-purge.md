# Brief: Purge dataScope residue

## Mission

`dataScope` is a retired manifest concept the server no longer emits, but it
still shapes a wire type, a rendered UI badge (`DataScopeBadge`), and several
stale comments. This is not dead-code deletion — `DataScopeBadge` and its
two-branch explanatory copy are live, rendered features frozen at a dead
default. Collapse the UI to its one reachable behavior; don't just strip the
field and leave an unreachable branch that misleads the next reader.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/IW-9-APP-FIRST.md` — Decision **D2** (hosted vs.
   managed — the real future replacement for this concept)
2. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 2, Constraints
   "dataScope purge ripples beyond the brief's line list"
3. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Decision **D10**
   (full argument for why this is a UI collapse, not a line strip)
4. `packages/ui/src/apps-store/wire.ts` (lines 370, 412-413, 519-520, 859,
   953-1051)
5. `packages/registry-ui/src/apps/ui.tsx:249-251` (`DataScopeBadge`)
6. `packages/registry-ui/src/apps/app-detail.tsx:195,347-370`
7. `server/workspace/src/records.ts:20` (stale comment only)
8. `server/workspace/src/workflows/runner.ts:73-77` (stale comment only)
9. `server/workspace/scripts/migrate-app-records.ts:26-32` (stale comment
   only)

**registry repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry`):

_None to edit — this stream's grep gate runs a read-only scan against
`packages` and `apps` here to confirm no `dataScope` residue exists on that
side either._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §5)

> Depends-on: - | Repo: aprovan | Touches: aprovan/packages/ui/src/apps-store/wire.ts, aprovan/packages/ui/src/apps-store/index.ts, aprovan/packages/registry-ui/src/apps/ui.tsx, aprovan/packages/registry-ui/src/apps/app-detail.tsx, aprovan/server/workspace/src/records.ts, aprovan/server/workspace/src/workflows/runner.ts, aprovan/server/workspace/scripts/migrate-app-records.ts | Verify: pnpm --filter @aprovan/ui typecheck && pnpm --filter @aprovan/ui test && pnpm --filter @aprovan/registry-ui typecheck && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test

- [ ] 5.1 `packages/ui/src/apps-store/wire.ts`: delete the `DataScope` type
      (line 370), the `dataScope?: DataScope` field on `AppSummary`
      (lines 412-413) and its parse block (lines 519-520), the
      `dataScope: DataScope` field on `CapabilityModel` (line 859), the
      local `dataScope` derivation and every branch that reads it in
      `deriveCapabilities` (lines 953, 956, 992, 1025 — collapse
      `dataLocation`'s two-branch string to the single formerly-`"owner"`
      wording), and the `dataScope` merge block in `mergeCapabilities`
      (lines 1050-1051). Do not leave a `scope === "workspace"` branch that
      can no longer be reached (tech-plan D10).
- [ ] 5.2 `packages/registry-ui/src/apps/ui.tsx`: delete `DataScopeBadge`
      (its only purpose was rendering the now-removed field).
- [ ] 5.3 `packages/registry-ui/src/apps/app-detail.tsx`: remove the
      `<DataScopeBadge app={app} />` render call (line 195) and its now-dead
      import; collapse `dataLocationPath`/`DataLocationCallout`'s
      `model.dataScope === "workspace"` branches to the single remaining
      explanation (owner-hosted), keeping the tooltip/title wording
      substantively intact.
- [ ] 5.4 Fix the stale comments (no functional change): `records.ts:20`
      ("an app's `dataScope`" → describe tenancy resolution without the
      retired term), `workflows/runner.ts:73-77`'s `scriptWorkspaceId` doc
      comment, `scripts/migrate-app-records.ts:26-32`'s caveat block —
      reword each to describe current behavior without asserting a
      `dataScope` concept exists.
- [ ] 5.5 Grep gate, both repos: `grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages server client` (aprovan)
      and `grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages apps` (registry)
      both return nothing.

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene.
Definition of done is the Verify command plus the two-repo grep gate in task
5.5, and specifically: no `scope === "workspace"`-shaped conditional survives
that can never evaluate true (tech-plan D10's explicit failure mode to
avoid).

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm --filter @aprovan/ui typecheck && pnpm --filter @aprovan/ui test && pnpm --filter @aprovan/registry-ui typecheck && pnpm --filter @aprovan/registry-ui build && pnpm --filter @aprovan/registry-ui test
```

Two-repo grep gate (task 5.5) — the two invocations differ by directory set,
run each in its own checkout:

```bash
# aprovan — run from /Users/jacob/Documents/Code/AprovanLabs/aprovan
grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages server client
```

Must produce no output.

```bash
# registry — run from /Users/jacob/Documents/Code/AprovanLabs/registry
grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages apps --exclude-dir=utdk
```

Must produce no output. **Caveat (see `briefs/deviations.md` §4):** the
task's literal command (without `--exclude-dir=utdk`) currently returns 3
false-positive matches inside generated provider clients
(`packages/utdk/posthog/types/{schemas,index}.ts`,
`packages/utdk/plaid/types/schemas.ts`) — a third-party provider literally
named "Datascope" and Plaid's own `ItemConsentedDataScope`/
`consented_data_scopes` field, both unrelated to the app-model concept this
stream purges. Confirmed these are the *only* registry-side matches
(`grep -rni dataScope --include='*.ts' registry` finds nothing outside
`packages/utdk/`) — there is no real dataScope residue in registry to fix;
this stream's `Repo: aprovan`-only scope is correct as declared. Use the
`--exclude-dir=utdk` form above; if it ever returns output, treat it as a
real finding (not a false positive) and investigate before assuming it's
another generated-client collision.

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed — if one seems wrong, stop and report instead of changing it.
- Do not merely strip the type/parsing and leave `DataScopeBadge`/
  `DataLocationCallout`'s conditional branches reading a now-permanently-
  `undefined` field — rejected explicitly in D10 (produces dead conditionals
  indistinguishable from live ones).
- Do not keep the two-mode UI "just in case" a future feature needs it — D2's
  real hosted/managed picker (owned by F2+B, later waves) will get its own
  correctly-named surface when it ships; do not resurrect `dataScope`
  preemptively.
- This stream does not edit any registry-repo file — the registry-side grep
  gate is read-only confirmation, not new work there.
- Do not modify files outside: `packages/ui/src/apps-store/wire.ts`,
  `packages/ui/src/apps-store/index.ts`, `packages/registry-ui/src/apps/ui.tsx`,
  `packages/registry-ui/src/apps/app-detail.tsx`, `server/workspace/src/records.ts`,
  `server/workspace/src/workflows/runner.ts`,
  `server/workspace/scripts/migrate-app-records.ts`.

## Model

**Sonnet.** Explicitly on the no-downgrade list
(`IW-9-EXECUTION-OVERVIEW.md`: "Do NOT downgrade F6's [...] dataScope
streams to Haiku: [...] the dataScope residue is a live rendered UI feature
(`DataScopeBadge`) frozen at a dead default — [...] needs judgment"). Run on
Sonnet as the floor tier, not a Haiku fallback, regardless of Haiku
availability.

## Report back

When done: check off tasks 5.1–5.5 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/05-report.md`) containing: what you built, how you verified it
(including both repos' grep gate output), any deviations from this brief and
why, and anything the next wave needs to know.
