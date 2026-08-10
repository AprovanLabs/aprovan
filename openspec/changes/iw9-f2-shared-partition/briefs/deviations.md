# Deviations — iw9-f2-shared-partition

Recorded per `IW-9-IMPLEMENTATION-PROMPT.md` §6 ("Deviations: when reality
contradicts a task... write the finding to `briefs/deviations.md`"). Both
entries below are planning-time findings from packaging briefs, before any
stream started implementation. Neither changes this change's source scope
(`Touches` globs, task text, or spec requirements) — they are orchestration
corrections only.

## 1. Full-suite baseline is 81 failed tests / 18 failed files, not "22"

`tasks.md`'s header reads: "the full `pnpm -C server/workspace test` run has
22 known-failing legacy VCS suites owned by iw9-f6 — do NOT touch or fix
them." Read in isolation this implies the whole suite has 22 failures. It
doesn't.

**Measured 2026-08-09** (same day as this change's own tech-plan claims):

```
pnpm turbo run build --filter=@aprovan/workspace   # cache hit, exit 0
pnpm -C server/workspace exec vitest run
```

Result: **Test Files 18 failed | 58 passed | 6 skipped (82)** — **Tests 81
failed | 474 passed | 57 skipped (612)**.

This is not a new regression and not specific to F2 — it is the current
baseline for the whole `server/workspace` package, and it exactly matches the
sibling `iw9-f6-cleanup-rename` change's own measured baseline
(`openspec/changes/iw9-f6-cleanup-rename/briefs/deviations.md` §1, same
numbers: 18 failed files / 81 failed tests / 474 passed / 57 skipped),
confirmed there to break down as:

| Group | Files | Failures | Owner |
|---|---|---|---|
| iw9-f6-owned (legacy VCS suites this change must not touch) | 5 | 22 | `vcs.test.ts`, `vfs-mounts.test.ts`, `vcs-mount-lineage.test.ts`, `vcs-interface.test.ts`, `chat-sessions.test.ts` |
| Non-F6, non-F2, pre-existing | 13 | 59 | `interfaces.test.ts`, `sandboxes.test.ts`, `get-client.test.ts`, `telemetry.test.ts`, `agent-run.test.ts`, `agent-interface.test.ts`, `oauth-tokens.test.ts`, `sandbox-agent-runs.test.ts`, `sync.test.ts`, `sandbox-repo-mounts.test.ts`, `profiles.test.ts`, `live-apps.test.ts`, `apps.test.ts` |
| **Total** | **18** | **81** | matches the measured run above |

The "22" in tasks.md's header is correct as a description of the F6-owned
subset; it is imprecise only if read as "the full suite has 22 failures." No
F2 task or Verify command depends on the full-suite count — every stream's
`Verify:` already filters to that stream's own new test files (per tasks.md's
own header instruction), so this has no effect on any stream's pass/fail
gate. It matters only for whoever runs the unfiltered
`pnpm -C server/workspace exec vitest run` as a sanity check and needs to know
which of the 81 failures are pre-existing (all of them, today) versus a
regression a stream introduced.

**Disposition:** `tasks.md`'s header text is left verbatim (its *intent* —
"don't touch or fix the legacy VCS suites" — is unambiguous and correct).
Each brief's "Verify" section states the corrected, scope-filtered command
and does not run or gate on the full suite. No source scope changes.

## 2. `tasks.md`'s literal `Verify:` commands can fail on a clean checkout

Every stream's `Verify:` metadata line runs `pnpm -C server/workspace exec
vitest run ...` / `pnpm -C server/workspace typecheck` directly. `@aprovan/
workspace` depends on three source-linked monorepo packages
(`@aprovan/native`, `@aprovan/node`, `@aprovan/patchwork`, all `workspace:*`
in `server/workspace/package.json`) whose compiled `dist/` output is what
Node's module resolution actually loads. Turbo's own `test` and `typecheck`
tasks declare `dependsOn: ["^build"]` (`turbo.json:14-22`) precisely because
skipping this can fail to resolve those packages — this is the same caution
`AGENTS.md` gives for `pnpm dev`. In this environment `dist/` already existed
from prior work, so the literal commands passed when re-run
(confirmed 2026-08-09), but a delegated agent starting from a fresh clone /
clean install has no such guarantee.

**Fix (brief-level only, tasks.md untouched):** every brief's "## Verify"
section prepends `pnpm turbo run build --filter=@aprovan/workspace` (verified
2026-08-09: exit 0, `4 successful, 4 total`, cache hits where nothing
changed — cheap and idempotent to re-run). This builds
`@aprovan/native`/`@aprovan/node`/`@aprovan/patchwork` and `@aprovan/workspace`
itself before any `vitest`/`typecheck` invocation, matching the pattern
`IW-9-IMPLEMENTATION-PROMPT.md` already prescribes
(`pnpm turbo run build --filter=@aprovan/workspace --filter=@aprovan/
patchwork-web`, minus the unrelated web-client filter since these streams
touch only `server/workspace`).

## 3. No blocking identity-convention gap (resolved, not deferred)

The Stream 5 brief's host-gate task (5.2: "hosting-workspace admin, or
creator when hosting in their personal space per IW-9 D1/D22") looked
underspecified — no `isPersonal`/`personalWorkspace` concept exists anywhere
in `identity/types.ts`, `workspaces.ts`, or the identity store backends
(checked). This was resolved by source inspection rather than left as a
blocker: see `tech-plan.md`'s TD6 "Host = hosting-workspace admin" paragraph
for the finding and citations
(`infra/aws/src/lambdas/post-confirmation/index.ts:59-85`, wired at
`infra/aws/src/stacks/main.ts:122-124`). In short — the only signup path in
this codebase grants an uninvited (personal-workspace) creator `role:
"admin"` on that workspace by default, so a single `getMembership(...).role
=== "admin"` check covers both disjuncts of the host definition. Stream 5 is
**not** blocked; it is fully dispatchable. This entry exists only so the
resolution's provenance is visible next to the other two findings.
