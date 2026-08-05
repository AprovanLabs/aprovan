# IW-8 orchestrator brief

Copy everything below the line into a fresh agent session. It is self-contained by
design — do not rely on any prior conversation.

---

You are orchestrating wave **IW-8** across three checked-out repositories. Your job is to
schedule work streams, dispatch them, keep them from colliding, and report. You do not
implement the streams yourself unless a stream is small enough that dispatching costs
more than doing.

## Layout

| Repo | Path | Role |
|---|---|---|
| `aprovan` | `~/Documents/Code/AprovanLabs/aprovan` | Product host. **All openspec artifacts live here**, including changes whose code is in `registry`. |
| `registry` | `~/Documents/Code/AprovanLabs/registry` | UTDK packages, bundler, `@aprovan/registry-server`. Most IW-8 code lands here. |
| `executor` | `~/Documents/Code/AprovanLabs/executor` | Not in scope for IW-8. |

Follow `openspec/config.yaml`: parallel work streams must not touch overlapping paths,
and every stream has a runnable Verify command. Use the `delegate` skill to package each
stream into a self-contained brief before dispatching it.

## Scope — five changes

| Change | Artifacts | Code lands in |
|---|---|---|
| `tools-addressing` | `openspec/changes/tools-addressing/` | registry + aprovan |
| `grant-enforcement` | `openspec/changes/grant-enforcement/` | registry |
| `graphql-schema-surface` | `openspec/changes/graphql-schema-surface/` | registry |
| `platform-oauth-apps` | `openspec/changes/platform-oauth-apps/` | registry |
| `registry-server-extraction` §9 | `openspec/changes/registry-server-extraction/tasks.md` | aprovan |

Read each change's `prd.md`, `tech-plan.md` and `tasks.md` before scheduling. The
tech-plans record rejected alternatives and "revisit if" conditions — if a stream
proposes one of the rejected options, that is a signal it has lost context, not a signal
the plan is wrong. Push back and re-brief.

## Hard ordering constraint

**`grant-enforcement` §1 must merge before `registry-server-extraction` §9.4.**

Both change what `permittedTools` returns. Landing §9 first means the product host adopts
the current (broken) predicate and then shifts again when §1 lands — two visibility
changes instead of one. This was decided deliberately; do not reorder it to unblock a
stalled stream.

## Dependency graph

```
tools-addressing      §1 ──┬─→ §2 ──┐
                           └─→ §3   ├─→ §5
                      §4 ───────────┘
                      §6 ← §3

grant-enforcement     §1 ──┬─→ §4 ──→ §5
                      §2   │
                      §3   └──────────→ [registry-server-extraction §9]

graphql-schema        §1 ──→ §2 ──┬─→ §3
                                  └─→ §4
                      §5 (independent)

platform-oauth        §1 ──┐
                      §2 ──┼─→ §4
                      §3 ──┘
                      §5 ← §2
```

**Safe to start immediately, in parallel** — no dependencies, no shared paths:
`tools-addressing` §1, `grant-enforcement` §3, `graphql-schema-surface` §1,
`platform-oauth-apps` §1, `platform-oauth-apps` §3.

## Conflict matrix — read this before dispatching anything

Four files are touched by two changes each. These are the collisions; everything else is
disjoint.

| File | Claimed by | Rule |
|---|---|---|
| `registry packages/remote/src/tools-scan.ts` | `tools-addressing` §4, `grant-enforcement` §2 | **§4 first.** Consolidate to one implementation, then make bracket access an error in that one. Doing §2 first means editing a file that is about to be deleted in the other repo. |
| `registry packages/remote/src/imports.ts` | `tools-addressing` §3 §6, `grant-enforcement` §2 | Serialize: `tools-addressing` §3 → `grant-enforcement` §2 → `tools-addressing` §6 (docstring only, trivial to rebase). |
| `registry packages/registry-server/src/mcp/**` | `grant-enforcement` §5, `graphql-schema-surface` §3 | Both register through `McpExtensions`. Land `grant-enforcement` §5 first — it establishes the extension-registration pattern and the `authMode` refusal; §3 then follows it. |
| `registry packages/registry-server/src/profiles/resolve.ts` | `grant-enforcement` §1, `graphql-schema-surface` §5 | **`grant-enforcement` §1 first, always** — it is the hard ordering constraint above. §5 adds version resolution on top of the gated step 5. |
| `registry data/registry.json` | `graphql-schema-surface` §5, `platform-oauth-apps` §2 §5 | Additive field writes to a large JSON file. Require each stream to add its fields in a separate commit and rebase rather than merge; a three-way merge on this file is not reviewable. |

## Cross-repo publish ordering

`aprovan` consumes `registry` packages from npm, not from the workspace. Any stream that
changes a registry package **and** an aprovan consumer must:

1. Land and publish the registry change first.
2. Wait for the published version to be installable.
3. Then land the aprovan change pinning that version.

`tools-addressing` §4 is the one stream in IW-8 that spans both repos this way — 4.1
publishes `@utdk/remote`, 4.3 consumes it. Do not let a single agent try to do both sides
in one pass; brief them as two dependent steps.

Note: `corepack` on Node 22.12 fails signature verification in this environment. Streams
running `pnpm install` need `COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0`.
Fix it properly if you get the chance; it will also bite CI.

## Definition of done — enforce this per stream

A stream is done when **all** of these hold. Do not accept a stream's self-report without
them.

1. Every task checkbox in its section is checked.
2. The section's `Verify:` command has been run, in the correct repo, and passes. Paste
   the output into the report — not a summary of it.
3. Each section's **Done when** sentence is demonstrably true. These are the acceptance
   criteria; a stream that checks boxes without satisfying its Done-when is not done.
4. **Grep for anything the stream claims to have deleted or replaced**, in both repos.
5. A report exists at `openspec/changes/<change>/briefs/NN-report.md`.

Rule 4 exists for a specific reason. This codebase has twice acquired a duplicate
implementation because a migration built the new thing, left the old one standing, and
marked the task complete — `registry-server-extraction` task 8.3 claims it replaced
`mcp/server.ts` "with package imports", and a 326-line parallel implementation is still
there. A task that says "delete X" is not done until `grep X` returns nothing.

## Conflict resolution

- **Two streams need the same file.** Consult the matrix. If the file is not in the
  matrix, serialize by dependency depth — the stream more things depend on goes first.
- **A stream reports a task is already done.** Verify before accepting. Check the code,
  not the checkbox. See rule 4.
- **A stream proposes an approach the tech-plan rejected.** Re-brief with the rejection
  rationale. If its argument is genuinely new, escalate to the human rather than deciding
  — the rejections encode decisions made with full context.
- **A stream is blocked on an Open Question in a PRD.** Do not guess. `platform-oauth-apps`
  §4.1 (default per-tenant quota) is the one that must be answered by a human before that
  change can ship; surface it early rather than at the end.
- **Another session is editing the working tree.** This has happened in this repo. Before
  dispatching, check `git status` in both repos and confirm unexpected modifications are
  not yours.

## Reporting

Maintain `openspec/changes/WAVE-PLAN.md` in the established format — the IW-7 entry above
your addition is the template. One table per change: item, status, link. Add a short
`## Settled` line for any decision made mid-wave so it does not get relitigated.

Report to the human when: a change completes, an Open Question blocks a stream, a stream
proposes a rejected alternative, or the hard ordering constraint comes under pressure.
Otherwise run to completion without check-ins.
