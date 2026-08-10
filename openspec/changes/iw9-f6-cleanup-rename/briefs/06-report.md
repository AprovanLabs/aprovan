# Report: 06-agents-md-refactor-rule-aprovan

## What I built

Added a `### Refactor rule` section to `AGENTS.md` (repo root), placed after
the existing `### Other` section, matching the file's existing heading level
and bullet-list prose style. It states the three points fixed by the
tech-plan, verbatim in intent, in this repo's voice:

1. Delete replaced code in the same change that replaces it — no "keep the
   old one just in case."
2. Definition of done for any "delete X" task: `grep X` returns nothing in
   **both** this repo and the sibling `registry` repo, not just the one
   being edited.
3. Husk test: a workspace-glob directory with zero git-tracked files
   (`git ls-files <dir> | wc -l` = 0) is build residue, not a package —
   delete it, don't deprecate it.

Checked off tasks 6.1 and 6.2 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`.

## How I verified it

Ran the brief's exact Verify command from the repo root:

```bash
grep -n "Refactor rule" AGENTS.md
```

Output: `73:### Refactor rule` (non-empty, as required).

Confirmed before editing that no `Refactor rule` section pre-existed
(`grep -n "Refactor rule" AGENTS.md` exited 1 / no match).

## Deviations from the brief

None. Only `AGENTS.md`, this change's `tasks.md` (checkboxes), and this
report were touched, per the brief's constraint to touch only `AGENTS.md`
(plus the checkbox/report bookkeeping it explicitly asks for).

## For the next wave

- Brief 12 (registry's `AGENTS.md` refactor-rule section) is independent and
  still open — this brief explicitly does not touch the registry repo.
- The three concepts here are prose guidance, not byte-identical text; if a
  future dispatch wants to grep for exact wording across both repos, match on
  the phrase `Refactor rule` and the three concept keywords (delete-in-same-
  change, grep-gate, husk test), not literal sentence matches.
