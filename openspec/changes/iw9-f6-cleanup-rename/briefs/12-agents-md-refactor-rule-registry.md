# Brief: AGENTS.md refactor rule (registry)

## Mission

Mirror brief 06's rule into the registry repo's `AGENTS.md`, same three
points, phrased in that repo's existing prose style.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — "AGENTS.md
   refactor-rule section"
2. `openspec/changes/IW-9-APP-FIRST.md` — Cross-repo coordination
   "Serialization rules" (MIGRATION-DEBT rule this codifies, and the
   grep-gates-run-in-both-repos rule)

**registry repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry`):

3. `AGENTS.md` (confirmed 2026-08-09: no `Refactor rule` section)

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §12)

> Depends-on: - | Repo: registry | Touches: registry/AGENTS.md | Verify: grep -n "Refactor rule" AGENTS.md

- [ ] 12.1 Add a `### Refactor rule` section to `AGENTS.md`, same three
      points as stream 6 (delete-in-same-change; grep-gate-in-both-repos
      done-definition; husk test), phrased in this repo's existing prose
      style (tech-plan "AGENTS.md refactor-rule section").
- [ ] 12.2 Grep gate: `grep -n "Refactor rule" AGENTS.md` is non-empty.

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene.
Definition of done is exclusively the Verify command in task 12.2.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/registry` (**registry
repo, not aprovan**):

```bash
grep -n "Refactor rule" AGENTS.md
```

Must produce at least one matching line.

## Constraints

- Implement only what the task says; the three-point content is fixed by
  the tech-plan (same points as brief 06) — if the framing seems wrong, stop
  and report instead of inventing new rules.
- This is in the **registry** repo, not aprovan.
- The three points must be substantively the same as brief 06's
  (delete-in-same-change; two-repo grep-gate done-definition; husk test) but
  phrased in registry's own prose style — not byte-identical text (tech-plan
  explicitly notes this).
- Do not modify files outside: `AGENTS.md`.

## Model

**Sonnet (Haiku fallback).** `IW-9-EXECUTION-OVERVIEW.md` tiers this stream
Haiku ("AGENTS.md edits [...] mechanical, exhaustively specified, verifiable
by command"). Haiku is unavailable in this run, so this stream runs on
Sonnet as a fallback, not because it needs Sonnet's judgment — re-promote to
Haiku if it becomes available for a future dispatch of this same stream.

## Report back

When done: check off tasks 12.1–12.2 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md` (note: this change's
planning artifacts live in the **aprovan** repo per the IW-9 cross-repo rule
even though this stream's work is in registry — check the box in the
aprovan checkout's copy of `tasks.md`), and open a PR (or write
`briefs/12-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything the next wave needs to
know.
