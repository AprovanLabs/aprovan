# Deviations — iw9-f6-cleanup-rename

Recorded per `IW-9-IMPLEMENTATION-PROMPT.md` §6 ("Deviations: when reality
contradicts a task... write the finding to `briefs/deviations.md`"). This is
a planning-time deviation found while packaging briefs, before any stream
started implementation.

## 1. Measured baseline corrects tasks.md task 3.4's "13 suites" framing

**Re-measured 2026-08-09** (same day as the tech-plan's own baseline claim,
before dispatching any brief):

```
pnpm turbo run build --filter=@aprovan/workspace   # cache hit, exit 0
pnpm --filter @aprovan/workspace test
```

Result: **Test Files 18 failed | 58 passed | 6 skipped (82)** — **Tests 81
failed | 474 passed | 57 skipped (612)**.

The **81 / 474 / 57** totals match `tech-plan.md`'s "Context" section and
`prd.md`'s "Problem" section exactly — no drift there. What's wrong is
`tasks.md` task 3.4's compression of this into "the pre-change baseline (81
failures across the 13 suites named in the PRD's Non-Goals)". That sentence
reads as if all 81 failures live in 13 files. They don't:

| Group | Files | Failures | Source |
|---|---|---|---|
| F6-owned (streams 1–3 repair these) | 5 | 22 | `vcs.test.ts` 7, `vfs-mounts.test.ts` 6, `vcs-mount-lineage.test.ts` 4, `vcs-interface.test.ts` 3, `chat-sessions.test.ts` 2 |
| Non-F6 (PRD Non-Goals, untouched) | 13 | 59 | see per-file table below |
| **Total** | **18** | **81** | matches the measured run above |

The "13" in the PRD's Non-Goals list is itself correct and matches the
measured non-F6 file set one-for-one (`sandbox-*` expands to 2 files:
`sandbox-agent-runs.test.ts`, `sandbox-repo-mounts.test.ts`) — the PRD names
13 non-F6 files and 13 non-F6 files fail. But those 13 files account for only
**59** of the 81 failures, not all of them; the other 22 are the F6-owned
files stream 3's regression check must not disturb. task 3.4's wording
conflates "13 non-F6 files" with "where all 81 failures live," which is off
by the 22 F6-owned failures and by 5 files (13 vs. the true 18 failed
files).

Full per-file measured breakdown (failed test files only, `pnpm --filter
@aprovan/workspace test`, sorted by failure count):

| File | Failures | Owner |
|---|---|---|
| `interfaces.test.ts` | 18 | non-F6 |
| `sandboxes.test.ts` | 8 | non-F6 |
| `get-client.test.ts` | 8 | non-F6 |
| `vcs.test.ts` | 7 | **F6 stream 1** |
| `vfs-mounts.test.ts` | 6 | **F6 stream 2** |
| `telemetry.test.ts` | 6 | non-F6 |
| `agent-run.test.ts` | 5 | non-F6 |
| `vcs-mount-lineage.test.ts` | 4 | **F6 stream 2** |
| `agent-interface.test.ts` | 4 | non-F6 |
| `vcs-interface.test.ts` | 3 | **F6 stream 3** |
| `oauth-tokens.test.ts` | 3 | non-F6 |
| `sandbox-agent-runs.test.ts` | 2 | non-F6 |
| `chat-sessions.test.ts` | 2 | **F6 stream 1** |
| `sync.test.ts` | 1 | non-F6 |
| `sandbox-repo-mounts.test.ts` | 1 | non-F6 |
| `profiles.test.ts` | 1 | non-F6 |
| `live-apps.test.ts` | 1 | non-F6 |
| `apps.test.ts` | 1 | non-F6 |

**Disposition:** `tasks.md` task 3.4's checkbox text is left verbatim (it is
the historical planning record and the plan's *intent* — "confirm nothing
else regresses" — is unambiguous and correct even though its number is
imprecise). `briefs/03-vcs-interface-resolution.md` carries an explicit
correction pointing here and instructs stream 3's regression check to
compare against **this table** (18 failed files / 81 failed tests / 474
passed / 57 skipped as the non-F6 baseline to preserve), not "13 suites."
Per the implementation prompt's own rule: "the tech-plan's stated intent
wins over the line number [or count]" — same principle applied to this
count.

## 2. Planning-metadata fix: Stream 11 `Touches` was missing `platform.md`

Stream 11 task 11.3 conditionally edits `registry/docs/platform.md` ("Update
`platform.md:110,114`'s link text only if the surrounding sentence no longer
reads correctly after 11.1/11.2") but the stream's metadata line only
declared `Touches: registry/docs/apps-and-workflows.md,
registry/docs/vcs-and-sessions.md` — `platform.md` was reachable by task text
but outside the declared footprint, which the implementation prompt calls a
planning bug ("A task outside its Touches globs is a planning bug: record
it... don't improvise").

**Fix applied directly to `tasks.md`** (metadata, not implementation code):

```diff
- > Depends-on: - | Repo: registry | Touches: registry/docs/apps-and-workflows.md, registry/docs/vcs-and-sessions.md | Verify: ...
+ > Depends-on: - | Repo: registry | Touches: registry/docs/apps-and-workflows.md, registry/docs/vcs-and-sessions.md, registry/docs/platform.md | Verify: ...
```

Re-ran `openspec validate iw9-f6-cleanup-rename --type change` after the
edit: **valid**.

## 4. Stream 5's registry-side grep gate has false positives (generated clients)

Task 5.5's registry-side command, run literally as written
(`grep -rni "dataScope" --include='*.ts' --include='*.tsx' packages apps`,
from the registry checkout), returns **3 matches**, none of them real
`dataScope` residue:

- `packages/utdk/posthog/types/schemas.ts` and
  `packages/utdk/posthog/types/index.ts` — a third-party data-source
  provider literally named `Datascope` in a generated enum doc-comment list
  (unrelated product, coincidental name collision).
- `packages/utdk/plaid/types/schemas.ts` — Plaid's own
  `ItemConsentedDataScope` type and `consented_data_scopes` field (a real
  Plaid API concept, unrelated to this platform's retired app-manifest
  `dataScope`).

Re-ran `grep -rni dataScope --include='*.ts' registry` (repo-wide, no
directory restriction): confirmed these 3 matches, all inside
`packages/utdk/*`, are the *only* registry-side hits — there is no real
`dataScope` residue in the registry repo. This validates that Stream 5's
`Repo: aprovan`-only declaration in `tasks.md` is correct (there is nothing
to fix on the registry side), but the *verification command* in task 5.5, if
run without an exclusion, would report a false failure forever (the
generated clients regenerate from third-party specs and will keep
containing these unrelated strings).

**Disposition:** `tasks.md` task 5.5's text is left verbatim (its intent —
"no real dataScope residue in either repo" — is correct). Brief
`05-datascope-purge.md`'s Verify section adds `--exclude-dir=utdk` to the
registry-side command with an explanatory caveat, rather than editing the
task text itself.

## 5. No other drift found

Spot-checked against disk before packaging (see brief `Read first` lists for
per-stream citations): `infra/aws/aws/` still has exactly 19 tracked files;
`registry/packages/utdk/infra/` still has 0 tracked files (only
`cdk.out/bundling-temp-*/node_modules/`); neither `AGENTS.md` yet has a
`Refactor rule` section; both `registry/docs/{apps-and-workflows,
vcs-and-sessions}.md` still carry `STALE` banners. No line-number drift was
checked line-by-line inside source files (out of scope for packaging —
flagged to each brief's implementing agent to re-verify per
`IW-9-EXECUTION-OVERVIEW.md` finding 8).
