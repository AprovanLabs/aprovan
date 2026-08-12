# Brief: Dependencies — yjs, y-protocols, y-codemirror.next

**Depends-on: -** | Repo: aprovan | Wave 0 (parallel with 9)

## Mission

When you are done, `@aprovan/editor` declares `yjs`, `y-protocols`, and
`y-codemirror.next` in `dependencies`, the root lockfile matches, and
`pnpm install --frozen-lockfile` plus editor typecheck succeed. No product
code uses the packages yet — this unblocks streams 2 and 6.

## Read first

1. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md`
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-doc-markdown/prd.md` — Constraints (Yjs / CM6)
4. `openspec/changes/iw9-doc-markdown/tech-plan.md` — Context (CM6 present, Yjs absent)
5. `openspec/changes/iw9-doc-markdown/tasks.md` — preamble + stream 1
6. `packages/editor/package.json` — confirm `@codemirror/state` / `@codemirror/view` peers

Work in the aprovan checkout. Do not edit registry.

## Tasks

- [ ] 1.1 Add `yjs`, `y-protocols`, and `y-codemirror.next` to
      `packages/editor/package.json` `dependencies` (tech-plan Context:
      verified absent from both repos today; `@codemirror/state@^6.7.1` and
      `@codemirror/view@^6.43.6` are already present and satisfy
      `y-codemirror.next`'s CM6 peer requirement — confirm the installed
      versions resolve without a peer-dep warning).
- [ ] 1.2 Run `pnpm install` at the repo root to regenerate
      `pnpm-lock.yaml`; commit the lockfile diff. Verify command re-installs
      with `--frozen-lockfile` (fails if the lockfile and manifest disagree)
      and typechecks `packages/editor` with the new imports available
      (no code uses them yet — this task only proves resolution).

## Acceptance criteria

Dependency resolution only — no spec scenarios. Done when Verify passes and
peers resolve without warnings.

## Verify

```bash
cd "$(git rev-parse --show-toplevel)" && pnpm install --frozen-lockfile && pnpm --filter @aprovan/editor typecheck
```

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are fixed —
  if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines skill).
- Do not modify files outside: `packages/editor/package.json`, `pnpm-lock.yaml`
- Do not add application code that imports yjs yet.

## Report back

When done: check off your tasks in `openspec/changes/iw9-doc-markdown/tasks.md`, and open a
PR (or write `briefs/01-report.md`) containing: what you built, how you verified
it, any deviations from the brief and why, and anything you discovered that the
next wave needs to know.
