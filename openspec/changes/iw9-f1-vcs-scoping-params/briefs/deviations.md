# Deviations — iw9-f1-vcs-scoping-params

Findings recorded during brief preparation, per the IW-9 execution protocol
(`openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` §6): reality contradicted a
checked-in task detail; the task's intent is kept, the mechanics are adapted
minimally, and the finding is recorded here rather than silently changed in
`tasks.md`.

## 1. Stream 4's checked-in `Verify:` command skips the native package's build step (blocking — adapted)

**Task as written** (`tasks.md`, stream 4 metadata line):

```
Verify: pnpm --filter @aprovan/workspace test -- tests/vcs-scoping.test.ts
```

**Problem**: this invokes `@aprovan/workspace`'s own `package.json` `test`
script (`vitest run`) directly via `pnpm --filter`, not through
`pnpm turbo run test`. Verified from source:

- `@aprovan/native`'s `package.json` `exports` map resolves only to
  `./dist/*` (no source or `types`-to-source fallback), and
  `server/workspace/package.json` depends on it via `"@aprovan/native":
  "workspace:*"` — so `@aprovan/workspace` consumes `@aprovan/native`'s
  **built `dist/` output**, never its live `.ts` source.
- Root `turbo.json` declares `test: { dependsOn: ["^build"] }`, so a
  `turbo run test` invocation would automatically rebuild `@aprovan/native`
  first. Calling `pnpm --filter @aprovan/workspace test` directly bypasses
  turbo entirely and runs against whatever `@aprovan/native/dist` happens to
  already exist on disk.
- Stream 4 depends on stream 2, which changes `packages/native/src/vcs.ts`
  and `packages/native/src/dispatch.ts`. If those changes have not been
  rebuilt into `dist/` by the time stream 4's focused test runs, the new
  `vcs-scoping.test.ts` file will execute against a stale or pre-change
  native backend — either failing confusingly (types/behavior mismatch) or,
  worse, passing while silently exercising unscoped legacy behavior instead
  of the new scope-aware contract.

**Adaptation**: stream 4's brief (`briefs/04-scoping-tests.md`) keeps the
checked-in task metadata verbatim (including the original `Verify:` line, so
the historical record in `tasks.md` is not silently rewritten), but instructs
the executing agent to run this corrected command instead:

```bash
pnpm turbo run build --filter=@aprovan/native --filter=@aprovan/workspace
pnpm --filter @aprovan/workspace test -- tests/vcs-scoping.test.ts
```

This explicitly rebuilds `@aprovan/native` (and `@aprovan/workspace`, which
also picks up streams 1 and 3's changes) before running the focused test,
restoring the same dependency guarantee `turbo run test` would have given.
No task intent changes — stream 4 still runs only its own new test file, not
the full (partially F6-owned) suite.

**Not affected**: streams 1 and 3's `Verify:` commands already invoke
`pnpm turbo run build --filter=@aprovan/workspace`, which goes through turbo
and therefore already rebuilds `@aprovan/native` as an upstream dependency —
no adaptation needed there.

## 2. Stream 1's grep-gate `Verify` pipeline is a weak zero-residue check (non-blocking — verification note added)

**Task as written** (`tasks.md`, stream 1 metadata line):

```
Verify: pnpm turbo run build --filter=@aprovan/workspace && ! grep -n 'MAIN_REF' server/workspace/src/vcs/store.ts | grep -v 'export const MAIN_REF' | grep -v 'fallback = MAIN_REF' | grep -q 'commitTree'
```

**Problem**: this is a compound, single-line-scoped filter. Parsed fully:
grep every `MAIN_REF` occurrence in `store.ts`, drop the declaration line and
the `refName` fallback-default line, then check whether any *surviving* line
also contains the literal substring `commitTree` — negated. This only fails
the gate (i.e., only catches a residual reference) when a leftover `MAIN_REF`
usage happens to share a source line with the word `commitTree`. A stray
`MAIN_REF` reference left on its own line inside `commitTree`'s body (the
realistic failure mode after a partial edit) will **not** trip this gate,
because that line alone does not contain `commitTree`.

**Disposition**: non-blocking — this does not change what task 1.1 must
accomplish, only how confidently the automated check can prove it was done.
Kept the task and its checked-in `Verify:` command verbatim in
`briefs/01-store-layer-scoping.md` (do not rewrite `tasks.md`), and added an
explicit secondary zero-residue check to that brief's `## Verify` section:

```bash
grep -n 'MAIN_REF' server/workspace/src/vcs/store.ts
```

with an instruction to manually confirm every remaining hit is either the
`export const MAIN_REF = "main"` declaration or the `refName(value, fallback
= MAIN_REF)` default-parameter line, and that no other line inside
`commitTree`'s body references `MAIN_REF`. This is a required manual
step before checking off task 1.1, not merely advisory — the compound grep
alone is insufficient evidence of done.
