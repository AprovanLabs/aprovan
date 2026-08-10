# Brief: Resolve the stale registry docs

## Mission

Two registry docs already carry 2026-08-09 STALE banners but haven't been
fixed yet. `apps-and-workflows.md` describes a model (Personal pseudo-app,
`dataScope`, name-keyed identity) fully superseded by content that already
exists elsewhere — stub it with a pointer. `vcs-and-sessions.md` is mostly
accurate; only its "Surface" section describes the retired `vfs.*` verb
table and nonexistent mount operations — rewrite just that section and clear
its banner. A third file, `platform.md`, is touched only conditionally, if
its inbound links to the other two would otherwise mislead after they
change.

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/iw9-f6-cleanup-rename/prd.md` — Goal 4
2. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Context bullet on
   both docs, Decision **D7** (full argument for per-file treatment: stub
   one, patch the other)
3. `openspec/changes/IW-9-APP-FIRST.md` — Evidence index (names both docs as
   "known stale")
4. `docs/app-data.md`, `docs/native-surfaces.md` (the replacement content
   `apps-and-workflows.md`'s stub should point to — these already exist in
   this repo, read-only reference, do not edit)

**registry repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/registry`):

5. `docs/apps-and-workflows.md` (confirmed 2026-08-09: STALE banner present)
6. `docs/vcs-and-sessions.md` (confirmed 2026-08-09: STALE banner present;
   edit scope is lines 113-161, "Surface" section only)
7. `docs/platform.md:110,114` (inbound links to both docs — read-only unless
   task 11.3 applies)

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §11, after
the `Touches` metadata fix recorded in `briefs/deviations.md` §2 — the
stream's declared footprint now includes `platform.md` since task 11.3
conditionally edits it)

> Depends-on: - | Repo: registry | Touches: registry/docs/apps-and-workflows.md, registry/docs/vcs-and-sessions.md, registry/docs/platform.md | Verify: ! grep -q "STALE" docs/apps-and-workflows.md docs/vcs-and-sessions.md && ! grep -qE "vfs\.(commit|log|diff|show|restore|branches)" docs/vcs-and-sessions.md

- [ ] 11.1 `docs/apps-and-workflows.md`: replace the document body (keep the
      file so `platform.md:110`'s inbound link resolves) with a short stub:
      state the normative model now lives in `aprovan/docs/app-data.md` and
      `aprovan/docs/native-surfaces.md` (current truth) and
      `aprovan/openspec/changes/IW-9-APP-FIRST.md` (forward direction);
      remove the STALE banner (it's now simply not the content anymore, not
      stale content) (tech-plan D7).
- [ ] 11.2 `docs/vcs-and-sessions.md`: rewrite the "Surface" section
      (lines 113-161) to current reality — the verb table lives under
      `vcs.*`, not `vfs.*`; storage is the record store, not
      `.services/vcs/*.json`; there are no `mount`/`unmount`/`mounts`
      operations (note they're quarantined pending `iw9-b-app-model`, don't
      just delete the mention); keep noting the still-unbuilt
      `auto`-session `diff(base, main)` and `GET /fs?commit=` as unbuilt
      (accurate, not stale) — resolve the file's banner once this section is
      fixed, since the banner says only this section was wrong (tech-plan
      D7). Leave every other section as-is.
- [ ] 11.3 Update `platform.md:110,114`'s link text only if the surrounding
      sentence no longer reads correctly after 11.1/11.2 (e.g. if it still
      says "the naming decision, the app SDK contract, `dataScope`..." for a
      file that's now a stub) — keep the links, fix only what would mislead.
- [ ] 11.4 Grep gate: neither doc's body (excluding a removed-banner's own
      historical mention, if kept) asserts `vfs.commit`/`vfs.mount`-style
      verbs or `dataScope` as current; `grep -rn "STALE" docs/apps-and-workflows.md docs/vcs-and-sessions.md`
      finds no unresolved banner (both banners are either removed or
      demonstrably no longer apply to the surviving content).

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene (PRD
Goal 4). Definition of done is the Verify command plus the grep gate in task
11.4.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/registry` (**registry
repo, not aprovan**):

```bash
grep -q "STALE" docs/apps-and-workflows.md docs/vcs-and-sessions.md && echo FAIL || echo PASS
grep -qE "vfs\.(commit|log|diff|show|restore|branches)" docs/vcs-and-sessions.md && echo FAIL || echo PASS
```

Both commands must print `PASS`.

## Constraints

- Implement only what the tasks say; if either doc's content diverges from
  the tech-plan's described current-truth (e.g. a verb the D7 write-up
  doesn't mention), stop and report rather than guessing.
- Do not stub `vcs-and-sessions.md` — most of it is accurate per its own
  banner ("remains the best conceptual description"); only the Surface
  section (lines 113-161) is wrong.
- Do not fully rewrite `apps-and-workflows.md` from scratch — its
  replacement content already exists in `aprovan/docs/`; recreating it here
  duplicates the exact hand-copied-in-two-places pattern MIGRATION-DEBT
  flags.
- Task 11.3 is conditional — only touch `platform.md` if the surrounding
  sentence would mislead after 11.1/11.2; do not proactively rewrite it
  otherwise. `platform.md` is now correctly listed in this stream's
  `Touches` metadata (see `briefs/deviations.md` §2) precisely so this
  conditional edit stays inside the declared footprint when it does apply.
- Do not modify files outside: `docs/apps-and-workflows.md`,
  `docs/vcs-and-sessions.md`, and — conditionally, per 11.3 —
  `docs/platform.md` link text only.

## Model

**Sonnet (Haiku fallback).** `IW-9-EXECUTION-OVERVIEW.md` tiers this stream
Haiku ("stale-doc archival [...] mechanical, exhaustively specified,
verifiable by command"). Haiku is unavailable in this run, so this stream
runs on Sonnet as a fallback — note task 11.3's conditional judgment call
("only if the surrounding sentence no longer reads correctly") is a small
amount of real reading comprehension beyond pure mechanical archival, which
Sonnet is well-suited for regardless of the fallback reasoning.

## Report back

When done: check off tasks 11.1–11.4 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/11-report.md`) containing: what you built, whether task 11.3's
conditional edit to `platform.md` applied (and why or why not), how you
verified it, any deviations from this brief and why, and anything the next
wave needs to know.
