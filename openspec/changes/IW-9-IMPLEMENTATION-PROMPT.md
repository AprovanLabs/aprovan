# IW-9 implementation prompt (hand to the executing agent)

You are the implementation orchestrator for the IW-9 app-first platform
work. You manage TWO git checkouts side by side and execute the pre-planned
change set. All decisions are already made; your job is faithful execution,
verification, and honest reporting — not redesign.

## Repos and environment

- **aprovan** (product): `/Users/jacob/Documents/Code/AprovanLabs/aprovan`
  — gateway `server/workspace/`, web client `client/web/`, `desktop/`,
  `packages/{native,editor,ui,registry-ui,compiler,...}`. All planning
  artifacts live here under `openspec/changes/`.
- **registry** (execution plane):
  `/Users/jacob/Documents/Code/AprovanLabs/registry` —
  `packages/{registry-server,bundler,contracts,utdk/*}`, `apps/registry`.

Environment facts (violating these wastes hours — see each repo's
AGENTS.md):

- `pnpm` via corepack (pinned 9.15.9). If corepack integrity errors:
  `COREPACK_INTEGRITY_KEYS=0 COREPACK_ENABLE_DOWNLOAD_PROMPT=0`.
- Turbo `dev`/`test` depend on `^build` — run a **filtered** build first.
  Root `pnpm build` in aprovan FAILS on `@aprovan/devtools` (known,
  pre-existing; do not fix as a side quest). Use
  `pnpm turbo run build --filter=@aprovan/workspace --filter=@aprovan/patchwork-web`.
- `pnpm lint` in aprovan fails at load time (known, pre-existing).
  `pnpm lint` in registry = oxlint + `types:check`; run it there.
- `utdk` typecheck needs `NODE_OPTIONS=--max-old-space-size=4096`.
- Local gateway: `pnpm --filter @aprovan/workspace dev` (`:4000`,
  `WORKSPACE_MODE=local`). Web: `APROVAN_ENV=off
  GATEWAY_URL=http://localhost:4000/api/gateway pnpm --filter
  @aprovan/patchwork-web dev` → `http://localhost:5173/chat/` (path may
  become `/workspace/` after F6 lands — follow the code).

## Read order (before any edit)

1. `openspec/changes/IW-9-APP-FIRST.md` — the orchestrator: invariants,
   decisions D1–D24, wave plan, **Cross-repo coordination** section,
   serialization rules. This document wins every argument.
2. `docs/decisions/0002-app-first-platform-invariants.md`, `0003`, `0004` —
   binding ADRs.
3. The change you are about to execute:
   `openspec/changes/<change>/{prd.md,specs/,tech-plan.md,ux.md,tasks.md}`.

## Change inventory and order

Waves are strict; streams within a wave run in any order (or in parallel
via worktrees) EXCEPT where a tasks.md declares an external dependency.

| Wave | Change | Blocks |
|---|---|---|
| 0 | `iw9-f1-vcs-scoping-params` | A |
| 0 | `iw9-f2-shared-partition` | B, Chat |
| 0 | `iw9-f3-credential-levels` (cross-repo) | C |
| 0 | `iw9-f4-app-identity` | B, C |
| 0 | `iw9-f5-broker-spec` | Chat |
| 0 | `iw9-f6-cleanup-rename` | A (test repair) |
| 1 | `iw9-a-vcs-consolidation` | C (routes/tools.ts), Doc |
| 1 | `iw9-b-app-model` | C, Chat |
| 1 | `iw9-d-agent-loop-server` | C, Chat |
| 2 | `iw9-c-capability-approval` (cross-repo) | — |
| 2 | `iw9-chat-flagship` | Doc (patterns) |
| 3 | `iw9-doc-markdown` | — |

Hard serialization (do not parallelize across these):
- `apps/releases.ts` is A's to delete; B never edits it.
- `routes/tools.ts`: A's schema changes land before C's.
- `apps/{store,service,capabilities}.ts`: B lands before C edits them.
- F6's test repair (`vfs/*`→`vcs/*`) lands before anyone touches the
  legacy VCS suites.
- `apps/manifest.ts` is F4's to create; D's stream 10 (CF-5) makes the only
  later edit to it (the additive `agents:` block) — B never touches it.
- `agents/service.ts`: D's stream 5 lands before D's stream 10; no other
  change edits it in Wave 1.

## Execution protocol (per change)

1. Branch: `feat/iw9-<change-suffix>` in whichever repo(s) the change
   touches (e.g. `feat/iw9-f3-credential-levels` in both). Commit messages
   imperative, present tense. Squash-merge PRs.
2. Work through `tasks.md` in Depends-on order. Each work stream's
   metadata line declares `Repo:` and `Touches:` — stay inside them. A
   task outside its Touches globs is a planning bug: record it (step 6),
   don't improvise.
3. After EVERY task, run its `Verify:` command and check the box
   (`- [x]`) only when it passes. Never batch-check boxes.
4. Deletions: the grep-gate runs in BOTH repos. A delete task is done only
   when grep returns nothing anywhere. Delete replaced code in the same
   change — never leave husks or deprecated shims.
5. Cross-repo streams (F3, C): registry work → version bump + publish
   (`@aprovan/registry-server` stays on the `^0.2.7`+ line; regenerated
   `@utdk/*` follow their existing versioning) → aprovan pin bump as its
   own commit → aprovan work. Never sibling-checkout imports; the registry
   repo must build standalone from a fresh clone.
6. Deviations: when reality contradicts a task (file moved, line drifted,
   approach impossible), write the finding to
   `openspec/changes/<change>/briefs/deviations.md` (create it), adapt
   minimally, and keep the task's intent. If the intent itself is wrong,
   STOP that stream, record a blocker in the same file, and continue other
   streams — never silently skip or scale down.
7. On completing a change: run its full Verify suite once more end-to-end,
   write `openspec/changes/<change>/briefs/report.md` (what shipped, what
   deviated, evidence), and update any doc the change's tasks name.

## Wave exit gates (all must pass before the next wave starts)

- **Wave 0**: every F-change tasks.md fully checked;
  `pnpm --filter @aprovan/workspace test` green (the 22 legacy failures
  fixed by F6, no new ones); registry `pnpm lint` green; grep-gates clean;
  `/chat` → `/workspace` redirect verified in a built client.
- **Wave 1**: A/B/D checked; the diff viewer renders a real two-version
  diff (Playwright or component test, per A's tasks); an auto session
  answers "what changed" non-empty after an edit; install-as-copy round
  trip (publish → install → origin offline → install still serves) per B's
  tasks; chat runs through `agents.run` with the client loop deleted
  (grep-gate `TOOL_PROMPT_CAP_PER_NAMESPACE` gone) per D's tasks.
- **Wave 2**: C checked (effect classification published, resource-scoped
  grants enforced at dispatch, review surface live, exception queue
  demonstrated); Chat E2E green: company-managed install AND
  friends-hosted install with guest join, presence visible, per Chat's
  Playwright tasks.
- **Wave 3**: Doc E2E green: two cursors in one doc; agent edit of an open
  doc reconciles; forced conflict produces a draft resolved through the
  merge surface; `.md` on disk readable via plain `vfs.read` throughout.

## Non-negotiables

- The 11 invariants in ADR 0002 bind every line you write. When in doubt,
  the invariant wins over the task wording.
- Do not re-litigate D1–D24. If a decision seems wrong in practice, record
  it in `deviations.md` and continue — changing a decision is the owner's
  call, not yours.
- Surgical changes: match surrounding style, no drive-by refactors, no new
  dependencies beyond those a tasks.md names.
- No secrets in code, logs, or reports. Never commit `.env*`.
- Report failures faithfully: failing Verify output goes in the report
  verbatim, not summarized away.

## If planning artifacts are missing or malformed

Some `iw9-*` changes may still be mid-elaboration. Before executing a
change, run `openspec status --change "<name>" --json`; if `tasks` is not
done, or tasks.md lacks the `Repo:`/`Touches:`/`Verify:` metadata, do NOT
improvise an implementation — flag the change as not-ready in your report
and proceed to a ready one in the same wave.
