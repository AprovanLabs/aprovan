# Brief: AGENTS.md refactor rule (aprovan)

## Mission

Add a `### Refactor rule` section to aprovan's `AGENTS.md` codifying three
rules this change's own existence proves are needed: delete-in-same-change,
a two-repo grep-gate definition of done, and a husk test. This is the rule
this exact change is an instance of following.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Users & Jobs ("Agents
   working either repo — hire AGENTS.md for the refactor rule")
2. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — "AGENTS.md
   refactor-rule section" (verbatim three points + framing note)
3. `openspec/changes/IW-9-APP-FIRST.md` — "Serialization rules" bullet
   (MIGRATION-DEBT rule this codifies)
4. `AGENTS.md` (repo root — existing structure/prose style to match;
   confirmed 2026-08-09 it has no `Refactor rule` section)

_No registry-repo files are in scope for this stream._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §6)

> Depends-on: - | Repo: aprovan | Touches: aprovan/AGENTS.md | Verify: grep -n "Refactor rule" AGENTS.md

- [ ] 6.1 Add a `### Refactor rule` section to `AGENTS.md` stating, in this
      repo's existing prose style: delete replaced code in the same change
      that replaces it; a "delete X" task is not done until `grep X` returns
      nothing in **both** `aprovan` and `registry`; a workspace-glob
      directory with zero git-tracked files (`git ls-files <dir> | wc -l` =
      0) is build residue, not a package — delete it, don't deprecate it
      (tech-plan "AGENTS.md refactor-rule section").
- [ ] 6.2 Grep gate: `grep -n "Refactor rule" AGENTS.md` is non-empty.

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene.
Definition of done is exclusively the Verify command in task 6.2. Per
tech-plan, this is prose guidance matched to house style, not byte-identical
text between repos — the grep gate checks for the phrase and the three
concepts, not exact wording.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
grep -n "Refactor rule" AGENTS.md
```

Must produce at least one matching line.

## Constraints

- Implement only what the task says; the three-point content is fixed by
  the tech-plan — if the framing seems wrong, stop and report instead of
  inventing new rules.
- This is prose guidance, not a shared literal file — match this repo's
  existing `AGENTS.md` structure/heading style, do not copy registry's
  wording verbatim (that's brief 12's job, independently).
- Do not modify files outside: `AGENTS.md`.

## Model

**Sonnet (Haiku fallback).** `IW-9-EXECUTION-OVERVIEW.md` tiers this stream
Haiku ("AGENTS.md edits [...] mechanical, exhaustively specified, verifiable
by command"). Haiku is unavailable in this run, so this stream runs on
Sonnet as a fallback, not because it needs Sonnet's judgment — re-promote to
Haiku if it becomes available for a future dispatch of this same stream.

## Report back

When done: check off tasks 6.1–6.2 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/06-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything the next wave needs to know.
