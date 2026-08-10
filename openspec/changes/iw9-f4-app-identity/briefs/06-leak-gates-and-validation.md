# Brief: Leak gates, full suite, artifact validation

## Mission

Close out `iw9-f4-app-identity`: run the MIGRATION-DEBT grep-gates in **both**
repos (per the IW-9 Cross-repo coordination rule that deletion/leak
grep-gates always run in both checkouts, even for a repo with no registry
work), confirm no route or shell template still embeds a workspace id in a
public app URL, run the full workspace + UI test suites, fix any regression
your own stream introduces, and validate the change's OpenSpec artifacts.
This stream depends on all five others landing first — it is the final
serialized gate, not a parallel stream.

## Read first

All paths relative to `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
unless otherwise noted:

1. `openspec/changes/IW-9-APP-FIRST.md` — the "Cross-repo coordination"
   section, rule 4 (deletion/leak grep-gates run in both repos)
2. `openspec/changes/IW-9-IMPLEMENTATION-PROMPT.md` — §6 (deviation
   protocol) and the wave exit gates
3. `openspec/changes/iw9-f4-app-identity/tech-plan.md` — "Rollout" step 4
   (the grep-gate definition of done) and "Risks / Trade-offs"
4. `openspec/changes/iw9-f4-app-identity/specs/app-url-scheme/spec.md` —
   Requirement "No workspace ids in public app URLs; no region segments"
   (full text under Acceptance criteria below — this is what the grep-gates
   are proving)
5. `openspec/changes/iw9-f4-app-identity/briefs/deviations.md` — read in
   full; it records every planning repair made before streams 1-5 were
   dispatched, so you know what to expect landed
6. The landed output of streams 1-5: `server/workspace/src/apps/manifest.ts`,
   `slugs.ts`, `reconcile.ts`, `identity.ts`, `directory.ts`, `store.ts`,
   `routes/app-urls.ts`, `routes/live-apps.ts`,
   `packages/ui/src/apps/app-icon.ts` — skim each for the shape you're about
   to grep-gate and test, don't re-review their logic in depth (that was
   each stream's own Verify)
7. `/Users/jacob/Documents/Code/AprovanLabs/registry` (separate checkout) —
   confirm it exists and note its absolute path; the grep-gate below has a
   hardcoded absolute path into this checkout because there is no
   registry-repo work in this change (no shared relative root)

## Tasks

(Verbatim from `openspec/changes/iw9-f4-app-identity/tasks.md` §6 —
unchanged by the pre-dispatch repair pass)

> Depends-on: 1, 2, 3, 4, 5 | Repo: aprovan | Touches: aprovan/openspec/changes/iw9-f4-app-identity/tasks.md | Verify: pnpm --filter @aprovan/workspace test && pnpm --filter @aprovan/ui test && ! grep -rn 'apps/${workspaceId}' server/workspace/src/routes/ && ! grep -rn '/apps/id/' server/workspace/src/routes/app-urls.ts && ! grep -rn 'apps/${workspaceId}' /Users/jacob/Documents/Code/AprovanLabs/registry/packages --include='*.ts'

- [ ] 6.1 Grep gate (MIGRATION-DEBT definition of done, run in BOTH repos per Cross-repo rule 4): no route or shell template emits a `/apps/<workspaceId>/…` link — `grep -rn 'apps/${workspaceId}' server/workspace/src/routes/` returns nothing in aprovan, and the same pattern returns nothing under `registry/packages`.
- [ ] 6.2 Region gate: `grep -rn 'region' server/workspace/src/routes/app-urls.ts` shows no region path segment construction (D5/D21: no region in URLs).
- [ ] 6.3 Run the full `@aprovan/workspace` and `@aprovan/ui` suites; fix any regression introduced by streams 1-5 in the stream that owns the touched path.
- [ ] 6.4 Run `openspec validate iw9-f4-app-identity` (if the installed CLI provides it) and resolve any artifact issues; tick all boxes.

## Acceptance criteria

Verbatim from `specs/app-url-scheme/spec.md` (the requirement this stream's
grep-gates prove, end to end):

### Requirement: No workspace ids in public app URLs; no region segments
No route, generated link, shell config, or redirect target for a **public** app surface SHALL contain a workspace id (today `routes/live-apps.ts` serves `/apps/<workspaceId>/<name>` and bakes `liveBase`/`appBase` workspace-id URLs into the page shell — both leak). Workspace ids MAY appear only under the workspace-scoped `/w/<wsId>/…` form. No app URL SHALL contain a region segment (D21: region is an edge lookup, never an address).

#### Scenario: public shell carries no workspace id
- **WHEN** the HTML shell for `/a/<appId>` is rendered for a public app
- **THEN** no URL embedded in the page (bases, links, redirects) contains the hosting workspace id

#### Scenario: legacy leak closed
- **WHEN** the legacy `/apps/<workspaceId>/<name>` form is requested
- **THEN** the response is a 302 to a canonical URL that does not contain the workspace id

(Streams 3 and 5 already built assertions of these scenarios into their own
test files — `tests/app-urls.test.ts`'s shell-leak assertion in particular.
This stream's job is the repo-wide grep sweep that catches anything a
per-stream unit test wouldn't: a stray literal in a doc string, a shell
script, or a file outside the touched set.)

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan` unless noted:

```bash
pnpm turbo run build --filter=@aprovan/workspace --filter=@aprovan/ui
pnpm --filter @aprovan/workspace test
pnpm --filter @aprovan/ui test
! grep -rn 'apps/${workspaceId}' server/workspace/src/routes/
! grep -rn '/apps/id/' server/workspace/src/routes/app-urls.ts
! grep -rn 'apps/${workspaceId}' /Users/jacob/Documents/Code/AprovanLabs/registry/packages --include='*.ts'
! grep -rn 'region' server/workspace/src/routes/app-urls.ts
openspec validate iw9-f4-app-identity --type change
```

The first line is a correction over `tasks.md`'s literal `Verify:` string
(see `briefs/deviations.md` §9) — both test suites need their
`workspace:*` dependencies built first. Run the grep gates exactly as
written (they use `!` to require zero matches, so a non-matching `grep`
returning exit code 1 is success — do not "fix" the exit code by removing
the `!`). If `openspec` is not installed as a CLI, skip 6.4's tool
invocation and instead manually re-read every changed artifact
(`tech-plan.md`, `tasks.md`, all four `specs/*/spec.md`) for internal
consistency; note in your report which path you took.

## Constraints

- This stream fixes regressions **in the stream that owns the touched
  path** — if `pnpm --filter @aprovan/workspace test` surfaces a failure in
  a file streams 1-5 touched, fix it there and re-run; if it surfaces a
  **pre-existing** failure unrelated to this change (a file none of the six
  streams touched), do not fix it — note it in your report and move on.
- Do not weaken any grep-gate to make it pass (e.g. narrowing the pattern,
  adding an exclusion for a file that should be clean). If a gate fails, the
  fix is in the code the gate is checking, not in the gate.
- Do not touch `tasks.md` beyond checking off boxes — this stream's `Touches`
  is exactly `openspec/changes/iw9-f4-app-identity/tasks.md`.
- If `openspec validate` reports a spec/tech-plan inconsistency, do not
  silently patch specs to make validation pass — read `briefs/deviations.md`
  first (it explains every intentional tech-plan/tasks change made before
  dispatch) and only touch a spec file if the inconsistency is genuinely new
  and unexplained; report it either way.

## Model

**Sonnet** — the default tier for every `iw9-f4` stream per
`IW-9-EXECUTION-OVERVIEW.md`'s "Model tiers for the implementing fleet"
table. F4 does not appear in that table's Opus-escalation row, and this
stream is a verification/close-out gate against fully-specified acceptance
criteria — mechanical checking plus judgment-bounded regression triage
(fix-in-owning-stream, don't fix pre-existing failures), not novel design.
Haiku is not used in this fleet (unavailable) and would not be appropriate
here regardless — "fix any regression... in the stream that owns the
touched path" requires enough judgment to distinguish a regression from a
pre-existing failure, which the overview reserves above Haiku's mechanical
tier. Use Sonnet; do not escalate to Opus.

## Report back

When done: check off tasks 6.1–6.4 in
`openspec/changes/iw9-f4-app-identity/tasks.md`, and open a PR (or write
`briefs/06-report.md`) containing: every grep-gate's output (pasted, showing
zero matches), the full test-suite results for both packages, the
`openspec validate` result (or the manual-consistency-check notes if the CLI
was unavailable), and a final confirmation that `iw9-f4-app-identity` is
ready for `iw9-b-app-model` to consume its frozen contracts
(`AppYaml`/`reconcileApp`).
