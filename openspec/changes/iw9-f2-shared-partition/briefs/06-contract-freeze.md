# Brief: Contract freeze and grep gates

## Mission

Pin the frozen seam — scope grammar, `PartitionAccess`, instance record shape,
install `hosting` field, and the module-boundary error codes — in a single
test file, so a later wave (`iw9-b`, Wave 1) cannot silently reshape it. Then
run the full gate chain proving this change never touched `releases.ts`/
`identity.ts`, left no `dataScope` residue, and shipped no hosting-mode
migration script.

**Depends on Stream 5** — every seam this stream pins must already exist and
be landed.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

1. `openspec/changes/iw9-f2-shared-partition/tech-plan.md` — "Interfaces &
   Data" section in full; this stream pins every literal and signature
   stated there, verbatim
2. All landed source from Streams 1–5: `server/workspace/src/apps/instances.ts`,
   `server/workspace/src/apps/store.ts`, `server/workspace/src/services.ts`,
   `server/workspace/src/apps/install.ts`, `server/workspace/src/apps/service.ts`

## Tasks

(Verbatim from `openspec/changes/iw9-f2-shared-partition/tasks.md` §6)

> Depends-on: 5 | Repo: aprovan | Touches: server/workspace/tests/shared-partition-contract.test.ts | Verify: pnpm -C server/workspace exec vitest run tests/shared-partition-contract.test.ts && pnpm -C server/workspace typecheck && pnpm -C server/workspace build && test -z "$(git diff HEAD --name-only -- server/workspace/src/apps/releases.ts server/workspace/src/apps/identity.ts)" && ! grep -rn "hosting" server/workspace/scripts/ && ! grep -rln "dataScope" server/workspace/src/apps/instances.ts

- [ ] 6.1 New test file `server/workspace/tests/shared-partition-contract.test.ts`
      pinning the frozen iw9-b seam exactly as written in tech-plan
      "Interfaces & Data": scope-string construction
      (`sharedRecordScope`/`sharedDataDir` literals), `PartitionAccess`
      includes `"shared"`, `parseSharedPartition` grammar (ULID id +
      instanceId, rejects other discriminators), `AppInstallation.hosting`
      accepted values, and 409/413/404/403 error codes at the module seams —
      a breaking edit by a later wave fails this suite by construction.
- [ ] 6.2 Run the full Verify chain and confirm the gates: `releases.ts`
      (iw9-a) and `identity.ts` (iw9-f4) untouched per `git diff`; no
      script under `server/workspace/scripts/` mentions `hosting` (no
      mode-flip migration exists, invariant 10); the new module carries no
      `dataScope` residue. Fix anything the gates catch before checking this
      box.

## Acceptance criteria

No dedicated WHEN/THEN scenarios exist in the delta specs for this stream —
its acceptance criteria *is* the Verify/grep-gate chain in task 6.1/6.2,
which is exhaustive as written: every literal and signature named in
tech-plan.md's "Interfaces & Data" section must have a corresponding
assertion in `shared-partition-contract.test.ts`, and all four shell-level
gates (git-diff-empty, typecheck, build, the two greps) must pass.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm turbo run build --filter=@aprovan/workspace
pnpm -C server/workspace exec vitest run tests/shared-partition-contract.test.ts
pnpm -C server/workspace typecheck
pnpm -C server/workspace build
test -z "$(git diff HEAD --name-only -- server/workspace/src/apps/releases.ts server/workspace/src/apps/identity.ts)"
! grep -rn "hosting" server/workspace/scripts/
! grep -rln "dataScope" server/workspace/src/apps/instances.ts
```

The first line is a correction over tasks.md's literal `Verify:` string (see
`briefs/deviations.md` §2) — it builds `@aprovan/native`/`@aprovan/node`/
`@aprovan/patchwork` before `vitest`/`typecheck` run, which their module
resolution depends on; it is redundant with (but harmless before) the
explicit `pnpm -C server/workspace build` step already in the chain, and
cached/cheap when nothing changed. Every command must exit 0 (for the two
`grep` lines, exit 0 means "no match found," which is what `!` requires
here — a match would flip the exit code and fail the chain).

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md`
  ("Interfaces & Data" in full) are fixed — pin them as written, do not
  reinterpret or "improve" any signature while writing the contract test.
- Do not edit `server/workspace/src/apps/releases.ts` or
  `server/workspace/src/apps/identity.ts` — the git-diff gate in this
  stream's own Verify chain enforces this; if either shows a diff, the
  regression is in an earlier stream, not something to fix here by editing
  them further.
- Do not modify files outside:
  `server/workspace/tests/shared-partition-contract.test.ts`.
- The full `pnpm -C server/workspace test` run currently has 81 pre-existing
  failures across 18 files (see `briefs/deviations.md` §1) — none are yours
  to fix; your Verify command already filters to your own new test file.

## Model

**Sonnet** — the default tier for every iw9-f2 stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. This is a pinning/verification task over already-landed, already-
tested code from Streams 1–5 — closer to the overview's Haiku-eligible
"pure grep-gate close-out streams" description than its Opus row, but F2 is
not named in either the Opus-escalation or the Haiku rows, so it stays on
the explicit default: Sonnet, not a Haiku downgrade and not an Opus
escalation. Instruct the model to copy tech-plan.md's literals verbatim
rather than paraphrase when writing the contract assertions.

## Report back

When done: check off tasks 6.1–6.2 in
`openspec/changes/iw9-f2-shared-partition/tasks.md`, and open a PR (or write
`briefs/06-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and confirmation that all six exit gates
in `IW-9-IMPLEMENTATION-PROMPT.md`'s "Wave exit gates" table relevant to F2
are satisfied.
