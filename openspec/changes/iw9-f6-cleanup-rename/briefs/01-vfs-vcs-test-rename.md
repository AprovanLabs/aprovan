# Brief: Repair the mechanical vfs→vcs test renames

## Mission

Rename the six VCS-verb tool-call strings in two test files so they hit the
`vcs/*` namespace instead of the retired `vfs/*` aliases. This is a pure
string rename inside test bodies — no source changes, no behavior change —
that closes 9 of the 22 failing tests the vfs→vcs split left behind (measured
baseline: `vcs.test.ts` contributes 7 of those, `chat-sessions.test.ts` 2 —
see `briefs/deviations.md` §1 for the full measured breakdown).

## Read first

**aprovan repo** (all paths relative to
`/Users/jacob/Documents/Code/AprovanLabs/aprovan`):

1. `openspec/changes/IW-9-APP-FIRST.md` — invariants + Decision D19
2. `docs/decisions/0002-app-first-platform-invariants.md`
3. `openspec/changes/iw9-f6-cleanup-rename/prd.md`
4. `openspec/changes/iw9-f6-cleanup-rename/tech-plan.md` — Context bullets
   1–2, Decision **D1**
5. `server/workspace/tests/vcs.test.ts`
6. `server/workspace/tests/chat-sessions.test.ts`
7. `server/workspace/src/routes/tools.ts:270-380` (read-only reference for
   the `vcs` namespace's real verb set — do not edit)

_No registry-repo files are in scope for this stream._

## Tasks

(Verbatim from `openspec/changes/iw9-f6-cleanup-rename/tasks.md` §1)

> Depends-on: - | Repo: aprovan | Touches: aprovan/server/workspace/tests/vcs.test.ts, aprovan/server/workspace/tests/chat-sessions.test.ts | Verify: pnpm --filter @aprovan/workspace test -- tests/vcs.test.ts tests/chat-sessions.test.ts

- [ ] 1.1 In `tests/vcs.test.ts`, rename every `call("vfs/commit"|"vfs/log"|"vfs/diff"|"vfs/show"|"vfs/restore"|"vfs/branches", ...)`
      to the `vcs/` equivalent (tech-plan D1). Leave `call("vfs/read", ...)`
      and `call("vfs/list", ...)` untouched — those are genuine `vfs`
      operations and already pass.
- [ ] 1.2 In `tests/chat-sessions.test.ts`, rename the two `call("vfs/log", ...)`
      calls (lines 81, 177) to `call("vcs/log", ...)`. Leave the
      `call("vfs/list", ...)` call untouched.
- [ ] 1.3 Grep gate: `grep -nE 'call\("vfs/(commit|log|diff|show|restore|branches)"' server/workspace/tests/vcs.test.ts server/workspace/tests/chat-sessions.test.ts`
      returns nothing.

## Acceptance criteria

No capability spec exists for this stream — it is spec-less hygiene per the
PRD's "Spec-less hygiene" section. Definition of done is exclusively the
Verify command plus the grep gate in task 1.3 passing.

## Verify

Run from `/Users/jacob/Documents/Code/AprovanLabs/aprovan`:

```bash
pnpm --filter @aprovan/workspace test -- tests/vcs.test.ts tests/chat-sessions.test.ts
grep -nE 'call\("vfs/(commit|log|diff|show|restore|branches)"' server/workspace/tests/vcs.test.ts server/workspace/tests/chat-sessions.test.ts
echo "exit code of grep above must be 1 (no match found)"
```

Both test files must report 0 failed. The grep must exit 1 (no lines
printed).

## Constraints

- Implement only what the tasks say; the interfaces in `tech-plan.md` are
  fixed — if one seems wrong, stop and report instead of changing it.
- Surgical changes only; match existing style (see karpathy-guidelines
  skill).
- Do not touch `vfs/read`, `vfs/list`, `vfs/write`, `vfs/delete` calls — real,
  passing `vfs` operations.
- Do not edit any source file (`routes/tools.ts`, `native-dispatch.ts`) —
  this stream is test-only.
- Do not modify files outside: `server/workspace/tests/vcs.test.ts`,
  `server/workspace/tests/chat-sessions.test.ts`.

## Model

**Sonnet.** This stream was tiered Haiku-eligible ("mechanical, exhaustively
specified, verifiable by command") in a *different* bucket than the
no-downgrade list — but `IW-9-EXECUTION-OVERVIEW.md`'s Haiku row names only
"F6 husk deletion, AGENTS.md edits, stale-doc archival; pure grep-gate
close-out streams," which does not include the test-repair streams (1–3);
those are explicitly called out as "do NOT downgrade... to Haiku" regardless
of Haiku availability. Run on Sonnet as the floor tier, not as a Haiku
fallback.

## Report back

When done: check off tasks 1.1–1.3 in
`openspec/changes/iw9-f6-cleanup-rename/tasks.md`, and open a PR (or write
`briefs/01-report.md`) containing: what you built, how you verified it, any
deviations from this brief and why, and anything the next wave needs to know.
